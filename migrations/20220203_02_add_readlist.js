const { DataTypes } = require('sequelize')

module.exports = {
    up: async({ context: queryInterface }) => {
        await queryInterface.createTable('readlists', {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            done: {
                type: DataTypes.BOOLEAN,
                defaultValue: false,
            },
            blog_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: { model: 'blogs', key: 'id' }
            },
            user_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: { model: 'users', key: 'id' }
            },
            updated_at: DataTypes.DATE,
            created_at: DataTypes.DATE
        })

    },
    down: async({ context: queryInterface }) => {
        await queryInterface.dropTable('readlists')
    },
}