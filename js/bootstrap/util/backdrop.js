!function(global,factory){"object"==typeof exports&&"undefined"!=typeof module?module.exports=factory(require("../dom/event-handler"),require("./index"),require("./config")):"function"==typeof define&&define.amd?define(["../dom/event-handler","./index","./config"],factory):(global="undefined"!=typeof globalThis?globalThis:global||self).Backdrop=factory(global.EventHandler,global.Index,global.Config)}(this,function(EventHandler,index,Config){"use strict";var _interopDefaultLegacy=e=>e&&"object"==typeof e&&"default"in e?e:{default:e},Config__default;const EventHandler__default=_interopDefaultLegacy(EventHandler),NAME="backdrop",CLASS_NAME_FADE="fade",CLASS_NAME_SHOW="show",EVENT_MOUSEDOWN="mousedown.bs."+NAME,Default={className:"modal-backdrop",clickCallback:null,isAnimated:!1,isVisible:!0,rootElement:"body"},DefaultType={className:"string",clickCallback:"(function|null)",isAnimated:"boolean",isVisible:"boolean",rootElement:"(element|string)"};class Backdrop extends _interopDefaultLegacy(Config).default{constructor(config){super(),this._config=this._getConfig(config),this._isAppended=!1,this._element=null}static get Default(){return Default}static get DefaultType(){return DefaultType}static get NAME(){return NAME}show(callback){var element;this._config.isVisible?(this._append(),element=this._getElement(),this._config.isAnimated&&index.reflow(element),element.classList.add("show"),this._emulateAnimation(()=>{index.execute(callback)})):index.execute(callback)}hide(callback){this._config.isVisible?(this._getElement().classList.remove("show"),this._emulateAnimation(()=>{this.dispose(),index.execute(callback)})):index.execute(callback)}dispose(){this._isAppended&&(EventHandler__default.default.off(this._element,EVENT_MOUSEDOWN),this._element.remove(),this._isAppended=!1)}_getElement(){var backdrop;return this._element||((backdrop=document.createElement("div")).className=this._config.className,this._config.isAnimated&&backdrop.classList.add("fade"),this._element=backdrop),this._element}_configAfterMerge(config){return config.rootElement=index.getElement(config.rootElement),config}_append(){var element;this._isAppended||(element=this._getElement(),this._config.rootElement.append(element),EventHandler__default.default.on(element,EVENT_MOUSEDOWN,()=>{index.execute(this._config.clickCallback)}),this._isAppended=!0)}_emulateAnimation(callback){index.executeAfterTransition(callback,this._getElement(),this._config.isAnimated)}}return Backdrop});