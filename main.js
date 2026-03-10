/* ============================================
   MAIN.JS — Portfólio Ana Luiza
   
   O JavaScript adiciona COMPORTAMENTO à página.
   HTML = estrutura | CSS = aparência | JS = ação

   Estrutura deste arquivo:
   1. Cursor personalizado
   2. Partículas de fundo
   3. Navegação entre seções
   4. Botão "Ver estudos"
   5. Lista de estudos interativa
   6. Barras de habilidade animadas
   ============================================ */


// ===================================================
// 1. CURSOR PERSONALIZADO
// Fazemos dois elementos seguirem o mouse com JS
// porque o CSS sozinho não consegue capturar posição
// ===================================================

// document.getElementById() busca um elemento pelo id no HTML
const cursor      = document.getElementById("cursor");
const cursorTrail = document.getElementById("cursorTrail");

// addEventListener("mousemove") escuta o evento de mover o mouse
// Toda vez que o mouse se mover, a função dentro é executada
document.addEventListener("mousemove", (e) => {
  // e.clientX e e.clientY = coordenadas X e Y do mouse na tela
  // style.left/top define a posição CSS do elemento
  cursor.style.left = e.clientX + "px";
  cursor.style.top  = e.clientY + "px";

  // O trail usa um pequeno setTimeout para parecer que "segue" o cursor
  // setTimeout(função, milissegundos) — espera 80ms antes de mover o trail
  setTimeout(() => {
    cursorTrail.style.left = e.clientX + "px";
    cursorTrail.style.top  = e.clientY + "px";
  }, 80);
});


// ===================================================
// 2. PARTÍCULAS DE FUNDO
// Criamos elementos circulares flutuantes dinamicamente
// ===================================================

// Buscamos o container das partículas
const bgParticles = document.getElementById("bgParticles");

// Função que cria UMA partícula
function criarParticula() {
  // document.createElement() cria um novo elemento HTML
  const particula = document.createElement("div");
  particula.classList.add("particula"); // Adiciona a classe CSS

  // Tamanho aleatório entre 40px e 200px
  // Math.random() retorna um número entre 0 e 1
  // Math.floor() arredonda para baixo
  const tamanho = Math.floor(Math.random() * 160) + 40;
  particula.style.width  = tamanho + "px";
  particula.style.height = tamanho + "px";

  // Posição aleatória pela tela (em %)
  particula.style.left = Math.random() * 100 + "%";
  particula.style.top  = Math.random() * 100 + "%";

  // Duração e delay da animação aleatórios (via variáveis CSS customizadas)
  const duracao = Math.random() * 6 + 5; // Entre 5s e 11s
  const delay   = Math.random() * 4;     // Entre 0s e 4s
  particula.style.setProperty("--dur",   duracao + "s");
  particula.style.setProperty("--delay", delay + "s");

  // Adiciona a partícula ao container no HTML
  bgParticles.appendChild(particula);
}

// Cria 12 partículas ao carregar a página
for (let i = 0; i < 12; i++) {
  criarParticula();
}


// ===================================================
// 3. NAVEGAÇÃO ENTRE SEÇÕES
// Ao clicar em um item do menu, mostra a seção
// correspondente e esconde as outras
// ===================================================

// querySelectorAll() retorna TODOS os elementos que batem com o seletor CSS
// Resultado é um NodeList (parecido com array)
const itensMenu = document.querySelectorAll(".menu li");
const secoes    = document.querySelectorAll(".secao");

// .forEach() percorre cada item da lista
itensMenu.forEach((item) => {
  // Para cada item do menu, escutamos o clique
  item.addEventListener("click", () => {

    // Pega o valor do atributo data-secao do item clicado
    // Ex: <li data-secao="estudos"> → dataset.secao = "estudos"
    const secaoAlvo = item.dataset.secao;

    // Remove a classe "ativo" de todos os itens do menu
    itensMenu.forEach((i) => i.classList.remove("ativo"));

    // Adiciona "ativo" apenas no item clicado
    item.classList.add("ativo");

    // Percorre todas as seções do conteúdo
    secoes.forEach((secao) => {
      // Se o data-secao da seção for igual ao do menu clicado...
      if (secao.dataset.secao === secaoAlvo) {
        // ...remove a classe "escondida" (mostra a seção)
        secao.classList.remove("escondida");

        // Quando a seção "sobre" aparecer, anima as barras de habilidade
        if (secaoAlvo === "sobre") {
          animarBarras();
        }
      } else {
        // Esconde todas as outras seções
        secao.classList.add("escondida");
      }
    });
  });
});


// ===================================================
// 4. BOTÃO "VER MEUS ESTUDOS"
// Clicando no botão na seção início, navega para estudos
// ===================================================

const btnEstudos = document.getElementById("btnEstudos");

// Quando o botão for clicado...
btnEstudos.addEventListener("click", () => {
  // Simula um clique no item "Estudos" do menu
  // Isso reutiliza a lógica de navegação que já criamos!
  const menuEstudos = document.querySelector('[data-secao="estudos"]');
  menuEstudos.click(); // .click() dispara o evento de clique via JS
});


// ===================================================
// 5. LISTA DE ESTUDOS INTERATIVA
// Clicando em um item, alterna entre concluído/pendente
// ===================================================

// Buscamos a lista pelo id
const listaEstudos = document.getElementById("listaEstudos");

// Em vez de adicionar listener em cada <li>,
// usamos "event delegation": escutamos cliques na lista inteira.
// Isso é mais eficiente e funciona mesmo para itens adicionados depois.
listaEstudos.addEventListener("click", (e) => {
  // e.target = o elemento que foi clicado
  // .closest() sobe na árvore HTML até encontrar o seletor, ou retorna null
  const item = e.target.closest(".estudo-item");

  // Se não clicou em um item (ex: clicou fora), para aqui
  if (!item) return;

  // .classList.toggle() adiciona a classe se não tiver, remove se tiver
  item.classList.toggle("concluido");

  // Atualiza o ícone (✓ ou ○) dentro do span.check
  const check = item.querySelector(".check");

  if (item.classList.contains("concluido")) {
    check.textContent = "✓"; // Símbolo de check
  } else {
    check.textContent = "○"; // Símbolo de pendente
  }
});


// ===================================================
// 6. BARRAS DE HABILIDADE ANIMADAS
// A largura das barras vai de 0% até o valor em data-pct
// usando uma transição CSS + JS que define a largura
// ===================================================

function animarBarras() {
  // Busca todas as barras de progresso na página
  const barras = document.querySelectorAll(".barra-progresso");

  barras.forEach((barra) => {
    // Lê o valor do atributo data-pct (ex: data-pct="60" → "60")
    const pct = barra.dataset.pct;

    // Usamos setTimeout com 100ms de delay para garantir que
    // a transição CSS seja vista (sem delay, o browser pode pular a animação)
    setTimeout(() => {
      barra.style.width = pct + "%";
    }, 100);
  });
}


// ===================================================
// INICIALIZAÇÃO
// Código que roda uma única vez quando a página carrega
// ===================================================

// DOMContentLoaded: evento que dispara quando o HTML foi
// completamente carregado e parseado pelo browser
// Mais seguro que colocar código direto (garante que os elementos existem)
document.addEventListener("DOMContentLoaded", () => {
  console.log("✨ Portfólio da Ana Luiza carregado!");

  // Se a seção "sobre" estiver visível no carregamento, anima as barras
  const secaoSobre = document.querySelector('[data-secao="sobre"]');
  if (!secaoSobre.classList.contains("escondida")) {
    animarBarras();
  }
});
