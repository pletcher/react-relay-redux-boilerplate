import chai from 'chai'
import chaiAsPromised from 'chai-as-promised'
import db from '../models'

global.expect = chai.expect

chai.use(chaiAsPromised)

before(done => {
  db.sequelize.sync({ force: true }).then(() => done())
})

after(done => {
  db.sequelize.sync({ force: true }).then(() => done())
})
