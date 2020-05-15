import { find, create } from './api/data'
import { findDevices } from './api/devices'

export default function InitApp (app, JSONBodyParser, knex) {
  //
  app.get('/data', async (req, res, next) => {
    try {
      res.json(await find(req.query, knex))
    } catch (err) {
      next(err)
    }
  })

  app.post('/data', JSONBodyParser, async (req, res, next) => {
    try {
      res.json(await create(req.body, knex))
    } catch (err) {
      next(err)
    }
  })

  app.get('/devices', async (req, res, next) => {
    try {
      res.json(await findDevices(req.query, knex))
    } catch (err) {
      next(err)
    }
  })
}
