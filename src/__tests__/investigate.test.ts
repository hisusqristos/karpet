import { gridInit } from "../helpers/gridInit";
import { pipe } from "../helpers/pipe";
import { collapse } from "../helpers/collapse";
import { rules, Side, Rules, Tile } from "../RULES";
import { findKey } from "../helpers/findKey";

describe.skip("investigate surrounding cells and return an array of possible tiles for the current cell", () => {
  test.skip("if betwen LEFT-EDGE and RIGHT-EDGE then INTERNAL", () => {
    const blankGrid = gridInit(3, 1);
    const grid = pipe(
      blankGrid,
      collapse("leftEdge")(0, 0),
      collapse("rightEdge")(0, blankGrid.length - 1)
    );

    const expectedResule = ["internal"];
    expect(investigate(rules)(1, 0)(grid)).toEqual(expectedResule);
  });
  test.skip("if above BOTTOM-EDGE then INTERNAL, TOP_EDGE", () => {
    const blankGrid = gridInit(1, 2);
    const grid = pipe(blankGrid, collapse("bottomEdge")(0, 1));

    const expectedResule = ["internal", "topEdge"];
    expect(investigate(rules)(0, 0)(grid)).toEqual(expectedResule);
  });
  test.only("find middle cell possibilities", () => {
    const blankGrid = gridInit(3, 3);
    const grid: Tile[][] = pipe(
      blankGrid,
      collapse("topLeftCorner")(0, 0),
      collapse("topEdge")(1, 0),
      collapse("topRightCorner")(2, 0),
      collapse("leftEdge")(0, 1),
      collapse("leftEdge")(1, 1),
      collapse("rightEdge")(2, 1),
      collapse("bottomLeftCorner")(0, 2),
      collapse("bottomEdge")(1, 2),
      collapse("bottomRightCorner")(2, 2)
    );

    // const grid: Tile[][] = [
    //   ["topLeftCorner", "topEdge", "topRightCorner"],
    //   ["leftEdge", "rightEdge", "rightEdge"],
    //   ["bottomLeftCorner", "bottomEdge", "bottomRightCorner"],
    // ];

    expect(investigate(rules)(1, 1)(grid)).toEqual(["internal"]);
  });
});

const investigate = (rules: Rules) => {
  return (y: number, x: number) => {
    return (grid: Tile[][]): Tile[] => {
      console.log(grid);
      const surroundingTiles: Record<Side, Tile> = {
        bottom: grid[y - 1][x],
        left: grid[y][x + 1],
        up: grid[y + 1][x],
        right: grid[y][x - 1],
      };

      const possibleTilesForCurrentCell: Tile[][] = Object.keys(
        surroundingTiles
      ).map((tile) => {
        const specificSide: Side = findKey(surroundingTiles, tile) as Side; // vor komi harevann a
        const possibleSurroundingFromSpecificSide: Tile[] =
          rules[tile][specificSide]; // esi chishta

        return possibleSurroundingFromSpecificSide;
      });

      const possibleTiles: Tile[] = [
        ...new Set(possibleTilesForCurrentCell.flat(1)), // using sets to remove duplicates seems nice :2
      ].filter((x) => x == undefined);

      console.log(surroundingTiles);
      return possibleTiles;
    };
  };
};
