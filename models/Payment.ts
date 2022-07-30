import {Model, DataTypes} from 'sequelize';

const Sequelize = require('sequelize');
const db = require('../utils/mysql.connector');
export const Payment = db.define('Payment', {
    idPayment: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    idReservation: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    userSend: {
        type: Sequelize.STRING,
        allowNull: false
    },
    userReceipt: {
        type: Sequelize.STRING,
        allowNull: false
    },
    datePayment: {
        type: Sequelize.DATE,
        allowNull: false
    },
    amount: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    createdAt: {
        type: Sequelize.DATE,
        allowNull: false
    },
    updatedAt: {
        type: Sequelize.DATE,
        allowNull: false
    }
});
module.exports = Payment;