/* Init FastClick library */

if ('addEventListener' in document) {
  document.addEventListener('DOMContentLoaded', function() {
    FastClick.attach(document.body);
  }, false);
}

window.addEventListener('load', () => {

  /* Set --window-height variable or update inline styles if custom properties are not supported */
  function setWindowHeight() {

    if('CSS' in window && CSS.supports('color','var(--color-var)')) {
      document.getElementsByTagName('body')[0].style.setProperty('--window-height', `${window.innerHeight}px`);
    } 
    else {
        
      const minHeightVp = document.querySelectorAll('.min-height-vp');
      const heightVp = document.querySelectorAll('.height-vp');

      Array.prototype.forEach.call(minHeightVp, function (element) {
        element.style.minHeight = `${window.innerHeight}px`;
      });      

      Array.prototype.forEach.call(heightVp, function (element) {
        element.style.height = `${window.innerHeight}px`;
      });
    }
  }

  setWindowHeight();

  
  /* Detect mobile or tablet */
  let isMobile = false;

  if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i.test(navigator.userAgent)) {
    isMobile = true;
    document.documentElement.classList.add('is-mobile');
    document.documentElement.setAttribute('data-mobile', 'true');
  }

  /* Capturing screen resizing to fire the function if needed */  

  let width = window.innerWidth;
  let height = window.innerHeight;

  window.addEventListener('resize', (e) => {
    document.querySelector('meta[name=viewport]').setAttribute(
      'content',
      'width=device-width, height=device-height, initial-scale=1, minimum-scale=1, shrink-to-fit=no',
    );

    let widthChange = false;
    let heightChange = false;

    if (width !== e.target.innerWidth) {
      width = e.target.innerWidth;
      widthChange = true;
    }

    if (height !== e.target.innerHeight) {
      height = e.target.innerHeight;
      heightChange = true;
    }

    if ((!isMobile && heightChange === true) || (isMobile && widthChange === true)) {
      setWindowHeight();
    }
  });

});
