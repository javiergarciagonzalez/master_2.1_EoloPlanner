import sequelize from '../connections/dataConnection.js';
import sequelizePkg from 'sequelize';
import DebugLib from "debug";

const debug = new DebugLib('mysql');
const {DataTypes, Model} = sequelizePkg;

export async function updateEoloPlant(plant) {
  const plantSQL = await EoloPlant.findOne({
    where: {
      id: plant.id
    }
  });
  debug('updateDB findOne', plantSQL);

  plantSQL.progress = plant.progress;
  if (plant.completed) {
    const [,weather, landscape] = plant.planning.split('-');
    plantSQL.weather = weather;
    plantSQL.landscape = landscape;
  }
  debug('updateDB edited', plantSQL);
  await plantSQL.save();
}

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
