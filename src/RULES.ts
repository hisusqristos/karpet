const rules = {
    topLeftCorner: { up: [""], right: [""], bottom: [""], left: [""] },
    topRighttCorner: { up: [""], right: [""], bottom: [""], left: [""] },
    bottomRightCorner: { up: [""], right: [""], bottom: [""], left: [""] },
    bottomLeftCorner: { up: [""], right: [""], bottom: [""], left: [""] },
    topEdge: { up: [""], right: ["topEdge"], bottom: ["bottomEdge", "internal"], left: ["topEdge"] },
    bottomEdge: { up: ["internal", "topEdge"], right: ["bottomEdge"], bottom: [""], left: ["bottomEdge"] },
    leftEdge: { up: ["leftEdge"], right: ["leftEdge", "internal"], bottom: ["leftEdge"], left: [""] },
    rightEdge: { up: ["rightEdge"], right: [""], bottom: ["rightEdge"], left: ["leftEdge", "internal"] },
    internal: { up: ["topEdge", "internal"], right: ["rightEdge", "internal"], bottom: ["bottomEdge", "internal"], left: ["leftEdge", "internal"] }
}

export { rules }