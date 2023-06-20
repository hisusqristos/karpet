describe.only("collapse at given coordinates, with given value", () => {
    // test.skip("collapse at 0, 0", () => {
    //     const grid = [["", "", ""], ["", "", ""]]
    //     const collapsedZeroZero = collapse("asd")(0, 0)(grid)
    //     const result = [["asd", "", ""], ["", "", ""]]

    //     expect(result).toEqual(collapsedZeroZero)
    // })

    test("collapse at 0", () => {
        const grid = ["", "", ""]
        const collapsedZeroZero = collapse("asd")(0)(grid)
        const result = ["asd", "", ""]

        expect(result).toEqual(collapsedZeroZero)
    });

    test("collapse at 2", () => {
        const grid = ["", "", ""]
        const collapsedZeroZero = collapse("asd")(2)(grid)
        const result = ["", "", "asd"]

        expect(result).toEqual(collapsedZeroZero)
    });

})

const collapse = (value: string) => {
    return (i: number) => {
        return (grid: string[]): string[] => {
            const collapsed: string[] = grid.splice(i, 1, value);
            return collapsed;
        };
    };
};

// const collapse = (value: string) => {
//     return (i: number, j: number) => {
//         return (grid: string[][]): string[][] => {
//             const collapsedRow = grid[i].splice(j, 1, value);
//             const collapsed: string[][] = grid.splice(i, 1, collapsedRow);
//             console.log(collapsed)
//             return collapsed
//         }
//     }
// }