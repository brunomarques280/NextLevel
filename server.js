const fs = require("fs");
const express = require("express");
const cors = require("cors");
const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());
app.use(express.static("public"));

const lerDados = () => {
  try {
    const conteudo = fs.readFileSync("./dados.json", "utf-8");
    return JSON.parse(conteudo || '{"usuarios": []}');
  } catch (erro) {
    return { usuarios: [] };
  }
};

const salvarDados = (dados) => {
  fs.writeFileSync("./dados.json", JSON.stringify(dados, null, 2));
};

app.get("/api/usuarios", (req, res) => {
  const dados = lerDados();
  res.json(dados.usuarios);
});

app.post("/api/usuarios", (req, res) => {
  const dados = lerDados();
  const novoUsuario = req.body;
  dados.usuarios.push(novoUsuario);
  salvarDados(dados);
  res.status(201).json({ mensagem: "Usuário criado com sucesso!" });
});

app.post("/api/login", (req, res) => {
  const dados = lerDados();
  const { email } = req.body;
  const usuarioEncontrado = dados.usuarios.find((u) => u.email === email);

  if (usuarioEncontrado) {
    res.json(usuarioEncontrado);
  } else {
    res.status(401).json({ mensagem: "E-mail não encontrado." });
  }
});

app.delete("/api/usuarios/:email", (req, res) => {
  const emailParaRemover = req.params.email;
  const dados = lerDados();
  dados.usuarios = dados.usuarios.filter((u) => u.email !== emailParaRemover);
  salvarDados(dados);
  res.json({ mensagem: "Usuário removido com sucesso!" });
});

// Faz o Express servir os arquivos da pasta public
app.use(express.static("public"));

// Rota para a raiz (/) entregar o login.html
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/login.html");
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
