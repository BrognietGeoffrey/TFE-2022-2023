const db = require('../models');
const { Op } = db.Sequelize;

const createCustomView = async (req, res) => {
  try {
    const { table, filters, joins, view_name } = req.body; // table: nom de la table, filters: tableau contenant les critères de filtrage, joins: tableau contenant les jointures
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
        // Ajouter l'opérateur logique "AND" entre les clauses de filtrage
        if (index !== 0) {
          whereClause += " AND ";
        }
        if (filter.operator === 'BETWEEN') {
          
          // Ajouter la clause de filtrage en fonction de l'opérateur spécifié dans chaque élément du tableau
          whereClause += `${filter.attribute} ${filter.operator} ? AND ?`;
          values.push(filter.value[0]);
          values.push(filter.value[1]);
        } else {
          // Ajouter la clause de filtrage en fonction de l'opérateur spécifié dans chaque élément du tableau
          whereClause += `${filter.attribute} ${filter.operator} ?`;
          values.push(filter.value);
        }
      });
    }

    // Générer la clause JOIN dynamiquement
    let joinClause = "";
    // console.log conditions of joins
  
    if (joins.length > 0) {
      joins.forEach((join, index) => {
        // si pas de condition, on ne fait pas de jointure
        if (join.condition === undefined) {
          joinClause = "";
        } else {
          // Ajouter l'opérateur logique "AND" entre les clauses de filtrage
          joinClause += `${join.type} JOIN ${ join.table} ON ${join.condition} `;
        }
      });
    }

    // Générer la requête SQL pour créer la vue
    const sqlCreateQuery = `
      CREATE OR REPLACE VIEW ${view_name} AS 
      SELECT ${table}.* FROM ${table} ${joinClause}
      ${whereClause}
      ORDER BY ${table} DESC;
    `;

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
    res.status(200).json({ message: 'La vue a été créée avec succès.', view, resultView });
  } catch (error) {
    res.status(409).json({ message: "La vue n'a pas pu être créée.", error: error.message });
  }
};

// get all view
const getAllView = async (req, res) => {
  try {
    const view = await db.sequelize.query(`SELECT * FROM pg_views WHERE schemaname = 'public'`, { type: db.sequelize.QueryTypes.SELECT });
    // trouver le nom de la table associée à la vue
    for (let i = 0; i < view.length; i++) {
      // chercher le premier FROM dans la requête
      const from = view[i].definition.indexOf('FROM');
      // et indiquer le nom de la table après le FROM
      const table = view[i].definition.substring(from + 5, view[i].definition.indexOf(' ', from + 5))
      // enlever les deux derniers caractères
      view[i].table = table.substring(0, table.length - 1);
    }
    // variable qui montre le résultat de toutes les vues
    const resultView = [];
    // boucle pour récupérer les données de chaque vue associée aux vues
    for (let i = 0; i < view.length; i++) {
      const result = await db.sequelize.query(`SELECT * FROM ${view[i].viewname}`, { type: db.sequelize.QueryTypes.SELECT });
      
      view[i].data = result;
      resultView.push(view[i]);
    }

    // pour chaque vue, récupérer les données de la table associée et y créer des colonnes pour chaque attribut

    res.status(200).json({ message: 'Les vues ont été récupérées avec succès.', view, resultView });
  } catch (error) {
    res.status(409).json({ message: "Les vues n'ont pas pu être récupérées.", error: error.message });
  }
};

const deleteView = async (req, res) => {
  try {
    const { view_name } = req.body;
    // Valider les données d'entrée
    if (!view_name) {
      throw new Error("Invalid input data");
    }

    // vérifier si le nom de la vue est déjà utilisé
    const ifViewEsist = await db.sequelize.query(`SELECT * FROM pg_views WHERE viewname = '${view_name}'`, { type: db.sequelize.QueryTypes.SELECT });
    if (ifViewEsist.length === 0) {
      throw new Error("View name doesn't exist");
    }

    // Générer la requête SQL pour supprimer la vue
    const sqlDeleteQuery = `
      DROP VIEW ${view_name};
    `;

    // Exécuter la requête SQL pour supprimer la vue
    await db.sequelize.query(sqlDeleteQuery, { type: db.sequelize.QueryTypes.DELETE_VIEW });

    // Retourner la vue supprimée
    res.status(200).json({ message: 'La vue a été supprimée avec succès.', view_name });
  } catch (error) {
    res.status(409).json({ message: "La vue n'a pas pu être supprimée.", error: error.message });
  }

};

module.exports = {
  createCustomView,
  getAllView, 
  deleteView
};


