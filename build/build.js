function setup() {
    console.log("[+] Setup initialized - P5 is running");
    createCanvas(400, 400);
    imageMode(CENTER);
    angleMode(DEGREES);
}
function draw() {
    translate(width / 2, height / 2);
    rotate(90);
    image(edgeImg, 50, 50);
}
var cornerImg;
var edgeImg;
var internalImg;
function preload() {
    cornerImg = loadImage("../tiles/corner.jpg");
    edgeImg = loadImage("../tiles/edge.jpg");
    internalImg = loadImage("../tiles/internal.jpg");
}
var topRightCorner = [cornerImg, 0];
var topLeftCorner = [cornerImg, 90];
var bottomRightCorner = [cornerImg, 180];
var bottomLeftCorner = [cornerImg, 270];
var topEdge = [edgeImg, 0];
var rightEdge = [edgeImg, 90];
var bottomEdge = [edgeImg, 180];
var leftEdge = [edgeImg, 270];
var internal = [internalImg, 0];
//# sourceMappingURL=build.js.map