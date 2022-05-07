declare type StringObject = Record<string, any>;

declare function ReadJSONFileAllowExtend(
  filePath: string,
  map: Record<string, string>
): StringObject;
