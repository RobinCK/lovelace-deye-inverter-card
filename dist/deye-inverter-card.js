const e="deye-inverter-card",t="deye-inverter-card-editor",a="Deye Inverter Card",r=["status","pv","battery","grid","load","temps"],s=["pv","battery","grid","load","temps"],n=["pv","battery"],i=["popup","more-info","none"],o=["detailed","compact"],l=["battery_power","grid_power"],c=[1,2,3],d=[1,2],p=.02,h=864e5;function u(e,t,a,r,s,n){function i(e){if(void 0!==e&&"function"!=typeof e)throw new TypeError("Function expected");return e}for(var o,l=r.kind,c="getter"===l?"get":"setter"===l?"set":"value",d=!t&&e?r.static?e:e.prototype:null,p=t||(d?Object.getOwnPropertyDescriptor(d,r.name):{}),h=!1,u=a.length-1;u>=0;u--){var g={};for(var m in r)g[m]="access"===m?{}:r[m];for(var m in r.access)g.access[m]=r.access[m];g.addInitializer=function(e){if(h)throw new TypeError("Cannot add initializers after decoration has completed");n.push(i(e||null))};var f=(0,a[u])("accessor"===l?{get:p.get,set:p.set}:p[c],g);if("accessor"===l){if(void 0===f)continue;if(null===f||"object"!=typeof f)throw new TypeError("Object expected");(o=i(f.get))&&(p.get=o),(o=i(f.set))&&(p.set=o),(o=i(f.init))&&s.unshift(o)}else(o=i(f))&&("field"===l?s.unshift(o):p[c]=o)}d&&Object.defineProperty(d,r.name,p),h=!0}function g(e,t,a){for(var r=arguments.length>2,s=0;s<t.length;s++)a=r?t[s].call(e,a):t[s].call(e);return r?a:void 0}"function"==typeof SuppressedError&&SuppressedError;const m=globalThis,f=m.ShadowRoot&&(void 0===m.ShadyCSS||m.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,y=Symbol(),v=new WeakMap;let b=class{constructor(e,t,a){if(this._$cssResult$=!0,a!==y)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o;const t=this.t;if(f&&void 0===e){const a=void 0!==t&&1===t.length;a&&(e=v.get(t)),void 0===e&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),a&&v.set(t,e))}return e}toString(){return this.cssText}};const x=(e,...t)=>{const a=1===e.length?e[0]:t.reduce((t,a,r)=>t+(e=>{if(!0===e._$cssResult$)return e.cssText;if("number"==typeof e)return e;throw Error("Value passed to 'css' function must be a 'css' function result: "+e+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(a)+e[r+1],e[0]);return new b(a,e,y)},$=f?e=>e:e=>e instanceof CSSStyleSheet?(e=>{let t="";for(const a of e.cssRules)t+=a.cssText;return(e=>new b("string"==typeof e?e:e+"",void 0,y))(t)})(e):e,{is:w,defineProperty:_,getOwnPropertyDescriptor:k,getOwnPropertyNames:M,getOwnPropertySymbols:A,getPrototypeOf:S}=Object,E=globalThis,C=E.trustedTypes,O=C?C.emptyScript:"",I=E.reactiveElementPolyfillSupport,L=(e,t)=>e,P={toAttribute(e,t){switch(t){case Boolean:e=e?O:null;break;case Object:case Array:e=null==e?e:JSON.stringify(e)}return e},fromAttribute(e,t){let a=e;switch(t){case Boolean:a=null!==e;break;case Number:a=null===e?null:Number(e);break;case Object:case Array:try{a=JSON.parse(e)}catch(e){a=null}}return a}},j=(e,t)=>!w(e,t),z={attribute:!0,type:String,converter:P,reflect:!1,useDefault:!1,hasChanged:j};Symbol.metadata??=Symbol("metadata"),E.litPropertyMetadata??=new WeakMap;let T=class extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??=[]).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,t=z){if(t.state&&(t.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(e)&&((t=Object.create(t)).wrapped=!0),this.elementProperties.set(e,t),!t.noAccessor){const a=Symbol(),r=this.getPropertyDescriptor(e,a,t);void 0!==r&&_(this.prototype,e,r)}}static getPropertyDescriptor(e,t,a){const{get:r,set:s}=k(this.prototype,e)??{get(){return this[t]},set(e){this[t]=e}};return{get:r,set(t){const n=r?.call(this);s?.call(this,t),this.requestUpdate(e,n,a)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??z}static _$Ei(){if(this.hasOwnProperty(L("elementProperties")))return;const e=S(this);e.finalize(),void 0!==e.l&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(L("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(L("properties"))){const e=this.properties,t=[...M(e),...A(e)];for(const a of t)this.createProperty(a,e[a])}const e=this[Symbol.metadata];if(null!==e){const t=litPropertyMetadata.get(e);if(void 0!==t)for(const[e,a]of t)this.elementProperties.set(e,a)}this._$Eh=new Map;for(const[e,t]of this.elementProperties){const a=this._$Eu(e,t);void 0!==a&&this._$Eh.set(a,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){const t=[];if(Array.isArray(e)){const a=new Set(e.flat(1/0).reverse());for(const e of a)t.unshift($(e))}else void 0!==e&&t.push($(e));return t}static _$Eu(e,t){const a=t.attribute;return!1===a?void 0:"string"==typeof a?a:"string"==typeof e?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(e=>e(this))}addController(e){(this._$EO??=new Set).add(e),void 0!==this.renderRoot&&this.isConnected&&e.hostConnected?.()}removeController(e){this._$EO?.delete(e)}_$E_(){const e=new Map,t=this.constructor.elementProperties;for(const a of t.keys())this.hasOwnProperty(a)&&(e.set(a,this[a]),delete this[a]);e.size>0&&(this._$Ep=e)}createRenderRoot(){const e=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((e,t)=>{if(f)e.adoptedStyleSheets=t.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(const a of t){const t=document.createElement("style"),r=m.litNonce;void 0!==r&&t.setAttribute("nonce",r),t.textContent=a.cssText,e.appendChild(t)}})(e,this.constructor.elementStyles),e}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(e=>e.hostConnected?.())}enableUpdating(e){}disconnectedCallback(){this._$EO?.forEach(e=>e.hostDisconnected?.())}attributeChangedCallback(e,t,a){this._$AK(e,a)}_$ET(e,t){const a=this.constructor.elementProperties.get(e),r=this.constructor._$Eu(e,a);if(void 0!==r&&!0===a.reflect){const s=(void 0!==a.converter?.toAttribute?a.converter:P).toAttribute(t,a.type);this._$Em=e,null==s?this.removeAttribute(r):this.setAttribute(r,s),this._$Em=null}}_$AK(e,t){const a=this.constructor,r=a._$Eh.get(e);if(void 0!==r&&this._$Em!==r){const e=a.getPropertyOptions(r),s="function"==typeof e.converter?{fromAttribute:e.converter}:void 0!==e.converter?.fromAttribute?e.converter:P;this._$Em=r;const n=s.fromAttribute(t,e.type);this[r]=n??this._$Ej?.get(r)??n,this._$Em=null}}requestUpdate(e,t,a,r=!1,s){if(void 0!==e){const n=this.constructor;if(!1===r&&(s=this[e]),a??=n.getPropertyOptions(e),!((a.hasChanged??j)(s,t)||a.useDefault&&a.reflect&&s===this._$Ej?.get(e)&&!this.hasAttribute(n._$Eu(e,a))))return;this.C(e,t,a)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(e,t,{useDefault:a,reflect:r,wrapped:s},n){a&&!(this._$Ej??=new Map).has(e)&&(this._$Ej.set(e,n??t??this[e]),!0!==s||void 0!==n)||(this._$AL.has(e)||(this.hasUpdated||a||(t=void 0),this._$AL.set(e,t)),!0===r&&this._$Em!==e&&(this._$Eq??=new Set).add(e))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}const e=this.scheduleUpdate();return null!=e&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[e,t]of this._$Ep)this[e]=t;this._$Ep=void 0}const e=this.constructor.elementProperties;if(e.size>0)for(const[t,a]of e){const{wrapped:e}=a,r=this[t];!0!==e||this._$AL.has(t)||void 0===r||this.C(t,void 0,a,r)}}let e=!1;const t=this._$AL;try{e=this.shouldUpdate(t),e?(this.willUpdate(t),this._$EO?.forEach(e=>e.hostUpdate?.()),this.update(t)):this._$EM()}catch(t){throw e=!1,this._$EM(),t}e&&this._$AE(t)}willUpdate(e){}_$AE(e){this._$EO?.forEach(e=>e.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Eq&&=this._$Eq.forEach(e=>this._$ET(e,this[e])),this._$EM()}updated(e){}firstUpdated(e){}};T.elementStyles=[],T.shadowRootOptions={mode:"open"},T[L("elementProperties")]=new Map,T[L("finalized")]=new Map,I?.({ReactiveElement:T}),(E.reactiveElementVersions??=[]).push("2.1.2");const U=globalThis,H=e=>e,N=U.trustedTypes,D=N?N.createPolicy("lit-html",{createHTML:e=>e}):void 0,B="$lit$",R=`lit$${Math.random().toFixed(9).slice(2)}$`,W="?"+R,V=`<${W}>`,F=document,G=()=>F.createComment(""),K=e=>null===e||"object"!=typeof e&&"function"!=typeof e,q=Array.isArray,Z="[ \t\n\f\r]",J=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,X=/-->/g,Q=/>/g,Y=RegExp(`>|${Z}(?:([^\\s"'>=/]+)(${Z}*=${Z}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),ee=/'/g,te=/"/g,ae=/^(?:script|style|textarea|title)$/i,re=e=>(t,...a)=>({_$litType$:e,strings:t,values:a}),se=re(1),ne=re(2),ie=Symbol.for("lit-noChange"),oe=Symbol.for("lit-nothing"),le=new WeakMap,ce=F.createTreeWalker(F,129);function de(e,t){if(!q(e)||!e.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==D?D.createHTML(t):t}const pe=(e,t)=>{const a=e.length-1,r=[];let s,n=2===t?"<svg>":3===t?"<math>":"",i=J;for(let t=0;t<a;t++){const a=e[t];let o,l,c=-1,d=0;for(;d<a.length&&(i.lastIndex=d,l=i.exec(a),null!==l);)d=i.lastIndex,i===J?"!--"===l[1]?i=X:void 0!==l[1]?i=Q:void 0!==l[2]?(ae.test(l[2])&&(s=RegExp("</"+l[2],"g")),i=Y):void 0!==l[3]&&(i=Y):i===Y?">"===l[0]?(i=s??J,c=-1):void 0===l[1]?c=-2:(c=i.lastIndex-l[2].length,o=l[1],i=void 0===l[3]?Y:'"'===l[3]?te:ee):i===te||i===ee?i=Y:i===X||i===Q?i=J:(i=Y,s=void 0);const p=i===Y&&e[t+1].startsWith("/>")?" ":"";n+=i===J?a+V:c>=0?(r.push(o),a.slice(0,c)+B+a.slice(c)+R+p):a+R+(-2===c?t:p)}return[de(e,n+(e[a]||"<?>")+(2===t?"</svg>":3===t?"</math>":"")),r]};class he{constructor({strings:e,_$litType$:t},a){let r;this.parts=[];let s=0,n=0;const i=e.length-1,o=this.parts,[l,c]=pe(e,t);if(this.el=he.createElement(l,a),ce.currentNode=this.el.content,2===t||3===t){const e=this.el.content.firstChild;e.replaceWith(...e.childNodes)}for(;null!==(r=ce.nextNode())&&o.length<i;){if(1===r.nodeType){if(r.hasAttributes())for(const e of r.getAttributeNames())if(e.endsWith(B)){const t=c[n++],a=r.getAttribute(e).split(R),i=/([.?@])?(.*)/.exec(t);o.push({type:1,index:s,name:i[2],strings:a,ctor:"."===i[1]?ye:"?"===i[1]?ve:"@"===i[1]?be:fe}),r.removeAttribute(e)}else e.startsWith(R)&&(o.push({type:6,index:s}),r.removeAttribute(e));if(ae.test(r.tagName)){const e=r.textContent.split(R),t=e.length-1;if(t>0){r.textContent=N?N.emptyScript:"";for(let a=0;a<t;a++)r.append(e[a],G()),ce.nextNode(),o.push({type:2,index:++s});r.append(e[t],G())}}}else if(8===r.nodeType)if(r.data===W)o.push({type:2,index:s});else{let e=-1;for(;-1!==(e=r.data.indexOf(R,e+1));)o.push({type:7,index:s}),e+=R.length-1}s++}}static createElement(e,t){const a=F.createElement("template");return a.innerHTML=e,a}}function ue(e,t,a=e,r){if(t===ie)return t;let s=void 0!==r?a._$Co?.[r]:a._$Cl;const n=K(t)?void 0:t._$litDirective$;return s?.constructor!==n&&(s?._$AO?.(!1),void 0===n?s=void 0:(s=new n(e),s._$AT(e,a,r)),void 0!==r?(a._$Co??=[])[r]=s:a._$Cl=s),void 0!==s&&(t=ue(e,s._$AS(e,t.values),s,r)),t}class ge{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){const{el:{content:t},parts:a}=this._$AD,r=(e?.creationScope??F).importNode(t,!0);ce.currentNode=r;let s=ce.nextNode(),n=0,i=0,o=a[0];for(;void 0!==o;){if(n===o.index){let t;2===o.type?t=new me(s,s.nextSibling,this,e):1===o.type?t=new o.ctor(s,o.name,o.strings,this,e):6===o.type&&(t=new xe(s,this,e)),this._$AV.push(t),o=a[++i]}n!==o?.index&&(s=ce.nextNode(),n++)}return ce.currentNode=F,r}p(e){let t=0;for(const a of this._$AV)void 0!==a&&(void 0!==a.strings?(a._$AI(e,a,t),t+=a.strings.length-2):a._$AI(e[t])),t++}}class me{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(e,t,a,r){this.type=2,this._$AH=oe,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=a,this.options=r,this._$Cv=r?.isConnected??!0}get parentNode(){let e=this._$AA.parentNode;const t=this._$AM;return void 0!==t&&11===e?.nodeType&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=ue(this,e,t),K(e)?e===oe||null==e||""===e?(this._$AH!==oe&&this._$AR(),this._$AH=oe):e!==this._$AH&&e!==ie&&this._(e):void 0!==e._$litType$?this.$(e):void 0!==e.nodeType?this.T(e):(e=>q(e)||"function"==typeof e?.[Symbol.iterator])(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==oe&&K(this._$AH)?this._$AA.nextSibling.data=e:this.T(F.createTextNode(e)),this._$AH=e}$(e){const{values:t,_$litType$:a}=e,r="number"==typeof a?this._$AC(e):(void 0===a.el&&(a.el=he.createElement(de(a.h,a.h[0]),this.options)),a);if(this._$AH?._$AD===r)this._$AH.p(t);else{const e=new ge(r,this),a=e.u(this.options);e.p(t),this.T(a),this._$AH=e}}_$AC(e){let t=le.get(e.strings);return void 0===t&&le.set(e.strings,t=new he(e)),t}k(e){q(this._$AH)||(this._$AH=[],this._$AR());const t=this._$AH;let a,r=0;for(const s of e)r===t.length?t.push(a=new me(this.O(G()),this.O(G()),this,this.options)):a=t[r],a._$AI(s),r++;r<t.length&&(this._$AR(a&&a._$AB.nextSibling,r),t.length=r)}_$AR(e=this._$AA.nextSibling,t){for(this._$AP?.(!1,!0,t);e!==this._$AB;){const t=H(e).nextSibling;H(e).remove(),e=t}}setConnected(e){void 0===this._$AM&&(this._$Cv=e,this._$AP?.(e))}}class fe{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,t,a,r,s){this.type=1,this._$AH=oe,this._$AN=void 0,this.element=e,this.name=t,this._$AM=r,this.options=s,a.length>2||""!==a[0]||""!==a[1]?(this._$AH=Array(a.length-1).fill(new String),this.strings=a):this._$AH=oe}_$AI(e,t=this,a,r){const s=this.strings;let n=!1;if(void 0===s)e=ue(this,e,t,0),n=!K(e)||e!==this._$AH&&e!==ie,n&&(this._$AH=e);else{const r=e;let i,o;for(e=s[0],i=0;i<s.length-1;i++)o=ue(this,r[a+i],t,i),o===ie&&(o=this._$AH[i]),n||=!K(o)||o!==this._$AH[i],o===oe?e=oe:e!==oe&&(e+=(o??"")+s[i+1]),this._$AH[i]=o}n&&!r&&this.j(e)}j(e){e===oe?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}}class ye extends fe{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===oe?void 0:e}}class ve extends fe{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==oe)}}class be extends fe{constructor(e,t,a,r,s){super(e,t,a,r,s),this.type=5}_$AI(e,t=this){if((e=ue(this,e,t,0)??oe)===ie)return;const a=this._$AH,r=e===oe&&a!==oe||e.capture!==a.capture||e.once!==a.once||e.passive!==a.passive,s=e!==oe&&(a===oe||r);r&&this.element.removeEventListener(this.name,this,a),s&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,e):this._$AH.handleEvent(e)}}class xe{constructor(e,t,a){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=a}get _$AU(){return this._$AM._$AU}_$AI(e){ue(this,e)}}const $e=U.litHtmlPolyfillSupport;$e?.(he,me),(U.litHtmlVersions??=[]).push("3.3.3");const we=globalThis;let _e=class extends T{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const e=super.createRenderRoot();return this.renderOptions.renderBefore??=e.firstChild,e}update(e){const t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=((e,t,a)=>{const r=a?.renderBefore??t;let s=r._$litPart$;if(void 0===s){const e=a?.renderBefore??null;r._$litPart$=s=new me(t.insertBefore(G(),e),e,void 0,a??{})}return s._$AI(e),s})(t,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return ie}};_e._$litElement$=!0,_e.finalized=!0,we.litElementHydrateSupport?.({LitElement:_e});const ke=we.litElementPolyfillSupport;ke?.({LitElement:_e}),(we.litElementVersions??=[]).push("4.2.2");const Me={attribute:!0,type:String,converter:P,reflect:!1,hasChanged:j},Ae=(e=Me,t,a)=>{const{kind:r,metadata:s}=a;let n=globalThis.litPropertyMetadata.get(s);if(void 0===n&&globalThis.litPropertyMetadata.set(s,n=new Map),"setter"===r&&((e=Object.create(e)).wrapped=!0),n.set(a.name,e),"accessor"===r){const{name:r}=a;return{set(a){const s=t.get.call(this);t.set.call(this,a),this.requestUpdate(r,s,e,!0,a)},init(t){return void 0!==t&&this.C(r,void 0,e,t),t}}}if("setter"===r){const{name:r}=a;return function(a){const s=this[r];t.call(this,a),this.requestUpdate(r,s,e,!0,a)}}throw Error("Unsupported decorator location: "+r)};function Se(e){return(t,a)=>"object"==typeof a?Ae(e,t,a):((e,t,a)=>{const r=t.hasOwnProperty(a);return t.constructor.createProperty(a,e),r?Object.getOwnPropertyDescriptor(t,a):void 0})(e,t,a)}function Ee(e){return Se({...e,state:!0,attribute:!1})}const Ce=["sensor"],Oe=["binary_sensor","sensor"],Ie=["number","sensor"],Le=[{key:"overall_state",section:"status",label:"Overall state",kind:"text",domains:Ce,aggregate:"none"},{key:"fault",section:"status",label:"Fault",kind:"text",domains:Ce,aggregate:"none"},{key:"grid_connected",section:"status",label:"Grid connected",kind:"binary",domains:Oe,aggregate:"master"},{key:"grid_relay_status",section:"status",label:"Grid relay status",kind:"binary",domains:Oe,aggregate:"master"},{key:"parallel_mode",section:"status",label:"Parallel mode",kind:"text",domains:Ce,aggregate:"none"},{key:"pv_power",section:"pv",label:"PV power",kind:"power",domains:Ce,aggregate:"sum"},{key:"pv1_power",section:"pv",label:"PV1 power",kind:"power",domains:Ce,aggregate:"sum"},{key:"pv2_power",section:"pv",label:"PV2 power",kind:"power",domains:Ce,aggregate:"sum"},{key:"pv1_voltage",section:"pv",label:"PV1 voltage",kind:"voltage",domains:Ce,aggregate:"master"},{key:"pv2_voltage",section:"pv",label:"PV2 voltage",kind:"voltage",domains:Ce,aggregate:"master"},{key:"pv1_current",section:"pv",label:"PV1 current",kind:"current",domains:Ce,aggregate:"sum"},{key:"pv2_current",section:"pv",label:"PV2 current",kind:"current",domains:Ce,aggregate:"sum"},{key:"day_pv_energy",section:"pv",label:"Day PV energy",kind:"energy",domains:Ce,aggregate:"sum"},{key:"battery_soc",section:"battery",label:"Battery SOC",kind:"percent",domains:Ce,aggregate:"shared"},{key:"battery_power",section:"battery",label:"Battery power",kind:"power",domains:Ce,aggregate:"sum",sign:"battery_power"},{key:"battery_voltage",section:"battery",label:"Battery voltage",kind:"voltage",domains:Ce,aggregate:"shared"},{key:"battery_current",section:"battery",label:"Battery current",kind:"current",domains:Ce,aggregate:"sum",sign:"battery_power"},{key:"battery_temperature",section:"battery",label:"Battery temperature",kind:"temperature",domains:Ce,aggregate:"shared"},{key:"day_battery_charge",section:"battery",label:"Day battery charge",kind:"energy",domains:Ce,aggregate:"sum"},{key:"day_battery_discharge",section:"battery",label:"Day battery discharge",kind:"energy",domains:Ce,aggregate:"sum"},{key:"battery_capacity_current",section:"battery",label:"Battery capacity",kind:"capacity",domains:Ie,aggregate:"pooled"},{key:"battery_low_capacity",section:"battery",label:"Battery low capacity",kind:"percent",domains:Ie,aggregate:"master"},{key:"battery_shutdown_capacity",section:"battery",label:"Battery shutdown capacity",kind:"percent",domains:Ie,aggregate:"master"},{key:"grid_power",section:"grid",label:"Grid power",kind:"power",domains:Ce,aggregate:"sum",sign:"grid_power"},{key:"grid_ct_power",section:"grid",label:"Grid CT power",kind:"power",domains:Ce,aggregate:"sum",sign:"grid_power"},{key:"grid_l1_power",section:"grid",label:"Grid L1 power",kind:"power",domains:Ce,aggregate:"sum",sign:"grid_power"},{key:"grid_l2_power",section:"grid",label:"Grid L2 power",kind:"power",domains:Ce,aggregate:"sum",sign:"grid_power"},{key:"grid_l3_power",section:"grid",label:"Grid L3 power",kind:"power",domains:Ce,aggregate:"sum",sign:"grid_power"},{key:"grid_l1_voltage",section:"grid",label:"Grid L1 voltage",kind:"voltage",domains:Ce,aggregate:"master",decimals:0},{key:"grid_l2_voltage",section:"grid",label:"Grid L2 voltage",kind:"voltage",domains:Ce,aggregate:"master",decimals:0},{key:"grid_l3_voltage",section:"grid",label:"Grid L3 voltage",kind:"voltage",domains:Ce,aggregate:"master",decimals:0},{key:"grid_frequency",section:"grid",label:"Grid frequency",kind:"frequency",domains:Ce,aggregate:"master"},{key:"day_grid_import",section:"grid",label:"Day grid import",kind:"energy",domains:Ce,aggregate:"sum"},{key:"day_grid_export",section:"grid",label:"Day grid export",kind:"energy",domains:Ce,aggregate:"sum"},{key:"load_power",section:"load",label:"Load power",kind:"power",domains:Ce,aggregate:"sum"},{key:"load_l1_power",section:"load",label:"Load L1 power",kind:"power",domains:Ce,aggregate:"sum"},{key:"load_l2_power",section:"load",label:"Load L2 power",kind:"power",domains:Ce,aggregate:"sum"},{key:"load_l3_power",section:"load",label:"Load L3 power",kind:"power",domains:Ce,aggregate:"sum"},{key:"load_l1_voltage",section:"load",label:"Load L1 voltage",kind:"voltage",domains:Ce,aggregate:"master",decimals:0},{key:"load_l2_voltage",section:"load",label:"Load L2 voltage",kind:"voltage",domains:Ce,aggregate:"master",decimals:0},{key:"load_l3_voltage",section:"load",label:"Load L3 voltage",kind:"voltage",domains:Ce,aggregate:"master",decimals:0},{key:"load_frequency",section:"load",label:"Load frequency",kind:"frequency",domains:Ce,aggregate:"master"},{key:"day_load_energy",section:"load",label:"Day load energy",kind:"energy",domains:Ce,aggregate:"sum"},{key:"radiator_temperature",section:"temps",label:"Radiator temperature",kind:"temperature",domains:Ce,aggregate:"none"},{key:"dc_transformer_temperature",section:"temps",label:"DC transformer temperature",kind:"temperature",domains:Ce,aggregate:"none"}],Pe=new Map(Le.map(e=>[e.key,e]));function je(e){const t=Pe.get(e);if(!t)throw new Error(`Unknown sensor key: ${e}`);return t}function ze(e){return Pe.has(e)}function Te(e){return Le.filter(t=>t.section===e).map(e=>e.key)}const Ue=/^[a-z0-9_]+$/,He={pv:"popup",battery:"popup",grid:"more-info",load:"more-info",temps:"more-info"};function Ne(e){return n.includes(e)}function De(e){const t=e.split("_").filter(Boolean),a=t.at(-1)??e;return t.length<2?a.toUpperCase():a[0].toUpperCase()+a.slice(1)}function Be(e){const t={};for(const[a,r]of Object.entries(e??{}))ze(a)&&"string"==typeof r&&r.length>0&&(t[a]=r);return t}function Re(e){const t={...He};for(const a of s){const r=e?.[a];r&&i.includes(r)&&(t[a]="popup"!==r||Ne(a)?r:"more-info")}return t}function We(e){if(!e||"object"!=typeof e)throw new Error("Invalid configuration");if(!Array.isArray(e.inverters)||0===e.inverters.length)throw new Error("Add at least one inverter: inverters: [{ prefix: deye_master }]");const t=e.inverters.map(t=>function(e,t){const a="string"==typeof e?.prefix?e.prefix.trim():"";if(!Ue.test(a))throw new Error(`Invalid inverter prefix "${a}": use lowercase letters, digits and "_"`);return{prefix:a,name:e.name?.trim()||a,overrides:Be(t?.[a])}}(t,e.entities)),a=t.map(e=>e.prefix);if(new Set(a).size!==a.length)throw new Error("Each inverter prefix must be unique");return{title:e.title?.trim()||"Total",display:(i=e.display,i&&o.includes(i)?i:"detailed"),inverters:t,showTotals:!1!==e.show_totals,isParallel:!1!==e.parallel,master:e.master&&a.includes(e.master)?e.master:a[0],sections:(n=e.sections,Array.isArray(n)?new Set(n.filter(e=>r.includes(e))):new Set(r)),tapActions:Re(e.tap_actions),invert:(s=e.invert,Object.fromEntries(l.map(e=>[e,!0===s?.[e]])))};var s,n,i}function Ve(e,t,a){return je(a).domains.map(e=>function(e,t,a){return`${e}.${t}_${a}`}(e,t,a)).find(t=>t in e)}function Fe(e,t,a,r={}){const s=r[a];return s?s in e?s:void 0:Ve(e,t,a)}function Ge(e,t,a,r){return{isNumeric:!0,decimals:t,unit:()=>e,scale:e=>a[e??r]??a[r]??1}}function Ke(e,t){return{isNumeric:!0,decimals:t,unit:()=>e,scale:()=>1}}const qe={isNumeric:!1,decimals:0,unit:()=>"",scale:()=>1},Ze={power:Ge("kW",2,{W:.001,kW:1,MW:1e3},"W"),energy:Ge("kWh",1,{Wh:.001,kWh:1,MWh:1e3},"kWh"),voltage:Ke("V",1),current:Ke("A",1),frequency:Ke("Hz",2),temperature:(Je="°C",Xe=1,{isNumeric:!0,decimals:Xe,unit:e=>e??Je,scale:()=>1}),percent:Ke("%",0),capacity:Ke("Ah",0),text:qe,binary:qe};var Je,Xe;const Qe="—",Ye={comma_decimal:"en-US",decimal_period:"de",space_comma:"fr"},et={12:"h12",24:"h23"},tt=1440,at=new Map;function rt(e,t="en"){const a=e?.language??t,r=e?.number_format??"language",s=e?.time_format??"language";return{numberLocale:"system"===r?void 0:Ye[r]??a,useGrouping:"none"!==r,timeLocale:"system"===s?void 0:a,hourCycle:et[s]}}function st(e,t,a){if(void 0===e||!Number.isFinite(e))return Qe;const r=Math.abs(e)<.5*10**-t?0:e;return function(e,t){const a=`${t.numberLocale??""}|${e}|${t.useGrouping}`,r=at.get(a);if(r)return r;const s=new Intl.NumberFormat(t.numberLocale,{minimumFractionDigits:e,maximumFractionDigits:e,useGrouping:t.useGrouping});return at.set(a,s),s}(t,a).format(r)}function nt(e){const t=Math.max(0,Math.round(e));if(t<60)return`${t}m`;if(t<tt)return`${Math.floor(t/60)}h ${t%60}m`;return`${Math.floor(t/tt)}d ${Math.floor(t%tt/60)}h`}function it(e,t){return new Intl.DateTimeFormat(t.timeLocale,{hour:"2-digit",minute:"2-digit",hourCycle:t.hourCycle}).format(e)}function ot(e,t){return new Intl.DateTimeFormat(t.timeLocale,{weekday:"short"}).format(e)}function lt(e){return 0===e.length?e:e[0].toUpperCase()+e.slice(1)}function ct(e,t,a=`${t}s`){return`${e} ${1===e?t:a}`}const dt=new Set(["unavailable","unknown"]),pt=new Set(["on","true","1"]),ht=new Set(["off","false","0"]);function ut(e){return ht.has(e.toLowerCase())}function gt(e,t,a,r){const s=je(e),n=Ze[s.kind],i=s.sign&&r[s.sign]?-1:1;return t*n.scale(a)*i}function mt(e,t,a){const r=je(e),s=Ze[r.kind],n=t.attributes.unit_of_measurement,i=Date.parse(t.last_changed),o={entityId:t.entity_id,unit:s.unit(n),lastChanged:Number.isNaN(i)?void 0:i};if(dt.has(t.state))return{...o,isAvailable:!1};if(!s.isNumeric)return{...o,isAvailable:!0,text:t.state};const l=Number.parseFloat(t.state);return Number.isFinite(l)?{...o,isAvailable:!0,value:gt(e,l,n,a)}:{...o,isAvailable:!1}}function ft(e){return e?.isAvailable?e.value:void 0}function yt(e){return e?.isAvailable?e.text:void 0}function vt(e){const t=yt(e)?.toLowerCase();if(void 0!==t)return!!pt.has(t)||!ut(t)&&void 0}function bt(e,t,a,r={}){const s=ft(t);if(void 0===s||!t)return Qe;const n=je(e),i=n.decimals??Ze[n.kind].decimals,o=st(r.isAbsolute?Math.abs(s):s,i,a);return r.hasUnit&&t.unit?`${o} ${t.unit}`:o}const xt={label:"OK",tone:"ok"},$t={label:"Alarm",tone:"warning"},wt={label:"Off-grid",tone:"info"},_t={label:"Unavailable",tone:"neutral"},kt={alarm:$t,fault:{label:"Fault",tone:"error"}};function Mt(e){if(void 0!==e)return e?"On-grid":"Off-grid"}function At(e){if(void 0!==e)return e?"relay closed":"relay open"}function St(e,t,a){const r=(t?["load_frequency","grid_frequency"]:["grid_frequency","load_frequency"]).find(t=>e[t]?.isAvailable);return r?bt(r,e[r],a,{hasUnit:!0}):void 0}function Et(e,t,a,r,s){if(t)return{text:t,tone:"error"===a?.tone?"error":"warning",isFault:!0};const n=[Mt(vt(e.grid_connected)),At(vt(e.grid_relay_status)),St(e,r,s),yt(e.parallel_mode)?.trim().toLowerCase()].filter(e=>Boolean(e));return 0!==n.length?{text:n.join(" · "),tone:"normal",isFault:!1}:void 0}function Ct(e,t){const a=!1===vt(e.grid_connected),r=yt(e.fault)?.trim()??"",s=function(e,t,a){if(e.overall_state&&!e.overall_state.isAvailable)return _t;const r=yt(e.overall_state)?.trim().toLowerCase();return(r?kt[r]:void 0)||(!r&&t?$t:a?wt:"ok"===r?xt:r?{label:lt(r),tone:"neutral"}:e.fault?.isAvailable?xt:void 0)}(e,r,a);return{chip:s,line:Et(e,r,s,a,t),isOffGrid:a}}function Ot(e,t){const a=e.filter(e=>"error"===e.chip?.tone).length,r=e.filter(e=>"warning"===e.chip?.tone).length;if(a>0)return{label:ct(a,"fault"),tone:"error"};if(r>0)return{label:ct(r,"alarm"),tone:"warning"};if(t?.isOffGrid)return wt;const s=e.find(e=>"neutral"===e.chip?.tone);return s?s.chip:e.some(e=>e.chip)?xt:void 0}function It(e,t,a,r){const s=[ct(e.length,"inverter")];return r&&s.push("parallel",`battery from ${a}`),{chip:Ot(e,t),line:{text:s.join(" · "),tone:"normal",isFault:!1},isOffGrid:t?.isOffGrid??!1}}const Lt=e=>{const[t]=e;var a;if(t)return e.some(e=>!e.isAvailable)?(a=t,{...a,isAvailable:!1,value:void 0}):{...t,value:e.reduce((e,t)=>e+(t.value??0),0)}},Pt=(e,t)=>t??e[0];const jt={sum:Lt,master:Pt,shared:(e,t,a)=>a?Pt(e,t):(e=>{const t=Lt(e);return t&&void 0!==t.value?{...t,value:t.value/e.length}:t})(e),pooled:(e,t,a)=>a?Pt(e,t):Lt(e),none:()=>{}};function zt(e,t,a){const r=e.find(e=>e.prefix===t)??e[0],s={};for(const t of Le){const n=t.key,i=e.map(e=>e.readings[n]).filter(e=>void 0!==e);if(0===i.length)continue;const o=jt[t.aggregate](i,r?.readings[n],a);o&&(s[n]=o)}return s}const Tt=[{key:"radiator_temperature",label:"Radiator"},{key:"dc_transformer_temperature",label:"Transformer"}];function Ut(e,t,a,r){const s=function(e,t,a){const r={};for(const s of Le){const n=Fe(e,t.prefix,s.key,t.overrides),i=n?e[n]:void 0;i&&(r[s.key]=mt(s.key,i,a))}return r}(e,t,a.invert);return{prefix:t.prefix,name:t.name,readings:s,status:Ct(s,r)}}function Ht(e){return e.flatMap(e=>{const t=e.readings.radiator_temperature;return t?[{label:e.name,key:"radiator_temperature",reading:t,tone:e.status.chip?.tone??"neutral"}]:[]})}function Nt(e,t,a){const r=t.inverters.map(r=>Ut(e,r,t,a)),s=r.map(e=>function(e,t,a){return{id:e.prefix,kind:"inverter",name:e.name,readings:e.readings,status:e.status,members:[e],master:e,isParallel:t.isParallel&&a>1,isWholeBattery:!(t.isParallel&&a>1),footer:(r=e.readings,Tt.flatMap(({key:e,label:t})=>{const a=r[e];return a?[{label:t,key:e,reading:a}]:[]}))};var r}(e,t,r.length));return t.showTotals&&r.length>1&&s.push(function(e,t){const a=e.find(e=>e.prefix===t.master)??e[0];return{id:"__totals__",kind:"totals",name:t.title,readings:zt(e,a.prefix,t.isParallel),status:It(e.map(e=>e.status),a.status,a.name,t.isParallel),members:e,master:a,isParallel:t.isParallel,isWholeBattery:!0,footer:Ht(e)}}(r,t)),s}const Dt=["overall_state","battery_soc","pv_power","grid_power","load_power","radiator_temperature"],Bt="sensor.";function Rt(e){if(!e.startsWith(Bt))return;const t=e.slice(7),a=Dt.find(e=>t.endsWith(`_${e}`));return a&&t.slice(0,-(a.length+1))||void 0}function Wt(e){const t=new Map;for(const a of Object.keys(e)){const e=Rt(a);e&&t.set(e,(t.get(e)??0)+1)}return[...t].filter(([,e])=>e>=2).map(([e])=>e).sort()}function Vt(e){return{power:`pv${e}_power`,voltage:`pv${e}_voltage`,current:`pv${e}_current`}}function Ft(e){if(e.pv_power)return e.pv_power;return function(e){return Lt(e)}(d.map(t=>e[Vt(t).power]).filter(e=>void 0!==e))}function Gt(e){return e.pv_power?[e.pv_power.entityId]:d.map(t=>e[Vt(t).power]).filter(e=>void 0!==e).map(e=>e.entityId)}function Kt(e){return e.grid_power?"grid_power":e.grid_ct_power?"grid_ct_power":void 0}function qt(e,t){const a=[];for(const r of c){const{power:s,voltage:n}=t(r),i=e[s];i&&a.push({phase:r,powerKey:s,power:i,voltage:e[n]})}return a}function Zt(e){return void 0!==e&&(e<207||e>253)}function Jt(e){if(void 0!==e)return Math.abs(e)<p?"idle":e<0?"charging":"discharging"}function Xt(e,t){return void 0===e?"normal":e<t.shutdown?"critical":e<t.low?"low":"normal"}function Qt(e,t){const a=ft(e.battery_soc),r=ft(e.battery_power),s=ft(e.battery_voltage),n=ft(e.battery_capacity_current),i=Jt(r);if(void 0===a||void 0===r||void 0===s||!n)return;if(void 0===i||"idle"===i)return;const o=n*s/1e3,l="charging"===i,c=l?100-a:a-t.shutdown;return{kind:l?"full":"empty",minutes:Math.max(0,c)/100*o/Math.abs(r)*60}}class Yt{hass;constructor(e){this.hass=e}async fetchStates(e,t,a){if(0===e.length)return{};const r=await this.hass.callWS({type:"history/history_during_period",start_time:new Date(t).toISOString(),end_time:new Date(a).toISOString(),entity_ids:e,minimal_response:!0,no_attributes:!0,significant_changes_only:!1});return Object.fromEntries(Object.entries(r).map(([e,t])=>[e,t.map(e=>({time:1e3*e.lu,state:e.s}))]))}async fetchHourlyMeans(e,t,a){if(0===e.length)return{};const r=await this.hass.callWS({type:"recorder/statistics_during_period",start_time:new Date(t).toISOString(),end_time:new Date(a).toISOString(),statistic_ids:e,period:"hour",types:["mean"]});return Object.fromEntries(Object.entries(r).map(([e,t])=>[e,ea(t)]))}}function ea(e){return e.flatMap(e=>{const t="number"==typeof e.start?e.start:Date.parse(e.start);return"number"!=typeof e.mean||Number.isNaN(t)?[]:[{time:t,value:e.mean}]})}function ta(e,t){return e.flatMap(e=>{const a=Number.parseFloat(e.state);return Number.isFinite(a)?[{time:e.time,value:t(a)}]:[]})}function aa(e,t,a,r,s=a){const n=(a-t)/r,i=new Array(r).fill(0),o=new Array(r).fill(0),l=Math.min(s,a);return e.forEach((a,s)=>{const c=Math.max(a.time,t),d=Math.min(e[s+1]?.time??l,l);if(d<=c)return;const p=Math.floor((c-t)/n),h=Math.min(r-1,Math.ceil((d-t)/n)-1);for(let e=p;e<=h;e+=1){const r=t+e*n,s=Math.min(d,r+n)-Math.max(c,r);s>0&&(i[e]+=a.value*s,o[e]+=s)}}),i.map((e,t)=>o[t]>0?e/o[t]:void 0)}function ra(e){const t=Math.max(0,...e.map(e=>e.length));return Array.from({length:t},(t,a)=>{const r=e.map(e=>e[a]).filter(e=>void 0!==e);return 0===r.length?void 0:r.reduce((e,t)=>e+t,0)})}function sa(e,t,a,r,s,n){const i=(a-t)/r,o=new Array(r).fill(!1),l=Math.min(s,a);return e.forEach((a,s)=>{if(!n(a.state))return;const c=Math.max(a.time,t),d=Math.min(e[s+1]?.time??l,l);if(d<=c)return;const p=Math.floor((c-t)/i),h=Math.min(r-1,Math.ceil((d-t)/i)-1);for(let e=p;e<=h;e+=1)o[e]=!0}),o}const na=36e5;function ia(e,t){const a=new Date(e);return a.setHours(t,0,0,0),a.getTime()}function oa(e){return{start:ia(e,5),end:ia(e,21)}}function la(e,t){const a=(t-e.start)/(e.end-e.start);return Math.min(1,Math.max(0,a))}function ca(e,t){const a=[],r=new Date(e.start);r.setMinutes(0,0,0),r.setHours(Math.ceil(r.getHours()/t)*t);for(let s=r.getTime();s<e.end;s=da(s,t))s>e.start&&a.push(s);return a}function da(e,t){const a=new Date(e);return a.setHours(a.getHours()+t),a.getTime()}const pa={status:"loading",slots:[]};function ha(e){return[...new Set(e.filter(e=>void 0!==e))].sort()}class ua{host;power=new Map;outageSlots=new Map;loadedKey="";loadedAt=0;pendingKey;constructor(e){this.host=e,e.addController(this)}hostConnected(){this.loadedKey=""}hostDisconnected(){this.pendingKey=void 0}sync(e,t,a,r){const s=function(e,t){return{power:t.sections.has("pv")?ha(e.flatMap(e=>e.members.flatMap(e=>Gt(e.readings)))):[],outage:t.sections.has("grid")?ha(e.filter(e=>e.status.isOffGrid).map(e=>e.master.readings.grid_connected?.entityId)):[]}}(t,a),n=JSON.stringify(s);if(!(n===this.loadedKey&&r-this.loadedAt<3e5)&&n!==this.pendingKey)return 0===s.power.length&&0===s.outage.length?(this.loadedKey=n,void(this.loadedAt=r)):void this.load(e,s,n,r)}sparkline(e){const t=e.members.map(e=>Gt(e.readings).map(e=>this.power.get(e)));if(t.some(e=>e.some(e=>void 0===e)))return{status:"loading",back:[]};const a=t.map(e=>ra(e.filter(e=>!!e))),r=e.members.indexOf(e.master);return{status:"ready",back:ra(a),front:"totals"===e.kind?a[r]:void 0}}outage(e){const t=e.master.readings.grid_connected?.entityId,a=t?this.outageSlots.get(t):void 0;return a?{status:"ready",slots:a}:pa}async load(e,t,a,r){const s=new Yt(e);this.pendingKey=a;const[n,i]=await Promise.all([this.loadPower(s,e,t.power,r),this.loadOutage(s,t.outage,r)]);this.pendingKey===a&&(this.power=n,this.outageSlots=i,this.loadedKey=a,this.loadedAt=r,this.pendingKey=void 0,this.host.requestUpdate())}async loadPower(e,t,a,r){const s=oa(r),n=new Map(a.map(e=>[e,[]]));if(0===a.length||r<=s.start)return n;try{const n=await e.fetchStates(a,s.start,Math.min(r,s.end));return new Map(a.map(e=>{const a=Ze.power.scale(t.states[e]?.attributes.unit_of_measurement);return[e,aa(ta(n[e]??[],e=>e*a),s.start,s.end,96,r)]}))}catch{return n}}async loadOutage(e,t,a){const r=a-h,s=new Map(t.map(e=>[e,new Array(48).fill(!1)]));if(0===t.length)return s;try{const s=await e.fetchStates(t,r,a);return new Map(t.map(e=>[e,sa(s[e]??[],r,a,48,a,ut)]))}catch{return s}}}const ga={sun:ne`<circle cx="12" cy="12" r="4"></circle><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"></path>`,battery:ne`<rect x="2" y="7" width="17" height="10" rx="2"></rect><path d="M22 11v2"></path>`,grid:ne`<path d="M8 21l4-18 4 18M6 9h12M5 13h14M9.5 17h5"></path>`,gridOff:ne`<path d="M8 21l4-18 4 18M6 9h12M5 13h14M9.5 17h5"></path><path class="icon-slash" d="M3 3l18 18"></path>`,home:ne`<path d="M3 11l9-7 9 7"></path><path d="M5 10v10h14V10"></path>`,chevron:ne`<path d="M9 6l6 6-6 6"></path>`,chart:ne`<path d="M4 4v16h16"></path><path d="M8 14l3.5-4 3 3 4.5-6"></path>`,thermometer:ne`<path d="M14 14.8V5a2 2 0 0 0-4 0v9.8a4 4 0 1 0 4 0z"></path>`,warning:ne`<path d="M12 3l10 18H2L12 3z"></path><path d="M12 10v4M12 17.5h.01"></path>`,info:ne`<circle cx="12" cy="12" r="9"></circle><path d="M12 7v6M12 16.5h.01"></path>`,close:ne`<path d="M6 6l12 12M18 6L6 18"></path>`,bolt:ne`<path class="icon-fill" d="M13 2L4 14h7l-1 8 9-12h-7l1-8z"></path>`,pencil:ne`<path d="M4 20h4L18 10l-4-4L4 16v4z"></path><path d="M13.5 6.5l4 4"></path>`,trash:ne`<path d="M4 7h16M9 7V4h6v3M6 7l1 13h10l1-13"></path>`,plus:ne`<path d="M12 5v14M5 12h14"></path>`,back:ne`<path d="M19 12H5M11 6l-6 6 6 6"></path>`};function ma(e,t,a=""){return se`<svg
    class="icon ${a}"
    width=${t}
    height=${t}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round"
    aria-hidden="true"
  >
    ${ga[e]}
  </svg>`}function fa(e,t,a,r){return"compact"===r?se`<span class="tile-head"><span class="tile-label">${e.label}</span></span>`:se`<span class="tile-head">
    ${ma(e.icon(t),16,"tile-icon")}
    <span class="tile-label">${e.label}</span>
    ${function(e){return"popup"===e?ma("chevron",14,"tile-action"):"more-info"===e?ma("chart",14,"tile-action"):oe}(a)}
  </span>`}const ya=1;let va=class{constructor(e){}get _$AU(){return this._$AM._$AU}_$AT(e,t,a){this._$Ct=e,this._$AM=t,this._$Ci=a}_$AS(e,t){return this.update(e,t)}update(e,t){return this.render(...t)}};const ba="important",xa=" !"+ba,$a=(e=>(...t)=>({_$litDirective$:e,values:t}))(class extends va{constructor(e){if(super(e),e.type!==ya||"style"!==e.name||e.strings?.length>2)throw Error("The `styleMap` directive must be used in the `style` attribute and must be the only part in the attribute.")}render(e){return Object.keys(e).reduce((t,a)=>{const r=e[a];return null==r?t:t+`${a=a.includes("-")?a:a.replace(/(?:^(webkit|moz|ms|o)|)(?=[A-Z])/g,"-$&").toLowerCase()}:${r};`},"")}update(e,[t]){const{style:a}=e.element;if(void 0===this.ft)return this.ft=new Set(Object.keys(t)),this.render(t);for(const e of this.ft)null==t[e]&&(this.ft.delete(e),e.includes("-")?a.removeProperty(e):a[e]=null);for(const e in t){const r=t[e];if(null!=r){this.ft.add(e);const t="string"==typeof r&&r.endsWith(xa);e.includes("-")||t?a.setProperty(e,t?r.slice(0,-11):r,t?ba:""):a[e]=r}}return ie}}),wa=[1,2,2.5,5,10];function _a(e){return e.toFixed(2)}function ka(e,t,a){return Math.min(a,Math.max(t,e))}function Ma(e,t,a){const[r]=e;if(!r)return"";let s=`M${_a(r[0])} ${_a(r[1])}`;for(let r=0;r<e.length-1;r+=1){const n=e[r-1]??e[r],i=e[r],o=e[r+1],l=e[r+2]??o,c=i[0]+(o[0]-n[0])/6,d=ka(i[1]+(o[1]-n[1])/6,t,a),p=o[0]-(l[0]-i[0])/6,h=ka(o[1]-(l[1]-i[1])/6,t,a);s+=` C${_a(c)} ${_a(d)} ${_a(p)} ${_a(h)} ${_a(o[0])} ${_a(o[1])}`}return s}function Aa(e,t,a){const r=e[0],s=e.at(-1);return r&&s?`${Ma(e,a,t)} L${_a(s[0])} ${t} L${_a(r[0])} ${t} Z`:""}function Sa(e,t,a=1){const r=Math.max(e,a)/t,s=10**Math.floor(Math.log10(r)),n=(wa.find(e=>e*s>=r)??10)*s;return{max:n*t,step:n}}function Ea(e,t,a){return e.flatMap((e,r)=>void 0===e?[]:[[t(r),a(e)]])}function Ca(e,t,a="normal",r=""){return se`<span class="value ${a} ${r}"
    ><span class="number">${e}</span><span class="unit">${t}</span></span
  >`}function Oa(e){return se`<span class="caption">${e??oe}</span>`}function Ia(){return Oa(se`${ma("info",12)}<span>unavailable</span>`)}function La(e){return"compact"===e?se`<span class="visual skeleton"><span class="bone wide"></span></span>`:se`<span class="visual skeleton"
    ><span class="bone short"></span><span class="bone tall"></span
  ></span>`}function Pa(e,t,a){const r=e??0,s=Math.min(9,Math.floor(r/10));return se`<span class="battery-visual level-${t}"
    ><span class="cells"
      >${Array.from({length:10},(t,n)=>{const i=Math.max(0,Math.min(1,r/10-n));return se`<span class="cell"
          ><span
            class=${a&&void 0!==e&&n===s?"fill breathing":"fill"}
            style=${$a({width:`${Math.round(100*i)}%`})}
          ></span
        ></span>`})}</span
    ><span class="nub"></span
  ></span>`}function ja(e,t){const a=bt(e.powerKey,e.power,t,{isAbsolute:!0}),r=e.voltage?` · ${st(ft(e.voltage),0,t)} V`:"";return`L${e.phase} · ${a} kW${r}`}function za(e){return Math.max(1,...e.map(e=>Math.abs(ft(e.power)??0)))}function Ta(e,t){return`${Math.round(Math.abs(e)/t*100)}%`}function Ua(e,t,a){if(a)return se``;const r=Zt(ft(e.voltage)),s=bt(e.powerKey,e.power,t,{isAbsolute:!0});return se`<span class="phase-label"
    ><span class=${r?"phase-name warning":"phase-name"}>L${e.phase}</span>
    ${s}</span
  >`}function Ha(e,t){return se`<span class="phase">
    <span class="track placeholder"></span>
    ${t?oe:se`<span class="phase-label muted">L${e.phase} ${Qe}</span>`}
  </span>`}function Na(e,t,a,r,s,n){const i=e=>n-Math.max(0,e)/s*(n-2),o=100*la(a,r),l=Ea(e,t=>t/e.length*100,i).filter(([e])=>e<o);return r<=a.start?l:[...l,[o,i(t??0)]]}function Da(e,t){return st(void 0===e?void 0:Math.abs(e),2,t)}const Ba={charging:"ok",discharging:"warning",idle:"muted"},Ra={normal:"normal",low:"warning",critical:"error"};function Wa(e){const t=ft(e.readings.battery_soc),a=ft(e.readings.battery_power),r=function(e){const t=ft(e.battery_low_capacity),a=ft(e.battery_shutdown_capacity);return{low:t??35,shutdown:a??10,hasLow:void 0!==t,hasShutdown:void 0!==a}}(e.readings);return{soc:t,power:a,flow:Jt(a),level:Xt(t,r),thresholds:r,eta:e.isWholeBattery?Qt(e.readings,r):void 0}}function Va(e){if(e.eta){const t=nt(e.eta.minutes);return"full"===e.eta.kind?`full in ${t}`:`${t} left`}return e.flow??""}function Fa(e){return e?Ba[e]:"muted"}const Ga={id:"battery",label:"Battery",icon:()=>"battery",isVisible:e=>void 0!==e.readings.battery_soc||void 0!==e.readings.battery_power,primaryEntityId:e=>(e.readings.battery_soc??e.readings.battery_power)?.entityId,render(e,t,a){const r=Wa(e),s="charging"===r.flow||"discharging"===r.flow,n=st(r.soc,0,t.locale),i=void 0===r.soc?"disabled":Ra[r.level];return"compact"===a?se`${Ca(n,"%",i,"percent")}
      ${Pa(r.soc,r.level,s)}`:se`<span class="value-row">
        ${Ca(n,"%",i,"percent")} ${function(e,t){return void 0===e.power?oe:se`<span class="side">
    <span class="side-value">${Da(e.power,t)} kW</span>
    <span class="side-note ${Fa(e.flow)}" title=${Va(e)}
      >${Va(e)}</span
    >
  </span>`}(r,t.locale)}
      </span>
      ${Pa(r.soc,r.level,s)}
      ${void 0===r.soc&&e.readings.battery_soc?Ia():(o=e.readings,l=t.locale,Oa([o.battery_voltage?`${bt("battery_voltage",o.battery_voltage,l)} V`:void 0,o.battery_temperature?`${bt("battery_temperature",o.battery_temperature,l)} ${o.battery_temperature.unit}`:void 0].filter(e=>void 0!==e).join(" · ")))}`;var o,l}};function Ka(e,t,a){const r=e.master.readings.grid_connected?.lastChanged,s=void 0===r?Qe:nt((t.now-r)/6e4),n=function(e,t,a,r,s){if("loading"===e.status)return La(s);const n={start:t-a,end:t},i=ca(n,12).map(e=>({time:e,x:la(n,e)})).filter(e=>e.x<.86);return se`<span class="visual outage">
    <span
      class="strip"
      style=${$a({gridTemplateColumns:`repeat(${e.slots.length}, minmax(0, 1fr))`})}
      >${e.slots.map(e=>se`<span class=${e?"slot down":"slot"}></span>`)}</span
    >
    ${"compact"===s?oe:se`<span class="strip-axis">
            ${i.map(e=>se`<span class="tick" style=${$a({left:`${(100*e.x).toFixed(2)}%`})}
                  >${it(e.time,r)}</span
                >`)}
            <span class="tick now">now</span>
          </span>`}
  </span>`}(t.history.outage(e),t.now,h,t.locale,a);return"compact"===a?se`${Ca(s,"","normal")} ${n}`:se`<span class="value-row">
      ${Ca(s,"","normal")}
      <span class="side-note warning">down</span>
    </span>
    ${n}
    ${Oa(void 0===r?void 0:`since ${it(r,t.locale)}`)}`}function qa(e,t,a){const r=Kt(e.readings),s=r?ft(e.readings[r]):void 0,n=qt(e.readings,e=>({power:`grid_l${e}_power`,voltage:`grid_l${e}_voltage`}));const i=function(e){return c.map(t=>e[`grid_l${t}_voltage`]).filter(e=>void 0!==e)}(e.readings),o=function(e){if(void 0!==e)return Math.abs(e)<p?"idle":e>0?"import":"export"}(s),l=n.length>0?function(e,t,a){const r=za(e),s="compact"===a;return se`<span class="visual phases">
    ${e.map(e=>{const a=ft(e.power);return void 0===a?Ha(e,s):se`<span class="phase" title=${ja(e,t)}>
        <span class="bidi">
          <span class="half up"
            ><span
              class="bar"
              style=${$a({height:a>0?Ta(a,r):"0%"})}
            ></span
          ></span>
          <span class="axis"></span>
          <span class="half down"
            ><span
              class="bar"
              style=${$a({height:a<0?Ta(a,r):"0%"})}
            ></span
          ></span>
        </span>
        ${Ua(e,t,s)}
      </span>`})}
  </span>`}(n,t.locale,a):se`<span class="visual"></span>`;return"compact"===a?se`${Ca(Da(s,t.locale),"kW",void 0===s?"disabled":"normal")}
    ${l}`:void 0===s?se`${Ca(Da(void 0,t.locale),"kW","disabled")} ${l}
    ${Ia()}`:se`<span class="value-row">
      ${Ca(Da(s,t.locale),"kW")}
      ${o?se`<span class="side-note accent">${o}</span>`:oe}
    </span>
    ${l}
    ${i.length>0?function(e,t){const a=e.some(e=>Zt(e)),r=e.map((e,a)=>{const r=a>0?" · ":"",s=st(e,0,t);return Zt(e)?se`${r}<span class="warning">${s}</span>`:se`${r}${s}`});return Oa(se`${a?ma("warning",12,"warning"):oe}<span>${r} V</span>`)}(i.map(e=>ft(e)),t.locale):Oa(void 0)}`}const Za={id:"grid",label:"Grid",icon:e=>e.status.isOffGrid?"gridOff":"grid",isVisible:e=>void 0!==Kt(e.readings)||e.status.isOffGrid,primaryEntityId(e){if(e.status.isOffGrid)return e.master.readings.grid_connected?.entityId;const t=Kt(e.readings);return t?e.readings[t]?.entityId:void 0},render:(e,t,a)=>e.status.isOffGrid?Ka(e,t,a):qa(e,t,a)};const Ja={id:"load",label:"Load",icon:()=>"home",isVisible:e=>void 0!==e.readings.load_power,primaryEntityId:e=>e.readings.load_power?.entityId,render(e,t,a){const r=ft(e.readings.load_power),s=qt(e.readings,e=>({power:`load_l${e}_power`,voltage:`load_l${e}_voltage`}));const n=s.length>0?function(e,t,a){const r=za(e),s="compact"===a;return se`<span class="visual phases">
    ${e.map(e=>{const a=ft(e.power);return void 0===a?Ha(e,s):se`<span class="phase" title=${ja(e,t)}>
        <span class="track"
          ><span
            class="bar"
            style=${$a({height:Ta(Math.max(0,a),r)})}
          ></span
        ></span>
        ${Ua(e,t,s)}
      </span>`})}
  </span>`}(s,t.locale,a):se`<span class="visual"></span>`,i=Ca(Da(r,t.locale),"kW",void 0===r?"disabled":"normal");return"compact"===a?se`${i} ${n}`:se`${i} ${n}
    ${void 0===r?Ia():function(e,t){const a=e.readings.day_load_energy;return Oa(a?`${bt("day_load_energy",a,t.locale)} ${a.unit} today`:void 0)}(e,t)}`}};const Xa=[{id:"pv",label:"Solar",icon:()=>"sun",isVisible:e=>void 0!==Ft(e.readings),primaryEntityId:e=>Ft(e.readings)?.entityId,render(e,t,a){const r=ft(Ft(e.readings)),s=t.history.sparkline(e),n="totals"===e.kind?ft(Ft(e.master.readings)):void 0;if(void 0===r)return se`${Ca(Da(void 0,t.locale),"kW","disabled")}
        <span class="visual"></span>
        ${"detailed"===a?Ia():oe}`;const i=r<p?"muted":"normal";return se`${Ca(Da(r,t.locale),"kW",i)}
    ${function(e,t,a,r,s){if("loading"===e.status)return La(s);const{height:n,base:i}=function(e){const t="compact"===e?22:52;return{height:t,base:t-2}}(s),o=oa(r),l=Sa(Math.max(t??0,...e.back.filter(e=>void 0!==e)),4).max,c=Na(e.back,t,o,r,l,i),d=e.front?Na(e.front,a,o,r,l,i):[],p=100*la(o,r),h=c.at(-1)?.[1]??i,u=(t??0)>0;return se`<span class="visual sparkline">
    <svg
      width="100%"
      height=${n}
      viewBox="0 0 100 ${n}"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      ${ne`<line class="baseline" x1="0" y1=${i+.5} x2="100" y2=${i+.5}></line>
      <path class=${e.front?"area back stacked":"area back"} d=${Aa(c,i,2)}></path>
      <path class="area front" d=${Aa(d,i,2)}></path>
      <path class="line" d=${Ma(c,2,i)}></path>`}
    </svg>
    <span
      class=${u?"dot live":"dot"}
      style=${$a({left:`${p.toFixed(2)}%`,top:`${(h/n*100).toFixed(2)}%`})}
    ></span>
  </span>`}(s,r,n,t.now,a)}
    ${"detailed"===a?function(e,t,a){if(a)return Oa("loading history…");const r=e.readings.day_pv_energy;return Oa(r?`${bt("day_pv_energy",r,t.locale)} ${r.unit} today`:void 0)}(e,t,"loading"===s.status):oe}`}},Ga,Za,Ja];function Qa(e,t){return"compact"!==t.config.display&&t.config.sections.has("temps")&&0!==e.footer.length?se`<div class="footer">${e.footer.map(e=>function(e,t){const a=se`${e.tone?se`<span class="foot-dot ${e.tone}"></span>`:ma("thermometer",14,"foot-icon")}
    <span class="foot-label">${e.label}</span>
    <span class="foot-value"
      >${bt(e.key,e.reading,t.locale)} ${e.reading.unit}</span
    >`;return"none"===t.config.tapActions.temps?se`<div class="foot-item">${a}</div>`:se`<button
    type="button"
    class="foot-item"
    @click=${()=>t.moreInfo(e.reading.entityId)}
  >
    ${a}
  </button>`}(e,t))}</div>`:oe}function Ya(e,t){const a=t.config.display,r=Xa.filter(a=>t.config.sections.has(a.id)&&a.isVisible(e));return se`<ha-card class="panel ${a}">
    ${function(e,t){const a=t.config.sections.has("status"),{chip:r,line:s}=e.status;return se`<header class="header">
    <div class="title-row">
      <h2 class="name">${e.name}</h2>
      ${a&&r?se`<span class="chip ${r.tone}">${r.label}</span>`:oe}
    </div>
    ${a&&s?se`<p class="line ${s.tone}">
            ${s.isFault?ma("warning",13):oe}<span>${s.text}</span>
          </p>`:oe}
  </header>`}(e,t)}
    ${r.length>0?se`<div class="tiles">
            ${r.map(r=>function(e,t,a,r){const s=a.config.tapActions[e.id],n=fa(e,t,s,r),i=e.render(t,a,r);return function(e,t,a){return"none"!==a&&("popup"===a||void 0!==e.primaryEntityId(t))}(e,t,s)?se`<button
    type="button"
    class="tile ${e.id}"
    aria-haspopup=${"popup"===s?"dialog":oe}
    @click=${()=>a.tap(t,e.id)}
  >
    ${n}${i}
  </button>`:se`<div class="tile ${e.id}">${n}${i}</div>`}(r,e,t,a))}
          </div>`:oe}
    ${Qa(e,t)}
  </ha-card>`}const er=x`
  :host {
    --deye-solar-color: var(--energy-solar-color, var(--amber-color));
    --deye-battery-color: var(--success-color);
    --deye-grid-color: var(--energy-grid-consumption-color, var(--info-color));
    --deye-load-color: var(--purple-color, var(--accent-color));
    --deye-discharge-color: var(--orange-color, var(--warning-color));
    --deye-ok-color: var(--success-color);
    --deye-warning-color: var(--warning-color);
    --deye-error-color: var(--error-color);
    --deye-info-color: var(--info-color);
    --deye-text: var(--primary-text-color);
    --deye-muted: var(--secondary-text-color);
    --deye-disabled: var(--disabled-text-color);
    --deye-surface: color-mix(in srgb, var(--primary-text-color) 4%, transparent);
    --deye-surface-hover: color-mix(in srgb, var(--primary-text-color) 8%, transparent);
    --deye-surface-solid: color-mix(
      in srgb,
      var(--primary-text-color) 4%,
      var(--ha-card-background, var(--card-background-color))
    );
    --deye-track: color-mix(in srgb, var(--primary-text-color) 6%, transparent);
    --deye-outline: color-mix(in srgb, var(--primary-text-color) 22%, transparent);
    --deye-axis: color-mix(in srgb, var(--primary-text-color) 18%, transparent);
    --deye-focus: var(--primary-color);
  }

  @keyframes deye-pulse {
    0%,
    100% {
      transform: scale(1);
      opacity: 1;
    }
    50% {
      transform: scale(1.4);
      opacity: 0.7;
    }
  }

  @keyframes deye-breath {
    0%,
    100% {
      opacity: 1;
    }
    50% {
      opacity: 0.4;
    }
  }

  @keyframes deye-skeleton {
    0%,
    100% {
      opacity: 0.45;
    }
    50% {
      opacity: 1;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    * {
      animation: none !important;
    }
  }

  .ok {
    --tone-color: var(--deye-ok-color);
  }

  .warning {
    --tone-color: var(--deye-warning-color);
  }

  .error {
    --tone-color: var(--deye-error-color);
  }

  .info {
    --tone-color: var(--deye-info-color);
  }

  .neutral {
    --tone-color: var(--deye-muted);
  }
`,tr=x`
  :host {
    display: block;
    box-sizing: border-box;
    width: 100%;
  }

  .panels {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(min(100%, 340px), 1fr));
    gap: 8px;
    align-items: start;
  }
`,ar=x`
  ha-card.panel {
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    min-width: 0;
    height: 100%;
    padding: 18px;
    container-type: inline-size;
  }

  ha-card.panel.compact {
    padding: 15px;
  }

  .header {
    display: flex;
    flex-direction: column;
    gap: 2px;
    min-width: 0;
  }

  .title-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    min-height: 24px;
  }

  .name {
    margin: 0;
    min-width: 0;
    overflow: hidden;
    color: var(--deye-text);
    font-size: 16px;
    font-weight: 500;
    line-height: 24px;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .chip {
    display: inline-flex;
    flex: none;
    align-items: center;
    gap: 6px;
    height: 22px;
    padding: 0 9px;
    border-radius: 11px;
    background: color-mix(in srgb, var(--tone-color) 14%, transparent);
    color: var(--tone-color);
    font-size: 12px;
    font-weight: 500;
    white-space: nowrap;
  }

  .chip::before {
    content: '';
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: currentColor;
  }

  .line {
    display: flex;
    align-items: center;
    gap: 6px;
    min-width: 0;
    height: 18px;
    margin: 0;
    color: var(--deye-muted);
    font-size: 12px;
    line-height: 18px;
  }

  .line.warning,
  .line.error {
    color: var(--tone-color);
  }

  .line .icon {
    flex: none;
  }

  .line span {
    min-width: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .tiles {
    display: grid;
    flex: 1;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 10px;
    margin-top: 14px;
  }

  .tile {
    all: unset;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 4px;
    min-width: 0;
    min-height: 176px;
    padding: 14px;
    overflow: hidden;
    border-radius: 12px;
    background: var(--deye-surface);
    color: var(--deye-text);
    font-family: inherit;
    transition: background-color 120ms ease;
  }

  .tile.pv {
    --tile-color: var(--deye-solar-color);
  }

  .tile.battery {
    --tile-color: var(--deye-battery-color);
  }

  .tile.grid {
    --tile-color: var(--deye-grid-color);
  }

  .tile.load {
    --tile-color: var(--deye-load-color);
  }

  button.tile,
  button.foot-item {
    cursor: pointer;
  }

  button.tile:hover,
  button.foot-item:hover {
    background: var(--deye-surface-hover);
  }

  button.tile:hover .tile-label,
  button.tile:hover .tile-action {
    color: var(--deye-text);
  }

  button.tile:focus-visible,
  button.foot-item:focus-visible {
    box-shadow:
      0 0 0 2px var(--ha-card-background, var(--card-background-color)),
      0 0 0 4px var(--deye-focus);
  }

  .tile-head {
    display: flex;
    align-items: center;
    gap: 8px;
    height: 20px;
  }

  .tile-icon {
    flex: none;
    color: var(--tile-color);
  }

  .tile-icon .icon-slash {
    color: var(--deye-warning-color);
  }

  .tile-label {
    flex: 1;
    min-width: 0;
    overflow: hidden;
    color: var(--deye-muted);
    font-size: 13px;
    font-weight: 500;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .tile-action {
    flex: none;
    color: var(--deye-muted);
  }

  .value-row {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    gap: 8px;
    min-width: 0;
    height: 34px;
  }

  .tile > .value {
    height: 34px;
  }

  .value {
    display: flex;
    align-items: baseline;
    gap: 4px;
    white-space: nowrap;
    font-variant-numeric: tabular-nums;
  }

  .value .number {
    color: var(--deye-text);
    font-size: 28px;
    line-height: 34px;
  }

  .value .unit {
    color: var(--deye-muted);
    font-size: 13px;
  }

  .value.percent {
    gap: 2px;
  }

  .value.percent .unit {
    font-size: 15px;
  }

  .value.muted .number {
    color: var(--deye-muted);
  }

  .value.disabled .number,
  .value.disabled .unit {
    color: var(--deye-disabled);
  }

  .value.warning .number {
    color: var(--deye-warning-color);
  }

  .value.error .number {
    color: var(--deye-error-color);
  }

  .side {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    min-width: 0;
    padding-bottom: 3px;
  }

  .side-value {
    color: var(--deye-text);
    font-size: 13px;
    line-height: 16px;
    white-space: nowrap;
    font-variant-numeric: tabular-nums;
  }

  .side-note {
    max-width: 100%;
    overflow: hidden;
    color: var(--tone-color, var(--deye-muted));
    font-size: 12px;
    line-height: 14px;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .value-row > .side-note {
    padding-bottom: 6px;
  }

  .side-note.accent {
    color: var(--tile-color);
  }

  .side-note.muted {
    color: var(--deye-muted);
  }

  .visual {
    position: relative;
    display: block;
    height: 52px;
  }

  .caption {
    display: flex;
    align-items: center;
    gap: 5px;
    height: 16px;
    overflow: hidden;
    color: var(--deye-muted);
    font-size: 12px;
    line-height: 16px;
    white-space: nowrap;
    font-variant-numeric: tabular-nums;
  }

  .caption > span {
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .caption .warning {
    color: var(--deye-warning-color);
  }

  .caption .icon.warning {
    flex: none;
    color: var(--deye-warning-color);
  }

  .sparkline svg {
    display: block;
    overflow: visible;
  }

  .sparkline .baseline {
    stroke: var(--deye-axis);
    stroke-width: 1;
    stroke-dasharray: 2 3;
    vector-effect: non-scaling-stroke;
  }

  .sparkline .area.back {
    fill: color-mix(in srgb, var(--deye-solar-color) 22%, transparent);
  }

  .sparkline .area.back.stacked {
    fill: color-mix(in srgb, var(--deye-solar-color) 16%, transparent);
  }

  .sparkline .area.front {
    fill: color-mix(in srgb, var(--deye-solar-color) 34%, transparent);
  }

  .sparkline .line {
    fill: none;
    stroke: var(--deye-solar-color);
    stroke-width: 1.75;
    stroke-linejoin: round;
    stroke-linecap: round;
    vector-effect: non-scaling-stroke;
  }

  .sparkline .dot {
    position: absolute;
    width: 8px;
    height: 8px;
    margin: -4px 0 0 -4px;
    border-radius: 50%;
    background: var(--deye-disabled);
    box-shadow: 0 0 0 3px var(--deye-surface-solid);
  }

  .sparkline .dot.live {
    background: var(--deye-solar-color);
    animation: deye-pulse 2.4s ease-in-out infinite;
  }

  .skeleton {
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    gap: 6px;
  }

  .bone {
    display: block;
    border-radius: 6px;
    background: var(--deye-surface-hover);
    animation: deye-skeleton 1.6s ease-in-out infinite;
  }

  .bone.short {
    width: 72%;
    height: 8px;
    border-radius: 4px;
  }

  .bone.tall {
    width: 100%;
    height: 22px;
  }

  .bone.wide {
    width: 100%;
    height: 10px;
  }

  .battery-visual {
    display: flex;
    align-items: center;
    height: 52px;
  }

  .battery-visual.level-normal {
    --level-color: var(--deye-ok-color);
  }

  .battery-visual.level-low {
    --level-color: var(--deye-warning-color);
  }

  .battery-visual.level-critical {
    --level-color: var(--deye-error-color);
  }

  .cells {
    box-sizing: border-box;
    display: grid;
    flex: 1;
    grid-template-columns: repeat(10, minmax(0, 1fr));
    gap: 3px;
    height: 30px;
    padding: 3px;
    border: 1.5px solid var(--deye-outline);
    border-radius: 7px;
  }

  .nub {
    flex: none;
    width: 3px;
    height: 10px;
    margin-left: 2px;
    border-radius: 0 2px 2px 0;
    background: var(--deye-outline);
  }

  .battery-visual.level-low .cells,
  .battery-visual.level-critical .cells {
    border-color: color-mix(in srgb, var(--level-color) 45%, transparent);
  }

  .battery-visual.level-low .nub,
  .battery-visual.level-critical .nub {
    background: color-mix(in srgb, var(--level-color) 45%, transparent);
  }

  .cell {
    display: block;
    overflow: hidden;
    border-radius: 2px;
    background: var(--deye-track);
  }

  .cell .fill {
    display: block;
    height: 100%;
    background: var(--level-color);
  }

  .cell .fill.breathing {
    animation: deye-breath 2.4s ease-in-out infinite;
  }

  .phases {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 6px;
  }

  .phase {
    display: flex;
    flex-direction: column;
    align-items: center;
    min-width: 0;
  }

  .bidi {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    height: 36px;
  }

  .half {
    display: flex;
    flex: 1;
    justify-content: center;
    width: 100%;
  }

  .half.up {
    align-items: flex-end;
  }

  .half.down {
    align-items: flex-start;
  }

  .axis {
    display: block;
    width: 100%;
    height: 1px;
    background: var(--deye-axis);
  }

  .half .bar {
    display: block;
    width: 16px;
    background: var(--tile-color);
  }

  .half.up .bar {
    border-radius: 3px 3px 0 0;
  }

  .half.down .bar {
    border-radius: 0 0 3px 3px;
  }

  .track {
    box-sizing: border-box;
    display: flex;
    align-items: flex-end;
    width: 16px;
    height: 36px;
    overflow: hidden;
    border-radius: 3px;
    background: var(--deye-track);
  }

  .track .bar {
    display: block;
    width: 100%;
    border-radius: 3px;
    background: var(--tile-color);
  }

  .track.placeholder {
    border: 1px dashed var(--deye-outline);
    background: transparent;
  }

  .phase-label {
    max-width: 100%;
    margin-top: 2px;
    overflow: hidden;
    color: var(--deye-text);
    font-size: 11px;
    line-height: 14px;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-variant-numeric: tabular-nums;
  }

  .phase-label.muted,
  .phase-name {
    color: var(--deye-muted);
  }

  .phase-name.warning {
    color: var(--deye-warning-color);
  }

  .outage {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .strip {
    display: grid;
    height: 14px;
    overflow: hidden;
    border-radius: 4px;
  }

  .slot {
    display: block;
    background: color-mix(in srgb, var(--deye-grid-color) 45%, transparent);
  }

  .slot.down {
    background: var(--deye-warning-color);
  }

  .strip-axis {
    position: relative;
    display: block;
    height: 14px;
    margin-top: 4px;
    color: var(--deye-muted);
    font-size: 11px;
    line-height: 14px;
    font-variant-numeric: tabular-nums;
  }

  .tick {
    position: absolute;
    transform: translateX(-50%);
    white-space: nowrap;
  }

  .tick.now {
    right: 0;
    transform: none;
  }

  .footer {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
    gap: 10px;
    margin-top: 12px;
  }

  .foot-item {
    all: unset;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    gap: 8px;
    min-width: 0;
    height: 36px;
    padding: 0 12px;
    border-radius: 10px;
    background: var(--deye-surface);
    font-family: inherit;
  }

  .foot-icon {
    flex: none;
    color: var(--deye-muted);
  }

  .foot-dot {
    flex: none;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: var(--tone-color);
  }

  .foot-label {
    flex: 1;
    min-width: 0;
    overflow: hidden;
    color: var(--deye-muted);
    font-size: 12px;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .foot-value {
    flex: none;
    color: var(--deye-text);
    font-size: 13px;
    white-space: nowrap;
    font-variant-numeric: tabular-nums;
  }

  .compact .tiles {
    grid-template-columns: repeat(4, minmax(0, 1fr));
    gap: 6px;
    margin-top: 12px;
  }

  .compact .tile {
    gap: 2px;
    min-height: 98px;
    padding: 10px;
    border-radius: 10px;
  }

  .compact .tile-head {
    height: 16px;
  }

  .compact .tile-label {
    font-size: 12px;
    line-height: 16px;
  }

  .compact .tile > .value {
    height: 24px;
    overflow: hidden;
  }

  .compact .value {
    gap: 3px;
  }

  .compact .value .number {
    font-size: 18px;
    line-height: 24px;
  }

  .compact .value .unit {
    font-size: 11px;
  }

  .compact .visual,
  .compact .battery-visual {
    height: 22px;
  }

  .compact .cells {
    gap: 2px;
    height: 10px;
    padding: 0;
    border: none;
    border-radius: 0;
  }

  .compact .nub {
    display: none;
  }

  .compact .phases {
    gap: 4px;
  }

  .compact .bidi,
  .compact .track {
    height: 22px;
  }

  .compact .half .bar,
  .compact .track {
    width: 8px;
  }

  .compact .half.up .bar {
    border-radius: 2px 2px 0 0;
  }

  .compact .half.down .bar {
    border-radius: 0 0 2px 2px;
  }

  .compact .track .bar {
    border-radius: 2px;
  }

  .compact .sparkline .dot {
    width: 6px;
    height: 6px;
    margin: -3px 0 0 -3px;
    box-shadow: 0 0 0 2px var(--deye-surface-solid);
  }

  .compact .strip {
    height: 10px;
  }

  @container (max-width: 340px) {
    .tiles {
      gap: 8px;
    }

    .tile {
      padding: 12px;
    }

    .value .number {
      font-size: 24px;
    }

    .phase-name,
    .foot-icon {
      display: none;
    }
  }

  @container (max-width: 300px) {
    .compact .tiles {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }
  }
`;let rr=(()=>{let a,r,s,n=_e,i=[],o=[],l=[],c=[],d=[],p=[];return class extends n{static{const e="function"==typeof Symbol&&Symbol.metadata?Object.create(n[Symbol.metadata]??null):void 0;a=[Se({attribute:!1})],r=[Ee()],s=[Ee()],u(this,null,a,{kind:"accessor",name:"hass",static:!1,private:!1,access:{has:e=>"hass"in e,get:e=>e.hass,set:(e,t)=>{e.hass=t}},metadata:e},i,o),u(this,null,r,{kind:"accessor",name:"config",static:!1,private:!1,access:{has:e=>"config"in e,get:e=>e.config,set:(e,t)=>{e.config=t}},metadata:e},l,c),u(this,null,s,{kind:"accessor",name:"popup",static:!1,private:!1,access:{has:e=>"popup"in e,get:e=>e.popup,set:(e,t)=>{e.popup=t}},metadata:e},d,p),e&&Object.defineProperty(this,Symbol.metadata,{enumerable:!0,configurable:!0,writable:!0,value:e})}static styles=[er,tr,ar];#e=g(this,i,void 0);get hass(){return this.#e}set hass(e){this.#e=e}#t=(g(this,o),g(this,l,void 0));get config(){return this.#t}set config(e){this.#t=e}#a=(g(this,c),g(this,d,void 0));get popup(){return this.#a}set popup(e){this.#a=e}history=(g(this,p),new ua(this));panels=[];trackedEntityIds=[];stateCount=0;locale=rt(void 0);static getConfigElement(){return document.createElement(t)}static getStubConfig(t){const a=Wt(t.states),r=(a.length>0?a:["ss"]).map(e=>({prefix:e,name:De(e)}));return{type:`custom:${e}`,inverters:r}}setConfig(e){this.config=We(e)}getCardSize(){if(!this.config)return 10;return(this.config.inverters.length+(this.hasTotals(this.config)?1:0))*("compact"===this.config.display?4:10)}getGridOptions(){return{columns:(this.config?.inverters.length??0)>1?"full":12,rows:"auto",min_columns:6}}shouldUpdate(e){if(1!==e.size||!e.has("hass"))return!0;const t=e.get("hass");return!t||!this.hass||(Object.keys(this.hass.states).length!==this.stateCount||this.trackedEntityIds.some(e=>t.states[e]!==this.hass?.states[e]))}willUpdate(){this.hass&&this.config&&(this.locale=rt(this.hass.locale,this.hass.language),this.panels=Nt(this.hass.states,this.config,this.locale),this.trackedEntityIds=function(e){const t=new Set;for(const a of e)for(const e of a.members)for(const a of Object.values(e.readings))t.add(a.entityId);return[...t]}(this.panels),this.stateCount=Object.keys(this.hass.states).length)}updated(){this.hass&&this.config&&this.history.sync(this.hass,this.panels,this.config,Date.now())}render(){if(!this.hass||!this.config)return oe;const e=this.createContext(this.config),t=this.popup?this.panels.find(e=>e.id===this.popup?.panelId):void 0;return se`<div class="panels">${this.panels.map(t=>Ya(t,e))}</div>
      <deye-inverter-popup
        .hass=${this.hass}
        .panel=${t}
        .tile=${this.popup?.tile}
        .config=${this.config}
        @popup-closed=${this.closePopup}
      ></deye-inverter-popup>`}createContext(e){return{config:e,locale:this.locale,now:Date.now(),history:this.history,tap:(e,t)=>this.handleTap(e,t),moreInfo:e=>this.openMoreInfo(e)}}hasTotals(e){return e.showTotals&&e.inverters.length>1}handleTap(e,t){const a=this.config?.tapActions[t];if("popup"===a&&Ne(t))return void(this.popup={panelId:e.id,tile:t});if("more-info"!==a)return;const r=Xa.find(e=>e.id===t)?.primaryEntityId(e);r&&this.openMoreInfo(r)}closePopup=()=>{this.popup=void 0};openMoreInfo(e){this.dispatchEvent(new CustomEvent("hass-more-info",{detail:{entityId:e},bubbles:!0,composed:!0}))}}})();const sr={status:"Status",pv:"Solar",battery:"Battery",grid:"Grid",load:"Load",temps:"Temperatures"},nr={popup:"Card popup","more-info":"More info (history)",none:"None"},ir={title:"Title",display:"Display",show_totals:"Combined card",parallel:"Parallel system",master:"Master inverter",sections:"Tiles",prefix:"Prefix",name:"Name",battery_power:"Invert battery power (positive = charging)",grid_power:"Invert grid power (positive = export)"},or={show_totals:"Adds a combined card when the card has two or more inverters",parallel:"Shared battery: SOC, voltage and temperature come from the master. Power, current and daily energy are summed."},lr=[{name:"title",selector:{text:{}}},{name:"display",selector:{select:{mode:"list",options:[{value:"detailed",label:"Detailed"},{value:"compact",label:"Compact"}]}}}];function cr(e){return i.filter(t=>"popup"!==t||Ne(e)).map(e=>({value:e,label:nr[e]}))}const dr=s.map(e=>({name:e,selector:{select:{mode:"dropdown",options:cr(e)}}})),pr=[{name:"sections",selector:{select:{multiple:!0,mode:"list",options:r.map(e=>({value:e,label:sr[e]}))}}}],hr=[{type:"expandable",name:"invert",title:"Sign conventions",schema:[{name:"battery_power",selector:{boolean:{}}},{name:"grid_power",selector:{boolean:{}}}]}];const ur=r.map(e=>({type:"expandable",name:e,title:sr[e],schema:Te(e).map(e=>({name:e,selector:{entity:{domain:[...je(e).domains]}}}))}));function gr(e,t){return Object.fromEntries(Object.entries(e).filter(([e])=>e!==t))}function mr(e){return Object.keys(e).length>0?e:void 0}function fr(e){return r.includes(e)}let yr=(()=>{let e,t,a,s=_e,n=[],i=[],o=[],l=[],c=[],d=[];return class extends s{static{const r="function"==typeof Symbol&&Symbol.metadata?Object.create(s[Symbol.metadata]??null):void 0;e=[Se({attribute:!1})],t=[Ee()],a=[Ee()],u(this,null,e,{kind:"accessor",name:"hass",static:!1,private:!1,access:{has:e=>"hass"in e,get:e=>e.hass,set:(e,t)=>{e.hass=t}},metadata:r},n,i),u(this,null,t,{kind:"accessor",name:"config",static:!1,private:!1,access:{has:e=>"config"in e,get:e=>e.config,set:(e,t)=>{e.config=t}},metadata:r},o,l),u(this,null,a,{kind:"accessor",name:"editingIndex",static:!1,private:!1,access:{has:e=>"editingIndex"in e,get:e=>e.editingIndex,set:(e,t)=>{e.editingIndex=t}},metadata:r},c,d),r&&Object.defineProperty(this,Symbol.metadata,{enumerable:!0,configurable:!0,writable:!0,value:r})}static styles=[er,x`
      :host {
        display: block;
      }

      .editor {
        display: flex;
        flex-direction: column;
        gap: 22px;
      }

      .block {
        display: flex;
        flex-direction: column;
        gap: 8px;
      }

      .block.boxed {
        gap: 12px;
        padding: 16px;
        border: 1px solid var(--divider-color);
        border-radius: 12px;
      }

      .block-head {
        display: flex;
        align-items: baseline;
        justify-content: space-between;
        gap: 12px;
      }

      h3 {
        margin: 0;
        color: var(--primary-text-color);
        font-size: 14px;
        font-weight: 500;
      }

      .hint {
        color: var(--secondary-text-color);
        font-size: 12px;
        line-height: 16px;
      }

      .inverter {
        display: grid;
        grid-template-columns: minmax(0, 1fr) auto 44px 44px;
        align-items: center;
        gap: 2px;
        min-height: 56px;
        padding: 0 4px 0 14px;
        border-radius: 10px;
        background: var(--deye-surface);
      }

      .inverter-name {
        display: flex;
        flex-direction: column;
        min-width: 0;
      }

      .inverter-name span {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }

      .inverter-name .prefix {
        color: var(--secondary-text-color);
        font-family: var(--ha-font-family-code, monospace);
        font-size: 12px;
      }

      .overrides {
        padding-right: 8px;
        color: var(--secondary-text-color);
        font-size: 12px;
        white-space: nowrap;
      }

      .icon-button {
        all: unset;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 44px;
        height: 44px;
        border-radius: 50%;
        color: var(--secondary-text-color);
        cursor: pointer;
      }

      .icon-button:hover {
        background: var(--deye-surface-hover);
        color: var(--primary-text-color);
      }

      .icon-button:focus-visible,
      .add:focus-visible {
        box-shadow: 0 0 0 2px var(--primary-color);
      }

      .add {
        all: unset;
        display: inline-flex;
        align-self: flex-start;
        align-items: center;
        gap: 8px;
        height: 40px;
        padding: 0 16px 0 12px;
        border: 1px solid var(--divider-color);
        border-radius: 20px;
        color: var(--primary-color);
        font-size: 14px;
        font-weight: 500;
        cursor: pointer;
      }

      .back {
        display: flex;
        align-items: center;
        gap: 4px;
      }
    `];#e=g(this,n,void 0);get hass(){return this.#e}set hass(e){this.#e=e}#t=(g(this,i),g(this,o,void 0));get config(){return this.#t}set config(e){this.#t=e}#r=(g(this,l),g(this,c,void 0));get editingIndex(){return this.#r}set editingIndex(e){this.#r=e}connectedCallback(){super.connectedCallback(),async function(){if(customElements.get("ha-form")&&customElements.get("ha-selector"))return;const e=await(window.loadCardHelpers?.());if(!e)return;const t=(await e.createCardElement({type:"entities",entities:[]})).constructor;await(t.getConfigElement?.())}().then(()=>this.requestUpdate())}setConfig(e){this.config=e}render(){if(!this.hass||!this.config)return oe;const e=void 0===this.editingIndex?void 0:this.config.inverters[this.editingIndex];return e&&void 0!==this.editingIndex?this.renderInverterEditor(this.hass,e,this.editingIndex):this.renderMain(this.hass,this.config)}renderMain(e,t){const a=t.inverters??[],s=Wt(e.states);return se`<div class="editor">
      ${this.renderForm(e,lr,{title:t.title,display:t.display??"detailed"},e=>this.patch({title:e.title||void 0,display:e.display}))}
      <section class="block">
        <div class="block-head">
          <h3>Inverters</h3>
          <span class="hint">${ct(s.length,"prefix","prefixes")} detected</span>
        </div>
        ${a.map((e,a)=>this.renderInverterRow(e,a,t))}
        <button type="button" class="add" @click=${()=>this.addInverter(s)}>
          ${ma("plus",18)}Add inverter
        </button>
      </section>
      ${a.length>1?this.renderCombined(e,t,a):oe}
      <section class="block">
        <h3>Tap actions</h3>
        <span class="hint"
          >What opens when a tile is tapped. Values inside a card popup always open their sensor
          history.</span
        >
        ${this.renderForm(e,dr,{...He,...t.tap_actions},e=>this.patch({tap_actions:e}))}
      </section>
      ${this.renderForm(e,pr,{sections:t.sections??[...r]},e=>this.patch({sections:e.sections}))}
      ${this.renderForm(e,hr,{invert:t.invert??{}},e=>this.patch({invert:e.invert}))}
    </div>`}renderCombined(e,t,a){const r={show_totals:!1!==t.show_totals,parallel:!1!==t.parallel,master:t.master??a[0]?.prefix};return se`<section class="block boxed">
      <h3>Combined card</h3>
      ${this.renderForm(e,function(e){return[{name:"show_totals",selector:{boolean:{}}},{name:"parallel",selector:{boolean:{}}},{name:"master",selector:{select:{mode:"dropdown",options:e.map(e=>({value:e.prefix,label:`${e.name||e.prefix} · ${e.prefix}`}))}}}]}(a),r,e=>this.patch({show_totals:e.show_totals,parallel:e.parallel,master:e.master}))}
    </section>`}renderInverterRow(e,t,a){const r=Object.keys(a.entities?.[e.prefix]??{}).length,s=e.name||e.prefix;return se`<div class="inverter">
      <span class="inverter-name">
        <span>${s}</span>
        <span class="prefix">${e.prefix}</span>
      </span>
      <span class="overrides"
        >${r>0?ct(r,"override"):"auto"}</span
      >
      <button
        type="button"
        class="icon-button"
        aria-label="Edit ${s}"
        @click=${()=>{this.editingIndex=t}}
      >
        ${ma("pencil",18)}
      </button>
      <button
        type="button"
        class="icon-button"
        aria-label="Remove ${s}"
        @click=${()=>this.removeInverter(t)}
      >
        ${ma("trash",18)}
      </button>
    </div>`}renderInverterEditor(e,t,a){const s=Wt(e.states),n=this.config?.entities?.[t.prefix]??{};return se`<div class="editor">
      <div class="back">
        <button
          type="button"
          class="icon-button"
          aria-label="Back"
          @click=${()=>{this.editingIndex=void 0}}
        >
          ${ma("back",20)}
        </button>
        <h3>${t.name||t.prefix||"Inverter"}</h3>
      </div>
      ${this.renderForm(e,(i=s,[{name:"prefix",required:!0,selector:i.length>0?{select:{mode:"dropdown",custom_value:!0,options:i}}:{text:{}}},{name:"name",selector:{text:{}}}]),{prefix:t.prefix,name:t.name},e=>this.updateInverter(a,String(e.prefix??"").trim(),e.name||void 0))}
      <section class="block">
        <h3>Entity overrides</h3>
        <span class="hint"
          >Leave empty to use sensor.${t.prefix||"<prefix>"}_&lt;key&gt; from the
          add-on.</span
        >
        <ha-form
          .hass=${e}
          .data=${function(e){return Object.fromEntries(r.map(t=>[t,Object.fromEntries(Te(t).filter(t=>e[t]).map(t=>[t,e[t]]))]))}(n)}
          .schema=${ur}
          .computeLabel=${this.computeOverrideLabel}
          .computeHelper=${a=>this.computeOverrideHelper(e,t.prefix,a)}
          @value-changed=${e=>this.updateOverrides(t.prefix,e.detail.value)}
        ></ha-form>
      </section>
    </div>`;var i}renderForm(e,t,a,r){return se`<ha-form
      .hass=${e}
      .data=${a}
      .schema=${t}
      .computeLabel=${this.computeLabel}
      .computeHelper=${this.computeHelper}
      @value-changed=${e=>r(e.detail.value)}
    ></ha-form>`}computeLabel=(g(this,d),e=>{const t=ir[e.name];return t||(fr(e.name)?sr[e.name]:e.name)});computeHelper=e=>or[e.name];computeOverrideLabel=e=>ze(e.name)?je(e.name).label:fr(e.name)?sr[e.name]:e.name;computeOverrideHelper(e,t,a){if(!ze(a.name))return;const r=Ve(e.states,t,a.name);return r?`Auto: ${r}`:"Not found automatically"}patch(e){var t;this.config&&this.emit((t={...this.config,...e},Object.fromEntries(Object.entries(t).filter(([,e])=>void 0!==e))))}addInverter(e){const t=this.config?.inverters??[],a=new Set(t.map(e=>e.prefix)),r=[...e,"ss"].find(e=>!a.has(e))??`inverter_${t.length+1}`;this.patch({inverters:[...t,{prefix:r,name:De(r)}]}),this.editingIndex=t.length}removeInverter(e){const t=this.config?.inverters??[],a=t[e],r=gr(this.config?.entities??{},a?.prefix);this.patch({inverters:t.filter((t,a)=>a!==e),entities:mr(r),master:this.config?.master===a?.prefix?void 0:this.config?.master})}updateInverter(e,t,a){const r=[...this.config?.inverters??[]],s=r[e];if(!s)return;const n=this.config?.entities??{},i=n[s.prefix],o=s.prefix!==t&&i?{...gr(n,s.prefix),[t]:i}:n;r[e]=a?{prefix:t,name:a}:{prefix:t},this.patch({inverters:r,entities:mr(o),master:this.config?.master===s.prefix?t:this.config?.master})}updateOverrides(e,t){const a=function(e){const t={};for(const a of Object.values(e))if(a&&"object"==typeof a)for(const[e,r]of Object.entries(a))ze(e)&&"string"==typeof r&&r&&(t[e]=r);return t}(t),r=gr(this.config?.entities??{},e),s=Object.keys(a).length>0?{...r,[e]:a}:r;this.patch({entities:mr(s)})}emit(e){this.config=e,this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:e},bubbles:!0,composed:!0}))}}})();function vr(e,t){e&&t&&e.dispatchEvent(new CustomEvent("hass-more-info",{detail:{entityId:t},bubbles:!0,composed:!0}))}function br(e,t,a){return se`<div class="range" role="group" aria-label="Range">
    ${e.map(e=>se`<button
          type="button"
          aria-pressed=${e.id===t?"true":"false"}
          @click=${()=>a(e.id)}
        >
          ${e.label}
        </button>`)}
  </div>`}function xr(e){return se`<div class=${e?"chart-status loading":"chart-status"}>
    ${e?"loading history…":"no history"}
  </div>`}function $r(e,t,a){const r=t>=24?ot:it;return ca(e,t).map(t=>({x:la(e,t),label:r(t,a)}))}function wr(e,t){return se`<div class="chart-axis">
    ${e.filter(e=>!t||e.x<.9).map(e=>se`<span style=${$a({left:`${(100*e.x).toFixed(2)}%`})}
            >${e.label}</span
          >`)}
    ${t?se`<span class="now">now</span>`:oe}
  </div>`}function _r(e,t,a,r,s){if(!a)return oe;const n=bt(t,a,s);return se`<button
    type="button"
    class="stat"
    @click=${e=>vr(e.currentTarget,a.entityId)}
  >
    <span class="stat-head"><span>${e}</span>${ma("chart",12)}</span>
    <span class="stat-value"
      >${n}${n===Qe?oe:se` <small>${a.unit}</small>`}</span
    >
    <span class="stat-source">${r}</span>
  </button>`}function kr(e,t){if("inverter"===e.kind)return e.name;const a=e.members.length,r=je(t).aggregate;return"sum"===r?`Sum of ${a}`:"master"===r||e.isParallel?e.master.name:"shared"===r?`Average of ${a}`:`Sum of ${a}`}function Mr(e){return[e.master,...e.members.filter(t=>t!==e.master)]}const Ar=x`
  :host {
    display: block;
  }

  dialog {
    box-sizing: border-box;
    width: min(560px, calc(100vw - 32px));
    max-height: calc(100vh - 32px);
    padding: 0;
    overflow: auto;
    border: none;
    border-radius: var(--ha-dialog-border-radius, 24px);
    background: var(--ha-card-background, var(--card-background-color));
    color: var(--deye-text);
    font-family: var(--ha-font-family-body, inherit);
    box-shadow: var(--ha-card-box-shadow, none);
  }

  dialog::backdrop {
    background: var(--mdc-dialog-scrim-color, rgba(0, 0, 0, 0.32));
  }

  .top-bar {
    display: flex;
    align-items: center;
    gap: 4px;
    height: 64px;
    padding: 0 8px;
  }

  .icon-button {
    all: unset;
    display: flex;
    flex: none;
    align-items: center;
    justify-content: center;
    width: 44px;
    height: 44px;
    border-radius: 50%;
    color: var(--deye-text);
    cursor: pointer;
  }

  .icon-button:hover {
    background: var(--deye-surface-hover);
  }

  .icon-button:focus-visible {
    box-shadow: 0 0 0 2px var(--deye-focus);
  }

  .heading {
    display: flex;
    flex: 1;
    flex-direction: column;
    min-width: 0;
    padding-left: 4px;
  }

  .heading h2 {
    margin: 0;
    color: var(--deye-text);
    font-size: 20px;
    font-weight: 500;
    line-height: 26px;
  }

  .heading span {
    overflow: hidden;
    color: var(--deye-muted);
    font-size: 12px;
    line-height: 16px;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .hero {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    gap: 16px;
    padding: 8px 24px 0;
  }

  .hero-value {
    display: flex;
    align-items: baseline;
    gap: 4px;
    white-space: nowrap;
    font-variant-numeric: tabular-nums;
  }

  .hero-value.percent {
    gap: 2px;
  }

  .hero-value .number {
    color: var(--deye-text);
    font-size: 56px;
    line-height: 64px;
  }

  .hero-value .unit {
    color: var(--deye-muted);
    font-size: 22px;
  }

  .hero-side {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    min-width: 0;
    padding-bottom: 8px;
  }

  .hero-status {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    color: var(--tone-color, var(--deye-muted));
    font-size: 14px;
    font-weight: 500;
  }

  .hero-status .icon-fill {
    fill: currentColor;
    stroke: none;
  }

  .hero-main {
    color: var(--deye-text);
    font-size: 22px;
    line-height: 28px;
    white-space: nowrap;
    font-variant-numeric: tabular-nums;
  }

  .hero-main small {
    color: var(--deye-muted);
    font-size: 14px;
  }

  .hero-note {
    color: var(--deye-muted);
    font-size: 12px;
    line-height: 16px;
    white-space: nowrap;
    font-variant-numeric: tabular-nums;
  }

  .section {
    padding: 24px 24px 0;
  }

  .section:last-child {
    padding-bottom: 24px;
  }

  .section-head {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 8px 16px;
    min-height: 32px;
  }

  .section-head h3,
  .section > h3 {
    margin: 0;
    color: var(--deye-text);
    font-size: 14px;
    font-weight: 500;
    line-height: 20px;
  }

  .section > h3 {
    margin-bottom: 8px;
  }

  .legend {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    color: var(--deye-muted);
    font-size: 12px;
  }

  .swatch {
    width: 10px;
    height: 10px;
    border-radius: 3px;
  }

  .swatch.stroke {
    width: 12px;
    height: 2px;
    border-radius: 1px;
  }

  .range {
    display: inline-grid;
    grid-auto-flow: column;
    height: 30px;
    margin-left: auto;
    overflow: hidden;
    border: 1px solid var(--deye-outline);
    border-radius: 15px;
  }

  .range button {
    all: unset;
    padding: 0 14px;
    color: var(--deye-muted);
    font-size: 12px;
    font-weight: 500;
    cursor: pointer;
  }

  .range button[aria-pressed='true'] {
    background: var(--deye-surface-hover);
    color: var(--deye-text);
  }

  .range button:focus-visible {
    box-shadow: inset 0 0 0 2px var(--deye-focus);
  }

  .chart {
    display: block;
    width: 100%;
    height: auto;
    margin-top: 12px;
    overflow: visible;
  }

  .chart .grid-line {
    stroke: color-mix(in srgb, var(--primary-text-color) 10%, transparent);
    stroke-dasharray: 3 4;
  }

  .chart .base-line {
    stroke: color-mix(in srgb, var(--primary-text-color) 16%, transparent);
  }

  .chart .tick-line {
    stroke: color-mix(in srgb, var(--primary-text-color) 6%, transparent);
  }

  .chart text {
    fill: var(--deye-muted);
    font-family: inherit;
    font-size: 10px;
  }

  .chart-axis {
    position: relative;
    height: 14px;
    margin-top: 6px;
    color: var(--deye-muted);
    font-size: 11px;
    line-height: 14px;
    font-variant-numeric: tabular-nums;
  }

  .chart-axis span {
    position: absolute;
    transform: translateX(-50%);
    white-space: nowrap;
  }

  .chart-axis .now {
    right: 0;
    transform: none;
  }

  .chart-status {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 120px;
    margin-top: 12px;
    border-radius: 12px;
    background: var(--deye-surface);
    color: var(--deye-muted);
    font-size: 12px;
  }

  .chart-status.loading {
    animation: deye-skeleton 1.6s ease-in-out infinite;
  }

  .stats {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
    gap: 10px;
  }

  .stats + .stats {
    padding-top: 10px;
  }

  .stat {
    all: unset;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    min-width: 0;
    height: 72px;
    padding: 10px 12px;
    border-radius: 12px;
    background: var(--deye-surface);
    cursor: pointer;
  }

  .stat-head {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 6px;
    height: 16px;
    color: var(--deye-muted);
    font-size: 12px;
  }

  .stat-head span {
    min-width: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .stat-value {
    color: var(--deye-text);
    font-size: 18px;
    line-height: 22px;
    white-space: nowrap;
    font-variant-numeric: tabular-nums;
  }

  .stat-value small {
    color: var(--deye-muted);
    font-size: 12px;
  }

  .stat-source {
    color: var(--deye-muted);
    font-size: 11px;
    line-height: 14px;
    white-space: nowrap;
  }

  .rows {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  .row {
    all: unset;
    box-sizing: border-box;
    display: grid;
    align-items: center;
    gap: 12px;
    min-height: 44px;
    padding: 0 12px;
    border-radius: 10px;
    background: color-mix(in srgb, var(--primary-text-color) 3%, transparent);
    font-size: 14px;
    font-variant-numeric: tabular-nums;
    cursor: pointer;
  }

  .row-head {
    display: grid;
    align-items: center;
    gap: 12px;
    height: 24px;
    padding: 0 12px;
    color: var(--deye-muted);
    font-size: 12px;
  }

  .stat:hover,
  .row:hover {
    background: var(--deye-surface-hover);
  }

  .stat:focus-visible,
  .row:focus-visible {
    box-shadow: 0 0 0 2px var(--deye-focus);
  }

  .cell-text {
    min-width: 0;
    overflow: hidden;
    color: var(--deye-text);
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .cell-text.muted,
  .cell-muted {
    color: var(--deye-muted);
  }

  .num {
    color: var(--deye-text);
    text-align: right;
    white-space: nowrap;
  }

  .num.muted {
    color: var(--deye-muted);
    font-size: 13px;
  }

  .share {
    display: block;
    height: 6px;
    overflow: hidden;
    border-radius: 3px;
    background: color-mix(in srgb, var(--primary-text-color) 8%, transparent);
  }

  .share span {
    display: block;
    height: 100%;
    border-radius: 3px;
    background: var(--share-color);
  }

  .battery-fill {
    background: var(--deye-battery-color);
  }

  .discharge-fill {
    background: var(--deye-discharge-color);
  }

  .chart.bars {
    margin-top: 8px;
  }

  .bars .charge {
    fill: var(--deye-battery-color);
  }

  .bars .discharge {
    fill: var(--deye-discharge-color);
  }

  .row-dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: var(--tone-color);
  }

  .big-cells {
    display: flex;
    align-items: center;
    padding: 14px 24px 0;
  }

  .big-cells .battery-visual {
    flex: 1;
    height: auto;
  }

  .big-cells .cells {
    gap: 4px;
    height: 36px;
    padding: 4px;
    border-width: 2px;
    border-radius: 9px;
  }

  .big-cells .cell {
    border-radius: 3px;
  }

  .big-cells .nub {
    width: 5px;
    height: 14px;
    margin-left: 3px;
    border-radius: 0 3px 3px 0;
  }

  @media (max-width: 420px) {
    .hero-value.percent {
      gap: 2px;
    }

    .hero-value .number {
      font-size: 44px;
      line-height: 52px;
    }

    .row {
      gap: 8px;
    }
  }
`,Sr=[{id:"6h",label:"6 h",hours:6,tickHours:1},{id:"24h",label:"24 h",hours:24,tickHours:6},{id:"7d",label:"7 d",hours:168,tickHours:24}],Er=512,Cr=112;function Or(e){return Cr-Math.min(100,Math.max(0,e))/100*104}function Ir(e){if("inverter"===e.kind||e.isParallel){const t=e.master.readings.battery_soc?.entityId;return t?[t]:[]}return e.members.flatMap(e=>e.readings.battery_soc?.entityId??[])}function Lr(e){return e.members.flatMap(e=>e.readings.battery_power?.entityId??[])}let Pr=(()=>{let e,t,a,r,s,n,i=_e,o=[],l=[],c=[],d=[],p=[],h=[],m=[],f=[],y=[],v=[],b=[],x=[];return class extends i{static{const g="function"==typeof Symbol&&Symbol.metadata?Object.create(i[Symbol.metadata]??null):void 0;e=[Se({attribute:!1})],t=[Se({attribute:!1})],a=[Se({attribute:!1})],r=[Ee()],s=[Ee()],n=[Ee()],u(this,null,e,{kind:"accessor",name:"hass",static:!1,private:!1,access:{has:e=>"hass"in e,get:e=>e.hass,set:(e,t)=>{e.hass=t}},metadata:g},o,l),u(this,null,t,{kind:"accessor",name:"panel",static:!1,private:!1,access:{has:e=>"panel"in e,get:e=>e.panel,set:(e,t)=>{e.panel=t}},metadata:g},c,d),u(this,null,a,{kind:"accessor",name:"config",static:!1,private:!1,access:{has:e=>"config"in e,get:e=>e.config,set:(e,t)=>{e.config=t}},metadata:g},p,h),u(this,null,r,{kind:"accessor",name:"range",static:!1,private:!1,access:{has:e=>"range"in e,get:e=>e.range,set:(e,t)=>{e.range=t}},metadata:g},m,f),u(this,null,s,{kind:"accessor",name:"chart",static:!1,private:!1,access:{has:e=>"chart"in e,get:e=>e.chart,set:(e,t)=>{e.chart=t}},metadata:g},y,v),u(this,null,n,{kind:"accessor",name:"isLoading",static:!1,private:!1,access:{has:e=>"isLoading"in e,get:e=>e.isLoading,set:(e,t)=>{e.isLoading=t}},metadata:g},b,x),g&&Object.defineProperty(this,Symbol.metadata,{enumerable:!0,configurable:!0,writable:!0,value:g})}static styles=[er,ar,Ar];#e=g(this,o,void 0);get hass(){return this.#e}set hass(e){this.#e=e}#s=(g(this,l),g(this,c,void 0));get panel(){return this.#s}set panel(e){this.#s=e}#t=(g(this,d),g(this,p,void 0));get config(){return this.#t}set config(e){this.#t=e}#n=(g(this,h),g(this,m,"24h"));get range(){return this.#n}set range(e){this.#n=e}#i=(g(this,f),g(this,y,void 0));get chart(){return this.#i}set chart(e){this.#i=e}#o=(g(this,v),g(this,b,!0));get isLoading(){return this.#o}set isLoading(e){this.#o=e}loadedKey=(g(this,x),"");willUpdate(e){if(!this.hass||!this.panel||!this.config||!e.has("range")&&!e.has("panel"))return;const t=`${this.range}|${Ir(this.panel).join(",")}|${Lr(this.panel).join(",")}`;t!==this.loadedKey&&(this.loadedKey=t,this.load(this.hass,this.panel,this.config,t))}render(){if(!this.hass||!this.panel)return oe;const e=rt(this.hass.locale,this.hass.language),t=Wa(this.panel),a="charging"===t.flow||"discharging"===t.flow;return se`${this.renderHero(t,e)}
      <div class="big-cells">${Pa(t.soc,t.level,a)}</div>
      <section class="section">
        <div class="section-head">
          <h3>History</h3>
          ${br(Sr,this.range,e=>{this.range=e})}
        </div>
        ${this.renderCharts(t,e)}
      </section>
      ${this.renderStats(this.panel,e)} ${this.renderMembers(this.panel,e)}`}async load(e,t,a,r){const s=Sr.find(e=>e.id===this.range)??Sr[1],n=Date.now(),i={start:n-s.hours*na,end:n},o=Ir(t),l=Lr(t),c=[...o,...l],d=new Yt(e);this.isLoading=!0;try{const t=s.hours<48?Object.fromEntries(Object.entries(await d.fetchStates(c,i.start,i.end)).map(([e,t])=>[e,ta(t,e=>e)])):await d.fetchHourlyMeans(c,i.start,i.end);if(r!==this.loadedKey)return;const h=s.hours<48?96:s.hours,u=l.map(r=>{const s=e.states[r]?.attributes.unit_of_measurement;return aa((t[r]??[]).map(e=>({...e,value:gt("battery_power",e.value,s,a.invert)})),i.start,i.end,48,n)});this.chart={window:i,soc:(p=o.map(e=>aa(t[e]??[],i.start,i.end,h,n)),ra(p).map(e=>void 0===e?void 0:e/p.length)),power:ra(u)}}catch{this.chart=void 0}var p;this.isLoading=!1}renderHero(e,t){const a=Fa(e.flow),r=function(e){if(!e.eta)return;const t=nt(e.eta.minutes);return"full"===e.eta.kind?`full in ≈ ${t}`:`≈ ${t} left`}(e);return se`<div class="hero">
      <span class="hero-value percent"
        ><span class="number">${st(e.soc,0,t)}</span
        ><span class="unit">%</span></span
      >
      ${void 0===e.power?oe:se`<span class="hero-side">
              <span class="hero-status ${a}"
                >${"charging"===e.flow?ma("bolt",14):oe}${lt(e.flow??"")}</span
              >
              <span class="hero-main"
                >${st(Math.abs(e.power),2,t)} <small>kW</small></span
              >
              ${r?se`<span class="hero-note">${r}</span>`:oe}
            </span>`}
    </div>`}renderCharts(e,t){if(!this.chart||this.isLoading&&0===this.chart.soc.length)return xr(this.isLoading);const{window:a,soc:r,power:s}=this.chart,n=$r(a,(Sr.find(e=>e.id===this.range)??Sr[1]).tickHours,t),i=Ea(r,e=>e/r.length*Er,Or),o=e.soc,l=void 0===o?i:[...i,[Er,Or(o)]];return se`<svg
        class="chart"
        viewBox="0 0 ${Er} ${120}"
        role="img"
        aria-label="State of charge"
      >
        <line class="grid-line" x1="0" y1=${Or(100)} x2=${Er} y2=${Or(100)}></line>
        <line class="grid-line" x1="0" y1=${Or(50)} x2=${Er} y2=${Or(50)}></line>
        <line class="base-line" x1="0" y1=${Cr} x2=${Er} y2=${Cr}></line>
        ${n.map(e=>ne`<line class="tick-line" x1=${e.x*Er} y1=${8} x2=${e.x*Er} y2=${Cr}></line>`)}
        ${this.renderThreshold(e.thresholds.hasLow,e.thresholds.low,"Low","warning")}
        ${this.renderThreshold(e.thresholds.hasShutdown,e.thresholds.shutdown,"Shutdown","error")}
        <path
          d=${Aa(l,Cr,8)}
          style="fill: color-mix(in srgb, var(--deye-battery-color) 14%, transparent)"
        ></path>
        <path
          d=${Ma(l,8,Cr)}
          fill="none"
          stroke-width="2"
          stroke-linejoin="round"
          stroke-linecap="round"
          style="stroke: var(--deye-battery-color)"
        ></path>
        ${void 0===o?oe:ne`<circle cx=${Er} cy=${Or(o)} r="4.5" stroke-width="2.5" style="fill: var(--deye-battery-color); stroke: var(--ha-card-background, var(--card-background-color))"></circle>`}
        <text x="4" y=${Or(100)+12}>100%</text>
        <text x="4" y=${Or(50)+12}>50%</text>
        <text x="4" y=${108}>0%</text>
      </svg>
      ${this.renderPowerBars(s)} ${wr(n,!0)}
      <div class="section-head">
        <span class="legend"><span class="swatch stroke battery-fill"></span>SOC</span>
        <span class="legend"><span class="swatch battery-fill"></span>Charge</span>
        <span class="legend"><span class="swatch discharge-fill"></span>Discharge</span>
      </div>`}renderThreshold(e,t,a,r){if(!e)return oe;const s=Or(t),n="warning"===r?"var(--deye-warning-color)":"var(--deye-error-color)";return ne`<line x1="0" y1=${s} x2=${Er} y2=${s} stroke-dasharray="5 4" style=${`stroke: color-mix(in srgb, ${n} 55%, transparent)`}></line>
      <text x=${506} y=${s-4} text-anchor="end" style=${`fill: ${n}`}>${a} ${Math.round(t)}%</text>`}renderPowerBars(e){const t=Er/Math.max(1,e.length),a=Math.max(1,...e.map(e=>Math.abs(e??0))),r=e.map((e,r)=>{if(void 0===e||0===e)return oe;const s=Math.abs(e)/a*22,n=e<0;return ne`<rect x=${r*t+(t-7)/2} y=${n?24-s:24} width=${7} height=${s} rx="1" class=${n?"charge":"discharge"}></rect>`});return se`<svg
      class="chart bars"
      viewBox="0 0 ${Er} ${48}"
      role="img"
      aria-label="Battery power"
    >
      <line class="base-line" x1="0" y1=${24} x2=${Er} y2=${24}></line>
      ${r}
    </svg>`}renderStats(e,t){const{readings:a}=e;return se`<section class="section">
      <div class="stats">
        ${_r("Voltage","battery_voltage",a.battery_voltage,kr(e,"battery_voltage"),t)}
        ${_r("Current","battery_current",a.battery_current,kr(e,"battery_current"),t)}
        ${_r("Temperature","battery_temperature",a.battery_temperature,kr(e,"battery_temperature"),t)}
      </div>
      <div class="stats">
        ${_r("Charged today","day_battery_charge",a.day_battery_charge,kr(e,"day_battery_charge"),t)}
        ${_r("Discharged today","day_battery_discharge",a.day_battery_discharge,kr(e,"day_battery_discharge"),t)}
      </div>
    </section>`}renderMembers(e,t){if(e.members.length<2)return oe;const a=Mr(e),r=a.reduce((e,t)=>e+Math.abs(ft(t.readings.battery_power)??0),0);return se`<section class="section">
      <h3>By inverter</h3>
      <div class="rows">${a.map(e=>this.renderMember(e,r,t))}</div>
    </section>`}renderMember(e,t,a){const r=ft(e.readings.battery_power),s=t>0?Math.round(Math.abs(r??0)/t*100):0;return se`<button
      type="button"
      class="row"
      style=${$a({gridTemplateColumns:"8px minmax(0, 1fr) minmax(48px, 140px) 72px 64px","--share-color":"var(--deye-battery-color)"})}
      @click=${t=>vr(t.currentTarget,e.readings.battery_power?.entityId)}
    >
      <span class="row-dot ${e.status.chip?.tone??"neutral"}"></span>
      <span class="cell-text">${e.name}</span>
      <span class="share"><span style=${$a({width:`${s}%`})}></span></span>
      <span class="num"
        >${st(void 0===r?void 0:Math.abs(r),2,a)} kW</span
      >
      <span class="num muted"
        >${bt("battery_current",e.readings.battery_current,a)} A</span
      >
    </button>`}}})();const jr={pv:{title:"Solar",subtitle(e){const t=[e.name],a=function(e){return e.members.reduce((e,t)=>e+d.filter(e=>t.readings[Vt(e).power]).length,0)}(e);return e.members.length>1&&t.push(ct(e.members.length,"inverter")),a>0&&t.push(ct(a,"string")),t.join(" · ")},historyEntityId:e=>Ft(e.readings)?.entityId,body:(e,t)=>se`<deye-solar-popup-body .hass=${t} .panel=${e}></deye-solar-popup-body>`},battery:{title:"Battery",subtitle:e=>"inverter"===e.kind?e.name:e.isParallel?`${e.name} · parallel · BMS data from ${e.master.name}`:`${e.name} · ${ct(e.members.length,"inverter")}`,historyEntityId:e=>e.readings.battery_soc?.entityId,body:(e,t,a)=>se`<deye-battery-popup-body
      .hass=${t}
      .panel=${e}
      .config=${a}
    ></deye-battery-popup-body>`}},zr="deye-popup-title";let Tr=(()=>{let e,t,a,r,s=_e,n=[],i=[],o=[],l=[],c=[],d=[],p=[],h=[];return class extends s{static{const g="function"==typeof Symbol&&Symbol.metadata?Object.create(s[Symbol.metadata]??null):void 0;e=[Se({attribute:!1})],t=[Se({attribute:!1})],a=[Se({attribute:!1})],r=[Se({attribute:!1})],u(this,null,e,{kind:"accessor",name:"hass",static:!1,private:!1,access:{has:e=>"hass"in e,get:e=>e.hass,set:(e,t)=>{e.hass=t}},metadata:g},n,i),u(this,null,t,{kind:"accessor",name:"panel",static:!1,private:!1,access:{has:e=>"panel"in e,get:e=>e.panel,set:(e,t)=>{e.panel=t}},metadata:g},o,l),u(this,null,a,{kind:"accessor",name:"tile",static:!1,private:!1,access:{has:e=>"tile"in e,get:e=>e.tile,set:(e,t)=>{e.tile=t}},metadata:g},c,d),u(this,null,r,{kind:"accessor",name:"config",static:!1,private:!1,access:{has:e=>"config"in e,get:e=>e.config,set:(e,t)=>{e.config=t}},metadata:g},p,h),g&&Object.defineProperty(this,Symbol.metadata,{enumerable:!0,configurable:!0,writable:!0,value:g})}static styles=[er,Ar];#e=g(this,n,void 0);get hass(){return this.#e}set hass(e){this.#e=e}#s=(g(this,i),g(this,o,void 0));get panel(){return this.#s}set panel(e){this.#s=e}#l=(g(this,l),g(this,c,void 0));get tile(){return this.#l}set tile(e){this.#l=e}#t=(g(this,d),g(this,p,void 0));get config(){return this.#t}set config(e){this.#t=e}render(){return se`<dialog
      aria-labelledby=${zr}
      @close=${this.handleClose}
      @click=${this.handleBackdropClick}
      @hass-more-info=${this.handleMoreInfo}
    >
      ${this.renderContent()}
    </dialog>`}updated(){const e=this.dialog,t=this.isActive();e&&(!t||e.open?!t&&e.open&&e.close():e.showModal())}get dialog(){return this.renderRoot.querySelector("dialog")}isActive(){return Boolean(this.hass&&this.panel&&this.tile&&this.config)}renderContent(){if(!(this.hass&&this.panel&&this.tile&&this.config))return oe;const e=jr[this.tile],t=e.historyEntityId(this.panel);return se`<div class="top-bar">
        <button type="button" class="icon-button" aria-label="Close" @click=${this.close}>
          ${ma("close",22)}
        </button>
        <div class="heading">
          <h2 id=${zr}>${e.title}</h2>
          <span>${e.subtitle(this.panel)}</span>
        </div>
        ${t?se`<button
                type="button"
                class="icon-button"
                aria-label="Open history"
                @click=${e=>vr(e.currentTarget,t)}
              >
                ${ma("chart",20)}
              </button>`:oe}
      </div>
      ${e.body(this.panel,this.hass,this.config)}`}close=(g(this,h),()=>{this.dialog?.close()});handleClose=()=>{this.dispatchEvent(new CustomEvent("popup-closed"))};handleBackdropClick=e=>{e.target===e.currentTarget&&this.close()};handleMoreInfo=()=>{this.close()}}})();const Ur=[{id:"today",label:"Today"},{id:"week",label:"7 d"}],Hr=512,Nr=152,Dr=["36%","26%","18%","12%"];let Br=(()=>{let e,t,a,r,s,n=_e,i=[],o=[],l=[],c=[],p=[],h=[],m=[],f=[],y=[],v=[];return class extends n{static{const d="function"==typeof Symbol&&Symbol.metadata?Object.create(n[Symbol.metadata]??null):void 0;e=[Se({attribute:!1})],t=[Se({attribute:!1})],a=[Ee()],r=[Ee()],s=[Ee()],u(this,null,e,{kind:"accessor",name:"hass",static:!1,private:!1,access:{has:e=>"hass"in e,get:e=>e.hass,set:(e,t)=>{e.hass=t}},metadata:d},i,o),u(this,null,t,{kind:"accessor",name:"panel",static:!1,private:!1,access:{has:e=>"panel"in e,get:e=>e.panel,set:(e,t)=>{e.panel=t}},metadata:d},l,c),u(this,null,a,{kind:"accessor",name:"range",static:!1,private:!1,access:{has:e=>"range"in e,get:e=>e.range,set:(e,t)=>{e.range=t}},metadata:d},p,h),u(this,null,r,{kind:"accessor",name:"chart",static:!1,private:!1,access:{has:e=>"chart"in e,get:e=>e.chart,set:(e,t)=>{e.chart=t}},metadata:d},m,f),u(this,null,s,{kind:"accessor",name:"isLoading",static:!1,private:!1,access:{has:e=>"isLoading"in e,get:e=>e.isLoading,set:(e,t)=>{e.isLoading=t}},metadata:d},y,v),d&&Object.defineProperty(this,Symbol.metadata,{enumerable:!0,configurable:!0,writable:!0,value:d})}static styles=[er,Ar];#e=g(this,i,void 0);get hass(){return this.#e}set hass(e){this.#e=e}#s=(g(this,o),g(this,l,void 0));get panel(){return this.#s}set panel(e){this.#s=e}#n=(g(this,c),g(this,p,"today"));get range(){return this.#n}set range(e){this.#n=e}#i=(g(this,h),g(this,m,void 0));get chart(){return this.#i}set chart(e){this.#i=e}#o=(g(this,f),g(this,y,!0));get isLoading(){return this.#o}set isLoading(e){this.#o=e}loadedKey=(g(this,v),"");willUpdate(e){if(!this.hass||!this.panel||!e.has("range")&&!e.has("panel"))return;const t=`${this.range}|${this.memberIds(this.panel).join(",")}`;t!==this.loadedKey&&(this.loadedKey=t,this.load(this.hass,this.panel,this.range,t))}render(){if(!this.hass||!this.panel)return oe;const e=rt(this.hass.locale,this.hass.language),t=Mr(this.panel);return se`${this.renderHero(this.panel,t,e)}
      <section class="section">
        <div class="section-head">
          <h3>${Ur.find(e=>e.id===this.range)?.label}</h3>
          ${t.length>1?t.map((e,t)=>this.renderLegend(e,t)):oe}
          ${br(Ur,this.range,e=>this.range=e)}
        </div>
        ${this.renderChart(this.panel,e)}
      </section>
      ${this.renderStrings(t,e)}`}memberIds(e){return Mr(e).map(e=>Gt(e.readings).join("+"))}async load(e,t,a,r){const s=Date.now(),n=function(e,t){return"today"===e?oa(t):{start:ia(t-5184e5,0),end:t}}(a,s),i=Mr(t),o=i.flatMap(e=>Gt(e.readings)),l=new Yt(e);this.isLoading=!0;try{const t="today"===a?Object.fromEntries(Object.entries(await l.fetchStates(o,n.start,Math.min(s,n.end))).map(([e,t])=>[e,ta(t,e=>e)])):await l.fetchHourlyMeans(o,n.start,n.end);if(r!==this.loadedKey)return;const c=function(e,t){return"today"===e?96:Math.ceil((t.end-t.start)/na)}(a,n),d=i.map(a=>ra(Gt(a.readings).map(a=>{const r=Ze.power.scale(e.states[a]?.attributes.unit_of_measurement);return aa((t[a]??[]).map(e=>({...e,value:e.value*r})),n.start,n.end,c,s)})));this.chart={window:n,layers:d.map((e,t)=>ra(d.slice(0,t+1)))}}catch{this.chart=void 0}this.isLoading=!1}renderHero(e,t,a){const r=ft(Ft(e.readings)),s=e.readings.day_pv_energy,n=t.filter(e=>e.readings.day_pv_energy).map(e=>`${e.name} ${bt("day_pv_energy",e.readings.day_pv_energy,a)}`).join(" · ");return se`<div class="hero">
      <span class="hero-value"
        ><span class="number">${st(r,2,a)}</span
        ><span class="unit">kW</span></span
      >
      ${s?se`<span class="hero-side">
              <span class="hero-main"
                >${bt("day_pv_energy",s,a)}
                <small>${s.unit} today</small></span
              >
              ${t.length>1?se`<span class="hero-note">${n}</span>`:oe}
            </span>`:oe}
    </div>`}renderLegend(e,t){const a=Dr[Math.min(t,Dr.length-1)];return se`<span class="legend"
      ><span
        class="swatch"
        style=${$a({background:`color-mix(in srgb, var(--deye-solar-color) ${a}, transparent)`})}
      ></span
      >${e.name}</span
    >`}renderChart(e,t){if(!this.chart||this.isLoading&&0===this.chart.layers.length)return xr(this.isLoading);const{window:a,layers:r}=this.chart,s=Date.now(),n=r.at(-1)??[],i=ft(Ft(e.readings)),o=Sa(Math.max((l=[n],Math.max(0,...l.flatMap(e=>e.filter(e=>void 0!==e)))),i??0),3);var l;const c=e=>Nr-Math.max(0,e)/o.max*144,d=e=>Ea(e,t=>t/e.length*Hr,c),p="today"===this.range,h=la(a,s)*Hr,u=$r(a,p?3:24,t),g=d(n);return se`<svg
        class="chart"
        viewBox="0 0 ${Hr} ${160}"
        role="img"
        aria-label="Solar production"
      >
        ${Array.from({length:4},(e,a)=>{const r=8+48*a,s=o.max-o.step*a;return ne`<line class=${3===a?"base-line":"grid-line"} x1="0" y1=${r} x2=${Hr} y2=${r}></line>
            ${a<3?ne`<text x=${508} y=${r+12} text-anchor="end">${st(s,0,t)}${0===a?" kW":""}</text>`:oe}`})}
        ${[...r].reverse().map((e,t)=>{const a=r.length-1-t,s=Dr[Math.min(a,Dr.length-1)];return ne`<path d=${Aa(d(e),Nr,8)} style=${`fill: color-mix(in srgb, var(--deye-solar-color) ${s}, transparent)`}></path>`})}
        ${r.slice(0,-1).map(e=>ne`<path d=${Ma(d(e),8,Nr)} fill="none" stroke-width="1" style="stroke: color-mix(in srgb, var(--deye-solar-color) 70%, transparent)"></path>`)}
        <path
          d=${Ma(g,8,Nr)}
          fill="none"
          stroke-width="2"
          stroke-linejoin="round"
          stroke-linecap="round"
          style="stroke: var(--deye-solar-color)"
        ></path>
        ${p&&s>a.start&&s<a.end?ne`<line x1=${h} y1=${8} x2=${h} y2=${Nr} stroke-dasharray="2 3" style="stroke: color-mix(in srgb, var(--primary-text-color) 35%, transparent)"></line>
            <circle cx=${h} cy=${c(i??0)} r="4.5" stroke-width="2.5" style="fill: var(--deye-solar-color); stroke: var(--ha-card-background, var(--card-background-color))"></circle>
            <text x=${h+6} y=${18}>now</text>`:oe}
      </svg>
      ${wr(u,!p)}`}renderStrings(e,t){const a=e.flatMap(e=>d.flatMap(t=>{const a=e.readings[Vt(t).power];return a?[{member:e,index:t,power:ft(a)}]:[]}));if(0===a.length)return oe;const r=Math.max(0,...a.map(e=>e.power??0)),s="minmax(0, 1fr) 56px 64px 48px 96px";return se`<section class="section">
      <div class="row-head" style=${$a({gridTemplateColumns:s})}>
        <span>String</span><span class="num muted">kW</span><span class="num muted">V</span
        ><span class="num muted">A</span><span class="num muted">vs. best</span>
      </div>
      <div class="rows">
        ${a.map(a=>this.renderStringRow(a,e.length>1,r,s,t))}
      </div>
    </section>`}renderStringRow(e,t,a,r,s){const n=Vt(e.index),i=e.member.readings,o=a>0?Math.round((e.power??0)/a*100):0;return se`<button
      type="button"
      class="row"
      style=${$a({gridTemplateColumns:r,"--share-color":"var(--deye-solar-color)"})}
      @click=${e=>vr(e.currentTarget,i[n.power]?.entityId)}
    >
      <span class="cell-text"
        >${t?se`<span class="cell-muted">${e.member.name} · </span>`:oe}PV${e.index}</span
      >
      <span class="num">${bt(n.power,i[n.power],s)}</span>
      <span class="num">${bt(n.voltage,i[n.voltage],s)}</span>
      <span class="num">${bt(n.current,i[n.current],s)}</span>
      <span class="share"><span style=${$a({width:`${o}%`})}></span></span>
    </button>`}}})();const Rr=[[e,rr],[t,yr],["deye-inverter-popup",Tr],["deye-solar-popup-body",Br],["deye-battery-popup-body",Pr]];for(const[e,t]of Rr)customElements.get(e)||customElements.define(e,t);window.customCards=window.customCards??[],window.customCards.some(t=>t.type===e)||window.customCards.push({type:e,name:a,description:"Status and live values of Deye/Sunsynk inverters from the Sunsynk/Deye Inverter add-on.",preview:!0,documentationURL:"https://github.com/RobinCK/lovelace-deye-inverter-card"}),console.info(`%c ${a.toUpperCase()} %c 1.0.1 `,"font-weight: bold","");
