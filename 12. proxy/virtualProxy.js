class Image {
  constructor(url) {
    this.url = url;
    console.log(`Logging image from ${url}`);
  }
  draw() {
    console.log(`Drawing image from ${this.url}`);
  }
}

// If we don't call draw, memory will be wasted

function drawImage(img) {
  console.log("About to draw image");
  img.draw();
  console.log(`Done drawing the image`);
}

let img = new Image("https://someurl");
drawImage(img);

/**
 * In Lazy Image, we won't load the image untill draw is called
 */
class LazyImage {
  constructor(url) {
    this.url = url;
  }
  draw() {
    if (!this.image) {
      this.image = new Image(this.url);
    }
    this.image.draw();
  }
}
let lazyimg = new LazyImage("https://someurl");
drawImage(lazyimg);
