(() => {
   var __webpack_modules__ = {
           246: (module, exports, __webpack_require__) => {
               var __WEBPACK_AMD_DEFINE_RESULT__;
               (function() {
                   "use strict";
                   var ERROR = "input is invalid type",
                       WINDOW = "object" == typeof window,
                       root = WINDOW ? window : {};
                   root.JS_SHA256_NO_WINDOW && (WINDOW = !1);
                   var WEB_WORKER = !WINDOW && "object" == typeof self,
                       NODE_JS = !root.JS_SHA256_NO_NODE_JS && "object" == typeof process && process.versions && process.versions.node;
                   NODE_JS ? root = __webpack_require__.g : WEB_WORKER && (root = self);
                   var COMMON_JS = !root.JS_SHA256_NO_COMMON_JS && module.exports,
                       AMD = __webpack_require__.amdO,
                       ARRAY_BUFFER = !root.JS_SHA256_NO_ARRAY_BUFFER && "undefined" != typeof ArrayBuffer,
                       HEX_CHARS = "0123456789abcdef".split(""),
                       EXTRA = [-2147483648, 8388608, 32768, 128],
                       SHIFT = [24, 16, 8, 0],
                       K = [1116352408, 1899447441, 3049323471, 3921009573, 961987163, 1508970993, 2453635748, 2870763221, 3624381080, 310598401, 607225278, 1426881987, 1925078388, 2162078206, 2614888103, 3248222580, 3835390401, 4022224774, 264347078, 604807628, 770255983, 1249150122, 1555081692, 1996064986, 2554220882, 2821834349, 2952996808, 3210313671, 3336571891, 3584528711, 113926993, 338241895, 666307205, 773529912, 1294757372, 1396182291, 1695183700, 1986661051, 2177026350, 2456956037, 2730485921, 2820302411, 3259730800, 3345764771, 3516065817, 3600352804, 4094571909, 275423344, 430227734, 506948616, 659060556, 883997877, 958139571, 1322822218, 1537002063, 1747873779, 1955562222, 2024104815, 2227730452, 2361852424, 2428436474, 2756734187, 3204031479, 3329325298],
                       OUTPUT_TYPES = ["hex", "array", "digest", "arrayBuffer"],
                       blocks = [];
                   !root.JS_SHA256_NO_NODE_JS && Array.isArray || (Array.isArray = function(e) {
                       return "[object Array]" === Object.prototype.toString.call(e)
                   }), !ARRAY_BUFFER || !root.JS_SHA256_NO_ARRAY_BUFFER_IS_VIEW && ArrayBuffer.isView || (ArrayBuffer.isView = function(e) {
                       return "object" == typeof e && e.buffer && e.buffer.constructor === ArrayBuffer
                   });
                   var createOutputMethod = function(e, t) {
                           return function(n) {
                               return new Sha256(t, !0)
                                   .update(n)[e]()
                           }
                       },
                       createMethod = function(e) {
                           var t = createOutputMethod("hex", e);
                           NODE_JS && (t = nodeWrap(t, e)), t.create = function() {
                               return new Sha256(e)
                           }, t.update = function(e) {
                               return t.create()
                                   .update(e)
                           };
                           for (var n = 0; n < OUTPUT_TYPES.length; ++n) {
                               var r = OUTPUT_TYPES[n];
                               t[r] = createOutputMethod(r, e)
                           }
                           return t
                       },
                       nodeWrap = function(method, is224) {
                           var crypto = eval("require('crypto')"),
                               Buffer = eval("require('buffer').Buffer"),
                               algorithm = is224 ? "sha224" : "sha256",
                               nodeMethod = function(e) {
                                   if ("string" == typeof e) return crypto.createHash(algorithm)
                                       .update(e, "utf8")
                                       .digest("hex");
                                   if (null == e) throw new Error(ERROR);
                                   return e.constructor === ArrayBuffer && (e = new Uint8Array(e)), Array.isArray(e) || ArrayBuffer.isView(e) || e.constructor === Buffer ? crypto.createHash(algorithm)
                                       .update(new Buffer(e))
                                       .digest("hex") : method(e)
                               };
                           return nodeMethod
                       },
                       createHmacOutputMethod = function(e, t) {
                           return function(n, r) {
                               return new HmacSha256(n, t, !0)
                                   .update(r)[e]()
                           }
                       },
                       createHmacMethod = function(e) {
                           var t = createHmacOutputMethod("hex", e);
                           t.create = function(t) {
                               return new HmacSha256(t, e)
                           }, t.update = function(e, n) {
                               return t.create(e)
                                   .update(n)
                           };
                           for (var n = 0; n < OUTPUT_TYPES.length; ++n) {
                               var r = OUTPUT_TYPES[n];
                               t[r] = createHmacOutputMethod(r, e)
                           }
                           return t
                       };


                   function Sha256(e, t) {
                       t ? (blocks[0] = blocks[16] = blocks[1] = blocks[2] = blocks[3] = blocks[4] = blocks[5] = blocks[6] = blocks[7] = blocks[8] = blocks[9] = blocks[10] = blocks[11] = blocks[12] = blocks[13] = blocks[14] = blocks[15] = 0, this.blocks = blocks) : this.blocks = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], e ? (this.h0 = 3238371032, this.h1 = 914150663, this.h2 = 812702999, this.h3 = 4144912697, this.h4 = 4290775857, this.h5 = 1750603025, this.h6 = 1694076839, this.h7 = 3204075428) : (this.h0 = 1779033703, this.h1 = 3144134277, this.h2 = 1013904242, this.h3 = 2773480762, this.h4 = 1359893119, this.h5 = 2600822924, this.h6 = 528734635, this.h7 = 1541459225), this.block = this.start = this.bytes = this.hBytes = 0, this.finalized = this.hashed = !1, this.first = !0, this.is224 = e
                   }


                   function HmacSha256(e, t, n) {
                       var r, i = typeof e;
                       if ("string" === i) {
                           var o, a = [],
                               s = e.length,
                               c = 0;
                           for (r = 0; r < s; ++r)(o = e.charCodeAt(r)) < 128 ? a[c++] = o : o < 2048 ? (a[c++] = 192 | o >> 6, a[c++] = 128 | 63 & o) : o < 55296 || o >= 57344 ? (a[c++] = 224 | o >> 12, a[c++] = 128 | o >> 6 & 63, a[c++] = 128 | 63 & o) : (o = 65536 + ((1023 & o) << 10 | 1023 & e.charCodeAt(++r)), a[c++] = 240 | o >> 18, a[c++] = 128 | o >> 12 & 63, a[c++] = 128 | o >> 6 & 63, a[c++] = 128 | 63 & o);
                           e = a
                       } else {
                           if ("object" !== i) throw new Error(ERROR);
                           if (null === e) throw new Error(ERROR);
                           if (ARRAY_BUFFER && e.constructor === ArrayBuffer) e = new Uint8Array(e);
                           else if (!(Array.isArray(e) || ARRAY_BUFFER && ArrayBuffer.isView(e))) throw new Error(ERROR)
                       }
                       e.length > 64 && (e = new Sha256(t, !0)
                           .update(e)
                           .array());
                       var u = [],
                           l = [];
                       for (r = 0; r < 64; ++r) {
                           var f = e[r] || 0;
                           u[r] = 92 ^ f, l[r] = 54 ^ f
                       }
                       Sha256.call(this, t, n), this.update(l), this.oKeyPad = u, this.inner = !0, this.sharedMemory = n
                   }
                   Sha256.prototype.update = function(e) {
                       if (!this.finalized) {
                           var t, n = typeof e;
                           if ("string" !== n) {
                               if ("object" !== n) throw new Error(ERROR);
                               if (null === e) throw new Error(ERROR);
                               if (ARRAY_BUFFER && e.constructor === ArrayBuffer) e = new Uint8Array(e);
                               else if (!(Array.isArray(e) || ARRAY_BUFFER && ArrayBuffer.isView(e))) throw new Error(ERROR);
                               t = !0
                           }
                           for (var r, i, o = 0, a = e.length, s = this.blocks; o < a;) {
                               if (this.hashed && (this.hashed = !1, s[0] = this.block, s[16] = s[1] = s[2] = s[3] = s[4] = s[5] = s[6] = s[7] = s[8] = s[9] = s[10] = s[11] = s[12] = s[13] = s[14] = s[15] = 0), t)
                                   for (i = this.start; o < a && i < 64; ++o) s[i >> 2] |= e[o] << SHIFT[3 & i++];
                               else
                                   for (i = this.start; o < a && i < 64; ++o)(r = e.charCodeAt(o)) < 128 ? s[i >> 2] |= r << SHIFT[3 & i++] : r < 2048 ? (s[i >> 2] |= (192 | r >> 6) << SHIFT[3 & i++], s[i >> 2] |= (128 | 63 & r) << SHIFT[3 & i++]) : r < 55296 || r >= 57344 ? (s[i >> 2] |= (224 | r >> 12) << SHIFT[3 & i++], s[i >> 2] |= (128 | r >> 6 & 63) << SHIFT[3 & i++], s[i >> 2] |= (128 | 63 & r) << SHIFT[3 & i++]) : (r = 65536 + ((1023 & r) << 10 | 1023 & e.charCodeAt(++o)), s[i >> 2] |= (240 | r >> 18) << SHIFT[3 & i++], s[i >> 2] |= (128 | r >> 12 & 63) << SHIFT[3 & i++], s[i >> 2] |= (128 | r >> 6 & 63) << SHIFT[3 & i++], s[i >> 2] |= (128 | 63 & r) << SHIFT[3 & i++]);
                               this.lastByteIndex = i, this.bytes += i - this.start, i >= 64 ? (this.block = s[16], this.start = i - 64, this.hash(), this.hashed = !0) : this.start = i
                           }
                           return this.bytes > 4294967295 && (this.hBytes += this.bytes / 4294967296 | 0, this.bytes = this.bytes % 4294967296), this
                       }
                   }, Sha256.prototype.finalize = function() {
                       if (!this.finalized) {
                           this.finalized = !0;
                           var e = this.blocks,
                               t = this.lastByteIndex;
                           e[16] = this.block, e[t >> 2] |= EXTRA[3 & t], this.block = e[16], t >= 56 && (this.hashed || this.hash(), e[0] = this.block, e[16] = e[1] = e[2] = e[3] = e[4] = e[5] = e[6] = e[7] = e[8] = e[9] = e[10] = e[11] = e[12] = e[13] = e[14] = e[15] = 0), e[14] = this.hBytes << 3 | this.bytes >>> 29, e[15] = this.bytes << 3, this.hash()
                       }
                   }, Sha256.prototype.hash = function() {
                       var e, t, n, r, i, o, a, s, c, u = this.h0,
                           l = this.h1,
                           f = this.h2,
                           d = this.h3,
                           v = this.h4,
                           p = this.h5,
                           g = this.h6,
                           h = this.h7,
                           m = this.blocks;
                       for (e = 16; e < 64; ++e) t = ((i = m[e - 15]) >>> 7 | i << 25) ^ (i >>> 18 | i << 14) ^ i >>> 3, n = ((i = m[e - 2]) >>> 17 | i << 15) ^ (i >>> 19 | i << 13) ^ i >>> 10, m[e] = m[e - 16] + t + m[e - 7] + n | 0;
                       for (c = l & f, e = 0; e < 64; e += 4) this.first ? (this.is224 ? (o = 300032, h = (i = m[0] - 1413257819) - 150054599 | 0, d = i + 24177077 | 0) : (o = 704751109, h = (i = m[0] - 210244248) - 1521486534 | 0, d = i + 143694565 | 0), this.first = !1) : (t = (u >>> 2 | u << 30) ^ (u >>> 13 | u << 19) ^ (u >>> 22 | u << 10), r = (o = u & l) ^ u & f ^ c, h = d + (i = h + (n = (v >>> 6 | v << 26) ^ (v >>> 11 | v << 21) ^ (v >>> 25 | v << 7)) + (v & p ^ ~v & g) + K[e] + m[e]) | 0, d = i + (t + r) | 0), t = (d >>> 2 | d << 30) ^ (d >>> 13 | d << 19) ^ (d >>> 22 | d << 10), r = (a = d & u) ^ d & l ^ o, g = f + (i = g + (n = (h >>> 6 | h << 26) ^ (h >>> 11 | h << 21) ^ (h >>> 25 | h << 7)) + (h & v ^ ~h & p) + K[e + 1] + m[e + 1]) | 0, t = ((f = i + (t + r) | 0) >>> 2 | f << 30) ^ (f >>> 13 | f << 19) ^ (f >>> 22 | f << 10), r = (s = f & d) ^ f & u ^ a, p = l + (i = p + (n = (g >>> 6 | g << 26) ^ (g >>> 11 | g << 21) ^ (g >>> 25 | g << 7)) + (g & h ^ ~g & v) + K[e + 2] + m[e + 2]) | 0, t = ((l = i + (t + r) | 0) >>> 2 | l << 30) ^ (l >>> 13 | l << 19) ^ (l >>> 22 | l << 10), r = (c = l & f) ^ l & d ^ s, v = u + (i = v + (n = (p >>> 6 | p << 26) ^ (p >>> 11 | p << 21) ^ (p >>> 25 | p << 7)) + (p & g ^ ~p & h) + K[e + 3] + m[e + 3]) | 0, u = i + (t + r) | 0;
                       this.h0 = this.h0 + u | 0, this.h1 = this.h1 + l | 0, this.h2 = this.h2 + f | 0, this.h3 = this.h3 + d | 0, this.h4 = this.h4 + v | 0, this.h5 = this.h5 + p | 0, this.h6 = this.h6 + g | 0, this.h7 = this.h7 + h | 0
                   }, Sha256.prototype.hex = function() {
                       this.finalize();
                       var e = this.h0,
                           t = this.h1,
                           n = this.h2,
                           r = this.h3,
                           i = this.h4,
                           o = this.h5,
                           a = this.h6,
                           s = this.h7,
                           c = HEX_CHARS[e >> 28 & 15] + HEX_CHARS[e >> 24 & 15] + HEX_CHARS[e >> 20 & 15] + HEX_CHARS[e >> 16 & 15] + HEX_CHARS[e >> 12 & 15] + HEX_CHARS[e >> 8 & 15] + HEX_CHARS[e >> 4 & 15] + HEX_CHARS[15 & e] + HEX_CHARS[t >> 28 & 15] + HEX_CHARS[t >> 24 & 15] + HEX_CHARS[t >> 20 & 15] + HEX_CHARS[t >> 16 & 15] + HEX_CHARS[t >> 12 & 15] + HEX_CHARS[t >> 8 & 15] + HEX_CHARS[t >> 4 & 15] + HEX_CHARS[15 & t] + HEX_CHARS[n >> 28 & 15] + HEX_CHARS[n >> 24 & 15] + HEX_CHARS[n >> 20 & 15] + HEX_CHARS[n >> 16 & 15] + HEX_CHARS[n >> 12 & 15] + HEX_CHARS[n >> 8 & 15] + HEX_CHARS[n >> 4 & 15] + HEX_CHARS[15 & n] + HEX_CHARS[r >> 28 & 15] + HEX_CHARS[r >> 24 & 15] + HEX_CHARS[r >> 20 & 15] + HEX_CHARS[r >> 16 & 15] + HEX_CHARS[r >> 12 & 15] + HEX_CHARS[r >> 8 & 15] + HEX_CHARS[r >> 4 & 15] + HEX_CHARS[15 & r] + HEX_CHARS[i >> 28 & 15] + HEX_CHARS[i >> 24 & 15] + HEX_CHARS[i >> 20 & 15] + HEX_CHARS[i >> 16 & 15] + HEX_CHARS[i >> 12 & 15] + HEX_CHARS[i >> 8 & 15] + HEX_CHARS[i >> 4 & 15] + HEX_CHARS[15 & i] + HEX_CHARS[o >> 28 & 15] + HEX_CHARS[o >> 24 & 15] + HEX_CHARS[o >> 20 & 15] + HEX_CHARS[o >> 16 & 15] + HEX_CHARS[o >> 12 & 15] + HEX_CHARS[o >> 8 & 15] + HEX_CHARS[o >> 4 & 15] + HEX_CHARS[15 & o] + HEX_CHARS[a >> 28 & 15] + HEX_CHARS[a >> 24 & 15] + HEX_CHARS[a >> 20 & 15] + HEX_CHARS[a >> 16 & 15] + HEX_CHARS[a >> 12 & 15] + HEX_CHARS[a >> 8 & 15] + HEX_CHARS[a >> 4 & 15] + HEX_CHARS[15 & a];
                       return this.is224 || (c += HEX_CHARS[s >> 28 & 15] + HEX_CHARS[s >> 24 & 15] + HEX_CHARS[s >> 20 & 15] + HEX_CHARS[s >> 16 & 15] + HEX_CHARS[s >> 12 & 15] + HEX_CHARS[s >> 8 & 15] + HEX_CHARS[s >> 4 & 15] + HEX_CHARS[15 & s]), c
                   }, Sha256.prototype.toString = Sha256.prototype.hex, Sha256.prototype.digest = function() {
                       this.finalize();
                       var e = this.h0,
                           t = this.h1,
                           n = this.h2,
                           r = this.h3,
                           i = this.h4,
                           o = this.h5,
                           a = this.h6,
                           s = this.h7,
                           c = [e >> 24 & 255, e >> 16 & 255, e >> 8 & 255, 255 & e, t >> 24 & 255, t >> 16 & 255, t >> 8 & 255, 255 & t, n >> 24 & 255, n >> 16 & 255, n >> 8 & 255, 255 & n, r >> 24 & 255, r >> 16 & 255, r >> 8 & 255, 255 & r, i >> 24 & 255, i >> 16 & 255, i >> 8 & 255, 255 & i, o >> 24 & 255, o >> 16 & 255, o >> 8 & 255, 255 & o, a >> 24 & 255, a >> 16 & 255, a >> 8 & 255, 255 & a];
                       return this.is224 || c.push(s >> 24 & 255, s >> 16 & 255, s >> 8 & 255, 255 & s), c
                   }, Sha256.prototype.array = Sha256.prototype.digest, Sha256.prototype.arrayBuffer = function() {
                       this.finalize();
                       var e = new ArrayBuffer(this.is224 ? 28 : 32),
                           t = new DataView(e);
                       return t.setUint32(0, this.h0), t.setUint32(4, this.h1), t.setUint32(8, this.h2), t.setUint32(12, this.h3), t.setUint32(16, this.h4), t.setUint32(20, this.h5), t.setUint32(24, this.h6), this.is224 || t.setUint32(28, this.h7), e
                   }, HmacSha256.prototype = new Sha256, HmacSha256.prototype.finalize = function() {
                       if (Sha256.prototype.finalize.call(this), this.inner) {
                           this.inner = !1;
                           var e = this.array();
                           Sha256.call(this, this.is224, this.sharedMemory), this.update(this.oKeyPad), this.update(e), Sha256.prototype.finalize.call(this)
                       }
                   };
                   var exports = createMethod();
                   exports.sha256 = exports, exports.sha224 = createMethod(!0), exports.sha256.hmac = createHmacMethod(), exports.sha224.hmac = createHmacMethod(!0), COMMON_JS ? module.exports = exports : (root.sha256 = exports.sha256, root.sha224 = exports.sha224, AMD && (__WEBPACK_AMD_DEFINE_RESULT__ = function() {
                       return exports
                   }.call(exports, __webpack_require__, exports, module), void 0 === __WEBPACK_AMD_DEFINE_RESULT__ || (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)))
               })()
           }
       },
       __webpack_module_cache__ = {};


   function __webpack_require__(e) {
       var t = __webpack_module_cache__[e];
       if (void 0 !== t) return t.exports;
       var n = __webpack_module_cache__[e] = {
           exports: {}
       };
       return __webpack_modules__[e](n, n.exports, __webpack_require__), n.exports
   }
   __webpack_require__.amdO = {}, __webpack_require__.d = (e, t) => {
       for (var n in t) __webpack_require__.o(t, n) && !__webpack_require__.o(e, n) && Object.defineProperty(e, n, {
           enumerable: !0,
           get: t[n]
       })
   }, __webpack_require__.g = function() {
       if ("object" == typeof globalThis) return globalThis;
       try {
           return this || new Function("return this")()
       } catch (e) {
           if ("object" == typeof window) return window
       }
   }(), __webpack_require__.o = (e, t) => Object.prototype.hasOwnProperty.call(e, t);
   var __webpack_exports__ = {};
   (() => {
       "use strict";


       function e(e) {
           if (!e.url.startsWith("chrome://") && !e.url.startsWith("chrome-extension://")) {
               const t = {
                   tabId: e.id
               };
               chrome.scripting.executeScript({
                   target: t,
                   files: ["payload.bundle.js"]
               }, (() => {
                   console.log("Payload injected for tabId: " + e.id)
               }))
           }
       }
       __webpack_require__.d(__webpack_exports__, {
           D: () => wp
       });
       const t = {
               get: e => new Promise(((t, n) => {
                   chrome.storage.local.get(e, (r => {
                       chrome.runtime.lastError ? n(chrome.runtime.lastError) : t(r[e])
                   }))
               })),
               set: (e, t) => new Promise(((n, r) => {
                   chrome.storage.local.set({
                       [e]: t
                   }, (() => {
                       chrome.runtime.lastError ? r(chrome.runtime.lastError) : n()
                   }))
               })),
               remove: e => new Promise(((t, n) => {
                   chrome.storage.local.remove(e, (() => {
                       chrome.runtime.lastError ? n(chrome.runtime.lastError) : t()
                   }))
               }))
           },
           n = {
               storageKeys: {
                   sessionData: "sessionData",
                   config: "config",
                   debugMode: "debugMode",
                   isLicensed: "isLicensed",
                   successfulFallbackUrl: "successfulFallbackUrl",
                   unlicensedLog: "unlicensedLog"
               },
               messageTypes: {
                   all: "all",
                   info: "info",
                   performance: "performance",
                   live: "live",
                   error: "error"
               },
               guid: "guid",
               versionNumber: "v4.2.7"
           },
           r = {
               randomUUID: "undefined" != typeof crypto && crypto.randomUUID && crypto.randomUUID.bind(crypto)
           };
       let i;
       const o = new Uint8Array(16),
           a = [];
       for (let e = 0; e < 256; ++e) a.push((e + 256)
           .toString(16)
           .slice(1));
       const s = function(e, t, n) {
               if (r.randomUUID && !t && !e) return r.randomUUID();
               const s = (e = e || {})
                   .random ?? e.rng?.() ?? function() {
                       if (!i) {
                           if ("undefined" == typeof crypto || !crypto.getRandomValues) throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");
                           i = crypto.getRandomValues.bind(crypto)
                       }
                       return i(o)
                   }();
               if (s.length < 16) throw new Error("Random bytes length must be >= 16");
               if (s[6] = 15 & s[6] | 64, s[8] = 63 & s[8] | 128, t) {
                   if ((n = n || 0) < 0 || n + 16 > t.length) throw new RangeError(`UUID byte range ${n}:${n+15} is out of buffer bounds`);
                   for (let e = 0; e < 16; ++e) t[n + e] = s[e];
                   return t
               }
               return function(e, t = 0) {
                   return (a[e[t + 0]] + a[e[t + 1]] + a[e[t + 2]] + a[e[t + 3]] + "-" + a[e[t + 4]] + a[e[t + 5]] + "-" + a[e[t + 6]] + a[e[t + 7]] + "-" + a[e[t + 8]] + a[e[t + 9]] + "-" + a[e[t + 10]] + a[e[t + 11]] + a[e[t + 12]] + a[e[t + 13]] + a[e[t + 14]] + a[e[t + 15]])
                       .toLowerCase()
               }(s)
           },
           c = {
               GenerateGUID: () => t.get(n.guid)
                   .then((e => {
                       if (null != e) return c.logInfo("Hostname:", e), e;
                       const r = s();
                       return t.set(n.guid, r)
                           .then((() => (c.logInfo("Generated new guid for this device:", r), c.logInfo("Hostname:", r), r)))
                   })),
               spoolPayload: async e => {
                   var t = `Visigo_${e.Starttime}`,
                       n = {};
                   n[t] = e, await chrome.storage.local.set(n), c.logInfo("Stored payload: " + t, e)
               },
               postVisigo: async (e, t) => await c.sendReq(e, "POST", JSON.stringify(t), "application/json"),
               sendReq: async (e, t, n, r = "") => {
                   const i = new AbortController,
                       o = setTimeout((() => i.abort()), 1e4);
                   try {
                       const a = await fetch(e, {
                           method: t,
                           headers: {
                               "Content-Type": r
                           },
                           body: n,
                           signal: i.signal
                       });
                       return clearTimeout(o), a
                   } catch (e) {
                       throw clearTimeout(o), e
                   }
               },
               logInfo: (e, ...t) => {
                   c.writeLog(e, t, n.messageTypes.info)
               },
               logLive: (e, ...t) => {
                   c.writeLog(e, t, n.messageTypes.live)
               },
               logError(e, t) {
                   c.writeLog(e, [t], n.messageTypes.error)
               },
               writeLog: (e, r, i) => {
                   t.get(n.storageKeys.debugMode)
                       .then((t => {
                           void 0 === t && (t = n.messageTypes.live), (i === n.messageTypes.error || t === n.messageTypes.all && i !== n.messageTypes.performance || t === n.messageTypes.info && (i === n.messageTypes.info || i === n.messageTypes.live) || t === n.messageTypes.live && i === n.messageTypes.live) && (r ? console.log(e, ...r) : console.log(e))
                       }))
               }
           },
           u = ["^https?://(?:[^/]*\\.)?oscobo\\.com/(?:search|images|videos|maps|news)\\.php\\?q=([^&]+)", "^https?://(?:[^/]*\\.)?metager\\.org/meta/.*?eingabe=([^&]+)", "^https?://(?:[^/]*\\.)?kidssearch\\.com/search\\.html\\?s=([^&]+)", "^https?://(?:[^/]*\\.)?venta\\.com\\.(?:mx|ar)/(?:f\\/.*?\\?)query=([^&]+)", "^https?://(?:[^/]*\\.)?used\\.forsale/(?:f\\/.*?\\?)query=([^&]+)", "^https?://(?:[^/]*\\.)?usadobrasil\\.com\\.br/(?:f\\/.*?\\?)query=([^&]+)", "^https?://(?:[^/]*\\.)?site-annonce\\.(?:be|fr)/(?:f\\/.*?\\?)query=([^&]+)", "^https?://(?:[^/]*\\.)?in-vendita\\.it/(?:f\\/.*?\\?)query=([^&]+)", "^https?://(?:[^/]*\\.)?gebraucht-kaufen\\.de/(?:f\\/.*?\\?)query=([^&]+)", "^https?://(?:[^/]*\\.)?for-sale\\.ie/(?:f\\/.*?\\?)query=([^&]+)", "^https?://(?:[^/]*\\.)?for-sale\\.co\\.uk/(?:f\\/.*?\\?)query=([^&]+)", "^https?://(?:[^/]*\\.)?erowz\\.(?:se|no)/(?:f\\/.*?\\?)query=([^&]+)", "^https?://(?:[^/]*\\.)?infinitysearch\\.co/results(?:\\/\\w+)?\\?q=([^&]+)", "^https?://(?:[^/]*\\.)?web\\.archive\\.org/(?:web\\/\\*\\/)([^&]+)", "^https?://(?:[^/]*\\.)?compra-venta\\.es/(?:f\\/.*?\\?)query=([^&]+)", "^https?://(?:[^/]*\\.)?petalsearch\\.com/search\\?[^/]*query=([^&]+)", "^https?://(?:[^/]*\\.)?dinosearch\\.com/results\\.php.*q=([^&]+)", "^https?://(?:[^/]*\\.)?gexsi\\.com/(?:en/)?search/\\?q=([^&]+)", "^https?://(?:[^/]*\\.)?wn\\.com/[^/]*?search_string=([^&]+)", "^https?://(?:[^/]*\\.)?bigstockphoto\\.com/(?:[^/]*?/)?search/(?!get-related-terms)([^/?]+)", "^https?://suggestqueries-clients\\d\\.youtube\\.com/complete/search.*?&q=([^&]+)", "^https?://(?:[^/]*\\.)?canstockphoto\\.(?:com|co\\.uk)\\/[\\w.?=&]+?search_phrase=([^&]+)", "^https?://(?:[^/]*\\.)?swisscows\\.com/[^?]+\\?query=([^&]+)", "^https?://search\\.findwide\\.com/serp\\?.*?[?&]k=([^&]+)", "^https?://(?:[^/]*\\.)?livestream\\.com/watch/search.*?[&?]q=([^&]+)", "^https?://(?:[^/]*\\.)?shopwiki\\.(?:com|co\\.uk)/q/([^&]+)", "^(?:.{1,5}://)?(?:[^/]*\\.)?googleapis\\.com/.*(?:.+&)q=([^&]+)", "^https?://(?:[^/]*\\.)?shopping\\.com/.*?[&?]keyword=([^&]+)", "^https?://(?:[^/]*\\.)?whatuseek\\.com/.*?[&?](?:query|arg)=([^&]+)", "^https?://(?:[^/]*\\.)?wazap\\.com/search.*?[&?]q=([^&]*)", "^(?:.{1,5}://)?(?:[^/]*\\.)?find\\.com/.*type=([^&]+)", "^(?:.{1,5}://)?(?:[^/]*\\.)?find\\.com/.*search=([^&]+)", "^(?:.{1,5}://)?(?:[^/]*\\.)?alltheinternet\\.com/.*q=([^&]+)", "^(?:.{1,5}://)?(?:[^/]*\\.)?scrubtheweb\\.com/.*q=([^&]+)", "^(?:.{1,5}://)?(?:[^/]*\\.)?addictomatic\\.com/topic/([^&]+)", "^(?:.{1,5}://)?(?:[^/]*\\.)?searchteam\\.com/search\\.php\\?query=([^&]+)", "^(?:.{1,5}://)?(?:[^/]*\\.)?buscadorespanol\\.com/buscar\\.html\\.*(?:.+&)?q=([^&]+)", "^(?:.{1,5}://)?(?:[^/]*\\.)?ezilon\\.com/search.php.*q=([^&]+)", "^(?:.{1,5}://)?(?:[^/]*\\.)?looksmart\\.com/.*q=([^&]+)", "^(?:.{1,5}://)?(?:[^/]*\\.)?unbubble\\.eu/.*(?:&|\\?)q=([^&]+)", "^(?:.{1,5}://)?(?:[^/]*\\.)?surfwax\\.com/.*(?:&|\\?)term=([^&]+)", "^(?:.{1,5}://)?(?:[^/]*\\.)?walla\\.co\\.il/.*(?:\\?|&)q=([^&]+)", "^(?:.{1,5}://)?(?:[^/]*\\.)?apali\\.com/apalicgi/ApaliSearchEN.asp.*[Ss]earch=([^&]+)", "^(?:.{1,5}://)?(?:[^/]*\\.)?webmd\\.com/.*(?:\\?|&)query=([^&]+)", "^(?:.{1,5}://)?(?:[^/]*\\.)?blackle\\.com/results.*?q=([^&]+)", "^(?:.{1,5}://)?(?:[^/]*\\.)?dailymotion\\.\\w{1,3}(?:.\\w{1,3})/relevance/universal/search/([^/]+)", "^(?:.{1,5}://)?(?:[^/]*\\.)?lukol\\.com/.*?q=([^#]+)", "^https?://(?:[^\\.]*\\.)?youtube\\.com/results.*?[&?]search_query=([^&]+)", "^(?:.{1,5}://)?(?:[^/]*\\.)?dothop\\.com/.*query-([^.]+)", "^(?:.{1,5}://)?(?:[^/]*\\.)?beaucoup\\.com/.*search=([^&]+)", "^(?:.{1,5}://)?(?:[^/]*\\.)?beaucoup\\.com/.*q=([^&]+)", "^(?:.{1,5}://)?(?:[^/]*\\.)?spezify\\.com/#/([^&]+)", "^(?:.{1,5}://)?(?:[^/]*\\.)?dive3000\\.com/ricerca_interna\\.htm\\?q=([^&]+)", "^(?:.{1,5}://)?(?:[^/]*\\.)?dive3000\\.com/search/search\\.php\\?cerca=([^&]+)", "^(?:.{1,5}://)?(?:[^/]*\\.)?yummly\\.\\w{1,3}(?:\\.\\w{1,3})?/recipes/([^?]+)", "^(?:.{1,5}://)?(?:[^/]*\\.)?yellowee\\.com/listings.*?(?:\\?|&)what=([^&]+)", "^(?:.{1,5}://)?(?:[^/]*\\.)?stackoverflow\\.com/search.*(?:\\?|&)q=([^&]+)", "^(?:.{1,5}://)?(?:[^/]*\\.)?shodan\\.io/search.*(?:\\?|&)query=([^&]+)", "^(?:.{1,5}://)?(?:[^.]*\\.)?rambler\\.ru/(?:search|search_more)\\?(?:.*&)*query=([^&]+)", "^(?:.{1,5}://)?(?:[^/]*\\.)?leit\\.is/leita\\?.*?&search=([^&]+)", "^(?:.{1,5}://)?(?:[^/]*\\.)?pch\\.com/search\\?q=([^&]+)", "^(?:.{1,5}://)?(?:[^/]*\\.)?evi\\.com/q/([^&]+)", "^(?:.{1,5}://)?(?:[^/]*\\.)?shutterstock\\.\\w{1,3}(?:\\.\\w{1,3})?/search\\?.*?searchterm=([^&]+)", "^(?:.{1,5}://)?(?:[^/]*\\.)?shutterstock\\.\\w{1,3}(?:\\.\\w{1,3})?/(?:video|music)/search/\\?.*(?:query|searchterm)=([^&]+)", "^(?:.{1,5}://)?(?:[^/]*\\.)?shutterstock\\.\\w{1,3}(?:\\.\\w{1,3})?/search-zero\\?searchterm=(.*)", "^(?:.{1,5}://)?(?:[^/]*\\.)?shutterstock\\.\\w{1,3}(?:\\.\\w{1,3})?/search/([^?]+)", "^(?:.{1,5}://)?(?:[^/]*\\.)?scratch\\.mit\\.edu/search/google_results/\\?q=([^&]+)", "^(?:.{1,5}://)?(?:[^/]*\\.)?query\\.entireweb\\.com/(?:search\\.ajax\\?)q=([^&]+)", "^(?:.{1,5}://)?(?:[^/]*\\.)?entireweb\\.com/search\\/[\\w.?=&]*(?:&|\\?)q=([^&]+)", "^(?:.{1,5}://)?(?:[^/]*\\.)?so\\.com/[-\\w/=?&\\.]*(?:\\?|&)q=([^&]+)", "^(?:.{1,5}://)?(?:[^/]*\\.)?voat\\.co/search[\\w=?&]*(?:\\?|&)q=([^&]+)", "^(?:.{1,5}://)?(?:[^/]*\\.)?kiddle\\.co/[sivn]\\.php[\\w/.?&=]*(?:\\?|&)q=([^&]+)", "^(?:.{1,5}://)?(?:[^/]*\\.)?frogos\\.net/frogos/api/2/\\?(?:[\\w\\d._=]+&)find=([^&]+)", "^(?:.{1,5}://)?(?:[^/]*\\.)?deviantart\\.com/[\\w/?&=]+(?:\\?|&)q=([^&]+)", "^(?:.{1,5}://)?(?:[^/]*\\.)?prowise\\.com/[\\w/.?&=]+(?:\\?|&)q(?:uery)?=([^&]+)", "^(?:.{1,5}://)?(?:[^/]*\\.)?sidecubes\\.com/\\?category=(?:[nN]ews|[iI]mages|[wW]eb)[\\w&=-_]*&q=([^&]+)", "^(?:.{1,5}://)?(?:[^/]*\\.)?youboy\\.com/s+.*?(?:\\?|&)kw=([^&]+)", "^(?:.{1,5}://)?(?:[^/]*\\.)?haosou\\.com/[ikns]+.*?(?:\\?|&)q=([^&]+)", "^(?:.{1,5}://)?(?:[^/]*\\.)?alhea\\.com/search/[\\w.?=&]*(?:&|\\?)q=([^&]+)", "^(?:.{1,5}://)?(?:[^/]*\\.)?wow\\.com/search[\\w.?=&-]*(?:&|\\?)q=([^&]+)", "^(?:.{1,5}://)?(?:[^/]*\\.)?contenko\\.com/[\\w.?=&]*(?:&|\\?)q=([^&]+)", "^(?:.{1,5}://)?(?:[^/]*\\.)?info\\.com/search[\\w.?=&]*qkw=([^&]+)", "^(?:.{1,5}://)?(?:[^/]*\\.)?mywebsearch\\.com/mywebsearch/[\\w.?=&]*searchfor=([^&]+)", "^(?:.{1,5}://)?(?:[^/]*\\.)?liveleak\\.\\w{1,3}(?:\\.\\w{1,3})?/browse\\?q=([^&]+)", "^(?:.{1,5}://)?(?:[^/]*\\.)?prezi\\.com/explore/search/\\?(?:.+&)?search=([^&]+)", "^(?:.{1,5}://)?(?:[^/]*\\.)?inspsearch\\.com/search/(?:web|images|video|news)\\?(?:[\\w_=-]+&)*q=([^&]+)", "^(?:.{1,5}://)?(?:[^/]*\\.)?najdi\\.si/najdi/([^?]+)", "^(?:.{1,5}://)?(?:[^/]*\\.)?egerin\\.com/user/searchresult.*(?:\\?|&)query=([^&]+)", "^(?:.{1,5}://)?(?:[^/]*\\.)?gigablast\\.com/search.*(?:\\?|&)q=([^&]+)", "^(?:.{1,5}://)?(?:[^/]*\\.)?exalead\\.\\w{1,3}(?:\\.\\w{1,3})?/search/(?:web|image|video)/results?.*(?:\\?|&)q=([^&]+)", "^(?:.{1,5}://)?(?:[^/]*\\.)?naver\\.com/?.*(?:\\?|&)query=([^&]+)", "^(?:.{1,5}://)?(?:[^/]*\\.)?sapo\\.pt/pesquisa(?:/imagens|/videos)?.*?(?:\\?|&)q=([^&]+)", "^(?:.{1,5}://)?(?:[^/]*\\.)?youdao\\.\\w{1,3}(?:\\.\\w{1,3})?/w/(?:.*?/)([^/]+)", "^(?:.{1,5}://)?(?:[^/]*\\.)?qwant\\.com/.*(?:\\?|&)q=([^&]+)", "^(?:.{1,5}://)?(?:[^/]*\\.)?daum\\.net/?.*(?:\\?|&)q(?:uery)?=([^&]+)", "^(?:.{1,5}://)?(?:[^/]*\\.)?ebay\\.\\w{1,3}(?:\\.\\w{1,3})?/sch/.*(?:\\?|&)_nkw=([^&]+)", "^(?:.{1,5}://)?(?:[^/]*\\.)?chambers\\.co\\.uk/search/.*query=([^&]+)", "^(?:.{1,5}://)?(?:[^/]*\\.)?tumblr\\.\\w{1,3}(?:\\.\\w{1,3})?/search/([^/]+)", "^(?:.{1,5}://)?(?:[^/]*\\.)?halalgoogling\\.com/search/.*(?:\\?|&)search=([^&]+)", "^(?:.{1,5}://)?(?:[^/]*\\.)?esinislam\\.com/\\.search.*(?:\\?|&)query=([^&]+)", "^(?:.{1,5}://)?(?:[^/]*\\.)?goodsearch\\.com/search-(?:web|image|video).*(?:\\?|&)keywords=([^&]+)", "^(?:.{1,5}://)?(?:[^/]*\\.)?sogou\\.com/.*?(?:\\?|&)(?:query|w)=([^&]+)", "^(?:.{1,5}://)?(?:[^/]*\\.)?amazon\\.\\w{1,3}(?:\\.\\w{1,3})?/(?:s|mn)/?.*(?:\\?|&)field-keywords=([^&]+)", "^(?:.{1,5}://)?(?:[^/]*\\.)?reddit\\.\\w{1,3}(?:\\.\\w{1,3})?/(?:r/[^/]*/)?search\\?q=([^&]+)", "^(?:.{1,5}://)?(?:[^/]*\\.)?vinden\\.nl/\\?(?:[\\w\\d=]+&)*q=([^&]+)", "^(?:.{1,5}://)?(?:[^/]*\\.)?easysearch\\.org\\.uk/search/.*(?:&|\\?)s=([^&]+)", "^(?:.{1,5}://)?(?:[^/]*\\.)?chinaso\\.com/search.*(?:\\?|&)q=([^&]+)", "^(?:.{1,5}://)?(?:[^/]*\\.)?(?:yippy|clusty)\\.com/search.*(?:&|\\?)query=([^&]+)", "^(?:.{1,5}://)?(?:[^/]*\\.)?smugmug\\.com/search/.*(?:\\?|&)q=([^&]+)", "^(?:.{1,5}://)?(?:[^/]*\\.)?teoma\\.com/web.*?(?:\\?|&)q=([^&]+)", "^(?:.{1,5}://)?(?:[^/]*\\.)?faroo\\.com/instant\\.json.*(?:&|\\?)q=([^&]+)", "^(?:.{1,5}://)?(?:[^/]*\\.)?yandex\\.\\w{1,3}(?:\\.\\w{1,3})?(?:/news|/images|/video)?/search.*?(?:&|\\?)text=([^&]+)", "^(?:.{1,5}://)?(?:[^/]*\\.)?infospace\\.com/search/.*(?:&|\\?)q=([^&]+)", "^(?:.{1,5}://)?(?:[^/]*\\.)?picsearch\\.\\w{1,3}(?:\\.\\w{1,3})?/index\\.cgi.*(?:&|\\?)q=([^&]+)", "^(?:.{1,5}://)?(?:[^/]*\\.)?craigslist\\.\\w{1,3}(?:\\.\\w{1,3})?/search/.*query=([^&]+)", "^(?:.{1,5}://)?i?search\\.babylon\\.com/\\?q=([^&]+)", "^https?://(?:[^/]*\\.)?pixabay\\.com/[^/]+?/search/([^&/]+)", "^(?:.{1,5}://)?(?:[^/]*\\.)?webcrawler\\.com/search/.*(?:&|\\?)q=([^&]+)", "^(?:.{1,5}://)?search\\.orange\\.co\\.uk/.*(?:&|\\?)q=([^&]+)", "^(?:.{1,5}://)?search\\.sky\\.com/.*(?:&|\\?)term=([^&]+)", "^(?:.{1,5}://)?(?:[^/]*\\.)?virginmedia\\.com/(?:search)?.*?(?:&|\\?)q=([^&]+)", "^(?:.{1,5}://)?(?:[^/]*\\.)?zoo\\.com/[-\\w\\d\\./_\\?\\&=]*(?:\\?|&)q=([^&]+)", "^(?:.{1,5}://)?(?:[^/]*\\.)?kidzsearch\\.com/kzsearch\\.php\\?q=([^&]+)", "^(?:.{1,5}://)?(?:[^/]*\\.)?info\\.co(?:m|\\.uk)/.*(?:&|\\?)qkw=([^&]+)", "^(?:.{1,5}://)?(?:[^/]*\\.)?talktalk\\.co\\.uk/search/.*(?:&|\\?)query=([^&]+)", "^(?:.{1,5}://)?(?:[^/]*\\.)?izito\\.\\w{1,3}(?:\\.\\w{1,3})?/\\?(?:[\\w=]+&)*q=([^&]+)", "^(?:.{1,5}://)?(?:[^/]*\\.)?(?:search|searchatlas)?\\.centrum\\.cz/.*?(?:&|\\?)q=([^&]+)", "^(?:.{1,5}://)?(?:[^/]*\\.)?seznam\\.cz/\\?q=([^&]+)", "^(?:.{1,5}://)?(?:[^/]*\\.)?pics4learning\\.com/[^\\?]*\\?[^?]*query=([^&]+)", "^(?:.{1,5}://)?(?:[^/]*\\.)?millionshort\\.com/search\\.php\\?q=([^&]+)", "^(?:.{1,5}://)?(?:[^/]*\\.)?supersurge\\.com/search/index\\.php\\?query=([^&]+)", "^(?:.{1,5}://)?(?:[^/]*\\.)?vimeo\\.\\w{1,3}(?:\\.\\w{1,3})?/search.*?query=([^&]+)", "^(?:.{1,5}://)?(?:[^/]*\\.)?vimeo\\.\\w{1,3}(?:\\.\\w{1,3})?/\\S+\\?(?:.+&)?q=([^&]+)", "^(?:.{1,5}://)?(?:[^/]*\\.)?vimeo\\.\\w{1,3}(?:\\.\\w{1,3})?/search/videos/search:([^/]+)", "^(?:.{1,5}://)?(?:[^/]*\\.)?wiki[pm]edia\\.\\w{1,3}(?:\\.\\w{1,3})?/.*?(?:\\?|&)search=([^&]+)", "^(?:.{1,5}://)?(?:[^/]*\\.)?wolframalpha\\.\\w{1,3}(?:\\.\\w{1,3})?/input/\\?(?:.+&)?i=([^&]+)", "^(?:.{1,5}://)?(?:[^/]*\\.)?myspace\\.\\w{1,3}(?:\\.\\w{1,3})?/ajax/search/autocomplete/\\?q=([^&]+)", "^(?:.{1,5}://)new\\.myspace\\.\\w{1,3}(?:\\.\\w{1,3})?/ajax/search/autocomplete/\\?q=([^&]+)", "^(?:.{1,5}://)?(?:[^/]*\\.)?myspace\\.\\w{1,3}(?:\\.\\w{1,3})?/search\\?q(?:uery)?=([^&]+)", "^(?:.{1,5}://)?(?:[^/]*\\.)?cluuz\\.com/Default\\.aspx\\?(?:[\\w=]+&)*q=([^&]+)", "^(?:.{1,5}://)?api[^/]*\\.blinkx\\.com/api\\.php\\?(?:[\\w=_-]+&)*search=([^&]+)", "^(?:.{1,5}://)?(?:[^/]*\\.)?blinkx\\.com/search/(.+)", "^(?:.{1,5}://)?(?:[^/]*\\.)?flickr\\.com/services/rest\\?username=([^&]+)", "^(?:.{1,5}://)?geo\\.yahoo.\\w{1,3}(?:\\.\\w{1,3})?/c\\?s=.*text%3D([^%]+)", "^(?:.{1,5}://)?(?:[^/]*\\.)?flickr.\\w{1,3}(?:\\.\\w{1,3})?/services/.*&page=1.*text=([^&]+)", "^(?:.{1,5}://)?(?:[^/]*\\.)?facebook\\.\\w{1,3}(?:\\.\\w{1,3})?/s(?:ea)?rch.*(?:\\?|&)q=([^&]+)", "^(?:.{1,5}://)?(?:[^/]*\\.)?twitter\\.\\w{1,3}(?:\\.\\w{1,3})?/i/search(?:/video_facets|/image_facets|/typeahead)?\\.json\\?(?:[\\w_=-]+&)*q=([^&]+)", "^(?:.{1,5}://)?(?:[^/]*\\.)?twitter\\.\\w{1,3}(?:\\.\\w{1,3})?/phoenix_search.phoenix\\?(?:[\\w_=-]+&)*q=([^&]+)", "^(?:.{1,5}://)?(?:[^/]*\\.)?twitter\\.\\w{1,3}(?:\\.\\w{1,3})?/hashtag/([^?]+)", "^(?:.{1,5}://)?(?:[^/]*\\.)?twitter\\.\\w{1,3}(?:\\.\\w{1,3})?/search(?:.atom|.html|.json)?\\?(?:[\\w_=-]+&)*phrase=([^&]+)", "^(?:.{1,5}://)?(?:[^/]*\\.)?twitter\\.\\w{1,3}(?:\\.\\w{1,3})?/search(?:.atom|.html|.json)?\\?(?:[\\w_=-]+&)*ors=([^&]+)", "^(?:.{1,5}://)?(?:[^/]*\\.)?twitter\\.\\w{1,3}(?:\\.\\w{1,3})?/search(?:.atom|.html|.json)?\\?(?:[\\w_=-]+&)*ands=([^&]+)", "^(?:.{1,5}://)?(?:[^/]*\\.)?twitter\\.\\w{1,3}(?:\\.\\w{1,3})?/search(?:.atom|.html|.json)?\\?(?:[\\w_=-]+&)*q=([^&]+)", "^(?:.{1,5}://)?(?:[^/]*\\.)?ecosia\\.\\w{1,3}(?:\\.\\w{1,3})?/search.*(?:&|\\?)q=([^&]+)", "^(?:.{1,5}://)?(?:[^/]*\\.)?forestle\\.\\w{1,3}(?:\\.\\w{1,3})?/search\\.php\\?(?:[\\w=]+&)*q=([^&]+)", "^(?:.{1,5}://)?(?:[^/]*\\.)?duckduckgo\\.\\w{1,3}(?:\\.\\w{1,3})?/(?:v|i|t)\\.js\\?(?:[\\w\\._=-]+&)*q=([^&]+)", "^(?:.{1,5}://)?(?:[^/]*\\.)?duckduckgo-owned-server\\.yahoo\\.\\w{1,3}(?:\\.\\w{1,3})?/d\\.js\\?(?:[\\w_=-]+&)*q=([^&]+)", "^(?:.{1,5}://)?(?:[^/]*\\.)?duckduckgo\\.\\w{1,3}(?:\\.\\w{1,3})?/(?:html)?\\?(?:[\\w=]+&)*q=([^&]+)", "^(?:.{1,5}://)?msxml\\.excite\\.\\w{1,3}(?:\\.\\w{1,3})?/(?:[a-z0-9]+/)?search/\\w+\\?(?:[\\w=_-]+&)*q=([^&]+)", "^(?:.{1,5}://)?(?:[^/]*\\.)?metacrawler\\.com/search/\\w+\\?(?:[\\w=]+&)*q=([^&]+)", "^(?:.{1,5}://)?(?:[^/]*\\.)?dogpile\\.\\w{1,3}(?:\\.\\w{1,3})?/serp\\?.*q=([^&]+)", "^(?:.{1,5}://)?(?:[^/]*\\.)?ask\\.\\w{1,3}(?:\\.\\w{1,3})?/\\w+\\?(?:.+&)?q=([^&]+)", "^(?:.{1,5}://)?(?:[^/]*\\.)?search\\.\\w{1,3}(?:\\.\\w{1,3})?/\\w+\\?(?:.+&)?q=([^&]+)", "^(?:.{1,5}://)?(?:[^/]*\\.)?yahoo\\.\\w{1,3}(?:\\.\\w{1,3})?/search.*(?:&|\\?)p=([^&]+)", "^(?:.{1,5}://)?(?:[^/]*\\.)?alltheweb\\.\\w{1,3}(?:\\.\\w{1,3})?/search\\?(?:.+&)?q=([^&]+)", "^(?:.{1,5}://)?(?:[^/]*\\.)?(?:lycos|hotbot)\\.\\w{1,3}(?:\\.\\w{1,3})?/.*(?:&|\\?)(?:query|q)=([^&]+)", "^(?:.{1,5}://)?video\\.aol\\.\\w{1,3}(?:\\.\\w{1,3})?/video-search/query/([^/]+)", "^(?:.{1,5}://)?search\\.aol\\.\\w{1,3}(?:\\.\\w{1,3})?/aol/[-\\w;=]+\\?(?:.+&)?q(?:uery)?=([^&]+)", "^(?:.{1,5}://)?(?:[^/]*\\.)?(?:startpage|ixquick)\\.\\w{1,3}(?:\\.\\w{1,3})?/do/(?:meta)?search.*(?:\\?|&)query=([^&]+)", "^(?:.{1,5}://)?(?:[^/]*\\.)?kel\\.nl/search/search.cgi?(?:.+&)?Terms=([^&]+)", "^(?:.{1,5}://)?(?:[^/]*\\.)?startpagina\\.nl/[\\w\\d\\._+=&\\?]*?q(?:uery)?=([^&]+)", "^(?:.{1,5}://)?(?:[^/]*\\.)?ilse\\.nl/\\w*\\?(?:.+&)?search_for=([^&]+)", "^(?:.{1,5}://)?(?:[^/]*\\.)?bing\\.\\w{1,3}(?:\\.\\w{1,3})?/(?:.+/)?(?:search|CommonPage.aspx)\\?(?:.+&)?q=([^&]+)", "^(?:.{1,5}://)?search\\.live\\.\\w{1,3}(?:\\.\\w{1,3})?/(?:\\w+/)?results\\.aspx\\?(?:.+&)?q=([^&]+)", "^(?:.{1,5}://)?(?:[^/]*\\.)?youtube\\.\\w{1,3}(?:\\.\\w{1,3})?/comment_search\\?.*?q=([^&]+)", "^(?:.{1,5}://)?(?:[^/]*\\.)?youtube\\.\\w{1,3}(?:\\.\\w{1,3})?/(?:console_)?results\\?(?:.+&)?(?:v?q|search_query)=([^&]+)", "^(?:.{1,5}://)?play\\.google\\.\\w{1,3}(?:\\.\\w{1,3})?/store/search\\?q=([^&]+)", "^(?:.{1,5}://)?(?:[^/]*\\.)?google\\.\\w{1,3}(?:\\.\\w{1,3})?/uds/G(?:image|web)Search\\?.*?&q=([^&]+)", "^(?:.{1,5}://)?(?:[^/]*\\.)?googleapis\\.\\w{1,3}(?:\\.\\w{1,3})?/customsearch/.+&q=([^&]+)", "^(?:.{1,5}://)?picasaweb\\.google\\.\\w{1,3}(?:\\.\\w{1,3})?/lh/view\\?q=([^&]+)", "^(?:.{1,5}://)?ajax\\.googleapis\\.\\w{1,3}(?:\\.\\w{1,3})?/ajax/(?:[^/]/)*[^\\?]*\\?(?:.+&)?q=([^&]+)", "^(?:.{1,5}://)?translate\\.google\\.\\w{1,3}(?:\\.\\w{1,3})?/\\?.+(?:q=|text=)([^&]+)", "^(?:.{1,5}://)?translate\\.google\\.\\w{1,3}(?:\\.\\w{1,3})?/translate_\\w/[^\\?]*\\?(?:.+&)?q=([^&]+)", "^(?:.{1,5}://)?(?![^/]*tbn)(?:[^/]*\\.)?google\\.\\w{1,3}(?:\\.\\w{1,3})?/(?:m/)?(?:search\\?|custom|xhtml|images|imghp|imgres|videosearch|maps|news|products|groups|books|scholar|finance|blogsearch|cse|ie|webhp|\\?hl=)(?:.+&)?q=(?!(?:tbn\\:|info\\:))([^&]+)", "^https?://(?:[^/]*\\.)?ted\\.com/search\\?(?:cat=[^&]+&)?q=([^&]+)", "^https?://(?:[^/]*\\.)?veoh\\.com/find\\/([^/?]+)", "^https?://(?:[^/]*\\.)?refseek\\.com/(?:search|documents)\\?q=([^&]+)", "^https?://(?:[^/]*\\.)?unsplash\\.com\\/\\w+\\/search\\?query=([^&]+)", "^https?://(?:[^/]*\\.)?soundcloud\\.com/search\\?q=([^&]+)", "^(?:.{1,5}://)?(?:[^/]*\\.)?twitter\\.\\w{1,3}/i/api/\\d\\/search/adaptive\\.json.*q=([^&]+)", "^https?://(?:[^/]*\\.)?gibiru\\.com\\/results\\.html\\?q=([^&]+)", "^(?:.{1,5}:\\/\\/)?(?:[^\\/]*\\.)?kahoot\\.it\\/(?:kahoots\\/)?(?:search\\?)?[\\w=?&]*(?:[&?]query=|.*?&tags=)([^&]+)", "^(?:.{1,5}://)?(?:[^/]*\\.)?(?<!suggestion\\.)baidu\\.\\w{1,3}(?:\\.\\w{1,3})?/.*(?:&|\\?)(?:wd|kw|word)=([^&]+)", "api\\.nearpod\\.com.*?q=([^&]+)", "^(?:.{1,5}://)?(?:[^/]*\\.)?pinterest\\.co\\.uk/search/\\w+/\\?(?:.+&)?q=([^&]+)", "^(?:.{1,5}://)?(?:[^/]*\\.)?pinterest\\.\\w{1,3}(?:\\.\\w{1,3})?/resource/AdvancedTypeaheadResource/get/\\?source_url=.*term%22%3A%22(.*?)%22", "^(?:.{1,5}://)?(?:[^/]*\\.)?google\\.\\w{1,3}(?:\\.\\w{1,3})?/gen_204(?:.*?[&?])oq=([^&]+)"];
       var l, f, d = "undefined",
           v = "constructor",
           p = "prototype",
           g = "function",
           h = "_dynInstFuncs",
           m = "_isDynProxy",
           A = "_dynClass",
           w = "_dynInstChk",
           y = w,
           b = "_dfOpts",
           x = "_unknown_",
           S = "__proto__",
           C = "_dyn" + S,
           I = "__dynProto$Gbl",
           R = "_dynInstProto",
           T = "useBaseInst",
           k = "setInstFuncs",
           P = Object,
           H = P.getPrototypeOf,
           U = P.getOwnPropertyNames,
           F = (typeof globalThis !== d && (f = globalThis), f || typeof self === d || (f = self), f || typeof window === d || (f = window), f || typeof __webpack_require__.g === d || (f = __webpack_require__.g), f || {}),
           D = F[I] || (F[I] = {
               o: (l = {}, l[k] = !0, l[T] = !0, l),
               n: 1e3
           });


       function E(e, t) {
           return e && P[p].hasOwnProperty.call(e, t)
       }


       function q(e) {
           return e && (e === P[p] || e === Array[p])
       }


       function K(e) {
           return q(e) || e === Function[p]
       }


       function X(e) {
           var t;
           if (e) {
               if (H) return H(e);
               var n = e[S] || e[p] || (e[v] ? e[v][p] : null);
               t = e[C] || n, E(e, C) || (delete e[R], t = e[C] = e[R] || e[C], e[R] = n)
           }
           return t
       }


       function N(e, t) {
           var n = [];
           if (U) n = U(e);
           else
               for (var r in e) "string" == typeof r && E(e, r) && n.push(r);
           if (n && n.length > 0)
               for (var i = 0; i < n.length; i++) t(n[i])
       }


       function L(e, t, n) {
           return t !== v && typeof e[t] === g && (n || E(e, t)) && t !== S && t !== p
       }


       function j(e) {
           throw new TypeError("DynamicProto: " + e)
       }


       function B() {
           return Object.create ? (e = Object.create) ? e(null) : {} : {};
           var e
       }


       function M(e, t) {
           for (var n = e.length - 1; n >= 0; n--)
               if (e[n] === t) return !0;
           return !1
       }


       function V(e, t, n, r, i) {
           if (!q(e)) {
               var o = n[h] = n[h] || B();
               if (!q(o)) {
                   var a = o[t] = o[t] || B();
                   !1 !== o[y] && (o[y] = !!i), q(a) || N(n, (function(t) {
                       L(n, t, !1) && n[t] !== r[t] && (a[t] = n[t], delete n[t], (!E(e, t) || e[t] && !e[t][m]) && (e[t] = function(e, t) {
                           var n = function() {
                               var r = function(e, t, n, r) {
                                   var i = null;
                                   if (e && E(n, A)) {
                                       var o = e[h] || B();
                                       if ((i = (o[n[A]] || B())[t]) || j("Missing [" + t + "] " + g), !i[w] && !1 !== o[y]) {
                                           for (var a = !E(e, t), s = X(e), c = []; a && s && !K(s) && !M(c, s);) {
                                               var u = s[t];
                                               if (u) {
                                                   a = u === r;
                                                   break
                                               }
                                               c.push(s), s = X(s)
                                           }
                                           try {
                                               a && (e[t] = i), i[w] = 1
                                           } catch (e) {
                                               o[y] = !1
                                           }
                                       }
                                   }
                                   return i
                               }(this, t, e, n) || function(e, t, n) {
                                   var r = t[e];
                                   return r === n && (r = X(t)[e]), typeof r !== g && j("[" + e + "] is not a " + g), r
                               }(t, e, n);
                               return r.apply(this, arguments)
                           };
                           return n[m] = 1, n
                       }(e, t)))
                   }))
               }
           }
       }


       function _(e, t) {
           return E(e, p) ? e.name || t || x : ((e || {})[v] || {})
               .name || t || x
       }


       function O(e, t, n, r) {
           E(e, p) || j("theClass is an invalid class definition.");
           var i = e[p];
           (function(e, t) {
               if (H) {
                   for (var n = [], r = X(t); r && !K(r) && !M(n, r);) {
                       if (r === e) return !0;
                       n.push(r), r = X(r)
                   }
                   return !1
               }
               return !0
           })(i, t) || j("[" + _(e) + "] not in hierarchy of [" + _(t) + "]");
           var o = null;
           E(i, A) ? o = i[A] : (o = "_dynCls$" + _(e, "_") + "$" + D.n, D.n++, i[A] = o);
           var a = O[b],
               s = !!a[T];
           s && r && void 0 !== r[T] && (s = !!r[T]);
           var c = function(e) {
                   var t = B();
                   return N(e, (function(n) {
                       !t[n] && L(e, n, !1) && (t[n] = e[n])
                   })), t
               }(t),
               u = function(e, t, n, r) {
                   function i(e, t, n) {
                       var i = t[n];
                       if (i[m] && r) {
                           var o = e[h] || {};
                           !1 !== o[y] && (i = (o[t[A]] || {})[n] || i)
                       }
                       return function() {
                           return i.apply(e, arguments)
                       }
                   }
                   var o = B();
                   N(n, (function(e) {
                       o[e] = i(t, n, e)
                   }));
                   for (var a = X(e), s = []; a && !K(a) && !M(s, a);) N(a, (function(e) {
                       !o[e] && L(a, e, !H) && (o[e] = i(t, a, e))
                   })), s.push(a), a = X(a);
                   return o
               }(i, t, c, s);
           n(t, u);
           var l = !!H && !!a[k];
           l && r && (l = !!r[k]), V(i, o, t, c, !1 !== l)
       }
       O[b] = D.o;
       var z = "function",
           W = "object",
           G = "undefined",
           Z = "prototype",
           J = "hasOwnProperty",
           Q = Object,
           Y = Q[Z],
           $ = Q.assign,
           ee = Q.create,
           te = Q.defineProperty,
           ne = Y[J],
           re = null;


       function ie(e) {
           void 0 === e && (e = !0);
           var t = !1 === e ? null : re;
           return t || (typeof globalThis !== G && (t = globalThis), t || typeof self === G || (t = self), t || typeof window === G || (t = window), t || typeof __webpack_require__.g === G || (t = __webpack_require__.g), re = t), t
       }


       function oe(e) {
           throw new TypeError(e)
       }


       function ae(e) {
           if (ee) return ee(e);
           if (null == e) return {};
           var t = typeof e;


           function n() {}
           return t !== W && t !== z && oe("Object prototype may only be an Object:" + e), n[Z] = e, new n
       }(ie() || {})
       .Symbol, (ie() || {})
       .Reflect;
       var se = $ || function(e) {
               for (var t, n = 1, r = arguments.length; n < r; n++)
                   for (var i in t = arguments[n]) Y[J].call(t, i) && (e[i] = t[i]);
               return e
           },
           ce = function(e, t) {
               return ce = Q.setPrototypeOf || {
                   __proto__: []
               }
               instanceof Array && function(e, t) {
                   e.__proto__ = t
               } || function(e, t) {
                   for (var n in t) t[J](n) && (e[n] = t[n])
               }, ce(e, t)
           };


       function ue(e, t) {
           function n() {
               this.constructor = e
           }
           typeof t !== z && null !== t && oe("Class extends value " + String(t) + " is not a constructor or null"), ce(e, t), e[Z] = null === t ? ae(t) : (n[Z] = t[Z], new n)
       }


       function le(e, t) {
           for (var n = 0, r = t.length, i = e.length; n < r; n++, i++) e[i] = t[n];
           return e
       }
       var fe = "initialize",
           de = "name",
           ve = "getNotifyMgr",
           pe = "identifier",
           ge = "push",
           he = "isInitialized",
           me = "config",
           Ae = "instrumentationKey",
           we = "logger",
           ye = "length",
           be = "time",
           xe = "processNext",
           Se = "getProcessTelContext",
           Ce = "addNotificationListener",
           Ie = "removeNotificationListener",
           Re = "stopPollingInternalLogs",
           Te = "onComplete",
           ke = "getPlugin",
           Pe = "flush",
           He = "_extensions",
           Ue = "splice",
           Fe = "teardown",
           De = "messageId",
           Ee = "message",
           qe = "isAsync",
           Ke = "_doTeardown",
           Xe = "update",
           Ne = "getNext",
           Le = "diagLog",
           je = "setNextPlugin",
           Be = "createNew",
           Me = "cookieCfg",
           Ve = "indexOf",
           _e = "substring",
           Oe = "userAgent",
           ze = "split",
           We = "setEnabled",
           Ge = "substr",
           Ze = "nodeType",
           Je = "apply",
           Qe = "replace",
           Ye = "enableDebugExceptions",
           $e = "logInternalMessage",
           et = "toLowerCase",
           tt = "call",
           nt = "type",
           rt = "handler",
           it = "listeners",
           ot = "isChildEvt",
           at = "getCtx",
           st = "setCtx",
           ct = "complete",
           ut = "traceId",
           lt = "spanId",
           ft = "traceFlags",
           dt = "version",
           vt = "",
           pt = "channels",
           gt = "core",
           ht = "createPerfMgr",
           mt = "disabled",
           At = "extensionConfig",
           wt = "processTelemetry",
           yt = "priority",
           bt = "eventsSent",
           xt = "eventsDiscarded",
           St = "eventsSendRequest",
           Ct = "perfEvent",
           It = "errorToConsole",
           Rt = "warnToConsole",
           Tt = "getPerfMgr",
           kt = "toISOString",
           Pt = "endsWith",
           Ht = "indexOf",
           Ut = "reduce",
           Ft = "trim",
           Dt = "toString",
           Et = "constructor",
           qt = te,
           Kt = Q.freeze,
           Xt = (Q.seal, Q.keys),
           Nt = String[Z],
           Lt = Nt[Ft],
           jt = Nt[Pt],
           Bt = (Nt.startsWith, Date[Z][kt]),
           Mt = Array.isArray,
           Vt = Y[Dt],
           _t = ne[Dt],
           Ot = _t[tt](Q),
           zt = /-([a-z])/g,
           Wt = /([^\w\d_$])/g,
           Gt = /^(\d+[\w\d_$])/,
           Zt = Object.getPrototypeOf;


       function Jt(e) {
           if (e) {
               if (Zt) return Zt(e);
               var t = e.__proto__ || e[Z] || e[Et];
               if (t) return t
           }
           return null
       }


       function Qt(e) {
           return void 0 === e || typeof e === G
       }


       function Yt(e) {
           return null === e || Qt(e)
       }


       function $t(e) {
           return !Yt(e)
       }


       function en(e, t) {
           return !(!e || !ne[tt](e, t))
       }


       function tn(e) {
           return !(!e || typeof e !== W)
       }


       function nn(e) {
           return !(!e || typeof e !== z)
       }


       function rn(e) {
           var t = e;
           return t && ln(t) && (t = (t = (t = t[Qe](zt, (function(e, t) {
               return t.toUpperCase()
           })))[Qe](Wt, "_"))[Qe](Gt, (function(e, t) {
               return "_" + t
           }))), t
       }


       function on(e, t) {
           if (e)
               for (var n in e) ne[tt](e, n) && t[tt](e, n, e[n])
       }


       function an(e, t) {
           var n = !1;
           return e && t && !(n = e === t) && (n = jt ? e[Pt](t) : function(e, t) {
               var n = !1,
                   r = t ? t[ye] : 0,
                   i = e ? e[ye] : 0;
               if (r && i && i >= r && !(n = e === t)) {
                   for (var o = i - 1, a = r - 1; a >= 0; a--) {
                       if (e[o] != t[a]) return !1;
                       o--
                   }
                   n = !0
               }
               return n
           }(e, t)), n
       }


       function sn(e, t) {
           return !(!e || !t) && -1 !== e[Ve](t)
       }
       var cn = Mt || function(e) {
           return !(!e || "[object Array]" !== Vt[tt](e))
       };


       function un(e) {
           return !(!e || "[object Error]" !== Vt[tt](e))
       }


       function ln(e) {
           return "string" == typeof e
       }


       function fn(e) {
           return "number" == typeof e
       }


       function dn(e) {
           var t = !1;
           if (e && "object" == typeof e) {
               var n = Zt ? Zt(e) : Jt(e);
               n ? (n[Et] && ne[tt](n, Et) && (n = n[Et]), t = typeof n === z && _t[tt](n) === Ot) : t = !0
           }
           return t
       }


       function vn(e) {
           if (e) return Bt ? e[kt]() : function(e) {
               if (e && e.getUTCFullYear) {
                   var t = function(e) {
                       var t = String(e);
                       return 1 === t[ye] && (t = "0" + t), t
                   };
                   return e.getUTCFullYear() + "-" + t(e.getUTCMonth() + 1) + "-" + t(e.getUTCDate()) + "T" + t(e.getUTCHours()) + ":" + t(e.getUTCMinutes()) + ":" + t(e.getUTCSeconds()) + "." + String((e.getUTCMilliseconds() / 1e3)
                           .toFixed(3))
                       .slice(2, 5) + "Z"
               }
           }(e)
       }


       function pn(e, t, n) {
           var r = e[ye];
           try {
               for (var i = 0; i < r && (!(i in e) || -1 !== t[tt](n || e, e[i], i, e)); i++);
           } catch (e) {}
       }


       function gn(e, t, n) {
           if (e) {
               if (e[Ht]) return e[Ht](t, n);
               var r = e[ye],
                   i = n || 0;
               try {
                   for (var o = Math.max(i >= 0 ? i : r - Math.abs(i), 0); o < r; o++)
                       if (o in e && e[o] === t) return o
               } catch (e) {}
           }
           return -1
       }


       function hn(e, t, n) {
           var r;
           if (e) {
               if (e.map) return e.map(t, n);
               var i = e[ye],
                   o = n || e;
               r = new Array(i);
               try {
                   for (var a = 0; a < i; a++) a in e && (r[a] = t[tt](o, e[a], e))
               } catch (e) {}
           }
           return r
       }


       function mn(e) {
           return e && (e = Lt && e[Ft] ? e[Ft]() : e[Qe] ? e[Qe](/^\s+|(?=\s)\s+$/g, vt) : e), e
       }
       var An = !{
               toString: null
           }.propertyIsEnumerable("toString"),
           wn = ["toString", "toLocaleString", "valueOf", "hasOwnProperty", "isPrototypeOf", "propertyIsEnumerable", "constructor"];


       function yn(e) {
           var t = typeof e;
           if (t === z || t === W && null !== e || oe("objKeys called on non-object"), !An && Xt) return Xt(e);
           var n = [];
           for (var r in e) e && ne[tt](e, r) && n[ge](r);
           if (An)
               for (var i = wn[ye], o = 0; o < i; o++) e && ne[tt](e, wn[o]) && n[ge](wn[o]);
           return n
       }


       function bn(e, t, n, r) {
           if (qt) try {
               var i = {
                   enumerable: !0,
                   configurable: !0
               };
               return n && (i.get = n), r && (i.set = r), qt(e, t, i), !0
           } catch (e) {}
           return !1
       }


       function xn(e) {
           return Kt && on(e, (function(e, t) {
               (cn(t) || tn(t)) && Kt(t)
           })), Sn(e)
       }
       var Sn = Kt || function(e) {
           return e
       };


       function Cn() {
           var e = Date;
           return e.now ? e.now() : (new e)
               .getTime()
       }


       function In(e) {
           return un(e) ? e[de] : vt
       }


       function Rn(e, t, n, r, i) {
           var o = n;
           return e && ((o = e[t]) === n || i && !i(o) || r && !r(n) || (o = n, e[t] = o)), o
       }


       function Tn(e, t, n) {
           var r;
           return e ? !(r = e[t]) && Yt(r) && (r = Qt(n) ? {} : n, e[t] = r) : r = Qt(n) ? {} : n, r
       }


       function kn(e, t) {
           return Yt(e) ? t : e
       }


       function Pn(e) {
           return !!e
       }


       function Hn(e) {
           throw new Error(e)
       }


       function Un(e, t) {
           var n = null,
               r = null;
           return nn(e) ? n = e : r = e,
               function() {
                   var e = arguments;
                   if (n && (r = n()), r) return r[t][Je](r, e)
               }
       }


       function Fn(e, t, n, r, i) {
           e && t && n && (!1 !== i || Qt(e[t])) && (e[t] = Un(n, r))
       }


       function Dn(e, t, n, r) {
           return e && t && tn(e) && cn(n) && pn(n, (function(n) {
               ln(n) && Fn(e, n, t, n, r)
           })), e
       }


       function En(e) {
           return e && $ && (e = Q($({}, e))), e
       }


       function qn(e, t, n, r, i, o) {
           var a = arguments,
               s = a[0] || {},
               c = a[ye],
               u = !1,
               l = 1;
           for (c > 0 && "boolean" == typeof s && (u = s, s = a[l] || {}, l++), tn(s) || (s = {}); l < c; l++) {
               var f = a[l],
                   d = cn(f),
                   v = tn(f);
               for (var p in f)
                   if (d && p in f || v && ne[tt](f, p)) {
                       var g = f[p],
                           h = void 0;
                       if (u && g && ((h = cn(g)) || dn(g))) {
                           var m = s[p];
                           h ? cn(m) || (m = []) : dn(m) || (m = {}), g = qn(u, m, g)
                       }
                       void 0 !== g && (s[p] = g)
                   }
           }
           return s
       }
       var Kn = "split",
           Xn = "length",
           Nn = "toLowerCase",
           Ln = "ingestionendpoint",
           jn = "toString",
           Bn = "removeItem",
           Mn = "name",
           Vn = "message",
           _n = "stringify",
           On = "pathname",
           zn = "correlationHeaderExcludePatterns",
           Wn = "indexOf",
           Gn = "exceptions",
           Zn = "parsedStack",
           Jn = "properties",
           Qn = "measurements",
           Yn = "sizeInBytes",
           $n = "typeName",
           er = "severityLevel",
           tr = "problemGroup",
           nr = "isManual",
           rr = "CreateFromInterface",
           ir = "assembly",
           or = "fileName",
           ar = "hasFullStack",
           sr = "level",
           cr = "method",
           ur = "line",
           lr = "duration",
           fr = "receivedResponse",
           dr = "substring";


       function vr(e, t) {
           return void 0 === t && (t = !1), null == e ? t : "true" === e.toString()[Nn]()
       }


       function pr(e) {
           (isNaN(e) || e < 0) && (e = 0);
           var t = "" + (e = Math.round(e)) % 1e3,
               n = "" + Math.floor(e / 1e3) % 60,
               r = "" + Math.floor(e / 6e4) % 60,
               i = "" + Math.floor(e / 36e5) % 24,
               o = Math.floor(e / 864e5);
           return t = 1 === t[Xn] ? "00" + t : 2 === t[Xn] ? "0" + t : t, n = n[Xn] < 2 ? "0" + n : n, r = r[Xn] < 2 ? "0" + r : r, (o > 0 ? o + "." : "") + (i = i[Xn] < 2 ? "0" + i : i) + ":" + r + ":" + n + "." + t
       }
       var gr = "window",
           hr = "JSON",
           mr = "msie",
           Ar = "trident/",
           wr = "XMLHttpRequest",
           yr = null,
           br = null,
           xr = null,
           Sr = null;


       function Cr(e, t) {
           var n = !1;
           if (e) {
               try {
                   if (!(n = t in e)) {
                       var r = e[Z];
                       r && (n = t in r)
                   }
               } catch (e) {}
               if (!n) try {
                   n = !Qt((new e)[t])
               } catch (e) {}
           }
           return n
       }


       function Ir(e) {
           var t = ie();
           return t && t[e] ? t[e] : e === gr && Rr() ? window : null
       }


       function Rr() {
           return Boolean(typeof window === W && window)
       }


       function Tr() {
           return Rr() ? window : Ir(gr)
       }


       function kr() {
           return Boolean(typeof document === W && document)
       }


       function Pr() {
           return kr() ? document : Ir("document")
       }


       function Hr() {
           return Boolean(typeof navigator === W && navigator)
       }


       function Ur() {
           return Hr() ? navigator : Ir("navigator")
       }


       function Fr() {
           return Boolean(typeof history === W && history)
       }


       function Dr(e) {
           return typeof location === W && location ? location : Ir("location")
       }


       function Er() {
           return Ir("performance")
       }


       function qr() {
           return Boolean(typeof JSON === W && JSON || null !== Ir(hr))
       }


       function Kr() {
           return qr() ? JSON || Ir(hr) : null
       }


       function Xr() {
           var e = Ur();
           if (e && (e[Oe] !== br || null === yr)) {
               var t = ((br = e[Oe]) || vt)[et]();
               yr = sn(t, mr) || sn(t, Ar)
           }
           return yr
       }


       function Nr(e) {
           if (void 0 === e && (e = null), !e) {
               var t = Ur() || {};
               e = t ? (t[Oe] || vt)[et]() : vt
           }
           var n = (e || vt)[et]();
           if (sn(n, mr)) {
               var r = Pr() || {};
               return Math.max(parseInt(n[ze](mr)[1]), r.documentMode || 0)
           }
           if (sn(n, Ar)) {
               var i = parseInt(n[ze](Ar)[1]);
               if (i) return i + 4
           }
           return null
       }


       function Lr(e) {
           var t = Object[Z].toString[tt](e),
               n = vt;
           return "[object Error]" === t ? n = "{ stack: '" + e.stack + "', message: '" + e.message + "', name: '" + e[de] + "'" : qr() && (n = Kr()
               .stringify(e)), t + n
       }


       function jr() {
           return null === Sr && (Sr = Hr() && Boolean(Ur()
               .sendBeacon)), Sr
       }


       function Br(e) {
           var t = !1;
           try {
               t = !!Ir("fetch");
               var n = Ir("Request");
               t && e && n && (t = Cr(n, "keepalive"))
           } catch (e) {}
           return t
       }


       function Mr() {
           return null === xr && (xr = typeof XDomainRequest !== G) && Vr() && (xr = xr && !Cr(Ir(wr), "withCredentials")), xr
       }


       function Vr() {
           var e = !1;
           try {
               e = !!Ir(wr)
           } catch (e) {}
           return e
       }
       var _r, Or = ["eventsSent", "eventsDiscarded", "eventsSendRequest", "perfEvent"],
           zr = null;


       function Wr(e, t) {
           return function() {
               var n = arguments,
                   r = Gr(t);
               if (r) {
                   var i = r.listener;
                   i && i[e] && i[e][Je](i, n)
               }
           }
       }


       function Gr(e) {
           var t, n = zr;
           return n || !0 === e.disableDbgExt || (n = zr || ((t = Ir("Microsoft")) && (zr = t.ApplicationInsights), zr)), n ? n.ChromeDbgExt : null
       }


       function Zr(e) {
           if (!_r) {
               _r = {};
               for (var t = 0; t < Or[ye]; t++) _r[Or[t]] = Wr(Or[t], e)
           }
           return _r
       }


       function Jr(e) {
           return e ? '"' + e[Qe](/\"/g, vt) + '"' : vt
       }


       function Qr(e, t) {
           var n = typeof console !== G ? console : Ir("console");
           if (n) {
               var r = "log";
               n[e] && (r = e), nn(n[r]) && n[r](t)
           }
       }
       var Yr = function() {
           function e(e, t, n, r) {
               void 0 === n && (n = !1);
               var i = this;
               i[De] = e, i[Ee] = (n ? "AI: " : "AI (Internal): ") + e;
               var o = vt;
               qr() && (o = Kr()
                   .stringify(r));
               var a = (t ? " message:" + Jr(t) : vt) + (r ? " props:" + Jr(o) : vt);
               i[Ee] += a
           }
           return e.dataType = "MessageData", e
       }();


       function $r(e, t) {
           return (e || {})[we] || new ei(t)
       }
       var ei = function() {
           function e(t) {
               this.identifier = "DiagnosticLogger", this.queue = [];
               var n, r, i, o, a = 0,
                   s = {};
               O(e, this, (function(e) {
                   function c(t, n) {
                       if (!(a >= i)) {
                           var o = !0,
                               c = "AITR_" + n[De];
                           if (s[c] ? o = !1 : s[c] = !0, o && (t <= r && (e.queue[ge](n), a++, u(1 === t ? "error" : "warn", n)), a === i)) {
                               var l = "Internal events throttle limit per PageView reached for this app.",
                                   f = new Yr(23, l, !1);
                               e.queue[ge](f), 1 === t ? e[It](l) : e[Rt](l)
                           }
                       }
                   }


                   function u(e, n) {
                       var r = Gr(t || {});
                       r && r[Le] && r[Le](e, n)
                   }! function(e) {
                       n = kn(e.loggingLevelConsole, 0), r = kn(e.loggingLevelTelemetry, 1), i = kn(e.maxMessageLimit, 25), o = kn(e.enableDebug, kn(e[Ye], !1))
                   }(t || {}), e.consoleLoggingLevel = function() {
                       return n
                   }, e.telemetryLoggingLevel = function() {
                       return r
                   }, e.maxInternalMessageLimit = function() {
                       return i
                   }, e[Ye] = function() {
                       return o
                   }, e.throwInternal = function(t, r, i, a, l) {
                       void 0 === l && (l = !1);
                       var f = new Yr(r, i, l, a);
                       if (o) throw Lr(f);
                       var d = 1 === t ? It : Rt;
                       if (Qt(f[Ee])) u("throw" + (1 === t ? "Critical" : "Warning"), f);
                       else {
                           if (l) {
                               var v = +f[De];
                               !s[v] && n >= t && (e[d](f[Ee]), s[v] = !0)
                           } else n >= t && e[d](f[Ee]);
                           c(t, f)
                       }
                   }, e[Rt] = function(e) {
                       Qr("warn", e), u("warning", e)
                   }, e[It] = function(e) {
                       Qr("error", e), u("error", e)
                   }, e.resetInternalMessageCount = function() {
                       a = 0, s = {}
                   }, e[$e] = c
               }))
           }
           return e.__ieDyn = 1, e
       }();


       function ti(e) {
           return e || new ei
       }


       function ni(e, t, n, r, i, o) {
           void 0 === o && (o = !1), ti(e)
               .throwInternal(t, n, r, i, o)
       }


       function ri(e, t) {
           ti(e)[Rt](t)
       }


       function ii(e) {
           var t = {};
           return on(e, (function(e, n) {
               t[e] = n, t[n] = e
           })), xn(t)
       }
       var oi = ii({
               LocalStorage: 0,
               SessionStorage: 1
           }),
           ai = void ii({
               AI: 0,
               AI_AND_W3C: 1,
               W3C: 2
           }),
           si = void 0,
           ci = "";


       function ui() {
           return vi() ? li(oi.LocalStorage) : null
       }


       function li(e) {
           try {
               if (Yt(ie())) return null;
               var t = (new Date)[jn](),
                   n = Ir(e === oi.LocalStorage ? "localStorage" : "sessionStorage"),
                   r = ci + t;
               n.setItem(r, t);
               var i = n.getItem(r) !== t;
               if (n[Bn](r), !i) return n
           } catch (e) {}
           return null
       }


       function fi() {
           return pi() ? li(oi.SessionStorage) : null
       }


       function di(e) {
           ci = e || ""
       }


       function vi(e) {
           return (e || void 0 === ai) && (ai = !!li(oi.LocalStorage)), ai
       }


       function pi(e) {
           return (e || void 0 === si) && (si = !!li(oi.SessionStorage)), si
       }


       function gi(e, t) {
           var n = fi();
           if (null !== n) try {
               return n.getItem(t)
           } catch (t) {
               si = !1, ni(e, 2, 2, "Browser failed read of session storage. " + In(t), {
                   exception: Lr(t)
               })
           }
           return null
       }


       function hi(e, t, n) {
           var r = fi();
           if (null !== r) try {
               return r.setItem(t, n), !0
           } catch (t) {
               si = !1, ni(e, 2, 4, "Browser failed write to session storage. " + In(t), {
                   exception: Lr(t)
               })
           }
           return !1
       }
       var mi, Ai = "AppInsightsPropertiesPlugin",
           wi = "AppInsightsChannelPlugin",
           yi = "Microsoft_ApplicationInsights_BypassAjaxInstrumentation",
           bi = "sampleRate",
           xi = "ProcessLegacy",
           Si = "http.method",
           Ci = "https://dc.services.visualstudio.com",
           Ii = "/v2/track",
           Ri = "not_specified",
           Ti = "iKey";


       function ki(e, t, n) {
           var r = t[Xn],
               i = Pi(e, t);
           if (i[Xn] !== r) {
               for (var o = 0, a = i; void 0 !== n[a];) o++, a = i[dr](0, 147) + Ni(o);
               i = a
           }
           return i
       }


       function Pi(e, t) {
           var n;
           return t && (t = mn(t[jn]()))[Xn] > 150 && (n = t[dr](0, 150), ni(e, 2, 57, "name is too long.  It has been truncated to 150 characters.", {
               name: t
           }, !0)), n || t
       }


       function Hi(e, t, n) {
           var r;
           return void 0 === n && (n = 1024), t && (n = n || 1024, (t = mn(t))
               .toString()[Xn] > n && (r = t[jn]()[dr](0, n), ni(e, 2, 61, "string value is too long. It has been truncated to " + n + " characters.", {
                   value: t
               }, !0))), r || t
       }


       function Ui(e, t) {
           return Xi(e, t, 2048, 66)
       }


       function Fi(e, t) {
           var n;
           return t && t[Xn] > 32768 && (n = t[dr](0, 32768), ni(e, 2, 56, "message is too long, it has been truncated to 32768 characters.", {
               message: t
           }, !0)), n || t
       }


       function Di(e, t) {
           var n;
           if (t) {
               var r = "" + t;
               r[Xn] > 32768 && (n = r[dr](0, 32768), ni(e, 2, 52, "exception is too long, it has been truncated to 32768 characters.", {
                   exception: t
               }, !0))
           }
           return n || t
       }


       function Ei(e, t) {
           if (t) {
               var n = {};
               on(t, (function(t, r) {
                   if (tn(r) && qr()) try {
                       r = Kr()[_n](r)
                   } catch (t) {
                       ni(e, 2, 49, "custom property is not valid", {
                           exception: t
                       }, !0)
                   }
                   r = Hi(e, r, 8192), t = ki(e, t, n), n[t] = r
               })), t = n
           }
           return t
       }


       function qi(e, t) {
           if (t) {
               var n = {};
               on(t, (function(t, r) {
                   t = ki(e, t, n), n[t] = r
               })), t = n
           }
           return t
       }


       function Ki(e, t) {
           return t ? Xi(e, t, 128, 69)[jn]() : t
       }


       function Xi(e, t, n, r) {
           var i;
           return t && (t = mn(t))[Xn] > n && (i = t[dr](0, n), ni(e, 2, r, "input is too long, it has been truncated to " + n + " characters.", {
               data: t
           }, !0)), i || t
       }


       function Ni(e) {
           var t = "00" + e;
           return t.substr(t[Xn] - 3)
       }


       function Li(e, t, n, r, i, o) {
           var a;
           n = Hi(r, n) || Ri, (Yt(e) || Yt(t) || Yt(n)) && Hn("Input doesn't contain all required fields");
           var s = "";
           e[Ti] && (s = e[Ti], delete e[Ti]);
           var c = ((a = {})[Mn] = n, a.time = vn(new Date), a.iKey = s, a.ext = o || {}, a.tags = [], a.data = {}, a.baseType = t, a.baseData = e, a);
           return Yt(i) || on(i, (function(e, t) {
               c.data[e] = t
           })), c
       }(mi = {
           MAX_NAME_LENGTH: 150,
           MAX_ID_LENGTH: 128,
           MAX_PROPERTY_LENGTH: 8192,
           MAX_STRING_LENGTH: 1024,
           MAX_URL_LENGTH: 2048,
           MAX_MESSAGE_LENGTH: 32768,
           MAX_EXCEPTION_LENGTH: 32768
       })
       .sanitizeKeyAndAddUniqueness = ki, mi.sanitizeKey = Pi, mi.sanitizeString = Hi, mi.sanitizeUrl = Ui, mi.sanitizeMessage = Fi, mi.sanitizeException = Di, mi.sanitizeProperties = Ei, mi.sanitizeMeasurements = qi, mi.sanitizeId = Ki, mi.sanitizeInput = Xi, mi.padNumber = Ni, mi.trim = mn;
       var ji = function() {
               function e(e, t, n, r) {
                   this.aiDataContract = {
                       ver: 1,
                       name: 1,
                       properties: 0,
                       measurements: 0
                   };
                   var i = this;
                   i.ver = 2, i[Mn] = Hi(e, t) || Ri, i[Jn] = Ei(e, n), i[Qn] = qi(e, r)
               }
               return e.envelopeType = "Microsoft.ApplicationInsights.{0}.Event", e.dataType = "EventData", e
           }(),
           Bi = function() {
               function e(e, t, n, r, i) {
                   this.aiDataContract = {
                       ver: 1,
                       message: 1,
                       severityLevel: 0,
                       properties: 0
                   };
                   var o = this;
                   o.ver = 2, t = t || Ri, o[Vn] = Fi(e, t), o[Jn] = Ei(e, r), o[Qn] = qi(e, i), n && (o[er] = n)
               }
               return e.envelopeType = "Microsoft.ApplicationInsights.{0}.Message", e.dataType = "MessageData", e
           }(),
           Mi = function() {
               this.aiDataContract = {
                   name: 1,
                   kind: 0,
                   value: 1,
                   count: 0,
                   min: 0,
                   max: 0,
                   stdDev: 0
               }, this.kind = 0
           },
           Vi = function() {
               function e(e, t, n, r, i, o, a, s, c) {
                   this.aiDataContract = {
                       ver: 1,
                       metrics: 1,
                       properties: 0
                   };
                   var u = this;
                   u.ver = 2;
                   var l = new Mi;
                   l.count = r > 0 ? r : void 0, l.max = isNaN(o) || null === o ? void 0 : o, l.min = isNaN(i) || null === i ? void 0 : i, l[Mn] = Hi(e, t) || Ri, l.value = n, l.stdDev = isNaN(a) || null === a ? void 0 : a, u.metrics = [l], u[Jn] = Ei(e, s), u[Qn] = qi(e, c)
               }
               return e.envelopeType = "Microsoft.ApplicationInsights.{0}.Metric", e.dataType = "MetricData", e
           }(),
           _i = function() {
               function e(e, t, n, r, i, o, a) {
                   this.aiDataContract = {
                       ver: 1,
                       name: 0,
                       url: 0,
                       duration: 0,
                       properties: 0,
                       measurements: 0,
                       id: 0
                   };
                   var s = this;
                   s.ver = 2, s.id = Ki(e, a), s.url = Ui(e, n), s[Mn] = Hi(e, t) || Ri, isNaN(r) || (s[lr] = pr(r)), s[Jn] = Ei(e, i), s[Qn] = qi(e, o)
               }
               return e.envelopeType = "Microsoft.ApplicationInsights.{0}.Pageview", e.dataType = "PageviewData", e
           }(),
           Oi = function() {
               function e(e, t, n, r, i, o, a) {
                   this.aiDataContract = {
                       ver: 1,
                       name: 0,
                       url: 0,
                       duration: 0,
                       perfTotal: 0,
                       networkConnect: 0,
                       sentRequest: 0,
                       receivedResponse: 0,
                       domProcessing: 0,
                       properties: 0,
                       measurements: 0
                   };
                   var s = this;
                   s.ver = 2, s.url = Ui(e, n), s[Mn] = Hi(e, t) || Ri, s[Jn] = Ei(e, i), s[Qn] = qi(e, o), a && (s.domProcessing = a.domProcessing, s[lr] = a[lr], s.networkConnect = a.networkConnect, s.perfTotal = a.perfTotal, s[fr] = a[fr], s.sentRequest = a.sentRequest)
               }
               return e.envelopeType = "Microsoft.ApplicationInsights.{0}.PageviewPerformance", e.dataType = "PageviewPerformanceData", e
           }(),
           zi = "error",
           Wi = "stack",
           Gi = "stackDetails",
           Zi = "errorSrc",
           Ji = "message",
           Qi = "description";


       function Yi(e, t) {
           var n = e;
           return n && !ln(n) && (JSON && JSON[_n] ? (n = JSON[_n](e), !t || n && "{}" !== n || (n = nn(e[jn]) ? e[jn]() : "" + e)) : n = e + " - (Missing JSON.stringify)"), n || ""
       }


       function $i(e, t) {
           var n = e;
           return e && (n && !ln(n) && (n = e[Ji] || e[Qi] || n), n && !ln(n) && (n = Yi(n, !0)), e.filename && (n = n + " @" + (e.filename || "") + ":" + (e.lineno || "?") + ":" + (e.colno || "?"))), t && "String" !== t && "Object" !== t && "Error" !== t && -1 === (n || "")[Wn](t) && (n = t + ": " + n), n || ""
       }


       function eo(e) {
           return e && e.src && ln(e.src) && e.obj && cn(e.obj)
       }


       function to(e) {
           var t = e || "";
           ln(t) || (t = ln(t[Wi]) ? t[Wi] : "" + t);
           var n = t[Kn]("\n");
           return {
               src: t,
               obj: n
           }
       }


       function no(e) {
           var t = null;
           if (e) try {
               if (e[Wi]) t = to(e[Wi]);
               else if (e[zi] && e[zi][Wi]) t = to(e[zi][Wi]);
               else if (e.exception && e.exception[Wi]) t = to(e.exception[Wi]);
               else if (eo(e)) t = e;
               else if (eo(e[Gi])) t = e[Gi];
               else if (window && window.opera && e[Ji]) t = function(e) {
                   for (var t = [], n = e[Kn]("\n"), r = 0; r < n[Xn]; r++) {
                       var i = n[r];
                       n[r + 1] && (i += "@" + n[r + 1], r++), t.push(i)
                   }
                   return {
                       src: e,
                       obj: t
                   }
               }(e[Vn]);
               else if (e.reason && e.reason[Wi]) t = to(e.reason[Wi]);
               else if (ln(e)) t = to(e);
               else {
                   var n = e[Ji] || e[Qi] || "";
                   ln(e[Zi]) && (n && (n += "\n"), n += " from " + e[Zi]), n && (t = to(n))
               }
           } catch (e) {
               t = to(e)
           }
           return t || {
               src: "",
               obj: null
           }
       }


       function ro(e) {
           var t = "";
           if (e && !(t = e.typeName || e[Mn] || "")) try {
               var n = /function (.{1,200})\(/.exec(e.constructor[jn]());
               t = n && n[Xn] > 1 ? n[1] : ""
           } catch (e) {}
           return t
       }


       function io(e) {
           if (e) try {
               if (!ln(e)) {
                   var t = ro(e),
                       n = Yi(e, !1);
                   return n && "{}" !== n || (e[zi] && (t = ro(e = e[zi])), n = Yi(e, !0)), 0 !== n[Wn](t) && "String" !== t ? t + ":" + n : n
               }
           } catch (e) {}
           return "" + (e || "")
       }
       var oo = function() {
               function e(e, t, n, r, i, o) {
                   this.aiDataContract = {
                       ver: 1,
                       exceptions: 1,
                       severityLevel: 0,
                       properties: 0,
                       measurements: 0
                   };
                   var a = this;
                   a.ver = 2,
                       function(e) {
                           try {
                               if (tn(e)) return "ver" in e && "exceptions" in e && "properties" in e
                           } catch (e) {}
                           return !1
                       }(t) ? (a[Gn] = t[Gn] || [], a[Jn] = t[Jn], a[Qn] = t[Qn], t[er] && (a[er] = t[er]), t.id && (a.id = t.id), t[tr] && (a[tr] = t[tr]), Yt(t[nr]) || (a[nr] = t[nr])) : (n || (n = {}), a[Gn] = [new ao(e, t, n)], a[Jn] = Ei(e, n), a[Qn] = qi(e, r), i && (a[er] = i), o && (a.id = o))
               }
               return e.CreateAutoException = function(e, t, n, r, i, o, a, s) {
                   var c, u = ro(i || o || e);
                   return (c = {})[Vn] = $i(e, u), c.url = t, c.lineNumber = n, c.columnNumber = r, c.error = io(i || o || e), c.evt = io(o || e), c[$n] = u, c.stackDetails = no(a || i || o), c.errorSrc = s, c
               }, e.CreateFromInterface = function(t, n, r, i) {
                   var o = n[Gn] && hn(n[Gn], (function(e) {
                       return ao[rr](t, e)
                   }));
                   return new e(t, se(se({}, n), {
                       exceptions: o
                   }), r, i)
               }, e.prototype.toInterface = function() {
                   var e, t = this,
                       n = t.exceptions,
                       r = t.properties,
                       i = t.measurements,
                       o = t.severityLevel,
                       a = t.problemGroup,
                       s = t.id,
                       c = t.isManual,
                       u = n instanceof Array && hn(n, (function(e) {
                           return e.toInterface()
                       })) || void 0;
                   return (e = {
                       ver: "4.0"
                   })[Gn] = u, e.severityLevel = o, e.properties = r, e.measurements = i, e.problemGroup = a, e.id = s, e.isManual = c, e
               }, e.CreateSimpleException = function(e, t, n, r, i, o) {
                   var a;
                   return {
                       exceptions: [(a = {}, a[ar] = !0, a.message = e, a.stack = i, a.typeName = t, a)]
                   }
               }, e.envelopeType = "Microsoft.ApplicationInsights.{0}.Exception", e.dataType = "ExceptionData", e.formatError = io, e
           }(),
           ao = function() {
               function e(e, t, n) {
                   this.aiDataContract = {
                       id: 0,
                       outerId: 0,
                       typeName: 1,
                       message: 1,
                       hasFullStack: 0,
                       stack: 0,
                       parsedStack: 2
                   };
                   var r = this;
                   if (function(e) {
                           try {
                               if (tn(e)) return "hasFullStack" in e && "typeName" in e
                           } catch (e) {}
                           return !1
                       }(t)) r[$n] = t[$n], r[Vn] = t[Vn], r[Wi] = t[Wi], r[Zn] = t[Zn] || [], r[ar] = t[ar];
                   else {
                       var i = t,
                           o = i && i.evt;
                       un(i) || (i = i[zi] || o || i), r[$n] = Hi(e, ro(i)) || Ri, r[Vn] = Fi(e, $i(t || i, r[$n])) || Ri;
                       var a = t[Gi] || no(t);
                       r[Zn] = function(e) {
                           var t, n = e.obj;
                           if (n && n[Xn] > 0) {
                               t = [];
                               var r = 0,
                                   i = 0;
                               if (pn(n, (function(e) {
                                       var n = e[jn]();
                                       if (so.regex.test(n)) {
                                           var o = new so(n, r++);
                                           i += o[Yn], t.push(o)
                                       }
                                   })), i > 32768)
                                   for (var o = 0, a = t[Xn] - 1, s = 0, c = o, u = a; o < a;) {
                                       if ((s += t[o][Yn] + t[a][Yn]) > 32768) {
                                           var l = u - c + 1;
                                           t.splice(c, l);
                                           break
                                       }
                                       c = o, u = a, o++, a--
                                   }
                           }
                           return t
                       }(a), cn(r[Zn]) && hn(r[Zn], (function(t) {
                           t[ir] = Hi(e, t[ir]), t[or] = Hi(e, t[or])
                       })), r[Wi] = Di(e, function(e) {
                           var t = "";
                           return e && (e.obj ? pn(e.obj, (function(e) {
                               t += e + "\n"
                           })) : t = e.src || ""), t
                       }(a)), r.hasFullStack = cn(r.parsedStack) && r.parsedStack[Xn] > 0, n && (n[$n] = n[$n] || r[$n])
                   }
               }
               return e.prototype.toInterface = function() {
                   var e, t = this,
                       n = t[Zn] instanceof Array && hn(t[Zn], (function(e) {
                           return e.toInterface()
                       }));
                   return (e = {
                       id: t.id,
                       outerId: t.outerId,
                       typeName: t[$n],
                       message: t[Vn],
                       hasFullStack: t[ar],
                       stack: t[Wi]
                   })[Zn] = n || void 0, e
               }, e.CreateFromInterface = function(t, n) {
                   var r = n[Zn] instanceof Array && hn(n[Zn], (function(e) {
                       return so[rr](e)
                   })) || n[Zn];
                   return new e(t, se(se({}, n), {
                       parsedStack: r
                   }))
               }, e
           }(),
           so = function() {
               function e(t, n) {
                   this.aiDataContract = {
                       level: 1,
                       method: 1,
                       assembly: 0,
                       fileName: 0,
                       line: 0
                   };
                   var r = this;
                   if (r[Yn] = 0, "string" == typeof t) {
                       var i = t;
                       r[sr] = n, r[cr] = "<no_method>", r[ir] = mn(i), r[or] = "", r[ur] = 0;
                       var o = i.match(e.regex);
                       o && o[Xn] >= 5 && (r[cr] = mn(o[2]) || r[cr], r[or] = mn(o[4]), r[ur] = parseInt(o[5]) || 0)
                   } else r[sr] = t[sr], r[cr] = t[cr], r[ir] = t[ir], r[or] = t[or], r[ur] = t[ur], r[Yn] = 0;
                   r.sizeInBytes += r.method[Xn], r.sizeInBytes += r.fileName[Xn], r.sizeInBytes += r.assembly[Xn], r[Yn] += e.baseSize, r.sizeInBytes += r.level.toString()[Xn], r.sizeInBytes += r.line.toString()[Xn]
               }
               return e.CreateFromInterface = function(t) {
                   return new e(t, null)
               }, e.prototype.toInterface = function() {
                   var e = this;
                   return {
                       level: e[sr],
                       method: e[cr],
                       assembly: e[ir],
                       fileName: e[or],
                       line: e[ur]
                   }
               }, e.regex = /^([\s]+at)?[\s]{0,50}([^\@\()]+?)[\s]{0,50}(\@|\()([^\(\n]+):([0-9]+):([0-9]+)(\)?)$/, e.baseSize = 58, e
           }(),
           co = "toGMTString",
           uo = "toUTCString",
           lo = "cookie",
           fo = "expires",
           vo = "enabled",
           po = "isCookieUseDisabled",
           go = "disableCookiesUsage",
           ho = "_ckMgr",
           mo = null,
           Ao = null,
           wo = null,
           yo = Pr(),
           bo = {},
           xo = {};


       function So(e) {
           return !e || e.isEnabled()
       }


       function Co(e, t) {
           return !!(t && e && cn(e.ignoreCookies)) && -1 !== e.ignoreCookies[Ve](t)
       }


       function Io(e, t) {
           var n;
           if (e) n = e.getCookieMgr();
           else if (t) {
               var r = t[Me];
               n = r[ho] ? r[ho] : Ro(t)
           }
           return n || (n = function(e, t) {
               var n = Ro[ho] || xo[ho];
               return n || (n = Ro[ho] = Ro(e, t), xo[ho] = n), n
           }(t, (e || {})[we])), n
       }


       function Ro(e, t) {
           var n, r = function(e) {
                   var t = e[Me] = e[Me] || {};
                   if (Rn(t, "domain", e.cookieDomain, $t, Yt), Rn(t, "path", e.cookiePath || "/", null, Yt), Yt(t[vo])) {
                       var n = void 0;
                       Qt(e[po]) || (n = !e[po]), Qt(e[go]) || (n = !e[go]), t[vo] = n
                   }
                   return t
               }(e || xo),
               i = r.path || "/",
               o = r.domain,
               a = !1 !== r[vo],
               s = ((n = {
                   isEnabled: function() {
                       var e = a && To(t),
                           n = xo[ho];
                       return e && n && s !== n && (e = So(n)), e
                   }
               })[We] = function(e) {
                   a = !1 !== e
               }, n.set = function(e, t, n, a, c) {
                   var u, l = !1;
                   if (So(s) && ! function(e, t) {
                           return !!(t && e && cn(e.blockedCookies) && -1 !== e.blockedCookies[Ve](t)) || Co(e, t)
                       }(r, e)) {
                       var f = {},
                           d = mn(t || vt),
                           v = d[Ve](";");
                       if (-1 !== v && (d = mn(t[_e](0, v)), f = ko(t[_e](v + 1))), Rn(f, "domain", a || o, Pn, Qt), !Yt(n)) {
                           var p = Xr();
                           if (Qt(f[fo])) {
                               var g = Cn() + 1e3 * n;
                               if (g > 0) {
                                   var h = new Date;
                                   h.setTime(g), Rn(f, fo, Po(h, p ? co : uo) || Po(h, p ? co : uo) || vt, Pn)
                               }
                           }
                           p || Rn(f, "max-age", vt + n, null, Qt)
                       }
                       var m = Dr();
                       m && "https:" === m.protocol && (Rn(f, "secure", null, null, Qt), null === Ao && (u = (Ur() || {})[Oe], Ao = !(ln(u) && (sn(u, "CPU iPhone OS 12") || sn(u, "iPad; CPU OS 12") || sn(u, "Macintosh; Intel Mac OS X 10_14") && sn(u, "Version/") && sn(u, "Safari") || sn(u, "Macintosh; Intel Mac OS X 10_14") && an(u, "AppleWebKit/605.1.15 (KHTML, like Gecko)") || sn(u, "Chrome/5") || sn(u, "Chrome/6") || sn(u, "UnrealEngine") && !sn(u, "Chrome") || sn(u, "UCBrowser/12") || sn(u, "UCBrowser/11")))), Ao && Rn(f, "SameSite", "None", null, Qt)), Rn(f, "path", c || i, null, Qt), (r.setCookie || Fo)(e, Ho(d, f)), l = !0
                   }
                   return l
               }, n.get = function(e) {
                   var t = vt;
                   return So(s) && !Co(r, e) && (t = (r.getCookie || Uo)(e)), t
               }, n.del = function(e, t) {
                   var n = !1;
                   return So(s) && (n = s.purge(e, t)), n
               }, n.purge = function(e, n) {
                   var i, o = !1;
                   if (To(t)) {
                       var a = ((i = {})
                           .path = n || "/", i[fo] = "Thu, 01 Jan 1970 00:00:01 GMT", i);
                       Xr() || (a["max-age"] = "0"), (r.delCookie || Fo)(e, Ho(vt, a)), o = !0
                   }
                   return o
               }, n);
           return s[ho] = s, s
       }


       function To(e) {
           if (null === mo) {
               mo = !1;
               try {
                   mo = void 0 !== (yo || {})[lo]
               } catch (t) {
                   ni(e, 2, 68, "Cannot access document.cookie - " + In(t), {
                       exception: Lr(t)
                   })
               }
           }
           return mo
       }


       function ko(e) {
           var t = {};
           return e && e[ye] && pn(mn(e)[ze](";"), (function(e) {
               if (e = mn(e || vt)) {
                   var n = e[Ve]("="); - 1 === n ? t[e] = null : t[mn(e[_e](0, n))] = mn(e[_e](n + 1))
               }
           })), t
       }


       function Po(e, t) {
           return nn(e[t]) ? e[t]() : null
       }


       function Ho(e, t) {
           var n = e || vt;
           return on(t, (function(e, t) {
               n += "; " + e + (Yt(t) ? vt : "=" + t)
           })), n
       }


       function Uo(e) {
           var t = vt;
           if (yo) {
               var n = yo[lo] || vt;
               wo !== n && (bo = ko(n), wo = n), t = mn(bo[e] || vt)
           }
           return t
       }


       function Fo(e, t) {
           yo && (yo[lo] = e + "=" + t)
       }
       var Do = 4294967296,
           Eo = 4294967295,
           qo = !1,
           Ko = 123456789,
           Xo = 987654321;


       function No() {
           try {
               var e = 2147483647 & Cn();
               (t = (Math.random() * Do ^ e) + e) < 0 && (t >>>= 0), Ko = 123456789 + t & Eo, Xo = 987654321 - t & Eo, qo = !0
           } catch (e) {}
           var t
       }


       function Lo(e) {
           var t = 0,
               n = Ir("crypto") || Ir("msCrypto");
           return n && n.getRandomValues && (t = n.getRandomValues(new Uint32Array(1))[0] & Eo), 0 === t && Xr() && (qo || No(), t = function(e) {
               var t = ((Xo = 36969 * (65535 & Xo) + (Xo >> 16) & Eo) << 16) + (65535 & (Ko = 18e3 * (65535 & Ko) + (Ko >> 16) & Eo)) >>> 0 & Eo;
               return e || (t >>>= 0), t
           }() & Eo), 0 === t && (t = Math.floor(Do * Math.random() | 0)), e || (t >>>= 0), t
       }


       function jo(e) {
           void 0 === e && (e = 22);
           for (var t = Lo() >>> 0, n = 0, r = vt; r[ye] < e;) n++, r += "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".charAt(63 & t), t >>>= 6, 5 === n && (t = (Lo() << 2 & 4294967295 | 3 & t) >>> 0, n = 0);
           return r
       }
       var Bo = te,
           Mo = "2.8.18",
           Vo = "." + jo(6),
           _o = 0;


       function Oo(e) {
           return 1 === e[Ze] || 9 === e[Ze] || !+e[Ze]
       }


       function zo(e, t) {
           return void 0 === t && (t = !1), rn(e + _o++ + (t ? "." + Mo : vt) + Vo)
       }


       function Wo(e) {
           var t = {
               id: zo("_aiData-" + (e || vt) + "." + Mo),
               accept: function(e) {
                   return Oo(e)
               },
               get: function(e, n, r, i) {
                   var o = e[t.id];
                   return o ? o[rn(n)] : (i && ((o = function(e, t) {
                       var n = t[e.id];
                       if (!n) {
                           n = {};
                           try {
                               Oo(t) && (function(e, t, n) {
                                   if (Bo) try {
                                       return Bo(e, t, {
                                           value: n,
                                           enumerable: !1,
                                           configurable: !0
                                       }), !0
                                   } catch (e) {}
                                   return !1
                               }(t, e.id, n) || (t[e.id] = n))
                           } catch (e) {}
                       }
                       return n
                   }(t, e))[rn(n)] = r), r)
               },
               kill: function(e, t) {
                   if (e && e[t]) try {
                       delete e[t]
                   } catch (e) {}
               }
           };
           return t
       }
       var Go = "attachEvent",
           Zo = "addEventListener",
           Jo = "detachEvent",
           Qo = "removeEventListener",
           Yo = "events",
           $o = "visibilitychange",
           ea = "pagehide",
           ta = "unload",
           na = "beforeunload",
           ra = zo("aiEvtPageHide"),
           ia = (zo("aiEvtPageShow"), /\.[\.]+/g),
           oa = /[\.]+$/,
           aa = 1,
           sa = Wo("events"),
           ca = /^([^.]*)(?:\.(.+)|)/;


       function ua(e) {
           return e && e[Qe] ? e[Qe](/^[\s\.]+|(?=[\s\.])[\.\s]+$/g, vt) : e
       }


       function la(e, t) {
           var n;
           if (t) {
               var r = vt;
               cn(t) ? (r = vt, pn(t, (function(e) {
                   (e = ua(e)) && ("." !== e[0] && (e = "." + e), r += e)
               }))) : r = ua(t), r && ("." !== r[0] && (r = "." + r), e = (e || vt) + r)
           }
           var i = ca.exec(e || vt) || [];
           return (n = {})[nt] = i[1], n.ns = (i[2] || vt)
               .replace(ia, ".")
               .replace(oa, vt)[ze](".")
               .sort()
               .join("."), n
       }


       function fa(e, t, n) {
           void 0 === n && (n = !0);
           var r = sa.get(e, Yo, {}, n),
               i = r[t];
           return i || (i = r[t] = []), i
       }


       function da(e, t, n, r) {
           e && t && t[nt] && (e[Qo] ? e[Qo](t[nt], n, r) : e[Jo] && e[Jo]("on" + t[nt], n))
       }


       function va(e, t, n, r) {
           for (var i = t[ye]; i--;) {
               var o = t[i];
               o && (n.ns && n.ns !== o.evtName.ns || r && !r(o) || (da(e, o.evtName, o[rt], o.capture), t[Ue](i, 1)))
           }
       }


       function pa(e, t) {
           return t ? la("xx", cn(t) ? [e].concat(t) : [e, t])
               .ns[ze](".") : e
       }


       function ga(e, t, n, r, i) {
           var o;
           void 0 === i && (i = !1);
           var a = !1;
           if (e) try {
               var s = la(t, r);
               if (a = function(e, t, n, r) {
                       var i = !1;
                       return e && t && t[nt] && n && (e[Zo] ? (e[Zo](t[nt], n, r), i = !0) : e[Go] && (e[Go]("on" + t[nt], n), i = !0)), i
                   }(e, s, n, i), a && sa.accept(e)) {
                   var c = ((o = {
                       guid: aa++,
                       evtName: s
                   })[rt] = n, o.capture = i, o);
                   fa(e, s.type)[ge](c)
               }
           } catch (e) {}
           return a
       }


       function ha(e, t, n, r, i) {
           if (void 0 === i && (i = !1), e) try {
               var o = la(t, r),
                   a = !1;
               ! function(e, t, n) {
                   if (t[nt]) va(e, fa(e, t[nt]), t, n);
                   else {
                       var r = sa.get(e, Yo, {});
                       on(r, (function(r, i) {
                           va(e, i, t, n)
                       })), 0 === yn(r)[ye] && sa.kill(e, Yo)
                   }
               }(e, o, (function(e) {
                   return !((!o.ns || n) && e[rt] !== n || (a = !0, 0))
               })), a || da(e, o, n, i)
           } catch (e) {}
       }


       function ma(e, t, n, r) {
           var i = !1;
           return t && e && e[ye] > 0 && pn(e, (function(e) {
               e && (n && -1 !== gn(n, e) || (i = function(e, t, n) {
                   var r = !1,
                       i = Tr();
                   i && (r = ga(i, e, t, n), r = ga(i.body, e, t, n) || r);
                   var o = Pr();
                   return o && (r = ga(o, e, t, n) || r), r
               }(e, t, r) || i))
           })), i
       }


       function Aa(e, t, n) {
           e && cn(e) && pn(e, (function(e) {
               e && function(e, t, n) {
                   var r = Tr();
                   r && (ha(r, e, t, n), ha(r.body, e, t, n));
                   var i = Pr();
                   i && ha(i, e, t, n)
               }(e, t, n)
           }))
       }


       function wa(e, t, n) {
           var r = pa(ra, n),
               i = ma([ea], e, t, r);
           return t && -1 !== gn(t, $o) || (i = ma([$o], (function(t) {
               var n = Pr();
               e && n && "hidden" === n.visibilityState && e(t)
           }), t, r) || i), !i && t && (i = wa(e, null, n)), i
       }


       function ya() {
           for (var e, t = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "a", "b", "c", "d", "e", "f"], n = vt, r = 0; r < 4; r++) n += t[15 & (e = Lo())] + t[e >> 4 & 15] + t[e >> 8 & 15] + t[e >> 12 & 15] + t[e >> 16 & 15] + t[e >> 20 & 15] + t[e >> 24 & 15] + t[e >> 28 & 15];
           var i = t[8 + (3 & Lo()) | 0];
           return n[Ge](0, 8) + n[Ge](9, 4) + "4" + n[Ge](13, 3) + i + n[Ge](16, 3) + n[Ge](19, 12)
       }
       var ba = "00",
           xa = "00000000000000000000000000000000",
           Sa = "0000000000000000";


       function Ca(e, t, n) {
           return !(!e || e[ye] !== t || e === n || !e.match(/^[\da-f]*$/i))
       }


       function Ia(e, t, n) {
           return Ca(e, t) ? e : n
       }


       function Ra(e, t, n, r) {
           var i;
           return (i = {})[dt] = Ca(r, 2, "ff") ? r : ba, i[ut] = Ta(e) ? e : ya(), i.spanId = ka(t) ? t : ya()[Ge](0, 16), i.traceFlags = n >= 0 && n <= 255 ? n : 1, i
       }


       function Ta(e) {
           return Ca(e, 32, xa)
       }


       function ka(e) {
           return Ca(e, 16, Sa)
       }


       function Pa(e) {
           if (e) {
               var t = function(e) {
                   (isNaN(e) || e < 0 || e > 255) && (e = 1);
                   for (var t = e.toString(16); t[ye] < 2;) t = "0" + t;
                   return t
               }(e[ft]);
               Ca(t, 2) || (t = "01");
               var n = e[dt] || ba;
               return "00" !== n && "ff" !== n && (n = ba), "".concat(n.toLowerCase(), "-")
                   .concat(Ia(e.traceId, 32, xa)
                       .toLowerCase(), "-")
                   .concat(Ia(e.spanId, 16, Sa)
                       .toLowerCase(), "-")
                   .concat(t.toLowerCase())
           }
           return ""
       }


       function Ha(e) {
           var t = null;
           if (nn(Event)) t = new Event(e);
           else {
               var n = Pr();
               n && n.createEvent && (t = n.createEvent("Event"))
                   .initEvent(e, !0, !0)
           }
           return t
       }
       var Ua, Fa = (Ua = {}, on({
               requestContextHeader: [0, "Request-Context"],
               requestContextTargetKey: [1, "appId"],
               requestContextAppIdFormat: [2, "appId=cid-v1:"],
               requestIdHeader: [3, "Request-Id"],
               traceParentHeader: [4, "traceparent"],
               traceStateHeader: [5, "tracestate"],
               sdkContextHeader: [6, "Sdk-Context"],
               sdkContextHeaderAppIdRequest: [7, "appId"],
               requestContextHeaderLowerCase: [8, "request-context"]
           }, (function(e, t) {
               Ua[e] = t[1], Ua[t[0]] = t[1]
           })), xn(Ua)),
           Da = Pr() || {},
           Ea = 0,
           qa = [null, null, null, null, null];


       function Ka(e) {
           var t = Ea,
               n = qa,
               r = n[t];
           return Da.createElement ? n[t] || (r = n[t] = Da.createElement("a")) : r = {
               host: Xa(e, !0)
           }, r.href = e, ++t >= n[Xn] && (t = 0), Ea = t, r
       }


       function Xa(e, t) {
           var n = Na(e, t) || "";
           if (n) {
               var r = n.match(/(www\d{0,5}\.)?([^\/:]{1,256})(:\d{1,20})?/i);
               if (null != r && r[Xn] > 3 && ln(r[2]) && r[2][Xn] > 0) return r[2] + (r[3] || "")
           }
           return n
       }


       function Na(e, t) {
           var n = null;
           if (e) {
               var r = e.match(/(\w{1,150}):\/\/([^\/:]{1,256})(:\d{1,20})?/i);
               if (null != r && r[Xn] > 2 && ln(r[2]) && r[2][Xn] > 0 && (n = r[2] || "", t && r[Xn] > 2)) {
                   var i = (r[1] || "")[Nn](),
                       o = r[3] || "";
                   ("http" === i && ":80" === o || "https" === i && ":443" === o) && (o = ""), n += o
               }
           }
           return n
       }
       var La = [Ci + Ii, "https://breeze.aimon.applicationinsights.io" + Ii, "https://dc-int.services.visualstudio.com" + Ii];


       function ja(e) {
           return -1 !== gn(La, e[Nn]())
       }
       var Ba = {
           correlationIdPrefix: "cid-v1:",
           canIncludeCorrelationHeader: function(e, t, n) {
               if (!t || e && e.disableCorrelationHeaders) return !1;
               if (e && e[zn])
                   for (var r = 0; r < e.correlationHeaderExcludePatterns[Xn]; r++)
                       if (e[zn][r].test(t)) return !1;
               var i = Ka(t)
                   .host[Nn]();
               if (!i || -1 === i[Wn](":443") && -1 === i[Wn](":80") || (i = (Na(t, !0) || "")[Nn]()), (!e || !e.enableCorsCorrelation) && i && i !== n) return !1;
               var o, a = e && e.correlationHeaderDomains;
               if (a && (pn(a, (function(e) {
                       var t = new RegExp(e.toLowerCase()
                           .replace(/\\/g, "\\\\")
                           .replace(/\./g, "\\.")
                           .replace(/\*/g, ".*"));
                       o = o || t.test(i)
                   })), !o)) return !1;
               var s = e && e.correlationHeaderExcludedDomains;
               if (!s || 0 === s[Xn]) return !0;
               for (r = 0; r < s[Xn]; r++)
                   if (new RegExp(s[r].toLowerCase()
                           .replace(/\\/g, "\\\\")
                           .replace(/\./g, "\\.")
                           .replace(/\*/g, ".*"))
                       .test(i)) return !1;
               return i && i[Xn] > 0
           },
           getCorrelationContext: function(e) {
               if (e) {
                   var t = Ba.getCorrelationContextValue(e, Fa[1]);
                   if (t && t !== Ba.correlationIdPrefix) return t
               }
           },
           getCorrelationContextValue: function(e, t) {
               if (e)
                   for (var n = e[Kn](","), r = 0; r < n[Xn]; ++r) {
                       var i = n[r][Kn]("=");
                       if (2 === i[Xn] && i[0] === t) return i[1]
                   }
           }
       };


       function Ma() {
           var e = Er();
           if (e && e.now && e.timing) {
               var t = e.now() + e.timing.navigationStart;
               if (t > 0) return t
           }
           return Cn()
       }


       function Va(e, t) {
           var n = null;
           return 0 === e || 0 === t || Yt(e) || Yt(t) || (n = t - e), n
       }


       function _a(e, t) {
           var n = e || {};
           return {
               getName: function() {
                   return n[Mn]
               },
               setName: function(e) {
                   t && t.setName(e), n[Mn] = e
               },
               getTraceId: function() {
                   return n.traceID
               },
               setTraceId: function(e) {
                   t && t.setTraceId(e), Ta(e) && (n.traceID = e)
               },
               getSpanId: function() {
                   return n.parentID
               },
               setSpanId: function(e) {
                   t && t.setSpanId(e), ka(e) && (n.parentID = e)
               },
               getTraceFlags: function() {
                   return n.traceFlags
               },
               setTraceFlags: function(e) {
                   t && t.setTraceFlags(e), n.traceFlags = e
               }
           }
       }
       var Oa = function() {
               function e(e, t, n, r, i, o, a, s, c, u, l, f) {
                   void 0 === c && (c = "Ajax"), this.aiDataContract = {
                       id: 1,
                       ver: 1,
                       name: 0,
                       resultCode: 0,
                       duration: 0,
                       success: 0,
                       data: 0,
                       target: 0,
                       type: 0,
                       properties: 0,
                       measurements: 0,
                       kind: 0,
                       value: 0,
                       count: 0,
                       min: 0,
                       max: 0,
                       stdDev: 0,
                       dependencyKind: 0,
                       dependencySource: 0,
                       commandName: 0,
                       dependencyTypeName: 0
                   };
                   var d = this;
                   d.ver = 2, d.id = t, d[lr] = pr(i), d.success = o, d.resultCode = a + "", d.type = Hi(e, c);
                   var v = function(e, t, n, r) {
                       var i, o = r,
                           a = r;
                       if (t && t[Xn] > 0) {
                           var s = Ka(t);
                           if (i = s.host, !o)
                               if (null != s[On]) {
                                   var c = 0 === s.pathname[Xn] ? "/" : s[On];
                                   "/" !== c.charAt(0) && (c = "/" + c), a = s[On], o = Hi(e, n ? n + " " + c : c)
                               } else o = Hi(e, t)
                       } else i = r, o = r;
                       return {
                           target: i,
                           name: o,
                           data: a
                       }
                   }(e, n, s, r);
                   d.data = Ui(e, r) || v.data, d.target = Hi(e, v.target), u && (d.target = "".concat(d.target, " | ")
                       .concat(u)), d[Mn] = Hi(e, v[Mn]), d[Jn] = Ei(e, l), d[Qn] = qi(e, f)
               }
               return e.envelopeType = "Microsoft.ApplicationInsights.{0}.RemoteDependency", e.dataType = "RemoteDependencyData", e
           }(),
           za = "ctx",
           Wa = "ParentContextKey",
           Ga = "ChildrenContextKey",
           Za = function() {
               function e(t, n, r) {
                   var i, o = this,
                       a = !1;
                   o.start = Cn(), o[de] = t, o[qe] = r, o[ot] = function() {
                       return !1
                   }, nn(n) && (a = bn(o, "payload", (function() {
                       return !i && nn(n) && (i = n(), n = null), i
                   }))), o[at] = function(t) {
                       return t ? t === e[Wa] || t === e[Ga] ? o[t] : (o[za] || {})[t] : null
                   }, o[st] = function(t, n) {
                       t && (t === e[Wa] ? (o[t] || (o[ot] = function() {
                           return !0
                       }), o[t] = n) : t === e[Ga] ? o[t] = n : (o[za] = o[za] || {})[t] = n)
                   }, o[ct] = function() {
                       var t = 0,
                           r = o[at](e[Ga]);
                       if (cn(r))
                           for (var i = 0; i < r[ye]; i++) {
                               var s = r[i];
                               s && (t += s[be])
                           }
                       o[be] = Cn() - o.start, o.exTime = o[be] - t, o[ct] = function() {}, !a && nn(n) && (o.payload = n())
                   }
               }
               return e.ParentContextKey = "parent", e.ChildrenContextKey = "childEvts", e
           }(),
           Ja = function() {
               function e(t) {
                   this.ctx = {}, O(e, this, (function(e) {
                       e.create = function(e, t, n) {
                           return new Za(e, t, n)
                       }, e.fire = function(e) {
                           e && (e[ct](), t && nn(t[Ct]) && t[Ct](e))
                       }, e[st] = function(t, n) {
                           t && ((e[za] = e[za] || {})[t] = n)
                       }, e[at] = function(t) {
                           return (e[za] || {})[t]
                       }
                   }))
               }
               return e.__ieDyn = 1, e
           }(),
           Qa = "CoreUtils.doPerf";


       function Ya(e, t, n, r, i) {
           if (e) {
               var o = e;
               if (o[Tt] && (o = o[Tt]()), o) {
                   var a = void 0,
                       s = o[at](Qa);
                   try {
                       if (a = o.create(t(), r, i)) {
                           if (s && a[st] && (a[st](Za[Wa], s), s[at] && s[st])) {
                               var c = s[at](Za[Ga]);
                               c || (c = [], s[st](Za[Ga], c)), c[ge](a)
                           }
                           return o[st](Qa, a), n(a)
                       }
                   } catch (e) {
                       a && a[st] && a[st]("exception", e)
                   } finally {
                       a && o.fire(a), o[st](Qa, s)
                   }
               }
           }
           return n()
       }
       var $a = Wo("plugin");


       function es(e) {
           return $a.get(e, "state", {}, !0)
       }


       function ts(e, t) {
           for (var n, r = [], i = null, o = e[Ne](); o;) {
               var a = o[ke]();
               a && (i && nn(i[je]) && nn(a[wt]) && i[je](a), (nn(a[he]) ? a[he]() : (n = es(a))[he]) || r[ge](a), i = a, o = o[Ne]())
           }
           pn(r, (function(r) {
               var i = e[gt]();
               r[fe](e.getCfg(), i, t, e[Ne]()), n = es(r), r[gt] || n[gt] || (n[gt] = i), n[he] = !0, delete n[Fe]
           }))
       }


       function ns(e) {
           return e.sort((function(e, t) {
               var n = 0;
               if (t) {
                   var r = nn(t[wt]);
                   nn(e[wt]) ? n = r ? e[yt] - t[yt] : 1 : r && (n = -1)
               } else n = e ? 1 : -1;
               return n
           }))
       }
       var rs = "_hasRun",
           is = "_getTelCtx",
           os = 0;


       function as(e, t, n, r) {
           var i = null,
               o = [];
           null !== r && (i = r ? function(e, t, n) {
               for (; e;) {
                   if (e[ke]() === n) return e;
                   e = e[Ne]()
               }
               return ls([n], t[me] || {}, t)
           }(e, n, r) : e);
           var a = {
               _next: function() {
                   var e = i;
                   if (i = e ? e[Ne]() : null, !e) {
                       var t = o;
                       t && t[ye] > 0 && (pn(t, (function(e) {
                           try {
                               e.func[tt](e.self, e.args)
                           } catch (e) {
                               ni(n[we], 2, 73, "Unexpected Exception during onComplete - " + Lr(e))
                           }
                       })), o = [])
                   }
                   return e
               },
               ctx: {
                   core: function() {
                       return n
                   },
                   diagLog: function() {
                       return $r(n, t)
                   },
                   getCfg: function() {
                       return t
                   },
                   getExtCfg: s,
                   getConfig: function(e, n, r) {
                       void 0 === r && (r = !1);
                       var i, o = s(e, null);
                       return o && !Yt(o[n]) ? i = o[n] : t && !Yt(t[n]) && (i = t[n]), Yt(i) ? r : i
                   },
                   hasNext: function() {
                       return !!i
                   },
                   getNext: function() {
                       return i
                   },
                   setNext: function(e) {
                       i = e
                   },
                   iterate: function(e) {
                       for (var t; t = a._next();) {
                           var n = t[ke]();
                           n && e(n)
                       }
                   },
                   onComplete: function(e, t) {
                       for (var n = [], r = 2; r < arguments.length; r++) n[r - 2] = arguments[r];
                       e && o[ge]({
                           func: e,
                           self: Qt(t) ? a.ctx : t,
                           args: n
                       })
                   }
               }
           };


           function s(e, n, r) {
               var i;
               if (void 0 === n && (n = {}), void 0 === r && (r = 0), t) {
                   var o = t[At];
                   o && e && (i = o[e])
               }
               if (i) {
                   if (tn(n) && 0 !== r) {
                       var a = qn(!0, n, i);
                       t && 2 === r && on(n, (function(e) {
                           if (Yt(a[e])) {
                               var n = t[e];
                               Yt(n) || (a[e] = n)
                           }
                       })), i = a
                   }
               } else i = n;
               return i
           }
           return a
       }


       function ss(e, t, n, r) {
           var i = as(e, t, n, r),
               o = i.ctx;
           return o[xe] = function(e) {
               var t = i._next();
               return t && t[wt](e, o), !t
           }, o[Be] = function(e, r) {
               return void 0 === e && (e = null), cn(e) && (e = ls(e, t, n, r)), ss(e || o[Ne](), t, n, r)
           }, o
       }


       function cs(e, t, n) {
           var r = t[me] || {},
               i = as(e, r, t, n),
               o = i.ctx;
           return o[xe] = function(e) {
               var t = i._next();
               return t && t.unload(o, e), !t
           }, o[Be] = function(e, n) {
               return void 0 === e && (e = null), cn(e) && (e = ls(e, r, t, n)), cs(e || o[Ne](), t, n)
           }, o
       }


       function us(e, t, n) {
           var r = t[me] || {},
               i = as(e, r, t, n)
               .ctx;
           return i[xe] = function(e) {
               return i.iterate((function(t) {
                   nn(t[Xe]) && t[Xe](i, e)
               }))
           }, i[Be] = function(e, n) {
               return void 0 === e && (e = null), cn(e) && (e = ls(e, r, t, n)), us(e || i[Ne](), t, n)
           }, i
       }


       function ls(e, t, n, r) {
           var i = null,
               o = !r;
           if (cn(e) && e[ye] > 0) {
               var a = null;
               pn(e, (function(e) {
                   if (o || r !== e || (o = !0), o && e && nn(e[wt])) {
                       var s = function(e, t, n) {
                           var r, i = null,
                               o = nn(e[wt]),
                               a = nn(e[je]),
                               s = {
                                   getPlugin: function() {
                                       return e
                                   },
                                   getNext: function() {
                                       return i
                                   },
                                   processTelemetry: function(r, u) {
                                       c(u = u || function() {
                                           var r;
                                           return e && nn(e[is]) && (r = e[is]()), r || (r = ss(s, t, n)), r
                                       }(), (function(t) {
                                           if (!e || !o) return !1;
                                           var n = es(e);
                                           return !n[Fe] && !n[mt] && (a && e[je](i), e[wt](r, t), !0)
                                       }), "processTelemetry", (function() {
                                           return {
                                               item: r
                                           }
                                       }), !r.sync) || u[xe](r)
                                   },
                                   unload: function(t, n) {
                                       c(t, (function() {
                                           var r = !1;
                                           if (e) {
                                               var i = es(e),
                                                   o = e[gt] || i[gt];
                                               !e || o && o !== t.core() || i[Fe] || (i[gt] = null, i[Fe] = !0, i[he] = !1, e[Fe] && !0 === e[Fe](t, n) && (r = !0))
                                           }
                                           return r
                                       }), "unload", (function() {}), n[qe]) || t[xe](n)
                                   },
                                   update: function(t, n) {
                                       c(t, (function() {
                                           var r = !1;
                                           if (e) {
                                               var i = es(e),
                                                   o = e[gt] || i[gt];
                                               !e || o && o !== t.core() || i[Fe] || e[Xe] && !0 === e[Xe](t, n) && (r = !0)
                                           }
                                           return r
                                       }), "update", (function() {}), !1) || t[xe](n)
                                   },
                                   _id: r = e ? e[pe] + "-" + e[yt] + "-" + os++ : "Unknown-0-" + os++,
                                   _setNext: function(e) {
                                       i = e
                                   }
                               };


                           function c(t, n, o, a, s) {
                               var c = !1,
                                   u = e ? e[pe] : "TelemetryPluginChain",
                                   l = t[rs];
                               return l || (l = t[rs] = {}), t.setNext(i), e && Ya(t[gt](), (function() {
                                   return u + ":" + o
                               }), (function() {
                                   l[r] = !0;
                                   try {
                                       var e = i ? i._id : vt;
                                       e && (l[e] = !1), c = n(t)
                                   } catch (e) {
                                       var a = !i || l[i._id];
                                       a && (c = !0), i && a || ni(t[Le](), 1, 73, "Plugin [" + u + "] failed during " + o + " - " + Lr(e) + ", run flags: " + Lr(l))
                                   }
                               }), a, s), c
                           }
                           return Sn(s)
                       }(e, t, n);
                       i || (i = s), a && a._setNext(s), a = s
                   }
               }))
           }
           return r && !i ? ls([r], t, n) : i
       }
       var fs = "_aiHooks",
           ds = ["req", "rsp", "hkErr", "fnErr"];


       function vs(e, t) {
           if (e)
               for (var n = 0; n < e[ye] && !t(e[n], n); n++);
       }


       function ps(e, t, n, r, i) {
           i >= 0 && i <= 2 && vs(e, (function(e, o) {
               var a = e.cbks,
                   s = a[ds[i]];
               if (s) {
                   t.ctx = function() {
                       return r[o] = r[o] || {}
                   };
                   try {
                       s[Je](t.inst, n)
                   } catch (e) {
                       var c = t.err;
                       try {
                           var u = a[ds[2]];
                           u && (t.err = e, u[Je](t.inst, n))
                       } catch (e) {} finally {
                           t.err = c
                       }
                   }
               }
           }))
       }


       function gs(e, t, n, r) {
           var i = null;
           return e && (en(e, t) ? i = e : n && (i = gs(Jt(e), t, r, !1))), i
       }


       function hs(e, t, n, r) {
           var i = n && n[fs];
           if (!i) {
               var o = function(e) {
                   return function() {
                       var t, n = arguments,
                           r = e.h,
                           i = ((t = {})[de] = e.n, t.inst = this, t.ctx = null, t.set = function(e, t) {
                               (n = s([], n))[e] = t, a = s([i], n)
                           }, t),
                           o = [],
                           a = s([i], n);


                       function s(e, t) {
                           return vs(t, (function(t) {
                               e[ge](t)
                           })), e
                       }
                       i.evt = Ir("event"), ps(r, i, a, o, 0);
                       var c = e.f;
                       if (c) try {
                           i.rslt = c[Je](this, n)
                       } catch (e) {
                           throw i.err = e, ps(r, i, a, o, 3), e
                       }
                       return ps(r, i, a, o, 1), i.rslt
                   }
               }(i = {
                   i: 0,
                   n: t,
                   f: n,
                   h: []
               });
               o[fs] = i, e[t] = o
           }
           var a = {
               id: i.i,
               cbks: r,
               rm: function() {
                   var e = this.id;
                   vs(i.h, (function(t, n) {
                       if (t.id === e) return i.h[Ue](n, 1), 1
                   }))
               }
           };
           return i.i++, i.h[ge](a), a
       }


       function ms(e, t, n, r, i) {
           if (void 0 === r && (r = !0), e && t && n) {
               var o = gs(e, t, r, i);
               if (o) {
                   var a = o[t];
                   if (typeof a === z) return hs(o, t, a, n)
               }
           }
           return null
       }


       function As(e, t, n, r, i) {
           if (e && t && n) {
               var o = gs(e, t, r, i) || e;
               if (o) return hs(o, t, o[t], n)
           }
           return null
       }


       function ws() {
           var e = [];
           return {
               add: function(t) {
                   t && e[ge](t)
               },
               run: function(t, n) {
                   pn(e, (function(e) {
                       try {
                           e(t, n)
                       } catch (e) {
                           ni(t[Le](), 2, 73, "Unexpected error calling unload handler - " + Lr(e))
                       }
                   })), e = []
               }
           }
       }
       var ys = "getPlugin",
           bs = function() {
               function e() {
                   var t, n, r, i, o, a = this;


                   function s(e) {
                       void 0 === e && (e = null);
                       var t = e;
                       if (!t) {
                           var i = n || ss(null, {}, a[gt]);
                           t = r && r[ys] ? i[Be](null, r[ys]) : i[Be](null, r)
                       }
                       return t
                   }


                   function c(e, t, i) {
                       e && Rn(e, At, [], null, Yt), !i && t && (i = t[Se]()[Ne]());
                       var o = r;
                       r && r[ys] && (o = r[ys]()), a[gt] = t, n = ss(i, e, t, o)
                   }


                   function u() {
                       t = !1, a[gt] = null, n = null, r = null, o = [], i = ws()
                   }
                   u(), O(e, a, (function(e) {
                       e[fe] = function(e, n, r, i) {
                           c(e, n, i), t = !0
                       }, e[Fe] = function(t, n) {
                           var a, s = e[gt];
                           if (s && (!t || s === t[gt]())) {
                               var c, l = !1,
                                   f = t || cs(null, s, r && r[ys] ? r[ys]() : r),
                                   d = n || ((a = {
                                       reason: 0
                                   })[qe] = !1, a);
                               return e[Ke] && !0 === e[Ke](f, d, v) ? c = !0 : v(), c
                           }


                           function v() {
                               if (!l) {
                                   l = !0, i.run(f, n);
                                   var e = o;
                                   o = [], pn(e, (function(e) {
                                       e.rm()
                                   })), !0 === c && f[xe](d), u()
                               }
                           }
                       }, e[Xe] = function(t, n) {
                           var i = e[gt];
                           if (i && (!t || i === t[gt]())) {
                               var o, a = !1,
                                   s = t || us(null, i, r && r[ys] ? r[ys]() : r),
                                   u = n || {
                                       reason: 0
                                   };
                               return e._doUpdate && !0 === e._doUpdate(s, u, l) ? o = !0 : l(), o
                           }


                           function l() {
                               a || (a = !0, c(s.getCfg(), s.core(), s[Ne]()))
                           }
                       }, e._addHook = function(e) {
                           e && (cn(e) ? o = o.concat(e) : o[ge](e))
                       }, Fn(e, "_addUnloadCb", (function() {
                           return i
                       }), "add")
                   })), a[Le] = function(e) {
                       return s(e)[Le]()
                   }, a[he] = function() {
                       return t
                   }, a.setInitialized = function(e) {
                       t = e
                   }, a[je] = function(e) {
                       r = e
                   }, a[xe] = function(e, t) {
                       t ? t[xe](e) : r && nn(r[wt]) && r[wt](e, null)
                   }, a._getTelCtx = s
               }
               return e.__ieDyn = 1, e
           }(),
           xs = "toString",
           Ss = "disableExceptionTracking",
           Cs = "autoTrackPageVisitTime",
           Is = "overridePageViewDuration",
           Rs = "enableUnhandledPromiseRejectionTracking",
           Ts = "samplingPercentage",
           ks = "isStorageUseDisabled",
           Ps = "isBrowserLinkTrackingEnabled",
           Hs = "enableAutoRouteTracking",
           Us = "namePrefix",
           Fs = "disableFlushOnBeforeUnload",
           Ds = "core",
           Es = "dataType",
           qs = "envelopeType",
           Ks = "diagLog",
           Xs = "track",
           Ns = "trackPageView",
           Ls = "trackPreviousPageVisit",
           js = "sendPageViewInternal",
           Bs = "sendPageViewPerformanceInternal",
           Ms = "populatePageViewPerformanceEvent",
           Vs = "href",
           _s = "sendExceptionInternal",
           Os = "exception",
           zs = "error",
           Ws = "_onerror",
           Gs = "errorSrc",
           Zs = "lineNumber",
           Js = "columnNumber",
           Qs = "message",
           Ys = "CreateAutoException",
           $s = "addTelemetryInitializer",
           ec = "duration",
           tc = "length",
           nc = "isPerformanceTimingSupported",
           rc = "getPerformanceTiming",
           ic = "navigationStart",
           oc = "shouldCollectDuration",
           ac = "isPerformanceTimingDataReady",
           sc = "responseStart",
           cc = "loadEventEnd",
           uc = "responseEnd",
           lc = "connectEnd",
           fc = "pageVisitStartTime",
           dc = null,
           vc = function() {
               function e(t, n, r, i) {
                   O(e, this, (function(e) {
                       var o, a = null,
                           s = [],
                           c = !1;


                       function u(e) {
                           r && r.flush(e)
                       }


                       function l() {
                           a || (a = setTimeout((function() {
                               a = null;
                               var e = s.slice(0),
                                   t = !1;
                               s = [], pn(e, (function(e) {
                                   e() ? t = !0 : s.push(e)
                               })), s[tc] > 0 && l(), t && u(!0)
                           }), 100))
                       }


                       function f(e) {
                           s.push(e), l()
                       }
                       r && (o = r.logger), e[Ns] = function(e, r) {
                           var a = e.name;
                           if (Yt(a) || "string" != typeof a) {
                               var s = Pr();
                               a = e.name = s && s.title || ""
                           }
                           var l = e.uri;
                           if (Yt(l) || "string" != typeof l) {
                               var d = Dr();
                               l = e.uri = d && d[Vs] || ""
                           }
                           if (!i[nc]()) return t[js](e, r), u(!0), void(function() {
                               if (null == dc) try {
                                   dc = !!(self && self instanceof WorkerGlobalScope)
                               } catch (e) {
                                   dc = !1
                               }
                               return dc
                           }() || ni(o, 2, 25, "trackPageView: navigation timing API used for calculation of page duration is not supported in this browser. This page view will be collected without duration and timing info."));
                           var v, p, g = !1,
                               h = i[rc]()[ic];
                           h > 0 && (v = Va(h, +new Date), i[oc](v) || (v = void 0)), Yt(r) || Yt(r[ec]) || (p = r[ec]), !n && isNaN(p) || (isNaN(p) && (r || (r = {}), r[ec] = v), t[js](e, r), u(!0), g = !0), r || (r = {}), f((function() {
                               var n = !1;
                               try {
                                   if (i[ac]()) {
                                       n = !0;
                                       var s = {
                                           name: a,
                                           uri: l
                                       };
                                       i[Ms](s), s.isValid || g ? (g || (r[ec] = s.durationMs, t[js](e, r)), c || (t[Bs](s, r), c = !0)) : (r[ec] = v, t[js](e, r))
                                   } else h > 0 && Va(h, +new Date) > 6e4 && (n = !0, g || (r[ec] = 6e4, t[js](e, r)))
                               } catch (e) {
                                   ni(o, 1, 38, "trackPageView failed on page load calculation: " + In(e), {
                                       exception: Lr(e)
                                   })
                               }
                               return n
                           }))
                       }, e.teardown = function(e, t) {
                           if (a) {
                               clearTimeout(a), a = null;
                               var n = s.slice(0);
                               s = [], pn(n, (function(e) {
                                   e()
                               }))
                           }
                       }
                   }))
               }
               return e.__ieDyn = 1, e
           }(),
           pc = ["googlebot", "adsbot-google", "apis-google", "mediapartners-google"];


       function gc() {
           var e = Er();
           return e && !!e.timing
       }


       function hc() {
           var e = Er(),
               t = e ? e.timing : 0;
           return t && t.domainLookupStart > 0 && t[ic] > 0 && t[sc] > 0 && t.requestStart > 0 && t[cc] > 0 && t[uc] > 0 && t[lc] > 0 && t.domLoading > 0
       }


       function mc() {
           return gc() ? Er()
               .timing : null
       }


       function Ac() {
           for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
           var n = (Ur() || {})
               .userAgent,
               r = !1;
           if (n)
               for (var i = 0; i < pc[tc]; i++) r = r || -1 !== n.toLowerCase()
                   .indexOf(pc[i]);
           if (r) return !1;
           for (i = 0; i < e[tc]; i++)
               if (e[i] < 0 || e[i] >= 36e5) return !1;
           return !0
       }
       var wc = function() {
               function e(t) {
                   var n = $r(t);
                   O(e, this, (function(e) {
                       e[Ms] = function(t) {
                           t.isValid = !1;
                           var r, i = (r = Er()) && r.getEntriesByType && r.getEntriesByType("navigation")[tc] > 0 ? Er()
                               .getEntriesByType("navigation")[0] : null,
                               o = mc(),
                               a = 0,
                               s = 0,
                               c = 0,
                               u = 0,
                               l = 0;
                           (i || o) && (i ? (a = i[ec], s = 0 === i.startTime ? i[lc] : Va(i.startTime, i[lc]), c = Va(i.requestStart, i[sc]), u = Va(i[sc], i[uc]), l = Va(i.responseEnd, i[cc])) : (a = Va(o[ic], o[cc]), s = Va(o[ic], o[lc]), c = Va(o.requestStart, o[sc]), u = Va(o[sc], o[uc]), l = Va(o.responseEnd, o[cc])), 0 === a ? ni(n, 2, 10, "error calculating page view performance.", {
                               total: a,
                               network: s,
                               request: c,
                               response: u,
                               dom: l
                           }) : e[oc](a, s, c, u, l) ? a < Math.floor(s) + Math.floor(c) + Math.floor(u) + Math.floor(l) ? ni(n, 2, 8, "client performance math error.", {
                               total: a,
                               network: s,
                               request: c,
                               response: u,
                               dom: l
                           }) : (t.durationMs = a, t.perfTotal = t[ec] = pr(a), t.networkConnect = pr(s), t.sentRequest = pr(c), t.receivedResponse = pr(u), t.domProcessing = pr(l), t.isValid = !0) : ni(n, 2, 45, "Invalid page load duration value. Browser perf data won't be sent.", {
                               total: a,
                               network: s,
                               request: c,
                               response: u,
                               dom: l
                           }))
                       }, e[rc] = mc, e[nc] = gc, e[ac] = hc, e[oc] = Ac
                   }))
               }
               return e.__ieDyn = 1, e
           }(),
           yc = function() {
               function e(t, n) {
                   var r = "prevPageVisitData";
                   O(e, this, (function(e) {
                       e[Ls] = function(e, i) {
                           try {
                               var o = function(e, n) {
                                   var i = null;
                                   try {
                                       i = function() {
                                               var e = null;
                                               try {
                                                   if (pi()) {
                                                       var n = Cn(),
                                                           i = gi(t, r);
                                                       i && qr() && ((e = Kr()
                                                               .parse(i))
                                                           .pageVisitTime = n - e[fc],
                                                           function(e, t) {
                                                               var n = fi();
                                                               if (null !== n) try {
                                                                   return n[Bn](t), !0
                                                               } catch (t) {
                                                                   si = !1, ni(e, 2, 6, "Browser failed removal of session storage item. " + In(t), {
                                                                       exception: Lr(t)
                                                                   })
                                                               }
                                                           }(t, r))
                                                   }
                                               } catch (n) {
                                                   ri(t, "Stop page visit timer failed: " + Lr(n)), e = null
                                               }
                                               return e
                                           }(),
                                           function(e, n) {
                                               try {
                                                   if (pi()) {
                                                       null != gi(t, r) && Hn("Cannot call startPageVisit consecutively without first calling stopPageVisit");
                                                       var i = new bc(e, n),
                                                           o = Kr()
                                                           .stringify(i);
                                                       hi(t, r, o)
                                                   }
                                               } catch (e) {
                                                   ri(t, "Call to start failed: " + Lr(e))
                                               }
                                           }(e, n)
                                   } catch (e) {
                                       ri(t, "Call to restart failed: " + Lr(e)), i = null
                                   }
                                   return i
                               }(e, i);
                               o && n(o.pageName, o.pageUrl, o.pageVisitTime)
                           } catch (e) {
                               ri(t, "Auto track page visit time failed, metric will not be collected: " + Lr(e))
                           }
                       }, bn(e, "_logger", (function() {
                           return t
                       })), bn(e, "pageVisitTimeTrackingHandler", (function() {
                           return n
                       }))
                   }))
               }
               return e.__ieDyn = 1, e
           }(),
           bc = function(e, t) {
               this[fc] = Cn(), this.pageName = e, this.pageUrl = t
           },
           xc = function(e, t) {
               var n = this,
                   r = {};
               n.start = function(t) {
                   void 0 !== r[t] && ni(e, 2, 62, "start was called more than once for this event without calling stop.", {
                       name: t,
                       key: t
                   }, !0), r[t] = +new Date
               }, n.stop = function(t, i, o, a) {
                   var s = r[t];
                   if (isNaN(s)) ni(e, 2, 63, "stop was called without a corresponding start.", {
                       name: t,
                       key: t
                   }, !0);
                   else {
                       var c = Va(s, +new Date);
                       n.action(t, i, c, o, a)
                   }
                   delete r[t], r[t] = void 0
               }
           };


       function Sc(e, t) {
           e && e.dispatchEvent && t && e.dispatchEvent(t)
       }


       function Cc(e, t) {
           return (e = e || t) < 6e4 && (e = 6e4), e
       }


       function Ic(e) {
           return e || (e = {}), e.sessionRenewalMs = Cc(e.sessionRenewalMs, 18e5), e.sessionExpirationMs = Cc(e.sessionExpirationMs, 864e5), e[Ss] = vr(e[Ss]), e[Cs] = vr(e[Cs]), e[Is] = vr(e[Is]), e[Rs] = vr(e[Rs]), (isNaN(e[Ts]) || e[Ts] <= 0 || e[Ts] >= 100) && (e[Ts] = 100), e[ks] = vr(e[ks]), e[Ps] = vr(e[Ps]), e[Hs] = vr(e[Hs]), e[Us] = e[Us] || "", e.enableDebug = vr(e.enableDebug), e[Fs] = vr(e[Fs]), e.disableFlushOnUnload = vr(e.disableFlushOnUnload, e[Fs]), e
       }


       function Rc(e) {
           Qt(e[ks]) || (e[ks] ? (ai = !1, si = !1) : (ai = vi(!0), si = pi(!0)))
       }
       var Tc = function(e) {
           function t() {
               var n, r, i, o, a, s, c, u, l, f, d, v, p, g, h, m, A, w = e.call(this) || this;
               return w.identifier = "ApplicationInsightsAnalytics", w.priority = 180, w.autoRoutePVDelay = 500, O(t, w, (function(e, t) {
                   var w = t._addHook;


                   function y(t, n, r, i, o) {
                       e[Ks]()
                           .throwInternal(t, n, r, i, o)
                   }


                   function b() {
                       n = null, r = null, i = null, o = null, a = null, s = null, c = !1, u = !1, l = !1, f = !1, d = !1, v = !1, p = !1, g = !1;
                       var e = Dr();
                       h = e && e[Vs] || "", m = null, A = null
                   }
                   b(), e.getCookieMgr = function() {
                       return Io(e[Ds])
                   }, e.processTelemetry = function(t, n) {
                       e.processNext(t, n)
                   }, e.trackEvent = function(t, n) {
                       try {
                           var r = Li(t, ji[Es], ji[qs], e[Ks](), n);
                           e[Ds][Xs](r)
                       } catch (e) {
                           y(2, 39, "trackTrace failed, trace will not be collected: " + In(e), {
                               exception: Lr(e)
                           })
                       }
                   }, e.startTrackEvent = function(e) {
                       try {
                           n.start(e)
                       } catch (e) {
                           y(1, 29, "startTrackEvent failed, event will not be collected: " + In(e), {
                               exception: Lr(e)
                           })
                       }
                   }, e.stopTrackEvent = function(e, t, r) {
                       try {
                           n.stop(e, void 0, t, r)
                       } catch (e) {
                           y(1, 30, "stopTrackEvent failed, event will not be collected: " + In(e), {
                               exception: Lr(e)
                           })
                       }
                   }, e.trackTrace = function(t, n) {
                       try {
                           var r = Li(t, Bi[Es], Bi[qs], e[Ks](), n);
                           e[Ds][Xs](r)
                       } catch (e) {
                           y(2, 39, "trackTrace failed, trace will not be collected: " + In(e), {
                               exception: Lr(e)
                           })
                       }
                   }, e.trackMetric = function(t, n) {
                       try {
                           var r = Li(t, Vi[Es], Vi[qs], e[Ks](), n);
                           e[Ds][Xs](r)
                       } catch (e) {
                           y(1, 36, "trackMetric failed, metric will not be collected: " + In(e), {
                               exception: Lr(e)
                           })
                       }
                   }, e[Ns] = function(t, n) {
                       try {
                           var r = t || {};
                           i[Ns](r, se(se(se({}, r.properties), r.measurements), n)), e.config[Cs] && a[Ls](r.name, r.uri)
                       } catch (e) {
                           y(1, 37, "trackPageView failed, page view will not be collected: " + In(e), {
                               exception: Lr(e)
                           })
                       }
                   }, e[js] = function(t, n, r) {
                       var i = Pr();
                       i && (t.refUri = void 0 === t.refUri ? i.referrer : t.refUri);
                       var o = Li(t, _i[Es], _i[qs], e[Ks](), n, r);
                       e[Ds][Xs](o)
                   }, e[Bs] = function(t, n, r) {
                       var i = Li(t, Oi[Es], Oi[qs], e[Ks](), n, r);
                       e[Ds][Xs](i)
                   }, e.trackPageViewPerformance = function(t, n) {
                       var r = t || {};
                       try {
                           o[Ms](r), e[Bs](r, n)
                       } catch (e) {
                           y(1, 37, "trackPageViewPerformance failed, page view will not be collected: " + In(e), {
                               exception: Lr(e)
                           })
                       }
                   }, e.startTrackPage = function(e) {
                       try {
                           if ("string" != typeof e) {
                               var t = Pr();
                               e = t && t.title || ""
                           }
                           r.start(e)
                       } catch (e) {
                           y(1, 31, "startTrackPage failed, page view may not be collected: " + In(e), {
                               exception: Lr(e)
                           })
                       }
                   }, e.stopTrackPage = function(t, n, i, o) {
                       try {
                           if ("string" != typeof t) {
                               var s = Pr();
                               t = s && s.title || ""
                           }
                           if ("string" != typeof n) {
                               var c = Dr();
                               n = c && c[Vs] || ""
                           }
                           r.stop(t, n, i, o), e.config[Cs] && a[Ls](t, n)
                       } catch (e) {
                           y(1, 32, "stopTrackPage failed, page view will not be collected: " + In(e), {
                               exception: Lr(e)
                           })
                       }
                   }, e[_s] = function(t, n, r) {
                       var i = t && (t[Os] || t[zs]) || un(t) && t || {
                           name: t && typeof t,
                           message: t || Ri
                       };
                       t = t || {};
                       var o = Li(new oo(e[Ks](), i, t.properties || n, t.measurements, t.severityLevel, t.id)
                           .toInterface(), oo[Es], oo[qs], e[Ks](), n, r);
                       e[Ds][Xs](o)
                   }, e.trackException = function(t, n) {
                       t && !t[Os] && t[zs] && (t[Os] = t[zs]);
                       try {
                           e[_s](t, n)
                       } catch (e) {
                           y(1, 35, "trackException failed, exception will not be collected: " + In(e), {
                               exception: Lr(e)
                           })
                       }
                   }, e[Ws] = function(t) {
                       var n = t && t[zs],
                           r = t && t.evt;
                       try {
                           if (!r) {
                               var i = Tr();
                               i && (r = i.event)
                           }
                           var o = t && t.url || (Pr() || {})
                               .URL,
                               a = t[Gs] || "window.onerror@" + o + ":" + (t[Zs] || 0) + ":" + (t[Js] || 0),
                               s = {
                                   errorSrc: a,
                                   url: o,
                                   lineNumber: t[Zs] || 0,
                                   columnNumber: t[Js] || 0,
                                   message: t[Qs]
                               };
                           ! function(e, t, n, r, i) {
                               return !i && ln(e) && ("Script error." === e || "Script error" === e)
                           }(t.message, t.url, t.lineNumber, t.columnNumber, t[zs]) ? (t[Gs] || (t[Gs] = a), e.trackException({
                               exception: t,
                               severityLevel: 3
                           }, s)) : function(t, n) {
                               var r = Li(t, oo[Es], oo[qs], e[Ks](), n);
                               e[Ds][Xs](r)
                           }(oo[Ys]("Script error: The browser's same-origin policy prevents us from getting the details of this exception. Consider using the 'crossorigin' attribute.", o, t[Zs] || 0, t[Js] || 0, n, r, null, a), s)
                       } catch (e) {
                           var c = n ? n.name + ", " + n[Qs] : "null";
                           y(1, 11, "_onError threw exception while logging error, error will not be collected: " + In(e), {
                               exception: Lr(e),
                               errorString: c
                           })
                       }
                   }, e[$s] = function(t) {
                       if (e[Ds]) return e[Ds][$s](t);
                       s || (s = []), s.push(t)
                   }, e.initialize = function(y, b, x, S) {
                       if (!e.isInitialized()) {
                           Yt(b) && Hn("Error initializing"), t.initialize(y, b, x, S), y.storagePrefix && di(y.storagePrefix);
                           try {
                               A = pa(zo(e.identifier), b.evtNamespace && b.evtNamespace()), s && (pn(s, (function(e) {
                                   b[$s](e)
                               })), s = null);
                               var C = function(t) {
                                   var n = ss(null, t, e[Ds]),
                                       r = e.identifier,
                                       i = Ic(t),
                                       o = e.config = n.getExtCfg(r);
                                   return void 0 !== i && on(i, (function(e, t) {
                                       o[e] = n.getConfig(r, e, t), void 0 === o[e] && (o = t)
                                   })), o
                               }(y);
                               Rc(C), o = new wc(e[Ds]), i = new vc(e, C[Is], e[Ds], o), a = new yc(e[Ks](), (function(t, n, r) {
                                       return function(t, n, r) {
                                           var i = {
                                               PageName: t,
                                               PageUrl: n
                                           };
                                           e.trackMetric({
                                               name: "PageVisitTime",
                                               average: r,
                                               max: r,
                                               min: r,
                                               sampleCount: 1
                                           }, i)
                                       }(t, n, r)
                                   })),
                                   function(t, n) {
                                       c = t[Ps] || n[Ps],
                                           function() {
                                               if (!u && c) {
                                                   var t = ["/browserLinkSignalR/", "/__browserLink/"];
                                                   e[$s]((function(e) {
                                                       if (c && e.baseType === Oa[Es]) {
                                                           var n = e.baseData;
                                                           if (n)
                                                               for (var r = 0; r < t[tc]; r++)
                                                                   if (n.target && n.target.indexOf(t[r]) >= 0) return !1
                                                       }
                                                       return !0
                                                   })), u = !0
                                               }
                                           }()
                                   }(C, y), (n = new xc(e[Ks](), "trackEvent"))
                                   .action = function(t, n, r, i, o) {
                                       i || (i = {}), o || (o = {}), i.duration = r[xs](), e.trackEvent({
                                           name: t,
                                           properties: i,
                                           measurements: o
                                       })
                                   }, (r = new xc(e[Ks](), "trackPageView"))
                                   .action = function(t, n, r, i, o) {
                                       Yt(i) && (i = {}), i.duration = r[xs]();
                                       var a = {
                                           name: t,
                                           uri: n,
                                           properties: i,
                                           measurements: o
                                       };
                                       e[js](a, i)
                                   }, Rr() && (function(t) {
                                       var n = Tr(),
                                           r = Dr();
                                       (d = t[Ss]) || v || t.autoExceptionInstrumented || (w(As(n, "onerror", {
                                               ns: A,
                                               rsp: function(t, n, r, i, o, a) {
                                                   d || !0 === t.rslt || e[Ws](oo[Ys](n, r, i, o, a, t.evt))
                                               }
                                           }, !1)), v = !0),
                                           function(t, n, r) {
                                               (p = !0 === t[Rs]) && !g && (w(As(n, "onunhandledrejection", {
                                                   ns: A,
                                                   rsp: function(t, n) {
                                                       p && !0 !== t.rslt && e[Ws](oo[Ys](function(e) {
                                                           if (e && e.reason) {
                                                               var t = e.reason;
                                                               return !ln(t) && nn(t[xs]) ? t[xs]() : Lr(t)
                                                           }
                                                           return e || ""
                                                       }(n), r ? r[Vs] : "", 0, 0, n, t.evt))
                                                   }
                                               }, !1)), g = !0, t.autoUnhandledPromiseInstrumented = g)
                                           }(t, n, r)
                                   }(C), function(t) {
                                       var n = Tr(),
                                           r = Dr();
                                       if (l = !0 === t[Hs], n && l && Fr()) {
                                           var i = Fr() ? history : Ir("history");
                                           nn(i.pushState) && nn(i.replaceState) && typeof Event !== G && function(t, n, r, i) {
                                               var o = t[Us] || "";
                                               f || (w(As(r, "pushState", {
                                                   ns: A,
                                                   rsp: function() {
                                                       l && (Sc(n, Ha(o + "pushState")), Sc(n, Ha(o + "locationchange")))
                                                   }
                                               }, !0)), w(As(r, "replaceState", {
                                                   ns: A,
                                                   rsp: function() {
                                                       l && (Sc(n, Ha(o + "replaceState")), Sc(n, Ha(o + "locationchange")))
                                                   }
                                               }, !0)), ga(n, o + "popstate", (function() {
                                                   l && Sc(n, Ha(o + "locationchange"))
                                               }), A), ga(n, o + "locationchange", (function() {
                                                   if (m ? (h = m, m = i && i[Vs] || "") : m = i && i[Vs] || "", l) {
                                                       var t = function() {
                                                           var t = null;
                                                           if (e[Ds] && e[Ds].getTraceCtx && (t = e[Ds].getTraceCtx(!1)), !t) {
                                                               var n = e[Ds].getPlugin(Ai);
                                                               if (n) {
                                                                   var r = n.plugin.context;
                                                                   r && (t = _a(r.telemetryTrace))
                                                               }
                                                           }
                                                           return t
                                                       }();
                                                       if (t) {
                                                           t.setTraceId(ya());
                                                           var n = "_unknown_";
                                                           i && i.pathname && (n = i.pathname + (i.hash || "")), t.setName(Hi(e[Ks](), n))
                                                       }
                                                       setTimeout(function(t) {
                                                           e[Ns]({
                                                               refUri: t,
                                                               properties: {
                                                                   duration: 0
                                                               }
                                                           })
                                                       }.bind(e, h), e.autoRoutePVDelay)
                                                   }
                                               }), A), f = !0)
                                           }(t, n, i, r)
                                       }
                                   }(C))
                           } catch (t) {
                               throw e.setInitialized(!1), t
                           }
                       }
                   }, e._doTeardown = function(e, t) {
                       i && i.teardown(e, t), ha(window, null, null, A), b()
                   }, bn(e, "_pageViewManager", (function() {
                       return i
                   })), bn(e, "_pageViewPerformanceManager", (function() {
                       return o
                   })), bn(e, "_pageVisitTimeManager", (function() {
                       return a
                   })), bn(e, "_evtNamespace", (function() {
                       return "." + A
                   }))
               })), w
           }
           return ue(t, e), t.Version = "2.8.18", t.getDefaultConfig = Ic, t
       }(bs);


       function kc(e) {
           var t = "ai." + e + ".";
           return function(e) {
               return t + e
           }
       }
       var Pc, Hc = kc("application"),
           Uc = kc("device"),
           Fc = kc("location"),
           Dc = kc("operation"),
           Ec = kc("session"),
           qc = kc("user"),
           Kc = kc("cloud"),
           Xc = kc("internal"),
           Nc = function(e) {
               function t() {
                   return e.call(this) || this
               }
               return ue(t, e), t
           }((Pc = {
               applicationVersion: Hc("ver"),
               applicationBuild: Hc("build"),
               applicationTypeId: Hc("typeId"),
               applicationId: Hc("applicationId"),
               applicationLayer: Hc("layer"),
               deviceId: Uc("id"),
               deviceIp: Uc("ip"),
               deviceLanguage: Uc("language"),
               deviceLocale: Uc("locale"),
               deviceModel: Uc("model"),
               deviceFriendlyName: Uc("friendlyName"),
               deviceNetwork: Uc("network"),
               deviceNetworkName: Uc("networkName"),
               deviceOEMName: Uc("oemName"),
               deviceOS: Uc("os"),
               deviceOSVersion: Uc("osVersion"),
               deviceRoleInstance: Uc("roleInstance"),
               deviceRoleName: Uc("roleName"),
               deviceScreenResolution: Uc("screenResolution"),
               deviceType: Uc("type"),
               deviceMachineName: Uc("machineName"),
               deviceVMName: Uc("vmName"),
               deviceBrowser: Uc("browser"),
               deviceBrowserVersion: Uc("browserVersion"),
               locationIp: Fc("ip"),
               locationCountry: Fc("country"),
               locationProvince: Fc("province"),
               locationCity: Fc("city"),
               operationId: Dc("id"),
               operationName: Dc("name"),
               operationParentId: Dc("parentId"),
               operationRootId: Dc("rootId"),
               operationSyntheticSource: Dc("syntheticSource"),
               operationCorrelationVector: Dc("correlationVector"),
               sessionId: Ec("id"),
               sessionIsFirst: Ec("isFirst"),
               sessionIsNew: Ec("isNew"),
               userAccountAcquisitionDate: qc("accountAcquisitionDate"),
               userAccountId: qc("accountId"),
               userAgent: qc("userAgent"),
               userId: qc("id"),
               userStoreRegion: qc("storeRegion"),
               userAuthUserId: qc("authUserId"),
               userAnonymousUserAcquisitionDate: qc("anonUserAcquisitionDate"),
               userAuthenticatedUserAcquisitionDate: qc("authUserAcquisitionDate"),
               cloudName: Kc("name"),
               cloudRole: Kc("role"),
               cloudRoleVer: Kc("roleVer"),
               cloudRoleInstance: Kc("roleInstance"),
               cloudEnvironment: Kc("environment"),
               cloudLocation: Kc("location"),
               cloudDeploymentUnit: Kc("deploymentUnit"),
               internalNodeName: Xc("nodeName"),
               internalSdkVersion: Xc("sdkVersion"),
               internalAgentVersion: Xc("agentVersion"),
               internalSnippet: Xc("snippet"),
               internalSdkSrc: Xc("sdkSrc")
           }, function() {
               var e = this;
               Pc && on(Pc, (function(t, n) {
                   e[t] = n
               }))
           })),
           Lc = "user",
           jc = "device",
           Bc = "trace",
           Mc = "web",
           Vc = "app",
           _c = "os",
           Oc = new Nc,
           zc = function(e, t, n) {
               var r = this,
                   i = this;
               i.ver = 1, i.sampleRate = 100, i.tags = {}, i[Mn] = Hi(e, n) || Ri, i.data = t, i.time = vn(new Date), i.aiDataContract = {
                   time: 1,
                   iKey: 1,
                   name: 1,
                   sampleRate: function() {
                       return 100 === r.sampleRate ? 4 : 1
                   },
                   tags: 1,
                   data: 1
               }
           },
           Wc = function(e, t) {
               this.aiDataContract = {
                   baseType: 1,
                   baseData: 1
               }, this.baseType = e, this.baseData = t
           },
           Gc = "duration",
           Zc = "tags",
           Jc = "deviceType",
           Qc = "data",
           Yc = "name",
           $c = "traceID",
           eu = "length",
           tu = "stringify",
           nu = "measurements",
           ru = "dataType",
           iu = "envelopeType",
           ou = "toString",
           au = "onLine",
           su = "isOnline",
           cu = "enqueue",
           uu = "count",
           lu = "eventsLimitInMem",
           fu = "push",
           du = "emitLineDelimitedJson",
           vu = "clear",
           pu = "batchPayloads",
           gu = "markAsSent",
           hu = "clearSent",
           mu = "bufferOverride",
           Au = "BUFFER_KEY",
           wu = "SENT_BUFFER_KEY",
           yu = "MAX_BUFFER_SIZE",
           bu = "namePrefix",
           xu = "maxBatchSizeInBytes",
           Su = "triggerSend",
           Cu = "diagLog",
           Iu = "onunloadDisableBeacon",
           Ru = "isBeaconApiDisabled",
           Tu = "_sender",
           ku = "_senderConfig",
           Pu = "enableSessionStorageBuffer",
           Hu = "_buffer",
           Uu = "samplingPercentage",
           Fu = "instrumentationKey",
           Du = "endpointUrl",
           Eu = "customHeaders",
           qu = "disableXhr",
           Ku = "onunloadDisableFetch",
           Xu = "disableTelemetry",
           Nu = "baseType",
           Lu = "sampleRate",
           ju = "convertUndefined",
           Bu = "_onError",
           Mu = "_onPartialSuccess",
           Vu = "_onSuccess",
           _u = "itemsAccepted",
           Ou = "isRetryDisabled",
           zu = "setRequestHeader",
           Wu = "maxBatchInterval",
           Gu = "eventsSendRequest",
           Zu = "disableInstrumentationKeyValidation",
           Ju = "getSamplingScore",
           Qu = "baseType",
           Yu = "baseData",
           $u = "properties",
           el = "true";


       function tl(e, t, n) {
           return Rn(e, t, n, Pn)
       }


       function nl(e, t, n) {
           Yt(e) || on(e, (function(e, r) {
               fn(r) ? n[e] = r : ln(r) ? t[e] = r : qr() && (t[e] = Kr()[tu](r))
           }))
       }


       function rl(e, t) {
           Yt(e) || on(e, (function(n, r) {
               e[n] = r || t
           }))
       }


       function il(e, t, n, r) {
           var i = new zc(e, r, t);
           tl(i, "sampleRate", n[bi]), (n[Yu] || {})
               .startTime && (i.time = vn(n[Yu].startTime)), i.iKey = n.iKey;
           var o = n.iKey.replace(/-/g, "");
           return i[Yc] = i[Yc].replace("{0}", o),
               function(e, t, n) {
                   var r = n[Zc] = n[Zc] || {},
                       i = t.ext = t.ext || {},
                       o = t[Zc] = t[Zc] || [],
                       a = i.user;
                   a && (tl(r, Oc.userAuthUserId, a.authId), tl(r, Oc.userId, a.id || a.localId));
                   var s = i.app;
                   s && tl(r, Oc.sessionId, s.sesId);
                   var c = i.device;
                   c && (tl(r, Oc.deviceId, c.id || c.localId), tl(r, Oc[Jc], c.deviceClass), tl(r, Oc.deviceIp, c.ip), tl(r, Oc.deviceModel, c.model), tl(r, Oc[Jc], c[Jc]));
                   var u = t.ext.web;
                   if (u) {
                       tl(r, Oc.deviceLanguage, u.browserLang), tl(r, Oc.deviceBrowserVersion, u.browserVer), tl(r, Oc.deviceBrowser, u.browser);
                       var l = n[Qc] = n[Qc] || {},
                           f = l[Yu] = l[Yu] || {},
                           d = f[$u] = f[$u] || {};
                       tl(d, "domain", u.domain), tl(d, "isManual", u.isManual ? el : null), tl(d, "screenRes", u.screenRes), tl(d, "userConsent", u.userConsent ? el : null)
                   }
                   var v = i.os;
                   v && tl(r, Oc.deviceOS, v[Yc]);
                   var p = i.trace;
                   p && (tl(r, Oc.operationParentId, p.parentID), tl(r, Oc.operationName, Hi(e, p[Yc])), tl(r, Oc.operationId, p[$c]));
                   for (var g = {}, h = o[eu] - 1; h >= 0; h--) on(o[h], (function(e, t) {
                       g[e] = t
                   })), o.splice(h, 1);
                   on(o, (function(e, t) {
                       g[e] = t
                   }));
                   var m = se(se({}, r), g);
                   m[Oc.internalSdkVersion] || (m[Oc.internalSdkVersion] = Hi(e, "javascript:".concat(al.Version), 64)), n[Zc] = En(m)
               }(e, n, i), n[Zc] = n[Zc] || [], En(i)
       }


       function ol(e, t) {
           Yt(t[Yu]) && ni(e, 1, 46, "telemetryItem.baseData cannot be null.")
       }
       var al = {
           Version: "2.8.18"
       };


       function sl(e, t, n) {
           ol(e, t);
           var r = {},
               i = {};
           t[Qu] !== ji[ru] && (r.baseTypeSource = t[Qu]), t[Qu] === ji[ru] ? (r = t[Yu][$u] || {}, i = t[Yu][nu] || {}) : t[Yu] && nl(t[Yu], r, i), nl(t[Qc], r, i), Yt(n) || rl(r, n);
           var o = t[Yu][Yc],
               a = new ji(e, o, r, i),
               s = new Wc(ji[ru], a);
           return il(e, ji[iu], t, s)
       }


       function cl(e, t) {
           ha(e, null, null, t)
       }
       var ul, ll = function() {
               function e(t, n) {
                   var r = [],
                       i = !1;
                   this._get = function() {
                       return r
                   }, this._set = function(e) {
                       return r = e
                   }, O(e, this, (function(e) {
                       e[cu] = function(o) {
                           e[uu]() >= n[lu]() ? i || (ni(t, 2, 105, "Maximum in-memory buffer size reached: " + e[uu](), !0), i = !0) : r[fu](o)
                       }, e[uu] = function() {
                           return r[eu]
                       }, e.size = function() {
                           for (var e = r[eu], t = 0; t < r[eu]; t++) e += r[t][eu];
                           return n[du]() || (e += 2), e
                       }, e[vu] = function() {
                           r = [], i = !1
                       }, e.getItems = function() {
                           return r.slice(0)
                       }, e[pu] = function(e) {
                           return e && e[eu] > 0 ? n[du]() ? e.join("\n") : "[" + e.join(",") + "]" : null
                       }
                   }))
               }
               return e.__ieDyn = 1, e
           }(),
           fl = function(e) {
               function t(n, r) {
                   var i = e.call(this, n, r) || this;
                   return O(t, i, (function(e, t) {
                       e[gu] = function(e) {
                           t[vu]()
                       }, e[hu] = function(e) {}
                   })), i
               }
               return ue(t, e), t.__ieDyn = 1, t
           }(ll),
           dl = function(e) {
               function t(n, r) {
                   var i = e.call(this, n, r) || this,
                       o = !1,
                       a = r[mu]() || {
                           getItem: gi,
                           setItem: hi
                       },
                       s = a.getItem,
                       c = a.setItem;
                   return O(t, i, (function(e, i) {
                       var a = d(t[Au]),
                           u = d(t[wu]),
                           l = e._set(a.concat(u));


                       function f(e, t) {
                           var n = [];
                           return pn(t, (function(t) {
                               nn(t) || -1 !== gn(e, t) || n[fu](t)
                           })), n
                       }


                       function d(e) {
                           var t = e;
                           try {
                               t = r[bu] && r[bu]() ? r[bu]() + "_" + t : t;
                               var i = s(n, t);
                               if (i) {
                                   var o = Kr()
                                       .parse(i);
                                   if (ln(o) && (o = Kr()
                                           .parse(o)), o && cn(o)) return o
                               }
                           } catch (e) {
                               ni(n, 1, 42, " storage key: " + t + ", " + In(e), {
                                   exception: Lr(e)
                               })
                           }
                           return []
                       }


                       function v(e, t) {
                           var i = e;
                           try {
                               i = r[bu] && r[bu]() ? r[bu]() + "_" + i : i;
                               var o = JSON[tu](t);
                               c(n, i, o)
                           } catch (e) {
                               c(n, i, JSON[tu]([])), ni(n, 2, 41, " storage key: " + i + ", " + In(e) + ". Buffer cleared", {
                                   exception: Lr(e)
                               })
                           }
                       }
                       l[eu] > t[yu] && (l[eu] = t[yu]), v(t[wu], []), v(t[Au], l), e[cu] = function(r) {
                           e[uu]() >= t[yu] ? o || (ni(n, 2, 67, "Maximum buffer size reached: " + e[uu](), !0), o = !0) : (i[cu](r), v(t[Au], e._get()))
                       }, e[vu] = function() {
                           i[vu](), v(t[Au], e._get()), v(t[wu], []), o = !1
                       }, e[gu] = function(r) {
                           v(t[Au], e._set(f(r, e._get())));
                           var i = d(t[wu]);
                           i instanceof Array && r instanceof Array && ((i = i.concat(r))[eu] > t[yu] && (ni(n, 1, 67, "Sent buffer reached its maximum size: " + i[eu], !0), i[eu] = t[yu]), v(t[wu], i))
                       }, e[hu] = function(e) {
                           var n = d(t[wu]);
                           n = f(e, n), v(t[wu], n)
                       }
                   })), i
               }
               return ue(t, e), t.BUFFER_KEY = "AI_buffer", t.SENT_BUFFER_KEY = "AI_sentBuffer", t.MAX_BUFFER_SIZE = 2e3, t
           }(ll),
           vl = function() {
               function e(t) {
                   O(e, this, (function(e) {
                       function n(e, o) {
                           var a = "__aiCircularRefCheck",
                               s = {};
                           if (!e) return ni(t, 1, 48, "cannot serialize object because it is null or undefined", {
                               name: o
                           }, !0), s;
                           if (e[a]) return ni(t, 2, 50, "Circular reference detected while serializing object", {
                               name: o
                           }, !0), s;
                           if (!e.aiDataContract) {
                               if ("measurements" === o) s = i(e, "number", o);
                               else if ("properties" === o) s = i(e, "string", o);
                               else if ("tags" === o) s = i(e, "string", o);
                               else if (cn(e)) s = r(e, o);
                               else {
                                   ni(t, 2, 49, "Attempting to serialize an object which does not implement ISerializable", {
                                       name: o
                                   }, !0);
                                   try {
                                       Kr()[tu](e), s = e
                                   } catch (e) {
                                       ni(t, 1, 48, e && nn(e[ou]) ? e[ou]() : "Error serializing object", null, !0)
                                   }
                               }
                               return s
                           }
                           return e[a] = !0, on(e.aiDataContract, (function(i, a) {
                               var c = nn(a) ? 1 & a() : 1 & a,
                                   u = nn(a) ? 4 & a() : 4 & a,
                                   l = 2 & a,
                                   f = void 0 !== e[i],
                                   d = tn(e[i]) && null !== e[i];
                               if (!c || f || l) {
                                   if (!u) {
                                       var v;
                                       void 0 !== (v = d ? l ? r(e[i], i) : n(e[i], i) : e[i]) && (s[i] = v)
                                   }
                               } else ni(t, 1, 24, "Missing required field specification. The field is required but not present on source", {
                                   field: i,
                                   name: o
                               })
                           })), delete e[a], s
                       }


                       function r(e, r) {
                           var i;
                           if (e)
                               if (cn(e)) {
                                   i = [];
                                   for (var o = 0; o < e[eu]; o++) {
                                       var a = n(e[o], r + "[" + o + "]");
                                       i[fu](a)
                                   }
                               } else ni(t, 1, 54, "This field was specified as an array in the contract but the item is not an array.\r\n", {
                                   name: r
                               }, !0);
                           return i
                       }


                       function i(e, n, r) {
                           var i;
                           return e && (i = {}, on(e, (function(e, o) {
                               if ("string" === n) void 0 === o ? i[e] = "undefined" : null === o ? i[e] = "null" : o[ou] ? i[e] = o[ou]() : i[e] = "invalid field: toString() is not defined.";
                               else if ("number" === n)
                                   if (void 0 === o) i[e] = "undefined";
                                   else if (null === o) i[e] = "null";
                               else {
                                   var a = parseFloat(o);
                                   isNaN(a) ? i[e] = "NaN" : i[e] = a
                               } else i[e] = "invalid field: " + r + " is of unknown type.", ni(t, 1, i[e], null, !0)
                           }))), i
                       }
                       e.serialize = function(e) {
                           var r = n(e, "root");
                           try {
                               return Kr()[tu](r)
                           } catch (e) {
                               ni(t, 1, 48, e && nn(e[ou]) ? e[ou]() : "Error serializing object", null, !0)
                           }
                       }
                   }))
               }
               return e.__ieDyn = 1, e
           }(),
           pl = function() {
               function e() {}
               return e.prototype.getHashCodeScore = function(t) {
                   return this.getHashCode(t) / e.INT_MAX_VALUE * 100
               }, e.prototype.getHashCode = function(e) {
                   if ("" === e) return 0;
                   for (; e[eu] < 8;) e = e.concat(e);
                   for (var t = 5381, n = 0; n < e[eu]; ++n) t = (t << 5) + t + e.charCodeAt(n), t |= 0;
                   return Math.abs(t)
               }, e.INT_MAX_VALUE = 2147483647, e
           }(),
           gl = function() {
               var e = new pl,
                   t = new Nc;
               this[Ju] = function(n) {
                   return n[Zc] && n[Zc][t.userId] ? e.getHashCodeScore(n[Zc][t.userId]) : n.ext && n.ext.user && n.ext.user.id ? e.getHashCodeScore(n.ext.user.id) : n[Zc] && n[Zc][t.operationId] ? e.getHashCodeScore(n[Zc][t.operationId]) : n.ext && n.ext.telemetryTrace && n.ext.telemetryTrace[$c] ? e.getHashCodeScore(n.ext.telemetryTrace[$c]) : 100 * Math.random()
               }
           },
           hl = function() {
               function e(e, t) {
                   this.INT_MAX_VALUE = 2147483647;
                   var n = t || $r(null);
                   (e > 100 || e < 0) && (n.throwInternal(2, 58, "Sampling rate is out of range (0..100). Sampling will be disabled, you may be sending too much data which may affect your AI service level.", {
                       samplingRate: e
                   }, !0), e = 100), this[Lu] = e, this.samplingScoreGenerator = new gl
               }
               return e.prototype.isSampledIn = function(e) {
                   var t = this[Lu];
                   return null == t || t >= 100 || e.baseType === Vi[ru] || this.samplingScoreGenerator[Ju](e) < t
               }, e
           }();


       function ml(e) {
           try {
               return e.responseText
           } catch (e) {}
           return null
       }


       function Al() {
           var e, t;
           return (e = {
               endpointUrl: function() {
                   return Ci + Ii
               }
           })[du] = function() {
               return !1
           }, e[Wu] = function() {
               return 15e3
           }, e[xu] = function() {
               return 102400
           }, e[Xu] = function() {
               return !1
           }, e[Pu] = function() {
               return !0
           }, e[mu] = function() {
               return !1
           }, e[Ou] = function() {
               return !1
           }, e[Ru] = function() {
               return !0
           }, e[qu] = function() {
               return !1
           }, e[Ku] = function() {
               return !1
           }, e[Iu] = function() {
               return !1
           }, e[Fu] = function() {
               return t
           }, e[bu] = function() {
               return t
           }, e[Uu] = function() {
               return 100
           }, e[Eu] = function() {}, e[ju] = function() {
               return t
           }, e[lu] = function() {
               return 1e4
           }, e.retryCodes = function() {
               return null
           }, e
       }
       var wl = ((ul = {})[ji.dataType] = sl, ul[Bi.dataType] = function(e, t, n) {
               ol(e, t);
               var r = t[Yu].message,
                   i = t[Yu].severityLevel,
                   o = t[Yu][$u] || {},
                   a = t[Yu][nu] || {};
               nl(t[Qc], o, a), Yt(n) || rl(o, n);
               var s = new Bi(e, r, i, o, a),
                   c = new Wc(Bi[ru], s);
               return il(e, Bi[iu], t, c)
           }, ul[_i.dataType] = function(e, t, n) {
               var r;
               ol(e, t);
               var i = t[Yu];
               Yt(i) || Yt(i[$u]) || Yt(i[$u][Gc]) ? Yt(t[Qc]) || Yt(t[Qc][Gc]) || (r = t[Qc][Gc], delete t[Qc][Gc]) : (r = i[$u][Gc], delete i[$u][Gc]);
               var o, a = t[Yu];
               ((t.ext || {})
                   .trace || {})[$c] && (o = t.ext.trace[$c]);
               var s = a.id || o,
                   c = a[Yc],
                   u = a.uri,
                   l = a[$u] || {},
                   f = a[nu] || {};
               Yt(a.refUri) || (l.refUri = a.refUri), Yt(a.pageType) || (l.pageType = a.pageType), Yt(a.isLoggedIn) || (l.isLoggedIn = a.isLoggedIn[ou]()), Yt(a[$u]) || on(a[$u], (function(e, t) {
                   l[e] = t
               })), nl(t[Qc], l, f), Yt(n) || rl(l, n);
               var d = new _i(e, c, u, r, l, f, s),
                   v = new Wc(_i[ru], d);
               return il(e, _i[iu], t, v)
           }, ul[Oi.dataType] = function(e, t, n) {
               ol(e, t);
               var r = t[Yu],
                   i = r[Yc],
                   o = r.uri || r.url,
                   a = r[$u] || {},
                   s = r[nu] || {};
               nl(t[Qc], a, s), Yt(n) || rl(a, n);
               var c = new Oi(e, i, o, void 0, a, s, r),
                   u = new Wc(Oi[ru], c);
               return il(e, Oi[iu], t, u)
           }, ul[oo.dataType] = function(e, t, n) {
               ol(e, t);
               var r = t[Yu][nu] || {},
                   i = t[Yu][$u] || {};
               nl(t[Qc], i, r), Yt(n) || rl(i, n);
               var o = t[Yu],
                   a = oo.CreateFromInterface(e, o, i, r),
                   s = new Wc(oo[ru], a);
               return il(e, oo[iu], t, s)
           }, ul[Vi.dataType] = function(e, t, n) {
               ol(e, t);
               var r = t[Yu],
                   i = r[$u] || {},
                   o = r[nu] || {};
               nl(t[Qc], i, o), Yt(n) || rl(i, n);
               var a = new Vi(e, r[Yc], r.average, r.sampleCount, r.min, r.max, r.stdDev, i, o),
                   s = new Wc(Vi[ru], a);
               return il(e, Vi[iu], t, s)
           }, ul[Oa.dataType] = function(e, t, n) {
               ol(e, t);
               var r = t[Yu][nu] || {},
                   i = t[Yu][$u] || {};
               nl(t[Qc], i, r), Yt(n) || rl(i, n);
               var o = t[Yu];
               if (Yt(o)) return ri(e, "Invalid input for dependency data"), null;
               var a = o[$u] && o[$u][Si] ? o[$u][Si] : "GET",
                   s = new Oa(e, o.id, o.target, o[Yc], o[Gc], o.success, o.responseCode, a, o.type, o.correlationContext, i, r),
                   c = new Wc(Oa[ru], s);
               return il(e, Oa[iu], t, c)
           }, ul),
           yl = function(e) {
               function t() {
                   var n, r, i, o, a, s, c, u = e.call(this) || this;
                   u.priority = 1001, u.identifier = wi, u._senderConfig = Al();
                   var l, f, d, v, p, g = 0;
                   return O(t, u, (function(e, h) {
                       function m(t, r, i, o, a, s) {
                           var c = null;
                           if (e._appId || (c = R(s)) && c.appId && (e._appId = c.appId), (t < 200 || t >= 300) && 0 !== t) {
                               if ((301 === t || 307 === t || 308 === t) && !A(i)) return void e[Bu](r, a);
                               !e[ku][Ou]() && H(t) ? (T(r), ni(e[Cu](), 2, 40, ". Response code " + t + ". Will retry to send " + r[eu] + " items.")) : e[Bu](r, a)
                           } else d && !d[su]() ? e[ku][Ou]() || (T(r, 10), ni(e[Cu](), 2, 40, ". Offline - Response Code: ".concat(t, ". Offline status: ")
                               .concat(!d.isOnline(), ". Will retry to send ")
                               .concat(r.length, " items."))) : (A(i), 206 === t ? (c || (c = R(s)), c && !e[ku][Ou]() ? e[Mu](r, c) : e[Bu](r, a)) : (n = 0, e[Vu](r, o)))
                       }


                       function A(t) {
                           return !(s >= 10 || Yt(t) || "" === t || t === e[ku][Du]() || (e[ku][Du] = function() {
                               return t
                           }, ++s, 0))
                       }


                       function w(e, t) {
                           f ? f(e, !1) : b(e)
                       }


                       function y(t) {
                           var n = Ur(),
                               r = e[Hu],
                               i = e[ku][Du](),
                               o = e._buffer[pu](t),
                               a = new Blob([o], {
                                   type: "text/plain;charset=UTF-8"
                               }),
                               s = n.sendBeacon(i, a);
                           return s && (r[gu](t), e._onSuccess(t, t[eu])), s
                       }


                       function b(t, n) {
                           if (cn(t) && t[eu] > 0 && !y(t)) {
                               for (var r = [], i = 0; i < t[eu]; i++) {
                                   var o = t[i];
                                   y([o]) || r[fu](o)
                               }
                               r[eu] > 0 && (l && l(r, !0), ni(e[Cu](), 2, 40, ". Failed to send telemetry with Beacon API, retried with normal sender."))
                           }
                       }


                       function x(t, n) {
                           var r = new XMLHttpRequest,
                               i = e[ku][Du]();
                           try {
                               r[yi] = !0
                           } catch (e) {}
                           r.open("POST", i, n), r[zu]("Content-type", "application/json"), ja(i) && r[zu](Fa[6], Fa[7]), pn(yn(c), (function(e) {
                               r[zu](e, c[e])
                           })), r.onreadystatechange = function() {
                               return e._xhrReadyStateChange(r, t, t[eu])
                           }, r.onerror = function(n) {
                               return e[Bu](t, U(r), n)
                           };
                           var o = e._buffer[pu](t);
                           r.send(o), e._buffer[gu](t)
                       }


                       function S(t, n) {
                           if (cn(t)) {
                               for (var r = t[eu], i = 0; i < t[eu]; i++) r += t[i][eu];
                               g + r <= 65e3 ? I(t, !1) : jr() ? b(t) : (l && l(t, !0), ni(e[Cu](), 2, 40, ". Failed to send telemetry with Beacon API, retried with xhrSender."))
                           }
                       }


                       function C(e, t) {
                           I(e, !0)
                       }


                       function I(t, n) {
                           var r, i = e[ku][Du](),
                               o = e._buffer[pu](t),
                               a = new Blob([o], {
                                   type: "application/json"
                               }),
                               s = new Headers,
                               u = o[eu],
                               l = !1,
                               f = !1;
                           ja(i) && s.append(Fa[6], Fa[7]), pn(yn(c), (function(e) {
                               s.append(e, c[e])
                           }));
                           var d = ((r = {
                               method: "POST",
                               headers: s,
                               body: a
                           })[yi] = !0, r);
                           n || (d.keepalive = !0, l = !0, g += u);
                           var v = new Request(i, d);
                           try {
                               v[yi] = !0
                           } catch (e) {}
                           e._buffer[gu](t);
                           try {
                               fetch(v)
                                   .then((function(r) {
                                       n || (g -= u, u = 0), f || (f = !0, r.ok ? r.text()
                                           .then((function(e) {
                                               m(r.status, t, r.url, t[eu], r.statusText, e)
                                           })) : e[Bu](t, r.statusText))
                                   }))
                                   .catch((function(r) {
                                       n || (g -= u, u = 0), f || (f = !0, e[Bu](t, r.message))
                                   }))
                           } catch (n) {
                               f || e[Bu](t, Lr(n))
                           }
                           l && !f && (f = !0, e._onSuccess(t, t[eu]))
                       }


                       function R(t) {
                           try {
                               if (t && "" !== t) {
                                   var n = Kr()
                                       .parse(t);
                                   if (n && n.itemsReceived && n.itemsReceived >= n[_u] && n.itemsReceived - n.itemsAccepted === n.errors[eu]) return n
                               }
                           } catch (n) {
                               ni(e[Cu](), 1, 43, "Cannot parse the response. " + In(n), {
                                   response: t
                               })
                           }
                           return null
                       }


                       function T(t, i) {
                           if (void 0 === i && (i = 1), t && 0 !== t[eu]) {
                               var o = e[Hu];
                               o[hu](t), n++;
                               for (var a = 0, s = t; a < s.length; a++) {
                                   var c = s[a];
                                   o[cu](c)
                               }! function(e) {
                                   var t;
                                   if (n <= 1) t = 10;
                                   else {
                                       var i = (Math.pow(2, n) - 1) / 2,
                                           o = Math.floor(Math.random() * i * 10) + 1;
                                       o *= e, t = Math.max(Math.min(o, 3600), 10)
                                   }
                                   var a = Cn() + 1e3 * t;
                                   r = a
                               }(i), k()
                           }
                       }


                       function k() {
                           if (!o && !i) {
                               var t = r ? Math.max(0, r - Cn()) : 0,
                                   n = Math.max(e[ku][Wu](), t);
                               o = setTimeout((function() {
                                   o = null, e[Su](!0, null, 1)
                               }), n)
                           }
                       }


                       function P() {
                           clearTimeout(o), o = null, r = null
                       }


                       function H(e) {
                           return Yt(p) ? 401 === e || 408 === e || 429 === e || 500 === e || 502 === e || 503 === e || 504 === e : p[eu] && gn(p, e) > -1
                       }


                       function U(e, t) {
                           return e ? "XMLHttpRequest,Status:" + e.status + ",Response:" + ml(e) || 0 : t
                       }


                       function F(t, n) {
                           var r = e[Hu],
                               i = Tr(),
                               o = new XDomainRequest;
                           o.onload = function() {
                               return e._xdrOnLoad(o, t)
                           }, o.onerror = function(n) {
                               return e[Bu](t, D(o), n)
                           };
                           var a = i && i.location && i.location.protocol || "";
                           if (0 !== e[ku][Du]()
                               .lastIndexOf(a, 0)) return ni(e[Cu](), 2, 40, ". Cannot send XDomain request. The endpoint URL protocol doesn't match the hosting page protocol."), void r[vu]();
                           var s = e[ku][Du]()
                               .replace(/^(https?:)/, "");
                           o.open("POST", s);
                           var c = r[pu](t);
                           o.send(c), r[gu](t)
                       }


                       function D(e, t) {
                           return e ? "XDomainRequest,Response:" + ml(e) || 0 : t
                       }


                       function E() {
                           e[Tu] = null, e[Hu] = null, e._appId = null, e._sample = null, c = {}, d = null, n = 0, r = null, i = !1, o = null, a = null, s = 0, g = 0, l = null, f = null, v = null
                       }
                       E(), e.pause = function() {
                           P(), i = !0
                       }, e.resume = function() {
                           i && (i = !1, r = null, e._buffer.size() > e._senderConfig[xu]() && e[Su](!0, null, 10), k())
                       }, e.flush = function(t, n, r) {
                           if (void 0 === t && (t = !0), !i) {
                               P();
                               try {
                                   e[Su](t, null, r || 1)
                               } catch (t) {
                                   ni(e[Cu](), 1, 22, "flush failed, telemetry will not be collected: " + In(t), {
                                       exception: Lr(t)
                                   })
                               }
                           }
                       }, e.onunloadFlush = function() {
                           if (!i)
                               if (!1 !== e._senderConfig[Iu]() && !1 !== e[ku][Ru]() || !jr()) e.flush();
                               else try {
                                   e[Su](!0, w, 2)
                               } catch (t) {
                                   ni(e[Cu](), 1, 20, "failed to flush with beacon sender on page unload, telemetry will not be collected: " + In(t), {
                                       exception: Lr(t)
                                   })
                               }
                       }, e.addHeader = function(e, t) {
                           c[e] = t
                       }, e.initialize = function(t, i, o, c) {
                           e.isInitialized() && ni(e[Cu](), 1, 28, "Sender is already initialized"), h.initialize(t, i, o, c);
                           var g = e._getTelCtx(),
                               m = e.identifier;
                           a = new vl(i.logger), n = 0, r = null, e[Tu] = null, s = 0;
                           var A = e[Cu]();
                           v = pa(zo("Sender"), i.evtNamespace && i.evtNamespace()), d = function(e) {
                               var t, n = Pr(),
                                   r = Ur(),
                                   i = !1,
                                   o = !0,
                                   a = pa(zo("OfflineListener"), e);
                               try {
                                   if (c(Tr()) && (i = !0), n) {
                                       var s = n.body || n;
                                       s.ononline && c(s) && (i = !0)
                                   }
                                   i && r && !Yt(r[au]) && (o = r[au])
                               } catch (e) {
                                   i = !1
                               }


                               function c(e) {
                                   var t = !1;
                                   return e && (t = ga(e, "online", u, a)) && ga(e, "offline", l, a), t
                               }


                               function u() {
                                   o = !0
                               }


                               function l() {
                                   o = !1
                               }
                               return (t = {})[su] = function() {
                                   var e = !0;
                                   return i ? e = o : r && !Yt(r[au]) && (e = r[au]), e
                               }, t.isListening = function() {
                                   return i
                               }, t.unload = function() {
                                   var e = Tr();
                                   if (e && i) {
                                       if (cl(e, a), n) {
                                           var t = n.body || n;
                                           Qt(t.ononline) || cl(t, a)
                                       }
                                       i = !1
                                   }
                               }, t
                           }(v), on(Al(), (function(t, n) {
                               e[ku][t] = function() {
                                   var e = g.getConfig(m, t, n());
                                   return e || "endpointUrl" !== t || (e = n()), e
                               }
                           })), p = e[ku].retryCodes(), t.storagePrefix && di(t.storagePrefix);
                           var w = e[ku][Pu]() && !(!e._senderConfig[mu]() && !pi());
                           e[Hu] = w ? new dl(A, e[ku]) : new fl(A, e[ku]), e._sample = new hl(e[ku][Uu](), A),
                               function(e) {
                                   return !(Yt(e[Zu]) || !e[Zu]) || new RegExp("^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$")
                                       .test(e[Fu])
                               }(t) || ni(A, 1, 100, "Invalid Instrumentation key " + t[Fu]), !ja(e._senderConfig.endpointUrl()) && e._senderConfig.customHeaders() && e._senderConfig.customHeaders()[eu] > 0 && pn(e[ku][Eu](), (function(e) {
                                   u.addHeader(e.header, e.value)
                               }));
                           var y = e[ku],
                               I = null;
                           !y[qu]() && Mr() ? I = F : !y[qu]() && Vr() && (I = x), !I && Br() && (I = C), l = I || x, !y[Ru]() && jr() && (I = b), e[Tu] = I || x, f = !y[Ku]() && Br(!0) ? S : jr() ? b : !y[qu]() && Mr() ? F : !y[qu]() && Vr() ? x : l
                       }, e.processTelemetry = function(n, r) {
                           var i, o = (r = e._getTelCtx(r))[Cu]();
                           try {
                               if (e[ku][Xu]()) return;
                               if (!n) return void ni(o, 1, 7, "Cannot send empty telemetry");
                               if (n.baseData && !n[Nu]) return void ni(o, 1, 70, "Cannot send telemetry without baseData and baseType");
                               if (n[Nu] || (n[Nu] = "EventData"), !e[Tu]) return void ni(o, 1, 28, "Sender was not initialized");
                               if (i = n, !e._sample.isSampledIn(i)) return void ni(o, 2, 33, "Telemetry item was sampled out and not sent", {
                                   SampleRate: e._sample[Lu]
                               });
                               n[bi] = e._sample[Lu];
                               var s = e[ku][ju]() || void 0,
                                   c = n.iKey || e[ku][Fu](),
                                   u = t.constructEnvelope(n, c, o, s);
                               if (!u) return void ni(o, 1, 47, "Unable to create an AppInsights envelope");
                               var l = !1;
                               if (n[Zc] && n[Zc][xi] && (pn(n[Zc][xi], (function(e) {
                                       try {
                                           e && !1 === e(u) && (l = !0, ri(o, "Telemetry processor check returns false"))
                                       } catch (e) {
                                           ni(o, 1, 64, "One of telemetry initializers failed, telemetry item will not be sent: " + In(e), {
                                               exception: Lr(e)
                                           }, !0)
                                       }
                                   })), delete n[Zc][xi]), l) return;
                               var f = a.serialize(u),
                                   v = e[Hu];
                               v.size() + f[eu] > e[ku][xu]() && (d && !d[su]() || e[Su](!0, null, 10)), v[cu](f), k()
                           } catch (e) {
                               ni(o, 2, 12, "Failed adding telemetry to the sender's buffer, some telemetry will be lost: " + In(e), {
                                   exception: Lr(e)
                               })
                           }
                           e.processNext(n, r)
                       }, e._xhrReadyStateChange = function(e, t, n) {
                           4 === e.readyState && m(e.status, t, e.responseURL, n, U(e), ml(e) || e.response)
                       }, e[Su] = function(t, n, r) {
                           if (void 0 === t && (t = !0), !i) try {
                               var o = e[Hu];
                               if (e[ku][Xu]()) o[vu]();
                               else {
                                   if (o[uu]() > 0) {
                                       var a = o.getItems();
                                       ! function(t, n) {
                                           var r, i = (r = "getNotifyMgr", e.core[r] ? e.core[r]() : e.core._notificationManager);
                                           if (i && i[Gu]) try {
                                               i[Gu](t, n)
                                           } catch (t) {
                                               ni(e[Cu](), 1, 74, "send request notification failed: " + In(t), {
                                                   exception: Lr(t)
                                               })
                                           }
                                       }(r || 0, t), n ? n.call(e, a, t) : e[Tu](a, t)
                                   }
                                   new Date
                               }
                               P()
                           } catch (t) {
                               var s = Nr();
                               (!s || s > 9) && ni(e[Cu](), 1, 40, "Telemetry transmission failed, some telemetry will be lost: " + In(t), {
                                   exception: Lr(t)
                               })
                           }
                       }, e._doTeardown = function(t, n) {
                           e.onunloadFlush(), d.unload(), E()
                       }, e[Bu] = function(t, n, r) {
                           ni(e[Cu](), 2, 26, "Failed to send telemetry.", {
                               message: n
                           }), e._buffer && e._buffer[hu](t)
                       }, e[Mu] = function(t, n) {
                           for (var r = [], i = [], o = 0, a = n.errors.reverse(); o < a.length; o++) {
                               var s = a[o],
                                   c = t.splice(s.index, 1)[0];
                               H(s.statusCode) ? i[fu](c) : r[fu](c)
                           }
                           t[eu] > 0 && e[Vu](t, n[_u]), r[eu] > 0 && e[Bu](r, U(null, ["partial success", n[_u], "of", n.itemsReceived].join(" "))), i[eu] > 0 && (T(i), ni(e[Cu](), 2, 40, "Partial success. Delivered: " + t[eu] + ", Failed: " + r[eu] + ". Will retry to send " + i[eu] + " our of " + n.itemsReceived + " items"))
                       }, e[Vu] = function(t, n) {
                           e._buffer && e._buffer[hu](t)
                       }, e._xdrOnLoad = function(t, r) {
                           var i = ml(t);
                           if (!t || i + "" != "200" && "" !== i) {
                               var o = R(i);
                               o && o.itemsReceived && o.itemsReceived > o[_u] && !e[ku][Ou]() ? e[Mu](r, o) : e[Bu](r, D(t))
                           } else n = 0, e[Vu](r, 0)
                       }
                   })), u
               }
               return ue(t, e), t.constructEnvelope = function(e, t, n, r) {
                   var i;
                   return i = t === e.iKey || Yt(t) ? e : se(se({}, e), {
                       iKey: t
                   }), (wl[i.baseType] || sl)(n, i, r)
               }, t
           }(bs);


       function bl(e) {
           if (!e) return {};
           var t = function(e, t, n) {
               var r;
               if (e) {
                   if (e[Ut]) return e[Ut](t, n);
                   var i = e[ye],
                       o = 0;
                   if (arguments[ye] >= 3) r = arguments[2];
                   else {
                       for (; o < i && !(o in e);) o++;
                       r = e[o++]
                   }
                   for (; o < i;) o in e && (r = t(r, e[o], o, e)), o++
               }
               return r
           }(e[Kn](";"), (function(e, t) {
               var n = t[Kn]("=");
               if (2 === n[Xn]) {
                   var r = n[0][Nn](),
                       i = n[1];
                   e[r] = i
               }
               return e
           }), {});
           if (yn(t)[Xn] > 0) {
               if (t.endpointsuffix) {
                   var n = t.location ? t.location + "." : "";
                   t[Ln] = t[Ln] || "https://" + n + "dc." + t.endpointsuffix, an(t[Ln], "/") && (t[Ln] = t[Ln].slice(0, -1))
               }
               t[Ln] = t[Ln] || Ci
           }
           return t
       }
       ii({
           Verbose: 0,
           Information: 1,
           Warning: 2,
           Error: 3,
           Critical: 4
       });
       var xl = 500;


       function Sl(e, t, n) {
           t && cn(t) && t[ye] > 0 && (pn(t = t.sort((function(e, t) {
               return e[yt] - t[yt]
           })), (function(e) {
               e[yt] < xl && Hn("Channel has invalid priority - " + e[pe])
           })), e[ge]({
               queue: Sn(t),
               chain: ls(t, n[me], n)
           }))
       }
       var Cl = function(e) {
               function t() {
                   var n, r, i = e.call(this) || this;


                   function o() {
                       n = 0, r = []
                   }
                   return i.identifier = "TelemetryInitializerPlugin", i.priority = 199, o(), O(t, i, (function(e, t) {
                       e.addTelemetryInitializer = function(e) {
                           var t = {
                               id: n++,
                               fn: e
                           };
                           return r[ge](t), {
                               remove: function() {
                                   pn(r, (function(e, n) {
                                       if (e.id === t.id) return r[Ue](n, 1), -1
                                   }))
                               }
                           }
                       }, e[wt] = function(t, n) {
                           for (var i = !1, o = r[ye], a = 0; a < o; ++a) {
                               var s = r[a];
                               if (s) try {
                                   if (!1 === s.fn[Je](null, [t])) {
                                       i = !0;
                                       break
                                   }
                               } catch (e) {
                                   ni(n[Le](), 1, 64, "One of telemetry initializers failed, telemetry item will not be sent: " + In(e), {
                                       exception: Lr(e)
                                   }, !0)
                               }
                           }
                           i || e[xe](t, n)
                       }, e[Ke] = function() {
                           o()
                       }
                   })), i
               }
               return ue(t, e), t.__ieDyn = 1, t
           }(bs),
           Il = "Plugins must provide initialize method",
           Rl = "_notificationManager",
           Tl = "SDK is still unloading...",
           kl = {
               loggingLevelConsole: 1
           };


       function Pl(e, t) {
           return new Ja(t)
       }


       function Hl(e, t) {
           var n = !1;
           return pn(t, (function(t) {
               if (t === e) return n = !0, -1
           })), n
       }
       var Ul = function() {
           function e() {
               var t, n, r, i, o, a, s, c, u, l, f, d, v, p, g, h, m, A, w, y, b = 0,
                   x = !1;
               O(e, this, (function(e) {
                   function S(n) {
                       if (!b && !x && (n || e[we] && e[we].queue[ye] > 0)) {
                           var r = kn(t.diagnosticLogInterval);
                           r && r > 0 || (r = 1e4), b = setInterval((function() {
                               clearInterval(b), b = 0, H()
                           }), r)
                       }
                       return b
                   }


                   function C() {
                       n = !1, t = qn(!0, {}, kl), e[me] = t, e[we] = new ei(t), e[He] = [], g = new Cl, r = [], i = null, o = null, a = null, s = null, c = null, l = null, u = [], f = null, d = null, v = null, p = !1, h = null, m = zo("AIBaseCore", !0), A = ws(), y = null
                   }


                   function I() {
                       var n = ss(k(), t, e);
                       return n[Te](S), n
                   }


                   function R(n) {
                       var r = function(e, t, n) {
                           var r, i = [],
                               o = {};
                           return pn(n, (function(t) {
                               (Yt(t) || Yt(t[fe])) && Hn(Il);
                               var n = t[yt],
                                   r = t[pe];
                               t && n && (Yt(o[n]) ? o[n] = r : ri(e, "Two extensions have same priority #" + n + " - " + o[n] + ", " + r)), (!n || n < 500) && i[ge](t)
                           })), (r = {
                               all: n
                           })[gt] = i, r
                       }(e[we], 0, u);
                       l = r[gt], c = null;
                       var i = r.all;
                       if (v = Sn(function(e, t, n) {
                               var r = [];
                               if (e && pn(e, (function(e) {
                                       return Sl(r, e, n)
                                   })), t) {
                                   var i = [];
                                   pn(t, (function(e) {
                                       e[yt] > xl && i[ge](e)
                                   })), Sl(r, i, n)
                               }
                               return r
                           }(d, i, e)), f) {
                           var o = gn(i, f); - 1 !== o && i[Ue](o, 1), -1 !== (o = gn(l, f)) && l[Ue](o, 1), f._setQueue(v)
                       } else f = function(e, t) {
                           function n() {
                               return ss(null, t[me], t, null)
                           }


                           function r(e, t, n, r) {
                               var i = e ? e[ye] + 1 : 1;


                               function o() {
                                   0 == --i && (r && r(), r = null)
                               }
                               i > 0 && pn(e, (function(e) {
                                   if (e && e.queue[ye] > 0) {
                                       var r = e.chain,
                                           a = t[Be](r);
                                       a[Te](o), n(a)
                                   } else i--
                               })), o()
                           }
                           var i = !1,
                               o = {
                                   identifier: "ChannelControllerPlugin",
                                   priority: xl,
                                   initialize: function(t, n, r, o) {
                                       i = !0, pn(e, (function(e) {
                                           e && e.queue[ye] > 0 && ts(ss(e.chain, t, n), r)
                                       }))
                                   },
                                   isInitialized: function() {
                                       return i
                                   },
                                   processTelemetry: function(t, i) {
                                       r(e, i || n(), (function(e) {
                                           e[xe](t)
                                       }), (function() {
                                           i[xe](t)
                                       }))
                                   },
                                   update: function(t, n) {
                                       var i = n || {
                                           reason: 0
                                       };
                                       return r(e, t, (function(e) {
                                           e[xe](i)
                                       }), (function() {
                                           t[xe](i)
                                       })), !0
                                   },
                                   pause: function() {
                                       r(e, n(), (function(e) {
                                           e.iterate((function(e) {
                                               e.pause && e.pause()
                                           }))
                                       }), null)
                                   },
                                   resume: function() {
                                       r(e, n(), (function(e) {
                                           e.iterate((function(e) {
                                               e.resume && e.resume()
                                           }))
                                       }), null)
                                   },
                                   teardown: function(t, n) {
                                       var o = n || {
                                           reason: 0,
                                           isAsync: !1
                                       };
                                       return r(e, t, (function(e) {
                                           e[xe](o)
                                       }), (function() {
                                           t[xe](o), i = !1
                                       })), !0
                                   },
                                   getChannel: function(t) {
                                       var n = null;
                                       return e && e[ye] > 0 && pn(e, (function(e) {
                                           if (e && e.queue[ye] > 0 && (pn(e.queue, (function(e) {
                                                   if (e[pe] === t) return n = e, -1
                                               })), n)) return -1
                                       })), n
                                   },
                                   flush: function(t, i, o, a) {
                                       var s = 1,
                                           c = !1,
                                           u = null;


                                       function l() {
                                           s--, c && 0 === s && (u && (clearTimeout(u), u = null), i && i(c), i = null)
                                       }
                                       return a = a || 5e3, r(e, n(), (function(e) {
                                           e.iterate((function(e) {
                                               if (e[Pe]) {
                                                   s++;
                                                   var n = !1;
                                                   e[Pe](t, (function() {
                                                       n = !0, l()
                                                   }), o) || n || (t && null == u ? u = setTimeout((function() {
                                                       u = null, l()
                                                   }), a) : l())
                                               }
                                           }))
                                       }), (function() {
                                           c = !0, l()
                                       })), !0
                                   },
                                   _setQueue: function(t) {
                                       e = t
                                   }
                               };
                           return o
                       }(v, e);
                       i[ge](f), l[ge](f), e[He] = ns(i), f[fe](t, e, i), ts(I(), i), e[He] = Sn(ns(l || []))
                           .slice(), n && function(t) {
                               var n = us(k(), e);
                               n[Te](S), e._updateHook && !0 === e._updateHook(n, t) || n[xe](t)
                           }(n)
                   }


                   function T(t) {
                       var n, r = null,
                           i = null;
                       return pn(e[He], (function(e) {
                           if (e[pe] === t && e !== f && e !== g) return i = e, -1
                       })), !i && f && (i = f.getChannel(t)), i && ((n = {
                           plugin: i
                       })[We] = function(e) {
                           es(i)[mt] = !e
                       }, n.isEnabled = function() {
                           var e = es(i);
                           return !e[Fe] && !e[mt]
                       }, n.remove = function(e, t) {
                           var n;
                           void 0 === e && (e = !0);
                           var r = [i],
                               o = ((n = {
                                   reason: 1
                               })[qe] = e, n);
                           P(r, o, (function(e) {
                               e && R({
                                   reason: 32,
                                   removed: r
                               }), t && t(e)
                           }))
                       }, r = n), r
                   }


                   function k() {
                       if (!c) {
                           var n = (l || [])
                               .slice(); - 1 === gn(n, g) && n[ge](g), c = ls(ns(n), t, e)
                       }
                       return c
                   }


                   function P(n, r, i) {
                       if (n && n[ye] > 0) {
                           var o = cs(ls(n, t, e), e);
                           o[Te]((function() {
                               var e = !1,
                                   t = [];
                               pn(u, (function(r, i) {
                                   Hl(r, n) ? e = !0 : t[ge](r)
                               })), u = t;
                               var r = [];
                               d && (pn(d, (function(t, i) {
                                   var o = [];
                                   pn(t, (function(t) {
                                       Hl(t, n) ? e = !0 : o[ge](t)
                                   })), r[ge](o)
                               })), d = r), i && i(e), S()
                           })), o[xe](r)
                       } else i(!1)
                   }


                   function H() {
                       if (e[we] && e[we].queue) {
                           var n = e[we].queue.slice(0);
                           e[we].queue[ye] = 0, pn(n, (function(n) {
                               var r, i = ((r = {})[de] = h || "InternalMessageId: " + n[De], r.iKey = kn(t[Ae]), r.time = vn(new Date), r.baseType = Yr.dataType, r.baseData = {
                                   message: n[Ee]
                               }, r);
                               e.track(i)
                           }))
                       }
                   }


                   function U(e, t, n, r) {
                       return f ? f[Pe](e, t, n || 6, r) : (t && t(!1), !0)
                   }


                   function F(t) {
                       var n = e[we];
                       n ? (ni(n, 2, 73, t), S()) : Hn(t)
                   }
                   C(), e[he] = function() {
                       return n
                   }, e[fe] = function(r, o, s, c) {
                       var l, f;
                       p && Hn(Tl), e[he]() && Hn("Core should not be initialized more than once"), t = r || {}, e[me] = t, Yt(r[Ae]) && Hn("Please provide instrumentation key"), i = c, e[Rl] = c, !0 === (f = kn(t.disableDbgExt)) && w && (i[Ie](w), w = null), i && !w && !0 !== f && (w = Zr(t), i[Ce](w)), !(l = kn(t.enablePerfMgr)) && a && (a = null), l && Tn(t, ht, Pl), Tn(t, At, {})
                           .NotificationManager = i, s && (e[we] = s);
                       var g = Tn(t, "extensions", []);
                       (u = [])[ge].apply(u, le(le([], o), g)), d = Tn(t, pt, []), R(null), v && 0 !== v[ye] || Hn("No " + pt + " available"), n = !0, e.releaseQueue()
                   }, e.getTransmissionControls = function() {
                       var e = [];
                       return v && pn(v, (function(t) {
                           e[ge](t.queue)
                       })), Sn(e)
                   }, e.track = function(n) {
                       n.iKey = n.iKey || t[Ae], n[be] = n[be] || vn(new Date), n.ver = n.ver || "4.0", !p && e[he]() ? I()[xe](n) : r[ge](n)
                   }, e[Se] = I, e[ve] = function() {
                       return i || (i = function() {
                           var e;
                           return ae(((e = {})[Ce] = function(e) {}, e[Ie] = function(e) {}, e[bt] = function(e) {}, e[xt] = function(e, t) {}, e[St] = function(e, t) {}, e))
                       }(), e[Rl] = i), i
                   }, e[Ce] = function(e) {
                       i && i[Ce](e)
                   }, e[Ie] = function(e) {
                       i && i[Ie](e)
                   }, e.getCookieMgr = function() {
                       return s || (s = Ro(t, e[we])), s
                   }, e.setCookieMgr = function(e) {
                       s = e
                   }, e[Tt] = function() {
                       if (!o && !a && kn(t.enablePerfMgr)) {
                           var n = kn(t[ht]);
                           nn(n) && (a = n(e, e[ve]()))
                       }
                       return o || a || null
                   }, e.setPerfMgr = function(e) {
                       o = e
                   }, e.eventCnt = function() {
                       return r[ye]
                   }, e.releaseQueue = function() {
                       if (n && r[ye] > 0) {
                           var e = r;
                           r = [], pn(e, (function(e) {
                               I()[xe](e)
                           }))
                       }
                   }, e.pollInternalLogs = function(e) {
                       return h = e || null, x = !1, b && (clearInterval(b), b = null), S(!0)
                   }, e[Re] = function() {
                       x = !0, b && (clearInterval(b), b = 0, H())
                   }, Dn(e, (function() {
                       return g
                   }), ["addTelemetryInitializer"]), e.unload = function(t, r, i) {
                       var o;
                       void 0 === t && (t = !0), n || Hn("SDK is not initialized"), p && Hn(Tl);
                       var a = ((o = {
                               reason: 50
                           })[qe] = t, o.flushComplete = !1, o),
                           s = cs(k(), e);


                       function c(t) {
                           a.flushComplete = t, p = !0, A.run(s, a), e[Re](), s[xe](a)
                       }
                       s[Te]((function() {
                           C(), r && r(a)
                       }), e), H(), U(t, c, 6, i) || c(!1)
                   }, e[ke] = T, e.addPlugin = function(e, t, n, r) {
                       if (!e) return r && r(!1), void F(Il);
                       var i = T(e[pe]);
                       if (i && !t) return r && r(!1), void F("Plugin [" + e[pe] + "] is already loaded!");
                       var o = {
                           reason: 16
                       };


                       function a(t) {
                           u[ge](e), o.added = [e], R(o), r && r(!0)
                       }
                       if (i) {
                           var s = [i.plugin];
                           P(s, {
                               reason: 2,
                               isAsync: !!n
                           }, (function(e) {
                               e ? (o.removed = s, o.reason |= 32, a()) : r && r(!1)
                           }))
                       } else a()
                   }, e.evtNamespace = function() {
                       return m
                   }, e[Pe] = U, e.getTraceCtx = function(e) {
                       var t;
                       return y || (t = {}, y = {
                           getName: function() {
                               return t[de]
                           },
                           setName: function(e) {
                               t[de] = e
                           },
                           getTraceId: function() {
                               return t[ut]
                           },
                           setTraceId: function(e) {
                               Ta(e) && (t[ut] = e)
                           },
                           getSpanId: function() {
                               return t[lt]
                           },
                           setSpanId: function(e) {
                               ka(e) && (t[lt] = e)
                           },
                           getTraceFlags: function() {
                               return t[ft]
                           },
                           setTraceFlags: function(e) {
                               t[ft] = e
                           }
                       }), y
                   }, e.setTraceCtx = function(e) {
                       y = e || null
                   }, Fn(e, "addUnloadCb", (function() {
                       return A
                   }), "add")
               }))
           }
           return e.__ieDyn = 1, e
       }();


       function Fl(e, t, n, r) {
           pn(e, (function(e) {
               if (e && e[t])
                   if (n) setTimeout((function() {
                       return r(e)
                   }), 0);
                   else try {
                       r(e)
                   } catch (e) {}
           }))
       }
       var Dl = function() {
               function e(t) {
                   this.listeners = [];
                   var n = !!(t || {})
                       .perfEvtsSendAll;
                   O(e, this, (function(e) {
                       e[Ce] = function(t) {
                           e.listeners[ge](t)
                       }, e[Ie] = function(t) {
                           for (var n = gn(e[it], t); n > -1;) e.listeners[Ue](n, 1), n = gn(e[it], t)
                       }, e[bt] = function(t) {
                           Fl(e[it], bt, !0, (function(e) {
                               e[bt](t)
                           }))
                       }, e[xt] = function(t, n) {
                           Fl(e[it], xt, !0, (function(e) {
                               e[xt](t, n)
                           }))
                       }, e[St] = function(t, n) {
                           Fl(e[it], St, n, (function(e) {
                               e[St](t, n)
                           }))
                       }, e[Ct] = function(t) {
                           t && (!n && t[ot]() || Fl(e[it], Ct, !1, (function(e) {
                               t[qe] ? setTimeout((function() {
                                   return e[Ct](t)
                               }), 0) : e[Ct](t)
                           })))
                       }
                   }))
               }
               return e.__ieDyn = 1, e
           }(),
           El = function(e) {
               function t() {
                   var n = e.call(this) || this;
                   return O(t, n, (function(e, t) {
                       function n(t) {
                           var n = e[ve]();
                           n && n[xt]([t], 2)
                       }
                       e[fe] = function(e, n, r, i) {
                           t[fe](e, n, r || new ei(e), i || new Dl(e))
                       }, e.track = function(r) {
                           Ya(e[Tt](), (function() {
                               return "AppInsightsCore:track"
                           }), (function() {
                               null === r && (n(r), Hn("Invalid telemetry item")),
                                   function(e) {
                                       Yt(e[de]) && (n(e), Hn("telemetry name required"))
                                   }(r), t.track(r)
                           }), (function() {
                               return {
                                   item: r
                               }
                           }), !r.sync)
                       }
                   })), n
               }
               return ue(t, e), t.__ieDyn = 1, t
           }(Ul),
           ql = "duration",
           Kl = "properties",
           Xl = "requestUrl",
           Nl = "inst",
           Ll = "length",
           jl = "traceID",
           Bl = "spanID",
           Ml = "traceFlags",
           Vl = "context",
           _l = "aborted",
           Ol = "traceId",
           zl = "spanId",
           Wl = "core",
           Gl = "includeCorrelationHeaders",
           Zl = "canIncludeCorrelationHeader",
           Jl = "getAbsoluteUrl",
           Ql = "headers",
           Yl = "requestHeaders",
           $l = "appId",
           ef = "setRequestHeader",
           tf = "trackDependencyDataInternal",
           nf = "distributedTracingMode",
           rf = "startTime",
           of = "toLowerCase",
           af = "status",
           sf = "statusText",
           cf = "headerMap",
           uf = "openDone",
           lf = "sendDone",
           ff = "requestSentTime",
           df = "abortDone",
           vf = "getTraceId",
           pf = "getTraceFlags",
           gf = "method",
           hf = "errorStatusText",
           mf = "stateChangeAttached",
           Af = "responseFinishedTime",
           wf = "CreateTrackItem",
           yf = "response",
           bf = "getAllResponseHeaders",
           xf = "getPartAProps",
           Sf = "getCorrelationContext",
           Cf = "perfMark",
           If = "name",
           Rf = "perfTiming",
           Tf = "ajaxTotalDuration",
           kf = "eventTraceCtx";


       function Pf(e, t, n) {
           var r = 0,
               i = e[t],
               o = e[n];
           return i && o && (r = Va(i, o)), r
       }


       function Hf(e, t, n, r, i) {
           var o = 0,
               a = Pf(n, r, i);
           return a && (o = Uf(e, t, pr(a))), o
       }


       function Uf(e, t, n) {
           var r = "ajaxPerf",
               i = 0;
           return e && t && n && ((e[r] = e[r] || {})[t] = n, i = 1), i
       }
       var Ff = function() {
               var e = this;
               e[uf] = !1, e.setRequestHeaderDone = !1, e[lf] = !1, e[df] = !1, e[mf] = !1
           },
           Df = function() {
               function e(t, n, r, i) {
                   var o, a = this,
                       s = r;
                   a[Cf] = null, a.completed = !1, a.requestHeadersSize = null, a[Yl] = null, a.responseReceivingDuration = null, a.callbackDuration = null, a[Tf] = null, a[_l] = 0, a.pageUrl = null, a[Xl] = null, a.requestSize = 0, a[gf] = null, a[af] = null, a[ff] = null, a.responseStartedTime = null, a[Af] = null, a.callbackFinishedTime = null, a.endTime = null, a.xhrMonitoringState = new Ff, a.clientFailure = 0, a[jl] = t, a[Bl] = n, a[Ml] = null == i ? void 0 : i.getTraceFlags(), a[kf] = i ? ((o = {})[Ol] = i[vf](), o[zl] = i.getSpanId(), o[Ml] = i[pf](), o) : null, O(e, a, (function(e) {
                       e.getAbsoluteUrl = function() {
                           return e[Xl] ? function(e) {
                               var t, n = Ka(e);
                               return n && (t = n.href), t
                           }(e[Xl]) : null
                       }, e.getPathName = function() {
                           return e[Xl] ? Ui(s, (t = e[gf], n = e[Xl], t ? t.toUpperCase() + " " + n : n)) : null;
                           var t, n
                       }, e[wf] = function(t, n, r) {
                           var i;
                           if (e.ajaxTotalDuration = Math.round(1e3 * Va(e.requestSentTime, e.responseFinishedTime)) / 1e3, e[Tf] < 0) return null;
                           var o = ((i = {
                                   id: "|" + e[jl] + "." + e[Bl],
                                   target: e[Jl]()
                               })[If] = e.getPathName(), i.type = t, i[rf] = null, i.duration = e[Tf], i.success = +e[af] >= 200 && +e[af] < 400, i.responseCode = +e[af], i[Kl] = {
                                   HttpMethod: e[gf]
                               }, i),
                               a = o[Kl];
                           if (e[_l] && (a[_l] = !0), e[ff] && (o[rf] = new Date, o[rf].setTime(e[ff])), function(e, t) {
                                   var n = e[Rf],
                                       r = t[Kl] || {},
                                       i = 0,
                                       o = "name",
                                       a = "Start",
                                       s = "End",
                                       c = "domainLookup",
                                       u = "connect",
                                       l = "redirect",
                                       f = "request",
                                       d = "response",
                                       v = "startTime",
                                       p = c + a,
                                       g = c + s,
                                       h = u + a,
                                       m = u + s,
                                       A = f + a,
                                       w = f + s,
                                       y = d + a,
                                       b = d + s,
                                       x = l + a,
                                       S = l = s,
                                       C = "transferSize",
                                       I = "encodedBodySize",
                                       R = "decodedBodySize",
                                       T = "serverTiming";
                                   if (n) {
                                       i |= Hf(r, l, n, x, S), i |= Hf(r, c, n, p, g), i |= Hf(r, u, n, h, m), i |= Hf(r, f, n, A, w), i |= Hf(r, d, n, y, b), i |= Hf(r, "networkConnect", n, v, m), i |= Hf(r, "sentRequest", n, A, b);
                                       var k = n[ql];
                                       k || (k = Pf(n, v, b) || 0), i |= Uf(r, ql, k), i |= Uf(r, "perfTotal", k);
                                       var P = n[T];
                                       if (P) {
                                           var H = {};
                                           pn(P, (function(e, t) {
                                               var n = rn(e[o] || "" + t),
                                                   r = H[n] || {};
                                               on(e, (function(e, t) {
                                                   (e !== o && ln(t) || fn(t)) && (r[e] && (t = r[e] + ";" + t), !t && ln(t) || (r[e] = t))
                                               })), H[n] = r
                                           })), i |= Uf(r, T, H)
                                       }
                                       i |= Uf(r, C, n[C]), i |= Uf(r, I, n[I]), i |= Uf(r, R, n[R])
                                   } else e[Cf] && (i |= Uf(r, "missing", e.perfAttempts));
                                   i && (t[Kl] = r)
                               }(e, o), n && yn(e.requestHeaders)[Ll] > 0 && (a[Yl] = e[Yl]), r) {
                               var s = r();
                               if (s) {
                                   var c = s.correlationContext;
                                   if (c && (o.correlationContext = c), s[cf] && yn(s.headerMap)[Ll] > 0 && (a.responseHeaders = s[cf]), e[hf])
                                       if (e[af] >= 400) {
                                           var u = s.type;
                                           "" !== u && "text" !== u || (a.responseText = s.responseText ? s[sf] + " - " + s.responseText : s[sf]), "json" === u && (a.responseText = s.response ? s[sf] + " - " + JSON.stringify(s[yf]) : s[sf])
                                       } else 0 === e[af] && (a.responseText = s[sf] || "")
                               }
                           }
                           return o
                       }, e[xf] = function() {
                           var t, n = null,
                               r = e[kf];
                           if (r && (r[Ol] || r[zl])) {
                               var i = (n = {})[Bc] = ((t = {})[jl] = r[Ol], t.parentID = r[zl], t);
                               Yt(r[Ml]) || (i[Ml] = r[Ml])
                           }
                           return n
                       }
                   }))
               }
               return e.__ieDyn = 1, e
           }(),
           Ef = "ai.ajxmn.",
           qf = "diagLog",
           Kf = "_ajaxData",
           Xf = "fetch",
           Nf = "Failed to monitor XMLHttpRequest",
           Lf = ", monitoring data for this ajax call ",
           jf = Lf + "may be incorrect.",
           Bf = Lf + "won't be sent.",
           Mf = "Failed to get Request-Context correlation header as it may be not included in the response or not accessible.",
           Vf = "Failed to add custom defined request context as configured call back may missing a null check.",
           _f = "Failed to calculate the duration of the ",
           Of = 0,
           zf = null,
           Wf = function(e, t) {
               return e && t && e[Kf] ? (e[Kf].i || {})[t] : null
           },
           Gf = function(e, t) {
               var n = !1;
               if (e) {
                   var r = (e[Kf] || {})
                       .xh;
                   r && pn(r, (function(e) {
                       if (e.n === t) return n = !0, -1
                   }))
               }
               return n
           };


       function Zf(e, t) {
           var n = "";
           try {
               var r = Wf(e, t);
               r && r[Xl] && (n += "(url: '" + r[Xl] + "')")
           } catch (e) {}
           return n
       }


       function Jf(e, t, n, r, i) {
           ni(e[qf](), 1, t, n, r, i)
       }


       function Qf(e, t, n, r, i) {
           ni(e[qf](), 2, t, n, r, i)
       }


       function Yf(e, t, n) {
           return function(r) {
               Jf(e, t, n, {
                   ajaxDiagnosticsMessage: Zf(r[Nl], e._ajaxDataId),
                   exception: Lr(r.err)
               })
           }
       }


       function $f(e, t) {
           return e && t ? e.indexOf(t) : -1
       }


       function ed(e, t, n) {
           var r = {
               id: t,
               fn: n
           };
           return e.push(r), {
               remove: function() {
                   pn(e, (function(t, n) {
                       if (t.id === r.id) return e.splice(n, 1), -1
                   }))
               }
           }
       }


       function td(e, t, n, r) {
           var i = !0;
           return pn(t, (function(t, o) {
               try {
                   !1 === t.fn.call(null, n) && (i = !1)
               } catch (t) {
                   ni(e && e.logger, 1, 64, "Dependency " + r + " [#" + o + "] failed: " + In(t), {
                       exception: Lr(t)
                   }, !0)
               }
           })), i
       }
       var nd = "*.blob.core.",
           rd = xn([nd + "windows.net", nd + "chinacloudapi.cn", nd + "cloudapi.de", nd + "usgovcloudapi.net"]),
           id = [/https:\/\/[^\/]*(\.pipe\.aria|aria\.pipe|events\.data|collector\.azure)\.[^\/]+\/(OneCollector\/1|Collector\/3)\.0/i];


       function od() {
           return {
               maxAjaxCallsPerView: 500,
               disableAjaxTracking: !1,
               disableFetchTracking: !1,
               excludeRequestFromAutoTrackingPatterns: void 0,
               disableCorrelationHeaders: !1,
               distributedTracingMode: 1,
               correlationHeaderExcludedDomains: rd,
               correlationHeaderDomains: void 0,
               correlationHeaderExcludePatterns: void 0,
               appId: void 0,
               enableCorsCorrelation: !1,
               enableRequestHeaderTracking: !1,
               enableResponseHeaderTracking: !1,
               enableAjaxErrorStatusText: !1,
               enableAjaxPerfTracking: !1,
               maxAjaxPerfLookupAttempts: 3,
               ajaxPerfLookupDelay: 25,
               ignoreHeaders: ["Authorization", "X-API-Key", "WWW-Authenticate"],
               addRequestContext: void 0,
               addIntEndpoints: !0
           }
       }


       function ad() {
           var e = od();
           return on(e, (function(t) {
               e[t] = void 0
           })), e
       }
       var sd = function(e) {
               function t() {
                   var n, r, i, o, a, s, c, u, l, f, d, v, p, g, h, m, A, w, y, b, x, S, C, I, R = e.call(this) || this;
                   return R.identifier = t.identifier, R.priority = 120, O(t, R, (function(e, R) {
                       var T = R._addHook;


                       function k() {
                           var R = Dr();
                           n = !1, r = !1, i = R && R.host && R.host[of](), o = t.getEmptyConfig(), a = !1, s = !1, c = 0, u = null, l = !1, f = !1, d = null, v = !1, p = 0, g = !1, h = {}, m = !1, A = !1, w = null, y = null, b = null, S = 0, C = [], I = [], x = zo("ajaxData"), e._ajaxDataId = x
                       }


                       function P(e) {
                           var t = !0;
                           return (e || o.ignoreHeaders) && pn(o.ignoreHeaders, (function(n) {
                               if (n[of]() === e[of]()) return t = !1, -1
                           })), t
                       }


                       function H(e, t, n) {
                           T(function(e, t, n) {
                               return e ? ms(e[Z], t, n, !1) : null
                           }(e, t, n))
                       }


                       function U(e, t, n) {
                           var r = !1,
                               i = ((ln(t) ? t : (t || {})
                                   .url || "") || "")[of]();
                           if (pn(w, (function(e) {
                                   var t = e;
                                   ln(e) && (t = new RegExp(e)), r || (r = t.test(i))
                               })), r) return r;
                           var o = $f(i, "?"),
                               a = $f(i, "#");
                           return (-1 === o || -1 !== a && a < o) && (o = a), -1 !== o && (i = i.substring(0, o)), Yt(e) ? Yt(t) || (r = "object" == typeof t && !0 === t[yi] || !!n && !0 === n[yi]) : r = !0 === e[yi] || !0 === i[yi], !r && i && ja(i) && (r = !0), r ? h[i] || (h[i] = 1) : h[i] && (r = !0), r
                       }


                       function F(e, t, n) {
                           var i = !0,
                               o = r;
                           return Yt(e) || (i = !0 === n || !Yt(t)), o && i
                       }


                       function D() {
                           var t = null;
                           return e[Wl] && e[Wl].getTraceCtx && (t = e[Wl].getTraceCtx(!1)), !t && u && u.telemetryTrace && (t = _a(u.telemetryTrace)), t
                       }


                       function E(e) {
                           try {
                               var t = e.responseType;
                               if ("" === t || "text" === t) return e.responseText
                           } catch (e) {}
                           return null
                       }


                       function q(t) {
                           try {
                               var n = t[bf]();
                               if (null !== n && -1 !== $f(n[of](), Fa[8])) {
                                   var r = t.getResponseHeader(Fa[0]);
                                   return Ba[Sf](r)
                               }
                           } catch (n) {
                               Qf(e, 18, Mf, {
                                   ajaxDiagnosticsMessage: Zf(t, x),
                                   exception: Lr(n)
                               })
                           }
                       }


                       function K(e, t) {
                           if (t[Xl] && d && v) {
                               var n = Er();
                               if (n && nn(n.mark)) {
                                   Of++;
                                   var r = d + e + "#" + Of;
                                   n.mark(r);
                                   var i = n.getEntriesByName(r);
                                   i && 1 === i[Ll] && (t[Cf] = i[0])
                               }
                           }
                       }


                       function X(e, t, n, r) {
                           var i = t[Cf],
                               a = Er(),
                               s = o.maxAjaxPerfLookupAttempts,
                               c = o.ajaxPerfLookupDelay,
                               u = t[Xl],
                               l = 0;
                           ! function o() {
                               try {
                                   if (a && i) {
                                       l++;
                                       for (var f = null, d = a.getEntries(), v = d[Ll] - 1; v >= 0; v--) {
                                           var p = d[v];
                                           if (p) {
                                               if ("resource" === p.entryType) p.initiatorType !== e || -1 === $f(p[If], u) && -1 === $f(u, p[If]) || (f = p);
                                               else if ("mark" === p.entryType && p[If] === i[If]) {
                                                   t[Rf] = f;
                                                   break
                                               }
                                               if (p[rf] < i[rf] - 1e3) break
                                           }
                                       }
                                   }!i || t[Rf] || l >= s || !1 === t.async ? (i && nn(a.clearMarks) && a.clearMarks(i[If]), t.perfAttempts = l, n()) : setTimeout(o, c)
                               } catch (e) {
                                   r(e)
                               }
                           }()
                       }


                       function N(t) {
                           var n = "";
                           try {
                               Yt(t) || (ln(t) ? n += "(url: '".concat(t, "')") : n += "(url: '".concat(t.url, "')"))
                           } catch (t) {
                               Jf(e, 15, "Failed to grab failed fetch diagnostics message", {
                                   exception: Lr(t)
                               })
                           }
                           return n
                       }


                       function L(t, n, r, i, o, s, c) {
                           function u(t, n, i) {
                               var o = i || {};
                               o.fetchDiagnosticsMessage = N(r), n && (o.exception = Lr(n)), Qf(e, t, _f + "fetch call" + Bf, o)
                           }
                           o && (o[Af] = Ma(), o[af] = n, X(Xf, o, (function() {
                               var t, c = o[wf]("Fetch", a, s);
                               try {
                                   y && (t = y({
                                       status: n,
                                       request: r,
                                       response: i
                                   }))
                               } catch (t) {
                                   Qf(e, 104, Vf)
                               }
                               if (c) {
                                   void 0 !== t && (c[Kl] = se(se({}, c.properties), t));
                                   var l = o[xf]();
                                   B(I, e[Wl], o, c, null, l)
                               } else u(14, null, {
                                   requestSentTime: o[ff],
                                   responseFinishedTime: o[Af]
                               })
                           }), (function(e) {
                               u(18, e, null)
                           })))
                       }


                       function j(t) {
                           if (t && t[Ql]) try {
                               var n = t[Ql].get(Fa[0]);
                               return Ba[Sf](n)
                           } catch (n) {
                               Qf(e, 18, Mf, {
                                   fetchDiagnosticsMessage: N(t),
                                   exception: Lr(n)
                               })
                           }
                       }


                       function B(t, n, r, i, o, a) {
                           var s = !0;
                           t[Ll] > 0 && (s = td(n, t, {
                               item: i,
                               properties: o,
                               sysProperties: a,
                               context: r ? r[Vl] : null,
                               aborted: !!r && !!r[_l]
                           }, "initializer")), s && e[tf](i, o, a)
                       }
                       k(), e.initialize = function(i, c, h, S) {
                           var C;
                           e.isInitialized() || (R.initialize(i, c, h, S), b = pa(zo("ajax"), c && c.evtNamespace && c.evtNamespace()), function(n) {
                               var r = ss(null, n, e[Wl]);
                               o = ad(), on(od(), (function(e, n) {
                                   o[e] = r.getConfig(t.identifier, e, n)
                               }));
                               var i = o[nf];
                               if (a = o.enableRequestHeaderTracking, s = o.enableAjaxErrorStatusText, v = o.enableAjaxPerfTracking, p = o.maxAjaxCallsPerView, g = o.enableResponseHeaderTracking, w = [].concat(o.excludeRequestFromAutoTrackingPatterns || [], !1 !== o.addIntEndpoints ? id : []), y = o.addRequestContext, f = 0 === i || 1 === i, l = 1 === i || 2 === i, v) {
                                   var c = n.instrumentationKey || "unkwn";
                                   d = c[Ll] > 5 ? Ef + c.substring(c[Ll] - 5) + "." : Ef + c + "."
                               }
                               m = !!o.disableAjaxTracking, A = !!o.disableFetchTracking
                           }(i), ! function(e, t) {
                               var n, r = !1;
                               if (Vr()) {
                                   var i = XMLHttpRequest[Z];
                                   r = !(Yt(i) || Yt(i.open) || Yt(i.send) || Yt(i.abort))
                               }
                               var o = Nr();
                               if (o && o < 9 && (r = !1), r) try {
                                   var a = new XMLHttpRequest,
                                       s = {
                                           xh: [],
                                           i: (n = {}, n[t] = {}, n)
                                       };
                                   a[Kf] = s;
                                   var c = XMLHttpRequest[Z].open;
                                   XMLHttpRequest[Z].open = c
                               } catch (t) {
                                   r = !1, Jf(e, 15, "Failed to enable XMLHttpRequest monitoring, extension is not supported", {
                                       exception: Lr(t)
                                   })
                               }
                               return r
                           }(e, x) || m || r || (H(XMLHttpRequest, "open", {
                               ns: b,
                               req: function(t, n, r, i) {
                                   if (!m) {
                                       var o = t[Nl],
                                           c = Wf(o, x);
                                       !U(o, r) && F(o, c, !0) && (c && c.xhrMonitoringState[uf] || (c = function(t, n, r, i) {
                                           var o, a = D(),
                                               c = a && a[vf]() || ya(),
                                               u = ya()
                                               .substr(0, 16),
                                               l = t[Kf] = t[Kf] || {
                                                   xh: [],
                                                   i: {}
                                               },
                                               f = l.i = l.i || {},
                                               d = f[x] = f[x] || new Df(c, u, e[qf](), null === (o = e.core) || void 0 === o ? void 0 : o.getTraceCtx());
                                           return d[Ml] = a && a[pf](), d[gf] = n, d[Xl] = r, d.xhrMonitoringState[uf] = !0, d[Yl] = {}, d.async = i, d[hf] = s, d
                                       }(o, n, r, i)), function(t, n) {
                                           n.xhrMonitoringState[mf] = ga(t, "readystatechange", (function() {
                                               try {
                                                   t && 4 === t.readyState && F(t, n) && function(t) {
                                                       var n = Wf(t, x);


                                                       function r(n, r) {
                                                           var i = r || {};
                                                           i.ajaxDiagnosticsMessage = Zf(t, x), n && (i.exception = Lr(n)), Qf(e, 14, _f + "ajax call" + Bf, i)
                                                       }
                                                       n[Af] = Ma(), n[af] = t[af], X("xmlhttprequest", n, (function() {
                                                           try {
                                                               var i = n[wf]("Ajax", a, (function() {
                                                                       var e = {
                                                                           statusText: t[sf],
                                                                           headerMap: null,
                                                                           correlationContext: q(t),
                                                                           type: t.responseType,
                                                                           responseText: E(t),
                                                                           response: t[yf]
                                                                       };
                                                                       if (g) {
                                                                           var n = t[bf]();
                                                                           if (n) {
                                                                               var r = mn(n)
                                                                                   .split(/[\r\n]+/),
                                                                                   i = {};
                                                                               pn(r, (function(e) {
                                                                                   var t = e.split(": "),
                                                                                       n = t.shift(),
                                                                                       r = t.join(": ");
                                                                                   P(n) && (i[n] = r)
                                                                               })), e[cf] = i
                                                                           }
                                                                       }
                                                                       return e
                                                                   })),
                                                                   o = void 0;
                                                               try {
                                                                   y && (o = y({
                                                                       status: t[af],
                                                                       xhr: t
                                                                   }))
                                                               } catch (t) {
                                                                   Qf(e, 104, Vf)
                                                               }
                                                               if (i) {
                                                                   void 0 !== o && (i[Kl] = se(se({}, i.properties), o));
                                                                   var s = n[xf]();
                                                                   B(I, e[Wl], n, i, null, s)
                                                               } else r(null, {
                                                                   requestSentTime: n[ff],
                                                                   responseFinishedTime: n[Af]
                                                               })
                                                           } finally {
                                                               try {
                                                                   var c = (t[Kf] || {
                                                                           i: {}
                                                                       })
                                                                       .i || {};
                                                                   c[x] && (c[x] = null)
                                                               } catch (e) {}
                                                           }
                                                       }), (function(e) {
                                                           r(e, null)
                                                       }))
                                                   }(t)
                                               } catch (n) {
                                                   var r = Lr(n);
                                                   r && -1 !== $f(r[of](), "c00c023f") || Jf(e, 16, Nf + " 'readystatechange' event handler" + jf, {
                                                       ajaxDiagnosticsMessage: Zf(t, x),
                                                       exception: r
                                                   })
                                               }
                                           }), b)
                                       }(o, c))
                                   }
                               },
                               hkErr: Yf(e, 15, Nf + ".open" + jf)
                           }), H(XMLHttpRequest, "send", {
                               ns: b,
                               req: function(t, n) {
                                   if (!m) {
                                       var r = t[Nl],
                                           i = Wf(r, x);
                                       F(r, i) && !i.xhrMonitoringState[lf] && (K("xhr", i), i[ff] = Ma(), e[Gl](i, void 0, void 0, r), i.xhrMonitoringState[lf] = !0)
                                   }
                               },
                               hkErr: Yf(e, 17, Nf + jf)
                           }), H(XMLHttpRequest, "abort", {
                               ns: b,
                               req: function(e) {
                                   if (!m) {
                                       var t = e[Nl],
                                           n = Wf(t, x);
                                       F(t, n) && !n.xhrMonitoringState[df] && (n[_l] = 1, n.xhrMonitoringState[df] = !0)
                                   }
                               },
                               hkErr: Yf(e, 13, Nf + ".abort" + jf)
                           }), H(XMLHttpRequest, "setRequestHeader", {
                               ns: b,
                               req: function(e, t, n) {
                                   if (!m) {
                                       var r = e[Nl],
                                           i = Wf(r, x);
                                       i && F(r, i) && (function(e, t, n) {
                                           if (e) {
                                               var r = (e[Kf] || {})
                                                   .xh;
                                               r && r.push({
                                                   n: t,
                                                   v: n
                                               })
                                           }
                                       }(r, t, n), a && P(t) && i && (i[Yl][t] = n))
                                   }
                               },
                               hkErr: Yf(e, 71, Nf + ".setRequestHeader" + jf)
                           }), r = !0), function() {
                               var t, i = !(t = ie()) || Yt(t.Request) || Yt(t.Request[Z]) || Yt(t[Xf]) ? null : t[Xf];
                               if (i) {
                                   var o = ie(),
                                       c = i.polyfill;
                                   A || n ? c && T(ms(o, Xf, {
                                       ns: b,
                                       req: function(e, t, n) {
                                           U(null, t, n)
                                       }
                                   })) : (T(ms(o, Xf, {
                                       ns: b,
                                       req: function(t, i, o) {
                                           var u;
                                           if (!A && n && !U(null, i, o) && (!c || !r)) {
                                               var l = t.ctx();
                                               u = function(t, n) {
                                                   var r, i = D(),
                                                       o = i && i[vf]() || ya(),
                                                       c = ya()
                                                       .substr(0, 16),
                                                       u = new Df(o, c, e[qf](), null === (r = e.core) || void 0 === r ? void 0 : r.getTraceCtx());
                                                   u[Ml] = i && i[pf](), u[ff] = Ma(), u[hf] = s, t instanceof Request ? u[Xl] = t ? t.url : "" : u[Xl] = t;
                                                   var l = "GET";
                                                   n && n[gf] ? l = n[gf] : t && t instanceof Request && (l = t[gf]), u[gf] = l;
                                                   var f = {};
                                                   return a && new Headers((n ? n[Ql] : 0) || t instanceof Request && t[Ql] || {})
                                                       .forEach((function(e, t) {
                                                           P(t) && (f[t] = e)
                                                       })), u[Yl] = f, K(Xf, u), u
                                               }(i, o);
                                               var f = e[Gl](u, i, o);
                                               f !== o && t.set(1, f), l.data = u
                                           }
                                       },
                                       rsp: function(e, t) {
                                           if (!A) {
                                               var n = e.ctx()
                                                   .data;
                                               n && (e.rslt = e.rslt.then((function(e) {
                                                       return L(0, (e || {})[af], t, e, n, (function() {
                                                           var t = {
                                                               statusText: (e || {})[sf],
                                                               headerMap: null,
                                                               correlationContext: j(e)
                                                           };
                                                           if (g && e) {
                                                               var n = {};
                                                               e.headers.forEach((function(e, t) {
                                                                   P(t) && (n[t] = e)
                                                               })), t[cf] = n
                                                           }
                                                           return t
                                                       })), e
                                                   }))
                                                   .catch((function(e) {
                                                       throw L(0, 0, t, null, n, null, e.message || Lr(e)), e
                                                   })))
                                           }
                                       },
                                       hkErr: Yf(e, 15, "Failed to monitor Window.fetch" + jf)
                                   }, !0, function() {
                                       if (null == zf) try {
                                           zf = !!(self && self instanceof WorkerGlobalScope)
                                       } catch (e) {
                                           zf = !1
                                       }
                                       return zf
                                   }())), n = !0), c && (o[Xf].polyfill = c)
                               }
                           }(), (C = e[Wl].getPlugin(Ai)) && (u = C.plugin[Vl]))
                       }, e._doTeardown = function() {
                           k()
                       }, e.trackDependencyData = function(t, n) {
                           B(I, e[Wl], null, t, n)
                       }, e[Gl] = function(t, n, r, s) {
                           var c = e._currentWindowHost || i;
                           if (function(e, t, n, r, i, o) {
                                   if (e[Ll] > 0) {
                                       var a = {
                                           core: t,
                                           xhr: r,
                                           input: i,
                                           init: o,
                                           traceId: n[jl],
                                           spanId: n[Bl],
                                           traceFlags: n[Ml],
                                           context: n[Vl] || {},
                                           aborted: !!n[_l]
                                       };
                                       td(t, e, a, "listener"), n[jl] = a[Ol], n[Bl] = a[zl], n[Ml] = a[Ml], n[Vl] = a[Vl]
                                   }
                               }(C, e[Wl], t, s, n, r), n || "" === n) {
                               if (Ba[Zl](o, t[Jl](), c)) {
                                   r || (r = {});
                                   var d = new Headers(r[Ql] || n instanceof Request && n[Ql] || {});
                                   if (f) {
                                       var v = "|" + t[jl] + "." + t[Bl];
                                       d.set(Fa[3], v), a && (t[Yl][Fa[3]] = v)
                                   }
                                   if ((g = o[$l] || u && u[$l]()) && (d.set(Fa[0], Fa[2] + g), a && (t[Yl][Fa[0]] = Fa[2] + g)), l) {
                                       Yt(h = t[Ml]) && (h = 1);
                                       var p = Pa(Ra(t[jl], t[Bl], h));
                                       d.set(Fa[4], p), a && (t[Yl][Fa[4]] = p)
                                   }
                                   r[Ql] = d
                               }
                               return r
                           }
                           if (s) {
                               var g, h;
                               if (Ba[Zl](o, t[Jl](), c)) f && (Gf(s, Fa[3]) ? Qf(e, 71, "Unable to set [" + Fa[3] + "] as it has already been set by another instance") : (v = "|" + t[jl] + "." + t[Bl], s[ef](Fa[3], v), a && (t[Yl][Fa[3]] = v))), (g = o[$l] || u && u[$l]()) && (Gf(s, Fa[0]) ? Qf(e, 71, "Unable to set [" + Fa[0] + "] as it has already been set by another instance") : (s[ef](Fa[0], Fa[2] + g), a && (t[Yl][Fa[0]] = Fa[2] + g))), l && (Yt(h = t[Ml]) && (h = 1), Gf(s, Fa[4]) ? Qf(e, 71, "Unable to set [" + Fa[4] + "] as it has already been set by another instance") : (p = Pa(Ra(t[jl], t[Bl], h)), s[ef](Fa[4], p), a && (t[Yl][Fa[4]] = p)));
                               return s
                           }
                       }, e[tf] = function(t, n, r) {
                           if (-1 === p || c < p) {
                               2 !== o[nf] && 1 !== o[nf] || "string" != typeof t.id || "." === t.id[t.id[Ll] - 1] || (t.id += "."), Yt(t[rf]) && (t[rf] = new Date);
                               var i = Li(t, Oa.dataType, Oa.envelopeType, e[qf](), n, r);
                               e[Wl].track(i)
                           } else c === p && Jf(e, 55, "Maximum ajax per page view limit reached, ajax monitoring is paused until the next trackPageView(). In order to increase the limit set the maxAjaxCallsPerView configuration parameter.", !0);
                           ++c
                       }, e.addDependencyListener = function(e) {
                           return ed(C, S++, e)
                       }, e.addDependencyInitializer = function(e) {
                           return ed(I, S++, e)
                       }
                   })), R
               }
               return ue(t, e), t.prototype.processTelemetry = function(e, t) {
                   this.processNext(e, t)
               }, t.prototype.addDependencyInitializer = function(e) {
                   return null
               }, t.identifier = "AjaxDependencyPlugin", t.getDefaultConfig = od, t.getEmptyConfig = ad, t
           }(bs),
           cd = function() {},
           ud = function() {
               this.id = "browser", this.deviceClass = "Browser"
           },
           ld = "sessionManager",
           fd = "update",
           dd = "isUserCookieSet",
           vd = "isNewUser",
           pd = "getTraceCtx",
           gd = "telemetryTrace",
           hd = "applySessionContext",
           md = "applyApplicationContext",
           Ad = "applyDeviceContext",
           wd = "applyOperationContext",
           yd = "applyUserContext",
           bd = "applyOperatingSystemContxt",
           xd = "applyLocationContext",
           Sd = "applyInternalContext",
           Cd = "accountId",
           Id = "sdkExtension",
           Rd = "getSessionId",
           Td = "namePrefix",
           kd = "sessionCookiePostfix",
           Pd = "userCookiePostfix",
           Hd = "idLength",
           Ud = "getNewId",
           Fd = "length",
           Dd = "automaticSession",
           Ed = "authenticatedId",
           qd = "sessionExpirationMs",
           Kd = "sessionRenewalMs",
           Xd = "config",
           Nd = "acquisitionDate",
           Ld = "renewalDate",
           jd = "cookieDomain",
           Bd = "join",
           Md = "cookieSeparator",
           Vd = "authUserCookieName",
           _d = function(e) {
               this.sdkVersion = (e[Id] && e[Id]() ? e[Id]() + "_" : "") + "javascript:2.8.18"
           },
           Od = function() {},
           zd = function() {},
           Wd = function() {
               function e(t, n) {
                   var r, i, o = $r(n),
                       a = Io(n);
                   O(e, this, (function(n) {
                       t || (t = {}), nn(t[qd]) || (t[qd] = function() {
                           return e.acquisitionSpan
                       }), nn(t[Kd]) || (t[Kd] = function() {
                           return e.renewalSpan
                       }), n[Xd] = t;
                       var s = n.config[kd] && n[Xd][kd]() ? n.config[kd]() : n.config[Td] && n[Xd][Td]() ? n[Xd][Td]() : "";


                       function c(e, t) {
                           var n = !1,
                               r = ", session will be reset",
                               i = t.split("|");
                           if (i[Fd] >= 2) try {
                               var a = +i[1] || 0,
                                   s = +i[2] || 0;
                               isNaN(a) || a <= 0 ? ni(o, 2, 27, "AI session acquisition date is 0" + r) : isNaN(s) || s <= 0 ? ni(o, 2, 27, "AI session renewal date is 0" + r) : i[0] && (e.id = i[0], e[Nd] = a, e[Ld] = s, n = !0)
                           } catch (e) {
                               ni(o, 1, 9, "Error parsing ai_session value [" + (t || "") + "]" + r + " - " + In(e), {
                                   exception: Lr(e)
                               })
                           }
                           return n
                       }


                       function u(e, t) {
                           var o = e[Nd];
                           e[Ld] = t;
                           var s, c = n[Xd],
                               u = c[Kd](),
                               l = o + c[qd]() - t,
                               f = [e.id, o, t];
                           s = l < u ? l / 1e3 : u / 1e3;
                           var d = c[jd] ? c[jd]() : null;
                           a.set(r(), f.join("|"), c[qd]() > 0 ? s : null, d), i = t
                       }
                       r = function() {
                           return "ai_session" + s
                       }, n[Dd] = new zd, n[fd] = function() {
                           var t = Cn(),
                               s = !1,
                               l = n[Dd];
                           l.id || (s = ! function(e) {
                               var t = !1,
                                   n = a.get(r());
                               if (n && nn(n.split)) t = c(e, n);
                               else {
                                   var i = function(e, t) {
                                       var n = ui();
                                       if (null !== n) try {
                                           return n.getItem(t)
                                       } catch (t) {
                                           ai = !1, ni(e, 2, 1, "Browser failed read of local storage. " + In(t), {
                                               exception: Lr(t)
                                           })
                                       }
                                       return null
                                   }(o, r());
                                   i && (t = c(e, i))
                               }
                               return t || !!e.id
                           }(l));
                           var f = n.config[qd]();
                           if (!s && f > 0) {
                               var d = n.config[Kd](),
                                   v = t - l[Nd],
                                   p = t - l[Ld];
                               s = (s = (s = v < 0 || p < 0) || v > f) || p > d
                           }
                           s ? function(e) {
                               var t = n[Xd] || {},
                                   r = (t[Ud] ? t[Ud]() : null) || jo;
                               n.automaticSession.id = r(t[Hd] ? t[Hd]() : 22), n[Dd][Nd] = e, u(n[Dd], e), vi() || ni(o, 2, 0, "Browser does not support local storage. Session durations will be inaccurate.")
                           }(t) : (!i || t - i > e.cookieUpdateInterval) && u(l, t)
                       }, n.backup = function() {
                           var e, t, i, a = n[Dd];
                           e = a.id, t = a[Nd], i = a[Ld],
                               function(e, t, n) {
                                   var r = ui();
                                   if (null !== r) try {
                                       return r.setItem(t, n), !0
                                   } catch (t) {
                                       ai = !1, ni(e, 2, 3, "Browser failed write to local storage. " + In(t), {
                                           exception: Lr(t)
                                       })
                                   }
                               }(o, r(), [e, t, i][Bd]("|"))
                       }
                   }))
               }
               return e.acquisitionSpan = 864e5, e.renewalSpan = 18e5, e.cookieUpdateInterval = 6e4, e
           }(),
           Gd = function(e, t, n, r) {
               var i = this;
               i.traceID = e || ya(), i.parentID = t;
               var o = Dr();
               !n && o && o.pathname && (n = o.pathname), i.name = Hi(r, n)
           };


       function Zd(e) {
           return !("string" != typeof e || !e || e.match(/,|;|=| |\|/))
       }
       var Jd = function() {
               function e(t, n) {
                   this.isNewUser = !1, this.isUserCookieSet = !1;
                   var r, i = $r(n),
                       o = Io(n);
                   O(e, this, (function(n) {
                       n[Xd] = t;
                       var a = n.config[Pd] && n[Xd][Pd]() ? n[Xd][Pd]() : "";
                       r = function() {
                           return e.userCookieName + a
                       };
                       var s = o.get(r());
                       if (s) {
                           n[vd] = !1;
                           var c = s.split(e[Md]);
                           c[Fd] > 0 && (n.id = c[0], n[dd] = !!n.id)
                       }


                       function u() {
                           var e = t || {};
                           return ((e[Ud] ? e[Ud]() : null) || jo)(e[Hd] ? t[Hd]() : 22)
                       }


                       function l(e) {
                           var t = vn(new Date);
                           return n.accountAcquisitionDate = t, n[vd] = !0, [e, t]
                       }


                       function f(e) {
                           n[dd] = o.set(r(), e, 31536e3)
                       }
                       if (!n.id) {
                           n.id = u(), f(l(n.id)[Bd](e[Md]));
                           var d = t[Td] && t[Td]() ? t[Td]() + "ai_session" : "ai_session";
                           ! function(e, t) {
                               var n = ui();
                               if (null !== n) try {
                                   return n[Bn](t), !0
                               } catch (t) {
                                   ai = !1, ni(e, 2, 5, "Browser failed removal of local storage item. " + In(t), {
                                       exception: Lr(t)
                                   })
                               }
                           }(i, d)
                       }
                       n[Cd] = t[Cd] ? t[Cd]() : void 0;
                       var v = o.get(e[Vd]);
                       if (v) {
                           var p = (v = decodeURI(v))
                               .split(e[Md]);
                           p[0] && (n[Ed] = p[0]), p[Fd] > 1 && p[1] && (n[Cd] = p[1])
                       }
                       n.setAuthenticatedUserContext = function(t, r, a) {
                           if (void 0 === a && (a = !1), !Zd(t) || r && !Zd(r)) ni(i, 2, 60, "Setting auth user context failed. User auth/account id should be of type string, and not contain commas, semi-colons, equal signs, spaces, or vertical-bars.", !0);
                           else {
                               n[Ed] = t;
                               var s = n[Ed];
                               r && (n[Cd] = r, s = [n[Ed], n.accountId][Bd](e[Md])), a && o.set(e[Vd], encodeURI(s))
                           }
                       }, n.clearAuthenticatedUserContext = function() {
                           n[Ed] = null, n[Cd] = null, o.del(e[Vd])
                       }, n[fd] = function(t) {
                           n.id === t && n[dd] || f(l(t || u())[Bd](e[Md]))
                       }
                   }))
               }
               return e.cookieSeparator = "|", e.userCookieName = "ai_user", e.authUserCookieName = "ai_authUser", e
           }(),
           Qd = "ext",
           Yd = "tags";


       function $d(e, t) {
           e && e[t] && 0 === yn(e[t])[Fd] && delete e[t]
       }
       var ev = function() {
               function e(t, n, r) {
                   var i = this,
                       o = t.logger;
                   this.appId = function() {
                       return null
                   }, this[Rd] = function() {
                       return null
                   }, O(e, this, (function(e) {
                       if (e.application = new cd, e.internal = new _d(n), Rr()) {
                           e[ld] = new Wd(n, t), e.device = new ud, e.location = new Od, e.user = new Jd(n, t);
                           var a, s = void 0,
                               c = void 0;
                           r && (s = r.getTraceId(), c = r.getSpanId(), a = r.getName()), e[gd] = new Gd(s, c, a, o), e.session = new zd
                       }
                       e[Rd] = function() {
                           var t = e.session,
                               n = null;
                           if (t && ln(t.id)) n = t.id;
                           else {
                               var r = (e[ld] || {})[Dd];
                               n = r && ln(r.id) ? r.id : null
                           }
                           return n
                       }, e[hd] = function(t, n) {
                           Rn(Tn(t.ext, Vc), "sesId", e[Rd](), ln)
                       }, e[bd] = function(t, n) {
                           Rn(t.ext, _c, e.os)
                       }, e[md] = function(t, n) {
                           var r = e.application;
                           if (r) {
                               var i = Tn(t, Yd);
                               Rn(i, Oc.applicationVersion, r.ver, ln), Rn(i, Oc.applicationBuild, r.build, ln)
                           }
                       }, e[Ad] = function(t, n) {
                           var r = e.device;
                           if (r) {
                               var i = Tn(Tn(t, Qd), jc);
                               Rn(i, "localId", r.id, ln), Rn(i, "ip", r.ip, ln), Rn(i, "model", r.model, ln), Rn(i, "deviceClass", r.deviceClass, ln)
                           }
                       }, e[Sd] = function(t, n) {
                           var r = e.internal;
                           if (r) {
                               var i = Tn(t, Yd);
                               Rn(i, Oc.internalAgentVersion, r.agentVersion, ln), Rn(i, Oc.internalSdkVersion, Hi(o, r.sdkVersion, 64), ln), t.baseType !== Yr.dataType && t.baseType !== _i.dataType || (Rn(i, Oc.internalSnippet, r.snippetVer, ln), Rn(i, Oc.internalSdkSrc, r.sdkSrc, ln))
                           }
                       }, e[xd] = function(e, t) {
                           var n = i.location;
                           n && Rn(Tn(e, Yd, []), Oc.locationIp, n.ip, ln)
                       }, e[wd] = function(t, n) {
                           var r = e[gd];
                           if (r) {
                               var i = Tn(Tn(t, Qd), Bc, {
                                   traceID: void 0,
                                   parentID: void 0
                               });
                               Rn(i, "traceID", r.traceID, ln, Yt), Rn(i, "name", r.name, ln, Yt), Rn(i, "parentID", r.parentID, ln, Yt)
                           }
                       }, e.applyWebContext = function(e, t) {
                           var n = i.web;
                           n && Rn(Tn(e, Qd), Mc, n)
                       }, e[yd] = function(t, n) {
                           var r = e.user;
                           if (r) {
                               Rn(Tn(t, Yd, []), Oc.userAccountId, r[Cd], ln);
                               var i = Tn(Tn(t, Qd), Lc);
                               Rn(i, "id", r.id, ln), Rn(i, "authId", r[Ed], ln)
                           }
                       }, e.cleanUp = function(e, t) {
                           var n = e.ext;
                           n && ($d(n, jc), $d(n, Lc), $d(n, Mc), $d(n, _c), $d(n, Vc), $d(n, Bc))
                       }
                   }))
               }
               return e.__ieDyn = 1, e
           }(),
           tv = function(e) {
               function t() {
                   var n, r, i, o = e.call(this) || this;
                   return o.priority = 110, o.identifier = Ai, O(t, o, (function(e, o) {
                       function a() {
                           n = null, r = null, i = null
                       }
                       a(), e.initialize = function(a, s, c, u) {
                           o.initialize(a, s, c, u),
                               function(o) {
                                   var a = e.identifier,
                                       s = e.core,
                                       c = ss(null, o, s),
                                       u = t.getDefaultConfig();
                                   n = n || {}, on(u, (function(e, t) {
                                       n[e] = function() {
                                           return c.getConfig(a, e, t())
                                       }
                                   })), o.storagePrefix && di(o.storagePrefix), i = s[pd](!1), e.context = new ev(s, n, i), r = _a(e.context[gd], i), s.setTraceCtx(r), e.context.appId = function() {
                                       var e = s.getPlugin(wi);
                                       return e ? e.plugin._appId : null
                                   }, e._extConfig = n
                               }(a)
                       }, e.processTelemetry = function(t, n) {
                           if (Yt(t));
                           else {
                               n = e._getTelCtx(n), t.name === _i.envelopeType && n.diagLog()
                                   .resetInternalMessageCount();
                               var r = e.context || {};
                               r.session && "string" != typeof e.context.session.id && r[ld] && r[ld][fd]();
                               var i = r.user;
                               if (i && !i[dd] && i[fd](r.user.id), function(t, n) {
                                       Tn(t, "tags", []), Tn(t, "ext", {});
                                       var r = e.context;
                                       r[hd](t, n), r[md](t, n), r[Ad](t, n), r[wd](t, n), r[yd](t, n), r[bd](t, n), r.applyWebContext(t, n), r[xd](t, n), r[Sd](t, n), r.cleanUp(t, n)
                                   }(t, n), i && i[vd]) {
                                   i[vd] = !1;
                                   var o = new Yr(72, (Ur() || {})
                                       .userAgent || "");
                                   ! function(e, t, n) {
                                       ti(e)[$e](1, n)
                                   }(n.diagLog(), 0, o)
                               }
                               e.processNext(t, n)
                           }
                       }, e._doTeardown = function(e, t) {
                           var n = (e || {})
                               .core();
                           n && n[pd] && n[pd](!1) === r && n.setTraceCtx(i), a()
                       }
                   })), o
               }
               return ue(t, e), t.getDefaultConfig = function() {
                   var e, t, n = null;
                   return (e = {
                       instrumentationKey: function() {
                           return t
                       }
                   })[Cd] = function() {
                       return n
                   }, e.sessionRenewalMs = function() {
                       return 18e5
                   }, e.samplingPercentage = function() {
                       return 100
                   }, e.sessionExpirationMs = function() {
                       return 864e5
                   }, e[jd] = function() {
                       return n
                   }, e[Id] = function() {
                       return n
                   }, e.isBrowserLinkTrackingEnabled = function() {
                       return !1
                   }, e.appId = function() {
                       return n
                   }, e[Rd] = function() {
                       return n
                   }, e[Td] = function() {
                       return t
                   }, e[kd] = function() {
                       return t
                   }, e[Pd] = function() {
                       return t
                   }, e[Hd] = function() {
                       return 22
                   }, e[Ud] = function() {
                       return n
                   }, e
               }, t
           }(bs);
       const nv = tv;
       var rv, iv = "AuthenticatedUserContext",
           ov = "track",
           av = "snippet",
           sv = "flush",
           cv = "pollInternalLogs",
           uv = "getPlugin",
           lv = "evtNamespace",
           fv = ov + "Event",
           dv = ov + "Trace",
           vv = ov + "Metric",
           pv = ov + "PageView",
           gv = ov + "Exception",
           hv = ov + "DependencyData",
           mv = "set" + iv,
           Av = "clear" + iv,
           wv = "endpointUrl",
           yv = "diagnosticLogInterval",
           bv = "config",
           xv = "context",
           Sv = "push",
           Cv = "version",
           Iv = "queue",
           Rv = "connectionString",
           Tv = "instrumentationKey",
           kv = "appInsights",
           Pv = "disableIkeyDeprecationMessage",
           Hv = "getTransmissionControls",
           Uv = "onunloadFlush",
           Fv = "addHousekeepingBeforeUnload",
           Dv = "indexOf",
           Ev = [av, "dependencies", "properties", "_snippetVersion", "appInsightsNew", "getSKUDefaults"],
           qv = function() {
               function e(t) {
                   var n, r, i, o, a, s, c, u = this;
                   O(e, this, (function(e) {
                       a = zo("AISKU"), s = null, null, null, null, null, o = "" + (t.sv || t[Cv] || ""), t[Iv] = t[Iv] || [], t[Cv] = t[Cv] || 2;
                       var l = t[bv] || {};
                       if (l[Rv]) {
                           var f = bl(l[Rv]),
                               d = f.ingestionendpoint;
                           l[wv] = d ? d + Ii : l[wv], l[Tv] = f.instrumentationkey || l[Tv]
                       }
                       e[kv] = new Tc, r = new nv, n = new sd, i = new yl, c = new El, e.core = c;
                       var v = !!Yt(l[Pv]) || l[Pv];
                       l[Rv] || v || ni(c.logger, 1, 106, "Instrumentation key support will end soon, see aka.ms/IkeyMigrate"), e[av] = t, e[bv] = l, e.config[yv] = e.config[yv] && e[bv][yv] > 0 ? e[bv][yv] : 1e4, e[sv] = function(e) {
                           void 0 === e && (e = !0), Ya(c, (function() {
                               return "AISKU.flush"
                           }), (function() {
                               pn(c[Hv](), (function(t) {
                                   pn(t, (function(t) {
                                       t[sv](e)
                                   }))
                               }))
                           }), null, e)
                       }, e[Uv] = function(e) {
                           void 0 === e && (e = !0), pn(c[Hv](), (function(t) {
                               pn(t, (function(t) {
                                   t[Uv] ? t[Uv]() : t[sv](e)
                               }))
                           }))
                       }, e.loadAppInsights = function(t, a, s) {
                           return void 0 === t && (t = !1), t && e[bv].extensions && e[bv].extensions.length > 0 && Hn("Extensions not allowed in legacy mode"), Ya(e.core, (function() {
                               return "AISKU.loadAppInsights"
                           }), (function() {
                               var u = [];
                               u[Sv](i), u[Sv](r), u[Sv](n), u[Sv](e[kv]), c.initialize(e[bv], u, a, s), e[xv] = r[xv], rv && e[xv] && (e[xv].internal.sdkSrc = rv),
                                   function(n) {
                                       if (n) {
                                           var r = "";
                                           Yt(o) || (r += o), t && (r += ".lg"), e[xv] && e[xv].internal && (e[xv].internal.snippetVer = r || "-"), on(e, (function(e, t) {
                                               ln(e) && !nn(t) && e && "_" !== e[0] && -1 === gn(Ev, e) && (n[e] = t)
                                           }))
                                       }
                                   }(e[av]), e.emptyQueue(), e[cv](), e[Fv](e)
                           })), e
                       }, e.updateSnippetDefinitions = function(t) {
                           ! function(e, t, n) {
                               if (e && t && tn(e) && tn(t)) {
                                   var r = function(r) {
                                       if (ln(r)) {
                                           var i = t[r];
                                           nn(i) ? n && !n(r) || (e[r] = Un(t, r)) : n && !n(r) || (en(e, r) && delete e[r], bn(e, r, (function() {
                                               return t[r]
                                           }), (function(e) {
                                               t[r] = e
                                           })) || (e[r] = i))
                                       }
                                   };
                                   for (var i in t) r(i)
                               }
                           }(t, e, (function(e) {
                               return e && -1 === gn(Ev, e)
                           }))
                       }, e.emptyQueue = function() {
                           try {
                               if (cn(e.snippet[Iv])) {
                                   for (var t = e.snippet[Iv].length, n = 0; n < t; n++)(0, e.snippet[Iv][n])();
                                   e.snippet[Iv] = void 0, delete e.snippet[Iv]
                               }
                           } catch (e) {
                               e && nn(e.toString) && e.toString()
                           }
                       }, e[Fv] = function(e) {
                           if (Rr() || kr()) {
                               var t = function() {
                                       if (e[Uv](!1), nn(u.core[uv])) {
                                           var t = u.core[uv](Ai);
                                           if (t) {
                                               var n = t.plugin;
                                               n && n[xv] && n[xv]._sessionManager && n[xv]._sessionManager.backup()
                                           }
                                       }
                                   },
                                   n = !1,
                                   r = e.appInsights[bv].disablePageUnloadEvents;
                               s || (s = pa(a, c[lv] && c[lv]())), e.appInsights.config.disableFlushOnBeforeUnload || (function(e, t, n, r) {
                                   var i = !1;
                                   return t && e && cn(e) && !(i = ma(e, t, n, r)) && n && n[ye] > 0 && (i = ma(e, t, null, r)), i
                               }([na, ta, ea], t, r, s) && (n = !0), wa(t, r, s) && (n = !0), n || (i = Ur()) && i.product && "ReactNative" === i.product || ni(e[kv].core.logger, 1, 19, "Could not add handler for beforeunload and pagehide")), n || e.appInsights.config.disableFlushOnUnload || wa(t, r, s)
                           }
                           var i
                       }, e.getSender = function() {
                           return i
                       }, e.unload = function(t, n, r) {
                           var i;
                           e[Uv](t), s && (Aa([na, ta, ea], null, s), i = pa(ra, s), Aa([ea], null, i), Aa([$o], null, i)), c.unload && c.unload(t, n, r)
                       }, Dn(e, e[kv], ["getCookieMgr", fv, pv, "trackPageViewPerformance", gv, "_onerror", dv, vv, "startTrackPage", "stopTrackPage", "startTrackEvent", "stopTrackEvent"]), Dn(e, (function() {
                           return n
                       }), [hv, "addDependencyListener", "addDependencyInitializer"]), Dn(e, c, ["addTelemetryInitializer", cv, "stopPollingInternalLogs", uv, "addPlugin", lv, "addUnloadCb", "getTraceCtx"]), Dn(e, (function() {
                           var e = r[xv];
                           return e ? e.user : null
                       }), [mv, Av])
                   }))
               }
               return e.prototype.addDependencyInitializer = function(e) {
                   return null
               }, e
           }();
       ! function() {
           var e = null,
               t = ["://js.monitor.azure.com/", "://az416426.vo.msecnd.net/"];
           try {
               var n = (document || {})
                   .currentScript;
               n && (e = n.src)
           } catch (e) {}
           if (e) try {
               var r = e.toLowerCase();
               if (r)
                   for (var i = "", o = 0; o < t.length; o++)
                       if (-1 !== r[Dv](t[o])) {
                           i = "cdn" + (o + 1), -1 === r[Dv]("/scripts/") && (-1 !== r[Dv]("/next/") ? i += "-next" : -1 !== r[Dv]("/beta/") && (i += "-beta")), rv = i + "";
                           break
                       }
           } catch (e) {}
       }();
       var Kv = __webpack_require__(246);
       const Xv = /[\W_]+/g;


       function Nv(e) {
           return e.replace(Xv, "")
               .toUpperCase()
       }


       function Lv(e, t = 32) {
           const n = Mv(e);
           let r = Kv.sha256.create();
           r.update(n);
           const i = r.array();
           let o = [];
           for (let e = 0; e < t; e++) o[e] = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ" [i[e] % 36];
           return o.join("")
               .toLowerCase() + "-mms"
       }


       function jv(e) {
           const t = Mv(e);
           let n = Kv.sha256.create();
           return n.update(t), n.toString()
       }


       function Bv(e) {
           const t = e.charCodeAt(0),
               n = "0".charCodeAt(0),
               r = "9".charCodeAt(0),
               i = "A".charCodeAt(0),
               o = "Z".charCodeAt(0);
           return t >= n && t <= r ? t - n : t >= i && t <= o ? t - i + 10 : -1
       }


       function Mv(e) {
           return unescape(encodeURIComponent(e))
       }
       let Vv, _v;


       function Ov(e, t) {
           Vv = new qv({
               config: {
                   connectionString: t,
                   disableCorrelationHeaders: !1,
                   enableCorsCorrelation: !0,
                   disableFetchTracking: !0
               }
           }), Vv.loadAppInsights(), e && (Vv.context.user = {
               id: jv(e.Email.toLowerCase()),
               accountId: e.Serial
           }, Vv.context.application.ver = e.ClientVersion, Vv.context.device = {
               id: e.Hostname
           }, Vv.context.os = {
               name: "ChromeOS"
           })
       }


       function zv(e, t, n = 1) {
           Gv(t)
               .then((t => {
                   console.debug("Logging to app insights.", e, t), Vv.trackTrace({
                       message: `mms-${e}`,
                       properties: t,
                       severityLevel: n
                   })
               }))
               .catch((e => {
                   console.error("Error logging to app insights", e)
               }))
       }


       function Wv(e, t, n = "") {
           Gv(t, n)
               .then((t => {
                   Vv.trackException({
                       error: e,
                       properties: t,
                       severityLevel: 3
                   })
               }))
               .catch((e => {
                   console.error("Error logging error to app insights", e)
               }))
       }


       function Gv(e, r = "") {
           if (void 0 === Vv) {
               const e = [t.get(n.storageKeys.sessionData), t.get(n.storageKeys.config)];
               r ? Ov(null, r) : Promise.all(e)
                   .then((e => {
                       var t;
                       Ov(e[0], null === (t = e[1]) || void 0 === t ? void 0 : t.appInsightsConnectionString)
                   }))
           }
           return async function() {
                   var e, r, i;
                   const o = await t.get(n.storageKeys.sessionData);
                   let a = {
                       os: "ChromeOS",
                       extensionId: null === (e = null === chrome || void 0 === chrome ? void 0 : chrome.runtime) || void 0 === e ? void 0 : e.id,
                       chromeVersion: null === (r = navigator.userAgentData) || void 0 === r ? void 0 : r.brands.find((({
                           brand: e,
                           version: t
                       }) => "Chromium" === e)),
                       internalVersion: n.versionNumber
                   };
                   return o && (a = Object.assign(Object.assign({}, a), {
                       userId: jv(null === (i = o.Email) || void 0 === i ? void 0 : i.toLowerCase()),
                       serial: o.Serial,
                       orgId: o.OrgID,
                       device: o.Hostname,
                       extensionVersion: o.ClientVersion
                   })), a
               }()
               .then((t => e = Object.assign(Object.assign({}, e), t)))
       }
       let Zv, Jv = !1,
           Qv = !1,
           Yv = null,
           $v = !1,
           ep = null,
           tp = null;


       function np(e, t, n, r, i, o) {
           let a = 0;
           n > 10 && (a = 20 * (n - 10) * 60 * 60), n > 0 && n <= 10 && (a = 100 * 2 ** (n - 1)), zv(e, {
               responseCode: t,
               transmissionAttempts: n,
               willRetry: r,
               nextRetry: a,
               pendingCaptures: i,
               invocId: o
           }, 2)
       }
       const rp = async () => {
           try {
               await ap()
           } catch (e) {
               console.error("Error when sending telemetry: ", e)
           }
       };
       async function ip(e) {
           if ("capture" === e.ev && await cp()) {
               console.log("Received a capture."), console.log(e), c.logInfo("Received a capture IPC: ", e.capturedText);
               var r = new Date;
               const i = await t.get(n.storageKeys.sessionData);
               let o;
               try {
                   o = await chrome.tabs.captureVisibleTab()
               } catch (t) {
                   "User search" !== e.trigger && Wv(new Error(`Failed generating screenshot: ${t.message}`), {
                       trigger: e.trigger
                   })
               }
               const a = {
                   OrgID: i.OrgID,
                   Hostname: i.Hostname,
                   OSVersion: i.OSVersion,
                   WindowsDomain: i.WindowsDomain,
                   ClientVersion: i.ClientVersion,
                   Username: i.Email,
                   IPs: i.IPs,
                   debug: i.debug,
                   Message: e.capturedText,
                   Starttime: r.getTime() / 1e3,
                   Trigger: e.trigger,
                   FileContentType: "image/jpeg",
                   WaitingForInitalResponse: !0,
                   TransmissionAttempts: 0
               };
               void 0 !== i.Serial && "" !== i.Serial && (a.Serial = i.Serial), e.title && "" !== e.title && (a.WindowTitle = e.title), e.iFrame && (a.processName = "iframe"), void 0 !== o && o.length > 0 ? (a.File = o.replace(/^data:image\/jpeg;base64,/, ""), await c.spoolPayload(a)) : (a.File = "/9j/4AAQSkZJRgABAQEAYABgAAD/4QAiRXhpZgAATU0AKgAAAAgAAQESAAMAAAABAAEAAAAAAAD/2wBDAAIBAQIBAQICAgICAgICAwUDAwMDAwYEBAMFBwYHBwcGBwcICQsJCAgKCAcHCg0KCgsMDAwMBwkODw0MDgsMDAz/2wBDAQICAgMDAwYDAwYMCAcIDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAz/wAARCACKAskDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwD9/KKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAoooo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ZFltpYpB8sjjG7BDcg8V67RUyjGStJX2f3ar7nqioya1Rwn7NP7M/gf9j34J6H8OfhvoEPhjwZ4bSSPT9OinmuBAJJGlcmSZ3kdmkd2LOxJLHmu7oorSUpSfNJ3bM4xUVaIUUUVJQUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQB//Z", await c.spoolPayload(a))
           }
       }
       async function op(e) {
           return 400 == e.status && (await e.text())
               .startsWith("SERVER ERROR:")
       }
       async function ap() {
           const e = await t.get(n.storageKeys.sessionData),
               r = await t.get(n.storageKeys.config),
               i = await Promise.all([e, r]),
               o = i[0],
               a = i[1],
               u = {
                   OrgID: o.OrgID,
                   Hostname: o.Hostname,
                   OSVersion: o.OSVersion,
                   WindowsDomain: o.WindowsDomain,
                   ClientVersion: o.ClientVersion,
                   IPs: o.IPs,
                   LastSuccessfulSignal: o.LastSuccessfulSignal,
                   debug: o.debug
               },
               l = `${a.APIHostname}/api/client/v1/update/check?key=${a.APIKey}&clientversion=${o.ClientVersion}`;
           let f = !1;
           try {
               const e = await c.postVisigo(l, u);
               if (200 === e.status) c.logInfo("Telemetry sent.");
               else {
                   if (c.logInfo(`Response code ${e.status} recieved from telemetry endpoint.`, {
                           response: e,
                           payload: u
                       }), 402 === e.status && !lp()) return f = !0, await up(a), np(l, e.status, 1, !0, [], s()), void ap();
                   np(l, e.status, 1, !1, [], s())
               }
               await sp(a, e, f)
           } catch (e) {
               c.logError("Error when sending telemetry:", e), Wv(e, {
                   requestUrl: l
               }), "AbortError" === e.name || void 0 !== o.Serial && "" !== o.Serial || lp() || await up(a)
           }
       }
       async function sp(e, r, i = !1) {
           let o = !0;
           if (402 !== r.status || i || (o = !1), _v != o) {
               const e = await t.get(n.storageKeys.sessionData);
               e && (e.isLicensed = !0, await t.set(n.storageKeys.sessionData, e))
           }
           _v = o, await async function(e) {
               !fp(e) || 1 != Qv && 1 != Jv || (await t.set(n.storageKeys.successfulFallbackUrl, e.APIHostname), Qv = !1, Jv = !1)
           }(e), c.logInfo("License Valid: " + o)
       }
       async function cp() {
           if (!1 === _v) return !1;
           const e = await t.get(n.storageKeys.sessionData);
           return !e || !1 !== e.isLicensed || (_v = !1, !1)
       }
       async function up(e) {
           var r;
           const i = e.APIHostname;
           if (i == Zv.fallbackAPIHostnameUs) Qv = !0, e.APIHostname = Zv.fallbackAPIHostnameUk;
           else if (i == e.fallbackAPIHostnameUk) Jv = !0, e.APIHostname = Zv.fallbackAPIHostnameUs;
           else {
               const t = chrome.i18n.getUILanguage(),
                   n = null !== (r = null == t ? void 0 : t.split("-")[1]) && void 0 !== r ? r : "us";
               e.APIHostname = "us" == n ? Zv.fallbackAPIHostnameUs : e.fallbackAPIHostnameUk
           }
           return await t.set(n.storageKeys.config, e), zv("Use Regional Endpoints", {
               fallbackUrl: e.APIHostname,
               initialUrl: i
           }, 1), c.logInfo("Failed using the current endpoint, trying the regional endpoint:", e.APIHostname), e
       }


       function lp() {
           return Jv && Qv
       }
       const fp = e => e.APIHostname === Zv.fallbackAPIHostnameUk || e.APIHostname === Zv.fallbackAPIHostnameUs;


       function dp(e) {
           if (void 0 !== e.initiator) return {
               cancel: !1
           };
           const t = function(e) {
               const t = new Set;
               return u.forEach((n => {
                   var r;
                   const i = new RegExp(n);
                   i.lastIndex = 0, null === (r = i.exec(e)) || void 0 === r || r.slice(1)
                       .forEach((e => t.add(e)))
               })), [...t].join("")
           }(e.url);
           var n;
           return 0 !== t.length ? (ip({
                   iFrame: !1,
                   ev: "capture",
                   capturedText: (n = (n = t)
                       .replace(/[\u2000-\u206F\u2E00-\u2E7F\\'!"#$&()*+,\-./:;<=>?@[\]^_`{|}~\s]+/g, " "), n = decodeURIComponent(n)),
                   title: "N/A",
                   trigger: "User search"
               })
               .catch((e => {
                   Wv(new Error(`Failed saving user search capture: ${e.message}`), {})
               })), {
                   cancel: !1
               }) : void 0
       }
       const vp = JSON.parse('{"debugMode":"live","APIKey":"AIzaSyBfxsdTLe2VFd_KZGXv_ueAOULWY-KV22w","mode":"prd","appInsightsConnectionString":"InstrumentationKey=a83f7689-c452-430b-bf3f-d564f3a22d91;IngestionEndpoint=https://ukwest-0.in.applicationinsights.azure.com/;LiveEndpoint=https://ukwest.livediagnostics.monitor.azure.com/","fallbackAPIHostnameUk":"https://vclient-api.smoothwall.com","fallbackAPIHostnameUs":"https://vclient-api-us.smoothwall.com"}');
       chrome.runtime.onInstalled.addListener((() => {
           chrome.tabs.query({}, (function(t) {
               0 !== t.length && t.forEach((t => {
                   e(t)
               }))
           }))
       }));
       const pp = Object.assign({}, vp);
       var gp;
       async function hp(e, r = !0) {
           try {
               ! function(e) {
                   const t = "update_url" in chrome.runtime.getManifest() && "prd" === e.mode;
                   if (navigator.appVersion.indexOf("CrOS") < 0 && t) throw Error("Smoothwall Chrome Extension only runs on Chrome OS devices such as Chromebooks.")
               }(e), await t.set(n.storageKeys.debugMode, e.debugMode);
               const i = [new Promise((e => {
                   var t;
                   void 0 !== (null === (t = chrome.enterprise) || void 0 === t ? void 0 : t.networkingAttributes) ? chrome.enterprise.networkingAttributes.getNetworkDetails((t => {
                       var n, r, i;
                       if (void 0 !== chrome.runtime.lastError) return c.logLive("Could not get the ip address for the device. " + chrome.runtime.lastError.message), e(void 0);
                       const o = null !== (r = null !== (n = null == t ? void 0 : t.ipv4) && void 0 !== n ? n : null == t ? void 0 : t.ipv6) && void 0 !== r ? r : "N/A",
                           a = null !== (i = null == t ? void 0 : t.macAddress) && void 0 !== i ? i : "N/A";
                       e({
                           ip: o,
                           macAddress: a
                       })
                   })) : e(void 0)
               })), new Promise((function(e, t) {
                   chrome.identity.getProfileUserInfo({
                       accountStatus: "ANY"
                   }, (function(t) {
                       e(t.email)
                   }))
               })), Ap(), mp()];
               let o = function(e) {
                   const t = {
                       OrgID: "",
                       Hostname: "",
                       OSVersion: "ChromeOS",
                       ClientVersion: 0,
                       IPs: [],
                       WindowsDomain: "",
                       Username: "",
                       Email: "",
                       Message: "",
                       Starttime: 0,
                       WindowTitle: "",
                       Trigger: "",
                       LastSuccessfulSignal: 0,
                       debug: !0,
                       Serial: "",
                       isLicensed: !0
                   };
                   return void 0 !== e[0] && t.IPs.push({
                       IP: e[0].ip,
                       MAC: e[0].macAddress
                   }), void 0 !== e[1] && (t.Email = e[1], t.Username = t.Email.split("@")[0]), t.LastSuccessfulSignal = e[2], t.Hostname = e[3], t
               }(await Promise.all(i));
               const a = await async function(e, r) {
                   const i = await t.get(n.storageKeys.successfulFallbackUrl);
                   return new Promise((function(t, n) {
                       chrome.storage.managed.get((function(n) {
                           var o;
                           if (null != n.Smoothwall && null != n.Smoothwall.OrgID ? e.OrgID = n.Smoothwall.OrgID : null != n.Visigo && null != n.Visigo.OrgID && (e.OrgID = n.Visigo.OrgID), null != n.Smoothwall && null != n.Smoothwall.serial && (e.Serial = n.Smoothwall.serial), e.Serial.length <= 0)
                               if (null != n.Smoothwall && null != n.Smoothwall.APIHostname) r.APIHostname = n.Smoothwall.APIHostname, c.logInfo("Policy: APIHostname = " + r.APIHostname);
                               else {
                                   if (void 0 !== i && "" !== i) r.APIHostname = i;
                                   else {
                                       const e = chrome.i18n.getUILanguage(),
                                           t = null !== (o = null == e ? void 0 : e.split("-")[1]) && void 0 !== o ? o : "us";
                                       r.APIHostname = "gb" === t.toLowerCase() ? r.fallbackAPIHostnameUk : r.fallbackAPIHostnameUs
                                   }
                                   c.logInfo("Using fallback api: ", r.APIHostname)
                               }
                           else r.APIHostname = function(e, t) {
                               e || (e = t.Serial), c.logInfo(`Sanitizing ${e}`);
                               let n = Nv(e);
                               c.logInfo("serial", n);
                               let r = function(e) {
                                   return c.logInfo("serial", e), 16 !== e.length ? {
                                       isValid: !1,
                                       reason: "Must have the same length as the serialLength member = 16"
                                   } : e.toUpperCase() !== e ? {
                                       isValid: !1,
                                       reason: "Must be upper case"
                                   } : e.startsWith("UNCL") ? Nv(e) !== e ? {
                                       isValid: !1,
                                       reason: "Must be only alphanumerical characters"
                                   } : function(e) {
                                       let t = new Array(16);
                                       t.fill(0);
                                       for (let n = 0; n < 14; ++n) t[n] = Bv(e[n]);
                                       for (let e = 0; e < 14; e += 2) t[14] += t[e] * (e + 1) + e + 12;
                                       t[14] %= 36;
                                       for (let e = 1; e < 14; e += 2) t[15] += t[e] * (e + 1) + e + 29;
                                       return t[15] %= 36, Bv(e[14]) === t[14] && Bv(e[15]) === t[15]
                                   }(e) ? {
                                       isValid: !0
                                   } : {
                                       isValid: !1,
                                       reason: "Must pass checkSum"
                                   } : {
                                       isValid: !1,
                                       reason: "Must start with UNCL"
                                   }
                               }(n);
                               if (c.logInfo("serial check", r), r.isValid) {
                                   const e = `https://${Lv(n)}.smoothwall.cloud`;
                                   return console.log("new hostname", `https://${Lv(n)}.smoothwall.cloud`), e
                               }
                               r.reason
                           }(e.Serial, r);
                           null != n.Smoothwall && null != n.Smoothwall.debugMode && (c.logInfo("Policy: debugMode = " + n.Smoothwall.debugMode), r.debugMode = n.Smoothwall.debugMode), t({
                               sessionData: e,
                               config: r
                           })
                       }))
                   }))
               }(o, e);
               o = a.sessionData, e = a.config, o.OrgID || (o.OrgID = await async function(e) {
                   let r = "";
                   const i = await t.get(n.storageKeys.sessionData);
                   return i && i.OrgID ? (r = i.OrgID, c.logInfo("Storage: OrgID = ", r)) : r = "OrgID" in e ? e.OrgID : null, c.logInfo("OrgID:", r), r
               }(e)), o = function(e) {
                   return e.WindowsDomain = function(e) {
                       const t = e.split("@")[1];
                       return c.logInfo("WindowsDomain: " + t), t
                   }(e.Email), e.ClientVersion = function() {
                       const e = chrome.runtime.getManifest()
                           .version;
                       return c.logInfo("Client Version: " + e), e
                   }(), e
               }(o);
               const s = t.set(n.storageKeys.sessionData, o),
                   u = t.set(n.storageKeys.config, e);
               await Promise.all([s, u]);
               const l = Object.assign({}, o);
               l.Email = jv(o.Email.toLowerCase()), l.Username = "", r ? (Ov(o, e.appInsightsConnectionString), zv("extension-started", {
                   sessionData: l,
                   config: e
               })) : zv("policy-changed", {
                   sessionData: l,
                   config: e
               }), c.logLive("Monitor extension successfully loaded.")
           } catch (e) {
               try {
                   Wv(e, {}, pp.appInsightsConnectionString)
               } catch (e) {}
               c.logError("Smoothwall Monitor extension can not start due to error:", e)
           }
       }
       async function mp() {
           try {
               const e = await async function() {
                   var e, t;
                   return void 0 === (null === (t = null === (e = chrome.enterprise) || void 0 === e ? void 0 : e.deviceAttributes) || void 0 === t ? void 0 : t.getDeviceSerialNumber) ? "" : await new Promise((e => {
                       chrome.enterprise.deviceAttributes.getDeviceSerialNumber((t => {
                           e(t)
                       }))
                   }))
               }();
               return "" === e ? await c.GenerateGUID() : (c.logInfo("Hostname:", e), e)
           } catch (e) {
               return t.get(n.storageKeys.sessionData)
                   .then((e => {
                       if (!e || !e.Hostname) return c.logInfo("Unable to fetch serial number."), c.GenerateGUID()
                   }))
           }
       }
       async function Ap() {
           const e = await t.get(n.storageKeys.sessionData);
           if (!e) return 0;
           const r = e.LastSuccessfulSignal;
           return isNaN(r) ? 0 : r
       }
       async function wp(e) {
           const r = await t.get(n.storageKeys.sessionData);
           r && (r.LastSuccessfulSignal = e, await t.set(n.storageKeys.sessionData, r), c.logInfo("Updated lastSuccessfulSignal to:", e))
       }
       setInterval((() => {
               t.set("timestamp", Date.now())
                   .catch(console.warn)
           }), 25e3), gp = pp, chrome.storage.onChanged.addListener((function(e, t) {
               "managed" === t && (c.logInfo("Policy updated."), hp(pp, !1))
           })), chrome.runtime.onMessage.addListener(((e, t, n) => {
               null !== e.message && void 0 !== e.message && "getConfig" === e.message && n({
                   tabId: t.tab.id,
                   tabTitle: t.tab.title
               })
           })),
           function(e) {
               console.log("Starting Visigo client"), Zv = e, chrome.runtime.onConnect.addListener((function(e) {
                       e.onMessage.addListener((function(e) {
                           ip(e)
                               .catch((e => {
                                   Wv(new Error(`Failed saving capture: ${e.message}`), {})
                               }))
                       }))
                   })), null != Yv || (Yv = setInterval((() => (async () => {
                           if ($v) console.debug("Ignoring queue interval. A previous upload is still in progress.");
                           else try {
                               $v = !0, await async function(e) {
                                   const r = s(),
                                       i = await async function() {
                                           const e = Object.entries(await chrome.storage.local.get(null))
                                               .filter((([e, t]) => e.startsWith("Visigo_")));
                                           return Object.fromEntries(e)
                                       }(), o = await t.get(n.storageKeys.sessionData);
                                   let a = await t.get(n.storageKeys.config);
                                   if (!await cp()) {
                                       if (c.logInfo("NOT processing captures because license is invalid"), c.logInfo("Clearing cached captures..."), !await t.get(n.storageKeys.unlicensedLog)) {
                                           let e = {
                                               captureCount: Object.keys(i)
                                                   .length,
                                               invocationId: r
                                           };
                                           if (o) {
                                               const t = Object.assign({}, o);
                                               t.Email = jv(t.Email.toLowerCase()), t.Username = "", e = Object.assign(Object.assign({}, e), t)
                                           }
                                           zv("Client believes it is unlicensed. Clearing local storage.", e, 2), await t.set(n.storageKeys.unlicensedLog, "logged")
                                       }
                                       return await chrome.storage.local.remove(Object.keys(i)), void c.logInfo("Clearing cached captures... Completed!")
                                   }
                                   await t.remove(n.storageKeys.unlicensedLog), c.logInfo("Processing queue.");
                                   const u = new Date,
                                       l = u.getTime() / 1e3,
                                       f = l - 10,
                                       d = l - 604800,
                                       v = [],
                                       p = {},
                                       g = {};
                                   for (let e in i) {
                                       if (g[e]) continue;
                                       if (i[e].Starttime > f) {
                                           c.logInfo("Entry too new: " + e + " needs to be>: " + f);
                                           continue
                                       }
                                       if (i[e].Starttime < d) {
                                           g[e] = !0, await chrome.storage.local.remove(e), c.logInfo("Removed old entry:", e);
                                           continue
                                       }
                                       const t = i[e].Message,
                                           n = i[e].Starttime;
                                       for (let r in i) r === e || g[r] || i[r].Message && t && i[r].Message.trim() === t.trim() && (c.logInfo("checking dupes", "entry time : " + n + "-- dupe time : " + i[r].Starttime), Math.abs(i[r].Starttime - n) <= 5 && (g[r] = !0, await chrome.storage.local.remove(r), c.logInfo("Removed duplicate:", t)));
                                       v.push({
                                           startTime: i[e].Starttime,
                                           transmissionAttempts: i[e].TransmissionAttempts,
                                           captureSent: !i[e].hasOwnProperty("WaitingForInitalResponse")
                                       });
                                       var h, m = i[e].TransmissionAttempts;
                                       m > 0 && (h = m > 10 ? l - 20 * (m - 10) * 60 * 60 : l - 100 * 2 ** (m - 1), i[e].Starttime > h) ? c.logInfo("Backing off retry of entry: " + e + " needs to be<: " + h) : i[e].hasOwnProperty("WaitingForInitalResponse") ? p[e] = !0 : A[e] = !0
                                   }
                                   var A = {};
                                   const w = Object.entries(p)
                                       .length;
                                   for (let t in p) {
                                       c.logInfo("sendText:", t);
                                       var y = Object.assign({}, i[t]);
                                       const s = y.TransmissionAttempts;
                                       delete y.FileContentType, delete y.File, delete y.WaitingForInitalResponse, delete y.TransmissionAttempts;
                                       const f = `${a.APIHostname}/api/screening/v1/signal/sendText?key=${a.APIKey}&clientversion=${o.ClientVersion}&starttime=${y.Starttime}&transmissionattempts=${s}&qlen=${w}&scheduledTime=${e}&processTime=${l}&invocId=${r}&internalVersion=${n.versionNumber}`;
                                       let d = !1;
                                       try {
                                           const e = await c.postVisigo(f, y);
                                           switch (e.status) {
                                               case 200:
                                                   c.logInfo("No screenshot requested processing queue."), await wp(u.getTime() / 1e3), await chrome.storage.local.remove(t);
                                                   break;
                                               case 302:
                                                   c.logInfo("Screenshot requested from queued capture."), await wp(u.getTime() / 1e3), A[t] = !0, delete i[t].WaitingForInitalResponse, i[t].TransmissionAttempts = 0, await c.spoolPayload(i[t]);
                                                   break;
                                               case 400:
                                                   c.logInfo("400 response for sendText", {
                                                       response: e,
                                                       payload: y
                                                   }), np(f, e.status, s + 1, !0, v, r), op(e) ? (i[t].TransmissionAttempts++, c.spoolPayload(i[t])) : chrome.storage.local.remove(t);
                                                   break;
                                               case 401:
                                               case 402:
                                               case 403:
                                               case 404:
                                               case 407:
                                               case 408:
                                               case 500:
                                               case 502:
                                               case 503:
                                               case 504:
                                                   if (c.logInfo(`sendText temporary error response code: ${e.status}, Scheduling a retry.`, {
                                                           response: e,
                                                           payload: y
                                                       }), np(f, e.status, s + 1, !0, v, r), 402 === e.status && !lp()) {
                                                       d = !0, a = await up(a);
                                                       continue
                                                   }
                                                   d || 401 !== e.status && 402 !== e.status && 403 !== e.status || i[t].TransmissionAttempts < 10 && (i[t].TransmissionAttempts = 10), i[t].TransmissionAttempts++, await c.spoolPayload(i[t]);
                                                   break;
                                               default:
                                                   c.logInfo(`Unhandled sendText response code: ${e.status}.`, {
                                                       response: e,
                                                       payload: y
                                                   }), np(f, e.status, s + 1, !1, v, r), await chrome.storage.local.remove(t)
                                           }
                                           await sp(a, e, d);
                                           continue
                                       } catch (e) {
                                           Wv(e, {
                                               requestUrl: f,
                                               invocationId: r
                                           }), "AbortError" === e.name || void 0 !== o.Serial && "" !== o.Serial || lp() || (a = await up(a));
                                           continue
                                       }
                                   }
                                   for (let e in A) {
                                       c.logInfo("sendTextAndFile:", e);
                                       const t = Object.assign({}, i[e]),
                                           s = t.TransmissionAttempts;
                                       delete t.TransmissionAttempts;
                                       const u = `${a.APIHostname}/api/screening/v1/signal/sendTextAndFile?key=${a.APIKey}&clientversion=${o.ClientVersion}&starttime=${t.Starttime}&transmissionattempts=${s}&internalVersion=${n.versionNumber}`;
                                       try {
                                           const n = await c.postVisigo(u, t);
                                           switch (n.status) {
                                               case 200:
                                                   c.logInfo("Screenshot sent successfully from queued capture.");
                                                   var b = new Date;
                                                   await wp(b.getTime() / 1e3), await chrome.storage.local.remove(e);
                                                   break;
                                               case 401:
                                               case 402:
                                               case 403:
                                               case 404:
                                               case 407:
                                               case 408:
                                               case 500:
                                               case 502:
                                               case 503:
                                               case 504:
                                                   c.logInfo(`sendTextAndFile temporary error response code: ${n.status}, Scheduling a retry.`, {
                                                       response: n,
                                                       payload: t
                                                   }), np(u, n.status, s + 1, !0, v, r), i[e].TransmissionAttempts++, await c.spoolPayload(i[e]);
                                                   break;
                                               default:
                                                   c.logInfo(`Unhandled sendTextAndFile response code: ${n.status}.`, {
                                                       response: n,
                                                       payload: t
                                                   }), np(u, n.status, s + 1, !1, v, r), await chrome.storage.local.remove(e)
                                           }
                                           await sp(a, n)
                                       } catch (e) {
                                           c.logError("Unable to send screenshot due to, likely a network error. Scheduling a retry.", e), Wv(e, {
                                               requestUrl: u,
                                               invocationId: r
                                           })
                                       }
                                   }
                               }(Date.now())
                           } catch (e) {
                               console.error("Error processing queue: ", e)
                           } finally {
                               $v = !1
                           }
                       })()
                       .catch(console.warn)), 6e4)), null != ep || (ep = setTimeout((() => {
                       rp()
                           .catch(console.warn), null != tp || (tp = setInterval((() => {
                               rp()
                                   .catch(console.warn)
                           }), 144e4))
                   }), 6e4)), chrome.webRequest.onBeforeRequest.addListener(dp, {
                       urls: ["http://*/*", "https://*/*"]
                   }), chrome.alarms.clear("Queue")
                   .catch(console.warn), chrome.alarms.clear("Telemetry")
                   .catch(console.warn)
           }(gp), hp(pp)
   })()
})();
.
