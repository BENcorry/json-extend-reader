"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = __importDefault(require("fs"));
var path_1 = __importDefault(require("path"));
var jsonExtendReader = function (filePath, map) {
    // current path is absolute
    if (!path_1.default.isAbsolute(filePath)) {
        throw new Error("Can not find file: " + filePath);
    }
    if (map && map[filePath]) {
        throw new Error("filePath " + filePath + " error: circular reference.");
    }
    var text = fs_1.default.readFileSync(filePath, "utf-8");
    // record readFile path
    map = map || {};
    map[filePath] = filePath;
    var parseText = JSON.parse(text);
    if (parseText.extend) {
        // allow extend is string or string array
        var extendList = [];
        if (Array.isArray(parseText.extend)) {
            extendList = parseText.extend;
        }
        if (typeof parseText.extend === "string") {
            extendList = [parseText.extend];
        }
        var extend = parseText.extend, extra = __rest(parseText, ["extend"]);
        var extendFileSource = extendList.reduce(function (acc, item) {
            var extendsPath = path_1.default.join(filePath, "..", item);
            return __assign(__assign({}, jsonExtendReader(extendsPath, map)), acc);
        }, {});
        return __assign(__assign({}, extendFileSource), extra);
    }
    return parseText;
};
exports.default = jsonExtendReader;
