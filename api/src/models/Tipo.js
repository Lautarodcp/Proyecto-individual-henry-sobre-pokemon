const { DataTypes, Sequelize} = require("sequelize");

module.exports = (sequelize) => {
    sequelize.define("Tipo", {
        tipoPokemon: {
            type: DataTypes.STRING,
        },
    },
    {
        timestamps: false
    }
    );
};