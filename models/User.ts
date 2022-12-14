import {Model, DataTypes} from 'sequelize';

const Sequelize = require('sequelize');
const db = require('../utils/mysql.connector');

export const User = db.define('User', {
    idUser: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    login: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    password: {
        type: Sequelize.STRING,
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
module.exports = User;

