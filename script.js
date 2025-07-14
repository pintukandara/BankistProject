'use strict';

///////////////////////////////////////

// Modal window

//selecting elements
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');
const h1 = document.querySelector('h1');
const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');
const nav = document.querySelector('.nav');
// console.log(tabs);

//functions
const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));
// addEventListener
btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});
btnScrollTo.addEventListener('click', function (e) {
  const s1cords = section1.getBoundingClientRect();
  section1.scrollIntoView({ behavior: 'smooth' });
  // console.log(s1cords);
  // console.log(e.target.getBoundingClientRect());
  // console.log('Current Scroll:X,Y', window.pageXOffset, pageYOffset);
  // console.log(
  //   'getting height and width view port:',
  //   document.documentElement.clientHeight,
  //   document.documentElement.clientWidth
  // );
  //Scrolling
  // window.scrollTo(
  //   s1cords.left + window.pageXOffset,
  //   s1cords.top + window.pageYOffset
  // );
  // window.scrollTo({
  //   left:s1cords.left + window.pageXOffset,
  //   top:s1cords.top + window.pageYOffset,
  //   behavior:'smooth'
  // })
  // new way to scroll
});
/////////////////////////
//Page Navigation
// first method but not effiecient for lots of links
// document.querySelectorAll('.nav__link').forEach(function(el){
//   el.addEventListener('click',function(e){
//     e.preventDefault()
//     const id = this.getAttribute('href')
//     console.log(id);
//     document.querySelector(id).scrollIntoView({behavior:'smooth'})
//   })
// })
// second method :efficient
document.querySelector('.nav__links').addEventListener('click', function (e) {
  // console.log(e.target)
  e.preventDefault();
  // matching strategy
  if (e.target.classList.contains('nav__link')) {
    console.log('link');
    const id = e.target.getAttribute('href');
    console.log(id);
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  }
});
// building the Tabbed component
// tabs.forEach(t => t.addEventListener('click',() =>
//   console.log('tab')
// ))
tabsContainer.addEventListener('click', function (e) {
  const clicked = e.target.closest('.operations__tab');
  // console.log(clicked);
  // Guard Closure
  if (!clicked) return 0;
  tabs.forEach(t => t.classList.remove('operations__tab--active'));
  tabsContent.forEach(c => c.classList.remove('operations__content--active'));
  // Active Tab
  clicked.classList.add('operations__tab--active');
  // Active content Area
  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add('operations__content--active');
});

// Menu Fade Animations
const handleOver = function (e) {
  if (e.target.classList.contains('nav__link')) {
    const link = e.target;
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('img');
    siblings.forEach(el => {
      if (el !== link) el.style.opacity = this;
    });
    logo.style.opacity = this;
  }
};
nav.addEventListener('mouseover', handleOver.bind(0.5));
nav.addEventListener('mouseout', handleOver.bind(1));

// Sticky navigation
// const initialCords = section1.getBoundingClientRect();
// console.log(initialCords);
// window.addEventListener('scroll', function () {
//   if (this.window.scrollY > initialCords.top) nav.classList.add('sticky');
//   else nav.classList.remove('sticky')
// });
// Intersection Observer Api
// const callBack = function(entries,observer){
//   entries.forEach(entry => {console.log(entry);})

// }
// const obsOptions = {
//   root:null,
//   threshold:0.2
// }
// const observer = new IntersectionObserver(callBack,obsOptions)
// observer.observe(section1)
const header = document.querySelector('.header');
const navHeight = nav.getBoundingClientRect().height;
const callBack = function (entries) {
  const [entry] = entries;

  if (!entry.isIntersecting) nav.classList.add('sticky');
  else nav.classList.remove('sticky');
};
const obsOptions = {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
};
const interObs = new IntersectionObserver(callBack, obsOptions);
interObs.observe(header);
// Reveal Sections
const allSections = document.querySelectorAll('.section');
const reveal = function (entries, Observer) {
  const [entry] = entries;

  if (!entry.isIntersecting) return;
  entry.target.classList.remove('section--hidden');
  Observer.unobserve(entry.target);
};
const secOptions = {
  root: null,
  threshold: 0.15,
};
const revealSections = new IntersectionObserver(reveal, secOptions);
allSections.forEach(function (section) {
  revealSections.observe(section);
  // section.classList.add('section--hidden');
});
// Lazy Loading Images
const laziImages = document.querySelectorAll('img[data-src]');

const loadingImg = function (entries, Observer) {
  const [entry] = entries;

  if (!entry.isIntersecting) return;
  entry.target.src = entry.target.dataset.src;
  entry.target.addEventListener('load', function () {
    entry.target.classList.remove('lazy-img');
  });
};
const imgOptions = {
  root: null,
  threshold: 0,
  rootMargin: '10px',
};

const imgLoading = new IntersectionObserver(loadingImg, imgOptions);
laziImages.forEach(img => imgLoading.observe(img));
// Sliders
const slides = document.querySelectorAll('.slide');
const btnLeft = document.querySelector('.slider__btn--left');
const btnRight = document.querySelector('.slider__btn--right');
const sliders = document.querySelector('.slider');
const dotsContainer = document.querySelector('.dots');
let currentSlide = 0;
let maxSlide = slides.length;
const createDots = function () {
  slides.forEach(function (_, i) {
    dotsContainer.insertAdjacentHTML(
      'beforeend',
      `<button class="dots__dot" data-slide="${i}"></button>`
    );
  });
};
createDots();
const activeDots = function (slide) {
  document
    .querySelectorAll('.dots__dot')
    .forEach(dot => dot.classList.remove('dots__dot--active'));
  document
    .querySelector(`.dots__dot[data-slide="${slide}"]`)
    .classList.add('dots__dot--active');
};

// sliders.style.transform = 'scale(0.3) translateX(-1000px)';
// sliders.style.overflow = 'visible';
const goToSlide = function (slide) {
  slides.forEach(
    (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`)
  );
};
activeDots(0);
goToSlide(0);

const nextSlide = function () {
  if (currentSlide === maxSlide - 1) {
    currentSlide = 0;
  } else {
    currentSlide++;
  }

  goToSlide(currentSlide);
  activeDots(currentSlide);
};
const previousSlide = function () {
  if (currentSlide === 0) {
    currentSlide = maxSlide - 1;
  } else {
    currentSlide--;
  }

  goToSlide(currentSlide);
  activeDots(currentSlide);
};
btnRight.addEventListener('click', nextSlide);
btnLeft.addEventListener('click', previousSlide);
document.addEventListener('keydown', function (e) {
  console.log(e.key);
  if (e.key === 'ArrowLeft') previousSlide();
  if (e.key === 'ArrowRight') nextSlide();
});
dotsContainer.addEventListener('click', function (e) {
  if (e.target.classList.contains('dots__dot')) console.log('dot');
  const { slide } = e.target.dataset;
  goToSlide(slide);
  activeDots(slide);
});

///////////////////////////////////
//selecting elements
// console.log(document.documentElement);
// console.log(document.head);
// console.log(document.body);
// const header = document.querySelector('.header');
// const allSelections = document.querySelectorAll('.section');
// console.log(allSelections);
// document.getElementById('section--1');
// const allButtons = document.getElementsByTagName('button');
// console.log(allButtons);
// console.log(document.getElementsByClassName('btn'));

// //creating and inserting elements
// //.insertadjasentElement
// const massage = document.createElement('div');
// massage.classList.add('cookie--massage');
// massage.innerHTML =
//   'we use cookied for improved fuctionalities and analytics.<button class = "btn btn--closed-cookied">got it!</button>';

// header.prepend(massage);
// // header.append(massage);
// // header.append(massage.cloneNode(true))

// // header.before(massage)
// // header.after(massage)
// // deleting an element
// document
//   .querySelector('.btn--closed-cookied')
//   .addEventListener('click', function () {
//     massage.remove();
//     // massage.preventElement.removechild(massage)
//   });

// // style/
// massage.style.backgroundColor = 'blue';
// massage.style.width = '120%';
// console.log(massage.style.height); //gives those values only which are decided inline
// console.log(massage.style.backgroundColor);
// console.log(getComputedStyle(massage).height);
// console.log(getComputedStyle(massage).color)

// massage.style.height = Number.parseFloat(getComputedStyle(massage).height ,10)+40 +'px'//with this expression we can manipulate css properties
// document.documentElement.style.setProperty('--color-primary','orangered')
// //attributes
// const logo = document.querySelector('.nav__logo')
// console.log(logo.alt);
// console.log(logo.src)
// console.log(logo.className);
// logo.alt = 'beautiful minimalist logo'

// //Non Standard
// console.log(logo.designer);
// console.log(logo.getAttribute('designer'));//for getting non standard attributes from html file
// logo.setAttribute('company','Bankist')

// console.log(logo.src);
// console.log(logo.getAttribute('src'));

// const links = document.querySelector('.nav__link--btn');
// console.log(links.href);
// console.log(links.getAttribute('href'));

// //data Attributes

// console.log(logo.dataset.versionNumber);

// // classes
// logo.classList.add('a')//we can also pass multiple classnames
// logo.classList.remove('a')
// logo.classList.toggle('a')
// logo.classList.contains('a')
// const alerth1 = function (e) {
//   alert('click mat kar bhosdike');
//   h1.removeEventListener('mouseenter', alerth1);
// };

// h1.addEventListener('mouseenter', alerth1);
// // h1.onmouseenter = function(e){
// //   alert('teri mma ki chut!')
// // }
// setTimeout(() => h1.removeEventListener('mouseenter',alerth1),5000);
//rgb(255,255,255)

// bubbling and capturing

// const randomInt = (max, min) =>
//   Math.floor(Math.random() * (max - min + 1) + min);
// const randomColor = () =>
//   `rgb(${randomInt(0, 255)},${randomInt(0, 255)},${randomInt(0, 255)})`;

// console.log(randomColor());

// document.querySelector('.nav__link').addEventListener('click', function (e) {
//   this.style.backgroundColor = randomColor();
//   console.log('link', e.target, e.currentTarget);
//   // stop propogation
//   e.stopPropagation();
// });
// document.querySelector('.nav__links').addEventListener('click', function (e) {
//   this.style.backgroundColor = randomColor();
//   console.log('container', e.target, e.currentTarget);
// });
// document.querySelector('.nav').addEventListener('click', function (e) {
//   this.style.backgroundColor = randomColor();
//   console.log('nav', e.target, e.currentTarget);
// });

// dom traversing
// Going Downwards : Child
// console.log(h1)
// console.log(h1.querySelectorAll('.highlight'))
// console.log(h1.childNodes)
// console.log(h1.children)
// h1.firstElementChild.style.color = 'red'
// h1.lastElementChild.style.color = 'yellow'

// // Going Upward : parents
// console.log(h1.parentNode);
// console.log(h1.parentElement);

// h1.closest('.header').style.background = 'var(--gradient-primary)'
// h1.closest('h1').style.background = 'var(--gradient-secondary)'

// // Going sideways : siblings
// console.log(h1.previousElementSibling);
// console.log(h1.nextElementSibling);

// console.log(h1.previousSibling);
// console.log(h1.nextSibling);

// console.log(h1.parentElement.children);
// const siblingss = h1.parentElement.children;
// [...siblingss].forEach(function(el){
//   if(el !== h1) {
//     el.style.color = 'white'
//   }
// })
// sum = 0
// const points = function(games){

//   games.forEach(mov => sum += mov[0])
//   return sum
// }
// console.log(points(["1:0","2:0","3:0","4:0","2:1","3:1","4:1","3:2","4:2","4:5"]))
document.addEventListener('DOMContentLoaded', function (e) {
  console.log('html parsed and dom tree loaded', e);
});
window.addEventListener('load', function (e) {
  console.log('page fully loaded', e);
});
window.addEventListener('beforeunload', function (e) {
  e.preventDefault();
  console.log(e);
  e.returnValue = '';
});
