// import http from 'http'
// import fs from 'fs'
// import url from 'url'

// let part = 8888
// let server = http.createServer(function (request, response) {
//   let temp = url.parse(request.url, true)
//   let path = temp.pathname
//   let query = temp.query
//   let method = request.method

//   console.log(`${method}  ${request.url}`)
// })

// server.listen(port)
// console.log(`监听${port}成功，呵。`)
var http = require('http')
var fs = require('fs')
var url = require('url')

//console.log(Object.keys(http))
var port = process.env.PORT || 8888;

var server = http.createServer(function (request, response) {

  var temp = url.parse(request.url, true)
  var path = temp.pathname
  var query = temp.query
  var method = request.method

  switch (path) {

  }
  console.log(method + ' ' + request.url)
})


const app = function (method, path, cb) { }


server.listen(port)
console.log('监听 ' + port + ' 成功，请用在空中转体720度然后用电饭煲打开 http://localhost:' + port)