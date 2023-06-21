describe.only("collapse at given coordinates, with given value", () => {
    test("collapse at 0, 0", () => {
        const grid = [["", "", ""], ["", "", ""]]
        const collapsedZeroZero = collapse("asd")(0, 0)(grid)
        const result = [["asd", "", ""], ["", "", ""]]

        expect(result).toEqual(collapsedZeroZero)
    })
    test("collapse at 1, 2", () => {
        const grid = [["", "", ""], ["", "", ""]]
        const collapsedZeroZero = collapse("asd")(1, 2)(grid)
        const result = [["", "", ""], ["", "", "asd"]]

        expect(result).toEqual(collapsedZeroZero)
    })
    test("should not do anything if collapsed at non existing index 2, 2", () => {
        const grid = [["", "", ""], ["", "", ""]]
        const collapsedZeroZero = collapse("asd")(2, 2)(grid)
        const result = [["", "", ""], ["", "", ""]]

        expect(result).toEqual(collapsedZeroZero)
    })

    // test("collapse at 0", () => {
    //     const grid = ["", "", ""]
    //     const collapsedZeroZero = collapse("asd")(0)(grid)
    //     const result = ["asd", "", ""]

    //     expect(result).toEqual(collapsedZeroZero)
    // });

    // test("collapse at 2", () => {
    //     const grid = ["", "", ""]
    //     const collapsedZeroZero = collapse("asd")(2)(grid)
    //     const result = ["", "", "asd"]

    //     expect(result).toEqual(collapsedZeroZero)
    // });

})

// const collapse = (value: string) => {
//     return (i: number) => {
//         return (grid: string[]): string[] => {
//             const collapsed: string[] = grid.splice(i, 1, value);
//             return collapsed;
//         };
//     };
// };

const collapse = (value: string) => {
    return (i: number, j: number) => {
        return (grid: string[][]): string[][] => {
            if (i >= 0 && i < grid.length && j >= 0 && j < grid[i].length) {
                grid[i].splice(j, 1, value);
                grid.splice(i, 1, grid[i]);
            }

            console.log(grid);
            return grid;
        }
    }
}