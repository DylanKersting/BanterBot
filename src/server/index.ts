import Koa from 'koa'
import router from './routes'
import https from 'https'
import http from 'http'
import fs from 'fs'
import body from 'koa-body'
const app = new Koa()
app.use(body())


app.keys = ['secret']

app.use(router)

if (!(process.env.ENVIRONMENT === "DEVELOPMENT")) {
  const config = {
    key: fs.readFileSync('privkey.pem', 'utf8'),
    cert: fs.readFileSync('fullchain.pem', 'utf8')
  }

  const unsafe = http.createServer(function(req, res) {  
    res.writeHead(302, {
      'Location': process.env.WEBSITE_URL + req.url
    })
    res.end()
  });

  unsafe.listen(80)

  https.createServer(config, app.callback()).listen(443)
} else {
  http.createServer(app.callback()).listen(4400)
}
console.log('Listening...')