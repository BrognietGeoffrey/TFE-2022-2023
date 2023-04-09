import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import React, { useState, useEffect } from 'react';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { InputNumber } from 'primereact/inputnumber';
import { Dropdown } from 'primereact/dropdown';
import { Calendar } from 'primereact/calendar';
import { Dialog } from 'primereact/dialog';
import createViewService from '../services/createViewService';
import viewServices from '../services/viewServices';
import { Col } from 'react-bootstrap';
export const CustomViewForm = () => {
    const [table, setTable] = useState(null);
    const [tables, setTables] = useState([
        { label: 'Facture', value: 'factures' },
        { label: 'Client', value: 'clients' },
        { label: 'Facturiers', value: 'facturiers' },
        
    ]);
    const operators = [
        { label: 'Egal', value: '=', type: 3 },
        { label: 'Différent', value: '!=', type: 1 },
        { label: 'Supérieur', value: '>', type: 1 },
        { label: 'Inférieur', value: '<', type: 1 },
        { label: 'Supérieur ou égal', value: '>=', type: 1 },
        { label: 'Inférieur ou égal', value: '<=', type: 1 },
        { label: 'Compris entre', value: 'BETWEEN', type: 2 },
        { label: 'Commence par', value: 'LIKE', type: 3 },
        { label: 'Contient', value: 'LIKE', type: 3 },
        { label: 'Est nul', value: 'IS NULL', type: 0 },
        { label: 'N\'est pas nul', value: 'IS NOT NULL', type: 0 }
    ];
    const [operator, setOperator] = useState(null);
    const [columns, setColumns] = useState([]);
    const [column, setColumn] = useState(null);
    const [valueParam1, setValueParam1] = useState(null);
    const [valueParam2, setValueParam2] = useState(null);
    const [valueDate1, setValueDate1] = useState(null);
    const [valueDate2, setValueDate2] = useState(null);
    const [valueQuery, setValueQuery] = useState(null);
    const [viewName, setViewName] = useState("");
    const [viewResult, setViewResult] = useState(null);
    const [responseView, setResponseView] = useState(null);
    const [allViews, setAllViews] = useState([]);
    const [displayAllViews, setDisplayAllViews] = useState(false);
    const [position, setPosition] = useState('center');
    const [checked1, setChecked1] = useState(false);
    const [expandedRows, setExpandedRows] = useState([]);




    const dialogFuncMap = {
        'displayAllViews': setDisplayAllViews,

    };

    const onClick = (name, position, e) => {
        e.preventDefault(); // add this line to prevent the default behavior

        dialogFuncMap[`${name}`](true);

        if (position) {
            setPosition(position);
        }
    };


    const handleTableChange = (e) => {
        setTable(e.value);
        handleColumnChange(e);
    };

    const handleOperatorChange = (e) => {
        setOperator(e.value);
    };



    const getAllViews = () => {
        setDisplayAllViews(true);
    };

    const retrieveAllViews = async () => {
        const response = await viewServices.getAllView();
        // ajouter un id à chaque vue
        setAllViews(response.data.resultView);
        console.log(response.data);
        for (let i = 0; i < response.data.resultView.length; i++) {
            response.data.resultView[i].id = i;
        }
    };


    useEffect( () => {
         retrieveAllViews();
    }, []);


    // selon la table sélectionnée, on récupère les colonnes de la table
    const handleColumnChange = (e) => {
        const table = e.value;
        const columns = [];
        switch (table) {
            case 'factures':
                columns.push({ label: 'Date', value: 'facture_date', type: 'date', joinsTable: 'factures' });
                columns.push({ label: 'Montant', value: 'montant', type: 'number', joinsTable: 'factures', });
                columns.push({ label: 'Payé', value: 'estpaye', type: 'boolean', joinsTable: 'factures' });
                columns.push({ label: 'Libélle', value: 'libelleTitle', valueQuery: "title", type: "string", joinsTable: 'libelles', conditionJoins: "factures.libelle_id = libelles.id" });
                columns.push({ label: 'Objets', value: 'title', type: "string", joinsTable: 'objets', conditionJoins: "factures.objet_id = objets.id" });
                break;
            case 'clients':
                columns.push({ label: 'Nom', value: 'name', type: 'string', joinsTable: 'clients' });
                break;
            case 'facturiers':
                columns.push({ label: 'Montant de la facture', value: 'factures.montant', type: 'number', joinsTable: 'factures', conditionJoins: "factures.facture_id = facturiers.facture_id" });
        }
        setColumns(columns);
    };

    function formatDate(timestamp) {
        const date = new Date(timestamp);
        const year = date.getFullYear();
        const month = ("0" + (date.getMonth() + 1)).slice(-2);
        const day = ("0" + date.getDate()).slice(-2);
        return `${year}/${month}/${day}`;
    }

    const submitView = () => {
        const columnObj = columns.find((c) => c.value === column);
        const attributeForRequest = columnObj.valueQuery || columnObj.value;
        const view_name = viewName;
        let value, joins;
        if (operator === 'BETWEEN') {
            if (columnObj.type === 'date') {
                value = [formatDate(valueDate1), formatDate(valueDate2)];
            } else if (columnObj.type === 'number') {
                value = [valueParam1, valueParam2];
                joins = [{
                    table: columnObj.joinsTable,
                    condition: columnObj.conditionJoins,
                    type: 'INNER'
                }];
            }
        } else if (['number', 'boolean', 'string'].includes(columnObj.type)) {
            value = valueParam1;
            console.log(value);
            joins = [{
                table: columnObj.joinsTable,
                condition: columnObj.conditionJoins,
                type: 'INNER'
            }];
        } else if (columnObj.type === 'date') {
            value = formatDate(valueDate1);
        }
        const filters = [{
            attribute: attributeForRequest,
            operator,
            value
        }];
        const joinsArray = joins ? joins : [];
        createViewService.createView(table, filters, joinsArray, view_name)
            .then((response) => {
                console.log(response);
                setResponseView(response.data.view);
                // vider les champs
                resetForm();

            })
            .catch((error) => {
                console.log(error);
            });
    };
    const resetForm = () => {
        setTable(null);
        setOperator(null);
        setColumns([]);
        setColumn(null);
        setValueParam1(null);
        setValueParam2(null);
        setValueDate1(null);
        setValueDate2(null);
        setValueQuery(null);
        setViewName("");
        setResponseView(null);
    };
    const [selectedView, setSelectedView] = useState(null);


    const onHide = (dialogName) => {
        setDisplayAllViews(false);
        setSelectedView(null);
      };
    
      const viewTemplate = (rowData) => {
        return (
          <>
            <Button icon={selectedView === rowData ? 'pi pi-minus' : 'pi pi-plus'} onClick={() => setSelectedView(rowData)} />
            <span style={{ paddingLeft: 10 }}>{rowData.viewname}</span>
          </>
        );
      };
    
      

    return (
        <div className="container">
            <div class="card">
                <div class="card-title">
                <h2 class="title"><i class="fa-solid fa-eye">Zone des vues </i></h2>
                </div>  
                <div class="card-body">
                    Ici vous pouvez créer des vues personnalisées
                </div>
                <div class="card-content">
                <div>
            <div>
                {/* choix du nom de la vue */}
               <h1>Choix du nom de la vue</h1>
             <div>
                   <InputText
                        value={viewName}
                        onChange={(e) => setViewName(e.target.value)}
                        placeholder="Nom de la vue" />
                </div>
                <h1>Sur quelles données voulez-vous créer la vue ?</h1>
                <div>

                    <Dropdown
                        value={table}
                        options={tables}
                        onChange={handleTableChange}
                        placeholder="Sélectionnez une table" />
                </div>
                Et maintenant, choisissez une partie à trier :
                <div>
                    <Dropdown
                        value={column}
                        options={columns}
                        onChange={(e) => setColumn(e.value)}

                        placeholder="Sélectionnez une colonne" />
                </div>
                <div>
                    <h1>Et enfin comment voulez-vous trier cette donnée ?</h1>
                    {/* si la colonne est de type number, on affiche les opérateurs de type 1 et 2, si non, on affiche juste les 1 */}
                    {columns.length > 0 && column && (columns.find((c) => c.value === column).type === 'date' || columns.find((c) => c.value === column).type === 'number') && (

                        // console.log les opérateurs de type 1 et 2
                        <Dropdown
                            value={operator}
                            options={operators.filter((o) => o.type === 1 || o.type === 2 || o.type === 3)}
                            onChange={(e) => setOperator(e.value)}
                            placeholder="Sélectionnez un opérateur" />
                    )}
                    {columns.length > 0 && column && columns.find((c) => c.value === column).type === 'boolean' && (
                        <Dropdown
                            value={operator}
                            options={operators.filter((o) => o.type === 0)}
                            onChange={(e) => setOperator(e.value)}
                            placeholder="Sélectionnez un opérateur" />
                    )}
                    {columns.length > 0 && column && columns.find((c) => c.value === column).type === 'string' && (
                        <Dropdown
                            value={operator}
                            options={operators.filter((o) => o.type === 3)}
                            onChange={(e) => setOperator(e.value)}
                            placeholder="Sélectionnez un opérateur" />
                    )}
                </div>

                {/* selon le type de la colonne, on affiche un composant différent */}
                {columns.find((c) => c.value === column)?.type === 'number' && (
                    <>
                        <InputNumber
                            value={valueParam1}
                            onChange={(e) => setValueParam1(e.value)}
                            placeholder="Valeur"
                        />
                        {operator === 'BETWEEN' && (
                            <InputNumber
                                value={valueParam2}
                                onChange={(e) => setValueParam2(e.value)}
                                placeholder="Valeur"
                            />
                        )}
                    </>
                )}
                {columns.length > 0 && column && columns.find((c) => c.value === column).type === 'date' && (
                    // si l'opérateur est compris entre, on affiche deux calendriers
                    operator === 'BETWEEN' ? (
                        <div>
                            <Calendar
                                value={valueDate1}
                                onChange={(e) => setValueDate1(e.value)}
                                placeholder="Valeur"

                                showIcon />
                            <Calendar
                                value={valueDate2}
                                onChange={(e) => setValueDate2(e.value)}
                                placeholder="Valeur" />
                        </div>
                    ) : (
                        <div>
                            <Calendar
                                value={valueDate1}
                                onChange={(e) => setValueDate1(e.value)}
                                placeholder="Valeur" />
                        </div>
                    )
                )}
                {columns.length > 0 && column && columns.find((c) => c.value === column).type === 'string' && (
                    <div>
                        <InputText
                            value={valueQuery}
                            onChange={(e) => setValueParam1(e.target.value)}
                            placeholder="Valeur" />
                    </div>
                )}
            </div>
            <Button label="Créer la vue" onClick={submitView} />
        </div>
                </div>
                <div class="card-footer">
                    {/* afficher le nombre de vues déjà créées */}
                    <h1>Nombre de vues déjà créées : {allViews? allViews.length : 0}</h1>
                    {/* bouton pour afficher la liste des vues déjà créées */}
                    <Button label="Voir les vues" onClick={getAllViews} />
                    {/* afficher la liste des vues */}
                    <Dialog header="Liste des vues" visible={displayAllViews} style={{ width: '70%' }} footer={null} onHide={() => onHide('displayAllViews')}>
                    <DataTable value={allViews} selection={selectedView} onSelectionChange={(e) => setSelectedView(e.value)}>
                        <Column header="Nom de la vue" body={viewTemplate} style = {{width: '20%'}}></Column>
                        <Column header="Données" body={(rowData) => {
                        if (selectedView === rowData) {
                            // si la table de rowData est factures, on affiche les données de factures
                            if (rowData.table === 'factures') {
                                return (
                                    <DataTable value={rowData.data}>
                                        <Column field="facture_date" header="Date"></Column>
                                        <Column field="montant" header="Montant"></Column>
                                    </DataTable>
                                );
                            }
                            else if (rowData.table === 'clients') {
                                return (
                                    <DataTable value={rowData.data}>
                                        <Column field="name" header="Nom"></Column>
                                        <Column field="firstname" header="Prénom"></Column>
                                    </DataTable>
                                );
                            }
                        }
                        // si rowData.data a une longueur supérieure à 0, on affiche les données de rowData.data
                        if (rowData.data.length > 0) {
                            return (
                                <div>Il y a {rowData.data.length} données pour cette view</div>
                            );
                        }
                        return (
                            <div>Il n'y a pas de données</div>
                        );

                        }}></Column>
                    </DataTable>
                    </Dialog>
                </div>     
            </div>
        </div>
    );
};

export default CustomViewForm;
