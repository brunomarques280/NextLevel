const loginForm = document.getElementById("login-form");
const loginInput = document.getElementById("login-input");

loginForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const email = loginInput.value;

  fetch("/api/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email: email }),
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        alert("E-mail não encontrado!");
        throw new Error("Usuário inválido");
      }
    })
    .then((usuario) => {
      console.log("Sucesso:", usuario);
      localStorage.setItem("usuarioLogado", JSON.stringify(usuario));

      window.location.href = "dashboard.html";
    })
    .catch((erro) => {
      console.error("Erro no login:", erro);
    });
});
