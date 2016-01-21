import fs from 'fs'
import path from 'path'
import Sequelize from 'sequelize'

const basename = path.basename(module.filename)
const env = process.env.NODE_ENV || 'development'
const config = require(__dirname + '/../config/config.json')[env]

const sequelize = config.use_env_variable ?
  new Sequelize(process.env[config.use_env_variable]) :
  new Sequelize(config.database, config.username, config.password, config)

const files = fs.readdirSync(__dirname).filter(file => (
  (file.indexOf('.') !== 0) &&
  (file !== basename) &&
  (file.slice(-3) === '.js')
))

const db = files.reduce((memo, file) => {
  const model = sequelize.import(path.join(__dirname, file))

  return {
    ...memo,
    [model.name]: model,
  }
}, {})

Object.keys(db).forEach(modelName =>
  db[modelName].associate && db[modelName].associate(db))

db.sequelize = sequelize
db.Sequelize = Sequelize

export default db
