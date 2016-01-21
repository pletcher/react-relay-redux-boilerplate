require('dotenv').load()

import cookieParser from 'cookie-parser'
import express from 'express'
import graphQLHttp from 'express-graphql'
import jwt from 'express-jwt'
import path from 'path'
import webpack from 'webpack'
import WebpackDevServer from 'webpack-dev-server'
import WebpackHotMiddleware from 'webpack-hot-middleware'

import db from './models'
import { Schema } from './data/schema'
import webpackConfig from './webpack.config'

const APP_PORT = process.env.APP_PORT || 3000
const GRAPHQL_PORT = process.env.GRAPHQL_PORT || 8080
const PRODUCTION = process.env.NODE_ENV === 'production'

const authenticate = jwt({
  credentialsRequired: false,
  getToken(req) {
    return req.cookies.jwt
  },
  secret: process.env.JWT_SECRET,
})
const graphQLServer = express()

graphQLServer.use(cookieParser(process.env.SESSION_SECRET))
graphQLServer.use('/', authenticate, graphQLHttp(req => {
  return {
    graphiql: !PRODUCTION,
    pretty: !PRODUCTION,
    rootValue: {
      viewer: req.user,
    },
    schema: Schema,
  }
}))
graphQLServer.listen(GRAPHQL_PORT, () => console.log(
  `GraphQL Server is now running on http://localhost:${GRAPHQL_PORT}`
))

const compiler = webpack(webpackConfig)
const app = new WebpackDevServer(compiler, {
  contentBase: '/public/',
  debug: true,
  hot: true,
  historyApiFallback: true,
  noInfo: true,
  proxy: { '/graphql': `http://localhost:${GRAPHQL_PORT}` },
  publicPath: '/js/',
  stats: { colors: true },
})

app.use(WebpackHotMiddleware(compiler))
app.use('/', express.static(path.resolve(__dirname, 'public')))

db.sequelize.sync().then(() => {
  app.listen(APP_PORT, () => {
    console.log(`App is now running on http://localhost:${APP_PORT}`)
  })
})
