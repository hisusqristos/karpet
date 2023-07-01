import { gridInit } from "../helpers/gridInit"
import { pipe } from "../helpers/pipe"
import { collapse, collapseCorners } from "../helpers/collapse"
import { rules } from "../RULES"

describe("investigate surrounding cells and return an array of possible tiles for the current cell", () => {
    test("if betwen LEFT-EDGE and RIGHT-EDGE then INTERNAL", () => {
        const blankGrid = gridInit(3, 1);
        const grid = pipe(
            blankGrid,
            collapse("leftEdge")(0, 0),
            collapse("rightEdge")(0, blankGrid.length - 1),
        );

        const expectedResule = ["internal"]
        expect(investigate(rules)(1, 0)(grid)).toEqual(expectedResule)
    })
    test("if above BOTTOM-EDGE then INTERNAL, TOP_EDGE", () => {
        const blankGrid = gridInit(1, 2);
        const grid = pipe(
            blankGrid,
            collapse("bottomEdge")(0, 1),
        );

        const expectedResule = ["internal", "topEdge"]
        expect(investigate(rules)(0, 0)(grid)).toEqual(expectedResule)
    })
})

const investigate = (rules: object) => {
    return (x: number, y: number) => {
        return (grid: string[][]): string[] => {
            return ["internal"]
        }
    }
}