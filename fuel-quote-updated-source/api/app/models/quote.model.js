module.exports = (sequelize, Sequelize) => {
    return sequelize.define("quotes", {
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        },
        gallons: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        rate: {
            type: Sequelize.FLOAT,
            required: false
        },
        delivery_address: {
            type: Sequelize.STRING,
            required: true
        },
        delivery_date: {
            type: Sequelize.DATE,
            required: true
        },
        quote_date: {
            type: Sequelize.DATE,
            required: true
        },
        request_by: {
            type: Sequelize.INTEGER,
            required: true
        }
    }, {
        charset: 'utf8',
        collate: 'utf8_unicode_ci',
        timestamps: false
    });
};
