import react from 'react';
import { useEffect, useState, useRef } from 'react';
import {InputText} from 'primereact/inputtext';
import {DataTable} from 'primereact/datatable';
import {Column} from 'primereact/column';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import { FilterMatchMode, FilterOperator } from 'primereact/api';
import userService from '../../services/userService';

const UsersDatatable = () => {
    const [users, setUsers] = react.useState([]);
    const [globalFilterValue1, setGlobalFilterValue1] = useState('');
    const toast = useRef(null);

    const [filters1, setFilters1] = useState(null)

    const getUsers = () => {
        userService.getAll().then((response) => {
            setUsers(response.data);
            console.log(response.data, 'response.data');
        })
        .catch((error) => {
            console.log(error);
        });
    }

    useEffect(() => {
        getUsers();
        initFilters1();
    }, []);

    const onRowEditComplete = (e) => {
        console.log(e)
        const data = {
            username: e.newData['user.username']
            email: e.newData['user.email']
           
        }
        userService.update(e.data.user_id, data)
        .then((response) => {
            console.log(response.data);
            toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Utilisateur modifié', life: 3000 });
            getUsers();
            // add logs



        }
        )
        .catch((error) => {
            console.log(error);
        }
        );
    }

    const textEditor = (options) => {
        // Message dans le dialog pour informer l'utilisateur
        return <InputText type="text" value={options.value} onChange={(e) => options.editorCallback(e.target.value)} tooltip="Attention ! Toutes modifications entrainera des changements sur tout le facturier" tooltipOptions={{ className: 'yellow-tooltip', position: 'top' }} />;
    }

    const clearFilter1 = () => {
        initFilters1();
    }

    const onGlobalFilterChange1 = (e) => {
        const value = e.target.value;
        let _filters1 = { ...filters1 };
        _filters1['global'].value = value;

        setFilters1(_filters1);
        setGlobalFilterValue1(value);
    }


    const initFilters1 = () => {
        setFilters1({
            'global': { value: null, matchMode: FilterMatchMode.CONTAINS },
            'user.username': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
            'user.email': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
            'role.name': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },


        });
        setGlobalFilterValue1('');
    }

    const renderHeader1 = () => {
        return (
            <div className="flex justify-content-between">
                <Button type="button" icon="pi pi-filter-slash" label="Vider les filtres" className="p-button-outlined" onClick={clearFilter1} />
                <span className="p-input-icon-left">
                    <i className="pi pi-search" />
                    <InputText value={globalFilterValue1} onChange={onGlobalFilterChange1} placeholder="Rechercher..." />
                </span>
            </div>
        )
    }

    const header1 = renderHeader1();

    return (
        <div>
            <Toast ref={toast} />
            <DataTable value={users} editMode="row" header={header1} onRowEditComplete={onRowEditComplete} filterDisplay="menu" globalFilterFields={['user.username', 'user.email', 'role.name', 'user.createdAt']} filters={filters1}>
                <Column field="user.username" header="Nom d'utilisateur" sortable editor={(options) => textEditor(options)} filter></Column>
                <Column field="user.email" header="Email" sortable editor={(options) => textEditor(options)} filter></Column>
                <Column field="role.name" header="Role" sortable editor={(options) => textEditor(options)} filter></Column>
                <Column field="user.createdAt" header="Date de création" body={(rowData) => {
                    return (
                        <div>
                            {new Date(rowData.user.createdAt).toLocaleDateString()}
                        </div>
                    )
                }}></Column>
                <Column rowEditor></Column>
              
            </DataTable>
        </div>
    );
}

export default UsersDatatable;
