describe("place corner tiles in corners", () => {
    test("2x2 grid", () => {
        const grid: string[][] = [['', ''], ['', '']];
        const result = [["top-left-corner", "top-right-corner"], ["bottom-left-corner", "bottom-right-corner"]]
        const withCorners = collapseCorners(grid);

        expect(withCorners).toEqual(result);
    });
});

const collapseCorners = (grid: string[][]) => {
    return grid
};