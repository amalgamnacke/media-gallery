require('bootstrap');
require('lightgallery');
require('lg-zoom');
require('lg-video');
require('lg-fullscreen');
require('lg-hash');

require("masonry-layout/dist/masonry.pkgd.min");
require('imagesloaded');

const eva = require('eva-icons');

require('./discord-data');
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
