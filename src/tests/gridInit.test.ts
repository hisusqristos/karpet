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

const gridInit = (width: number, height: number): string[] => {
    let row: string[] = new Array(max(width, 2)).fill("")
    const grid = new Array(max(height, 2)).fill(row);
    console.log(row, grid)
    return grid;
};

const max = (n1:number, n2: number) : number =>{
    return maxNum
}