function setup() {
  console.log("[+] Setup initialized - P5 is running");

  createCanvas(400, 400)
  imageMode(CENTER);
  angleMode(DEGREES);
}

function draw() {
  // background(cornerImg);
  translate(width / 2, height / 2); 
  rotate(90);
  image(edgeImg, 50, 50);
}