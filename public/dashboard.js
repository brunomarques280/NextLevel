const usuarioLogado = JSON.parse(localStorage.getItem("usuarioLogado"));

let minhasTarefas = JSON.parse(localStorage.getItem("tarefas")) || [];
let meusTreinos = JSON.parse(localStorage.getItem("treinos")) || [];

function salvarNoLocalStorage() {
  localStorage.setItem("tarefas", JSON.stringify(minhasTarefas));
  localStorage.setItem("treinos", JSON.stringify(meusTreinos));
}

const textoBoasVindas = document.getElementById("boas-vindas");
const btnSair = document.getElementById("btn-sair");

if (!usuarioLogado) {
  window.location.href = "login.html";
} else {
  textoBoasVindas.innerText = `Olá, ${usuarioLogado.nome}! Bem-vindo ao seu painel.`;
}

btnSair.addEventListener("click", () => {
  localStorage.removeItem("usuarioLogado");
  window.location.href = "login.html";
});

const inputTarefa = document.getElementById("input-tarefa");
const btnAddTarefa = document.getElementById("btn-add-tarefa");
const listaTarefas = document.getElementById("lista-tarefas");

const inputTreino = document.getElementById("input-treino");
const btnAddTreino = document.getElementById("btn-add-treino");
const listaTreinos = document.getElementById("lista-treinos");

function adicionarItem(item, listaAlvo) {
  const texto = typeof item === "object" ? item.texto : item;
  const concluido = typeof item === "object" ? item.concluido : false;

  if (texto === "") return;

  const novoItem = document.createElement("li");
  if (concluido) novoItem.classList.add("concluido");

  const textoSpan = document.createElement("span");
  textoSpan.innerText = texto;

  textoSpan.addEventListener("click", () => {
    novoItem.classList.toggle("concluido");
    const lista = listaAlvo === listaTarefas ? minhasTarefas : meusTreinos;
    const itemNaMemoria = lista.find((t) => t.texto === texto);
    if (itemNaMemoria) {
      itemNaMemoria.concluido = novoItem.classList.contains("concluido");
    }
    salvarNoLocalStorage();
  });

  const btnDel = document.createElement("button");
  btnDel.innerText = "X";
  btnDel.className = "btn-del";

  btnDel.onclick = () => {
    novoItem.remove();
    if (listaAlvo === listaTarefas) {
      minhasTarefas = minhasTarefas.filter((t) => t.texto !== texto);
    } else {
      meusTreinos = meusTreinos.filter((t) => t.texto !== texto);
    }
    salvarNoLocalStorage();
    atualizarContadores();
  };

  novoItem.appendChild(textoSpan);
  novoItem.appendChild(btnDel);
  listaAlvo.appendChild(novoItem);
}

btnAddTarefa.addEventListener("click", () => {
  const texto = inputTarefa.value.trim();
  if (texto === "") return;

  const novaTarefa = { texto: texto, concluido: false };
  minhasTarefas.push(novaTarefa);
  adicionarItem(novaTarefa, listaTarefas);
  atualizarContadores();
  salvarNoLocalStorage();

  inputTarefa.value = "";
  inputTarefa.focus();
});

btnAddTreino.addEventListener("click", () => {
  const textoTreino = inputTreino.value.trim();
  if (textoTreino === "") return;

  const novoTreino = { texto: textoTreino, concluido: false };
  meusTreinos.push(novoTreino);
  adicionarItem(novoTreino, listaTreinos);
  atualizarContadores();
  salvarNoLocalStorage();

  inputTreino.value = "";
  inputTreino.focus();
});

minhasTarefas.forEach((t) => adicionarItem(t, listaTarefas));
meusTreinos.forEach((t) => adicionarItem(t, listaTreinos));

function atualizarContadores() {
  const spanTarefas = document.getElementById("cont-tarefas");
  const spanTreinos = document.getElementById("cont-treinos");
  if (spanTarefas) spanTarefas.innerText = `(${minhasTarefas.length})`;
  if (spanTreinos) spanTreinos.innerText = `(${meusTreinos.length})`;
}

inputTarefa.addEventListener("keypress", (e) => {
  if (e.key === "Enter") btnAddTarefa.click();
});

inputTreino.addEventListener("keypress", (e) => {
  if (e.key === "Enter") btnAddTreino.click();
});

atualizarContadores();
