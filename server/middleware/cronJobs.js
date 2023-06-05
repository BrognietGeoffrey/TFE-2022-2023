const cron = require('node-cron');
const { sendEmailController } = require('./sendEmail');
const { EmailTemplate } = require('./autoEmailReport');
const db = require("../models");
const {Factures, Logs } = require("../models");
const Op = db.Sequelize.Op;


// trouver toutes les factures crée aujourd'hui
const findAllFactureToday = async () => {
    try {
        const factures = await Factures.findAll({
            where: {
                createdAt: {
                    [Op.gte]: new Date(new Date().setHours(00, 00, 00)),
                    [Op.lte]: new Date(new Date().setHours(23, 59, 59))
                }
            }
        });
        return factures;
    } catch (error) {
        console.log('Error:', error);
    }
};

const findAllLogsToday = async () => {
    try {
        const logs = await Logs.findAll({
            where: {
                createdAt: {
                    [Op.gte]: new Date(new Date().setHours(00, 00, 00)),
                    [Op.lte]: new Date(new Date().setHours(23, 59, 59))

                }
            }
        });
        return logs;
    } catch (error) {
        console.log('Error:', error);
    }
};

const findTotalAllFactureUnpaid = async () => {
    try {
        const factures = await Factures.findAll({
            where: {
                estpaye: false
            }
        });
        return factures;
    } catch (error) {
        console.log('Error:', error);
    }
};





const runCronJob = async () => {
  try {
    const factures = await findAllFactureToday();
    console.log(factures.length);

    const logs = await findAllLogsToday();

    const totalFactureUnpaid = await findTotalAllFactureUnpaid();



    const message = EmailTemplate(factures.length, logs.length, totalFactureUnpaid.length);
    const task = cron.schedule('* 20 18 * * *', () => {
        const req = { body: { to: 'jeanVives@outlook.be', subject: 'Rapport journalier', message: message } };
        const res = {
          status: (statusCode) => ({
            send: (message) => {
              console.log('Response:', statusCode, message);
              // Annuler le job cron après l'envoi du mail
              task.stop();
            }
          })
        };
      
        sendEmailController(req, res);
      });

    // Lancer la tâche cron
    task.start();
  } catch (error) {
    console.log('Error:', error);
  }
};

runCronJob().catch((error) => {
  console.log('Unhandled Promise Rejection:', error);
});
