// Ce fichier contient les requêtes SQL pour la base de données sans les exepctations


const Pool=require('pg').Pool
const pool = new Pool({
    user: 'tfedb',
    host: 'localhost',
    database: 'jv10',
    password: 'tfedb',
    port: 5432,
})

// -------------------USER QUERIES--------------------------- //

// Find all users in the database and return them as a JSON object 
const getUsers = (request, response) => {
    pool.query('SELECT * FROM users ORDER BY role DESC', (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    }
)}

// Find a user by ID and return them as a JSON object
const getUserById = (request, response) => {
  const id = parseInt(request.params.id)
    pool.query('SELECT * FROM users WHERE user_id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

// Create a new user in the database
  const createUser = (request, response) => {
    const { first_name, last_name, password, role, email } = request.body
  
    pool.query('INSERT INTO users (first_name, last_name, password, role, email) VALUES ($1, $2, $3, $4, $5) RETURNING *', [first_name, last_name, password, role, email], (error, results) => {
      if (error) {
        throw error
      }
      response.status(201).send(`User added with ID: ${results.rows[0].user_id}`)
    })
  }

// Delete a user from the database
    const deleteUser = (request, response) => {
        const id = parseInt(request.params.id)

        pool.query('DELETE FROM users WHERE user_id = $1', [id], (error, results) => {
            if (error) {
                throw error
            }
            response.status(200).send(`User deleted with ID: ${id}`)
        })
    }

    // Update a user in the database
    const updateUser = (request, response) => {
        const id = parseInt(request.params.id)
        const { first_name, last_name, password, role, email } = request.body

        pool.query(
            'UPDATE users SET first_name = $1, last_name = $2, password = $3, role = $4, email = $5 WHERE user_id = $6',
            [first_name, last_name, password, role, email, id],
            (error, results) => {
                if (error) {
                    throw error
                }
                response.status(200).send(`User modified with ID: ${id}`)
            }
        )
    }

// -------------------END USER QUERIES--------------------------- //

// -------------------FACTURES QUERIES--------------------------- //

// Find all factures in the database and return them as a JSON object
const getFactures = (request, response) => {
    pool.query('SELECT * FROM Factures ORDER BY facture_id DESC', (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    }
)}

// Find a facture by ID and return them as a JSON object
const getFactureById = (request, response) => {
    const id = parseInt(request.params.id)
    pool.query('SELECT * FROM factures WHERE facture_id = $1', [id], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

// Create a new facture in the database
const createFacture = (request, response) => {
    const totalTVA = parseInt(request.body.prix_tva)*(21/100)
    const prix_htva = parseInt(request.body.prix_tva)+totalTVA
    const { num_facture, prix_tva, facture_date } = request.body
    
    pool.query('INSERT INTO Factures (num_facture, prix_tva, prix_htva, facture_date) VALUES ($1, $2, $3, $4) RETURNING *', [num_facture, prix_tva, prix_htva, facture_date], (error, results) => {
        if (error) {
            throw error
        }
        response.status(201).send(`Facture added with ID: ${results.rows[0].facture_id}`)
    })
}

// Update a facture in the database
const updateFacture = (request, response) => {
    const id = parseInt(request.params.id)
    const totalTVA = parseInt(request.body.prix_tva)*(21/100)
    const prix_htva = parseInt(request.body.prix_tva)+totalTVA
    const { num_facture, prix_tva, facture_date } = request.body

    
    pool.query(
        'UPDATE factures SET num_facture = $1, prix_tva = $2,prix_htva = $3, facture_date = $4 WHERE facture_id = $5',
        [num_facture, prix_tva, prix_htva, facture_date, id],
        (error, results) => {
            if (error) {
                throw error
            }
            response.status(200).send(`Facture modified with ID: ${id}`)
        }
    )
}

// Delete a facture from the database
const deleteFacture = (request, response) => {
    const id = parseInt(request.params.id)
    
    pool.query('DELETE FROM Factures WHERE facture_id = $1', [id], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).send(`Facture deleted with ID: ${id}`)
    })
}

// -------------------END FACTURES QUERIES--------------------------- //

// -------------------CLIENTS QUERIES--------------------------- //

// Find all clients in the database and return them as a JSON object
const getClients = (request, response) => {
    pool.query('SELECT * FROM compte_clients ORDER BY co_client_id DESC', (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    }
)}

// Find a client by ID and return them as a JSON object
const getClientById = (request, response) => {
    const id = parseInt(request.params.id)

    pool.query('SELECT * FROM compte_clients WHERE co_client_id = $1', [id], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

// Create a new client in the database and return them as a JSON object
const createClient = (request, response) => {
    const { num_co_client, banque_id, name_client_id } = request.body
    pool.query('INSERT INTO compte_clients (num_co_client, banque_id, name_client_id) VALUES ($1, $2, $3) RETURNING *', [num_co_client, banque_id, name_client_id], (error, results) => {
      if (error) {
        throw error
      }
      response.status(201).send(`client added with ID: ${results.rows[0].co_client_id}`)
    })
}

// Update a client in the database and return them as a JSON object
const updateClient = (request, response) => {

    const id = parseInt(request.params.id)
    const { num_co_client, banque_id, name_client_id } = request.body

    pool.query(
        'UPDATE compte_clients SET num_co_client = $1, banque_id = $2, name_client_id = $3 WHERE co_client_id = $4',
        [num_co_client, banque_id, name_client_id, id],
        (error, results) => {
            if (error) {
                throw error
            }
            response.status(200).send(`Client modified with ID: ${id}`)
        }
    )
}

// Delete a client from the database and return them as a JSON object
const deleteClient = (request, response) => {
    const id = parseInt(request.params.id)

    pool.query('DELETE FROM compte_clients WHERE co_client_id = $1', [id], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).send(`Client deleted with ID: ${id}`)
    })
}

// -------------------END CLIENTS QUERIES--------------------------- //

// -------------------NAME CLIENT QUERIES--------------------------- //

// Find all name clients in the database and return them as a JSON object
const getNameClients = (request, response) => {
    pool.query('SELECT * FROM name_clients ORDER BY name_client_id DESC', (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    }
)}

// Find a name client by ID and return them as a JSON object
const getNameClientById = (request,
    response) => {
    const id = parseInt(request.params.id)

    pool.query('SELECT * FROM name_clients WHERE name_client_id = $1', [id], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

// Create a new name client in the database and return them as a JSON object
const createNameClient = (request, response) => {
    const { name_client, co_client_id } = request.body
    pool.query('INSERT INTO name_clients (name_client, co_client_id) VALUES ($1, $2) RETURNING *', [name_client, co_client_id], (error, results) => {
        if (error) {
            throw error
        }
        response.status(201).send(`Name client added with ID: ${results.rows[0].name_client_id}`)
    })
}

// Update a name client in the database and return them as a JSON object
const updateNameClient = (request, response) => {

    const id = parseInt(request.params.id)
    const { name_client, co_client_id } = request.body

    pool.query(
        'UPDATE name_clients SET name_client = $1, co_client_id = $2 WHERE name_client_id = $3',
        [name_client, co_client_id, id],
        (error, results) => {
            if (error) {
                throw error
            }
            response.status(200).send(`Name client modified with ID: ${id}`)
        }
    )
}

// Delete a name client from the database and return them as a JSON object
const deleteNameClient = (request, response) => {
    const id = parseInt(request.params.id)

    pool.query('DELETE FROM name_clients WHERE name_client_id = $1', [id], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).send(`Name client deleted with ID: ${id}`)
    })
}

// -------------------END NAME CLIENT QUERIES--------------------------- //



// -------------------BANQUES QUERIES--------------------------- //

// Find all banques in the database and return them as a JSON object
const getBanques = (request, response) => {
    pool.query('SELECT * FROM banques ORDER BY banque_id DESC', (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    }
)}

// Find a banque by ID and return them as a JSON object
const getBanqueById = (request, response) => {
    const id = parseInt(request.params.id)

    pool.query('SELECT * FROM banques WHERE banque_id = $1', [id], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

// Create a new banque in the database and return them as a JSON object
const createBanque = (request, response) => {
    const { banque_name, banque_email, banque_phone } = request.body
    pool.query('INSERT INTO banques (banque_name, banque_email, banque_phone) VALUES ($1, $2, $3) RETURNING *', [banque_name, banque_email, banque_phone], (error, results) => {
        if (error) {
            throw error
        }
        response.status(201).send(`Banque added with ID: ${results.rows[0].banque_id}`)
    })
}

// Update a banque in the database and return them as a JSON object
const updateBanque = (request, response) => {

    const id = parseInt(request.params.id)
    const { banque_name, banque_email, banque_phone } = request.body

    pool.query(
        'UPDATE banques SET banque_name = $1, banque_email = $2, banque_phone = $3 WHERE banque_id = $4',
        [banque_name, banque_email, banque_phone, id],
        (error, results) => {
            if (error) {
                throw error
            }
            response.status(200).send(`Banque modified with ID: ${id}`)
        }
    )
}

// Delete a banque from the database and return them as a JSON object
const deleteBanque = (request, response) => {
    const id = parseInt(request.params.id)

    pool.query('DELETE FROM banques WHERE banque_id = $1', [id], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).send(`Banque deleted with ID: ${id}`)
    })
}

// -------------------END BANQUES QUERIES--------------------------- //

// -------------------FOURNISSEURS QUERIES --------------------------- //

// Find all fournisseurs in the database and return them as a JSON object
const getFournisseurs = (request, response) => {
    pool.query('SELECT * FROM compte_fournisseurs ORDER BY co_fournisseur_id DESC', (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    }
)}

// Find a fournisseur by ID and return them as a JSON object
const getFournisseurById = (request, response) => {
    const id = parseInt(request.params.id)

    pool.query('SELECT * FROM compte_fournisseurs WHERE co_fournisseur_id = $1', [id], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

// Create a new fournisseur in the database and return them as a JSON object
const createFournisseur = (request, response) => {
    const { num_co_fournisseur, banque_id, name_fournisseur_id } = request.body
    pool.query('INSERT INTO compte_fournisseurs (num_co_fournisseur, banque_id, name_fournisseur_id) VALUES ($1, $2, $3) RETURNING *', [num_co_fournisseur, banque_id, name_fournisseur_id], (error, results) => {
      if (error) {
        throw error
      }
      response.status(201).send(`fournisseur added with ID: ${results.rows[0].co_fournisseur_id}`)
    })
}

// Update a fournisseur in the database and return them as a JSON object
const updateFournisseur = (request, response) => {

    const id = parseInt(request.params.id)
    const { num_co_fournisseur, banque_id, name_fournisseur_id } = request.body

    pool.query(
        'UPDATE compte_fournisseurs SET num_co_fournisseur = $1, banque_id = $2, name_fournisseur_id = $3 WHERE co_fournisseur_id = $4',
        [num_co_fournisseur, banque_id, name_fournisseur_id, id],
        (error, results) => {
            if (error) {
                throw error
            }
            response.status(200).send(`fournisseur modified with ID: ${id}`)
        }
    )
}

// Delete a fournisseur from the database and return them as a JSON object
const deleteFournisseur = (request, response) => {

    const id = parseInt(request.params.id)

    pool.query('DELETE FROM compte_fournisseurs WHERE co_fournisseur_id = $1', [id], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).send(`fournisseur deleted with ID: ${id}`)
    })
}

// -------------------END FOURNISSEURS QUERIES--------------------------- //

// -------------------NAME FOURNISSEUR QUERIES--------------------------- //

// Find all name_fournisseurs in the database and return them as a JSON object
const getNameFournisseurs = (request, response) => {
    pool.query('SELECT * FROM name_fournisseurs ORDER BY name_fournisseur_id DESC', (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    }
)}

// Find a name_fournisseur by ID and return them as a JSON object
const getNameFournisseurById = (request, response) => {
    const id = parseInt(request.params.id)

    pool.query('SELECT * FROM name_fournisseurs WHERE name_fournisseur_id = $1', [id], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

// Create a new name_fournisseur in the database and return them as a JSON object
const createNameFournisseur = (request, response) => {
    const { name_fournisseur, co_fournisseur_id } = request.body

    pool.query('INSERT INTO name_fournisseurs (name_fournisseur, co_fournisseur_id) VALUES ($1, $2) RETURNING *', [name_fournisseur, co_fournisseur_id], (error, results) => {
        if (error) {
            throw error
        }

        response.status(201).send(`name_fournisseur added with ID: ${results.rows[0].name_fournisseur_id}`)
    })
}

// Update a name_fournisseur in the database and return them as a JSON object
const updateNameFournisseur = (request, response) => {
    const id = parseInt(request.params.id)
    const { name_fournisseur, co_fournisseur_id } = request.body
    
    pool.query(
        'UPDATE name_fournisseurs SET name_fournisseur = $1, co_fournisseur_id = $2 WHERE name_fournisseur_id = $2',
        [name_fournisseur, id],
        (error, results) => {
            if (error) {
                throw error
            }
            response.status(200).send(`name_fournisseur modified with ID: ${id}`)
        }
    )
}

// Delete a name_fournisseur from the database and return them as a JSON object
const deleteNameFournisseur = (request, response) => {
    const id = parseInt(request.params.id)

    pool.query('DELETE FROM name_fournisseurs WHERE name_fournisseur_id = $1', [id], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).send(`name_fournisseur deleted with ID: ${id}`)
    })
}

// -------------------END NAME FOURNISSEUR QUERIES--------------------------- //

// -------------------DECOMPTE QUERIES--------------------------- //

// Find all decomptes in the database and return them as a JSON object
const getDecomptes = (request, response) => {
    pool.query('SELECT * FROM decompte ORDER BY decompte_id DESC', (error, results) => {
        if (error) {
            throw error
        }

        response.status(200).json(results.rows)
    }
)}

// Find a decompte by ID and return them as a JSON object
const getDecompteById = (request, response) => {
    const id = parseInt(request.params.id)
    
    pool.query('SELECT * FROM decompte WHERE decompte_id = $1', [id], (error, results) => {
        if (error) {

            throw error
        }
        response.status(200).json(results.rows)
    })
}

// Create a new decompte in the database and return them as a JSON object
const createDecompte = (request, response) => {
    const { num_decompte, type} = request.body

    pool.query('INSERT INTO decompte (num_decompte, type) VALUES ($1, $2) RETURNING *', [num_decompte, type], (error, results) => {
        if (error) {
            throw error
        }
        response.status(201).send(`decompte added with ID: ${results.rows[0].decompte_id}`)
    })
}

// Update a decompte in the database and return them as a JSON object
const updateDecompte = (request, response) => {
    const id = parseInt(request.params.id)
    const { num_decompte, type } = request.body

    pool.query(
        'UPDATE decompte SET num_decompte = $1, type = $2 WHERE decompte_id = $3',
        [num_decompte, type, id],
        (error, results) => {
            if (error) {
                throw error
            }
            response.status(200).send(`decompte modified with ID: ${id}`)
        }
    )
}

// Delete a decompte from the database and return them as a JSON object
const deleteDecompte = (request, response) => {
    const id = parseInt(request.params.id)

    pool.query('DELETE FROM decompte WHERE decompte_id = $1', [id], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).send(`decompte deleted with ID: ${id}`)
    })
}

// -------------------END DECOMPTE QUERIES--------------------------- //

// -------------------STATUS FACTURE QUERIES--------------------------- //

// Find all status_factures in the database and return them as a JSON object
const getStatusFactures = (request, response) => {
    pool.query('SELECT * FROM status_factures ORDER BY status_fac_id DESC', (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    }
)}

// Find a status_facture by ID and return them as a JSON object
const getStatusFactureById = (request, response) => {
    const id = parseInt(request.params.id)

    pool.query('SELECT * FROM status_factures WHERE status_fac_id = $1', [id], (error, results) => {
        if (error) {
           console.log("erreur")

        }
        response.status(200).json(results.rows)
    })
}

// Create a new status_facture in the database and return them as a JSON object
const createStatusFacture = (request, response) => {
    const { payement, reste, paye_le, facture_id } = request.body

    pool.query('INSERT INTO status_factures (payement, reste, paye_le, facture_id) VALUES ($1, $2, $3, $4) RETURNING *', [payement, reste, paye_le, facture_id], (error, results) => {
        if (error) {
            console.log("erreur") 
        }
        response.status(201).send(`status_facture added with ID: ${results.rows[0].status_fac_id}`)
    })
}

// Update a status_facture in the database and return them as a JSON object
const updateStatusFacture = (request, response) => {
    const id = parseInt(request.params.id)
    const { payement, reste, paye_le, facture_id } = request.body

    pool.query(
        'UPDATE status_factures SET payement = $1, reste = $2, paye_le = $3, facture_id = $4 WHERE status_fac_id = $5',
        [payement, reste, paye_le, facture_id, id],
        (error, results) => {
            if (error) {
                throw error
            }

            response.status(200).send(`status_facture modified with ID: ${id}`)
        }
    )
}

// Delete a status_facture from the database and return them as a JSON object
const deleteStatusFacture = (request, response) => {
    const id = parseInt(request.params.id)

    pool.query('DELETE FROM status_factures WHERE status_fac_id = $1', [id], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).send(`status_facture deleted with ID: ${id}`)
    })
}

// -------------------END STATUS FACTURE QUERIES--------------------------- //

// -------------------EXTRAIT QUERIES--------------------------- //

// Find all extraits in the database and return them as a JSON object
const getExtraits = (request, response) => {
    pool.query('SELECT * FROM extraits ORDER BY extrait_id DESC', (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    }
)}

// Find a extrait by ID and return them as a JSON object

const getExtraitById = (request, response) => {
    const id = parseInt(request.params.id)

    pool.query('SELECT * FROM extraits WHERE extrait_id = $1', [id], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

// Create a new extrait in the database and return them as a JSON object
const createExtrait = (request, response) => {
    const { num_extrait, date_extrait, montant} = request.body

    pool.query('INSERT INTO extraits (num_extrait, date_extrait, montant) VALUES ($1, $2, $3) RETURNING *', [num_extrait, date_extrait, montant], (error, results) => {
        if (error) {
            throw error
        }
        response.status(201).send(`extrait added with ID: ${results.rows[0].extrait_id}`)
    })
}

// Update a extrait in the database and return them as a JSON object
const updateExtrait = (request, response) => {
    const id = parseInt(request.params.id)
    const { num_extrait, date_extrait, montant} = request.body

    pool.query(
        'UPDATE extraits SET num_extrait = $1, date_extrait = $2, montant = $3 WHERE extrait_id = $4',
        [num_extrait, date_extrait, montant, id],
        (error, results) => {
            if (error) {
                throw error
            }
            response.status(200).send(`extrait modified with ID: ${id}`)
        }
    )
}

// Delete a extrait from the database and return them as a JSON object
const deleteExtrait = (request, response) => {
    const id = parseInt(request.params.id)

    pool.query('DELETE FROM extraits WHERE extrait_id = $1', [id], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).send(`extrait deleted with ID: ${id}`)
    })
}

// -------------------END EXTRAIT QUERIES--------------------------- //

// -------------------FACTURIER QUERIES--------------------------- //

// Find all facturiers in the database and return them as a JSON object
const getFacturiers = (request, response) => {
    pool.query('SELECT * FROM facturier ORDER BY facturier_id DESC', (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    }
)}

// Find a facturier by ID and return them as a JSON object
const getFacturierById = (request, response) => {
    const id = parseInt(request.params.id)

    pool.query('SELECT * FROM facturier WHERE facturier_id = $1', [id], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

// Create a new facturier in the database and return them as a JSON object
const createFacturier = (request, response) => {

    const {facture_id, decompte_id, co_client_id, co_fournisseur_id, extrait_id} = request.body

    pool.query('INSERT INTO facturier (facture_id, decompte_id, co_client_id, co_fournisseur_id, extrait_id) VALUES ($1, $2, $3, $4, $5) RETURNING *', [facture_id, decompte_id, co_client_id, co_fournisseur_id, extrait_id], (error, results) => {
        if (error) {
            throw error
        }
        response.status(201).send(`facturier added with ID: ${results.rows[0].facturier_id}`)
    })
}

// Update a facturier in the database and return them as a JSON object
const updateFacturier = (request, response) => {
    const id = parseInt(request.params.id)
    const {facture_id, decompte_id, co_client_id, co_fournisseur_id, extrait_id} = request.body

    pool.query(
        'UPDATE facturier SET facture_id = $1, decompte_id = $2, co_client_id = $3, co_fournisseur_id = $4, extrait_id = $5 WHERE facturier_id = $6',
        [facture_id, decompte_id, co_client_id, co_fournisseur_id, extrait_id, id],
        (error, results) => {
            if (error) {
                throw error
            }
            response.status(200).send(`facturier modified with ID: ${id}`)
        }
    )
}

// Delete a facturier from the database and return them as a JSON object
const deleteFacturier = (request, response) => {
    const id = parseInt(request.params.id)

    pool.query('DELETE FROM facturier WHERE facturier_id = $1', [id], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).send(`facturier deleted with ID: ${id}`)
    })
}

// -------------------END FACTURIER QUERIES--------------------------- //




  module.exports = {
    // Users's function calls

    getUsers,
    getUserById,
    createUser,
    deleteUser, 
    updateUser,
    // Factures's function calls

    getFactures,
    getFactureById,
    createFacture,
    updateFacture,
    deleteFacture,
    // Clients's function calls

    getClients,
    getClientById,
    createClient, 
    updateClient,
    deleteClient, 

    // Banques's function calls
    
    getBanques,
    getBanqueById,
    createBanque,
    updateBanque,
    deleteBanque,

    // Name Clients's function calls
    
    getNameClients,
    getNameClientById,
    createNameClient,
    updateNameClient,
    deleteNameClient,

    // Fournisseurs's function calls

    getFournisseurs,
    getFournisseurById,
    createFournisseur,
    updateFournisseur,
    deleteFournisseur,

    // Name Fournisseurs's function calls

    getNameFournisseurs,
    getNameFournisseurById,
    createNameFournisseur,
    updateNameFournisseur,
    deleteNameFournisseur,

    // Decompte's function calls

    getDecomptes,
    getDecompteById,
    createDecompte,
    updateDecompte,
    deleteDecompte,

    // Status Facture's function calls

    getStatusFactures,
    getStatusFactureById,
    createStatusFacture,
    updateStatusFacture,
    deleteStatusFacture,
    
    // Extrait's function calls

    getExtraits,
    getExtraitById,
    createExtrait,
    updateExtrait,
    deleteExtrait,

    // Facturier's function calls

    getFacturiers,
    getFacturierById,
    createFacturier,
    updateFacturier,
    deleteFacturier



    }

