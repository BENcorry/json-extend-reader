import readJSONFileAllowExtend from "../src";
import path from "path";
console.log("test dir", __dirname);
describe("readJSONFileAllowExtend", () => {
  it("can load json normal", () => {
    const source = readJSONFileAllowExtend(path.join(__dirname, "./c.json"));
    expect(source.id).toBe("34");
  });

  it("can load json extend another json can cover extend value", () => {
    const source = readJSONFileAllowExtend(path.join(__dirname, "./a.json"));
    expect(source.id).toBe("33");
    expect(source.value).toBe("corry");
    expect(source.size).toBe(100);
  });

  it("can load json extend another json with extend is array", () => {
    const source = readJSONFileAllowExtend(path.join(__dirname, "./d.json"));
    expect(source.id).toBe("33");
    expect(source.value).toBe("corry");
    expect(source.size).toBe(100);
  });
});
