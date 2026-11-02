const express = require('express')
const { page, escapeHtml } = require('../utils/page')

const router = express.Router()

// Middleware de roteamento: todas as requisições para /users passam por aqui
router.use((req, res, next) => {
  console.log('  -> router /users: %s %s', req.method, req.path)
  next()
})

const users = function (req, res) {
  res.send(page('Users', `
    <p>Rota: <code>/users</code></p>
    <ul>
      <li><a href="/users/signin">/users/signin</a></li>
      <li><a href="/users/signup">/users/signup</a></li>
    </ul>
  `))
}

// Requisito 3 e 4: signin recebe o userid; sem userid, redireciona para signup
const signin = function (req, res) {
  if (!('userid' in req.query)) {
    return res.send(page('Signin', `
      <p>Rota: <code>/users/signin</code></p>
      <form action="/users/signin" method="GET">
        <input name="userid" placeholder="Seu userid">
        <button type="submit">Entrar</button>
      </form>
    `))
  }

  const userid = req.query.userid.trim()
  if (!userid) {
    return res.redirect('/users/signup')
  }
  res.redirect(`/users/${encodeURIComponent(userid)}`)
}

const signup = function (req, res) {
  res.send(page('Signup', `
    <p>Rota: <code>/users/signup</code></p>
    <p>Você ainda não informou um userid. Faça seu cadastro!</p>
    <p><a href="/users/signin">Voltar para o signin</a></p>
  `))
}

const userPage = function (req, res) {
  const userid = escapeHtml(req.params.userid)
  res.send(page('Bem-vindo', `
    <p>Rota: <code>/users/:userid</code></p>
    <p>Olá, <strong>${userid}</strong>! Seja bem-vindo(a).</p>
  `))
}

// signin e signup antes de /:userid, senão seriam capturadas como userid
router.get('/', users)
router.get('/signin', signin)
router.get('/signup', signup)
router.get('/:userid', userPage)

module.exports = router
