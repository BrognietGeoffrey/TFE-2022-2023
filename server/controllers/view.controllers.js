const db = require('../models');
const { Op } = db.Sequelize;

const createCustomView = async (req, res) => {
  console.log("createCustomView")
  try {
    const { table, filters, joins, view_name } = req.body; // table: nom de la table, filters: tableau contenant les critères de filtrage, joins: tableau contenant les jointures
    console.log(req.body);
    // Valider les données d'entrée
    if (!table || !view_name || !filters || !joins) {
      throw new Error("Invalid input data");
    }

    // vérifier si le nom de la vue est déjà utilisé
    const ifViewEsist = await db.sequelize.query(`SELECT * FROM pg_views WHERE viewname = '${view_name}'`, { type: db.sequelize.QueryTypes.SELECT });
    if (ifViewEsist.length > 0) {
      throw new Error("View name already used");
    }

    // Générer la clause WHERE dynamiquement
    let whereClause = "";
    const values = [];
    if (filters.length > 0) {
      whereClause = "WHERE ";
      filters.forEach((filter, index) => {
        console.log(filter);
        // Ajouter l'opérateur logique "AND" entre les clauses de filtrage
        if (index !== 0) {
          whereClause += " AND ";
        }
        if (filter.operator === 'BETWEEN') {
          
          // Ajouter la clause de filtrage en fonction de l'opérateur spécifié dans chaque élément du tableau
          whereClause += `${filter.attribute} ${filter.operator} ? AND ?`;
          values.push(filter.value[0]);
          values.push(filter.value[1]);
          console.log(values)
        } else {
          // Ajouter la clause de filtrage en fonction de l'opérateur spécifié dans chaque élément du tableau
          whereClause += `${filter.attribute} ${filter.operator} ?`;
          values.push(filter.value);
        }
      });
    }
    console.log(whereClause);

    // Générer la clause JOIN dynamiquement
    let joinClause = "";
    // console.log conditions of joins
  
    if (joins.length > 0) {
      joins.forEach((join, index) => {
        console.log(join.condition);
        // si pas de condition, on ne fait pas de jointure
        if (join.condition === undefined) {
          joinClause = "";
        } else {
          // Ajouter l'opérateur logique "AND" entre les clauses de filtrage
          joinClause += `${join.type} JOIN ${ join.table} ON ${join.condition} `;
        }
      });
    }
    console.log(joinClause);

    // Générer la requête SQL pour créer la vue
    const sqlCreateQuery = `
      CREATE OR REPLACE VIEW ${view_name} AS 
      SELECT ${table}.* FROM ${table} ${joinClause}
      ${whereClause}
      ORDER BY ${table} DESC;
    `;
    console.log(sqlCreateQuery);

    // Exécuter la requête SQL pour créer la vue
    await db.sequelize.query(sqlCreateQuery, {
      replacements: values,
      type: db.sequelize.QueryTypes.CREATE_VIEW
    });

    // Générer la requête SQL pour sélectionner les données de la vue
    const sqlSelectQuery = `
      SELECT * FROM ${view_name};
    `;
    
    // Générer la requête SQL pour sélectionner les données de la table originale avec les jointures et le tri

    
    // Exécuter les deux requêtes SQL en parallèle
    const [view, resultView] = await Promise.all([
      db.sequelize.query(sqlSelectQuery, { type: db.sequelize.QueryTypes.SELECT }),
    ]);
    


    // Retourner la vue créée
    res.status(200).json({ message: 'View created successfully.', view, resultView });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// get all view
const getAllView = async (req, res) => {
  try {
    const view = await db.sequelize.query(`SELECT * FROM pg_views WHERE schemaname = 'public'`, { type: db.sequelize.QueryTypes.SELECT });
    console.log(view);
    // trouver le nom de la table associée à la vue
    for (let i = 0; i < view.length; i++) {
      // chercher le premier FROM dans la requête
      const from = view[i].definition.indexOf('FROM');
      console.log(from, 'from')
      // et indiquer le nom de la table après le FROM
      const table = view[i].definition.substring(from + 5, view[i].definition.indexOf(' ', from + 5))
      // enlever les deux derniers caractères
      view[i].table = table.substring(0, table.length - 1);
    }
    console.log(view, 'ici');
    // variable qui montre le résultat de toutes les vues
    const resultView = [];
    // boucle pour récupérer les données de chaque vue associée aux vues
    for (let i = 0; i < view.length; i++) {
      const result = await db.sequelize.query(`SELECT * FROM ${view[i].viewname}`, { type: db.sequelize.QueryTypes.SELECT });
      
      view[i].data = result;
      resultView.push(view[i]);
    }

    // pour chaque vue, récupérer les données de la table associée et y créer des colonnes pour chaque attribut

    res.status(200).json({ message: 'Views retrieved successfully.', resultView });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createCustomView,
  getAllView
};


