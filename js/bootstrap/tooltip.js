!function(global,factory){"object"==typeof exports&&"undefined"!=typeof module?module.exports=factory(require("./util/index"),require("./util/sanitizer"),require("./dom/event-handler"),require("./dom/manipulator"),require("./base-component"),require("./util/template-factory")):"function"==typeof define&&define.amd?define(["./util/index","./util/sanitizer","./dom/event-handler","./dom/manipulator","./base-component","./util/template-factory"],factory):(global="undefined"!=typeof globalThis?globalThis:global||self).Tooltip=factory(global.Index,global.Sanitizer,global.EventHandler,global.Manipulator,global.BaseComponent,global.TemplateFactory)}(this,function(index,sanitizer,EventHandler,Manipulator,BaseComponent,TemplateFactory){"use strict";var _interopDefaultLegacy=e=>e&&"object"==typeof e&&"default"in e?e:{default:e};function _interopNamespace(e){if(e&&e.__esModule)return e;var n=Object.create(null,{[Symbol.toStringTag]:{value:"Module"}}),d;if(e)for(const k in e){"default"!==k&&(d=Object.getOwnPropertyDescriptor(e,k),Object.defineProperty(n,k,d.get?d:{enumerable:!0,get:()=>e[k]}))}return n.default=e,Object.freeze(n)}const Popper__namespace=_interopNamespace(Popper),EventHandler__default=_interopDefaultLegacy(EventHandler),Manipulator__default=_interopDefaultLegacy(Manipulator);var EventHandler=_interopDefaultLegacy(BaseComponent);const TemplateFactory__default=_interopDefaultLegacy(TemplateFactory),NAME="tooltip",DISALLOWED_ATTRIBUTES=new Set(["sanitize","allowList","sanitizeFn"]),CLASS_NAME_FADE="fade";var CLASS_NAME_MODAL="modal";const CLASS_NAME_SHOW="show",SELECTOR_TOOLTIP_INNER=".tooltip-inner",SELECTOR_MODAL=".modal",EVENT_MODAL_HIDE="hide.bs.modal",TRIGGER_HOVER="hover",TRIGGER_FOCUS="focus",TRIGGER_CLICK="click",TRIGGER_MANUAL="manual",EVENT_HIDE="hide",EVENT_HIDDEN="hidden",EVENT_SHOW="show",EVENT_SHOWN="shown",EVENT_INSERTED="inserted",EVENT_CLICK="click",EVENT_FOCUSIN="focusin",EVENT_FOCUSOUT="focusout",EVENT_MOUSEENTER="mouseenter",EVENT_MOUSELEAVE="mouseleave",AttachmentMap={AUTO:"auto",TOP:"top",RIGHT:index.isRTL()?"left":"right",BOTTOM:"bottom",LEFT:index.isRTL()?"right":"left"},Default={allowList:sanitizer.DefaultAllowlist,animation:!0,boundary:"clippingParents",container:!1,customClass:"",delay:0,fallbackPlacements:["top","right","bottom","left"],html:!1,offset:[0,0],placement:"top",popperConfig:null,sanitize:!0,sanitizeFn:null,selector:!1,template:'<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',title:"",trigger:"hover focus"},DefaultType={allowList:"object",animation:"boolean",boundary:"(string|element)",container:"(string|element|boolean)",customClass:"(string|function)",delay:"(number|object)",fallbackPlacements:"array",html:"boolean",offset:"(array|string|function)",placement:"(string|function)",popperConfig:"(null|object|function)",sanitize:"boolean",sanitizeFn:"(null|function)",selector:"(string|boolean)",template:"string",title:"(string|element|function)",trigger:"string"};class Tooltip extends EventHandler.default{constructor(element,config){if(void 0===Popper__namespace)throw new TypeError("Bootstrap's tooltips require Popper (https://popper.js.org)");super(element,config),this._isEnabled=!0,this._timeout=0,this._isHovered=null,this._activeTrigger={},this._popper=null,this._templateFactory=null,this._newContent=null,this.tip=null,this._setListeners(),this._config.selector||this._fixTitle()}static get Default(){return Default}static get DefaultType(){return DefaultType}static get NAME(){return NAME}enable(){this._isEnabled=!0}disable(){this._isEnabled=!1}toggleEnabled(){this._isEnabled=!this._isEnabled}toggle(){this._isEnabled&&(this._activeTrigger.click=!this._activeTrigger.click,this._isShown()?this._leave():this._enter())}dispose(){clearTimeout(this._timeout),EventHandler__default.default.off(this._element.closest(".modal"),"hide.bs.modal",this._hideModalHandler),this.tip&&this.tip.remove(),this._element.getAttribute("data-bs-original-title")&&this._element.setAttribute("title",this._element.getAttribute("data-bs-original-title")),this._disposePopper(),super.dispose()}show(){if("none"===this._element.style.display)throw new Error("Please use show on visible elements");if(this._isWithContent()&&this._isEnabled){var showEvent=EventHandler__default.default.trigger(this._element,this.constructor.eventName("show")),shadowRoot,isInTheDom=(index.findShadowRoot(this._element)||this._element.ownerDocument.documentElement).contains(this._element);if(!showEvent.defaultPrevented&&isInTheDom){this.tip&&(this.tip.remove(),this.tip=null);var showEvent=this._getTipElement(),{container:isInTheDom}=(this._element.setAttribute("aria-describedby",showEvent.getAttribute("id")),this._config),complete;if(this._element.ownerDocument.documentElement.contains(this.tip)||(isInTheDom.append(showEvent),EventHandler__default.default.trigger(this._element,this.constructor.eventName("inserted"))),this._popper?this._popper.update():this._popper=this._createPopper(showEvent),showEvent.classList.add("show"),"ontouchstart"in document.documentElement)for(const element of[].concat(...document.body.children))EventHandler__default.default.on(element,"mouseover",index.noop);this._queueCallback(()=>{EventHandler__default.default.trigger(this._element,this.constructor.eventName("shown")),!1===this._isHovered&&this._leave(),this._isHovered=!1},this.tip,this._isAnimated())}}}hide(){if(this._isShown()){var hideEvent=EventHandler__default.default.trigger(this._element,this.constructor.eventName("hide")),complete;if(!hideEvent.defaultPrevented){const tip=this._getTipElement();if(tip.classList.remove("show"),"ontouchstart"in document.documentElement)for(const element of[].concat(...document.body.children))EventHandler__default.default.off(element,"mouseover",index.noop);this._activeTrigger.click=!1,this._activeTrigger.focus=!1,this._activeTrigger.hover=!1,this._isHovered=null,this._queueCallback(()=>{this._isWithActiveTrigger()||(this._isHovered||tip.remove(),this._element.removeAttribute("aria-describedby"),EventHandler__default.default.trigger(this._element,this.constructor.eventName("hidden")),this._disposePopper())},this.tip,this._isAnimated())}}}update(){this._popper&&this._popper.update()}_isWithContent(){return Boolean(this._getTitle())}_getTipElement(){return this.tip||(this.tip=this._createTipElement(this._newContent||this._getContentForTemplate())),this.tip}_createTipElement(content){var content=this._getTemplateFactory(content).toHtml();if(!content)return null;content.classList.remove("fade","show"),content.classList.add(`bs-${this.constructor.NAME}-auto`);var tipId=index.getUID(this.constructor.NAME).toString();return content.setAttribute("id",tipId),this._isAnimated()&&content.classList.add("fade"),content}setContent(content){this._newContent=content,this._isShown()&&(this._disposePopper(),this.show())}_getTemplateFactory(content){return this._templateFactory?this._templateFactory.changeContent(content):this._templateFactory=new TemplateFactory__default.default({...this._config,content:content,extraClass:this._resolvePossibleFunction(this._config.customClass)}),this._templateFactory}_getContentForTemplate(){return{".tooltip-inner":this._getTitle()}}_getTitle(){return this._resolvePossibleFunction(this._config.title)||this._element.getAttribute("data-bs-original-title")}_initializeOnDelegatedTarget(event){return this.constructor.getOrCreateInstance(event.delegateTarget,this._getDelegateConfig())}_isAnimated(){return this._config.animation||this.tip&&this.tip.classList.contains("fade")}_isShown(){return this.tip&&this.tip.classList.contains("show")}_createPopper(tip){var placement="function"==typeof this._config.placement?this._config.placement.call(this,tip,this._element):this._config.placement,placement=AttachmentMap[placement.toUpperCase()];return Popper__namespace.createPopper(this._element,tip,this._getPopperConfig(placement))}_getOffset(){const{offset}=this._config;return"string"==typeof offset?offset.split(",").map(value=>Number.parseInt(value,10)):"function"==typeof offset?popperData=>offset(popperData,this._element):offset}_resolvePossibleFunction(arg){return"function"==typeof arg?arg.call(this._element):arg}_getPopperConfig(attachment){var attachment={placement:attachment,modifiers:[{name:"flip",options:{fallbackPlacements:this._config.fallbackPlacements}},{name:"offset",options:{offset:this._getOffset()}},{name:"preventOverflow",options:{boundary:this._config.boundary}},{name:"arrow",options:{element:`.${this.constructor.NAME}-arrow`}},{name:"preSetPlacement",enabled:!0,phase:"beforeMain",fn:data=>{this._getTipElement().setAttribute("data-popper-placement",data.state.placement)}}]};return{...attachment,..."function"==typeof this._config.popperConfig?this._config.popperConfig(attachment):this._config.popperConfig}}_setListeners(){var triggers,eventIn,eventOut;for(const trigger of this._config.trigger.split(" ")){"click"===trigger?EventHandler__default.default.on(this._element,this.constructor.eventName("click"),this._config.selector,event=>{var context;this._initializeOnDelegatedTarget(event).toggle()}):"manual"!==trigger&&(eventIn="hover"===trigger?this.constructor.eventName("mouseenter"):this.constructor.eventName("focusin"),eventOut="hover"===trigger?this.constructor.eventName("mouseleave"):this.constructor.eventName("focusout"),EventHandler__default.default.on(this._element,eventIn,this._config.selector,event=>{var context=this._initializeOnDelegatedTarget(event);context._activeTrigger["focusin"===event.type?"focus":"hover"]=!0,context._enter()}),EventHandler__default.default.on(this._element,eventOut,this._config.selector,event=>{var context=this._initializeOnDelegatedTarget(event);context._activeTrigger["focusout"===event.type?"focus":"hover"]=context._element.contains(event.relatedTarget),context._leave()}))}this._hideModalHandler=()=>{this._element&&this.hide()},EventHandler__default.default.on(this._element.closest(".modal"),"hide.bs.modal",this._hideModalHandler)}_fixTitle(){var title=this._element.getAttribute("title");title&&(this._element.getAttribute("aria-label")||this._element.textContent.trim()||this._element.setAttribute("aria-label",title),this._element.setAttribute("data-bs-original-title",title),this._element.removeAttribute("title"))}_enter(){this._isShown()||this._isHovered?this._isHovered=!0:(this._isHovered=!0,this._setTimeout(()=>{this._isHovered&&this.show()},this._config.delay.show))}_leave(){this._isWithActiveTrigger()||(this._isHovered=!1,this._setTimeout(()=>{this._isHovered||this.hide()},this._config.delay.hide))}_setTimeout(handler,timeout){clearTimeout(this._timeout),this._timeout=setTimeout(handler,timeout)}_isWithActiveTrigger(){return Object.values(this._activeTrigger).includes(!0)}_getConfig(config){var dataAttributes=Manipulator__default.default.getDataAttributes(this._element);for(const dataAttribute of Object.keys(dataAttributes))DISALLOWED_ATTRIBUTES.has(dataAttribute)&&delete dataAttributes[dataAttribute];return config={...dataAttributes,..."object"==typeof config&&config?config:{}},config=this._mergeConfigObj(config),config=this._configAfterMerge(config),this._typeCheckConfig(config),config}_configAfterMerge(config){return config.container=!1===config.container?document.body:index.getElement(config.container),"number"==typeof config.delay&&(config.delay={show:config.delay,hide:config.delay}),"number"==typeof config.title&&(config.title=config.title.toString()),"number"==typeof config.content&&(config.content=config.content.toString()),config}_getDelegateConfig(){var config={};for(const key in this._config)this.constructor.Default[key]!==this._config[key]&&(config[key]=this._config[key]);return config.selector=!1,config.trigger="manual",config}_disposePopper(){this._popper&&(this._popper.destroy(),this._popper=null)}static jQueryInterface(config){return this.each(function(){var data=Tooltip.getOrCreateInstance(this,config);if("string"==typeof config){if(void 0===data[config])throw new TypeError(`No method named "${config}"`);data[config]()}})}}return index.defineJQueryPlugin(Tooltip),Tooltip});