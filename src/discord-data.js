import discordJson from './db.json';

var imageCount = getTotalNumberOfImages();
var imagesPerColumn = imageCount <= 4 ? 1 : Math.ceil(imageCount / 4);

var container = $(`<div class="column"></div>`).appendTo("#lightgallery");
var imageCountInCurrentColumn = 0;
console.log(`Number of images ${imageCount}.`, `Number of images per column ${imagesPerColumn}.`);

for (var messageId of Object.keys(discordJson)) {
  var message = discordJson[messageId];

  var urls = message["urls"];
  if (!Array.isArray(urls)) {
    continue;
  }

  for (var i = 0; i < urls.length; i++) {
    if (imageCountInCurrentColumn >= imagesPerColumn) {
      imageCountInCurrentColumn = 0;
      container = $(`<div class="column"></div>`).insertAfter(container);
    }

    var url = urls[i];

    $(`
      <a title="" href="${url.url}" class="grid-item" data-jump_url="${message["jump_url"]}">
        <img src="${url.img}" alt=""></img>

        <div class="info">
          <div class="message">${message["message"]}</div>
          <div class="author">${message["author"]}</div>
          <div class="date">${message["created_at"] ? message["created_at"] : ""}</div>
        </div>

        <i class="fas fa-search">
      </a>
    `).appendTo(container);

    imageCountInCurrentColumn++;
  }
}

function getTotalNumberOfImages() {
  var imageCount = 0;

  for (var messageId of Object.keys(discordJson)) {
    var message = discordJson[messageId];

    var urls = message["urls"];
    if (!Array.isArray(urls)) {
      continue;
    }

    for (var i = 0; i < urls.length; i++) {
      imageCount++;
    }
  }

  return imageCount;
}

$("#lightgallery").on('onBeforeSlide.lg',function(event, prevIndex, index, fromTouch, fromThumb) {
  console.log(index);
  var currentSlide = $("#lightgallery .grid-item").eq(index);
  var jumpUrl = currentSlide.data("jump_url");

  $('.lg-toolbar').append(`<a target="_blank" class="lg-icon" href="${jumpUrl}"><i class="fab fa-discord"></i></a>`);
});
