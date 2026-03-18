const express = require("express");
const path = require("path");
const cors = require("cors");
const app = express();

const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Serve os arquivos da pasta public (CSS, JS do navegador, Imagens)
app.use(express.static(path.join(__dirname, "public")));

// Rota para a raiz entregar o seu index.html (Cadastro)
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
