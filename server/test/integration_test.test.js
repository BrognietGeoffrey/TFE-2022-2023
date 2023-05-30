const assert = require("assert");
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../index');
let should = chai.should();
var request = require("supertest");
const secretKey = process.env.JWT_SECRET_KEY;
chai.use(chaiHttp);
const expect = chai.expect;
const jwt = require('jsonwebtoken');



const payload = {
    role : "admin", 
    user_id : {
        id : 1,
    }
    };
  
  const options = {
    expiresIn: '7d' // Définit l'expiration du JWT à une durée plus longue (7 jours dans cet exemple)
  };
  
  const token = jwt.sign(payload, secretKey, options);

request = request("http://localhost:4000");

describe('Facturiers routes', function() {
  describe('GET /api/facturiers', function() {
    it('should fetch all facturiers successfully', function(done) {
      request.get('/api/facturiers')
        .set('Authorization', `Bearer ${token}`)
        .end(function(err, res) {
          expect(err).to.be.null;
          expect(res).to.have.status(200);
          expect(res.body).to.be.an('array');
          done();
        });
    });
  });
  describe('GET /api/facturiers/:id', function() {
    it('should fetch one facturier successfully', function(done) {
    request.get('/api/facturiers/1')
        .set('Authorization', `Bearer ${token}`)
        .end(function(err, res) {
            expect(res).to.have.status(200);

        res.body.facture_id.should.be.equal(1);
        done();
        });
    });
});
});



describe('Decomptes routes', function() {
    describe('GET /api/decomptes', function() {
      it('should fetch all decomptes successfully', function(done) {
        request.get('/api/decomptes')
          .set('Authorization', `Bearer ${token}`)
          .end(function(err, res) {
            expect(err).to.be.null;
            expect(res).to.have.status(200);
            expect(res.body).to.be.an('array');
            done();
          });
      });
    });
  });

  describe('Decompte routes', function() {
    describe('GET /api/decomptes/:id', function() {
        it('should fetch one decomptes successfully', function(done) {
        request.get('/api/decomptes/1')
            .set('Authorization', `Bearer ${token}`)
            .end(function(err, res) {
                expect(res).to.have.status(200);

            res.body.type.should.be.equal("Factures")
            done();
            });
        });
    });
    }
);

describe('objet routes', function() {
    describe('GET /api/objet', function() {
      it('should fetch all objet successfully', function(done) {
        request.get('/api/objet')
          .set('Authorization', `Bearer ${token}`)
          .end(function(err, res) {
            expect(err).to.be.null;
            expect(res).to.have.status(200);
            expect(res.body).to.be.an('array');
            done();
          });
      });
    });
  });

  describe('------- Objets routes -----------', function() {
    describe('GET /api/objet/:id', function() {
        it('should fetch one objet successfully', function(done) {
        request.get('/api/objet/1')
            .set('Authorization', `Bearer ${token}`)
            .end(function(err, res) {
                expect(res).to.have.status(200);

            res.body.title.should.be.equal("Factures")
            done();
            });
        });
    });
    }
);

describe('------- Factures routes -----------', function() {
    describe('GET /api/facture', function() {
      it('should fetch all factures successfully', function(done) {
        request.get('/api/facture')
          .set('Authorization', `Bearer ${token}`)
          .end(function(err, res) {
            expect(err).to.be.null;
            expect(res).to.have.status(200);
            expect(res.body).to.be.an('array');
            done();
          });
      });
    });
  });
  describe('------- Facture routes -----------', function() {
    describe('GET /api/facture/:id', function() {
        it('should fetch one objet successfully', function(done) {
        request.get('/api/facture/1')
            .set('Authorization', `Bearer ${token}`)
            .end(function(err, res) {
                expect(res).to.have.status(200);

            res.body.montant.should.be.equal(1)
            res.body.libelle_id.should.be.equal(1)
            done();
            });
        });
    });
    }
);

describe('------- Libelles routes -----------', function() {
    describe('GET /api/libelle', function() {
      it('should fetch all libelle successfully', function(done) {
        request.get('/api/libelle')
          .set('Authorization', `Bearer ${token}`)
          .end(function(err, res) {
            expect(err).to.be.null;
            expect(res).to.have.status(200);
            expect(res.body).to.be.an('array');
            done();
          });
      });
    });
  });


  describe('------- Libelle routes -----------', function() {
    describe('GET /api/libelle/:id', function() {
        it('should fetch one libelle successfully', function(done) {
        request.get('/api/libelle/1')
            .set('Authorization', `Bearer ${token}`)
            .end(function(err, res) {
                expect(res).to.have.status(200);

            res.body.title.should.be.equal("Factures")
           
            done();
            });
        });
    });
    }
);

describe('------- TVA routes -----------', function() {
    describe('GET /api/tva', function() {
      it('should fetch all tva successfully', function(done) {
        request.get('/api/tva')
          .set('Authorization', `Bearer ${token}`)
          .end(function(err, res) {
            expect(err).to.be.null;
            expect(res).to.have.status(200);
            expect(res.body).to.be.an('array');
            done();
          });
      });
    });
  }
);

describe('------- TVA routes -----------', function() {
    describe('GET /api/tva/:id', function() {
        it('should fetch one tva successfully', function(done) {
        request.get('/api/tva/1')
            .set('Authorization', `Bearer ${token}`)
            .end(function(err, res) {
                expect(res).to.have.status(200);

            res.body.tva_value.should.be.equal("21")
           
            done();
            });
        });
    });
    }
);

describe('------- Comments routes -----------', function() {
    describe('GET /api/comments', function() {
      it('should fetch all comments successfully', function(done) {
        request.get('/api/comments')
          .set('Authorization', `Bearer ${token}`)
          .end(function(err, res) {
            expect(err).to.be.null;
            expect(res).to.have.status(200);
            expect(res.body).to.be.an('array');
            done();
          });
      });
    });
  }
);

describe('------- Comments routes -----------', function() {
    describe('POST /api/comments', function() {
        it('should create a comment successfully', function(done) {
            request.post('/api/comments')
            .set('Authorization', `Bearer ${token}`)
            .send({
                comments: 'test',
                userId: 1,
                facturier_id: 1, 
                title : 'test',
            })
            .end(function(err, res) {
                expect(err).to.be.null;
                expect(res).to.have.status(200);
                expect(res.body).to.be.an('object');
                done();
            });
        });
        }
    );
});

describe('------- extraits routes -----------', function() {
    describe('GET /api/extraits', function() {
      it('should fetch all extraits successfully', function(done) {
        request.get('/api/extraits')
          .set('Authorization', `Bearer ${token}`)
          .end(function(err, res) {
            expect(err).to.be.null;
            expect(res).to.have.status(200);
            expect(res.body).to.be.an('array');
            done();
          });
      });
    });
  }

);

describe('------- extraits routes -----------', function() {
    describe('GET /api/extraits/:id', function() {
        it('should fetch one extrait successfully', function(done) {
        request.get('/api/extraits/1')
            .set('Authorization', `Bearer ${token}`)
            .end(function(err, res) {
                expect(res).to.have.status(200);

            res.body.num_extrait.should.be.equal(1)
            res.body.montant.should.be.equal(1)
           
            done();
            });
        });
    });
    }
);

describe('------- logs routes -----------', function() {
    describe('GET /api/logs', function() {
      it('should fetch all logs successfully', function(done) {
        request.get('/api/logs')
          .set('Authorization', `Bearer ${token}`)
          .end(function(err, res) {
            expect(err).to.be.null;
            expect(res).to.have.status(200);
            expect(res.body).to.be.an('array');
            done();
          });
      });
    });
  }

);

describe('------- logs routes -----------', function() {
    describe('POST /api/logs', function() {
        it('should create a log successfully', function(done) {
            request.post('/api/logs')
            .set('Authorization', `Bearer ${token}`)
            .send({
                user_id: 1,
                facturier_id: 1, 
                description : 'Ajout d"un facturier',
            })
            .end(function(err, res) {
                expect(err).to.be.null;
                expect(res).to.have.status(200);
                expect(res.body).to.be.an('object');
                done();
            });
        });
        }
    );
});

describe('------- fournisseur routes -----------', function() {
    describe('GET /api/fournisseurs', function() {
      it('should fetch all fournisseurs successfully', function(done) {
        request.get('/api/fournisseurs')
          .set('Authorization', `Bearer ${token}`)
          .end(function(err, res) {
            expect(err).to.be.null;
            expect(res).to.have.status(200);
            expect(res.body).to.be.an('array');
            done();
          });
      });
    });
  }
)

describe('------- fournisseur routes -----------', function() {
    describe('GET /api/fournisseurs/:id', function() {
        it('should fetch one fournisseur successfully', function(done) {
        request.get('/api/fournisseurs/1')
            .set('Authorization', `Bearer ${token}`)
            .end(function(err, res) {
                expect(res).to.have.status(200);

            res.body.name.should.be.equal("Geoffrey Brogniet")
            res.body.num_fournisseur.should.be.equal(1)
           
            done();
            });
        });
    });
    }
);


describe('------- client routes -----------', function() {
    describe('GET /api/clients', function() {
      it('should fetch all clients successfully', function(done) {
        request.get('/api/clients')
          .set('Authorization', `Bearer ${token}`)
          .end(function(err, res) {
            expect(err).to.be.null;
            expect(res).to.have.status(200);
            expect(res.body).to.be.an('array');
            done();
          });
      });
    });
  }
)

describe('------- clients routes -----------', function() {
    describe('GET /api/clients/:id', function() {
        it('should fetch one clients successfully', function(done) {
        request.get('/api/clients/1')
            .set('Authorization', `Bearer ${token}`)
            .end(function(err, res) {
                expect(res).to.have.status(200);

            res.body.name.should.be.equal("Geoffrey")
            res.body.firstname.should.be.equal("Brogniet")
           
            done();
            });
        });
    });
    }
);








