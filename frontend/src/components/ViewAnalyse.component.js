import React, { useState } from 'react';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { InputNumber } from 'primereact/inputnumber';
import { Dropdown } from 'primereact/dropdown';
import { Calendar } from 'primereact/calendar';
import { Checkbox } from 'primereact/checkbox';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import createViewService from '../services/createViewService';

export const CustomViewForm = () => {
    const [table, setTable] = useState(null);
    const [tables, setTables] = useState([
        { label: 'Facture', value: 'factures' },


    ]);
    const operators = [
        { label: 'Egal', value: '=' },
        { label: 'Différent', value: '!=' },
        { label: 'Supérieur', value: '>' },
        { label: 'Inférieur', value: '<' },
        { label: 'Supérieur ou égal', value: '>=' },
        { label: 'Inférieur ou égal', value: '<=' },
        { label: 'Compris entre', value: 'BETWEEN' },
        { label: 'Commence par', value: 'LIKE' },
        { label: 'Contient', value: 'LIKE' },
        { label: 'Est nul', value: 'IS NULL' },
        { label: 'N\'est pas nul', value: 'IS NOT NULL' },
    ];
    const [operator, setOperator] = useState(null);

    const [columns, setColumns] = useState([]);
    const [column, setColumn] = useState(null);
    const [valueParam1, setValueParam1] = useState(null);
    const [valueParam2, setValueParam2] = useState(null);
    const [viewName, setViewName] = useState(null);

    const handleTableChange = (e) => {
        setTable(e.value);
        handleColumnChange(e);
    }

    const handleOperatorChange = (e) => {
        setOperator(e.value);
    }

    // selon la table sélectionnée, on récupère les colonnes de la table
    const handleColumnChange = (e) => {
        const table = e.value;
        const columns = [];
        switch (table) {
            case 'factures':
               
                columns.push({ label: 'Date', value: 'facture_date', type: 'date' });
                columns.push({ label: 'Montant', value: 'montant', type: 'number' });
                columns.push({ label: 'Payé', value: 'estpaye' });

                break;
            case 'clients':
                columns.push({ label: 'Nom', value: 'nom' });
                columns.push({ label: 'Prénom', value: 'prenom' });
                columns.push({ label: 'Adresse', value: 'adresse' });
                columns.push({ label: 'Code postal', value: 'codepostal' });
                columns.push({ label: 'Ville', value: 'ville' });
                columns.push({ label: 'Téléphone', value: 'telephone' });
                columns.push({ label: 'Email', value: 'email' });
                columns.push({ label: 'Date de naissance', value: 'datenaissance', type: 'date' });
            
        }
        setColumns(columns);
    }

    function formatDate(timestamp) {
        const date = new Date(timestamp);
        const year = date.getFullYear();
        const month = ("0" + (date.getMonth() + 1)).slice(-2);
        const day = ("0" + date.getDate()).slice(-2);
        return `${year}/${month}/${day}`;
      }

    const submitView = () => {
        if (operator === 'BETWEEN') {
            const value = [valueParam1, valueParam2];
            const attribute = column;
            const filters = [
                {
                    attribute,
                    operator,
                    value
                },
            ];
            const joins = [];
            const view_name = 'test';
            createViewService.createView(table, filters, joins, view_name)
                .then((response) => {
                    console.log(response);
                })
                .catch((error) => {
                    console.log(error);
                });
        }
        
    //    si la colonne est de type date, on convertit la date en yyy/mm/dd
        if (columns.length > 0 && column && columns.find((c) => c.value === column).type === 'date') {
            const value = formatDate(valueParam1);
            const attribute = column;
            const filters = [
                {
                    attribute,
                    operator,
                    value
                },
            ];
            const joins = [];
            const view_name = 'test';
            createViewService.createView(table, filters, joins, view_name)

                .then((response) => {
                    console.log(response);
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }









  return (
    <div> 
        <div>
            {/* choix du nom de la vue */}
            <h1>Choix du nom de la vue</h1>
            <div>
                <InputText
                    value={viewName}
                    onChange={(e) => setViewName(e.target.value)}
                    placeholder="Nom de la vue"
                />
            </div>
            <h1>Choix de la table et de la colonne</h1>
            <div>
                <Dropdown
                    value={table}
                    options={tables}
                    onChange={handleTableChange}
                    placeholder="Sélectionnez une table"
                />
            </div>
            <div>
            <h1>Choix de l'opérateur</h1>
            <div>
                <Dropdown
                    value={operator}
                    options={operators}
                    onChange={(e) => setOperator(e.value)}
                    placeholder="Sélectionnez un opérateur"
                />
            </div>
        </div>
            <div>
                <Dropdown
                    value={column}
                    options={columns}
                    onChange={ (e) => setColumn(e.value)}

                    placeholder="Sélectionnez une colonne"
                />
            </div>
            {/* selon le type de la colonne, on affiche un composant différent */}
            {columns.length > 0 && column && columns.find((c) => c.value === column).type === 'number' && (
                <div>
                    <InputNumber
                        value={valueParam1}
                        onChange={(e) => setValueParam1(e.value)}
                        placeholder="Valeur"
                    />
                </div>
            )}
            {columns.length > 0 && column && columns.find((c) => c.value === column).type === 'date' && (
                // si l'opérateur est compris entre, on affiche deux calendriers
                operator === 'BETWEEN' ? (
                    <div>
                        <Calendar
                            value={valueParam1}
                            onChange={(e) => setValueParam1(e.value)}
                            placeholder="Valeur"
                            
                             showIcon
                        />
                        <Calendar
                            value={valueParam2}
                            onChange={(e) => setValueParam2(e.value)}
                            placeholder="Valeur"
                         
                        />
                    </div>
                ) : (
                    <div>
                        <Calendar
                            value={valueParam1}
                            onChange={(e) => setValueParam1(e.value)}
                            placeholder="Valeur"
                           
                           
                        />
                    </div>
                )
            )}
           
        </div>
        <Button label="Créer la vue" onClick={submitView} />
        
    </div>
    );
};





export default CustomViewForm