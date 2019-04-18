# px2upx

According to one stylesheet, generate upx version and @1x, @2x and @3x stylesheet.

[![NPM version][npm-image]][npm-url]
[![Downloads][downloads-image]][downloads-url]

[npm-image]: https://img.shields.io/npm/v/px2upx.svg?style=flat-square
[npm-url]: https://npmjs.org/package/px2upx
[downloads-image]: http://img.shields.io/npm/dm/px2upx.svg?style=flat-square
[downloads-url]: https://npmjs.org/package/px2upx

This set of tools contains:

* a CLI tool
* [webpack loader](https://www.npmjs.com/package/px2upx-loader)

## Usage

The raw stylesheet only contains @2x style, and if you

* don't intend to transform the original value, eg: 1px border, add `/*no*/` after the declaration
* intend to use px by force，eg: font-size, add `/*px*/` after the declaration

**Attention: Dealing with SASS or LESS, only `/*...*/` comment can be used, in order to have the comments persisted**

### CLI tool

```
$ npm install -g px2upx
```
```
$ px2upx -o build src/*.wxss
```

```
  Usage: px2upx [options] <file...>

  Options:

    -h, --help                      output usage information
    -V, --version                   output the version number
    -u, --upxUnit [value]           set `upx` unit value (default: 75)
    -x, --threeVersion [value]      whether to generate @1x, @2x and @3x version stylesheet (default: false)
    -r, --upxVersion [value]        whether to generate upx version stylesheet (default: true)
    -b, --baseDpr [value]           set base device pixel ratio (default: 2)
    -p, --upxPrecision [value]      set upx value precision (default: 6)
    -o, --output [path]             the output file dirname
```

### API

```
var Px2upx = require('px2upx');
var px2upxIns = new Px2upx([config]);
var originCssText = '...';
var dpr = 2;
var newCssText = px2upxIns.generateupx(originCssText); // generate upx version stylesheet
var newCssText = px2upxIns.generateThree(originCssText, dpr); // generate @1x, @2x and @3x version stylesheet
```
## License

MIT
