import { pipe } from "./pipe";

const collapse = (value: string) => {
    return (i: number, j: number) => {
        return (grid: string[][]): string[][] => {
            if (i >= 0 && i < grid.length && j >= 0 && j < grid[i].length) {
                grid[i].splice(j, 1, value);
                grid.splice(i, 1, grid[i]);
            }
            return grid;
        }
    }
}

const collapseCorners = (grid: string[][]) => {
    const gridWidth = grid[0].length
    const gridHeight = grid.length

    const cornersCollapsed: string[][] = pipe(
        grid,
        collapse("top-left-corner")(0, 0),
        collapse("top-right-corner")(0, gridWidth - 1),
        collapse("bottom-left-corner")(gridHeight - 1, 0),
        collapse("bottom-right-corner")(gridHeight - 1, gridWidth - 1)
    );
    console.log(cornersCollapsed);
    return cornersCollapsed
};

export { collapse, collapseCorners }