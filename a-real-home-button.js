// ==UserScript==
// @name             A real home button
// @namespace        Violentmonkey Scripts
// @match            *://*/*
// @noframes
// @grant            window.close
// @version          1.4.3
// @author           KristhianX
// @description      Adds homepage, new tab and close tab buttons to android Firefox. 10/12/2023, 9:24:24 PM
// @icon             data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-home"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
// @supportURL       https://github.com/KristhianX/a-real-home-button/issues
// @homepageURL      https://github.com/KristhianX/a-real-home-button
// @license          GPL-3.0-or-later
// ==/UserScript==


// URL for the homepage and new tab buttons.
// Set the height of the toolbar.
const homepageURL = 'https://web.tabliss.io';
const newTabURL = 'https://web.tabliss.io';
const toolbarHeight = '7';


// Inline svg icons and default css style for the buttons.
// All icons from https://github.com/feathericons/feather
const svgHome = '<svg xmlns="http://www.w3.org/2000/svg" width="60%" height="60%" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" background="transparent" color="#fff" class="feather feather-home"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>';
const svgPlus = '<svg xmlns="http://www.w3.org/2000/svg" width="60%" height="60%" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" background="transparent" color="#fff" class="feather feather-plus-square"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="12" y1="8" x2="12" y2="16"></line><line x1="8" y1="12" x2="16" y2="12"></line></svg>';
const svgUp = '<svg xmlns="http://www.w3.org/2000/svg" width="60%" height="60%" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" background="transparent" color="#fff" class="feather feather-arrow-up-circle"><circle cx="12" cy="12" r="10"></circle><polyline points="16 12 12 8 8 12"></polyline><line x1="12" y1="16" x2="12" y2="8"></line></svg>';
const svgDown = '<svg xmlns="http://www.w3.org/2000/svg" width="60%" height="60%" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" background="transparent" color="#fff" class="feather feather-arrow-down-circle"><circle cx="12" cy="12" r="10"></circle><polyline points="8 12 12 16 16 12"></polyline><line x1="12" y1="8" x2="12" y2="16"></line></svg>';
const svgEyeOff = '<svg xmlns="http://www.w3.org/2000/svg" width="60%" height="60%" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" background="transparent" color="#fff" class="feather feather-eye-off"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="1" x2="23" y2="23"></line></svg>';
const svgClose = '<svg xmlns="http://www.w3.org/2000/svg" width="60%" height="60%" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" background="transparent" color="#fff" class="feather feather-x-circle"><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg>';
const defaultButtonStyle = 'height: 100%; aspect-ratio: 1; cursor: pointer; border: none; border-radius: 20%; background: transparent';


// Creating the iframe with the maximum z-index value to ensure it is allways on top.
// Placing it outside the body to make it be on top of other elements with max z-index in the body.
const iframeToolbar = document.createElement('iframe');
iframeToolbar.style = 'height: ' + toolbarHeight + 'vh; bottom: 0px; left: 0px; width: 100vw; position: fixed; z-index: 2147483647; margin: 0; padding: 0; border: 0; background: transparent; color-scheme: light';
document.body.insertAdjacentElement('afterend', iframeToolbar);


// Creating the toolbar.
const customToolbar = document.createElement('div');
customToolbar.style = 'height: 100%; padding: 0 4%; box-sizing: border-box; display: flex; justify-content: space-between; width: 100%; background-color: #2b2a33cc; border-top: 2px solid #38373f';
iframeToolbar.addEventListener('load', function() {
  iframeToolbar.contentWindow.document.body.appendChild(customToolbar);
  iframeToolbar.contentWindow.document.body.style = 'margin: 0; height: 100%';
});


// Creating the buttons. All of them will have a simple background change as pressed feedback and then the action will be executed. Default delay 200ms.
const homeButton = document.createElement('button');
homeButton.innerHTML = svgHome;
homeButton.style = defaultButtonStyle;
homeButton.addEventListener('click', function() {
  homeButton.style.background = '#6eb9f7cc';
  setTimeout(function() {
    homeButton.style.background = 'transparent';
    window.open(homepageURL, '_self');
  }, 200);
});


const moveButton = document.createElement('button');
moveButton.innerHTML = svgUp;
moveButton.style = defaultButtonStyle;
moveButton.addEventListener('click', function() {
  moveButton.style.background = '#6eb9f7cc';
  setTimeout(function() {
    if (iframeToolbar.style.bottom === '0px') {
      iframeToolbar.style.bottom = 'unset';
      iframeToolbar.style.top = '0px';
      customToolbar.style.borderTop = 'unset';
      customToolbar.style.borderBottom = '2px solid #38373f';
      moveButton.innerHTML = svgDown;
    } else {
      iframeToolbar.style.top = 'unset';
      iframeToolbar.style.bottom = '0px';
      customToolbar.style.borderBottom = 'unset';
      customToolbar.style.borderTop = '2px solid #38373f';
      moveButton.innerHTML = svgUp;
    };
    moveButton.style.background = 'transparent';
  }, 200);
});


const hideToolbarButton = document.createElement('button');
hideToolbarButton.innerHTML = svgEyeOff;
hideToolbarButton.style = defaultButtonStyle;
hideToolbarButton.addEventListener('click', function() {
  hideToolbarButton.style.background = '#6eb9f7cc';
  setTimeout(function() {
    hideToolbarButton.style.background = 'transparent';
    customToolbar.style = 'display: none';
  }, 200);
});


const closeTabButton = document.createElement('button');
closeTabButton.innerHTML = svgClose;
closeTabButton.style = defaultButtonStyle;
closeTabButton.addEventListener('click', function() {
  closeTabButton.style.background = '#6eb9f7cc';
  setTimeout(function() {
    closeTabButton.style.background = 'transparent';
    window.close();
  }, 200);
});


const newTabButton = document.createElement('button');
newTabButton.innerHTML = svgPlus;
newTabButton.style = defaultButtonStyle;
newTabButton.addEventListener('click', function() {
  newTabButton.style.background = '#6eb9f7cc';
  setTimeout(function() {
    newTabButton.style.background = 'transparent';
    window.open(newTabURL, '_blank');
  }, 200);
});


// Appending the buttons.
customToolbar.appendChild(homeButton);
customToolbar.appendChild(hideToolbarButton);
customToolbar.appendChild(moveButton);
customToolbar.appendChild(closeTabButton);
customToolbar.appendChild(newTabButton);


// Hide the iframe when scrolling. By default ignores changes in the scrolling smaller than 10.
let prevScrollPos = window.pageYOffset;
window.addEventListener('scroll', function() {
  let currentScrollPos = window.pageYOffset;
  if (Math.abs(prevScrollPos - currentScrollPos) <= 10) {
    return;
  }
  if (prevScrollPos > currentScrollPos) {
    iframeToolbar.style.display = 'block';
  } else {
    iframeToolbar.style.display = 'none';
  };
  prevScrollPos = currentScrollPos;
});

