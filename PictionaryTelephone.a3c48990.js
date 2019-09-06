// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"r/WP":[function(require,module,exports) {
var define;
parcelRequire=function(e,r,t,n){var i,o="function"==typeof parcelRequire&&parcelRequire,u="function"==typeof require&&require;function f(t,n){if(!r[t]){if(!e[t]){var i="function"==typeof parcelRequire&&parcelRequire;if(!n&&i)return i(t,!0);if(o)return o(t,!0);if(u&&"string"==typeof t)return u(t);var c=new Error("Cannot find module '"+t+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[t][1][r]||r},p.cache={};var l=r[t]=new f.Module(t);e[t][0].call(l.exports,p,l,l.exports,this)}return r[t].exports;function p(e){return f(p.resolve(e))}}f.isParcelRequire=!0,f.Module=function(e){this.id=e,this.bundle=f,this.exports={}},f.modules=e,f.cache=r,f.parent=o,f.register=function(r,t){e[r]=[function(e,r){r.exports=t},{}]};for(var c=0;c<t.length;c++)try{f(t[c])}catch(e){i||(i=e)}if(t.length){var l=f(t[t.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=l:"function"==typeof define&&define.amd?define(function(){return l}):n&&(this[n]=l)}if(parcelRequire=f,i)throw i;return f}({"vHo1":[function(require,module,exports) {
var e={};e.useBlobBuilder=function(){try{return new Blob([]),!1}catch(e){return!0}}(),e.useArrayBufferView=!e.useBlobBuilder&&function(){try{return 0===new Blob([new Uint8Array([])]).size}catch(e){return!0}}(),module.exports.binaryFeatures=e;var r=module.exports.BlobBuilder;function t(){this._pieces=[],this._parts=[]}"undefined"!=typeof window&&(r=module.exports.BlobBuilder=window.WebKitBlobBuilder||window.MozBlobBuilder||window.MSBlobBuilder||window.BlobBuilder),t.prototype.append=function(e){"number"==typeof e?this._pieces.push(e):(this.flush(),this._parts.push(e))},t.prototype.flush=function(){if(this._pieces.length>0){var r=new Uint8Array(this._pieces);e.useArrayBufferView||(r=r.buffer),this._parts.push(r),this._pieces=[]}},t.prototype.getBuffer=function(){if(this.flush(),e.useBlobBuilder){for(var t=new r,i=0,u=this._parts.length;i<u;i++)t.append(this._parts[i]);return t.getBlob()}return new Blob(this._parts)},module.exports.BufferBuilder=t;
},{}],"lHOc":[function(require,module,exports) {
var t=require("./bufferbuilder").BufferBuilder,e=require("./bufferbuilder").binaryFeatures,i={unpack:function(t){return new r(t).unpack()},pack:function(t){var e=new n;return e.pack(t),e.getBuffer()}};function r(t){this.index=0,this.dataBuffer=t,this.dataView=new Uint8Array(this.dataBuffer),this.length=this.dataBuffer.byteLength}function n(){this.bufferBuilder=new t}function u(t){var e=t.charCodeAt(0);return e<=2047?"00":e<=65535?"000":e<=2097151?"0000":e<=67108863?"00000":"000000"}function a(t){return t.length>600?new Blob([t]).size:t.replace(/[^\u0000-\u007F]/g,u).length}module.exports=i,r.prototype.unpack=function(){var t,e=this.unpack_uint8();if(e<128)return e;if((224^e)<32)return(224^e)-32;if((t=160^e)<=15)return this.unpack_raw(t);if((t=176^e)<=15)return this.unpack_string(t);if((t=144^e)<=15)return this.unpack_array(t);if((t=128^e)<=15)return this.unpack_map(t);switch(e){case 192:return null;case 193:return;case 194:return!1;case 195:return!0;case 202:return this.unpack_float();case 203:return this.unpack_double();case 204:return this.unpack_uint8();case 205:return this.unpack_uint16();case 206:return this.unpack_uint32();case 207:return this.unpack_uint64();case 208:return this.unpack_int8();case 209:return this.unpack_int16();case 210:return this.unpack_int32();case 211:return this.unpack_int64();case 212:case 213:case 214:case 215:return;case 216:return t=this.unpack_uint16(),this.unpack_string(t);case 217:return t=this.unpack_uint32(),this.unpack_string(t);case 218:return t=this.unpack_uint16(),this.unpack_raw(t);case 219:return t=this.unpack_uint32(),this.unpack_raw(t);case 220:return t=this.unpack_uint16(),this.unpack_array(t);case 221:return t=this.unpack_uint32(),this.unpack_array(t);case 222:return t=this.unpack_uint16(),this.unpack_map(t);case 223:return t=this.unpack_uint32(),this.unpack_map(t)}},r.prototype.unpack_uint8=function(){var t=255&this.dataView[this.index];return this.index++,t},r.prototype.unpack_uint16=function(){var t=this.read(2),e=256*(255&t[0])+(255&t[1]);return this.index+=2,e},r.prototype.unpack_uint32=function(){var t=this.read(4),e=256*(256*(256*t[0]+t[1])+t[2])+t[3];return this.index+=4,e},r.prototype.unpack_uint64=function(){var t=this.read(8),e=256*(256*(256*(256*(256*(256*(256*t[0]+t[1])+t[2])+t[3])+t[4])+t[5])+t[6])+t[7];return this.index+=8,e},r.prototype.unpack_int8=function(){var t=this.unpack_uint8();return t<128?t:t-256},r.prototype.unpack_int16=function(){var t=this.unpack_uint16();return t<32768?t:t-65536},r.prototype.unpack_int32=function(){var t=this.unpack_uint32();return t<Math.pow(2,31)?t:t-Math.pow(2,32)},r.prototype.unpack_int64=function(){var t=this.unpack_uint64();return t<Math.pow(2,63)?t:t-Math.pow(2,64)},r.prototype.unpack_raw=function(t){if(this.length<this.index+t)throw new Error("BinaryPackFailure: index is out of range "+this.index+" "+t+" "+this.length);var e=this.dataBuffer.slice(this.index,this.index+t);return this.index+=t,e},r.prototype.unpack_string=function(t){for(var e,i,r=this.read(t),n=0,u="";n<t;)(e=r[n])<128?(u+=String.fromCharCode(e),n++):(192^e)<32?(i=(192^e)<<6|63&r[n+1],u+=String.fromCharCode(i),n+=2):(i=(15&e)<<12|(63&r[n+1])<<6|63&r[n+2],u+=String.fromCharCode(i),n+=3);return this.index+=t,u},r.prototype.unpack_array=function(t){for(var e=new Array(t),i=0;i<t;i++)e[i]=this.unpack();return e},r.prototype.unpack_map=function(t){for(var e={},i=0;i<t;i++){var r=this.unpack(),n=this.unpack();e[r]=n}return e},r.prototype.unpack_float=function(){var t=this.unpack_uint32(),e=(t>>23&255)-127;return(0==t>>31?1:-1)*(8388607&t|8388608)*Math.pow(2,e-23)},r.prototype.unpack_double=function(){var t=this.unpack_uint32(),e=this.unpack_uint32(),i=(t>>20&2047)-1023;return(0==t>>31?1:-1)*((1048575&t|1048576)*Math.pow(2,i-20)+e*Math.pow(2,i-52))},r.prototype.read=function(t){var e=this.index;if(e+t<=this.length)return this.dataView.subarray(e,e+t);throw new Error("BinaryPackFailure: read index out of range")},n.prototype.getBuffer=function(){return this.bufferBuilder.getBuffer()},n.prototype.pack=function(t){var i=typeof t;if("string"==i)this.pack_string(t);else if("number"==i)Math.floor(t)===t?this.pack_integer(t):this.pack_double(t);else if("boolean"==i)!0===t?this.bufferBuilder.append(195):!1===t&&this.bufferBuilder.append(194);else if("undefined"==i)this.bufferBuilder.append(192);else{if("object"!=i)throw new Error('Type "'+i+'" not yet supported');if(null===t)this.bufferBuilder.append(192);else{var r=t.constructor;if(r==Array)this.pack_array(t);else if(r==Blob||r==File)this.pack_bin(t);else if(r==ArrayBuffer)e.useArrayBufferView?this.pack_bin(new Uint8Array(t)):this.pack_bin(t);else if("BYTES_PER_ELEMENT"in t)e.useArrayBufferView?this.pack_bin(new Uint8Array(t.buffer)):this.pack_bin(t.buffer);else if(r==Object)this.pack_object(t);else if(r==Date)this.pack_string(t.toString());else{if("function"!=typeof t.toBinaryPack)throw new Error('Type "'+r.toString()+'" not yet supported');this.bufferBuilder.append(t.toBinaryPack())}}}this.bufferBuilder.flush()},n.prototype.pack_bin=function(t){var e=t.length||t.byteLength||t.size;if(e<=15)this.pack_uint8(160+e);else if(e<=65535)this.bufferBuilder.append(218),this.pack_uint16(e);else{if(!(e<=4294967295))throw new Error("Invalid length");this.bufferBuilder.append(219),this.pack_uint32(e)}this.bufferBuilder.append(t)},n.prototype.pack_string=function(t){var e=a(t);if(e<=15)this.pack_uint8(176+e);else if(e<=65535)this.bufferBuilder.append(216),this.pack_uint16(e);else{if(!(e<=4294967295))throw new Error("Invalid length");this.bufferBuilder.append(217),this.pack_uint32(e)}this.bufferBuilder.append(t)},n.prototype.pack_array=function(t){var e=t.length;if(e<=15)this.pack_uint8(144+e);else if(e<=65535)this.bufferBuilder.append(220),this.pack_uint16(e);else{if(!(e<=4294967295))throw new Error("Invalid length");this.bufferBuilder.append(221),this.pack_uint32(e)}for(var i=0;i<e;i++)this.pack(t[i])},n.prototype.pack_integer=function(t){if(-32<=t&&t<=127)this.bufferBuilder.append(255&t);else if(0<=t&&t<=255)this.bufferBuilder.append(204),this.pack_uint8(t);else if(-128<=t&&t<=127)this.bufferBuilder.append(208),this.pack_int8(t);else if(0<=t&&t<=65535)this.bufferBuilder.append(205),this.pack_uint16(t);else if(-32768<=t&&t<=32767)this.bufferBuilder.append(209),this.pack_int16(t);else if(0<=t&&t<=4294967295)this.bufferBuilder.append(206),this.pack_uint32(t);else if(-2147483648<=t&&t<=2147483647)this.bufferBuilder.append(210),this.pack_int32(t);else if(-0x8000000000000000<=t&&t<=0x8000000000000000)this.bufferBuilder.append(211),this.pack_int64(t);else{if(!(0<=t&&t<=0x10000000000000000))throw new Error("Invalid integer");this.bufferBuilder.append(207),this.pack_uint64(t)}},n.prototype.pack_double=function(t){var e=0;t<0&&(e=1,t=-t);var i=Math.floor(Math.log(t)/Math.LN2),r=t/Math.pow(2,i)-1,n=Math.floor(r*Math.pow(2,52)),u=Math.pow(2,32),a=e<<31|i+1023<<20|n/u&1048575,p=n%u;this.bufferBuilder.append(203),this.pack_int32(a),this.pack_int32(p)},n.prototype.pack_object=function(t){var e=Object.keys(t).length;if(e<=15)this.pack_uint8(128+e);else if(e<=65535)this.bufferBuilder.append(222),this.pack_uint16(e);else{if(!(e<=4294967295))throw new Error("Invalid length");this.bufferBuilder.append(223),this.pack_uint32(e)}for(var i in t)t.hasOwnProperty(i)&&(this.pack(i),this.pack(t[i]))},n.prototype.pack_uint8=function(t){this.bufferBuilder.append(t)},n.prototype.pack_uint16=function(t){this.bufferBuilder.append(t>>8),this.bufferBuilder.append(255&t)},n.prototype.pack_uint32=function(t){var e=4294967295&t;this.bufferBuilder.append((4278190080&e)>>>24),this.bufferBuilder.append((16711680&e)>>>16),this.bufferBuilder.append((65280&e)>>>8),this.bufferBuilder.append(255&e)},n.prototype.pack_uint64=function(t){var e=t/Math.pow(2,32),i=t%Math.pow(2,32);this.bufferBuilder.append((4278190080&e)>>>24),this.bufferBuilder.append((16711680&e)>>>16),this.bufferBuilder.append((65280&e)>>>8),this.bufferBuilder.append(255&e),this.bufferBuilder.append((4278190080&i)>>>24),this.bufferBuilder.append((16711680&i)>>>16),this.bufferBuilder.append((65280&i)>>>8),this.bufferBuilder.append(255&i)},n.prototype.pack_int8=function(t){this.bufferBuilder.append(255&t)},n.prototype.pack_int16=function(t){this.bufferBuilder.append((65280&t)>>8),this.bufferBuilder.append(255&t)},n.prototype.pack_int32=function(t){this.bufferBuilder.append(t>>>24&255),this.bufferBuilder.append((16711680&t)>>>16),this.bufferBuilder.append((65280&t)>>>8),this.bufferBuilder.append(255&t)},n.prototype.pack_int64=function(t){var e=Math.floor(t/Math.pow(2,32)),i=t%Math.pow(2,32);this.bufferBuilder.append((4278190080&e)>>>24),this.bufferBuilder.append((16711680&e)>>>16),this.bufferBuilder.append((65280&e)>>>8),this.bufferBuilder.append(255&e),this.bufferBuilder.append((4278190080&i)>>>24),this.bufferBuilder.append((16711680&i)>>>16),this.bufferBuilder.append((65280&i)>>>8),this.bufferBuilder.append(255&i)};
},{"./bufferbuilder":"vHo1"}],"sXtV":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.RTCSessionDescription=window.RTCSessionDescription||window.mozRTCSessionDescription,exports.RTCPeerConnection=window.RTCPeerConnection||window.mozRTCPeerConnection||window.webkitRTCPeerConnection,exports.RTCIceCandidate=window.RTCIceCandidate||window.mozRTCIceCandidate;
},{}],"BHXf":[function(require,module,exports) {
var global = arguments[3];
var e=arguments[3],n=this&&this.__importStar||function(e){if(e&&e.__esModule)return e;var n={};if(null!=e)for(var r in e)Object.hasOwnProperty.call(e,r)&&(n[r]=e[r]);return n.default=e,n};Object.defineProperty(exports,"__esModule",{value:!0});var r=n(require("js-binarypack")),t=require("./adapter"),a={iceServers:[{urls:"stun:stun.l.google.com:19302"}],sdpSemantics:"unified-plan"},o=function(){function e(){}var n;return e.noop=function(){},e.validateId=function(e){return!e||/^[A-Za-z0-9]+(?:[ _-][A-Za-z0-9]+)*$/.test(e)},e.chunk=function(n){for(var r,t=[],a=n.size,o=Math.ceil(a/e.chunkedMTU),i=r=0;i<a;){var u=Math.min(a,i+e.chunkedMTU),c=n.slice(i,u),d={__peerData:this._dataCount,n:r,data:c,total:o};t.push(d),i=u,r++}return this._dataCount++,t},e.blobToArrayBuffer=function(e,n){var r=new FileReader;r.onload=function(e){n(e.target.result)},r.readAsArrayBuffer(e)},e.blobToBinaryString=function(e,n){var r=new FileReader;r.onload=function(e){n(e.target.result)},r.readAsBinaryString(e)},e.binaryStringToArrayBuffer=function(e){for(var n=new Uint8Array(e.length),r=0;r<e.length;r++)n[r]=255&e.charCodeAt(r);return n.buffer},e.randomToken=function(){return Math.random().toString(36).substr(2)},e.isSecure=function(){return"https:"===location.protocol},e.CLOUD_HOST="0.peerjs.com",e.CLOUD_PORT=443,e.chunkedBrowsers={Chrome:1},e.chunkedMTU=16300,e.defaultConfig=a,e.browser=(n=window).mozRTCPeerConnection?"Firefox":n.webkitRTCPeerConnection?"Chrome":n.RTCPeerConnection?"Supported":"Unsupported",e.supports=function(){if(void 0===t.RTCPeerConnection)return{};var e,n,r=!0,o=!0,i=!1,u=!1,c=!!window.webkitRTCPeerConnection;try{e=new t.RTCPeerConnection(a,{optional:[{RtpDataChannels:!0}]})}catch(l){r=!1,o=!1}if(r)try{n=e.createDataChannel("_PEERJSTEST")}catch(l){r=!1}if(r){try{n.binaryType="blob",i=!0}catch(l){}var d=new t.RTCPeerConnection(a,{});try{u=d.createDataChannel("_PEERJSRELIABLETEST",{}).ordered}catch(l){}d.close()}return o&&(o=!!e.addStream),e&&e.close(),{audioVideo:o,data:r,binaryBlob:i,binary:u,reliable:u,sctp:u,onnegotiationneeded:c}}(),e.pack=r.pack,e.unpack=r.unpack,e._dataCount=1,e}();exports.util=o;
},{"js-binarypack":"lHOc","./adapter":"sXtV"}],"2JJl":[function(require,module,exports) {
"use strict";var e=Object.prototype.hasOwnProperty,t="~";function n(){}function r(e,t,n){this.fn=e,this.context=t,this.once=n||!1}function o(e,n,o,s,i){if("function"!=typeof o)throw new TypeError("The listener must be a function");var c=new r(o,s||e,i),f=t?t+n:n;return e._events[f]?e._events[f].fn?e._events[f]=[e._events[f],c]:e._events[f].push(c):(e._events[f]=c,e._eventsCount++),e}function s(e,t){0==--e._eventsCount?e._events=new n:delete e._events[t]}function i(){this._events=new n,this._eventsCount=0}Object.create&&(n.prototype=Object.create(null),(new n).__proto__||(t=!1)),i.prototype.eventNames=function(){var n,r,o=[];if(0===this._eventsCount)return o;for(r in n=this._events)e.call(n,r)&&o.push(t?r.slice(1):r);return Object.getOwnPropertySymbols?o.concat(Object.getOwnPropertySymbols(n)):o},i.prototype.listeners=function(e){var n=t?t+e:e,r=this._events[n];if(!r)return[];if(r.fn)return[r.fn];for(var o=0,s=r.length,i=new Array(s);o<s;o++)i[o]=r[o].fn;return i},i.prototype.listenerCount=function(e){var n=t?t+e:e,r=this._events[n];return r?r.fn?1:r.length:0},i.prototype.emit=function(e,n,r,o,s,i){var c=t?t+e:e;if(!this._events[c])return!1;var f,u,a=this._events[c],l=arguments.length;if(a.fn){switch(a.once&&this.removeListener(e,a.fn,void 0,!0),l){case 1:return a.fn.call(a.context),!0;case 2:return a.fn.call(a.context,n),!0;case 3:return a.fn.call(a.context,n,r),!0;case 4:return a.fn.call(a.context,n,r,o),!0;case 5:return a.fn.call(a.context,n,r,o,s),!0;case 6:return a.fn.call(a.context,n,r,o,s,i),!0}for(u=1,f=new Array(l-1);u<l;u++)f[u-1]=arguments[u];a.fn.apply(a.context,f)}else{var v,h=a.length;for(u=0;u<h;u++)switch(a[u].once&&this.removeListener(e,a[u].fn,void 0,!0),l){case 1:a[u].fn.call(a[u].context);break;case 2:a[u].fn.call(a[u].context,n);break;case 3:a[u].fn.call(a[u].context,n,r);break;case 4:a[u].fn.call(a[u].context,n,r,o);break;default:if(!f)for(v=1,f=new Array(l-1);v<l;v++)f[v-1]=arguments[v];a[u].fn.apply(a[u].context,f)}}return!0},i.prototype.on=function(e,t,n){return o(this,e,t,n,!1)},i.prototype.once=function(e,t,n){return o(this,e,t,n,!0)},i.prototype.removeListener=function(e,n,r,o){var i=t?t+e:e;if(!this._events[i])return this;if(!n)return s(this,i),this;var c=this._events[i];if(c.fn)c.fn!==n||o&&!c.once||r&&c.context!==r||s(this,i);else{for(var f=0,u=[],a=c.length;f<a;f++)(c[f].fn!==n||o&&!c[f].once||r&&c[f].context!==r)&&u.push(c[f]);u.length?this._events[i]=1===u.length?u[0]:u:s(this,i)}return this},i.prototype.removeAllListeners=function(e){var r;return e?(r=t?t+e:e,this._events[r]&&s(this,r)):(this._events=new n,this._eventsCount=0),this},i.prototype.off=i.prototype.removeListener,i.prototype.addListener=i.prototype.on,i.prefixed=t,i.EventEmitter=i,"undefined"!=typeof module&&(module.exports=i);
},{}],"8WOs":[function(require,module,exports) {
"use strict";var r=this&&this.__read||function(r,e){var o="function"==typeof Symbol&&r[Symbol.iterator];if(!o)return r;var t,n,l=o.call(r),i=[];try{for(;(void 0===e||e-- >0)&&!(t=l.next()).done;)i.push(t.value)}catch(s){n={error:s}}finally{try{t&&!t.done&&(o=l.return)&&o.call(l)}finally{if(n)throw n.error}}return i},e=this&&this.__spread||function(){for(var e=[],o=0;o<arguments.length;o++)e=e.concat(r(arguments[o]));return e};Object.defineProperty(exports,"__esModule",{value:!0});var o,t="PeerJS: ";!function(r){r[r.Disabled=0]="Disabled",r[r.Errors=1]="Errors",r[r.Warnings=2]="Warnings",r[r.All=3]="All"}(o=exports.LogLevel||(exports.LogLevel={}));var n=function(){function r(){this._logLevel=o.Disabled}return Object.defineProperty(r.prototype,"logLevel",{get:function(){return this._logLevel},set:function(r){this._logLevel=r},enumerable:!0,configurable:!0}),r.prototype.log=function(){for(var r=[],t=0;t<arguments.length;t++)r[t]=arguments[t];this._logLevel>=o.All&&this._print.apply(this,e([o.All],r))},r.prototype.warn=function(){for(var r=[],t=0;t<arguments.length;t++)r[t]=arguments[t];this._logLevel>=o.Warnings&&this._print.apply(this,e([o.Warnings],r))},r.prototype.error=function(){for(var r=[],t=0;t<arguments.length;t++)r[t]=arguments[t];this._logLevel>=o.Errors&&this._print.apply(this,e([o.Errors],r))},r.prototype.setLogFunction=function(r){this._print=r},r.prototype._print=function(r){for(var n=[],l=1;l<arguments.length;l++)n[l-1]=arguments[l];var i=e([t],n);for(var s in i)i[s]instanceof Error&&(i[s]="("+i[s].name+") "+i[s].message);r>=o.All?console.log.apply(console,e(i)):r>=o.Warnings?console.warn.apply(console,e(["WARNING"],i)):r>=o.Errors&&console.error.apply(console,e(["ERROR"],i))},r}();exports.default=new n;
},{}],"9ZRY":[function(require,module,exports) {
"use strict";var e,r,n,o,t,a,i;Object.defineProperty(exports,"__esModule",{value:!0}),function(e){e.Open="open",e.Stream="stream",e.Data="data",e.Close="close",e.Error="error",e.IceStateChanged="iceStateChanged"}(e=exports.ConnectionEventType||(exports.ConnectionEventType={})),function(e){e.Data="data",e.Media="media"}(r=exports.ConnectionType||(exports.ConnectionType={})),function(e){e.Open="open",e.Close="close",e.Connection="connection",e.Call="call",e.Disconnected="disconnected",e.Error="error"}(n=exports.PeerEventType||(exports.PeerEventType={})),function(e){e.BrowserIncompatible="browser-incompatible",e.Disconnected="disconnected",e.InvalidID="invalid-id",e.InvalidKey="invalid-key",e.Network="network",e.PeerUnavailable="peer-unavailable",e.SslUnavailable="ssl-unavailable",e.ServerError="server-error",e.SocketError="socket-error",e.SocketClosed="socket-closed",e.UnavailableID="unavailable-id",e.WebRTC="webrtc"}(o=exports.PeerErrorType||(exports.PeerErrorType={})),function(e){e.Binary="binary",e.BinaryUTF8="binary-utf8",e.JSON="json"}(t=exports.SerializationType||(exports.SerializationType={})),function(e){e.Message="message",e.Disconnected="disconnected",e.Error="error",e.Close="close"}(a=exports.SocketEventType||(exports.SocketEventType={})),function(e){e.Heartbeat="HEARTBEAT",e.Candidate="CANDIDATE",e.Offer="OFFER",e.Answer="ANSWER",e.Open="OPEN",e.Error="ERROR",e.IdTaken="ID-TAKEN",e.InvalidKey="INVALID-KEY",e.Leave="LEAVE",e.Expire="EXPIRE"}(i=exports.ServerMessageType||(exports.ServerMessageType={}));
},{}],"wJlv":[function(require,module,exports) {
"use strict";var e=this&&this.__extends||function(){var e=function(t,s){return(e=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var s in t)t.hasOwnProperty(s)&&(e[s]=t[s])})(t,s)};return function(t,s){function n(){this.constructor=t}e(t,s),t.prototype=null===s?Object.create(s):(n.prototype=s.prototype,new n)}}(),t=this&&this.__read||function(e,t){var s="function"==typeof Symbol&&e[Symbol.iterator];if(!s)return e;var n,r,o=s.call(e),i=[];try{for(;(void 0===t||t-- >0)&&!(n=o.next()).done;)i.push(n.value)}catch(c){r={error:c}}finally{try{n&&!n.done&&(s=o.return)&&s.call(o)}finally{if(r)throw r.error}}return i},s=this&&this.__spread||function(){for(var e=[],s=0;s<arguments.length;s++)e=e.concat(t(arguments[s]));return e},n=this&&this.__values||function(e){var t="function"==typeof Symbol&&e[Symbol.iterator],s=0;return t?t.call(e):{next:function(){return e&&s>=e.length&&(e=void 0),{value:e&&e[s++],done:!e}}}},r=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(exports,"__esModule",{value:!0});var o=require("eventemitter3"),i=r(require("./logger")),c=require("./enums"),a=function(t){function r(e,s,n,r,o,i){void 0===i&&(i=5e3);var c=t.call(this)||this;c.pingInterval=i,c._disconnected=!1,c._messagesQueue=[];var a=e?"wss://":"ws://";return c._wsUrl=a+s+":"+n+r+"peerjs?key="+o,c}return e(r,t),r.prototype.start=function(e,t){this._id=e,this._wsUrl+="&id="+e+"&token="+t,this._startWebSocket()},r.prototype._startWebSocket=function(){var e=this;this._socket||(this._socket=new WebSocket(this._wsUrl),this._socket.onmessage=function(t){var s;try{s=JSON.parse(t.data)}catch(n){return void i.default.log("Invalid server message",t.data)}e.emit(c.SocketEventType.Message,s)},this._socket.onclose=function(t){i.default.log("Socket closed.",t),e._disconnected=!0,clearTimeout(e._wsPingTimer),e.emit(c.SocketEventType.Disconnected)},this._socket.onopen=function(){e._disconnected||(e._sendQueuedMessages(),i.default.log("Socket open"),e._scheduleHeartbeat())})},r.prototype._scheduleHeartbeat=function(){var e=this;this._wsPingTimer=setTimeout(function(){e._sendHeartbeat()},this.pingInterval)},r.prototype._sendHeartbeat=function(){if(this._wsOpen()){var e=JSON.stringify({type:c.ServerMessageType.Heartbeat});this._socket.send(e),this._scheduleHeartbeat()}else i.default.log("Cannot send heartbeat, because socket closed")},r.prototype._wsOpen=function(){return!!this._socket&&1==this._socket.readyState},r.prototype._sendQueuedMessages=function(){var e,t,r=s(this._messagesQueue);this._messagesQueue=[];try{for(var o=n(r),i=o.next();!i.done;i=o.next()){var c=i.value;this.send(c)}}catch(a){e={error:a}}finally{try{i&&!i.done&&(t=o.return)&&t.call(o)}finally{if(e)throw e.error}}},r.prototype.send=function(e){if(!this._disconnected)if(this._id)if(e.type){if(this._wsOpen()){var t=JSON.stringify(e);this._socket.send(t)}}else this.emit(c.SocketEventType.Error,"Invalid message");else this._messagesQueue.push(e)},r.prototype.close=function(){!this._disconnected&&this._socket&&(this._socket.close(),this._disconnected=!0,clearTimeout(this._wsPingTimer))},r}(o.EventEmitter);exports.Socket=a;
},{"eventemitter3":"2JJl","./logger":"8WOs","./enums":"9ZRY"}],"T9kO":[function(require,module,exports) {
var global = arguments[3];
var e=arguments[3],r=require("js-binarypack"),t={debug:!1,inherits:function(e,r){e.super_=r,e.prototype=Object.create(r.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}})},extend:function(e,r){for(var t in r)r.hasOwnProperty(t)&&(e[t]=r[t]);return e},pack:r.pack,unpack:r.unpack,log:function(){if(t.debug){for(var e=[],r=0;r<arguments.length;r++)e[r]=arguments[r];e.unshift("Reliable: "),console.log.apply(console,e)}},setZeroTimeout:function(e){var r=[],t="zero-timeout-message";function n(n){n.source==e&&n.data==t&&(n.stopPropagation&&n.stopPropagation(),r.length&&r.shift()())}return e.addEventListener?e.addEventListener("message",n,!0):e.attachEvent&&e.attachEvent("onmessage",n),function(n){r.push(n),e.postMessage(t,"*")}}(this),blobToArrayBuffer:function(e,r){var t=new FileReader;t.onload=function(e){r(e.target.result)},t.readAsArrayBuffer(e)},blobToBinaryString:function(e,r){var t=new FileReader;t.onload=function(e){r(e.target.result)},t.readAsBinaryString(e)},binaryStringToArrayBuffer:function(e){for(var r=new Uint8Array(e.length),t=0;t<e.length;t++)r[t]=255&e.charCodeAt(t);return r.buffer},randomToken:function(){return Math.random().toString(36).substr(2)}};module.exports=t;
},{"js-binarypack":"lHOc"}],"aYFJ":[function(require,module,exports) {
var t=require("./util");function e(n,i){if(!(this instanceof e))return new e(n);this._dc=n,t.debug=i,this._outgoing={},this._incoming={},this._received={},this._window=1e3,this._mtu=500,this._interval=0,this._count=0,this._queue=[],this._setupDC()}e.prototype.send=function(e){var n=t.pack(e);n.size<this._mtu?this._handleSend(["no",n]):(this._outgoing[this._count]={ack:0,chunks:this._chunk(n)},t.debug&&(this._outgoing[this._count].timer=new Date),this._sendWindowedChunks(this._count),this._count+=1)},e.prototype._setupInterval=function(){var t=this;this._timeout=setInterval(function(){var e=t._queue.shift();if(e._multiple)for(var n=0,i=e.length;n<i;n+=1)t._intervalSend(e[n]);else t._intervalSend(e)},this._interval)},e.prototype._intervalSend=function(e){var n=this;e=t.pack(e),t.blobToBinaryString(e,function(t){n._dc.send(t)}),0===n._queue.length&&(clearTimeout(n._timeout),n._timeout=null)},e.prototype._processAcks=function(){for(var t in this._outgoing)this._outgoing.hasOwnProperty(t)&&this._sendWindowedChunks(t)},e.prototype._handleSend=function(t){for(var e=!0,n=0,i=this._queue.length;n<i;n+=1){var o=this._queue[n];o===t?e=!1:o._multiple&&-1!==o.indexOf(t)&&(e=!1)}e&&(this._queue.push(t),this._timeout||this._setupInterval())},e.prototype._setupDC=function(){var e=this;this._dc.onmessage=function(n){var i=n.data;if(i.constructor===String){var o=t.binaryStringToArrayBuffer(i);i=t.unpack(o),e._handleMessage(i)}}},e.prototype._handleMessage=function(e){var n,i=e[1],o=this._incoming[i],s=this._outgoing[i];switch(e[0]){case"no":var a=i;a&&this.onmessage(t.unpack(a));break;case"end":if(n=o,this._received[i]=e[2],!n)break;this._ack(i);break;case"ack":if(n=s){var h=e[2];n.ack=Math.max(h,n.ack),n.ack>=n.chunks.length?(t.log("Time: ",new Date-n.timer),delete this._outgoing[i]):this._processAcks()}break;case"chunk":if(!(n=o)){if(!0===this._received[i])break;n={ack:["ack",i,0],chunks:[]},this._incoming[i]=n}var r=e[2],u=e[3];n.chunks[r]=new Uint8Array(u),r===n.ack[2]&&this._calculateNextAck(i),this._ack(i);break;default:this._handleSend(e)}},e.prototype._chunk=function(e){for(var n=[],i=e.size,o=0;o<i;){var s=Math.min(i,o+this._mtu),a={payload:e.slice(o,s)};n.push(a),o=s}return t.log("Created",n.length,"chunks."),n},e.prototype._ack=function(t){var e=this._incoming[t].ack;this._received[t]===e[2]&&(this._complete(t),this._received[t]=!0),this._handleSend(e)},e.prototype._calculateNextAck=function(t){for(var e=this._incoming[t],n=e.chunks,i=0,o=n.length;i<o;i+=1)if(void 0===n[i])return void(e.ack[2]=i);e.ack[2]=n.length},e.prototype._sendWindowedChunks=function(e){t.log("sendWindowedChunks for: ",e);for(var n=this._outgoing[e],i=n.chunks,o=[],s=Math.min(n.ack+this._window,i.length),a=n.ack;a<s;a+=1)i[a].sent&&a!==n.ack||(i[a].sent=!0,o.push(["chunk",e,a,i[a].payload]));n.ack+this._window>=i.length&&o.push(["end",e,i.length]),o._multiple=!0,this._handleSend(o)},e.prototype._complete=function(e){t.log("Completed called for",e);var n=this,i=this._incoming[e].chunks,o=new Blob(i);t.blobToArrayBuffer(o,function(e){n.onmessage(t.unpack(e))}),delete this._incoming[e]},e.higherBandwidthSDP=function(t){var e=navigator.appVersion.match(/Chrome\/(.*?) /);if(e&&(e=parseInt(e[1].split(".").shift()))<31){var n=t.split("b=AS:30");if(n.length>1)return n[0]+"b=AS:102400"+n[1]}return t},e.prototype.onmessage=function(t){},module.exports=e;
},{"./util":"T9kO"}],"HCdX":[function(require,module,exports) {
"use strict";var e=this&&this.__assign||function(){return(e=Object.assign||function(e){for(var n,t=1,o=arguments.length;t<o;t++)for(var i in n=arguments[t])Object.prototype.hasOwnProperty.call(n,i)&&(e[i]=n[i]);return e}).apply(this,arguments)},n=this&&this.__awaiter||function(e,n,t,o){return new(t||(t=Promise))(function(i,r){function c(e){try{s(o.next(e))}catch(n){r(n)}}function a(e){try{s(o.throw(e))}catch(n){r(n)}}function s(e){e.done?i(e.value):new t(function(n){n(e.value)}).then(c,a)}s((o=o.apply(e,n||[])).next())})},t=this&&this.__generator||function(e,n){var t,o,i,r,c={label:0,sent:function(){if(1&i[0])throw i[1];return i[1]},trys:[],ops:[]};return r={next:a(0),throw:a(1),return:a(2)},"function"==typeof Symbol&&(r[Symbol.iterator]=function(){return this}),r;function a(r){return function(a){return function(r){if(t)throw new TypeError("Generator is already executing.");for(;c;)try{if(t=1,o&&(i=2&r[0]?o.return:r[0]?o.throw||((i=o.return)&&i.call(o),0):o.next)&&!(i=i.call(o,r[1])).done)return i;switch(o=0,i&&(r=[2&r[0],i.value]),r[0]){case 0:case 1:i=r;break;case 4:return c.label++,{value:r[1],done:!1};case 5:c.label++,o=r[1],r=[0];continue;case 7:r=c.ops.pop(),c.trys.pop();continue;default:if(!(i=(i=c.trys).length>0&&i[i.length-1])&&(6===r[0]||2===r[0])){c=0;continue}if(3===r[0]&&(!i||r[1]>i[0]&&r[1]<i[3])){c.label=r[1];break}if(6===r[0]&&c.label<i[1]){c.label=i[1],i=r;break}if(i&&c.label<i[2]){c.label=i[2],c.ops.push(r);break}i[2]&&c.ops.pop(),c.trys.pop();continue}r=n.call(e,c)}catch(a){r=[6,a],o=0}finally{t=i=0}if(5&r[0])throw r[1];return{value:r[0]?r[1]:void 0,done:!0}}([r,a])}}},o=this&&this.__importStar||function(e){if(e&&e.__esModule)return e;var n={};if(null!=e)for(var t in e)Object.hasOwnProperty.call(e,t)&&(n[t]=e[t]);return n.default=e,n},i=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(exports,"__esModule",{value:!0});var r=o(require("reliable")),c=require("./util"),a=i(require("./logger")),s=require("./adapter"),l=require("./enums"),d=function(){function o(e){this.connection=e}return o.prototype.startConnection=function(e){var n=this._startPeerConnection();if(this.connection.peerConnection=n,this.connection.type===l.ConnectionType.Media&&e._stream&&this._addTracksToConnection(e._stream,n),e.originator){if(this.connection.type===l.ConnectionType.Data){var t=this.connection,o={};c.util.supports.sctp||(o={reliable:e.reliable});var i=n.createDataChannel(t.label,o);t.initialize(i)}this._makeOffer()}else this.handleSDP("OFFER",e.sdp)},o.prototype._startPeerConnection=function(){a.default.log("Creating RTCPeerConnection.");var e={};this.connection.type!==l.ConnectionType.Data||c.util.supports.sctp?this.connection.type===l.ConnectionType.Media&&(e={optional:[{DtlsSrtpKeyAgreement:!0}]}):e={optional:[{RtpDataChannels:!0}]};var n=new s.RTCPeerConnection(this.connection.provider.options.config,e);return this._setupListeners(n),n},o.prototype._setupListeners=function(e){var n=this,t=this.connection.peer,o=this.connection.connectionId,i=this.connection.type,r=this.connection.provider;a.default.log("Listening for ICE candidates."),e.onicecandidate=function(e){e.candidate&&(a.default.log("Received ICE candidates for:",t),r.socket.send({type:l.ServerMessageType.Candidate,payload:{candidate:e.candidate,type:i,connectionId:o},dst:t}))},e.oniceconnectionstatechange=function(){switch(e.iceConnectionState){case"failed":a.default.log("iceConnectionState is failed, closing connections to "+t),n.connection.emit(l.ConnectionEventType.Error,new Error("Negotiation of connection to "+t+" failed.")),n.connection.close();break;case"closed":a.default.log("iceConnectionState is closed, closing connections to "+t),n.connection.emit(l.ConnectionEventType.Error,new Error("Connection to "+t+" closed.")),n.connection.close();break;case"disconnected":a.default.log("iceConnectionState is disconnected, closing connections to "+t),n.connection.emit(l.ConnectionEventType.Error,new Error("Connection to "+t+" disconnected.")),n.connection.close();break;case"completed":e.onicecandidate=c.util.noop}n.connection.emit(l.ConnectionEventType.IceStateChanged,e.iceConnectionState)},a.default.log("Listening for data channel"),e.ondatachannel=function(e){a.default.log("Received data channel");var n=e.channel;r.getConnection(t,o).initialize(n)},a.default.log("Listening for remote stream"),e.ontrack=function(e){a.default.log("Received remote stream");var i=e.streams[0],c=r.getConnection(t,o);if(c.type===l.ConnectionType.Media){var s=c;n._addStreamToMediaConnection(i,s)}}},o.prototype.cleanup=function(){a.default.log("Cleaning up PeerConnection to "+this.connection.peer);var e=this.connection.peerConnection;if(e){this.connection.peerConnection=null,e.onicecandidate=e.oniceconnectionstatechange=e.ondatachannel=e.ontrack=function(){};var n="closed"!==e.signalingState,t=!1;if(this.connection.type===l.ConnectionType.Data){var o=this.connection.dataChannel;o&&(t=!!o.readyState&&"closed"!==o.readyState)}(n||t)&&e.close()}},o.prototype._makeOffer=function(){return n(this,void 0,Promise,function(){var n,o,i,s,d,p,u;return t(this,function(t){switch(t.label){case 0:n=this.connection.peerConnection,o=this.connection.provider,t.label=1;case 1:return t.trys.push([1,7,,8]),[4,n.createOffer(this.connection.options.constraints)];case 2:i=t.sent(),a.default.log("Created offer."),c.util.supports.sctp||this.connection.type!==l.ConnectionType.Data||(d=this.connection).reliable&&(i.sdp=r.higherBandwidthSDP(i.sdp)),this.connection.options.sdpTransform&&"function"==typeof this.connection.options.sdpTransform&&(i.sdp=this.connection.options.sdpTransform(i.sdp)||i.sdp),t.label=3;case 3:return t.trys.push([3,5,,6]),[4,n.setLocalDescription(i)];case 4:return t.sent(),a.default.log("Set localDescription:",i,"for:"+this.connection.peer),s={sdp:i,type:this.connection.type,connectionId:this.connection.connectionId,metadata:this.connection.metadata,browser:c.util.browser},this.connection.type===l.ConnectionType.Data&&(d=this.connection,s=e({},s,{label:d.label,reliable:d.reliable,serialization:d.serialization})),o.socket.send({type:l.ServerMessageType.Offer,payload:s,dst:this.connection.peer}),[3,6];case 5:return"OperationError: Failed to set local offer sdp: Called in wrong state: kHaveRemoteOffer"!=(p=t.sent())&&(o.emitError(l.PeerErrorType.WebRTC,p),a.default.log("Failed to setLocalDescription, ",p)),[3,6];case 6:return[3,8];case 7:return u=t.sent(),o.emitError(l.PeerErrorType.WebRTC,u),a.default.log("Failed to createOffer, ",u),[3,8];case 8:return[2]}})})},o.prototype._makeAnswer=function(){return n(this,void 0,Promise,function(){var e,n,o,i,s;return t(this,function(t){switch(t.label){case 0:e=this.connection.peerConnection,n=this.connection.provider,t.label=1;case 1:return t.trys.push([1,7,,8]),[4,e.createAnswer()];case 2:o=t.sent(),a.default.log("Created answer."),c.util.supports.sctp||this.connection.type!==l.ConnectionType.Data||this.connection.reliable&&(o.sdp=r.higherBandwidthSDP(o.sdp)),this.connection.options.sdpTransform&&"function"==typeof this.connection.options.sdpTransform&&(o.sdp=this.connection.options.sdpTransform(o.sdp)||o.sdp),t.label=3;case 3:return t.trys.push([3,5,,6]),[4,e.setLocalDescription(o)];case 4:return t.sent(),a.default.log("Set localDescription:",o,"for:"+this.connection.peer),n.socket.send({type:l.ServerMessageType.Answer,payload:{sdp:o,type:this.connection.type,connectionId:this.connection.connectionId,browser:c.util.browser},dst:this.connection.peer}),[3,6];case 5:return i=t.sent(),n.emitError(l.PeerErrorType.WebRTC,i),a.default.log("Failed to setLocalDescription, ",i),[3,6];case 6:return[3,8];case 7:return s=t.sent(),n.emitError(l.PeerErrorType.WebRTC,s),a.default.log("Failed to create answer, ",s),[3,8];case 8:return[2]}})})},o.prototype.handleSDP=function(e,o){return n(this,void 0,Promise,function(){var n,i,r,c;return t(this,function(t){switch(t.label){case 0:o=new s.RTCSessionDescription(o),n=this.connection.peerConnection,i=this.connection.provider,a.default.log("Setting remote description",o),r=this,t.label=1;case 1:return t.trys.push([1,5,,6]),[4,n.setRemoteDescription(o)];case 2:return t.sent(),a.default.log("Set remoteDescription:"+e+" for:"+this.connection.peer),"OFFER"!==e?[3,4]:[4,r._makeAnswer()];case 3:t.sent(),t.label=4;case 4:return[3,6];case 5:return c=t.sent(),i.emitError(l.PeerErrorType.WebRTC,c),a.default.log("Failed to setRemoteDescription, ",c),[3,6];case 6:return[2]}})})},o.prototype.handleCandidate=function(e){return n(this,void 0,Promise,function(){var n,o,i,r,c,d;return t(this,function(t){switch(t.label){case 0:n=e.candidate,o=e.sdpMLineIndex,i=e.sdpMid,r=this.connection.peerConnection,c=this.connection.provider,t.label=1;case 1:return t.trys.push([1,3,,4]),[4,r.addIceCandidate(new s.RTCIceCandidate({sdpMid:i,sdpMLineIndex:o,candidate:n}))];case 2:return t.sent(),a.default.log("Added ICE candidate for:"+this.connection.peer),[3,4];case 3:return d=t.sent(),c.emitError(l.PeerErrorType.WebRTC,d),a.default.log("Failed to handleCandidate, ",d),[3,4];case 4:return[2]}})})},o.prototype._addTracksToConnection=function(e,n){if(a.default.log("add tracks from stream "+e.id+" to peer connection"),!n.addTrack)return a.default.error("Your browser does't support RTCPeerConnection#addTrack. Ignored.");e.getTracks().forEach(function(t){n.addTrack(t,e)})},o.prototype._addStreamToMediaConnection=function(e,n){a.default.log("add stream "+e.id+" to media connection "+n.connectionId),n.addStream(e)},o}();exports.Negotiator=d;
},{"reliable":"aYFJ","./util":"BHXf","./logger":"8WOs","./adapter":"sXtV","./enums":"9ZRY"}],"tQFK":[function(require,module,exports) {
"use strict";var t=this&&this.__extends||function(){var t=function(e,r){return(t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var r in e)e.hasOwnProperty(r)&&(t[r]=e[r])})(e,r)};return function(e,r){function n(){this.constructor=e}t(e,r),e.prototype=null===r?Object.create(r):(n.prototype=r.prototype,new n)}}();Object.defineProperty(exports,"__esModule",{value:!0});var e=require("eventemitter3"),r=function(e){function r(t,r,n){var o=e.call(this)||this;return o.peer=t,o.provider=r,o.options=n,o._open=!1,o.metadata=n.metadata,o}return t(r,e),Object.defineProperty(r.prototype,"open",{get:function(){return this._open},enumerable:!0,configurable:!0}),r}(e.EventEmitter);exports.BaseConnection=r;
},{"eventemitter3":"2JJl"}],"dbHP":[function(require,module,exports) {
"use strict";var e=this&&this.__extends||function(){var e=function(t,o){return(e=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var o in t)t.hasOwnProperty(o)&&(e[o]=t[o])})(t,o)};return function(t,o){function r(){this.constructor=t}e(t,o),t.prototype=null===o?Object.create(o):(r.prototype=o.prototype,new r)}}(),t=this&&this.__assign||function(){return(t=Object.assign||function(e){for(var t,o=1,r=arguments.length;o<r;o++)for(var n in t=arguments[o])Object.prototype.hasOwnProperty.call(t,n)&&(e[n]=t[n]);return e}).apply(this,arguments)},o=this&&this.__values||function(e){var t="function"==typeof Symbol&&e[Symbol.iterator],o=0;return t?t.call(e):{next:function(){return e&&o>=e.length&&(e=void 0),{value:e&&e[o++],done:!e}}}},r=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(exports,"__esModule",{value:!0});var n=require("./util"),i=r(require("./logger")),a=require("./negotiator"),s=require("./enums"),l=require("./baseconnection"),c=function(r){function l(e,t,o){var i=r.call(this,e,t,o)||this;return i._localStream=i.options._stream,i.connectionId=i.options.connectionId||l.ID_PREFIX+n.util.randomToken(),i._negotiator=new a.Negotiator(i),i._localStream&&i._negotiator.startConnection({_stream:i._localStream,originator:!0}),i}return e(l,r),Object.defineProperty(l.prototype,"type",{get:function(){return s.ConnectionType.Media},enumerable:!0,configurable:!0}),Object.defineProperty(l.prototype,"localStream",{get:function(){return this._localStream},enumerable:!0,configurable:!0}),Object.defineProperty(l.prototype,"remoteStream",{get:function(){return this._remoteStream},enumerable:!0,configurable:!0}),l.prototype.addStream=function(e){i.default.log("Receiving stream",e),this._remoteStream=e,r.prototype.emit.call(this,s.ConnectionEventType.Stream,e)},l.prototype.handleMessage=function(e){var t=e.type,o=e.payload;switch(e.type){case s.ServerMessageType.Answer:this._negotiator.handleSDP(t,o.sdp),this._open=!0;break;case s.ServerMessageType.Candidate:this._negotiator.handleCandidate(o.candidate);break;default:i.default.warn("Unrecognized message type:"+t+" from peer:"+this.peer)}},l.prototype.answer=function(e,r){var n,a;if(void 0===r&&(r={}),this._localStream)i.default.warn("Local stream already exists on this MediaConnection. Are you answering a call twice?");else{this._localStream=e,r&&r.sdpTransform&&(this.options.sdpTransform=r.sdpTransform),this._negotiator.startConnection(t({},this.options._payload,{_stream:e}));var s=this.provider._getMessages(this.connectionId);try{for(var l=o(s),c=l.next();!c.done;c=l.next()){var p=c.value;this.handleMessage(p)}}catch(u){n={error:u}}finally{try{c&&!c.done&&(a=l.return)&&a.call(l)}finally{if(n)throw n.error}}this._open=!0}},l.prototype.close=function(){this._negotiator&&(this._negotiator.cleanup(),this._negotiator=null),this._localStream=null,this._remoteStream=null,this.provider&&(this.provider._removeConnection(this),this.provider=null),this.options&&this.options._stream&&(this.options._stream=null),this.open&&(this._open=!1,r.prototype.emit.call(this,s.ConnectionEventType.Close))},l.ID_PREFIX="mc_",l}(l.BaseConnection);exports.MediaConnection=c;
},{"./util":"BHXf","./logger":"8WOs","./negotiator":"HCdX","./enums":"9ZRY","./baseconnection":"tQFK"}],"GBTQ":[function(require,module,exports) {
"use strict";var e=this&&this.__extends||function(){var e=function(t,n){return(e=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var n in t)t.hasOwnProperty(n)&&(e[n]=t[n])})(t,n)};return function(t,n){function i(){this.constructor=t}e(t,n),t.prototype=null===n?Object.create(n):(i.prototype=n.prototype,new i)}}(),t=this&&this.__values||function(e){var t="function"==typeof Symbol&&e[Symbol.iterator],n=0;return t?t.call(e):{next:function(){return e&&n>=e.length&&(e=void 0),{value:e&&e[n++],done:!e}}}},n=this&&this.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var n in e)Object.hasOwnProperty.call(e,n)&&(t[n]=e[n]);return t.default=e,t};Object.defineProperty(exports,"__esModule",{value:!0});var i=require("reliable"),r=require("./util"),o=n(require("./logger")),a=require("./negotiator"),s=require("./enums"),u=require("./baseconnection"),l=function(n){function u(e,t,i){var o=n.call(this,e,t,i)||this;return o._buffer=[],o._bufferSize=0,o._buffering=!1,o._chunkedData={},o.connectionId=o.options.connectionId||u.ID_PREFIX+r.util.randomToken(),o.label=o.options.label||o.connectionId,o.serialization=o.options.serialization||s.SerializationType.Binary,o.reliable=o.options.reliable,o.options._payload&&(o._peerBrowser=o.options._payload.browser),o._negotiator=new a.Negotiator(o),o._negotiator.startConnection(o.options._payload||{originator:!0}),o}return e(u,n),Object.defineProperty(u.prototype,"type",{get:function(){return s.ConnectionType.Data},enumerable:!0,configurable:!0}),Object.defineProperty(u.prototype,"dataChannel",{get:function(){return this._dc},enumerable:!0,configurable:!0}),Object.defineProperty(u.prototype,"bufferSize",{get:function(){return this._bufferSize},enumerable:!0,configurable:!0}),u.prototype.initialize=function(e){this._dc=e,this._configureDataChannel()},u.prototype._configureDataChannel=function(){var e=this;if(r.util.supports.sctp&&(this.dataChannel.binaryType="arraybuffer"),this.dataChannel.onopen=function(){o.default.log("Data channel connection success"),e._open=!0,e.emit(s.ConnectionEventType.Open)},!r.util.supports.sctp&&this.reliable){var t=o.default.logLevel>o.LogLevel.Disabled;this._reliable=new i.Reliable(this.dataChannel,t)}this._reliable?this._reliable.onmessage=function(t){e.emit(s.ConnectionEventType.Data,t)}:this.dataChannel.onmessage=function(t){e._handleDataMessage(t)},this.dataChannel.onclose=function(){o.default.log("DataChannel closed for:",e.peer),e.close()}},u.prototype._handleDataMessage=function(e){var t=this,i=e.data,o=i.constructor,a=i;if(this.serialization===s.SerializationType.Binary||this.serialization===s.SerializationType.BinaryUTF8){if(o===Blob)return void r.util.blobToArrayBuffer(i,function(e){var n=r.util.unpack(e);t.emit(s.ConnectionEventType.Data,n)});if(o===ArrayBuffer)a=r.util.unpack(i);else if(o===String){var u=r.util.binaryStringToArrayBuffer(i);a=r.util.unpack(u)}}else this.serialization===s.SerializationType.JSON&&(a=JSON.parse(i));a.__peerData?this._handleChunk(a):n.prototype.emit.call(this,s.ConnectionEventType.Data,a)},u.prototype._handleChunk=function(e){var t=e.__peerData,n=this._chunkedData[t]||{data:[],count:0,total:e.total};if(n.data[e.n]=e.data,n.count++,this._chunkedData[t]=n,n.total===n.count){delete this._chunkedData[t];var i=new Blob(n.data);this._handleDataMessage({data:i})}},u.prototype.close=function(){this._buffer=[],this._bufferSize=0,this._chunkedData={},this._negotiator&&(this._negotiator.cleanup(),this._negotiator=null),this.provider&&(this.provider._removeConnection(this),this.provider=null),this.open&&(this._open=!1,n.prototype.emit.call(this,s.ConnectionEventType.Close))},u.prototype.send=function(e,t){var i=this;if(this.open)if(this._reliable)this._reliable.send(e);else if(this.serialization===s.SerializationType.JSON)this._bufferedSend(JSON.stringify(e));else if(this.serialization===s.SerializationType.Binary||this.serialization===s.SerializationType.BinaryUTF8){var o=r.util.pack(e);if((r.util.chunkedBrowsers[this._peerBrowser]||r.util.chunkedBrowsers[r.util.browser])&&!t&&o.size>r.util.chunkedMTU)return void this._sendChunks(o);r.util.supports.sctp?r.util.supports.binaryBlob?this._bufferedSend(o):r.util.blobToArrayBuffer(o,function(e){i._bufferedSend(e)}):r.util.blobToBinaryString(o,function(e){i._bufferedSend(e)})}else this._bufferedSend(e);else n.prototype.emit.call(this,s.ConnectionEventType.Error,new Error("Connection is not open. You should listen for the `open` event before sending messages."))},u.prototype._bufferedSend=function(e){!this._buffering&&this._trySend(e)||(this._buffer.push(e),this._bufferSize=this._buffer.length)},u.prototype._trySend=function(e){var t=this;if(!this.open)return!1;try{this.dataChannel.send(e)}catch(n){return this._buffering=!0,setTimeout(function(){t._buffering=!1,t._tryBuffer()},100),!1}return!0},u.prototype._tryBuffer=function(){if(this.open&&0!==this._buffer.length){var e=this._buffer[0];this._trySend(e)&&(this._buffer.shift(),this._bufferSize=this._buffer.length,this._tryBuffer())}},u.prototype._sendChunks=function(e){var n,i,o=r.util.chunk(e);try{for(var a=t(o),s=a.next();!s.done;s=a.next()){var u=s.value;this.send(u,!0)}}catch(l){n={error:l}}finally{try{s&&!s.done&&(i=a.return)&&i.call(a)}finally{if(n)throw n.error}}},u.prototype.handleMessage=function(e){var t=e.payload;switch(e.type){case s.ServerMessageType.Answer:this._peerBrowser=t.browser,this._negotiator.handleSDP(e.type,t.sdp);break;case s.ServerMessageType.Candidate:this._negotiator.handleCandidate(t.candidate);break;default:o.default.warn("Unrecognized message type:",e.type,"from peer:",this.peer)}},u.ID_PREFIX="dc_",u}(u.BaseConnection);exports.DataConnection=l;
},{"reliable":"aYFJ","./util":"BHXf","./logger":"8WOs","./negotiator":"HCdX","./enums":"9ZRY","./baseconnection":"tQFK"}],"in7L":[function(require,module,exports) {
"use strict";var t=this&&this.__awaiter||function(t,e,r,o){return new(r||(r=Promise))(function(n,s){function i(t){try{a(o.next(t))}catch(e){s(e)}}function u(t){try{a(o.throw(t))}catch(e){s(e)}}function a(t){t.done?n(t.value):new r(function(e){e(t.value)}).then(i,u)}a((o=o.apply(t,e||[])).next())})},e=this&&this.__generator||function(t,e){var r,o,n,s,i={label:0,sent:function(){if(1&n[0])throw n[1];return n[1]},trys:[],ops:[]};return s={next:u(0),throw:u(1),return:u(2)},"function"==typeof Symbol&&(s[Symbol.iterator]=function(){return this}),s;function u(s){return function(u){return function(s){if(r)throw new TypeError("Generator is already executing.");for(;i;)try{if(r=1,o&&(n=2&s[0]?o.return:s[0]?o.throw||((n=o.return)&&n.call(o),0):o.next)&&!(n=n.call(o,s[1])).done)return n;switch(o=0,n&&(s=[2&s[0],n.value]),s[0]){case 0:case 1:n=s;break;case 4:return i.label++,{value:s[1],done:!1};case 5:i.label++,o=s[1],s=[0];continue;case 7:s=i.ops.pop(),i.trys.pop();continue;default:if(!(n=(n=i.trys).length>0&&n[n.length-1])&&(6===s[0]||2===s[0])){i=0;continue}if(3===s[0]&&(!n||s[1]>n[0]&&s[1]<n[3])){i.label=s[1];break}if(6===s[0]&&i.label<n[1]){i.label=n[1],n=s;break}if(n&&i.label<n[2]){i.label=n[2],i.ops.push(s);break}n[2]&&i.ops.pop(),i.trys.pop();continue}s=e.call(t,i)}catch(u){s=[6,u],o=0}finally{r=n=0}if(5&s[0])throw s[1];return{value:s[0]?s[1]:void 0,done:!0}}([s,u])}}},r=this&&this.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(exports,"__esModule",{value:!0});var o=require("./util"),n=r(require("./logger")),s=function(){function r(t){this._options=t}return r.prototype._buildUrl=function(t){var e=(this._options.secure?"https://":"http://")+this._options.host+":"+this._options.port+this._options.path+this._options.key+"/"+t;return e+="?ts="+(new Date).getTime()+Math.random()},r.prototype.retrieveId=function(){return t(this,void 0,Promise,function(){var t,r,s,i;return e(this,function(e){switch(e.label){case 0:t=this._buildUrl("id"),e.label=1;case 1:return e.trys.push([1,3,,4]),[4,fetch(t)];case 2:if(200!==(r=e.sent()).status)throw new Error("Error. Status:"+r.status);return[2,r.text()];case 3:throw s=e.sent(),n.default.error("Error retrieving ID",s),i="","/"===this._options.path&&this._options.host!==o.util.CLOUD_HOST&&(i=" If you passed in a `path` to your self-hosted PeerServer, you'll also need to pass in that same path when creating a new Peer."),new Error("Could not get an ID from the server."+i);case 4:return[2]}})})},r.prototype.listAllPeers=function(){return t(this,void 0,Promise,function(){var t,r,s,i;return e(this,function(e){switch(e.label){case 0:t=this._buildUrl("peers"),e.label=1;case 1:return e.trys.push([1,3,,4]),[4,fetch(t)];case 2:if(200!==(r=e.sent()).status){if(401===r.status)throw s="",s=this._options.host===o.util.CLOUD_HOST?"It looks like you're using the cloud server. You can email team@peerjs.com to enable peer listing for your API key.":"You need to enable `allow_discovery` on your self-hosted PeerServer to use this feature.",new Error("It doesn't look like you have permission to list peers IDs. "+s);throw new Error("Error. Status:"+r.status)}return[2,r.json()];case 3:throw i=e.sent(),n.default.error("Error retrieving list peers",i),new Error("Could not get list peers from the server."+i);case 4:return[2]}})})},r}();exports.API=s;
},{"./util":"BHXf","./logger":"8WOs"}],"Hxpd":[function(require,module,exports) {
"use strict";var e=this&&this.__extends||function(){var e=function(t,n){return(e=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var n in t)t.hasOwnProperty(n)&&(e[n]=t[n])})(t,n)};return function(t,n){function r(){this.constructor=t}e(t,n),t.prototype=null===n?Object.create(n):(r.prototype=n.prototype,new r)}}(),t=this&&this.__assign||function(){return(t=Object.assign||function(e){for(var t,n=1,r=arguments.length;n<r;n++)for(var o in t=arguments[n])Object.prototype.hasOwnProperty.call(t,o)&&(e[o]=t[o]);return e}).apply(this,arguments)},n=this&&this.__values||function(e){var t="function"==typeof Symbol&&e[Symbol.iterator],n=0;return t?t.call(e):{next:function(){return e&&n>=e.length&&(e=void 0),{value:e&&e[n++],done:!e}}}},r=this&&this.__read||function(e,t){var n="function"==typeof Symbol&&e[Symbol.iterator];if(!n)return e;var r,o,i=n.call(e),s=[];try{for(;(void 0===t||t-- >0)&&!(r=i.next()).done;)s.push(r.value)}catch(c){o={error:c}}finally{try{r&&!r.done&&(n=i.return)&&n.call(i)}finally{if(o)throw o.error}}return s},o=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(exports,"__esModule",{value:!0});var i=require("eventemitter3"),s=require("./util"),c=o(require("./logger")),a=require("./socket"),l=require("./mediaconnection"),d=require("./dataconnection"),u=require("./enums"),p=require("./api"),h=function(){return function(){}}(),f=function(o){function i(e,n){var r=o.call(this)||this;return r._destroyed=!1,r._disconnected=!1,r._open=!1,r._connections=new Map,r._lostMessages=new Map,e&&e.constructor==Object?(n=e,e=void 0):e&&(e=e.toString()),n=t({debug:0,host:s.util.CLOUD_HOST,port:s.util.CLOUD_PORT,path:"/",key:i.DEFAULT_KEY,token:s.util.randomToken(),config:s.util.defaultConfig},n),r._options=n,"/"===n.host&&(n.host=window.location.hostname),"/"!==n.path[0]&&(n.path="/"+n.path),"/"!==n.path[n.path.length-1]&&(n.path+="/"),void 0===n.secure&&n.host!==s.util.CLOUD_HOST?n.secure=s.util.isSecure():n.host==s.util.CLOUD_HOST&&(n.secure=!0),n.logFunction&&c.default.setLogFunction(n.logFunction),c.default.logLevel=n.debug,s.util.supports.audioVideo||s.util.supports.data?s.util.validateId(e)?(r._api=new p.API(n),r._initializeServerConnection(),e?r._initialize(e):r._api.retrieveId().then(function(e){return r._initialize(e)}).catch(function(e){return r._abort(u.PeerErrorType.ServerError,e)}),r):(r._delayedAbort(u.PeerErrorType.InvalidID,'ID "'+e+'" is invalid'),r):(r._delayedAbort(u.PeerErrorType.BrowserIncompatible,"The current browser does not support WebRTC"),r)}return e(i,o),Object.defineProperty(i.prototype,"id",{get:function(){return this._id},enumerable:!0,configurable:!0}),Object.defineProperty(i.prototype,"options",{get:function(){return this._options},enumerable:!0,configurable:!0}),Object.defineProperty(i.prototype,"open",{get:function(){return this._open},enumerable:!0,configurable:!0}),Object.defineProperty(i.prototype,"socket",{get:function(){return this._socket},enumerable:!0,configurable:!0}),Object.defineProperty(i.prototype,"connections",{get:function(){var e,t,o=Object.create(null);try{for(var i=n(this._connections),s=i.next();!s.done;s=i.next()){var c=r(s.value,2),a=c[0],l=c[1];o[a]=l}}catch(d){e={error:d}}finally{try{s&&!s.done&&(t=i.return)&&t.call(i)}finally{if(e)throw e.error}}return o},enumerable:!0,configurable:!0}),Object.defineProperty(i.prototype,"destroyed",{get:function(){return this._destroyed},enumerable:!0,configurable:!0}),Object.defineProperty(i.prototype,"disconnected",{get:function(){return this._disconnected},enumerable:!0,configurable:!0}),i.prototype._initializeServerConnection=function(){var e=this;this._socket=new a.Socket(this._options.secure,this._options.host,this._options.port,this._options.path,this._options.key,this._options.pingInterval),this.socket.on(u.SocketEventType.Message,function(t){e._handleMessage(t)}),this.socket.on(u.SocketEventType.Error,function(t){e._abort(u.PeerErrorType.SocketError,t)}),this.socket.on(u.SocketEventType.Disconnected,function(){e.disconnected||(e.emitError(u.PeerErrorType.Network,"Lost connection to server."),e.disconnect())}),this.socket.on(u.SocketEventType.Close,function(){e.disconnected||e._abort(u.PeerErrorType.SocketClosed,"Underlying socket is already closed.")})},i.prototype._initialize=function(e){this._id=e,this.socket.start(this.id,this._options.token)},i.prototype._handleMessage=function(e){var t,r,o=e.type,i=e.payload,s=e.src;switch(o){case u.ServerMessageType.Open:this.emit(u.PeerEventType.Open,this.id),this._open=!0;break;case u.ServerMessageType.Error:this._abort(u.PeerErrorType.ServerError,i.msg);break;case u.ServerMessageType.IdTaken:this._abort(u.PeerErrorType.UnavailableID,'ID "'+this.id+'" is taken');break;case u.ServerMessageType.InvalidKey:this._abort(u.PeerErrorType.InvalidKey,'API KEY "'+this._options.key+'" is invalid');break;case u.ServerMessageType.Leave:c.default.log("Received leave message from",s),this._cleanupPeer(s),this._connections.delete(s);break;case u.ServerMessageType.Expire:this.emitError(u.PeerErrorType.PeerUnavailable,"Could not connect to peer "+s);break;case u.ServerMessageType.Offer:var a=i.connectionId;if((_=this.getConnection(s,a))&&(_.close(),c.default.warn("Offer received for existing Connection ID:",a)),i.type===u.ConnectionType.Media)_=new l.MediaConnection(s,this,{connectionId:a,_payload:i,metadata:i.metadata}),this._addConnection(s,_),this.emit(u.PeerEventType.Call,_);else{if(i.type!==u.ConnectionType.Data)return void c.default.warn("Received malformed connection type:",i.type);_=new d.DataConnection(s,this,{connectionId:a,_payload:i,metadata:i.metadata,label:i.label,serialization:i.serialization,reliable:i.reliable}),this._addConnection(s,_),this.emit(u.PeerEventType.Connection,_)}var p=this._getMessages(a);try{for(var h=n(p),f=h.next();!f.done;f=h.next()){var y=f.value;_.handleMessage(y)}}catch(v){t={error:v}}finally{try{f&&!f.done&&(r=h.return)&&r.call(h)}finally{if(t)throw t.error}}break;default:if(!i)return void c.default.warn("You received a malformed message from "+s+" of type "+o);var _;a=i.connectionId;(_=this.getConnection(s,a))&&_.peerConnection?_.handleMessage(e):a?this._storeMessage(a,e):c.default.warn("You received an unrecognized message:",e)}},i.prototype._storeMessage=function(e,t){this._lostMessages.has(e)||this._lostMessages.set(e,[]),this._lostMessages.get(e).push(t)},i.prototype._getMessages=function(e){var t=this._lostMessages.get(e);return t?(this._lostMessages.delete(e),t):[]},i.prototype.connect=function(e,t){if(void 0===t&&(t={}),this.disconnected)return c.default.warn("You cannot connect to a new Peer because you called .disconnect() on this Peer and ended your connection with the server. You can create a new Peer to reconnect, or call reconnect on this peer if you believe its ID to still be available."),void this.emitError(u.PeerErrorType.Disconnected,"Cannot connect to new Peer after disconnecting from server.");var n=new d.DataConnection(e,this,t);return this._addConnection(e,n),n},i.prototype.call=function(e,t,n){if(void 0===n&&(n={}),this.disconnected)return c.default.warn("You cannot connect to a new Peer because you called .disconnect() on this Peer and ended your connection with the server. You can create a new Peer to reconnect."),void this.emitError(u.PeerErrorType.Disconnected,"Cannot connect to new Peer after disconnecting from server.");if(t){n._stream=t;var r=new l.MediaConnection(e,this,n);return this._addConnection(e,r),r}c.default.error("To call a peer, you must provide a stream from your browser's `getUserMedia`.")},i.prototype._addConnection=function(e,t){c.default.log("add connection "+t.type+":"+t.connectionId+"\n       to peerId:"+e),this._connections.has(e)||this._connections.set(e,[]),this._connections.get(e).push(t)},i.prototype._removeConnection=function(e){var t=this._connections.get(e.peer);if(t){var n=t.indexOf(e);-1!==n&&t.splice(n,1)}this._lostMessages.delete(e.connectionId)},i.prototype.getConnection=function(e,t){var r,o,i=this._connections.get(e);if(!i)return null;try{for(var s=n(i),c=s.next();!c.done;c=s.next()){var a=c.value;if(a.connectionId===t)return a}}catch(l){r={error:l}}finally{try{c&&!c.done&&(o=s.return)&&o.call(s)}finally{if(r)throw r.error}}return null},i.prototype._delayedAbort=function(e,t){var n=this;setTimeout(function(){n._abort(e,t)},0)},i.prototype._abort=function(e,t){c.default.error("Aborting!"),this._lastServerId?this.disconnect():this.destroy(),this.emitError(e,t)},i.prototype.emitError=function(e,t){c.default.error("Error:",t),"string"==typeof t&&(t=new Error(t)),t.type=e,this.emit(u.PeerEventType.Error,t)},i.prototype.destroy=function(){this.destroyed||(this._cleanup(),this.disconnect(),this._destroyed=!0)},i.prototype._cleanup=function(){var e,t;try{for(var r=n(this._connections.keys()),o=r.next();!o.done;o=r.next()){var i=o.value;this._cleanupPeer(i),this._connections.delete(i)}}catch(s){e={error:s}}finally{try{o&&!o.done&&(t=r.return)&&t.call(r)}finally{if(e)throw e.error}}this.emit(u.PeerEventType.Close)},i.prototype._cleanupPeer=function(e){var t,r,o=this._connections.get(e);if(o)try{for(var i=n(o),s=i.next();!s.done;s=i.next()){s.value.close()}}catch(c){t={error:c}}finally{try{s&&!s.done&&(r=i.return)&&r.call(i)}finally{if(t)throw t.error}}},i.prototype.disconnect=function(){var e=this;setTimeout(function(){e.disconnected||(e._disconnected=!0,e._open=!1,e.socket&&e.socket.close(),e.emit(u.PeerEventType.Disconnected,e.id),e._lastServerId=e.id,e._id=null)},0)},i.prototype.reconnect=function(){if(this.disconnected&&!this.destroyed)c.default.log("Attempting reconnection to server with ID "+this._lastServerId),this._disconnected=!1,this._initializeServerConnection(),this._initialize(this._lastServerId);else{if(this.destroyed)throw new Error("This peer cannot reconnect to the server. It has already been destroyed.");if(this.disconnected||this.open)throw new Error("Peer "+this.id+" cannot reconnect because it is not disconnected from the server!");c.default.error("In a hurry? We're still trying to make the initial connection!")}},i.prototype.listAllPeers=function(e){var t=this;void 0===e&&(e=function(e){}),this._api.listAllPeers().then(function(t){return e(t)}).catch(function(e){return t._abort(u.PeerErrorType.ServerError,e)})},i.DEFAULT_KEY="peerjs",i}(i.EventEmitter);exports.Peer=f;
},{"eventemitter3":"2JJl","./util":"BHXf","./logger":"8WOs","./socket":"wJlv","./mediaconnection":"dbHP","./dataconnection":"GBTQ","./enums":"9ZRY","./api":"in7L"}],"iTK6":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var e=require("./util"),r=require("./peer");exports.peerjs={Peer:r.Peer,util:e.util},exports.default=r.Peer,window.peerjs=exports.peerjs,window.Peer=r.Peer;
},{"./util":"BHXf","./peer":"Hxpd"}]},{},["iTK6"], null)

},{}],"dQwU":[function(require,module,exports) {
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _wrapNativeSuper(Class) { var _cache = typeof Map === "function" ? new Map() : undefined; _wrapNativeSuper = function _wrapNativeSuper(Class) { if (Class === null || !_isNativeFunction(Class)) return Class; if (typeof Class !== "function") { throw new TypeError("Super expression must either be null or a function"); } if (typeof _cache !== "undefined") { if (_cache.has(Class)) return _cache.get(Class); _cache.set(Class, Wrapper); } function Wrapper() { return _construct(Class, arguments, _getPrototypeOf(this).constructor); } Wrapper.prototype = Object.create(Class.prototype, { constructor: { value: Wrapper, enumerable: false, writable: true, configurable: true } }); return _setPrototypeOf(Wrapper, Class); }; return _wrapNativeSuper(Class); }

function isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _construct(Parent, args, Class) { if (isNativeReflectConstruct()) { _construct = Reflect.construct; } else { _construct = function _construct(Parent, args, Class) { var a = [null]; a.push.apply(a, args); var Constructor = Function.bind.apply(Parent, a); var instance = new Constructor(); if (Class) _setPrototypeOf(instance, Class.prototype); return instance; }; } return _construct.apply(null, arguments); }

function _isNativeFunction(fn) { return Function.toString.call(fn).indexOf("[native code]") !== -1; }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var DrawingCanvas =
/*#__PURE__*/
function (_HTMLElement) {
  _inherits(DrawingCanvas, _HTMLElement);

  _createClass(DrawingCanvas, [{
    key: "drawing",
    get: function get() {
      return this._drawing;
    },
    set: function set(value) {
      if (this._drawing === value) return;
      this._drawing = value;
    }
  }]);

  function DrawingCanvas() {
    var _this;

    _classCallCheck(this, DrawingCanvas);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(DrawingCanvas).call(this));
    var canvas = document.createElement('canvas');

    var shadowRoot = _this.attachShadow({
      mode: 'open'
    }).appendChild(canvas);

    canvas.style.height = '100%';
    canvas.style.width = '100%';
    canvas.width = 400;
    canvas.height = 800;
    var scale = 1;
    setTimeout(function () {
      scale = canvas.height / canvas.clientHeight;
    }); // stolen from: https://codesandbox.io/s/paint-tool-final-g362x?from-embed

    var context = canvas.getContext('2d');
    var strokeWidth = 3; // Drawing state

    var latestPoint;
    var drawing = false;
    var currentAngle; // Geometry

    var rotatePoint = function rotatePoint(distance, angle, origin) {
      return [origin[0] + distance * Math.cos(angle), origin[1] + distance * Math.sin(angle)];
    };

    var getBearing = function getBearing(origin, destination) {
      return (Math.atan2(destination[1] - origin[1], destination[0] - origin[0]) - Math.PI / 2) % (Math.PI * 2);
    };

    var getNewAngle = function getNewAngle(origin, destination, oldAngle) {
      var bearing = getBearing(origin, destination);

      if (typeof oldAngle === "undefined") {
        return bearing;
      }

      return oldAngle - angleDiff(oldAngle, bearing);
    };

    var angleDiff = function angleDiff(angleA, angleB) {
      var twoPi = Math.PI * 2;
      var diff = (angleA - (angleB > 0 ? angleB : angleB + twoPi) + Math.PI) % twoPi - Math.PI;
      return diff < -Math.PI ? diff + twoPi : diff;
    }; // Drawing functions


    var strokeBristle = function strokeBristle(origin, destination, controlPoint) {
      context.beginPath();
      context.moveTo(origin[0], origin[1]);
      context.strokeStyle = "black";
      context.lineWidth = strokeWidth;
      context.lineCap = "round";
      context.lineJoin = "round";
      context.shadowColor = "black";
      context.shadowBlur = strokeWidth / 2;
      context.quadraticCurveTo(controlPoint[0], controlPoint[1], destination[0], destination[1]);
      context.lineTo(destination[0], destination[1]);
      context.stroke();
    };

    var drawStroke = function drawStroke(origin, destination, oldAngle, newAngle) {
      context.beginPath();
      var bristleOrigin = rotatePoint(0 - strokeWidth / 2, oldAngle, origin);
      var bristleDestination = rotatePoint(0 - strokeWidth / 2, newAngle, destination);
      var controlPoint = rotatePoint(0 - strokeWidth / 2, newAngle, origin);
      strokeBristle(bristleOrigin, bristleDestination, controlPoint);
    };

    var continueStroke = function continueStroke(newPoint) {
      var newAngle = getNewAngle(latestPoint, newPoint, currentAngle);
      drawStroke(latestPoint, newPoint, currentAngle, newAngle);
      currentAngle = newAngle % (Math.PI * 2);
      latestPoint = newPoint;
      if (_this.timeout) clearTimeout(_this.timeout);
      _this.timeout = setTimeout(function () {
        _this.timeout = null;
        _this._drawing = canvas.toDataURL();

        _this.dispatchEvent(new CustomEvent('drawingChanged'));
      }, 300);
    }; // Event helpers


    var startStroke = function startStroke(point) {
      currentAngle = undefined;
      drawing = true;
      latestPoint = point;
    };

    var getTouchPoint = function getTouchPoint(evt) {
      if (!evt.currentTarget) {
        return [0, 0];
      }

      var rect = evt.currentTarget.getBoundingClientRect();
      var touch = evt.targetTouches[0];
      return [touch.clientX * scale - rect.left * scale, touch.clientY * scale - rect.top * scale];
    };

    var BUTTON = 1;

    var mouseButtonIsDown = function mouseButtonIsDown(buttons) {
      return (BUTTON & buttons) === BUTTON;
    }; // Event handlers


    var mouseMove = function mouseMove(evt) {
      if (!drawing) {
        return;
      }

      continueStroke([evt.offsetX * scale, evt.offsetY * scale]);
    };

    var mouseDown = function mouseDown(evt) {
      if (drawing) {
        return;
      }

      evt.preventDefault();
      canvas.addEventListener("mousemove", mouseMove, false);
      startStroke([evt.offsetX * scale, evt.offsetY * scale]);
    };

    var mouseEnter = function mouseEnter(evt) {
      if (!mouseButtonIsDown(evt.buttons) || drawing) {
        return;
      }

      mouseDown(evt);
    };

    var endStroke = function endStroke(evt) {
      if (!drawing) {
        return;
      }

      drawing = false;
      evt.currentTarget.removeEventListener("mousemove", mouseMove, false);
    };

    var touchStart = function touchStart(evt) {
      if (drawing) {
        return;
      }

      evt.preventDefault();
      startStroke(getTouchPoint(evt));
    };

    var touchMove = function touchMove(evt) {
      if (!drawing) {
        return;
      }

      continueStroke(getTouchPoint(evt));
    };

    var touchEnd = function touchEnd(evt) {
      drawing = false;
    };

    _this.addEventListener("touchstart", touchStart, false);

    _this.addEventListener("touchend", touchEnd, false);

    _this.addEventListener("touchcancel", touchEnd, false);

    _this.addEventListener("touchmove", touchMove, false);

    _this.addEventListener("mousedown", mouseDown, false);

    _this.addEventListener("mouseup", endStroke, false);

    _this.addEventListener("mouseout", endStroke, false);

    _this.addEventListener("mouseenter", mouseEnter, false);

    return _this;
  }

  return DrawingCanvas;
}(_wrapNativeSuper(HTMLElement));

customElements.define('drawing-canvas', DrawingCanvas);
},{}],"8asW":[function(require,module,exports) {
(function(scope){
'use strict';

function F(arity, fun, wrapper) {
  wrapper.a = arity;
  wrapper.f = fun;
  return wrapper;
}

function F2(fun) {
  return F(2, fun, function(a) { return function(b) { return fun(a,b); }; })
}
function F3(fun) {
  return F(3, fun, function(a) {
    return function(b) { return function(c) { return fun(a, b, c); }; };
  });
}
function F4(fun) {
  return F(4, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return fun(a, b, c, d); }; }; };
  });
}
function F5(fun) {
  return F(5, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return fun(a, b, c, d, e); }; }; }; };
  });
}
function F6(fun) {
  return F(6, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return fun(a, b, c, d, e, f); }; }; }; }; };
  });
}
function F7(fun) {
  return F(7, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return function(g) { return fun(a, b, c, d, e, f, g); }; }; }; }; }; };
  });
}
function F8(fun) {
  return F(8, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return function(g) { return function(h) {
    return fun(a, b, c, d, e, f, g, h); }; }; }; }; }; }; };
  });
}
function F9(fun) {
  return F(9, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return function(g) { return function(h) { return function(i) {
    return fun(a, b, c, d, e, f, g, h, i); }; }; }; }; }; }; }; };
  });
}

function A2(fun, a, b) {
  return fun.a === 2 ? fun.f(a, b) : fun(a)(b);
}
function A3(fun, a, b, c) {
  return fun.a === 3 ? fun.f(a, b, c) : fun(a)(b)(c);
}
function A4(fun, a, b, c, d) {
  return fun.a === 4 ? fun.f(a, b, c, d) : fun(a)(b)(c)(d);
}
function A5(fun, a, b, c, d, e) {
  return fun.a === 5 ? fun.f(a, b, c, d, e) : fun(a)(b)(c)(d)(e);
}
function A6(fun, a, b, c, d, e, f) {
  return fun.a === 6 ? fun.f(a, b, c, d, e, f) : fun(a)(b)(c)(d)(e)(f);
}
function A7(fun, a, b, c, d, e, f, g) {
  return fun.a === 7 ? fun.f(a, b, c, d, e, f, g) : fun(a)(b)(c)(d)(e)(f)(g);
}
function A8(fun, a, b, c, d, e, f, g, h) {
  return fun.a === 8 ? fun.f(a, b, c, d, e, f, g, h) : fun(a)(b)(c)(d)(e)(f)(g)(h);
}
function A9(fun, a, b, c, d, e, f, g, h, i) {
  return fun.a === 9 ? fun.f(a, b, c, d, e, f, g, h, i) : fun(a)(b)(c)(d)(e)(f)(g)(h)(i);
}

console.warn('Compiled in DEV mode. Follow the advice at https://elm-lang.org/0.19.0/optimize for better performance and smaller assets.');


var _List_Nil_UNUSED = { $: 0 };
var _List_Nil = { $: '[]' };

function _List_Cons_UNUSED(hd, tl) { return { $: 1, a: hd, b: tl }; }
function _List_Cons(hd, tl) { return { $: '::', a: hd, b: tl }; }


var _List_cons = F2(_List_Cons);

function _List_fromArray(arr)
{
	var out = _List_Nil;
	for (var i = arr.length; i--; )
	{
		out = _List_Cons(arr[i], out);
	}
	return out;
}

function _List_toArray(xs)
{
	for (var out = []; xs.b; xs = xs.b) // WHILE_CONS
	{
		out.push(xs.a);
	}
	return out;
}

var _List_map2 = F3(function(f, xs, ys)
{
	for (var arr = []; xs.b && ys.b; xs = xs.b, ys = ys.b) // WHILE_CONSES
	{
		arr.push(A2(f, xs.a, ys.a));
	}
	return _List_fromArray(arr);
});

var _List_map3 = F4(function(f, xs, ys, zs)
{
	for (var arr = []; xs.b && ys.b && zs.b; xs = xs.b, ys = ys.b, zs = zs.b) // WHILE_CONSES
	{
		arr.push(A3(f, xs.a, ys.a, zs.a));
	}
	return _List_fromArray(arr);
});

var _List_map4 = F5(function(f, ws, xs, ys, zs)
{
	for (var arr = []; ws.b && xs.b && ys.b && zs.b; ws = ws.b, xs = xs.b, ys = ys.b, zs = zs.b) // WHILE_CONSES
	{
		arr.push(A4(f, ws.a, xs.a, ys.a, zs.a));
	}
	return _List_fromArray(arr);
});

var _List_map5 = F6(function(f, vs, ws, xs, ys, zs)
{
	for (var arr = []; vs.b && ws.b && xs.b && ys.b && zs.b; vs = vs.b, ws = ws.b, xs = xs.b, ys = ys.b, zs = zs.b) // WHILE_CONSES
	{
		arr.push(A5(f, vs.a, ws.a, xs.a, ys.a, zs.a));
	}
	return _List_fromArray(arr);
});

var _List_sortBy = F2(function(f, xs)
{
	return _List_fromArray(_List_toArray(xs).sort(function(a, b) {
		return _Utils_cmp(f(a), f(b));
	}));
});

var _List_sortWith = F2(function(f, xs)
{
	return _List_fromArray(_List_toArray(xs).sort(function(a, b) {
		var ord = A2(f, a, b);
		return ord === elm$core$Basics$EQ ? 0 : ord === elm$core$Basics$LT ? -1 : 1;
	}));
});



// EQUALITY

function _Utils_eq(x, y)
{
	for (
		var pair, stack = [], isEqual = _Utils_eqHelp(x, y, 0, stack);
		isEqual && (pair = stack.pop());
		isEqual = _Utils_eqHelp(pair.a, pair.b, 0, stack)
		)
	{}

	return isEqual;
}

function _Utils_eqHelp(x, y, depth, stack)
{
	if (depth > 100)
	{
		stack.push(_Utils_Tuple2(x,y));
		return true;
	}

	if (x === y)
	{
		return true;
	}

	if (typeof x !== 'object' || x === null || y === null)
	{
		typeof x === 'function' && _Debug_crash(5);
		return false;
	}

	/**/
	if (x.$ === 'Set_elm_builtin')
	{
		x = elm$core$Set$toList(x);
		y = elm$core$Set$toList(y);
	}
	if (x.$ === 'RBNode_elm_builtin' || x.$ === 'RBEmpty_elm_builtin')
	{
		x = elm$core$Dict$toList(x);
		y = elm$core$Dict$toList(y);
	}
	//*/

	/**_UNUSED/
	if (x.$ < 0)
	{
		x = elm$core$Dict$toList(x);
		y = elm$core$Dict$toList(y);
	}
	//*/

	for (var key in x)
	{
		if (!_Utils_eqHelp(x[key], y[key], depth + 1, stack))
		{
			return false;
		}
	}
	return true;
}

var _Utils_equal = F2(_Utils_eq);
var _Utils_notEqual = F2(function(a, b) { return !_Utils_eq(a,b); });



// COMPARISONS

// Code in Generate/JavaScript.hs, Basics.js, and List.js depends on
// the particular integer values assigned to LT, EQ, and GT.

function _Utils_cmp(x, y, ord)
{
	if (typeof x !== 'object')
	{
		return x === y ? /*EQ*/ 0 : x < y ? /*LT*/ -1 : /*GT*/ 1;
	}

	/**/
	if (x instanceof String)
	{
		var a = x.valueOf();
		var b = y.valueOf();
		return a === b ? 0 : a < b ? -1 : 1;
	}
	//*/

	/**_UNUSED/
	if (typeof x.$ === 'undefined')
	//*/
	/**/
	if (x.$[0] === '#')
	//*/
	{
		return (ord = _Utils_cmp(x.a, y.a))
			? ord
			: (ord = _Utils_cmp(x.b, y.b))
				? ord
				: _Utils_cmp(x.c, y.c);
	}

	// traverse conses until end of a list or a mismatch
	for (; x.b && y.b && !(ord = _Utils_cmp(x.a, y.a)); x = x.b, y = y.b) {} // WHILE_CONSES
	return ord || (x.b ? /*GT*/ 1 : y.b ? /*LT*/ -1 : /*EQ*/ 0);
}

var _Utils_lt = F2(function(a, b) { return _Utils_cmp(a, b) < 0; });
var _Utils_le = F2(function(a, b) { return _Utils_cmp(a, b) < 1; });
var _Utils_gt = F2(function(a, b) { return _Utils_cmp(a, b) > 0; });
var _Utils_ge = F2(function(a, b) { return _Utils_cmp(a, b) >= 0; });

var _Utils_compare = F2(function(x, y)
{
	var n = _Utils_cmp(x, y);
	return n < 0 ? elm$core$Basics$LT : n ? elm$core$Basics$GT : elm$core$Basics$EQ;
});


// COMMON VALUES

var _Utils_Tuple0_UNUSED = 0;
var _Utils_Tuple0 = { $: '#0' };

function _Utils_Tuple2_UNUSED(a, b) { return { a: a, b: b }; }
function _Utils_Tuple2(a, b) { return { $: '#2', a: a, b: b }; }

function _Utils_Tuple3_UNUSED(a, b, c) { return { a: a, b: b, c: c }; }
function _Utils_Tuple3(a, b, c) { return { $: '#3', a: a, b: b, c: c }; }

function _Utils_chr_UNUSED(c) { return c; }
function _Utils_chr(c) { return new String(c); }


// RECORDS

function _Utils_update(oldRecord, updatedFields)
{
	var newRecord = {};

	for (var key in oldRecord)
	{
		newRecord[key] = oldRecord[key];
	}

	for (var key in updatedFields)
	{
		newRecord[key] = updatedFields[key];
	}

	return newRecord;
}


// APPEND

var _Utils_append = F2(_Utils_ap);

function _Utils_ap(xs, ys)
{
	// append Strings
	if (typeof xs === 'string')
	{
		return xs + ys;
	}

	// append Lists
	if (!xs.b)
	{
		return ys;
	}
	var root = _List_Cons(xs.a, ys);
	xs = xs.b
	for (var curr = root; xs.b; xs = xs.b) // WHILE_CONS
	{
		curr = curr.b = _List_Cons(xs.a, ys);
	}
	return root;
}



var _JsArray_empty = [];

function _JsArray_singleton(value)
{
    return [value];
}

function _JsArray_length(array)
{
    return array.length;
}

var _JsArray_initialize = F3(function(size, offset, func)
{
    var result = new Array(size);

    for (var i = 0; i < size; i++)
    {
        result[i] = func(offset + i);
    }

    return result;
});

var _JsArray_initializeFromList = F2(function (max, ls)
{
    var result = new Array(max);

    for (var i = 0; i < max && ls.b; i++)
    {
        result[i] = ls.a;
        ls = ls.b;
    }

    result.length = i;
    return _Utils_Tuple2(result, ls);
});

var _JsArray_unsafeGet = F2(function(index, array)
{
    return array[index];
});

var _JsArray_unsafeSet = F3(function(index, value, array)
{
    var length = array.length;
    var result = new Array(length);

    for (var i = 0; i < length; i++)
    {
        result[i] = array[i];
    }

    result[index] = value;
    return result;
});

var _JsArray_push = F2(function(value, array)
{
    var length = array.length;
    var result = new Array(length + 1);

    for (var i = 0; i < length; i++)
    {
        result[i] = array[i];
    }

    result[length] = value;
    return result;
});

var _JsArray_foldl = F3(function(func, acc, array)
{
    var length = array.length;

    for (var i = 0; i < length; i++)
    {
        acc = A2(func, array[i], acc);
    }

    return acc;
});

var _JsArray_foldr = F3(function(func, acc, array)
{
    for (var i = array.length - 1; i >= 0; i--)
    {
        acc = A2(func, array[i], acc);
    }

    return acc;
});

var _JsArray_map = F2(function(func, array)
{
    var length = array.length;
    var result = new Array(length);

    for (var i = 0; i < length; i++)
    {
        result[i] = func(array[i]);
    }

    return result;
});

var _JsArray_indexedMap = F3(function(func, offset, array)
{
    var length = array.length;
    var result = new Array(length);

    for (var i = 0; i < length; i++)
    {
        result[i] = A2(func, offset + i, array[i]);
    }

    return result;
});

var _JsArray_slice = F3(function(from, to, array)
{
    return array.slice(from, to);
});

var _JsArray_appendN = F3(function(n, dest, source)
{
    var destLen = dest.length;
    var itemsToCopy = n - destLen;

    if (itemsToCopy > source.length)
    {
        itemsToCopy = source.length;
    }

    var size = destLen + itemsToCopy;
    var result = new Array(size);

    for (var i = 0; i < destLen; i++)
    {
        result[i] = dest[i];
    }

    for (var i = 0; i < itemsToCopy; i++)
    {
        result[i + destLen] = source[i];
    }

    return result;
});



// LOG

var _Debug_log_UNUSED = F2(function(tag, value)
{
	return value;
});

var _Debug_log = F2(function(tag, value)
{
	console.log(tag + ': ' + _Debug_toString(value));
	return value;
});


// TODOS

function _Debug_todo(moduleName, region)
{
	return function(message) {
		_Debug_crash(8, moduleName, region, message);
	};
}

function _Debug_todoCase(moduleName, region, value)
{
	return function(message) {
		_Debug_crash(9, moduleName, region, value, message);
	};
}


// TO STRING

function _Debug_toString_UNUSED(value)
{
	return '<internals>';
}

function _Debug_toString(value)
{
	return _Debug_toAnsiString(false, value);
}

function _Debug_toAnsiString(ansi, value)
{
	if (typeof value === 'function')
	{
		return _Debug_internalColor(ansi, '<function>');
	}

	if (typeof value === 'boolean')
	{
		return _Debug_ctorColor(ansi, value ? 'True' : 'False');
	}

	if (typeof value === 'number')
	{
		return _Debug_numberColor(ansi, value + '');
	}

	if (value instanceof String)
	{
		return _Debug_charColor(ansi, "'" + _Debug_addSlashes(value, true) + "'");
	}

	if (typeof value === 'string')
	{
		return _Debug_stringColor(ansi, '"' + _Debug_addSlashes(value, false) + '"');
	}

	if (typeof value === 'object' && '$' in value)
	{
		var tag = value.$;

		if (typeof tag === 'number')
		{
			return _Debug_internalColor(ansi, '<internals>');
		}

		if (tag[0] === '#')
		{
			var output = [];
			for (var k in value)
			{
				if (k === '$') continue;
				output.push(_Debug_toAnsiString(ansi, value[k]));
			}
			return '(' + output.join(',') + ')';
		}

		if (tag === 'Set_elm_builtin')
		{
			return _Debug_ctorColor(ansi, 'Set')
				+ _Debug_fadeColor(ansi, '.fromList') + ' '
				+ _Debug_toAnsiString(ansi, elm$core$Set$toList(value));
		}

		if (tag === 'RBNode_elm_builtin' || tag === 'RBEmpty_elm_builtin')
		{
			return _Debug_ctorColor(ansi, 'Dict')
				+ _Debug_fadeColor(ansi, '.fromList') + ' '
				+ _Debug_toAnsiString(ansi, elm$core$Dict$toList(value));
		}

		if (tag === 'Array_elm_builtin')
		{
			return _Debug_ctorColor(ansi, 'Array')
				+ _Debug_fadeColor(ansi, '.fromList') + ' '
				+ _Debug_toAnsiString(ansi, elm$core$Array$toList(value));
		}

		if (tag === '::' || tag === '[]')
		{
			var output = '[';

			value.b && (output += _Debug_toAnsiString(ansi, value.a), value = value.b)

			for (; value.b; value = value.b) // WHILE_CONS
			{
				output += ',' + _Debug_toAnsiString(ansi, value.a);
			}
			return output + ']';
		}

		var output = '';
		for (var i in value)
		{
			if (i === '$') continue;
			var str = _Debug_toAnsiString(ansi, value[i]);
			var c0 = str[0];
			var parenless = c0 === '{' || c0 === '(' || c0 === '[' || c0 === '<' || c0 === '"' || str.indexOf(' ') < 0;
			output += ' ' + (parenless ? str : '(' + str + ')');
		}
		return _Debug_ctorColor(ansi, tag) + output;
	}

	if (typeof DataView === 'function' && value instanceof DataView)
	{
		return _Debug_stringColor(ansi, '<' + value.byteLength + ' bytes>');
	}

	if (typeof File === 'function' && value instanceof File)
	{
		return _Debug_internalColor(ansi, '<' + value.name + '>');
	}

	if (typeof value === 'object')
	{
		var output = [];
		for (var key in value)
		{
			var field = key[0] === '_' ? key.slice(1) : key;
			output.push(_Debug_fadeColor(ansi, field) + ' = ' + _Debug_toAnsiString(ansi, value[key]));
		}
		if (output.length === 0)
		{
			return '{}';
		}
		return '{ ' + output.join(', ') + ' }';
	}

	return _Debug_internalColor(ansi, '<internals>');
}

function _Debug_addSlashes(str, isChar)
{
	var s = str
		.replace(/\\/g, '\\\\')
		.replace(/\n/g, '\\n')
		.replace(/\t/g, '\\t')
		.replace(/\r/g, '\\r')
		.replace(/\v/g, '\\v')
		.replace(/\0/g, '\\0');

	if (isChar)
	{
		return s.replace(/\'/g, '\\\'');
	}
	else
	{
		return s.replace(/\"/g, '\\"');
	}
}

function _Debug_ctorColor(ansi, string)
{
	return ansi ? '\x1b[96m' + string + '\x1b[0m' : string;
}

function _Debug_numberColor(ansi, string)
{
	return ansi ? '\x1b[95m' + string + '\x1b[0m' : string;
}

function _Debug_stringColor(ansi, string)
{
	return ansi ? '\x1b[93m' + string + '\x1b[0m' : string;
}

function _Debug_charColor(ansi, string)
{
	return ansi ? '\x1b[92m' + string + '\x1b[0m' : string;
}

function _Debug_fadeColor(ansi, string)
{
	return ansi ? '\x1b[37m' + string + '\x1b[0m' : string;
}

function _Debug_internalColor(ansi, string)
{
	return ansi ? '\x1b[94m' + string + '\x1b[0m' : string;
}

function _Debug_toHexDigit(n)
{
	return String.fromCharCode(n < 10 ? 48 + n : 55 + n);
}


// CRASH


function _Debug_crash_UNUSED(identifier)
{
	throw new Error('https://github.com/elm/core/blob/1.0.0/hints/' + identifier + '.md');
}


function _Debug_crash(identifier, fact1, fact2, fact3, fact4)
{
	switch(identifier)
	{
		case 0:
			throw new Error('What node should I take over? In JavaScript I need something like:\n\n    Elm.Main.init({\n        node: document.getElementById("elm-node")\n    })\n\nYou need to do this with any Browser.sandbox or Browser.element program.');

		case 1:
			throw new Error('Browser.application programs cannot handle URLs like this:\n\n    ' + document.location.href + '\n\nWhat is the root? The root of your file system? Try looking at this program with `elm reactor` or some other server.');

		case 2:
			var jsonErrorString = fact1;
			throw new Error('Problem with the flags given to your Elm program on initialization.\n\n' + jsonErrorString);

		case 3:
			var portName = fact1;
			throw new Error('There can only be one port named `' + portName + '`, but your program has multiple.');

		case 4:
			var portName = fact1;
			var problem = fact2;
			throw new Error('Trying to send an unexpected type of value through port `' + portName + '`:\n' + problem);

		case 5:
			throw new Error('Trying to use `(==)` on functions.\nThere is no way to know if functions are "the same" in the Elm sense.\nRead more about this at https://package.elm-lang.org/packages/elm/core/latest/Basics#== which describes why it is this way and what the better version will look like.');

		case 6:
			var moduleName = fact1;
			throw new Error('Your page is loading multiple Elm scripts with a module named ' + moduleName + '. Maybe a duplicate script is getting loaded accidentally? If not, rename one of them so I know which is which!');

		case 8:
			var moduleName = fact1;
			var region = fact2;
			var message = fact3;
			throw new Error('TODO in module `' + moduleName + '` ' + _Debug_regionToString(region) + '\n\n' + message);

		case 9:
			var moduleName = fact1;
			var region = fact2;
			var value = fact3;
			var message = fact4;
			throw new Error(
				'TODO in module `' + moduleName + '` from the `case` expression '
				+ _Debug_regionToString(region) + '\n\nIt received the following value:\n\n    '
				+ _Debug_toString(value).replace('\n', '\n    ')
				+ '\n\nBut the branch that handles it says:\n\n    ' + message.replace('\n', '\n    ')
			);

		case 10:
			throw new Error('Bug in https://github.com/elm/virtual-dom/issues');

		case 11:
			throw new Error('Cannot perform mod 0. Division by zero error.');
	}
}

function _Debug_regionToString(region)
{
	if (region.start.line === region.end.line)
	{
		return 'on line ' + region.start.line;
	}
	return 'on lines ' + region.start.line + ' through ' + region.end.line;
}



// MATH

var _Basics_add = F2(function(a, b) { return a + b; });
var _Basics_sub = F2(function(a, b) { return a - b; });
var _Basics_mul = F2(function(a, b) { return a * b; });
var _Basics_fdiv = F2(function(a, b) { return a / b; });
var _Basics_idiv = F2(function(a, b) { return (a / b) | 0; });
var _Basics_pow = F2(Math.pow);

var _Basics_remainderBy = F2(function(b, a) { return a % b; });

// https://www.microsoft.com/en-us/research/wp-content/uploads/2016/02/divmodnote-letter.pdf
var _Basics_modBy = F2(function(modulus, x)
{
	var answer = x % modulus;
	return modulus === 0
		? _Debug_crash(11)
		:
	((answer > 0 && modulus < 0) || (answer < 0 && modulus > 0))
		? answer + modulus
		: answer;
});


// TRIGONOMETRY

var _Basics_pi = Math.PI;
var _Basics_e = Math.E;
var _Basics_cos = Math.cos;
var _Basics_sin = Math.sin;
var _Basics_tan = Math.tan;
var _Basics_acos = Math.acos;
var _Basics_asin = Math.asin;
var _Basics_atan = Math.atan;
var _Basics_atan2 = F2(Math.atan2);


// MORE MATH

function _Basics_toFloat(x) { return x; }
function _Basics_truncate(n) { return n | 0; }
function _Basics_isInfinite(n) { return n === Infinity || n === -Infinity; }

var _Basics_ceiling = Math.ceil;
var _Basics_floor = Math.floor;
var _Basics_round = Math.round;
var _Basics_sqrt = Math.sqrt;
var _Basics_log = Math.log;
var _Basics_isNaN = isNaN;


// BOOLEANS

function _Basics_not(bool) { return !bool; }
var _Basics_and = F2(function(a, b) { return a && b; });
var _Basics_or  = F2(function(a, b) { return a || b; });
var _Basics_xor = F2(function(a, b) { return a !== b; });



function _Char_toCode(char)
{
	var code = char.charCodeAt(0);
	if (0xD800 <= code && code <= 0xDBFF)
	{
		return (code - 0xD800) * 0x400 + char.charCodeAt(1) - 0xDC00 + 0x10000
	}
	return code;
}

function _Char_fromCode(code)
{
	return _Utils_chr(
		(code < 0 || 0x10FFFF < code)
			? '\uFFFD'
			:
		(code <= 0xFFFF)
			? String.fromCharCode(code)
			:
		(code -= 0x10000,
			String.fromCharCode(Math.floor(code / 0x400) + 0xD800, code % 0x400 + 0xDC00)
		)
	);
}

function _Char_toUpper(char)
{
	return _Utils_chr(char.toUpperCase());
}

function _Char_toLower(char)
{
	return _Utils_chr(char.toLowerCase());
}

function _Char_toLocaleUpper(char)
{
	return _Utils_chr(char.toLocaleUpperCase());
}

function _Char_toLocaleLower(char)
{
	return _Utils_chr(char.toLocaleLowerCase());
}



var _String_cons = F2(function(chr, str)
{
	return chr + str;
});

function _String_uncons(string)
{
	var word = string.charCodeAt(0);
	return word
		? elm$core$Maybe$Just(
			0xD800 <= word && word <= 0xDBFF
				? _Utils_Tuple2(_Utils_chr(string[0] + string[1]), string.slice(2))
				: _Utils_Tuple2(_Utils_chr(string[0]), string.slice(1))
		)
		: elm$core$Maybe$Nothing;
}

var _String_append = F2(function(a, b)
{
	return a + b;
});

function _String_length(str)
{
	return str.length;
}

var _String_map = F2(function(func, string)
{
	var len = string.length;
	var array = new Array(len);
	var i = 0;
	while (i < len)
	{
		var word = string.charCodeAt(i);
		if (0xD800 <= word && word <= 0xDBFF)
		{
			array[i] = func(_Utils_chr(string[i] + string[i+1]));
			i += 2;
			continue;
		}
		array[i] = func(_Utils_chr(string[i]));
		i++;
	}
	return array.join('');
});

var _String_filter = F2(function(isGood, str)
{
	var arr = [];
	var len = str.length;
	var i = 0;
	while (i < len)
	{
		var char = str[i];
		var word = str.charCodeAt(i);
		i++;
		if (0xD800 <= word && word <= 0xDBFF)
		{
			char += str[i];
			i++;
		}

		if (isGood(_Utils_chr(char)))
		{
			arr.push(char);
		}
	}
	return arr.join('');
});

function _String_reverse(str)
{
	var len = str.length;
	var arr = new Array(len);
	var i = 0;
	while (i < len)
	{
		var word = str.charCodeAt(i);
		if (0xD800 <= word && word <= 0xDBFF)
		{
			arr[len - i] = str[i + 1];
			i++;
			arr[len - i] = str[i - 1];
			i++;
		}
		else
		{
			arr[len - i] = str[i];
			i++;
		}
	}
	return arr.join('');
}

var _String_foldl = F3(function(func, state, string)
{
	var len = string.length;
	var i = 0;
	while (i < len)
	{
		var char = string[i];
		var word = string.charCodeAt(i);
		i++;
		if (0xD800 <= word && word <= 0xDBFF)
		{
			char += string[i];
			i++;
		}
		state = A2(func, _Utils_chr(char), state);
	}
	return state;
});

var _String_foldr = F3(function(func, state, string)
{
	var i = string.length;
	while (i--)
	{
		var char = string[i];
		var word = string.charCodeAt(i);
		if (0xDC00 <= word && word <= 0xDFFF)
		{
			i--;
			char = string[i] + char;
		}
		state = A2(func, _Utils_chr(char), state);
	}
	return state;
});

var _String_split = F2(function(sep, str)
{
	return str.split(sep);
});

var _String_join = F2(function(sep, strs)
{
	return strs.join(sep);
});

var _String_slice = F3(function(start, end, str) {
	return str.slice(start, end);
});

function _String_trim(str)
{
	return str.trim();
}

function _String_trimLeft(str)
{
	return str.replace(/^\s+/, '');
}

function _String_trimRight(str)
{
	return str.replace(/\s+$/, '');
}

function _String_words(str)
{
	return _List_fromArray(str.trim().split(/\s+/g));
}

function _String_lines(str)
{
	return _List_fromArray(str.split(/\r\n|\r|\n/g));
}

function _String_toUpper(str)
{
	return str.toUpperCase();
}

function _String_toLower(str)
{
	return str.toLowerCase();
}

var _String_any = F2(function(isGood, string)
{
	var i = string.length;
	while (i--)
	{
		var char = string[i];
		var word = string.charCodeAt(i);
		if (0xDC00 <= word && word <= 0xDFFF)
		{
			i--;
			char = string[i] + char;
		}
		if (isGood(_Utils_chr(char)))
		{
			return true;
		}
	}
	return false;
});

var _String_all = F2(function(isGood, string)
{
	var i = string.length;
	while (i--)
	{
		var char = string[i];
		var word = string.charCodeAt(i);
		if (0xDC00 <= word && word <= 0xDFFF)
		{
			i--;
			char = string[i] + char;
		}
		if (!isGood(_Utils_chr(char)))
		{
			return false;
		}
	}
	return true;
});

var _String_contains = F2(function(sub, str)
{
	return str.indexOf(sub) > -1;
});

var _String_startsWith = F2(function(sub, str)
{
	return str.indexOf(sub) === 0;
});

var _String_endsWith = F2(function(sub, str)
{
	return str.length >= sub.length &&
		str.lastIndexOf(sub) === str.length - sub.length;
});

var _String_indexes = F2(function(sub, str)
{
	var subLen = sub.length;

	if (subLen < 1)
	{
		return _List_Nil;
	}

	var i = 0;
	var is = [];

	while ((i = str.indexOf(sub, i)) > -1)
	{
		is.push(i);
		i = i + subLen;
	}

	return _List_fromArray(is);
});


// TO STRING

function _String_fromNumber(number)
{
	return number + '';
}


// INT CONVERSIONS

function _String_toInt(str)
{
	var total = 0;
	var code0 = str.charCodeAt(0);
	var start = code0 == 0x2B /* + */ || code0 == 0x2D /* - */ ? 1 : 0;

	for (var i = start; i < str.length; ++i)
	{
		var code = str.charCodeAt(i);
		if (code < 0x30 || 0x39 < code)
		{
			return elm$core$Maybe$Nothing;
		}
		total = 10 * total + code - 0x30;
	}

	return i == start
		? elm$core$Maybe$Nothing
		: elm$core$Maybe$Just(code0 == 0x2D ? -total : total);
}


// FLOAT CONVERSIONS

function _String_toFloat(s)
{
	// check if it is a hex, octal, or binary number
	if (s.length === 0 || /[\sxbo]/.test(s))
	{
		return elm$core$Maybe$Nothing;
	}
	var n = +s;
	// faster isNaN check
	return n === n ? elm$core$Maybe$Just(n) : elm$core$Maybe$Nothing;
}

function _String_fromList(chars)
{
	return _List_toArray(chars).join('');
}




/**/
function _Json_errorToString(error)
{
	return elm$json$Json$Decode$errorToString(error);
}
//*/


// CORE DECODERS

function _Json_succeed(msg)
{
	return {
		$: 0,
		a: msg
	};
}

function _Json_fail(msg)
{
	return {
		$: 1,
		a: msg
	};
}

function _Json_decodePrim(decoder)
{
	return { $: 2, b: decoder };
}

var _Json_decodeInt = _Json_decodePrim(function(value) {
	return (typeof value !== 'number')
		? _Json_expecting('an INT', value)
		:
	(-2147483647 < value && value < 2147483647 && (value | 0) === value)
		? elm$core$Result$Ok(value)
		:
	(isFinite(value) && !(value % 1))
		? elm$core$Result$Ok(value)
		: _Json_expecting('an INT', value);
});

var _Json_decodeBool = _Json_decodePrim(function(value) {
	return (typeof value === 'boolean')
		? elm$core$Result$Ok(value)
		: _Json_expecting('a BOOL', value);
});

var _Json_decodeFloat = _Json_decodePrim(function(value) {
	return (typeof value === 'number')
		? elm$core$Result$Ok(value)
		: _Json_expecting('a FLOAT', value);
});

var _Json_decodeValue = _Json_decodePrim(function(value) {
	return elm$core$Result$Ok(_Json_wrap(value));
});

var _Json_decodeString = _Json_decodePrim(function(value) {
	return (typeof value === 'string')
		? elm$core$Result$Ok(value)
		: (value instanceof String)
			? elm$core$Result$Ok(value + '')
			: _Json_expecting('a STRING', value);
});

function _Json_decodeList(decoder) { return { $: 3, b: decoder }; }
function _Json_decodeArray(decoder) { return { $: 4, b: decoder }; }

function _Json_decodeNull(value) { return { $: 5, c: value }; }

var _Json_decodeField = F2(function(field, decoder)
{
	return {
		$: 6,
		d: field,
		b: decoder
	};
});

var _Json_decodeIndex = F2(function(index, decoder)
{
	return {
		$: 7,
		e: index,
		b: decoder
	};
});

function _Json_decodeKeyValuePairs(decoder)
{
	return {
		$: 8,
		b: decoder
	};
}

function _Json_mapMany(f, decoders)
{
	return {
		$: 9,
		f: f,
		g: decoders
	};
}

var _Json_andThen = F2(function(callback, decoder)
{
	return {
		$: 10,
		b: decoder,
		h: callback
	};
});

function _Json_oneOf(decoders)
{
	return {
		$: 11,
		g: decoders
	};
}


// DECODING OBJECTS

var _Json_map1 = F2(function(f, d1)
{
	return _Json_mapMany(f, [d1]);
});

var _Json_map2 = F3(function(f, d1, d2)
{
	return _Json_mapMany(f, [d1, d2]);
});

var _Json_map3 = F4(function(f, d1, d2, d3)
{
	return _Json_mapMany(f, [d1, d2, d3]);
});

var _Json_map4 = F5(function(f, d1, d2, d3, d4)
{
	return _Json_mapMany(f, [d1, d2, d3, d4]);
});

var _Json_map5 = F6(function(f, d1, d2, d3, d4, d5)
{
	return _Json_mapMany(f, [d1, d2, d3, d4, d5]);
});

var _Json_map6 = F7(function(f, d1, d2, d3, d4, d5, d6)
{
	return _Json_mapMany(f, [d1, d2, d3, d4, d5, d6]);
});

var _Json_map7 = F8(function(f, d1, d2, d3, d4, d5, d6, d7)
{
	return _Json_mapMany(f, [d1, d2, d3, d4, d5, d6, d7]);
});

var _Json_map8 = F9(function(f, d1, d2, d3, d4, d5, d6, d7, d8)
{
	return _Json_mapMany(f, [d1, d2, d3, d4, d5, d6, d7, d8]);
});


// DECODE

var _Json_runOnString = F2(function(decoder, string)
{
	try
	{
		var value = JSON.parse(string);
		return _Json_runHelp(decoder, value);
	}
	catch (e)
	{
		return elm$core$Result$Err(A2(elm$json$Json$Decode$Failure, 'This is not valid JSON! ' + e.message, _Json_wrap(string)));
	}
});

var _Json_run = F2(function(decoder, value)
{
	return _Json_runHelp(decoder, _Json_unwrap(value));
});

function _Json_runHelp(decoder, value)
{
	switch (decoder.$)
	{
		case 2:
			return decoder.b(value);

		case 5:
			return (value === null)
				? elm$core$Result$Ok(decoder.c)
				: _Json_expecting('null', value);

		case 3:
			if (!_Json_isArray(value))
			{
				return _Json_expecting('a LIST', value);
			}
			return _Json_runArrayDecoder(decoder.b, value, _List_fromArray);

		case 4:
			if (!_Json_isArray(value))
			{
				return _Json_expecting('an ARRAY', value);
			}
			return _Json_runArrayDecoder(decoder.b, value, _Json_toElmArray);

		case 6:
			var field = decoder.d;
			if (typeof value !== 'object' || value === null || !(field in value))
			{
				return _Json_expecting('an OBJECT with a field named `' + field + '`', value);
			}
			var result = _Json_runHelp(decoder.b, value[field]);
			return (elm$core$Result$isOk(result)) ? result : elm$core$Result$Err(A2(elm$json$Json$Decode$Field, field, result.a));

		case 7:
			var index = decoder.e;
			if (!_Json_isArray(value))
			{
				return _Json_expecting('an ARRAY', value);
			}
			if (index >= value.length)
			{
				return _Json_expecting('a LONGER array. Need index ' + index + ' but only see ' + value.length + ' entries', value);
			}
			var result = _Json_runHelp(decoder.b, value[index]);
			return (elm$core$Result$isOk(result)) ? result : elm$core$Result$Err(A2(elm$json$Json$Decode$Index, index, result.a));

		case 8:
			if (typeof value !== 'object' || value === null || _Json_isArray(value))
			{
				return _Json_expecting('an OBJECT', value);
			}

			var keyValuePairs = _List_Nil;
			// TODO test perf of Object.keys and switch when support is good enough
			for (var key in value)
			{
				if (value.hasOwnProperty(key))
				{
					var result = _Json_runHelp(decoder.b, value[key]);
					if (!elm$core$Result$isOk(result))
					{
						return elm$core$Result$Err(A2(elm$json$Json$Decode$Field, key, result.a));
					}
					keyValuePairs = _List_Cons(_Utils_Tuple2(key, result.a), keyValuePairs);
				}
			}
			return elm$core$Result$Ok(elm$core$List$reverse(keyValuePairs));

		case 9:
			var answer = decoder.f;
			var decoders = decoder.g;
			for (var i = 0; i < decoders.length; i++)
			{
				var result = _Json_runHelp(decoders[i], value);
				if (!elm$core$Result$isOk(result))
				{
					return result;
				}
				answer = answer(result.a);
			}
			return elm$core$Result$Ok(answer);

		case 10:
			var result = _Json_runHelp(decoder.b, value);
			return (!elm$core$Result$isOk(result))
				? result
				: _Json_runHelp(decoder.h(result.a), value);

		case 11:
			var errors = _List_Nil;
			for (var temp = decoder.g; temp.b; temp = temp.b) // WHILE_CONS
			{
				var result = _Json_runHelp(temp.a, value);
				if (elm$core$Result$isOk(result))
				{
					return result;
				}
				errors = _List_Cons(result.a, errors);
			}
			return elm$core$Result$Err(elm$json$Json$Decode$OneOf(elm$core$List$reverse(errors)));

		case 1:
			return elm$core$Result$Err(A2(elm$json$Json$Decode$Failure, decoder.a, _Json_wrap(value)));

		case 0:
			return elm$core$Result$Ok(decoder.a);
	}
}

function _Json_runArrayDecoder(decoder, value, toElmValue)
{
	var len = value.length;
	var array = new Array(len);
	for (var i = 0; i < len; i++)
	{
		var result = _Json_runHelp(decoder, value[i]);
		if (!elm$core$Result$isOk(result))
		{
			return elm$core$Result$Err(A2(elm$json$Json$Decode$Index, i, result.a));
		}
		array[i] = result.a;
	}
	return elm$core$Result$Ok(toElmValue(array));
}

function _Json_isArray(value)
{
	return Array.isArray(value) || (typeof FileList !== 'undefined' && value instanceof FileList);
}

function _Json_toElmArray(array)
{
	return A2(elm$core$Array$initialize, array.length, function(i) { return array[i]; });
}

function _Json_expecting(type, value)
{
	return elm$core$Result$Err(A2(elm$json$Json$Decode$Failure, 'Expecting ' + type, _Json_wrap(value)));
}


// EQUALITY

function _Json_equality(x, y)
{
	if (x === y)
	{
		return true;
	}

	if (x.$ !== y.$)
	{
		return false;
	}

	switch (x.$)
	{
		case 0:
		case 1:
			return x.a === y.a;

		case 2:
			return x.b === y.b;

		case 5:
			return x.c === y.c;

		case 3:
		case 4:
		case 8:
			return _Json_equality(x.b, y.b);

		case 6:
			return x.d === y.d && _Json_equality(x.b, y.b);

		case 7:
			return x.e === y.e && _Json_equality(x.b, y.b);

		case 9:
			return x.f === y.f && _Json_listEquality(x.g, y.g);

		case 10:
			return x.h === y.h && _Json_equality(x.b, y.b);

		case 11:
			return _Json_listEquality(x.g, y.g);
	}
}

function _Json_listEquality(aDecoders, bDecoders)
{
	var len = aDecoders.length;
	if (len !== bDecoders.length)
	{
		return false;
	}
	for (var i = 0; i < len; i++)
	{
		if (!_Json_equality(aDecoders[i], bDecoders[i]))
		{
			return false;
		}
	}
	return true;
}


// ENCODE

var _Json_encode = F2(function(indentLevel, value)
{
	return JSON.stringify(_Json_unwrap(value), null, indentLevel) + '';
});

function _Json_wrap(value) { return { $: 0, a: value }; }
function _Json_unwrap(value) { return value.a; }

function _Json_wrap_UNUSED(value) { return value; }
function _Json_unwrap_UNUSED(value) { return value; }

function _Json_emptyArray() { return []; }
function _Json_emptyObject() { return {}; }

var _Json_addField = F3(function(key, value, object)
{
	object[key] = _Json_unwrap(value);
	return object;
});

function _Json_addEntry(func)
{
	return F2(function(entry, array)
	{
		array.push(_Json_unwrap(func(entry)));
		return array;
	});
}

var _Json_encodeNull = _Json_wrap(null);



// TASKS

function _Scheduler_succeed(value)
{
	return {
		$: 0,
		a: value
	};
}

function _Scheduler_fail(error)
{
	return {
		$: 1,
		a: error
	};
}

function _Scheduler_binding(callback)
{
	return {
		$: 2,
		b: callback,
		c: null
	};
}

var _Scheduler_andThen = F2(function(callback, task)
{
	return {
		$: 3,
		b: callback,
		d: task
	};
});

var _Scheduler_onError = F2(function(callback, task)
{
	return {
		$: 4,
		b: callback,
		d: task
	};
});

function _Scheduler_receive(callback)
{
	return {
		$: 5,
		b: callback
	};
}


// PROCESSES

var _Scheduler_guid = 0;

function _Scheduler_rawSpawn(task)
{
	var proc = {
		$: 0,
		e: _Scheduler_guid++,
		f: task,
		g: null,
		h: []
	};

	_Scheduler_enqueue(proc);

	return proc;
}

function _Scheduler_spawn(task)
{
	return _Scheduler_binding(function(callback) {
		callback(_Scheduler_succeed(_Scheduler_rawSpawn(task)));
	});
}

function _Scheduler_rawSend(proc, msg)
{
	proc.h.push(msg);
	_Scheduler_enqueue(proc);
}

var _Scheduler_send = F2(function(proc, msg)
{
	return _Scheduler_binding(function(callback) {
		_Scheduler_rawSend(proc, msg);
		callback(_Scheduler_succeed(_Utils_Tuple0));
	});
});

function _Scheduler_kill(proc)
{
	return _Scheduler_binding(function(callback) {
		var task = proc.f;
		if (task.$ === 2 && task.c)
		{
			task.c();
		}

		proc.f = null;

		callback(_Scheduler_succeed(_Utils_Tuple0));
	});
}


/* STEP PROCESSES

type alias Process =
  { $ : tag
  , id : unique_id
  , root : Task
  , stack : null | { $: SUCCEED | FAIL, a: callback, b: stack }
  , mailbox : [msg]
  }

*/


var _Scheduler_working = false;
var _Scheduler_queue = [];


function _Scheduler_enqueue(proc)
{
	_Scheduler_queue.push(proc);
	if (_Scheduler_working)
	{
		return;
	}
	_Scheduler_working = true;
	while (proc = _Scheduler_queue.shift())
	{
		_Scheduler_step(proc);
	}
	_Scheduler_working = false;
}


function _Scheduler_step(proc)
{
	while (proc.f)
	{
		var rootTag = proc.f.$;
		if (rootTag === 0 || rootTag === 1)
		{
			while (proc.g && proc.g.$ !== rootTag)
			{
				proc.g = proc.g.i;
			}
			if (!proc.g)
			{
				return;
			}
			proc.f = proc.g.b(proc.f.a);
			proc.g = proc.g.i;
		}
		else if (rootTag === 2)
		{
			proc.f.c = proc.f.b(function(newRoot) {
				proc.f = newRoot;
				_Scheduler_enqueue(proc);
			});
			return;
		}
		else if (rootTag === 5)
		{
			if (proc.h.length === 0)
			{
				return;
			}
			proc.f = proc.f.b(proc.h.shift());
		}
		else // if (rootTag === 3 || rootTag === 4)
		{
			proc.g = {
				$: rootTag === 3 ? 0 : 1,
				b: proc.f.b,
				i: proc.g
			};
			proc.f = proc.f.d;
		}
	}
}



function _Process_sleep(time)
{
	return _Scheduler_binding(function(callback) {
		var id = setTimeout(function() {
			callback(_Scheduler_succeed(_Utils_Tuple0));
		}, time);

		return function() { clearTimeout(id); };
	});
}




// PROGRAMS


var _Platform_worker = F4(function(impl, flagDecoder, debugMetadata, args)
{
	return _Platform_initialize(
		flagDecoder,
		args,
		impl.init,
		impl.update,
		impl.subscriptions,
		function() { return function() {} }
	);
});



// INITIALIZE A PROGRAM


function _Platform_initialize(flagDecoder, args, init, update, subscriptions, stepperBuilder)
{
	var result = A2(_Json_run, flagDecoder, _Json_wrap(args ? args['flags'] : undefined));
	elm$core$Result$isOk(result) || _Debug_crash(2 /**/, _Json_errorToString(result.a) /**/);
	var managers = {};
	result = init(result.a);
	var model = result.a;
	var stepper = stepperBuilder(sendToApp, model);
	var ports = _Platform_setupEffects(managers, sendToApp);

	function sendToApp(msg, viewMetadata)
	{
		result = A2(update, msg, model);
		stepper(model = result.a, viewMetadata);
		_Platform_dispatchEffects(managers, result.b, subscriptions(model));
	}

	_Platform_dispatchEffects(managers, result.b, subscriptions(model));

	return ports ? { ports: ports } : {};
}



// TRACK PRELOADS
//
// This is used by code in elm/browser and elm/http
// to register any HTTP requests that are triggered by init.
//


var _Platform_preload;


function _Platform_registerPreload(url)
{
	_Platform_preload.add(url);
}



// EFFECT MANAGERS


var _Platform_effectManagers = {};


function _Platform_setupEffects(managers, sendToApp)
{
	var ports;

	// setup all necessary effect managers
	for (var key in _Platform_effectManagers)
	{
		var manager = _Platform_effectManagers[key];

		if (manager.a)
		{
			ports = ports || {};
			ports[key] = manager.a(key, sendToApp);
		}

		managers[key] = _Platform_instantiateManager(manager, sendToApp);
	}

	return ports;
}


function _Platform_createManager(init, onEffects, onSelfMsg, cmdMap, subMap)
{
	return {
		b: init,
		c: onEffects,
		d: onSelfMsg,
		e: cmdMap,
		f: subMap
	};
}


function _Platform_instantiateManager(info, sendToApp)
{
	var router = {
		g: sendToApp,
		h: undefined
	};

	var onEffects = info.c;
	var onSelfMsg = info.d;
	var cmdMap = info.e;
	var subMap = info.f;

	function loop(state)
	{
		return A2(_Scheduler_andThen, loop, _Scheduler_receive(function(msg)
		{
			var value = msg.a;

			if (msg.$ === 0)
			{
				return A3(onSelfMsg, router, value, state);
			}

			return cmdMap && subMap
				? A4(onEffects, router, value.i, value.j, state)
				: A3(onEffects, router, cmdMap ? value.i : value.j, state);
		}));
	}

	return router.h = _Scheduler_rawSpawn(A2(_Scheduler_andThen, loop, info.b));
}



// ROUTING


var _Platform_sendToApp = F2(function(router, msg)
{
	return _Scheduler_binding(function(callback)
	{
		router.g(msg);
		callback(_Scheduler_succeed(_Utils_Tuple0));
	});
});


var _Platform_sendToSelf = F2(function(router, msg)
{
	return A2(_Scheduler_send, router.h, {
		$: 0,
		a: msg
	});
});



// BAGS


function _Platform_leaf(home)
{
	return function(value)
	{
		return {
			$: 1,
			k: home,
			l: value
		};
	};
}


function _Platform_batch(list)
{
	return {
		$: 2,
		m: list
	};
}


var _Platform_map = F2(function(tagger, bag)
{
	return {
		$: 3,
		n: tagger,
		o: bag
	}
});



// PIPE BAGS INTO EFFECT MANAGERS


function _Platform_dispatchEffects(managers, cmdBag, subBag)
{
	var effectsDict = {};
	_Platform_gatherEffects(true, cmdBag, effectsDict, null);
	_Platform_gatherEffects(false, subBag, effectsDict, null);

	for (var home in managers)
	{
		_Scheduler_rawSend(managers[home], {
			$: 'fx',
			a: effectsDict[home] || { i: _List_Nil, j: _List_Nil }
		});
	}
}


function _Platform_gatherEffects(isCmd, bag, effectsDict, taggers)
{
	switch (bag.$)
	{
		case 1:
			var home = bag.k;
			var effect = _Platform_toEffect(isCmd, home, taggers, bag.l);
			effectsDict[home] = _Platform_insert(isCmd, effect, effectsDict[home]);
			return;

		case 2:
			for (var list = bag.m; list.b; list = list.b) // WHILE_CONS
			{
				_Platform_gatherEffects(isCmd, list.a, effectsDict, taggers);
			}
			return;

		case 3:
			_Platform_gatherEffects(isCmd, bag.o, effectsDict, {
				p: bag.n,
				q: taggers
			});
			return;
	}
}


function _Platform_toEffect(isCmd, home, taggers, value)
{
	function applyTaggers(x)
	{
		for (var temp = taggers; temp; temp = temp.q)
		{
			x = temp.p(x);
		}
		return x;
	}

	var map = isCmd
		? _Platform_effectManagers[home].e
		: _Platform_effectManagers[home].f;

	return A2(map, applyTaggers, value)
}


function _Platform_insert(isCmd, newEffect, effects)
{
	effects = effects || { i: _List_Nil, j: _List_Nil };

	isCmd
		? (effects.i = _List_Cons(newEffect, effects.i))
		: (effects.j = _List_Cons(newEffect, effects.j));

	return effects;
}



// PORTS


function _Platform_checkPortName(name)
{
	if (_Platform_effectManagers[name])
	{
		_Debug_crash(3, name)
	}
}



// OUTGOING PORTS


function _Platform_outgoingPort(name, converter)
{
	_Platform_checkPortName(name);
	_Platform_effectManagers[name] = {
		e: _Platform_outgoingPortMap,
		r: converter,
		a: _Platform_setupOutgoingPort
	};
	return _Platform_leaf(name);
}


var _Platform_outgoingPortMap = F2(function(tagger, value) { return value; });


function _Platform_setupOutgoingPort(name)
{
	var subs = [];
	var converter = _Platform_effectManagers[name].r;

	// CREATE MANAGER

	var init = _Process_sleep(0);

	_Platform_effectManagers[name].b = init;
	_Platform_effectManagers[name].c = F3(function(router, cmdList, state)
	{
		for ( ; cmdList.b; cmdList = cmdList.b) // WHILE_CONS
		{
			// grab a separate reference to subs in case unsubscribe is called
			var currentSubs = subs;
			var value = _Json_unwrap(converter(cmdList.a));
			for (var i = 0; i < currentSubs.length; i++)
			{
				currentSubs[i](value);
			}
		}
		return init;
	});

	// PUBLIC API

	function subscribe(callback)
	{
		subs.push(callback);
	}

	function unsubscribe(callback)
	{
		// copy subs into a new array in case unsubscribe is called within a
		// subscribed callback
		subs = subs.slice();
		var index = subs.indexOf(callback);
		if (index >= 0)
		{
			subs.splice(index, 1);
		}
	}

	return {
		subscribe: subscribe,
		unsubscribe: unsubscribe
	};
}



// INCOMING PORTS


function _Platform_incomingPort(name, converter)
{
	_Platform_checkPortName(name);
	_Platform_effectManagers[name] = {
		f: _Platform_incomingPortMap,
		r: converter,
		a: _Platform_setupIncomingPort
	};
	return _Platform_leaf(name);
}


var _Platform_incomingPortMap = F2(function(tagger, finalTagger)
{
	return function(value)
	{
		return tagger(finalTagger(value));
	};
});


function _Platform_setupIncomingPort(name, sendToApp)
{
	var subs = _List_Nil;
	var converter = _Platform_effectManagers[name].r;

	// CREATE MANAGER

	var init = _Scheduler_succeed(null);

	_Platform_effectManagers[name].b = init;
	_Platform_effectManagers[name].c = F3(function(router, subList, state)
	{
		subs = subList;
		return init;
	});

	// PUBLIC API

	function send(incomingValue)
	{
		var result = A2(_Json_run, converter, _Json_wrap(incomingValue));

		elm$core$Result$isOk(result) || _Debug_crash(4, name, result.a);

		var value = result.a;
		for (var temp = subs; temp.b; temp = temp.b) // WHILE_CONS
		{
			sendToApp(temp.a(value));
		}
	}

	return { send: send };
}



// EXPORT ELM MODULES
//
// Have DEBUG and PROD versions so that we can (1) give nicer errors in
// debug mode and (2) not pay for the bits needed for that in prod mode.
//


function _Platform_export_UNUSED(exports)
{
	scope['Elm']
		? _Platform_mergeExportsProd(scope['Elm'], exports)
		: scope['Elm'] = exports;
}


function _Platform_mergeExportsProd(obj, exports)
{
	for (var name in exports)
	{
		(name in obj)
			? (name == 'init')
				? _Debug_crash(6)
				: _Platform_mergeExportsProd(obj[name], exports[name])
			: (obj[name] = exports[name]);
	}
}


function _Platform_export(exports)
{
	scope['Elm']
		? _Platform_mergeExportsDebug('Elm', scope['Elm'], exports)
		: scope['Elm'] = exports;
}


function _Platform_mergeExportsDebug(moduleName, obj, exports)
{
	for (var name in exports)
	{
		(name in obj)
			? (name == 'init')
				? _Debug_crash(6, moduleName)
				: _Platform_mergeExportsDebug(moduleName + '.' + name, obj[name], exports[name])
			: (obj[name] = exports[name]);
	}
}



var _Bitwise_and = F2(function(a, b)
{
	return a & b;
});

var _Bitwise_or = F2(function(a, b)
{
	return a | b;
});

var _Bitwise_xor = F2(function(a, b)
{
	return a ^ b;
});

function _Bitwise_complement(a)
{
	return ~a;
};

var _Bitwise_shiftLeftBy = F2(function(offset, a)
{
	return a << offset;
});

var _Bitwise_shiftRightBy = F2(function(offset, a)
{
	return a >> offset;
});

var _Bitwise_shiftRightZfBy = F2(function(offset, a)
{
	return a >>> offset;
});



function _Time_now(millisToPosix)
{
	return _Scheduler_binding(function(callback)
	{
		callback(_Scheduler_succeed(millisToPosix(Date.now())));
	});
}

var _Time_setInterval = F2(function(interval, task)
{
	return _Scheduler_binding(function(callback)
	{
		var id = setInterval(function() { _Scheduler_rawSpawn(task); }, interval);
		return function() { clearInterval(id); };
	});
});

function _Time_here()
{
	return _Scheduler_binding(function(callback)
	{
		callback(_Scheduler_succeed(
			A2(elm$time$Time$customZone, -(new Date().getTimezoneOffset()), _List_Nil)
		));
	});
}


function _Time_getZoneName()
{
	return _Scheduler_binding(function(callback)
	{
		try
		{
			var name = elm$time$Time$Name(Intl.DateTimeFormat().resolvedOptions().timeZone);
		}
		catch (e)
		{
			var name = elm$time$Time$Offset(new Date().getTimezoneOffset());
		}
		callback(_Scheduler_succeed(name));
	});
}




// HELPERS


var _VirtualDom_divertHrefToApp;

var _VirtualDom_doc = typeof document !== 'undefined' ? document : {};


function _VirtualDom_appendChild(parent, child)
{
	parent.appendChild(child);
}

var _VirtualDom_init = F4(function(virtualNode, flagDecoder, debugMetadata, args)
{
	// NOTE: this function needs _Platform_export available to work

	/**_UNUSED/
	var node = args['node'];
	//*/
	/**/
	var node = args && args['node'] ? args['node'] : _Debug_crash(0);
	//*/

	node.parentNode.replaceChild(
		_VirtualDom_render(virtualNode, function() {}),
		node
	);

	return {};
});



// TEXT


function _VirtualDom_text(string)
{
	return {
		$: 0,
		a: string
	};
}



// NODE


var _VirtualDom_nodeNS = F2(function(namespace, tag)
{
	return F2(function(factList, kidList)
	{
		for (var kids = [], descendantsCount = 0; kidList.b; kidList = kidList.b) // WHILE_CONS
		{
			var kid = kidList.a;
			descendantsCount += (kid.b || 0);
			kids.push(kid);
		}
		descendantsCount += kids.length;

		return {
			$: 1,
			c: tag,
			d: _VirtualDom_organizeFacts(factList),
			e: kids,
			f: namespace,
			b: descendantsCount
		};
	});
});


var _VirtualDom_node = _VirtualDom_nodeNS(undefined);



// KEYED NODE


var _VirtualDom_keyedNodeNS = F2(function(namespace, tag)
{
	return F2(function(factList, kidList)
	{
		for (var kids = [], descendantsCount = 0; kidList.b; kidList = kidList.b) // WHILE_CONS
		{
			var kid = kidList.a;
			descendantsCount += (kid.b.b || 0);
			kids.push(kid);
		}
		descendantsCount += kids.length;

		return {
			$: 2,
			c: tag,
			d: _VirtualDom_organizeFacts(factList),
			e: kids,
			f: namespace,
			b: descendantsCount
		};
	});
});


var _VirtualDom_keyedNode = _VirtualDom_keyedNodeNS(undefined);



// CUSTOM


function _VirtualDom_custom(factList, model, render, diff)
{
	return {
		$: 3,
		d: _VirtualDom_organizeFacts(factList),
		g: model,
		h: render,
		i: diff
	};
}



// MAP


var _VirtualDom_map = F2(function(tagger, node)
{
	return {
		$: 4,
		j: tagger,
		k: node,
		b: 1 + (node.b || 0)
	};
});



// LAZY


function _VirtualDom_thunk(refs, thunk)
{
	return {
		$: 5,
		l: refs,
		m: thunk,
		k: undefined
	};
}

var _VirtualDom_lazy = F2(function(func, a)
{
	return _VirtualDom_thunk([func, a], function() {
		return func(a);
	});
});

var _VirtualDom_lazy2 = F3(function(func, a, b)
{
	return _VirtualDom_thunk([func, a, b], function() {
		return A2(func, a, b);
	});
});

var _VirtualDom_lazy3 = F4(function(func, a, b, c)
{
	return _VirtualDom_thunk([func, a, b, c], function() {
		return A3(func, a, b, c);
	});
});

var _VirtualDom_lazy4 = F5(function(func, a, b, c, d)
{
	return _VirtualDom_thunk([func, a, b, c, d], function() {
		return A4(func, a, b, c, d);
	});
});

var _VirtualDom_lazy5 = F6(function(func, a, b, c, d, e)
{
	return _VirtualDom_thunk([func, a, b, c, d, e], function() {
		return A5(func, a, b, c, d, e);
	});
});

var _VirtualDom_lazy6 = F7(function(func, a, b, c, d, e, f)
{
	return _VirtualDom_thunk([func, a, b, c, d, e, f], function() {
		return A6(func, a, b, c, d, e, f);
	});
});

var _VirtualDom_lazy7 = F8(function(func, a, b, c, d, e, f, g)
{
	return _VirtualDom_thunk([func, a, b, c, d, e, f, g], function() {
		return A7(func, a, b, c, d, e, f, g);
	});
});

var _VirtualDom_lazy8 = F9(function(func, a, b, c, d, e, f, g, h)
{
	return _VirtualDom_thunk([func, a, b, c, d, e, f, g, h], function() {
		return A8(func, a, b, c, d, e, f, g, h);
	});
});



// FACTS


var _VirtualDom_on = F2(function(key, handler)
{
	return {
		$: 'a0',
		n: key,
		o: handler
	};
});
var _VirtualDom_style = F2(function(key, value)
{
	return {
		$: 'a1',
		n: key,
		o: value
	};
});
var _VirtualDom_property = F2(function(key, value)
{
	return {
		$: 'a2',
		n: key,
		o: value
	};
});
var _VirtualDom_attribute = F2(function(key, value)
{
	return {
		$: 'a3',
		n: key,
		o: value
	};
});
var _VirtualDom_attributeNS = F3(function(namespace, key, value)
{
	return {
		$: 'a4',
		n: key,
		o: { f: namespace, o: value }
	};
});



// XSS ATTACK VECTOR CHECKS


function _VirtualDom_noScript(tag)
{
	return tag == 'script' ? 'p' : tag;
}

function _VirtualDom_noOnOrFormAction(key)
{
	return /^(on|formAction$)/i.test(key) ? 'data-' + key : key;
}

function _VirtualDom_noInnerHtmlOrFormAction(key)
{
	return key == 'innerHTML' || key == 'formAction' ? 'data-' + key : key;
}

function _VirtualDom_noJavaScriptUri_UNUSED(value)
{
	return /^javascript:/i.test(value.replace(/\s/g,'')) ? '' : value;
}

function _VirtualDom_noJavaScriptUri(value)
{
	return /^javascript:/i.test(value.replace(/\s/g,''))
		? 'javascript:alert("This is an XSS vector. Please use ports or web components instead.")'
		: value;
}

function _VirtualDom_noJavaScriptOrHtmlUri_UNUSED(value)
{
	return /^\s*(javascript:|data:text\/html)/i.test(value) ? '' : value;
}

function _VirtualDom_noJavaScriptOrHtmlUri(value)
{
	return /^\s*(javascript:|data:text\/html)/i.test(value)
		? 'javascript:alert("This is an XSS vector. Please use ports or web components instead.")'
		: value;
}



// MAP FACTS


var _VirtualDom_mapAttribute = F2(function(func, attr)
{
	return (attr.$ === 'a0')
		? A2(_VirtualDom_on, attr.n, _VirtualDom_mapHandler(func, attr.o))
		: attr;
});

function _VirtualDom_mapHandler(func, handler)
{
	var tag = elm$virtual_dom$VirtualDom$toHandlerInt(handler);

	// 0 = Normal
	// 1 = MayStopPropagation
	// 2 = MayPreventDefault
	// 3 = Custom

	return {
		$: handler.$,
		a:
			!tag
				? A2(elm$json$Json$Decode$map, func, handler.a)
				:
			A3(elm$json$Json$Decode$map2,
				tag < 3
					? _VirtualDom_mapEventTuple
					: _VirtualDom_mapEventRecord,
				elm$json$Json$Decode$succeed(func),
				handler.a
			)
	};
}

var _VirtualDom_mapEventTuple = F2(function(func, tuple)
{
	return _Utils_Tuple2(func(tuple.a), tuple.b);
});

var _VirtualDom_mapEventRecord = F2(function(func, record)
{
	return {
		message: func(record.message),
		stopPropagation: record.stopPropagation,
		preventDefault: record.preventDefault
	}
});



// ORGANIZE FACTS


function _VirtualDom_organizeFacts(factList)
{
	for (var facts = {}; factList.b; factList = factList.b) // WHILE_CONS
	{
		var entry = factList.a;

		var tag = entry.$;
		var key = entry.n;
		var value = entry.o;

		if (tag === 'a2')
		{
			(key === 'className')
				? _VirtualDom_addClass(facts, key, _Json_unwrap(value))
				: facts[key] = _Json_unwrap(value);

			continue;
		}

		var subFacts = facts[tag] || (facts[tag] = {});
		(tag === 'a3' && key === 'class')
			? _VirtualDom_addClass(subFacts, key, value)
			: subFacts[key] = value;
	}

	return facts;
}

function _VirtualDom_addClass(object, key, newClass)
{
	var classes = object[key];
	object[key] = classes ? classes + ' ' + newClass : newClass;
}



// RENDER


function _VirtualDom_render(vNode, eventNode)
{
	var tag = vNode.$;

	if (tag === 5)
	{
		return _VirtualDom_render(vNode.k || (vNode.k = vNode.m()), eventNode);
	}

	if (tag === 0)
	{
		return _VirtualDom_doc.createTextNode(vNode.a);
	}

	if (tag === 4)
	{
		var subNode = vNode.k;
		var tagger = vNode.j;

		while (subNode.$ === 4)
		{
			typeof tagger !== 'object'
				? tagger = [tagger, subNode.j]
				: tagger.push(subNode.j);

			subNode = subNode.k;
		}

		var subEventRoot = { j: tagger, p: eventNode };
		var domNode = _VirtualDom_render(subNode, subEventRoot);
		domNode.elm_event_node_ref = subEventRoot;
		return domNode;
	}

	if (tag === 3)
	{
		var domNode = vNode.h(vNode.g);
		_VirtualDom_applyFacts(domNode, eventNode, vNode.d);
		return domNode;
	}

	// at this point `tag` must be 1 or 2

	var domNode = vNode.f
		? _VirtualDom_doc.createElementNS(vNode.f, vNode.c)
		: _VirtualDom_doc.createElement(vNode.c);

	if (_VirtualDom_divertHrefToApp && vNode.c == 'a')
	{
		domNode.addEventListener('click', _VirtualDom_divertHrefToApp(domNode));
	}

	_VirtualDom_applyFacts(domNode, eventNode, vNode.d);

	for (var kids = vNode.e, i = 0; i < kids.length; i++)
	{
		_VirtualDom_appendChild(domNode, _VirtualDom_render(tag === 1 ? kids[i] : kids[i].b, eventNode));
	}

	return domNode;
}



// APPLY FACTS


function _VirtualDom_applyFacts(domNode, eventNode, facts)
{
	for (var key in facts)
	{
		var value = facts[key];

		key === 'a1'
			? _VirtualDom_applyStyles(domNode, value)
			:
		key === 'a0'
			? _VirtualDom_applyEvents(domNode, eventNode, value)
			:
		key === 'a3'
			? _VirtualDom_applyAttrs(domNode, value)
			:
		key === 'a4'
			? _VirtualDom_applyAttrsNS(domNode, value)
			:
		((key !== 'value' && key !== 'checked') || domNode[key] !== value) && (domNode[key] = value);
	}
}



// APPLY STYLES


function _VirtualDom_applyStyles(domNode, styles)
{
	var domNodeStyle = domNode.style;

	for (var key in styles)
	{
		domNodeStyle[key] = styles[key];
	}
}



// APPLY ATTRS


function _VirtualDom_applyAttrs(domNode, attrs)
{
	for (var key in attrs)
	{
		var value = attrs[key];
		typeof value !== 'undefined'
			? domNode.setAttribute(key, value)
			: domNode.removeAttribute(key);
	}
}



// APPLY NAMESPACED ATTRS


function _VirtualDom_applyAttrsNS(domNode, nsAttrs)
{
	for (var key in nsAttrs)
	{
		var pair = nsAttrs[key];
		var namespace = pair.f;
		var value = pair.o;

		typeof value !== 'undefined'
			? domNode.setAttributeNS(namespace, key, value)
			: domNode.removeAttributeNS(namespace, key);
	}
}



// APPLY EVENTS


function _VirtualDom_applyEvents(domNode, eventNode, events)
{
	var allCallbacks = domNode.elmFs || (domNode.elmFs = {});

	for (var key in events)
	{
		var newHandler = events[key];
		var oldCallback = allCallbacks[key];

		if (!newHandler)
		{
			domNode.removeEventListener(key, oldCallback);
			allCallbacks[key] = undefined;
			continue;
		}

		if (oldCallback)
		{
			var oldHandler = oldCallback.q;
			if (oldHandler.$ === newHandler.$)
			{
				oldCallback.q = newHandler;
				continue;
			}
			domNode.removeEventListener(key, oldCallback);
		}

		oldCallback = _VirtualDom_makeCallback(eventNode, newHandler);
		domNode.addEventListener(key, oldCallback,
			_VirtualDom_passiveSupported
			&& { passive: elm$virtual_dom$VirtualDom$toHandlerInt(newHandler) < 2 }
		);
		allCallbacks[key] = oldCallback;
	}
}



// PASSIVE EVENTS


var _VirtualDom_passiveSupported;

try
{
	window.addEventListener('t', null, Object.defineProperty({}, 'passive', {
		get: function() { _VirtualDom_passiveSupported = true; }
	}));
}
catch(e) {}



// EVENT HANDLERS


function _VirtualDom_makeCallback(eventNode, initialHandler)
{
	function callback(event)
	{
		var handler = callback.q;
		var result = _Json_runHelp(handler.a, event);

		if (!elm$core$Result$isOk(result))
		{
			return;
		}

		var tag = elm$virtual_dom$VirtualDom$toHandlerInt(handler);

		// 0 = Normal
		// 1 = MayStopPropagation
		// 2 = MayPreventDefault
		// 3 = Custom

		var value = result.a;
		var message = !tag ? value : tag < 3 ? value.a : value.message;
		var stopPropagation = tag == 1 ? value.b : tag == 3 && value.stopPropagation;
		var currentEventNode = (
			stopPropagation && event.stopPropagation(),
			(tag == 2 ? value.b : tag == 3 && value.preventDefault) && event.preventDefault(),
			eventNode
		);
		var tagger;
		var i;
		while (tagger = currentEventNode.j)
		{
			if (typeof tagger == 'function')
			{
				message = tagger(message);
			}
			else
			{
				for (var i = tagger.length; i--; )
				{
					message = tagger[i](message);
				}
			}
			currentEventNode = currentEventNode.p;
		}
		currentEventNode(message, stopPropagation); // stopPropagation implies isSync
	}

	callback.q = initialHandler;

	return callback;
}

function _VirtualDom_equalEvents(x, y)
{
	return x.$ == y.$ && _Json_equality(x.a, y.a);
}



// DIFF


// TODO: Should we do patches like in iOS?
//
// type Patch
//   = At Int Patch
//   | Batch (List Patch)
//   | Change ...
//
// How could it not be better?
//
function _VirtualDom_diff(x, y)
{
	var patches = [];
	_VirtualDom_diffHelp(x, y, patches, 0);
	return patches;
}


function _VirtualDom_pushPatch(patches, type, index, data)
{
	var patch = {
		$: type,
		r: index,
		s: data,
		t: undefined,
		u: undefined
	};
	patches.push(patch);
	return patch;
}


function _VirtualDom_diffHelp(x, y, patches, index)
{
	if (x === y)
	{
		return;
	}

	var xType = x.$;
	var yType = y.$;

	// Bail if you run into different types of nodes. Implies that the
	// structure has changed significantly and it's not worth a diff.
	if (xType !== yType)
	{
		if (xType === 1 && yType === 2)
		{
			y = _VirtualDom_dekey(y);
			yType = 1;
		}
		else
		{
			_VirtualDom_pushPatch(patches, 0, index, y);
			return;
		}
	}

	// Now we know that both nodes are the same $.
	switch (yType)
	{
		case 5:
			var xRefs = x.l;
			var yRefs = y.l;
			var i = xRefs.length;
			var same = i === yRefs.length;
			while (same && i--)
			{
				same = xRefs[i] === yRefs[i];
			}
			if (same)
			{
				y.k = x.k;
				return;
			}
			y.k = y.m();
			var subPatches = [];
			_VirtualDom_diffHelp(x.k, y.k, subPatches, 0);
			subPatches.length > 0 && _VirtualDom_pushPatch(patches, 1, index, subPatches);
			return;

		case 4:
			// gather nested taggers
			var xTaggers = x.j;
			var yTaggers = y.j;
			var nesting = false;

			var xSubNode = x.k;
			while (xSubNode.$ === 4)
			{
				nesting = true;

				typeof xTaggers !== 'object'
					? xTaggers = [xTaggers, xSubNode.j]
					: xTaggers.push(xSubNode.j);

				xSubNode = xSubNode.k;
			}

			var ySubNode = y.k;
			while (ySubNode.$ === 4)
			{
				nesting = true;

				typeof yTaggers !== 'object'
					? yTaggers = [yTaggers, ySubNode.j]
					: yTaggers.push(ySubNode.j);

				ySubNode = ySubNode.k;
			}

			// Just bail if different numbers of taggers. This implies the
			// structure of the virtual DOM has changed.
			if (nesting && xTaggers.length !== yTaggers.length)
			{
				_VirtualDom_pushPatch(patches, 0, index, y);
				return;
			}

			// check if taggers are "the same"
			if (nesting ? !_VirtualDom_pairwiseRefEqual(xTaggers, yTaggers) : xTaggers !== yTaggers)
			{
				_VirtualDom_pushPatch(patches, 2, index, yTaggers);
			}

			// diff everything below the taggers
			_VirtualDom_diffHelp(xSubNode, ySubNode, patches, index + 1);
			return;

		case 0:
			if (x.a !== y.a)
			{
				_VirtualDom_pushPatch(patches, 3, index, y.a);
			}
			return;

		case 1:
			_VirtualDom_diffNodes(x, y, patches, index, _VirtualDom_diffKids);
			return;

		case 2:
			_VirtualDom_diffNodes(x, y, patches, index, _VirtualDom_diffKeyedKids);
			return;

		case 3:
			if (x.h !== y.h)
			{
				_VirtualDom_pushPatch(patches, 0, index, y);
				return;
			}

			var factsDiff = _VirtualDom_diffFacts(x.d, y.d);
			factsDiff && _VirtualDom_pushPatch(patches, 4, index, factsDiff);

			var patch = y.i(x.g, y.g);
			patch && _VirtualDom_pushPatch(patches, 5, index, patch);

			return;
	}
}

// assumes the incoming arrays are the same length
function _VirtualDom_pairwiseRefEqual(as, bs)
{
	for (var i = 0; i < as.length; i++)
	{
		if (as[i] !== bs[i])
		{
			return false;
		}
	}

	return true;
}

function _VirtualDom_diffNodes(x, y, patches, index, diffKids)
{
	// Bail if obvious indicators have changed. Implies more serious
	// structural changes such that it's not worth it to diff.
	if (x.c !== y.c || x.f !== y.f)
	{
		_VirtualDom_pushPatch(patches, 0, index, y);
		return;
	}

	var factsDiff = _VirtualDom_diffFacts(x.d, y.d);
	factsDiff && _VirtualDom_pushPatch(patches, 4, index, factsDiff);

	diffKids(x, y, patches, index);
}



// DIFF FACTS


// TODO Instead of creating a new diff object, it's possible to just test if
// there *is* a diff. During the actual patch, do the diff again and make the
// modifications directly. This way, there's no new allocations. Worth it?
function _VirtualDom_diffFacts(x, y, category)
{
	var diff;

	// look for changes and removals
	for (var xKey in x)
	{
		if (xKey === 'a1' || xKey === 'a0' || xKey === 'a3' || xKey === 'a4')
		{
			var subDiff = _VirtualDom_diffFacts(x[xKey], y[xKey] || {}, xKey);
			if (subDiff)
			{
				diff = diff || {};
				diff[xKey] = subDiff;
			}
			continue;
		}

		// remove if not in the new facts
		if (!(xKey in y))
		{
			diff = diff || {};
			diff[xKey] =
				!category
					? (typeof x[xKey] === 'string' ? '' : null)
					:
				(category === 'a1')
					? ''
					:
				(category === 'a0' || category === 'a3')
					? undefined
					:
				{ f: x[xKey].f, o: undefined };

			continue;
		}

		var xValue = x[xKey];
		var yValue = y[xKey];

		// reference equal, so don't worry about it
		if (xValue === yValue && xKey !== 'value' && xKey !== 'checked'
			|| category === 'a0' && _VirtualDom_equalEvents(xValue, yValue))
		{
			continue;
		}

		diff = diff || {};
		diff[xKey] = yValue;
	}

	// add new stuff
	for (var yKey in y)
	{
		if (!(yKey in x))
		{
			diff = diff || {};
			diff[yKey] = y[yKey];
		}
	}

	return diff;
}



// DIFF KIDS


function _VirtualDom_diffKids(xParent, yParent, patches, index)
{
	var xKids = xParent.e;
	var yKids = yParent.e;

	var xLen = xKids.length;
	var yLen = yKids.length;

	// FIGURE OUT IF THERE ARE INSERTS OR REMOVALS

	if (xLen > yLen)
	{
		_VirtualDom_pushPatch(patches, 6, index, {
			v: yLen,
			i: xLen - yLen
		});
	}
	else if (xLen < yLen)
	{
		_VirtualDom_pushPatch(patches, 7, index, {
			v: xLen,
			e: yKids
		});
	}

	// PAIRWISE DIFF EVERYTHING ELSE

	for (var minLen = xLen < yLen ? xLen : yLen, i = 0; i < minLen; i++)
	{
		var xKid = xKids[i];
		_VirtualDom_diffHelp(xKid, yKids[i], patches, ++index);
		index += xKid.b || 0;
	}
}



// KEYED DIFF


function _VirtualDom_diffKeyedKids(xParent, yParent, patches, rootIndex)
{
	var localPatches = [];

	var changes = {}; // Dict String Entry
	var inserts = []; // Array { index : Int, entry : Entry }
	// type Entry = { tag : String, vnode : VNode, index : Int, data : _ }

	var xKids = xParent.e;
	var yKids = yParent.e;
	var xLen = xKids.length;
	var yLen = yKids.length;
	var xIndex = 0;
	var yIndex = 0;

	var index = rootIndex;

	while (xIndex < xLen && yIndex < yLen)
	{
		var x = xKids[xIndex];
		var y = yKids[yIndex];

		var xKey = x.a;
		var yKey = y.a;
		var xNode = x.b;
		var yNode = y.b;

		var newMatch = undefined;
		var oldMatch = undefined;

		// check if keys match

		if (xKey === yKey)
		{
			index++;
			_VirtualDom_diffHelp(xNode, yNode, localPatches, index);
			index += xNode.b || 0;

			xIndex++;
			yIndex++;
			continue;
		}

		// look ahead 1 to detect insertions and removals.

		var xNext = xKids[xIndex + 1];
		var yNext = yKids[yIndex + 1];

		if (xNext)
		{
			var xNextKey = xNext.a;
			var xNextNode = xNext.b;
			oldMatch = yKey === xNextKey;
		}

		if (yNext)
		{
			var yNextKey = yNext.a;
			var yNextNode = yNext.b;
			newMatch = xKey === yNextKey;
		}


		// swap x and y
		if (newMatch && oldMatch)
		{
			index++;
			_VirtualDom_diffHelp(xNode, yNextNode, localPatches, index);
			_VirtualDom_insertNode(changes, localPatches, xKey, yNode, yIndex, inserts);
			index += xNode.b || 0;

			index++;
			_VirtualDom_removeNode(changes, localPatches, xKey, xNextNode, index);
			index += xNextNode.b || 0;

			xIndex += 2;
			yIndex += 2;
			continue;
		}

		// insert y
		if (newMatch)
		{
			index++;
			_VirtualDom_insertNode(changes, localPatches, yKey, yNode, yIndex, inserts);
			_VirtualDom_diffHelp(xNode, yNextNode, localPatches, index);
			index += xNode.b || 0;

			xIndex += 1;
			yIndex += 2;
			continue;
		}

		// remove x
		if (oldMatch)
		{
			index++;
			_VirtualDom_removeNode(changes, localPatches, xKey, xNode, index);
			index += xNode.b || 0;

			index++;
			_VirtualDom_diffHelp(xNextNode, yNode, localPatches, index);
			index += xNextNode.b || 0;

			xIndex += 2;
			yIndex += 1;
			continue;
		}

		// remove x, insert y
		if (xNext && xNextKey === yNextKey)
		{
			index++;
			_VirtualDom_removeNode(changes, localPatches, xKey, xNode, index);
			_VirtualDom_insertNode(changes, localPatches, yKey, yNode, yIndex, inserts);
			index += xNode.b || 0;

			index++;
			_VirtualDom_diffHelp(xNextNode, yNextNode, localPatches, index);
			index += xNextNode.b || 0;

			xIndex += 2;
			yIndex += 2;
			continue;
		}

		break;
	}

	// eat up any remaining nodes with removeNode and insertNode

	while (xIndex < xLen)
	{
		index++;
		var x = xKids[xIndex];
		var xNode = x.b;
		_VirtualDom_removeNode(changes, localPatches, x.a, xNode, index);
		index += xNode.b || 0;
		xIndex++;
	}

	while (yIndex < yLen)
	{
		var endInserts = endInserts || [];
		var y = yKids[yIndex];
		_VirtualDom_insertNode(changes, localPatches, y.a, y.b, undefined, endInserts);
		yIndex++;
	}

	if (localPatches.length > 0 || inserts.length > 0 || endInserts)
	{
		_VirtualDom_pushPatch(patches, 8, rootIndex, {
			w: localPatches,
			x: inserts,
			y: endInserts
		});
	}
}



// CHANGES FROM KEYED DIFF


var _VirtualDom_POSTFIX = '_elmW6BL';


function _VirtualDom_insertNode(changes, localPatches, key, vnode, yIndex, inserts)
{
	var entry = changes[key];

	// never seen this key before
	if (!entry)
	{
		entry = {
			c: 0,
			z: vnode,
			r: yIndex,
			s: undefined
		};

		inserts.push({ r: yIndex, A: entry });
		changes[key] = entry;

		return;
	}

	// this key was removed earlier, a match!
	if (entry.c === 1)
	{
		inserts.push({ r: yIndex, A: entry });

		entry.c = 2;
		var subPatches = [];
		_VirtualDom_diffHelp(entry.z, vnode, subPatches, entry.r);
		entry.r = yIndex;
		entry.s.s = {
			w: subPatches,
			A: entry
		};

		return;
	}

	// this key has already been inserted or moved, a duplicate!
	_VirtualDom_insertNode(changes, localPatches, key + _VirtualDom_POSTFIX, vnode, yIndex, inserts);
}


function _VirtualDom_removeNode(changes, localPatches, key, vnode, index)
{
	var entry = changes[key];

	// never seen this key before
	if (!entry)
	{
		var patch = _VirtualDom_pushPatch(localPatches, 9, index, undefined);

		changes[key] = {
			c: 1,
			z: vnode,
			r: index,
			s: patch
		};

		return;
	}

	// this key was inserted earlier, a match!
	if (entry.c === 0)
	{
		entry.c = 2;
		var subPatches = [];
		_VirtualDom_diffHelp(vnode, entry.z, subPatches, index);

		_VirtualDom_pushPatch(localPatches, 9, index, {
			w: subPatches,
			A: entry
		});

		return;
	}

	// this key has already been removed or moved, a duplicate!
	_VirtualDom_removeNode(changes, localPatches, key + _VirtualDom_POSTFIX, vnode, index);
}



// ADD DOM NODES
//
// Each DOM node has an "index" assigned in order of traversal. It is important
// to minimize our crawl over the actual DOM, so these indexes (along with the
// descendantsCount of virtual nodes) let us skip touching entire subtrees of
// the DOM if we know there are no patches there.


function _VirtualDom_addDomNodes(domNode, vNode, patches, eventNode)
{
	_VirtualDom_addDomNodesHelp(domNode, vNode, patches, 0, 0, vNode.b, eventNode);
}


// assumes `patches` is non-empty and indexes increase monotonically.
function _VirtualDom_addDomNodesHelp(domNode, vNode, patches, i, low, high, eventNode)
{
	var patch = patches[i];
	var index = patch.r;

	while (index === low)
	{
		var patchType = patch.$;

		if (patchType === 1)
		{
			_VirtualDom_addDomNodes(domNode, vNode.k, patch.s, eventNode);
		}
		else if (patchType === 8)
		{
			patch.t = domNode;
			patch.u = eventNode;

			var subPatches = patch.s.w;
			if (subPatches.length > 0)
			{
				_VirtualDom_addDomNodesHelp(domNode, vNode, subPatches, 0, low, high, eventNode);
			}
		}
		else if (patchType === 9)
		{
			patch.t = domNode;
			patch.u = eventNode;

			var data = patch.s;
			if (data)
			{
				data.A.s = domNode;
				var subPatches = data.w;
				if (subPatches.length > 0)
				{
					_VirtualDom_addDomNodesHelp(domNode, vNode, subPatches, 0, low, high, eventNode);
				}
			}
		}
		else
		{
			patch.t = domNode;
			patch.u = eventNode;
		}

		i++;

		if (!(patch = patches[i]) || (index = patch.r) > high)
		{
			return i;
		}
	}

	var tag = vNode.$;

	if (tag === 4)
	{
		var subNode = vNode.k;

		while (subNode.$ === 4)
		{
			subNode = subNode.k;
		}

		return _VirtualDom_addDomNodesHelp(domNode, subNode, patches, i, low + 1, high, domNode.elm_event_node_ref);
	}

	// tag must be 1 or 2 at this point

	var vKids = vNode.e;
	var childNodes = domNode.childNodes;
	for (var j = 0; j < vKids.length; j++)
	{
		low++;
		var vKid = tag === 1 ? vKids[j] : vKids[j].b;
		var nextLow = low + (vKid.b || 0);
		if (low <= index && index <= nextLow)
		{
			i = _VirtualDom_addDomNodesHelp(childNodes[j], vKid, patches, i, low, nextLow, eventNode);
			if (!(patch = patches[i]) || (index = patch.r) > high)
			{
				return i;
			}
		}
		low = nextLow;
	}
	return i;
}



// APPLY PATCHES


function _VirtualDom_applyPatches(rootDomNode, oldVirtualNode, patches, eventNode)
{
	if (patches.length === 0)
	{
		return rootDomNode;
	}

	_VirtualDom_addDomNodes(rootDomNode, oldVirtualNode, patches, eventNode);
	return _VirtualDom_applyPatchesHelp(rootDomNode, patches);
}

function _VirtualDom_applyPatchesHelp(rootDomNode, patches)
{
	for (var i = 0; i < patches.length; i++)
	{
		var patch = patches[i];
		var localDomNode = patch.t
		var newNode = _VirtualDom_applyPatch(localDomNode, patch);
		if (localDomNode === rootDomNode)
		{
			rootDomNode = newNode;
		}
	}
	return rootDomNode;
}

function _VirtualDom_applyPatch(domNode, patch)
{
	switch (patch.$)
	{
		case 0:
			return _VirtualDom_applyPatchRedraw(domNode, patch.s, patch.u);

		case 4:
			_VirtualDom_applyFacts(domNode, patch.u, patch.s);
			return domNode;

		case 3:
			domNode.replaceData(0, domNode.length, patch.s);
			return domNode;

		case 1:
			return _VirtualDom_applyPatchesHelp(domNode, patch.s);

		case 2:
			if (domNode.elm_event_node_ref)
			{
				domNode.elm_event_node_ref.j = patch.s;
			}
			else
			{
				domNode.elm_event_node_ref = { j: patch.s, p: patch.u };
			}
			return domNode;

		case 6:
			var data = patch.s;
			for (var i = 0; i < data.i; i++)
			{
				domNode.removeChild(domNode.childNodes[data.v]);
			}
			return domNode;

		case 7:
			var data = patch.s;
			var kids = data.e;
			var i = data.v;
			var theEnd = domNode.childNodes[i];
			for (; i < kids.length; i++)
			{
				domNode.insertBefore(_VirtualDom_render(kids[i], patch.u), theEnd);
			}
			return domNode;

		case 9:
			var data = patch.s;
			if (!data)
			{
				domNode.parentNode.removeChild(domNode);
				return domNode;
			}
			var entry = data.A;
			if (typeof entry.r !== 'undefined')
			{
				domNode.parentNode.removeChild(domNode);
			}
			entry.s = _VirtualDom_applyPatchesHelp(domNode, data.w);
			return domNode;

		case 8:
			return _VirtualDom_applyPatchReorder(domNode, patch);

		case 5:
			return patch.s(domNode);

		default:
			_Debug_crash(10); // 'Ran into an unknown patch!'
	}
}


function _VirtualDom_applyPatchRedraw(domNode, vNode, eventNode)
{
	var parentNode = domNode.parentNode;
	var newNode = _VirtualDom_render(vNode, eventNode);

	if (!newNode.elm_event_node_ref)
	{
		newNode.elm_event_node_ref = domNode.elm_event_node_ref;
	}

	if (parentNode && newNode !== domNode)
	{
		parentNode.replaceChild(newNode, domNode);
	}
	return newNode;
}


function _VirtualDom_applyPatchReorder(domNode, patch)
{
	var data = patch.s;

	// remove end inserts
	var frag = _VirtualDom_applyPatchReorderEndInsertsHelp(data.y, patch);

	// removals
	domNode = _VirtualDom_applyPatchesHelp(domNode, data.w);

	// inserts
	var inserts = data.x;
	for (var i = 0; i < inserts.length; i++)
	{
		var insert = inserts[i];
		var entry = insert.A;
		var node = entry.c === 2
			? entry.s
			: _VirtualDom_render(entry.z, patch.u);
		domNode.insertBefore(node, domNode.childNodes[insert.r]);
	}

	// add end inserts
	if (frag)
	{
		_VirtualDom_appendChild(domNode, frag);
	}

	return domNode;
}


function _VirtualDom_applyPatchReorderEndInsertsHelp(endInserts, patch)
{
	if (!endInserts)
	{
		return;
	}

	var frag = _VirtualDom_doc.createDocumentFragment();
	for (var i = 0; i < endInserts.length; i++)
	{
		var insert = endInserts[i];
		var entry = insert.A;
		_VirtualDom_appendChild(frag, entry.c === 2
			? entry.s
			: _VirtualDom_render(entry.z, patch.u)
		);
	}
	return frag;
}


function _VirtualDom_virtualize(node)
{
	// TEXT NODES

	if (node.nodeType === 3)
	{
		return _VirtualDom_text(node.textContent);
	}


	// WEIRD NODES

	if (node.nodeType !== 1)
	{
		return _VirtualDom_text('');
	}


	// ELEMENT NODES

	var attrList = _List_Nil;
	var attrs = node.attributes;
	for (var i = attrs.length; i--; )
	{
		var attr = attrs[i];
		var name = attr.name;
		var value = attr.value;
		attrList = _List_Cons( A2(_VirtualDom_attribute, name, value), attrList );
	}

	var tag = node.tagName.toLowerCase();
	var kidList = _List_Nil;
	var kids = node.childNodes;

	for (var i = kids.length; i--; )
	{
		kidList = _List_Cons(_VirtualDom_virtualize(kids[i]), kidList);
	}
	return A3(_VirtualDom_node, tag, attrList, kidList);
}

function _VirtualDom_dekey(keyedNode)
{
	var keyedKids = keyedNode.e;
	var len = keyedKids.length;
	var kids = new Array(len);
	for (var i = 0; i < len; i++)
	{
		kids[i] = keyedKids[i].b;
	}

	return {
		$: 1,
		c: keyedNode.c,
		d: keyedNode.d,
		e: kids,
		f: keyedNode.f,
		b: keyedNode.b
	};
}


// CREATE

var _Regex_never = /.^/;

var _Regex_fromStringWith = F2(function(options, string)
{
	var flags = 'g';
	if (options.multiline) { flags += 'm'; }
	if (options.caseInsensitive) { flags += 'i'; }

	try
	{
		return elm$core$Maybe$Just(new RegExp(string, flags));
	}
	catch(error)
	{
		return elm$core$Maybe$Nothing;
	}
});


// USE

var _Regex_contains = F2(function(re, string)
{
	return string.match(re) !== null;
});


var _Regex_findAtMost = F3(function(n, re, str)
{
	var out = [];
	var number = 0;
	var string = str;
	var lastIndex = re.lastIndex;
	var prevLastIndex = -1;
	var result;
	while (number++ < n && (result = re.exec(string)))
	{
		if (prevLastIndex == re.lastIndex) break;
		var i = result.length - 1;
		var subs = new Array(i);
		while (i > 0)
		{
			var submatch = result[i];
			subs[--i] = submatch
				? elm$core$Maybe$Just(submatch)
				: elm$core$Maybe$Nothing;
		}
		out.push(A4(elm$regex$Regex$Match, result[0], result.index, number, _List_fromArray(subs)));
		prevLastIndex = re.lastIndex;
	}
	re.lastIndex = lastIndex;
	return _List_fromArray(out);
});


var _Regex_replaceAtMost = F4(function(n, re, replacer, string)
{
	var count = 0;
	function jsReplacer(match)
	{
		if (count++ >= n)
		{
			return match;
		}
		var i = arguments.length - 3;
		var submatches = new Array(i);
		while (i > 0)
		{
			var submatch = arguments[i];
			submatches[--i] = submatch
				? elm$core$Maybe$Just(submatch)
				: elm$core$Maybe$Nothing;
		}
		return replacer(A4(elm$regex$Regex$Match, match, arguments[arguments.length - 2], count, _List_fromArray(submatches)));
	}
	return string.replace(re, jsReplacer);
});

var _Regex_splitAtMost = F3(function(n, re, str)
{
	var string = str;
	var out = [];
	var start = re.lastIndex;
	var restoreLastIndex = re.lastIndex;
	while (n--)
	{
		var result = re.exec(string);
		if (!result) break;
		out.push(string.slice(start, result.index));
		start = re.lastIndex;
	}
	out.push(string.slice(start));
	re.lastIndex = restoreLastIndex;
	return _List_fromArray(out);
});

var _Regex_infinity = Infinity;




// ELEMENT


var _Debugger_element;

var _Browser_element = _Debugger_element || F4(function(impl, flagDecoder, debugMetadata, args)
{
	return _Platform_initialize(
		flagDecoder,
		args,
		impl.init,
		impl.update,
		impl.subscriptions,
		function(sendToApp, initialModel) {
			var view = impl.view;
			/**_UNUSED/
			var domNode = args['node'];
			//*/
			/**/
			var domNode = args && args['node'] ? args['node'] : _Debug_crash(0);
			//*/
			var currNode = _VirtualDom_virtualize(domNode);

			return _Browser_makeAnimator(initialModel, function(model)
			{
				var nextNode = view(model);
				var patches = _VirtualDom_diff(currNode, nextNode);
				domNode = _VirtualDom_applyPatches(domNode, currNode, patches, sendToApp);
				currNode = nextNode;
			});
		}
	);
});



// DOCUMENT


var _Debugger_document;

var _Browser_document = _Debugger_document || F4(function(impl, flagDecoder, debugMetadata, args)
{
	return _Platform_initialize(
		flagDecoder,
		args,
		impl.init,
		impl.update,
		impl.subscriptions,
		function(sendToApp, initialModel) {
			var divertHrefToApp = impl.setup && impl.setup(sendToApp)
			var view = impl.view;
			var title = _VirtualDom_doc.title;
			var bodyNode = _VirtualDom_doc.body;
			var currNode = _VirtualDom_virtualize(bodyNode);
			return _Browser_makeAnimator(initialModel, function(model)
			{
				_VirtualDom_divertHrefToApp = divertHrefToApp;
				var doc = view(model);
				var nextNode = _VirtualDom_node('body')(_List_Nil)(doc.body);
				var patches = _VirtualDom_diff(currNode, nextNode);
				bodyNode = _VirtualDom_applyPatches(bodyNode, currNode, patches, sendToApp);
				currNode = nextNode;
				_VirtualDom_divertHrefToApp = 0;
				(title !== doc.title) && (_VirtualDom_doc.title = title = doc.title);
			});
		}
	);
});



// ANIMATION


var _Browser_cancelAnimationFrame =
	typeof cancelAnimationFrame !== 'undefined'
		? cancelAnimationFrame
		: function(id) { clearTimeout(id); };

var _Browser_requestAnimationFrame =
	typeof requestAnimationFrame !== 'undefined'
		? requestAnimationFrame
		: function(callback) { return setTimeout(callback, 1000 / 60); };


function _Browser_makeAnimator(model, draw)
{
	draw(model);

	var state = 0;

	function updateIfNeeded()
	{
		state = state === 1
			? 0
			: ( _Browser_requestAnimationFrame(updateIfNeeded), draw(model), 1 );
	}

	return function(nextModel, isSync)
	{
		model = nextModel;

		isSync
			? ( draw(model),
				state === 2 && (state = 1)
				)
			: ( state === 0 && _Browser_requestAnimationFrame(updateIfNeeded),
				state = 2
				);
	};
}



// APPLICATION


function _Browser_application(impl)
{
	var onUrlChange = impl.onUrlChange;
	var onUrlRequest = impl.onUrlRequest;
	var key = function() { key.a(onUrlChange(_Browser_getUrl())); };

	return _Browser_document({
		setup: function(sendToApp)
		{
			key.a = sendToApp;
			_Browser_window.addEventListener('popstate', key);
			_Browser_window.navigator.userAgent.indexOf('Trident') < 0 || _Browser_window.addEventListener('hashchange', key);

			return F2(function(domNode, event)
			{
				if (!event.ctrlKey && !event.metaKey && !event.shiftKey && event.button < 1 && !domNode.target && !domNode.hasAttribute('download'))
				{
					event.preventDefault();
					var href = domNode.href;
					var curr = _Browser_getUrl();
					var next = elm$url$Url$fromString(href).a;
					sendToApp(onUrlRequest(
						(next
							&& curr.protocol === next.protocol
							&& curr.host === next.host
							&& curr.port_.a === next.port_.a
						)
							? elm$browser$Browser$Internal(next)
							: elm$browser$Browser$External(href)
					));
				}
			});
		},
		init: function(flags)
		{
			return A3(impl.init, flags, _Browser_getUrl(), key);
		},
		view: impl.view,
		update: impl.update,
		subscriptions: impl.subscriptions
	});
}

function _Browser_getUrl()
{
	return elm$url$Url$fromString(_VirtualDom_doc.location.href).a || _Debug_crash(1);
}

var _Browser_go = F2(function(key, n)
{
	return A2(elm$core$Task$perform, elm$core$Basics$never, _Scheduler_binding(function() {
		n && history.go(n);
		key();
	}));
});

var _Browser_pushUrl = F2(function(key, url)
{
	return A2(elm$core$Task$perform, elm$core$Basics$never, _Scheduler_binding(function() {
		history.pushState({}, '', url);
		key();
	}));
});

var _Browser_replaceUrl = F2(function(key, url)
{
	return A2(elm$core$Task$perform, elm$core$Basics$never, _Scheduler_binding(function() {
		history.replaceState({}, '', url);
		key();
	}));
});



// GLOBAL EVENTS


var _Browser_fakeNode = { addEventListener: function() {}, removeEventListener: function() {} };
var _Browser_doc = typeof document !== 'undefined' ? document : _Browser_fakeNode;
var _Browser_window = typeof window !== 'undefined' ? window : _Browser_fakeNode;

var _Browser_on = F3(function(node, eventName, sendToSelf)
{
	return _Scheduler_spawn(_Scheduler_binding(function(callback)
	{
		function handler(event)	{ _Scheduler_rawSpawn(sendToSelf(event)); }
		node.addEventListener(eventName, handler, _VirtualDom_passiveSupported && { passive: true });
		return function() { node.removeEventListener(eventName, handler); };
	}));
});

var _Browser_decodeEvent = F2(function(decoder, event)
{
	var result = _Json_runHelp(decoder, event);
	return elm$core$Result$isOk(result) ? elm$core$Maybe$Just(result.a) : elm$core$Maybe$Nothing;
});



// PAGE VISIBILITY


function _Browser_visibilityInfo()
{
	return (typeof _VirtualDom_doc.hidden !== 'undefined')
		? { hidden: 'hidden', change: 'visibilitychange' }
		:
	(typeof _VirtualDom_doc.mozHidden !== 'undefined')
		? { hidden: 'mozHidden', change: 'mozvisibilitychange' }
		:
	(typeof _VirtualDom_doc.msHidden !== 'undefined')
		? { hidden: 'msHidden', change: 'msvisibilitychange' }
		:
	(typeof _VirtualDom_doc.webkitHidden !== 'undefined')
		? { hidden: 'webkitHidden', change: 'webkitvisibilitychange' }
		: { hidden: 'hidden', change: 'visibilitychange' };
}



// ANIMATION FRAMES


function _Browser_rAF()
{
	return _Scheduler_binding(function(callback)
	{
		var id = _Browser_requestAnimationFrame(function() {
			callback(_Scheduler_succeed(Date.now()));
		});

		return function() {
			_Browser_cancelAnimationFrame(id);
		};
	});
}


function _Browser_now()
{
	return _Scheduler_binding(function(callback)
	{
		callback(_Scheduler_succeed(Date.now()));
	});
}



// DOM STUFF


function _Browser_withNode(id, doStuff)
{
	return _Scheduler_binding(function(callback)
	{
		_Browser_requestAnimationFrame(function() {
			var node = document.getElementById(id);
			callback(node
				? _Scheduler_succeed(doStuff(node))
				: _Scheduler_fail(elm$browser$Browser$Dom$NotFound(id))
			);
		});
	});
}


function _Browser_withWindow(doStuff)
{
	return _Scheduler_binding(function(callback)
	{
		_Browser_requestAnimationFrame(function() {
			callback(_Scheduler_succeed(doStuff()));
		});
	});
}


// FOCUS and BLUR


var _Browser_call = F2(function(functionName, id)
{
	return _Browser_withNode(id, function(node) {
		node[functionName]();
		return _Utils_Tuple0;
	});
});



// WINDOW VIEWPORT


function _Browser_getViewport()
{
	return {
		scene: _Browser_getScene(),
		viewport: {
			x: _Browser_window.pageXOffset,
			y: _Browser_window.pageYOffset,
			width: _Browser_doc.documentElement.clientWidth,
			height: _Browser_doc.documentElement.clientHeight
		}
	};
}

function _Browser_getScene()
{
	var body = _Browser_doc.body;
	var elem = _Browser_doc.documentElement;
	return {
		width: Math.max(body.scrollWidth, body.offsetWidth, elem.scrollWidth, elem.offsetWidth, elem.clientWidth),
		height: Math.max(body.scrollHeight, body.offsetHeight, elem.scrollHeight, elem.offsetHeight, elem.clientHeight)
	};
}

var _Browser_setViewport = F2(function(x, y)
{
	return _Browser_withWindow(function()
	{
		_Browser_window.scroll(x, y);
		return _Utils_Tuple0;
	});
});



// ELEMENT VIEWPORT


function _Browser_getViewportOf(id)
{
	return _Browser_withNode(id, function(node)
	{
		return {
			scene: {
				width: node.scrollWidth,
				height: node.scrollHeight
			},
			viewport: {
				x: node.scrollLeft,
				y: node.scrollTop,
				width: node.clientWidth,
				height: node.clientHeight
			}
		};
	});
}


var _Browser_setViewportOf = F3(function(id, x, y)
{
	return _Browser_withNode(id, function(node)
	{
		node.scrollLeft = x;
		node.scrollTop = y;
		return _Utils_Tuple0;
	});
});



// ELEMENT


function _Browser_getElement(id)
{
	return _Browser_withNode(id, function(node)
	{
		var rect = node.getBoundingClientRect();
		var x = _Browser_window.pageXOffset;
		var y = _Browser_window.pageYOffset;
		return {
			scene: _Browser_getScene(),
			viewport: {
				x: x,
				y: y,
				width: _Browser_doc.documentElement.clientWidth,
				height: _Browser_doc.documentElement.clientHeight
			},
			element: {
				x: x + rect.left,
				y: y + rect.top,
				width: rect.width,
				height: rect.height
			}
		};
	});
}



// LOAD and RELOAD


function _Browser_reload(skipCache)
{
	return A2(elm$core$Task$perform, elm$core$Basics$never, _Scheduler_binding(function(callback)
	{
		_VirtualDom_doc.location.reload(skipCache);
	}));
}

function _Browser_load(url)
{
	return A2(elm$core$Task$perform, elm$core$Basics$never, _Scheduler_binding(function(callback)
	{
		try
		{
			_Browser_window.location = url;
		}
		catch(err)
		{
			// Only Firefox can throw a NS_ERROR_MALFORMED_URI exception here.
			// Other browsers reload the page, so let's be consistent about that.
			_VirtualDom_doc.location.reload(false);
		}
	}));
}
var author$project$Types$Player = F4(
	function (index, host, name, peerId) {
		return {host: host, index: index, name: name, peerId: peerId};
	});
var author$project$Types$Start = {$: 'Start'};
var elm$core$Basics$False = {$: 'False'};
var elm$core$Maybe$Nothing = {$: 'Nothing'};
var elm$core$Basics$True = {$: 'True'};
var elm$core$Result$isOk = function (result) {
	if (result.$ === 'Ok') {
		return true;
	} else {
		return false;
	}
};
var elm$core$Basics$EQ = {$: 'EQ'};
var elm$core$Basics$GT = {$: 'GT'};
var elm$core$Basics$LT = {$: 'LT'};
var elm$core$Dict$foldr = F3(
	function (func, acc, t) {
		foldr:
		while (true) {
			if (t.$ === 'RBEmpty_elm_builtin') {
				return acc;
			} else {
				var key = t.b;
				var value = t.c;
				var left = t.d;
				var right = t.e;
				var $temp$func = func,
					$temp$acc = A3(
					func,
					key,
					value,
					A3(elm$core$Dict$foldr, func, acc, right)),
					$temp$t = left;
				func = $temp$func;
				acc = $temp$acc;
				t = $temp$t;
				continue foldr;
			}
		}
	});
var elm$core$List$cons = _List_cons;
var elm$core$Dict$toList = function (dict) {
	return A3(
		elm$core$Dict$foldr,
		F3(
			function (key, value, list) {
				return A2(
					elm$core$List$cons,
					_Utils_Tuple2(key, value),
					list);
			}),
		_List_Nil,
		dict);
};
var elm$core$Dict$keys = function (dict) {
	return A3(
		elm$core$Dict$foldr,
		F3(
			function (key, value, keyList) {
				return A2(elm$core$List$cons, key, keyList);
			}),
		_List_Nil,
		dict);
};
var elm$core$Set$toList = function (_n0) {
	var dict = _n0.a;
	return elm$core$Dict$keys(dict);
};
var elm$core$Elm$JsArray$foldr = _JsArray_foldr;
var elm$core$Array$foldr = F3(
	function (func, baseCase, _n0) {
		var tree = _n0.c;
		var tail = _n0.d;
		var helper = F2(
			function (node, acc) {
				if (node.$ === 'SubTree') {
					var subTree = node.a;
					return A3(elm$core$Elm$JsArray$foldr, helper, acc, subTree);
				} else {
					var values = node.a;
					return A3(elm$core$Elm$JsArray$foldr, func, acc, values);
				}
			});
		return A3(
			elm$core$Elm$JsArray$foldr,
			helper,
			A3(elm$core$Elm$JsArray$foldr, func, baseCase, tail),
			tree);
	});
var elm$core$Array$toList = function (array) {
	return A3(elm$core$Array$foldr, elm$core$List$cons, _List_Nil, array);
};
var elm$core$Array$branchFactor = 32;
var elm$core$Array$Array_elm_builtin = F4(
	function (a, b, c, d) {
		return {$: 'Array_elm_builtin', a: a, b: b, c: c, d: d};
	});
var elm$core$Basics$ceiling = _Basics_ceiling;
var elm$core$Basics$fdiv = _Basics_fdiv;
var elm$core$Basics$logBase = F2(
	function (base, number) {
		return _Basics_log(number) / _Basics_log(base);
	});
var elm$core$Basics$toFloat = _Basics_toFloat;
var elm$core$Array$shiftStep = elm$core$Basics$ceiling(
	A2(elm$core$Basics$logBase, 2, elm$core$Array$branchFactor));
var elm$core$Elm$JsArray$empty = _JsArray_empty;
var elm$core$Array$empty = A4(elm$core$Array$Array_elm_builtin, 0, elm$core$Array$shiftStep, elm$core$Elm$JsArray$empty, elm$core$Elm$JsArray$empty);
var elm$core$Array$Leaf = function (a) {
	return {$: 'Leaf', a: a};
};
var elm$core$Array$SubTree = function (a) {
	return {$: 'SubTree', a: a};
};
var elm$core$Elm$JsArray$initializeFromList = _JsArray_initializeFromList;
var elm$core$List$foldl = F3(
	function (func, acc, list) {
		foldl:
		while (true) {
			if (!list.b) {
				return acc;
			} else {
				var x = list.a;
				var xs = list.b;
				var $temp$func = func,
					$temp$acc = A2(func, x, acc),
					$temp$list = xs;
				func = $temp$func;
				acc = $temp$acc;
				list = $temp$list;
				continue foldl;
			}
		}
	});
var elm$core$List$reverse = function (list) {
	return A3(elm$core$List$foldl, elm$core$List$cons, _List_Nil, list);
};
var elm$core$Array$compressNodes = F2(
	function (nodes, acc) {
		compressNodes:
		while (true) {
			var _n0 = A2(elm$core$Elm$JsArray$initializeFromList, elm$core$Array$branchFactor, nodes);
			var node = _n0.a;
			var remainingNodes = _n0.b;
			var newAcc = A2(
				elm$core$List$cons,
				elm$core$Array$SubTree(node),
				acc);
			if (!remainingNodes.b) {
				return elm$core$List$reverse(newAcc);
			} else {
				var $temp$nodes = remainingNodes,
					$temp$acc = newAcc;
				nodes = $temp$nodes;
				acc = $temp$acc;
				continue compressNodes;
			}
		}
	});
var elm$core$Basics$apR = F2(
	function (x, f) {
		return f(x);
	});
var elm$core$Basics$eq = _Utils_equal;
var elm$core$Tuple$first = function (_n0) {
	var x = _n0.a;
	return x;
};
var elm$core$Array$treeFromBuilder = F2(
	function (nodeList, nodeListSize) {
		treeFromBuilder:
		while (true) {
			var newNodeSize = elm$core$Basics$ceiling(nodeListSize / elm$core$Array$branchFactor);
			if (newNodeSize === 1) {
				return A2(elm$core$Elm$JsArray$initializeFromList, elm$core$Array$branchFactor, nodeList).a;
			} else {
				var $temp$nodeList = A2(elm$core$Array$compressNodes, nodeList, _List_Nil),
					$temp$nodeListSize = newNodeSize;
				nodeList = $temp$nodeList;
				nodeListSize = $temp$nodeListSize;
				continue treeFromBuilder;
			}
		}
	});
var elm$core$Basics$add = _Basics_add;
var elm$core$Basics$apL = F2(
	function (f, x) {
		return f(x);
	});
var elm$core$Basics$floor = _Basics_floor;
var elm$core$Basics$gt = _Utils_gt;
var elm$core$Basics$max = F2(
	function (x, y) {
		return (_Utils_cmp(x, y) > 0) ? x : y;
	});
var elm$core$Basics$mul = _Basics_mul;
var elm$core$Basics$sub = _Basics_sub;
var elm$core$Elm$JsArray$length = _JsArray_length;
var elm$core$Array$builderToArray = F2(
	function (reverseNodeList, builder) {
		if (!builder.nodeListSize) {
			return A4(
				elm$core$Array$Array_elm_builtin,
				elm$core$Elm$JsArray$length(builder.tail),
				elm$core$Array$shiftStep,
				elm$core$Elm$JsArray$empty,
				builder.tail);
		} else {
			var treeLen = builder.nodeListSize * elm$core$Array$branchFactor;
			var depth = elm$core$Basics$floor(
				A2(elm$core$Basics$logBase, elm$core$Array$branchFactor, treeLen - 1));
			var correctNodeList = reverseNodeList ? elm$core$List$reverse(builder.nodeList) : builder.nodeList;
			var tree = A2(elm$core$Array$treeFromBuilder, correctNodeList, builder.nodeListSize);
			return A4(
				elm$core$Array$Array_elm_builtin,
				elm$core$Elm$JsArray$length(builder.tail) + treeLen,
				A2(elm$core$Basics$max, 5, depth * elm$core$Array$shiftStep),
				tree,
				builder.tail);
		}
	});
var elm$core$Basics$idiv = _Basics_idiv;
var elm$core$Basics$lt = _Utils_lt;
var elm$core$Elm$JsArray$initialize = _JsArray_initialize;
var elm$core$Array$initializeHelp = F5(
	function (fn, fromIndex, len, nodeList, tail) {
		initializeHelp:
		while (true) {
			if (fromIndex < 0) {
				return A2(
					elm$core$Array$builderToArray,
					false,
					{nodeList: nodeList, nodeListSize: (len / elm$core$Array$branchFactor) | 0, tail: tail});
			} else {
				var leaf = elm$core$Array$Leaf(
					A3(elm$core$Elm$JsArray$initialize, elm$core$Array$branchFactor, fromIndex, fn));
				var $temp$fn = fn,
					$temp$fromIndex = fromIndex - elm$core$Array$branchFactor,
					$temp$len = len,
					$temp$nodeList = A2(elm$core$List$cons, leaf, nodeList),
					$temp$tail = tail;
				fn = $temp$fn;
				fromIndex = $temp$fromIndex;
				len = $temp$len;
				nodeList = $temp$nodeList;
				tail = $temp$tail;
				continue initializeHelp;
			}
		}
	});
var elm$core$Basics$le = _Utils_le;
var elm$core$Basics$remainderBy = _Basics_remainderBy;
var elm$core$Array$initialize = F2(
	function (len, fn) {
		if (len <= 0) {
			return elm$core$Array$empty;
		} else {
			var tailLen = len % elm$core$Array$branchFactor;
			var tail = A3(elm$core$Elm$JsArray$initialize, tailLen, len - tailLen, fn);
			var initialFromIndex = (len - tailLen) - elm$core$Array$branchFactor;
			return A5(elm$core$Array$initializeHelp, fn, initialFromIndex, len, _List_Nil, tail);
		}
	});
var elm$core$Maybe$Just = function (a) {
	return {$: 'Just', a: a};
};
var elm$core$Result$Err = function (a) {
	return {$: 'Err', a: a};
};
var elm$core$Result$Ok = function (a) {
	return {$: 'Ok', a: a};
};
var elm$json$Json$Decode$Failure = F2(
	function (a, b) {
		return {$: 'Failure', a: a, b: b};
	});
var elm$json$Json$Decode$Field = F2(
	function (a, b) {
		return {$: 'Field', a: a, b: b};
	});
var elm$json$Json$Decode$Index = F2(
	function (a, b) {
		return {$: 'Index', a: a, b: b};
	});
var elm$json$Json$Decode$OneOf = function (a) {
	return {$: 'OneOf', a: a};
};
var elm$core$Basics$and = _Basics_and;
var elm$core$Basics$append = _Utils_append;
var elm$core$Basics$or = _Basics_or;
var elm$core$Char$toCode = _Char_toCode;
var elm$core$Char$isLower = function (_char) {
	var code = elm$core$Char$toCode(_char);
	return (97 <= code) && (code <= 122);
};
var elm$core$Char$isUpper = function (_char) {
	var code = elm$core$Char$toCode(_char);
	return (code <= 90) && (65 <= code);
};
var elm$core$Char$isAlpha = function (_char) {
	return elm$core$Char$isLower(_char) || elm$core$Char$isUpper(_char);
};
var elm$core$Char$isDigit = function (_char) {
	var code = elm$core$Char$toCode(_char);
	return (code <= 57) && (48 <= code);
};
var elm$core$Char$isAlphaNum = function (_char) {
	return elm$core$Char$isLower(_char) || (elm$core$Char$isUpper(_char) || elm$core$Char$isDigit(_char));
};
var elm$core$List$length = function (xs) {
	return A3(
		elm$core$List$foldl,
		F2(
			function (_n0, i) {
				return i + 1;
			}),
		0,
		xs);
};
var elm$core$List$map2 = _List_map2;
var elm$core$List$rangeHelp = F3(
	function (lo, hi, list) {
		rangeHelp:
		while (true) {
			if (_Utils_cmp(lo, hi) < 1) {
				var $temp$lo = lo,
					$temp$hi = hi - 1,
					$temp$list = A2(elm$core$List$cons, hi, list);
				lo = $temp$lo;
				hi = $temp$hi;
				list = $temp$list;
				continue rangeHelp;
			} else {
				return list;
			}
		}
	});
var elm$core$List$range = F2(
	function (lo, hi) {
		return A3(elm$core$List$rangeHelp, lo, hi, _List_Nil);
	});
var elm$core$List$indexedMap = F2(
	function (f, xs) {
		return A3(
			elm$core$List$map2,
			f,
			A2(
				elm$core$List$range,
				0,
				elm$core$List$length(xs) - 1),
			xs);
	});
var elm$core$String$all = _String_all;
var elm$core$String$fromInt = _String_fromNumber;
var elm$core$String$join = F2(
	function (sep, chunks) {
		return A2(
			_String_join,
			sep,
			_List_toArray(chunks));
	});
var elm$core$String$uncons = _String_uncons;
var elm$core$String$split = F2(
	function (sep, string) {
		return _List_fromArray(
			A2(_String_split, sep, string));
	});
var elm$json$Json$Decode$indent = function (str) {
	return A2(
		elm$core$String$join,
		'\n    ',
		A2(elm$core$String$split, '\n', str));
};
var elm$json$Json$Encode$encode = _Json_encode;
var elm$json$Json$Decode$errorOneOf = F2(
	function (i, error) {
		return '\n\n(' + (elm$core$String$fromInt(i + 1) + (') ' + elm$json$Json$Decode$indent(
			elm$json$Json$Decode$errorToString(error))));
	});
var elm$json$Json$Decode$errorToString = function (error) {
	return A2(elm$json$Json$Decode$errorToStringHelp, error, _List_Nil);
};
var elm$json$Json$Decode$errorToStringHelp = F2(
	function (error, context) {
		errorToStringHelp:
		while (true) {
			switch (error.$) {
				case 'Field':
					var f = error.a;
					var err = error.b;
					var isSimple = function () {
						var _n1 = elm$core$String$uncons(f);
						if (_n1.$ === 'Nothing') {
							return false;
						} else {
							var _n2 = _n1.a;
							var _char = _n2.a;
							var rest = _n2.b;
							return elm$core$Char$isAlpha(_char) && A2(elm$core$String$all, elm$core$Char$isAlphaNum, rest);
						}
					}();
					var fieldName = isSimple ? ('.' + f) : ('[\'' + (f + '\']'));
					var $temp$error = err,
						$temp$context = A2(elm$core$List$cons, fieldName, context);
					error = $temp$error;
					context = $temp$context;
					continue errorToStringHelp;
				case 'Index':
					var i = error.a;
					var err = error.b;
					var indexName = '[' + (elm$core$String$fromInt(i) + ']');
					var $temp$error = err,
						$temp$context = A2(elm$core$List$cons, indexName, context);
					error = $temp$error;
					context = $temp$context;
					continue errorToStringHelp;
				case 'OneOf':
					var errors = error.a;
					if (!errors.b) {
						return 'Ran into a Json.Decode.oneOf with no possibilities' + function () {
							if (!context.b) {
								return '!';
							} else {
								return ' at json' + A2(
									elm$core$String$join,
									'',
									elm$core$List$reverse(context));
							}
						}();
					} else {
						if (!errors.b.b) {
							var err = errors.a;
							var $temp$error = err,
								$temp$context = context;
							error = $temp$error;
							context = $temp$context;
							continue errorToStringHelp;
						} else {
							var starter = function () {
								if (!context.b) {
									return 'Json.Decode.oneOf';
								} else {
									return 'The Json.Decode.oneOf at json' + A2(
										elm$core$String$join,
										'',
										elm$core$List$reverse(context));
								}
							}();
							var introduction = starter + (' failed in the following ' + (elm$core$String$fromInt(
								elm$core$List$length(errors)) + ' ways:'));
							return A2(
								elm$core$String$join,
								'\n\n',
								A2(
									elm$core$List$cons,
									introduction,
									A2(elm$core$List$indexedMap, elm$json$Json$Decode$errorOneOf, errors)));
						}
					}
				default:
					var msg = error.a;
					var json = error.b;
					var introduction = function () {
						if (!context.b) {
							return 'Problem with the given value:\n\n';
						} else {
							return 'Problem with the value at json' + (A2(
								elm$core$String$join,
								'',
								elm$core$List$reverse(context)) + ':\n\n    ');
						}
					}();
					return introduction + (elm$json$Json$Decode$indent(
						A2(elm$json$Json$Encode$encode, 4, json)) + ('\n\n' + msg));
			}
		}
	});
var elm$core$Platform$Cmd$batch = _Platform_batch;
var elm$core$Platform$Cmd$none = elm$core$Platform$Cmd$batch(_List_Nil);
var elm$json$Json$Decode$decodeValue = _Json_run;
var elm$json$Json$Decode$field = _Json_decodeField;
var elm$json$Json$Decode$string = _Json_decodeString;
var author$project$Main$init = function (json) {
	var url = function () {
		var _n1 = A2(
			elm$json$Json$Decode$decodeValue,
			A2(elm$json$Json$Decode$field, 'url', elm$json$Json$Decode$string),
			json);
		if (_n1.$ === 'Ok') {
			var u = _n1.a;
			return u;
		} else {
			return 'http://douglas-meyer.name/';
		}
	}();
	var gameId = function () {
		var _n0 = A2(
			elm$json$Json$Decode$decodeValue,
			A2(elm$json$Json$Decode$field, 'gameId', elm$json$Json$Decode$string),
			json);
		if (_n0.$ === 'Ok') {
			var id = _n0.a;
			return id;
		} else {
			return '';
		}
	}();
	return _Utils_Tuple2(
		{
			error: elm$core$Maybe$Nothing,
			gameId: gameId,
			me: A4(author$project$Types$Player, 0, false, 'Random Player', ''),
			page: author$project$Types$Start,
			players: _List_Nil,
			round: elm$core$Maybe$Nothing,
			threads: _List_Nil,
			url: url
		},
		elm$core$Platform$Cmd$none);
};
var author$project$Main$SetPeerId = function (a) {
	return {$: 'SetPeerId', a: a};
};
var author$project$Main$SetPlayer = function (a) {
	return {$: 'SetPlayer', a: a};
};
var author$project$Main$SetThread = function (a) {
	return {$: 'SetThread', a: a};
};
var author$project$Types$Drawing = F2(
	function (author, drawing) {
		return {author: author, drawing: drawing};
	});
var elm$json$Json$Decode$map2 = _Json_map2;
var author$project$Decoder$decodeDrawing = A3(
	elm$json$Json$Decode$map2,
	author$project$Types$Drawing,
	A2(elm$json$Json$Decode$field, 'author', elm$json$Json$Decode$string),
	A2(elm$json$Json$Decode$field, 'drawing', elm$json$Json$Decode$string));
var author$project$Types$Phrase = F2(
	function (author, phrase) {
		return {author: author, phrase: phrase};
	});
var author$project$Decoder$decodePhrase = A3(
	elm$json$Json$Decode$map2,
	author$project$Types$Phrase,
	A2(elm$json$Json$Decode$field, 'author', elm$json$Json$Decode$string),
	A2(elm$json$Json$Decode$field, 'phrase', elm$json$Json$Decode$string));
var elm$core$Tuple$pair = F2(
	function (a, b) {
		return _Utils_Tuple2(a, b);
	});
var elm$json$Json$Decode$map = _Json_map1;
var elm$json$Json$Decode$oneOf = _Json_oneOf;
var elm$json$Json$Decode$succeed = _Json_succeed;
var elm$json$Json$Decode$maybe = function (decoder) {
	return elm$json$Json$Decode$oneOf(
		_List_fromArray(
			[
				A2(elm$json$Json$Decode$map, elm$core$Maybe$Just, decoder),
				elm$json$Json$Decode$succeed(elm$core$Maybe$Nothing)
			]));
};
var author$project$Decoder$decodePair = A3(
	elm$json$Json$Decode$map2,
	elm$core$Tuple$pair,
	elm$json$Json$Decode$maybe(
		A2(elm$json$Json$Decode$field, 'phrase', author$project$Decoder$decodePhrase)),
	elm$json$Json$Decode$maybe(
		A2(elm$json$Json$Decode$field, 'drawing', author$project$Decoder$decodeDrawing)));
var author$project$Types$Thread = F2(
	function (id, pairs) {
		return {id: id, pairs: pairs};
	});
var elm$json$Json$Decode$int = _Json_decodeInt;
var elm$json$Json$Decode$list = _Json_decodeList;
var author$project$Decoder$decodeThread = A3(
	elm$json$Json$Decode$map2,
	author$project$Types$Thread,
	A2(elm$json$Json$Decode$field, 'id', elm$json$Json$Decode$int),
	A2(
		elm$json$Json$Decode$field,
		'pairs',
		elm$json$Json$Decode$list(author$project$Decoder$decodePair)));
var author$project$Main$decodeThreadSub = function (json) {
	var _n0 = A2(elm$json$Json$Decode$decodeValue, author$project$Decoder$decodeThread, json);
	if (_n0.$ === 'Ok') {
		var thread = _n0.a;
		return elm$core$Result$Ok(thread);
	} else {
		var error = _n0.a;
		return elm$core$Result$Err(
			elm$json$Json$Decode$errorToString(error));
	}
};
var author$project$Main$setPeerId = _Platform_incomingPort('setPeerId', elm$json$Json$Decode$string);
var elm$json$Json$Decode$andThen = _Json_andThen;
var elm$json$Json$Decode$bool = _Json_decodeBool;
var author$project$Main$setPlayer = _Platform_incomingPort(
	'setPlayer',
	A2(
		elm$json$Json$Decode$andThen,
		function (peerId) {
			return A2(
				elm$json$Json$Decode$andThen,
				function (name) {
					return A2(
						elm$json$Json$Decode$andThen,
						function (index) {
							return A2(
								elm$json$Json$Decode$andThen,
								function (host) {
									return elm$json$Json$Decode$succeed(
										{host: host, index: index, name: name, peerId: peerId});
								},
								A2(elm$json$Json$Decode$field, 'host', elm$json$Json$Decode$bool));
						},
						A2(elm$json$Json$Decode$field, 'index', elm$json$Json$Decode$int));
				},
				A2(elm$json$Json$Decode$field, 'name', elm$json$Json$Decode$string));
		},
		A2(elm$json$Json$Decode$field, 'peerId', elm$json$Json$Decode$string)));
var elm$json$Json$Decode$value = _Json_decodeValue;
var author$project$Main$setThread = _Platform_incomingPort('setThread', elm$json$Json$Decode$value);
var elm$core$Basics$composeL = F3(
	function (g, f, x) {
		return g(
			f(x));
	});
var elm$core$Platform$Sub$batch = _Platform_batch;
var author$project$Main$subscriptions = function (model) {
	return elm$core$Platform$Sub$batch(
		_List_fromArray(
			[
				author$project$Main$setPeerId(author$project$Main$SetPeerId),
				author$project$Main$setPlayer(author$project$Main$SetPlayer),
				author$project$Main$setThread(
				A2(elm$core$Basics$composeL, author$project$Main$SetThread, author$project$Main$decodeThreadSub))
			]));
};
var author$project$Main$StartGame = function (a) {
	return {$: 'StartGame', a: a};
};
var elm$json$Json$Encode$string = _Json_wrap;
var author$project$Main$connectHost = _Platform_outgoingPort('connectHost', elm$json$Json$Encode$string);
var elm$json$Json$Encode$bool = _Json_wrap;
var elm$json$Json$Encode$int = _Json_wrap;
var elm$json$Json$Encode$object = function (pairs) {
	return _Json_wrap(
		A3(
			elm$core$List$foldl,
			F2(
				function (_n0, obj) {
					var k = _n0.a;
					var v = _n0.b;
					return A3(_Json_addField, k, v, obj);
				}),
			_Json_emptyObject(_Utils_Tuple0),
			pairs));
};
var author$project$Main$encodePlayer = function (player) {
	return elm$json$Json$Encode$object(
		_List_fromArray(
			[
				_Utils_Tuple2(
				'index',
				elm$json$Json$Encode$int(player.index)),
				_Utils_Tuple2(
				'host',
				elm$json$Json$Encode$bool(player.host)),
				_Utils_Tuple2(
				'name',
				elm$json$Json$Encode$string(player.name)),
				_Utils_Tuple2(
				'peerId',
				elm$json$Json$Encode$string(player.peerId))
			]));
};
var author$project$Main$encodeDrawing = function (drawing) {
	return elm$json$Json$Encode$object(
		_List_fromArray(
			[
				_Utils_Tuple2(
				'author',
				elm$json$Json$Encode$string(drawing.author)),
				_Utils_Tuple2(
				'drawing',
				elm$json$Json$Encode$string(drawing.drawing))
			]));
};
var author$project$Main$encodePhrase = function (phrase) {
	return elm$json$Json$Encode$object(
		_List_fromArray(
			[
				_Utils_Tuple2(
				'author',
				elm$json$Json$Encode$string(phrase.author)),
				_Utils_Tuple2(
				'phrase',
				elm$json$Json$Encode$string(phrase.phrase))
			]));
};
var elm$core$Array$fromListHelp = F3(
	function (list, nodeList, nodeListSize) {
		fromListHelp:
		while (true) {
			var _n0 = A2(elm$core$Elm$JsArray$initializeFromList, elm$core$Array$branchFactor, list);
			var jsArray = _n0.a;
			var remainingItems = _n0.b;
			if (_Utils_cmp(
				elm$core$Elm$JsArray$length(jsArray),
				elm$core$Array$branchFactor) < 0) {
				return A2(
					elm$core$Array$builderToArray,
					true,
					{nodeList: nodeList, nodeListSize: nodeListSize, tail: jsArray});
			} else {
				var $temp$list = remainingItems,
					$temp$nodeList = A2(
					elm$core$List$cons,
					elm$core$Array$Leaf(jsArray),
					nodeList),
					$temp$nodeListSize = nodeListSize + 1;
				list = $temp$list;
				nodeList = $temp$nodeList;
				nodeListSize = $temp$nodeListSize;
				continue fromListHelp;
			}
		}
	});
var elm$core$Array$fromList = function (list) {
	if (!list.b) {
		return elm$core$Array$empty;
	} else {
		return A3(elm$core$Array$fromListHelp, list, _List_Nil, 0);
	}
};
var elm$core$List$foldrHelper = F4(
	function (fn, acc, ctr, ls) {
		if (!ls.b) {
			return acc;
		} else {
			var a = ls.a;
			var r1 = ls.b;
			if (!r1.b) {
				return A2(fn, a, acc);
			} else {
				var b = r1.a;
				var r2 = r1.b;
				if (!r2.b) {
					return A2(
						fn,
						a,
						A2(fn, b, acc));
				} else {
					var c = r2.a;
					var r3 = r2.b;
					if (!r3.b) {
						return A2(
							fn,
							a,
							A2(
								fn,
								b,
								A2(fn, c, acc)));
					} else {
						var d = r3.a;
						var r4 = r3.b;
						var res = (ctr > 500) ? A3(
							elm$core$List$foldl,
							fn,
							acc,
							elm$core$List$reverse(r4)) : A4(elm$core$List$foldrHelper, fn, acc, ctr + 1, r4);
						return A2(
							fn,
							a,
							A2(
								fn,
								b,
								A2(
									fn,
									c,
									A2(fn, d, res))));
					}
				}
			}
		}
	});
var elm$core$List$foldr = F3(
	function (fn, acc, ls) {
		return A4(elm$core$List$foldrHelper, fn, acc, 0, ls);
	});
var elm$core$List$map = F2(
	function (f, xs) {
		return A3(
			elm$core$List$foldr,
			F2(
				function (x, acc) {
					return A2(
						elm$core$List$cons,
						f(x),
						acc);
				}),
			_List_Nil,
			xs);
	});
var elm$core$Maybe$map = F2(
	function (f, maybe) {
		if (maybe.$ === 'Just') {
			var value = maybe.a;
			return elm$core$Maybe$Just(
				f(value));
		} else {
			return elm$core$Maybe$Nothing;
		}
	});
var elm$core$Maybe$withDefault = F2(
	function (_default, maybe) {
		if (maybe.$ === 'Just') {
			var value = maybe.a;
			return value;
		} else {
			return _default;
		}
	});
var elm$core$Elm$JsArray$foldl = _JsArray_foldl;
var elm$core$Array$foldl = F3(
	function (func, baseCase, _n0) {
		var tree = _n0.c;
		var tail = _n0.d;
		var helper = F2(
			function (node, acc) {
				if (node.$ === 'SubTree') {
					var subTree = node.a;
					return A3(elm$core$Elm$JsArray$foldl, helper, acc, subTree);
				} else {
					var values = node.a;
					return A3(elm$core$Elm$JsArray$foldl, func, acc, values);
				}
			});
		return A3(
			elm$core$Elm$JsArray$foldl,
			func,
			A3(elm$core$Elm$JsArray$foldl, helper, baseCase, tree),
			tail);
	});
var elm$json$Json$Encode$array = F2(
	function (func, entries) {
		return _Json_wrap(
			A3(
				elm$core$Array$foldl,
				_Json_addEntry(func),
				_Json_emptyArray(_Utils_Tuple0),
				entries));
	});
var elm$json$Json$Encode$null = _Json_encodeNull;
var author$project$Main$encodeThread = function (thread) {
	return elm$json$Json$Encode$object(
		_List_fromArray(
			[
				_Utils_Tuple2(
				'id',
				elm$json$Json$Encode$int(thread.id)),
				_Utils_Tuple2(
				'pairs',
				A2(
					elm$json$Json$Encode$array,
					function (a) {
						return a;
					},
					elm$core$Array$fromList(
						A2(
							elm$core$List$map,
							function (_n0) {
								var phrase = _n0.a;
								var drawing = _n0.b;
								return elm$json$Json$Encode$object(
									_List_fromArray(
										[
											_Utils_Tuple2(
											'phrase',
											A2(
												elm$core$Maybe$withDefault,
												elm$json$Json$Encode$null,
												A2(elm$core$Maybe$map, author$project$Main$encodePhrase, phrase))),
											_Utils_Tuple2(
											'drawing',
											A2(
												elm$core$Maybe$withDefault,
												elm$json$Json$Encode$null,
												A2(elm$core$Maybe$map, author$project$Main$encodeDrawing, drawing)))
										]));
							},
							thread.pairs))))
			]));
};
var elm$core$Basics$identity = function (x) {
	return x;
};
var author$project$Main$sendPlayer = _Platform_outgoingPort('sendPlayer', elm$core$Basics$identity);
var author$project$Main$sendThread = _Platform_outgoingPort('sendThread', elm$core$Basics$identity);
var author$project$Types$Describe = {$: 'Describe'};
var author$project$Types$Draw = {$: 'Draw'};
var author$project$Types$NewGame = {$: 'NewGame'};
var author$project$Types$NewThread = {$: 'NewThread'};
var author$project$Types$Review = {$: 'Review'};
var elm$core$Basics$modBy = _Basics_modBy;
var elm$core$List$filter = F2(
	function (isGood, list) {
		return A3(
			elm$core$List$foldr,
			F2(
				function (x, xs) {
					return isGood(x) ? A2(elm$core$List$cons, x, xs) : xs;
				}),
			_List_Nil,
			list);
	});
var elm$core$List$head = function (list) {
	if (list.b) {
		var x = list.a;
		var xs = list.b;
		return elm$core$Maybe$Just(x);
	} else {
		return elm$core$Maybe$Nothing;
	}
};
var elm$core$Result$andThen = F2(
	function (callback, result) {
		if (result.$ === 'Ok') {
			var value = result.a;
			return callback(value);
		} else {
			var msg = result.a;
			return elm$core$Result$Err(msg);
		}
	});
var elm$core$Result$fromMaybe = F2(
	function (err, maybe) {
		if (maybe.$ === 'Just') {
			var v = maybe.a;
			return elm$core$Result$Ok(v);
		} else {
			return elm$core$Result$Err(err);
		}
	});
var elm$core$Result$map = F2(
	function (func, ra) {
		if (ra.$ === 'Ok') {
			var a = ra.a;
			return elm$core$Result$Ok(
				func(a));
		} else {
			var e = ra.a;
			return elm$core$Result$Err(e);
		}
	});
var elm$core$Result$map2 = F3(
	function (func, ra, rb) {
		if (ra.$ === 'Err') {
			var x = ra.a;
			return elm$core$Result$Err(x);
		} else {
			var a = ra.a;
			if (rb.$ === 'Err') {
				var x = rb.a;
				return elm$core$Result$Err(x);
			} else {
				var b = rb.a;
				return elm$core$Result$Ok(
					A2(func, a, b));
			}
		}
	});
var author$project$Types$getCurrent = function (model) {
	var roundResult = A2(elm$core$Result$fromMaybe, 'Could not get round', model.round);
	var offsetResult = A2(
		elm$core$Result$map,
		function (_n0) {
			var round = _n0.a;
			return A2(
				elm$core$Basics$modBy,
				elm$core$List$length(model.players),
				round + model.me.index);
		},
		roundResult);
	var threadResult = A2(
		elm$core$Result$andThen,
		function (offset) {
			return A2(
				elm$core$Result$fromMaybe,
				'Could not get the thread ' + elm$core$String$fromInt(offset),
				elm$core$List$head(
					A2(
						elm$core$List$filter,
						function (t) {
							return _Utils_eq(t.id, offset);
						},
						model.threads)));
		},
		offsetResult);
	return A3(elm$core$Result$map2, elm$core$Tuple$pair, roundResult, threadResult);
};
var elm$core$List$append = F2(
	function (xs, ys) {
		if (!ys.b) {
			return xs;
		} else {
			return A3(elm$core$List$foldr, elm$core$List$cons, ys, xs);
		}
	});
var elm$core$List$concat = function (lists) {
	return A3(elm$core$List$foldr, elm$core$List$append, _List_Nil, lists);
};
var elm$core$List$drop = F2(
	function (n, list) {
		drop:
		while (true) {
			if (n <= 0) {
				return list;
			} else {
				if (!list.b) {
					return list;
				} else {
					var x = list.a;
					var xs = list.b;
					var $temp$n = n - 1,
						$temp$list = xs;
					n = $temp$n;
					list = $temp$list;
					continue drop;
				}
			}
		}
	});
var elm$core$List$takeReverse = F3(
	function (n, list, kept) {
		takeReverse:
		while (true) {
			if (n <= 0) {
				return kept;
			} else {
				if (!list.b) {
					return kept;
				} else {
					var x = list.a;
					var xs = list.b;
					var $temp$n = n - 1,
						$temp$list = xs,
						$temp$kept = A2(elm$core$List$cons, x, kept);
					n = $temp$n;
					list = $temp$list;
					kept = $temp$kept;
					continue takeReverse;
				}
			}
		}
	});
var elm$core$List$takeTailRec = F2(
	function (n, list) {
		return elm$core$List$reverse(
			A3(elm$core$List$takeReverse, n, list, _List_Nil));
	});
var elm$core$List$takeFast = F3(
	function (ctr, n, list) {
		if (n <= 0) {
			return _List_Nil;
		} else {
			var _n0 = _Utils_Tuple2(n, list);
			_n0$1:
			while (true) {
				_n0$5:
				while (true) {
					if (!_n0.b.b) {
						return list;
					} else {
						if (_n0.b.b.b) {
							switch (_n0.a) {
								case 1:
									break _n0$1;
								case 2:
									var _n2 = _n0.b;
									var x = _n2.a;
									var _n3 = _n2.b;
									var y = _n3.a;
									return _List_fromArray(
										[x, y]);
								case 3:
									if (_n0.b.b.b.b) {
										var _n4 = _n0.b;
										var x = _n4.a;
										var _n5 = _n4.b;
										var y = _n5.a;
										var _n6 = _n5.b;
										var z = _n6.a;
										return _List_fromArray(
											[x, y, z]);
									} else {
										break _n0$5;
									}
								default:
									if (_n0.b.b.b.b && _n0.b.b.b.b.b) {
										var _n7 = _n0.b;
										var x = _n7.a;
										var _n8 = _n7.b;
										var y = _n8.a;
										var _n9 = _n8.b;
										var z = _n9.a;
										var _n10 = _n9.b;
										var w = _n10.a;
										var tl = _n10.b;
										return (ctr > 1000) ? A2(
											elm$core$List$cons,
											x,
											A2(
												elm$core$List$cons,
												y,
												A2(
													elm$core$List$cons,
													z,
													A2(
														elm$core$List$cons,
														w,
														A2(elm$core$List$takeTailRec, n - 4, tl))))) : A2(
											elm$core$List$cons,
											x,
											A2(
												elm$core$List$cons,
												y,
												A2(
													elm$core$List$cons,
													z,
													A2(
														elm$core$List$cons,
														w,
														A3(elm$core$List$takeFast, ctr + 1, n - 4, tl)))));
									} else {
										break _n0$5;
									}
							}
						} else {
							if (_n0.a === 1) {
								break _n0$1;
							} else {
								break _n0$5;
							}
						}
					}
				}
				return list;
			}
			var _n1 = _n0.b;
			var x = _n1.a;
			return _List_fromArray(
				[x]);
		}
	});
var elm$core$List$take = F2(
	function (n, list) {
		return A3(elm$core$List$takeFast, 0, n, list);
	});
var author$project$Types$setRound = F3(
	function (round, thread, _n0) {
		var author = _n0.a;
		var value = _n0.b;
		var start = A2(elm$core$List$take, (round / 2) | 0, thread.pairs);
		var _n1 = function () {
			var tail = A2(elm$core$List$drop, (round / 2) | 0, thread.pairs);
			if (!tail.b) {
				return _Utils_Tuple2(
					_Utils_Tuple2(elm$core$Maybe$Nothing, elm$core$Maybe$Nothing),
					_List_Nil);
			} else {
				var head = tail.a;
				var rest = tail.b;
				return _Utils_Tuple2(head, rest);
			}
		}();
		var pair = _n1.a;
		var end = _n1.b;
		var updatedPair = function () {
			var _n3 = A2(elm$core$Basics$modBy, 2, round);
			if (!_n3) {
				return _Utils_Tuple2(
					elm$core$Maybe$Just(
						A2(author$project$Types$Phrase, author, value)),
					elm$core$Maybe$Nothing);
			} else {
				return _Utils_Tuple2(
					pair.a,
					elm$core$Maybe$Just(
						A2(author$project$Types$Drawing, author, value)));
			}
		}();
		return _Utils_update(
			thread,
			{
				pairs: elm$core$List$concat(
					_List_fromArray(
						[
							start,
							_List_fromArray(
							[updatedPair]),
							end
						]))
			});
	});
var elm$core$Basics$composeR = F3(
	function (f, g, x) {
		return g(
			f(x));
	});
var elm$core$Basics$ge = _Utils_ge;
var elm$core$List$any = F2(
	function (isOkay, list) {
		any:
		while (true) {
			if (!list.b) {
				return false;
			} else {
				var x = list.a;
				var xs = list.b;
				if (isOkay(x)) {
					return true;
				} else {
					var $temp$isOkay = isOkay,
						$temp$list = xs;
					isOkay = $temp$isOkay;
					list = $temp$list;
					continue any;
				}
			}
		}
	});
var elm$core$List$member = F2(
	function (x, xs) {
		return A2(
			elm$core$List$any,
			function (a) {
				return _Utils_eq(a, x);
			},
			xs);
	});
var elm$core$Tuple$second = function (_n0) {
	var y = _n0.b;
	return y;
};
var elm$random$Random$Generate = function (a) {
	return {$: 'Generate', a: a};
};
var elm$core$Task$andThen = _Scheduler_andThen;
var elm$core$Task$succeed = _Scheduler_succeed;
var elm$core$Bitwise$shiftRightZfBy = _Bitwise_shiftRightZfBy;
var elm$random$Random$Seed = F2(
	function (a, b) {
		return {$: 'Seed', a: a, b: b};
	});
var elm$random$Random$next = function (_n0) {
	var state0 = _n0.a;
	var incr = _n0.b;
	return A2(elm$random$Random$Seed, ((state0 * 1664525) + incr) >>> 0, incr);
};
var elm$random$Random$initialSeed = function (x) {
	var _n0 = elm$random$Random$next(
		A2(elm$random$Random$Seed, 0, 1013904223));
	var state1 = _n0.a;
	var incr = _n0.b;
	var state2 = (state1 + x) >>> 0;
	return elm$random$Random$next(
		A2(elm$random$Random$Seed, state2, incr));
};
var elm$time$Time$Name = function (a) {
	return {$: 'Name', a: a};
};
var elm$time$Time$Offset = function (a) {
	return {$: 'Offset', a: a};
};
var elm$time$Time$Zone = F2(
	function (a, b) {
		return {$: 'Zone', a: a, b: b};
	});
var elm$time$Time$customZone = elm$time$Time$Zone;
var elm$time$Time$Posix = function (a) {
	return {$: 'Posix', a: a};
};
var elm$time$Time$millisToPosix = elm$time$Time$Posix;
var elm$time$Time$now = _Time_now(elm$time$Time$millisToPosix);
var elm$time$Time$posixToMillis = function (_n0) {
	var millis = _n0.a;
	return millis;
};
var elm$random$Random$init = A2(
	elm$core$Task$andThen,
	function (time) {
		return elm$core$Task$succeed(
			elm$random$Random$initialSeed(
				elm$time$Time$posixToMillis(time)));
	},
	elm$time$Time$now);
var elm$core$Platform$sendToApp = _Platform_sendToApp;
var elm$random$Random$step = F2(
	function (_n0, seed) {
		var generator = _n0.a;
		return generator(seed);
	});
var elm$random$Random$onEffects = F3(
	function (router, commands, seed) {
		if (!commands.b) {
			return elm$core$Task$succeed(seed);
		} else {
			var generator = commands.a.a;
			var rest = commands.b;
			var _n1 = A2(elm$random$Random$step, generator, seed);
			var value = _n1.a;
			var newSeed = _n1.b;
			return A2(
				elm$core$Task$andThen,
				function (_n2) {
					return A3(elm$random$Random$onEffects, router, rest, newSeed);
				},
				A2(elm$core$Platform$sendToApp, router, value));
		}
	});
var elm$random$Random$onSelfMsg = F3(
	function (_n0, _n1, seed) {
		return elm$core$Task$succeed(seed);
	});
var elm$random$Random$Generator = function (a) {
	return {$: 'Generator', a: a};
};
var elm$random$Random$map = F2(
	function (func, _n0) {
		var genA = _n0.a;
		return elm$random$Random$Generator(
			function (seed0) {
				var _n1 = genA(seed0);
				var a = _n1.a;
				var seed1 = _n1.b;
				return _Utils_Tuple2(
					func(a),
					seed1);
			});
	});
var elm$random$Random$cmdMap = F2(
	function (func, _n0) {
		var generator = _n0.a;
		return elm$random$Random$Generate(
			A2(elm$random$Random$map, func, generator));
	});
_Platform_effectManagers['Random'] = _Platform_createManager(elm$random$Random$init, elm$random$Random$onEffects, elm$random$Random$onSelfMsg, elm$random$Random$cmdMap);
var elm$random$Random$command = _Platform_leaf('Random');
var elm$random$Random$generate = F2(
	function (tagger, generator) {
		return elm$random$Random$command(
			elm$random$Random$Generate(
				A2(elm$random$Random$map, tagger, generator)));
	});
var elm$core$Array$length = function (_n0) {
	var len = _n0.a;
	return len;
};
var elm$core$Basics$negate = function (n) {
	return -n;
};
var elm$core$Bitwise$and = _Bitwise_and;
var elm$core$Bitwise$xor = _Bitwise_xor;
var elm$random$Random$peel = function (_n0) {
	var state = _n0.a;
	var word = (state ^ (state >>> ((state >>> 28) + 4))) * 277803737;
	return ((word >>> 22) ^ word) >>> 0;
};
var elm$random$Random$int = F2(
	function (a, b) {
		return elm$random$Random$Generator(
			function (seed0) {
				var _n0 = (_Utils_cmp(a, b) < 0) ? _Utils_Tuple2(a, b) : _Utils_Tuple2(b, a);
				var lo = _n0.a;
				var hi = _n0.b;
				var range = (hi - lo) + 1;
				if (!((range - 1) & range)) {
					return _Utils_Tuple2(
						(((range - 1) & elm$random$Random$peel(seed0)) >>> 0) + lo,
						elm$random$Random$next(seed0));
				} else {
					var threshhold = (((-range) >>> 0) % range) >>> 0;
					var accountForBias = function (seed) {
						accountForBias:
						while (true) {
							var x = elm$random$Random$peel(seed);
							var seedN = elm$random$Random$next(seed);
							if (_Utils_cmp(x, threshhold) < 0) {
								var $temp$seed = seedN;
								seed = $temp$seed;
								continue accountForBias;
							} else {
								return _Utils_Tuple2((x % range) + lo, seedN);
							}
						}
					};
					return accountForBias(seed0);
				}
			});
	});
var elm$random$Random$listHelp = F4(
	function (revList, n, gen, seed) {
		listHelp:
		while (true) {
			if (n < 1) {
				return _Utils_Tuple2(revList, seed);
			} else {
				var _n0 = gen(seed);
				var value = _n0.a;
				var newSeed = _n0.b;
				var $temp$revList = A2(elm$core$List$cons, value, revList),
					$temp$n = n - 1,
					$temp$gen = gen,
					$temp$seed = newSeed;
				revList = $temp$revList;
				n = $temp$n;
				gen = $temp$gen;
				seed = $temp$seed;
				continue listHelp;
			}
		}
	});
var elm$random$Random$list = F2(
	function (n, _n0) {
		var gen = _n0.a;
		return elm$random$Random$Generator(
			function (seed) {
				return A4(elm$random$Random$listHelp, _List_Nil, n, gen, seed);
			});
	});
var elm$core$Array$bitMask = 4294967295 >>> (32 - elm$core$Array$shiftStep);
var elm$core$Elm$JsArray$unsafeGet = _JsArray_unsafeGet;
var elm$core$Array$getHelp = F3(
	function (shift, index, tree) {
		getHelp:
		while (true) {
			var pos = elm$core$Array$bitMask & (index >>> shift);
			var _n0 = A2(elm$core$Elm$JsArray$unsafeGet, pos, tree);
			if (_n0.$ === 'SubTree') {
				var subTree = _n0.a;
				var $temp$shift = shift - elm$core$Array$shiftStep,
					$temp$index = index,
					$temp$tree = subTree;
				shift = $temp$shift;
				index = $temp$index;
				tree = $temp$tree;
				continue getHelp;
			} else {
				var values = _n0.a;
				return A2(elm$core$Elm$JsArray$unsafeGet, elm$core$Array$bitMask & index, values);
			}
		}
	});
var elm$core$Bitwise$shiftLeftBy = _Bitwise_shiftLeftBy;
var elm$core$Array$tailIndex = function (len) {
	return (len >>> 5) << 5;
};
var elm$core$Array$get = F2(
	function (index, _n0) {
		var len = _n0.a;
		var startShift = _n0.b;
		var tree = _n0.c;
		var tail = _n0.d;
		return ((index < 0) || (_Utils_cmp(index, len) > -1)) ? elm$core$Maybe$Nothing : ((_Utils_cmp(
			index,
			elm$core$Array$tailIndex(len)) > -1) ? elm$core$Maybe$Just(
			A2(elm$core$Elm$JsArray$unsafeGet, elm$core$Array$bitMask & index, tail)) : elm$core$Maybe$Just(
			A3(elm$core$Array$getHelp, startShift, index, tree)));
	});
var elm$core$Array$isEmpty = function (_n0) {
	var len = _n0.a;
	return !len;
};
var elm$core$Basics$compare = _Utils_compare;
var elm$core$Dict$get = F2(
	function (targetKey, dict) {
		get:
		while (true) {
			if (dict.$ === 'RBEmpty_elm_builtin') {
				return elm$core$Maybe$Nothing;
			} else {
				var key = dict.b;
				var value = dict.c;
				var left = dict.d;
				var right = dict.e;
				var _n1 = A2(elm$core$Basics$compare, targetKey, key);
				switch (_n1.$) {
					case 'LT':
						var $temp$targetKey = targetKey,
							$temp$dict = left;
						targetKey = $temp$targetKey;
						dict = $temp$dict;
						continue get;
					case 'EQ':
						return elm$core$Maybe$Just(value);
					default:
						var $temp$targetKey = targetKey,
							$temp$dict = right;
						targetKey = $temp$targetKey;
						dict = $temp$dict;
						continue get;
				}
			}
		}
	});
var owanturist$elm_union_find$UnionFind$findFast = F2(
	function (id, dict) {
		findFast:
		while (true) {
			var _n0 = A2(elm$core$Dict$get, id, dict);
			if (_n0.$ === 'Nothing') {
				return id;
			} else {
				var cursor = _n0.a;
				if (_Utils_eq(id, cursor)) {
					return id;
				} else {
					var $temp$id = cursor,
						$temp$dict = dict;
					id = $temp$id;
					dict = $temp$dict;
					continue findFast;
				}
			}
		}
	});
var owanturist$elm_union_find$UnionFind$find = F2(
	function (id, _n0) {
		var dict = _n0.b;
		return A2(owanturist$elm_union_find$UnionFind$findFast, id, dict);
	});
var elm$core$Dict$RBEmpty_elm_builtin = {$: 'RBEmpty_elm_builtin'};
var elm$core$Dict$empty = elm$core$Dict$RBEmpty_elm_builtin;
var owanturist$elm_union_find$UnionFind$QuickUnionPathCompression = F2(
	function (a, b) {
		return {$: 'QuickUnionPathCompression', a: a, b: b};
	});
var owanturist$elm_union_find$UnionFind$quickUnionPathCompression = A2(owanturist$elm_union_find$UnionFind$QuickUnionPathCompression, 0, elm$core$Dict$empty);
var elm$core$Dict$Black = {$: 'Black'};
var elm$core$Dict$RBNode_elm_builtin = F5(
	function (a, b, c, d, e) {
		return {$: 'RBNode_elm_builtin', a: a, b: b, c: c, d: d, e: e};
	});
var elm$core$Dict$Red = {$: 'Red'};
var elm$core$Dict$balance = F5(
	function (color, key, value, left, right) {
		if ((right.$ === 'RBNode_elm_builtin') && (right.a.$ === 'Red')) {
			var _n1 = right.a;
			var rK = right.b;
			var rV = right.c;
			var rLeft = right.d;
			var rRight = right.e;
			if ((left.$ === 'RBNode_elm_builtin') && (left.a.$ === 'Red')) {
				var _n3 = left.a;
				var lK = left.b;
				var lV = left.c;
				var lLeft = left.d;
				var lRight = left.e;
				return A5(
					elm$core$Dict$RBNode_elm_builtin,
					elm$core$Dict$Red,
					key,
					value,
					A5(elm$core$Dict$RBNode_elm_builtin, elm$core$Dict$Black, lK, lV, lLeft, lRight),
					A5(elm$core$Dict$RBNode_elm_builtin, elm$core$Dict$Black, rK, rV, rLeft, rRight));
			} else {
				return A5(
					elm$core$Dict$RBNode_elm_builtin,
					color,
					rK,
					rV,
					A5(elm$core$Dict$RBNode_elm_builtin, elm$core$Dict$Red, key, value, left, rLeft),
					rRight);
			}
		} else {
			if ((((left.$ === 'RBNode_elm_builtin') && (left.a.$ === 'Red')) && (left.d.$ === 'RBNode_elm_builtin')) && (left.d.a.$ === 'Red')) {
				var _n5 = left.a;
				var lK = left.b;
				var lV = left.c;
				var _n6 = left.d;
				var _n7 = _n6.a;
				var llK = _n6.b;
				var llV = _n6.c;
				var llLeft = _n6.d;
				var llRight = _n6.e;
				var lRight = left.e;
				return A5(
					elm$core$Dict$RBNode_elm_builtin,
					elm$core$Dict$Red,
					lK,
					lV,
					A5(elm$core$Dict$RBNode_elm_builtin, elm$core$Dict$Black, llK, llV, llLeft, llRight),
					A5(elm$core$Dict$RBNode_elm_builtin, elm$core$Dict$Black, key, value, lRight, right));
			} else {
				return A5(elm$core$Dict$RBNode_elm_builtin, color, key, value, left, right);
			}
		}
	});
var elm$core$Dict$insertHelp = F3(
	function (key, value, dict) {
		if (dict.$ === 'RBEmpty_elm_builtin') {
			return A5(elm$core$Dict$RBNode_elm_builtin, elm$core$Dict$Red, key, value, elm$core$Dict$RBEmpty_elm_builtin, elm$core$Dict$RBEmpty_elm_builtin);
		} else {
			var nColor = dict.a;
			var nKey = dict.b;
			var nValue = dict.c;
			var nLeft = dict.d;
			var nRight = dict.e;
			var _n1 = A2(elm$core$Basics$compare, key, nKey);
			switch (_n1.$) {
				case 'LT':
					return A5(
						elm$core$Dict$balance,
						nColor,
						nKey,
						nValue,
						A3(elm$core$Dict$insertHelp, key, value, nLeft),
						nRight);
				case 'EQ':
					return A5(elm$core$Dict$RBNode_elm_builtin, nColor, nKey, value, nLeft, nRight);
				default:
					return A5(
						elm$core$Dict$balance,
						nColor,
						nKey,
						nValue,
						nLeft,
						A3(elm$core$Dict$insertHelp, key, value, nRight));
			}
		}
	});
var elm$core$Dict$insert = F3(
	function (key, value, dict) {
		var _n0 = A3(elm$core$Dict$insertHelp, key, value, dict);
		if ((_n0.$ === 'RBNode_elm_builtin') && (_n0.a.$ === 'Red')) {
			var _n1 = _n0.a;
			var k = _n0.b;
			var v = _n0.c;
			var l = _n0.d;
			var r = _n0.e;
			return A5(elm$core$Dict$RBNode_elm_builtin, elm$core$Dict$Black, k, v, l, r);
		} else {
			var x = _n0;
			return x;
		}
	});
var owanturist$elm_union_find$UnionFind$findCompressed = F2(
	function (id, dict) {
		var _n0 = A2(elm$core$Dict$get, id, dict);
		if (_n0.$ === 'Nothing') {
			return _Utils_Tuple2(
				id,
				A3(elm$core$Dict$insert, id, id, dict));
		} else {
			var cursor = _n0.a;
			if (_Utils_eq(id, cursor)) {
				return _Utils_Tuple2(id, dict);
			} else {
				var _n1 = A2(owanturist$elm_union_find$UnionFind$findCompressed, cursor, dict);
				var parent = _n1.a;
				var nextDict = _n1.b;
				return _Utils_Tuple2(
					parent,
					A3(elm$core$Dict$insert, id, parent, nextDict));
			}
		}
	});
var owanturist$elm_union_find$UnionFind$union = F3(
	function (left, right, _n0) {
		var count_ = _n0.a;
		var dict = _n0.b;
		var _n1 = A2(owanturist$elm_union_find$UnionFind$findCompressed, left, dict);
		var leftRoot = _n1.a;
		var leftDict = _n1.b;
		var _n2 = A2(owanturist$elm_union_find$UnionFind$findCompressed, right, leftDict);
		var rightRoot = _n2.a;
		var rightDict = _n2.b;
		return _Utils_eq(leftRoot, rightRoot) ? A2(owanturist$elm_union_find$UnionFind$QuickUnionPathCompression, count_, rightDict) : A2(
			owanturist$elm_union_find$UnionFind$QuickUnionPathCompression,
			count_ + 1,
			A3(elm$core$Dict$insert, leftRoot, rightRoot, rightDict));
	});
var elm_community$random_extra$Utils$selectUniqByIndexes = F2(
	function (values, randomIndexes) {
		var modByLength = elm$core$Basics$modBy(
			elm$core$Array$length(values));
		var step = F2(
			function (randomIndex, _n1) {
				var uf = _n1.a;
				var acc = _n1.b;
				var leaderOfElement = A2(owanturist$elm_union_find$UnionFind$find, randomIndex, uf);
				var leaderOfNextElement = A2(
					owanturist$elm_union_find$UnionFind$find,
					modByLength(leaderOfElement + 1),
					uf);
				var _n0 = A2(elm$core$Array$get, leaderOfElement, values);
				if (_n0.$ === 'Nothing') {
					return _Utils_Tuple2(uf, acc);
				} else {
					var value = _n0.a;
					return _Utils_Tuple2(
						A3(owanturist$elm_union_find$UnionFind$union, leaderOfElement, leaderOfNextElement, uf),
						A2(elm$core$List$cons, value, acc));
				}
			});
		return elm$core$Array$isEmpty(values) ? _List_Nil : A3(
			elm$core$List$foldr,
			step,
			_Utils_Tuple2(owanturist$elm_union_find$UnionFind$quickUnionPathCompression, _List_Nil),
			randomIndexes).b;
	});
var elm_community$random_extra$Random$List$shuffle = function (list) {
	var values = elm$core$Array$fromList(list);
	var length = elm$core$Array$length(values);
	return A2(
		elm$random$Random$map,
		elm_community$random_extra$Utils$selectUniqByIndexes(values),
		A2(
			elm$random$Random$list,
			length,
			A2(elm$random$Random$int, 0, length - 1)));
};
var author$project$Main$update = F2(
	function (msg, model) {
		var me = model.me;
		switch (msg.$) {
			case 'SetPeerId':
				var peerId = msg.a;
				var newMe = _Utils_update(
					me,
					{peerId: peerId});
				var gameId = model.me.host ? peerId : model.gameId;
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{gameId: gameId, me: newMe}),
					author$project$Main$sendPlayer(
						author$project$Main$encodePlayer(newMe)));
			case 'SetGameId':
				var gameId = msg.a;
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{gameId: gameId}),
					elm$core$Platform$Cmd$none);
			case 'StartNewGame':
				var newMe = _Utils_update(
					me,
					{host: true});
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{
							gameId: newMe.peerId,
							me: newMe,
							page: author$project$Types$NewGame,
							players: _List_fromArray(
								[newMe])
						}),
					elm$core$Platform$Cmd$none);
			case 'SetName':
				var name = msg.a;
				var newMe = _Utils_update(
					me,
					{name: name});
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{
							me: newMe,
							players: A2(
								elm$core$List$map,
								function (p) {
									return _Utils_eq(p.peerId, me.peerId) ? newMe : p;
								},
								model.players)
						}),
					author$project$Main$sendPlayer(
						author$project$Main$encodePlayer(newMe)));
			case 'JoinGame':
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{
							me: _Utils_update(
								me,
								{host: false}),
							page: author$project$Types$NewGame
						}),
					author$project$Main$connectHost(model.gameId));
			case 'SetPlayer':
				var player = msg.a;
				var updatedPlayers = A2(
					elm$core$List$map,
					function (p) {
						return _Utils_eq(p.peerId, player.peerId) ? player : p;
					},
					model.players);
				var newPlayers = A2(elm$core$List$member, player, updatedPlayers) ? updatedPlayers : A2(elm$core$List$cons, player, model.players);
				var newMe = _Utils_eq(player.peerId, model.me.peerId) ? _Utils_update(
					player,
					{name: model.me.name}) : model.me;
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{me: newMe, players: newPlayers}),
					model.me.host ? elm$core$Platform$Cmd$batch(
						A2(
							elm$core$List$map,
							A2(elm$core$Basics$composeR, author$project$Main$encodePlayer, author$project$Main$sendPlayer),
							newPlayers)) : elm$core$Platform$Cmd$none);
			case 'SetupGame':
				var threads = A2(
					elm$core$List$map,
					function (id) {
						return A2(author$project$Types$Thread, id, _List_Nil);
					},
					A2(
						elm$core$List$range,
						0,
						elm$core$List$length(model.players) - 1));
				var playersGen = elm_community$random_extra$Random$List$shuffle(model.players);
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{threads: threads}),
					A2(elm$random$Random$generate, author$project$Main$StartGame, playersGen));
			case 'StartGame':
				var players = msg.a;
				var sendThreads = A2(
					elm$core$List$map,
					A2(elm$core$Basics$composeR, author$project$Main$encodeThread, author$project$Main$sendThread),
					model.threads);
				var newPlayers = A2(
					elm$core$List$map,
					function (_n1) {
						var index = _n1.a;
						var player = _n1.b;
						return A4(author$project$Types$Player, index, player.host, player.name, player.peerId);
					},
					A2(elm$core$List$indexedMap, elm$core$Tuple$pair, players));
				var sendPlayers = A2(
					elm$core$List$map,
					A2(elm$core$Basics$composeR, author$project$Main$encodePlayer, author$project$Main$sendPlayer),
					newPlayers);
				var newMe = A2(
					elm$core$Maybe$withDefault,
					model.me,
					elm$core$List$head(
						A2(
							elm$core$List$filter,
							function (p) {
								return _Utils_eq(p.peerId, model.me.peerId);
							},
							newPlayers)));
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{
							me: newMe,
							page: author$project$Types$NewThread,
							players: newPlayers,
							round: elm$core$Maybe$Just(
								_Utils_Tuple2(0, ''))
						}),
					elm$core$Platform$Cmd$batch(
						_Utils_ap(sendPlayers, sendThreads)));
			case 'SetThread':
				var threadResult = msg.a;
				if (threadResult.$ === 'Err') {
					var error = threadResult.a;
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{
								error: elm$core$Maybe$Just(error)
							}),
						elm$core$Platform$Cmd$none);
				} else {
					var thread = threadResult.a;
					var threads = A2(
						elm$core$List$map,
						function (t) {
							return _Utils_eq(t.id, thread.id) ? thread : t;
						},
						model.threads);
					var newThreads = A2(elm$core$List$member, thread, threads) ? threads : A2(elm$core$List$cons, thread, model.threads);
					var cmd = model.me.host ? author$project$Main$sendThread(
						author$project$Main$encodeThread(thread)) : elm$core$Platform$Cmd$none;
					var _n3 = model.round;
					if (_n3.$ === 'Nothing') {
						return _Utils_Tuple2(
							_Utils_update(
								model,
								{
									page: author$project$Types$NewThread,
									round: elm$core$Maybe$Just(
										_Utils_Tuple2(0, '')),
									threads: newThreads
								}),
							cmd);
					} else {
						var round = _n3.a;
						return _Utils_Tuple2(
							_Utils_update(
								model,
								{threads: newThreads}),
							cmd);
					}
				}
			case 'SetRound':
				var value = msg.a;
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{
							round: elm$core$Maybe$Just(
								_Utils_Tuple2(
									A2(
										elm$core$Maybe$withDefault,
										0,
										A2(elm$core$Maybe$map, elm$core$Tuple$first, model.round)),
									value))
						}),
					elm$core$Platform$Cmd$none);
			default:
				var currentResult = author$project$Types$getCurrent(model);
				var roundResult = A2(
					elm$core$Result$map,
					function (_n9) {
						var round = _n9.a;
						var thread = _n9.b;
						return A3(
							author$project$Types$setRound,
							round.a,
							thread,
							_Utils_Tuple2(model.me.name, round.b));
					},
					currentResult);
				var _n4 = A3(elm$core$Result$map2, elm$core$Tuple$pair, roundResult, currentResult);
				if (_n4.$ === 'Ok') {
					var _n5 = _n4.a;
					var thread = _n5.a;
					var _n6 = _n5.b;
					var _n7 = _n6.a;
					var round = _n7.a;
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{
								page: function () {
									var _n8 = model.page;
									if (_n8.$ === 'Draw') {
										return author$project$Types$Describe;
									} else {
										return (_Utils_cmp(
											round,
											((((elm$core$List$length(model.players) - 1) / 2) | 0) * 2) + 1) > -1) ? author$project$Types$Review : author$project$Types$Draw;
									}
								}(),
								round: elm$core$Maybe$Just(
									_Utils_Tuple2(round + 1, '')),
								threads: A2(
									elm$core$List$map,
									function (t) {
										return _Utils_eq(t.id, thread.id) ? thread : t;
									},
									model.threads)
							}),
						author$project$Main$sendThread(
							author$project$Main$encodeThread(thread)));
				} else {
					var error = _n4.a;
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{
								error: elm$core$Maybe$Just(error)
							}),
						elm$core$Platform$Cmd$none);
				}
		}
	});
var author$project$Main$SetRound = function (a) {
	return {$: 'SetRound', a: a};
};
var author$project$Main$SubmitRound = {$: 'SubmitRound'};
var elm$virtual_dom$VirtualDom$toHandlerInt = function (handler) {
	switch (handler.$) {
		case 'Normal':
			return 0;
		case 'MayStopPropagation':
			return 1;
		case 'MayPreventDefault':
			return 2;
		default:
			return 3;
	}
};
var elm$html$Html$div = _VirtualDom_node('div');
var elm$virtual_dom$VirtualDom$style = _VirtualDom_style;
var elm$html$Html$Attributes$style = elm$virtual_dom$VirtualDom$style;
var author$project$Main$rowView = function (rows) {
	return A2(
		elm$html$Html$div,
		_List_fromArray(
			[
				A2(elm$html$Html$Attributes$style, 'display', 'grid'),
				A2(elm$html$Html$Attributes$style, 'grid-auto-flow', 'row'),
				A2(
				elm$html$Html$Attributes$style,
				'grid-template-rows',
				A2(
					elm$core$String$join,
					' ',
					A2(elm$core$List$map, elm$core$Tuple$first, rows))),
				A2(elm$html$Html$Attributes$style, 'grid-gap', '1em'),
				A2(elm$html$Html$Attributes$style, 'height', '100%')
			]),
		A2(elm$core$List$map, elm$core$Tuple$second, rows));
};
var elm$core$List$maybeCons = F3(
	function (f, mx, xs) {
		var _n0 = f(mx);
		if (_n0.$ === 'Just') {
			var x = _n0.a;
			return A2(elm$core$List$cons, x, xs);
		} else {
			return xs;
		}
	});
var elm$core$List$filterMap = F2(
	function (f, xs) {
		return A3(
			elm$core$List$foldr,
			elm$core$List$maybeCons(f),
			_List_Nil,
			xs);
	});
var elm$core$List$sortBy = _List_sortBy;
var elm$core$Maybe$andThen = F2(
	function (callback, maybeValue) {
		if (maybeValue.$ === 'Just') {
			var value = maybeValue.a;
			return callback(value);
		} else {
			return elm$core$Maybe$Nothing;
		}
	});
var elm$html$Html$button = _VirtualDom_node('button');
var elm$html$Html$code = _VirtualDom_node('code');
var elm$html$Html$input = _VirtualDom_node('input');
var elm$html$Html$p = _VirtualDom_node('p');
var elm$virtual_dom$VirtualDom$text = _VirtualDom_text;
var elm$html$Html$text = elm$virtual_dom$VirtualDom$text;
var elm$html$Html$Attributes$stringProperty = F2(
	function (key, string) {
		return A2(
			_VirtualDom_property,
			key,
			elm$json$Json$Encode$string(string));
	});
var elm$html$Html$Attributes$placeholder = elm$html$Html$Attributes$stringProperty('placeholder');
var elm$virtual_dom$VirtualDom$Normal = function (a) {
	return {$: 'Normal', a: a};
};
var elm$virtual_dom$VirtualDom$on = _VirtualDom_on;
var elm$html$Html$Events$on = F2(
	function (event, decoder) {
		return A2(
			elm$virtual_dom$VirtualDom$on,
			event,
			elm$virtual_dom$VirtualDom$Normal(decoder));
	});
var elm$html$Html$Events$onClick = function (msg) {
	return A2(
		elm$html$Html$Events$on,
		'click',
		elm$json$Json$Decode$succeed(msg));
};
var elm$html$Html$Events$alwaysStop = function (x) {
	return _Utils_Tuple2(x, true);
};
var elm$virtual_dom$VirtualDom$MayStopPropagation = function (a) {
	return {$: 'MayStopPropagation', a: a};
};
var elm$html$Html$Events$stopPropagationOn = F2(
	function (event, decoder) {
		return A2(
			elm$virtual_dom$VirtualDom$on,
			event,
			elm$virtual_dom$VirtualDom$MayStopPropagation(decoder));
	});
var elm$json$Json$Decode$at = F2(
	function (fields, decoder) {
		return A3(elm$core$List$foldr, elm$json$Json$Decode$field, decoder, fields);
	});
var elm$html$Html$Events$targetValue = A2(
	elm$json$Json$Decode$at,
	_List_fromArray(
		['target', 'value']),
	elm$json$Json$Decode$string);
var elm$html$Html$Events$onInput = function (tagger) {
	return A2(
		elm$html$Html$Events$stopPropagationOn,
		'input',
		A2(
			elm$json$Json$Decode$map,
			elm$html$Html$Events$alwaysStop,
			A2(elm$json$Json$Decode$map, tagger, elm$html$Html$Events$targetValue)));
};
var author$project$Main$newDescribeView = function (model) {
	var currentResult = author$project$Types$getCurrent(model);
	var drawingResult = A2(
		elm$core$Result$andThen,
		function (_n4) {
			var _n5 = _n4.a;
			var round = _n5.a;
			var thread = _n4.b;
			return A2(
				elm$core$Result$fromMaybe,
				'waiting on other players',
				A2(
					elm$core$Maybe$map,
					function ($) {
						return $.drawing;
					},
					A2(
						elm$core$Maybe$andThen,
						elm$core$Tuple$second,
						elm$core$List$head(
							A2(
								elm$core$List$filterMap,
								function (_n6) {
									var i = _n6.a;
									var pair = _n6.b;
									return _Utils_eq(i, ((round / 2) | 0) - 1) ? elm$core$Maybe$Just(pair) : elm$core$Maybe$Nothing;
								},
								A2(elm$core$List$indexedMap, elm$core$Tuple$pair, thread.pairs))))));
		},
		currentResult);
	if (currentResult.$ === 'Err') {
		var error = currentResult.a;
		return author$project$Main$rowView(
			_List_fromArray(
				[
					_Utils_Tuple2(
					'auto',
					A2(
						elm$html$Html$p,
						_List_Nil,
						_List_fromArray(
							[
								elm$html$Html$text(error)
							])))
				]));
	} else {
		var _n1 = currentResult.a;
		var _n2 = _n1.a;
		var round = _n2.a;
		var thread = _n1.b;
		var playerOrder = A2(
			elm$core$List$sortBy,
			A2(
				elm$core$Basics$composeR,
				function ($) {
					return $.index;
				},
				A2(
					elm$core$Basics$composeR,
					elm$core$Basics$sub(model.me.index),
					A2(
						elm$core$Basics$composeR,
						elm$core$Basics$add(round),
						elm$core$Basics$modBy(
							elm$core$List$length(model.players))))),
			model.players);
		if (drawingResult.$ === 'Err') {
			var error = drawingResult.a;
			return author$project$Main$rowView(
				_List_fromArray(
					[
						_Utils_Tuple2(
						'auto',
						A2(
							elm$html$Html$code,
							_List_Nil,
							_List_fromArray(
								[
									elm$html$Html$text(
									A2(elm$core$Maybe$withDefault, '', model.error))
								]))),
						_Utils_Tuple2(
						'auto',
						A2(
							elm$html$Html$p,
							_List_Nil,
							_List_fromArray(
								[
									elm$html$Html$text(error)
								]))),
						_Utils_Tuple2(
						'auto',
						A2(
							elm$html$Html$p,
							_List_Nil,
							_List_fromArray(
								[
									elm$html$Html$text(
									A2(
										elm$core$String$join,
										' → ',
										A2(
											elm$core$List$map,
											function ($) {
												return $.name;
											},
											playerOrder)))
								])))
					]));
		} else {
			var drawing = drawingResult.a;
			return author$project$Main$rowView(
				_List_fromArray(
					[
						_Utils_Tuple2(
						'auto',
						A2(
							elm$html$Html$code,
							_List_Nil,
							_List_fromArray(
								[
									elm$html$Html$text(
									A2(elm$core$Maybe$withDefault, '', model.error))
								]))),
						_Utils_Tuple2(
						'1fr',
						A2(
							elm$html$Html$div,
							_List_fromArray(
								[
									A2(elm$html$Html$Attributes$style, 'background-image', 'url(' + (drawing + ')')),
									A2(elm$html$Html$Attributes$style, 'background-size', 'contain'),
									A2(elm$html$Html$Attributes$style, 'background-position', 'center'),
									A2(elm$html$Html$Attributes$style, 'background-repeat', 'no-repeat')
								]),
							_List_Nil)),
						_Utils_Tuple2(
						'auto',
						A2(
							elm$html$Html$input,
							_List_fromArray(
								[
									elm$html$Html$Events$onInput(author$project$Main$SetRound),
									elm$html$Html$Attributes$placeholder('Describe the drawing')
								]),
							_List_Nil)),
						_Utils_Tuple2(
						'auto',
						A2(
							elm$html$Html$button,
							_List_fromArray(
								[
									elm$html$Html$Events$onClick(author$project$Main$SubmitRound)
								]),
							_List_fromArray(
								[
									elm$html$Html$text('Submit')
								])))
					]));
		}
	}
};
var elm$html$Html$h1 = _VirtualDom_node('h1');
var elm$virtual_dom$VirtualDom$node = function (tag) {
	return _VirtualDom_node(
		_VirtualDom_noScript(tag));
};
var elm$html$Html$node = elm$virtual_dom$VirtualDom$node;
var elm$html$Html$Attributes$alt = elm$html$Html$Attributes$stringProperty('alt');
var author$project$Main$newDrawingView = function (model) {
	var currentResult = author$project$Types$getCurrent(model);
	var phraseResult = A2(
		elm$core$Result$andThen,
		function (_n4) {
			var _n5 = _n4.a;
			var round = _n5.a;
			var thread = _n4.b;
			return A2(
				elm$core$Result$fromMaybe,
				'waiting on other players',
				A2(
					elm$core$Maybe$map,
					function ($) {
						return $.phrase;
					},
					A2(
						elm$core$Maybe$andThen,
						elm$core$Tuple$first,
						elm$core$List$head(
							A2(
								elm$core$List$filterMap,
								function (_n6) {
									var i = _n6.a;
									var pair = _n6.b;
									return _Utils_eq(i, (round / 2) | 0) ? elm$core$Maybe$Just(pair) : elm$core$Maybe$Nothing;
								},
								A2(elm$core$List$indexedMap, elm$core$Tuple$pair, thread.pairs))))));
		},
		currentResult);
	if (currentResult.$ === 'Err') {
		var error = currentResult.a;
		return author$project$Main$rowView(
			_List_fromArray(
				[
					_Utils_Tuple2(
					'auto',
					A2(
						elm$html$Html$p,
						_List_Nil,
						_List_fromArray(
							[
								elm$html$Html$text(error)
							])))
				]));
	} else {
		var _n1 = currentResult.a;
		var _n2 = _n1.a;
		var round = _n2.a;
		var thread = _n1.b;
		var playerOrder = A2(
			elm$core$List$sortBy,
			A2(
				elm$core$Basics$composeR,
				function ($) {
					return $.index;
				},
				A2(
					elm$core$Basics$composeR,
					elm$core$Basics$sub(model.me.index),
					A2(
						elm$core$Basics$composeR,
						elm$core$Basics$add(round),
						elm$core$Basics$modBy(
							elm$core$List$length(model.players))))),
			model.players);
		if (phraseResult.$ === 'Err') {
			var error = phraseResult.a;
			return author$project$Main$rowView(
				_List_fromArray(
					[
						_Utils_Tuple2(
						'auto',
						A2(
							elm$html$Html$code,
							_List_Nil,
							_List_fromArray(
								[
									elm$html$Html$text(
									A2(elm$core$Maybe$withDefault, '', model.error))
								]))),
						_Utils_Tuple2(
						'auto',
						A2(
							elm$html$Html$p,
							_List_Nil,
							_List_fromArray(
								[
									elm$html$Html$text(error)
								]))),
						_Utils_Tuple2(
						'auto',
						A2(
							elm$html$Html$p,
							_List_Nil,
							_List_fromArray(
								[
									elm$html$Html$text(
									A2(
										elm$core$String$join,
										' → ',
										A2(
											elm$core$List$map,
											function ($) {
												return $.name;
											},
											playerOrder)))
								])))
					]));
		} else {
			var phrase = phraseResult.a;
			return author$project$Main$rowView(
				_List_fromArray(
					[
						_Utils_Tuple2(
						'auto',
						A2(
							elm$html$Html$code,
							_List_Nil,
							_List_fromArray(
								[
									elm$html$Html$text(
									A2(elm$core$Maybe$withDefault, '', model.error))
								]))),
						_Utils_Tuple2(
						'auto',
						A2(
							elm$html$Html$h1,
							_List_Nil,
							_List_fromArray(
								[
									elm$html$Html$text(phrase)
								]))),
						_Utils_Tuple2(
						'1fr',
						A3(
							elm$html$Html$node,
							'drawing-canvas',
							_List_fromArray(
								[
									elm$html$Html$Attributes$alt('Draw what it is here'),
									A2(elm$html$Html$Attributes$style, 'height', 'calc(100vh - 16rem)'),
									A2(elm$html$Html$Attributes$style, 'width', 'calc((100vh - 16rem)/2)'),
									A2(elm$html$Html$Attributes$style, 'place-self', 'center'),
									A2(elm$html$Html$Attributes$style, 'outline', '2px dashed lightgray'),
									A2(
									elm$html$Html$Events$on,
									'drawingChanged',
									A2(
										elm$json$Json$Decode$map,
										author$project$Main$SetRound,
										A2(
											elm$json$Json$Decode$at,
											_List_fromArray(
												['target', 'drawing']),
											elm$json$Json$Decode$string)))
								]),
							_List_Nil)),
						_Utils_Tuple2(
						'auto',
						A2(
							elm$html$Html$button,
							_List_fromArray(
								[
									elm$html$Html$Events$onClick(author$project$Main$SubmitRound)
								]),
							_List_fromArray(
								[
									elm$html$Html$text('Submit')
								]))),
						_Utils_Tuple2(
						'auto',
						A2(
							elm$html$Html$p,
							_List_Nil,
							_List_fromArray(
								[
									elm$html$Html$text(
									A2(
										elm$core$String$join,
										' → ',
										A2(
											elm$core$List$map,
											function ($) {
												return $.name;
											},
											playerOrder)))
								])))
					]));
		}
	}
};
var author$project$Main$SetName = function (a) {
	return {$: 'SetName', a: a};
};
var author$project$Main$SetupGame = {$: 'SetupGame'};
var author$project$Main$columnView = function (cols) {
	return A2(
		elm$html$Html$div,
		_List_fromArray(
			[
				A2(elm$html$Html$Attributes$style, 'display', 'grid'),
				A2(elm$html$Html$Attributes$style, 'grid-auto-flow', 'column'),
				A2(
				elm$html$Html$Attributes$style,
				'grid-template-columns',
				A2(
					elm$core$String$join,
					' ',
					A2(elm$core$List$map, elm$core$Tuple$first, cols))),
				A2(elm$html$Html$Attributes$style, 'grid-gap', '1em'),
				A2(elm$html$Html$Attributes$style, 'height', '100%')
			]),
		A2(elm$core$List$map, elm$core$Tuple$second, cols));
};
var elm$core$List$singleton = function (value) {
	return _List_fromArray(
		[value]);
};
var elm$core$Result$withDefault = F2(
	function (def, result) {
		if (result.$ === 'Ok') {
			var a = result.a;
			return a;
		} else {
			return def;
		}
	});
var elm$html$Html$label = _VirtualDom_node('label');
var elm$html$Html$li = _VirtualDom_node('li');
var elm$html$Html$pre = _VirtualDom_node('pre');
var elm$html$Html$ul = _VirtualDom_node('ul');
var elm$html$Html$Attributes$class = elm$html$Html$Attributes$stringProperty('className');
var elm$html$Html$Attributes$boolProperty = F2(
	function (key, bool) {
		return A2(
			_VirtualDom_property,
			key,
			elm$json$Json$Encode$bool(bool));
	});
var elm$html$Html$Attributes$disabled = elm$html$Html$Attributes$boolProperty('disabled');
var elm$html$Html$Attributes$value = elm$html$Html$Attributes$stringProperty('value');
var pablohirafuji$elm_qrcode$QRCode$Quartile = {$: 'Quartile'};
var elm$core$Result$mapError = F2(
	function (f, result) {
		if (result.$ === 'Ok') {
			var v = result.a;
			return elm$core$Result$Ok(v);
		} else {
			var e = result.a;
			return elm$core$Result$Err(
				f(e));
		}
	});
var pablohirafuji$elm_qrcode$QRCode$QRCode = function (a) {
	return {$: 'QRCode', a: a};
};
var pablohirafuji$elm_qrcode$QRCode$ECLevel$H = {$: 'H'};
var pablohirafuji$elm_qrcode$QRCode$ECLevel$L = {$: 'L'};
var pablohirafuji$elm_qrcode$QRCode$ECLevel$M = {$: 'M'};
var pablohirafuji$elm_qrcode$QRCode$ECLevel$Q = {$: 'Q'};
var pablohirafuji$elm_qrcode$QRCode$convertEC = function (ec) {
	switch (ec.$) {
		case 'Low':
			return pablohirafuji$elm_qrcode$QRCode$ECLevel$L;
		case 'Medium':
			return pablohirafuji$elm_qrcode$QRCode$ECLevel$M;
		case 'Quartile':
			return pablohirafuji$elm_qrcode$QRCode$ECLevel$Q;
		default:
			return pablohirafuji$elm_qrcode$QRCode$ECLevel$H;
	}
};
var pablohirafuji$elm_qrcode$QRCode$AlignmentPatternNotFound = {$: 'AlignmentPatternNotFound'};
var pablohirafuji$elm_qrcode$QRCode$InputLengthOverflow = {$: 'InputLengthOverflow'};
var pablohirafuji$elm_qrcode$QRCode$InvalidAlphanumericChar = {$: 'InvalidAlphanumericChar'};
var pablohirafuji$elm_qrcode$QRCode$InvalidNumericChar = {$: 'InvalidNumericChar'};
var pablohirafuji$elm_qrcode$QRCode$InvalidUTF8Char = {$: 'InvalidUTF8Char'};
var pablohirafuji$elm_qrcode$QRCode$LogTableException = function (a) {
	return {$: 'LogTableException', a: a};
};
var pablohirafuji$elm_qrcode$QRCode$PolynomialModException = {$: 'PolynomialModException'};
var pablohirafuji$elm_qrcode$QRCode$PolynomialMultiplyException = {$: 'PolynomialMultiplyException'};
var pablohirafuji$elm_qrcode$QRCode$convertError = function (e) {
	switch (e.$) {
		case 'AlignmentPatternNotFound':
			return pablohirafuji$elm_qrcode$QRCode$AlignmentPatternNotFound;
		case 'InvalidNumericChar':
			return pablohirafuji$elm_qrcode$QRCode$InvalidNumericChar;
		case 'InvalidAlphanumericChar':
			return pablohirafuji$elm_qrcode$QRCode$InvalidAlphanumericChar;
		case 'InvalidUTF8Char':
			return pablohirafuji$elm_qrcode$QRCode$InvalidUTF8Char;
		case 'LogTableException':
			var n = e.a;
			return pablohirafuji$elm_qrcode$QRCode$LogTableException(n);
		case 'PolynomialMultiplyException':
			return pablohirafuji$elm_qrcode$QRCode$PolynomialMultiplyException;
		case 'PolynomialModException':
			return pablohirafuji$elm_qrcode$QRCode$PolynomialModException;
		default:
			return pablohirafuji$elm_qrcode$QRCode$InputLengthOverflow;
	}
};
var elm$core$List$repeatHelp = F3(
	function (result, n, value) {
		repeatHelp:
		while (true) {
			if (n <= 0) {
				return result;
			} else {
				var $temp$result = A2(elm$core$List$cons, value, result),
					$temp$n = n - 1,
					$temp$value = value;
				result = $temp$result;
				n = $temp$n;
				value = $temp$value;
				continue repeatHelp;
			}
		}
	});
var elm$core$List$repeat = F2(
	function (n, value) {
		return A3(elm$core$List$repeatHelp, _List_Nil, n, value);
	});
var pablohirafuji$elm_qrcode$QRCode$Encode$firstFillerByte = 236;
var pablohirafuji$elm_qrcode$QRCode$Encode$secondFillerByte = 17;
var pablohirafuji$elm_qrcode$QRCode$Encode$addFiller = F2(
	function (capacity, bytes) {
		var fillerLength = ((capacity / 8) | 0) - elm$core$List$length(bytes);
		var ns = elm$core$List$concat(
			A2(
				elm$core$List$repeat,
				(fillerLength / 2) | 0,
				_List_fromArray(
					[pablohirafuji$elm_qrcode$QRCode$Encode$firstFillerByte, pablohirafuji$elm_qrcode$QRCode$Encode$secondFillerByte])));
		return (!A2(elm$core$Basics$modBy, 2, fillerLength)) ? _Utils_ap(bytes, ns) : _Utils_ap(
			bytes,
			_Utils_ap(
				ns,
				_List_fromArray(
					[pablohirafuji$elm_qrcode$QRCode$Encode$firstFillerByte])));
	});
var elm$core$Basics$min = F2(
	function (x, y) {
		return (_Utils_cmp(x, y) < 0) ? x : y;
	});
var pablohirafuji$elm_qrcode$QRCode$Encode$addTerminator = F3(
	function (capacity, bitsCount, bits) {
		return _Utils_ap(
			bits,
			_List_fromArray(
				[
					_Utils_Tuple2(
					0,
					A2(elm$core$Basics$min, 4, capacity - bitsCount))
				]));
	});
var elm$core$Bitwise$or = _Bitwise_or;
var elm$core$Bitwise$shiftRightBy = _Bitwise_shiftRightBy;
var pablohirafuji$elm_qrcode$QRCode$Encode$bitsToBytes3 = function (_n0) {
	bitsToBytes3:
	while (true) {
		var _n1 = _n0.a;
		var bits = _n1.a;
		var length = _n1.b;
		var bytes = _n0.b;
		if (length >= 8) {
			var remLength = length - 8;
			var remBits = bits & ((1 << remLength) - 1);
			var _byte = bits >> remLength;
			var $temp$_n0 = _Utils_Tuple2(
				_Utils_Tuple2(remBits, remLength),
				A2(elm$core$List$cons, _byte, bytes));
			_n0 = $temp$_n0;
			continue bitsToBytes3;
		} else {
			return _Utils_Tuple2(
				_Utils_Tuple2(bits, length),
				bytes);
		}
	}
};
var pablohirafuji$elm_qrcode$QRCode$Encode$bitsToBytes2 = F2(
	function (_n0, _n1) {
		var curBits = _n0.a;
		var curLength = _n0.b;
		var _n2 = _n1.a;
		var remBits = _n2.a;
		var remLength = _n2.b;
		var bytes = _n1.b;
		var lengthSum = curLength + remLength;
		var bitsSum = curBits | (remBits << curLength);
		return pablohirafuji$elm_qrcode$QRCode$Encode$bitsToBytes3(
			_Utils_Tuple2(
				_Utils_Tuple2(bitsSum, lengthSum),
				bytes));
	});
var pablohirafuji$elm_qrcode$QRCode$Encode$bitsToBytes1 = F2(
	function (bits, _n0) {
		bitsToBytes1:
		while (true) {
			var _n1 = _n0.a;
			var remBits = _n1.a;
			var remLength = _n1.b;
			var bytes = _n0.b;
			if (bits.b) {
				var head = bits.a;
				var tail = bits.b;
				var $temp$bits = tail,
					$temp$_n0 = A2(
					pablohirafuji$elm_qrcode$QRCode$Encode$bitsToBytes2,
					head,
					_Utils_Tuple2(
						_Utils_Tuple2(remBits, remLength),
						bytes));
				bits = $temp$bits;
				_n0 = $temp$_n0;
				continue bitsToBytes1;
			} else {
				return (!remLength) ? elm$core$List$reverse(bytes) : elm$core$List$reverse(
					A2(elm$core$List$cons, remBits << (8 - remLength), bytes));
			}
		}
	});
var pablohirafuji$elm_qrcode$QRCode$Encode$bitsToBytes = function (bits) {
	return A2(
		pablohirafuji$elm_qrcode$QRCode$Encode$bitsToBytes1,
		bits,
		_Utils_Tuple2(
			_Utils_Tuple2(0, 0),
			_List_Nil));
};
var elm$core$String$length = _String_length;
var pablohirafuji$elm_qrcode$QRCode$Encode$UTF8 = {$: 'UTF8'};
var pablohirafuji$elm_qrcode$QRCode$Encode$charCountIndicatorLength = F2(
	function (mode, version) {
		if (version <= 9) {
			switch (mode.$) {
				case 'Numeric':
					return 10;
				case 'Alphanumeric':
					return 9;
				case 'Byte':
					return 8;
				default:
					return 8;
			}
		} else {
			if (version <= 26) {
				switch (mode.$) {
					case 'Numeric':
						return 12;
					case 'Alphanumeric':
						return 11;
					case 'Byte':
						return 16;
					default:
						return 16;
				}
			} else {
				switch (mode.$) {
					case 'Numeric':
						return 14;
					case 'Alphanumeric':
						return 13;
					case 'Byte':
						return 16;
					default:
						return 16;
				}
			}
		}
	});
var pablohirafuji$elm_qrcode$QRCode$Encode$charCountIndicator = F2(
	function (_n0, bits) {
		var groupInfo = _n0.groupInfo;
		var inputStr = _n0.inputStr;
		var mode = _n0.mode;
		var length = A2(pablohirafuji$elm_qrcode$QRCode$Encode$charCountIndicatorLength, mode, groupInfo.version);
		var charCount = _Utils_eq(mode, pablohirafuji$elm_qrcode$QRCode$Encode$UTF8) ? elm$core$List$length(bits) : elm$core$String$length(inputStr);
		return _Utils_Tuple2(charCount, length);
	});
var pablohirafuji$elm_qrcode$QRCode$Encode$modeIndicator = function (mode) {
	switch (mode.$) {
		case 'Numeric':
			return 1;
		case 'Alphanumeric':
			return 2;
		case 'Byte':
			return 4;
		default:
			return 4;
	}
};
var pablohirafuji$elm_qrcode$QRCode$Encode$addInfoAndFinalBits = function (_n0) {
	var bits = _n0.a;
	var model = _n0.b;
	return _Utils_Tuple2(
		model,
		A2(
			pablohirafuji$elm_qrcode$QRCode$Encode$addFiller,
			model.groupInfo.capacity,
			pablohirafuji$elm_qrcode$QRCode$Encode$bitsToBytes(
				A3(
					pablohirafuji$elm_qrcode$QRCode$Encode$addTerminator,
					model.groupInfo.capacity,
					model.bitsCount,
					A2(
						elm$core$List$cons,
						_Utils_Tuple2(
							pablohirafuji$elm_qrcode$QRCode$Encode$modeIndicator(model.mode),
							4),
						A2(
							elm$core$List$cons,
							A2(pablohirafuji$elm_qrcode$QRCode$Encode$charCountIndicator, model, bits),
							bits))))));
};
var elm$core$List$tail = function (list) {
	if (list.b) {
		var x = list.a;
		var xs = list.b;
		return elm$core$Maybe$Just(xs);
	} else {
		return elm$core$Maybe$Nothing;
	}
};
var pablohirafuji$elm_qrcode$QRCode$Helpers$transpose = function (ll) {
	transpose:
	while (true) {
		if (!ll.b) {
			return _List_Nil;
		} else {
			if (!ll.a.b) {
				var xss = ll.b;
				var $temp$ll = xss;
				ll = $temp$ll;
				continue transpose;
			} else {
				var _n1 = ll.a;
				var x = _n1.a;
				var xs = _n1.b;
				var xss = ll.b;
				var tails = A2(elm$core$List$filterMap, elm$core$List$tail, xss);
				var heads = A2(elm$core$List$filterMap, elm$core$List$head, xss);
				return A2(
					elm$core$List$cons,
					A2(elm$core$List$cons, x, heads),
					pablohirafuji$elm_qrcode$QRCode$Helpers$transpose(
						A2(elm$core$List$cons, xs, tails)));
			}
		}
	}
};
var pablohirafuji$elm_qrcode$QRCode$Encode$concatTranspose = function (_n0) {
	var model = _n0.a;
	var dataBlocks = _n0.b;
	var ecBlocks = _n0.c;
	return _Utils_Tuple2(
		model,
		elm$core$List$concat(
			_Utils_ap(
				pablohirafuji$elm_qrcode$QRCode$Helpers$transpose(dataBlocks),
				pablohirafuji$elm_qrcode$QRCode$Helpers$transpose(ecBlocks))));
};
var elm$core$String$foldr = _String_foldr;
var elm$core$String$toList = function (string) {
	return A3(elm$core$String$foldr, elm$core$List$cons, _List_Nil, string);
};
var elm_community$list_extra$List$Extra$greedyGroupsOfWithStep = F3(
	function (size, step, xs) {
		var xs_ = A2(elm$core$List$drop, step, xs);
		var okayXs = elm$core$List$length(xs) > 0;
		var okayArgs = (size > 0) && (step > 0);
		return (okayArgs && okayXs) ? A2(
			elm$core$List$cons,
			A2(elm$core$List$take, size, xs),
			A3(elm_community$list_extra$List$Extra$greedyGroupsOfWithStep, size, step, xs_)) : _List_Nil;
	});
var elm_community$list_extra$List$Extra$greedyGroupsOf = F2(
	function (size, xs) {
		return A3(elm_community$list_extra$List$Extra$greedyGroupsOfWithStep, size, size, xs);
	});
var elm$core$Dict$fromList = function (assocs) {
	return A3(
		elm$core$List$foldl,
		F2(
			function (_n0, dict) {
				var key = _n0.a;
				var value = _n0.b;
				return A3(elm$core$Dict$insert, key, value, dict);
			}),
		elm$core$Dict$empty,
		assocs);
};
var pablohirafuji$elm_qrcode$QRCode$Encode$Alphanumeric$alphanumericCodes = elm$core$Dict$fromList(
	_List_fromArray(
		[
			_Utils_Tuple2(
			_Utils_chr('0'),
			0),
			_Utils_Tuple2(
			_Utils_chr('1'),
			1),
			_Utils_Tuple2(
			_Utils_chr('2'),
			2),
			_Utils_Tuple2(
			_Utils_chr('3'),
			3),
			_Utils_Tuple2(
			_Utils_chr('4'),
			4),
			_Utils_Tuple2(
			_Utils_chr('5'),
			5),
			_Utils_Tuple2(
			_Utils_chr('6'),
			6),
			_Utils_Tuple2(
			_Utils_chr('7'),
			7),
			_Utils_Tuple2(
			_Utils_chr('8'),
			8),
			_Utils_Tuple2(
			_Utils_chr('9'),
			9),
			_Utils_Tuple2(
			_Utils_chr('A'),
			10),
			_Utils_Tuple2(
			_Utils_chr('B'),
			11),
			_Utils_Tuple2(
			_Utils_chr('C'),
			12),
			_Utils_Tuple2(
			_Utils_chr('D'),
			13),
			_Utils_Tuple2(
			_Utils_chr('E'),
			14),
			_Utils_Tuple2(
			_Utils_chr('F'),
			15),
			_Utils_Tuple2(
			_Utils_chr('G'),
			16),
			_Utils_Tuple2(
			_Utils_chr('H'),
			17),
			_Utils_Tuple2(
			_Utils_chr('I'),
			18),
			_Utils_Tuple2(
			_Utils_chr('J'),
			19),
			_Utils_Tuple2(
			_Utils_chr('K'),
			20),
			_Utils_Tuple2(
			_Utils_chr('L'),
			21),
			_Utils_Tuple2(
			_Utils_chr('M'),
			22),
			_Utils_Tuple2(
			_Utils_chr('N'),
			23),
			_Utils_Tuple2(
			_Utils_chr('O'),
			24),
			_Utils_Tuple2(
			_Utils_chr('P'),
			25),
			_Utils_Tuple2(
			_Utils_chr('Q'),
			26),
			_Utils_Tuple2(
			_Utils_chr('R'),
			27),
			_Utils_Tuple2(
			_Utils_chr('S'),
			28),
			_Utils_Tuple2(
			_Utils_chr('T'),
			29),
			_Utils_Tuple2(
			_Utils_chr('U'),
			30),
			_Utils_Tuple2(
			_Utils_chr('V'),
			31),
			_Utils_Tuple2(
			_Utils_chr('W'),
			32),
			_Utils_Tuple2(
			_Utils_chr('X'),
			33),
			_Utils_Tuple2(
			_Utils_chr('Y'),
			34),
			_Utils_Tuple2(
			_Utils_chr('Z'),
			35),
			_Utils_Tuple2(
			_Utils_chr(' '),
			36),
			_Utils_Tuple2(
			_Utils_chr('$'),
			37),
			_Utils_Tuple2(
			_Utils_chr('%'),
			38),
			_Utils_Tuple2(
			_Utils_chr('*'),
			39),
			_Utils_Tuple2(
			_Utils_chr('+'),
			40),
			_Utils_Tuple2(
			_Utils_chr('-'),
			41),
			_Utils_Tuple2(
			_Utils_chr('.'),
			42),
			_Utils_Tuple2(
			_Utils_chr('/'),
			43),
			_Utils_Tuple2(
			_Utils_chr(':'),
			44)
		]));
var pablohirafuji$elm_qrcode$QRCode$Error$InvalidAlphanumericChar = {$: 'InvalidAlphanumericChar'};
var pablohirafuji$elm_qrcode$QRCode$Encode$Alphanumeric$toAlphanumericCode = function (_char) {
	return A2(
		elm$core$Result$fromMaybe,
		pablohirafuji$elm_qrcode$QRCode$Error$InvalidAlphanumericChar,
		A2(elm$core$Dict$get, _char, pablohirafuji$elm_qrcode$QRCode$Encode$Alphanumeric$alphanumericCodes));
};
var pablohirafuji$elm_qrcode$QRCode$Encode$Alphanumeric$toBinary = function (chars) {
	_n0$2:
	while (true) {
		if (chars.b) {
			if (chars.b.b) {
				if (!chars.b.b.b) {
					var firstChar = chars.a;
					var _n1 = chars.b;
					var secondChar = _n1.a;
					return A3(
						elm$core$Result$map2,
						F2(
							function (firstCode, secondCode) {
								return _Utils_Tuple2((firstCode * 45) + secondCode, 11);
							}),
						pablohirafuji$elm_qrcode$QRCode$Encode$Alphanumeric$toAlphanumericCode(firstChar),
						pablohirafuji$elm_qrcode$QRCode$Encode$Alphanumeric$toAlphanumericCode(secondChar));
				} else {
					break _n0$2;
				}
			} else {
				var _char = chars.a;
				return A2(
					elm$core$Result$map,
					function (a) {
						return _Utils_Tuple2(a, 6);
					},
					pablohirafuji$elm_qrcode$QRCode$Encode$Alphanumeric$toAlphanumericCode(_char));
			}
		} else {
			break _n0$2;
		}
	}
	return elm$core$Result$Err(pablohirafuji$elm_qrcode$QRCode$Error$InvalidAlphanumericChar);
};
var pablohirafuji$elm_qrcode$QRCode$Encode$Alphanumeric$encode = function (str) {
	return A3(
		elm$core$List$foldr,
		elm$core$Result$map2(elm$core$List$cons),
		elm$core$Result$Ok(_List_Nil),
		A2(
			elm$core$List$map,
			pablohirafuji$elm_qrcode$QRCode$Encode$Alphanumeric$toBinary,
			A2(
				elm_community$list_extra$List$Extra$greedyGroupsOf,
				2,
				elm$core$String$toList(str))));
};
var pablohirafuji$elm_qrcode$QRCode$Encode$Byte$encode = function (str) {
	return elm$core$Result$Ok(
		A2(
			elm$core$List$map,
			function (a) {
				return _Utils_Tuple2(
					elm$core$Char$toCode(a),
					8);
			},
			elm$core$String$toList(str)));
};
var elm$core$String$fromList = _String_fromList;
var elm$core$String$toInt = _String_toInt;
var pablohirafuji$elm_qrcode$QRCode$Encode$Numeric$numericLength = function (str) {
	var _n0 = elm$core$String$length(str);
	switch (_n0) {
		case 1:
			return 4;
		case 2:
			return 7;
		default:
			return 10;
	}
};
var pablohirafuji$elm_qrcode$QRCode$Error$InvalidNumericChar = {$: 'InvalidNumericChar'};
var pablohirafuji$elm_qrcode$QRCode$Encode$Numeric$encodeHelp = function (chars) {
	var str = elm$core$String$fromList(chars);
	return A2(
		elm$core$Result$fromMaybe,
		pablohirafuji$elm_qrcode$QRCode$Error$InvalidNumericChar,
		A2(
			elm$core$Maybe$map,
			function (a) {
				return _Utils_Tuple2(
					a,
					pablohirafuji$elm_qrcode$QRCode$Encode$Numeric$numericLength(str));
			},
			elm$core$String$toInt(str)));
};
var pablohirafuji$elm_qrcode$QRCode$Encode$Numeric$encode = function (str) {
	return A3(
		elm$core$List$foldr,
		elm$core$Result$map2(elm$core$List$cons),
		elm$core$Result$Ok(_List_Nil),
		A2(
			elm$core$List$map,
			pablohirafuji$elm_qrcode$QRCode$Encode$Numeric$encodeHelp,
			A2(
				elm_community$list_extra$List$Extra$greedyGroupsOf,
				3,
				elm$core$String$toList(str))));
};
var pablohirafuji$elm_qrcode$QRCode$Encode$UTF8$and63 = elm$core$Bitwise$and(63);
var pablohirafuji$elm_qrcode$QRCode$Error$InvalidUTF8Char = {$: 'InvalidUTF8Char'};
var pablohirafuji$elm_qrcode$QRCode$Encode$UTF8$encodeHelp = F2(
	function (chars, list) {
		if (chars.b) {
			var _char = chars.a;
			var charsTail = chars.b;
			return A3(
				pablohirafuji$elm_qrcode$QRCode$Encode$UTF8$utf8ToByte,
				list,
				charsTail,
				elm$core$Char$toCode(_char));
		} else {
			return elm$core$Result$Ok(
				elm$core$List$reverse(list));
		}
	});
var pablohirafuji$elm_qrcode$QRCode$Encode$UTF8$utf8ToByte = F3(
	function (list, remainStr, charCode) {
		if (charCode < 128) {
			return A2(
				pablohirafuji$elm_qrcode$QRCode$Encode$UTF8$encodeHelp,
				remainStr,
				A2(elm$core$List$cons, charCode, list));
		} else {
			if (charCode < 2048) {
				return A2(
					pablohirafuji$elm_qrcode$QRCode$Encode$UTF8$encodeHelp,
					remainStr,
					A2(
						elm$core$List$cons,
						128 | pablohirafuji$elm_qrcode$QRCode$Encode$UTF8$and63(charCode),
						A2(elm$core$List$cons, 192 | (charCode >> 6), list)));
			} else {
				if ((charCode < 55296) || (charCode >= 57344)) {
					return A2(
						pablohirafuji$elm_qrcode$QRCode$Encode$UTF8$encodeHelp,
						remainStr,
						A2(
							elm$core$List$cons,
							128 | pablohirafuji$elm_qrcode$QRCode$Encode$UTF8$and63(charCode),
							A2(
								elm$core$List$cons,
								128 | pablohirafuji$elm_qrcode$QRCode$Encode$UTF8$and63(charCode >> 6),
								A2(elm$core$List$cons, 224 | (charCode >> 12), list))));
				} else {
					if (remainStr.b) {
						var _char = remainStr.a;
						var strTail = remainStr.b;
						var nextCharCode = elm$core$Char$toCode(_char);
						var charC = 65536 + ((1023 & nextCharCode) | ((1023 & charCode) << 10));
						var byte4 = 128 | pablohirafuji$elm_qrcode$QRCode$Encode$UTF8$and63(charC);
						var byte3 = 128 | pablohirafuji$elm_qrcode$QRCode$Encode$UTF8$and63(charC >> 6);
						var byte2 = 128 | pablohirafuji$elm_qrcode$QRCode$Encode$UTF8$and63(charC >> 12);
						var byte1 = 240 | (charC >> 18);
						return A2(
							pablohirafuji$elm_qrcode$QRCode$Encode$UTF8$encodeHelp,
							strTail,
							A2(
								elm$core$List$cons,
								byte4,
								A2(
									elm$core$List$cons,
									byte3,
									A2(
										elm$core$List$cons,
										byte2,
										A2(elm$core$List$cons, byte1, list)))));
					} else {
						return elm$core$Result$Err(pablohirafuji$elm_qrcode$QRCode$Error$InvalidUTF8Char);
					}
				}
			}
		}
	});
var pablohirafuji$elm_qrcode$QRCode$Encode$UTF8$encode = function (str) {
	return A2(
		elm$core$Result$map,
		elm$core$List$map(
			function (a) {
				return _Utils_Tuple2(a, 8);
			}),
		A2(
			pablohirafuji$elm_qrcode$QRCode$Encode$UTF8$encodeHelp,
			elm$core$String$toList(str),
			_List_Nil));
};
var pablohirafuji$elm_qrcode$QRCode$Encode$encoder = function (mode) {
	switch (mode.$) {
		case 'Numeric':
			return pablohirafuji$elm_qrcode$QRCode$Encode$Numeric$encode;
		case 'Alphanumeric':
			return pablohirafuji$elm_qrcode$QRCode$Encode$Alphanumeric$encode;
		case 'Byte':
			return pablohirafuji$elm_qrcode$QRCode$Encode$Byte$encode;
		default:
			return pablohirafuji$elm_qrcode$QRCode$Encode$UTF8$encode;
	}
};
var pablohirafuji$elm_qrcode$QRCode$ErrorCorrection$expTable = elm$core$Array$fromList(
	_List_fromArray(
		[1, 2, 4, 8, 16, 32, 64, 128, 29, 58, 116, 232, 205, 135, 19, 38, 76, 152, 45, 90, 180, 117, 234, 201, 143, 3, 6, 12, 24, 48, 96, 192, 157, 39, 78, 156, 37, 74, 148, 53, 106, 212, 181, 119, 238, 193, 159, 35, 70, 140, 5, 10, 20, 40, 80, 160, 93, 186, 105, 210, 185, 111, 222, 161, 95, 190, 97, 194, 153, 47, 94, 188, 101, 202, 137, 15, 30, 60, 120, 240, 253, 231, 211, 187, 107, 214, 177, 127, 254, 225, 223, 163, 91, 182, 113, 226, 217, 175, 67, 134, 17, 34, 68, 136, 13, 26, 52, 104, 208, 189, 103, 206, 129, 31, 62, 124, 248, 237, 199, 147, 59, 118, 236, 197, 151, 51, 102, 204, 133, 23, 46, 92, 184, 109, 218, 169, 79, 158, 33, 66, 132, 21, 42, 84, 168, 77, 154, 41, 82, 164, 85, 170, 73, 146, 57, 114, 228, 213, 183, 115, 230, 209, 191, 99, 198, 145, 63, 126, 252, 229, 215, 179, 123, 246, 241, 255, 227, 219, 171, 75, 150, 49, 98, 196, 149, 55, 110, 220, 165, 87, 174, 65, 130, 25, 50, 100, 200, 141, 7, 14, 28, 56, 112, 224, 221, 167, 83, 166, 81, 162, 89, 178, 121, 242, 249, 239, 195, 155, 43, 86, 172, 69, 138, 9, 18, 36, 72, 144, 61, 122, 244, 245, 247, 243, 251, 235, 203, 139, 11, 22, 44, 88, 176, 125, 250, 233, 207, 131, 27, 54, 108, 216, 173, 71, 142, 1]));
var pablohirafuji$elm_qrcode$QRCode$ErrorCorrection$getExp = function (index) {
	return A2(
		elm$core$Maybe$withDefault,
		0,
		A2(
			elm$core$Array$get,
			A2(elm$core$Basics$modBy, 255, index),
			pablohirafuji$elm_qrcode$QRCode$ErrorCorrection$expTable));
};
var elm$core$Elm$JsArray$unsafeSet = _JsArray_unsafeSet;
var elm$core$Array$setHelp = F4(
	function (shift, index, value, tree) {
		var pos = elm$core$Array$bitMask & (index >>> shift);
		var _n0 = A2(elm$core$Elm$JsArray$unsafeGet, pos, tree);
		if (_n0.$ === 'SubTree') {
			var subTree = _n0.a;
			var newSub = A4(elm$core$Array$setHelp, shift - elm$core$Array$shiftStep, index, value, subTree);
			return A3(
				elm$core$Elm$JsArray$unsafeSet,
				pos,
				elm$core$Array$SubTree(newSub),
				tree);
		} else {
			var values = _n0.a;
			var newLeaf = A3(elm$core$Elm$JsArray$unsafeSet, elm$core$Array$bitMask & index, value, values);
			return A3(
				elm$core$Elm$JsArray$unsafeSet,
				pos,
				elm$core$Array$Leaf(newLeaf),
				tree);
		}
	});
var elm$core$Array$set = F3(
	function (index, value, array) {
		var len = array.a;
		var startShift = array.b;
		var tree = array.c;
		var tail = array.d;
		return ((index < 0) || (_Utils_cmp(index, len) > -1)) ? array : ((_Utils_cmp(
			index,
			elm$core$Array$tailIndex(len)) > -1) ? A4(
			elm$core$Array$Array_elm_builtin,
			len,
			startShift,
			tree,
			A3(elm$core$Elm$JsArray$unsafeSet, elm$core$Array$bitMask & index, value, tail)) : A4(
			elm$core$Array$Array_elm_builtin,
			len,
			startShift,
			A4(elm$core$Array$setHelp, startShift, index, value, tree),
			tail));
	});
var elm$core$Basics$always = F2(
	function (a, _n0) {
		return a;
	});
var pablohirafuji$elm_qrcode$QRCode$Error$PolynomialMultiplyException = {$: 'PolynomialMultiplyException'};
var pablohirafuji$elm_qrcode$QRCode$Error$LogTableException = function (a) {
	return {$: 'LogTableException', a: a};
};
var pablohirafuji$elm_qrcode$QRCode$ErrorCorrection$logTable = elm$core$Array$fromList(
	_List_fromArray(
		[0, 1, 25, 2, 50, 26, 198, 3, 223, 51, 238, 27, 104, 199, 75, 4, 100, 224, 14, 52, 141, 239, 129, 28, 193, 105, 248, 200, 8, 76, 113, 5, 138, 101, 47, 225, 36, 15, 33, 53, 147, 142, 218, 240, 18, 130, 69, 29, 181, 194, 125, 106, 39, 249, 185, 201, 154, 9, 120, 77, 228, 114, 166, 6, 191, 139, 98, 102, 221, 48, 253, 226, 152, 37, 179, 16, 145, 34, 136, 54, 208, 148, 206, 143, 150, 219, 189, 241, 210, 19, 92, 131, 56, 70, 64, 30, 66, 182, 163, 195, 72, 126, 110, 107, 58, 40, 84, 250, 133, 186, 61, 202, 94, 155, 159, 10, 21, 121, 43, 78, 212, 229, 172, 115, 243, 167, 87, 7, 112, 192, 247, 140, 128, 99, 13, 103, 74, 222, 237, 49, 197, 254, 24, 227, 165, 153, 119, 38, 184, 180, 124, 17, 68, 146, 217, 35, 32, 137, 46, 55, 63, 209, 91, 149, 188, 207, 205, 144, 135, 151, 178, 220, 252, 190, 97, 242, 86, 211, 171, 20, 42, 93, 158, 132, 60, 57, 83, 71, 109, 65, 162, 31, 45, 67, 216, 183, 123, 164, 118, 196, 23, 73, 236, 127, 12, 111, 246, 108, 161, 59, 82, 41, 157, 85, 170, 251, 96, 134, 177, 187, 204, 62, 90, 203, 89, 95, 176, 156, 169, 160, 81, 11, 245, 22, 235, 122, 117, 44, 215, 79, 174, 213, 233, 230, 231, 173, 232, 116, 214, 244, 234, 168, 80, 88, 175]));
var pablohirafuji$elm_qrcode$QRCode$ErrorCorrection$getLog = function (index) {
	return (index < 1) ? elm$core$Result$Err(
		pablohirafuji$elm_qrcode$QRCode$Error$LogTableException(index)) : A2(
		elm$core$Result$fromMaybe,
		pablohirafuji$elm_qrcode$QRCode$Error$LogTableException(index),
		A2(elm$core$Array$get, index - 1, pablohirafuji$elm_qrcode$QRCode$ErrorCorrection$logTable));
};
var pablohirafuji$elm_qrcode$QRCode$ErrorCorrection$getOffset = function (_n0) {
	getOffset:
	while (true) {
		var num = _n0.a;
		var offset = _n0.b;
		if (num.b) {
			var head = num.a;
			var tail = num.b;
			if (!head) {
				var $temp$_n0 = _Utils_Tuple2(tail, offset + 1);
				_n0 = $temp$_n0;
				continue getOffset;
			} else {
				return offset;
			}
		} else {
			return offset;
		}
	}
};
var pablohirafuji$elm_qrcode$QRCode$ErrorCorrection$newPolynomial = F2(
	function (num, shift) {
		var offset = pablohirafuji$elm_qrcode$QRCode$ErrorCorrection$getOffset(
			_Utils_Tuple2(num, 0));
		var numArray = elm$core$Array$fromList(num);
		return A2(
			elm$core$Array$initialize,
			(elm$core$List$length(num) - offset) + shift,
			function (index) {
				return A2(
					elm$core$Maybe$withDefault,
					0,
					A2(elm$core$Array$get, index + offset, numArray));
			});
	});
var pablohirafuji$elm_qrcode$QRCode$ErrorCorrection$multiply = F2(
	function (poly1, poly2) {
		var valuesArray = A2(
			elm$core$List$indexedMap,
			F2(
				function (index1, value1) {
					return A2(
						elm$core$List$indexedMap,
						F2(
							function (index2, value2) {
								return _Utils_Tuple3(index1 + index2, value1, value2);
							}),
						elm$core$Array$toList(poly2));
				}),
			elm$core$Array$toList(poly1));
		var process__ = F3(
			function (indexSum, num_, exp) {
				return A2(
					elm$core$Result$fromMaybe,
					pablohirafuji$elm_qrcode$QRCode$Error$PolynomialMultiplyException,
					A2(
						elm$core$Maybe$map,
						elm$core$Bitwise$xor(exp),
						A2(elm$core$Array$get, indexSum, num_)));
			});
		var process_ = F2(
			function (_n0, num_) {
				var indexSum = _n0.a;
				var value1 = _n0.b;
				var value2 = _n0.c;
				return A2(
					elm$core$Result$map,
					function (r) {
						return A3(elm$core$Array$set, indexSum, r, num_);
					},
					A2(
						elm$core$Result$andThen,
						A2(process__, indexSum, num_),
						A2(
							elm$core$Result$map,
							pablohirafuji$elm_qrcode$QRCode$ErrorCorrection$getExp,
							A3(
								elm$core$Result$map2,
								elm$core$Basics$add,
								pablohirafuji$elm_qrcode$QRCode$ErrorCorrection$getLog(value1),
								pablohirafuji$elm_qrcode$QRCode$ErrorCorrection$getLog(value2)))));
			});
		var process = F2(
			function (args, numResult) {
				return A2(
					elm$core$Result$andThen,
					process_(args),
					numResult);
			});
		var num = A2(
			elm$core$Array$initialize,
			(elm$core$Array$length(poly1) + elm$core$Array$length(poly2)) - 1,
			elm$core$Basics$always(0));
		return A2(
			elm$core$Result$map,
			function (a) {
				return A2(pablohirafuji$elm_qrcode$QRCode$ErrorCorrection$newPolynomial, a, 0);
			},
			A2(
				elm$core$Result$map,
				elm$core$Array$toList,
				A3(
					elm$core$List$foldl,
					process,
					elm$core$Result$Ok(num),
					elm$core$List$concat(valuesArray))));
	});
var pablohirafuji$elm_qrcode$QRCode$ErrorCorrection$getECPolynomial = function (ecLength) {
	var generate = F2(
		function (count, polyResult) {
			generate:
			while (true) {
				if (_Utils_cmp(count, ecLength) < 0) {
					var $temp$count = count + 1,
						$temp$polyResult = A2(
						elm$core$Result$andThen,
						function (a) {
							return A2(
								pablohirafuji$elm_qrcode$QRCode$ErrorCorrection$multiply,
								a,
								A2(
									pablohirafuji$elm_qrcode$QRCode$ErrorCorrection$newPolynomial,
									_List_fromArray(
										[
											1,
											pablohirafuji$elm_qrcode$QRCode$ErrorCorrection$getExp(count)
										]),
									0));
						},
						polyResult);
					count = $temp$count;
					polyResult = $temp$polyResult;
					continue generate;
				} else {
					return polyResult;
				}
			}
		});
	return A2(
		generate,
		0,
		elm$core$Result$Ok(
			A2(
				pablohirafuji$elm_qrcode$QRCode$ErrorCorrection$newPolynomial,
				_List_fromArray(
					[1]),
				0)));
};
var pablohirafuji$elm_qrcode$QRCode$ErrorCorrection$get___ = F2(
	function (ecLength, modPoly) {
		return elm$core$Array$toList(
			A2(
				elm$core$Array$initialize,
				ecLength,
				function (index) {
					var modIndex = (index + elm$core$Array$length(modPoly)) - ecLength;
					return (modIndex >= 0) ? A2(
						elm$core$Maybe$withDefault,
						0,
						A2(elm$core$Array$get, modIndex, modPoly)) : 0;
				}));
	});
var elm$core$Elm$JsArray$indexedMap = _JsArray_indexedMap;
var elm$core$Array$indexedMap = F2(
	function (func, _n0) {
		var len = _n0.a;
		var tree = _n0.c;
		var tail = _n0.d;
		var initialBuilder = {
			nodeList: _List_Nil,
			nodeListSize: 0,
			tail: A3(
				elm$core$Elm$JsArray$indexedMap,
				func,
				elm$core$Array$tailIndex(len),
				tail)
		};
		var helper = F2(
			function (node, builder) {
				if (node.$ === 'SubTree') {
					var subTree = node.a;
					return A3(elm$core$Elm$JsArray$foldl, helper, builder, subTree);
				} else {
					var leaf = node.a;
					var offset = builder.nodeListSize * elm$core$Array$branchFactor;
					var mappedLeaf = elm$core$Array$Leaf(
						A3(elm$core$Elm$JsArray$indexedMap, func, offset, leaf));
					return {
						nodeList: A2(elm$core$List$cons, mappedLeaf, builder.nodeList),
						nodeListSize: builder.nodeListSize + 1,
						tail: builder.tail
					};
				}
			});
		return A2(
			elm$core$Array$builderToArray,
			true,
			A3(elm$core$Elm$JsArray$foldl, helper, initialBuilder, tree));
	});
var pablohirafuji$elm_qrcode$QRCode$Error$PolynomialModException = {$: 'PolynomialModException'};
var pablohirafuji$elm_qrcode$QRCode$ErrorCorrection$mod = F2(
	function (poly1, poly2) {
		if ((elm$core$Array$length(poly1) - elm$core$Array$length(poly2)) < 0) {
			return elm$core$Result$Ok(poly1);
		} else {
			var helper_ = F3(
				function (index2, poly1_, exp) {
					return A2(
						elm$core$Result$fromMaybe,
						pablohirafuji$elm_qrcode$QRCode$Error$PolynomialModException,
						A2(
							elm$core$Maybe$map,
							elm$core$Bitwise$xor(exp),
							A2(elm$core$Array$get, index2, poly1_)));
				});
			var getHead = function (poly) {
				return A2(
					elm$core$Result$andThen,
					pablohirafuji$elm_qrcode$QRCode$ErrorCorrection$getLog,
					A2(
						elm$core$Result$fromMaybe,
						pablohirafuji$elm_qrcode$QRCode$Error$PolynomialModException,
						A2(elm$core$Array$get, 0, poly)));
			};
			var ratio = A3(
				elm$core$Result$map2,
				elm$core$Basics$sub,
				getHead(poly1),
				getHead(poly2));
			var helper = F2(
				function (_n0, poly1_) {
					var index2 = _n0.a;
					var value2 = _n0.b;
					return A2(
						elm$core$Result$map,
						function (r) {
							return A3(elm$core$Array$set, index2, r, poly1_);
						},
						A2(
							elm$core$Result$andThen,
							A2(helper_, index2, poly1_),
							A2(
								elm$core$Result$map,
								pablohirafuji$elm_qrcode$QRCode$ErrorCorrection$getExp,
								A3(
									elm$core$Result$map2,
									elm$core$Basics$add,
									ratio,
									pablohirafuji$elm_qrcode$QRCode$ErrorCorrection$getLog(value2)))));
				});
			var numFold = F2(
				function (args, poly1Result) {
					return A2(
						elm$core$Result$andThen,
						helper(args),
						poly1Result);
				});
			var numResult = A3(
				elm$core$Array$foldl,
				numFold,
				elm$core$Result$Ok(poly1),
				A2(
					elm$core$Array$indexedMap,
					F2(
						function (a, b) {
							return _Utils_Tuple2(a, b);
						}),
					poly2));
			return A2(
				elm$core$Result$andThen,
				function (a) {
					return A2(pablohirafuji$elm_qrcode$QRCode$ErrorCorrection$mod, a, poly2);
				},
				A2(
					elm$core$Result$map,
					function (a) {
						return A2(pablohirafuji$elm_qrcode$QRCode$ErrorCorrection$newPolynomial, a, 0);
					},
					A2(elm$core$Result$map, elm$core$Array$toList, numResult)));
		}
	});
var pablohirafuji$elm_qrcode$QRCode$ErrorCorrection$get__ = F2(
	function (rsPoly, dataCodewords) {
		return A2(
			elm$core$Result$map,
			pablohirafuji$elm_qrcode$QRCode$ErrorCorrection$get___(
				elm$core$Array$length(rsPoly) - 1),
			A2(
				pablohirafuji$elm_qrcode$QRCode$ErrorCorrection$mod,
				A2(
					pablohirafuji$elm_qrcode$QRCode$ErrorCorrection$newPolynomial,
					dataCodewords,
					elm$core$Array$length(rsPoly) - 1),
				rsPoly));
	});
var pablohirafuji$elm_qrcode$QRCode$Helpers$listResult = F3(
	function (fun, listb, lista) {
		if (lista.b) {
			var head = lista.a;
			var tail = lista.b;
			return A2(
				elm$core$Result$andThen,
				function (a) {
					return A3(pablohirafuji$elm_qrcode$QRCode$Helpers$listResult, fun, a, tail);
				},
				A2(
					elm$core$Result$map,
					function (r) {
						return A2(elm$core$List$cons, r, listb);
					},
					fun(head)));
		} else {
			return elm$core$Result$Ok(
				elm$core$List$reverse(listb));
		}
	});
var pablohirafuji$elm_qrcode$QRCode$ErrorCorrection$get_ = F2(
	function (byteBlocks, rsPoly) {
		return A3(
			pablohirafuji$elm_qrcode$QRCode$Helpers$listResult,
			pablohirafuji$elm_qrcode$QRCode$ErrorCorrection$get__(rsPoly),
			_List_Nil,
			byteBlocks);
	});
var pablohirafuji$elm_qrcode$QRCode$ErrorCorrection$get = F2(
	function (ecPerBlock, byteBlocks) {
		return A2(
			elm$core$Result$andThen,
			pablohirafuji$elm_qrcode$QRCode$ErrorCorrection$get_(byteBlocks),
			pablohirafuji$elm_qrcode$QRCode$ErrorCorrection$getECPolynomial(ecPerBlock));
	});
var pablohirafuji$elm_qrcode$QRCode$Encode$getErrorCorrection = function (_n0) {
	var model = _n0.a;
	var dataBlocks = _n0.b;
	return A2(
		elm$core$Result$map,
		function (c) {
			return _Utils_Tuple3(model, dataBlocks, c);
		},
		A2(pablohirafuji$elm_qrcode$QRCode$ErrorCorrection$get, model.groupInfo.ecPerBlock, dataBlocks));
};
var pablohirafuji$elm_qrcode$QRCode$Encode$Alphanumeric = {$: 'Alphanumeric'};
var pablohirafuji$elm_qrcode$QRCode$Encode$Byte = {$: 'Byte'};
var pablohirafuji$elm_qrcode$QRCode$Encode$Numeric = {$: 'Numeric'};
var elm$regex$Regex$Match = F4(
	function (match, index, number, submatches) {
		return {index: index, match: match, number: number, submatches: submatches};
	});
var elm$regex$Regex$contains = _Regex_contains;
var elm$regex$Regex$fromStringWith = _Regex_fromStringWith;
var pablohirafuji$elm_qrcode$QRCode$Encode$Alphanumeric$onlyAlphanumeric = A2(
	elm$regex$Regex$fromStringWith,
	{caseInsensitive: false, multiline: false},
	'^[0-9A-Z $%*+\\-.\\/:]+$');
var pablohirafuji$elm_qrcode$QRCode$Encode$Alphanumeric$isValid = function (input) {
	return A2(
		elm$core$Maybe$withDefault,
		false,
		A2(
			elm$core$Maybe$map,
			function (r) {
				return A2(elm$regex$Regex$contains, r, input);
			},
			pablohirafuji$elm_qrcode$QRCode$Encode$Alphanumeric$onlyAlphanumeric));
};
var pablohirafuji$elm_qrcode$QRCode$Encode$Byte$only8Bit = A2(
	elm$regex$Regex$fromStringWith,
	{caseInsensitive: false, multiline: false},
	'^[\\u0000-\\u00ff]+$');
var pablohirafuji$elm_qrcode$QRCode$Encode$Byte$isValid = function (input) {
	return A2(
		elm$core$Maybe$withDefault,
		false,
		A2(
			elm$core$Maybe$map,
			function (r) {
				return A2(elm$regex$Regex$contains, r, input);
			},
			pablohirafuji$elm_qrcode$QRCode$Encode$Byte$only8Bit));
};
var pablohirafuji$elm_qrcode$QRCode$Encode$Numeric$onlyNumber = A2(
	elm$regex$Regex$fromStringWith,
	{caseInsensitive: false, multiline: false},
	'^[0-9]+$');
var pablohirafuji$elm_qrcode$QRCode$Encode$Numeric$isValid = function (input) {
	return A2(
		elm$core$Maybe$withDefault,
		false,
		A2(
			elm$core$Maybe$map,
			function (r) {
				return A2(elm$regex$Regex$contains, r, input);
			},
			pablohirafuji$elm_qrcode$QRCode$Encode$Numeric$onlyNumber));
};
var pablohirafuji$elm_qrcode$QRCode$Encode$selectMode = function (input) {
	return pablohirafuji$elm_qrcode$QRCode$Encode$Numeric$isValid(input) ? pablohirafuji$elm_qrcode$QRCode$Encode$Numeric : (pablohirafuji$elm_qrcode$QRCode$Encode$Alphanumeric$isValid(input) ? pablohirafuji$elm_qrcode$QRCode$Encode$Alphanumeric : (pablohirafuji$elm_qrcode$QRCode$Encode$Byte$isValid(input) ? pablohirafuji$elm_qrcode$QRCode$Encode$Byte : pablohirafuji$elm_qrcode$QRCode$Encode$UTF8));
};
var pablohirafuji$elm_qrcode$QRCode$Encode$filterCapacity = F3(
	function (mode, dataLength, _n0) {
		var version = _n0.version;
		var capacity = _n0.capacity;
		return _Utils_cmp(
			A2(pablohirafuji$elm_qrcode$QRCode$Encode$charCountIndicatorLength, mode, version) + dataLength,
			capacity) < 1;
	});
var pablohirafuji$elm_qrcode$QRCode$Error$InputLengthOverflow = {$: 'InputLengthOverflow'};
var pablohirafuji$elm_qrcode$QRCode$GroupInfo$blockByteCapacity = function (_n0) {
	var blockCount = _n0.a;
	var bytePerBlock = _n0.b;
	return blockCount * bytePerBlock;
};
var pablohirafuji$elm_qrcode$QRCode$GroupInfo$byteCapacity = F2(
	function (group1, maybeGroup2) {
		if (maybeGroup2.$ === 'Just') {
			var block2 = maybeGroup2.a;
			return pablohirafuji$elm_qrcode$QRCode$GroupInfo$blockByteCapacity(group1) + pablohirafuji$elm_qrcode$QRCode$GroupInfo$blockByteCapacity(block2);
		} else {
			return pablohirafuji$elm_qrcode$QRCode$GroupInfo$blockByteCapacity(group1);
		}
	});
var pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo = F4(
	function (version, ecPerBlock, group1, maybeGroup2) {
		return {
			capacity: A2(pablohirafuji$elm_qrcode$QRCode$GroupInfo$byteCapacity, group1, maybeGroup2) * 8,
			ecPerBlock: ecPerBlock,
			group1: group1,
			maybeGroup2: maybeGroup2,
			version: version
		};
	});
var pablohirafuji$elm_qrcode$QRCode$GroupInfo$dataH = _List_fromArray(
	[
		A4(
		pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		1,
		17,
		_Utils_Tuple2(1, 9),
		elm$core$Maybe$Nothing),
		A4(
		pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		2,
		28,
		_Utils_Tuple2(1, 16),
		elm$core$Maybe$Nothing),
		A4(
		pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		3,
		22,
		_Utils_Tuple2(2, 13),
		elm$core$Maybe$Nothing),
		A4(
		pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		4,
		16,
		_Utils_Tuple2(4, 9),
		elm$core$Maybe$Nothing),
		A4(
		pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		5,
		22,
		_Utils_Tuple2(2, 11),
		elm$core$Maybe$Just(
			_Utils_Tuple2(2, 12))),
		A4(
		pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		6,
		28,
		_Utils_Tuple2(4, 15),
		elm$core$Maybe$Nothing),
		A4(
		pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		7,
		26,
		_Utils_Tuple2(4, 13),
		elm$core$Maybe$Just(
			_Utils_Tuple2(1, 14))),
		A4(
		pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		8,
		26,
		_Utils_Tuple2(4, 14),
		elm$core$Maybe$Just(
			_Utils_Tuple2(2, 15))),
		A4(
		pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		9,
		24,
		_Utils_Tuple2(4, 12),
		elm$core$Maybe$Just(
			_Utils_Tuple2(4, 13))),
		A4(
		pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		10,
		28,
		_Utils_Tuple2(6, 15),
		elm$core$Maybe$Just(
			_Utils_Tuple2(2, 16))),
		A4(
		pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		11,
		24,
		_Utils_Tuple2(3, 12),
		elm$core$Maybe$Just(
			_Utils_Tuple2(8, 13))),
		A4(
		pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		12,
		28,
		_Utils_Tuple2(7, 14),
		elm$core$Maybe$Just(
			_Utils_Tuple2(4, 15))),
		A4(
		pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		13,
		22,
		_Utils_Tuple2(12, 11),
		elm$core$Maybe$Just(
			_Utils_Tuple2(4, 12))),
		A4(
		pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		14,
		24,
		_Utils_Tuple2(11, 12),
		elm$core$Maybe$Just(
			_Utils_Tuple2(5, 13))),
		A4(
		pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		15,
		24,
		_Utils_Tuple2(11, 12),
		elm$core$Maybe$Just(
			_Utils_Tuple2(7, 13))),
		A4(
		pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		16,
		30,
		_Utils_Tuple2(3, 15),
		elm$core$Maybe$Just(
			_Utils_Tuple2(13, 16))),
		A4(
		pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		17,
		28,
		_Utils_Tuple2(2, 14),
		elm$core$Maybe$Just(
			_Utils_Tuple2(17, 15))),
		A4(
		pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		18,
		28,
		_Utils_Tuple2(2, 14),
		elm$core$Maybe$Just(
			_Utils_Tuple2(19, 15))),
		A4(
		pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		19,
		26,
		_Utils_Tuple2(9, 13),
		elm$core$Maybe$Just(
			_Utils_Tuple2(16, 14))),
		A4(
		pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		20,
		28,
		_Utils_Tuple2(15, 15),
		elm$core$Maybe$Just(
			_Utils_Tuple2(10, 16))),
		A4(
		pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		21,
		30,
		_Utils_Tuple2(19, 16),
		elm$core$Maybe$Just(
			_Utils_Tuple2(6, 17))),
		A4(
		pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		22,
		24,
		_Utils_Tuple2(34, 13),
		elm$core$Maybe$Nothing),
		A4(
		pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		23,
		30,
		_Utils_Tuple2(16, 15),
		elm$core$Maybe$Just(
			_Utils_Tuple2(14, 16))),
		A4(
		pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		24,
		30,
		_Utils_Tuple2(30, 16),
		elm$core$Maybe$Just(
			_Utils_Tuple2(2, 17))),
		A4(
		pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		25,
		30,
		_Utils_Tuple2(22, 15),
		elm$core$Maybe$Just(
			_Utils_Tuple2(13, 16))),
		A4(
		pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		26,
		30,
		_Utils_Tuple2(33, 16),
		elm$core$Maybe$Just(
			_Utils_Tuple2(4, 17))),
		A4(
		pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		27,
		30,
		_Utils_Tuple2(12, 15),
		elm$core$Maybe$Just(
			_Utils_Tuple2(28, 16))),
		A4(
		pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		28,
		30,
		_Utils_Tuple2(11, 15),
		elm$core$Maybe$Just(
			_Utils_Tuple2(31, 16))),
		A4(
		pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		29,
		30,
		_Utils_Tuple2(19, 15),
		elm$core$Maybe$Just(
			_Utils_Tuple2(26, 16))),
		A4(
		pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		30,
		30,
		_Utils_Tuple2(23, 15),
		elm$core$Maybe$Just(
			_Utils_Tuple2(25, 16))),
		A4(
		pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		31,
		30,
		_Utils_Tuple2(23, 15),
		elm$core$Maybe$Just(
			_Utils_Tuple2(28, 16))),
		A4(
		pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		32,
		30,
		_Utils_Tuple2(19, 15),
		elm$core$Maybe$Just(
			_Utils_Tuple2(35, 16))),
		A4(
		pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		33,
		30,
		_Utils_Tuple2(11, 15),
		elm$core$Maybe$Just(
			_Utils_Tuple2(46, 16))),
		A4(
		pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		34,
		30,
		_Utils_Tuple2(59, 16),
		elm$core$Maybe$Just(
			_Utils_Tuple2(1, 17))),
		A4(
		pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		35,
		30,
		_Utils_Tuple2(22, 15),
		elm$core$Maybe$Just(
			_Utils_Tuple2(41, 16))),
		A4(
		pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		36,
		30,
		_Utils_Tuple2(2, 15),
		elm$core$Maybe$Just(
			_Utils_Tuple2(64, 16))),
		A4(
		pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		37,
		30,
		_Utils_Tuple2(24, 15),
		elm$core$Maybe$Just(
			_Utils_Tuple2(46, 16))),
		A4(
		pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		38,
		30,
		_Utils_Tuple2(42, 15),
		elm$core$Maybe$Just(
			_Utils_Tuple2(32, 16))),
		A4(
		pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		39,
		30,
		_Utils_Tuple2(10, 15),
		elm$core$Maybe$Just(
			_Utils_Tuple2(67, 16))),
		A4(
		pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		40,
		30,
		_Utils_Tuple2(20, 15),
		elm$core$Maybe$Just(
			_Utils_Tuple2(61, 16)))
	]);
var pablohirafuji$elm_qrcode$QRCode$GroupInfo$dataL = _List_fromArray(
	[
		A4(
		pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		1,
		7,
		_Utils_Tuple2(1, 19),
		elm$core$Maybe$Nothing),
		A4(
		pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		2,
		10,
		_Utils_Tuple2(1, 34),
		elm$core$Maybe$Nothing),
		A4(
		pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		3,
		15,
		_Utils_Tuple2(1, 55),
		elm$core$Maybe$Nothing),
		A4(
		pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		4,
		20,
		_Utils_Tuple2(1, 80),
		elm$core$Maybe$Nothing),
		A4(
		pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		5,
		26,
		_Utils_Tuple2(1, 108),
		elm$core$Maybe$Nothing),
		A4(
		pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		6,
		18,
		_Utils_Tuple2(2, 68),
		elm$core$Maybe$Nothing),
		A4(
		pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		7,
		20,
		_Utils_Tuple2(2, 78),
		elm$core$Maybe$Nothing),
		A4(
		pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		8,
		24,
		_Utils_Tuple2(2, 97),
		elm$core$Maybe$Nothing),
		A4(
		pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		9,
		30,
		_Utils_Tuple2(2, 116),
		elm$core$Maybe$Nothing),
		A4(
		pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		10,
		18,
		_Utils_Tuple2(2, 68),
		elm$core$Maybe$Just(
			_Utils_Tuple2(2, 69))),
		A4(
		pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		11,
		20,
		_Utils_Tuple2(4, 81),
		elm$core$Maybe$Nothing),
		A4(
		pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		12,
		24,
		_Utils_Tuple2(2, 92),
		elm$core$Maybe$Just(
			_Utils_Tuple2(2, 93))),
		A4(
		pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		13,
		26,
		_Utils_Tuple2(4, 107),
		elm$core$Maybe$Nothing),
		A4(
		pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		14,
		30,
		_Utils_Tuple2(3, 115),
		elm$core$Maybe$Just(
			_Utils_Tuple2(1, 116))),
		A4(
		pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		15,
		22,
		_Utils_Tuple2(5, 87),
		elm$core$Maybe$Just(
			_Utils_Tuple2(1, 88))),
		A4(
		pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		16,
		24,
		_Utils_Tuple2(5, 98),
		elm$core$Maybe$Just(
			_Utils_Tuple2(1, 99))),
		A4(
		pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		17,
		28,
		_Utils_Tuple2(1, 107),
		elm$core$Maybe$Just(
			_Utils_Tuple2(5, 108))),
		A4(
		pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		18,
		30,
		_Utils_Tuple2(5, 120),
		elm$core$Maybe$Just(
			_Utils_Tuple2(1, 121))),
		A4(
		pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		19,
		28,
		_Utils_Tuple2(3, 113),
		elm$core$Maybe$Just(
			_Utils_Tuple2(4, 114))),
		A4(
		pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		20,
		28,
		_Utils_Tuple2(3, 107),
		elm$core$Maybe$Just(
			_Utils_Tuple2(5, 108))),
		A4(
		pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		21,
		28,
		_Utils_Tuple2(4, 116),
		elm$core$Maybe$Just(
			_Utils_Tuple2(4, 117))),
		A4(
		pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		22,
		28,
		_Utils_Tuple2(2, 111),
		elm$core$Maybe$Just(
			_Utils_Tuple2(7, 112))),
		A4(
		pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		23,
		30,
		_Utils_Tuple2(4, 121),
		elm$core$Maybe$Just(
			_Utils_Tuple2(5, 122))),
		A4(
		pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		24,
		30,
		_Utils_Tuple2(6, 117),
		elm$core$Maybe$Just(
			_Utils_Tuple2(4, 118))),
		A4(
		pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		25,
		26,
		_Utils_Tuple2(8, 106),
		elm$core$Maybe$Just(
			_Utils_Tuple2(4, 107))),
		A4(
		pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		26,
		28,
		_Utils_Tuple2(10, 114),
		elm$core$Maybe$Just(
			_Utils_Tuple2(2, 115))),
		A4(
		pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		27,
		30,
		_Utils_Tuple2(8, 122),
		elm$core$Maybe$Just(
			_Utils_Tuple2(4, 123))),
		A4(
		pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		28,
		30,
		_Utils_Tuple2(3, 117),
		elm$core$Maybe$Just(
			_Utils_Tuple2(10, 118))),
		A4(
		pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		29,
		30,
		_Utils_Tuple2(7, 116),
		elm$core$Maybe$Just(
			_Utils_Tuple2(7, 117))),
		A4(
		pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		30,
		30,
		_Utils_Tuple2(5, 115),
		elm$core$Maybe$Just(
			_Utils_Tuple2(10, 116))),
		A4(
		pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		31,
		30,
		_Utils_Tuple2(13, 115),
		elm$core$Maybe$Just(
			_Utils_Tuple2(3, 116))),
		A4(
		pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		32,
		30,
		_Utils_Tuple2(17, 115),
		elm$core$Maybe$Nothing),
		A4(
		pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		33,
		30,
		_Utils_Tuple2(17, 115),
		elm$core$Maybe$Just(
			_Utils_Tuple2(1, 116))),
		A4(
		pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		34,
		30,
		_Utils_Tuple2(13, 115),
		elm$core$Maybe$Just(
			_Utils_Tuple2(6, 116))),
		A4(
		pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		35,
		30,
		_Utils_Tuple2(12, 121),
		elm$core$Maybe$Just(
			_Utils_Tuple2(7, 122))),
		A4(
		pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		36,
		30,
		_Utils_Tuple2(6, 121),
		elm$core$Maybe$Just(
			_Utils_Tuple2(14, 122))),
		A4(
		pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		37,
		30,
		_Utils_Tuple2(17, 122),
		elm$core$Maybe$Just(
			_Utils_Tuple2(4, 123))),
		A4(
		pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		38,
		30,
		_Utils_Tuple2(4, 122),
		elm$core$Maybe$Just(
			_Utils_Tuple2(18, 123))),
		A4(
		pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		39,
		30,
		_Utils_Tuple2(20, 117),
		elm$core$Maybe$Just(
			_Utils_Tuple2(4, 118))),
		A4(
		pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		40,
		30,
		_Utils_Tuple2(19, 118),
		elm$core$Maybe$Just(
			_Utils_Tuple2(6, 119)))
	]);
var pablohirafuji$elm_qrcode$QRCode$GroupInfo$dataM = _List_fromArray(
	[
		A4(
		pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		1,
		10,
		_Utils_Tuple2(1, 16),
		elm$core$Maybe$Nothing),
		A4(
		pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		2,
		16,
		_Utils_Tuple2(1, 28),
		elm$core$Maybe$Nothing),
		A4(
		pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		3,
		26,
		_Utils_Tuple2(1, 44),
		elm$core$Maybe$Nothing),
		A4(
		pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		4,
		18,
		_Utils_Tuple2(2, 32),
		elm$core$Maybe$Nothing),
		A4(
		pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		5,
		24,
		_Utils_Tuple2(2, 43),
		elm$core$Maybe$Nothing),
		A4(
		pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		6,
		16,
		_Utils_Tuple2(4, 27),
		elm$core$Maybe$Nothing),
		A4(
		pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		7,
		18,
		_Utils_Tuple2(4, 31),
		elm$core$Maybe$Nothing),
		A4(
		pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		8,
		22,
		_Utils_Tuple2(2, 38),
		elm$core$Maybe$Just(
			_Utils_Tuple2(2, 39))),
		A4(
		pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		9,
		22,
		_Utils_Tuple2(3, 36),
		elm$core$Maybe$Just(
			_Utils_Tuple2(2, 37))),
		A4(
		pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		10,
		26,
		_Utils_Tuple2(4, 43),
		elm$core$Maybe$Just(
			_Utils_Tuple2(1, 44))),
		A4(
		pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		11,
		30,
		_Utils_Tuple2(1, 50),
		elm$core$Maybe$Just(
			_Utils_Tuple2(4, 51))),
		A4(
		pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		12,
		22,
		_Utils_Tuple2(6, 36),
		elm$core$Maybe$Just(
			_Utils_Tuple2(2, 37))),
		A4(
		pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		13,
		22,
		_Utils_Tuple2(8, 37),
		elm$core$Maybe$Just(
			_Utils_Tuple2(1, 38))),
		A4(
		pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		14,
		24,
		_Utils_Tuple2(4, 40),
		elm$core$Maybe$Just(
			_Utils_Tuple2(5, 41))),
		A4(
		pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		15,
		24,
		_Utils_Tuple2(5, 41),
		elm$core$Maybe$Just(
			_Utils_Tuple2(5, 42))),
		A4(
		pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		16,
		28,
		_Utils_Tuple2(7, 45),
		elm$core$Maybe$Just(
			_Utils_Tuple2(3, 46))),
		A4(
		pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		17,
		28,
		_Utils_Tuple2(10, 46),
		elm$core$Maybe$Just(
			_Utils_Tuple2(1, 47))),
		A4(
		pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		18,
		26,
		_Utils_Tuple2(9, 43),
		elm$core$Maybe$Just(
			_Utils_Tuple2(4, 44))),
		A4(
		pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		19,
		26,
		_Utils_Tuple2(3, 44),
		elm$core$Maybe$Just(
			_Utils_Tuple2(11, 45))),
		A4(
		pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		20,
		26,
		_Utils_Tuple2(3, 41),
		elm$core$Maybe$Just(
			_Utils_Tuple2(13, 42))),
		A4(
		pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		21,
		26,
		_Utils_Tuple2(17, 42),
		elm$core$Maybe$Nothing),
		A4(
		pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		22,
		28,
		_Utils_Tuple2(17, 46),
		elm$core$Maybe$Nothing),
		A4(
		pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		23,
		28,
		_Utils_Tuple2(4, 47),
		elm$core$Maybe$Just(
			_Utils_Tuple2(14, 48))),
		A4(
		pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		24,
		28,
		_Utils_Tuple2(6, 45),
		elm$core$Maybe$Just(
			_Utils_Tuple2(14, 46))),
		A4(
		pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		25,
		28,
		_Utils_Tuple2(8, 47),
		elm$core$Maybe$Just(
			_Utils_Tuple2(13, 48))),
		A4(
		pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		26,
		28,
		_Utils_Tuple2(19, 46),
		elm$core$Maybe$Just(
			_Utils_Tuple2(4, 47))),
		A4(
		pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		27,
		28,
		_Utils_Tuple2(22, 45),
		elm$core$Maybe$Just(
			_Utils_Tuple2(3, 46))),
		A4(
		pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		28,
		28,
		_Utils_Tuple2(3, 45),
		elm$core$Maybe$Just(
			_Utils_Tuple2(23, 46))),
		A4(
		pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		29,
		28,
		_Utils_Tuple2(21, 45),
		elm$core$Maybe$Just(
			_Utils_Tuple2(7, 46))),
		A4(
		pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		30,
		28,
		_Utils_Tuple2(19, 47),
		elm$core$Maybe$Just(
			_Utils_Tuple2(10, 48))),
		A4(
		pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		31,
		28,
		_Utils_Tuple2(2, 46),
		elm$core$Maybe$Just(
			_Utils_Tuple2(29, 47))),
		A4(
		pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		32,
		28,
		_Utils_Tuple2(10, 46),
		elm$core$Maybe$Just(
			_Utils_Tuple2(23, 47))),
		A4(
		pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		33,
		28,
		_Utils_Tuple2(14, 46),
		elm$core$Maybe$Just(
			_Utils_Tuple2(21, 47))),
		A4(
		pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		34,
		28,
		_Utils_Tuple2(14, 46),
		elm$core$Maybe$Just(
			_Utils_Tuple2(23, 47))),
		A4(
		pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		35,
		28,
		_Utils_Tuple2(12, 47),
		elm$core$Maybe$Just(
			_Utils_Tuple2(26, 48))),
		A4(
		pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		36,
		28,
		_Utils_Tuple2(6, 47),
		elm$core$Maybe$Just(
			_Utils_Tuple2(34, 48))),
		A4(
		pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		37,
		28,
		_Utils_Tuple2(29, 46),
		elm$core$Maybe$Just(
			_Utils_Tuple2(14, 47))),
		A4(
		pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		38,
		28,
		_Utils_Tuple2(13, 46),
		elm$core$Maybe$Just(
			_Utils_Tuple2(32, 47))),
		A4(
		pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		39,
		28,
		_Utils_Tuple2(40, 47),
		elm$core$Maybe$Just(
			_Utils_Tuple2(7, 48))),
		A4(
		pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		40,
		28,
		_Utils_Tuple2(18, 47),
		elm$core$Maybe$Just(
			_Utils_Tuple2(31, 48)))
	]);
var pablohirafuji$elm_qrcode$QRCode$GroupInfo$dataQ = _List_fromArray(
	[
		A4(
		pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		1,
		13,
		_Utils_Tuple2(1, 13),
		elm$core$Maybe$Nothing),
		A4(
		pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		2,
		22,
		_Utils_Tuple2(1, 22),
		elm$core$Maybe$Nothing),
		A4(
		pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		3,
		18,
		_Utils_Tuple2(2, 17),
		elm$core$Maybe$Nothing),
		A4(
		pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		4,
		26,
		_Utils_Tuple2(2, 24),
		elm$core$Maybe$Nothing),
		A4(
		pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		5,
		18,
		_Utils_Tuple2(2, 15),
		elm$core$Maybe$Just(
			_Utils_Tuple2(2, 16))),
		A4(
		pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		6,
		24,
		_Utils_Tuple2(4, 19),
		elm$core$Maybe$Nothing),
		A4(
		pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		7,
		18,
		_Utils_Tuple2(2, 14),
		elm$core$Maybe$Just(
			_Utils_Tuple2(4, 15))),
		A4(
		pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		8,
		22,
		_Utils_Tuple2(4, 18),
		elm$core$Maybe$Just(
			_Utils_Tuple2(2, 19))),
		A4(
		pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		9,
		20,
		_Utils_Tuple2(4, 16),
		elm$core$Maybe$Just(
			_Utils_Tuple2(4, 17))),
		A4(
		pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		10,
		24,
		_Utils_Tuple2(6, 19),
		elm$core$Maybe$Just(
			_Utils_Tuple2(2, 20))),
		A4(
		pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		11,
		28,
		_Utils_Tuple2(4, 22),
		elm$core$Maybe$Just(
			_Utils_Tuple2(4, 23))),
		A4(
		pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		12,
		26,
		_Utils_Tuple2(4, 20),
		elm$core$Maybe$Just(
			_Utils_Tuple2(6, 21))),
		A4(
		pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		13,
		24,
		_Utils_Tuple2(8, 20),
		elm$core$Maybe$Just(
			_Utils_Tuple2(4, 21))),
		A4(
		pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		14,
		20,
		_Utils_Tuple2(11, 16),
		elm$core$Maybe$Just(
			_Utils_Tuple2(5, 17))),
		A4(
		pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		15,
		30,
		_Utils_Tuple2(5, 24),
		elm$core$Maybe$Just(
			_Utils_Tuple2(7, 25))),
		A4(
		pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		16,
		24,
		_Utils_Tuple2(15, 19),
		elm$core$Maybe$Just(
			_Utils_Tuple2(2, 20))),
		A4(
		pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		17,
		28,
		_Utils_Tuple2(1, 22),
		elm$core$Maybe$Just(
			_Utils_Tuple2(15, 23))),
		A4(
		pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		18,
		28,
		_Utils_Tuple2(17, 22),
		elm$core$Maybe$Just(
			_Utils_Tuple2(1, 23))),
		A4(
		pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		19,
		26,
		_Utils_Tuple2(17, 21),
		elm$core$Maybe$Just(
			_Utils_Tuple2(4, 22))),
		A4(
		pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		20,
		30,
		_Utils_Tuple2(15, 24),
		elm$core$Maybe$Just(
			_Utils_Tuple2(5, 25))),
		A4(
		pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		21,
		28,
		_Utils_Tuple2(17, 22),
		elm$core$Maybe$Just(
			_Utils_Tuple2(6, 23))),
		A4(
		pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		22,
		30,
		_Utils_Tuple2(7, 24),
		elm$core$Maybe$Just(
			_Utils_Tuple2(16, 25))),
		A4(
		pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		23,
		30,
		_Utils_Tuple2(11, 24),
		elm$core$Maybe$Just(
			_Utils_Tuple2(14, 25))),
		A4(
		pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		24,
		30,
		_Utils_Tuple2(11, 24),
		elm$core$Maybe$Just(
			_Utils_Tuple2(16, 25))),
		A4(
		pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		25,
		30,
		_Utils_Tuple2(7, 24),
		elm$core$Maybe$Just(
			_Utils_Tuple2(22, 25))),
		A4(
		pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		26,
		28,
		_Utils_Tuple2(28, 22),
		elm$core$Maybe$Just(
			_Utils_Tuple2(6, 23))),
		A4(
		pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		27,
		30,
		_Utils_Tuple2(8, 23),
		elm$core$Maybe$Just(
			_Utils_Tuple2(26, 24))),
		A4(
		pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		28,
		30,
		_Utils_Tuple2(4, 24),
		elm$core$Maybe$Just(
			_Utils_Tuple2(31, 25))),
		A4(
		pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		29,
		30,
		_Utils_Tuple2(1, 23),
		elm$core$Maybe$Just(
			_Utils_Tuple2(37, 24))),
		A4(
		pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		30,
		30,
		_Utils_Tuple2(15, 24),
		elm$core$Maybe$Just(
			_Utils_Tuple2(25, 25))),
		A4(
		pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		31,
		30,
		_Utils_Tuple2(42, 24),
		elm$core$Maybe$Just(
			_Utils_Tuple2(1, 25))),
		A4(
		pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		32,
		30,
		_Utils_Tuple2(10, 24),
		elm$core$Maybe$Just(
			_Utils_Tuple2(35, 25))),
		A4(
		pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		33,
		30,
		_Utils_Tuple2(29, 24),
		elm$core$Maybe$Just(
			_Utils_Tuple2(19, 25))),
		A4(
		pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		34,
		30,
		_Utils_Tuple2(44, 24),
		elm$core$Maybe$Just(
			_Utils_Tuple2(7, 25))),
		A4(
		pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		35,
		30,
		_Utils_Tuple2(39, 24),
		elm$core$Maybe$Just(
			_Utils_Tuple2(14, 25))),
		A4(
		pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		36,
		30,
		_Utils_Tuple2(46, 24),
		elm$core$Maybe$Just(
			_Utils_Tuple2(10, 25))),
		A4(
		pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		37,
		30,
		_Utils_Tuple2(49, 24),
		elm$core$Maybe$Just(
			_Utils_Tuple2(10, 25))),
		A4(
		pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		38,
		30,
		_Utils_Tuple2(48, 24),
		elm$core$Maybe$Just(
			_Utils_Tuple2(14, 25))),
		A4(
		pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		39,
		30,
		_Utils_Tuple2(43, 24),
		elm$core$Maybe$Just(
			_Utils_Tuple2(22, 25))),
		A4(
		pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		40,
		30,
		_Utils_Tuple2(34, 24),
		elm$core$Maybe$Just(
			_Utils_Tuple2(34, 25)))
	]);
var pablohirafuji$elm_qrcode$QRCode$GroupInfo$getGroupData = function (ecLevel) {
	switch (ecLevel.$) {
		case 'L':
			return pablohirafuji$elm_qrcode$QRCode$GroupInfo$dataL;
		case 'M':
			return pablohirafuji$elm_qrcode$QRCode$GroupInfo$dataM;
		case 'Q':
			return pablohirafuji$elm_qrcode$QRCode$GroupInfo$dataQ;
		default:
			return pablohirafuji$elm_qrcode$QRCode$GroupInfo$dataH;
	}
};
var pablohirafuji$elm_qrcode$QRCode$Encode$getVersion = F3(
	function (ecLevel, mode, dataLength) {
		return A2(
			elm$core$Result$fromMaybe,
			pablohirafuji$elm_qrcode$QRCode$Error$InputLengthOverflow,
			elm$core$List$head(
				A2(
					elm$core$List$sortBy,
					function ($) {
						return $.capacity;
					},
					A2(
						elm$core$List$filter,
						A2(pablohirafuji$elm_qrcode$QRCode$Encode$filterCapacity, mode, dataLength),
						pablohirafuji$elm_qrcode$QRCode$GroupInfo$getGroupData(ecLevel)))));
	});
var pablohirafuji$elm_qrcode$QRCode$Encode$versionToModel = F5(
	function (inputStr, ecLevel, mode, partialBitsCount, groupInfo) {
		return {
			bitsCount: partialBitsCount + A2(pablohirafuji$elm_qrcode$QRCode$Encode$charCountIndicatorLength, mode, groupInfo.version),
			ecLevel: ecLevel,
			groupInfo: groupInfo,
			inputStr: inputStr,
			mode: mode
		};
	});
var pablohirafuji$elm_qrcode$QRCode$Encode$selectVersion = F4(
	function (inputStr, ecLevel, mode, encodedStr) {
		var partialBitsCount = 4 + A3(
			elm$core$List$foldl,
			F2(
				function (a, b) {
					return a.b + b;
				}),
			0,
			encodedStr);
		return A2(
			elm$core$Result$map,
			function (b) {
				return _Utils_Tuple2(encodedStr, b);
			},
			A2(
				elm$core$Result$map,
				A4(pablohirafuji$elm_qrcode$QRCode$Encode$versionToModel, inputStr, ecLevel, mode, partialBitsCount),
				A3(pablohirafuji$elm_qrcode$QRCode$Encode$getVersion, ecLevel, mode, partialBitsCount)));
	});
var pablohirafuji$elm_qrcode$QRCode$Encode$breakList = F3(
	function (checkFinish, _n0, _n1) {
		breakList:
		while (true) {
			var times = _n0.a;
			var itemCount = _n0.b;
			var byteList = _n1.a;
			var progress = _n1.b;
			if (times > 0) {
				var remainList = A2(elm$core$List$drop, itemCount, byteList);
				var block = A2(elm$core$List$take, itemCount, byteList);
				var $temp$checkFinish = checkFinish,
					$temp$_n0 = _Utils_Tuple2(times - 1, itemCount),
					$temp$_n1 = _Utils_Tuple2(
					remainList,
					A2(elm$core$List$cons, block, progress));
				checkFinish = $temp$checkFinish;
				_n0 = $temp$_n0;
				_n1 = $temp$_n1;
				continue breakList;
			} else {
				if (checkFinish && (elm$core$List$length(byteList) > 0)) {
					return elm$core$Result$Err(pablohirafuji$elm_qrcode$QRCode$Error$InputLengthOverflow);
				} else {
					return elm$core$Result$Ok(
						_Utils_Tuple2(byteList, progress));
				}
			}
		}
	});
var pablohirafuji$elm_qrcode$QRCode$Encode$toBlocks = function (_n0) {
	var model = _n0.a;
	var groupInfo = model.groupInfo;
	var byteList = _n0.b;
	var _n1 = groupInfo.maybeGroup2;
	if (_n1.$ === 'Just') {
		var group2 = _n1.a;
		return A2(
			elm$core$Result$map,
			function (b) {
				return _Utils_Tuple2(model, b);
			},
			A2(
				elm$core$Result$map,
				A2(elm$core$Basics$composeR, elm$core$Tuple$second, elm$core$List$reverse),
				A2(
					elm$core$Result$andThen,
					A2(pablohirafuji$elm_qrcode$QRCode$Encode$breakList, true, group2),
					A3(
						pablohirafuji$elm_qrcode$QRCode$Encode$breakList,
						false,
						groupInfo.group1,
						_Utils_Tuple2(byteList, _List_Nil)))));
	} else {
		return A2(
			elm$core$Result$map,
			function (b) {
				return _Utils_Tuple2(model, b);
			},
			A2(
				elm$core$Result$map,
				A2(elm$core$Basics$composeR, elm$core$Tuple$second, elm$core$List$reverse),
				A3(
					pablohirafuji$elm_qrcode$QRCode$Encode$breakList,
					true,
					groupInfo.group1,
					_Utils_Tuple2(byteList, _List_Nil))));
	}
};
var pablohirafuji$elm_qrcode$QRCode$Encode$encode = F2(
	function (inputStr, ecLevel) {
		var mode = pablohirafuji$elm_qrcode$QRCode$Encode$selectMode(inputStr);
		return A2(
			elm$core$Result$map,
			pablohirafuji$elm_qrcode$QRCode$Encode$concatTranspose,
			A2(
				elm$core$Result$andThen,
				pablohirafuji$elm_qrcode$QRCode$Encode$getErrorCorrection,
				A2(
					elm$core$Result$andThen,
					pablohirafuji$elm_qrcode$QRCode$Encode$toBlocks,
					A2(
						elm$core$Result$map,
						pablohirafuji$elm_qrcode$QRCode$Encode$addInfoAndFinalBits,
						A2(
							elm$core$Result$andThen,
							A3(pablohirafuji$elm_qrcode$QRCode$Encode$selectVersion, inputStr, ecLevel, mode),
							A2(pablohirafuji$elm_qrcode$QRCode$Encode$encoder, mode, inputStr))))));
	});
var pablohirafuji$elm_qrcode$QRCode$Matrix$getIndex = F3(
	function (size, row, col) {
		return (size * row) + col;
	});
var pablohirafuji$elm_qrcode$QRCode$Matrix$isOccupy = F4(
	function (row, col, size, matrix) {
		var _n0 = A2(
			elm$core$Array$get,
			A3(pablohirafuji$elm_qrcode$QRCode$Matrix$getIndex, size, row, col),
			matrix);
		if ((_n0.$ === 'Just') && (_n0.a.$ === 'Just')) {
			return true;
		} else {
			return false;
		}
	});
var pablohirafuji$elm_qrcode$QRCode$Matrix$nextModule = function (placement) {
	var row = placement.row;
	var col = placement.col;
	var isRight = placement.isRight;
	var isUp = placement.isUp;
	return isRight ? _Utils_update(
		placement,
		{col: col - 1, isRight: false}) : (isUp ? _Utils_update(
		placement,
		{col: col + 1, isRight: true, row: row - 1}) : _Utils_update(
		placement,
		{col: col + 1, isRight: true, row: row + 1}));
};
var pablohirafuji$elm_qrcode$QRCode$Matrix$bitToColor = F2(
	function (_byte, offset) {
		return (1 & (_byte >> (7 - offset))) === 1;
	});
var pablohirafuji$elm_qrcode$QRCode$Matrix$setDataModule = F3(
	function (_n0, _byte, offset) {
		var size = _n0.size;
		var row = _n0.row;
		var col = _n0.col;
		return A2(
			elm$core$Array$set,
			A3(pablohirafuji$elm_qrcode$QRCode$Matrix$getIndex, size, row, col),
			elm$core$Maybe$Just(
				_Utils_Tuple2(
					false,
					A2(pablohirafuji$elm_qrcode$QRCode$Matrix$bitToColor, _byte, offset))));
	});
var pablohirafuji$elm_qrcode$QRCode$Matrix$addDataModule = F4(
	function (placement, bytes, offset, matrix) {
		addDataModule:
		while (true) {
			var size = placement.size;
			var row = placement.row;
			var col = placement.col;
			if (!bytes.b) {
				return matrix;
			} else {
				var head = bytes.a;
				var tail = bytes.b;
				if (offset >= 8) {
					var $temp$placement = placement,
						$temp$bytes = tail,
						$temp$offset = 0,
						$temp$matrix = matrix;
					placement = $temp$placement;
					bytes = $temp$bytes;
					offset = $temp$offset;
					matrix = $temp$matrix;
					continue addDataModule;
				} else {
					if (col === 6) {
						var $temp$placement = _Utils_update(
							placement,
							{col: col - 1, isRight: true}),
							$temp$bytes = bytes,
							$temp$offset = offset,
							$temp$matrix = matrix;
						placement = $temp$placement;
						bytes = $temp$bytes;
						offset = $temp$offset;
						matrix = $temp$matrix;
						continue addDataModule;
					} else {
						if (row < 0) {
							var $temp$placement = _Utils_update(
								placement,
								{col: col - 2, isRight: true, isUp: false, row: 0}),
								$temp$bytes = bytes,
								$temp$offset = offset,
								$temp$matrix = matrix;
							placement = $temp$placement;
							bytes = $temp$bytes;
							offset = $temp$offset;
							matrix = $temp$matrix;
							continue addDataModule;
						} else {
							if (_Utils_cmp(row, size) > -1) {
								var $temp$placement = _Utils_update(
									placement,
									{col: col - 2, isRight: true, isUp: true, row: size - 1}),
									$temp$bytes = bytes,
									$temp$offset = offset,
									$temp$matrix = matrix;
								placement = $temp$placement;
								bytes = $temp$bytes;
								offset = $temp$offset;
								matrix = $temp$matrix;
								continue addDataModule;
							} else {
								if (A4(pablohirafuji$elm_qrcode$QRCode$Matrix$isOccupy, row, col, size, matrix)) {
									var $temp$placement = pablohirafuji$elm_qrcode$QRCode$Matrix$nextModule(placement),
										$temp$bytes = bytes,
										$temp$offset = offset,
										$temp$matrix = matrix;
									placement = $temp$placement;
									bytes = $temp$bytes;
									offset = $temp$offset;
									matrix = $temp$matrix;
									continue addDataModule;
								} else {
									var $temp$placement = pablohirafuji$elm_qrcode$QRCode$Matrix$nextModule(placement),
										$temp$bytes = bytes,
										$temp$offset = offset + 1,
										$temp$matrix = A4(pablohirafuji$elm_qrcode$QRCode$Matrix$setDataModule, placement, head, offset, matrix);
									placement = $temp$placement;
									bytes = $temp$bytes;
									offset = $temp$offset;
									matrix = $temp$matrix;
									continue addDataModule;
								}
							}
						}
					}
				}
			}
		}
	});
var pablohirafuji$elm_qrcode$QRCode$Matrix$initPlacement = function (size) {
	return {col: size + 1, isRight: true, isUp: true, row: size + 1, size: size};
};
var pablohirafuji$elm_qrcode$QRCode$Matrix$addData = F3(
	function (size, bytes, matrix) {
		return A4(
			pablohirafuji$elm_qrcode$QRCode$Matrix$addDataModule,
			pablohirafuji$elm_qrcode$QRCode$Matrix$initPlacement(size),
			bytes,
			0,
			matrix);
	});
var pablohirafuji$elm_qrcode$QRCode$Error$AlignmentPatternNotFound = {$: 'AlignmentPatternNotFound'};
var pablohirafuji$elm_qrcode$QRCode$Matrix$alignmentPatternData = elm$core$Array$fromList(
	_List_fromArray(
		[
			_List_Nil,
			_List_fromArray(
			[6, 18]),
			_List_fromArray(
			[6, 22]),
			_List_fromArray(
			[6, 26]),
			_List_fromArray(
			[6, 30]),
			_List_fromArray(
			[6, 34]),
			_List_fromArray(
			[6, 22, 38]),
			_List_fromArray(
			[6, 24, 42]),
			_List_fromArray(
			[6, 26, 46]),
			_List_fromArray(
			[6, 28, 50]),
			_List_fromArray(
			[6, 30, 54]),
			_List_fromArray(
			[6, 32, 58]),
			_List_fromArray(
			[6, 34, 62]),
			_List_fromArray(
			[6, 26, 46, 66]),
			_List_fromArray(
			[6, 26, 48, 70]),
			_List_fromArray(
			[6, 26, 50, 74]),
			_List_fromArray(
			[6, 30, 54, 78]),
			_List_fromArray(
			[6, 30, 56, 82]),
			_List_fromArray(
			[6, 30, 58, 86]),
			_List_fromArray(
			[6, 34, 62, 90]),
			_List_fromArray(
			[6, 28, 50, 72, 94]),
			_List_fromArray(
			[6, 26, 50, 74, 98]),
			_List_fromArray(
			[6, 30, 54, 78, 102]),
			_List_fromArray(
			[6, 28, 54, 80, 106]),
			_List_fromArray(
			[6, 32, 58, 84, 110]),
			_List_fromArray(
			[6, 30, 58, 86, 114]),
			_List_fromArray(
			[6, 34, 62, 90, 118]),
			_List_fromArray(
			[6, 26, 50, 74, 98, 122]),
			_List_fromArray(
			[6, 30, 54, 78, 102, 126]),
			_List_fromArray(
			[6, 26, 52, 78, 104, 130]),
			_List_fromArray(
			[6, 30, 56, 82, 108, 134]),
			_List_fromArray(
			[6, 34, 60, 86, 112, 138]),
			_List_fromArray(
			[6, 30, 58, 86, 114, 142]),
			_List_fromArray(
			[6, 34, 62, 90, 118, 146]),
			_List_fromArray(
			[6, 30, 54, 78, 102, 126, 150]),
			_List_fromArray(
			[6, 24, 50, 76, 102, 128, 154]),
			_List_fromArray(
			[6, 28, 54, 80, 106, 132, 158]),
			_List_fromArray(
			[6, 32, 58, 84, 110, 136, 162]),
			_List_fromArray(
			[6, 26, 54, 82, 110, 138, 166]),
			_List_fromArray(
			[6, 30, 58, 86, 114, 142, 170])
		]));
var pablohirafuji$elm_qrcode$QRCode$Matrix$getAreaCoord = F2(
	function (rows, cols) {
		return A3(
			elm$core$List$foldl,
			F2(
				function (row, list) {
					return A3(
						elm$core$List$foldl,
						F2(
							function (col, list_) {
								return A2(
									elm$core$List$cons,
									_Utils_Tuple2(row, col),
									list_);
							}),
						list,
						cols);
				}),
			_List_Nil,
			rows);
	});
var pablohirafuji$elm_qrcode$QRCode$Matrix$isValidAlign = F2(
	function (size, _n0) {
		var row = _n0.a;
		var col = _n0.b;
		return ((row > 10) || ((10 < col) && (_Utils_cmp(col, size - 10) < 0))) && ((_Utils_cmp(row, size - 10) < 0) || (col > 10));
	});
var pablohirafuji$elm_qrcode$QRCode$Matrix$alignmentRange = A2(elm$core$List$range, -2, 2);
var pablohirafuji$elm_qrcode$QRCode$Matrix$alignmentColor = F2(
	function (row, col) {
		return (_Utils_eq(row, -2) || ((row === 2) || (_Utils_eq(col, -2) || ((col === 2) || ((!row) && (!col)))))) ? elm$core$Maybe$Just(
			_Utils_Tuple2(true, true)) : elm$core$Maybe$Just(
			_Utils_Tuple2(true, false));
	});
var pablohirafuji$elm_qrcode$QRCode$Matrix$setAlignModule = F4(
	function (size, rowPos, colPos, _n0) {
		var row = _n0.a;
		var col = _n0.b;
		return A2(
			elm$core$Array$set,
			A3(pablohirafuji$elm_qrcode$QRCode$Matrix$getIndex, size, row + rowPos, col + colPos),
			A2(pablohirafuji$elm_qrcode$QRCode$Matrix$alignmentColor, row, col));
	});
var pablohirafuji$elm_qrcode$QRCode$Matrix$setAlignment = F3(
	function (size, _n0, matrix) {
		var row = _n0.a;
		var col = _n0.b;
		return A3(
			elm$core$List$foldl,
			A3(pablohirafuji$elm_qrcode$QRCode$Matrix$setAlignModule, size, row, col),
			matrix,
			A2(pablohirafuji$elm_qrcode$QRCode$Matrix$getAreaCoord, pablohirafuji$elm_qrcode$QRCode$Matrix$alignmentRange, pablohirafuji$elm_qrcode$QRCode$Matrix$alignmentRange));
	});
var pablohirafuji$elm_qrcode$QRCode$Matrix$setAlignments = F3(
	function (size, locations, matrix) {
		return A3(
			elm$core$List$foldl,
			pablohirafuji$elm_qrcode$QRCode$Matrix$setAlignment(size),
			matrix,
			A2(
				elm$core$List$filter,
				pablohirafuji$elm_qrcode$QRCode$Matrix$isValidAlign(size),
				A2(pablohirafuji$elm_qrcode$QRCode$Matrix$getAreaCoord, locations, locations)));
	});
var pablohirafuji$elm_qrcode$QRCode$Matrix$alignmentPattern = F3(
	function (version, size, matrix) {
		return A2(
			elm$core$Result$map,
			function (a) {
				return A3(pablohirafuji$elm_qrcode$QRCode$Matrix$setAlignments, size, a, matrix);
			},
			A2(
				elm$core$Result$fromMaybe,
				pablohirafuji$elm_qrcode$QRCode$Error$AlignmentPatternNotFound,
				A2(elm$core$Array$get, version - 1, pablohirafuji$elm_qrcode$QRCode$Matrix$alignmentPatternData)));
	});
var pablohirafuji$elm_qrcode$QRCode$Matrix$darkModule = F2(
	function (version, size) {
		return A2(
			elm$core$Array$set,
			A3(pablohirafuji$elm_qrcode$QRCode$Matrix$getIndex, size, (4 * version) + 9, 8),
			elm$core$Maybe$Just(
				_Utils_Tuple2(true, true)));
	});
var pablohirafuji$elm_qrcode$QRCode$Matrix$finderRange = A2(elm$core$List$range, 0, 8);
var pablohirafuji$elm_qrcode$QRCode$Matrix$finderColor = F2(
	function (row, col) {
		return ((1 <= row) && ((row <= 7) && ((col === 1) || (col === 7)))) || (((1 <= col) && ((col <= 7) && ((row === 1) || (row === 7)))) || ((3 <= row) && ((row <= 5) && ((3 <= col) && (col <= 5)))));
	});
var pablohirafuji$elm_qrcode$QRCode$Matrix$setFinder = F5(
	function (size, rowOffset, colOffset, _n0, matrix) {
		var row = _n0.a;
		var col = _n0.b;
		var finalRow = row + rowOffset;
		var finalCol = col + colOffset;
		return ((finalRow < 0) || ((finalCol < 0) || ((_Utils_cmp(finalRow, size) > -1) || (_Utils_cmp(finalCol, size) > -1)))) ? matrix : A3(
			elm$core$Array$set,
			A3(pablohirafuji$elm_qrcode$QRCode$Matrix$getIndex, size, finalRow, finalCol),
			elm$core$Maybe$Just(
				_Utils_Tuple2(
					true,
					A2(pablohirafuji$elm_qrcode$QRCode$Matrix$finderColor, row, col))),
			matrix);
	});
var pablohirafuji$elm_qrcode$QRCode$Matrix$finderPattern = F4(
	function (size, rowOffset, colOffset, matrix) {
		return A3(
			elm$core$List$foldl,
			A3(pablohirafuji$elm_qrcode$QRCode$Matrix$setFinder, size, rowOffset, colOffset),
			matrix,
			A2(pablohirafuji$elm_qrcode$QRCode$Matrix$getAreaCoord, pablohirafuji$elm_qrcode$QRCode$Matrix$finderRange, pablohirafuji$elm_qrcode$QRCode$Matrix$finderRange));
	});
var elm$core$Basics$neq = _Utils_notEqual;
var elm$core$Basics$not = _Basics_not;
var pablohirafuji$elm_qrcode$QRCode$Matrix$applyMaskColor = F2(
	function (maybeModule, isChange) {
		if (isChange) {
			if ((maybeModule.$ === 'Just') && (!maybeModule.a.a)) {
				var _n1 = maybeModule.a;
				var isDark = _n1.b;
				return elm$core$Maybe$Just(
					_Utils_Tuple2(false, !isDark));
			} else {
				return maybeModule;
			}
		} else {
			return maybeModule;
		}
	});
var pablohirafuji$elm_qrcode$QRCode$Matrix$getCoord = F2(
	function (size, index) {
		return _Utils_Tuple2(
			(index / size) | 0,
			A2(elm$core$Basics$modBy, size, index));
	});
var pablohirafuji$elm_qrcode$QRCode$Matrix$applyMaskFunction = F4(
	function (_function, size, index, maybeModule) {
		return A2(
			pablohirafuji$elm_qrcode$QRCode$Matrix$applyMaskColor,
			maybeModule,
			_function(
				A2(pablohirafuji$elm_qrcode$QRCode$Matrix$getCoord, size, index)));
	});
var pablohirafuji$elm_qrcode$QRCode$Matrix$maskFunction = function (mask) {
	switch (mask.$) {
		case 'Pattern0':
			return function (_n1) {
				var row = _n1.a;
				var col = _n1.b;
				return !A2(elm$core$Basics$modBy, 2, row + col);
			};
		case 'Pattern1':
			return function (_n2) {
				var row = _n2.a;
				return !A2(elm$core$Basics$modBy, 2, row);
			};
		case 'Pattern2':
			return function (_n3) {
				var col = _n3.b;
				return !A2(elm$core$Basics$modBy, 3, col);
			};
		case 'Pattern3':
			return function (_n4) {
				var row = _n4.a;
				var col = _n4.b;
				return !A2(elm$core$Basics$modBy, 3, row + col);
			};
		case 'Pattern4':
			return function (_n5) {
				var row = _n5.a;
				var col = _n5.b;
				return !A2(
					elm$core$Basics$modBy,
					2,
					elm$core$Basics$floor(row / 2) + elm$core$Basics$floor(col / 3));
			};
		case 'Pattern5':
			return function (_n6) {
				var row = _n6.a;
				var col = _n6.b;
				return !(A2(elm$core$Basics$modBy, 2, row * col) + A2(elm$core$Basics$modBy, 3, row * col));
			};
		case 'Pattern6':
			return function (_n7) {
				var row = _n7.a;
				var col = _n7.b;
				return !A2(
					elm$core$Basics$modBy,
					2,
					A2(elm$core$Basics$modBy, 2, row * col) + A2(elm$core$Basics$modBy, 3, row * col));
			};
		default:
			return function (_n8) {
				var row = _n8.a;
				var col = _n8.b;
				return !A2(
					elm$core$Basics$modBy,
					2,
					A2(elm$core$Basics$modBy, 3, row * col) + A2(elm$core$Basics$modBy, 2, row + col));
			};
	}
};
var pablohirafuji$elm_qrcode$QRCode$Matrix$applyMask = F3(
	function (size, mask, matrix) {
		return A2(
			elm$core$Array$indexedMap,
			A2(
				pablohirafuji$elm_qrcode$QRCode$Matrix$applyMaskFunction,
				pablohirafuji$elm_qrcode$QRCode$Matrix$maskFunction(mask),
				size),
			matrix);
	});
var pablohirafuji$elm_qrcode$QRCode$Matrix$breakList = F3(
	function (width, list, acc) {
		breakList:
		while (true) {
			if (!list.b) {
				return elm$core$List$reverse(acc);
			} else {
				var $temp$width = width,
					$temp$list = A2(elm$core$List$drop, width, list),
					$temp$acc = A2(
					elm$core$List$cons,
					A2(elm$core$List$take, width, list),
					acc);
				width = $temp$width;
				list = $temp$list;
				acc = $temp$acc;
				continue breakList;
			}
		}
	});
var pablohirafuji$elm_qrcode$QRCode$Matrix$isDarkModule = A2(
	elm$core$Basics$composeR,
	elm$core$Maybe$map(elm$core$Tuple$second),
	elm$core$Maybe$withDefault(false));
var elm$core$List$sum = function (numbers) {
	return A3(elm$core$List$foldl, elm$core$Basics$add, 0, numbers);
};
var pablohirafuji$elm_qrcode$QRCode$Matrix$rule1Score_ = F2(
	function (simplifiedList, _n0) {
		rule1Score_:
		while (true) {
			var last = _n0.a;
			var partialScore = _n0.b;
			var score = _n0.c;
			if (!simplifiedList.b) {
				return (partialScore >= 5) ? ((score + partialScore) - 2) : score;
			} else {
				var head = simplifiedList.a;
				var tail = simplifiedList.b;
				if (_Utils_eq(last, head)) {
					var $temp$simplifiedList = tail,
						$temp$_n0 = _Utils_Tuple3(last, partialScore + 1, score);
					simplifiedList = $temp$simplifiedList;
					_n0 = $temp$_n0;
					continue rule1Score_;
				} else {
					if (partialScore >= 5) {
						var $temp$simplifiedList = tail,
							$temp$_n0 = _Utils_Tuple3(head, 0, (score + partialScore) - 2);
						simplifiedList = $temp$simplifiedList;
						_n0 = $temp$_n0;
						continue rule1Score_;
					} else {
						var $temp$simplifiedList = tail,
							$temp$_n0 = _Utils_Tuple3(head, 0, score);
						simplifiedList = $temp$simplifiedList;
						_n0 = $temp$_n0;
						continue rule1Score_;
					}
				}
			}
		}
	});
var pablohirafuji$elm_qrcode$QRCode$Matrix$rule1Score = A2(
	elm$core$Basics$composeR,
	elm$core$List$map(
		function (a) {
			return A2(
				pablohirafuji$elm_qrcode$QRCode$Matrix$rule1Score_,
				a,
				_Utils_Tuple3(false, 0, 0));
		}),
	elm$core$List$sum);
var pablohirafuji$elm_qrcode$QRCode$Matrix$rule2Score_ = F4(
	function (row1, row2, maybeLast, score) {
		rule2Score_:
		while (true) {
			if (!row1.b) {
				return score;
			} else {
				var head = row1.a;
				var tail = row1.b;
				if (!row2.b) {
					return score;
				} else {
					var head2 = row2.a;
					var tail2 = row2.b;
					if (_Utils_eq(head, head2)) {
						if (_Utils_eq(
							elm$core$Maybe$Just(head),
							maybeLast)) {
							var $temp$row1 = tail,
								$temp$row2 = tail2,
								$temp$maybeLast = elm$core$Maybe$Just(head),
								$temp$score = score + 3;
							row1 = $temp$row1;
							row2 = $temp$row2;
							maybeLast = $temp$maybeLast;
							score = $temp$score;
							continue rule2Score_;
						} else {
							var $temp$row1 = tail,
								$temp$row2 = tail2,
								$temp$maybeLast = elm$core$Maybe$Just(head),
								$temp$score = score;
							row1 = $temp$row1;
							row2 = $temp$row2;
							maybeLast = $temp$maybeLast;
							score = $temp$score;
							continue rule2Score_;
						}
					} else {
						var $temp$row1 = tail,
							$temp$row2 = tail2,
							$temp$maybeLast = elm$core$Maybe$Nothing,
							$temp$score = score;
						row1 = $temp$row1;
						row2 = $temp$row2;
						maybeLast = $temp$maybeLast;
						score = $temp$score;
						continue rule2Score_;
					}
				}
			}
		}
	});
var pablohirafuji$elm_qrcode$QRCode$Matrix$rule2Score = F2(
	function (list, score) {
		rule2Score:
		while (true) {
			if (list.b && list.b.b) {
				var head1 = list.a;
				var _n1 = list.b;
				var head2 = _n1.a;
				var tail = _n1.b;
				var $temp$list = tail,
					$temp$score = score + A4(pablohirafuji$elm_qrcode$QRCode$Matrix$rule2Score_, head1, head2, elm$core$Maybe$Nothing, 0);
				list = $temp$list;
				score = $temp$score;
				continue rule2Score;
			} else {
				return score;
			}
		}
	});
var pablohirafuji$elm_qrcode$QRCode$Matrix$rule3Score_ = F2(
	function (simplifiedList, score) {
		rule3Score_:
		while (true) {
			_n0$3:
			while (true) {
				if (!simplifiedList.b) {
					return score;
				} else {
					if (!simplifiedList.a) {
						if (((((((((((((((((((simplifiedList.b.b && (!simplifiedList.b.a)) && simplifiedList.b.b.b) && (!simplifiedList.b.b.a)) && simplifiedList.b.b.b.b) && (!simplifiedList.b.b.b.a)) && simplifiedList.b.b.b.b.b) && simplifiedList.b.b.b.b.a) && simplifiedList.b.b.b.b.b.b) && (!simplifiedList.b.b.b.b.b.a)) && simplifiedList.b.b.b.b.b.b.b) && simplifiedList.b.b.b.b.b.b.a) && simplifiedList.b.b.b.b.b.b.b.b) && simplifiedList.b.b.b.b.b.b.b.a) && simplifiedList.b.b.b.b.b.b.b.b.b) && simplifiedList.b.b.b.b.b.b.b.b.a) && simplifiedList.b.b.b.b.b.b.b.b.b.b) && (!simplifiedList.b.b.b.b.b.b.b.b.b.a)) && simplifiedList.b.b.b.b.b.b.b.b.b.b.b) && simplifiedList.b.b.b.b.b.b.b.b.b.b.a) {
							var _n1 = simplifiedList.b;
							var _n2 = _n1.b;
							var _n3 = _n2.b;
							var _n4 = _n3.b;
							var _n5 = _n4.b;
							var _n6 = _n5.b;
							var _n7 = _n6.b;
							var _n8 = _n7.b;
							var _n9 = _n8.b;
							var _n10 = _n9.b;
							var tail = _n10.b;
							var $temp$simplifiedList = tail,
								$temp$score = score + 40;
							simplifiedList = $temp$simplifiedList;
							score = $temp$score;
							continue rule3Score_;
						} else {
							break _n0$3;
						}
					} else {
						if (((((((((((((((((((simplifiedList.b.b && (!simplifiedList.b.a)) && simplifiedList.b.b.b) && simplifiedList.b.b.a) && simplifiedList.b.b.b.b) && simplifiedList.b.b.b.a) && simplifiedList.b.b.b.b.b) && simplifiedList.b.b.b.b.a) && simplifiedList.b.b.b.b.b.b) && (!simplifiedList.b.b.b.b.b.a)) && simplifiedList.b.b.b.b.b.b.b) && simplifiedList.b.b.b.b.b.b.a) && simplifiedList.b.b.b.b.b.b.b.b) && (!simplifiedList.b.b.b.b.b.b.b.a)) && simplifiedList.b.b.b.b.b.b.b.b.b) && (!simplifiedList.b.b.b.b.b.b.b.b.a)) && simplifiedList.b.b.b.b.b.b.b.b.b.b) && (!simplifiedList.b.b.b.b.b.b.b.b.b.a)) && simplifiedList.b.b.b.b.b.b.b.b.b.b.b) && (!simplifiedList.b.b.b.b.b.b.b.b.b.b.a)) {
							var _n11 = simplifiedList.b;
							var _n12 = _n11.b;
							var _n13 = _n12.b;
							var _n14 = _n13.b;
							var _n15 = _n14.b;
							var _n16 = _n15.b;
							var _n17 = _n16.b;
							var _n18 = _n17.b;
							var _n19 = _n18.b;
							var _n20 = _n19.b;
							var tail = _n20.b;
							var $temp$simplifiedList = tail,
								$temp$score = score + 40;
							simplifiedList = $temp$simplifiedList;
							score = $temp$score;
							continue rule3Score_;
						} else {
							break _n0$3;
						}
					}
				}
			}
			var head = simplifiedList.a;
			var tail = simplifiedList.b;
			var $temp$simplifiedList = tail,
				$temp$score = score;
			simplifiedList = $temp$simplifiedList;
			score = $temp$score;
			continue rule3Score_;
		}
	});
var pablohirafuji$elm_qrcode$QRCode$Matrix$rule3Score = A2(elm$core$List$foldl, pablohirafuji$elm_qrcode$QRCode$Matrix$rule3Score_, 0);
var elm$core$Basics$abs = function (n) {
	return (n < 0) ? (-n) : n;
};
var elm$core$Basics$round = _Basics_round;
var pablohirafuji$elm_qrcode$QRCode$Matrix$rule4Score = F2(
	function (size, simplifiedList) {
		var moduleCount = size * size;
		var darkCount = elm$core$List$length(
			A2(elm$core$List$filter, elm$core$Basics$identity, simplifiedList));
		var darkPerc = elm$core$Basics$round((100 * darkCount) / moduleCount);
		var remOf5 = darkPerc % 5;
		var nextMult5 = elm$core$Basics$round(
			elm$core$Basics$abs((darkPerc + (5 - remOf5)) - 50) / 5);
		var prevMult5 = elm$core$Basics$round(
			elm$core$Basics$abs((darkPerc - remOf5) - 50) / 5);
		return A2(elm$core$Basics$min, prevMult5, nextMult5) * 10;
	});
var pablohirafuji$elm_qrcode$QRCode$Matrix$getMaskScore = F2(
	function (size, matrix) {
		var list = A2(
			elm$core$List$map,
			pablohirafuji$elm_qrcode$QRCode$Matrix$isDarkModule,
			elm$core$Array$toList(matrix));
		var rowList = A3(pablohirafuji$elm_qrcode$QRCode$Matrix$breakList, size, list, _List_Nil);
		var transposedRowList = pablohirafuji$elm_qrcode$QRCode$Helpers$transpose(rowList);
		return function (b) {
			return _Utils_Tuple2(rowList, b);
		}(
			A2(pablohirafuji$elm_qrcode$QRCode$Matrix$rule4Score, size, list) + (pablohirafuji$elm_qrcode$QRCode$Matrix$rule3Score(transposedRowList) + (pablohirafuji$elm_qrcode$QRCode$Matrix$rule3Score(rowList) + (A2(pablohirafuji$elm_qrcode$QRCode$Matrix$rule2Score, rowList, 0) + (pablohirafuji$elm_qrcode$QRCode$Matrix$rule1Score(transposedRowList) + pablohirafuji$elm_qrcode$QRCode$Matrix$rule1Score(rowList))))));
	});
var pablohirafuji$elm_qrcode$QRCode$Matrix$ecLevelToInt = function (ecLevel) {
	switch (ecLevel.$) {
		case 'L':
			return 1;
		case 'M':
			return 0;
		case 'Q':
			return 3;
		default:
			return 2;
	}
};
var pablohirafuji$elm_qrcode$QRCode$Matrix$getBCHDigit = function (_int) {
	var helper = F2(
		function (digit, int_) {
			helper:
			while (true) {
				if (int_) {
					var $temp$digit = digit + 1,
						$temp$int_ = int_ >>> 1;
					digit = $temp$digit;
					int_ = $temp$int_;
					continue helper;
				} else {
					return digit;
				}
			}
		});
	return A2(helper, 0, _int);
};
var pablohirafuji$elm_qrcode$QRCode$Matrix$maskToInt = function (mask) {
	switch (mask.$) {
		case 'Pattern0':
			return 0;
		case 'Pattern1':
			return 1;
		case 'Pattern2':
			return 2;
		case 'Pattern3':
			return 3;
		case 'Pattern4':
			return 4;
		case 'Pattern5':
			return 5;
		case 'Pattern6':
			return 6;
		default:
			return 7;
	}
};
var pablohirafuji$elm_qrcode$QRCode$Matrix$encodeFormatInfo = F2(
	function (ecLevel, mask) {
		var g15Mask = 21522;
		var g15Int = 1335;
		var g15Digit = pablohirafuji$elm_qrcode$QRCode$Matrix$getBCHDigit(g15Int);
		var formatInfoInt = pablohirafuji$elm_qrcode$QRCode$Matrix$maskToInt(mask) | (pablohirafuji$elm_qrcode$QRCode$Matrix$ecLevelToInt(ecLevel) << 3);
		var helper = function (d_) {
			helper:
			while (true) {
				if ((pablohirafuji$elm_qrcode$QRCode$Matrix$getBCHDigit(d_) - g15Digit) >= 0) {
					var $temp$d_ = d_ ^ (g15Int << (pablohirafuji$elm_qrcode$QRCode$Matrix$getBCHDigit(d_) - g15Digit));
					d_ = $temp$d_;
					continue helper;
				} else {
					return g15Mask ^ (d_ | (formatInfoInt << 10));
				}
			}
		};
		var d = formatInfoInt << 10;
		return helper(d);
	});
var pablohirafuji$elm_qrcode$QRCode$Matrix$formatInfoHorizontal = F2(
	function (size, count) {
		return (count < 8) ? _Utils_Tuple2(8, (size - count) - 1) : ((count < 9) ? _Utils_Tuple2(8, 15 - count) : _Utils_Tuple2(8, (15 - count) - 1));
	});
var pablohirafuji$elm_qrcode$QRCode$Matrix$formatInfoVertical = F2(
	function (size, count) {
		return (count < 6) ? _Utils_Tuple2(count, 8) : ((count < 8) ? _Utils_Tuple2(count + 1, 8) : _Utils_Tuple2((size - 15) + count, 8));
	});
var pablohirafuji$elm_qrcode$QRCode$Matrix$setFormatModule = F4(
	function (size, isBlack, row, col) {
		return A2(
			elm$core$Array$set,
			A3(pablohirafuji$elm_qrcode$QRCode$Matrix$getIndex, size, row, col),
			elm$core$Maybe$Just(
				_Utils_Tuple2(true, isBlack)));
	});
var pablohirafuji$elm_qrcode$QRCode$Matrix$setFormatInfo_ = F4(
	function (size, isBlackFn, count, matrix) {
		setFormatInfo_:
		while (true) {
			if (count < 15) {
				var isBlack = isBlackFn(count);
				var _n0 = A2(pablohirafuji$elm_qrcode$QRCode$Matrix$formatInfoVertical, size, count);
				var x2 = _n0.a;
				var y2 = _n0.b;
				var _n1 = A2(pablohirafuji$elm_qrcode$QRCode$Matrix$formatInfoHorizontal, size, count);
				var x1 = _n1.a;
				var y1 = _n1.b;
				var $temp$size = size,
					$temp$isBlackFn = isBlackFn,
					$temp$count = count + 1,
					$temp$matrix = A5(
					pablohirafuji$elm_qrcode$QRCode$Matrix$setFormatModule,
					size,
					isBlack,
					x2,
					y2,
					A5(pablohirafuji$elm_qrcode$QRCode$Matrix$setFormatModule, size, isBlack, x1, y1, matrix));
				size = $temp$size;
				isBlackFn = $temp$isBlackFn;
				count = $temp$count;
				matrix = $temp$matrix;
				continue setFormatInfo_;
			} else {
				return matrix;
			}
		}
	});
var pablohirafuji$elm_qrcode$QRCode$Matrix$setFormatInfo = F4(
	function (ecLevel, size, mask, matrix) {
		var isBlack = F2(
			function (bits_, count) {
				return (1 & (bits_ >> count)) === 1;
			});
		var bits = A2(pablohirafuji$elm_qrcode$QRCode$Matrix$encodeFormatInfo, ecLevel, mask);
		return A4(
			pablohirafuji$elm_qrcode$QRCode$Matrix$setFormatInfo_,
			size,
			isBlack(bits),
			0,
			matrix);
	});
var pablohirafuji$elm_qrcode$QRCode$Matrix$getBestMask_ = F5(
	function (ecLevel, size, matrix, mask, _n0) {
		var minSMatrix = _n0.a;
		var minScore = _n0.b;
		var maskedMatrix = A4(
			pablohirafuji$elm_qrcode$QRCode$Matrix$setFormatInfo,
			ecLevel,
			size,
			mask,
			A3(pablohirafuji$elm_qrcode$QRCode$Matrix$applyMask, size, mask, matrix));
		var _n1 = A2(pablohirafuji$elm_qrcode$QRCode$Matrix$getMaskScore, size, maskedMatrix);
		var maskSMatrix = _n1.a;
		var maskScore = _n1.b;
		return ((_Utils_cmp(minScore, maskScore) < 0) && (!_Utils_eq(minScore, -1))) ? _Utils_Tuple2(minSMatrix, minScore) : _Utils_Tuple2(maskSMatrix, maskScore);
	});
var pablohirafuji$elm_qrcode$QRCode$Matrix$Pattern0 = {$: 'Pattern0'};
var pablohirafuji$elm_qrcode$QRCode$Matrix$Pattern1 = {$: 'Pattern1'};
var pablohirafuji$elm_qrcode$QRCode$Matrix$Pattern2 = {$: 'Pattern2'};
var pablohirafuji$elm_qrcode$QRCode$Matrix$Pattern3 = {$: 'Pattern3'};
var pablohirafuji$elm_qrcode$QRCode$Matrix$Pattern4 = {$: 'Pattern4'};
var pablohirafuji$elm_qrcode$QRCode$Matrix$Pattern5 = {$: 'Pattern5'};
var pablohirafuji$elm_qrcode$QRCode$Matrix$Pattern6 = {$: 'Pattern6'};
var pablohirafuji$elm_qrcode$QRCode$Matrix$Pattern7 = {$: 'Pattern7'};
var pablohirafuji$elm_qrcode$QRCode$Matrix$patternList = _List_fromArray(
	[pablohirafuji$elm_qrcode$QRCode$Matrix$Pattern0, pablohirafuji$elm_qrcode$QRCode$Matrix$Pattern1, pablohirafuji$elm_qrcode$QRCode$Matrix$Pattern2, pablohirafuji$elm_qrcode$QRCode$Matrix$Pattern3, pablohirafuji$elm_qrcode$QRCode$Matrix$Pattern4, pablohirafuji$elm_qrcode$QRCode$Matrix$Pattern5, pablohirafuji$elm_qrcode$QRCode$Matrix$Pattern6, pablohirafuji$elm_qrcode$QRCode$Matrix$Pattern7]);
var pablohirafuji$elm_qrcode$QRCode$Matrix$getBestMask = F3(
	function (ecLevel, size, matrix) {
		return A3(
			elm$core$List$foldl,
			A3(pablohirafuji$elm_qrcode$QRCode$Matrix$getBestMask_, ecLevel, size, matrix),
			_Utils_Tuple2(_List_Nil, -1),
			pablohirafuji$elm_qrcode$QRCode$Matrix$patternList).a;
	});
var pablohirafuji$elm_qrcode$QRCode$Matrix$reserveFormatInfo = F2(
	function (size, matrix) {
		return A4(
			pablohirafuji$elm_qrcode$QRCode$Matrix$setFormatInfo_,
			size,
			elm$core$Basics$always(true),
			0,
			matrix);
	});
var pablohirafuji$elm_qrcode$QRCode$Matrix$encodeVersionInfo = function (version) {
	var g18Int = 7973;
	var g18Digit = pablohirafuji$elm_qrcode$QRCode$Matrix$getBCHDigit(g18Int);
	var helper = function (d_) {
		helper:
		while (true) {
			if ((pablohirafuji$elm_qrcode$QRCode$Matrix$getBCHDigit(d_) - g18Digit) >= 0) {
				var $temp$d_ = d_ ^ (g18Int << (pablohirafuji$elm_qrcode$QRCode$Matrix$getBCHDigit(d_) - g18Digit));
				d_ = $temp$d_;
				continue helper;
			} else {
				return d_ | (version << 12);
			}
		}
	};
	var d = version << 12;
	return helper(d);
};
var pablohirafuji$elm_qrcode$QRCode$Matrix$setVersionModule = F3(
	function (size, isBlack, _n0) {
		var row = _n0.a;
		var col = _n0.b;
		return A2(
			elm$core$Array$set,
			A3(pablohirafuji$elm_qrcode$QRCode$Matrix$getIndex, size, row, col),
			elm$core$Maybe$Just(
				_Utils_Tuple2(true, isBlack)));
	});
var pablohirafuji$elm_qrcode$QRCode$Matrix$setVersionInfo_ = F4(
	function (size, isBlackFn, count, matrix) {
		setVersionInfo_:
		while (true) {
			if (count < 18) {
				var topRight = _Utils_Tuple2(
					elm$core$Basics$floor(count / 3),
					((A2(elm$core$Basics$modBy, 3, count) + size) - 8) - 3);
				var isBlack = isBlackFn(count);
				var bottomLeft = _Utils_Tuple2(
					((A2(elm$core$Basics$modBy, 3, count) + size) - 8) - 3,
					elm$core$Basics$floor(count / 3));
				var $temp$size = size,
					$temp$isBlackFn = isBlackFn,
					$temp$count = count + 1,
					$temp$matrix = A4(
					pablohirafuji$elm_qrcode$QRCode$Matrix$setVersionModule,
					size,
					isBlack,
					bottomLeft,
					A4(pablohirafuji$elm_qrcode$QRCode$Matrix$setVersionModule, size, isBlack, topRight, matrix));
				size = $temp$size;
				isBlackFn = $temp$isBlackFn;
				count = $temp$count;
				matrix = $temp$matrix;
				continue setVersionInfo_;
			} else {
				return matrix;
			}
		}
	});
var pablohirafuji$elm_qrcode$QRCode$Matrix$setVersionInfo = F3(
	function (version, size, matrix) {
		if (version >= 7) {
			var isBlack = F2(
				function (bits_, count) {
					return (1 & (bits_ >> count)) === 1;
				});
			var bits = pablohirafuji$elm_qrcode$QRCode$Matrix$encodeVersionInfo(version);
			return A4(
				pablohirafuji$elm_qrcode$QRCode$Matrix$setVersionInfo_,
				size,
				isBlack(bits),
				0,
				matrix);
		} else {
			return matrix;
		}
	});
var pablohirafuji$elm_qrcode$QRCode$Matrix$timingColor = F2(
	function (row, col) {
		return (!A2(elm$core$Basics$modBy, 2, row + col)) ? elm$core$Maybe$Just(
			_Utils_Tuple2(true, true)) : elm$core$Maybe$Just(
			_Utils_Tuple2(true, false));
	});
var pablohirafuji$elm_qrcode$QRCode$Matrix$setTiming = F3(
	function (size, row, col) {
		return A2(
			elm$core$Array$set,
			A3(pablohirafuji$elm_qrcode$QRCode$Matrix$getIndex, size, row, col),
			A2(pablohirafuji$elm_qrcode$QRCode$Matrix$timingColor, row, col));
	});
var pablohirafuji$elm_qrcode$QRCode$Matrix$timingPattern = F2(
	function (size, matrix) {
		var range = A2(elm$core$List$range, 8, size - 9);
		return A3(
			elm$core$List$foldl,
			function (b) {
				return A3(pablohirafuji$elm_qrcode$QRCode$Matrix$setTiming, size, b, 6);
			},
			A3(
				elm$core$List$foldl,
				A2(pablohirafuji$elm_qrcode$QRCode$Matrix$setTiming, size, 6),
				matrix,
				range),
			range);
	});
var pablohirafuji$elm_qrcode$QRCode$Matrix$apply = function (_n0) {
	var ecLevel = _n0.a.ecLevel;
	var groupInfo = _n0.a.groupInfo;
	var bytes = _n0.b;
	var version = groupInfo.version;
	var size = ((version - 1) * 4) + 21;
	return A2(
		elm$core$Result$map,
		A2(pablohirafuji$elm_qrcode$QRCode$Matrix$getBestMask, ecLevel, size),
		A2(
			elm$core$Result$map,
			A2(pablohirafuji$elm_qrcode$QRCode$Matrix$addData, size, bytes),
			A3(
				pablohirafuji$elm_qrcode$QRCode$Matrix$alignmentPattern,
				version,
				size,
				A2(
					pablohirafuji$elm_qrcode$QRCode$Matrix$timingPattern,
					size,
					A3(
						pablohirafuji$elm_qrcode$QRCode$Matrix$darkModule,
						version,
						size,
						A3(
							pablohirafuji$elm_qrcode$QRCode$Matrix$setVersionInfo,
							version,
							size,
							A2(
								pablohirafuji$elm_qrcode$QRCode$Matrix$reserveFormatInfo,
								size,
								A4(
									pablohirafuji$elm_qrcode$QRCode$Matrix$finderPattern,
									size,
									-1,
									size - 8,
									A4(
										pablohirafuji$elm_qrcode$QRCode$Matrix$finderPattern,
										size,
										size - 8,
										-1,
										A4(
											pablohirafuji$elm_qrcode$QRCode$Matrix$finderPattern,
											size,
											-1,
											-1,
											A2(
												elm$core$Array$initialize,
												size * size,
												elm$core$Basics$always(elm$core$Maybe$Nothing))))))))))));
};
var pablohirafuji$elm_qrcode$QRCode$encodeWith = F2(
	function (ecLevel, input) {
		return A2(
			elm$core$Result$mapError,
			pablohirafuji$elm_qrcode$QRCode$convertError,
			A2(
				elm$core$Result$map,
				pablohirafuji$elm_qrcode$QRCode$QRCode,
				A2(
					elm$core$Result$andThen,
					pablohirafuji$elm_qrcode$QRCode$Matrix$apply,
					A2(
						pablohirafuji$elm_qrcode$QRCode$Encode$encode,
						input,
						pablohirafuji$elm_qrcode$QRCode$convertEC(ecLevel)))));
	});
var pablohirafuji$elm_qrcode$QRCode$encode = pablohirafuji$elm_qrcode$QRCode$encodeWith(pablohirafuji$elm_qrcode$QRCode$Quartile);
var elm$svg$Svg$trustedNode = _VirtualDom_nodeNS('http://www.w3.org/2000/svg');
var elm$svg$Svg$svg = elm$svg$Svg$trustedNode('svg');
var elm$svg$Svg$Attributes$height = _VirtualDom_attribute('height');
var elm$svg$Svg$Attributes$shapeRendering = _VirtualDom_attribute('shape-rendering');
var elm$svg$Svg$Attributes$viewBox = _VirtualDom_attribute('viewBox');
var elm$svg$Svg$Attributes$width = _VirtualDom_attribute('width');
var pablohirafuji$elm_qrcode$QRCode$Render$Svg$moduleSize = 5;
var elm$svg$Svg$rect = elm$svg$Svg$trustedNode('rect');
var elm$svg$Svg$Attributes$fill = _VirtualDom_attribute('fill');
var elm$svg$Svg$Attributes$x = _VirtualDom_attribute('x');
var elm$svg$Svg$Attributes$y = _VirtualDom_attribute('y');
var pablohirafuji$elm_qrcode$QRCode$Render$Svg$rectView = F2(
	function (row, col) {
		return A2(
			elm$svg$Svg$rect,
			_List_fromArray(
				[
					elm$svg$Svg$Attributes$y(
					elm$core$String$fromInt(row * pablohirafuji$elm_qrcode$QRCode$Render$Svg$moduleSize)),
					elm$svg$Svg$Attributes$x(
					elm$core$String$fromInt(col * pablohirafuji$elm_qrcode$QRCode$Render$Svg$moduleSize)),
					elm$svg$Svg$Attributes$width(
					elm$core$String$fromInt(pablohirafuji$elm_qrcode$QRCode$Render$Svg$moduleSize)),
					elm$svg$Svg$Attributes$height(
					elm$core$String$fromInt(pablohirafuji$elm_qrcode$QRCode$Render$Svg$moduleSize)),
					elm$svg$Svg$Attributes$fill('black')
				]),
			_List_Nil);
	});
var pablohirafuji$elm_qrcode$QRCode$Render$Svg$moduleView = F4(
	function (quietZoneSize, rowIndex, colIndex, isDark) {
		return isDark ? elm$core$Maybe$Just(
			A2(pablohirafuji$elm_qrcode$QRCode$Render$Svg$rectView, rowIndex + quietZoneSize, colIndex + quietZoneSize)) : elm$core$Maybe$Nothing;
	});
var pablohirafuji$elm_qrcode$QRCode$Render$Svg$viewBase = F2(
	function (quietZoneSize, matrix) {
		var quietZone = (2 * quietZoneSize) * pablohirafuji$elm_qrcode$QRCode$Render$Svg$moduleSize;
		var sizePx = elm$core$String$fromInt(
			(elm$core$List$length(matrix) * pablohirafuji$elm_qrcode$QRCode$Render$Svg$moduleSize) + quietZone);
		return A2(
			elm$svg$Svg$svg,
			_List_fromArray(
				[
					elm$svg$Svg$Attributes$width(sizePx),
					elm$svg$Svg$Attributes$height(sizePx),
					elm$svg$Svg$Attributes$viewBox('0 0 ' + (sizePx + (' ' + sizePx))),
					elm$svg$Svg$Attributes$shapeRendering('crispEdges')
				]),
			A2(
				elm$core$List$filterMap,
				elm$core$Basics$identity,
				elm$core$List$concat(
					A2(
						elm$core$List$indexedMap,
						F2(
							function (rowIndex, row) {
								return A2(
									elm$core$List$indexedMap,
									A2(pablohirafuji$elm_qrcode$QRCode$Render$Svg$moduleView, quietZoneSize, rowIndex),
									row);
							}),
						matrix))));
	});
var pablohirafuji$elm_qrcode$QRCode$Render$Svg$view = function (matrix) {
	return A2(pablohirafuji$elm_qrcode$QRCode$Render$Svg$viewBase, 4, matrix);
};
var pablohirafuji$elm_qrcode$QRCode$toSvg = function (_n0) {
	var qrCode = _n0.a;
	return pablohirafuji$elm_qrcode$QRCode$Render$Svg$view(qrCode);
};
var author$project$Main$newGameView = function (model) {
	var startButton = function () {
		var _n0 = model.me.host;
		if (_n0) {
			return A2(
				elm$html$Html$button,
				_List_fromArray(
					[
						elm$html$Html$Events$onClick(author$project$Main$SetupGame)
					]),
				_List_fromArray(
					[
						elm$html$Html$text('Start Game')
					]));
		} else {
			return A2(
				elm$html$Html$button,
				_List_fromArray(
					[
						elm$html$Html$Attributes$disabled(true)
					]),
				_List_fromArray(
					[
						elm$html$Html$text('waiting for host to start game')
					]));
		}
	}();
	var playerList = A2(
		elm$core$List$map,
		A2(
			elm$core$Basics$composeR,
			function ($) {
				return $.name;
			},
			A2(
				elm$core$Basics$composeR,
				elm$html$Html$text,
				A2(
					elm$core$Basics$composeR,
					elm$core$List$singleton,
					elm$html$Html$li(_List_Nil)))),
		elm$core$List$reverse(model.players));
	return author$project$Main$rowView(
		_List_fromArray(
			[
				_Utils_Tuple2(
				'auto',
				A2(
					elm$html$Html$pre,
					_List_fromArray(
						[
							elm$html$Html$Attributes$class('error')
						]),
					elm$core$List$singleton(
						elm$html$Html$text(
							A2(elm$core$Maybe$withDefault, '', model.error))))),
				_Utils_Tuple2(
				'1fr',
				author$project$Main$columnView(
					_List_fromArray(
						[
							_Utils_Tuple2(
							'auto',
							A2(
								elm$html$Html$p,
								_List_Nil,
								_List_fromArray(
									[
										elm$html$Html$text('Join game with id ' + (model.gameId + ' or scan QR code:'))
									]))),
							_Utils_Tuple2(
							'auto',
							A2(
								elm$core$Result$withDefault,
								elm$html$Html$text('Error while encoding to QRCode.'),
								A2(
									elm$core$Result$map,
									pablohirafuji$elm_qrcode$QRCode$toSvg,
									pablohirafuji$elm_qrcode$QRCode$encode(model.url + ('?gameId=' + model.gameId)))))
						]))),
				_Utils_Tuple2(
				'auto',
				A2(
					elm$html$Html$label,
					_List_Nil,
					_List_fromArray(
						[
							elm$html$Html$text('Your Name'),
							A2(
							elm$html$Html$input,
							_List_fromArray(
								[
									elm$html$Html$Attributes$value(model.me.name),
									elm$html$Html$Events$onInput(author$project$Main$SetName)
								]),
							_List_Nil)
						]))),
				_Utils_Tuple2(
				'1fr',
				A2(elm$html$Html$ul, _List_Nil, playerList)),
				_Utils_Tuple2('auto', startButton)
			]));
};
var author$project$Main$newThreadView = function (model) {
	var playerOrder = A2(
		elm$core$List$sortBy,
		A2(
			elm$core$Basics$composeR,
			function ($) {
				return $.index;
			},
			A2(
				elm$core$Basics$composeR,
				elm$core$Basics$sub(model.me.index),
				elm$core$Basics$modBy(
					elm$core$List$length(model.players)))),
		model.players);
	return author$project$Main$rowView(
		_List_fromArray(
			[
				_Utils_Tuple2(
				'auto',
				A2(
					elm$html$Html$code,
					_List_Nil,
					_List_fromArray(
						[
							elm$html$Html$text(
							A2(elm$core$Maybe$withDefault, '', model.error))
						]))),
				_Utils_Tuple2(
				'auto',
				A2(
					elm$html$Html$label,
					_List_Nil,
					_List_fromArray(
						[
							elm$html$Html$text('Your phrase for the game')
						]))),
				_Utils_Tuple2(
				'auto',
				A2(
					elm$html$Html$input,
					_List_fromArray(
						[
							elm$html$Html$Events$onInput(author$project$Main$SetRound)
						]),
					_List_Nil)),
				_Utils_Tuple2(
				'auto',
				A2(
					elm$html$Html$button,
					_List_fromArray(
						[
							elm$html$Html$Events$onClick(author$project$Main$SubmitRound)
						]),
					_List_fromArray(
						[
							elm$html$Html$text('Submit')
						]))),
				_Utils_Tuple2(
				'1fr',
				A2(
					elm$html$Html$p,
					_List_Nil,
					_List_fromArray(
						[
							elm$html$Html$text(
							A2(
								elm$core$String$join,
								' → ',
								A2(
									elm$core$List$map,
									function ($) {
										return $.name;
									},
									playerOrder)))
						])))
			]));
};
var elm$core$List$concatMap = F2(
	function (f, list) {
		return elm$core$List$concat(
			A2(elm$core$List$map, f, list));
	});
var elm$html$Html$hr = _VirtualDom_node('hr');
var author$project$Main$reviewThreadView = function (thread) {
	return function (l) {
		return _Utils_ap(
			l,
			_List_fromArray(
				[
					A2(elm$html$Html$hr, _List_Nil, _List_Nil)
				]));
	}(
		A2(
			elm$core$List$concatMap,
			function (_n0) {
				var phrase = _n0.a;
				var drawing = _n0.b;
				var phraseEls = _List_fromArray(
					[
						A2(
						elm$html$Html$p,
						_List_Nil,
						_List_fromArray(
							[
								elm$html$Html$text(
								function (t) {
									return t + ':';
								}(
									A2(
										elm$core$Maybe$withDefault,
										'',
										A2(
											elm$core$Maybe$map,
											function ($) {
												return $.author;
											},
											phrase))))
							])),
						A2(
						elm$html$Html$p,
						_List_fromArray(
							[
								A2(elm$html$Html$Attributes$style, 'text-align', 'center')
							]),
						_List_fromArray(
							[
								elm$html$Html$text(
								A2(
									elm$core$Maybe$withDefault,
									'',
									A2(
										elm$core$Maybe$map,
										function ($) {
											return $.phrase;
										},
										phrase)))
							]))
					]);
				if (drawing.$ === 'Nothing') {
					return phraseEls;
				} else {
					var draw = drawing.a;
					return _Utils_ap(
						phraseEls,
						_List_fromArray(
							[
								A2(
								elm$html$Html$p,
								_List_Nil,
								_List_fromArray(
									[
										elm$html$Html$text(
										function (t) {
											return t + ':';
										}(
											A2(
												elm$core$Maybe$withDefault,
												'',
												A2(
													elm$core$Maybe$map,
													function ($) {
														return $.author;
													},
													drawing))))
									])),
								A2(
								elm$html$Html$div,
								_List_fromArray(
									[
										A2(
										elm$html$Html$Attributes$style,
										'background-image',
										'url(' + (A2(
											elm$core$Maybe$withDefault,
											'',
											A2(
												elm$core$Maybe$map,
												function ($) {
													return $.drawing;
												},
												drawing)) + ')')),
										A2(elm$html$Html$Attributes$style, 'background-size', 'contain'),
										A2(elm$html$Html$Attributes$style, 'background-position', 'center'),
										A2(elm$html$Html$Attributes$style, 'background-repeat', 'no-repeat'),
										A2(elm$html$Html$Attributes$style, 'height', '100vw')
									]),
								_List_Nil)
							]));
				}
			},
			thread.pairs));
};
var author$project$Main$reviewView = function (model) {
	return A2(
		elm$html$Html$div,
		_List_Nil,
		A2(elm$core$List$concatMap, author$project$Main$reviewThreadView, model.threads));
};
var author$project$Main$JoinGame = {$: 'JoinGame'};
var author$project$Main$SetGameId = function (a) {
	return {$: 'SetGameId', a: a};
};
var author$project$Main$StartNewGame = {$: 'StartNewGame'};
var author$project$Main$startView = function (model) {
	return author$project$Main$rowView(
		_List_fromArray(
			[
				_Utils_Tuple2(
				'auto',
				A2(
					elm$html$Html$h1,
					_List_Nil,
					_List_fromArray(
						[
							elm$html$Html$text('Pictionary Telephone')
						]))),
				_Utils_Tuple2(
				'auto',
				A2(
					elm$html$Html$code,
					_List_Nil,
					_List_fromArray(
						[
							elm$html$Html$text(
							A2(elm$core$Maybe$withDefault, '', model.error))
						]))),
				_Utils_Tuple2(
				'auto',
				A2(
					elm$html$Html$button,
					_List_fromArray(
						[
							elm$html$Html$Events$onClick(author$project$Main$StartNewGame),
							elm$html$Html$Attributes$disabled(model.me.peerId === '')
						]),
					_List_fromArray(
						[
							elm$html$Html$text('Start New Game')
						]))),
				_Utils_Tuple2(
				'auto',
				A2(elm$html$Html$div, _List_Nil, _List_Nil)),
				_Utils_Tuple2(
				'auto',
				A2(
					elm$html$Html$input,
					_List_fromArray(
						[
							elm$html$Html$Attributes$placeholder('host id'),
							elm$html$Html$Attributes$value(model.gameId),
							elm$html$Html$Events$onInput(author$project$Main$SetGameId)
						]),
					_List_Nil)),
				_Utils_Tuple2(
				'auto',
				A2(
					elm$html$Html$button,
					_List_fromArray(
						[
							elm$html$Html$Events$onClick(author$project$Main$JoinGame),
							elm$html$Html$Attributes$disabled((model.gameId === '') || (model.me.peerId === ''))
						]),
					_List_fromArray(
						[
							elm$html$Html$text('Join Game')
						]))),
				_Utils_Tuple2(
				'1fr',
				A2(elm$html$Html$div, _List_Nil, _List_Nil))
			]));
};
var author$project$Main$view = function (model) {
	var _n0 = model.page;
	switch (_n0.$) {
		case 'Start':
			return author$project$Main$startView(model);
		case 'NewGame':
			return author$project$Main$newGameView(model);
		case 'NewThread':
			return author$project$Main$newThreadView(model);
		case 'Draw':
			return author$project$Main$newDrawingView(model);
		case 'Describe':
			return author$project$Main$newDescribeView(model);
		default:
			return author$project$Main$reviewView(model);
	}
};
var elm$browser$Browser$External = function (a) {
	return {$: 'External', a: a};
};
var elm$browser$Browser$Internal = function (a) {
	return {$: 'Internal', a: a};
};
var elm$browser$Browser$Dom$NotFound = function (a) {
	return {$: 'NotFound', a: a};
};
var elm$core$Basics$never = function (_n0) {
	never:
	while (true) {
		var nvr = _n0.a;
		var $temp$_n0 = nvr;
		_n0 = $temp$_n0;
		continue never;
	}
};
var elm$core$Task$Perform = function (a) {
	return {$: 'Perform', a: a};
};
var elm$core$Task$init = elm$core$Task$succeed(_Utils_Tuple0);
var elm$core$Task$map = F2(
	function (func, taskA) {
		return A2(
			elm$core$Task$andThen,
			function (a) {
				return elm$core$Task$succeed(
					func(a));
			},
			taskA);
	});
var elm$core$Task$map2 = F3(
	function (func, taskA, taskB) {
		return A2(
			elm$core$Task$andThen,
			function (a) {
				return A2(
					elm$core$Task$andThen,
					function (b) {
						return elm$core$Task$succeed(
							A2(func, a, b));
					},
					taskB);
			},
			taskA);
	});
var elm$core$Task$sequence = function (tasks) {
	return A3(
		elm$core$List$foldr,
		elm$core$Task$map2(elm$core$List$cons),
		elm$core$Task$succeed(_List_Nil),
		tasks);
};
var elm$core$Task$spawnCmd = F2(
	function (router, _n0) {
		var task = _n0.a;
		return _Scheduler_spawn(
			A2(
				elm$core$Task$andThen,
				elm$core$Platform$sendToApp(router),
				task));
	});
var elm$core$Task$onEffects = F3(
	function (router, commands, state) {
		return A2(
			elm$core$Task$map,
			function (_n0) {
				return _Utils_Tuple0;
			},
			elm$core$Task$sequence(
				A2(
					elm$core$List$map,
					elm$core$Task$spawnCmd(router),
					commands)));
	});
var elm$core$Task$onSelfMsg = F3(
	function (_n0, _n1, _n2) {
		return elm$core$Task$succeed(_Utils_Tuple0);
	});
var elm$core$Task$cmdMap = F2(
	function (tagger, _n0) {
		var task = _n0.a;
		return elm$core$Task$Perform(
			A2(elm$core$Task$map, tagger, task));
	});
_Platform_effectManagers['Task'] = _Platform_createManager(elm$core$Task$init, elm$core$Task$onEffects, elm$core$Task$onSelfMsg, elm$core$Task$cmdMap);
var elm$core$Task$command = _Platform_leaf('Task');
var elm$core$Task$perform = F2(
	function (toMessage, task) {
		return elm$core$Task$command(
			elm$core$Task$Perform(
				A2(elm$core$Task$map, toMessage, task)));
	});
var elm$core$String$slice = _String_slice;
var elm$core$String$dropLeft = F2(
	function (n, string) {
		return (n < 1) ? string : A3(
			elm$core$String$slice,
			n,
			elm$core$String$length(string),
			string);
	});
var elm$core$String$startsWith = _String_startsWith;
var elm$url$Url$Http = {$: 'Http'};
var elm$url$Url$Https = {$: 'Https'};
var elm$core$String$indexes = _String_indexes;
var elm$core$String$isEmpty = function (string) {
	return string === '';
};
var elm$core$String$left = F2(
	function (n, string) {
		return (n < 1) ? '' : A3(elm$core$String$slice, 0, n, string);
	});
var elm$core$String$contains = _String_contains;
var elm$url$Url$Url = F6(
	function (protocol, host, port_, path, query, fragment) {
		return {fragment: fragment, host: host, path: path, port_: port_, protocol: protocol, query: query};
	});
var elm$url$Url$chompBeforePath = F5(
	function (protocol, path, params, frag, str) {
		if (elm$core$String$isEmpty(str) || A2(elm$core$String$contains, '@', str)) {
			return elm$core$Maybe$Nothing;
		} else {
			var _n0 = A2(elm$core$String$indexes, ':', str);
			if (!_n0.b) {
				return elm$core$Maybe$Just(
					A6(elm$url$Url$Url, protocol, str, elm$core$Maybe$Nothing, path, params, frag));
			} else {
				if (!_n0.b.b) {
					var i = _n0.a;
					var _n1 = elm$core$String$toInt(
						A2(elm$core$String$dropLeft, i + 1, str));
					if (_n1.$ === 'Nothing') {
						return elm$core$Maybe$Nothing;
					} else {
						var port_ = _n1;
						return elm$core$Maybe$Just(
							A6(
								elm$url$Url$Url,
								protocol,
								A2(elm$core$String$left, i, str),
								port_,
								path,
								params,
								frag));
					}
				} else {
					return elm$core$Maybe$Nothing;
				}
			}
		}
	});
var elm$url$Url$chompBeforeQuery = F4(
	function (protocol, params, frag, str) {
		if (elm$core$String$isEmpty(str)) {
			return elm$core$Maybe$Nothing;
		} else {
			var _n0 = A2(elm$core$String$indexes, '/', str);
			if (!_n0.b) {
				return A5(elm$url$Url$chompBeforePath, protocol, '/', params, frag, str);
			} else {
				var i = _n0.a;
				return A5(
					elm$url$Url$chompBeforePath,
					protocol,
					A2(elm$core$String$dropLeft, i, str),
					params,
					frag,
					A2(elm$core$String$left, i, str));
			}
		}
	});
var elm$url$Url$chompBeforeFragment = F3(
	function (protocol, frag, str) {
		if (elm$core$String$isEmpty(str)) {
			return elm$core$Maybe$Nothing;
		} else {
			var _n0 = A2(elm$core$String$indexes, '?', str);
			if (!_n0.b) {
				return A4(elm$url$Url$chompBeforeQuery, protocol, elm$core$Maybe$Nothing, frag, str);
			} else {
				var i = _n0.a;
				return A4(
					elm$url$Url$chompBeforeQuery,
					protocol,
					elm$core$Maybe$Just(
						A2(elm$core$String$dropLeft, i + 1, str)),
					frag,
					A2(elm$core$String$left, i, str));
			}
		}
	});
var elm$url$Url$chompAfterProtocol = F2(
	function (protocol, str) {
		if (elm$core$String$isEmpty(str)) {
			return elm$core$Maybe$Nothing;
		} else {
			var _n0 = A2(elm$core$String$indexes, '#', str);
			if (!_n0.b) {
				return A3(elm$url$Url$chompBeforeFragment, protocol, elm$core$Maybe$Nothing, str);
			} else {
				var i = _n0.a;
				return A3(
					elm$url$Url$chompBeforeFragment,
					protocol,
					elm$core$Maybe$Just(
						A2(elm$core$String$dropLeft, i + 1, str)),
					A2(elm$core$String$left, i, str));
			}
		}
	});
var elm$url$Url$fromString = function (str) {
	return A2(elm$core$String$startsWith, 'http://', str) ? A2(
		elm$url$Url$chompAfterProtocol,
		elm$url$Url$Http,
		A2(elm$core$String$dropLeft, 7, str)) : (A2(elm$core$String$startsWith, 'https://', str) ? A2(
		elm$url$Url$chompAfterProtocol,
		elm$url$Url$Https,
		A2(elm$core$String$dropLeft, 8, str)) : elm$core$Maybe$Nothing);
};
var elm$browser$Browser$element = _Browser_element;
var author$project$Main$main = elm$browser$Browser$element(
	{init: author$project$Main$init, subscriptions: author$project$Main$subscriptions, update: author$project$Main$update, view: author$project$Main$view});
_Platform_export({'Main':{'init':author$project$Main$main(elm$json$Json$Decode$value)(0)}});}(this));
},{}],"vKFU":[function(require,module,exports) {

},{}],"Focm":[function(require,module,exports) {
"use strict";

var _peerjs = _interopRequireDefault(require("peerjs"));

require("./DrawingCanvas");

var _Main = require("./Main.elm");

require("./index.css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var pictionaryTelephone = _Main.Elm.Main.init({
  node: document.querySelector('main'),
  flags: {
    url: location.origin + location.pathname,
    gameId: (location.search.match(/gameId=([^&]+)/) || [])[1]
  }
});

var peer = new _peerjs.default();
var connections = [];

function send(action, data) {
  connections.forEach(function (connection) {
    return connection.send({
      action: action,
      data: data
    });
  });
}

function addConnection(connection) {
  connection.on('open', function () {
    connections.push(connection);
  });
  connection.on('data', function (_ref) {
    var action = _ref.action,
        data = _ref.data;

    if (action === 'sendPlayer') {
      pictionaryTelephone.ports.setPlayer.send(data);
    } else if (action === 'sendThread') {
      pictionaryTelephone.ports.setThread.send(data);
    }
  });
  connection.on('close', function () {
    var index = connections.indexOf(connection);
    if (index !== -1) connections.splice(index, 1);
  });
}

peer.on('open', function (id) {
  pictionaryTelephone.ports.setPeerId.send(id);
});
pictionaryTelephone.ports.connectHost.subscribe(function (hostId) {
  var host = peer.connect(hostId);
  addConnection(host);
  host.once('open', function () {
    pictionaryTelephone.ports.setPeerId.send(peer.id);
  });
});
pictionaryTelephone.ports.sendPlayer.subscribe(function (_ref2) {
  var index = _ref2.index,
      host = _ref2.host,
      name = _ref2.name,
      peerId = _ref2.peerId;
  send('sendPlayer', {
    index: index,
    host: host,
    name: name,
    peerId: peerId
  });
});
pictionaryTelephone.ports.sendThread.subscribe(function (_ref3) {
  var id = _ref3.id,
      pairs = _ref3.pairs;
  send('sendThread', {
    id: id,
    pairs: pairs
  });
});
peer.on('connection', function (connection) {
  if (connection.peer === peer.id) return;
  addConnection(connection);
});
},{"peerjs":"r/WP","./DrawingCanvas":"dQwU","./Main.elm":"8asW","./index.css":"vKFU"}]},{},["Focm"], null)
//# sourceMappingURL=/PictionaryTelephone/PictionaryTelephone.a3c48990.js.map