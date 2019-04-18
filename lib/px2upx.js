'use strict';

var css = require('css');
var extend = require('extend');

var defaultConfig = {
  baseDpr: 2,             // base device pixel ratio (default: 2)
  upxUnit: 75,            // upx unit value (default: 75)
  upxPrecision: 6,        // upx value precision (default: 6)
  forcePxComment: 'px',   // force px comment (default: `px`)
  keepComment: 'no'       // no transform value comment (default: `no`)
};

var pxRegExp = /\b(\d+(\.\d+)?)px\b/;

function Px2upx(options) {
  this.config = {};
  extend(this.config, defaultConfig, options);
}

// generate @1x, @2x and @3x version stylesheet
Px2upx.prototype.generateThree = function (cssText, dpr) {
  dpr = dpr || 2;
  var self = this;
  var config = self.config;
  var astObj = css.parse(cssText);

  function processRules(rules) {
    for (var i = 0; i < rules.length; i++) {
      var rule = rules[i];
      if (rule.type === 'media') {
        processRules(rule.rules); // recursive invocation while dealing with media queries
        continue;
      } else if (rule.type === 'keyframes') {
        processRules(rule.keyframes); // recursive invocation while dealing with keyframes
        continue;
      } else if (rule.type !== 'rule' && rule.type !== 'keyframe') {
        continue;
      }

      var declarations = rule.declarations;
      for (var j = 0; j < declarations.length; j++) {
        var declaration = declarations[j];
        // need transform: declaration && has 'px'
        if (declaration.type === 'declaration' && pxRegExp.test(declaration.value)) {
          var nextDeclaration = rule.declarations[j + 1];
          if (nextDeclaration && nextDeclaration.type === 'comment') { // next next declaration is comment
            if (nextDeclaration.comment.trim() === config.keepComment) { // no transform
              declarations.splice(j + 1, 1); // delete corresponding comment
              continue;
            } else if (nextDeclaration.comment.trim() === config.forcePxComment) { // force px
              declarations.splice(j + 1, 1); // delete corresponding comment
            }
          }
          declaration.value = self._getCalcValue('px', declaration.value, dpr); // common transform
        }
      }
    }
  }

  processRules(astObj.stylesheet.rules);

  return css.stringify(astObj);
};

// generate upx version stylesheet
Px2upx.prototype.generateupx = function (cssText) {
  var self = this;
  var config = self.config;
  var astObj = css.parse(cssText);

  function processRules(rules) { // FIXME: keyframes do not support `force px` comment
    var noDealPx = true
    for (var i = 0; i < rules.length; i++) {
      var rule = rules[i];
      if (rule.type === 'media') {
        processRules(rule.rules); // recursive invocation while dealing with media queries
        continue;
      } else if (rule.type === 'keyframes') {
        processRules(rule.keyframes, true); // recursive invocation while dealing with keyframes
        continue;
      } else if (rule.type !== 'rule' && rule.type !== 'keyframe') {
        continue;
      }

      var declarations = rule.declarations;
      for (var j = 0; j < declarations.length; j++) {
        var declaration = declarations[j];
        // need transform: declaration && has 'px'
        if (declaration.type === 'declaration' && pxRegExp.test(declaration.value)) {
          var nextDeclaration = declarations[j + 1];
          if (nextDeclaration && nextDeclaration.type === 'comment') { // next next declaration is comment
            if (nextDeclaration.comment.trim() === config.forcePxComment) { // force px
              // do not transform `0px`
              if (declaration.value === '0px') {
                declaration.value = '0';
                declarations.splice(j + 1, 1); // delete corresponding comment
                continue;
              }
                declarations.splice(j + 1, 1); // delete corresponding comment
            } else {
              declaration.value = self._getCalcValue('upx', declaration.value); // common transform
            }
          } else {
            declaration.value = self._getCalcValue('upx', declaration.value); // common transform
          }
        }
      }

      // if the origin rule has no declarations, delete it
      if (!rules[i].declarations.length) {
        rules.splice(i, 1);
        i--;
      }
    }
  }

  processRules(astObj.stylesheet.rules);

  return css.stringify(astObj);
};

// get calculated value of px or upx
Px2upx.prototype._getCalcValue = function (type, value, dpr) {
  var config = this.config;
  var pxGlobalRegExp = new RegExp(pxRegExp.source, 'g');

  function getValue(val) {
    val = parseFloat(val.toFixed(config.upxPrecision)); // control decimal precision of the calculated value
    return val == 0 ? val : val + type;
  }

  return value.replace(pxGlobalRegExp, function ($0, $1) {
    return type === 'px' ? getValue($1 * dpr / config.baseDpr) : getValue($1 / config.upxUnit);
  });
};

module.exports = Px2upx;
