import { maxNum } from "./max"

const gridInit = (width: number, height: number): string[] => {
    let row: string[] = new Array(maxNum(width, 2)).fill("")
    const grid = new Array(maxNum(height, 2)).fill(row);
    return grid;
};

export { gridInit }