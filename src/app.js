// Load libs.
require('bootstrap');
require('lightgallery');
require('lg-zoom');
require('lg-video');
require('lg-fullscreen');
require("masonry-layout/dist/masonry.pkgd.min");
require('imagesloaded');
require('eva-icons');

// Load local js.
require('./discord-data');

// Load local css.
require('./scss/app.scss');

$(document).ready(function() {
  $("#lightgallery").lightGallery({
    "selector": ".grid-item",
    "counter": false,
    "controls": false,
    "enableDrag": false,
    "enableSwipe": false
  });
  
  $(".grid").imagesLoaded().always(function() {
    $('.grid').masonry({
      itemSelector: ".grid-item",
      resize: true,
      gutter: 10,
      transitionDuration: 0
    });
  });
});
