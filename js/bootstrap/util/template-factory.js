!function(global,factory){"object"==typeof exports&&"undefined"!=typeof module?module.exports=factory(require("./sanitizer"),require("./index"),require("../dom/selector-engine"),require("./config")):"function"==typeof define&&define.amd?define(["./sanitizer","./index","../dom/selector-engine","./config"],factory):(global="undefined"!=typeof globalThis?globalThis:global||self).TemplateFactory=factory(global.Sanitizer,global.Index,global.SelectorEngine,global.Config)}(this,function(sanitizer,index,SelectorEngine,Config){"use strict";var _interopDefaultLegacy=e=>e&&"object"==typeof e&&"default"in e?e:{default:e},Config__default;const SelectorEngine__default=_interopDefaultLegacy(SelectorEngine),NAME="TemplateFactory",Default={allowList:sanitizer.DefaultAllowlist,content:{},extraClass:"",html:!1,sanitize:!0,sanitizeFn:null,template:"<div></div>"},DefaultType={allowList:"object",content:"object",extraClass:"(string|function)",html:"boolean",sanitize:"boolean",sanitizeFn:"(null|function)",template:"string"},DefaultContentType={entry:"(string|element|function|null)",selector:"(string|element)"};class TemplateFactory extends _interopDefaultLegacy(Config).default{constructor(config){super(),this._config=this._getConfig(config)}static get Default(){return Default}static get DefaultType(){return DefaultType}static get NAME(){return NAME}getContent(){return Object.values(this._config.content).map(config=>this._resolvePossibleFunction(config)).filter(Boolean)}hasContent(){return 0<this.getContent().length}changeContent(content){return this._checkContent(content),this._config.content={...this._config.content,...content},this}toHtml(){var templateWrapper=document.createElement("div"),selector,text;templateWrapper.innerHTML=this._maybeSanitize(this._config.template);for([selector,text]of Object.entries(this._config.content))this._setContent(templateWrapper,text,selector);var template=templateWrapper.children[0],extraClass=this._resolvePossibleFunction(this._config.extraClass);return extraClass&&template.classList.add(...extraClass.split(" ")),template}_typeCheckConfig(config){super._typeCheckConfig(config),this._checkContent(config.content)}_checkContent(arg){for(var[selector,content]of Object.entries(arg))super._typeCheckConfig({selector:selector,entry:content},DefaultContentType)}_setContent(template,content,selector){var selector=SelectorEngine__default.default.findOne(selector,template);selector&&((content=this._resolvePossibleFunction(content))?index.isElement(content)?this._putElementInTemplate(index.getElement(content),selector):this._config.html?selector.innerHTML=this._maybeSanitize(content):selector.textContent=content:selector.remove())}_maybeSanitize(arg){return this._config.sanitize?sanitizer.sanitizeHtml(arg,this._config.allowList,this._config.sanitizeFn):arg}_resolvePossibleFunction(arg){return"function"==typeof arg?arg(this):arg}_putElementInTemplate(element,templateElement){this._config.html?(templateElement.innerHTML="",templateElement.append(element)):templateElement.textContent=element.textContent}}return TemplateFactory});