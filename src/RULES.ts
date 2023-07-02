const rules = {
    topLeftCorner: { up: [""], right: ["topEdge", "topRightCorner"], bottom: ["leftEdge", "bottomLeftCorner"], left: [""] },
    topRighttCorner: { up: [""], right: [""], bottom: ["rightEdge", "bottomRightCorner"], left: ["topEdge", "topLeftCorner"] },
    bottomRightCorner: { up: ["rightEdge", "topRightCorner"], right: [""], bottom: [""], left: ["bottomEdge", "bottomLeftCorner"] },
    bottomLeftCorner: { up: ["leftEdge", "topLeftCorner"], right: ["bottomEdge", "bottomRightEdge"], bottom: [""], left: [""] },
    topEdge: { up: [""], right: ["topEdge", "topRighttCorner"], bottom: ["bottomEdge", "internal"], left: ["topLeftCorner", "topEdge"] },
    bottomEdge: { up: ["internal", "topEdge"], right: ["bottomRightCorner", "bottomEdge"], bottom: [""], left: ["bottomEdge", "bottomLeftCorner"] },
    leftEdge: { up: ["leftEdge", "topLeftEdge"], right: ["rightEdge", "internal"], bottom: ["leftEdge", "bottomLeftEdge"], left: [""] },
    rightEdge: { up: ["rightEdge", "topRightCorner"], right: [""], bottom: ["rightEdge", "bottomRightCorner"], left: ["leftEdge", "internal"] },
    internal: { up: ["topEdge", "internal"], right: ["rightEdge", "internal"], bottom: ["bottomEdge", "internal"], left: ["leftEdge", "internal"] }
}

export { rules }