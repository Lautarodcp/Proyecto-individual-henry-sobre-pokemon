const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
	// defino el modelo
	sequelize.define(
		'Pokemon',
		{
			id: {
				type: DataTypes.UUID,
				defaultValue: DataTypes.UUIDV4,
				allowNull: false,
				primaryKey: true,
			},
			nombre: {
				type: DataTypes.STRING,
				allowNull: false,
				unique: true,
			},
			vida: {
				type: DataTypes.INTEGER,
			},
			ataque: {
				type: DataTypes.INTEGER,
			},
			defensa: {
				type: DataTypes.INTEGER,
			},
			velocidad: {
				type: DataTypes.INTEGER,
			},
			altura: {
				type: DataTypes.INTEGER,
			},
			peso: {
				type: DataTypes.INTEGER,
			},
			imagen: {
				type: DataTypes.TEXT,
			},
			cradoEnBD: {
				type: DataTypes.BOOLEAN,
				defaultValue: true,
				allowNull: false,
			},
		},
		{
			timestamps: false,
		}
	);
};
