document.addEventListener('DOMContentLoaded', function() {
  
  /* We use keys to toggle helpers, so we need to check that there's no input in focus same time  */
  const allInputs = document.querySelectorAll('input, textarea');
  var isInInput   = false;
    
  Array.prototype.forEach.call(allInputs, function (element) {

    element.addEventListener('focus', function() {
      isInInput = true;
    });

    element.addEventListener('blur', function() {
      isInInput = false;
    });
    
  });
    
  
  /* Setup .layout-grid and .layout-breakpoints through including a template */  
  var xhr = new XMLHttpRequest();    
  xhr.open('GET', '/__core/__layout-helpers/layout-helpers.html'); 
  xhr.onload = function () {
      
    if (xhr.readyState == 4 && xhr.status == 200) {

      /* Insert guides into a document */
      document.body.insertAdjacentHTML('afterbegin', xhr.responseText);

      /* Define element and key listeners */
      const layoutGuides = document.getElementsByClassName('layout-guides')[0];
      const layoutBreakpoints = document.getElementsByClassName('layout-breakpoints')[0];

      /* Check if one or both toggled before page reloaded */
      const layoutsHelpers = {71: layoutGuides, 66: layoutBreakpoints};
      
      for (var keyCode in layoutsHelpers) {    
        if (sessionStorage.getItem(keyCode) && sessionStorage.getItem(keyCode) == 1) {     
            layoutsHelpers[keyCode].setAttribute('data-visible', 1);
            layoutsHelpers[keyCode].style.opacity = 1;     
        }    
      }

      /* Toggle layout helpers with keys and store toggle status */
      window.addEventListener('keydown', function(e) {
        if (isInInput == false) {
          
          // 71 = 'g', 66 = 'b'
          if (e.keyCode == 71 || e.keyCode == 66) {

            var layoutHelper = (e.keyCode == 71) ? layoutGuides : layoutBreakpoints;
            var value = (layoutHelper.getAttribute('data-visible') == 1) ? 0 : 1;
            layoutHelper.setAttribute('data-visible', value);
            layoutHelper.style.opacity = value;
            sessionStorage.setItem(e.keyCode, value);
          }
        }
      });

    } // if (xhr.readyState == 4 && xhr.status == 200)
    else {
      console.log("Error: cannot load layout helpers. I have no idea why. Check it yourself or open an issue on Github.");
    }
    
  }
  xhr.send(null);
    
    
  /* Other helpers: blurred content, outlined elements and cursor off */  
  const otherHelpers = {
    82: {item: 'wrapperBlur', class: 'wrapper--blur', el: '.wrapper'},
    68: {item: 'wrapperOutline', class: 'wrapper--outlined', el: '.wrapper'},
    77: {item: 'mouseKill', class: 'mouse-killed', el: 'html'}
  };
  
  
  /* Check if any were toggled before page reloaded */   
  for (var keyCode in otherHelpers) {
    if (sessionStorage.getItem(otherHelpers[keyCode].item) !== null && 
        sessionStorage.getItem(otherHelpers[keyCode].item) == 1) {
          document.querySelector(otherHelpers[keyCode].el).classList.add(otherHelpers[keyCode].class);
    }      
  }  
  
  
  /* Toggle helpers with keys and store toggle status */
  
  window.addEventListener('keydown', function(e) {    
    if (isInInput == false && (e.keyCode == 82 || e.keyCode == 68 || e.keyCode == 77)) {      
      var value = (document.querySelector(otherHelpers[e.keyCode].el).classList.contains(otherHelpers[e.keyCode].class)) ? 0 : 1;
      sessionStorage.setItem(otherHelpers[e.keyCode].item, value);
      document.querySelector(otherHelpers[e.keyCode].el).classList.toggle(otherHelpers[e.keyCode].class);      
    }    
  });
    
});
