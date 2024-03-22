import { Sequelize } from 'sequelize';

const db = new Sequelize('sqlite::memory:', {
  define: {
    freezeTableName: true
  }
});

export default db;