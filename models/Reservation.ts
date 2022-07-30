import {Model, DataTypes} from 'sequelize';

const Sequelize = require('sequelize');
const db = require('../utils/mysql.connector');

export const Reservation = db.define('Reservation', {
    idReservation: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    dateStarted: {
        type: Sequelize.DATE,
        allowNull: false
    },
    dateEnded: {
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
module.exports = Reservation;