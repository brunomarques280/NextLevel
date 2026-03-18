const express = require("express");
const path = require("path");
const cors = require("cors");
const app = express();

// A Vercel define a porta automaticamente, ou usamos a 3000 localmente
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// 1. Serve os arquivos da pasta public (HTML, CSS, JS do navegador)
app.use(express.static(path.join(__dirname, "public")));

// 2. Rota principal para entregar o index.html
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// 3. Rota de fallback para garantir que o login e dashboard funcionem
app.get("/:page", (req, res) => {
  const page = req.params.page;
  if (page.endsWith(".html")) {
    res.sendFile(path.join(__dirname, "public", page));
  } else {
    res.sendFile(path.join(__dirname, "public", `${page}.html`));
  }
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
