const gridInit = (width: number, height: number): string[][] => {
    let row: string[] = new Array(Math.max(width, 2)).fill("")
    const grid = new Array(Math.max(height, 2)).fill(row);
    return grid;
};

export { gridInit }