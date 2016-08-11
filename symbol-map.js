'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _symbol = require('babel-runtime/core-js/symbol');

var _symbol2 = _interopRequireDefault(_symbol);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _keyValueMap = require('./key-value-map');

var _keyValueMap2 = _interopRequireDefault(_keyValueMap);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @class SymbolMap
 * @description Helper class for making a symbol map object
 */
var SymbolMap = function (_KeyValueMap) {
  (0, _inherits3.default)(SymbolMap, _KeyValueMap);

  /**
   * @constructor
   * @param {[String]} keys
   */
  function SymbolMap(keys) {
    (0, _classCallCheck3.default)(this, SymbolMap);

    var definition = {};
    keys.forEach(function (key) {
      definition[key] = (0, _symbol2.default)(key);
    });
    return (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(SymbolMap).call(this, definition));
  }

  return SymbolMap;
}(_keyValueMap2.default);

exports.default = SymbolMap;
//# sourceMappingURL=symbol-map.js.map
