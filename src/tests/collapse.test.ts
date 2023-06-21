describe.skip("collapse at given coordinates, with given value", () => {
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

})