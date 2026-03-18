const fs = require("fs");
const express = require("express");
const path = require("path");
const cors = require("cors");
const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());
app.use(express.static("public"));

// Localização exata do arquivo na raiz do projeto
const DADOS_PATH = path.join(process.cwd(), "dados.json");

const lerDados = () => {
  try {
    // Verifica se o arquivo existe antes de tentar ler para evitar o erro 500
    if (!fs.existsSync(DADOS_PATH)) {
      console.log("Arquivo dados.json não encontrado, criando um novo...");
      return { usuarios: [] };
    }
    const conteudo = fs.readFileSync(DADOS_PATH, "utf-8");
    return JSON.parse(conteudo || '{"usuarios": []}');
  } catch (erro) {
    console.error("Erro na leitura:", erro);
    return { usuarios: [] };
  }
};

const salvarDados = (dados) => {
  try {
    // Tenta salvar. Nota: Na Vercel, isso é temporário (Serverless)
    fs.writeFileSync(DADOS_PATH, JSON.stringify(dados, null, 2));
  } catch (erro) {
    console.error("Erro ao salvar:", erro);
    // Não deixamos o erro derrubar o servidor (evita o status 500 no front)
  }
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
app.use(express.static(path.join(__dirname, "public")));

// Rota para a raiz (/) entregar o login.html
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
