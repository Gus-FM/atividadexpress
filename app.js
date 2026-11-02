const express = require('express')
const usersRouter = require('./routes/users')
const { page, escapeHtml } = require('./utils/page')

const app = express()
const port = 3000

// Middlewares embutidos: tratam corpo JSON e formulários (usados em POST /data)
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Requisito 2: middleware de aplicação que registra no console o acesso a cada página
const logger = function (req, res, next) {
  const data = new Date().toLocaleString('pt-BR')
  console.log(`[${data}] ${req.method} ${req.originalUrl}`)
  next()
}
app.use(logger)

// Requisito 1: uma função de middleware para cada rota, exibindo o nome da rota
const index = function (req, res) {
  res.send(page('Index', `
    <p>Rota: <code>/</code></p>
    <ul>
      <li><a href="/about">/about</a></li>
      <li><a href="/users">/users</a></li>
      <li><a href="/users/signin">/users/signin</a></li>
      <li><a href="/users/signup">/users/signup</a></li>
    </ul>
    <h2>POST /data</h2>
    <form action="/data" method="POST">
      <input name="mensagem" placeholder="Digite algo">
      <button type="submit">Enviar</button>
    </form>
  `))
}

const about = function (req, res) {
  res.send(page('About', '<p>Rota: <code>/about</code></p>'))
}

const data = function (req, res) {
  res.send(page('Data', `
    <p>Rota: <code>/data</code> (POST)</p>
    <p>Dados recebidos:</p>
    <pre>${escapeHtml(JSON.stringify(req.body, null, 2))}</pre>
  `))
}

app.get('/', index)
app.get('/about', about)
app.post('/data', data)
app.use('/users', usersRouter)

// Requisito 5: qualquer rota não definida vai para a página de erro 404
app.use((req, res) => {
  res.status(404).send(page('Erro 404', `
    <p>A página <code>${escapeHtml(req.originalUrl)}</code> não foi encontrada.</p>
    <p><a href="/">Voltar para o index</a></p>
  `))
})

// Middleware de tratamento de erros (4 argumentos)
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).send(page('Erro 500', '<p>Something broke!</p><p><a href="/">Voltar para o index</a></p>'))
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
