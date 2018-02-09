// @flow

import React from 'react'
import { renderToNodeStream } from 'react-dom/server'
import express from 'express'
import fs from 'fs'
import path from 'path'

import App from '../client/components/App'

const app = express()

const splitVal = '<div id="app">'
const htmlFragments = fs
  .readFileSync(`${__dirname}/../client/index.html`)
  .toString('utf8')
  .split(splitVal)

app.use('/dist', express.static(path.join(__dirname, '../client')))

app.get('/', (req, res) => {
  const stream = renderToNodeStream(<App />)

  res.write(htmlFragments[0])
  res.write(splitVal)

  stream.pipe(res, { end: false })
  stream.on('end', () => {
    res.write(htmlFragments[1])
    res.end()
  })
})

app.listen(8080)
