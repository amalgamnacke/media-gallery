require('bootstrap');
//require('masonry-layout/dist/masonry.pkgd.min');
require('lightgallery');
require('lg-zoom');
require('lg-video');
require('lg-fullscreen');
require('lg-hash');

//require('isotope-layout');
//require('isotope-packery');


require("isotope-layout/dist/isotope.pkgd.min");
require('isotope-packery/packery-mode');
require('packery');
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

  // init Packery
  $('.grid').packery({
    itemSelector: '.grid-item',
    gutter: 7,
    percentPosition: true
  });
  // layout Packery after each image loads
  $(".grid").imagesLoaded().progress(function() {
    console.log("image loaded!");
    $(".grid").packery();


  });
});

// Load the gallery.
/*require(['lightgallery.js'], function() {
  lightGallery(document.getElementById('lightgallery'), {
    thumbnail: true,
    useCSS: true
  });
});*/



/*require(['masonry-layout'], function($) {
  $('#lightgallery').masonry({
    // options...
    itemSelector: '.item',
    columnWidth: 200
  });
});*/
