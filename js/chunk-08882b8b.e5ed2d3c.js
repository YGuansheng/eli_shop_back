(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-08882b8b","chunk-3e4428a5","chunk-1aaacd37","chunk-cf808bb8","chunk-2d0e2c67","chunk-2d21b316"],{"0e19":function(e,t,r){"use strict";r.r(t),r.d(t,"default",(function(){return c}));var n=r("320c"),s=r.n(n),o=r("7fac"),i=r("fbb8");class c{constructor(e={}){Object(i["assertOptions"])(e),this.opts=s()({region:"oss-cn-hangzhou",internal:!1,cname:!1,secure:!1,timeout:6e4},e);const{bucket:t,region:r,endpoint:n,internal:o}=this.opts;if(this.host="",n)this.host=n;else{let e=t;o&&(e+="-internal"),e+=`.${r}.aliyuncs.com`,this.host=e}}put(e,t){return new Promise((r,n)=>{const{accessKeyId:s,accessKeySecret:c,stsToken:u,bucket:a}=this.opts,h="PUT",f=t.type,p={"Content-Type":f,"x-oss-date":(new Date).toGMTString()};u&&(p["x-oss-security-token"]=u);const d=Object(i["getSignature"])({verb:h,headers:p,bucket:a,objectName:e,accessKeyId:s,accessKeySecret:c});p.Authorization=`OSS ${s}:${d}`;const l=this.opts.secure?"https":"http",y=`${l}://${this.host}/${e}`;return console.log(y),Object(o["default"])(y,{method:h,headers:p,data:t,timeout:this.opts.timeout}).then(r).catch(n)})}signatureUrl(e,t={}){const{expires:r=1800,method:n,process:s,response:o}=t,{accessKeyId:c,accessKeySecret:u,stsToken:a,bucket:h}=this.opts,f={},p={};if(s){const e="x-oss-process";p[e]=s}o&&Object.keys(o).forEach(e=>{const t=`response-${e.toLowerCase()}`;p[t]=o[e]}),Object.keys(t).forEach(e=>{const r=e.toLowerCase(),n=t[e];0===r.indexOf("x-oss-")?f[r]=n:0===r.indexOf("content-type")?f[e]=n:"expires"!==r&&"response"!==r&&"process"!==r&&"method"!==r&&(p[r]=n)});const d=t["security-token"]||a;d&&(p["security-token"]=d);const l=Object(i["unix"])()+r,y=Object(i["getSignature"])({type:"url",verb:n||"GET",accessKeyId:c,accessKeySecret:u,bucket:h,objectName:e,headers:f,subResource:p,expires:l}),b=this.opts.secure?"https":"http";let g=`${b}://${this.host}/${e}`;return g+=`?OSSAccessKeyId=${c}`,g+=`&Expires=${l}`,g+=`&Signature=${encodeURIComponent(y)}`,Object.keys(p).forEach(e=>{g+=`&${e}=${encodeURIComponent(p[e])}`}),g}}},"320c":function(e,t,r){"use strict";
/*
object-assign
(c) Sindre Sorhus
@license MIT
*/var n=Object.getOwnPropertySymbols,s=Object.prototype.hasOwnProperty,o=Object.prototype.propertyIsEnumerable;function i(e){if(null===e||void 0===e)throw new TypeError("Object.assign cannot be called with null or undefined");return Object(e)}function c(){try{if(!Object.assign)return!1;var e=new String("abc");if(e[5]="de","5"===Object.getOwnPropertyNames(e)[0])return!1;for(var t={},r=0;r<10;r++)t["_"+String.fromCharCode(r)]=r;var n=Object.getOwnPropertyNames(t).map((function(e){return t[e]}));if("0123456789"!==n.join(""))return!1;var s={};return"abcdefghijklmnopqrst".split("").forEach((function(e){s[e]=e})),"abcdefghijklmnopqrst"===Object.keys(Object.assign({},s)).join("")}catch(o){return!1}}e.exports=c()?Object.assign:function(e,t){for(var r,c,u=i(e),a=1;a<arguments.length;a++){for(var h in r=Object(arguments[a]),r)s.call(r,h)&&(u[h]=r[h]);if(n){c=n(r);for(var f=0;f<c.length;f++)o.call(r,c[f])&&(u[c[f]]=r[c[f]])}}return u}},5712:function(e,t,r){"use strict";r.r(t);var n=r("b4c7"),s=r.n(n),o=r("60bb"),i=r.n(o);function c(e,t){const r=t.buildKey(e,t.custom);return"string"===typeof r?new Promise(e=>{e(r)}):r}t["default"]={sts:void 0,options:void 0,init(e){this.options=e},getSts(e,t){return null==this.sts||this.sts.expiresTime<(new Date).getTime()?e.getAuthorization(t).then(e=>{const t=e;return t.expiresTime=(new Date).getTime()+parseInt(e.expiration),this.sts=t,t}):new Promise(e=>{e(this.sts)})},async upload({file:e,fileName:t,onProgress:r,onError:n,config:o}){const u=i.a.cloneDeep(this.options);i.a.merge(u,o),o=u,console.log("-----------开始上传----------",t,o);const a=await c(t,o);let h=null;null!==this.options.getAuthorization&&(h=await this.getSts(this.options,o.custom));let f=null;return f=null!=h?new s.a({region:o.region,accessKeyId:h.accessKeyId,accessKeySecret:h.accessKeySecret,stsToken:h.securityToken,bucket:o.bucket,...o.sdkOpts}):new s.a({region:o.region,accessKeyId:o.accessKeyId,accessKeySecret:o.accessKeySecret,bucket:o.bucket,...o.sdkOpts}),f.put(a,e).then(e=>{const t={url:o.domain+"/"+a,key:a};return console.log("alioss success",t),t}).catch(e=>{n(e)})}}},"7fac":function(e,t,r){"use strict";function n(e,t={}){return new Promise((r,n)=>{const{async:s=!0,data:o=null,headers:i={},method:c="get",timeout:u=0}=t,a=new XMLHttpRequest;let h;a.open(c,e,s),u&&(h=setTimeout(()=>{n(new Error(`the request timeout ${u}ms`))},u)),a.onerror=()=>{n(new Error("unknown error"))},a.onreadystatechange=()=>{if(4===a.readyState)if(u&&clearTimeout(h),a.status>=200&&a.status<300)r(a.response,a);else{const e=new Error("the request is error");n(e)}},Object.keys(i).forEach(e=>{a.setRequestHeader(e,i[e])});try{a.send(o)}catch(f){n(f)}})}r.r(t),r.d(t,"default",(function(){return n}))},b4c7:function(e,t,r){e.exports=r("0e19").default},bf73:function(e,t,r){"use strict";function n(){}r.r(t),ArrayBuffer.prototype.slice||(ArrayBuffer.prototype.slice=function(e,t){var r,n=new Uint8Array(this);void 0===t&&(t=n.length);var s=new ArrayBuffer(t-e),o=new Uint8Array(s);for(r=0;r<o.length;r++)o[r]=n[r+e];return s}),n.prototype.processBlock=function(e){var t,r,n=this.current[0],s=this.current[1],o=this.current[2],i=this.current[3],c=this.current[4],u=[e[0]<<24|e[1]<<16|e[2]<<8|e[3],e[4]<<24|e[5]<<16|e[6]<<8|e[7],e[8]<<24|e[9]<<16|e[10]<<8|e[11],e[12]<<24|e[13]<<16|e[14]<<8|e[15],e[16]<<24|e[17]<<16|e[18]<<8|e[19],e[20]<<24|e[21]<<16|e[22]<<8|e[23],e[24]<<24|e[25]<<16|e[26]<<8|e[27],e[28]<<24|e[29]<<16|e[30]<<8|e[31],e[32]<<24|e[33]<<16|e[34]<<8|e[35],e[36]<<24|e[37]<<16|e[38]<<8|e[39],e[40]<<24|e[41]<<16|e[42]<<8|e[43],e[44]<<24|e[45]<<16|e[46]<<8|e[47],e[48]<<24|e[49]<<16|e[50]<<8|e[51],e[52]<<24|e[53]<<16|e[54]<<8|e[55],e[56]<<24|e[57]<<16|e[58]<<8|e[59],e[60]<<24|e[61]<<16|e[62]<<8|e[63]];for(r=16;r<80;r++)u.push((u[r-3]^u[r-8]^u[r-14]^u[r-16])<<1|(u[r-3]^u[r-8]^u[r-14]^u[r-16])>>>31);for(r=0;r<80;r++)t=(n<<5|n>>>27)+c+u[r],t+=r<20?1518500249+(s&o|~s&i)|0:r<40?1859775393+(s^o^i)|0:r<60?2400959708+(s&o|s&i|o&i)|0:3395469782+(s^o^i)|0,c=i,i=o,o=s<<30|s>>>2,s=n,n=t;this.current[0]+=n,this.current[1]+=s,this.current[2]+=o,this.current[3]+=i,this.current[4]+=c,this.currentLen+=64},n.prototype.doPadding=function(){var e=8*(this.inLen+this.currentLen),t=0,r=4294967295&e,n=this.inLen<=55?55-this.inLen:119-this.inLen,s=new Uint8Array(new ArrayBuffer(n+1+8));return s[0]=128,s[s.length-1]=255&r,s[s.length-2]=r>>>8&255,s[s.length-3]=r>>>16&255,s[s.length-4]=r>>>24&255,s[s.length-5]=255&t,s[s.length-6]=t>>>8&255,s[s.length-7]=t>>>16&255,s[s.length-8]=t>>>24&255,s},n.prototype.getDigest=function(){var e=new Uint8Array(new ArrayBuffer(20));return e[3]=255&this.current[0],e[2]=this.current[0]>>>8&255,e[1]=this.current[0]>>>16&255,e[0]=this.current[0]>>>24&255,e[7]=255&this.current[1],e[6]=this.current[1]>>>8&255,e[5]=this.current[1]>>>16&255,e[4]=this.current[1]>>>24&255,e[11]=255&this.current[2],e[10]=this.current[2]>>>8&255,e[9]=this.current[2]>>>16&255,e[8]=this.current[2]>>>24&255,e[15]=255&this.current[3],e[14]=this.current[3]>>>8&255,e[13]=this.current[3]>>>16&255,e[12]=this.current[3]>>>24&255,e[19]=255&this.current[4],e[18]=this.current[4]>>>8&255,e[17]=this.current[4]>>>16&255,e[16]=this.current[4]>>>24&255,e.buffer},n.prototype.reset=function(){this.currentLen=0,this.inLen=0,this.current=new Uint32Array(new ArrayBuffer(20)),this.current[0]=1732584193,this.current[1]=4023233417,this.current[2]=2562383102,this.current[3]=271733878,this.current[4]=3285377520},n.prototype.blockLen=64,n.prototype.digestLen=20;var s=function(e){var t,r=new ArrayBuffer(e.length),n=new Uint8Array(r);for(t=0;t<e.length;t++)n[t]=e.charCodeAt(t);return n},o=function(e){var t=new ArrayBuffer(1),r=new Uint8Array(t);return r[0]=e,r},i=function(e){if(e.constructor===Uint8Array)return e;if(e.constructor===ArrayBuffer)return new Uint8Array(e);if(e.constructor===String)return s(e);if(e.constructor===Number){if(e>255)throw"For more than one byte, use an array buffer";if(e<0)throw"Input value must be positive";return o(e)}throw"Unsupported type"},c=function(e){var t=function(e){var t=e.length,r=0;while(t>0){var n=this.blockLen-this.inLen;n>t&&(n=t);var s=e.subarray(r,r+n);this.inbuf.set(s,this.inLen),r+=n,t-=n,this.inLen+=n,this.inLen===this.blockLen&&(this.processBlock(this.inbuf),this.inLen=0)}},r=function(){var e=this.doPadding();this.update(e);var t=this.getDigest();return this.reset(),t},n=function(){if(!e)throw"Unsupported algorithm: "+e.toString();e.prototype.update=t,e.prototype.finalize=r;var n=new e;return n.inbuf=new Uint8Array(new ArrayBuffer(n.blockLen)),n.reset(),n}();return{update:function(e){n.update(i(e))},finalize:function(){return n.finalize()},digest:function(e){return n.update(i(e)),n.finalize()},reset:function(){n.reset()},digestLength:function(){return n.digestLen}}},u=function(e){var t,r,n,s=!1,o=function(){var o,i;if(!s){if(void 0===t)throw"MAC key is not defined";for(i=t.byteLength>64?new Uint8Array(e.digest(t)):new Uint8Array(t),r=new Uint8Array(new ArrayBuffer(64)),o=0;o<i.length;o++)r[o]=54^i[o];for(o=i.length;o<64;o++)r[o]=54;for(n=new Uint8Array(new ArrayBuffer(64)),o=0;o<i.length;o++)n[o]=92^i[o];for(o=i.length;o<64;o++)n[o]=92;s=!0,e.update(r.buffer)}},c=function(){s=!1,t=void 0,r=void 0,n=void 0,e.reset()},u=function(){var t=e.finalize();return e.reset(),e.update(n.buffer),e.update(t),t=e.finalize(),c(),t},a=function(e){t=e};return{setKey:function(e){a(i(e)),o()},update:function(t){e.update(t)},finalize:function(){return u()},mac:function(e){return this.update(e),this.finalize()},reset:function(){c()},hmacLength:function(){return e.digestLength()}}},a={SHA1:function(){return c(n)},HMAC_SHA1:function(){return u(c(n))}};t["default"]=a},fbb8:function(e,t,r){"use strict";r.r(t),r.d(t,"unix",(function(){return c})),r.d(t,"blobToBuffer",(function(){return u})),r.d(t,"assertOptions",(function(){return a})),r.d(t,"getCanonicalizedOSSHeaders",(function(){return h})),r.d(t,"getCanonicalizedResource",(function(){return f})),r.d(t,"getSignature",(function(){return p}));var n=r("1fb5"),s=r.n(n),o=r("bf73");function i(e){return e&&"[object Date]"===Object.prototype.toString.call(e)&&"Invalid Date"!==e.toString}function c(e){let t;return e&&(t=new Date(e)),i(t)||(t=new Date),Math.round(t.getTime()/1e3)}function u(e){return new Promise((t,r)=>{const n=new FileReader;n.onload=()=>{const e=new Uint8Array(n.result);t(e)},n.onerror=()=>{r(n.error)},n.readAsArrayBuffer(e)})}function a(e){const{accessKeyId:t,accessKeySecret:r,bucket:n,endpoint:s}=e;if(!t)throw new Error("need accessKeyId");if(!r)throw new Error("need accessKeySecret");if(!n&&!s)throw new Error("need bucket or endpoint")}function h(e){let t="",r=Object.keys(e);return r=r.map(e=>e.toLowerCase()),r.sort(),r.forEach(r=>{0===r.indexOf("x-oss-")&&(t+=`${r}:${e[r]}\n`)}),t}function f(e="",t="",r){let n="";e&&(n+=`/${e}`),t&&("/"!==t.charAt(0)&&(n+="/"),n+=t);let s=`${n}`,o="?";if(r){const e=(e,t)=>{return e[0]>t[0]?1:e[0]<t[0]?-1:0},t=e=>{s+=o+e,r[e]&&(s+=`=${r[e]}`),o="&"};Object.keys(r).sort(e).forEach(t)}return s}function p(e={}){const{type:t="header",verb:r="",contentMd5:n="",expires:i=c()+3600,bucket:u,objectName:a,accessKeySecret:p,headers:d={},subResource:l}=e,y=d["x-oss-date"]||"",b=d["Content-Type"]||"",g=[r,n,b];"header"===t?g.push(y):g.push(i);const w=h(d),m=f(u,a,l);g.push(`${w}${m}`);const k=g.join("\n");console.log("text",k,p);const v=new o["default"].HMAC_SHA1;v.setKey(p),v.update(k);const A=new Uint8Array(v.finalize()),O=s.a.fromByteArray(A);return O}}}]);