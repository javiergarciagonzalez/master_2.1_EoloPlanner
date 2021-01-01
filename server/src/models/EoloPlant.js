import sequelize from '../connections/dataConnection.js';
import sequelizePkg from 'sequelize';

const {DataTypes, Model} = sequelizePkg;

export class EoloPlant extends Model {}

EoloPlant.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  city: {
    type: DataTypes.STRING,
    allowNull: false
  },
  progress: DataTypes.INTEGER,
  weather: DataTypes.STRING,
  landscape: DataTypes.STRING
}, {
  sequelize,
  modelName: 'EoloPlant',
  tableName: 'EoloPlants'
});

await sequelize.sync();
