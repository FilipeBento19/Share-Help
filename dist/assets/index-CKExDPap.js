(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))s(r);new MutationObserver(r=>{for(const i of r)if(i.type==="childList")for(const o of i.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&s(o)}).observe(document,{childList:!0,subtree:!0});function n(r){const i={};return r.integrity&&(i.integrity=r.integrity),r.referrerPolicy&&(i.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?i.credentials="include":r.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function s(r){if(r.ep)return;r.ep=!0;const i=n(r);fetch(r.href,i)}})();/**
* @vue/shared v3.5.17
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**//*! #__NO_SIDE_EFFECTS__ */function Vr(t){const e=Object.create(null);for(const n of t.split(","))e[n]=1;return n=>n in e}const te={},sn=[],Ge=()=>{},rl=()=>!1,Ds=t=>t.charCodeAt(0)===111&&t.charCodeAt(1)===110&&(t.charCodeAt(2)>122||t.charCodeAt(2)<97),jr=t=>t.startsWith("onUpdate:"),pe=Object.assign,Wr=(t,e)=>{const n=t.indexOf(e);n>-1&&t.splice(n,1)},il=Object.prototype.hasOwnProperty,q=(t,e)=>il.call(t,e),B=Array.isArray,rn=t=>Ls(t)==="[object Map]",jo=t=>Ls(t)==="[object Set]",V=t=>typeof t=="function",ae=t=>typeof t=="string",Lt=t=>typeof t=="symbol",se=t=>t!==null&&typeof t=="object",Wo=t=>(se(t)||V(t))&&V(t.then)&&V(t.catch),Ko=Object.prototype.toString,Ls=t=>Ko.call(t),ol=t=>Ls(t).slice(8,-1),zo=t=>Ls(t)==="[object Object]",Kr=t=>ae(t)&&t!=="NaN"&&t[0]!=="-"&&""+parseInt(t,10)===t,Pn=Vr(",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"),Ms=t=>{const e=Object.create(null);return n=>e[n]||(e[n]=t(n))},al=/-(\w)/g,Pe=Ms(t=>t.replace(al,(e,n)=>n?n.toUpperCase():"")),cl=/\B([A-Z])/g,Mt=Ms(t=>t.replace(cl,"-$1").toLowerCase()),Us=Ms(t=>t.charAt(0).toUpperCase()+t.slice(1)),Xs=Ms(t=>t?`on${Us(t)}`:""),Pt=(t,e)=>!Object.is(t,e),Qs=(t,...e)=>{for(let n=0;n<t.length;n++)t[n](...e)},_r=(t,e,n,s=!1)=>{Object.defineProperty(t,e,{configurable:!0,enumerable:!1,writable:s,value:n})},ll=t=>{const e=parseFloat(t);return isNaN(e)?t:e};let yi;const $s=()=>yi||(yi=typeof globalThis<"u"?globalThis:typeof self<"u"?self:typeof window<"u"?window:typeof global<"u"?global:{});function Fs(t){if(B(t)){const e={};for(let n=0;n<t.length;n++){const s=t[n],r=ae(s)?hl(s):Fs(s);if(r)for(const i in r)e[i]=r[i]}return e}else if(ae(t)||se(t))return t}const ul=/;(?![^(]*\))/g,dl=/:([^]+)/,fl=/\/\*[^]*?\*\//g;function hl(t){const e={};return t.replace(fl,"").split(ul).forEach(n=>{if(n){const s=n.split(dl);s.length>1&&(e[s[0].trim()]=s[1].trim())}}),e}function xt(t){let e="";if(ae(t))e=t;else if(B(t))for(let n=0;n<t.length;n++){const s=xt(t[n]);s&&(e+=s+" ")}else if(se(t))for(const n in t)t[n]&&(e+=n+" ");return e.trim()}const pl="itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly",ml=Vr(pl);function qo(t){return!!t||t===""}const Go=t=>!!(t&&t.__v_isRef===!0),Oe=t=>ae(t)?t:t==null?"":B(t)||se(t)&&(t.toString===Ko||!V(t.toString))?Go(t)?Oe(t.value):JSON.stringify(t,Jo,2):String(t),Jo=(t,e)=>Go(e)?Jo(t,e.value):rn(e)?{[`Map(${e.size})`]:[...e.entries()].reduce((n,[s,r],i)=>(n[Zs(s,i)+" =>"]=r,n),{})}:jo(e)?{[`Set(${e.size})`]:[...e.values()].map(n=>Zs(n))}:Lt(e)?Zs(e):se(e)&&!B(e)&&!zo(e)?String(e):e,Zs=(t,e="")=>{var n;return Lt(t)?`Symbol(${(n=t.description)!=null?n:e})`:t};/**
* @vue/reactivity v3.5.17
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/let we;class gl{constructor(e=!1){this.detached=e,this._active=!0,this._on=0,this.effects=[],this.cleanups=[],this._isPaused=!1,this.parent=we,!e&&we&&(this.index=(we.scopes||(we.scopes=[])).push(this)-1)}get active(){return this._active}pause(){if(this._active){this._isPaused=!0;let e,n;if(this.scopes)for(e=0,n=this.scopes.length;e<n;e++)this.scopes[e].pause();for(e=0,n=this.effects.length;e<n;e++)this.effects[e].pause()}}resume(){if(this._active&&this._isPaused){this._isPaused=!1;let e,n;if(this.scopes)for(e=0,n=this.scopes.length;e<n;e++)this.scopes[e].resume();for(e=0,n=this.effects.length;e<n;e++)this.effects[e].resume()}}run(e){if(this._active){const n=we;try{return we=this,e()}finally{we=n}}}on(){++this._on===1&&(this.prevScope=we,we=this)}off(){this._on>0&&--this._on===0&&(we=this.prevScope,this.prevScope=void 0)}stop(e){if(this._active){this._active=!1;let n,s;for(n=0,s=this.effects.length;n<s;n++)this.effects[n].stop();for(this.effects.length=0,n=0,s=this.cleanups.length;n<s;n++)this.cleanups[n]();if(this.cleanups.length=0,this.scopes){for(n=0,s=this.scopes.length;n<s;n++)this.scopes[n].stop(!0);this.scopes.length=0}if(!this.detached&&this.parent&&!e){const r=this.parent.scopes.pop();r&&r!==this&&(this.parent.scopes[this.index]=r,r.index=this.index)}this.parent=void 0}}}function vl(){return we}let ee;const er=new WeakSet;class Yo{constructor(e){this.fn=e,this.deps=void 0,this.depsTail=void 0,this.flags=5,this.next=void 0,this.cleanup=void 0,this.scheduler=void 0,we&&we.active&&we.effects.push(this)}pause(){this.flags|=64}resume(){this.flags&64&&(this.flags&=-65,er.has(this)&&(er.delete(this),this.trigger()))}notify(){this.flags&2&&!(this.flags&32)||this.flags&8||Qo(this)}run(){if(!(this.flags&1))return this.fn();this.flags|=2,bi(this),Zo(this);const e=ee,n=Le;ee=this,Le=!0;try{return this.fn()}finally{ea(this),ee=e,Le=n,this.flags&=-3}}stop(){if(this.flags&1){for(let e=this.deps;e;e=e.nextDep)Gr(e);this.deps=this.depsTail=void 0,bi(this),this.onStop&&this.onStop(),this.flags&=-2}}trigger(){this.flags&64?er.add(this):this.scheduler?this.scheduler():this.runIfDirty()}runIfDirty(){yr(this)&&this.run()}get dirty(){return yr(this)}}let Xo=0,kn,On;function Qo(t,e=!1){if(t.flags|=8,e){t.next=On,On=t;return}t.next=kn,kn=t}function zr(){Xo++}function qr(){if(--Xo>0)return;if(On){let e=On;for(On=void 0;e;){const n=e.next;e.next=void 0,e.flags&=-9,e=n}}let t;for(;kn;){let e=kn;for(kn=void 0;e;){const n=e.next;if(e.next=void 0,e.flags&=-9,e.flags&1)try{e.trigger()}catch(s){t||(t=s)}e=n}}if(t)throw t}function Zo(t){for(let e=t.deps;e;e=e.nextDep)e.version=-1,e.prevActiveLink=e.dep.activeLink,e.dep.activeLink=e}function ea(t){let e,n=t.depsTail,s=n;for(;s;){const r=s.prevDep;s.version===-1?(s===n&&(n=r),Gr(s),_l(s)):e=s,s.dep.activeLink=s.prevActiveLink,s.prevActiveLink=void 0,s=r}t.deps=e,t.depsTail=n}function yr(t){for(let e=t.deps;e;e=e.nextDep)if(e.dep.version!==e.version||e.dep.computed&&(ta(e.dep.computed)||e.dep.version!==e.version))return!0;return!!t._dirty}function ta(t){if(t.flags&4&&!(t.flags&16)||(t.flags&=-17,t.globalVersion===Hn)||(t.globalVersion=Hn,!t.isSSR&&t.flags&128&&(!t.deps&&!t._dirty||!yr(t))))return;t.flags|=2;const e=t.dep,n=ee,s=Le;ee=t,Le=!0;try{Zo(t);const r=t.fn(t._value);(e.version===0||Pt(r,t._value))&&(t.flags|=128,t._value=r,e.version++)}catch(r){throw e.version++,r}finally{ee=n,Le=s,ea(t),t.flags&=-3}}function Gr(t,e=!1){const{dep:n,prevSub:s,nextSub:r}=t;if(s&&(s.nextSub=r,t.prevSub=void 0),r&&(r.prevSub=s,t.nextSub=void 0),n.subs===t&&(n.subs=s,!s&&n.computed)){n.computed.flags&=-5;for(let i=n.computed.deps;i;i=i.nextDep)Gr(i,!0)}!e&&!--n.sc&&n.map&&n.map.delete(n.key)}function _l(t){const{prevDep:e,nextDep:n}=t;e&&(e.nextDep=n,t.prevDep=void 0),n&&(n.prevDep=e,t.nextDep=void 0)}let Le=!0;const na=[];function lt(){na.push(Le),Le=!1}function ut(){const t=na.pop();Le=t===void 0?!0:t}function bi(t){const{cleanup:e}=t;if(t.cleanup=void 0,e){const n=ee;ee=void 0;try{e()}finally{ee=n}}}let Hn=0;class yl{constructor(e,n){this.sub=e,this.dep=n,this.version=n.version,this.nextDep=this.prevDep=this.nextSub=this.prevSub=this.prevActiveLink=void 0}}class Jr{constructor(e){this.computed=e,this.version=0,this.activeLink=void 0,this.subs=void 0,this.map=void 0,this.key=void 0,this.sc=0,this.__v_skip=!0}track(e){if(!ee||!Le||ee===this.computed)return;let n=this.activeLink;if(n===void 0||n.sub!==ee)n=this.activeLink=new yl(ee,this),ee.deps?(n.prevDep=ee.depsTail,ee.depsTail.nextDep=n,ee.depsTail=n):ee.deps=ee.depsTail=n,sa(n);else if(n.version===-1&&(n.version=this.version,n.nextDep)){const s=n.nextDep;s.prevDep=n.prevDep,n.prevDep&&(n.prevDep.nextDep=s),n.prevDep=ee.depsTail,n.nextDep=void 0,ee.depsTail.nextDep=n,ee.depsTail=n,ee.deps===n&&(ee.deps=s)}return n}trigger(e){this.version++,Hn++,this.notify(e)}notify(e){zr();try{for(let n=this.subs;n;n=n.prevSub)n.sub.notify()&&n.sub.dep.notify()}finally{qr()}}}function sa(t){if(t.dep.sc++,t.sub.flags&4){const e=t.dep.computed;if(e&&!t.dep.subs){e.flags|=20;for(let s=e.deps;s;s=s.nextDep)sa(s)}const n=t.dep.subs;n!==t&&(t.prevSub=n,n&&(n.nextSub=t)),t.dep.subs=t}}const br=new WeakMap,Wt=Symbol(""),wr=Symbol(""),Bn=Symbol("");function de(t,e,n){if(Le&&ee){let s=br.get(t);s||br.set(t,s=new Map);let r=s.get(n);r||(s.set(n,r=new Jr),r.map=s,r.key=n),r.track()}}function rt(t,e,n,s,r,i){const o=br.get(t);if(!o){Hn++;return}const c=a=>{a&&a.trigger()};if(zr(),e==="clear")o.forEach(c);else{const a=B(t),l=a&&Kr(n);if(a&&n==="length"){const u=Number(s);o.forEach((f,p)=>{(p==="length"||p===Bn||!Lt(p)&&p>=u)&&c(f)})}else switch((n!==void 0||o.has(void 0))&&c(o.get(n)),l&&c(o.get(Bn)),e){case"add":a?l&&c(o.get("length")):(c(o.get(Wt)),rn(t)&&c(o.get(wr)));break;case"delete":a||(c(o.get(Wt)),rn(t)&&c(o.get(wr)));break;case"set":rn(t)&&c(o.get(Wt));break}}qr()}function Qt(t){const e=z(t);return e===t?e:(de(e,"iterate",Bn),Ae(t)?e:e.map(ue))}function Hs(t){return de(t=z(t),"iterate",Bn),t}const bl={__proto__:null,[Symbol.iterator](){return tr(this,Symbol.iterator,ue)},concat(...t){return Qt(this).concat(...t.map(e=>B(e)?Qt(e):e))},entries(){return tr(this,"entries",t=>(t[1]=ue(t[1]),t))},every(t,e){return tt(this,"every",t,e,void 0,arguments)},filter(t,e){return tt(this,"filter",t,e,n=>n.map(ue),arguments)},find(t,e){return tt(this,"find",t,e,ue,arguments)},findIndex(t,e){return tt(this,"findIndex",t,e,void 0,arguments)},findLast(t,e){return tt(this,"findLast",t,e,ue,arguments)},findLastIndex(t,e){return tt(this,"findLastIndex",t,e,void 0,arguments)},forEach(t,e){return tt(this,"forEach",t,e,void 0,arguments)},includes(...t){return nr(this,"includes",t)},indexOf(...t){return nr(this,"indexOf",t)},join(t){return Qt(this).join(t)},lastIndexOf(...t){return nr(this,"lastIndexOf",t)},map(t,e){return tt(this,"map",t,e,void 0,arguments)},pop(){return En(this,"pop")},push(...t){return En(this,"push",t)},reduce(t,...e){return wi(this,"reduce",t,e)},reduceRight(t,...e){return wi(this,"reduceRight",t,e)},shift(){return En(this,"shift")},some(t,e){return tt(this,"some",t,e,void 0,arguments)},splice(...t){return En(this,"splice",t)},toReversed(){return Qt(this).toReversed()},toSorted(t){return Qt(this).toSorted(t)},toSpliced(...t){return Qt(this).toSpliced(...t)},unshift(...t){return En(this,"unshift",t)},values(){return tr(this,"values",ue)}};function tr(t,e,n){const s=Hs(t),r=s[e]();return s!==t&&!Ae(t)&&(r._next=r.next,r.next=()=>{const i=r._next();return i.value&&(i.value=n(i.value)),i}),r}const wl=Array.prototype;function tt(t,e,n,s,r,i){const o=Hs(t),c=o!==t&&!Ae(t),a=o[e];if(a!==wl[e]){const f=a.apply(t,i);return c?ue(f):f}let l=n;o!==t&&(c?l=function(f,p){return n.call(this,ue(f),p,t)}:n.length>2&&(l=function(f,p){return n.call(this,f,p,t)}));const u=a.call(o,l,s);return c&&r?r(u):u}function wi(t,e,n,s){const r=Hs(t);let i=n;return r!==t&&(Ae(t)?n.length>3&&(i=function(o,c,a){return n.call(this,o,c,a,t)}):i=function(o,c,a){return n.call(this,o,ue(c),a,t)}),r[e](i,...s)}function nr(t,e,n){const s=z(t);de(s,"iterate",Bn);const r=s[e](...n);return(r===-1||r===!1)&&Qr(n[0])?(n[0]=z(n[0]),s[e](...n)):r}function En(t,e,n=[]){lt(),zr();const s=z(t)[e].apply(t,n);return qr(),ut(),s}const El=Vr("__proto__,__v_isRef,__isVue"),ra=new Set(Object.getOwnPropertyNames(Symbol).filter(t=>t!=="arguments"&&t!=="caller").map(t=>Symbol[t]).filter(Lt));function Il(t){Lt(t)||(t=String(t));const e=z(this);return de(e,"has",t),e.hasOwnProperty(t)}class ia{constructor(e=!1,n=!1){this._isReadonly=e,this._isShallow=n}get(e,n,s){if(n==="__v_skip")return e.__v_skip;const r=this._isReadonly,i=this._isShallow;if(n==="__v_isReactive")return!r;if(n==="__v_isReadonly")return r;if(n==="__v_isShallow")return i;if(n==="__v_raw")return s===(r?i?Nl:la:i?ca:aa).get(e)||Object.getPrototypeOf(e)===Object.getPrototypeOf(s)?e:void 0;const o=B(e);if(!r){let a;if(o&&(a=bl[n]))return a;if(n==="hasOwnProperty")return Il}const c=Reflect.get(e,n,he(e)?e:s);return(Lt(n)?ra.has(n):El(n))||(r||de(e,"get",n),i)?c:he(c)?o&&Kr(n)?c:c.value:se(c)?r?da(c):Bs(c):c}}class oa extends ia{constructor(e=!1){super(!1,e)}set(e,n,s,r){let i=e[n];if(!this._isShallow){const a=Nt(i);if(!Ae(s)&&!Nt(s)&&(i=z(i),s=z(s)),!B(e)&&he(i)&&!he(s))return a?!1:(i.value=s,!0)}const o=B(e)&&Kr(n)?Number(n)<e.length:q(e,n),c=Reflect.set(e,n,s,he(e)?e:r);return e===z(r)&&(o?Pt(s,i)&&rt(e,"set",n,s):rt(e,"add",n,s)),c}deleteProperty(e,n){const s=q(e,n);e[n];const r=Reflect.deleteProperty(e,n);return r&&s&&rt(e,"delete",n,void 0),r}has(e,n){const s=Reflect.has(e,n);return(!Lt(n)||!ra.has(n))&&de(e,"has",n),s}ownKeys(e){return de(e,"iterate",B(e)?"length":Wt),Reflect.ownKeys(e)}}class Sl extends ia{constructor(e=!1){super(!0,e)}set(e,n){return!0}deleteProperty(e,n){return!0}}const Tl=new oa,Cl=new Sl,Rl=new oa(!0);const Er=t=>t,as=t=>Reflect.getPrototypeOf(t);function Al(t,e,n){return function(...s){const r=this.__v_raw,i=z(r),o=rn(i),c=t==="entries"||t===Symbol.iterator&&o,a=t==="keys"&&o,l=r[t](...s),u=n?Er:e?bs:ue;return!e&&de(i,"iterate",a?wr:Wt),{next(){const{value:f,done:p}=l.next();return p?{value:f,done:p}:{value:c?[u(f[0]),u(f[1])]:u(f),done:p}},[Symbol.iterator](){return this}}}}function cs(t){return function(...e){return t==="delete"?!1:t==="clear"?void 0:this}}function Pl(t,e){const n={get(r){const i=this.__v_raw,o=z(i),c=z(r);t||(Pt(r,c)&&de(o,"get",r),de(o,"get",c));const{has:a}=as(o),l=e?Er:t?bs:ue;if(a.call(o,r))return l(i.get(r));if(a.call(o,c))return l(i.get(c));i!==o&&i.get(r)},get size(){const r=this.__v_raw;return!t&&de(z(r),"iterate",Wt),Reflect.get(r,"size",r)},has(r){const i=this.__v_raw,o=z(i),c=z(r);return t||(Pt(r,c)&&de(o,"has",r),de(o,"has",c)),r===c?i.has(r):i.has(r)||i.has(c)},forEach(r,i){const o=this,c=o.__v_raw,a=z(c),l=e?Er:t?bs:ue;return!t&&de(a,"iterate",Wt),c.forEach((u,f)=>r.call(i,l(u),l(f),o))}};return pe(n,t?{add:cs("add"),set:cs("set"),delete:cs("delete"),clear:cs("clear")}:{add(r){!e&&!Ae(r)&&!Nt(r)&&(r=z(r));const i=z(this);return as(i).has.call(i,r)||(i.add(r),rt(i,"add",r,r)),this},set(r,i){!e&&!Ae(i)&&!Nt(i)&&(i=z(i));const o=z(this),{has:c,get:a}=as(o);let l=c.call(o,r);l||(r=z(r),l=c.call(o,r));const u=a.call(o,r);return o.set(r,i),l?Pt(i,u)&&rt(o,"set",r,i):rt(o,"add",r,i),this},delete(r){const i=z(this),{has:o,get:c}=as(i);let a=o.call(i,r);a||(r=z(r),a=o.call(i,r)),c&&c.call(i,r);const l=i.delete(r);return a&&rt(i,"delete",r,void 0),l},clear(){const r=z(this),i=r.size!==0,o=r.clear();return i&&rt(r,"clear",void 0,void 0),o}}),["keys","values","entries",Symbol.iterator].forEach(r=>{n[r]=Al(r,t,e)}),n}function Yr(t,e){const n=Pl(t,e);return(s,r,i)=>r==="__v_isReactive"?!t:r==="__v_isReadonly"?t:r==="__v_raw"?s:Reflect.get(q(n,r)&&r in s?n:s,r,i)}const kl={get:Yr(!1,!1)},Ol={get:Yr(!1,!0)},xl={get:Yr(!0,!1)};const aa=new WeakMap,ca=new WeakMap,la=new WeakMap,Nl=new WeakMap;function Dl(t){switch(t){case"Object":case"Array":return 1;case"Map":case"Set":case"WeakMap":case"WeakSet":return 2;default:return 0}}function Ll(t){return t.__v_skip||!Object.isExtensible(t)?0:Dl(ol(t))}function Bs(t){return Nt(t)?t:Xr(t,!1,Tl,kl,aa)}function ua(t){return Xr(t,!1,Rl,Ol,ca)}function da(t){return Xr(t,!0,Cl,xl,la)}function Xr(t,e,n,s,r){if(!se(t)||t.__v_raw&&!(e&&t.__v_isReactive))return t;const i=Ll(t);if(i===0)return t;const o=r.get(t);if(o)return o;const c=new Proxy(t,i===2?s:n);return r.set(t,c),c}function on(t){return Nt(t)?on(t.__v_raw):!!(t&&t.__v_isReactive)}function Nt(t){return!!(t&&t.__v_isReadonly)}function Ae(t){return!!(t&&t.__v_isShallow)}function Qr(t){return t?!!t.__v_raw:!1}function z(t){const e=t&&t.__v_raw;return e?z(e):t}function Ml(t){return!q(t,"__v_skip")&&Object.isExtensible(t)&&_r(t,"__v_skip",!0),t}const ue=t=>se(t)?Bs(t):t,bs=t=>se(t)?da(t):t;function he(t){return t?t.__v_isRef===!0:!1}function ke(t){return fa(t,!1)}function Ul(t){return fa(t,!0)}function fa(t,e){return he(t)?t:new $l(t,e)}class $l{constructor(e,n){this.dep=new Jr,this.__v_isRef=!0,this.__v_isShallow=!1,this._rawValue=n?e:z(e),this._value=n?e:ue(e),this.__v_isShallow=n}get value(){return this.dep.track(),this._value}set value(e){const n=this._rawValue,s=this.__v_isShallow||Ae(e)||Nt(e);e=s?e:z(e),Pt(e,n)&&(this._rawValue=e,this._value=s?e:ue(e),this.dep.trigger())}}function Kt(t){return he(t)?t.value:t}const Fl={get:(t,e,n)=>e==="__v_raw"?t:Kt(Reflect.get(t,e,n)),set:(t,e,n,s)=>{const r=t[e];return he(r)&&!he(n)?(r.value=n,!0):Reflect.set(t,e,n,s)}};function ha(t){return on(t)?t:new Proxy(t,Fl)}class Hl{constructor(e,n,s){this.fn=e,this.setter=n,this._value=void 0,this.dep=new Jr(this),this.__v_isRef=!0,this.deps=void 0,this.depsTail=void 0,this.flags=16,this.globalVersion=Hn-1,this.next=void 0,this.effect=this,this.__v_isReadonly=!n,this.isSSR=s}notify(){if(this.flags|=16,!(this.flags&8)&&ee!==this)return Qo(this,!0),!0}get value(){const e=this.dep.track();return ta(this),e&&(e.version=this.dep.version),this._value}set value(e){this.setter&&this.setter(e)}}function Bl(t,e,n=!1){let s,r;return V(t)?s=t:(s=t.get,r=t.set),new Hl(s,r,n)}const ls={},ws=new WeakMap;let Vt;function Vl(t,e=!1,n=Vt){if(n){let s=ws.get(n);s||ws.set(n,s=[]),s.push(t)}}function jl(t,e,n=te){const{immediate:s,deep:r,once:i,scheduler:o,augmentJob:c,call:a}=n,l=D=>r?D:Ae(D)||r===!1||r===0?It(D,1):It(D);let u,f,p,g,S=!1,k=!1;if(he(t)?(f=()=>t.value,S=Ae(t)):on(t)?(f=()=>l(t),S=!0):B(t)?(k=!0,S=t.some(D=>on(D)||Ae(D)),f=()=>t.map(D=>{if(he(D))return D.value;if(on(D))return l(D);if(V(D))return a?a(D,2):D()})):V(t)?e?f=a?()=>a(t,2):t:f=()=>{if(p){lt();try{p()}finally{ut()}}const D=Vt;Vt=u;try{return a?a(t,3,[g]):t(g)}finally{Vt=D}}:f=Ge,e&&r){const D=f,Y=r===!0?1/0:r;f=()=>It(D(),Y)}const F=vl(),P=()=>{u.stop(),F&&F.active&&Wr(F.effects,u)};if(i&&e){const D=e;e=(...Y)=>{D(...Y),P()}}let E=k?new Array(t.length).fill(ls):ls;const x=D=>{if(!(!(u.flags&1)||!u.dirty&&!D))if(e){const Y=u.run();if(r||S||(k?Y.some((le,re)=>Pt(le,E[re])):Pt(Y,E))){p&&p();const le=Vt;Vt=u;try{const re=[Y,E===ls?void 0:k&&E[0]===ls?[]:E,g];E=Y,a?a(e,3,re):e(...re)}finally{Vt=le}}}else u.run()};return c&&c(x),u=new Yo(f),u.scheduler=o?()=>o(x,!1):x,g=D=>Vl(D,!1,u),p=u.onStop=()=>{const D=ws.get(u);if(D){if(a)a(D,4);else for(const Y of D)Y();ws.delete(u)}},e?s?x(!0):E=u.run():o?o(x.bind(null,!0),!0):u.run(),P.pause=u.pause.bind(u),P.resume=u.resume.bind(u),P.stop=P,P}function It(t,e=1/0,n){if(e<=0||!se(t)||t.__v_skip||(n=n||new Set,n.has(t)))return t;if(n.add(t),e--,he(t))It(t.value,e,n);else if(B(t))for(let s=0;s<t.length;s++)It(t[s],e,n);else if(jo(t)||rn(t))t.forEach(s=>{It(s,e,n)});else if(zo(t)){for(const s in t)It(t[s],e,n);for(const s of Object.getOwnPropertySymbols(t))Object.prototype.propertyIsEnumerable.call(t,s)&&It(t[s],e,n)}return t}/**
* @vue/runtime-core v3.5.17
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/function Xn(t,e,n,s){try{return s?t(...s):t()}catch(r){Vs(r,e,n)}}function Xe(t,e,n,s){if(V(t)){const r=Xn(t,e,n,s);return r&&Wo(r)&&r.catch(i=>{Vs(i,e,n)}),r}if(B(t)){const r=[];for(let i=0;i<t.length;i++)r.push(Xe(t[i],e,n,s));return r}}function Vs(t,e,n,s=!0){const r=e?e.vnode:null,{errorHandler:i,throwUnhandledErrorInProduction:o}=e&&e.appContext.config||te;if(e){let c=e.parent;const a=e.proxy,l=`https://vuejs.org/error-reference/#runtime-${n}`;for(;c;){const u=c.ec;if(u){for(let f=0;f<u.length;f++)if(u[f](t,a,l)===!1)return}c=c.parent}if(i){lt(),Xn(i,null,10,[t,a,l]),ut();return}}Wl(t,n,r,s,o)}function Wl(t,e,n,s=!0,r=!1){if(r)throw t;console.error(t)}const ge=[];let ze=-1;const an=[];let bt=null,Zt=0;const pa=Promise.resolve();let Es=null;function ma(t){const e=Es||pa;return t?e.then(this?t.bind(this):t):e}function Kl(t){let e=ze+1,n=ge.length;for(;e<n;){const s=e+n>>>1,r=ge[s],i=Vn(r);i<t||i===t&&r.flags&2?e=s+1:n=s}return e}function Zr(t){if(!(t.flags&1)){const e=Vn(t),n=ge[ge.length-1];!n||!(t.flags&2)&&e>=Vn(n)?ge.push(t):ge.splice(Kl(e),0,t),t.flags|=1,ga()}}function ga(){Es||(Es=pa.then(_a))}function zl(t){B(t)?an.push(...t):bt&&t.id===-1?bt.splice(Zt+1,0,t):t.flags&1||(an.push(t),t.flags|=1),ga()}function Ei(t,e,n=ze+1){for(;n<ge.length;n++){const s=ge[n];if(s&&s.flags&2){if(t&&s.id!==t.uid)continue;ge.splice(n,1),n--,s.flags&4&&(s.flags&=-2),s(),s.flags&4||(s.flags&=-2)}}}function va(t){if(an.length){const e=[...new Set(an)].sort((n,s)=>Vn(n)-Vn(s));if(an.length=0,bt){bt.push(...e);return}for(bt=e,Zt=0;Zt<bt.length;Zt++){const n=bt[Zt];n.flags&4&&(n.flags&=-2),n.flags&8||n(),n.flags&=-2}bt=null,Zt=0}}const Vn=t=>t.id==null?t.flags&2?-1:1/0:t.id;function _a(t){try{for(ze=0;ze<ge.length;ze++){const e=ge[ze];e&&!(e.flags&8)&&(e.flags&4&&(e.flags&=-2),Xn(e,e.i,e.i?15:14),e.flags&4||(e.flags&=-2))}}finally{for(;ze<ge.length;ze++){const e=ge[ze];e&&(e.flags&=-2)}ze=-1,ge.length=0,va(),Es=null,(ge.length||an.length)&&_a()}}let Ne=null,ya=null;function Is(t){const e=Ne;return Ne=t,ya=t&&t.type.__scopeId||null,e}function ql(t,e=Ne,n){if(!e||t._n)return t;const s=(...r)=>{s._d&&xi(-1);const i=Is(e);let o;try{o=t(...r)}finally{Is(i),s._d&&xi(1)}return o};return s._n=!0,s._c=!0,s._d=!0,s}function Ht(t,e,n,s){const r=t.dirs,i=e&&e.dirs;for(let o=0;o<r.length;o++){const c=r[o];i&&(c.oldValue=i[o].value);let a=c.dir[s];a&&(lt(),Xe(a,n,8,[t.el,c,t,e]),ut())}}const Gl=Symbol("_vte"),Jl=t=>t.__isTeleport;function ei(t,e){t.shapeFlag&6&&t.component?(t.transition=e,ei(t.component.subTree,e)):t.shapeFlag&128?(t.ssContent.transition=e.clone(t.ssContent),t.ssFallback.transition=e.clone(t.ssFallback)):t.transition=e}/*! #__NO_SIDE_EFFECTS__ */function ba(t,e){return V(t)?pe({name:t.name},e,{setup:t}):t}function wa(t){t.ids=[t.ids[0]+t.ids[2]+++"-",0,0]}function xn(t,e,n,s,r=!1){if(B(t)){t.forEach((S,k)=>xn(S,e&&(B(e)?e[k]:e),n,s,r));return}if(Nn(s)&&!r){s.shapeFlag&512&&s.type.__asyncResolved&&s.component.subTree.component&&xn(t,e,n,s.component.subTree);return}const i=s.shapeFlag&4?ri(s.component):s.el,o=r?null:i,{i:c,r:a}=t,l=e&&e.r,u=c.refs===te?c.refs={}:c.refs,f=c.setupState,p=z(f),g=f===te?()=>!1:S=>q(p,S);if(l!=null&&l!==a&&(ae(l)?(u[l]=null,g(l)&&(f[l]=null)):he(l)&&(l.value=null)),V(a))Xn(a,c,12,[o,u]);else{const S=ae(a),k=he(a);if(S||k){const F=()=>{if(t.f){const P=S?g(a)?f[a]:u[a]:a.value;r?B(P)&&Wr(P,i):B(P)?P.includes(i)||P.push(i):S?(u[a]=[i],g(a)&&(f[a]=u[a])):(a.value=[i],t.k&&(u[t.k]=a.value))}else S?(u[a]=o,g(a)&&(f[a]=o)):k&&(a.value=o,t.k&&(u[t.k]=o))};o?(F.id=-1,Ie(F,n)):F()}}}$s().requestIdleCallback;$s().cancelIdleCallback;const Nn=t=>!!t.type.__asyncLoader,Ea=t=>t.type.__isKeepAlive;function Yl(t,e){Ia(t,"a",e)}function Xl(t,e){Ia(t,"da",e)}function Ia(t,e,n=fe){const s=t.__wdc||(t.__wdc=()=>{let r=n;for(;r;){if(r.isDeactivated)return;r=r.parent}return t()});if(js(e,s,n),n){let r=n.parent;for(;r&&r.parent;)Ea(r.parent.vnode)&&Ql(s,e,n,r),r=r.parent}}function Ql(t,e,n,s){const r=js(e,t,s,!0);Sa(()=>{Wr(s[e],r)},n)}function js(t,e,n=fe,s=!1){if(n){const r=n[t]||(n[t]=[]),i=e.__weh||(e.__weh=(...o)=>{lt();const c=Qn(n),a=Xe(e,n,t,o);return c(),ut(),a});return s?r.unshift(i):r.push(i),i}}const ht=t=>(e,n=fe)=>{(!Kn||t==="sp")&&js(t,(...s)=>e(...s),n)},Zl=ht("bm"),eu=ht("m"),tu=ht("bu"),nu=ht("u"),su=ht("bum"),Sa=ht("um"),ru=ht("sp"),iu=ht("rtg"),ou=ht("rtc");function au(t,e=fe){js("ec",t,e)}const cu="components";function lu(t,e){return du(cu,t,!0,e)||t}const uu=Symbol.for("v-ndc");function du(t,e,n=!0,s=!1){const r=Ne||fe;if(r){const i=r.type;{const c=Xu(i,!1);if(c&&(c===e||c===Pe(e)||c===Us(Pe(e))))return i}const o=Ii(r[t]||i[t],e)||Ii(r.appContext[t],e);return!o&&s?i:o}}function Ii(t,e){return t&&(t[e]||t[Pe(e)]||t[Us(Pe(e))])}function Ir(t,e,n,s){let r;const i=n,o=B(t);if(o||ae(t)){const c=o&&on(t);let a=!1,l=!1;c&&(a=!Ae(t),l=Nt(t),t=Hs(t)),r=new Array(t.length);for(let u=0,f=t.length;u<f;u++)r[u]=e(a?l?bs(ue(t[u])):ue(t[u]):t[u],u,void 0,i)}else if(typeof t=="number"){r=new Array(t);for(let c=0;c<t;c++)r[c]=e(c+1,c,void 0,i)}else if(se(t))if(t[Symbol.iterator])r=Array.from(t,(c,a)=>e(c,a,void 0,i));else{const c=Object.keys(t);r=new Array(c.length);for(let a=0,l=c.length;a<l;a++){const u=c[a];r[a]=e(t[u],u,a,i)}}else r=[];return r}const Sr=t=>t?Ka(t)?ri(t):Sr(t.parent):null,Dn=pe(Object.create(null),{$:t=>t,$el:t=>t.vnode.el,$data:t=>t.data,$props:t=>t.props,$attrs:t=>t.attrs,$slots:t=>t.slots,$refs:t=>t.refs,$parent:t=>Sr(t.parent),$root:t=>Sr(t.root),$host:t=>t.ce,$emit:t=>t.emit,$options:t=>Ca(t),$forceUpdate:t=>t.f||(t.f=()=>{Zr(t.update)}),$nextTick:t=>t.n||(t.n=ma.bind(t.proxy)),$watch:t=>xu.bind(t)}),sr=(t,e)=>t!==te&&!t.__isScriptSetup&&q(t,e),fu={get({_:t},e){if(e==="__v_skip")return!0;const{ctx:n,setupState:s,data:r,props:i,accessCache:o,type:c,appContext:a}=t;let l;if(e[0]!=="$"){const g=o[e];if(g!==void 0)switch(g){case 1:return s[e];case 2:return r[e];case 4:return n[e];case 3:return i[e]}else{if(sr(s,e))return o[e]=1,s[e];if(r!==te&&q(r,e))return o[e]=2,r[e];if((l=t.propsOptions[0])&&q(l,e))return o[e]=3,i[e];if(n!==te&&q(n,e))return o[e]=4,n[e];Tr&&(o[e]=0)}}const u=Dn[e];let f,p;if(u)return e==="$attrs"&&de(t.attrs,"get",""),u(t);if((f=c.__cssModules)&&(f=f[e]))return f;if(n!==te&&q(n,e))return o[e]=4,n[e];if(p=a.config.globalProperties,q(p,e))return p[e]},set({_:t},e,n){const{data:s,setupState:r,ctx:i}=t;return sr(r,e)?(r[e]=n,!0):s!==te&&q(s,e)?(s[e]=n,!0):q(t.props,e)||e[0]==="$"&&e.slice(1)in t?!1:(i[e]=n,!0)},has({_:{data:t,setupState:e,accessCache:n,ctx:s,appContext:r,propsOptions:i}},o){let c;return!!n[o]||t!==te&&q(t,o)||sr(e,o)||(c=i[0])&&q(c,o)||q(s,o)||q(Dn,o)||q(r.config.globalProperties,o)},defineProperty(t,e,n){return n.get!=null?t._.accessCache[e]=0:q(n,"value")&&this.set(t,e,n.value,null),Reflect.defineProperty(t,e,n)}};function Si(t){return B(t)?t.reduce((e,n)=>(e[n]=null,e),{}):t}let Tr=!0;function hu(t){const e=Ca(t),n=t.proxy,s=t.ctx;Tr=!1,e.beforeCreate&&Ti(e.beforeCreate,t,"bc");const{data:r,computed:i,methods:o,watch:c,provide:a,inject:l,created:u,beforeMount:f,mounted:p,beforeUpdate:g,updated:S,activated:k,deactivated:F,beforeDestroy:P,beforeUnmount:E,destroyed:x,unmounted:D,render:Y,renderTracked:le,renderTriggered:re,errorCaptured:$e,serverPrefetch:mt,expose:Fe,inheritAttrs:gt,components:Ft,directives:He,filters:bn}=e;if(l&&pu(l,s,null),o)for(const J in o){const W=o[J];V(W)&&(s[J]=W.bind(n))}if(r){const J=r.call(n,n);se(J)&&(t.data=Bs(J))}if(Tr=!0,i)for(const J in i){const W=i[J],et=V(W)?W.bind(n,n):V(W.get)?W.get.bind(n,n):Ge,vt=!V(W)&&V(W.set)?W.set.bind(n):Ge,Be=Re({get:et,set:vt});Object.defineProperty(s,J,{enumerable:!0,configurable:!0,get:()=>Be.value,set:_e=>Be.value=_e})}if(c)for(const J in c)Ta(c[J],s,n,J);if(a){const J=V(a)?a.call(n):a;Reflect.ownKeys(J).forEach(W=>{ds(W,J[W])})}u&&Ti(u,t,"c");function ce(J,W){B(W)?W.forEach(et=>J(et.bind(n))):W&&J(W.bind(n))}if(ce(Zl,f),ce(eu,p),ce(tu,g),ce(nu,S),ce(Yl,k),ce(Xl,F),ce(au,$e),ce(ou,le),ce(iu,re),ce(su,E),ce(Sa,D),ce(ru,mt),B(Fe))if(Fe.length){const J=t.exposed||(t.exposed={});Fe.forEach(W=>{Object.defineProperty(J,W,{get:()=>n[W],set:et=>n[W]=et})})}else t.exposed||(t.exposed={});Y&&t.render===Ge&&(t.render=Y),gt!=null&&(t.inheritAttrs=gt),Ft&&(t.components=Ft),He&&(t.directives=He),mt&&wa(t)}function pu(t,e,n=Ge){B(t)&&(t=Cr(t));for(const s in t){const r=t[s];let i;se(r)?"default"in r?i=at(r.from||s,r.default,!0):i=at(r.from||s):i=at(r),he(i)?Object.defineProperty(e,s,{enumerable:!0,configurable:!0,get:()=>i.value,set:o=>i.value=o}):e[s]=i}}function Ti(t,e,n){Xe(B(t)?t.map(s=>s.bind(e.proxy)):t.bind(e.proxy),e,n)}function Ta(t,e,n,s){let r=s.includes(".")?Fa(n,s):()=>n[s];if(ae(t)){const i=e[t];V(i)&&fs(r,i)}else if(V(t))fs(r,t.bind(n));else if(se(t))if(B(t))t.forEach(i=>Ta(i,e,n,s));else{const i=V(t.handler)?t.handler.bind(n):e[t.handler];V(i)&&fs(r,i,t)}}function Ca(t){const e=t.type,{mixins:n,extends:s}=e,{mixins:r,optionsCache:i,config:{optionMergeStrategies:o}}=t.appContext,c=i.get(e);let a;return c?a=c:!r.length&&!n&&!s?a=e:(a={},r.length&&r.forEach(l=>Ss(a,l,o,!0)),Ss(a,e,o)),se(e)&&i.set(e,a),a}function Ss(t,e,n,s=!1){const{mixins:r,extends:i}=e;i&&Ss(t,i,n,!0),r&&r.forEach(o=>Ss(t,o,n,!0));for(const o in e)if(!(s&&o==="expose")){const c=mu[o]||n&&n[o];t[o]=c?c(t[o],e[o]):e[o]}return t}const mu={data:Ci,props:Ri,emits:Ri,methods:Cn,computed:Cn,beforeCreate:me,created:me,beforeMount:me,mounted:me,beforeUpdate:me,updated:me,beforeDestroy:me,beforeUnmount:me,destroyed:me,unmounted:me,activated:me,deactivated:me,errorCaptured:me,serverPrefetch:me,components:Cn,directives:Cn,watch:vu,provide:Ci,inject:gu};function Ci(t,e){return e?t?function(){return pe(V(t)?t.call(this,this):t,V(e)?e.call(this,this):e)}:e:t}function gu(t,e){return Cn(Cr(t),Cr(e))}function Cr(t){if(B(t)){const e={};for(let n=0;n<t.length;n++)e[t[n]]=t[n];return e}return t}function me(t,e){return t?[...new Set([].concat(t,e))]:e}function Cn(t,e){return t?pe(Object.create(null),t,e):e}function Ri(t,e){return t?B(t)&&B(e)?[...new Set([...t,...e])]:pe(Object.create(null),Si(t),Si(e??{})):e}function vu(t,e){if(!t)return e;if(!e)return t;const n=pe(Object.create(null),t);for(const s in e)n[s]=me(t[s],e[s]);return n}function Ra(){return{app:null,config:{isNativeTag:rl,performance:!1,globalProperties:{},optionMergeStrategies:{},errorHandler:void 0,warnHandler:void 0,compilerOptions:{}},mixins:[],components:{},directives:{},provides:Object.create(null),optionsCache:new WeakMap,propsCache:new WeakMap,emitsCache:new WeakMap}}let _u=0;function yu(t,e){return function(s,r=null){V(s)||(s=pe({},s)),r!=null&&!se(r)&&(r=null);const i=Ra(),o=new WeakSet,c=[];let a=!1;const l=i.app={_uid:_u++,_component:s,_props:r,_container:null,_context:i,_instance:null,version:Zu,get config(){return i.config},set config(u){},use(u,...f){return o.has(u)||(u&&V(u.install)?(o.add(u),u.install(l,...f)):V(u)&&(o.add(u),u(l,...f))),l},mixin(u){return i.mixins.includes(u)||i.mixins.push(u),l},component(u,f){return f?(i.components[u]=f,l):i.components[u]},directive(u,f){return f?(i.directives[u]=f,l):i.directives[u]},mount(u,f,p){if(!a){const g=l._ceVNode||oe(s,r);return g.appContext=i,p===!0?p="svg":p===!1&&(p=void 0),t(g,u,p),a=!0,l._container=u,u.__vue_app__=l,ri(g.component)}},onUnmount(u){c.push(u)},unmount(){a&&(Xe(c,l._instance,16),t(null,l._container),delete l._container.__vue_app__)},provide(u,f){return i.provides[u]=f,l},runWithContext(u){const f=cn;cn=l;try{return u()}finally{cn=f}}};return l}}let cn=null;function ds(t,e){if(fe){let n=fe.provides;const s=fe.parent&&fe.parent.provides;s===n&&(n=fe.provides=Object.create(s)),n[t]=e}}function at(t,e,n=!1){const s=fe||Ne;if(s||cn){let r=cn?cn._context.provides:s?s.parent==null||s.ce?s.vnode.appContext&&s.vnode.appContext.provides:s.parent.provides:void 0;if(r&&t in r)return r[t];if(arguments.length>1)return n&&V(e)?e.call(s&&s.proxy):e}}const Aa={},Pa=()=>Object.create(Aa),ka=t=>Object.getPrototypeOf(t)===Aa;function bu(t,e,n,s=!1){const r={},i=Pa();t.propsDefaults=Object.create(null),Oa(t,e,r,i);for(const o in t.propsOptions[0])o in r||(r[o]=void 0);n?t.props=s?r:ua(r):t.type.props?t.props=r:t.props=i,t.attrs=i}function wu(t,e,n,s){const{props:r,attrs:i,vnode:{patchFlag:o}}=t,c=z(r),[a]=t.propsOptions;let l=!1;if((s||o>0)&&!(o&16)){if(o&8){const u=t.vnode.dynamicProps;for(let f=0;f<u.length;f++){let p=u[f];if(Ws(t.emitsOptions,p))continue;const g=e[p];if(a)if(q(i,p))g!==i[p]&&(i[p]=g,l=!0);else{const S=Pe(p);r[S]=Rr(a,c,S,g,t,!1)}else g!==i[p]&&(i[p]=g,l=!0)}}}else{Oa(t,e,r,i)&&(l=!0);let u;for(const f in c)(!e||!q(e,f)&&((u=Mt(f))===f||!q(e,u)))&&(a?n&&(n[f]!==void 0||n[u]!==void 0)&&(r[f]=Rr(a,c,f,void 0,t,!0)):delete r[f]);if(i!==c)for(const f in i)(!e||!q(e,f))&&(delete i[f],l=!0)}l&&rt(t.attrs,"set","")}function Oa(t,e,n,s){const[r,i]=t.propsOptions;let o=!1,c;if(e)for(let a in e){if(Pn(a))continue;const l=e[a];let u;r&&q(r,u=Pe(a))?!i||!i.includes(u)?n[u]=l:(c||(c={}))[u]=l:Ws(t.emitsOptions,a)||(!(a in s)||l!==s[a])&&(s[a]=l,o=!0)}if(i){const a=z(n),l=c||te;for(let u=0;u<i.length;u++){const f=i[u];n[f]=Rr(r,a,f,l[f],t,!q(l,f))}}return o}function Rr(t,e,n,s,r,i){const o=t[n];if(o!=null){const c=q(o,"default");if(c&&s===void 0){const a=o.default;if(o.type!==Function&&!o.skipFactory&&V(a)){const{propsDefaults:l}=r;if(n in l)s=l[n];else{const u=Qn(r);s=l[n]=a.call(null,e),u()}}else s=a;r.ce&&r.ce._setProp(n,s)}o[0]&&(i&&!c?s=!1:o[1]&&(s===""||s===Mt(n))&&(s=!0))}return s}const Eu=new WeakMap;function xa(t,e,n=!1){const s=n?Eu:e.propsCache,r=s.get(t);if(r)return r;const i=t.props,o={},c=[];let a=!1;if(!V(t)){const u=f=>{a=!0;const[p,g]=xa(f,e,!0);pe(o,p),g&&c.push(...g)};!n&&e.mixins.length&&e.mixins.forEach(u),t.extends&&u(t.extends),t.mixins&&t.mixins.forEach(u)}if(!i&&!a)return se(t)&&s.set(t,sn),sn;if(B(i))for(let u=0;u<i.length;u++){const f=Pe(i[u]);Ai(f)&&(o[f]=te)}else if(i)for(const u in i){const f=Pe(u);if(Ai(f)){const p=i[u],g=o[f]=B(p)||V(p)?{type:p}:pe({},p),S=g.type;let k=!1,F=!0;if(B(S))for(let P=0;P<S.length;++P){const E=S[P],x=V(E)&&E.name;if(x==="Boolean"){k=!0;break}else x==="String"&&(F=!1)}else k=V(S)&&S.name==="Boolean";g[0]=k,g[1]=F,(k||q(g,"default"))&&c.push(f)}}const l=[o,c];return se(t)&&s.set(t,l),l}function Ai(t){return t[0]!=="$"&&!Pn(t)}const ti=t=>t[0]==="_"||t==="$stable",ni=t=>B(t)?t.map(qe):[qe(t)],Iu=(t,e,n)=>{if(e._n)return e;const s=ql((...r)=>ni(e(...r)),n);return s._c=!1,s},Na=(t,e,n)=>{const s=t._ctx;for(const r in t){if(ti(r))continue;const i=t[r];if(V(i))e[r]=Iu(r,i,s);else if(i!=null){const o=ni(i);e[r]=()=>o}}},Da=(t,e)=>{const n=ni(e);t.slots.default=()=>n},La=(t,e,n)=>{for(const s in e)(n||!ti(s))&&(t[s]=e[s])},Su=(t,e,n)=>{const s=t.slots=Pa();if(t.vnode.shapeFlag&32){const r=e.__;r&&_r(s,"__",r,!0);const i=e._;i?(La(s,e,n),n&&_r(s,"_",i,!0)):Na(e,s)}else e&&Da(t,e)},Tu=(t,e,n)=>{const{vnode:s,slots:r}=t;let i=!0,o=te;if(s.shapeFlag&32){const c=e._;c?n&&c===1?i=!1:La(r,e,n):(i=!e.$stable,Na(e,r)),o=e}else e&&(Da(t,e),o={default:1});if(i)for(const c in r)!ti(c)&&o[c]==null&&delete r[c]},Ie=Fu;function Cu(t){return Ru(t)}function Ru(t,e){const n=$s();n.__VUE__=!0;const{insert:s,remove:r,patchProp:i,createElement:o,createText:c,createComment:a,setText:l,setElementText:u,parentNode:f,nextSibling:p,setScopeId:g=Ge,insertStaticContent:S}=t,k=(d,h,m,v=null,b=null,y=null,C=void 0,T=null,I=!!h.dynamicChildren)=>{if(d===h)return;d&&!In(d,h)&&(v=_(d),_e(d,b,y,!0),d=null),h.patchFlag===-2&&(I=!1,h.dynamicChildren=null);const{type:w,ref:$,shapeFlag:A}=h;switch(w){case Ks:F(d,h,m,v);break;case Dt:P(d,h,m,v);break;case hs:d==null&&E(h,m,v,C);break;case Ce:Ft(d,h,m,v,b,y,C,T,I);break;default:A&1?Y(d,h,m,v,b,y,C,T,I):A&6?He(d,h,m,v,b,y,C,T,I):(A&64||A&128)&&w.process(d,h,m,v,b,y,C,T,I,L)}$!=null&&b?xn($,d&&d.ref,y,h||d,!h):$==null&&d&&d.ref!=null&&xn(d.ref,null,y,d,!0)},F=(d,h,m,v)=>{if(d==null)s(h.el=c(h.children),m,v);else{const b=h.el=d.el;h.children!==d.children&&l(b,h.children)}},P=(d,h,m,v)=>{d==null?s(h.el=a(h.children||""),m,v):h.el=d.el},E=(d,h,m,v)=>{[d.el,d.anchor]=S(d.children,h,m,v,d.el,d.anchor)},x=({el:d,anchor:h},m,v)=>{let b;for(;d&&d!==h;)b=p(d),s(d,m,v),d=b;s(h,m,v)},D=({el:d,anchor:h})=>{let m;for(;d&&d!==h;)m=p(d),r(d),d=m;r(h)},Y=(d,h,m,v,b,y,C,T,I)=>{h.type==="svg"?C="svg":h.type==="math"&&(C="mathml"),d==null?le(h,m,v,b,y,C,T,I):mt(d,h,b,y,C,T,I)},le=(d,h,m,v,b,y,C,T)=>{let I,w;const{props:$,shapeFlag:A,transition:M,dirs:H}=d;if(I=d.el=o(d.type,y,$&&$.is,$),A&8?u(I,d.children):A&16&&$e(d.children,I,null,v,b,rr(d,y),C,T),H&&Ht(d,null,v,"created"),re(I,d,d.scopeId,C,v),$){for(const Z in $)Z!=="value"&&!Pn(Z)&&i(I,Z,null,$[Z],y,v);"value"in $&&i(I,"value",null,$.value,y),(w=$.onVnodeBeforeMount)&&Ke(w,v,d)}H&&Ht(d,null,v,"beforeMount");const j=Au(b,M);j&&M.beforeEnter(I),s(I,h,m),((w=$&&$.onVnodeMounted)||j||H)&&Ie(()=>{w&&Ke(w,v,d),j&&M.enter(I),H&&Ht(d,null,v,"mounted")},b)},re=(d,h,m,v,b)=>{if(m&&g(d,m),v)for(let y=0;y<v.length;y++)g(d,v[y]);if(b){let y=b.subTree;if(h===y||Ba(y.type)&&(y.ssContent===h||y.ssFallback===h)){const C=b.vnode;re(d,C,C.scopeId,C.slotScopeIds,b.parent)}}},$e=(d,h,m,v,b,y,C,T,I=0)=>{for(let w=I;w<d.length;w++){const $=d[w]=T?wt(d[w]):qe(d[w]);k(null,$,h,m,v,b,y,C,T)}},mt=(d,h,m,v,b,y,C)=>{const T=h.el=d.el;let{patchFlag:I,dynamicChildren:w,dirs:$}=h;I|=d.patchFlag&16;const A=d.props||te,M=h.props||te;let H;if(m&&Bt(m,!1),(H=M.onVnodeBeforeUpdate)&&Ke(H,m,h,d),$&&Ht(h,d,m,"beforeUpdate"),m&&Bt(m,!0),(A.innerHTML&&M.innerHTML==null||A.textContent&&M.textContent==null)&&u(T,""),w?Fe(d.dynamicChildren,w,T,m,v,rr(h,b),y):C||W(d,h,T,null,m,v,rr(h,b),y,!1),I>0){if(I&16)gt(T,A,M,m,b);else if(I&2&&A.class!==M.class&&i(T,"class",null,M.class,b),I&4&&i(T,"style",A.style,M.style,b),I&8){const j=h.dynamicProps;for(let Z=0;Z<j.length;Z++){const G=j[Z],ye=A[G],be=M[G];(be!==ye||G==="value")&&i(T,G,ye,be,b,m)}}I&1&&d.children!==h.children&&u(T,h.children)}else!C&&w==null&&gt(T,A,M,m,b);((H=M.onVnodeUpdated)||$)&&Ie(()=>{H&&Ke(H,m,h,d),$&&Ht(h,d,m,"updated")},v)},Fe=(d,h,m,v,b,y,C)=>{for(let T=0;T<h.length;T++){const I=d[T],w=h[T],$=I.el&&(I.type===Ce||!In(I,w)||I.shapeFlag&198)?f(I.el):m;k(I,w,$,null,v,b,y,C,!0)}},gt=(d,h,m,v,b)=>{if(h!==m){if(h!==te)for(const y in h)!Pn(y)&&!(y in m)&&i(d,y,h[y],null,b,v);for(const y in m){if(Pn(y))continue;const C=m[y],T=h[y];C!==T&&y!=="value"&&i(d,y,T,C,b,v)}"value"in m&&i(d,"value",h.value,m.value,b)}},Ft=(d,h,m,v,b,y,C,T,I)=>{const w=h.el=d?d.el:c(""),$=h.anchor=d?d.anchor:c("");let{patchFlag:A,dynamicChildren:M,slotScopeIds:H}=h;H&&(T=T?T.concat(H):H),d==null?(s(w,m,v),s($,m,v),$e(h.children||[],m,$,b,y,C,T,I)):A>0&&A&64&&M&&d.dynamicChildren?(Fe(d.dynamicChildren,M,m,b,y,C,T),(h.key!=null||b&&h===b.subTree)&&Ma(d,h,!0)):W(d,h,m,$,b,y,C,T,I)},He=(d,h,m,v,b,y,C,T,I)=>{h.slotScopeIds=T,d==null?h.shapeFlag&512?b.ctx.activate(h,m,v,C,I):bn(h,m,v,b,y,C,I):Jt(d,h,I)},bn=(d,h,m,v,b,y,C)=>{const T=d.component=zu(d,v,b);if(Ea(d)&&(T.ctx.renderer=L),qu(T,!1,C),T.asyncDep){if(b&&b.registerDep(T,ce,C),!d.el){const I=T.subTree=oe(Dt);P(null,I,h,m)}}else ce(T,d,h,m,b,y,C)},Jt=(d,h,m)=>{const v=h.component=d.component;if(Uu(d,h,m))if(v.asyncDep&&!v.asyncResolved){J(v,h,m);return}else v.next=h,v.update();else h.el=d.el,v.vnode=h},ce=(d,h,m,v,b,y,C)=>{const T=()=>{if(d.isMounted){let{next:A,bu:M,u:H,parent:j,vnode:Z}=d;{const je=Ua(d);if(je){A&&(A.el=Z.el,J(d,A,C)),je.asyncDep.then(()=>{d.isUnmounted||T()});return}}let G=A,ye;Bt(d,!1),A?(A.el=Z.el,J(d,A,C)):A=Z,M&&Qs(M),(ye=A.props&&A.props.onVnodeBeforeUpdate)&&Ke(ye,j,A,Z),Bt(d,!0);const be=ki(d),Ve=d.subTree;d.subTree=be,k(Ve,be,f(Ve.el),_(Ve),d,b,y),A.el=be.el,G===null&&$u(d,be.el),H&&Ie(H,b),(ye=A.props&&A.props.onVnodeUpdated)&&Ie(()=>Ke(ye,j,A,Z),b)}else{let A;const{el:M,props:H}=h,{bm:j,m:Z,parent:G,root:ye,type:be}=d,Ve=Nn(h);Bt(d,!1),j&&Qs(j),!Ve&&(A=H&&H.onVnodeBeforeMount)&&Ke(A,G,h),Bt(d,!0);{ye.ce&&ye.ce._def.shadowRoot!==!1&&ye.ce._injectChildStyle(be);const je=d.subTree=ki(d);k(null,je,m,v,d,b,y),h.el=je.el}if(Z&&Ie(Z,b),!Ve&&(A=H&&H.onVnodeMounted)){const je=h;Ie(()=>Ke(A,G,je),b)}(h.shapeFlag&256||G&&Nn(G.vnode)&&G.vnode.shapeFlag&256)&&d.a&&Ie(d.a,b),d.isMounted=!0,h=m=v=null}};d.scope.on();const I=d.effect=new Yo(T);d.scope.off();const w=d.update=I.run.bind(I),$=d.job=I.runIfDirty.bind(I);$.i=d,$.id=d.uid,I.scheduler=()=>Zr($),Bt(d,!0),w()},J=(d,h,m)=>{h.component=d;const v=d.vnode.props;d.vnode=h,d.next=null,wu(d,h.props,v,m),Tu(d,h.children,m),lt(),Ei(d),ut()},W=(d,h,m,v,b,y,C,T,I=!1)=>{const w=d&&d.children,$=d?d.shapeFlag:0,A=h.children,{patchFlag:M,shapeFlag:H}=h;if(M>0){if(M&128){vt(w,A,m,v,b,y,C,T,I);return}else if(M&256){et(w,A,m,v,b,y,C,T,I);return}}H&8?($&16&&Te(w,b,y),A!==w&&u(m,A)):$&16?H&16?vt(w,A,m,v,b,y,C,T,I):Te(w,b,y,!0):($&8&&u(m,""),H&16&&$e(A,m,v,b,y,C,T,I))},et=(d,h,m,v,b,y,C,T,I)=>{d=d||sn,h=h||sn;const w=d.length,$=h.length,A=Math.min(w,$);let M;for(M=0;M<A;M++){const H=h[M]=I?wt(h[M]):qe(h[M]);k(d[M],H,m,null,b,y,C,T,I)}w>$?Te(d,b,y,!0,!1,A):$e(h,m,v,b,y,C,T,I,A)},vt=(d,h,m,v,b,y,C,T,I)=>{let w=0;const $=h.length;let A=d.length-1,M=$-1;for(;w<=A&&w<=M;){const H=d[w],j=h[w]=I?wt(h[w]):qe(h[w]);if(In(H,j))k(H,j,m,null,b,y,C,T,I);else break;w++}for(;w<=A&&w<=M;){const H=d[A],j=h[M]=I?wt(h[M]):qe(h[M]);if(In(H,j))k(H,j,m,null,b,y,C,T,I);else break;A--,M--}if(w>A){if(w<=M){const H=M+1,j=H<$?h[H].el:v;for(;w<=M;)k(null,h[w]=I?wt(h[w]):qe(h[w]),m,j,b,y,C,T,I),w++}}else if(w>M)for(;w<=A;)_e(d[w],b,y,!0),w++;else{const H=w,j=w,Z=new Map;for(w=j;w<=M;w++){const Ee=h[w]=I?wt(h[w]):qe(h[w]);Ee.key!=null&&Z.set(Ee.key,w)}let G,ye=0;const be=M-j+1;let Ve=!1,je=0;const wn=new Array(be);for(w=0;w<be;w++)wn[w]=0;for(w=H;w<=A;w++){const Ee=d[w];if(ye>=be){_e(Ee,b,y,!0);continue}let We;if(Ee.key!=null)We=Z.get(Ee.key);else for(G=j;G<=M;G++)if(wn[G-j]===0&&In(Ee,h[G])){We=G;break}We===void 0?_e(Ee,b,y,!0):(wn[We-j]=w+1,We>=je?je=We:Ve=!0,k(Ee,h[We],m,null,b,y,C,T,I),ye++)}const vi=Ve?Pu(wn):sn;for(G=vi.length-1,w=be-1;w>=0;w--){const Ee=j+w,We=h[Ee],_i=Ee+1<$?h[Ee+1].el:v;wn[w]===0?k(null,We,m,_i,b,y,C,T,I):Ve&&(G<0||w!==vi[G]?Be(We,m,_i,2):G--)}}},Be=(d,h,m,v,b=null)=>{const{el:y,type:C,transition:T,children:I,shapeFlag:w}=d;if(w&6){Be(d.component.subTree,h,m,v);return}if(w&128){d.suspense.move(h,m,v);return}if(w&64){C.move(d,h,m,L);return}if(C===Ce){s(y,h,m);for(let A=0;A<I.length;A++)Be(I[A],h,m,v);s(d.anchor,h,m);return}if(C===hs){x(d,h,m);return}if(v!==2&&w&1&&T)if(v===0)T.beforeEnter(y),s(y,h,m),Ie(()=>T.enter(y),b);else{const{leave:A,delayLeave:M,afterLeave:H}=T,j=()=>{d.ctx.isUnmounted?r(y):s(y,h,m)},Z=()=>{A(y,()=>{j(),H&&H()})};M?M(y,j,Z):Z()}else s(y,h,m)},_e=(d,h,m,v=!1,b=!1)=>{const{type:y,props:C,ref:T,children:I,dynamicChildren:w,shapeFlag:$,patchFlag:A,dirs:M,cacheIndex:H}=d;if(A===-2&&(b=!1),T!=null&&(lt(),xn(T,null,m,d,!0),ut()),H!=null&&(h.renderCache[H]=void 0),$&256){h.ctx.deactivate(d);return}const j=$&1&&M,Z=!Nn(d);let G;if(Z&&(G=C&&C.onVnodeBeforeUnmount)&&Ke(G,h,d),$&6)os(d.component,m,v);else{if($&128){d.suspense.unmount(m,v);return}j&&Ht(d,null,h,"beforeUnmount"),$&64?d.type.remove(d,h,m,L,v):w&&!w.hasOnce&&(y!==Ce||A>0&&A&64)?Te(w,h,m,!1,!0):(y===Ce&&A&384||!b&&$&16)&&Te(I,h,m),v&&Yt(d)}(Z&&(G=C&&C.onVnodeUnmounted)||j)&&Ie(()=>{G&&Ke(G,h,d),j&&Ht(d,null,h,"unmounted")},m)},Yt=d=>{const{type:h,el:m,anchor:v,transition:b}=d;if(h===Ce){Xt(m,v);return}if(h===hs){D(d);return}const y=()=>{r(m),b&&!b.persisted&&b.afterLeave&&b.afterLeave()};if(d.shapeFlag&1&&b&&!b.persisted){const{leave:C,delayLeave:T}=b,I=()=>C(m,y);T?T(d.el,y,I):I()}else y()},Xt=(d,h)=>{let m;for(;d!==h;)m=p(d),r(d),d=m;r(h)},os=(d,h,m)=>{const{bum:v,scope:b,job:y,subTree:C,um:T,m:I,a:w,parent:$,slots:{__:A}}=d;Pi(I),Pi(w),v&&Qs(v),$&&B(A)&&A.forEach(M=>{$.renderCache[M]=void 0}),b.stop(),y&&(y.flags|=8,_e(C,d,h,m)),T&&Ie(T,h),Ie(()=>{d.isUnmounted=!0},h),h&&h.pendingBranch&&!h.isUnmounted&&d.asyncDep&&!d.asyncResolved&&d.suspenseId===h.pendingId&&(h.deps--,h.deps===0&&h.resolve())},Te=(d,h,m,v=!1,b=!1,y=0)=>{for(let C=y;C<d.length;C++)_e(d[C],h,m,v,b)},_=d=>{if(d.shapeFlag&6)return _(d.component.subTree);if(d.shapeFlag&128)return d.suspense.next();const h=p(d.anchor||d.el),m=h&&h[Gl];return m?p(m):h};let N=!1;const R=(d,h,m)=>{d==null?h._vnode&&_e(h._vnode,null,null,!0):k(h._vnode||null,d,h,null,null,null,m),h._vnode=d,N||(N=!0,Ei(),va(),N=!1)},L={p:k,um:_e,m:Be,r:Yt,mt:bn,mc:$e,pc:W,pbc:Fe,n:_,o:t};return{render:R,hydrate:void 0,createApp:yu(R)}}function rr({type:t,props:e},n){return n==="svg"&&t==="foreignObject"||n==="mathml"&&t==="annotation-xml"&&e&&e.encoding&&e.encoding.includes("html")?void 0:n}function Bt({effect:t,job:e},n){n?(t.flags|=32,e.flags|=4):(t.flags&=-33,e.flags&=-5)}function Au(t,e){return(!t||t&&!t.pendingBranch)&&e&&!e.persisted}function Ma(t,e,n=!1){const s=t.children,r=e.children;if(B(s)&&B(r))for(let i=0;i<s.length;i++){const o=s[i];let c=r[i];c.shapeFlag&1&&!c.dynamicChildren&&((c.patchFlag<=0||c.patchFlag===32)&&(c=r[i]=wt(r[i]),c.el=o.el),!n&&c.patchFlag!==-2&&Ma(o,c)),c.type===Ks&&(c.el=o.el),c.type===Dt&&!c.el&&(c.el=o.el)}}function Pu(t){const e=t.slice(),n=[0];let s,r,i,o,c;const a=t.length;for(s=0;s<a;s++){const l=t[s];if(l!==0){if(r=n[n.length-1],t[r]<l){e[s]=r,n.push(s);continue}for(i=0,o=n.length-1;i<o;)c=i+o>>1,t[n[c]]<l?i=c+1:o=c;l<t[n[i]]&&(i>0&&(e[s]=n[i-1]),n[i]=s)}}for(i=n.length,o=n[i-1];i-- >0;)n[i]=o,o=e[o];return n}function Ua(t){const e=t.subTree.component;if(e)return e.asyncDep&&!e.asyncResolved?e:Ua(e)}function Pi(t){if(t)for(let e=0;e<t.length;e++)t[e].flags|=8}const ku=Symbol.for("v-scx"),Ou=()=>at(ku);function fs(t,e,n){return $a(t,e,n)}function $a(t,e,n=te){const{immediate:s,deep:r,flush:i,once:o}=n,c=pe({},n),a=e&&s||!e&&i!=="post";let l;if(Kn){if(i==="sync"){const g=Ou();l=g.__watcherHandles||(g.__watcherHandles=[])}else if(!a){const g=()=>{};return g.stop=Ge,g.resume=Ge,g.pause=Ge,g}}const u=fe;c.call=(g,S,k)=>Xe(g,u,S,k);let f=!1;i==="post"?c.scheduler=g=>{Ie(g,u&&u.suspense)}:i!=="sync"&&(f=!0,c.scheduler=(g,S)=>{S?g():Zr(g)}),c.augmentJob=g=>{e&&(g.flags|=4),f&&(g.flags|=2,u&&(g.id=u.uid,g.i=u))};const p=jl(t,e,c);return Kn&&(l?l.push(p):a&&p()),p}function xu(t,e,n){const s=this.proxy,r=ae(t)?t.includes(".")?Fa(s,t):()=>s[t]:t.bind(s,s);let i;V(e)?i=e:(i=e.handler,n=e);const o=Qn(this),c=$a(r,i.bind(s),n);return o(),c}function Fa(t,e){const n=e.split(".");return()=>{let s=t;for(let r=0;r<n.length&&s;r++)s=s[n[r]];return s}}const Nu=(t,e)=>e==="modelValue"||e==="model-value"?t.modelModifiers:t[`${e}Modifiers`]||t[`${Pe(e)}Modifiers`]||t[`${Mt(e)}Modifiers`];function Du(t,e,...n){if(t.isUnmounted)return;const s=t.vnode.props||te;let r=n;const i=e.startsWith("update:"),o=i&&Nu(s,e.slice(7));o&&(o.trim&&(r=n.map(u=>ae(u)?u.trim():u)),o.number&&(r=n.map(ll)));let c,a=s[c=Xs(e)]||s[c=Xs(Pe(e))];!a&&i&&(a=s[c=Xs(Mt(e))]),a&&Xe(a,t,6,r);const l=s[c+"Once"];if(l){if(!t.emitted)t.emitted={};else if(t.emitted[c])return;t.emitted[c]=!0,Xe(l,t,6,r)}}function Ha(t,e,n=!1){const s=e.emitsCache,r=s.get(t);if(r!==void 0)return r;const i=t.emits;let o={},c=!1;if(!V(t)){const a=l=>{const u=Ha(l,e,!0);u&&(c=!0,pe(o,u))};!n&&e.mixins.length&&e.mixins.forEach(a),t.extends&&a(t.extends),t.mixins&&t.mixins.forEach(a)}return!i&&!c?(se(t)&&s.set(t,null),null):(B(i)?i.forEach(a=>o[a]=null):pe(o,i),se(t)&&s.set(t,o),o)}function Ws(t,e){return!t||!Ds(e)?!1:(e=e.slice(2).replace(/Once$/,""),q(t,e[0].toLowerCase()+e.slice(1))||q(t,Mt(e))||q(t,e))}function ki(t){const{type:e,vnode:n,proxy:s,withProxy:r,propsOptions:[i],slots:o,attrs:c,emit:a,render:l,renderCache:u,props:f,data:p,setupState:g,ctx:S,inheritAttrs:k}=t,F=Is(t);let P,E;try{if(n.shapeFlag&4){const D=r||s,Y=D;P=qe(l.call(Y,D,u,f,g,p,S)),E=c}else{const D=e;P=qe(D.length>1?D(f,{attrs:c,slots:o,emit:a}):D(f,null)),E=e.props?c:Lu(c)}}catch(D){Ln.length=0,Vs(D,t,1),P=oe(Dt)}let x=P;if(E&&k!==!1){const D=Object.keys(E),{shapeFlag:Y}=x;D.length&&Y&7&&(i&&D.some(jr)&&(E=Mu(E,i)),x=hn(x,E,!1,!0))}return n.dirs&&(x=hn(x,null,!1,!0),x.dirs=x.dirs?x.dirs.concat(n.dirs):n.dirs),n.transition&&ei(x,n.transition),P=x,Is(F),P}const Lu=t=>{let e;for(const n in t)(n==="class"||n==="style"||Ds(n))&&((e||(e={}))[n]=t[n]);return e},Mu=(t,e)=>{const n={};for(const s in t)(!jr(s)||!(s.slice(9)in e))&&(n[s]=t[s]);return n};function Uu(t,e,n){const{props:s,children:r,component:i}=t,{props:o,children:c,patchFlag:a}=e,l=i.emitsOptions;if(e.dirs||e.transition)return!0;if(n&&a>=0){if(a&1024)return!0;if(a&16)return s?Oi(s,o,l):!!o;if(a&8){const u=e.dynamicProps;for(let f=0;f<u.length;f++){const p=u[f];if(o[p]!==s[p]&&!Ws(l,p))return!0}}}else return(r||c)&&(!c||!c.$stable)?!0:s===o?!1:s?o?Oi(s,o,l):!0:!!o;return!1}function Oi(t,e,n){const s=Object.keys(e);if(s.length!==Object.keys(t).length)return!0;for(let r=0;r<s.length;r++){const i=s[r];if(e[i]!==t[i]&&!Ws(n,i))return!0}return!1}function $u({vnode:t,parent:e},n){for(;e;){const s=e.subTree;if(s.suspense&&s.suspense.activeBranch===t&&(s.el=t.el),s===t)(t=e.vnode).el=n,e=e.parent;else break}}const Ba=t=>t.__isSuspense;function Fu(t,e){e&&e.pendingBranch?B(t)?e.effects.push(...t):e.effects.push(t):zl(t)}const Ce=Symbol.for("v-fgt"),Ks=Symbol.for("v-txt"),Dt=Symbol.for("v-cmt"),hs=Symbol.for("v-stc"),Ln=[];let Se=null;function ne(t=!1){Ln.push(Se=t?null:[])}function Hu(){Ln.pop(),Se=Ln[Ln.length-1]||null}let jn=1;function xi(t,e=!1){jn+=t,t<0&&Se&&e&&(Se.hasOnce=!0)}function Va(t){return t.dynamicChildren=jn>0?Se||sn:null,Hu(),jn>0&&Se&&Se.push(t),t}function ie(t,e,n,s,r,i){return Va(O(t,e,n,s,r,i,!0))}function ja(t,e,n,s,r){return Va(oe(t,e,n,s,r,!0))}function Ts(t){return t?t.__v_isVNode===!0:!1}function In(t,e){return t.type===e.type&&t.key===e.key}const Wa=({key:t})=>t??null,ps=({ref:t,ref_key:e,ref_for:n})=>(typeof t=="number"&&(t=""+t),t!=null?ae(t)||he(t)||V(t)?{i:Ne,r:t,k:e,f:!!n}:t:null);function O(t,e=null,n=null,s=0,r=null,i=t===Ce?0:1,o=!1,c=!1){const a={__v_isVNode:!0,__v_skip:!0,type:t,props:e,key:e&&Wa(e),ref:e&&ps(e),scopeId:ya,slotScopeIds:null,children:n,component:null,suspense:null,ssContent:null,ssFallback:null,dirs:null,transition:null,el:null,anchor:null,target:null,targetStart:null,targetAnchor:null,staticCount:0,shapeFlag:i,patchFlag:s,dynamicProps:r,dynamicChildren:null,appContext:null,ctx:Ne};return c?(si(a,n),i&128&&t.normalize(a)):n&&(a.shapeFlag|=ae(n)?8:16),jn>0&&!o&&Se&&(a.patchFlag>0||i&6)&&a.patchFlag!==32&&Se.push(a),a}const oe=Bu;function Bu(t,e=null,n=null,s=0,r=null,i=!1){if((!t||t===uu)&&(t=Dt),Ts(t)){const c=hn(t,e,!0);return n&&si(c,n),jn>0&&!i&&Se&&(c.shapeFlag&6?Se[Se.indexOf(t)]=c:Se.push(c)),c.patchFlag=-2,c}if(Qu(t)&&(t=t.__vccOpts),e){e=Vu(e);let{class:c,style:a}=e;c&&!ae(c)&&(e.class=xt(c)),se(a)&&(Qr(a)&&!B(a)&&(a=pe({},a)),e.style=Fs(a))}const o=ae(t)?1:Ba(t)?128:Jl(t)?64:se(t)?4:V(t)?2:0;return O(t,e,n,s,r,o,i,!0)}function Vu(t){return t?Qr(t)||ka(t)?pe({},t):t:null}function hn(t,e,n=!1,s=!1){const{props:r,ref:i,patchFlag:o,children:c,transition:a}=t,l=e?ju(r||{},e):r,u={__v_isVNode:!0,__v_skip:!0,type:t.type,props:l,key:l&&Wa(l),ref:e&&e.ref?n&&i?B(i)?i.concat(ps(e)):[i,ps(e)]:ps(e):i,scopeId:t.scopeId,slotScopeIds:t.slotScopeIds,children:c,target:t.target,targetStart:t.targetStart,targetAnchor:t.targetAnchor,staticCount:t.staticCount,shapeFlag:t.shapeFlag,patchFlag:e&&t.type!==Ce?o===-1?16:o|16:o,dynamicProps:t.dynamicProps,dynamicChildren:t.dynamicChildren,appContext:t.appContext,dirs:t.dirs,transition:a,component:t.component,suspense:t.suspense,ssContent:t.ssContent&&hn(t.ssContent),ssFallback:t.ssFallback&&hn(t.ssFallback),el:t.el,anchor:t.anchor,ctx:t.ctx,ce:t.ce};return a&&s&&ei(u,a.clone(u)),u}function At(t=" ",e=0){return oe(Ks,null,t,e)}function Wn(t,e){const n=oe(hs,null,t);return n.staticCount=e,n}function en(t="",e=!1){return e?(ne(),ja(Dt,null,t)):oe(Dt,null,t)}function qe(t){return t==null||typeof t=="boolean"?oe(Dt):B(t)?oe(Ce,null,t.slice()):Ts(t)?wt(t):oe(Ks,null,String(t))}function wt(t){return t.el===null&&t.patchFlag!==-1||t.memo?t:hn(t)}function si(t,e){let n=0;const{shapeFlag:s}=t;if(e==null)e=null;else if(B(e))n=16;else if(typeof e=="object")if(s&65){const r=e.default;r&&(r._c&&(r._d=!1),si(t,r()),r._c&&(r._d=!0));return}else{n=32;const r=e._;!r&&!ka(e)?e._ctx=Ne:r===3&&Ne&&(Ne.slots._===1?e._=1:(e._=2,t.patchFlag|=1024))}else V(e)?(e={default:e,_ctx:Ne},n=32):(e=String(e),s&64?(n=16,e=[At(e)]):n=8);t.children=e,t.shapeFlag|=n}function ju(...t){const e={};for(let n=0;n<t.length;n++){const s=t[n];for(const r in s)if(r==="class")e.class!==s.class&&(e.class=xt([e.class,s.class]));else if(r==="style")e.style=Fs([e.style,s.style]);else if(Ds(r)){const i=e[r],o=s[r];o&&i!==o&&!(B(i)&&i.includes(o))&&(e[r]=i?[].concat(i,o):o)}else r!==""&&(e[r]=s[r])}return e}function Ke(t,e,n,s=null){Xe(t,e,7,[n,s])}const Wu=Ra();let Ku=0;function zu(t,e,n){const s=t.type,r=(e?e.appContext:t.appContext)||Wu,i={uid:Ku++,vnode:t,type:s,parent:e,appContext:r,root:null,next:null,subTree:null,effect:null,update:null,job:null,scope:new gl(!0),render:null,proxy:null,exposed:null,exposeProxy:null,withProxy:null,provides:e?e.provides:Object.create(r.provides),ids:e?e.ids:["",0,0],accessCache:null,renderCache:[],components:null,directives:null,propsOptions:xa(s,r),emitsOptions:Ha(s,r),emit:null,emitted:null,propsDefaults:te,inheritAttrs:s.inheritAttrs,ctx:te,data:te,props:te,attrs:te,slots:te,refs:te,setupState:te,setupContext:null,suspense:n,suspenseId:n?n.pendingId:0,asyncDep:null,asyncResolved:!1,isMounted:!1,isUnmounted:!1,isDeactivated:!1,bc:null,c:null,bm:null,m:null,bu:null,u:null,um:null,bum:null,da:null,a:null,rtg:null,rtc:null,ec:null,sp:null};return i.ctx={_:i},i.root=e?e.root:i,i.emit=Du.bind(null,i),t.ce&&t.ce(i),i}let fe=null,Cs,Ar;{const t=$s(),e=(n,s)=>{let r;return(r=t[n])||(r=t[n]=[]),r.push(s),i=>{r.length>1?r.forEach(o=>o(i)):r[0](i)}};Cs=e("__VUE_INSTANCE_SETTERS__",n=>fe=n),Ar=e("__VUE_SSR_SETTERS__",n=>Kn=n)}const Qn=t=>{const e=fe;return Cs(t),t.scope.on(),()=>{t.scope.off(),Cs(e)}},Ni=()=>{fe&&fe.scope.off(),Cs(null)};function Ka(t){return t.vnode.shapeFlag&4}let Kn=!1;function qu(t,e=!1,n=!1){e&&Ar(e);const{props:s,children:r}=t.vnode,i=Ka(t);bu(t,s,i,e),Su(t,r,n||e);const o=i?Gu(t,e):void 0;return e&&Ar(!1),o}function Gu(t,e){const n=t.type;t.accessCache=Object.create(null),t.proxy=new Proxy(t.ctx,fu);const{setup:s}=n;if(s){lt();const r=t.setupContext=s.length>1?Yu(t):null,i=Qn(t),o=Xn(s,t,0,[t.props,r]),c=Wo(o);if(ut(),i(),(c||t.sp)&&!Nn(t)&&wa(t),c){if(o.then(Ni,Ni),e)return o.then(a=>{Di(t,a)}).catch(a=>{Vs(a,t,0)});t.asyncDep=o}else Di(t,o)}else za(t)}function Di(t,e,n){V(e)?t.type.__ssrInlineRender?t.ssrRender=e:t.render=e:se(e)&&(t.setupState=ha(e)),za(t)}function za(t,e,n){const s=t.type;t.render||(t.render=s.render||Ge);{const r=Qn(t);lt();try{hu(t)}finally{ut(),r()}}}const Ju={get(t,e){return de(t,"get",""),t[e]}};function Yu(t){const e=n=>{t.exposed=n||{}};return{attrs:new Proxy(t.attrs,Ju),slots:t.slots,emit:t.emit,expose:e}}function ri(t){return t.exposed?t.exposeProxy||(t.exposeProxy=new Proxy(ha(Ml(t.exposed)),{get(e,n){if(n in e)return e[n];if(n in Dn)return Dn[n](t)},has(e,n){return n in e||n in Dn}})):t.proxy}function Xu(t,e=!0){return V(t)?t.displayName||t.name:t.name||e&&t.__name}function Qu(t){return V(t)&&"__vccOpts"in t}const Re=(t,e)=>Bl(t,e,Kn);function qa(t,e,n){const s=arguments.length;return s===2?se(e)&&!B(e)?Ts(e)?oe(t,null,[e]):oe(t,e):oe(t,null,e):(s>3?n=Array.prototype.slice.call(arguments,2):s===3&&Ts(n)&&(n=[n]),oe(t,e,n))}const Zu="3.5.17";/**
* @vue/runtime-dom v3.5.17
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/let Pr;const Li=typeof window<"u"&&window.trustedTypes;if(Li)try{Pr=Li.createPolicy("vue",{createHTML:t=>t})}catch{}const Ga=Pr?t=>Pr.createHTML(t):t=>t,ed="http://www.w3.org/2000/svg",td="http://www.w3.org/1998/Math/MathML",st=typeof document<"u"?document:null,Mi=st&&st.createElement("template"),nd={insert:(t,e,n)=>{e.insertBefore(t,n||null)},remove:t=>{const e=t.parentNode;e&&e.removeChild(t)},createElement:(t,e,n,s)=>{const r=e==="svg"?st.createElementNS(ed,t):e==="mathml"?st.createElementNS(td,t):n?st.createElement(t,{is:n}):st.createElement(t);return t==="select"&&s&&s.multiple!=null&&r.setAttribute("multiple",s.multiple),r},createText:t=>st.createTextNode(t),createComment:t=>st.createComment(t),setText:(t,e)=>{t.nodeValue=e},setElementText:(t,e)=>{t.textContent=e},parentNode:t=>t.parentNode,nextSibling:t=>t.nextSibling,querySelector:t=>st.querySelector(t),setScopeId(t,e){t.setAttribute(e,"")},insertStaticContent(t,e,n,s,r,i){const o=n?n.previousSibling:e.lastChild;if(r&&(r===i||r.nextSibling))for(;e.insertBefore(r.cloneNode(!0),n),!(r===i||!(r=r.nextSibling)););else{Mi.innerHTML=Ga(s==="svg"?`<svg>${t}</svg>`:s==="mathml"?`<math>${t}</math>`:t);const c=Mi.content;if(s==="svg"||s==="mathml"){const a=c.firstChild;for(;a.firstChild;)c.appendChild(a.firstChild);c.removeChild(a)}e.insertBefore(c,n)}return[o?o.nextSibling:e.firstChild,n?n.previousSibling:e.lastChild]}},sd=Symbol("_vtc");function rd(t,e,n){const s=t[sd];s&&(e=(e?[e,...s]:[...s]).join(" ")),e==null?t.removeAttribute("class"):n?t.setAttribute("class",e):t.className=e}const Ui=Symbol("_vod"),id=Symbol("_vsh"),od=Symbol(""),ad=/(^|;)\s*display\s*:/;function cd(t,e,n){const s=t.style,r=ae(n);let i=!1;if(n&&!r){if(e)if(ae(e))for(const o of e.split(";")){const c=o.slice(0,o.indexOf(":")).trim();n[c]==null&&ms(s,c,"")}else for(const o in e)n[o]==null&&ms(s,o,"");for(const o in n)o==="display"&&(i=!0),ms(s,o,n[o])}else if(r){if(e!==n){const o=s[od];o&&(n+=";"+o),s.cssText=n,i=ad.test(n)}}else e&&t.removeAttribute("style");Ui in t&&(t[Ui]=i?s.display:"",t[id]&&(s.display="none"))}const $i=/\s*!important$/;function ms(t,e,n){if(B(n))n.forEach(s=>ms(t,e,s));else if(n==null&&(n=""),e.startsWith("--"))t.setProperty(e,n);else{const s=ld(t,e);$i.test(n)?t.setProperty(Mt(s),n.replace($i,""),"important"):t[s]=n}}const Fi=["Webkit","Moz","ms"],ir={};function ld(t,e){const n=ir[e];if(n)return n;let s=Pe(e);if(s!=="filter"&&s in t)return ir[e]=s;s=Us(s);for(let r=0;r<Fi.length;r++){const i=Fi[r]+s;if(i in t)return ir[e]=i}return e}const Hi="http://www.w3.org/1999/xlink";function Bi(t,e,n,s,r,i=ml(e)){s&&e.startsWith("xlink:")?n==null?t.removeAttributeNS(Hi,e.slice(6,e.length)):t.setAttributeNS(Hi,e,n):n==null||i&&!qo(n)?t.removeAttribute(e):t.setAttribute(e,i?"":Lt(n)?String(n):n)}function Vi(t,e,n,s,r){if(e==="innerHTML"||e==="textContent"){n!=null&&(t[e]=e==="innerHTML"?Ga(n):n);return}const i=t.tagName;if(e==="value"&&i!=="PROGRESS"&&!i.includes("-")){const c=i==="OPTION"?t.getAttribute("value")||"":t.value,a=n==null?t.type==="checkbox"?"on":"":String(n);(c!==a||!("_value"in t))&&(t.value=a),n==null&&t.removeAttribute(e),t._value=n;return}let o=!1;if(n===""||n==null){const c=typeof t[e];c==="boolean"?n=qo(n):n==null&&c==="string"?(n="",o=!0):c==="number"&&(n=0,o=!0)}try{t[e]=n}catch{}o&&t.removeAttribute(r||e)}function ud(t,e,n,s){t.addEventListener(e,n,s)}function dd(t,e,n,s){t.removeEventListener(e,n,s)}const ji=Symbol("_vei");function fd(t,e,n,s,r=null){const i=t[ji]||(t[ji]={}),o=i[e];if(s&&o)o.value=s;else{const[c,a]=hd(e);if(s){const l=i[e]=gd(s,r);ud(t,c,l,a)}else o&&(dd(t,c,o,a),i[e]=void 0)}}const Wi=/(?:Once|Passive|Capture)$/;function hd(t){let e;if(Wi.test(t)){e={};let s;for(;s=t.match(Wi);)t=t.slice(0,t.length-s[0].length),e[s[0].toLowerCase()]=!0}return[t[2]===":"?t.slice(3):Mt(t.slice(2)),e]}let or=0;const pd=Promise.resolve(),md=()=>or||(pd.then(()=>or=0),or=Date.now());function gd(t,e){const n=s=>{if(!s._vts)s._vts=Date.now();else if(s._vts<=n.attached)return;Xe(vd(s,n.value),e,5,[s])};return n.value=t,n.attached=md(),n}function vd(t,e){if(B(e)){const n=t.stopImmediatePropagation;return t.stopImmediatePropagation=()=>{n.call(t),t._stopped=!0},e.map(s=>r=>!r._stopped&&s&&s(r))}else return e}const Ki=t=>t.charCodeAt(0)===111&&t.charCodeAt(1)===110&&t.charCodeAt(2)>96&&t.charCodeAt(2)<123,_d=(t,e,n,s,r,i)=>{const o=r==="svg";e==="class"?rd(t,s,o):e==="style"?cd(t,n,s):Ds(e)?jr(e)||fd(t,e,n,s,i):(e[0]==="."?(e=e.slice(1),!0):e[0]==="^"?(e=e.slice(1),!1):yd(t,e,s,o))?(Vi(t,e,s),!t.tagName.includes("-")&&(e==="value"||e==="checked"||e==="selected")&&Bi(t,e,s,o,i,e!=="value")):t._isVueCE&&(/[A-Z]/.test(e)||!ae(s))?Vi(t,Pe(e),s,i,e):(e==="true-value"?t._trueValue=s:e==="false-value"&&(t._falseValue=s),Bi(t,e,s,o))};function yd(t,e,n,s){if(s)return!!(e==="innerHTML"||e==="textContent"||e in t&&Ki(e)&&V(n));if(e==="spellcheck"||e==="draggable"||e==="translate"||e==="autocorrect"||e==="form"||e==="list"&&t.tagName==="INPUT"||e==="type"&&t.tagName==="TEXTAREA")return!1;if(e==="width"||e==="height"){const r=t.tagName;if(r==="IMG"||r==="VIDEO"||r==="CANVAS"||r==="SOURCE")return!1}return Ki(e)&&ae(n)?!1:e in t}const bd={esc:"escape",space:" ",up:"arrow-up",left:"arrow-left",right:"arrow-right",down:"arrow-down",delete:"backspace"},Ja=(t,e)=>{const n=t._withKeys||(t._withKeys={}),s=e.join(".");return n[s]||(n[s]=r=>{if(!("key"in r))return;const i=Mt(r.key);if(e.some(o=>o===i||bd[o]===i))return t(r)})},wd=pe({patchProp:_d},nd);let zi;function Ed(){return zi||(zi=Cu(wd))}const Id=(...t)=>{const e=Ed().createApp(...t),{mount:n}=e;return e.mount=s=>{const r=Td(s);if(!r)return;const i=e._component;!V(i)&&!i.render&&!i.template&&(i.template=r.innerHTML),r.nodeType===1&&(r.textContent="");const o=n(r,!1,Sd(r));return r instanceof Element&&(r.removeAttribute("v-cloak"),r.setAttribute("data-v-app","")),o},e};function Sd(t){if(t instanceof SVGElement)return"svg";if(typeof MathMLElement=="function"&&t instanceof MathMLElement)return"mathml"}function Td(t){return ae(t)?document.querySelector(t):t}const Cd="/logosite.png",Rd="/icons/login.png",Ut=(t,e)=>{const n=t.__vccOpts||t;for(const[s,r]of e)n[s]=r;return n},Ad={},Pd={class:"app-header"};function kd(t,e){return ne(),ie("header",Pd,e[0]||(e[0]=[Wn('<div class="header-content" data-v-09832e01><div class="logo" data-v-09832e01><img src="'+Cd+'" alt="ShareHelp Logo" data-v-09832e01><div class="textinho" data-v-09832e01><h1 data-v-09832e01>ShareHelp</h1><span class="slogan" data-v-09832e01>Doe seguro</span></div></div><nav class="main-nav" data-v-09832e01><ul data-v-09832e01><li data-v-09832e01><a href="/" data-v-09832e01>Home</a></li><li data-v-09832e01><a href="/institutions" data-v-09832e01>Instituições</a></li><li data-v-09832e01><a href="/map" data-v-09832e01>Mapa interativo</a></li><li data-v-09832e01><a href="/team" data-v-09832e01>Nossa equipe</a></li><li data-v-09832e01><button class="header-donate-button" data-v-09832e01>Doar agora</button></li><li data-v-09832e01><a href="/login" data-v-09832e01><img src="'+Rd+'" alt="" data-v-09832e01></a></li></ul></nav></div>',1)]))}const Od=Ut(Ad,[["render",kd],["__scopeId","data-v-09832e01"]]),xd={id:"app"},Nd={__name:"App",setup(t){return(e,n)=>{const s=lu("router-view");return ne(),ie("div",xd,[oe(Od),oe(s)])}}};/*!
  * vue-router v4.5.1
  * (c) 2025 Eduardo San Martin Morote
  * @license MIT
  */const tn=typeof document<"u";function Ya(t){return typeof t=="object"||"displayName"in t||"props"in t||"__vccOpts"in t}function Dd(t){return t.__esModule||t[Symbol.toStringTag]==="Module"||t.default&&Ya(t.default)}const K=Object.assign;function ar(t,e){const n={};for(const s in e){const r=e[s];n[s]=Me(r)?r.map(t):t(r)}return n}const Mn=()=>{},Me=Array.isArray,Xa=/#/g,Ld=/&/g,Md=/\//g,Ud=/=/g,$d=/\?/g,Qa=/\+/g,Fd=/%5B/g,Hd=/%5D/g,Za=/%5E/g,Bd=/%60/g,ec=/%7B/g,Vd=/%7C/g,tc=/%7D/g,jd=/%20/g;function ii(t){return encodeURI(""+t).replace(Vd,"|").replace(Fd,"[").replace(Hd,"]")}function Wd(t){return ii(t).replace(ec,"{").replace(tc,"}").replace(Za,"^")}function kr(t){return ii(t).replace(Qa,"%2B").replace(jd,"+").replace(Xa,"%23").replace(Ld,"%26").replace(Bd,"`").replace(ec,"{").replace(tc,"}").replace(Za,"^")}function Kd(t){return kr(t).replace(Ud,"%3D")}function zd(t){return ii(t).replace(Xa,"%23").replace($d,"%3F")}function qd(t){return t==null?"":zd(t).replace(Md,"%2F")}function zn(t){try{return decodeURIComponent(""+t)}catch{}return""+t}const Gd=/\/$/,Jd=t=>t.replace(Gd,"");function cr(t,e,n="/"){let s,r={},i="",o="";const c=e.indexOf("#");let a=e.indexOf("?");return c<a&&c>=0&&(a=-1),a>-1&&(s=e.slice(0,a),i=e.slice(a+1,c>-1?c:e.length),r=t(i)),c>-1&&(s=s||e.slice(0,c),o=e.slice(c,e.length)),s=Zd(s??e,n),{fullPath:s+(i&&"?")+i+o,path:s,query:r,hash:zn(o)}}function Yd(t,e){const n=e.query?t(e.query):"";return e.path+(n&&"?")+n+(e.hash||"")}function qi(t,e){return!e||!t.toLowerCase().startsWith(e.toLowerCase())?t:t.slice(e.length)||"/"}function Xd(t,e,n){const s=e.matched.length-1,r=n.matched.length-1;return s>-1&&s===r&&pn(e.matched[s],n.matched[r])&&nc(e.params,n.params)&&t(e.query)===t(n.query)&&e.hash===n.hash}function pn(t,e){return(t.aliasOf||t)===(e.aliasOf||e)}function nc(t,e){if(Object.keys(t).length!==Object.keys(e).length)return!1;for(const n in t)if(!Qd(t[n],e[n]))return!1;return!0}function Qd(t,e){return Me(t)?Gi(t,e):Me(e)?Gi(e,t):t===e}function Gi(t,e){return Me(e)?t.length===e.length&&t.every((n,s)=>n===e[s]):t.length===1&&t[0]===e}function Zd(t,e){if(t.startsWith("/"))return t;if(!t)return e;const n=e.split("/"),s=t.split("/"),r=s[s.length-1];(r===".."||r===".")&&s.push("");let i=n.length-1,o,c;for(o=0;o<s.length;o++)if(c=s[o],c!==".")if(c==="..")i>1&&i--;else break;return n.slice(0,i).join("/")+"/"+s.slice(o).join("/")}const _t={path:"/",name:void 0,params:{},query:{},hash:"",fullPath:"/",matched:[],meta:{},redirectedFrom:void 0};var qn;(function(t){t.pop="pop",t.push="push"})(qn||(qn={}));var Un;(function(t){t.back="back",t.forward="forward",t.unknown=""})(Un||(Un={}));function ef(t){if(!t)if(tn){const e=document.querySelector("base");t=e&&e.getAttribute("href")||"/",t=t.replace(/^\w+:\/\/[^\/]+/,"")}else t="/";return t[0]!=="/"&&t[0]!=="#"&&(t="/"+t),Jd(t)}const tf=/^[^#]+#/;function nf(t,e){return t.replace(tf,"#")+e}function sf(t,e){const n=document.documentElement.getBoundingClientRect(),s=t.getBoundingClientRect();return{behavior:e.behavior,left:s.left-n.left-(e.left||0),top:s.top-n.top-(e.top||0)}}const zs=()=>({left:window.scrollX,top:window.scrollY});function rf(t){let e;if("el"in t){const n=t.el,s=typeof n=="string"&&n.startsWith("#"),r=typeof n=="string"?s?document.getElementById(n.slice(1)):document.querySelector(n):n;if(!r)return;e=sf(r,t)}else e=t;"scrollBehavior"in document.documentElement.style?window.scrollTo(e):window.scrollTo(e.left!=null?e.left:window.scrollX,e.top!=null?e.top:window.scrollY)}function Ji(t,e){return(history.state?history.state.position-e:-1)+t}const Or=new Map;function of(t,e){Or.set(t,e)}function af(t){const e=Or.get(t);return Or.delete(t),e}let cf=()=>location.protocol+"//"+location.host;function sc(t,e){const{pathname:n,search:s,hash:r}=e,i=t.indexOf("#");if(i>-1){let c=r.includes(t.slice(i))?t.slice(i).length:1,a=r.slice(c);return a[0]!=="/"&&(a="/"+a),qi(a,"")}return qi(n,t)+s+r}function lf(t,e,n,s){let r=[],i=[],o=null;const c=({state:p})=>{const g=sc(t,location),S=n.value,k=e.value;let F=0;if(p){if(n.value=g,e.value=p,o&&o===S){o=null;return}F=k?p.position-k.position:0}else s(g);r.forEach(P=>{P(n.value,S,{delta:F,type:qn.pop,direction:F?F>0?Un.forward:Un.back:Un.unknown})})};function a(){o=n.value}function l(p){r.push(p);const g=()=>{const S=r.indexOf(p);S>-1&&r.splice(S,1)};return i.push(g),g}function u(){const{history:p}=window;p.state&&p.replaceState(K({},p.state,{scroll:zs()}),"")}function f(){for(const p of i)p();i=[],window.removeEventListener("popstate",c),window.removeEventListener("beforeunload",u)}return window.addEventListener("popstate",c),window.addEventListener("beforeunload",u,{passive:!0}),{pauseListeners:a,listen:l,destroy:f}}function Yi(t,e,n,s=!1,r=!1){return{back:t,current:e,forward:n,replaced:s,position:window.history.length,scroll:r?zs():null}}function uf(t){const{history:e,location:n}=window,s={value:sc(t,n)},r={value:e.state};r.value||i(s.value,{back:null,current:s.value,forward:null,position:e.length-1,replaced:!0,scroll:null},!0);function i(a,l,u){const f=t.indexOf("#"),p=f>-1?(n.host&&document.querySelector("base")?t:t.slice(f))+a:cf()+t+a;try{e[u?"replaceState":"pushState"](l,"",p),r.value=l}catch(g){console.error(g),n[u?"replace":"assign"](p)}}function o(a,l){const u=K({},e.state,Yi(r.value.back,a,r.value.forward,!0),l,{position:r.value.position});i(a,u,!0),s.value=a}function c(a,l){const u=K({},r.value,e.state,{forward:a,scroll:zs()});i(u.current,u,!0);const f=K({},Yi(s.value,a,null),{position:u.position+1},l);i(a,f,!1),s.value=a}return{location:s,state:r,push:c,replace:o}}function df(t){t=ef(t);const e=uf(t),n=lf(t,e.state,e.location,e.replace);function s(i,o=!0){o||n.pauseListeners(),history.go(i)}const r=K({location:"",base:t,go:s,createHref:nf.bind(null,t)},e,n);return Object.defineProperty(r,"location",{enumerable:!0,get:()=>e.location.value}),Object.defineProperty(r,"state",{enumerable:!0,get:()=>e.state.value}),r}function ff(t){return t=location.host?t||location.pathname+location.search:"",t.includes("#")||(t+="#"),df(t)}function hf(t){return typeof t=="string"||t&&typeof t=="object"}function rc(t){return typeof t=="string"||typeof t=="symbol"}const ic=Symbol("");var Xi;(function(t){t[t.aborted=4]="aborted",t[t.cancelled=8]="cancelled",t[t.duplicated=16]="duplicated"})(Xi||(Xi={}));function mn(t,e){return K(new Error,{type:t,[ic]:!0},e)}function nt(t,e){return t instanceof Error&&ic in t&&(e==null||!!(t.type&e))}const Qi="[^/]+?",pf={sensitive:!1,strict:!1,start:!0,end:!0},mf=/[.+*?^${}()[\]/\\]/g;function gf(t,e){const n=K({},pf,e),s=[];let r=n.start?"^":"";const i=[];for(const l of t){const u=l.length?[]:[90];n.strict&&!l.length&&(r+="/");for(let f=0;f<l.length;f++){const p=l[f];let g=40+(n.sensitive?.25:0);if(p.type===0)f||(r+="/"),r+=p.value.replace(mf,"\\$&"),g+=40;else if(p.type===1){const{value:S,repeatable:k,optional:F,regexp:P}=p;i.push({name:S,repeatable:k,optional:F});const E=P||Qi;if(E!==Qi){g+=10;try{new RegExp(`(${E})`)}catch(D){throw new Error(`Invalid custom RegExp for param "${S}" (${E}): `+D.message)}}let x=k?`((?:${E})(?:/(?:${E}))*)`:`(${E})`;f||(x=F&&l.length<2?`(?:/${x})`:"/"+x),F&&(x+="?"),r+=x,g+=20,F&&(g+=-8),k&&(g+=-20),E===".*"&&(g+=-50)}u.push(g)}s.push(u)}if(n.strict&&n.end){const l=s.length-1;s[l][s[l].length-1]+=.7000000000000001}n.strict||(r+="/?"),n.end?r+="$":n.strict&&!r.endsWith("/")&&(r+="(?:/|$)");const o=new RegExp(r,n.sensitive?"":"i");function c(l){const u=l.match(o),f={};if(!u)return null;for(let p=1;p<u.length;p++){const g=u[p]||"",S=i[p-1];f[S.name]=g&&S.repeatable?g.split("/"):g}return f}function a(l){let u="",f=!1;for(const p of t){(!f||!u.endsWith("/"))&&(u+="/"),f=!1;for(const g of p)if(g.type===0)u+=g.value;else if(g.type===1){const{value:S,repeatable:k,optional:F}=g,P=S in l?l[S]:"";if(Me(P)&&!k)throw new Error(`Provided param "${S}" is an array but it is not repeatable (* or + modifiers)`);const E=Me(P)?P.join("/"):P;if(!E)if(F)p.length<2&&(u.endsWith("/")?u=u.slice(0,-1):f=!0);else throw new Error(`Missing required param "${S}"`);u+=E}}return u||"/"}return{re:o,score:s,keys:i,parse:c,stringify:a}}function vf(t,e){let n=0;for(;n<t.length&&n<e.length;){const s=e[n]-t[n];if(s)return s;n++}return t.length<e.length?t.length===1&&t[0]===80?-1:1:t.length>e.length?e.length===1&&e[0]===80?1:-1:0}function oc(t,e){let n=0;const s=t.score,r=e.score;for(;n<s.length&&n<r.length;){const i=vf(s[n],r[n]);if(i)return i;n++}if(Math.abs(r.length-s.length)===1){if(Zi(s))return 1;if(Zi(r))return-1}return r.length-s.length}function Zi(t){const e=t[t.length-1];return t.length>0&&e[e.length-1]<0}const _f={type:0,value:""},yf=/[a-zA-Z0-9_]/;function bf(t){if(!t)return[[]];if(t==="/")return[[_f]];if(!t.startsWith("/"))throw new Error(`Invalid path "${t}"`);function e(g){throw new Error(`ERR (${n})/"${l}": ${g}`)}let n=0,s=n;const r=[];let i;function o(){i&&r.push(i),i=[]}let c=0,a,l="",u="";function f(){l&&(n===0?i.push({type:0,value:l}):n===1||n===2||n===3?(i.length>1&&(a==="*"||a==="+")&&e(`A repeatable param (${l}) must be alone in its segment. eg: '/:ids+.`),i.push({type:1,value:l,regexp:u,repeatable:a==="*"||a==="+",optional:a==="*"||a==="?"})):e("Invalid state to consume buffer"),l="")}function p(){l+=a}for(;c<t.length;){if(a=t[c++],a==="\\"&&n!==2){s=n,n=4;continue}switch(n){case 0:a==="/"?(l&&f(),o()):a===":"?(f(),n=1):p();break;case 4:p(),n=s;break;case 1:a==="("?n=2:yf.test(a)?p():(f(),n=0,a!=="*"&&a!=="?"&&a!=="+"&&c--);break;case 2:a===")"?u[u.length-1]=="\\"?u=u.slice(0,-1)+a:n=3:u+=a;break;case 3:f(),n=0,a!=="*"&&a!=="?"&&a!=="+"&&c--,u="";break;default:e("Unknown state");break}}return n===2&&e(`Unfinished custom RegExp for param "${l}"`),f(),o(),r}function wf(t,e,n){const s=gf(bf(t.path),n),r=K(s,{record:t,parent:e,children:[],alias:[]});return e&&!r.record.aliasOf==!e.record.aliasOf&&e.children.push(r),r}function Ef(t,e){const n=[],s=new Map;e=so({strict:!1,end:!0,sensitive:!1},e);function r(f){return s.get(f)}function i(f,p,g){const S=!g,k=to(f);k.aliasOf=g&&g.record;const F=so(e,f),P=[k];if("alias"in f){const D=typeof f.alias=="string"?[f.alias]:f.alias;for(const Y of D)P.push(to(K({},k,{components:g?g.record.components:k.components,path:Y,aliasOf:g?g.record:k})))}let E,x;for(const D of P){const{path:Y}=D;if(p&&Y[0]!=="/"){const le=p.record.path,re=le[le.length-1]==="/"?"":"/";D.path=p.record.path+(Y&&re+Y)}if(E=wf(D,p,F),g?g.alias.push(E):(x=x||E,x!==E&&x.alias.push(E),S&&f.name&&!no(E)&&o(f.name)),ac(E)&&a(E),k.children){const le=k.children;for(let re=0;re<le.length;re++)i(le[re],E,g&&g.children[re])}g=g||E}return x?()=>{o(x)}:Mn}function o(f){if(rc(f)){const p=s.get(f);p&&(s.delete(f),n.splice(n.indexOf(p),1),p.children.forEach(o),p.alias.forEach(o))}else{const p=n.indexOf(f);p>-1&&(n.splice(p,1),f.record.name&&s.delete(f.record.name),f.children.forEach(o),f.alias.forEach(o))}}function c(){return n}function a(f){const p=Tf(f,n);n.splice(p,0,f),f.record.name&&!no(f)&&s.set(f.record.name,f)}function l(f,p){let g,S={},k,F;if("name"in f&&f.name){if(g=s.get(f.name),!g)throw mn(1,{location:f});F=g.record.name,S=K(eo(p.params,g.keys.filter(x=>!x.optional).concat(g.parent?g.parent.keys.filter(x=>x.optional):[]).map(x=>x.name)),f.params&&eo(f.params,g.keys.map(x=>x.name))),k=g.stringify(S)}else if(f.path!=null)k=f.path,g=n.find(x=>x.re.test(k)),g&&(S=g.parse(k),F=g.record.name);else{if(g=p.name?s.get(p.name):n.find(x=>x.re.test(p.path)),!g)throw mn(1,{location:f,currentLocation:p});F=g.record.name,S=K({},p.params,f.params),k=g.stringify(S)}const P=[];let E=g;for(;E;)P.unshift(E.record),E=E.parent;return{name:F,path:k,params:S,matched:P,meta:Sf(P)}}t.forEach(f=>i(f));function u(){n.length=0,s.clear()}return{addRoute:i,resolve:l,removeRoute:o,clearRoutes:u,getRoutes:c,getRecordMatcher:r}}function eo(t,e){const n={};for(const s of e)s in t&&(n[s]=t[s]);return n}function to(t){const e={path:t.path,redirect:t.redirect,name:t.name,meta:t.meta||{},aliasOf:t.aliasOf,beforeEnter:t.beforeEnter,props:If(t),children:t.children||[],instances:{},leaveGuards:new Set,updateGuards:new Set,enterCallbacks:{},components:"components"in t?t.components||null:t.component&&{default:t.component}};return Object.defineProperty(e,"mods",{value:{}}),e}function If(t){const e={},n=t.props||!1;if("component"in t)e.default=n;else for(const s in t.components)e[s]=typeof n=="object"?n[s]:n;return e}function no(t){for(;t;){if(t.record.aliasOf)return!0;t=t.parent}return!1}function Sf(t){return t.reduce((e,n)=>K(e,n.meta),{})}function so(t,e){const n={};for(const s in t)n[s]=s in e?e[s]:t[s];return n}function Tf(t,e){let n=0,s=e.length;for(;n!==s;){const i=n+s>>1;oc(t,e[i])<0?s=i:n=i+1}const r=Cf(t);return r&&(s=e.lastIndexOf(r,s-1)),s}function Cf(t){let e=t;for(;e=e.parent;)if(ac(e)&&oc(t,e)===0)return e}function ac({record:t}){return!!(t.name||t.components&&Object.keys(t.components).length||t.redirect)}function Rf(t){const e={};if(t===""||t==="?")return e;const s=(t[0]==="?"?t.slice(1):t).split("&");for(let r=0;r<s.length;++r){const i=s[r].replace(Qa," "),o=i.indexOf("="),c=zn(o<0?i:i.slice(0,o)),a=o<0?null:zn(i.slice(o+1));if(c in e){let l=e[c];Me(l)||(l=e[c]=[l]),l.push(a)}else e[c]=a}return e}function ro(t){let e="";for(let n in t){const s=t[n];if(n=Kd(n),s==null){s!==void 0&&(e+=(e.length?"&":"")+n);continue}(Me(s)?s.map(i=>i&&kr(i)):[s&&kr(s)]).forEach(i=>{i!==void 0&&(e+=(e.length?"&":"")+n,i!=null&&(e+="="+i))})}return e}function Af(t){const e={};for(const n in t){const s=t[n];s!==void 0&&(e[n]=Me(s)?s.map(r=>r==null?null:""+r):s==null?s:""+s)}return e}const Pf=Symbol(""),io=Symbol(""),oi=Symbol(""),cc=Symbol(""),xr=Symbol("");function Sn(){let t=[];function e(s){return t.push(s),()=>{const r=t.indexOf(s);r>-1&&t.splice(r,1)}}function n(){t=[]}return{add:e,list:()=>t.slice(),reset:n}}function Et(t,e,n,s,r,i=o=>o()){const o=s&&(s.enterCallbacks[r]=s.enterCallbacks[r]||[]);return()=>new Promise((c,a)=>{const l=p=>{p===!1?a(mn(4,{from:n,to:e})):p instanceof Error?a(p):hf(p)?a(mn(2,{from:e,to:p})):(o&&s.enterCallbacks[r]===o&&typeof p=="function"&&o.push(p),c())},u=i(()=>t.call(s&&s.instances[r],e,n,l));let f=Promise.resolve(u);t.length<3&&(f=f.then(l)),f.catch(p=>a(p))})}function lr(t,e,n,s,r=i=>i()){const i=[];for(const o of t)for(const c in o.components){let a=o.components[c];if(!(e!=="beforeRouteEnter"&&!o.instances[c]))if(Ya(a)){const u=(a.__vccOpts||a)[e];u&&i.push(Et(u,n,s,o,c,r))}else{let l=a();i.push(()=>l.then(u=>{if(!u)throw new Error(`Couldn't resolve component "${c}" at "${o.path}"`);const f=Dd(u)?u.default:u;o.mods[c]=u,o.components[c]=f;const g=(f.__vccOpts||f)[e];return g&&Et(g,n,s,o,c,r)()}))}}return i}function oo(t){const e=at(oi),n=at(cc),s=Re(()=>{const a=Kt(t.to);return e.resolve(a)}),r=Re(()=>{const{matched:a}=s.value,{length:l}=a,u=a[l-1],f=n.matched;if(!u||!f.length)return-1;const p=f.findIndex(pn.bind(null,u));if(p>-1)return p;const g=ao(a[l-2]);return l>1&&ao(u)===g&&f[f.length-1].path!==g?f.findIndex(pn.bind(null,a[l-2])):p}),i=Re(()=>r.value>-1&&Df(n.params,s.value.params)),o=Re(()=>r.value>-1&&r.value===n.matched.length-1&&nc(n.params,s.value.params));function c(a={}){if(Nf(a)){const l=e[Kt(t.replace)?"replace":"push"](Kt(t.to)).catch(Mn);return t.viewTransition&&typeof document<"u"&&"startViewTransition"in document&&document.startViewTransition(()=>l),l}return Promise.resolve()}return{route:s,href:Re(()=>s.value.href),isActive:i,isExactActive:o,navigate:c}}function kf(t){return t.length===1?t[0]:t}const Of=ba({name:"RouterLink",compatConfig:{MODE:3},props:{to:{type:[String,Object],required:!0},replace:Boolean,activeClass:String,exactActiveClass:String,custom:Boolean,ariaCurrentValue:{type:String,default:"page"},viewTransition:Boolean},useLink:oo,setup(t,{slots:e}){const n=Bs(oo(t)),{options:s}=at(oi),r=Re(()=>({[co(t.activeClass,s.linkActiveClass,"router-link-active")]:n.isActive,[co(t.exactActiveClass,s.linkExactActiveClass,"router-link-exact-active")]:n.isExactActive}));return()=>{const i=e.default&&kf(e.default(n));return t.custom?i:qa("a",{"aria-current":n.isExactActive?t.ariaCurrentValue:null,href:n.href,onClick:n.navigate,class:r.value},i)}}}),xf=Of;function Nf(t){if(!(t.metaKey||t.altKey||t.ctrlKey||t.shiftKey)&&!t.defaultPrevented&&!(t.button!==void 0&&t.button!==0)){if(t.currentTarget&&t.currentTarget.getAttribute){const e=t.currentTarget.getAttribute("target");if(/\b_blank\b/i.test(e))return}return t.preventDefault&&t.preventDefault(),!0}}function Df(t,e){for(const n in e){const s=e[n],r=t[n];if(typeof s=="string"){if(s!==r)return!1}else if(!Me(r)||r.length!==s.length||s.some((i,o)=>i!==r[o]))return!1}return!0}function ao(t){return t?t.aliasOf?t.aliasOf.path:t.path:""}const co=(t,e,n)=>t??e??n,Lf=ba({name:"RouterView",inheritAttrs:!1,props:{name:{type:String,default:"default"},route:Object},compatConfig:{MODE:3},setup(t,{attrs:e,slots:n}){const s=at(xr),r=Re(()=>t.route||s.value),i=at(io,0),o=Re(()=>{let l=Kt(i);const{matched:u}=r.value;let f;for(;(f=u[l])&&!f.components;)l++;return l}),c=Re(()=>r.value.matched[o.value]);ds(io,Re(()=>o.value+1)),ds(Pf,c),ds(xr,r);const a=ke();return fs(()=>[a.value,c.value,t.name],([l,u,f],[p,g,S])=>{u&&(u.instances[f]=l,g&&g!==u&&l&&l===p&&(u.leaveGuards.size||(u.leaveGuards=g.leaveGuards),u.updateGuards.size||(u.updateGuards=g.updateGuards))),l&&u&&(!g||!pn(u,g)||!p)&&(u.enterCallbacks[f]||[]).forEach(k=>k(l))},{flush:"post"}),()=>{const l=r.value,u=t.name,f=c.value,p=f&&f.components[u];if(!p)return lo(n.default,{Component:p,route:l});const g=f.props[u],S=g?g===!0?l.params:typeof g=="function"?g(l):g:null,F=qa(p,K({},S,e,{onVnodeUnmounted:P=>{P.component.isUnmounted&&(f.instances[u]=null)},ref:a}));return lo(n.default,{Component:F,route:l})||F}}});function lo(t,e){if(!t)return null;const n=t(e);return n.length===1?n[0]:n}const Mf=Lf;function Uf(t){const e=Ef(t.routes,t),n=t.parseQuery||Rf,s=t.stringifyQuery||ro,r=t.history,i=Sn(),o=Sn(),c=Sn(),a=Ul(_t);let l=_t;tn&&t.scrollBehavior&&"scrollRestoration"in history&&(history.scrollRestoration="manual");const u=ar.bind(null,_=>""+_),f=ar.bind(null,qd),p=ar.bind(null,zn);function g(_,N){let R,L;return rc(_)?(R=e.getRecordMatcher(_),L=N):L=_,e.addRoute(L,R)}function S(_){const N=e.getRecordMatcher(_);N&&e.removeRoute(N)}function k(){return e.getRoutes().map(_=>_.record)}function F(_){return!!e.getRecordMatcher(_)}function P(_,N){if(N=K({},N||a.value),typeof _=="string"){const m=cr(n,_,N.path),v=e.resolve({path:m.path},N),b=r.createHref(m.fullPath);return K(m,v,{params:p(v.params),hash:zn(m.hash),redirectedFrom:void 0,href:b})}let R;if(_.path!=null)R=K({},_,{path:cr(n,_.path,N.path).path});else{const m=K({},_.params);for(const v in m)m[v]==null&&delete m[v];R=K({},_,{params:f(m)}),N.params=f(N.params)}const L=e.resolve(R,N),X=_.hash||"";L.params=u(p(L.params));const d=Yd(s,K({},_,{hash:Wd(X),path:L.path})),h=r.createHref(d);return K({fullPath:d,hash:X,query:s===ro?Af(_.query):_.query||{}},L,{redirectedFrom:void 0,href:h})}function E(_){return typeof _=="string"?cr(n,_,a.value.path):K({},_)}function x(_,N){if(l!==_)return mn(8,{from:N,to:_})}function D(_){return re(_)}function Y(_){return D(K(E(_),{replace:!0}))}function le(_){const N=_.matched[_.matched.length-1];if(N&&N.redirect){const{redirect:R}=N;let L=typeof R=="function"?R(_):R;return typeof L=="string"&&(L=L.includes("?")||L.includes("#")?L=E(L):{path:L},L.params={}),K({query:_.query,hash:_.hash,params:L.path!=null?{}:_.params},L)}}function re(_,N){const R=l=P(_),L=a.value,X=_.state,d=_.force,h=_.replace===!0,m=le(R);if(m)return re(K(E(m),{state:typeof m=="object"?K({},X,m.state):X,force:d,replace:h}),N||R);const v=R;v.redirectedFrom=N;let b;return!d&&Xd(s,L,R)&&(b=mn(16,{to:v,from:L}),Be(L,L,!0,!1)),(b?Promise.resolve(b):Fe(v,L)).catch(y=>nt(y)?nt(y,2)?y:vt(y):W(y,v,L)).then(y=>{if(y){if(nt(y,2))return re(K({replace:h},E(y.to),{state:typeof y.to=="object"?K({},X,y.to.state):X,force:d}),N||v)}else y=Ft(v,L,!0,h,X);return gt(v,L,y),y})}function $e(_,N){const R=x(_,N);return R?Promise.reject(R):Promise.resolve()}function mt(_){const N=Xt.values().next().value;return N&&typeof N.runWithContext=="function"?N.runWithContext(_):_()}function Fe(_,N){let R;const[L,X,d]=$f(_,N);R=lr(L.reverse(),"beforeRouteLeave",_,N);for(const m of L)m.leaveGuards.forEach(v=>{R.push(Et(v,_,N))});const h=$e.bind(null,_,N);return R.push(h),Te(R).then(()=>{R=[];for(const m of i.list())R.push(Et(m,_,N));return R.push(h),Te(R)}).then(()=>{R=lr(X,"beforeRouteUpdate",_,N);for(const m of X)m.updateGuards.forEach(v=>{R.push(Et(v,_,N))});return R.push(h),Te(R)}).then(()=>{R=[];for(const m of d)if(m.beforeEnter)if(Me(m.beforeEnter))for(const v of m.beforeEnter)R.push(Et(v,_,N));else R.push(Et(m.beforeEnter,_,N));return R.push(h),Te(R)}).then(()=>(_.matched.forEach(m=>m.enterCallbacks={}),R=lr(d,"beforeRouteEnter",_,N,mt),R.push(h),Te(R))).then(()=>{R=[];for(const m of o.list())R.push(Et(m,_,N));return R.push(h),Te(R)}).catch(m=>nt(m,8)?m:Promise.reject(m))}function gt(_,N,R){c.list().forEach(L=>mt(()=>L(_,N,R)))}function Ft(_,N,R,L,X){const d=x(_,N);if(d)return d;const h=N===_t,m=tn?history.state:{};R&&(L||h?r.replace(_.fullPath,K({scroll:h&&m&&m.scroll},X)):r.push(_.fullPath,X)),a.value=_,Be(_,N,R,h),vt()}let He;function bn(){He||(He=r.listen((_,N,R)=>{if(!os.listening)return;const L=P(_),X=le(L);if(X){re(K(X,{replace:!0,force:!0}),L).catch(Mn);return}l=L;const d=a.value;tn&&of(Ji(d.fullPath,R.delta),zs()),Fe(L,d).catch(h=>nt(h,12)?h:nt(h,2)?(re(K(E(h.to),{force:!0}),L).then(m=>{nt(m,20)&&!R.delta&&R.type===qn.pop&&r.go(-1,!1)}).catch(Mn),Promise.reject()):(R.delta&&r.go(-R.delta,!1),W(h,L,d))).then(h=>{h=h||Ft(L,d,!1),h&&(R.delta&&!nt(h,8)?r.go(-R.delta,!1):R.type===qn.pop&&nt(h,20)&&r.go(-1,!1)),gt(L,d,h)}).catch(Mn)}))}let Jt=Sn(),ce=Sn(),J;function W(_,N,R){vt(_);const L=ce.list();return L.length?L.forEach(X=>X(_,N,R)):console.error(_),Promise.reject(_)}function et(){return J&&a.value!==_t?Promise.resolve():new Promise((_,N)=>{Jt.add([_,N])})}function vt(_){return J||(J=!_,bn(),Jt.list().forEach(([N,R])=>_?R(_):N()),Jt.reset()),_}function Be(_,N,R,L){const{scrollBehavior:X}=t;if(!tn||!X)return Promise.resolve();const d=!R&&af(Ji(_.fullPath,0))||(L||!R)&&history.state&&history.state.scroll||null;return ma().then(()=>X(_,N,d)).then(h=>h&&rf(h)).catch(h=>W(h,_,N))}const _e=_=>r.go(_);let Yt;const Xt=new Set,os={currentRoute:a,listening:!0,addRoute:g,removeRoute:S,clearRoutes:e.clearRoutes,hasRoute:F,getRoutes:k,resolve:P,options:t,push:D,replace:Y,go:_e,back:()=>_e(-1),forward:()=>_e(1),beforeEach:i.add,beforeResolve:o.add,afterEach:c.add,onError:ce.add,isReady:et,install(_){const N=this;_.component("RouterLink",xf),_.component("RouterView",Mf),_.config.globalProperties.$router=N,Object.defineProperty(_.config.globalProperties,"$route",{enumerable:!0,get:()=>Kt(a)}),tn&&!Yt&&a.value===_t&&(Yt=!0,D(r.location).catch(X=>{}));const R={};for(const X in _t)Object.defineProperty(R,X,{get:()=>a.value[X],enumerable:!0});_.provide(oi,N),_.provide(cc,ua(R)),_.provide(xr,a);const L=_.unmount;Xt.add(_),_.unmount=function(){Xt.delete(_),Xt.size<1&&(l=_t,He&&He(),He=null,a.value=_t,Yt=!1,J=!1),L()}}};function Te(_){return _.reduce((N,R)=>N.then(()=>mt(R)),Promise.resolve())}return os}function $f(t,e){const n=[],s=[],r=[],i=Math.max(e.matched.length,t.matched.length);for(let o=0;o<i;o++){const c=e.matched[o];c&&(t.matched.find(l=>pn(l,c))?s.push(c):n.push(c));const a=t.matched[o];a&&(e.matched.find(l=>pn(l,a))||r.push(a))}return[n,s,r]}const Ff="/icons/seguranca.png",Hf="/icons/praticidade.png",Bf="/icons/doacoes.png",Vf=[{id:"alimentacao-escolar",image:"./icons/crianca_carente.png",title:"Alimentação Escolar",description:"Garantindo refeições nutritivas para crianças em escolas públicas.",progress:89,goal:430},{id:"cuidados-com-idosos",image:"./icons/idososcarentes.png",title:"Cuidados com Idosos",description:"Apoio médico e social para idosos em situação de vulnerabilidade.",progress:56,goal:990},{id:"abrigo-moradores-rua",image:"./icons/mendigoscarente.png",title:"Abrigo para Moradores de Rua",description:"Oferecendo abrigo, alimentação e oportunidades de reinserção social.",progress:20,goal:640}],jf={class:"causas-card"},Wf=["src","alt"],Kf={class:"card-content"},zf={class:"description"},qf={class:"progress-bar-container"},Gf={class:"progress-info"},Jf={__name:"CausasCard",props:{cause:{type:Object,required:!0,default:()=>({})}},setup(t){const e=n=>new Intl.NumberFormat("pt-BR",{style:"currency",currency:"BRL",minimumFractionDigits:0,maximumFractionDigits:0}).format(n);return(n,s)=>(ne(),ie("div",jf,[O("img",{src:t.cause.image,alt:t.cause.title,class:"cause-image"},null,8,Wf),O("div",Kf,[O("h3",null,Oe(t.cause.title),1),O("p",zf,Oe(t.cause.description),1),O("div",qf,[O("div",{class:"progress-bar",style:Fs({width:t.cause.progress+"%"})},null,4)]),O("div",Gf,[O("span",null,Oe(t.cause.progress)+"% alcançado",1),O("span",null,"Meta: "+Oe(e(t.cause.goal)),1)]),s[0]||(s[0]=O("button",{class:"card-button"},"Doar para está causa",-1))])]))}},Yf=Ut(Jf,[["__scopeId","data-v-ef1cfdda"]]),ur="/icons/qrcode.png",Xf={class:"formas-doar-container"},Qf={__name:"PaymentComponent",props:{cause:{type:Object,required:!0,default:()=>({})}},setup(t){return(e,n)=>(ne(),ie("div",Xf,n[0]||(n[0]=[Wn('<div class="cards-container" data-v-e411a88a><div class="doacao-card" data-v-e411a88a><div class="doacao-img" data-v-e411a88a><img src="'+ur+'" alt="PIX" class="card-icon" data-v-e411a88a><h2 data-v-e411a88a>PIX</h2></div><p data-v-e411a88a>Doação instantânea via PIX. Rápido, seguro e sem taxas.</p><button class="button button-pix" data-v-e411a88a>Doar via PIX</button></div><div class="doacao-card" data-v-e411a88a><div class="doacao-img" data-v-e411a88a><img src="'+ur+'" alt="Cartão de crédito" class="card-icon" data-v-e411a88a><h2 data-v-e411a88a>Cartão de crédito</h2></div><p data-v-e411a88a>Doação única ou recorrente no cartão de crédito.</p><button class="button button-cartao" data-v-e411a88a>Doar no Cartão</button></div><div class="doacao-card" data-v-e411a88a><div class="doacao-img" data-v-e411a88a><img src="'+ur+'" alt="Doação física" class="card-icon" data-v-e411a88a><h2 data-v-e411a88a>Doação Física</h2></div><p data-v-e411a88a>Roupas, alimentos, brinquedos e outros itens.</p><button class="button button-fisica" data-v-e411a88a>Agendar Coleta</button></div></div>',1)])))}},Zf=Ut(Qf,[["__scopeId","data-v-e411a88a"]]),eh="/icons/MapTestJoinville.png",th={class:"mapa-container"},nh={__name:"MapInteractive",setup(t){return(e,n)=>(ne(),ie("div",th,n[0]||(n[0]=[Wn('<div class="mapa-section" data-v-ac0b8112><h1 class="title" data-v-ac0b8112>Mapa interativo</h1><p class="subtitle" data-v-ac0b8112>Escolha o local mais conveniente para você fazer sua doação</p><div class="content-wrapper" data-v-ac0b8112><div class="text-content" data-v-ac0b8112><h2 class="content-title" data-v-ac0b8112>Sua doação está a um passo de quem <span class="highlight" data-v-ac0b8112>precisa!</span></h2><div class="description" data-v-ac0b8112><p data-v-ac0b8112> Conectar quem quer ajudar com quem precisa é o nosso objetivo. Pensando nisso, criamos um mapa interativo com todas as unidades de doação da cidade de Joinville.<br data-v-ac0b8112> Através dele, você encontra com facilidade os pontos mais próximos e acessíveis para realizar sua doação.<br data-v-ac0b8112> Seja roupas, alimentos ou outros itens essenciais, cada gesto conta e pode transformar vidas.<br data-v-ac0b8112> A navegação é simples e intuitiva, explore o mapa, filtre por tipo de doação e descubra horários e informações de cada local.<br data-v-ac0b8112> Seu gesto de solidariedade pode mudar a vida de alguém. </p></div><button class="access-button" data-v-ac0b8112> Acessar o mapa </button><p class="map-note" data-v-ac0b8112> (o mapa é projetado apenas para a cidade de Joinville) </p></div><img src="'+eh+'" alt="Mapa de Joinville" class="map-image" data-v-ac0b8112></div></div>',1)])))}},sh=Ut(nh,[["__scopeId","data-v-ac0b8112"]]),rh={class:"nossas-causas"},ih={class:"causes-grid"},oh={class:"formas-de-doar"},ah={class:"payment-grid"},ch={class:"mapa-interativo"},lh={__name:"HomePage",setup(t){return(e,n)=>(ne(),ie("main",null,[n[3]||(n[3]=Wn('<div class="topo" data-v-9e260247><div class="overlay" data-v-9e260247></div><div class="banner" data-v-9e260247><h1 data-v-9e260247>Transforme Vidas com Sua Doação</h1><p data-v-9e260247>Conectamos doadores e instituições carentes de forma transparente e segura. Cada real doado faz a diferença na vida de quem mais precisa.</p><div class="buttons" data-v-9e260247><button class="primary" data-v-9e260247>Doar Agora</button><button class="secondary" data-v-9e260247>Saiba Mais</button></div></div></div>',1)),O("section",rh,[n[0]||(n[0]=O("h2",null,"Nossas Causas",-1)),n[1]||(n[1]=O("p",null,[At("Conheça os projetos que estão transformando vidas e "),O("br"),At("comunidades inteiras.")],-1)),O("div",ih,[(ne(!0),ie(Ce,null,Ir(Kt(Vf),s=>(ne(),ja(Yf,{key:s.id,cause:s},null,8,["cause"]))),128))])]),n[4]||(n[4]=Wn('<section class="escolher-sh" data-v-9e260247><h1 data-v-9e260247>Por que Escolher o ShareHelp?</h1><div class="escolher-coisas" data-v-9e260247><div class="escolher-div" data-v-9e260247><img src="'+Ff+'" alt="" data-v-9e260247><h2 data-v-9e260247>Segurança garantida</h2><p data-v-9e260247>Acompanhe em tempo real como sua doação <br data-v-9e260247> está sendo utilizada</p></div><div class="escolher-div" data-v-9e260247><img src="'+Hf+'" alt="" data-v-9e260247><h2 data-v-9e260247>Praticidade</h2><p data-v-9e260247>Receba relatórios detalhados sobre o impacto<br data-v-9e260247>das suas doações</p></div><div class="escolher-div" data-v-9e260247><img src="'+Bf+'" alt="" data-v-9e260247><h2 data-v-9e260247>Doações Recorrentes</h2><p data-v-9e260247>Configure doações automáticas mensais ou <br data-v-9e260247>anuais</p></div></div></section>',1)),O("section",oh,[n[2]||(n[2]=O("div",{class:"formas-desc"},[O("h1",null,"Formas de Doar"),O("p",null,"Escolha a forma mais conveniente para você fazer sua doação")],-1)),O("div",ah,[oe(Zf)])]),O("section",ch,[oe(sh)])]))}},uh=Ut(lh,[["__scopeId","data-v-9e260247"]]),dh=()=>{};var uo={};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const lc=function(t){const e=[];let n=0;for(let s=0;s<t.length;s++){let r=t.charCodeAt(s);r<128?e[n++]=r:r<2048?(e[n++]=r>>6|192,e[n++]=r&63|128):(r&64512)===55296&&s+1<t.length&&(t.charCodeAt(s+1)&64512)===56320?(r=65536+((r&1023)<<10)+(t.charCodeAt(++s)&1023),e[n++]=r>>18|240,e[n++]=r>>12&63|128,e[n++]=r>>6&63|128,e[n++]=r&63|128):(e[n++]=r>>12|224,e[n++]=r>>6&63|128,e[n++]=r&63|128)}return e},fh=function(t){const e=[];let n=0,s=0;for(;n<t.length;){const r=t[n++];if(r<128)e[s++]=String.fromCharCode(r);else if(r>191&&r<224){const i=t[n++];e[s++]=String.fromCharCode((r&31)<<6|i&63)}else if(r>239&&r<365){const i=t[n++],o=t[n++],c=t[n++],a=((r&7)<<18|(i&63)<<12|(o&63)<<6|c&63)-65536;e[s++]=String.fromCharCode(55296+(a>>10)),e[s++]=String.fromCharCode(56320+(a&1023))}else{const i=t[n++],o=t[n++];e[s++]=String.fromCharCode((r&15)<<12|(i&63)<<6|o&63)}}return e.join("")},uc={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:typeof atob=="function",encodeByteArray(t,e){if(!Array.isArray(t))throw Error("encodeByteArray takes an array as a parameter");this.init_();const n=e?this.byteToCharMapWebSafe_:this.byteToCharMap_,s=[];for(let r=0;r<t.length;r+=3){const i=t[r],o=r+1<t.length,c=o?t[r+1]:0,a=r+2<t.length,l=a?t[r+2]:0,u=i>>2,f=(i&3)<<4|c>>4;let p=(c&15)<<2|l>>6,g=l&63;a||(g=64,o||(p=64)),s.push(n[u],n[f],n[p],n[g])}return s.join("")},encodeString(t,e){return this.HAS_NATIVE_SUPPORT&&!e?btoa(t):this.encodeByteArray(lc(t),e)},decodeString(t,e){return this.HAS_NATIVE_SUPPORT&&!e?atob(t):fh(this.decodeStringToByteArray(t,e))},decodeStringToByteArray(t,e){this.init_();const n=e?this.charToByteMapWebSafe_:this.charToByteMap_,s=[];for(let r=0;r<t.length;){const i=n[t.charAt(r++)],c=r<t.length?n[t.charAt(r)]:0;++r;const l=r<t.length?n[t.charAt(r)]:64;++r;const f=r<t.length?n[t.charAt(r)]:64;if(++r,i==null||c==null||l==null||f==null)throw new hh;const p=i<<2|c>>4;if(s.push(p),l!==64){const g=c<<4&240|l>>2;if(s.push(g),f!==64){const S=l<<6&192|f;s.push(S)}}}return s},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let t=0;t<this.ENCODED_VALS.length;t++)this.byteToCharMap_[t]=this.ENCODED_VALS.charAt(t),this.charToByteMap_[this.byteToCharMap_[t]]=t,this.byteToCharMapWebSafe_[t]=this.ENCODED_VALS_WEBSAFE.charAt(t),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[t]]=t,t>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(t)]=t,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(t)]=t)}}};class hh extends Error{constructor(){super(...arguments),this.name="DecodeBase64StringError"}}const ph=function(t){const e=lc(t);return uc.encodeByteArray(e,!0)},dc=function(t){return ph(t).replace(/\./g,"")},fc=function(t){try{return uc.decodeString(t,!0)}catch(e){console.error("base64Decode failed: ",e)}return null};/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function mh(){if(typeof self<"u")return self;if(typeof window<"u")return window;if(typeof global<"u")return global;throw new Error("Unable to locate global object.")}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const gh=()=>mh().__FIREBASE_DEFAULTS__,vh=()=>{if(typeof process>"u"||typeof uo>"u")return;const t=uo.__FIREBASE_DEFAULTS__;if(t)return JSON.parse(t)},_h=()=>{if(typeof document>"u")return;let t;try{t=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch{return}const e=t&&fc(t[1]);return e&&JSON.parse(e)},ai=()=>{try{return dh()||gh()||vh()||_h()}catch(t){console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${t}`);return}},yh=t=>ai()?.emulatorHosts?.[t],hc=()=>ai()?.config,pc=t=>ai()?.[`_${t}`];/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class bh{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise((e,n)=>{this.resolve=e,this.reject=n})}wrapCallback(e){return(n,s)=>{n?this.reject(n):this.resolve(s),typeof e=="function"&&(this.promise.catch(()=>{}),e.length===1?e(n):e(n,s))}}}/**
 * @license
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function qs(t){try{return(t.startsWith("http://")||t.startsWith("https://")?new URL(t).hostname:t).endsWith(".cloudworkstations.dev")}catch{return!1}}async function wh(t){return(await fetch(t,{credentials:"include"})).ok}const $n={};function Eh(){const t={prod:[],emulator:[]};for(const e of Object.keys($n))$n[e]?t.emulator.push(e):t.prod.push(e);return t}function Ih(t){let e=document.getElementById(t),n=!1;return e||(e=document.createElement("div"),e.setAttribute("id",t),n=!0),{created:n,element:e}}let fo=!1;function Sh(t,e){if(typeof window>"u"||typeof document>"u"||!qs(window.location.host)||$n[t]===e||$n[t]||fo)return;$n[t]=e;function n(p){return`__firebase__banner__${p}`}const s="__firebase__banner",i=Eh().prod.length>0;function o(){const p=document.getElementById(s);p&&p.remove()}function c(p){p.style.display="flex",p.style.background="#7faaf0",p.style.position="fixed",p.style.bottom="5px",p.style.left="5px",p.style.padding=".5em",p.style.borderRadius="5px",p.style.alignItems="center"}function a(p,g){p.setAttribute("width","24"),p.setAttribute("id",g),p.setAttribute("height","24"),p.setAttribute("viewBox","0 0 24 24"),p.setAttribute("fill","none"),p.style.marginLeft="-6px"}function l(){const p=document.createElement("span");return p.style.cursor="pointer",p.style.marginLeft="16px",p.style.fontSize="24px",p.innerHTML=" &times;",p.onclick=()=>{fo=!0,o()},p}function u(p,g){p.setAttribute("id",g),p.innerText="Learn more",p.href="https://firebase.google.com/docs/studio/preview-apps#preview-backend",p.setAttribute("target","__blank"),p.style.paddingLeft="5px",p.style.textDecoration="underline"}function f(){const p=Ih(s),g=n("text"),S=document.getElementById(g)||document.createElement("span"),k=n("learnmore"),F=document.getElementById(k)||document.createElement("a"),P=n("preprendIcon"),E=document.getElementById(P)||document.createElementNS("http://www.w3.org/2000/svg","svg");if(p.created){const x=p.element;c(x),u(F,k);const D=l();a(E,P),x.append(E,S,F,D),document.body.appendChild(x)}i?(S.innerText="Preview backend disconnected.",E.innerHTML=`<g clip-path="url(#clip0_6013_33858)">
<path d="M4.8 17.6L12 5.6L19.2 17.6H4.8ZM6.91667 16.4H17.0833L12 7.93333L6.91667 16.4ZM12 15.6C12.1667 15.6 12.3056 15.5444 12.4167 15.4333C12.5389 15.3111 12.6 15.1667 12.6 15C12.6 14.8333 12.5389 14.6944 12.4167 14.5833C12.3056 14.4611 12.1667 14.4 12 14.4C11.8333 14.4 11.6889 14.4611 11.5667 14.5833C11.4556 14.6944 11.4 14.8333 11.4 15C11.4 15.1667 11.4556 15.3111 11.5667 15.4333C11.6889 15.5444 11.8333 15.6 12 15.6ZM11.4 13.6H12.6V10.4H11.4V13.6Z" fill="#212121"/>
</g>
<defs>
<clipPath id="clip0_6013_33858">
<rect width="24" height="24" fill="white"/>
</clipPath>
</defs>`):(E.innerHTML=`<g clip-path="url(#clip0_6083_34804)">
<path d="M11.4 15.2H12.6V11.2H11.4V15.2ZM12 10C12.1667 10 12.3056 9.94444 12.4167 9.83333C12.5389 9.71111 12.6 9.56667 12.6 9.4C12.6 9.23333 12.5389 9.09444 12.4167 8.98333C12.3056 8.86111 12.1667 8.8 12 8.8C11.8333 8.8 11.6889 8.86111 11.5667 8.98333C11.4556 9.09444 11.4 9.23333 11.4 9.4C11.4 9.56667 11.4556 9.71111 11.5667 9.83333C11.6889 9.94444 11.8333 10 12 10ZM12 18.4C11.1222 18.4 10.2944 18.2333 9.51667 17.9C8.73889 17.5667 8.05556 17.1111 7.46667 16.5333C6.88889 15.9444 6.43333 15.2611 6.1 14.4833C5.76667 13.7056 5.6 12.8778 5.6 12C5.6 11.1111 5.76667 10.2833 6.1 9.51667C6.43333 8.73889 6.88889 8.06111 7.46667 7.48333C8.05556 6.89444 8.73889 6.43333 9.51667 6.1C10.2944 5.76667 11.1222 5.6 12 5.6C12.8889 5.6 13.7167 5.76667 14.4833 6.1C15.2611 6.43333 15.9389 6.89444 16.5167 7.48333C17.1056 8.06111 17.5667 8.73889 17.9 9.51667C18.2333 10.2833 18.4 11.1111 18.4 12C18.4 12.8778 18.2333 13.7056 17.9 14.4833C17.5667 15.2611 17.1056 15.9444 16.5167 16.5333C15.9389 17.1111 15.2611 17.5667 14.4833 17.9C13.7167 18.2333 12.8889 18.4 12 18.4ZM12 17.2C13.4444 17.2 14.6722 16.6944 15.6833 15.6833C16.6944 14.6722 17.2 13.4444 17.2 12C17.2 10.5556 16.6944 9.32778 15.6833 8.31667C14.6722 7.30555 13.4444 6.8 12 6.8C10.5556 6.8 9.32778 7.30555 8.31667 8.31667C7.30556 9.32778 6.8 10.5556 6.8 12C6.8 13.4444 7.30556 14.6722 8.31667 15.6833C9.32778 16.6944 10.5556 17.2 12 17.2Z" fill="#212121"/>
</g>
<defs>
<clipPath id="clip0_6083_34804">
<rect width="24" height="24" fill="white"/>
</clipPath>
</defs>`,S.innerText="Preview backend running in this workspace."),S.setAttribute("id",g)}document.readyState==="loading"?window.addEventListener("DOMContentLoaded",f):f()}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ve(){return typeof navigator<"u"&&typeof navigator.userAgent=="string"?navigator.userAgent:""}function Th(){return typeof window<"u"&&!!(window.cordova||window.phonegap||window.PhoneGap)&&/ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(ve())}function Ch(){return typeof navigator<"u"&&navigator.userAgent==="Cloudflare-Workers"}function Rh(){const t=typeof chrome=="object"?chrome.runtime:typeof browser=="object"?browser.runtime:void 0;return typeof t=="object"&&t.id!==void 0}function Ah(){return typeof navigator=="object"&&navigator.product==="ReactNative"}function Ph(){const t=ve();return t.indexOf("MSIE ")>=0||t.indexOf("Trident/")>=0}function kh(){try{return typeof indexedDB=="object"}catch{return!1}}function Oh(){return new Promise((t,e)=>{try{let n=!0;const s="validate-browser-context-for-indexeddb-analytics-module",r=self.indexedDB.open(s);r.onsuccess=()=>{r.result.close(),n||self.indexedDB.deleteDatabase(s),t(!0)},r.onupgradeneeded=()=>{n=!1},r.onerror=()=>{e(r.error?.message||"")}}catch(n){e(n)}})}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const xh="FirebaseError";class $t extends Error{constructor(e,n,s){super(n),this.code=e,this.customData=s,this.name=xh,Object.setPrototypeOf(this,$t.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,Zn.prototype.create)}}class Zn{constructor(e,n,s){this.service=e,this.serviceName=n,this.errors=s}create(e,...n){const s=n[0]||{},r=`${this.service}/${e}`,i=this.errors[e],o=i?Nh(i,s):"Error",c=`${this.serviceName}: ${o} (${r}).`;return new $t(r,c,s)}}function Nh(t,e){return t.replace(Dh,(n,s)=>{const r=e[s];return r!=null?String(r):`<${s}?>`})}const Dh=/\{\$([^}]+)}/g;function Lh(t){for(const e in t)if(Object.prototype.hasOwnProperty.call(t,e))return!1;return!0}function gn(t,e){if(t===e)return!0;const n=Object.keys(t),s=Object.keys(e);for(const r of n){if(!s.includes(r))return!1;const i=t[r],o=e[r];if(ho(i)&&ho(o)){if(!gn(i,o))return!1}else if(i!==o)return!1}for(const r of s)if(!n.includes(r))return!1;return!0}function ho(t){return t!==null&&typeof t=="object"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function es(t){const e=[];for(const[n,s]of Object.entries(t))Array.isArray(s)?s.forEach(r=>{e.push(encodeURIComponent(n)+"="+encodeURIComponent(r))}):e.push(encodeURIComponent(n)+"="+encodeURIComponent(s));return e.length?"&"+e.join("&"):""}function Rn(t){const e={};return t.replace(/^\?/,"").split("&").forEach(s=>{if(s){const[r,i]=s.split("=");e[decodeURIComponent(r)]=decodeURIComponent(i)}}),e}function An(t){const e=t.indexOf("?");if(!e)return"";const n=t.indexOf("#",e);return t.substring(e,n>0?n:void 0)}function Mh(t,e){const n=new Uh(t,e);return n.subscribe.bind(n)}class Uh{constructor(e,n){this.observers=[],this.unsubscribes=[],this.observerCount=0,this.task=Promise.resolve(),this.finalized=!1,this.onNoObservers=n,this.task.then(()=>{e(this)}).catch(s=>{this.error(s)})}next(e){this.forEachObserver(n=>{n.next(e)})}error(e){this.forEachObserver(n=>{n.error(e)}),this.close(e)}complete(){this.forEachObserver(e=>{e.complete()}),this.close()}subscribe(e,n,s){let r;if(e===void 0&&n===void 0&&s===void 0)throw new Error("Missing Observer.");$h(e,["next","error","complete"])?r=e:r={next:e,error:n,complete:s},r.next===void 0&&(r.next=dr),r.error===void 0&&(r.error=dr),r.complete===void 0&&(r.complete=dr);const i=this.unsubscribeOne.bind(this,this.observers.length);return this.finalized&&this.task.then(()=>{try{this.finalError?r.error(this.finalError):r.complete()}catch{}}),this.observers.push(r),i}unsubscribeOne(e){this.observers===void 0||this.observers[e]===void 0||(delete this.observers[e],this.observerCount-=1,this.observerCount===0&&this.onNoObservers!==void 0&&this.onNoObservers(this))}forEachObserver(e){if(!this.finalized)for(let n=0;n<this.observers.length;n++)this.sendOne(n,e)}sendOne(e,n){this.task.then(()=>{if(this.observers!==void 0&&this.observers[e]!==void 0)try{n(this.observers[e])}catch(s){typeof console<"u"&&console.error&&console.error(s)}})}close(e){this.finalized||(this.finalized=!0,e!==void 0&&(this.finalError=e),this.task.then(()=>{this.observers=void 0,this.onNoObservers=void 0}))}}function $h(t,e){if(typeof t!="object"||t===null)return!1;for(const n of e)if(n in t&&typeof t[n]=="function")return!0;return!1}function dr(){}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Qe(t){return t&&t._delegate?t._delegate:t}class vn{constructor(e,n,s){this.name=e,this.instanceFactory=n,this.type=s,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(e){return this.instantiationMode=e,this}setMultipleInstances(e){return this.multipleInstances=e,this}setServiceProps(e){return this.serviceProps=e,this}setInstanceCreatedCallback(e){return this.onInstanceCreated=e,this}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const jt="[DEFAULT]";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Fh{constructor(e,n){this.name=e,this.container=n,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(e){const n=this.normalizeInstanceIdentifier(e);if(!this.instancesDeferred.has(n)){const s=new bh;if(this.instancesDeferred.set(n,s),this.isInitialized(n)||this.shouldAutoInitialize())try{const r=this.getOrInitializeService({instanceIdentifier:n});r&&s.resolve(r)}catch{}}return this.instancesDeferred.get(n).promise}getImmediate(e){const n=this.normalizeInstanceIdentifier(e?.identifier),s=e?.optional??!1;if(this.isInitialized(n)||this.shouldAutoInitialize())try{return this.getOrInitializeService({instanceIdentifier:n})}catch(r){if(s)return null;throw r}else{if(s)return null;throw Error(`Service ${this.name} is not available`)}}getComponent(){return this.component}setComponent(e){if(e.name!==this.name)throw Error(`Mismatching Component ${e.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=e,!!this.shouldAutoInitialize()){if(Bh(e))try{this.getOrInitializeService({instanceIdentifier:jt})}catch{}for(const[n,s]of this.instancesDeferred.entries()){const r=this.normalizeInstanceIdentifier(n);try{const i=this.getOrInitializeService({instanceIdentifier:r});s.resolve(i)}catch{}}}}clearInstance(e=jt){this.instancesDeferred.delete(e),this.instancesOptions.delete(e),this.instances.delete(e)}async delete(){const e=Array.from(this.instances.values());await Promise.all([...e.filter(n=>"INTERNAL"in n).map(n=>n.INTERNAL.delete()),...e.filter(n=>"_delete"in n).map(n=>n._delete())])}isComponentSet(){return this.component!=null}isInitialized(e=jt){return this.instances.has(e)}getOptions(e=jt){return this.instancesOptions.get(e)||{}}initialize(e={}){const{options:n={}}=e,s=this.normalizeInstanceIdentifier(e.instanceIdentifier);if(this.isInitialized(s))throw Error(`${this.name}(${s}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);const r=this.getOrInitializeService({instanceIdentifier:s,options:n});for(const[i,o]of this.instancesDeferred.entries()){const c=this.normalizeInstanceIdentifier(i);s===c&&o.resolve(r)}return r}onInit(e,n){const s=this.normalizeInstanceIdentifier(n),r=this.onInitCallbacks.get(s)??new Set;r.add(e),this.onInitCallbacks.set(s,r);const i=this.instances.get(s);return i&&e(i,s),()=>{r.delete(e)}}invokeOnInitCallbacks(e,n){const s=this.onInitCallbacks.get(n);if(s)for(const r of s)try{r(e,n)}catch{}}getOrInitializeService({instanceIdentifier:e,options:n={}}){let s=this.instances.get(e);if(!s&&this.component&&(s=this.component.instanceFactory(this.container,{instanceIdentifier:Hh(e),options:n}),this.instances.set(e,s),this.instancesOptions.set(e,n),this.invokeOnInitCallbacks(s,e),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,e,s)}catch{}return s||null}normalizeInstanceIdentifier(e=jt){return this.component?this.component.multipleInstances?e:jt:e}shouldAutoInitialize(){return!!this.component&&this.component.instantiationMode!=="EXPLICIT"}}function Hh(t){return t===jt?void 0:t}function Bh(t){return t.instantiationMode==="EAGER"}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Vh{constructor(e){this.name=e,this.providers=new Map}addComponent(e){const n=this.getProvider(e.name);if(n.isComponentSet())throw new Error(`Component ${e.name} has already been registered with ${this.name}`);n.setComponent(e)}addOrOverwriteComponent(e){this.getProvider(e.name).isComponentSet()&&this.providers.delete(e.name),this.addComponent(e)}getProvider(e){if(this.providers.has(e))return this.providers.get(e);const n=new Fh(e,this);return this.providers.set(e,n),n}getProviders(){return Array.from(this.providers.values())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var Q;(function(t){t[t.DEBUG=0]="DEBUG",t[t.VERBOSE=1]="VERBOSE",t[t.INFO=2]="INFO",t[t.WARN=3]="WARN",t[t.ERROR=4]="ERROR",t[t.SILENT=5]="SILENT"})(Q||(Q={}));const jh={debug:Q.DEBUG,verbose:Q.VERBOSE,info:Q.INFO,warn:Q.WARN,error:Q.ERROR,silent:Q.SILENT},Wh=Q.INFO,Kh={[Q.DEBUG]:"log",[Q.VERBOSE]:"log",[Q.INFO]:"info",[Q.WARN]:"warn",[Q.ERROR]:"error"},zh=(t,e,...n)=>{if(e<t.logLevel)return;const s=new Date().toISOString(),r=Kh[e];if(r)console[r](`[${s}]  ${t.name}:`,...n);else throw new Error(`Attempted to log a message with an invalid logType (value: ${e})`)};class mc{constructor(e){this.name=e,this._logLevel=Wh,this._logHandler=zh,this._userLogHandler=null}get logLevel(){return this._logLevel}set logLevel(e){if(!(e in Q))throw new TypeError(`Invalid value "${e}" assigned to \`logLevel\``);this._logLevel=e}setLogLevel(e){this._logLevel=typeof e=="string"?jh[e]:e}get logHandler(){return this._logHandler}set logHandler(e){if(typeof e!="function")throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=e}get userLogHandler(){return this._userLogHandler}set userLogHandler(e){this._userLogHandler=e}debug(...e){this._userLogHandler&&this._userLogHandler(this,Q.DEBUG,...e),this._logHandler(this,Q.DEBUG,...e)}log(...e){this._userLogHandler&&this._userLogHandler(this,Q.VERBOSE,...e),this._logHandler(this,Q.VERBOSE,...e)}info(...e){this._userLogHandler&&this._userLogHandler(this,Q.INFO,...e),this._logHandler(this,Q.INFO,...e)}warn(...e){this._userLogHandler&&this._userLogHandler(this,Q.WARN,...e),this._logHandler(this,Q.WARN,...e)}error(...e){this._userLogHandler&&this._userLogHandler(this,Q.ERROR,...e),this._logHandler(this,Q.ERROR,...e)}}const qh=(t,e)=>e.some(n=>t instanceof n);let po,mo;function Gh(){return po||(po=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function Jh(){return mo||(mo=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}const gc=new WeakMap,Nr=new WeakMap,vc=new WeakMap,fr=new WeakMap,ci=new WeakMap;function Yh(t){const e=new Promise((n,s)=>{const r=()=>{t.removeEventListener("success",i),t.removeEventListener("error",o)},i=()=>{n(kt(t.result)),r()},o=()=>{s(t.error),r()};t.addEventListener("success",i),t.addEventListener("error",o)});return e.then(n=>{n instanceof IDBCursor&&gc.set(n,t)}).catch(()=>{}),ci.set(e,t),e}function Xh(t){if(Nr.has(t))return;const e=new Promise((n,s)=>{const r=()=>{t.removeEventListener("complete",i),t.removeEventListener("error",o),t.removeEventListener("abort",o)},i=()=>{n(),r()},o=()=>{s(t.error||new DOMException("AbortError","AbortError")),r()};t.addEventListener("complete",i),t.addEventListener("error",o),t.addEventListener("abort",o)});Nr.set(t,e)}let Dr={get(t,e,n){if(t instanceof IDBTransaction){if(e==="done")return Nr.get(t);if(e==="objectStoreNames")return t.objectStoreNames||vc.get(t);if(e==="store")return n.objectStoreNames[1]?void 0:n.objectStore(n.objectStoreNames[0])}return kt(t[e])},set(t,e,n){return t[e]=n,!0},has(t,e){return t instanceof IDBTransaction&&(e==="done"||e==="store")?!0:e in t}};function Qh(t){Dr=t(Dr)}function Zh(t){return t===IDBDatabase.prototype.transaction&&!("objectStoreNames"in IDBTransaction.prototype)?function(e,...n){const s=t.call(hr(this),e,...n);return vc.set(s,e.sort?e.sort():[e]),kt(s)}:Jh().includes(t)?function(...e){return t.apply(hr(this),e),kt(gc.get(this))}:function(...e){return kt(t.apply(hr(this),e))}}function ep(t){return typeof t=="function"?Zh(t):(t instanceof IDBTransaction&&Xh(t),qh(t,Gh())?new Proxy(t,Dr):t)}function kt(t){if(t instanceof IDBRequest)return Yh(t);if(fr.has(t))return fr.get(t);const e=ep(t);return e!==t&&(fr.set(t,e),ci.set(e,t)),e}const hr=t=>ci.get(t);function tp(t,e,{blocked:n,upgrade:s,blocking:r,terminated:i}={}){const o=indexedDB.open(t,e),c=kt(o);return s&&o.addEventListener("upgradeneeded",a=>{s(kt(o.result),a.oldVersion,a.newVersion,kt(o.transaction),a)}),n&&o.addEventListener("blocked",a=>n(a.oldVersion,a.newVersion,a)),c.then(a=>{i&&a.addEventListener("close",()=>i()),r&&a.addEventListener("versionchange",l=>r(l.oldVersion,l.newVersion,l))}).catch(()=>{}),c}const np=["get","getKey","getAll","getAllKeys","count"],sp=["put","add","delete","clear"],pr=new Map;function go(t,e){if(!(t instanceof IDBDatabase&&!(e in t)&&typeof e=="string"))return;if(pr.get(e))return pr.get(e);const n=e.replace(/FromIndex$/,""),s=e!==n,r=sp.includes(n);if(!(n in(s?IDBIndex:IDBObjectStore).prototype)||!(r||np.includes(n)))return;const i=async function(o,...c){const a=this.transaction(o,r?"readwrite":"readonly");let l=a.store;return s&&(l=l.index(c.shift())),(await Promise.all([l[n](...c),r&&a.done]))[0]};return pr.set(e,i),i}Qh(t=>({...t,get:(e,n,s)=>go(e,n)||t.get(e,n,s),has:(e,n)=>!!go(e,n)||t.has(e,n)}));/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class rp{constructor(e){this.container=e}getPlatformInfoString(){return this.container.getProviders().map(n=>{if(ip(n)){const s=n.getImmediate();return`${s.library}/${s.version}`}else return null}).filter(n=>n).join(" ")}}function ip(t){return t.getComponent()?.type==="VERSION"}const Lr="@firebase/app",vo="0.14.0";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const dt=new mc("@firebase/app"),op="@firebase/app-compat",ap="@firebase/analytics-compat",cp="@firebase/analytics",lp="@firebase/app-check-compat",up="@firebase/app-check",dp="@firebase/auth",fp="@firebase/auth-compat",hp="@firebase/database",pp="@firebase/data-connect",mp="@firebase/database-compat",gp="@firebase/functions",vp="@firebase/functions-compat",_p="@firebase/installations",yp="@firebase/installations-compat",bp="@firebase/messaging",wp="@firebase/messaging-compat",Ep="@firebase/performance",Ip="@firebase/performance-compat",Sp="@firebase/remote-config",Tp="@firebase/remote-config-compat",Cp="@firebase/storage",Rp="@firebase/storage-compat",Ap="@firebase/firestore",Pp="@firebase/ai",kp="@firebase/firestore-compat",Op="firebase",xp="12.0.0";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Mr="[DEFAULT]",Np={[Lr]:"fire-core",[op]:"fire-core-compat",[cp]:"fire-analytics",[ap]:"fire-analytics-compat",[up]:"fire-app-check",[lp]:"fire-app-check-compat",[dp]:"fire-auth",[fp]:"fire-auth-compat",[hp]:"fire-rtdb",[pp]:"fire-data-connect",[mp]:"fire-rtdb-compat",[gp]:"fire-fn",[vp]:"fire-fn-compat",[_p]:"fire-iid",[yp]:"fire-iid-compat",[bp]:"fire-fcm",[wp]:"fire-fcm-compat",[Ep]:"fire-perf",[Ip]:"fire-perf-compat",[Sp]:"fire-rc",[Tp]:"fire-rc-compat",[Cp]:"fire-gcs",[Rp]:"fire-gcs-compat",[Ap]:"fire-fst",[kp]:"fire-fst-compat",[Pp]:"fire-vertex","fire-js":"fire-js",[Op]:"fire-js-all"};/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Rs=new Map,Dp=new Map,Ur=new Map;function _o(t,e){try{t.container.addComponent(e)}catch(n){dt.debug(`Component ${e.name} failed to register with FirebaseApp ${t.name}`,n)}}function Gn(t){const e=t.name;if(Ur.has(e))return dt.debug(`There were multiple attempts to register component ${e}.`),!1;Ur.set(e,t);for(const n of Rs.values())_o(n,t);for(const n of Dp.values())_o(n,t);return!0}function _c(t,e){const n=t.container.getProvider("heartbeat").getImmediate({optional:!0});return n&&n.triggerHeartbeat(),t.container.getProvider(e)}function xe(t){return t==null?!1:t.settings!==void 0}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Lp={"no-app":"No Firebase App '{$appName}' has been created - call initializeApp() first","bad-app-name":"Illegal App name: '{$appName}'","duplicate-app":"Firebase App named '{$appName}' already exists with different options or config","app-deleted":"Firebase App named '{$appName}' already deleted","server-app-deleted":"Firebase Server App has been deleted","no-options":"Need to provide options, when not being deployed to hosting via source.","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance.","invalid-log-argument":"First argument to `onLog` must be null or a function.","idb-open":"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.","idb-get":"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.","idb-set":"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.","idb-delete":"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}.","finalization-registry-not-supported":"FirebaseServerApp deleteOnDeref field defined but the JS runtime does not support FinalizationRegistry.","invalid-server-app-environment":"FirebaseServerApp is not for use in browser environments."},Ot=new Zn("app","Firebase",Lp);/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Mp{constructor(e,n,s){this._isDeleted=!1,this._options={...e},this._config={...n},this._name=n.name,this._automaticDataCollectionEnabled=n.automaticDataCollectionEnabled,this._container=s,this.container.addComponent(new vn("app",()=>this,"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(e){this.checkDestroyed(),this._automaticDataCollectionEnabled=e}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(e){this._isDeleted=e}checkDestroyed(){if(this.isDeleted)throw Ot.create("app-deleted",{appName:this._name})}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ts=xp;function yc(t,e={}){let n=t;typeof e!="object"&&(e={name:e});const s={name:Mr,automaticDataCollectionEnabled:!0,...e},r=s.name;if(typeof r!="string"||!r)throw Ot.create("bad-app-name",{appName:String(r)});if(n||(n=hc()),!n)throw Ot.create("no-options");const i=Rs.get(r);if(i){if(gn(n,i.options)&&gn(s,i.config))return i;throw Ot.create("duplicate-app",{appName:r})}const o=new Vh(r);for(const a of Ur.values())o.addComponent(a);const c=new Mp(n,s,o);return Rs.set(r,c),c}function Up(t=Mr){const e=Rs.get(t);if(!e&&t===Mr&&hc())return yc();if(!e)throw Ot.create("no-app",{appName:t});return e}function ln(t,e,n){let s=Np[t]??t;n&&(s+=`-${n}`);const r=s.match(/\s|\//),i=e.match(/\s|\//);if(r||i){const o=[`Unable to register library "${s}" with version "${e}":`];r&&o.push(`library name "${s}" contains illegal characters (whitespace or "/")`),r&&i&&o.push("and"),i&&o.push(`version name "${e}" contains illegal characters (whitespace or "/")`),dt.warn(o.join(" "));return}Gn(new vn(`${s}-version`,()=>({library:s,version:e}),"VERSION"))}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const $p="firebase-heartbeat-database",Fp=1,Jn="firebase-heartbeat-store";let mr=null;function bc(){return mr||(mr=tp($p,Fp,{upgrade:(t,e)=>{switch(e){case 0:try{t.createObjectStore(Jn)}catch(n){console.warn(n)}}}}).catch(t=>{throw Ot.create("idb-open",{originalErrorMessage:t.message})})),mr}async function Hp(t){try{const n=(await bc()).transaction(Jn),s=await n.objectStore(Jn).get(wc(t));return await n.done,s}catch(e){if(e instanceof $t)dt.warn(e.message);else{const n=Ot.create("idb-get",{originalErrorMessage:e?.message});dt.warn(n.message)}}}async function yo(t,e){try{const s=(await bc()).transaction(Jn,"readwrite");await s.objectStore(Jn).put(e,wc(t)),await s.done}catch(n){if(n instanceof $t)dt.warn(n.message);else{const s=Ot.create("idb-set",{originalErrorMessage:n?.message});dt.warn(s.message)}}}function wc(t){return`${t.name}!${t.options.appId}`}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Bp=1024,Vp=30;class jp{constructor(e){this.container=e,this._heartbeatsCache=null;const n=this.container.getProvider("app").getImmediate();this._storage=new Kp(n),this._heartbeatsCachePromise=this._storage.read().then(s=>(this._heartbeatsCache=s,s))}async triggerHeartbeat(){try{const n=this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(),s=bo();if(this._heartbeatsCache?.heartbeats==null&&(this._heartbeatsCache=await this._heartbeatsCachePromise,this._heartbeatsCache?.heartbeats==null)||this._heartbeatsCache.lastSentHeartbeatDate===s||this._heartbeatsCache.heartbeats.some(r=>r.date===s))return;if(this._heartbeatsCache.heartbeats.push({date:s,agent:n}),this._heartbeatsCache.heartbeats.length>Vp){const r=zp(this._heartbeatsCache.heartbeats);this._heartbeatsCache.heartbeats.splice(r,1)}return this._storage.overwrite(this._heartbeatsCache)}catch(e){dt.warn(e)}}async getHeartbeatsHeader(){try{if(this._heartbeatsCache===null&&await this._heartbeatsCachePromise,this._heartbeatsCache?.heartbeats==null||this._heartbeatsCache.heartbeats.length===0)return"";const e=bo(),{heartbeatsToSend:n,unsentEntries:s}=Wp(this._heartbeatsCache.heartbeats),r=dc(JSON.stringify({version:2,heartbeats:n}));return this._heartbeatsCache.lastSentHeartbeatDate=e,s.length>0?(this._heartbeatsCache.heartbeats=s,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),r}catch(e){return dt.warn(e),""}}}function bo(){return new Date().toISOString().substring(0,10)}function Wp(t,e=Bp){const n=[];let s=t.slice();for(const r of t){const i=n.find(o=>o.agent===r.agent);if(i){if(i.dates.push(r.date),wo(n)>e){i.dates.pop();break}}else if(n.push({agent:r.agent,dates:[r.date]}),wo(n)>e){n.pop();break}s=s.slice(1)}return{heartbeatsToSend:n,unsentEntries:s}}class Kp{constructor(e){this.app=e,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return kh()?Oh().then(()=>!0).catch(()=>!1):!1}async read(){if(await this._canUseIndexedDBPromise){const n=await Hp(this.app);return n?.heartbeats?n:{heartbeats:[]}}else return{heartbeats:[]}}async overwrite(e){if(await this._canUseIndexedDBPromise){const s=await this.read();return yo(this.app,{lastSentHeartbeatDate:e.lastSentHeartbeatDate??s.lastSentHeartbeatDate,heartbeats:e.heartbeats})}else return}async add(e){if(await this._canUseIndexedDBPromise){const s=await this.read();return yo(this.app,{lastSentHeartbeatDate:e.lastSentHeartbeatDate??s.lastSentHeartbeatDate,heartbeats:[...s.heartbeats,...e.heartbeats]})}else return}}function wo(t){return dc(JSON.stringify({version:2,heartbeats:t})).length}function zp(t){if(t.length===0)return-1;let e=0,n=t[0].date;for(let s=1;s<t.length;s++)t[s].date<n&&(n=t[s].date,e=s);return e}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function qp(t){Gn(new vn("platform-logger",e=>new rp(e),"PRIVATE")),Gn(new vn("heartbeat",e=>new jp(e),"PRIVATE")),ln(Lr,vo,t),ln(Lr,vo,"esm2020"),ln("fire-js","")}qp("");function Ec(){return{"dependent-sdk-initialized-before-auth":"Another Firebase SDK was initialized and is trying to use Auth before Auth is initialized. Please be sure to call `initializeAuth` or `getAuth` before starting any other Firebase SDK."}}const Gp=Ec,Ic=new Zn("auth","Firebase",Ec());/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const As=new mc("@firebase/auth");function Jp(t,...e){As.logLevel<=Q.WARN&&As.warn(`Auth (${ts}): ${t}`,...e)}function gs(t,...e){As.logLevel<=Q.ERROR&&As.error(`Auth (${ts}): ${t}`,...e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ue(t,...e){throw li(t,...e)}function Je(t,...e){return li(t,...e)}function Sc(t,e,n){const s={...Gp(),[e]:n};return new Zn("auth","Firebase",s).create(e,{appName:t.name})}function ct(t){return Sc(t,"operation-not-supported-in-this-environment","Operations that alter the current user are not supported in conjunction with FirebaseServerApp")}function li(t,...e){if(typeof t!="string"){const n=e[0],s=[...e.slice(1)];return s[0]&&(s[0].appName=t.name),t._errorFactory.create(n,...s)}return Ic.create(t,...e)}function U(t,e,...n){if(!t)throw li(e,...n)}function it(t){const e="INTERNAL ASSERTION FAILED: "+t;throw gs(e),new Error(e)}function ft(t,e){t||it(e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function $r(){return typeof self<"u"&&self.location?.href||""}function Yp(){return Eo()==="http:"||Eo()==="https:"}function Eo(){return typeof self<"u"&&self.location?.protocol||null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Xp(){return typeof navigator<"u"&&navigator&&"onLine"in navigator&&typeof navigator.onLine=="boolean"&&(Yp()||Rh()||"connection"in navigator)?navigator.onLine:!0}function Qp(){if(typeof navigator>"u")return null;const t=navigator;return t.languages&&t.languages[0]||t.language||null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ns{constructor(e,n){this.shortDelay=e,this.longDelay=n,ft(n>e,"Short delay should be less than long delay!"),this.isMobile=Th()||Ah()}get(){return Xp()?this.isMobile?this.longDelay:this.shortDelay:Math.min(5e3,this.shortDelay)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ui(t,e){ft(t.emulator,"Emulator should always be set here");const{url:n}=t.emulator;return e?`${n}${e.startsWith("/")?e.slice(1):e}`:n}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Tc{static initialize(e,n,s){this.fetchImpl=e,n&&(this.headersImpl=n),s&&(this.responseImpl=s)}static fetch(){if(this.fetchImpl)return this.fetchImpl;if(typeof self<"u"&&"fetch"in self)return self.fetch;if(typeof globalThis<"u"&&globalThis.fetch)return globalThis.fetch;if(typeof fetch<"u")return fetch;it("Could not find fetch implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static headers(){if(this.headersImpl)return this.headersImpl;if(typeof self<"u"&&"Headers"in self)return self.Headers;if(typeof globalThis<"u"&&globalThis.Headers)return globalThis.Headers;if(typeof Headers<"u")return Headers;it("Could not find Headers implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static response(){if(this.responseImpl)return this.responseImpl;if(typeof self<"u"&&"Response"in self)return self.Response;if(typeof globalThis<"u"&&globalThis.Response)return globalThis.Response;if(typeof Response<"u")return Response;it("Could not find Response implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Zp={CREDENTIAL_MISMATCH:"custom-token-mismatch",MISSING_CUSTOM_TOKEN:"internal-error",INVALID_IDENTIFIER:"invalid-email",MISSING_CONTINUE_URI:"internal-error",INVALID_PASSWORD:"wrong-password",MISSING_PASSWORD:"missing-password",INVALID_LOGIN_CREDENTIALS:"invalid-credential",EMAIL_EXISTS:"email-already-in-use",PASSWORD_LOGIN_DISABLED:"operation-not-allowed",INVALID_IDP_RESPONSE:"invalid-credential",INVALID_PENDING_TOKEN:"invalid-credential",FEDERATED_USER_ID_ALREADY_LINKED:"credential-already-in-use",MISSING_REQ_TYPE:"internal-error",EMAIL_NOT_FOUND:"user-not-found",RESET_PASSWORD_EXCEED_LIMIT:"too-many-requests",EXPIRED_OOB_CODE:"expired-action-code",INVALID_OOB_CODE:"invalid-action-code",MISSING_OOB_CODE:"internal-error",CREDENTIAL_TOO_OLD_LOGIN_AGAIN:"requires-recent-login",INVALID_ID_TOKEN:"invalid-user-token",TOKEN_EXPIRED:"user-token-expired",USER_NOT_FOUND:"user-token-expired",TOO_MANY_ATTEMPTS_TRY_LATER:"too-many-requests",PASSWORD_DOES_NOT_MEET_REQUIREMENTS:"password-does-not-meet-requirements",INVALID_CODE:"invalid-verification-code",INVALID_SESSION_INFO:"invalid-verification-id",INVALID_TEMPORARY_PROOF:"invalid-credential",MISSING_SESSION_INFO:"missing-verification-id",SESSION_EXPIRED:"code-expired",MISSING_ANDROID_PACKAGE_NAME:"missing-android-pkg-name",UNAUTHORIZED_DOMAIN:"unauthorized-continue-uri",INVALID_OAUTH_CLIENT_ID:"invalid-oauth-client-id",ADMIN_ONLY_OPERATION:"admin-restricted-operation",INVALID_MFA_PENDING_CREDENTIAL:"invalid-multi-factor-session",MFA_ENROLLMENT_NOT_FOUND:"multi-factor-info-not-found",MISSING_MFA_ENROLLMENT_ID:"missing-multi-factor-info",MISSING_MFA_PENDING_CREDENTIAL:"missing-multi-factor-session",SECOND_FACTOR_EXISTS:"second-factor-already-in-use",SECOND_FACTOR_LIMIT_EXCEEDED:"maximum-second-factor-count-exceeded",BLOCKING_FUNCTION_ERROR_RESPONSE:"internal-error",RECAPTCHA_NOT_ENABLED:"recaptcha-not-enabled",MISSING_RECAPTCHA_TOKEN:"missing-recaptcha-token",INVALID_RECAPTCHA_TOKEN:"invalid-recaptcha-token",INVALID_RECAPTCHA_ACTION:"invalid-recaptcha-action",MISSING_CLIENT_TYPE:"missing-client-type",MISSING_RECAPTCHA_VERSION:"missing-recaptcha-version",INVALID_RECAPTCHA_VERSION:"invalid-recaptcha-version",INVALID_REQ_TYPE:"invalid-req-type"};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const em=["/v1/accounts:signInWithCustomToken","/v1/accounts:signInWithEmailLink","/v1/accounts:signInWithIdp","/v1/accounts:signInWithPassword","/v1/accounts:signInWithPhoneNumber","/v1/token"],tm=new ns(3e4,6e4);function pt(t,e){return t.tenantId&&!e.tenantId?{...e,tenantId:t.tenantId}:e}async function Ze(t,e,n,s,r={}){return Cc(t,r,async()=>{let i={},o={};s&&(e==="GET"?o=s:i={body:JSON.stringify(s)});const c=es({key:t.config.apiKey,...o}).slice(1),a=await t._getAdditionalHeaders();a["Content-Type"]="application/json",t.languageCode&&(a["X-Firebase-Locale"]=t.languageCode);const l={method:e,headers:a,...i};return Ch()||(l.referrerPolicy="no-referrer"),t.emulatorConfig&&qs(t.emulatorConfig.host)&&(l.credentials="include"),Tc.fetch()(await Rc(t,t.config.apiHost,n,c),l)})}async function Cc(t,e,n){t._canInitEmulator=!1;const s={...Zp,...e};try{const r=new sm(t),i=await Promise.race([n(),r.promise]);r.clearNetworkTimeout();const o=await i.json();if("needConfirmation"in o)throw us(t,"account-exists-with-different-credential",o);if(i.ok&&!("errorMessage"in o))return o;{const c=i.ok?o.errorMessage:o.error.message,[a,l]=c.split(" : ");if(a==="FEDERATED_USER_ID_ALREADY_LINKED")throw us(t,"credential-already-in-use",o);if(a==="EMAIL_EXISTS")throw us(t,"email-already-in-use",o);if(a==="USER_DISABLED")throw us(t,"user-disabled",o);const u=s[a]||a.toLowerCase().replace(/[_\s]+/g,"-");if(l)throw Sc(t,u,l);Ue(t,u)}}catch(r){if(r instanceof $t)throw r;Ue(t,"network-request-failed",{message:String(r)})}}async function ss(t,e,n,s,r={}){const i=await Ze(t,e,n,s,r);return"mfaPendingCredential"in i&&Ue(t,"multi-factor-auth-required",{_serverResponse:i}),i}async function Rc(t,e,n,s){const r=`${e}${n}?${s}`,i=t,o=i.config.emulator?ui(t.config,r):`${t.config.apiScheme}://${r}`;return em.includes(n)&&(await i._persistenceManagerAvailable,i._getPersistenceType()==="COOKIE")?i._getPersistence()._getFinalTarget(o).toString():o}function nm(t){switch(t){case"ENFORCE":return"ENFORCE";case"AUDIT":return"AUDIT";case"OFF":return"OFF";default:return"ENFORCEMENT_STATE_UNSPECIFIED"}}class sm{clearNetworkTimeout(){clearTimeout(this.timer)}constructor(e){this.auth=e,this.timer=null,this.promise=new Promise((n,s)=>{this.timer=setTimeout(()=>s(Je(this.auth,"network-request-failed")),tm.get())})}}function us(t,e,n){const s={appName:t.name};n.email&&(s.email=n.email),n.phoneNumber&&(s.phoneNumber=n.phoneNumber);const r=Je(t,e,s);return r.customData._tokenResponse=n,r}function Io(t){return t!==void 0&&t.enterprise!==void 0}class rm{constructor(e){if(this.siteKey="",this.recaptchaEnforcementState=[],e.recaptchaKey===void 0)throw new Error("recaptchaKey undefined");this.siteKey=e.recaptchaKey.split("/")[3],this.recaptchaEnforcementState=e.recaptchaEnforcementState}getProviderEnforcementState(e){if(!this.recaptchaEnforcementState||this.recaptchaEnforcementState.length===0)return null;for(const n of this.recaptchaEnforcementState)if(n.provider&&n.provider===e)return nm(n.enforcementState);return null}isProviderEnabled(e){return this.getProviderEnforcementState(e)==="ENFORCE"||this.getProviderEnforcementState(e)==="AUDIT"}isAnyProviderEnabled(){return this.isProviderEnabled("EMAIL_PASSWORD_PROVIDER")||this.isProviderEnabled("PHONE_PROVIDER")}}async function im(t,e){return Ze(t,"GET","/v2/recaptchaConfig",pt(t,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function om(t,e){return Ze(t,"POST","/v1/accounts:delete",e)}async function Ps(t,e){return Ze(t,"POST","/v1/accounts:lookup",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Fn(t){if(t)try{const e=new Date(Number(t));if(!isNaN(e.getTime()))return e.toUTCString()}catch{}}async function am(t,e=!1){const n=Qe(t),s=await n.getIdToken(e),r=di(s);U(r&&r.exp&&r.auth_time&&r.iat,n.auth,"internal-error");const i=typeof r.firebase=="object"?r.firebase:void 0,o=i?.sign_in_provider;return{claims:r,token:s,authTime:Fn(gr(r.auth_time)),issuedAtTime:Fn(gr(r.iat)),expirationTime:Fn(gr(r.exp)),signInProvider:o||null,signInSecondFactor:i?.sign_in_second_factor||null}}function gr(t){return Number(t)*1e3}function di(t){const[e,n,s]=t.split(".");if(e===void 0||n===void 0||s===void 0)return gs("JWT malformed, contained fewer than 3 sections"),null;try{const r=fc(n);return r?JSON.parse(r):(gs("Failed to decode base64 JWT payload"),null)}catch(r){return gs("Caught error parsing JWT payload as JSON",r?.toString()),null}}function So(t){const e=di(t);return U(e,"internal-error"),U(typeof e.exp<"u","internal-error"),U(typeof e.iat<"u","internal-error"),Number(e.exp)-Number(e.iat)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function _n(t,e,n=!1){if(n)return e;try{return await e}catch(s){throw s instanceof $t&&cm(s)&&t.auth.currentUser===t&&await t.auth.signOut(),s}}function cm({code:t}){return t==="auth/user-disabled"||t==="auth/user-token-expired"}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class lm{constructor(e){this.user=e,this.isRunning=!1,this.timerId=null,this.errorBackoff=3e4}_start(){this.isRunning||(this.isRunning=!0,this.schedule())}_stop(){this.isRunning&&(this.isRunning=!1,this.timerId!==null&&clearTimeout(this.timerId))}getInterval(e){if(e){const n=this.errorBackoff;return this.errorBackoff=Math.min(this.errorBackoff*2,96e4),n}else{this.errorBackoff=3e4;const s=(this.user.stsTokenManager.expirationTime??0)-Date.now()-3e5;return Math.max(0,s)}}schedule(e=!1){if(!this.isRunning)return;const n=this.getInterval(e);this.timerId=setTimeout(async()=>{await this.iteration()},n)}async iteration(){try{await this.user.getIdToken(!0)}catch(e){e?.code==="auth/network-request-failed"&&this.schedule(!0);return}this.schedule()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Fr{constructor(e,n){this.createdAt=e,this.lastLoginAt=n,this._initializeTime()}_initializeTime(){this.lastSignInTime=Fn(this.lastLoginAt),this.creationTime=Fn(this.createdAt)}_copy(e){this.createdAt=e.createdAt,this.lastLoginAt=e.lastLoginAt,this._initializeTime()}toJSON(){return{createdAt:this.createdAt,lastLoginAt:this.lastLoginAt}}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function ks(t){const e=t.auth,n=await t.getIdToken(),s=await _n(t,Ps(e,{idToken:n}));U(s?.users.length,e,"internal-error");const r=s.users[0];t._notifyReloadListener(r);const i=r.providerUserInfo?.length?Ac(r.providerUserInfo):[],o=dm(t.providerData,i),c=t.isAnonymous,a=!(t.email&&r.passwordHash)&&!o?.length,l=c?a:!1,u={uid:r.localId,displayName:r.displayName||null,photoURL:r.photoUrl||null,email:r.email||null,emailVerified:r.emailVerified||!1,phoneNumber:r.phoneNumber||null,tenantId:r.tenantId||null,providerData:o,metadata:new Fr(r.createdAt,r.lastLoginAt),isAnonymous:l};Object.assign(t,u)}async function um(t){const e=Qe(t);await ks(e),await e.auth._persistUserIfCurrent(e),e.auth._notifyListenersIfCurrent(e)}function dm(t,e){return[...t.filter(s=>!e.some(r=>r.providerId===s.providerId)),...e]}function Ac(t){return t.map(({providerId:e,...n})=>({providerId:e,uid:n.rawId||"",displayName:n.displayName||null,email:n.email||null,phoneNumber:n.phoneNumber||null,photoURL:n.photoUrl||null}))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function fm(t,e){const n=await Cc(t,{},async()=>{const s=es({grant_type:"refresh_token",refresh_token:e}).slice(1),{tokenApiHost:r,apiKey:i}=t.config,o=await Rc(t,r,"/v1/token",`key=${i}`),c=await t._getAdditionalHeaders();c["Content-Type"]="application/x-www-form-urlencoded";const a={method:"POST",headers:c,body:s};return t.emulatorConfig&&qs(t.emulatorConfig.host)&&(a.credentials="include"),Tc.fetch()(o,a)});return{accessToken:n.access_token,expiresIn:n.expires_in,refreshToken:n.refresh_token}}async function hm(t,e){return Ze(t,"POST","/v2/accounts:revokeToken",pt(t,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class un{constructor(){this.refreshToken=null,this.accessToken=null,this.expirationTime=null}get isExpired(){return!this.expirationTime||Date.now()>this.expirationTime-3e4}updateFromServerResponse(e){U(e.idToken,"internal-error"),U(typeof e.idToken<"u","internal-error"),U(typeof e.refreshToken<"u","internal-error");const n="expiresIn"in e&&typeof e.expiresIn<"u"?Number(e.expiresIn):So(e.idToken);this.updateTokensAndExpiration(e.idToken,e.refreshToken,n)}updateFromIdToken(e){U(e.length!==0,"internal-error");const n=So(e);this.updateTokensAndExpiration(e,null,n)}async getToken(e,n=!1){return!n&&this.accessToken&&!this.isExpired?this.accessToken:(U(this.refreshToken,e,"user-token-expired"),this.refreshToken?(await this.refresh(e,this.refreshToken),this.accessToken):null)}clearRefreshToken(){this.refreshToken=null}async refresh(e,n){const{accessToken:s,refreshToken:r,expiresIn:i}=await fm(e,n);this.updateTokensAndExpiration(s,r,Number(i))}updateTokensAndExpiration(e,n,s){this.refreshToken=n||null,this.accessToken=e||null,this.expirationTime=Date.now()+s*1e3}static fromJSON(e,n){const{refreshToken:s,accessToken:r,expirationTime:i}=n,o=new un;return s&&(U(typeof s=="string","internal-error",{appName:e}),o.refreshToken=s),r&&(U(typeof r=="string","internal-error",{appName:e}),o.accessToken=r),i&&(U(typeof i=="number","internal-error",{appName:e}),o.expirationTime=i),o}toJSON(){return{refreshToken:this.refreshToken,accessToken:this.accessToken,expirationTime:this.expirationTime}}_assign(e){this.accessToken=e.accessToken,this.refreshToken=e.refreshToken,this.expirationTime=e.expirationTime}_clone(){return Object.assign(new un,this.toJSON())}_performRefresh(){return it("not implemented")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function yt(t,e){U(typeof t=="string"||typeof t>"u","internal-error",{appName:e})}class De{constructor({uid:e,auth:n,stsTokenManager:s,...r}){this.providerId="firebase",this.proactiveRefresh=new lm(this),this.reloadUserInfo=null,this.reloadListener=null,this.uid=e,this.auth=n,this.stsTokenManager=s,this.accessToken=s.accessToken,this.displayName=r.displayName||null,this.email=r.email||null,this.emailVerified=r.emailVerified||!1,this.phoneNumber=r.phoneNumber||null,this.photoURL=r.photoURL||null,this.isAnonymous=r.isAnonymous||!1,this.tenantId=r.tenantId||null,this.providerData=r.providerData?[...r.providerData]:[],this.metadata=new Fr(r.createdAt||void 0,r.lastLoginAt||void 0)}async getIdToken(e){const n=await _n(this,this.stsTokenManager.getToken(this.auth,e));return U(n,this.auth,"internal-error"),this.accessToken!==n&&(this.accessToken=n,await this.auth._persistUserIfCurrent(this),this.auth._notifyListenersIfCurrent(this)),n}getIdTokenResult(e){return am(this,e)}reload(){return um(this)}_assign(e){this!==e&&(U(this.uid===e.uid,this.auth,"internal-error"),this.displayName=e.displayName,this.photoURL=e.photoURL,this.email=e.email,this.emailVerified=e.emailVerified,this.phoneNumber=e.phoneNumber,this.isAnonymous=e.isAnonymous,this.tenantId=e.tenantId,this.providerData=e.providerData.map(n=>({...n})),this.metadata._copy(e.metadata),this.stsTokenManager._assign(e.stsTokenManager))}_clone(e){const n=new De({...this,auth:e,stsTokenManager:this.stsTokenManager._clone()});return n.metadata._copy(this.metadata),n}_onReload(e){U(!this.reloadListener,this.auth,"internal-error"),this.reloadListener=e,this.reloadUserInfo&&(this._notifyReloadListener(this.reloadUserInfo),this.reloadUserInfo=null)}_notifyReloadListener(e){this.reloadListener?this.reloadListener(e):this.reloadUserInfo=e}_startProactiveRefresh(){this.proactiveRefresh._start()}_stopProactiveRefresh(){this.proactiveRefresh._stop()}async _updateTokensIfNecessary(e,n=!1){let s=!1;e.idToken&&e.idToken!==this.stsTokenManager.accessToken&&(this.stsTokenManager.updateFromServerResponse(e),s=!0),n&&await ks(this),await this.auth._persistUserIfCurrent(this),s&&this.auth._notifyListenersIfCurrent(this)}async delete(){if(xe(this.auth.app))return Promise.reject(ct(this.auth));const e=await this.getIdToken();return await _n(this,om(this.auth,{idToken:e})),this.stsTokenManager.clearRefreshToken(),this.auth.signOut()}toJSON(){return{uid:this.uid,email:this.email||void 0,emailVerified:this.emailVerified,displayName:this.displayName||void 0,isAnonymous:this.isAnonymous,photoURL:this.photoURL||void 0,phoneNumber:this.phoneNumber||void 0,tenantId:this.tenantId||void 0,providerData:this.providerData.map(e=>({...e})),stsTokenManager:this.stsTokenManager.toJSON(),_redirectEventId:this._redirectEventId,...this.metadata.toJSON(),apiKey:this.auth.config.apiKey,appName:this.auth.name}}get refreshToken(){return this.stsTokenManager.refreshToken||""}static _fromJSON(e,n){const s=n.displayName??void 0,r=n.email??void 0,i=n.phoneNumber??void 0,o=n.photoURL??void 0,c=n.tenantId??void 0,a=n._redirectEventId??void 0,l=n.createdAt??void 0,u=n.lastLoginAt??void 0,{uid:f,emailVerified:p,isAnonymous:g,providerData:S,stsTokenManager:k}=n;U(f&&k,e,"internal-error");const F=un.fromJSON(this.name,k);U(typeof f=="string",e,"internal-error"),yt(s,e.name),yt(r,e.name),U(typeof p=="boolean",e,"internal-error"),U(typeof g=="boolean",e,"internal-error"),yt(i,e.name),yt(o,e.name),yt(c,e.name),yt(a,e.name),yt(l,e.name),yt(u,e.name);const P=new De({uid:f,auth:e,email:r,emailVerified:p,displayName:s,isAnonymous:g,photoURL:o,phoneNumber:i,tenantId:c,stsTokenManager:F,createdAt:l,lastLoginAt:u});return S&&Array.isArray(S)&&(P.providerData=S.map(E=>({...E}))),a&&(P._redirectEventId=a),P}static async _fromIdTokenResponse(e,n,s=!1){const r=new un;r.updateFromServerResponse(n);const i=new De({uid:n.localId,auth:e,stsTokenManager:r,isAnonymous:s});return await ks(i),i}static async _fromGetAccountInfoResponse(e,n,s){const r=n.users[0];U(r.localId!==void 0,"internal-error");const i=r.providerUserInfo!==void 0?Ac(r.providerUserInfo):[],o=!(r.email&&r.passwordHash)&&!i?.length,c=new un;c.updateFromIdToken(s);const a=new De({uid:r.localId,auth:e,stsTokenManager:c,isAnonymous:o}),l={uid:r.localId,displayName:r.displayName||null,photoURL:r.photoUrl||null,email:r.email||null,emailVerified:r.emailVerified||!1,phoneNumber:r.phoneNumber||null,tenantId:r.tenantId||null,providerData:i,metadata:new Fr(r.createdAt,r.lastLoginAt),isAnonymous:!(r.email&&r.passwordHash)&&!i?.length};return Object.assign(a,l),a}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const To=new Map;function ot(t){ft(t instanceof Function,"Expected a class definition");let e=To.get(t);return e?(ft(e instanceof t,"Instance stored in cache mismatched with class"),e):(e=new t,To.set(t,e),e)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Pc{constructor(){this.type="NONE",this.storage={}}async _isAvailable(){return!0}async _set(e,n){this.storage[e]=n}async _get(e){const n=this.storage[e];return n===void 0?null:n}async _remove(e){delete this.storage[e]}_addListener(e,n){}_removeListener(e,n){}}Pc.type="NONE";const Co=Pc;/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function vs(t,e,n){return`firebase:${t}:${e}:${n}`}class dn{constructor(e,n,s){this.persistence=e,this.auth=n,this.userKey=s;const{config:r,name:i}=this.auth;this.fullUserKey=vs(this.userKey,r.apiKey,i),this.fullPersistenceKey=vs("persistence",r.apiKey,i),this.boundEventHandler=n._onStorageEvent.bind(n),this.persistence._addListener(this.fullUserKey,this.boundEventHandler)}setCurrentUser(e){return this.persistence._set(this.fullUserKey,e.toJSON())}async getCurrentUser(){const e=await this.persistence._get(this.fullUserKey);if(!e)return null;if(typeof e=="string"){const n=await Ps(this.auth,{idToken:e}).catch(()=>{});return n?De._fromGetAccountInfoResponse(this.auth,n,e):null}return De._fromJSON(this.auth,e)}removeCurrentUser(){return this.persistence._remove(this.fullUserKey)}savePersistenceForRedirect(){return this.persistence._set(this.fullPersistenceKey,this.persistence.type)}async setPersistence(e){if(this.persistence===e)return;const n=await this.getCurrentUser();if(await this.removeCurrentUser(),this.persistence=e,n)return this.setCurrentUser(n)}delete(){this.persistence._removeListener(this.fullUserKey,this.boundEventHandler)}static async create(e,n,s="authUser"){if(!n.length)return new dn(ot(Co),e,s);const r=(await Promise.all(n.map(async l=>{if(await l._isAvailable())return l}))).filter(l=>l);let i=r[0]||ot(Co);const o=vs(s,e.config.apiKey,e.name);let c=null;for(const l of n)try{const u=await l._get(o);if(u){let f;if(typeof u=="string"){const p=await Ps(e,{idToken:u}).catch(()=>{});if(!p)break;f=await De._fromGetAccountInfoResponse(e,p,u)}else f=De._fromJSON(e,u);l!==i&&(c=f),i=l;break}}catch{}const a=r.filter(l=>l._shouldAllowMigration);return!i._shouldAllowMigration||!a.length?new dn(i,e,s):(i=a[0],c&&await i._set(o,c.toJSON()),await Promise.all(n.map(async l=>{if(l!==i)try{await l._remove(o)}catch{}})),new dn(i,e,s))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ro(t){const e=t.toLowerCase();if(e.includes("opera/")||e.includes("opr/")||e.includes("opios/"))return"Opera";if(Nc(e))return"IEMobile";if(e.includes("msie")||e.includes("trident/"))return"IE";if(e.includes("edge/"))return"Edge";if(kc(e))return"Firefox";if(e.includes("silk/"))return"Silk";if(Lc(e))return"Blackberry";if(Mc(e))return"Webos";if(Oc(e))return"Safari";if((e.includes("chrome/")||xc(e))&&!e.includes("edge/"))return"Chrome";if(Dc(e))return"Android";{const n=/([a-zA-Z\d\.]+)\/[a-zA-Z\d\.]*$/,s=t.match(n);if(s?.length===2)return s[1]}return"Other"}function kc(t=ve()){return/firefox\//i.test(t)}function Oc(t=ve()){const e=t.toLowerCase();return e.includes("safari/")&&!e.includes("chrome/")&&!e.includes("crios/")&&!e.includes("android")}function xc(t=ve()){return/crios\//i.test(t)}function Nc(t=ve()){return/iemobile/i.test(t)}function Dc(t=ve()){return/android/i.test(t)}function Lc(t=ve()){return/blackberry/i.test(t)}function Mc(t=ve()){return/webos/i.test(t)}function fi(t=ve()){return/iphone|ipad|ipod/i.test(t)||/macintosh/i.test(t)&&/mobile/i.test(t)}function pm(t=ve()){return fi(t)&&!!window.navigator?.standalone}function mm(){return Ph()&&document.documentMode===10}function Uc(t=ve()){return fi(t)||Dc(t)||Mc(t)||Lc(t)||/windows phone/i.test(t)||Nc(t)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function $c(t,e=[]){let n;switch(t){case"Browser":n=Ro(ve());break;case"Worker":n=`${Ro(ve())}-${t}`;break;default:n=t}const s=e.length?e.join(","):"FirebaseCore-web";return`${n}/JsCore/${ts}/${s}`}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class gm{constructor(e){this.auth=e,this.queue=[]}pushCallback(e,n){const s=i=>new Promise((o,c)=>{try{const a=e(i);o(a)}catch(a){c(a)}});s.onAbort=n,this.queue.push(s);const r=this.queue.length-1;return()=>{this.queue[r]=()=>Promise.resolve()}}async runMiddleware(e){if(this.auth.currentUser===e)return;const n=[];try{for(const s of this.queue)await s(e),s.onAbort&&n.push(s.onAbort)}catch(s){n.reverse();for(const r of n)try{r()}catch{}throw this.auth._errorFactory.create("login-blocked",{originalMessage:s?.message})}}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function vm(t,e={}){return Ze(t,"GET","/v2/passwordPolicy",pt(t,e))}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const _m=6;class ym{constructor(e){const n=e.customStrengthOptions;this.customStrengthOptions={},this.customStrengthOptions.minPasswordLength=n.minPasswordLength??_m,n.maxPasswordLength&&(this.customStrengthOptions.maxPasswordLength=n.maxPasswordLength),n.containsLowercaseCharacter!==void 0&&(this.customStrengthOptions.containsLowercaseLetter=n.containsLowercaseCharacter),n.containsUppercaseCharacter!==void 0&&(this.customStrengthOptions.containsUppercaseLetter=n.containsUppercaseCharacter),n.containsNumericCharacter!==void 0&&(this.customStrengthOptions.containsNumericCharacter=n.containsNumericCharacter),n.containsNonAlphanumericCharacter!==void 0&&(this.customStrengthOptions.containsNonAlphanumericCharacter=n.containsNonAlphanumericCharacter),this.enforcementState=e.enforcementState,this.enforcementState==="ENFORCEMENT_STATE_UNSPECIFIED"&&(this.enforcementState="OFF"),this.allowedNonAlphanumericCharacters=e.allowedNonAlphanumericCharacters?.join("")??"",this.forceUpgradeOnSignin=e.forceUpgradeOnSignin??!1,this.schemaVersion=e.schemaVersion}validatePassword(e){const n={isValid:!0,passwordPolicy:this};return this.validatePasswordLengthOptions(e,n),this.validatePasswordCharacterOptions(e,n),n.isValid&&(n.isValid=n.meetsMinPasswordLength??!0),n.isValid&&(n.isValid=n.meetsMaxPasswordLength??!0),n.isValid&&(n.isValid=n.containsLowercaseLetter??!0),n.isValid&&(n.isValid=n.containsUppercaseLetter??!0),n.isValid&&(n.isValid=n.containsNumericCharacter??!0),n.isValid&&(n.isValid=n.containsNonAlphanumericCharacter??!0),n}validatePasswordLengthOptions(e,n){const s=this.customStrengthOptions.minPasswordLength,r=this.customStrengthOptions.maxPasswordLength;s&&(n.meetsMinPasswordLength=e.length>=s),r&&(n.meetsMaxPasswordLength=e.length<=r)}validatePasswordCharacterOptions(e,n){this.updatePasswordCharacterOptionsStatuses(n,!1,!1,!1,!1);let s;for(let r=0;r<e.length;r++)s=e.charAt(r),this.updatePasswordCharacterOptionsStatuses(n,s>="a"&&s<="z",s>="A"&&s<="Z",s>="0"&&s<="9",this.allowedNonAlphanumericCharacters.includes(s))}updatePasswordCharacterOptionsStatuses(e,n,s,r,i){this.customStrengthOptions.containsLowercaseLetter&&(e.containsLowercaseLetter||(e.containsLowercaseLetter=n)),this.customStrengthOptions.containsUppercaseLetter&&(e.containsUppercaseLetter||(e.containsUppercaseLetter=s)),this.customStrengthOptions.containsNumericCharacter&&(e.containsNumericCharacter||(e.containsNumericCharacter=r)),this.customStrengthOptions.containsNonAlphanumericCharacter&&(e.containsNonAlphanumericCharacter||(e.containsNonAlphanumericCharacter=i))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class bm{constructor(e,n,s,r){this.app=e,this.heartbeatServiceProvider=n,this.appCheckServiceProvider=s,this.config=r,this.currentUser=null,this.emulatorConfig=null,this.operations=Promise.resolve(),this.authStateSubscription=new Ao(this),this.idTokenSubscription=new Ao(this),this.beforeStateQueue=new gm(this),this.redirectUser=null,this.isProactiveRefreshEnabled=!1,this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION=1,this._canInitEmulator=!0,this._isInitialized=!1,this._deleted=!1,this._initializationPromise=null,this._popupRedirectResolver=null,this._errorFactory=Ic,this._agentRecaptchaConfig=null,this._tenantRecaptchaConfigs={},this._projectPasswordPolicy=null,this._tenantPasswordPolicies={},this._resolvePersistenceManagerAvailable=void 0,this.lastNotifiedUid=void 0,this.languageCode=null,this.tenantId=null,this.settings={appVerificationDisabledForTesting:!1},this.frameworks=[],this.name=e.name,this.clientVersion=r.sdkClientVersion,this._persistenceManagerAvailable=new Promise(i=>this._resolvePersistenceManagerAvailable=i)}_initializeWithPersistence(e,n){return n&&(this._popupRedirectResolver=ot(n)),this._initializationPromise=this.queue(async()=>{if(!this._deleted&&(this.persistenceManager=await dn.create(this,e),this._resolvePersistenceManagerAvailable?.(),!this._deleted)){if(this._popupRedirectResolver?._shouldInitProactively)try{await this._popupRedirectResolver._initialize(this)}catch{}await this.initializeCurrentUser(n),this.lastNotifiedUid=this.currentUser?.uid||null,!this._deleted&&(this._isInitialized=!0)}}),this._initializationPromise}async _onStorageEvent(){if(this._deleted)return;const e=await this.assertedPersistence.getCurrentUser();if(!(!this.currentUser&&!e)){if(this.currentUser&&e&&this.currentUser.uid===e.uid){this._currentUser._assign(e),await this.currentUser.getIdToken();return}await this._updateCurrentUser(e,!0)}}async initializeCurrentUserFromIdToken(e){try{const n=await Ps(this,{idToken:e}),s=await De._fromGetAccountInfoResponse(this,n,e);await this.directlySetCurrentUser(s)}catch(n){console.warn("FirebaseServerApp could not login user with provided authIdToken: ",n),await this.directlySetCurrentUser(null)}}async initializeCurrentUser(e){if(xe(this.app)){const i=this.app.settings.authIdToken;return i?new Promise(o=>{setTimeout(()=>this.initializeCurrentUserFromIdToken(i).then(o,o))}):this.directlySetCurrentUser(null)}const n=await this.assertedPersistence.getCurrentUser();let s=n,r=!1;if(e&&this.config.authDomain){await this.getOrInitRedirectPersistenceManager();const i=this.redirectUser?._redirectEventId,o=s?._redirectEventId,c=await this.tryRedirectSignIn(e);(!i||i===o)&&c?.user&&(s=c.user,r=!0)}if(!s)return this.directlySetCurrentUser(null);if(!s._redirectEventId){if(r)try{await this.beforeStateQueue.runMiddleware(s)}catch(i){s=n,this._popupRedirectResolver._overrideRedirectResult(this,()=>Promise.reject(i))}return s?this.reloadAndSetCurrentUserOrClear(s):this.directlySetCurrentUser(null)}return U(this._popupRedirectResolver,this,"argument-error"),await this.getOrInitRedirectPersistenceManager(),this.redirectUser&&this.redirectUser._redirectEventId===s._redirectEventId?this.directlySetCurrentUser(s):this.reloadAndSetCurrentUserOrClear(s)}async tryRedirectSignIn(e){let n=null;try{n=await this._popupRedirectResolver._completeRedirectFn(this,e,!0)}catch{await this._setRedirectUser(null)}return n}async reloadAndSetCurrentUserOrClear(e){try{await ks(e)}catch(n){if(n?.code!=="auth/network-request-failed")return this.directlySetCurrentUser(null)}return this.directlySetCurrentUser(e)}useDeviceLanguage(){this.languageCode=Qp()}async _delete(){this._deleted=!0}async updateCurrentUser(e){if(xe(this.app))return Promise.reject(ct(this));const n=e?Qe(e):null;return n&&U(n.auth.config.apiKey===this.config.apiKey,this,"invalid-user-token"),this._updateCurrentUser(n&&n._clone(this))}async _updateCurrentUser(e,n=!1){if(!this._deleted)return e&&U(this.tenantId===e.tenantId,this,"tenant-id-mismatch"),n||await this.beforeStateQueue.runMiddleware(e),this.queue(async()=>{await this.directlySetCurrentUser(e),this.notifyAuthListeners()})}async signOut(){return xe(this.app)?Promise.reject(ct(this)):(await this.beforeStateQueue.runMiddleware(null),(this.redirectPersistenceManager||this._popupRedirectResolver)&&await this._setRedirectUser(null),this._updateCurrentUser(null,!0))}setPersistence(e){return xe(this.app)?Promise.reject(ct(this)):this.queue(async()=>{await this.assertedPersistence.setPersistence(ot(e))})}_getRecaptchaConfig(){return this.tenantId==null?this._agentRecaptchaConfig:this._tenantRecaptchaConfigs[this.tenantId]}async validatePassword(e){this._getPasswordPolicyInternal()||await this._updatePasswordPolicy();const n=this._getPasswordPolicyInternal();return n.schemaVersion!==this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION?Promise.reject(this._errorFactory.create("unsupported-password-policy-schema-version",{})):n.validatePassword(e)}_getPasswordPolicyInternal(){return this.tenantId===null?this._projectPasswordPolicy:this._tenantPasswordPolicies[this.tenantId]}async _updatePasswordPolicy(){const e=await vm(this),n=new ym(e);this.tenantId===null?this._projectPasswordPolicy=n:this._tenantPasswordPolicies[this.tenantId]=n}_getPersistenceType(){return this.assertedPersistence.persistence.type}_getPersistence(){return this.assertedPersistence.persistence}_updateErrorMap(e){this._errorFactory=new Zn("auth","Firebase",e())}onAuthStateChanged(e,n,s){return this.registerStateListener(this.authStateSubscription,e,n,s)}beforeAuthStateChanged(e,n){return this.beforeStateQueue.pushCallback(e,n)}onIdTokenChanged(e,n,s){return this.registerStateListener(this.idTokenSubscription,e,n,s)}authStateReady(){return new Promise((e,n)=>{if(this.currentUser)e();else{const s=this.onAuthStateChanged(()=>{s(),e()},n)}})}async revokeAccessToken(e){if(this.currentUser){const n=await this.currentUser.getIdToken(),s={providerId:"apple.com",tokenType:"ACCESS_TOKEN",token:e,idToken:n};this.tenantId!=null&&(s.tenantId=this.tenantId),await hm(this,s)}}toJSON(){return{apiKey:this.config.apiKey,authDomain:this.config.authDomain,appName:this.name,currentUser:this._currentUser?.toJSON()}}async _setRedirectUser(e,n){const s=await this.getOrInitRedirectPersistenceManager(n);return e===null?s.removeCurrentUser():s.setCurrentUser(e)}async getOrInitRedirectPersistenceManager(e){if(!this.redirectPersistenceManager){const n=e&&ot(e)||this._popupRedirectResolver;U(n,this,"argument-error"),this.redirectPersistenceManager=await dn.create(this,[ot(n._redirectPersistence)],"redirectUser"),this.redirectUser=await this.redirectPersistenceManager.getCurrentUser()}return this.redirectPersistenceManager}async _redirectUserForId(e){return this._isInitialized&&await this.queue(async()=>{}),this._currentUser?._redirectEventId===e?this._currentUser:this.redirectUser?._redirectEventId===e?this.redirectUser:null}async _persistUserIfCurrent(e){if(e===this.currentUser)return this.queue(async()=>this.directlySetCurrentUser(e))}_notifyListenersIfCurrent(e){e===this.currentUser&&this.notifyAuthListeners()}_key(){return`${this.config.authDomain}:${this.config.apiKey}:${this.name}`}_startProactiveRefresh(){this.isProactiveRefreshEnabled=!0,this.currentUser&&this._currentUser._startProactiveRefresh()}_stopProactiveRefresh(){this.isProactiveRefreshEnabled=!1,this.currentUser&&this._currentUser._stopProactiveRefresh()}get _currentUser(){return this.currentUser}notifyAuthListeners(){if(!this._isInitialized)return;this.idTokenSubscription.next(this.currentUser);const e=this.currentUser?.uid??null;this.lastNotifiedUid!==e&&(this.lastNotifiedUid=e,this.authStateSubscription.next(this.currentUser))}registerStateListener(e,n,s,r){if(this._deleted)return()=>{};const i=typeof n=="function"?n:n.next.bind(n);let o=!1;const c=this._isInitialized?Promise.resolve():this._initializationPromise;if(U(c,this,"internal-error"),c.then(()=>{o||i(this.currentUser)}),typeof n=="function"){const a=e.addObserver(n,s,r);return()=>{o=!0,a()}}else{const a=e.addObserver(n);return()=>{o=!0,a()}}}async directlySetCurrentUser(e){this.currentUser&&this.currentUser!==e&&this._currentUser._stopProactiveRefresh(),e&&this.isProactiveRefreshEnabled&&e._startProactiveRefresh(),this.currentUser=e,e?await this.assertedPersistence.setCurrentUser(e):await this.assertedPersistence.removeCurrentUser()}queue(e){return this.operations=this.operations.then(e,e),this.operations}get assertedPersistence(){return U(this.persistenceManager,this,"internal-error"),this.persistenceManager}_logFramework(e){!e||this.frameworks.includes(e)||(this.frameworks.push(e),this.frameworks.sort(),this.clientVersion=$c(this.config.clientPlatform,this._getFrameworks()))}_getFrameworks(){return this.frameworks}async _getAdditionalHeaders(){const e={"X-Client-Version":this.clientVersion};this.app.options.appId&&(e["X-Firebase-gmpid"]=this.app.options.appId);const n=await this.heartbeatServiceProvider.getImmediate({optional:!0})?.getHeartbeatsHeader();n&&(e["X-Firebase-Client"]=n);const s=await this._getAppCheckToken();return s&&(e["X-Firebase-AppCheck"]=s),e}async _getAppCheckToken(){if(xe(this.app)&&this.app.settings.appCheckToken)return this.app.settings.appCheckToken;const e=await this.appCheckServiceProvider.getImmediate({optional:!0})?.getToken();return e?.error&&Jp(`Error while retrieving App Check token: ${e.error}`),e?.token}}function Gt(t){return Qe(t)}class Ao{constructor(e){this.auth=e,this.observer=null,this.addObserver=Mh(n=>this.observer=n)}get next(){return U(this.observer,this.auth,"internal-error"),this.observer.next.bind(this.observer)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Gs={async loadJS(){throw new Error("Unable to load external scripts")},recaptchaV2Script:"",recaptchaEnterpriseScript:"",gapiScript:""};function wm(t){Gs=t}function Fc(t){return Gs.loadJS(t)}function Em(){return Gs.recaptchaEnterpriseScript}function Im(){return Gs.gapiScript}function Sm(t){return`__${t}${Math.floor(Math.random()*1e6)}`}class Tm{constructor(){this.enterprise=new Cm}ready(e){e()}execute(e,n){return Promise.resolve("token")}render(e,n){return""}}class Cm{ready(e){e()}execute(e,n){return Promise.resolve("token")}render(e,n){return""}}const Rm="recaptcha-enterprise",Hc="NO_RECAPTCHA";class Am{constructor(e){this.type=Rm,this.auth=Gt(e)}async verify(e="verify",n=!1){async function s(i){if(!n){if(i.tenantId==null&&i._agentRecaptchaConfig!=null)return i._agentRecaptchaConfig.siteKey;if(i.tenantId!=null&&i._tenantRecaptchaConfigs[i.tenantId]!==void 0)return i._tenantRecaptchaConfigs[i.tenantId].siteKey}return new Promise(async(o,c)=>{im(i,{clientType:"CLIENT_TYPE_WEB",version:"RECAPTCHA_ENTERPRISE"}).then(a=>{if(a.recaptchaKey===void 0)c(new Error("recaptcha Enterprise site key undefined"));else{const l=new rm(a);return i.tenantId==null?i._agentRecaptchaConfig=l:i._tenantRecaptchaConfigs[i.tenantId]=l,o(l.siteKey)}}).catch(a=>{c(a)})})}function r(i,o,c){const a=window.grecaptcha;Io(a)?a.enterprise.ready(()=>{a.enterprise.execute(i,{action:e}).then(l=>{o(l)}).catch(()=>{o(Hc)})}):c(Error("No reCAPTCHA enterprise script loaded."))}return this.auth.settings.appVerificationDisabledForTesting?new Tm().execute("siteKey",{action:"verify"}):new Promise((i,o)=>{s(this.auth).then(c=>{if(!n&&Io(window.grecaptcha))r(c,i,o);else{if(typeof window>"u"){o(new Error("RecaptchaVerifier is only supported in browser"));return}let a=Em();a.length!==0&&(a+=c),Fc(a).then(()=>{r(c,i,o)}).catch(l=>{o(l)})}}).catch(c=>{o(c)})})}}async function Po(t,e,n,s=!1,r=!1){const i=new Am(t);let o;if(r)o=Hc;else try{o=await i.verify(n)}catch{o=await i.verify(n,!0)}const c={...e};if(n==="mfaSmsEnrollment"||n==="mfaSmsSignIn"){if("phoneEnrollmentInfo"in c){const a=c.phoneEnrollmentInfo.phoneNumber,l=c.phoneEnrollmentInfo.recaptchaToken;Object.assign(c,{phoneEnrollmentInfo:{phoneNumber:a,recaptchaToken:l,captchaResponse:o,clientType:"CLIENT_TYPE_WEB",recaptchaVersion:"RECAPTCHA_ENTERPRISE"}})}else if("phoneSignInInfo"in c){const a=c.phoneSignInInfo.recaptchaToken;Object.assign(c,{phoneSignInInfo:{recaptchaToken:a,captchaResponse:o,clientType:"CLIENT_TYPE_WEB",recaptchaVersion:"RECAPTCHA_ENTERPRISE"}})}return c}return s?Object.assign(c,{captchaResp:o}):Object.assign(c,{captchaResponse:o}),Object.assign(c,{clientType:"CLIENT_TYPE_WEB"}),Object.assign(c,{recaptchaVersion:"RECAPTCHA_ENTERPRISE"}),c}async function Hr(t,e,n,s,r){if(t._getRecaptchaConfig()?.isProviderEnabled("EMAIL_PASSWORD_PROVIDER")){const i=await Po(t,e,n,n==="getOobCode");return s(t,i)}else return s(t,e).catch(async i=>{if(i.code==="auth/missing-recaptcha-token"){console.log(`${n} is protected by reCAPTCHA Enterprise for this project. Automatically triggering the reCAPTCHA flow and restarting the flow.`);const o=await Po(t,e,n,n==="getOobCode");return s(t,o)}else return Promise.reject(i)})}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Pm(t,e){const n=_c(t,"auth");if(n.isInitialized()){const r=n.getImmediate(),i=n.getOptions();if(gn(i,e??{}))return r;Ue(r,"already-initialized")}return n.initialize({options:e})}function km(t,e){const n=e?.persistence||[],s=(Array.isArray(n)?n:[n]).map(ot);e?.errorMap&&t._updateErrorMap(e.errorMap),t._initializeWithPersistence(s,e?.popupRedirectResolver)}function Om(t,e,n){const s=Gt(t);U(/^https?:\/\//.test(e),s,"invalid-emulator-scheme");const r=!1,i=Bc(e),{host:o,port:c}=xm(e),a=c===null?"":`:${c}`,l={url:`${i}//${o}${a}/`},u=Object.freeze({host:o,port:c,protocol:i.replace(":",""),options:Object.freeze({disableWarnings:r})});if(!s._canInitEmulator){U(s.config.emulator&&s.emulatorConfig,s,"emulator-config-failed"),U(gn(l,s.config.emulator)&&gn(u,s.emulatorConfig),s,"emulator-config-failed");return}s.config.emulator=l,s.emulatorConfig=u,s.settings.appVerificationDisabledForTesting=!0,qs(o)?(wh(`${i}//${o}${a}`),Sh("Auth",!0)):Nm()}function Bc(t){const e=t.indexOf(":");return e<0?"":t.substr(0,e+1)}function xm(t){const e=Bc(t),n=/(\/\/)?([^?#/]+)/.exec(t.substr(e.length));if(!n)return{host:"",port:null};const s=n[2].split("@").pop()||"",r=/^(\[[^\]]+\])(:|$)/.exec(s);if(r){const i=r[1];return{host:i,port:ko(s.substr(i.length+1))}}else{const[i,o]=s.split(":");return{host:i,port:ko(o)}}}function ko(t){if(!t)return null;const e=Number(t);return isNaN(e)?null:e}function Nm(){function t(){const e=document.createElement("p"),n=e.style;e.innerText="Running in emulator mode. Do not use with production credentials.",n.position="fixed",n.width="100%",n.backgroundColor="#ffffff",n.border=".1em solid #000000",n.color="#b50000",n.bottom="0px",n.left="0px",n.margin="0px",n.zIndex="10000",n.textAlign="center",e.classList.add("firebase-emulator-warning"),document.body.appendChild(e)}typeof console<"u"&&typeof console.info=="function"&&console.info("WARNING: You are using the Auth Emulator, which is intended for local testing only.  Do not use with production credentials."),typeof window<"u"&&typeof document<"u"&&(document.readyState==="loading"?window.addEventListener("DOMContentLoaded",t):t())}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class hi{constructor(e,n){this.providerId=e,this.signInMethod=n}toJSON(){return it("not implemented")}_getIdTokenResponse(e){return it("not implemented")}_linkToIdToken(e,n){return it("not implemented")}_getReauthenticationResolver(e){return it("not implemented")}}async function Dm(t,e){return Ze(t,"POST","/v1/accounts:update",e)}async function Lm(t,e){return Ze(t,"POST","/v1/accounts:signUp",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Mm(t,e){return ss(t,"POST","/v1/accounts:signInWithPassword",pt(t,e))}async function Um(t,e){return Ze(t,"POST","/v1/accounts:sendOobCode",pt(t,e))}async function $m(t,e){return Um(t,e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Fm(t,e){return ss(t,"POST","/v1/accounts:signInWithEmailLink",pt(t,e))}async function Hm(t,e){return ss(t,"POST","/v1/accounts:signInWithEmailLink",pt(t,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Yn extends hi{constructor(e,n,s,r=null){super("password",s),this._email=e,this._password=n,this._tenantId=r}static _fromEmailAndPassword(e,n){return new Yn(e,n,"password")}static _fromEmailAndCode(e,n,s=null){return new Yn(e,n,"emailLink",s)}toJSON(){return{email:this._email,password:this._password,signInMethod:this.signInMethod,tenantId:this._tenantId}}static fromJSON(e){const n=typeof e=="string"?JSON.parse(e):e;if(n?.email&&n?.password){if(n.signInMethod==="password")return this._fromEmailAndPassword(n.email,n.password);if(n.signInMethod==="emailLink")return this._fromEmailAndCode(n.email,n.password,n.tenantId)}return null}async _getIdTokenResponse(e){switch(this.signInMethod){case"password":const n={returnSecureToken:!0,email:this._email,password:this._password,clientType:"CLIENT_TYPE_WEB"};return Hr(e,n,"signInWithPassword",Mm);case"emailLink":return Fm(e,{email:this._email,oobCode:this._password});default:Ue(e,"internal-error")}}async _linkToIdToken(e,n){switch(this.signInMethod){case"password":const s={idToken:n,returnSecureToken:!0,email:this._email,password:this._password,clientType:"CLIENT_TYPE_WEB"};return Hr(e,s,"signUpPassword",Lm);case"emailLink":return Hm(e,{idToken:n,email:this._email,oobCode:this._password});default:Ue(e,"internal-error")}}_getReauthenticationResolver(e){return this._getIdTokenResponse(e)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function fn(t,e){return ss(t,"POST","/v1/accounts:signInWithIdp",pt(t,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Bm="http://localhost";class zt extends hi{constructor(){super(...arguments),this.pendingToken=null}static _fromParams(e){const n=new zt(e.providerId,e.signInMethod);return e.idToken||e.accessToken?(e.idToken&&(n.idToken=e.idToken),e.accessToken&&(n.accessToken=e.accessToken),e.nonce&&!e.pendingToken&&(n.nonce=e.nonce),e.pendingToken&&(n.pendingToken=e.pendingToken)):e.oauthToken&&e.oauthTokenSecret?(n.accessToken=e.oauthToken,n.secret=e.oauthTokenSecret):Ue("argument-error"),n}toJSON(){return{idToken:this.idToken,accessToken:this.accessToken,secret:this.secret,nonce:this.nonce,pendingToken:this.pendingToken,providerId:this.providerId,signInMethod:this.signInMethod}}static fromJSON(e){const n=typeof e=="string"?JSON.parse(e):e,{providerId:s,signInMethod:r,...i}=n;if(!s||!r)return null;const o=new zt(s,r);return o.idToken=i.idToken||void 0,o.accessToken=i.accessToken||void 0,o.secret=i.secret,o.nonce=i.nonce,o.pendingToken=i.pendingToken||null,o}_getIdTokenResponse(e){const n=this.buildRequest();return fn(e,n)}_linkToIdToken(e,n){const s=this.buildRequest();return s.idToken=n,fn(e,s)}_getReauthenticationResolver(e){const n=this.buildRequest();return n.autoCreate=!1,fn(e,n)}buildRequest(){const e={requestUri:Bm,returnSecureToken:!0};if(this.pendingToken)e.pendingToken=this.pendingToken;else{const n={};this.idToken&&(n.id_token=this.idToken),this.accessToken&&(n.access_token=this.accessToken),this.secret&&(n.oauth_token_secret=this.secret),n.providerId=this.providerId,this.nonce&&!this.pendingToken&&(n.nonce=this.nonce),e.postBody=es(n)}return e}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Vm(t){switch(t){case"recoverEmail":return"RECOVER_EMAIL";case"resetPassword":return"PASSWORD_RESET";case"signIn":return"EMAIL_SIGNIN";case"verifyEmail":return"VERIFY_EMAIL";case"verifyAndChangeEmail":return"VERIFY_AND_CHANGE_EMAIL";case"revertSecondFactorAddition":return"REVERT_SECOND_FACTOR_ADDITION";default:return null}}function jm(t){const e=Rn(An(t)).link,n=e?Rn(An(e)).deep_link_id:null,s=Rn(An(t)).deep_link_id;return(s?Rn(An(s)).link:null)||s||n||e||t}class pi{constructor(e){const n=Rn(An(e)),s=n.apiKey??null,r=n.oobCode??null,i=Vm(n.mode??null);U(s&&r&&i,"argument-error"),this.apiKey=s,this.operation=i,this.code=r,this.continueUrl=n.continueUrl??null,this.languageCode=n.lang??null,this.tenantId=n.tenantId??null}static parseLink(e){const n=jm(e);try{return new pi(n)}catch{return null}}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class yn{constructor(){this.providerId=yn.PROVIDER_ID}static credential(e,n){return Yn._fromEmailAndPassword(e,n)}static credentialWithLink(e,n){const s=pi.parseLink(n);return U(s,"argument-error"),Yn._fromEmailAndCode(e,s.code,s.tenantId)}}yn.PROVIDER_ID="password";yn.EMAIL_PASSWORD_SIGN_IN_METHOD="password";yn.EMAIL_LINK_SIGN_IN_METHOD="emailLink";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Vc{constructor(e){this.providerId=e,this.defaultLanguageCode=null,this.customParameters={}}setDefaultLanguage(e){this.defaultLanguageCode=e}setCustomParameters(e){return this.customParameters=e,this}getCustomParameters(){return this.customParameters}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class rs extends Vc{constructor(){super(...arguments),this.scopes=[]}addScope(e){return this.scopes.includes(e)||this.scopes.push(e),this}getScopes(){return[...this.scopes]}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class St extends rs{constructor(){super("facebook.com")}static credential(e){return zt._fromParams({providerId:St.PROVIDER_ID,signInMethod:St.FACEBOOK_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return St.credentialFromTaggedObject(e)}static credentialFromError(e){return St.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return St.credential(e.oauthAccessToken)}catch{return null}}}St.FACEBOOK_SIGN_IN_METHOD="facebook.com";St.PROVIDER_ID="facebook.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Tt extends rs{constructor(){super("google.com"),this.addScope("profile")}static credential(e,n){return zt._fromParams({providerId:Tt.PROVIDER_ID,signInMethod:Tt.GOOGLE_SIGN_IN_METHOD,idToken:e,accessToken:n})}static credentialFromResult(e){return Tt.credentialFromTaggedObject(e)}static credentialFromError(e){return Tt.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthIdToken:n,oauthAccessToken:s}=e;if(!n&&!s)return null;try{return Tt.credential(n,s)}catch{return null}}}Tt.GOOGLE_SIGN_IN_METHOD="google.com";Tt.PROVIDER_ID="google.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ct extends rs{constructor(){super("github.com")}static credential(e){return zt._fromParams({providerId:Ct.PROVIDER_ID,signInMethod:Ct.GITHUB_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return Ct.credentialFromTaggedObject(e)}static credentialFromError(e){return Ct.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return Ct.credential(e.oauthAccessToken)}catch{return null}}}Ct.GITHUB_SIGN_IN_METHOD="github.com";Ct.PROVIDER_ID="github.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Rt extends rs{constructor(){super("twitter.com")}static credential(e,n){return zt._fromParams({providerId:Rt.PROVIDER_ID,signInMethod:Rt.TWITTER_SIGN_IN_METHOD,oauthToken:e,oauthTokenSecret:n})}static credentialFromResult(e){return Rt.credentialFromTaggedObject(e)}static credentialFromError(e){return Rt.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthAccessToken:n,oauthTokenSecret:s}=e;if(!n||!s)return null;try{return Rt.credential(n,s)}catch{return null}}}Rt.TWITTER_SIGN_IN_METHOD="twitter.com";Rt.PROVIDER_ID="twitter.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Wm(t,e){return ss(t,"POST","/v1/accounts:signUp",pt(t,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class qt{constructor(e){this.user=e.user,this.providerId=e.providerId,this._tokenResponse=e._tokenResponse,this.operationType=e.operationType}static async _fromIdTokenResponse(e,n,s,r=!1){const i=await De._fromIdTokenResponse(e,s,r),o=Oo(s);return new qt({user:i,providerId:o,_tokenResponse:s,operationType:n})}static async _forOperation(e,n,s){await e._updateTokensIfNecessary(s,!0);const r=Oo(s);return new qt({user:e,providerId:r,_tokenResponse:s,operationType:n})}}function Oo(t){return t.providerId?t.providerId:"phoneNumber"in t?"phone":null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Os extends $t{constructor(e,n,s,r){super(n.code,n.message),this.operationType=s,this.user=r,Object.setPrototypeOf(this,Os.prototype),this.customData={appName:e.name,tenantId:e.tenantId??void 0,_serverResponse:n.customData._serverResponse,operationType:s}}static _fromErrorAndOperation(e,n,s,r){return new Os(e,n,s,r)}}function jc(t,e,n,s){return(e==="reauthenticate"?n._getReauthenticationResolver(t):n._getIdTokenResponse(t)).catch(i=>{throw i.code==="auth/multi-factor-auth-required"?Os._fromErrorAndOperation(t,i,e,s):i})}async function Km(t,e,n=!1){const s=await _n(t,e._linkToIdToken(t.auth,await t.getIdToken()),n);return qt._forOperation(t,"link",s)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function zm(t,e,n=!1){const{auth:s}=t;if(xe(s.app))return Promise.reject(ct(s));const r="reauthenticate";try{const i=await _n(t,jc(s,r,e,t),n);U(i.idToken,s,"internal-error");const o=di(i.idToken);U(o,s,"internal-error");const{sub:c}=o;return U(t.uid===c,s,"user-mismatch"),qt._forOperation(t,r,i)}catch(i){throw i?.code==="auth/user-not-found"&&Ue(s,"user-mismatch"),i}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Wc(t,e,n=!1){if(xe(t.app))return Promise.reject(ct(t));const s="signIn",r=await jc(t,s,e),i=await qt._fromIdTokenResponse(t,s,r);return n||await t._updateCurrentUser(i.user),i}async function qm(t,e){return Wc(Gt(t),e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Gm(t,e,n){U(n.url?.length>0,t,"invalid-continue-uri"),U(typeof n.dynamicLinkDomain>"u"||n.dynamicLinkDomain.length>0,t,"invalid-dynamic-link-domain"),U(typeof n.linkDomain>"u"||n.linkDomain.length>0,t,"invalid-hosting-link-domain"),e.continueUrl=n.url,e.dynamicLinkDomain=n.dynamicLinkDomain,e.linkDomain=n.linkDomain,e.canHandleCodeInApp=n.handleCodeInApp,n.iOS&&(U(n.iOS.bundleId.length>0,t,"missing-ios-bundle-id"),e.iOSBundleId=n.iOS.bundleId),n.android&&(U(n.android.packageName.length>0,t,"missing-android-pkg-name"),e.androidInstallApp=n.android.installApp,e.androidMinimumVersionCode=n.android.minimumVersion,e.androidPackageName=n.android.packageName)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Kc(t){const e=Gt(t);e._getPasswordPolicyInternal()&&await e._updatePasswordPolicy()}async function Jm(t,e,n){if(xe(t.app))return Promise.reject(ct(t));const s=Gt(t),o=await Hr(s,{returnSecureToken:!0,email:e,password:n,clientType:"CLIENT_TYPE_WEB"},"signUpPassword",Wm).catch(a=>{throw a.code==="auth/password-does-not-meet-requirements"&&Kc(t),a}),c=await qt._fromIdTokenResponse(s,"signIn",o);return await s._updateCurrentUser(c.user),c}function Ym(t,e,n){return xe(t.app)?Promise.reject(ct(t)):qm(Qe(t),yn.credential(e,n)).catch(async s=>{throw s.code==="auth/password-does-not-meet-requirements"&&Kc(t),s})}async function xo(t,e){const n=Qe(t),r={requestType:"VERIFY_EMAIL",idToken:await t.getIdToken()};e&&Gm(n.auth,r,e);const{email:i}=await $m(n.auth,r);i!==t.email&&await t.reload()}function Xm(t,e){return Qm(Qe(t),null,e)}async function Qm(t,e,n){const{auth:s}=t,i={idToken:await t.getIdToken(),returnSecureToken:!0};n&&(i.password=n);const o=await _n(t,Dm(s,i));await t._updateTokensIfNecessary(o,!0)}function Zm(t,e,n,s){return Qe(t).onIdTokenChanged(e,n,s)}function eg(t,e,n){return Qe(t).beforeAuthStateChanged(e,n)}function No(t){return Qe(t).signOut()}const xs="__sak";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class zc{constructor(e,n){this.storageRetriever=e,this.type=n}_isAvailable(){try{return this.storage?(this.storage.setItem(xs,"1"),this.storage.removeItem(xs),Promise.resolve(!0)):Promise.resolve(!1)}catch{return Promise.resolve(!1)}}_set(e,n){return this.storage.setItem(e,JSON.stringify(n)),Promise.resolve()}_get(e){const n=this.storage.getItem(e);return Promise.resolve(n?JSON.parse(n):null)}_remove(e){return this.storage.removeItem(e),Promise.resolve()}get storage(){return this.storageRetriever()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const tg=1e3,ng=10;class qc extends zc{constructor(){super(()=>window.localStorage,"LOCAL"),this.boundEventHandler=(e,n)=>this.onStorageEvent(e,n),this.listeners={},this.localCache={},this.pollTimer=null,this.fallbackToPolling=Uc(),this._shouldAllowMigration=!0}forAllChangedKeys(e){for(const n of Object.keys(this.listeners)){const s=this.storage.getItem(n),r=this.localCache[n];s!==r&&e(n,r,s)}}onStorageEvent(e,n=!1){if(!e.key){this.forAllChangedKeys((o,c,a)=>{this.notifyListeners(o,a)});return}const s=e.key;n?this.detachListener():this.stopPolling();const r=()=>{const o=this.storage.getItem(s);!n&&this.localCache[s]===o||this.notifyListeners(s,o)},i=this.storage.getItem(s);mm()&&i!==e.newValue&&e.newValue!==e.oldValue?setTimeout(r,ng):r()}notifyListeners(e,n){this.localCache[e]=n;const s=this.listeners[e];if(s)for(const r of Array.from(s))r(n&&JSON.parse(n))}startPolling(){this.stopPolling(),this.pollTimer=setInterval(()=>{this.forAllChangedKeys((e,n,s)=>{this.onStorageEvent(new StorageEvent("storage",{key:e,oldValue:n,newValue:s}),!0)})},tg)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}attachListener(){window.addEventListener("storage",this.boundEventHandler)}detachListener(){window.removeEventListener("storage",this.boundEventHandler)}_addListener(e,n){Object.keys(this.listeners).length===0&&(this.fallbackToPolling?this.startPolling():this.attachListener()),this.listeners[e]||(this.listeners[e]=new Set,this.localCache[e]=this.storage.getItem(e)),this.listeners[e].add(n)}_removeListener(e,n){this.listeners[e]&&(this.listeners[e].delete(n),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&(this.detachListener(),this.stopPolling())}async _set(e,n){await super._set(e,n),this.localCache[e]=JSON.stringify(n)}async _get(e){const n=await super._get(e);return this.localCache[e]=JSON.stringify(n),n}async _remove(e){await super._remove(e),delete this.localCache[e]}}qc.type="LOCAL";const sg=qc;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Gc extends zc{constructor(){super(()=>window.sessionStorage,"SESSION")}_addListener(e,n){}_removeListener(e,n){}}Gc.type="SESSION";const Jc=Gc;/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function rg(t){return Promise.all(t.map(async e=>{try{return{fulfilled:!0,value:await e}}catch(n){return{fulfilled:!1,reason:n}}}))}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Js{constructor(e){this.eventTarget=e,this.handlersMap={},this.boundEventHandler=this.handleEvent.bind(this)}static _getInstance(e){const n=this.receivers.find(r=>r.isListeningto(e));if(n)return n;const s=new Js(e);return this.receivers.push(s),s}isListeningto(e){return this.eventTarget===e}async handleEvent(e){const n=e,{eventId:s,eventType:r,data:i}=n.data,o=this.handlersMap[r];if(!o?.size)return;n.ports[0].postMessage({status:"ack",eventId:s,eventType:r});const c=Array.from(o).map(async l=>l(n.origin,i)),a=await rg(c);n.ports[0].postMessage({status:"done",eventId:s,eventType:r,response:a})}_subscribe(e,n){Object.keys(this.handlersMap).length===0&&this.eventTarget.addEventListener("message",this.boundEventHandler),this.handlersMap[e]||(this.handlersMap[e]=new Set),this.handlersMap[e].add(n)}_unsubscribe(e,n){this.handlersMap[e]&&n&&this.handlersMap[e].delete(n),(!n||this.handlersMap[e].size===0)&&delete this.handlersMap[e],Object.keys(this.handlersMap).length===0&&this.eventTarget.removeEventListener("message",this.boundEventHandler)}}Js.receivers=[];/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function mi(t="",e=10){let n="";for(let s=0;s<e;s++)n+=Math.floor(Math.random()*10);return t+n}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ig{constructor(e){this.target=e,this.handlers=new Set}removeMessageHandler(e){e.messageChannel&&(e.messageChannel.port1.removeEventListener("message",e.onMessage),e.messageChannel.port1.close()),this.handlers.delete(e)}async _send(e,n,s=50){const r=typeof MessageChannel<"u"?new MessageChannel:null;if(!r)throw new Error("connection_unavailable");let i,o;return new Promise((c,a)=>{const l=mi("",20);r.port1.start();const u=setTimeout(()=>{a(new Error("unsupported_event"))},s);o={messageChannel:r,onMessage(f){const p=f;if(p.data.eventId===l)switch(p.data.status){case"ack":clearTimeout(u),i=setTimeout(()=>{a(new Error("timeout"))},3e3);break;case"done":clearTimeout(i),c(p.data.response);break;default:clearTimeout(u),clearTimeout(i),a(new Error("invalid_response"));break}}},this.handlers.add(o),r.port1.addEventListener("message",o.onMessage),this.target.postMessage({eventType:e,eventId:l,data:n},[r.port2])}).finally(()=>{o&&this.removeMessageHandler(o)})}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ye(){return window}function og(t){Ye().location.href=t}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Yc(){return typeof Ye().WorkerGlobalScope<"u"&&typeof Ye().importScripts=="function"}async function ag(){if(!navigator?.serviceWorker)return null;try{return(await navigator.serviceWorker.ready).active}catch{return null}}function cg(){return navigator?.serviceWorker?.controller||null}function lg(){return Yc()?self:null}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Xc="firebaseLocalStorageDb",ug=1,Ns="firebaseLocalStorage",Qc="fbase_key";class is{constructor(e){this.request=e}toPromise(){return new Promise((e,n)=>{this.request.addEventListener("success",()=>{e(this.request.result)}),this.request.addEventListener("error",()=>{n(this.request.error)})})}}function Ys(t,e){return t.transaction([Ns],e?"readwrite":"readonly").objectStore(Ns)}function dg(){const t=indexedDB.deleteDatabase(Xc);return new is(t).toPromise()}function Br(){const t=indexedDB.open(Xc,ug);return new Promise((e,n)=>{t.addEventListener("error",()=>{n(t.error)}),t.addEventListener("upgradeneeded",()=>{const s=t.result;try{s.createObjectStore(Ns,{keyPath:Qc})}catch(r){n(r)}}),t.addEventListener("success",async()=>{const s=t.result;s.objectStoreNames.contains(Ns)?e(s):(s.close(),await dg(),e(await Br()))})})}async function Do(t,e,n){const s=Ys(t,!0).put({[Qc]:e,value:n});return new is(s).toPromise()}async function fg(t,e){const n=Ys(t,!1).get(e),s=await new is(n).toPromise();return s===void 0?null:s.value}function Lo(t,e){const n=Ys(t,!0).delete(e);return new is(n).toPromise()}const hg=800,pg=3;class Zc{constructor(){this.type="LOCAL",this._shouldAllowMigration=!0,this.listeners={},this.localCache={},this.pollTimer=null,this.pendingWrites=0,this.receiver=null,this.sender=null,this.serviceWorkerReceiverAvailable=!1,this.activeServiceWorker=null,this._workerInitializationPromise=this.initializeServiceWorkerMessaging().then(()=>{},()=>{})}async _openDb(){return this.db?this.db:(this.db=await Br(),this.db)}async _withRetries(e){let n=0;for(;;)try{const s=await this._openDb();return await e(s)}catch(s){if(n++>pg)throw s;this.db&&(this.db.close(),this.db=void 0)}}async initializeServiceWorkerMessaging(){return Yc()?this.initializeReceiver():this.initializeSender()}async initializeReceiver(){this.receiver=Js._getInstance(lg()),this.receiver._subscribe("keyChanged",async(e,n)=>({keyProcessed:(await this._poll()).includes(n.key)})),this.receiver._subscribe("ping",async(e,n)=>["keyChanged"])}async initializeSender(){if(this.activeServiceWorker=await ag(),!this.activeServiceWorker)return;this.sender=new ig(this.activeServiceWorker);const e=await this.sender._send("ping",{},800);e&&e[0]?.fulfilled&&e[0]?.value.includes("keyChanged")&&(this.serviceWorkerReceiverAvailable=!0)}async notifyServiceWorker(e){if(!(!this.sender||!this.activeServiceWorker||cg()!==this.activeServiceWorker))try{await this.sender._send("keyChanged",{key:e},this.serviceWorkerReceiverAvailable?800:50)}catch{}}async _isAvailable(){try{if(!indexedDB)return!1;const e=await Br();return await Do(e,xs,"1"),await Lo(e,xs),!0}catch{}return!1}async _withPendingWrite(e){this.pendingWrites++;try{await e()}finally{this.pendingWrites--}}async _set(e,n){return this._withPendingWrite(async()=>(await this._withRetries(s=>Do(s,e,n)),this.localCache[e]=n,this.notifyServiceWorker(e)))}async _get(e){const n=await this._withRetries(s=>fg(s,e));return this.localCache[e]=n,n}async _remove(e){return this._withPendingWrite(async()=>(await this._withRetries(n=>Lo(n,e)),delete this.localCache[e],this.notifyServiceWorker(e)))}async _poll(){const e=await this._withRetries(r=>{const i=Ys(r,!1).getAll();return new is(i).toPromise()});if(!e)return[];if(this.pendingWrites!==0)return[];const n=[],s=new Set;if(e.length!==0)for(const{fbase_key:r,value:i}of e)s.add(r),JSON.stringify(this.localCache[r])!==JSON.stringify(i)&&(this.notifyListeners(r,i),n.push(r));for(const r of Object.keys(this.localCache))this.localCache[r]&&!s.has(r)&&(this.notifyListeners(r,null),n.push(r));return n}notifyListeners(e,n){this.localCache[e]=n;const s=this.listeners[e];if(s)for(const r of Array.from(s))r(n)}startPolling(){this.stopPolling(),this.pollTimer=setInterval(async()=>this._poll(),hg)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}_addListener(e,n){Object.keys(this.listeners).length===0&&this.startPolling(),this.listeners[e]||(this.listeners[e]=new Set,this._get(e)),this.listeners[e].add(n)}_removeListener(e,n){this.listeners[e]&&(this.listeners[e].delete(n),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&this.stopPolling()}}Zc.type="LOCAL";const mg=Zc;new ns(3e4,6e4);/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function gg(t,e){return e?ot(e):(U(t._popupRedirectResolver,t,"argument-error"),t._popupRedirectResolver)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class gi extends hi{constructor(e){super("custom","custom"),this.params=e}_getIdTokenResponse(e){return fn(e,this._buildIdpRequest())}_linkToIdToken(e,n){return fn(e,this._buildIdpRequest(n))}_getReauthenticationResolver(e){return fn(e,this._buildIdpRequest())}_buildIdpRequest(e){const n={requestUri:this.params.requestUri,sessionId:this.params.sessionId,postBody:this.params.postBody,tenantId:this.params.tenantId,pendingToken:this.params.pendingToken,returnSecureToken:!0,returnIdpCredential:!0};return e&&(n.idToken=e),n}}function vg(t){return Wc(t.auth,new gi(t),t.bypassAuthState)}function _g(t){const{auth:e,user:n}=t;return U(n,e,"internal-error"),zm(n,new gi(t),t.bypassAuthState)}async function yg(t){const{auth:e,user:n}=t;return U(n,e,"internal-error"),Km(n,new gi(t),t.bypassAuthState)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class el{constructor(e,n,s,r,i=!1){this.auth=e,this.resolver=s,this.user=r,this.bypassAuthState=i,this.pendingPromise=null,this.eventManager=null,this.filter=Array.isArray(n)?n:[n]}execute(){return new Promise(async(e,n)=>{this.pendingPromise={resolve:e,reject:n};try{this.eventManager=await this.resolver._initialize(this.auth),await this.onExecution(),this.eventManager.registerConsumer(this)}catch(s){this.reject(s)}})}async onAuthEvent(e){const{urlResponse:n,sessionId:s,postBody:r,tenantId:i,error:o,type:c}=e;if(o){this.reject(o);return}const a={auth:this.auth,requestUri:n,sessionId:s,tenantId:i||void 0,postBody:r||void 0,user:this.user,bypassAuthState:this.bypassAuthState};try{this.resolve(await this.getIdpTask(c)(a))}catch(l){this.reject(l)}}onError(e){this.reject(e)}getIdpTask(e){switch(e){case"signInViaPopup":case"signInViaRedirect":return vg;case"linkViaPopup":case"linkViaRedirect":return yg;case"reauthViaPopup":case"reauthViaRedirect":return _g;default:Ue(this.auth,"internal-error")}}resolve(e){ft(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.resolve(e),this.unregisterAndCleanUp()}reject(e){ft(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.reject(e),this.unregisterAndCleanUp()}unregisterAndCleanUp(){this.eventManager&&this.eventManager.unregisterConsumer(this),this.pendingPromise=null,this.cleanUp()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const bg=new ns(2e3,1e4);class nn extends el{constructor(e,n,s,r,i){super(e,n,r,i),this.provider=s,this.authWindow=null,this.pollId=null,nn.currentPopupAction&&nn.currentPopupAction.cancel(),nn.currentPopupAction=this}async executeNotNull(){const e=await this.execute();return U(e,this.auth,"internal-error"),e}async onExecution(){ft(this.filter.length===1,"Popup operations only handle one event");const e=mi();this.authWindow=await this.resolver._openPopup(this.auth,this.provider,this.filter[0],e),this.authWindow.associatedEvent=e,this.resolver._originValidation(this.auth).catch(n=>{this.reject(n)}),this.resolver._isIframeWebStorageSupported(this.auth,n=>{n||this.reject(Je(this.auth,"web-storage-unsupported"))}),this.pollUserCancellation()}get eventId(){return this.authWindow?.associatedEvent||null}cancel(){this.reject(Je(this.auth,"cancelled-popup-request"))}cleanUp(){this.authWindow&&this.authWindow.close(),this.pollId&&window.clearTimeout(this.pollId),this.authWindow=null,this.pollId=null,nn.currentPopupAction=null}pollUserCancellation(){const e=()=>{if(this.authWindow?.window?.closed){this.pollId=window.setTimeout(()=>{this.pollId=null,this.reject(Je(this.auth,"popup-closed-by-user"))},8e3);return}this.pollId=window.setTimeout(e,bg.get())};e()}}nn.currentPopupAction=null;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const wg="pendingRedirect",_s=new Map;class Eg extends el{constructor(e,n,s=!1){super(e,["signInViaRedirect","linkViaRedirect","reauthViaRedirect","unknown"],n,void 0,s),this.eventId=null}async execute(){let e=_s.get(this.auth._key());if(!e){try{const s=await Ig(this.resolver,this.auth)?await super.execute():null;e=()=>Promise.resolve(s)}catch(n){e=()=>Promise.reject(n)}_s.set(this.auth._key(),e)}return this.bypassAuthState||_s.set(this.auth._key(),()=>Promise.resolve(null)),e()}async onAuthEvent(e){if(e.type==="signInViaRedirect")return super.onAuthEvent(e);if(e.type==="unknown"){this.resolve(null);return}if(e.eventId){const n=await this.auth._redirectUserForId(e.eventId);if(n)return this.user=n,super.onAuthEvent(e);this.resolve(null)}}async onExecution(){}cleanUp(){}}async function Ig(t,e){const n=Cg(e),s=Tg(t);if(!await s._isAvailable())return!1;const r=await s._get(n)==="true";return await s._remove(n),r}function Sg(t,e){_s.set(t._key(),e)}function Tg(t){return ot(t._redirectPersistence)}function Cg(t){return vs(wg,t.config.apiKey,t.name)}async function Rg(t,e,n=!1){if(xe(t.app))return Promise.reject(ct(t));const s=Gt(t),r=gg(s,e),o=await new Eg(s,r,n).execute();return o&&!n&&(delete o.user._redirectEventId,await s._persistUserIfCurrent(o.user),await s._setRedirectUser(null,e)),o}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ag=10*60*1e3;class Pg{constructor(e){this.auth=e,this.cachedEventUids=new Set,this.consumers=new Set,this.queuedRedirectEvent=null,this.hasHandledPotentialRedirect=!1,this.lastProcessedEventTime=Date.now()}registerConsumer(e){this.consumers.add(e),this.queuedRedirectEvent&&this.isEventForConsumer(this.queuedRedirectEvent,e)&&(this.sendToConsumer(this.queuedRedirectEvent,e),this.saveEventToCache(this.queuedRedirectEvent),this.queuedRedirectEvent=null)}unregisterConsumer(e){this.consumers.delete(e)}onEvent(e){if(this.hasEventBeenHandled(e))return!1;let n=!1;return this.consumers.forEach(s=>{this.isEventForConsumer(e,s)&&(n=!0,this.sendToConsumer(e,s),this.saveEventToCache(e))}),this.hasHandledPotentialRedirect||!kg(e)||(this.hasHandledPotentialRedirect=!0,n||(this.queuedRedirectEvent=e,n=!0)),n}sendToConsumer(e,n){if(e.error&&!tl(e)){const s=e.error.code?.split("auth/")[1]||"internal-error";n.onError(Je(this.auth,s))}else n.onAuthEvent(e)}isEventForConsumer(e,n){const s=n.eventId===null||!!e.eventId&&e.eventId===n.eventId;return n.filter.includes(e.type)&&s}hasEventBeenHandled(e){return Date.now()-this.lastProcessedEventTime>=Ag&&this.cachedEventUids.clear(),this.cachedEventUids.has(Mo(e))}saveEventToCache(e){this.cachedEventUids.add(Mo(e)),this.lastProcessedEventTime=Date.now()}}function Mo(t){return[t.type,t.eventId,t.sessionId,t.tenantId].filter(e=>e).join("-")}function tl({type:t,error:e}){return t==="unknown"&&e?.code==="auth/no-auth-event"}function kg(t){switch(t.type){case"signInViaRedirect":case"linkViaRedirect":case"reauthViaRedirect":return!0;case"unknown":return tl(t);default:return!1}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Og(t,e={}){return Ze(t,"GET","/v1/projects",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const xg=/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/,Ng=/^https?/;async function Dg(t){if(t.config.emulator)return;const{authorizedDomains:e}=await Og(t);for(const n of e)try{if(Lg(n))return}catch{}Ue(t,"unauthorized-domain")}function Lg(t){const e=$r(),{protocol:n,hostname:s}=new URL(e);if(t.startsWith("chrome-extension://")){const o=new URL(t);return o.hostname===""&&s===""?n==="chrome-extension:"&&t.replace("chrome-extension://","")===e.replace("chrome-extension://",""):n==="chrome-extension:"&&o.hostname===s}if(!Ng.test(n))return!1;if(xg.test(t))return s===t;const r=t.replace(/\./g,"\\.");return new RegExp("^(.+\\."+r+"|"+r+")$","i").test(s)}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Mg=new ns(3e4,6e4);function Uo(){const t=Ye().___jsl;if(t?.H){for(const e of Object.keys(t.H))if(t.H[e].r=t.H[e].r||[],t.H[e].L=t.H[e].L||[],t.H[e].r=[...t.H[e].L],t.CP)for(let n=0;n<t.CP.length;n++)t.CP[n]=null}}function Ug(t){return new Promise((e,n)=>{function s(){Uo(),gapi.load("gapi.iframes",{callback:()=>{e(gapi.iframes.getContext())},ontimeout:()=>{Uo(),n(Je(t,"network-request-failed"))},timeout:Mg.get()})}if(Ye().gapi?.iframes?.Iframe)e(gapi.iframes.getContext());else if(Ye().gapi?.load)s();else{const r=Sm("iframefcb");return Ye()[r]=()=>{gapi.load?s():n(Je(t,"network-request-failed"))},Fc(`${Im()}?onload=${r}`).catch(i=>n(i))}}).catch(e=>{throw ys=null,e})}let ys=null;function $g(t){return ys=ys||Ug(t),ys}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Fg=new ns(5e3,15e3),Hg="__/auth/iframe",Bg="emulator/auth/iframe",Vg={style:{position:"absolute",top:"-100px",width:"1px",height:"1px"},"aria-hidden":"true",tabindex:"-1"},jg=new Map([["identitytoolkit.googleapis.com","p"],["staging-identitytoolkit.sandbox.googleapis.com","s"],["test-identitytoolkit.sandbox.googleapis.com","t"]]);function Wg(t){const e=t.config;U(e.authDomain,t,"auth-domain-config-required");const n=e.emulator?ui(e,Bg):`https://${t.config.authDomain}/${Hg}`,s={apiKey:e.apiKey,appName:t.name,v:ts},r=jg.get(t.config.apiHost);r&&(s.eid=r);const i=t._getFrameworks();return i.length&&(s.fw=i.join(",")),`${n}?${es(s).slice(1)}`}async function Kg(t){const e=await $g(t),n=Ye().gapi;return U(n,t,"internal-error"),e.open({where:document.body,url:Wg(t),messageHandlersFilter:n.iframes.CROSS_ORIGIN_IFRAMES_FILTER,attributes:Vg,dontclear:!0},s=>new Promise(async(r,i)=>{await s.restyle({setHideOnLeave:!1});const o=Je(t,"network-request-failed"),c=Ye().setTimeout(()=>{i(o)},Fg.get());function a(){Ye().clearTimeout(c),r(s)}s.ping(a).then(a,()=>{i(o)})}))}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const zg={location:"yes",resizable:"yes",statusbar:"yes",toolbar:"no"},qg=500,Gg=600,Jg="_blank",Yg="http://localhost";class $o{constructor(e){this.window=e,this.associatedEvent=null}close(){if(this.window)try{this.window.close()}catch{}}}function Xg(t,e,n,s=qg,r=Gg){const i=Math.max((window.screen.availHeight-r)/2,0).toString(),o=Math.max((window.screen.availWidth-s)/2,0).toString();let c="";const a={...zg,width:s.toString(),height:r.toString(),top:i,left:o},l=ve().toLowerCase();n&&(c=xc(l)?Jg:n),kc(l)&&(e=e||Yg,a.scrollbars="yes");const u=Object.entries(a).reduce((p,[g,S])=>`${p}${g}=${S},`,"");if(pm(l)&&c!=="_self")return Qg(e||"",c),new $o(null);const f=window.open(e||"",c,u);U(f,t,"popup-blocked");try{f.focus()}catch{}return new $o(f)}function Qg(t,e){const n=document.createElement("a");n.href=t,n.target=e;const s=document.createEvent("MouseEvent");s.initMouseEvent("click",!0,!0,window,1,0,0,0,0,!1,!1,!1,!1,1,null),n.dispatchEvent(s)}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Zg="__/auth/handler",ev="emulator/auth/handler",tv=encodeURIComponent("fac");async function Fo(t,e,n,s,r,i){U(t.config.authDomain,t,"auth-domain-config-required"),U(t.config.apiKey,t,"invalid-api-key");const o={apiKey:t.config.apiKey,appName:t.name,authType:n,redirectUrl:s,v:ts,eventId:r};if(e instanceof Vc){e.setDefaultLanguage(t.languageCode),o.providerId=e.providerId||"",Lh(e.getCustomParameters())||(o.customParameters=JSON.stringify(e.getCustomParameters()));for(const[u,f]of Object.entries({}))o[u]=f}if(e instanceof rs){const u=e.getScopes().filter(f=>f!=="");u.length>0&&(o.scopes=u.join(","))}t.tenantId&&(o.tid=t.tenantId);const c=o;for(const u of Object.keys(c))c[u]===void 0&&delete c[u];const a=await t._getAppCheckToken(),l=a?`#${tv}=${encodeURIComponent(a)}`:"";return`${nv(t)}?${es(c).slice(1)}${l}`}function nv({config:t}){return t.emulator?ui(t,ev):`https://${t.authDomain}/${Zg}`}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const vr="webStorageSupport";class sv{constructor(){this.eventManagers={},this.iframes={},this.originValidationPromises={},this._redirectPersistence=Jc,this._completeRedirectFn=Rg,this._overrideRedirectResult=Sg}async _openPopup(e,n,s,r){ft(this.eventManagers[e._key()]?.manager,"_initialize() not called before _openPopup()");const i=await Fo(e,n,s,$r(),r);return Xg(e,i,mi())}async _openRedirect(e,n,s,r){await this._originValidation(e);const i=await Fo(e,n,s,$r(),r);return og(i),new Promise(()=>{})}_initialize(e){const n=e._key();if(this.eventManagers[n]){const{manager:r,promise:i}=this.eventManagers[n];return r?Promise.resolve(r):(ft(i,"If manager is not set, promise should be"),i)}const s=this.initAndGetManager(e);return this.eventManagers[n]={promise:s},s.catch(()=>{delete this.eventManagers[n]}),s}async initAndGetManager(e){const n=await Kg(e),s=new Pg(e);return n.register("authEvent",r=>(U(r?.authEvent,e,"invalid-auth-event"),{status:s.onEvent(r.authEvent)?"ACK":"ERROR"}),gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER),this.eventManagers[e._key()]={manager:s},this.iframes[e._key()]=n,s}_isIframeWebStorageSupported(e,n){this.iframes[e._key()].send(vr,{type:vr},r=>{const i=r?.[0]?.[vr];i!==void 0&&n(!!i),Ue(e,"internal-error")},gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER)}_originValidation(e){const n=e._key();return this.originValidationPromises[n]||(this.originValidationPromises[n]=Dg(e)),this.originValidationPromises[n]}get _shouldInitProactively(){return Uc()||Oc()||fi()}}const rv=sv;var Ho="@firebase/auth",Bo="1.11.0";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class iv{constructor(e){this.auth=e,this.internalListeners=new Map}getUid(){return this.assertAuthConfigured(),this.auth.currentUser?.uid||null}async getToken(e){return this.assertAuthConfigured(),await this.auth._initializationPromise,this.auth.currentUser?{accessToken:await this.auth.currentUser.getIdToken(e)}:null}addAuthTokenListener(e){if(this.assertAuthConfigured(),this.internalListeners.has(e))return;const n=this.auth.onIdTokenChanged(s=>{e(s?.stsTokenManager.accessToken||null)});this.internalListeners.set(e,n),this.updateProactiveRefresh()}removeAuthTokenListener(e){this.assertAuthConfigured();const n=this.internalListeners.get(e);n&&(this.internalListeners.delete(e),n(),this.updateProactiveRefresh())}assertAuthConfigured(){U(this.auth._initializationPromise,"dependent-sdk-initialized-before-auth")}updateProactiveRefresh(){this.internalListeners.size>0?this.auth._startProactiveRefresh():this.auth._stopProactiveRefresh()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ov(t){switch(t){case"Node":return"node";case"ReactNative":return"rn";case"Worker":return"webworker";case"Cordova":return"cordova";case"WebExtension":return"web-extension";default:return}}function av(t){Gn(new vn("auth",(e,{options:n})=>{const s=e.getProvider("app").getImmediate(),r=e.getProvider("heartbeat"),i=e.getProvider("app-check-internal"),{apiKey:o,authDomain:c}=s.options;U(o&&!o.includes(":"),"invalid-api-key",{appName:s.name});const a={apiKey:o,authDomain:c,clientPlatform:t,apiHost:"identitytoolkit.googleapis.com",tokenApiHost:"securetoken.googleapis.com",apiScheme:"https",sdkClientVersion:$c(t)},l=new bm(s,r,i,a);return km(l,n),l},"PUBLIC").setInstantiationMode("EXPLICIT").setInstanceCreatedCallback((e,n,s)=>{e.getProvider("auth-internal").initialize()})),Gn(new vn("auth-internal",e=>{const n=Gt(e.getProvider("auth").getImmediate());return(s=>new iv(s))(n)},"PRIVATE").setInstantiationMode("EXPLICIT")),ln(Ho,Bo,ov(t)),ln(Ho,Bo,"esm2020")}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const cv=5*60,lv=pc("authIdTokenMaxAge")||cv;let Vo=null;const uv=t=>async e=>{const n=e&&await e.getIdTokenResult(),s=n&&(new Date().getTime()-Date.parse(n.issuedAtTime))/1e3;if(s&&s>lv)return;const r=n?.token;Vo!==r&&(Vo=r,await fetch(t,{method:r?"POST":"DELETE",headers:r?{Authorization:`Bearer ${r}`}:{}}))};function dv(t=Up()){const e=_c(t,"auth");if(e.isInitialized())return e.getImmediate();const n=Pm(t,{popupRedirectResolver:rv,persistence:[mg,sg,Jc]}),s=pc("authTokenSyncURL");if(s&&typeof isSecureContext=="boolean"&&isSecureContext){const i=new URL(s,location.origin);if(location.origin===i.origin){const o=uv(i.toString());eg(n,o,()=>o(n.currentUser)),Zm(n,c=>o(c))}}const r=yh("auth");return r&&Om(n,`http://${r}`),n}function fv(){return document.getElementsByTagName("head")?.[0]??document}wm({loadJS(t){return new Promise((e,n)=>{const s=document.createElement("script");s.setAttribute("src",t),s.onload=e,s.onerror=r=>{const i=Je("internal-error");i.customData=r,n(i)},s.type="text/javascript",s.charset="UTF-8",fv().appendChild(s)})},gapiScript:"https://apis.google.com/js/api.js",recaptchaV2Script:"https://www.google.com/recaptcha/api.js",recaptchaEnterpriseScript:"https://www.google.com/recaptcha/enterprise.js?render="});av("Browser");var hv="firebase",pv="12.0.0";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ln(hv,pv,"app");const mv={apiKey:"AIzaSyB2lWt-tcHKBnefsi1wewG2sniXyUx25Y0",authDomain:"sharehelp-5a199.firebaseapp.com",projectId:"sharehelp-5a199",storageBucket:"sharehelp-5a199.firebasestorage.app",messagingSenderId:"960501957214",appId:"1:960501957214:web:3d7017f3b6235fa36b2acf"},gv=yc(mv),Tn=dv(gv),vv="/icons/enviarlogin.png",_v={class:"form-content"},yv={class:"input-group"},bv=["value","disabled"],wv={class:"input-group"},Ev=["value","disabled"],Iv={class:"checkbox-group"},Sv={class:"checkbox-label"},Tv=["checked"],Cv={key:0,class:"error-message"},Rv=["disabled"],Av={class:"create-account"},Pv={__name:"LoginForm",props:["email","password","keepLoggedIn","isLoading","error"],emits:["update:email","update:password","update:keepLoggedIn","login","createAccount"],setup(t){return(e,n)=>(ne(),ie("div",_v,[n[9]||(n[9]=O("h2",{class:"form-title"},"Fazer login",-1)),O("div",yv,[O("input",{value:t.email,onInput:n[0]||(n[0]=s=>e.$emit("update:email",s.target.value)),type:"email",placeholder:"Nome de Usuário",class:"input-field",disabled:t.isLoading},null,40,bv)]),O("div",wv,[O("input",{value:t.password,onInput:n[1]||(n[1]=s=>e.$emit("update:password",s.target.value)),type:"password",placeholder:"Senha",class:"input-field",disabled:t.isLoading,onKeyup:n[2]||(n[2]=Ja(s=>e.$emit("login"),["enter"]))},null,40,Ev)]),O("div",Iv,[O("label",Sv,[O("input",{checked:t.keepLoggedIn,onChange:n[3]||(n[3]=s=>e.$emit("update:keepLoggedIn",s.target.checked)),type:"checkbox",class:"checkbox"},null,40,Tv),n[6]||(n[6]=O("span",{class:"checkbox-text"},"Manter login",-1))])]),t.error?(ne(),ie("div",Cv,Oe(t.error),1)):en("",!0),O("button",{onClick:n[4]||(n[4]=s=>e.$emit("login")),disabled:t.isLoading,class:xt(["submit-button",{loading:t.isLoading}])},n[7]||(n[7]=[O("div",{class:"arrow-icon"},[O("img",{src:vv,alt:""})],-1)]),10,Rv),O("div",Av,[n[8]||(n[8]=O("span",null,"Não consegue fazer login?",-1)),O("button",{onClick:n[5]||(n[5]=s=>e.$emit("createAccount")),class:"create-account-link"}," Criar Conta ")])]))}},kv=Ut(Pv,[["__scopeId","data-v-3bcb4a50"]]),Ov={class:"form-content register-step"},xv={class:"step-indicator"},Nv={class:"step-dots"},Dv={class:"step-text"},Lv={class:"step-title"},Mv=["innerHTML"],Uv={key:0,class:"form-fields"},$v=["value","onInput","type","placeholder","disabled"],Fv={key:1,class:"password-requirements"},Hv={key:2,class:"error-message"},Bv={class:"error-text"},Vv={class:"button-container"},jv=["disabled"],Wv={key:0,class:"button-text"},Kv={key:1,class:"loading-text"},zv={key:2,class:"arrow-icon"},qv={key:3,class:"resend-container"},Gv=["disabled"],Jv={__name:"RegisterStep",props:["step","data","error","isLoading"],emits:["next","update:data","resend"],setup(t,{emit:e}){const n=t,s=e,r=Re(()=>{const a={1:{title:"Qual é o seu e-mail?",subtitle:"Sim, permite que a Share-help lhe envie informações sobre<br>pagamentos, atualizações, relatórios e outros conteúdos<br>relacionados à Share-help.",fields:[{key:"email",type:"email",placeholder:"E-mail"}],buttonText:"Enviar código"},2:{title:"Verificação de E-mail",subtitle:`<div class="verification-steps">
                  <div class="step-item">
                    <span class="step-number">1</span>
                    <span class="step-text">Verifique sua caixa de entrada (e spam) do email:</span>
                  </div>
                  <div class="email-highlight">${n.data.email}</div>
                  
                  <div class="step-item">
                    <span class="step-number">2</span>
                    <span class="step-text">Abra o email da Share-help e clique no link de verificação</span>
                  </div>
                  
                  <div class="step-item">
                    <span class="step-number">3</span>
                    <span class="step-text">Volte aqui e clique em "Verificar Email" abaixo</span>
                  </div>
                  
                  <div class="warning">
                    ⚠️ <strong>Importante:</strong> Você deve clicar no link do e-mail ANTES de continuar aqui
                  </div>
                </div>`,fields:[],showResend:!0,buttonText:"Verificar Email"},3:{title:"Como você se chama?",subtitle:"Seu nome verdadeiro não será compartilhado<br>com os outros usuários",fields:[{key:"name",type:"text",placeholder:"Nome verdadeiro"},{key:"username",type:"text",placeholder:"Nome de usuário (apenas letras, números e _)"}],buttonText:"Continuar"},4:{title:"Escolha uma senha",subtitle:"Crie uma senha segura para sua conta",fields:[{key:"password",type:"password",placeholder:"Nova senha"},{key:"confirmPassword",type:"password",placeholder:"Confirmar nova senha"}],showPasswordHints:!0,buttonText:"Finalizar cadastro"}};return a[n.step]||a[1]}),i=(a,l)=>{const u={...n.data,[a]:l};s("update:data",u)},o=()=>{s("next")},c=()=>{s("resend")};return(a,l)=>(ne(),ie("div",Ov,[O("div",xv,[O("div",Nv,[(ne(),ie(Ce,null,Ir(4,u=>O("div",{key:u,class:xt(["step-dot",{active:u<=t.step,current:u===t.step}])},null,2)),64))]),O("div",Dv,"Passo "+Oe(t.step)+" de 4",1)]),O("h3",Lv,Oe(r.value.title),1),O("div",{class:"step-subtitle",innerHTML:r.value.subtitle},null,8,Mv),r.value.fields.length>0?(ne(),ie("div",Uv,[(ne(!0),ie(Ce,null,Ir(r.value.fields,u=>(ne(),ie("div",{class:"input-group",key:u.key},[O("input",{value:t.data[u.key],onInput:f=>i(u.key,f.target.value),type:u.type,placeholder:u.placeholder,class:"input-field",disabled:t.isLoading,onKeyup:Ja(o,["enter"]),autocomplete:"off"},null,40,$v)]))),128))])):en("",!0),r.value.showPasswordHints?(ne(),ie("div",Fv,l[0]||(l[0]=[O("div",{class:"requirement-title"},"Requisitos da senha:",-1),O("div",{class:"requirement-list"},[O("div",{class:"requirement-item"},"✓ Mínimo de 6 caracteres"),O("div",{class:"requirement-item"},"✓ Recomendado: combine letras, números e símbolos")],-1)]))):en("",!0),t.error?(ne(),ie("div",Hv,[l[1]||(l[1]=O("div",{class:"error-icon"},"⚠️",-1)),O("div",Bv,Oe(t.error),1)])):en("",!0),O("div",Vv,[O("button",{onClick:o,disabled:t.isLoading,class:xt(["submit-button",{loading:t.isLoading}])},[t.isLoading?(ne(),ie("span",Kv,[l[2]||(l[2]=O("div",{class:"spinner"},null,-1)),At(" "+Oe(t.step===1?"Enviando...":t.step===2?"Verificando...":t.step===4?"Finalizando...":"Processando..."),1)])):(ne(),ie("span",Wv,Oe(r.value.buttonText),1)),t.isLoading?en("",!0):(ne(),ie("div",zv,l[3]||(l[3]=[O("svg",{viewBox:"0 0 24 24",fill:"none",xmlns:"http://www.w3.org/2000/svg"},[O("path",{d:"M5 12H19M19 12L12 5M19 12L12 19",stroke:"currentColor","stroke-width":"2"})],-1)])))],10,jv)]),r.value.showResend?(ne(),ie("div",qv,[l[4]||(l[4]=O("div",{class:"resend-text"},"Não recebeu o e-mail?",-1)),O("button",{onClick:c,class:"resend-link",disabled:t.isLoading}," Reenviar e-mail de verificação ",8,Gv),l[5]||(l[5]=O("div",{class:"resend-tip"}," 💡 Verifique também sua pasta de spam ",-1))])):en("",!0)]))}},Yv=Ut(Jv,[["__scopeId","data-v-6ea8387d"]]),Xv={class:"page-container"},Qv={key:0,class:"card-content"},Zv={key:1,class:"card-content"},e_={__name:"Login",setup(t){const e=ke(""),n=ke(""),s=ke(!1),r=ke(""),i=ke(!1),o=ke(!1),c=ke(!1),a=ke(1),l=ke({email:"",verificationCode:"",name:"",username:"",password:"",confirmPassword:""}),u=ke(null),f=async()=>{if(!e.value||!n.value){r.value="Por favor, preencha todos os campos";return}s.value=!0,r.value="";try{const P=await Ym(Tn,e.value,n.value);console.log("Login bem-sucedido:",P.user),alert("Login realizado com sucesso!")}catch(P){const E={"auth/user-not-found":"Usuário não encontrado","auth/wrong-password":"Senha incorreta","auth/invalid-email":"Email inválido","auth/user-disabled":"Conta desativada","auth/too-many-requests":"Muitas tentativas. Tente novamente mais tarde"};r.value=E[P.code]||"Erro no login. Tente novamente"}finally{s.value=!1}},p=()=>{c.value=!0,setTimeout(()=>{o.value=!0,c.value=!1,a.value=1,r.value=""},300)},g=()=>{c.value=!0,setTimeout(()=>{o.value=!1,c.value=!1,a.value=1,r.value="",u.value=null,l.value={email:"",verificationCode:"",name:"",username:"",password:"",confirmPassword:""},Tn.currentUser&&No(Tn).catch(console.error)},300)},S={1:async()=>{if(!l.value.email){r.value="Por favor, digite seu e-mail";return}if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(l.value.email)){r.value="Por favor, digite um e-mail válido";return}s.value=!0,r.value="";try{const E=`temp_${Date.now()}_${Math.random().toString(36).substring(7)}`,x=await Jm(Tn,l.value.email,E);console.log("Nova conta criada:",x.user.uid),u.value=x.user,await xo(x.user,{url:window.location.origin,handleCodeInApp:!1}),console.log("Email de verificação enviado para:",l.value.email),a.value=2}catch(E){if(console.error("Erro no step 1:",E),E.code==="auth/email-already-in-use")r.value="Este e-mail já está em uso. Tente fazer login ou use outro e-mail.";else{const x={"auth/weak-password":"Erro interno. Tente novamente.","auth/invalid-email":"E-mail inválido.","auth/operation-not-allowed":"Operação não permitida. Contate o suporte."};r.value=x[E.code]||"Erro ao criar conta. Tente novamente."}}finally{s.value=!1}},2:async()=>{if(!u.value){r.value="Sessão expirada. Reinicie o processo.",a.value=1;return}s.value=!0,r.value="";try{await u.value.reload(),console.log("Status de verificação:",u.value.emailVerified),u.value.emailVerified?(console.log("Email verificado com sucesso!"),a.value=3):r.value="Email ainda não foi verificado. Verifique sua caixa de entrada (incluindo spam), clique no link de verificação e tente novamente."}catch(P){console.error("Erro ao verificar email:",P),r.value="Erro na verificação. Tente novamente."}finally{s.value=!1}},3:()=>{if(!l.value.name||!l.value.username){r.value="Por favor, preencha todos os campos";return}if(l.value.name.trim().length<2){r.value="Nome deve ter pelo menos 2 caracteres";return}if(l.value.username.trim().length<3){r.value="Nome de usuário deve ter pelo menos 3 caracteres";return}if(!/^[a-zA-Z0-9_]+$/.test(l.value.username.trim())){r.value="Nome de usuário deve conter apenas letras, números e underscore";return}r.value="",a.value=4},4:async()=>{if(!l.value.password||!l.value.confirmPassword){r.value="Por favor, preencha todos os campos";return}if(l.value.password.length<6){r.value="Senha deve ter pelo menos 6 caracteres";return}if(l.value.password!==l.value.confirmPassword){r.value="Senhas não coincidem";return}if(!u.value){r.value="Sessão expirada. Reinicie o processo.",a.value=1;return}if(!u.value.emailVerified){r.value="Email não verificado. Volte ao passo anterior.",a.value=2;return}s.value=!0,r.value="";try{await Xm(u.value,l.value.password),console.log("Cadastro finalizado com sucesso!"),alert(`Conta criada com sucesso! Bem-vindo(a), ${l.value.name}!`),await No(Tn),g()}catch(P){console.error("Erro no step 4:",P);const E={"auth/weak-password":"Senha muito fraca. Use pelo menos 6 caracteres.","auth/requires-recent-login":"Sessão expirada. Reinicie o processo."};r.value=E[P.code]||"Erro ao finalizar cadastro. Tente novamente."}finally{s.value=!1}}},k=async()=>{await S[a.value]()},F=async()=>{if(!u.value){r.value="Sessão expirada. Reinicie o processo.",a.value=1;return}s.value=!0,r.value="";try{await xo(u.value,{url:window.location.origin,handleCodeInApp:!1}),alert("E-mail de verificação reenviado! Verifique sua caixa de entrada.")}catch(P){console.error("Erro ao reenviar email:",P),r.value="Erro ao reenviar e-mail. Tente novamente."}finally{s.value=!1}};return(P,E)=>(ne(),ie("div",Xv,[E[6]||(E[6]=O("div",{class:"background-image"},null,-1)),O("div",{class:xt(["main-card",{"slide-left":o.value,"blur-effect":c.value}])},[o.value?(ne(),ie("div",Zv,[oe(Yv,{step:a.value,data:l.value,"onUpdate:data":E[3]||(E[3]=x=>l.value=x),error:r.value,isLoading:s.value,onNext:k,onResend:F},null,8,["step","data","error","isLoading"]),O("div",{class:"back-to-login"},[E[4]||(E[4]=O("span",null,"Já possui uma conta?",-1)),O("button",{onClick:g,class:"back-login-link"}," Fazer Login ")])])):(ne(),ie("div",Qv,[oe(kv,{email:e.value,"onUpdate:email":E[0]||(E[0]=x=>e.value=x),password:n.value,"onUpdate:password":E[1]||(E[1]=x=>n.value=x),keepLoggedIn:i.value,"onUpdate:keepLoggedIn":E[2]||(E[2]=x=>i.value=x),isLoading:s.value,error:r.value,onLogin:f,onCreateAccount:p},null,8,["email","password","keepLoggedIn","isLoading","error"])]))],2),O("div",{class:xt(["side-text",{show:o.value}])},E[5]||(E[5]=[O("h1",null,[At("CRIAR UMA"),O("br"),At("CONTA")],-1)]),2),E[7]||(E[7]=O("div",{class:"footer-text"},[At(" É necessário uma conta para realizar doações não anônimas"),O("br"),At(" by share-help ")],-1))]))}},t_=Ut(e_,[["__scopeId","data-v-bec37c7e"]]),n_=[{path:"/",name:"Home",component:uh},{path:"/login",name:"Login",component:t_}],nl=Uf({history:ff(),routes:n_});nl.onError(t=>{console.error("Router error:",t)});const sl=Id(Nd);sl.use(nl);sl.mount("#app");
