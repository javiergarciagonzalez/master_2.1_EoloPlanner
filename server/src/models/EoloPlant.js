import sequelize from '../connections/dataConnection.js';
import sequelizePkg from 'sequelize';
import DebugLib from "debug";

const debug = new DebugLib('server:mysql');
const {DataTypes, Model} = sequelizePkg;

export async function updateEoloPlant(plant) {
  const plantSQL = await EoloPlant.findOne({
    where: {
      id: plant.id
    }
  });
  debug('updateDB findOne', plantSQL.id);

  plantSQL.progress = plant.progress;
  plantSQL.completed = plant.completed;
  if (plant.completed) {
    const [,p1, p2] = plant.planning.split('-');
    if (p1.toLowerCase().endsWith('ny') ) {
      plantSQL.weather = p1;
      plantSQL.landscape = p2;
    } else {
      plantSQL.weather = p2;
      plantSQL.landscape = p1;
    }
  }
  debug('updateDB edited', plantSQL);
  await plantSQL.save();
  return plantSQL;
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
  completed: DataTypes.BOOLEAN,
  weather: DataTypes.STRING,
  landscape: DataTypes.STRING
}, {
  sequelize,
  modelName: 'EoloPlant',
  tableName: 'EoloPlants'
});

await sequelize.sync();
