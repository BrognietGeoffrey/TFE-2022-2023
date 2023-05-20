
// *************************************************************************************************
// ***************************************** TEST CREATE FACTURE ***********************************
// *************************************************************************************************
const {validFormBodyFacture} = require('../controllers/facture.controller');
const {validFormBodyLibelle, validFormBodyObjet} = require('../controllers/facturedetails.controller');
const {validFormBodyTva} = require('../controllers/tva.controller');
var httpMocks = require('node-mocks-http');
var assert = require('assert');

describe('facture.controller', () => {
    it('validFormBodyFacture should return true with valid body', () => {
      let request = httpMocks.createRequest({
        body: {
            num_facture: "123456789",
            num_facture_lamy: "123456789",
            facture_date: "2020-01-01",
            due_date: "2020-01-01",
            montant: 100,
            objet_id: 1,
            libelle_id: 1,
            tva_id: 1,
        }
      });
        let response = httpMocks.createResponse();  
        validFormBodyFacture(request.body);
        assert.equal(response.statusCode, 200);

    });
});

// Modify with valid body
describe('facture.controller', () => {
    it('validFormBodyFacture should return true with valid body', () => {
        let request = httpMocks.createRequest({
            body: {
                facture_id : 3,
                num_facture: "123456789",
                num_facture_lamy: "123456789",
                facture_date: "2020-01-01",
                due_date: "2020-01-01",
                montant: 100,
                objet_id: 1,
                libelle_id: 1,
                tva_id: 1,
            }
        });
        let response = httpMocks.createResponse();
        validFormBodyFacture(request.body);
        assert.equal(response.statusCode, 200);
        
    });
});

// Modify with invalid body
describe('facture.controller', () => {
    it('validFormBodyFacture should return true with valid body', () => {
        let request = httpMocks.createRequest({
            body: {
                facture_id : 3,
                
                num_facture_lamy: "123456789",
                facture_date: "2020-01-01",
                due_date: "2020-01-01",
                montant: 100,
                objet_id: 1,
                libelle_id: 1,
                tva_id: 1,
            }
        });
    
        assert.throws(() => {
            validFormBodyFacture(request.body);
          }, Error, "Numéro de facture obligatoire"
        );

        
    });
});






// Test sans aucun body 
describe('facture.controller', () => {
    it('validFormBodyFacture should return false with empty body', () => {
      let request = httpMocks.createRequest({
        undefined
      });
        assert.throws(() => {
            validFormBodyFacture(request);
          } 
        );


    });
}
);

// Test sans num_facture
describe('facture.controller', () => {
    it('validFormBodyFacture should return false with empty num_facture', () => {
      let request = httpMocks.createRequest({
        body: {
            num_facture: "",
            num_facture_lamy: "123456789",
            facture_date: "2020-01-01",
            due_date: "2020-01-01",
            montant: 100,
            objet_id: 1,
            libelle_id: 1,
            tva_id: 1,
        }
      });
        assert.throws(() => {
            validFormBodyFacture(request.body);
          }, Error, "Numéro de facture obligatoire"
        );
          
    });
}
);

// Test sans num_facture_lamy
describe('facture.controller', () => {
    it('validFormBodyFacture should return false with empty num_facture_lamy', () => {
      let request = httpMocks.createRequest({
        body: {
            num_facture: "123456789",
            num_facture_lamy: "",
            facture_date: "2020-01-01",
            due_date: "2020-01-01",
            montant: 100,
            objet_id: 1,
            libelle_id: 1,
            tva_id: 1,
        }
      });
        assert.throws(() => {
            validFormBodyFacture(request.body);
          }, Error, "Numéro de facture Lamy obligatoire"
        );
          
    });
}
);

// Test sans facture_date
describe('facture.controller', () => {
    it('validFormBodyFacture should return false with empty facture_date', () => {
      let request = httpMocks.createRequest({
        body: {
            num_facture: "123456789",
            num_facture_lamy: "123456789",
            due_date: "2020-01-01",
            montant: 100,
            objet_id: 1,
            libelle_id: 1,
            tva_id: 1,
        }
      });
        assert.throws(() => {
            validFormBodyFacture(request.body);
          }, Error, "Date de facture obligatoire"
        );
          
    });
}  
);

// Test sans libelle_id
describe('facture.controller', () => {
    it('validFormBodyFacture should return false with empty libelle_id', () => {
      let request = httpMocks.createRequest({
        body: {
            num_facture: "123456789",
            num_facture_lamy: "123456789",
            facture_date: "2020-01-01",
            due_date: "2020-01-01",
            montant: 100,
            objet_id: 1,
            libelle_id: "",
            tva_id: 1,
        }
      });
        assert.throws(() => {
            validFormBodyFacture(request.body);
          }, Error, "Libellé obligatoire"
        );
          
    });
}
);

// Test sans tva_id
describe('facture.controller', () => {
    it('validFormBodyFacture should return false with empty tva_id', () => {
      let request = httpMocks.createRequest({
        body: {
            num_facture: "123456789",
            num_facture_lamy: "123456789",
            facture_date: "2020-01-01",
            due_date: "2020-01-01",
            montant: 100,
            objet_id: 1,
            libelle_id: 1,
            tva_id: "",
        }
      });
        assert.throws(() => {
            validFormBodyFacture(request.body);
          }, Error, "TVA obligatoire"
        );
          
    });
}
);

// Test sans objet_id
describe('facture.controller', () => {
    it('validFormBodyFacture should return false with empty objet_id', () => {
      let request = httpMocks.createRequest({
        body: {
            num_facture: "123456789",
            num_facture_lamy: "123456789",
            facture_date: "2020-01-01",
            due_date: "2020-01-01",
            montant: 100,
            objet_id: "",
            libelle_id: 1,
            tva_id: 1,
        }
      });
        assert.throws(() => {
            validFormBodyFacture(request.body);
          }, Error, "Objet obligatoire"
        );
          
    });
}
);

// Test sans montant
describe('facture.controller', () => {
    it('validFormBodyFacture should return false with empty montant', () => {
      let request = httpMocks.createRequest({
        body: {
            num_facture: "123456789",
            num_facture_lamy: "123456789",
            facture_date: "2020-01-01",
            due_date: "2020-01-01",
            objet_id: 1,
            libelle_id: 1,
            tva_id: 1,
        }
      });
        assert.throws(() => {
            validFormBodyFacture(request.body);
          }, Error, "Montant obligatoire"
        );
          
    });
}
);

// *********************************************************************************************************************
// ************************************************** TESTS CREATE LIBELLE *********************************************
// *********************************************************************************************************************
// Test avec body complet
describe('libelle.controller', () => {
    it('validFormBodyLibelle should return true with full body', () => {
      let request = httpMocks.createRequest({
        body: {
            title: "test",
     
        }
      });
        let response = httpMocks.createResponse();  
        validFormBodyLibelle(request.body);
        assert.equal(response.statusCode, 200);

    });
}
);

// Test sans body
describe('libelle.controller', () => {
    it('validFormBodyLibelle should return false with empty body', () => {
      let request = httpMocks.createRequest({
        body: {
            
        }
      });
        assert.throws(() => {
            validFormBodyLibelle(request);
          }
        );
        });
}
);

// Test sans title
describe('libelle.controller', () => {
    it('validFormBodyLibelle should return false with empty title', () => {
      let request = httpMocks.createRequest({
        body: {
            title: "",
     
        }
      });
        assert.throws(() => {
            validFormBodyLibelle(request.body);
          }, Error, "Titre obligatoire"
        );
          
    });
}
);

// *********************************************************************************************************************
// ************************************************** TESTS CREATE OBJET ***********************************************
// *********************************************************************************************************************

// Test avec body complet
describe('objet.controller', () => {
    it('validFormBodyObjet should return true with full body', () => {
      let request = httpMocks.createRequest({
        body: {
            title: "test",
     
        }
      });
        let response = httpMocks.createResponse();  
        validFormBodyObjet(request.body);
        assert.equal(response.statusCode, 200);

    });
}

);

// Test sans body
describe('objet.controller', () => {
    it('validFormBodyObjet should return false with empty body', () => {
      let request = httpMocks.createRequest({
        body: {
            
        }
      });
        assert.throws(() => {
            validFormBodyObjet(request);
          }
        );
        });
}

);

// Test sans title
describe('objet.controller', () => {
    it('validFormBodyObjet should return false with empty title', () => {
      let request = httpMocks.createRequest({
        body: {
            title: "",
     
        }
      });
        assert.throws(() => {
            validFormBodyObjet(request.body);
          }, Error, "Titre obligatoire"
        );
          
    });
}

);

// *********************************************************************************************************************
// ************************************************** TESTS CREATE TVA *************************************************
// *********************************************************************************************************************

// Test avec body complet
describe('tva.controller', () => {
    it('validFormBodyTva should return true with full body', () => {
      let request = httpMocks.createRequest({
        body: {
            tva_value: "12",
     
        }
      });
        let response = httpMocks.createResponse();  
        validFormBodyTva(request.body);
        assert.equal(response.statusCode, 200);

    });
}

);

// Test sans body
describe('tva.controller', () => {
    it('validFormBodyTva should return false with empty body', () => {
      let request = httpMocks.createRequest({
        body: {
            
        }
      });
        assert.throws(() => {
            validFormBodyTva(request);
          }
        );
        });
}

);

// Test sans tva_value
describe('tva.controller', () => {
    it('validFormBodyTva should return false with empty tva_value', () => {
      let request = httpMocks.createRequest({
        body: {
            tva_value: "",
     
        }
      });
        assert.throws(() => {
            validFormBodyTva(request.body);
          }, Error, "Value can not be empty!"
        );
          
    });
}

);

// *********************************************************************************************************************
// ************************************************** TESTS CREATE USER ************************************************
// *********************************************************************************************************************





