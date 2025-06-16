import * as Path from 'node:path'
import express from 'express'
import cors, { CorsOptions } from 'cors'

import userRoutes from './routes/users.ts'
import logRoutes from './routes/logs.ts'

const server = express()

server.use(express.json())
server.use(cors('*' as CorsOptions))

server.use('/api/v1/users', userRoutes)
server.use('/api/v1', logRoutes)
server.use('/uploads', express.static(Path.resolve('uploads'))) // for serving web-accessible media URLs


if (process.env.NODE_ENV === 'production') {
  server.use(express.static(Path.resolve('public')))
  server.use('/assets', express.static(Path.resolve('./dist/assets')))
  server.get('*', (req, res) => {
    res.sendFile(Path.resolve('./dist/index.html'))
  })
}

export default server
