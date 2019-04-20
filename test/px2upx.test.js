'use strict';

var assert = require('assert');
var Px2upx = require('../lib/px2upx');
var path = require('path');
var fs = require('fs');

describe('should work with @2x origin css file', function () {
  var px2upxIns = new Px2upx({upxUnit: 1});
  var srcPath = path.join(__dirname, 'assets/test.2x.css');
  var srcText = fs.readFileSync(srcPath, {encoding: 'utf8'});

  it('[default] should output right upx file', function () {
    var expectedPath = path.join(__dirname, 'output/default.upx.css');
    var outputText = px2upxIns.generateUpx(srcText);
    assert.equal(outputText, fs.readFileSync(expectedPath, {encoding: 'utf8'}));
  });

  // it('should output right @1x file', function () {
  //   var expectedPath = path.join(__dirname, 'output/default.1x.css');
  //   var outputText = px2upxIns.generateThree(srcText, 1);
  //   assert.equal(outputText, fs.readFileSync(expectedPath, {encoding: 'utf8'}));
  // });

  // it('should output right @2x file', function () {
  //   var expectedPath = path.join(__dirname, 'output/default.2x.css');
  //   var outputText = px2upxIns.generateThree(srcText, 2);
  //   assert.equal(outputText, fs.readFileSync(expectedPath, {encoding: 'utf8'}));
  // });

  // it('should output right @3x file', function () {
  //   var expectedPath = path.join(__dirname, 'output/default.3x.css');
  //   var outputText = px2upxIns.generateThree(srcText, 3);
  //   assert.equal(outputText, fs.readFileSync(expectedPath, {encoding: 'utf8'}));
  // });
});

// describe('should work with @3x origin css file', function () {
//   var px2upxIns = new Px2upx({upxUnit: 112.5, baseDpr: 3});
//   var srcPath = path.join(__dirname, 'assets/test.3x.css');
//   var srcText = fs.readFileSync(srcPath, {encoding: 'utf8'});

//   it('[default] should output right upx file', function () {
//     var expectedPath = path.join(__dirname, 'output/default.upx.css');
//     var outputText = px2upxIns.generateUpx(srcText);
//     assert.equal(outputText, fs.readFileSync(expectedPath, {encoding: 'utf8'}));
//   });

//   it('should output right @1x file', function () {
//     var expectedPath = path.join(__dirname, 'output/default.1x.css');
//     var outputText = px2upxIns.generateThree(srcText, 1);
//     assert.equal(outputText, fs.readFileSync(expectedPath, {encoding: 'utf8'}));
//   });

//   it('should output right @2x file', function () {
//     var expectedPath = path.join(__dirname, 'output/default.2x.css');
//     var outputText = px2upxIns.generateThree(srcText, 2);
//     assert.equal(outputText, fs.readFileSync(expectedPath, {encoding: 'utf8'}));
//   });

//   it('should output right @3x file', function () {
//     var expectedPath = path.join(__dirname, 'output/default.3x.css');
//     var outputText = px2upxIns.generateThree(srcText, 3);
//     assert.equal(outputText, fs.readFileSync(expectedPath, {encoding: 'utf8'}));
//   });
// });
