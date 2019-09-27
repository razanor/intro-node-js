const http = require('http')
const url = require('url')
const fs = require('fs')
const path = require('path')
// const mime = require('mime');

/**
 * this function is blocking, fix that
 * @param {String} name full file name of asset in asset folder
 */
const findAsset = (name) => {
  const assetPath = path.join(__dirname, 'assets', name)
  return new Promise((resolve, reject) => {
    fs.readFile(assetPath, {encoding: 'utf-8'}, (err, data) => {
      if (data) {
        resolve(data)
      } else {
        reject(err)
      }
    })
  })
}

const hostname = '127.0.0.1'
const port = 3000

const router = {
  'GET /': {
    
  }
}

// log incoming request coming into the server. Helpful for debugging and tracking
const logRequest = (method, route, status) => console.log(method, route, status)

const server = http.createServer(async (req, res) => {
  const method = req.method
  const route = url.parse(req.url).pathname
  // this is sloppy, espcially with more assets, create a "router"
  if (route === '/') {
    res.writeHead(200, {'Content-Type': 'text/html'})
    res.write(await findAsset('index.html'))
    logRequest(method, route, 200)
    res.end()
  } else {
    // missing asset should not cause server crash
    throw new Error('route not found')
    res.end()
  }
  // most important part, send down the asset
})

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`)
})
