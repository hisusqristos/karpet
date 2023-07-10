import { gridInit } from "../helpers/gridInit";
import { pipe } from "../helpers/pipe";
import { collapse } from "../helpers/collapse";
import { allTiles, rules, Side, Rules, Tile } from "../RULES";
import { findKey } from "../helpers/findKey";

describe.skip("investigate surrounding cells and return an array of possible tiles for the current cell", () => {
  test("if betwen LEFT-EDGE and RIGHT-EDGE then INTERNAL", () => {
    const blankGrid = gridInit(3, 1);
    const grid = pipe(
      blankGrid,
      collapse("leftEdge")(0, 0),
      collapse("rightEdge")(0, blankGrid.length - 1)
    );

    const expectedResule = ["internal"];
    expect(investigate(rules)(1, 0)(grid)).toEqual(expectedResule);
  });
  test("if above BOTTOM-EDGE then INTERNAL, TOP_EDGE", () => {
    const blankGrid = gridInit(1, 2);
    const grid = pipe(blankGrid, collapse("bottomEdge")(0, 1));

    const expectedResule = ["internal", "topEdge"];
    expect(investigate(rules)(0, 0)(grid)).toEqual(expectedResule);
  });
});

const investigate = (rules: Rules) => {
  return (y: number, x: number) => {
    return (grid: Tile[][]): Tile[] => {
      const possibleTiles = allTiles;
      const surroundingTiles: Record<Side, Tile> = {
        up: grid[y - 1][x],
        right: grid[y][x + 1],
        bottom: grid[y + 1][x],
        left: grid[y][x - 1],
      };

      const possibleTilesForCurrentCell: Tile[][] = Object.keys(
        surroundingTiles
      ).map((tile) => {
        const possibleSurroungings: Record<Side, Tile[]> = rules[tile];
        const specificSide: Side = findKey(surroundingTiles, tile) as Side;
        const possibleSurroundingFromSpecificSide: Tile[] =
          possibleSurroungings[specificSide];
        return possibleSurroundingFromSpecificSide;
      });

      console.log(surroundingTiles);
      return possibleTiles;
    };
  };
};
