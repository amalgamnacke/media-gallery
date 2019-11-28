require('bootstrap');
require('masonry-layout/dist/masonry.pkgd.min');
require('lightgallery');
require('lg-zoom');
require('lg-video');
require('lg-fullscreen');
require('lg-hash');
const eva = require('eva-icons');

import './discord-data'
import './scss/app.scss';

$(document).ready(function() {
  $("#lightgallery").lightGallery({
    "selector": ".grid-item",
    "counter": false,

    "controls": false,
    "enableDrag": false,
    "enableSwipe": false
  });

  /*$('.grid').masonry({
    // set itemSelector so .grid-sizer is not used in layout
    itemSelector: '.grid-item',
    // use element for option
    columnWidth: '.grid-sizer',
    percentPosition: true
  });*/
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
