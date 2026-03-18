const express = require("express");
const path = require("path");
const cors = require("cors");
const app = express();

// A Vercel define a porta automaticamente, ou usamos a 3000 localmente
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// 1. Faz o Express servir todos os arquivos da pasta public (CSS, JS, Imagens)
app.use(express.static(path.join(__dirname, "public")));

// 2. Rota para a raiz (/) entregar o seu index.html
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// 3. Opcional: Rota para garantir que o login.html também seja acessível diretamente
app.get("/login", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "login.html"));
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
