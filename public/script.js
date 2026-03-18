const formulario = document.getElementById("formCadastro");
const inputNome = document.getElementById("input-nome");
const inputEmail = document.getElementById("input-email");
const listaUl = document.getElementById("usuarios-ul");

// --- FUNÇÕES AUXILIARES DE LOCAL STORAGE ---

// Busca os usuários no navegador ou retorna uma lista vazia
function lerUsuariosDoNavegador() {
  const dados = localStorage.getItem("usuarios_db");
  return dados ? JSON.parse(dados) : { usuarios: [] };
}

// Salva a lista atualizada no navegador
function salvarUsuariosNoNavegador(dados) {
  localStorage.setItem("usuarios_db", JSON.stringify(dados));
}

// --- LÓGICA DO FORMULÁRIO ---

formulario.addEventListener("submit", (event) => {
  event.preventDefault();

  const novoUsuario = {
    nome: inputNome.value.trim(),
    email: inputEmail.value.trim(),
  };

  if (novoUsuario.nome === "" || novoUsuario.email === "") {
    alert("⚠️ Preencha nome e e-mail!");
    return;
  }

  // 1. Lê o que já tem guardado
  const dados = lerUsuariosDoNavegador();

  // 2. Verifica se o e-mail já existe (para evitar duplicados)
  const existe = dados.usuarios.find((u) => u.email === novoUsuario.email);
  if (existe) {
    alert("Este e-mail já está cadastrado!");
    return;
  }

  // 3. Adiciona o novo e salva
  dados.usuarios.push(novoUsuario);
  salvarUsuariosNoNavegador(dados);

  alert("Usuário salvo com sucesso no navegador!");
  formulario.reset();
  carregarUsuarios(); // Atualiza a lista na tela
});

function carregarUsuarios() {
  // Busca os dados direto do LocalStorage
  const dados = lerUsuariosDoNavegador();

  listaUl.innerHTML = "";

  dados.usuarios.forEach((usuario) => {
    const li = document.createElement("li");
    li.classList.add("card-usuario");
    li.innerHTML = `
        <strong>${usuario.nome}</strong> (${usuario.email})
        <button class="btn-excluir" onclick="deletarUsuario('${usuario.email}')">❌</button>
    `;
    listaUl.appendChild(li);
  });
}

function deletarUsuario(email) {
  if (confirm("Deseja remover este usuário?")) {
    // 1. Lê a lista
    const dados = lerUsuariosDoNavegador();

    // 2. Filtra para remover o escolhido
    dados.usuarios = dados.usuarios.filter((u) => u.email !== email);

    // 3. Salva a nova lista e recarrega a tela
    salvarUsuariosNoNavegador(dados);
    carregarUsuarios();
  }
}

// Executa ao abrir a página
carregarUsuarios();
