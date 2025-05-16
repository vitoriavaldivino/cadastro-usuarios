// Pega elementos do HTML
const form = document.getElementById("userForm");
const tableBody = document.querySelector("#userTable tbody");
const confirmBtn = document.getElementById("confirmDeleteBtn");
let indexToDelete = null;

// Máscara de telefone simples
document.getElementById("whatsapp").addEventListener("input", function (e) {
  let v = e.target.value.replace(/\D/g, "");
  if (v.length > 0) {
    v = v.replace(/^(\d{2})(\d)/g, "($1) $2");
    v = v.replace(/(\d{5})(\d{4})$/, "$1-$2");
  }
  e.target.value = v;
});

// Carrega os usuários salvos
let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

// Atualiza a tabela
function atualizarTabela() {
  tableBody.innerHTML = "";
  usuarios.forEach((user, i) => {
    let linha = document.createElement("tr");
    linha.innerHTML = `
      <td>${user.nome}</td>
      <td>${user.email}</td>
      <td>${user.perfil}</td>
      <td>${user.whatsapp}</td>
      <td><button class="btn btn-danger btn-sm" onclick="confirmarExclusao(${i})">Excluir</button></td>
    `;
    tableBody.appendChild(linha);
  });
}

// Adiciona novo usuário
form.addEventListener("submit", function (e) {
  e.preventDefault();
  let novoUsuario = {
    nome: document.getElementById("nome").value,
    email: document.getElementById("email").value,
    perfil: document.getElementById("perfil").value,
    whatsapp: document.getElementById("whatsapp").value
  };

  usuarios.push(novoUsuario);
  localStorage.setItem("usuarios", JSON.stringify(usuarios));
  form.reset();
  atualizarTabela();
});

// Função para abrir o modal
function confirmarExclusao(i) {
  indexToDelete = i;
  let modal = new bootstrap.Modal(document.getElementById("confirmModal"));
  modal.show();
}

// Quando confirmar exclusão
confirmBtn.addEventListener("click", function () {
  if (indexToDelete !== null) {
    usuarios.splice(indexToDelete, 1);
    localStorage.setItem("usuarios", JSON.stringify(usuarios));
    atualizarTabela();
    bootstrap.Modal.getInstance(document.getElementById("confirmModal")).hide();
  }
});

// Mostra a tabela ao abrir a página
atualizarTabela();
