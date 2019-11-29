import discordJson from './db.json';
const packery = require('packery');

function renderMedia(containerSelector, amount, offset) {
  var renderedImageCount = 0;

  for (var messageId of Object.keys(discordJson).slice(offset)) {
    if (renderedImageCount >= amount) {
      return;
    }

    var message = discordJson[messageId];

    var urls = message["urls"];
    if (!Array.isArray(urls)) {
      // Message contains no urls, should never happen.
      continue;
    }

    for (var i = 0; i < urls.length; i++) {
      if (renderedImageCount >= amount) {
        return;
      }

      var url = urls[i];
      var gridItem = $(`<a title="" href="${url.url}" class="grid-item " data-jump_url="${message["jump_url"]}">
          <img src="${url.img}" alt=""></img>

          <div class="info">
            <div class="message">${message["message"]}</div>
            <div class="author">${message["author"]}</div>
            <div class="date">${message["created_at"] ? message["created_at"] : ""}</div>
          </div>

          <i class="fas fa-search">
        </a>
      `);

      $(".grid").packery().append(gridItem).packery("appended", gridItem).packery();

      renderedImageCount++;
    }
  }
}

renderMedia("#lightgallery", 50, 0);

$("#lightgallery").on('onBeforeSlide.lg',function(event, prevIndex, index, fromTouch, fromThumb) {
  var currentSlide = $("#lightgallery .grid-item").eq(index);
  var jumpUrl = currentSlide.data("jump_url");

  $('.lg-toolbar').append(`<a target="_blank" class="lg-icon" href="${jumpUrl}"><i class="fab fa-discord"></i></a>`);
});

var cur = 51;
$(window).scroll(function() {
  var position = Math.round($(window).scrollTop());
  var bottom = $(document).height() - $(window).height();

  if((position + 500) >= bottom) {
    renderMedia(".grid", 20, cur);

    $(".grid").data("lightGallery").destroy(true);
    $(".grid").lightGallery({
      "selector": ".grid-item",
      "counter": false,

      "controls": false,
      "enableDrag": false,
      "enableSwipe": false
    });
    $(".grid").packery();

    cur = cur + 20;
  }
});
