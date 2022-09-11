export default (sequelize, Sequelize) => {
    const Admin = sequelize.define("admin", {
        unique_id: {
            type: Sequelize.STRING(40),
            allowNull: false,
        },
        firstname: {
            type: Sequelize.STRING(50),
            allowNull: false,
        },
        lastname: {
            type: Sequelize.STRING(50),
            allowNull: false,
        },
        email: {
            type: Sequelize.STRING(255),
            allowNull: false,
            unique: true
        },
        password: {
            type: Sequelize.STRING(255),
            allowNull: false,
        }
    });
    return Admin;
};