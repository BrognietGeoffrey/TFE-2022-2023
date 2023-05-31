
import React, { useState, useEffect, useRef } from 'react';

import './Facturiers.css';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { InputNumber } from 'primereact/inputnumber';
import { ProgressBar } from 'primereact/progressbar';
import { Calendar } from 'primereact/calendar';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import {Chip} from 'primereact/chip';
import { Tooltip } from 'primereact/tooltip';
import { FilterMatchMode, FilterOperator } from 'primereact/api';
import 'jspdf-autotable';

import FacturierDataService from "../../services/facturierService";
import FactureDataService from "../../services/factureService";
import ExtraitDataService from "../../services/extraitService";
import LogsDataService from "../../services/logsService";
import {Toast} from 'primereact/toast';

const FacturierDatatable = () => {

    const [loading, setLoading] = useState(true)
    const [importedCols, setImportedCols] = useState([{ field: '', header: 'Header' }]);
    const [globalFilterValue1, setGlobalFilterValue1] = useState('');

    const [filters1, setFilters1] = useState(null)
    const dt = useRef(null);


    const [facturiers, setFacturiers] = useState([]);
    const [extraitList, setExtraitList] = useState([]);
    const [displayExtraitList, setDisplayExtraitList] = useState(false);
    const [extrait, setExtrait] = useState({ facture: {} })

    const toastAddon = useRef(null);
    const [user, setUser] = useState(null);

    const cols = [
        { field: 'facturier_id', header: 'ID' },
        { field: 'facturiers.facture.num_facture_lamy', header: 'Numéro de facture' },
        { field: 'facture.facture_date', header: 'Date de facture' },
        {field : 'compte_fournisseur.fournisseur.name', header: 'Fournisseur'},
        

    ];
    const exportColumns = cols.map(col => ({title: col.header, dataKey: col.field}));


    useEffect(() => {
        const currentUser = JSON.parse(localStorage.getItem('user'));
        setUser(currentUser);
        getExtraitList();
    }, []);

    const [position, setPosition] = useState('center');


    const [displayExtrait, setDisplayExtrait] = useState(false);


    const statuses = ['payée', 'non payée '];

    const dialogFuncMap = {
        'displayExtrait': setDisplayExtrait,
        'displayExtraitList': setDisplayExtraitList,
    };


    

    const onClick = (name, position, e, rowData) => {
        e.preventDefault();
      
        if (name === 'displayExtrait') {
          setExtrait(rowData);
        }
        
      
        dialogFuncMap[name](true);
      
        if (position) {
          setPosition(position);
        }
      };

    const onHide = (name) => {
        dialogFuncMap[`${name}`](false);
    };

    const renderFooter = (name) => {
        if (name.className === 'extraitDialog') {
            return (
                <div>
                    <Button label="Ajouter" icon="pi pi-check" onClick={changeStatus} onHide={onHide} />
                </div>
            );
        }
       
    };
    const getExtraitList = async () => {
        const extraitList = await ExtraitDataService.getAll();
        setExtraitList(extraitList.data.data.map(extrait => {
            return {
                num_extrait: extrait.num_extrait,
                value: extrait.extrait_id, 
                montant : extrait.montant,
                date : extrait.date_extrait
            };
        }));
    };

    const saveExtrait = (rowData) => {
        console.log(extrait.facture.facture_id)
        console.log(extrait)
        var data = {
            num_extrait: extrait.num_extrait,
            date_extrait: extrait.date_extrait,
            montant: extrait.montant,
        };
        ExtraitDataService.create(data)
            .then(response => {
                setExtrait({
                    ...extrait,
                    num_extrait: response.data.num_extrait,
                    date_extrait: response.data.date_extrait,
                    montant: response.data.montant,
                });

                setExtrait({
                    ...extrait,
                    num_extrait: "",
                    date_extrait: "",
                    montant: "",
                });
                toastAddon.current.show({ severity: 'success', summary: 'Successful', detail: 'Extrait Added', life: 3000 });
                getExtraitList();
                let extraitId = response.data.extrait_id
                console.log(extraitId);
                const logData = {
                    extrait_id : response.data.extrait_id,
                    description : "Ajout d'un extrait",
                    // user_id : user.id
                }
                LogsDataService.create(logData)
                toastAddon.current.show({ severity: 'success', summary: 'Successful', detail: 'Log Added', life: 3000 });
                // ajouter l'extrait de l'id extraitId au facturier
                // ajouter le log
                var data = {
                    extrait_id: extraitId,
                }
                FacturierDataService.update(extrait.facturier_id, data)
                .then(response => {
                    toastAddon.current.show({ severity: 'success', summary: 'Successful', detail: 'Facturier Updated', life: 3000 });
                })
                // mettre à jour le estpaye de la facture
                var data = {
                    estpaye: true,
                }
                FactureDataService.update(extrait.facture.facture_id, data)
                .then(response => {
                    toastAddon.current.show({ severity: 'success', summary: 'Successful', detail: 'Facture Updated', life: 3000 });
                })
                // Recharger les données du tableau
                fetchData();
            })
            .catch(e => {
                console.log(e);
            });
    };



    const changeStatus = (rowData) => {
        saveExtrait();
        // on récupére l'id de l'extrait qui vient de saveExtrait
       
        
    }


    const fetchData = async () => {
        const response = await FacturierDataService.getAll().then (
            response => {
                if (response.data.data.length > 0) {
                    setFacturiers(response.data.data)
                }
            }
        )
        setLoading(false)
    }

    useEffect(() => {
        fetchData();
        initFilters1();

    }, []);

        
    const formatDate = (value) => {
   
        let date = new Date(value);
        return date.toLocaleDateString()
    }

    const formatCurrency = (value) => {
        return value
        // return value.toLocaleString('fr-BE', { style: 'currency', currency: 'EUR' });
    }

    const numfactureBodyTemplate = (rowData) => {
        return "23/" + rowData.facture.num_facture;

    }
    const numfactureLamyBodyTemplate = (rowData) => {
        console.log(rowData.facture.num_facture_lamy)
        if (rowData.facture.num_facture_lamy === null) {
            return 'Pas de numéro';
        }
        return rowData.facture.num_facture_lamy;

    }
    const numdecompteBodyTemplate = (rowData) => {
        return "N°" + rowData.decompte.num_decompte;

    }

    const dateBodyFactureTemplate = (rowData) => {
        return formatDate(rowData.facture.facture_date);
    }
    const dateBodyExtraitTemplate = (rowData) => {
        if (rowData.extrait === null) {
            return 'Pas d"extrait';
        }
        
        const pathDate = rowData.extrait
        // Invert date
        const date = pathDate.date_extrait.split('-').reverse().join('/');

        return (date);
    }

    const dateFilterTemplate = (options) => {
        return <Calendar value={options.value} onChange={(e) => options.filterCallback(e.value, options.index)} dateFormat="mm/dd/yy" placeholder="mm/dd/yyyy" mask="99/99/9999" />
    }


    const dateBodyDueTemplate = (rowData) => {
        // transformer la due date en date
        const dueDate = new Date(rowData.facture.due_date)


        if (rowData.facture.due_date !== null) {
            console.log(rowData.facture.due_date)
            // Si la due date est dépassée on affiche en rouge mais que la facture est payé, on affiche en vert
            if (dueDate < new Date() && rowData.facture.estpaye === true) {
                // Afficher en vert si la facture est payée
                return <Chip className="mr-2 mb-2 custom-chip-payed" label={formatDate(rowData.facture.due_date)} ></Chip>;
            }
            else if (dueDate < new Date()) {
                // Afficher en rouge si la facture n'est pas payée
                return <Chip className="mr-2 mb-2 custom-chip-not-payed" label={formatDate(rowData.facture.due_date)}></Chip>;
            }
            else {
                return <Chip className="mr-2 mb-2 custom-chip-wait" label={formatDate(rowData.facture.due_date)} ></Chip>;
            }
        }
        else {
            return <Chip icon="pi pi-delete" className="mr-2 mb-2 custom-chip" label="Pas de date d'échéance">Pas de due date</Chip>;
        }
            
           
        
    }


    const balanceBodyTemplate = (rowData) => {
        return formatCurrency(rowData.facture.montant);
    }

    const tvaBalanceBodyTemplate = (rowData) => {
       
        const tva = rowData.facture.tva 
        const montanttva = rowData.facture.montant + (rowData.facture.montant * tva.tva_value/100);
        
        return formatCurrency(montanttva);
    }
    const balanceFilterTemplate = (options) => {
        return <InputNumber value={options.value} onChange={(e) => options.filterCallback(e.value, options.index)} mode="currency" currency="EUR" locale="fr-BE" />
    }



    const statusBodyTemplate = (rowData) => {
        if (loading) {
            return <ProgressBar mode="indeterminate" style={{ height: '6px' }} />
        }
        else {
        if (rowData.facture.estpaye === null) {
            return <p>Il n'y pas de statut pour cette facture</p>
        }
        else if (rowData.facture.estpaye === true) {
            return <Button label="Payée" className="p-button-success" icon="pi pi-check-circle" />;
        }
        else {
            return <Button onClick={(e) => onClick('displayExtrait', 'center', e, rowData)} icon="pi pi-ban" className="p-button-danger" label="Non payée" tooltip='En cliquant sur ce bouton, vous pourrez ajouter l"extrait correspondant à la facture. Cela mettra à jour le statut de la facture en "payée".' tooltipOptions={{ position: 'top' }} />

        }
    }
    }

    
    const numextraitBodyTemplate = (rowData) => {
        if (rowData.extrait === null) {
            return 'Pas d"extrait';
        }
        else {
            return rowData.extrait.num_extrait 
        }
    }
      
    const statusFilterTemplate = (options) => {
        return <Dropdown value={options.value} options={statuses} onChange={(e) => options.filterCallback(e.value, options.index)} itemTemplate={statusItemTemplate} placeholder="Select a Status" className="p-column-filter" showClear />;
    }

    const statusItemTemplate = (option) => {
        return <span className={`customer-badge status-${option}`}>{option}</span>;
    }



    const exportFileName = `facturiers-${new Date().toLocaleDateString('fr-BE', { year: 'numeric', month: 'numeric', day: 'numeric' })}`;

    const exportCSV = (selectionOnly) => {
        dt.current.exportCSV({ selectionOnly });
      }
      


    const clientBodyTemplate = (rowData) => {
        return rowData.compte_client.client.name + ' ' + rowData.compte_client.client.firstname;
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
          'facture.num_facture_lamy': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
          'compte_fournisseur.fournisseur.name': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
          'compte_fournisseur.fournisseur.num_fournisseur': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
          'compte_client.numCompteClient': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
          'compte_client.client.name': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
          'facture.objet.title': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
          'facture.facture_date': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }] },
          'facture.libelle.title': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
          'decompte.num_decompte': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
          'facture.montant': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }] },
          'facture.estpaye': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }] },
          'facture.due_date': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }] },
          'extrait.num_extrait': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
          'extrait.date_extrait': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }] },
        });
        setGlobalFilterValue1('');
      };

    const renderHeader1 = () => {
        return (
            <div className="flex justify-content-between" id="header">
                        <div className="flex align-items-center export-buttons">
                        <Button type="button" icon="pi pi-file" onClick={() => exportCSV(false)} className="mr-2" tooltip="Exporter toutes les données" tooltipOptions={{ position: 'top' }} />
        </div>
                <Button type="button" icon="pi pi-filter-slash" label="Vider les filtres" className="p-button-outlined" onClick={clearFilter1} />
                <span className="p-input-icon-left">
                    <i className="pi pi-search" />
                    <InputText value={globalFilterValue1} onChange={onGlobalFilterChange1} placeholder="Rechercher..." />
                </span>
            </div>
            
        )
    }

    const header1 = renderHeader1();



    if (loading) {
        return <ProgressBar mode="indeterminate" style={{ height: '6px' }} />;
    }

    
    else {
        return (
            
            <div className="container" id ="facturier-container">
            <div className="facturierTable" >
            <Tooltip target=".custom-chip-not-payed" content="Facture non payée" />
            <Tooltip target=".custom-chip-wait" content="Facture en attente de paiement" />
                <Toast ref={toastAddon} />
                {facturiers && (
                    <DataTable  value={facturiers} paginator  rows={10}
                     rowsPerPageOptions={[10,25,50]}
                     rowHover  loading={loading} dataKey="id" ref={dt} exportFilename={exportFileName}
                    emptyMessage="Aucunes données trouvées." scrollable header={header1} columnResizeMode="expand"  paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                    currentPageReportTemplate=" {first} de {last} pour {totalRecords} données" responsiveLayout="scroll" style={{ borderRaduis: '20px' }}
                    globalFilterFields={'facture.num_facture_lamy,compte_fournisseur.fournisseur.name,compte_fournisseur.fournisseur.num_fournisseur,compte_client.numCompteClient,compte_client.client.name,facture.objet.title,facture.facture_date,facture.libelle.title,decompte.num_decompte,facture.montant,facture.estpaye,facture.due_date,extrait.num_extrait,extrait.date_extrait'}>

                    <Column field="facture.num_facture_lamy" header="N° de facture Lamy" sortable filter filterPlaceholder="Rechercher par N°" body={numfactureLamyBodyTemplate} style={{ backgroundColor: '#f8f9fa' }}  />
                    <Column field='compte_fournisseur.fournisseur.name' header="Fournisseur" sortable filter filterPlaceholder="Rechercher par nom"  />
                         
                    <Column field='compte_fournisseur.fournisseur.num_fournisseur' header="N° de fournisseur" sortable  filter filterPlaceholder='Rechercher par N°'></Column>
                    <Column field='compte_client.numCompteClient' header="N° de client" sortable  filter filterPlaceholder='Rechercher par N°'></Column>

                    <Column field='compte_client.client.name' header="Nom et prénom du client" sortable  filter filterPlaceholder='Rechercher par nom ou prénom' body={clientBodyTemplate}></Column>

                    <Column field='facture.objet.title' header="Objet" sortable filter filterPlaceholder='Rechercher par objet...' ></Column>
                    <Column field="facture.facture_date" header="Date de la facture" sortable filterField="date" dataType="date"  body={dateBodyFactureTemplate} filter filterElement={dateFilterTemplate} />
                    <Column field="facture.num_facture" header="N° de facture" sortable filter filterPlaceholder="Rechercher par N°"  body={numfactureBodyTemplate}/>
                    <Column field="facture.libelle.title" header="Libellé" sortable filter filterPlaceholder="Rechercher par libellé"  />
                    <Column field="decompte.num_decompte" header="N° de décompte " sortable filter filterPlaceholder="Rechercher par N°"  body={numdecompteBodyTemplate}/>
                    <Column field="facture.montant" header="Montant de la facture" sortable dataType="numeric"  body={balanceBodyTemplate} filter filterElement={balanceFilterTemplate} />
                    <Column header="Montant avec TVA"  sortable dataType="numeric"  body={tvaBalanceBodyTemplate} filter filterElement={balanceFilterTemplate} sortField="facture.montant" />
                    
                    <Column field="facture.estpaye" header="Status" sortable   body={statusBodyTemplate} filter filterElement={statusFilterTemplate}/>
                    <Column field="facture.due_date" header="Date d'échéance" sortable filterField="date" dataType="date"  body={dateBodyDueTemplate} filter filterElement={dateFilterTemplate} />
                    <Column field="extrait.num_extrait" header="N° extrait" sortable filter filterPlaceholder="Rechercher par N°"  body={numextraitBodyTemplate}  />
                    <Column field="extrait.date_extrait" header="Date extrait" sortable filterField="date" dataType="date"  body={dateBodyExtraitTemplate} filter filterElement={dateFilterTemplate} /> 
                    
                </DataTable> 
                )}
                <Dialog header="Ajouter un extrait" visible={displayExtrait} style={{ width: '50vw' }} footer={renderFooter} onHide={() => onHide('displayExtrait')} className="extraitDialog">
                                <Button onClick={(e) => onClick('displayExtraitList', 'center', e)}  className="p-button-info" badge={extraitList.length} tooltip="Liste des extraits" tooltipOptions={{ position: 'right' }}>
                                    Liste des extraits
                                </Button>
                                    <Dialog header="Liste des extraits" visible={displayExtraitList} style={{ width: '50vw' }} footer={renderFooter} onHide={() => onHide('displayExtraitList')} className="extraitDialog">
                                        <DataTable value={extraitList} paginator rows={10} rowsPerPageOptions={[5, 10, 20]} responsive scrollable scrollHeight="200px" className="p-datatable-customers" dataKey="id" rowHover filterDisplay="menu" loading={loading} emptyMessage="Aucunes données trouvées." currentPageReportTemplate=" {first} de {last} pour {totalRecords} données" responsiveLayout="scroll" style={{ borderRaduis: '20px' }} 
                                        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown" search>
                                            {console.log(extraitList)}
                                            <Column field="label" header="N° de l'extrait" />
                                            <Column field="date" header="Date de l'extrait" />
                                            <Column field="montant" header="Montant de l'extrait" />
                                        </DataTable>
                                    </Dialog>
                                <div class="section-three">

                                    <div className="p-inputgroup" style={{ marginTop: '2em' }}>
                                        <span className="p-inputgroup-addon">
                                            <i class="fa-solid fa-pen-to-square"></i>
                                        </span>
                                        <span className="p-float-label">
                                            <InputText id="num_extrait" type="text" value={extrait.num_extrait} onChange={(e) => setExtrait({ ...extrait, num_extrait: e.target.value })} />
                                            <label htmlFor="extrait">N° de l'extrait</label>
                                        </span>
                                    </div>
                                </div>
                                <div class="section-three">
                                    <div className="p-inputgroup" style={{ marginTop: '2em' }}>
                                        <span className="p-inputgroup-addon">
                                            <i class="fa-solid fa-pen-to-square"></i>
                                        </span>
                                        <span className="p-float-label">
                                            <Calendar id="date_extrait" type="text" value={extrait.date_extrait} onChange={(e) => setExtrait({ ...extrait, date_extrait: e.target.value })} />
                                            <label htmlFor="date_extrait">Date d'extrait</label>
                                        </span>
                                    </div>
                                </div>     
                                <div class="section-three">
                                    <div className="p-inputgroup" style={{ marginTop: '2em' }}>
                                        <span className="p-inputgroup-addon">
                                            <i class="fa-solid fa-pen-to-square"></i>
                                        </span>
                                        <span className="p-float-label">
                                            <InputText id="montant_extrait" type="text" value={extrait.montant} onChange={(e) => setExtrait({ ...extrait, montant: e.target.value })} />
                                            <label htmlFor="montant_extrait">Montant d'extrait</label>
                                        </span>
                                    </div>
                                </div>                             
                            </Dialog>
                <Dialog
                    header={`Facture n° ${extrait.facture.num_facture}`}
                    visible={displayExtrait}
                    style={{ width: '50vw' }}
                    onHide={() => onHide('displayExtrait')}
                    footer={renderFooter}
                    className='extraitDialog'
                    tooltipOptions={{ position: 'right' }}
                    tooltip='Liste des extraits'

                    >
                    
                                <Button onClick={(e) => onClick('displayExtraitList', 'center', e)}  className="p-button-info" badge={extraitList.length} tooltip="Liste des extraits" tooltipOptions={{ position: 'right' }}>
                                    Liste des extraits
                                </Button>
                                    <Dialog header="Liste des extraits" visible={displayExtraitList} style={{ width: '50vw' }} footer={renderFooter} onHide={() => onHide('displayExtraitList')} className="extraitDialog">
                                        <DataTable value={extraitList} paginator rows={10} rowsPerPageOptions={[5, 10, 20]} responsive>
                                            <Column field="num_extrait" header="N° de l'extrait" />
                                            <Column field="date" header="Date de l'extrait" />
                                            <Column field="montant" header="Montant de l'extrait" />
                                        </DataTable>
                                    </Dialog>
                                <div class="section-three">
                                    {/* radio button pour indiquer si la facture est payé ou pas */}
                                    <div className="p-inputgroup" style={{ marginTop: '2em' }}>
                                        <span className="p-inputgroup-addon">
                                            <i class="fa-solid fa-pen-to-square"></i>
                                        </span>
                                        <span className="p-float-label">
                                            <InputText id="num_extrait" type="text" value={extrait.num_extrait} onChange={(e) => setExtrait({ ...extrait, num_extrait: e.target.value })} />
                                            <label htmlFor="extrait">N° de l'extrait</label>
                                        </span>
                                    </div>
                                </div>
                                <div class="section-three">
                                    <div className="p-inputgroup" style={{ marginTop: '2em' }}>
                                        <span className="p-inputgroup-addon">
                                            <i class="fa-solid fa-pen-to-square"></i>
                                        </span>
                                        <span className="p-float-label">
                                            <Calendar id="date_extrait" type="text" value={extrait.date_extrait} onChange={(e) => setExtrait({ ...extrait, date_extrait: e.target.value })} />
                                            <label htmlFor="date_extrait">Date d'extrait</label>
                                        </span>
                                    </div>
                                </div>
                                <div class="section-three">
                                    <div className="p-inputgroup" style={{ marginTop: '2em' }}>
                                        <span className="p-inputgroup-addon">
                                            <i class="fa-solid fa-pen-to-square"></i>
                                        </span>
                                        <span className="p-float-label">
                                            <InputText id="montant_extrait" type="text" value={extrait.montant} onChange={(e) => setExtrait({ ...extrait, montant: e.target.value })} />
                                            <label htmlFor="montant_extrait">Montant d'extrait</label>
                                        </span>
                                    </div>
                                </div>
                            </Dialog>


               

                </div>
            </div>
        )
    }
}
    export default FacturierDatatable





    

