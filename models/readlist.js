const { Model, DataTypes } = require('sequelize');

const { sequelize } = require('../util/db');

class Readlist extends Model {}

Readlist.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    done: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
    blogId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'blogs', key: 'id' }
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'users', key: 'id' }
    },
}, {
    sequelize,
    underscored: true,
    modelName: 'readlist',
});

module.exports = Readlist;