// Monta uma página HTML simples com título e conteúdo
function page(title, content) {
  return `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title}</title>
  <style>
    body { font-family: sans-serif; max-width: 640px; margin: 40px auto; padding: 0 16px; }
    code, pre { background: #f2f2f2; padding: 2px 6px; border-radius: 4px; }
    nav a { margin-right: 12px; }
  </style>
</head>
<body>
  <nav><a href="/">Index</a><a href="/about">About</a><a href="/users">Users</a></nav>
  <h1>${title}</h1>
  ${content}
</body>
</html>`
}

// Evita que valores vindos do usuário sejam interpretados como HTML
function escapeHtml(text) {
  return String(text).replace(/[&<>"']/g, (c) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
  }[c]))
}

module.exports = { page, escapeHtml }
