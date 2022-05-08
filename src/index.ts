import fs from "fs";
import path from "path";
import { StringObject } from "../index";

export function jsonExtendReader(
  filePath: string,
  map?: Record<string, string>
): StringObject {
  // current path is absolute
  if (!path.isAbsolute(filePath)) {
    throw new Error(`Can not find file: ${filePath}`);
  }
  if (map && map[filePath]) {
    throw new Error(`filePath ${filePath} error: circular reference.`);
  }
  const text = fs.readFileSync(filePath, "utf-8");
  // record readFile path
  map = map || {};
  map[filePath] = filePath;
  const parseText = JSON.parse(text);
  if (parseText.extend) {
    // allow extend is string or string array
    let extendList = [];
    if (Array.isArray(parseText.extend)) {
      extendList = parseText.extend;
    }
    if (typeof parseText.extend === "string") {
      extendList = [parseText.extend];
    }
    const { extend, ...extra } = parseText;
    const extendFileSource = extendList.reduce(
      (acc: StringObject, item: string) => {
        const extendsPath = path.join(filePath, "..", item);
        return {
          ...jsonExtendReader(extendsPath, map),
          ...acc,
        };
      },
      {}
    );
    return {
      ...extendFileSource,
      ...extra,
    };
  }
  return parseText;
}
