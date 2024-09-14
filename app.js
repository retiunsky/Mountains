const translate = document.querySelectorAll('.translate');
const big_title = document.querySelector('.big-title');
const header = document.querySelector('header');
const shadow = document.querySelector('.shadow');
const content = document.querySelector('.content');
const section = document.querySelector('section');
const image_container = document.querySelector('.imgContainer');
const opacity = document.querySelectorAll('.opacity');
const border = document.querySelector('.border');

let header_height = header.offsetHeight;
let section_height = section.offsetHeight;

window.addEventListener('scroll', () => {
  let scroll = window.pageYOffset;
  let sectionY = section.getBoundingClientRect();

  translate.forEach((element) => {
    let speed = element.dataset.speed;
    element.style.transform = `translateY(${scroll * speed}px)`;
  });

  opacity.forEach((element) => {
    element.style.opacity = scroll / (sectionY.top + section_height);
  });

  big_title.style.opacity = -scroll / (header_height / 2) + 1;
  shadow.style.height = `${scroll * 0.5 + 300}px`;

  content.style.transform = `translateY(${
    (scroll / (section_height + sectionY.top)) * 50 - 50
  }px)`;
  image_container.style.transform = `translateY(${
    (scroll / (section_height + sectionY.top)) * -50 + 50
  }px)`;

  border.style.width = `${(scroll / (sectionY.top + section_height)) * 30}%`;
});

gsap.registerPlugin(ScrollTrigger);
Splitting();

const lenis = new Lenis({
  duration: 1.2,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // https://www.desmos.com/calculator/brs54l4xou
  direction: 'vertical', // vertical, horizontal
  gestureDirection: 'vertical', // vertical, horizontal, both
  smooth: true,
  mouseMultiplier: 1,
  smoothTouch: false,
  touchMultiplier: 2,
  infinite: false,
});

function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}

requestAnimationFrame(raf);

document.body.classList.add('fixed');

const mql = window.matchMedia('screen and (max-width: 992px)');
const mq2 = window.matchMedia('screen and (max-width: 375px)');

window.addEventListener('scroll', () => {
  const header = document.querySelector('.nav-header');
  if (window.scrollY > 100) {
    header.classList.add('bg');
  } else {
    header.classList.remove('bg');
  }
});

const links = document.querySelectorAll('a');

links.forEach((link) => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    if (e.target.classList.contains('mobile-link')) {
      closeMenu();

      setTimeout(() => {
        lenis.scrollTo(e.target.hash, { offset: mq2.matches ? -60 : -150 });
      }, 2600);
    } else {
      lenis.scrollTo(e.target.hash, { offset: mq2.matches ? -60 : -150 });
    }
  });
});
