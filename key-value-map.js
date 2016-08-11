"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _defineProperty = require("babel-runtime/core-js/object/define-property");

var _defineProperty2 = _interopRequireDefault(_defineProperty);

var _freeze = require("babel-runtime/core-js/object/freeze");

var _freeze2 = _interopRequireDefault(_freeze);

var _map = require("babel-runtime/core-js/map");

var _map2 = _interopRequireDefault(_map);

var _assign = require("babel-runtime/core-js/object/assign");

var _assign2 = _interopRequireDefault(_assign);

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _symbol = require("babel-runtime/core-js/symbol");

var _symbol2 = _interopRequireDefault(_symbol);

exports.hasValue = hasValue;
exports.getKey = getKey;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var hasOwnProperty = {}.hasOwnProperty;
var DEFINITION = (0, _symbol2.default)();
var VALUEMAP = (0, _symbol2.default)();

/**
 * @class KeyValueMap
 * @description Simple key-value map class
 */

var KeyValueMap =
/**
 * @constructor
 * @param {Object} definition
 */
function KeyValueMap(definition) {
  var _this = this;

  (0, _classCallCheck3.default)(this, KeyValueMap);

  this[DEFINITION] = (0, _assign2.default)({}, definition);
  this[VALUEMAP] = new _map2.default();

  var _loop = function _loop(key) {
    /* istanbul ignore else */
    if (hasOwnProperty.call(definition, key)) {
      (0, _defineProperty2.default)(_this, key, {
        get: function get() {
          return this[DEFINITION][key];
        },

        enumerable: true
      });
      _this[VALUEMAP].set(_this[DEFINITION][key], key);
    }
  };

  for (var key in definition) {
    _loop(key);
  }
  (0, _freeze2.default)(this);
};
/**
 * @function hasValue
 * @param {any} value
 * @return {Boolean}
 * @description Determines if the value set of the key-value map contains the value
 */


exports.default = KeyValueMap;
function hasValue(value) {
  return this[VALUEMAP].has(value);
}
/**
 * @function getKey
 * @param {any} value
 * @return {String}
 * @description Returns the key of the values passed for the enum
 */
function getKey(value) {
  return this[VALUEMAP].get(value);
}
//# sourceMappingURL=key-value-map.js.map
