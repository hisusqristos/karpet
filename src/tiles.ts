type Degrees = 0 | 90 | 180 | 270

type Tile = {
    img: p5.Image,
    rotation: Degrees
}

let cornerImg: p5.Image
let edgeImg: p5.Image
let internalImg: p5.Image

function preload() {
    cornerImg = loadImage("../tiles/corner.jpg");
    edgeImg = loadImage("../tiles/edge.jpg");
    internalImg = loadImage("../tiles/internal.jpg");
}

// corners 
const topRightCorner: Tile = { img: cornerImg, rotation: 0 };
const topLeftCorner: Tile = { img: cornerImg, rotation: 90 };
const bottomRightCorner: Tile = { img: cornerImg, rotation: 180 };
const bottomLeftCorner: Tile = { img: cornerImg, rotation: 270 };

// edge
const topEdge: Tile = { img: edgeImg, rotation: 0 };
const rightEdge: Tile = { img: edgeImg, rotation: 90 };
const bottomEdge: Tile = { img: edgeImg, rotation: 180 };
const leftEdge: Tile = { img: edgeImg, rotation: 270 };

// and internal
const internal: Tile = { img: internalImg, rotation: 0 }

export { topRightCorner, topLeftCorner, bottomRightCorner, bottomLeftCorner };
export { topEdge, rightEdge, bottomEdge, leftEdge };
export { internal };