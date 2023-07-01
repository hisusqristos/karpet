import { gridInit } from "../helpers/gridInit"

describe.only("initialize an empty grid", () => {
    test("width 2 height 3", () => {
        const grid = [["", ""], ["", ""], ["", ""]]
        expect(grid).toEqual(gridInit(2, 3))
    })
    test("width 3 height 1", () => {
        const grid = [["", "", ""]];
        expect(grid).toEqual(gridInit(3, 1));
    })
    test("width 1 height 2", () => {
        const grid = [[""], [""]];
        expect(grid).toEqual(gridInit(1, 2));
    })

})