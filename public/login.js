const loginForm = document.getElementById("login-form");
const loginInput = document.getElementById("login-input");

loginForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const emailInformado = loginInput.value.trim();

  // 1. Busca os usuários que foram salvos no LocalStorage pelo script.js
  const dadosLocal = localStorage.getItem("usuarios_db");

  // Se não tiver nada no LocalStorage, cria um objeto vazio para não dar erro
  const dados = dadosLocal ? JSON.parse(dadosLocal) : { usuarios: [] };

  // 2. Procura na lista de usuários se existe o e-mail digitado
  const usuarioEncontrado = dados.usuarios.find(
    (u) => u.email === emailInformado,
  );

  if (usuarioEncontrado) {
    // 3. SE ENCONTRAR: Salva os dados do usuário logado na sessão e vai para o dashboard
    console.log("Login realizado com sucesso:", usuarioEncontrado);
    localStorage.setItem("usuarioLogado", JSON.stringify(usuarioEncontrado));

    alert(`Bem-vindo de volta, ${usuarioEncontrado.nome}!`);
    window.location.href = "dashboard.html";
  } else {
    // 4. SE NÃO ENCONTRAR: Avisa o usuário
    alert("E-mail não encontrado! Verifique se você já se cadastrou.");
    console.error("Erro no login: E-mail não consta no banco de dados local.");
  }
});
