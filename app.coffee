koa   = require 'koa'
route = require 'koa-route'
views = require 'co-views'
http  = require 'http'
path  = require 'path'
io    = require 'socket.io'

app   = koa()

render = views(__dirname + '/views', map: html: 'jade')

app.use (next) ->
  console.log 'Starting app'
  start = new Date
  yield next
  ms = new Date - start
  console.log '%s %s - %s', @method, @url, ms

app.use route.get '/', (next) ->
  this.body = yield render 'index.jade', name: "[koa]"


app.listen 3000
