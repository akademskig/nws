const express = require('express')
const path = require('path')
const hbs = require('hbs')
const fs = require('fs')

const app = express()

hbs.registerPartials(path.join(__dirname, '/views/partials'))
hbs.registerHelper('currentYear', () => {
  return new Date().getFullYear()
})
hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase()
})

app.set('view engine', 'hbs')

app.use((req, res, next) => {
  var now = new Date().toString()
  var log = `${now}: ${req.method} ${req.url}`
  console.log(log)
  fs.appendFile('server.log', log + '\n', (err) => {
    console.error(err)
  })
  next()
})

app.use((req, res, next) => {
  res.render('maintenance.hbs')
})
app.use(express.static(path.join(__dirname, '/public')))

app.get('/', (req, res) => {
  res.render('home.hbs', {
    pageTitle: 'Home Page',
    welcomeMessage: 'Welcome!'
  })
})

app.get('/about', (req, res) => {
  res.render('about.hbs',
    {
      pageTitle: 'About Page'
    })
})

app.listen(3000)

console.log(`Listening on port 3000`)
