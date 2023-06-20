describe.skip("place corner tiles in corners", () => {
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
});

const pipe = (value: any, ...fns: Function[]) =>
    fns.reduce((acc, fn) => fn(acc), value);


const collapseCorners = (grid: string[][]) => {
    const gridWidth = grid.length
    const gridHeight = grid[0].length

    const collapse = (value: string) => (i: number, j: number) => (grid: string[][]) => (grid: string[][]) => {
        const collapsedRow = grid[i].splice(j, 1, value);
        const collapsed: string[][] = grid.splice(i, 1, collapsedRow);
        return collapsed
    }

    const cornersCollapsed: string[][] = pipe(
        grid,
        collapse("top-left-corner")(0, 0),
        collapse("top-right-corner")(0, gridWidth - 1),
        collapse("bottom-left-corner")(gridHeight - 1, 0),
        collapse("bottom-right-corner")(gridHeight - 1, gridWidth - 1)
    );

    return cornersCollapsed
};