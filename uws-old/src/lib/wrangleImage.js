const imgs = document.getElementsByClassName('img');
let timer;

function fadeInImage(img) {
  if (img.hasAttribute('data-src')) {
    const src = img.getAttribute('data-src');
    img.setAttribute('src', src);
    img.onload = function () {
      img.removeAttribute('data-src');
    };
  }
}

function inView() {
  const wT = window.pageYOffset;
  const wB = wT + window.innerHeight;
  let p = 0;
  while (p < imgs.length) {
    const cRect = imgs[p].getBoundingClientRect();
    const pT = wT + cRect.top;
    const pB = pT + cRect.height;
    if (wT < pB && wB > pT) fadeInImage(imgs[p]);
    p++;
  }
}

export function checkOnComponentMount() {
  requestAnimationFrame(inView);
}

function scroller() {
  timer = timer || setTimeout(() => {
    timer = null;
    requestAnimationFrame(inView);
  }, 300);
}

export function addScrollListeners() {
  window.addEventListener('scroll', scroller, false);
  window.addEventListener('resize', scroller, false);
}

export function removeScrollListeners() {
  window.removeEventListener('scroll', scroller, false);
  window.removeEventListener('resize', scroller, false);
}
