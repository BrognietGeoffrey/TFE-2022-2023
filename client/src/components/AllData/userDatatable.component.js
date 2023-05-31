import react from 'react';
import { useEffect, useState } from 'react';
import {InputText} from 'primereact/inputtext';
import {DataTable} from 'primereact/datatable';
import {Column} from 'primereact/column';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import { FilterMatchMode, FilterOperator } from 'primereact/api';
import userService from '../../services/userService';
import './allData.css'
const UsersDatatable = () => {
    const [users, setUsers] = react.useState([]);
    const [globalFilterValue1, setGlobalFilterValue1] = useState('');

    const [filters1, setFilters1] = useState(null)
    const [rows, setRows] = useState(10);
    const toast = react.useRef(null);

    useEffect(() => {
      const handleResize = () => {
        if (window.innerWidth <= 480) {
          setRows(5);
        } else {
          setRows(10);
        }
      };
  
      // Écoute les événements de redimensionnement de la fenêtre
      window.addEventListener('resize', handleResize);
  
      // Définit la valeur initiale en fonction de la taille de l'écran
      handleResize();
  
      // Nettoie l'écouteur d'événement lorsqu'un composant est démonté
      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }, []);

    const getUsers = () => {
        userService.getAll().then((response) => {
            setUsers(response.data.data);
            console.log(response.data.data, 'response.data');
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
            username: e.newData.username,
            email: e.newData.email,
            role: e.newData.role
        }
        userService.update(e.data.user_id, data)
        .then((response) => {
            console.log(response.data);
            getUsers();
            toast.current.show({ severity: 'success', summary: 'Modification effectuée', detail: 'Utilisateur modifié', life: 3000 });
        }
        )
        .catch((error) => {
            console.log(error);
            toast.current.show({ severity: 'error', summary: 'Modification non effectuée', detail: error.response.data.message, life: 3000 });
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
            <div className="flex justify-content-between" id="header">
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
            <DataTable value={users} editMode="row" header={header1} onRowEditComplete={onRowEditComplete} filterDisplay="menu" globalFilterFields={['user.username', 'user.email', 'role.name', 'user.createdAt']} filters={filters1}
                paginator rows={rows} rowsPerPageOptions={[5, 10, 25, 50]} stripedRows>
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
