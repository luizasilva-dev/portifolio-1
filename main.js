const menu = document.querySelector('.menu');
const botao = document.querySelector('.botao');
const cards = document.querySelectorAll('.card');

// Função para mostrar apenas um card
function mostrarCard(indice) {
  cards.forEach((card, i) => {
    card.style.display = i === indice ? 'block' : 'none';
  });
}

// Clique no menu
menu.addEventListener('click', function (evento) {
  const itemClicado = evento.target.closest('li');
  if (!itemClicado) return;

  // Remove ativo de todos
  const todosItens = menu.querySelectorAll('li');
  todosItens.forEach(item => item.classList.remove('ativo'));

  // Ativa o clicado
  itemClicado.classList.add('ativo');

  const textoItem = itemClicado.textContent.trim().toLowerCase();

  if (textoItem === 'início') {
    cards.forEach(card => card.style.display = 'block');
  } 
  else if (textoItem === 'sobre mim') {
    mostrarCard(0);
  } 
  else if (textoItem === 'estudos') {
    mostrarCard(1);
  }
});

// Clique no botão
botao.addEventListener('click', function () {
  const todosItens = menu.querySelectorAll('li');
  todosItens.forEach(item => item.classList.remove('ativo'));

  todosItens[2].classList.add('ativo');
  mostrarCard(1);
});