import { gridInit } from "../helpers/gridInit"

describe.only("initialize an empty grid", () => {
    test("width 2 height 3", () => {
        const grid = [["", ""], ["", ""], ["", ""]]
        expect(grid).toEqual(gridInit(2, 3))
    })
    test("if width or height smaller than 2 return 2x2 grid", () => {
        const grid = [["", ""], ["", ""]];
        expect(grid).toEqual(gridInit(1, 0));
    })
})