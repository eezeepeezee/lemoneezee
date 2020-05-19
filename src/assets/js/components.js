"use strict";

window.addEventListener('load', function () {
  function initNiceLabel() {
    /* Find all the text inputs on the page */
    var textInputs = document.querySelectorAll('.nice-label input[type=email], .nice-label input[type=file], .nice-label input[type=image], .nice-label input[type=password], .nice-label input[type=range], .nice-label input[type=search], .nice-label input[type=tel], .nice-label input[type=text], .nice-label input[type=url], .nice-label textarea');
    textInputs = [].slice.call(textInputs);
    /* Find all the labels and place them into array too */

    var labels = [];
    textInputs.forEach(function (eachInput) {
      labels.push(eachInput.parentNode.previousSibling);
    });
    /* Listen for focus and blur events to toggle class */

    textInputs.forEach(function (eachInput, index) {
      eachInput.addEventListener('focus', function () {
        if (!labels[index].classList.contains('moved')) {
          labels[index].classList.add('moved');
        }
      });
      eachInput.addEventListener('blur', function (e) {
        if (e.target.value === '' || e.target.value === undefined) {
          labels[index].classList.remove('moved');
        }
      });
    });
  }

  initNiceLabel();
});
//# sourceMappingURL=maps/components.js.map
