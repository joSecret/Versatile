!function(global,factory){"object"==typeof exports&&"undefined"!=typeof module?module.exports=factory(require("./index"),require("../dom/manipulator")):"function"==typeof define&&define.amd?define(["./index","../dom/manipulator"],factory):(global="undefined"!=typeof globalThis?globalThis:global||self).Config=factory(global.Index,global.Manipulator)}(this,function(index,Manipulator){"use strict";var _interopDefaultLegacy;const Manipulator__default=(e=>e&&"object"==typeof e&&"default"in e?e:{default:e})(Manipulator);class Config{static get Default(){return{}}static get DefaultType(){return{}}static get NAME(){throw new Error('You have to implement the static method "NAME", for each component!')}_getConfig(config){return config=this._mergeConfigObj(config),config=this._configAfterMerge(config),this._typeCheckConfig(config),config}_configAfterMerge(config){return config}_mergeConfigObj(config,element){var jsonConfig=index.isElement(element)?Manipulator__default.default.getDataAttribute(element,"config"):{};return{...this.constructor.Default,..."object"==typeof jsonConfig?jsonConfig:{},...index.isElement(element)?Manipulator__default.default.getDataAttributes(element):{},..."object"==typeof config?config:{}}}_typeCheckConfig(config,configTypes=this.constructor.DefaultType){for(const property of Object.keys(configTypes)){var expectedTypes=configTypes[property],value=config[property],value=index.isElement(value)?"element":index.toType(value);if(!new RegExp(expectedTypes).test(value))throw new TypeError(`${this.constructor.NAME.toUpperCase()}: Option "${property}" provided type "${value}" but expected type "${expectedTypes}".`)}}}return Config});