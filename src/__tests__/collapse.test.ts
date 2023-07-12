import { collapse } from "../helpers/collapse";

describe("collapse at given coordinates, with given value", () => {
  test("collapse at 0, 0", () => {
    const grid = [
      ["", "", ""],
      ["", "", ""],
    ];
    const collapsed = collapse("asd")(0, 0)(grid);
    const result = [
      ["asd", "", ""],
      ["", "", ""],
    ];

    expect(result).toEqual(collapsed);
  });
  test("collapse at 1, 2", () => {
    const grid = [
      ["", "", ""],
      ["", "", ""],
    ];
    const collapsed = collapse("asd")(1, 2)(grid);
    const result = [
      ["", "", ""],
      ["", "", "asd"],
    ];

    expect(result).toEqual(collapsed);
  });
  test("should not do anything if collapsed at non existing index 2, 2", () => {
    const grid = [
      ["", "", ""],
      ["", "", ""],
    ];
    const collapsed = collapse("asd")(2, 2)(grid);
    const result = [
      ["", "", ""],
      ["", "", ""],
    ];

    expect(result).toEqual(collapsed);
  });
});
