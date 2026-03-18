const formulario = document.getElementById("formCadastro");
const inputNome = document.getElementById("input-nome");
const inputEmail = document.getElementById("input-email");
const listaUl = document.getElementById("usuarios-ul");

formulario.addEventListener("submit", (event) => {
  event.preventDefault();

  const dadosParaEnviar = {
    nome: inputNome.value,
    email: inputEmail.value,
  };

  if (
    dadosParaEnviar.nome.trim() === "" ||
    dadosParaEnviar.email.trim() === ""
  ) {
    alert("⚠️ Preencha nome e e-mail!");
    return;
  }

  // MUDANÇA AQUI: Removemos o localhost
  fetch("/api/usuarios", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(dadosParaEnviar),
  })
    .then((res) => {
      if (res.ok) {
        alert("Usuário salvo com sucesso!");
        formulario.reset();
        carregarUsuarios();
      }
    })
    .catch((erro) => console.error("Erro ao enviar:", erro));
});

function carregarUsuarios() {
  // MUDANÇA AQUI: Removemos o localhost
  fetch("/api/usuarios")
    .then((res) => res.json())
    .then((usuarios) => {
      listaUl.innerHTML = "";
      usuarios.forEach((usuario) => {
        const li = document.createElement("li");
        li.classList.add("card-usuario");
        li.innerHTML = `
          <strong>${usuario.nome}</strong> (${usuario.email})
          <button class="btn-excluir" onclick="deletarUsuario('${usuario.email}')">❌</button>
        `;
        listaUl.appendChild(li);
      });
    })
    .catch((erro) => console.error("Erro ao carregar:", erro));
}

function deletarUsuario(email) {
  if (confirm("Deseja remover este usuário?")) {
    // MUDANÇA AQUI: Removemos o localhost
    fetch(`/api/usuarios/${email}`, {
      method: "DELETE",
    }).then(() => carregarUsuarios());
  }
}

carregarUsuarios();
