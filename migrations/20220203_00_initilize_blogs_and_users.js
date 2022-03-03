const { DataTypes } = require('sequelize')

module.exports = {
    up: async({ context: queryInterface }) => {
        await queryInterface.createTable('blogs', {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            author: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            url: {
                type: DataTypes.STRING,
                allowNull: false,

            },
            title: {
                type: DataTypes.STRING,
                allowNull: false
            },
            likes: {
                type: DataTypes.INTEGER,
                default: 0
            },
            updated_at: DataTypes.DATE,
            created_at: DataTypes.DATE
        })
        await queryInterface.createTable('users', {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            username: {
                type: DataTypes.STRING,
                unique: true,
                allowNull: false
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false
            },
            updated_at: DataTypes.DATE,
            created_at: DataTypes.DATE
        })
        await queryInterface.addColumn('blogs', 'user_id', {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: { model: 'users', key: 'id' },
        })
    },
    down: async({ context: queryInterface }) => {
        await queryInterface.dropTable('blogs')
        await queryInterface.dropTable('users')
    },
}