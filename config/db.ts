import dbConfig from './dbconfig'
import { Sequelize } from 'sequelize'
import user from '../src/models/user'

const sequelize = new Sequelize(
  dbConfig.DB,
  dbConfig.USER,
  dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min
  },
  logging: console.log,
}
)

async function syncModels() {
  try {
    await sequelize.authenticate()
    console.log('Connection has been established successfully.')

    await sequelize.sync()

  } catch (error) {
    console.error('Unable to connect to the database:', error)
  }
}

export { sequelize, syncModels };