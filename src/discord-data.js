import discordJson from './db.json';

var imageCount = getTotalNumberOfImages();
var imagesPerColumn = imageCount <= 4 ? 1 : Math.ceil(imageCount / 4);

var container = $(`<div class="column"></div>`).appendTo("#lightgallery");
var imageCountInCurrentColumn = 0;
console.log(`Number of images ${imageCount}.`, `Number of images per column ${imagesPerColumn}.`);

for (var messageId of Object.keys(discordJson)) {
  var message = discordJson[messageId];

  var attachments = message["attachments"];
  if (!Array.isArray(attachments)) {
    console.log("attachments null! :D");
    continue;
  }

  for (var i = 0; i < message["attachments"].length; i++) {
    if (imageCountInCurrentColumn >= imagesPerColumn) {
      imageCountInCurrentColumn = 0;
      container = $(`<div class="column"></div>`).insertAfter(container);
    }

    var attachment = message["attachments"][i];

    $(`
      <a href="${attachment["url"]}" class="grid-item">
        <img src="${attachment["url"]}"></img>
      </a>
    `).appendTo(container);

    imageCountInCurrentColumn++;
  }
}

function getTotalNumberOfImages() {
  var imageCount = 0;

  for (var messageId of Object.keys(discordJson)) {
    var message = discordJson[messageId];

    var attachments = message["attachments"];
    if (!Array.isArray(attachments)) {
      continue;
    }

    for (var i = 0; i < message["attachments"].length; i++) {
      imageCount++;
    }
  }

  return imageCount;
}
