const db = require('../models');
const { Op } = db.Sequelize;

exports.createCustomView = async (req, res) => {
    try {
      const { table, filters, joins, view_name } = req.body; // table: nom de la table, filters: tableau contenant les critères de filtrage, joins: tableau contenant les jointures
      console.log (table, filters, joins);
      
      // Générer la clause WHERE dynamiquement
      let whereClause = "";
      if (filters && filters.length > 0) {
        whereClause = "WHERE ";
        filters.forEach((filter, index) => {
          // Ajouter l'opérateur logique "AND" entre les clauses de filtrage
          if (index !== 0) {
            whereClause += " AND ";
          }
          // Ajouter la clause de filtrage en fonction de l'attribut et de la valeur spécifiés dans chaque élément du tableau
          whereClause += `${filter.attribute} ${filter.operator} '${filter.value}'`;
        });
      }
      console.log(whereClause);
      // Générer la clause JOIN dynamiquement
      let joinClause = "";
      if (joins && joins.length > 0) {
        joins.forEach((join, index) => {
          // Ajouter la clause de jointure en fonction de la table et de la condition spécifiées dans chaque élément du tableau
          joinClause += `${join.type} JOIN ${join.table} ON ${join.condition}`;
          console.log(joinClause);
        });
      }
      console.log(joinClause, 'joinClause');
      const sqlCreateQuery = `
        CREATE OR REPLACE VIEW ${view_name} AS
        SELECT * FROM ${table} ${joinClause}
        ${whereClause}
        ORDER BY ${table} DESC;
      `;
      await db.sequelize.query(sqlCreateQuery, { type: db.sequelize.QueryTypes.CREATE_VIEW });
      const sqlSelectQuery = `
        SELECT * FROM ${view_name};
      `;
      const view = await db.sequelize.query(sqlSelectQuery, { type: db.sequelize.QueryTypes.SELECT });
      res.status(200).json({ message: 'View created successfully.', view });
    } catch (error) {
      res.status(500).json({ message: 'An error occurred while creating the view.', error });
      console.log(error);
    }
  };

  
  
  
  
  
  
  
  
  
  

  
  
    







