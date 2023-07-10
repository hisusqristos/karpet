import { findKey } from "../helpers/findKey";

describe("return key from value", () => {
  test("string value", () => {
    const obj = {
      lchi: "apin",
      txur: "nstac",
    };

    expect(findKey(obj, "apin")).toEqual("lchi");
    expect(findKey(obj, "qez em spasumm")).toEqual("nothing");
  });
  test("array value", () => {
    const obj = {
      lchi: ["apin", "txur", "nstac"],
      qez: ["em", "spasummm((("],
    };

    expect(findKey(obj, ["apin", "txur", "nstac"])).toEqual("lchi");
  });
  test("multiple keys with the same value", () => {
    const obj = {
      hishum_em_demqy_qo_cer: ["mayr", "im", "anush", "u", "angin"],
      luys_xorshomner_u_gcer: ["mayr", "im", "anush", "u", "angin"],
    };

    expect(findKey(obj, ["mayr", "im", "anush", "u", "angin"])).toEqual(
      "hishum_em_demqy_qo_cer"
    );
  });
});
