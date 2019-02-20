const express = require('express')
const nunjucks = require('nunjucks')

const app = express()

nunjucks.configure('views', {
  autoescape: true,
  express: app,
  watch: true
})

app.use(express.urlencoded({ extended: false }))
app.set('view engine', 'njk')

const queryParamsMiddleWare = (req, res, next) => {
  const { age } = req.query

  if (!age) {
    return res.redirect('/')
  }

  return next()
}

app.get('/', (req, res) => {
  return res.render('user')
})

app.post('/check', (req, res) => {
  const { age } = req.body

  age >= 18
    ? res.redirect(`/major?age=${age}`)
    : res.redirect(`/minor?age=${age}`)
})

app.get('/major', queryParamsMiddleWare, (req, res) => {
  const { age } = req.query

  return res.render('major', { age })
})

app.get('/minor', queryParamsMiddleWare, (req, res) => {
  const { age } = req.query

  return res.render('minor', { age })
})

app.listen(3000)
