"use strict";

/* Init FastClick library */
if ('addEventListener' in document) {
  document.addEventListener('DOMContentLoaded', function () {
    FastClick.attach(document.body);
  }, false);
}

window.addEventListener('load', function () {
  /* Set --window-height variable or update inline styles if custom properties are not supported */
  function setWindowHeight() {
    if ('CSS' in window && CSS.supports('color', 'var(--color-var)')) {
      document.getElementsByTagName('body')[0].style.setProperty('--window-height', "".concat(window.innerHeight, "px"));
    } else {
      var minHeightVp = document.querySelectorAll('.min-height-vp');
      var heightVp = document.querySelectorAll('.height-vp');
      Array.prototype.forEach.call(minHeightVp, function (element) {
        element.style.minHeight = "".concat(window.innerHeight, "px");
      });
      Array.prototype.forEach.call(heightVp, function (element) {
        element.style.height = "".concat(window.innerHeight, "px");
      });
    }
  }

  setWindowHeight();
  /* Detect mobile or tablet */

  var isMobile = false;

  if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i.test(navigator.userAgent)) {
    isMobile = true;
  }
  /* Capturing screen resizing to fire the function if needed */


  var width = window.innerWidth;
  var height = window.innerHeight;
  window.addEventListener('resize', function (e) {
    document.querySelector('meta[name=viewport]').setAttribute('content', 'width=device-width, height=device-height, initial-scale=1, minimum-scale=1, shrink-to-fit=no');
    var widthChange = false;
    var heightChange = false;

    if (width !== e.target.innerWidth) {
      width = e.target.innerWidth;
      widthChange = true;
    }

    if (height !== e.target.innerHeight) {
      height = e.target.innerHeight;
      heightChange = true;
    }

    if (!isMobile && heightChange === true || isMobile && widthChange === true) {
      setWindowHeight();
    }
  });
});