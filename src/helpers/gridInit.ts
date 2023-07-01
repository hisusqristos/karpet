const gridInit = (width: number, height: number): string[][] => {
    let row: string[] = new Array(width).fill("")
    const grid = new Array(height).fill(row);
    return grid;
};

export { gridInit }