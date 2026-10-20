// Menu mobile
const menuBtn = document.getElementById('menu-btn');
const menuMobile = document.getElementById('menu-mobile');

function alternarMenu(abrir) {
  menuMobile.classList.toggle('aberto', abrir);
  menuBtn.setAttribute('aria-expanded', String(abrir));
  menuBtn.setAttribute('aria-label', abrir ? 'Fechar menu' : 'Abrir menu');
}

menuBtn.addEventListener('click', () => {
  alternarMenu(menuBtn.getAttribute('aria-expanded') !== 'true');
});

// Fecha ao clicar em um link ou apertar Esc
menuMobile.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => alternarMenu(false));
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') alternarMenu(false);
});

// Se a tela crescer até o desktop, garante o estado fechado
window.matchMedia('(min-width: 768px)').addEventListener('change', (e) => {
  if (e.matches) alternarMenu(false);
});

// Abas do cardápio
const abas = document.querySelectorAll('[data-tab]');
const paineis = document.querySelectorAll('.tab-panel');
const classesAtiva = ['bg-atum', 'border-atum'];
const classesInativa = ['border-ouro/40', 'text-arroz/70'];

function abrirAba(id) {
  paineis.forEach((painel) => painel.classList.toggle('hidden', painel.id !== id));
  abas.forEach((aba) => {
    const ativa = aba.dataset.tab === id;
    aba.classList.remove(...(ativa ? classesInativa : classesAtiva));
    aba.classList.add(...(ativa ? classesAtiva : classesInativa));
  });
}

abas.forEach((aba) => aba.addEventListener('click', () => abrirAba(aba.dataset.tab)));
if (abas.length) abrirAba(abas[0].dataset.tab);

// ANIMAÇÕES
// Revelar elementos ao rolar a página
const revelaveis = document.querySelectorAll('.reveal');

const observador = new IntersectionObserver(
  (entradas) => {
    entradas.forEach((entrada) => {
      if (entrada.isIntersecting) {
        entrada.target.classList.add('visivel');
        observador.unobserve(entrada.target); // anima só uma vez
      }
    });
  },
  { threshold: 0.15 }
);

revelaveis.forEach((el) => observador.observe(el));

// Sombra no header ao rolar
const header = document.querySelector('header');

window.addEventListener(
  'scroll',
  () => {
    const rolou = window.scrollY > 20;
    header.classList.toggle('shadow-lg', rolou);
    header.classList.toggle('shadow-black/50', rolou);
  },
  { passive: true }
);

// Carrossel de destaques
if (typeof Swiper !== 'undefined' && document.querySelector('.destaques-swiper')) {
  const total = document.querySelectorAll('.destaques-swiper .swiper-slide').length;
  const reduzirMovimento = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  new Swiper('.destaques-swiper', {
    loop: total >= 4,           // loop infinito (precisa de pelo menos 4 itens)
    centeredSlides: true,       // card ativo sempre no centro
    slidesPerView: 'auto',      // a largura vem do CSS
    spaceBetween: 16,
    grabCursor: true,
    speed: reduzirMovimento ? 0 : 500,
    keyboard: { enabled: true },
    navigation: {
      nextEl: '.destaques-next',
      prevEl: '.destaques-prev'
    },
    breakpoints: {
      768: { spaceBetween: 24 }
    }
  });
}