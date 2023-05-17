import react from 'react';
import { useEffect, useState } from 'react';
import {DataTable} from 'primereact/datatable';
import {Column} from 'primereact/column';
import {InputText} from 'primereact/inputtext';
import {Toast } from 'primereact/toast';
import { Calendar } from 'primereact/calendar';
import {Dropdown } from 'primereact/dropdown';
import { Button } from 'primereact/button';
import { FilterMatchMode, FilterOperator } from 'primereact/api';
import factureService from '../../services/factureService';
import ObjetService from '../../services/objetService';
import TvaService from '../../services/tva.services';
import libelleService from '../../services/libelleService';


const FactuerDatatable = () => {
    const [facture, setFacture] = react.useState([]);
    const [objet, setObjet] = react.useState([]);
    const [objetList , setObjetList] = react.useState([]);
    const [tva, setTva] = react.useState([]);
    const [libelle, setLibelle] = react.useState([]);
    const [libelleList , setLibelleList] = react.useState([]);
    const [tvaList , setTvaList] = react.useState([]);
    const [globalFilterValue1, setGlobalFilterValue1] = useState('');

    const [filters1, setFilters1] = useState(null)
    const toast = react.useRef(null);

    const getFactures = () => {
        factureService.getFactures().then((response) => {
            setFacture(response.data);
            console.log(response.data, 'response.data');
        })
        .catch((error) => {
            console.log(error);
        });
    }

    const getObjets = () => {
        ObjetService.getAll().then((response) => {
            setObjet(response.data);
            // List avec label and value
            const objetList = response.data.map((objet) => {
                return {
                    label: objet.title,
                    value: objet.id
                }
            })
            setObjetList(objetList);
            console.log(response.data, 'response.data');
        })
        .catch((error) => {
            console.log(error);
        });
    }

    const getTvas = () => {
        TvaService.getAll().then((response) => {
            setTva(response.data);
            // List avec label and value
            const tvaList = response.data.map((tva) => {
                return {
                    label: tva.tva_value,
                    value: tva.tva_id
                }
            })

            setTvaList(tvaList);
            console.log(response.data, 'response.data');
        })

        .catch((error) => {
            console.log(error);
        });
    }

    const getLibelles = () => {
        libelleService.getAll().then((response) => {
            setLibelle(response.data);
            // List avec label and value
            const libelleList = response.data.map((libelle) => {
                return {
                    label: libelle.title,
                    value: libelle.id
                }
            })

            setLibelleList(libelleList);

            console.log(response.data, 'response.data');
        })

        .catch((error) => {
            console.log(error);
        });
    }




    useEffect(() => {
        getFactures();
        getObjets();
        getTvas();
        getLibelles();
        initFilters1();

    }, [objet, tva, libelle, facture]);

    const statusBodyTemplate = (rowData) => {
        if (rowData.estpaye === false) {
            return (
                <span className="p-badge p-badge-danger">Non payée</span>
            );

        }
        return <span className="p-badge p-badge-success">Payée</span>;
    }

    const onRowEditComplete = (e) => {
        console.log(e)
        const dataFacture = {
            num_facture: e.newData.num_facture === e.data.num_facture ? e.data.num_facture : e.newData.num_facture,
            facture_date: e.newData.facture_date,
            num_facture_lamy: e.newData.num_facture_lamy,
            montant: e.newData.montant,
            due_date: e.newData.due_date,
            objet_id: e.newData.objet_id,
            tva_id: e.newData.tva_id,
            libelle_id: e.newData.libelle_id,


        }
        factureService.updateFacture(e.data.facture_id, dataFacture)
            .then((response) => {
                toast.current.show({ severity: 'success', summary: 'Facture modifiée', detail: 'Facture modifiée', life: 3000 });
                getFactures();
            }   
            )
            .catch((error) => {
                console.log(error);
                toast.current.show({ severity: 'error', summary: 'Facture non modifiée', detail:  error.response.data.message, life: 3000 });
            }
            );


        

    }

    const dueDateBodyTemplate = (rowData) => {
        // si date 
        if (rowData.due_date) {
            // si date dépassée
            if (new Date(rowData.due_date) < new Date() && rowData.estpaye === false) {
                return (
                    <span className="p-badge p-badge-danger">{new Date(rowData.due_date).toLocaleDateString()}</span>
                );
            }
            // si date à venir
            else if (new Date(rowData.due_date) < new Date() && rowData.estpaye === true) {
                return (
                    <span className="p-badge p-badge-success">{new Date(rowData.due_date).toLocaleDateString()}</span>
                );
            }
            else if (new Date(rowData.due_date) > new Date() && rowData.estpaye === true) {
                return (
                    <span className="p-badge p-badge-success">{new Date(rowData.due_date).toLocaleDateString()}</span>
                );
            }
            else if (new Date(rowData.due_date) > new Date() && rowData.estpaye === false) {
                return (
                    <span className="p-badge p-badge-warning">{new Date(rowData.due_date).toLocaleDateString()}</span>
                );
            }
        }
        return <span className="p-badge p-badge-info">Pas de date</span>;
    }

    const textEditor = (options) => {
        // Message dans le dialog pour informer l'utilisateur
        return <InputText type="text" value={options.value} onChange={(e) => options.editorCallback(e.target.value)} tooltip="Attention ! Toutes modifications entrainera des changements sur tout le facturier" tooltipOptions={{ className: 'yellow-tooltip', position: 'top' }} />;
    }

    const numberEditor = (options) => {
        // Message dans le dialog pour informer l'utilisateur
        return <InputText type="number" value={options.value} onChange={(e) => options.editorCallback(e.target.value)} tooltip="Attention ! Toutes modifications entrainera des changements sur tout le facturier" tooltipOptions={{ className: 'yellow-tooltip', position: 'top' }} />;
    }

    const dateEditor = (options) => {
        // Message dans le dialog pour informer l'utilisateur
        return <Calendar dateFormat="dd/mm/yy" value={options.value} onChange={(e) => options.editorCallback(e.target.value)} tooltip="Attention ! Toutes modifications entrainera des changements sur tout le facturier" tooltipOptions={{ className: 'yellow-tooltip', position: 'top' }} />;

    }
    const dueDateEditor = (options) => {
        // Message dans le dialog pour informer l'utilisateur
        console.log(options, 'options.value');
        const factureDate = new Date(options.rowData.facture_date);
      
        return (
          <Calendar
            dateFormat="dd/mm/yy"
            value={options.value}
            onChange={(e) => options.editorCallback(e.target.value)}
            tooltip="Attention ! Toutes modifications entraînera des changements sur tout le facturier"
            tooltipOptions={{ className: 'yellow-tooltip', position: 'top' }}
            minDate={factureDate}
          />
        );
      };

    const dropdownEditorObjet = (options) => {

        return <Dropdown value={options.value} options={objetList} onChange={(e) => options.editorCallback(e.value)} tooltip="Attention ! Toutes modifications entrainera des changements sur tout le facturier" tooltipOptions={{ className: 'yellow-tooltip', position: 'top' }} />;
    }

    const dropdownEditorLibelle = (options) => {

        return <Dropdown value={options.value} options={libelleList} onChange={(e) => options.editorCallback(e.value)} tooltip="Attention ! Toutes modifications entrainera des changements sur tout le facturier" tooltipOptions={{ className: 'yellow-tooltip', position: 'top' }} />;
    }

    const dropdownEditorTva = (options) => {

        return <Dropdown value={options.value} options={tvaList} onChange={(e) => options.editorCallback(e.value)} tooltip="Attention ! Toutes modifications entrainera des changements sur tout le facturier" tooltipOptions={{ className: 'yellow-tooltip', position: 'top' }} />;
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
            'num_facture': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
            'num_facture_lamy': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
            'montant': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
            // Objet doit être trié via son title 
            'objet.title': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
            

            'country.name': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },

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


    const dateBodyTemplate = (rowData) => {
        if (rowData.facture_date !== null) {

            return (
                <span className="p-badge p-badge-success">{new Date(rowData.facture_date).toLocaleDateString()}</span>
            );
        }
    }




    return (
        <div>
            <Toast ref={toast} />
            
            <DataTable value={facture} editMode="row" header={header1} onRowEditComplete={onRowEditComplete} filterDisplay="menu" globalFilterFields={['tva.tva_value', 'objet.title', 'libelle.title', 'estpaye', 'num_facture', 'num_facture_lamy', 'montant']} filters={filters1}>
                <Column field="num_facture" header="Numéro de facture" editor={(options) => numberEditor(options)} sortable filter></Column>
                <Column field="num_facture_lamy" header="N° de facture Lamy" editor={(options) => textEditor(options)} sortable filter></Column>
                <Column field="montant" header="Montant" sortable editor={(options) => numberEditor(options)} filter></Column>
                <Column field="facture_date" header="Date de facturation" sortable editor={(options) => dateEditor(options)} body={dateBodyTemplate} filter></Column>
                <Column field="due_date" header="Date d'échéance" sortable  editor={(options) => dueDateEditor(options)} body={dueDateBodyTemplate} filter></Column>
                <Column field="estpaye" header="Statut de la facture" body={statusBodyTemplate} sortable filter></Column>
                <Column field="objet_id" header="Objet" sortable editor={(options) => dropdownEditorObjet(options)} body={(rowData) => rowData.objet.title} filter></Column>
                <Column field="libelle_id" header="Libelle" sortable editor={(options) => dropdownEditorLibelle(options)} body={(rowData) => rowData.libelle.title} filter></Column>
                <Column field="tva_id" header="TVA" sortable editor={(options) => dropdownEditorTva(options)} body={(rowData) => rowData.tva.tva_value} filter></Column>
                <Column rowEditor ></Column>
            </DataTable>



            
            
        </div>
    );
}

export default FactuerDatatable;