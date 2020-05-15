import express from 'express'
import cors from 'cors'
import path from 'path'
import bodyParser from 'body-parser'
import initDB from 'modularni-urad-utils/db'
import initErrorHandlers from 'modularni-urad-utils/error_handlers'
import InitApp from './index'

async function init (host, port) {
  const knex = await initDB(path.join(__dirname, 'migrations'))
  const app = express()
  app.use(cors())
  InitApp(app, bodyParser.json(), knex)
  initErrorHandlers(app) // ERROR HANDLING

  app.listen(port, host, (err) => {
    if (err) { throw err }
    console.log(`ents do magic on ${host}:${port}`)
  })
}

try {
  const host = process.env.HOST || '127.0.0.1'
  const port = process.env.PORT
  init(host, port)
} catch (err) {
  console.error(err)
}
