type Tile = "topLeftCorner" | "topRightCorner" | "bottomRightCorner" | "bottomLeftCorner" | "topEdge" | "bottomEdge" | "leftEdge" | "rightEdge" | "internal";
type Rules = Record<string, Record<Side, Tile[]>>
type Side = "up" | "right" | "bottom" | "left"

const allTiles: Tile[] = ["topLeftCorner", "topRightCorner", "bottomRightCorner", "bottomLeftCorner", "topEdge", "bottomEdge", "leftEdge", "rightEdge", "internal"]

const rules: Rules = {
    topLeftCorner: { up: [], right: ["topEdge", "topRightCorner"], bottom: ["leftEdge", "bottomLeftCorner"], left: [] },
    topRighttCorner: { up: [], right: [], bottom: ["rightEdge", "bottomRightCorner"], left: ["topEdge", "topLeftCorner"] },
    bottomRightCorner: { up: ["rightEdge", "topRightCorner"], right: [], bottom: [], left: ["bottomEdge", "bottomLeftCorner"] },
    bottomLeftCorner: { up: ["leftEdge", "topLeftCorner"], right: ["bottomEdge", "bottomRightCorner"], bottom: [], left: [] },
    topEdge: { up: [], right: ["topEdge", "topRightCorner"], bottom: ["bottomEdge", "internal"], left: ["topLeftCorner", "topEdge"] },
    bottomEdge: { up: ["internal", "topEdge"], right: ["bottomRightCorner", "bottomEdge"], bottom: [], left: ["bottomEdge", "bottomLeftCorner"] },
    leftEdge: { up: ["leftEdge", "topLeftCorner"], right: ["rightEdge", "internal"], bottom: ["leftEdge", "bottomLeftCorner"], left: [] },
    rightEdge: { up: ["rightEdge", "topRightCorner"], right: [], bottom: ["rightEdge", "bottomRightCorner"], left: ["leftEdge", "internal"] },
    internal: { up: ["topEdge", "internal"], right: ["rightEdge", "internal"], bottom: ["bottomEdge", "internal"], left: ["leftEdge", "internal"] },
}

export { rules, allTiles }
export type { Side, Tile, Rules }