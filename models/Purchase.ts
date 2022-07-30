import {Model, DataTypes} from 'sequelize';

const Sequelize = require('sequelize');
const db = require('../utils/mysql.connector');

export const Purchase = db.define('Purchase', {
    idPurchase: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    idReservation: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    datePurchase: {
        type: Sequelize.DATE,
        allowNull: false
    },
    image: {
        type: Sequelize.BLOB,
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
module.exports = Purchase;