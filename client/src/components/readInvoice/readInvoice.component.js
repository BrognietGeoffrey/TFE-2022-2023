import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './readInvoice.css';
import { Card } from 'primereact/card';
import { Dropdown } from 'primereact/dropdown';
import ClientDataService from "../../services/clientService";
import FactureService from "../../services/factureService";
import TvaService from "../../services/tva.services";



const  ReadInvoice = () => {
    const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);
    const [clients, setClients] = useState([]);
    const [tvas, setTvas] = useState([]);

  const getClients = () => {
    ClientDataService.getAll()
        .then(response => {
            console.log(response.data);
            setClients(response.data);
        })
        .catch(e => {
            console.log(e);
        });
};

    

const getTvas = () => {
    TvaService.getAll()
        .then(response => {
            console.log(response.data);
            setTvas(response.data);
        })
        .catch(e => {
            console.log(e);
        });
};


useEffect(() => {
    getClients();
    getTvas();
}, []);


  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();

    if (!file) {
      alert('Please select a file.');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    axios
      .post('/api/ocr-mindee', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((response) => {
        setResult(response.data);
        console.log(response.data);

      })
      .catch((error) => {
        console.log(error);
      });
  };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setResult({ ...result, [name]: value });
        };
        
    const handleAddInvoice = (event) => {
        event.preventDefault();
        const dataFacture = {
            num_facture: result.invoiceNumber.value,
            num_facture_lamy: result.invoiceNumber.value,
            facture_date: result.date.value,
            montant: result.totalAmount.value,
            estpaye: false,
            objet_id: dataFacture.objet_id,
            libelle_id: dataFacture.libelle_id,
            tva_id: dataFacture.tva_id,
        };
        FactureService.create(dataFacture)
            .then(response => {
                setResult({
                    num_facture: response.data.num_facture,
                    num_facture_lamy: response.data.num_facture_lamy,
                    facture_date: response.data.facture_date,
                    montant: response.data.montant,
                    estpaye: response.data.estpaye,
                    objet_id: response.data.objet_id,
                    libelle_id: response.data.libelle_id,
                    tva_id: response.data.tva_id,
                });
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    };






    return (
        <div id="read-invoice">
      <form onSubmit={handleFormSubmit}>
        <label>
          Select file:
          <input type="file" onChange={handleFileChange} />
        </label>
        <button type="submit">Submit</button>
      </form>
      {result && (
<Card className="card">
  <div variant="body2" color="textSecondary" component="p">
    <form onSubmit={handleAddInvoice}>
      <label>
        Invoice Number:
        <input type="text" value={result.invoiceNumber.value} onChange={handleInputChange} name="invoiceNumber" />
      </label>
      <label>
        Invoice Date:
        <input type="text" value={result.date.value} onChange={handleInputChange} name="date" />
      </label>
      <label>
        Invoice Due Date:
        <input type="text" value={result.dueDate.value} onChange={handleInputChange} name="dueDate" />
      </label>
      <label>
        Invoice Total:
        <input type="text" value={result.totalAmount.value} onChange={handleInputChange} name="totalAmount" />
      </label>
      <label>
        Invoice Tax:
        <input type="text" value={result.taxes[0].rate} onChange={handleInputChange} name="taxRate" />
      </label>
      <label>
        Invoice Subtotal:
        <input type="text" value={result.totalTax.value} onChange={handleInputChange} name="totalTax" />
      </label>
      <label>
        Invoice Company Name:
        <input type="text" value={result.supplierName.value} onChange={handleInputChange} name="supplierName" />
      </label>
      <label>
        Invoice Company Address:
        <input type="text" value={result.supplierAddress.value} onChange={handleInputChange} name="supplierAddress" />
      </label>
      <Dropdown value={result.clientName.value} onChange={handleInputChange} name="clientName" options={clients} optionLabel="name" placeholder="Select a Client" />
      <button type="submit">Add to invoice</button>
    </form>
  </div>
</Card>
        )}


    </div>
    )

}

export default ReadInvoice;


