import React, { useState, useEffect, useRef } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Toast } from 'primereact/toast';
import ExtraitDataService from '../../services/extraitService';
import './allData.css';

const AllData = () => {

    const [extraits, setExtraits] = useState([]);
    const [expandedRows, setExpandedRows] = useState([]);
    const toast = useRef(null);
  

    const getExtrait = () => {
        ExtraitDataService.getAll()
            .then(response => {
                setExtraits(response.data);
                console.log(response.data);
                // trier les données par date
                setExtraits(response.data.sort((a, b) => (a.date_extrait > b.date_extrait) ? 1 : -1));
            })
            .catch(e => {
                console.log(e);
            });
    };

    useEffect(() => {
        getExtrait();
    }, []);

    const headerTemplate = (data) => {
        return (
     
            <span style={{ marginLeft: '1em' }}>{data.date_extrait}</span>
    
        );
    };
      


    const onRowGroupExpand = (event) => {
        toast.current.show({ severity: 'info', summary: 'Groupe agrandi', detail: 'Value: ' + event.data.date_extrait, life: 3000 });
    }

    const onRowGroupCollapse = (event) => {
        toast.current.show({ severity: 'success', summary: 'Groupe réduit', detail: 'Value: ' + event.data.date_extrait, life: 3000 });
    }



    return (
        <div className="datatable-rowgroup-demo">
            <Toast ref={toast}></Toast>
            <div className="card">
                
                <DataTable value={extraits} rowGroupMode="subheader" groupRowsBy="date_extrait"
                    sortMode="single" sortField="date_extrait" sortOrder={1} responsiveLayout="scroll"
                    expandableRowGroups expandedRows={expandedRows} onRowToggle={(e) => setExpandedRows(e.data)}
                    onRowExpand={onRowGroupExpand} onRowCollapse={onRowGroupCollapse}
                    rowGroupHeaderTemplate={headerTemplate} >
                    <Column field="" header="Date de l'extrait"></Column>
                    <Column field="num_extrait" header="Numéro de l'extrait" sortable></Column>
                    <Column field="montant" header="Montant" sortable></Column>
                    <Column field="description" header="Description" sortable></Column>
                </DataTable>
            </div>
        </div>
    );
}

export default AllData;
