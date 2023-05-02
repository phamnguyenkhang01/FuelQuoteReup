module.exports = (sequelize, Sequelize) => {
    return sequelize.define("users", {
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        },
        email: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true
        },
        password: {
            type: Sequelize.STRING,
            required: false
        },
        full_name: {
            type: Sequelize.STRING,
            allowNull: true
        },
        address_line_1: {
            type: Sequelize.STRING,
            required: true
        },
        address_line_2: {
            type: Sequelize.STRING,
            required: true
        },
        city: {
            type: Sequelize.STRING,
            required: true
        },
        state: {
            type: Sequelize.STRING,
            required: true
        },
        zip_code: {
            type: Sequelize.STRING,
            required: true
        },
        status: {
            type: Sequelize.ENUM,
            allowNull: false,
            values: ['Pending', 'Active', 'Deleted'],
            defaultValue: 'Pending'
        }
    }, {
        charset: 'utf8',
        collate: 'utf8_unicode_ci',
        timestamps: false
    });
};