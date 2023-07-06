describe("return key from value", () => {
    test("string value", () => {
        const obj = {
            lchi: "apin",
            txur: "nstac"
        }

        expect(findKey(obj, "apin")).toEqual("lchi")
        expect(findKey(obj, "qez em spasumm")).toEqual("nothing")
    })
    test("array value", () => {
        const obj = {
            lchi: ["apin", "txur", "nstac"],
            qez: ["em", "spasummm((("]
        }

        expect(findKey(obj, ["apin", "txur", "nstac"])).toEqual("lchi")
    })
    test("multiple keys with the same value", () => {
        const obj = {
            hishum_em_demqy_qo_cer: ["mayr", "im", "anush", "u", "angin"],
            luys_xorshomner_u_gcer: ["mayr", "im", "anush", "u", "angin"]
        }

        expect(findKey(obj, ["mayr", "im", "anush", "u", "angin"])).toEqual("hishum_em_demqy_qo_cer")
    })
})

function findKey(obj: Record<string, unknown>, value: unknown): string { // sorry for the string
    const keysWithGivenValue = Object.keys(obj).filter(k => JSON.stringify(obj[k]) === JSON.stringify(value))

    const neededKey: string = keysWithGivenValue.length != 0 ? keysWithGivenValue[0] : "nothing"
    return neededKey
}