import { collapseCorners } from "../hepers/collapse";

describe("place corner tiles in corners", () => {
    test("2x2 grid", () => {
        const grid: string[][] = [['', ''], ['', '']];
        const result = [["top-left-corner", "top-right-corner"], ["bottom-left-corner", "bottom-right-corner"]]

        const withCorners = collapseCorners(grid);
        expect(withCorners).toEqual(result);
    });

    test("3x2 grid", () => {
        const grid: string[][] = [['', '', ''], ['', '', '']];
        const result = [["top-left-corner", "", "top-right-corner"], ["bottom-left-corner", "", "bottom-right-corner"]]

        const withCorners = collapseCorners(grid);
        expect(withCorners).toEqual(result);
    })

    test.skip("anything smaller than 2x2 is invalid", () => {
        const grid: string[][] = [['', ''], ['']];
        const result = [['', ''], ['']];

        const withCorners = collapseCorners(grid);
        expect(withCorners).toEqual(result);
    });
});

