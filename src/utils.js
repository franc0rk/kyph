import DomToImage from "dom-to-image";

export function downloadImage(node, fileName) {
  DomToImage.toJpeg(node, {
    quality: 1,
  }).then(function (dataUrl) {
    var link = document.createElement("a");
    link.download = fileName;
    link.href = dataUrl;
    link.click();
  });
}
