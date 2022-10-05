// import fs from 'fs'
// const express = require('express')
// const app = express()
//
// const requestListener = (request: IncomingMessage, response: ServerResponse) => {
//   response.setHeader('content-type', 'application/json')
//   response.writeHead(200, 'OK')
//   response.end(JSON.stringify(fs.readFileSync('./static/messages.json')))
// }
//
// export const server = createServer(requestListener)
import express from "express";
import { Config } from './api/config'

const app = express()
app.use(express.static('./static'))

app.get('/', (req, res) => {
  res.send('Hello World!')
})

export default {
  init: () => {
    app.listen(Config.port, () => {
      console.log(`Example app listening on port ${Config.port}`)
    })
  }
}
