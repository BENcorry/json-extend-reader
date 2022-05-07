# USAGE

## Install

```sh
npm i json-extend-reader
```

## Code

```js
import jsonExtendReader from "json-extend-reader";

const res = jsonExtendReader(path.join(__dirname, "a.json"));
```

```json
// a.json
{
  "extend": "./b.json",
  "id": "33",
  "value": "corry"
}
// b.json
{
  "id": "34",
  "value": "corry2",
  "size": 100,
  "file": {
    "extend": "./a.json"
  }
}

// return
{
  "id": "33",
  "value": "corry",
  "size": 100,
  "file": {
    "extend": "./a.json"
  }
}
```

**extend** key must be in top-level, otherwise, it is invalid to load anther json file

### Extend

extend allow to use type of string or string array

```json
{
  "extend": ["./b.json"],
  "id": "33",
  "value": "corry"
}
```
