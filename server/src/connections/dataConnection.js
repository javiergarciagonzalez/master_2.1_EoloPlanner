import { Sequelize } from 'sequelize';
import mysql2 from 'mysql2';

export default new Sequelize('eoloplantsDB', 'root', 'password', {
    dialect: 'mysql',
    dialectModule: mysql2
});

process.on('exit', async () => {
    await sequelize.close();
    console.log(`Closing mysql connection`);
});
