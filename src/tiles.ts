type Direction = 0 | 90 | 180 | 270
type Tile = [p5.Image, Direction]

let cornerImg: p5.Image
let edgeImg: p5.Image
let internalImg: p5.Image

function preload() {
    cornerImg = loadImage("../tiles/corner.jpg");
    edgeImg = loadImage("../tiles/edge.jpg");
    internalImg = loadImage("../tiles/internal.jpg");
}

// corners 
const topRightCorner: Tile = [cornerImg, 0];
const topLeftCorner: Tile = [cornerImg, 90];
const bottomRightCorner: Tile = [cornerImg, 180];
const bottomLeftCorner: Tile = [cornerImg, 270];

// edge
const topEdge: Tile = [edgeImg, 0];
const rightEdge: Tile = [edgeImg, 90];
const bottomEdge: Tile = [edgeImg, 180];
const leftEdge: Tile = [edgeImg, 270];

// and internal
const internal: Tile = [internalImg, 0]
