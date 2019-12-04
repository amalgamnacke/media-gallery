import discordJson from './db.json';

let config = {
  rootMargin: '400px',
  threshold: 0.0
}
let observer = new IntersectionObserver(function(entries, self) {
  entries.forEach(entry => {
    if(entry.isIntersecting) {
      $(entry.target).css("visibility", "");
    } else {
      $(entry.target).css("visibility", "hidden");
    }
  });
}, config);


function kek() {
  var filteredJson = {};

  for (var messageId of Object.keys(discordJson)) {
    var message = discordJson[messageId];

    if (message.author === "masserbart") {
      filteredJson[messageId] = message;
    }
  }

  return filteredJson;
}
function renderMedia(containerSelector, amount, offset, isInitialCall = true) {
  var renderedImageCount = 0;
  var container = $(containerSelector);
  var gridItems = [];

  for (var messageId of Object.keys(kek()).slice(offset)) {
    if (renderedImageCount >= amount) {
      break;
    }

    var message = discordJson[messageId];

    var urls = message["urls"];
    if (!Array.isArray(urls)) {
      // Message contains no urls, should never happen.
      continue;
    }

    for (var i = 0; i < urls.length; i++) {
      if (renderedImageCount >= amount) {
        break;
      }

      var url = urls[i];

      var gridItem = $(`<a title="" href="${url.url}" class="grid-item not-loaded" data-jump_url="${message["jump_url"]}">
          <img src="${url.img}" alt=""></img>

          <div class="info">
            <div class="message">${message["message"]}</div>
            <div class="author">${message["author"]}</div>
            <div class="date">${message["created_at"] ? message["created_at"] : ""}</div>
          </div>

          <i class="fas fa-search">
        </a>
      `);
      gridItems.push(gridItem);

      renderedImageCount++;
    }

    container.append(gridItems)
  }

  if (isInitialCall) {
    $(".grid .not-loaded").removeClass("not-loaded");
  }

  if (!isInitialCall) {
    $(gridItems).each(function() {
      $(".grid").masonry('appended', $(this).get(0));
    });

    $(gridItems).imagesLoaded().always(function() {
      $(".grid").masonry("layout");

      $(gridItems).each(function() {
        $(this).removeClass("not-loaded");
      });
    });
  }

  $(gridItems).each(function() {
    observer.observe($(this).get(0));
  });
}

renderMedia("#lightgallery", 30, 0);

$("#lightgallery").on('onBeforeSlide.lg',function(event, prevIndex, index, fromTouch, fromThumb) {
  var currentSlide = $("#lightgallery .grid-item").eq(index);
  var jumpUrl = currentSlide.data("jump_url");

  $('.lg-toolbar').append(`<a target="_blank" class="lg-icon" href="${jumpUrl}"><i class="fab fa-discord"></i></a>`);
});

var renderedImageCount = 31;
$(window).scroll(function() {
  var position = Math.round($(window).scrollTop());
  var bottom = $(document).height() - $(window).height();
  var browserHeight = $(window).height();

  if((position + browserHeight) >= bottom) {
    renderMedia("#lightgallery", 10, renderedImageCount, false);

    $(".grid").data("lightGallery").destroy(true);
    $(".grid").lightGallery({
      "selector": ".grid-item",
      "counter": false,

      "controls": false,
      "enableDrag": false,
      "enableSwipe": false
    });

    renderedImageCount = renderedImageCount + 10;
  }
});
