import KeyValueMap from './key-value-map';

/**
 * @class SymbolMap
 * @description Helper class for making a symbol map object
 */
export default class SymbolMap extends KeyValueMap {
  /**
   * @constructor
   * @param {[String]} keys
   */
  constructor(keys) {
    const definition = {};
    keys.forEach(key => {
      definition[key] = Symbol(key);
    });
    super(definition);
  }
}
