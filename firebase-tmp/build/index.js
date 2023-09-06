var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf, __hasOwnProp = Object.prototype.hasOwnProperty;
var __commonJS = (cb, mod) => function() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: !0 });
}, __copyProps = (to, from, except, desc) => {
  if (from && typeof from == "object" || typeof from == "function")
    for (let key of __getOwnPropNames(from))
      !__hasOwnProp.call(to, key) && key !== except && __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: !0 }) : target,
  mod
)), __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: !0 }), mod);

// empty-module:~/firebase.client
var require_firebase = __commonJS({
  "empty-module:~/firebase.client"(exports, module2) {
    module2.exports = {};
  }
});

// <stdin>
var stdin_exports = {};
__export(stdin_exports, {
  assets: () => assets_manifest_default,
  assetsBuildDirectory: () => assetsBuildDirectory,
  entry: () => entry,
  future: () => future,
  publicPath: () => publicPath,
  routes: () => routes
});
module.exports = __toCommonJS(stdin_exports);

// node_modules/.pnpm/@remix-run+dev@1.18.1_@remix-run+serve@1.18.1_@types+node@20.4.1_ts-node@10.9.1/node_modules/@remix-run/dev/dist/config/defaults/node/entry.server.react-stream.tsx
var entry_server_react_stream_exports = {};
__export(entry_server_react_stream_exports, {
  default: () => handleRequest
});
var import_stream = require("stream"), import_node = require("@remix-run/node"), import_react = require("@remix-run/react"), import_isbot = __toESM(require("isbot")), import_server = require("react-dom/server"), import_jsx_dev_runtime = require("react/jsx-dev-runtime"), ABORT_DELAY = 5e3;
function handleRequest(request, responseStatusCode, responseHeaders, remixContext, loadContext) {
  return (0, import_isbot.default)(request.headers.get("user-agent")) ? handleBotRequest(
    request,
    responseStatusCode,
    responseHeaders,
    remixContext
  ) : handleBrowserRequest(
    request,
    responseStatusCode,
    responseHeaders,
    remixContext
  );
}
function handleBotRequest(request, responseStatusCode, responseHeaders, remixContext) {
  return new Promise((resolve, reject) => {
    let shellRendered = !1, { pipe, abort } = (0, import_server.renderToPipeableStream)(
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
        import_react.RemixServer,
        {
          context: remixContext,
          url: request.url,
          abortDelay: ABORT_DELAY
        },
        void 0,
        !1,
        {
          fileName: "node_modules/.pnpm/@remix-run+dev@1.18.1_@remix-run+serve@1.18.1_@types+node@20.4.1_ts-node@10.9.1/node_modules/@remix-run/dev/dist/config/defaults/node/entry.server.react-stream.tsx",
          lineNumber: 42,
          columnNumber: 7
        },
        this
      ),
      {
        onAllReady() {
          shellRendered = !0;
          let body = new import_stream.PassThrough();
          responseHeaders.set("Content-Type", "text/html"), resolve(
            new import_node.Response(body, {
              headers: responseHeaders,
              status: responseStatusCode
            })
          ), pipe(body);
        },
        onShellError(error) {
          reject(error);
        },
        onError(error) {
          responseStatusCode = 500, shellRendered && console.error(error);
        }
      }
    );
    setTimeout(abort, ABORT_DELAY);
  });
}
function handleBrowserRequest(request, responseStatusCode, responseHeaders, remixContext) {
  return new Promise((resolve, reject) => {
    let shellRendered = !1, { pipe, abort } = (0, import_server.renderToPipeableStream)(
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
        import_react.RemixServer,
        {
          context: remixContext,
          url: request.url,
          abortDelay: ABORT_DELAY
        },
        void 0,
        !1,
        {
          fileName: "node_modules/.pnpm/@remix-run+dev@1.18.1_@remix-run+serve@1.18.1_@types+node@20.4.1_ts-node@10.9.1/node_modules/@remix-run/dev/dist/config/defaults/node/entry.server.react-stream.tsx",
          lineNumber: 91,
          columnNumber: 7
        },
        this
      ),
      {
        onShellReady() {
          shellRendered = !0;
          let body = new import_stream.PassThrough();
          responseHeaders.set("Content-Type", "text/html"), resolve(
            new import_node.Response(body, {
              headers: responseHeaders,
              status: responseStatusCode
            })
          ), pipe(body);
        },
        onShellError(error) {
          reject(error);
        },
        onError(error) {
          responseStatusCode = 500, shellRendered && console.error(error);
        }
      }
    );
    setTimeout(abort, ABORT_DELAY);
  });
}

// app/root.tsx
var root_exports = {};
__export(root_exports, {
  default: () => App,
  links: () => links
});
var import_react2 = require("@remix-run/react");

// app/styles/tailwind.css
var tailwind_default = "/build/_assets/tailwind-GXRT3OX6.css";

// app/root.tsx
var import_jsx_dev_runtime2 = require("react/jsx-dev-runtime"), links = () => [{ rel: "stylesheet", href: tailwind_default }];
function App() {
  return /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("html", { lang: "en", className: "h-full", children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("head", { children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("meta", { charSet: "utf-8" }, void 0, !1, {
        fileName: "app/root.tsx",
        lineNumber: 12,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("meta", { name: "viewport", content: "width=device-width,initial-scale=1" }, void 0, !1, {
        fileName: "app/root.tsx",
        lineNumber: 13,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(import_react2.Meta, {}, void 0, !1, {
        fileName: "app/root.tsx",
        lineNumber: 14,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(import_react2.Links, {}, void 0, !1, {
        fileName: "app/root.tsx",
        lineNumber: 15,
        columnNumber: 9
      }, this)
    ] }, void 0, !0, {
      fileName: "app/root.tsx",
      lineNumber: 11,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("body", { className: "h-full", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(import_react2.Outlet, {}, void 0, !1, {
        fileName: "app/root.tsx",
        lineNumber: 18,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(import_react2.ScrollRestoration, {}, void 0, !1, {
        fileName: "app/root.tsx",
        lineNumber: 19,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(import_react2.Scripts, {}, void 0, !1, {
        fileName: "app/root.tsx",
        lineNumber: 20,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(import_react2.LiveReload, {}, void 0, !1, {
        fileName: "app/root.tsx",
        lineNumber: 21,
        columnNumber: 9
      }, this)
    ] }, void 0, !0, {
      fileName: "app/root.tsx",
      lineNumber: 17,
      columnNumber: 7
    }, this)
  ] }, void 0, !0, {
    fileName: "app/root.tsx",
    lineNumber: 10,
    columnNumber: 5
  }, this);
}

// app/routes/_auth.profile.tsx
var auth_profile_exports = {};
__export(auth_profile_exports, {
  default: () => ProfileRoute
});
var import_auth = require("firebase/auth"), import_jsx_dev_runtime3 = require("react/jsx-dev-runtime");
function ProfileRoute() {
  return /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)("div", { children: /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)("pre", { children: JSON.stringify((0, import_auth.getAuth)().currentUser ?? {}, null, 2) }, void 0, !1, {
    fileName: "app/routes/_auth.profile.tsx",
    lineNumber: 6,
    columnNumber: 7
  }, this) }, void 0, !1, {
    fileName: "app/routes/_auth.profile.tsx",
    lineNumber: 5,
    columnNumber: 5
  }, this);
}

// app/routes/_auth.logout.tsx
var auth_logout_exports = {};
__export(auth_logout_exports, {
  loader: () => loader
});
var import_server_runtime = require("@remix-run/server-runtime");

// app/cookies.ts
var import_node2 = require("@remix-run/node");

// app/constants.ts
var COOKIE_NAME = "aura";

// app/cookies.ts
var cookie = (0, import_node2.createCookie)(COOKIE_NAME, {
  secrets: [process.env.COOKIE_SECRET],
  maxAge: 300,
  // Ensure this is the same as the expiry date on the JWT
  path: "/",
  httpOnly: !0,
  sameSite: "lax",
  secure: !1
});

// app/routes/_auth.logout.tsx
var loader = async () => (0, import_server_runtime.redirect)("/", {
  headers: {
    "Set-Cookie": await cookie.serialize("", { maxAge: 0 })
  }
});

// app/routes/_auth.login.tsx
var auth_login_exports = {};
__export(auth_login_exports, {
  action: () => action,
  default: () => LoginRoute
});
var import_react3 = require("@remix-run/react"), import_server_runtime2 = require("@remix-run/server-runtime"), import_auth3 = require("firebase/auth"), import_firebase = __toESM(require_firebase());

// app/firebase.server.ts
var import_dotenv = __toESM(require("dotenv")), import_app = require("firebase-admin/app"), import_auth2 = require("firebase-admin/auth"), firebaseAdminApp, firebaseAdminAuth;
import_dotenv.default.config();
var serviceAccount = (
  /* eslint-disable */
  /* eslint-disable-line */
  oo_al(JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT.replaceAll('\\"', '"')), "76179527_0")
);
(0, import_app.getApps)().length === 0 ? firebaseAdminApp = (0, import_app.initializeApp)({
  credential: (0, import_app.cert)(serviceAccount)
  // credential: applicationDefault(), // Google Application Default Credentials are available on any Google infrastructure, such as Google App Engine and Google Compute Engine.
}) : firebaseAdminApp = (0, import_app.getApp)();
firebaseAdminAuth = (0, import_auth2.getAuth)(firebaseAdminApp);
function oo_cm() {
  try {
    return (0, eval)("globalThis._console_ninja") || (0, eval)(`/* https://github.com/wallabyjs/console-ninja#how-does-it-work */'use strict';function _0x5a94(_0x1f863a,_0x87b64f){var _0x596df8=_0x596d();return _0x5a94=function(_0x5a944d,_0x134ce9){_0x5a944d=_0x5a944d-0x118;var _0x448733=_0x596df8[_0x5a944d];return _0x448733;},_0x5a94(_0x1f863a,_0x87b64f);}var _0x29ec16=_0x5a94;(function(_0x378825,_0x3b432b){var _0x433c19=_0x5a94,_0x7cdf7d=_0x378825();while(!![]){try{var _0x1251ec=-parseInt(_0x433c19(0x1d1))/0x1+parseInt(_0x433c19(0x1fd))/0x2*(-parseInt(_0x433c19(0x15a))/0x3)+-parseInt(_0x433c19(0x178))/0x4+-parseInt(_0x433c19(0x1f3))/0x5*(-parseInt(_0x433c19(0x197))/0x6)+parseInt(_0x433c19(0x1d9))/0x7+parseInt(_0x433c19(0x1da))/0x8*(parseInt(_0x433c19(0x1cf))/0x9)+parseInt(_0x433c19(0x11e))/0xa*(parseInt(_0x433c19(0x123))/0xb);if(_0x1251ec===_0x3b432b)break;else _0x7cdf7d['push'](_0x7cdf7d['shift']());}catch(_0x4aecb1){_0x7cdf7d['push'](_0x7cdf7d['shift']());}}}(_0x596d,0xea2e0));var j=Object[_0x29ec16(0x1ed)],X=Object[_0x29ec16(0x17b)],G=Object[_0x29ec16(0x1d5)],ee=Object[_0x29ec16(0x1bd)],te=Object[_0x29ec16(0x125)],ne=Object['prototype'][_0x29ec16(0x1b5)],re=(_0x2e0320,_0x53f850,_0x525f29,_0x86fdb9)=>{var _0x58053e=_0x29ec16;if(_0x53f850&&typeof _0x53f850==_0x58053e(0x18a)||typeof _0x53f850=='function'){for(let _0x20edc7 of ee(_0x53f850))!ne[_0x58053e(0x1bc)](_0x2e0320,_0x20edc7)&&_0x20edc7!==_0x525f29&&X(_0x2e0320,_0x20edc7,{'get':()=>_0x53f850[_0x20edc7],'enumerable':!(_0x86fdb9=G(_0x53f850,_0x20edc7))||_0x86fdb9[_0x58053e(0x198)]});}return _0x2e0320;},x=(_0x4f5bfb,_0x15b032,_0x32bbfb)=>(_0x32bbfb=_0x4f5bfb!=null?j(te(_0x4f5bfb)):{},re(_0x15b032||!_0x4f5bfb||!_0x4f5bfb['__es'+'Module']?X(_0x32bbfb,'default',{'value':_0x4f5bfb,'enumerable':!0x0}):_0x32bbfb,_0x4f5bfb)),q=class{constructor(_0x2f16f2,_0x2a8fac,_0x334b71,_0x87f763){var _0x2ab6b8=_0x29ec16;this[_0x2ab6b8(0x12e)]=_0x2f16f2,this[_0x2ab6b8(0x1e1)]=_0x2a8fac,this[_0x2ab6b8(0x1af)]=_0x334b71,this[_0x2ab6b8(0x162)]=_0x87f763,this['_allowedToSend']=!0x0,this[_0x2ab6b8(0x17a)]=!0x0,this['_connected']=!0x1,this[_0x2ab6b8(0x13f)]=!0x1,this[_0x2ab6b8(0x1b4)]=!!this[_0x2ab6b8(0x12e)][_0x2ab6b8(0x167)],this[_0x2ab6b8(0x184)]=null,this[_0x2ab6b8(0x165)]=0x0,this[_0x2ab6b8(0x15c)]=0x14,this[_0x2ab6b8(0x1d3)]=_0x2ab6b8(0x119),this[_0x2ab6b8(0x1c3)]=(this['_inBrowser']?_0x2ab6b8(0x1c5):_0x2ab6b8(0x1e9))+this[_0x2ab6b8(0x1d3)];}async[_0x29ec16(0x1e3)](){var _0x3e453a=_0x29ec16;if(this[_0x3e453a(0x184)])return this[_0x3e453a(0x184)];let _0x1ff4f0;if(this[_0x3e453a(0x1b4)])_0x1ff4f0=this[_0x3e453a(0x12e)][_0x3e453a(0x167)];else{if(this['global'][_0x3e453a(0x1b8)]?.[_0x3e453a(0x1c1)])_0x1ff4f0=this['global']['process']?.[_0x3e453a(0x1c1)];else try{let _0x1a1af9=await import(_0x3e453a(0x15b));_0x1ff4f0=(await import((await import(_0x3e453a(0x1f6)))['pathToFileURL'](_0x1a1af9[_0x3e453a(0x1ac)](this[_0x3e453a(0x162)],'ws/index.js'))[_0x3e453a(0x18c)]()))[_0x3e453a(0x1de)];}catch{try{_0x1ff4f0=require(require(_0x3e453a(0x15b))[_0x3e453a(0x1ac)](this[_0x3e453a(0x162)],'ws'));}catch{throw new Error(_0x3e453a(0x132));}}}return this[_0x3e453a(0x184)]=_0x1ff4f0,_0x1ff4f0;}[_0x29ec16(0x152)](){var _0x3671c4=_0x29ec16;this['_connecting']||this[_0x3671c4(0x1ab)]||this[_0x3671c4(0x165)]>=this[_0x3671c4(0x15c)]||(this[_0x3671c4(0x17a)]=!0x1,this['_connecting']=!0x0,this[_0x3671c4(0x165)]++,this[_0x3671c4(0x1d0)]=new Promise((_0x41351b,_0x5297aa)=>{var _0xf6ddde=_0x3671c4;this[_0xf6ddde(0x1e3)]()[_0xf6ddde(0x156)](_0x31d597=>{var _0x337e8d=_0xf6ddde;let _0x2c9ae6=new _0x31d597('ws://'+this[_0x337e8d(0x1e1)]+':'+this[_0x337e8d(0x1af)]);_0x2c9ae6['onerror']=()=>{var _0x3fbb26=_0x337e8d;this[_0x3fbb26(0x14a)]=!0x1,this['_disposeWebsocket'](_0x2c9ae6),this['_attemptToReconnectShortly'](),_0x5297aa(new Error('logger\\x20websocket\\x20error'));},_0x2c9ae6[_0x337e8d(0x1be)]=()=>{var _0xb85a6d=_0x337e8d;this[_0xb85a6d(0x1b4)]||_0x2c9ae6['_socket']&&_0x2c9ae6[_0xb85a6d(0x193)][_0xb85a6d(0x1df)]&&_0x2c9ae6['_socket'][_0xb85a6d(0x1df)](),_0x41351b(_0x2c9ae6);},_0x2c9ae6[_0x337e8d(0x11a)]=()=>{var _0x22c12f=_0x337e8d;this[_0x22c12f(0x17a)]=!0x0,this[_0x22c12f(0x16f)](_0x2c9ae6),this[_0x22c12f(0x142)]();},_0x2c9ae6[_0x337e8d(0x1e8)]=_0x2989ca=>{var _0x597085=_0x337e8d;try{_0x2989ca&&_0x2989ca[_0x597085(0x19a)]&&this[_0x597085(0x1b4)]&&JSON[_0x597085(0x1a9)](_0x2989ca[_0x597085(0x19a)])[_0x597085(0x137)]===_0x597085(0x138)&&this[_0x597085(0x12e)]['location'][_0x597085(0x138)]();}catch{}};})[_0xf6ddde(0x156)](_0xb45d22=>(this['_connected']=!0x0,this[_0xf6ddde(0x13f)]=!0x1,this['_allowedToConnectOnSend']=!0x1,this[_0xf6ddde(0x14a)]=!0x0,this['_connectAttemptCount']=0x0,_0xb45d22))[_0xf6ddde(0x15d)](_0x49c288=>(this[_0xf6ddde(0x1ab)]=!0x1,this[_0xf6ddde(0x13f)]=!0x1,console[_0xf6ddde(0x1e4)](_0xf6ddde(0x1d4)+this[_0xf6ddde(0x1d3)]),_0x5297aa(new Error(_0xf6ddde(0x16a)+(_0x49c288&&_0x49c288[_0xf6ddde(0x176)])))));}));}[_0x29ec16(0x16f)](_0x384b2e){var _0x268a60=_0x29ec16;this[_0x268a60(0x1ab)]=!0x1,this[_0x268a60(0x13f)]=!0x1;try{_0x384b2e[_0x268a60(0x11a)]=null,_0x384b2e[_0x268a60(0x131)]=null,_0x384b2e[_0x268a60(0x1be)]=null;}catch{}try{_0x384b2e[_0x268a60(0x141)]<0x2&&_0x384b2e[_0x268a60(0x14d)]();}catch{}}[_0x29ec16(0x142)](){var _0x8fe5e3=_0x29ec16;clearTimeout(this['_reconnectTimeout']),!(this[_0x8fe5e3(0x165)]>=this['_maxConnectAttemptCount'])&&(this['_reconnectTimeout']=setTimeout(()=>{var _0x4e9eca=_0x8fe5e3;this[_0x4e9eca(0x1ab)]||this['_connecting']||(this[_0x4e9eca(0x152)](),this[_0x4e9eca(0x1d0)]?.[_0x4e9eca(0x15d)](()=>this[_0x4e9eca(0x142)]()));},0x1f4),this[_0x8fe5e3(0x168)][_0x8fe5e3(0x1df)]&&this[_0x8fe5e3(0x168)][_0x8fe5e3(0x1df)]());}async['send'](_0x1323cf){var _0x590dec=_0x29ec16;try{if(!this[_0x590dec(0x14a)])return;this['_allowedToConnectOnSend']&&this['_connectToHostNow'](),(await this[_0x590dec(0x1d0)])[_0x590dec(0x1c9)](JSON[_0x590dec(0x118)](_0x1323cf));}catch(_0x5cec51){console[_0x590dec(0x1e4)](this['_sendErrorMessage']+':\\x20'+(_0x5cec51&&_0x5cec51['message'])),this[_0x590dec(0x14a)]=!0x1,this['_attemptToReconnectShortly']();}}};function J(_0x9c005f,_0x118da5,_0x272c53,_0x4e0018,_0x263482){var _0x4696a0=_0x29ec16;let _0x31d919=_0x272c53['split'](',')[_0x4696a0(0x191)](_0x52aa3b=>{var _0x4d38c3=_0x4696a0;try{_0x9c005f[_0x4d38c3(0x12b)]||((_0x263482===_0x4d38c3(0x16b)||_0x263482===_0x4d38c3(0x154)||_0x263482===_0x4d38c3(0x1a5))&&(_0x263482+=_0x9c005f[_0x4d38c3(0x1b8)]?.[_0x4d38c3(0x146)]?.[_0x4d38c3(0x1d8)]?_0x4d38c3(0x135):_0x4d38c3(0x12d)),_0x9c005f['_console_ninja_session']={'id':+new Date(),'tool':_0x263482});let _0x3ec116=new q(_0x9c005f,_0x118da5,_0x52aa3b,_0x4e0018);return _0x3ec116[_0x4d38c3(0x1c9)][_0x4d38c3(0x158)](_0x3ec116);}catch(_0x228885){return console['warn']('logger\\x20failed\\x20to\\x20connect\\x20to\\x20host',_0x228885&&_0x228885[_0x4d38c3(0x176)]),()=>{};}});return _0x5af9bc=>_0x31d919[_0x4696a0(0x11d)](_0x30cf42=>_0x30cf42(_0x5af9bc));}function R(_0x2b0724){var _0x13cdc5=_0x29ec16;let _0x4e1d39=function(_0x29dbff,_0x351635){return _0x351635-_0x29dbff;},_0x47ea32;if(_0x2b0724[_0x13cdc5(0x1c0)])_0x47ea32=function(){var _0x41a38f=_0x13cdc5;return _0x2b0724[_0x41a38f(0x1c0)]['now']();};else{if(_0x2b0724[_0x13cdc5(0x1b8)]&&_0x2b0724[_0x13cdc5(0x1b8)][_0x13cdc5(0x149)])_0x47ea32=function(){return _0x2b0724['process']['hrtime']();},_0x4e1d39=function(_0x555844,_0xf983dd){return 0x3e8*(_0xf983dd[0x0]-_0x555844[0x0])+(_0xf983dd[0x1]-_0x555844[0x1])/0xf4240;};else try{let {performance:_0x27cbe4}=require(_0x13cdc5(0x1d6));_0x47ea32=function(){var _0x328ff6=_0x13cdc5;return _0x27cbe4[_0x328ff6(0x1bb)]();};}catch{_0x47ea32=function(){return+new Date();};}}return{'elapsed':_0x4e1d39,'timeStamp':_0x47ea32,'now':()=>Date['now']()};}function Y(_0x497fa6,_0x1de612,_0x52b12a){var _0x4197a6=_0x29ec16;if(_0x497fa6['_consoleNinjaAllowedToStart']!==void 0x0)return _0x497fa6[_0x4197a6(0x18b)];let _0x55886f=_0x497fa6[_0x4197a6(0x1b8)]?.[_0x4197a6(0x146)]?.['node'];return _0x55886f&&_0x52b12a===_0x4197a6(0x187)?_0x497fa6[_0x4197a6(0x18b)]=!0x1:_0x497fa6[_0x4197a6(0x18b)]=_0x55886f||!_0x1de612||_0x497fa6['location']?.[_0x4197a6(0x186)]&&_0x1de612[_0x4197a6(0x1f5)](_0x497fa6[_0x4197a6(0x134)]['hostname']),_0x497fa6[_0x4197a6(0x18b)];}function _0x596d(){var _0x39d0fc=['_isArray','parent','boolean','push','String','_isMap','_processTreeNodeResult','[object\\x20Array]','depth','1693834979571','astro','index','root_exp_id','set','parse','get','_connected','join','length','cappedElements','port','positiveInfinity','NEGATIVE_INFINITY','negativeInfinity','prototype','_inBrowser','hasOwnProperty','date','sort','process','_keyStrRegExp','number','now','call','getOwnPropertyNames','onopen','[object\\x20Set]','performance','_WebSocket','unknown','_sendErrorMessage','_isNegativeZero','Console\\x20Ninja\\x20failed\\x20to\\x20send\\x20logs,\\x20refreshing\\x20the\\x20page\\x20may\\x20help;\\x20also\\x20see\\x20','autoExpandPropertyCount','negativeZero','toLowerCase','send','_objectToString',"/Users/jakelee/.vscode/extensions/wallabyjs.console-ninja-0.0.215/node_modules",'constructor','function','array','197649oanYyr','_ws','1148752rVCfrp','strLength','_webSocketErrorDocsLink','logger\\x20failed\\x20to\\x20connect\\x20to\\x20host,\\x20see\\x20','getOwnPropertyDescriptor','perf_hooks','props','node','4534642xtZfPH','496pYYPXv','disabledTrace','_setNodeLabel','Boolean','default','unref','expressionsToEvaluate','host','_addObjectProperty','getWebSocketClass','warn','_console_ninja','bigint','level','onmessage','Console\\x20Ninja\\x20failed\\x20to\\x20send\\x20logs,\\x20restarting\\x20the\\x20process\\x20may\\x20help;\\x20also\\x20see\\x20','concat','allStrLength','timeEnd','create','_hasSetOnItsPath','nan','current','_addProperty','elapsed','399015tYiXHS','_getOwnPropertyDescriptor','includes','url',["localhost","127.0.0.1","example.cypress.io","jakelee-MacBookPro.local","192.168.0.6"],'_setNodeId','_cleanNode','_numberRegExp','Error','error','37420XgtHnT','string','stringify','https://tinyurl.com/37x8b79t','onclose','isArray','trace','forEach','10Wuloxx','hits','_p_','reduceLimits','_HTMLAllCollection','9543050sITGEg','time','getPrototypeOf','_Symbol','autoExpandMaxDepth','console','timeStamp','Buffer','_console_ninja_session','_p_length','\\x20browser','global','valueOf','pop','onerror','failed\\x20to\\x20find\\x20and\\x20load\\x20WebSocket','count','location','\\x20server','_type','method','reload','_addLoadNode','replace','type','_setNodeQueryPath','[object\\x20BigInt]','_sortProps','_connecting','Map','readyState','_attemptToReconnectShortly','127.0.0.1','_isPrimitiveType','test','versions','funcName','Set','hrtime','_allowedToSend','getOwnPropertySymbols','elements','close','sortProps','_propertyName','remix','Symbol','_connectToHostNow','_treeNodePropertiesAfterFullValue','remix','_undefined','then','57091','bind','_setNodePermissions','84JTjgCo','path','_maxConnectAttemptCount','catch','_blacklistedProperty','_hasMapOnItsPath','_property','_additionalMetadata','nodeModules','autoExpandPreviousObjects','_isSet','_connectAttemptCount','_setNodeExpandableState','WebSocket','_reconnectTimeout','autoExpandLimit','failed\\x20to\\x20connect\\x20to\\x20host:\\x20','next.js','_regExpToString','[object\\x20Map]','value','_disposeWebsocket','_isPrimitiveWrapperType','serialize','match','_capIfString','log','noFunctions','message','null','1618848HBykyM','isExpressionToEvaluate','_allowedToConnectOnSend','defineProperty','_p_name','_treeNodePropertiesBeforeFullValue','disabledLog','_addFunctionsNode','_setNodeExpressionPath','HTMLAllCollection','_getOwnPropertySymbols','capped','_WebSocketClass','name','hostname','nuxt','stackTraceLimit','Number','object','_consoleNinjaAllowedToStart','toString','totalStrLength','expId','undefined','coverage','map','_dateToString','_socket','substr','resolveGetters','autoExpand','12LJFPff','enumerable','rootExpression','data'];_0x596d=function(){return _0x39d0fc;};return _0x596d();}function Q(_0x1a54d6,_0x4cce87,_0x42f83d,_0x2914bb){var _0x358108=_0x29ec16;_0x1a54d6=_0x1a54d6,_0x4cce87=_0x4cce87,_0x42f83d=_0x42f83d,_0x2914bb=_0x2914bb;let _0x27b04b=R(_0x1a54d6),_0x495e57=_0x27b04b[_0x358108(0x1f2)],_0x3c7de6=_0x27b04b['timeStamp'];class _0x41aa7a{constructor(){var _0x289855=_0x358108;this[_0x289855(0x1b9)]=/^(?!(?:do|if|in|for|let|new|try|var|case|else|enum|eval|false|null|this|true|void|with|break|catch|class|const|super|throw|while|yield|delete|export|import|public|return|static|switch|typeof|default|extends|finally|package|private|continue|debugger|function|arguments|interface|protected|implements|instanceof)$)[_$a-zA-Z\\xA0-\\uFFFF][_$a-zA-Z0-9\\xA0-\\uFFFF]*$/,this[_0x289855(0x1fa)]=/^(0|[1-9][0-9]*)$/,this['_quotedRegExp']=/'([^\\\\']|\\\\')*'/,this[_0x289855(0x155)]=_0x1a54d6[_0x289855(0x18f)],this[_0x289855(0x122)]=_0x1a54d6[_0x289855(0x181)],this[_0x289855(0x1f4)]=Object[_0x289855(0x1d5)],this['_getOwnPropertyNames']=Object[_0x289855(0x1bd)],this['_Symbol']=_0x1a54d6[_0x289855(0x151)],this[_0x289855(0x16c)]=RegExp['prototype'][_0x289855(0x18c)],this[_0x289855(0x192)]=Date[_0x289855(0x1b3)]['toString'];}[_0x358108(0x171)](_0x5b0512,_0xda648c,_0x28fed6,_0x473671){var _0x4f9300=_0x358108,_0x156e1d=this,_0x52112f=_0x28fed6[_0x4f9300(0x196)];function _0x2517d0(_0xe3afa4,_0x41580a,_0x326cc3){var _0x372978=_0x4f9300;_0x41580a['type']=_0x372978(0x1c2),_0x41580a[_0x372978(0x1fc)]=_0xe3afa4[_0x372978(0x176)],_0x55ec42=_0x326cc3[_0x372978(0x1d8)][_0x372978(0x1f0)],_0x326cc3['node'][_0x372978(0x1f0)]=_0x41580a,_0x156e1d[_0x372978(0x17d)](_0x41580a,_0x326cc3);}try{_0x28fed6['level']++,_0x28fed6[_0x4f9300(0x196)]&&_0x28fed6['autoExpandPreviousObjects'][_0x4f9300(0x19e)](_0xda648c);var _0x5702d9,_0x35ef51,_0x33bf1b,_0x2f1dbd,_0x2d1c40=[],_0xb815b7=[],_0x207fd2,_0x3f75c6=this[_0x4f9300(0x136)](_0xda648c),_0x431e9f=_0x3f75c6==='array',_0x251710=!0x1,_0x2685da=_0x3f75c6===_0x4f9300(0x1cd),_0x253dae=this[_0x4f9300(0x144)](_0x3f75c6),_0x3b360d=this[_0x4f9300(0x170)](_0x3f75c6),_0x4b3bf1=_0x253dae||_0x3b360d,_0x400a27={},_0x3dacb8=0x0,_0x2cfdb0=!0x1,_0x55ec42,_0x2daec5=/^(([1-9]{1}[0-9]*)|0)$/;if(_0x28fed6[_0x4f9300(0x1a3)]){if(_0x431e9f){if(_0x35ef51=_0xda648c[_0x4f9300(0x1ad)],_0x35ef51>_0x28fed6['elements']){for(_0x33bf1b=0x0,_0x2f1dbd=_0x28fed6[_0x4f9300(0x14c)],_0x5702d9=_0x33bf1b;_0x5702d9<_0x2f1dbd;_0x5702d9++)_0xb815b7['push'](_0x156e1d[_0x4f9300(0x1f1)](_0x2d1c40,_0xda648c,_0x3f75c6,_0x5702d9,_0x28fed6));_0x5b0512[_0x4f9300(0x1ae)]=!0x0;}else{for(_0x33bf1b=0x0,_0x2f1dbd=_0x35ef51,_0x5702d9=_0x33bf1b;_0x5702d9<_0x2f1dbd;_0x5702d9++)_0xb815b7['push'](_0x156e1d[_0x4f9300(0x1f1)](_0x2d1c40,_0xda648c,_0x3f75c6,_0x5702d9,_0x28fed6));}_0x28fed6[_0x4f9300(0x1c6)]+=_0xb815b7[_0x4f9300(0x1ad)];}if(!(_0x3f75c6==='null'||_0x3f75c6===_0x4f9300(0x18f))&&!_0x253dae&&_0x3f75c6!==_0x4f9300(0x19f)&&_0x3f75c6!==_0x4f9300(0x12a)&&_0x3f75c6!=='bigint'){var _0x1657c9=_0x473671['props']||_0x28fed6[_0x4f9300(0x1d7)];if(this[_0x4f9300(0x164)](_0xda648c)?(_0x5702d9=0x0,_0xda648c['forEach'](function(_0x3bf33e){var _0x2a272d=_0x4f9300;if(_0x3dacb8++,_0x28fed6[_0x2a272d(0x1c6)]++,_0x3dacb8>_0x1657c9){_0x2cfdb0=!0x0;return;}if(!_0x28fed6['isExpressionToEvaluate']&&_0x28fed6['autoExpand']&&_0x28fed6[_0x2a272d(0x1c6)]>_0x28fed6[_0x2a272d(0x169)]){_0x2cfdb0=!0x0;return;}_0xb815b7[_0x2a272d(0x19e)](_0x156e1d[_0x2a272d(0x1f1)](_0x2d1c40,_0xda648c,_0x2a272d(0x148),_0x5702d9++,_0x28fed6,function(_0x5290d9){return function(){return _0x5290d9;};}(_0x3bf33e)));})):this[_0x4f9300(0x1a0)](_0xda648c)&&_0xda648c[_0x4f9300(0x11d)](function(_0x344254,_0x162c1c){var _0x1d46d7=_0x4f9300;if(_0x3dacb8++,_0x28fed6[_0x1d46d7(0x1c6)]++,_0x3dacb8>_0x1657c9){_0x2cfdb0=!0x0;return;}if(!_0x28fed6[_0x1d46d7(0x179)]&&_0x28fed6[_0x1d46d7(0x196)]&&_0x28fed6[_0x1d46d7(0x1c6)]>_0x28fed6['autoExpandLimit']){_0x2cfdb0=!0x0;return;}var _0x2afa0b=_0x162c1c['toString']();_0x2afa0b['length']>0x64&&(_0x2afa0b=_0x2afa0b['slice'](0x0,0x64)+'...'),_0xb815b7[_0x1d46d7(0x19e)](_0x156e1d[_0x1d46d7(0x1f1)](_0x2d1c40,_0xda648c,'Map',_0x2afa0b,_0x28fed6,function(_0x1a1e28){return function(){return _0x1a1e28;};}(_0x344254)));}),!_0x251710){try{for(_0x207fd2 in _0xda648c)if(!(_0x431e9f&&_0x2daec5[_0x4f9300(0x145)](_0x207fd2))&&!this[_0x4f9300(0x15e)](_0xda648c,_0x207fd2,_0x28fed6)){if(_0x3dacb8++,_0x28fed6['autoExpandPropertyCount']++,_0x3dacb8>_0x1657c9){_0x2cfdb0=!0x0;break;}if(!_0x28fed6['isExpressionToEvaluate']&&_0x28fed6[_0x4f9300(0x196)]&&_0x28fed6[_0x4f9300(0x1c6)]>_0x28fed6['autoExpandLimit']){_0x2cfdb0=!0x0;break;}_0xb815b7[_0x4f9300(0x19e)](_0x156e1d[_0x4f9300(0x1e2)](_0x2d1c40,_0x400a27,_0xda648c,_0x3f75c6,_0x207fd2,_0x28fed6));}}catch{}if(_0x400a27[_0x4f9300(0x12c)]=!0x0,_0x2685da&&(_0x400a27[_0x4f9300(0x17c)]=!0x0),!_0x2cfdb0){var _0x4afca9=[][_0x4f9300(0x1ea)](this['_getOwnPropertyNames'](_0xda648c))[_0x4f9300(0x1ea)](this[_0x4f9300(0x182)](_0xda648c));for(_0x5702d9=0x0,_0x35ef51=_0x4afca9[_0x4f9300(0x1ad)];_0x5702d9<_0x35ef51;_0x5702d9++)if(_0x207fd2=_0x4afca9[_0x5702d9],!(_0x431e9f&&_0x2daec5[_0x4f9300(0x145)](_0x207fd2['toString']()))&&!this[_0x4f9300(0x15e)](_0xda648c,_0x207fd2,_0x28fed6)&&!_0x400a27[_0x4f9300(0x120)+_0x207fd2[_0x4f9300(0x18c)]()]){if(_0x3dacb8++,_0x28fed6[_0x4f9300(0x1c6)]++,_0x3dacb8>_0x1657c9){_0x2cfdb0=!0x0;break;}if(!_0x28fed6[_0x4f9300(0x179)]&&_0x28fed6[_0x4f9300(0x196)]&&_0x28fed6[_0x4f9300(0x1c6)]>_0x28fed6[_0x4f9300(0x169)]){_0x2cfdb0=!0x0;break;}_0xb815b7[_0x4f9300(0x19e)](_0x156e1d[_0x4f9300(0x1e2)](_0x2d1c40,_0x400a27,_0xda648c,_0x3f75c6,_0x207fd2,_0x28fed6));}}}}}if(_0x5b0512[_0x4f9300(0x13b)]=_0x3f75c6,_0x4b3bf1?(_0x5b0512[_0x4f9300(0x16e)]=_0xda648c[_0x4f9300(0x12f)](),this[_0x4f9300(0x173)](_0x3f75c6,_0x5b0512,_0x28fed6,_0x473671)):_0x3f75c6===_0x4f9300(0x1b6)?_0x5b0512[_0x4f9300(0x16e)]=this[_0x4f9300(0x192)][_0x4f9300(0x1bc)](_0xda648c):_0x3f75c6===_0x4f9300(0x1e6)?_0x5b0512[_0x4f9300(0x16e)]=_0xda648c['toString']():_0x3f75c6==='RegExp'?_0x5b0512['value']=this[_0x4f9300(0x16c)][_0x4f9300(0x1bc)](_0xda648c):_0x3f75c6==='symbol'&&this[_0x4f9300(0x126)]?_0x5b0512[_0x4f9300(0x16e)]=this[_0x4f9300(0x126)]['prototype'][_0x4f9300(0x18c)][_0x4f9300(0x1bc)](_0xda648c):!_0x28fed6[_0x4f9300(0x1a3)]&&!(_0x3f75c6===_0x4f9300(0x177)||_0x3f75c6===_0x4f9300(0x18f))&&(delete _0x5b0512[_0x4f9300(0x16e)],_0x5b0512[_0x4f9300(0x183)]=!0x0),_0x2cfdb0&&(_0x5b0512['cappedProps']=!0x0),_0x55ec42=_0x28fed6[_0x4f9300(0x1d8)][_0x4f9300(0x1f0)],_0x28fed6[_0x4f9300(0x1d8)][_0x4f9300(0x1f0)]=_0x5b0512,this[_0x4f9300(0x17d)](_0x5b0512,_0x28fed6),_0xb815b7[_0x4f9300(0x1ad)]){for(_0x5702d9=0x0,_0x35ef51=_0xb815b7[_0x4f9300(0x1ad)];_0x5702d9<_0x35ef51;_0x5702d9++)_0xb815b7[_0x5702d9](_0x5702d9);}_0x2d1c40[_0x4f9300(0x1ad)]&&(_0x5b0512['props']=_0x2d1c40);}catch(_0xc900f){_0x2517d0(_0xc900f,_0x5b0512,_0x28fed6);}return this['_additionalMetadata'](_0xda648c,_0x5b0512),this[_0x4f9300(0x153)](_0x5b0512,_0x28fed6),_0x28fed6[_0x4f9300(0x1d8)][_0x4f9300(0x1f0)]=_0x55ec42,_0x28fed6[_0x4f9300(0x1e7)]--,_0x28fed6[_0x4f9300(0x196)]=_0x52112f,_0x28fed6[_0x4f9300(0x196)]&&_0x28fed6[_0x4f9300(0x163)][_0x4f9300(0x130)](),_0x5b0512;}[_0x358108(0x182)](_0x55e14c){var _0x2003a1=_0x358108;return Object[_0x2003a1(0x14b)]?Object['getOwnPropertySymbols'](_0x55e14c):[];}[_0x358108(0x164)](_0x3a52f0){var _0x5aec6e=_0x358108;return!!(_0x3a52f0&&_0x1a54d6[_0x5aec6e(0x148)]&&this[_0x5aec6e(0x1ca)](_0x3a52f0)===_0x5aec6e(0x1bf)&&_0x3a52f0[_0x5aec6e(0x11d)]);}[_0x358108(0x15e)](_0x30cc20,_0xcd0501,_0x57bf9e){var _0x373ba1=_0x358108;return _0x57bf9e[_0x373ba1(0x175)]?typeof _0x30cc20[_0xcd0501]==_0x373ba1(0x1cd):!0x1;}[_0x358108(0x136)](_0x478374){var _0x2b0765=_0x358108,_0x4a437c='';return _0x4a437c=typeof _0x478374,_0x4a437c===_0x2b0765(0x18a)?this[_0x2b0765(0x1ca)](_0x478374)===_0x2b0765(0x1a2)?_0x4a437c=_0x2b0765(0x1ce):this[_0x2b0765(0x1ca)](_0x478374)==='[object\\x20Date]'?_0x4a437c=_0x2b0765(0x1b6):this[_0x2b0765(0x1ca)](_0x478374)===_0x2b0765(0x13d)?_0x4a437c=_0x2b0765(0x1e6):_0x478374===null?_0x4a437c=_0x2b0765(0x177):_0x478374[_0x2b0765(0x1cc)]&&(_0x4a437c=_0x478374[_0x2b0765(0x1cc)][_0x2b0765(0x185)]||_0x4a437c):_0x4a437c===_0x2b0765(0x18f)&&this[_0x2b0765(0x122)]&&_0x478374 instanceof this[_0x2b0765(0x122)]&&(_0x4a437c='HTMLAllCollection'),_0x4a437c;}[_0x358108(0x1ca)](_0x1303db){var _0x22dc3a=_0x358108;return Object[_0x22dc3a(0x1b3)][_0x22dc3a(0x18c)][_0x22dc3a(0x1bc)](_0x1303db);}[_0x358108(0x144)](_0x195b4d){var _0x3c5437=_0x358108;return _0x195b4d===_0x3c5437(0x19d)||_0x195b4d==='string'||_0x195b4d==='number';}[_0x358108(0x170)](_0xda5716){var _0x354faf=_0x358108;return _0xda5716===_0x354faf(0x1dd)||_0xda5716===_0x354faf(0x19f)||_0xda5716===_0x354faf(0x189);}[_0x358108(0x1f1)](_0x16de80,_0xd05385,_0x1ff61d,_0x57cf61,_0x1e5dac,_0x195b5c){var _0xde7cf8=this;return function(_0x3b3bbb){var _0x398309=_0x5a94,_0x290cf4=_0x1e5dac[_0x398309(0x1d8)][_0x398309(0x1f0)],_0x4251dd=_0x1e5dac[_0x398309(0x1d8)][_0x398309(0x1a6)],_0x1eeeec=_0x1e5dac[_0x398309(0x1d8)][_0x398309(0x19c)];_0x1e5dac['node'][_0x398309(0x19c)]=_0x290cf4,_0x1e5dac['node'][_0x398309(0x1a6)]=typeof _0x57cf61==_0x398309(0x1ba)?_0x57cf61:_0x3b3bbb,_0x16de80[_0x398309(0x19e)](_0xde7cf8[_0x398309(0x160)](_0xd05385,_0x1ff61d,_0x57cf61,_0x1e5dac,_0x195b5c)),_0x1e5dac['node']['parent']=_0x1eeeec,_0x1e5dac[_0x398309(0x1d8)][_0x398309(0x1a6)]=_0x4251dd;};}['_addObjectProperty'](_0x4e0828,_0x3842cb,_0x3c9236,_0x1775e0,_0x989363,_0x3d590c,_0x4209ed){var _0x287957=_0x358108,_0x5d9c0d=this;return _0x3842cb[_0x287957(0x120)+_0x989363[_0x287957(0x18c)]()]=!0x0,function(_0x2e888e){var _0x1fa1ff=_0x287957,_0x5d29f4=_0x3d590c['node'][_0x1fa1ff(0x1f0)],_0x3b3483=_0x3d590c['node'][_0x1fa1ff(0x1a6)],_0x2483aa=_0x3d590c['node']['parent'];_0x3d590c[_0x1fa1ff(0x1d8)][_0x1fa1ff(0x19c)]=_0x5d29f4,_0x3d590c[_0x1fa1ff(0x1d8)][_0x1fa1ff(0x1a6)]=_0x2e888e,_0x4e0828[_0x1fa1ff(0x19e)](_0x5d9c0d[_0x1fa1ff(0x160)](_0x3c9236,_0x1775e0,_0x989363,_0x3d590c,_0x4209ed)),_0x3d590c['node'][_0x1fa1ff(0x19c)]=_0x2483aa,_0x3d590c[_0x1fa1ff(0x1d8)][_0x1fa1ff(0x1a6)]=_0x3b3483;};}[_0x358108(0x160)](_0x35e90c,_0x59ef1c,_0x38254b,_0x1d16c7,_0x3a340e){var _0x39443c=_0x358108,_0x3319d8=this;_0x3a340e||(_0x3a340e=function(_0x118e91,_0x39f1ee){return _0x118e91[_0x39f1ee];});var _0x4607ea=_0x38254b[_0x39443c(0x18c)](),_0x10d34e=_0x1d16c7[_0x39443c(0x1e0)]||{},_0x2b6e5c=_0x1d16c7[_0x39443c(0x1a3)],_0x11f6e8=_0x1d16c7['isExpressionToEvaluate'];try{var _0x5720db=this[_0x39443c(0x1a0)](_0x35e90c),_0x56b592=_0x4607ea;_0x5720db&&_0x56b592[0x0]==='\\x27'&&(_0x56b592=_0x56b592[_0x39443c(0x194)](0x1,_0x56b592[_0x39443c(0x1ad)]-0x2));var _0x4315a7=_0x1d16c7[_0x39443c(0x1e0)]=_0x10d34e[_0x39443c(0x120)+_0x56b592];_0x4315a7&&(_0x1d16c7['depth']=_0x1d16c7[_0x39443c(0x1a3)]+0x1),_0x1d16c7[_0x39443c(0x179)]=!!_0x4315a7;var _0x40c9df=typeof _0x38254b=='symbol',_0x183870={'name':_0x40c9df||_0x5720db?_0x4607ea:this[_0x39443c(0x14f)](_0x4607ea)};if(_0x40c9df&&(_0x183870['symbol']=!0x0),!(_0x59ef1c===_0x39443c(0x1ce)||_0x59ef1c===_0x39443c(0x1fb))){var _0x30ac75=this['_getOwnPropertyDescriptor'](_0x35e90c,_0x38254b);if(_0x30ac75&&(_0x30ac75[_0x39443c(0x1a8)]&&(_0x183870['setter']=!0x0),_0x30ac75[_0x39443c(0x1aa)]&&!_0x4315a7&&!_0x1d16c7[_0x39443c(0x195)]))return _0x183870['getter']=!0x0,this['_processTreeNodeResult'](_0x183870,_0x1d16c7),_0x183870;}var _0x38346c;try{_0x38346c=_0x3a340e(_0x35e90c,_0x38254b);}catch(_0x355517){return _0x183870={'name':_0x4607ea,'type':_0x39443c(0x1c2),'error':_0x355517[_0x39443c(0x176)]},this[_0x39443c(0x1a1)](_0x183870,_0x1d16c7),_0x183870;}var _0x3a0bbf=this[_0x39443c(0x136)](_0x38346c),_0x41329c=this[_0x39443c(0x144)](_0x3a0bbf);if(_0x183870[_0x39443c(0x13b)]=_0x3a0bbf,_0x41329c)this[_0x39443c(0x1a1)](_0x183870,_0x1d16c7,_0x38346c,function(){var _0x964a2e=_0x39443c;_0x183870[_0x964a2e(0x16e)]=_0x38346c[_0x964a2e(0x12f)](),!_0x4315a7&&_0x3319d8[_0x964a2e(0x173)](_0x3a0bbf,_0x183870,_0x1d16c7,{});});else{var _0x5aaf8d=_0x1d16c7['autoExpand']&&_0x1d16c7[_0x39443c(0x1e7)]<_0x1d16c7[_0x39443c(0x127)]&&_0x1d16c7['autoExpandPreviousObjects']['indexOf'](_0x38346c)<0x0&&_0x3a0bbf!==_0x39443c(0x1cd)&&_0x1d16c7['autoExpandPropertyCount']<_0x1d16c7[_0x39443c(0x169)];_0x5aaf8d||_0x1d16c7[_0x39443c(0x1e7)]<_0x2b6e5c||_0x4315a7?(this['serialize'](_0x183870,_0x38346c,_0x1d16c7,_0x4315a7||{}),this['_additionalMetadata'](_0x38346c,_0x183870)):this[_0x39443c(0x1a1)](_0x183870,_0x1d16c7,_0x38346c,function(){var _0x1255c2=_0x39443c;_0x3a0bbf===_0x1255c2(0x177)||_0x3a0bbf===_0x1255c2(0x18f)||(delete _0x183870[_0x1255c2(0x16e)],_0x183870[_0x1255c2(0x183)]=!0x0);});}return _0x183870;}finally{_0x1d16c7['expressionsToEvaluate']=_0x10d34e,_0x1d16c7[_0x39443c(0x1a3)]=_0x2b6e5c,_0x1d16c7[_0x39443c(0x179)]=_0x11f6e8;}}['_capIfString'](_0x41011e,_0x599d8d,_0xb1012b,_0x4d8810){var _0x308104=_0x358108,_0x52a174=_0x4d8810['strLength']||_0xb1012b[_0x308104(0x1d2)];if((_0x41011e===_0x308104(0x1fe)||_0x41011e==='String')&&_0x599d8d[_0x308104(0x16e)]){let _0xac95c4=_0x599d8d[_0x308104(0x16e)][_0x308104(0x1ad)];_0xb1012b[_0x308104(0x1eb)]+=_0xac95c4,_0xb1012b[_0x308104(0x1eb)]>_0xb1012b[_0x308104(0x18d)]?(_0x599d8d['capped']='',delete _0x599d8d[_0x308104(0x16e)]):_0xac95c4>_0x52a174&&(_0x599d8d['capped']=_0x599d8d['value'][_0x308104(0x194)](0x0,_0x52a174),delete _0x599d8d[_0x308104(0x16e)]);}}['_isMap'](_0x288757){var _0x290905=_0x358108;return!!(_0x288757&&_0x1a54d6[_0x290905(0x140)]&&this[_0x290905(0x1ca)](_0x288757)===_0x290905(0x16d)&&_0x288757[_0x290905(0x11d)]);}[_0x358108(0x14f)](_0x202bb5){var _0x4952af=_0x358108;if(_0x202bb5[_0x4952af(0x172)](/^\\d+$/))return _0x202bb5;var _0x26a033;try{_0x26a033=JSON['stringify'](''+_0x202bb5);}catch{_0x26a033='\\x22'+this['_objectToString'](_0x202bb5)+'\\x22';}return _0x26a033[_0x4952af(0x172)](/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/)?_0x26a033=_0x26a033[_0x4952af(0x194)](0x1,_0x26a033[_0x4952af(0x1ad)]-0x2):_0x26a033=_0x26a033['replace'](/'/g,'\\x5c\\x27')['replace'](/\\\\"/g,'\\x22')[_0x4952af(0x13a)](/(^"|"$)/g,'\\x27'),_0x26a033;}['_processTreeNodeResult'](_0x3e9e4e,_0x2e5f13,_0xa52125,_0xe9e7e3){var _0x550921=_0x358108;this[_0x550921(0x17d)](_0x3e9e4e,_0x2e5f13),_0xe9e7e3&&_0xe9e7e3(),this[_0x550921(0x161)](_0xa52125,_0x3e9e4e),this[_0x550921(0x153)](_0x3e9e4e,_0x2e5f13);}[_0x358108(0x17d)](_0xc5bdb4,_0x32fdfb){var _0x250ada=_0x358108;this[_0x250ada(0x1f8)](_0xc5bdb4,_0x32fdfb),this[_0x250ada(0x13c)](_0xc5bdb4,_0x32fdfb),this[_0x250ada(0x180)](_0xc5bdb4,_0x32fdfb),this[_0x250ada(0x159)](_0xc5bdb4,_0x32fdfb);}[_0x358108(0x1f8)](_0x1f998d,_0xdceddd){}['_setNodeQueryPath'](_0x48b8f1,_0x492e42){}['_setNodeLabel'](_0x58c626,_0x5cb283){}['_isUndefined'](_0x4e175d){var _0x2a9117=_0x358108;return _0x4e175d===this[_0x2a9117(0x155)];}[_0x358108(0x153)](_0x590864,_0x2af63a){var _0x429ebf=_0x358108;this['_setNodeLabel'](_0x590864,_0x2af63a),this['_setNodeExpandableState'](_0x590864),_0x2af63a[_0x429ebf(0x14e)]&&this[_0x429ebf(0x13e)](_0x590864),this[_0x429ebf(0x17f)](_0x590864,_0x2af63a),this[_0x429ebf(0x139)](_0x590864,_0x2af63a),this['_cleanNode'](_0x590864);}[_0x358108(0x161)](_0x3cea88,_0x246149){var _0x37ebcf=_0x358108;let _0x4a4561;try{_0x1a54d6[_0x37ebcf(0x128)]&&(_0x4a4561=_0x1a54d6[_0x37ebcf(0x128)][_0x37ebcf(0x1fc)],_0x1a54d6[_0x37ebcf(0x128)][_0x37ebcf(0x1fc)]=function(){}),_0x3cea88&&typeof _0x3cea88[_0x37ebcf(0x1ad)]==_0x37ebcf(0x1ba)&&(_0x246149[_0x37ebcf(0x1ad)]=_0x3cea88['length']);}catch{}finally{_0x4a4561&&(_0x1a54d6[_0x37ebcf(0x128)]['error']=_0x4a4561);}if(_0x246149[_0x37ebcf(0x13b)]===_0x37ebcf(0x1ba)||_0x246149[_0x37ebcf(0x13b)]===_0x37ebcf(0x189)){if(isNaN(_0x246149[_0x37ebcf(0x16e)]))_0x246149[_0x37ebcf(0x1ef)]=!0x0,delete _0x246149['value'];else switch(_0x246149[_0x37ebcf(0x16e)]){case Number['POSITIVE_INFINITY']:_0x246149[_0x37ebcf(0x1b0)]=!0x0,delete _0x246149['value'];break;case Number[_0x37ebcf(0x1b1)]:_0x246149[_0x37ebcf(0x1b2)]=!0x0,delete _0x246149[_0x37ebcf(0x16e)];break;case 0x0:this[_0x37ebcf(0x1c4)](_0x246149[_0x37ebcf(0x16e)])&&(_0x246149[_0x37ebcf(0x1c7)]=!0x0);break;}}else _0x246149[_0x37ebcf(0x13b)]===_0x37ebcf(0x1cd)&&typeof _0x3cea88['name']==_0x37ebcf(0x1fe)&&_0x3cea88[_0x37ebcf(0x185)]&&_0x246149[_0x37ebcf(0x185)]&&_0x3cea88['name']!==_0x246149[_0x37ebcf(0x185)]&&(_0x246149[_0x37ebcf(0x147)]=_0x3cea88['name']);}[_0x358108(0x1c4)](_0x24fdb0){var _0x12a577=_0x358108;return 0x1/_0x24fdb0===Number[_0x12a577(0x1b1)];}[_0x358108(0x13e)](_0x29430c){var _0x5baaff=_0x358108;!_0x29430c[_0x5baaff(0x1d7)]||!_0x29430c[_0x5baaff(0x1d7)][_0x5baaff(0x1ad)]||_0x29430c[_0x5baaff(0x13b)]===_0x5baaff(0x1ce)||_0x29430c[_0x5baaff(0x13b)]===_0x5baaff(0x140)||_0x29430c[_0x5baaff(0x13b)]==='Set'||_0x29430c[_0x5baaff(0x1d7)][_0x5baaff(0x1b7)](function(_0x26c491,_0x2bff98){var _0xe1ab55=_0x5baaff,_0x17dc38=_0x26c491[_0xe1ab55(0x185)][_0xe1ab55(0x1c8)](),_0x51a12b=_0x2bff98[_0xe1ab55(0x185)]['toLowerCase']();return _0x17dc38<_0x51a12b?-0x1:_0x17dc38>_0x51a12b?0x1:0x0;});}[_0x358108(0x17f)](_0x3c20cb,_0x424155){var _0x170d43=_0x358108;if(!(_0x424155[_0x170d43(0x175)]||!_0x3c20cb[_0x170d43(0x1d7)]||!_0x3c20cb[_0x170d43(0x1d7)]['length'])){for(var _0x33f456=[],_0x4d4488=[],_0x4a22d2=0x0,_0x48a776=_0x3c20cb[_0x170d43(0x1d7)]['length'];_0x4a22d2<_0x48a776;_0x4a22d2++){var _0x3c8f54=_0x3c20cb[_0x170d43(0x1d7)][_0x4a22d2];_0x3c8f54[_0x170d43(0x13b)]===_0x170d43(0x1cd)?_0x33f456[_0x170d43(0x19e)](_0x3c8f54):_0x4d4488['push'](_0x3c8f54);}if(!(!_0x4d4488[_0x170d43(0x1ad)]||_0x33f456[_0x170d43(0x1ad)]<=0x1)){_0x3c20cb[_0x170d43(0x1d7)]=_0x4d4488;var _0x58ed04={'functionsNode':!0x0,'props':_0x33f456};this['_setNodeId'](_0x58ed04,_0x424155),this[_0x170d43(0x1dc)](_0x58ed04,_0x424155),this[_0x170d43(0x166)](_0x58ed04),this['_setNodePermissions'](_0x58ed04,_0x424155),_0x58ed04['id']+='\\x20f',_0x3c20cb['props']['unshift'](_0x58ed04);}}}[_0x358108(0x139)](_0xda0e9,_0xc770ea){}[_0x358108(0x166)](_0x2fca2c){}[_0x358108(0x19b)](_0x53fc55){var _0x15871c=_0x358108;return Array[_0x15871c(0x11b)](_0x53fc55)||typeof _0x53fc55==_0x15871c(0x18a)&&this[_0x15871c(0x1ca)](_0x53fc55)===_0x15871c(0x1a2);}[_0x358108(0x159)](_0x3394b4,_0xba32d3){}[_0x358108(0x1f9)](_0x810f29){var _0x473230=_0x358108;delete _0x810f29['_hasSymbolPropertyOnItsPath'],delete _0x810f29[_0x473230(0x1ee)],delete _0x810f29[_0x473230(0x15f)];}[_0x358108(0x180)](_0xf3c8f6,_0x5f5013){}}let _0x3aa5ef=new _0x41aa7a(),_0x4079fd={'props':0x64,'elements':0x64,'strLength':0x400*0x32,'totalStrLength':0x400*0x32,'autoExpandLimit':0x1388,'autoExpandMaxDepth':0xa},_0x1cbbc0={'props':0x5,'elements':0x5,'strLength':0x100,'totalStrLength':0x100*0x3,'autoExpandLimit':0x1e,'autoExpandMaxDepth':0x2};function _0xb2ca1b(_0x463057,_0x160b6e,_0x540616,_0x38be4b,_0x164493,_0x29a3be){var _0x298c19=_0x358108;let _0x7277de,_0x51532;try{_0x51532=_0x3c7de6(),_0x7277de=_0x42f83d[_0x160b6e],!_0x7277de||_0x51532-_0x7277de['ts']>0x1f4&&_0x7277de[_0x298c19(0x133)]&&_0x7277de[_0x298c19(0x124)]/_0x7277de['count']<0x64?(_0x42f83d[_0x160b6e]=_0x7277de={'count':0x0,'time':0x0,'ts':_0x51532},_0x42f83d[_0x298c19(0x11f)]={}):_0x51532-_0x42f83d['hits']['ts']>0x32&&_0x42f83d['hits'][_0x298c19(0x133)]&&_0x42f83d[_0x298c19(0x11f)][_0x298c19(0x124)]/_0x42f83d[_0x298c19(0x11f)][_0x298c19(0x133)]<0x64&&(_0x42f83d[_0x298c19(0x11f)]={});let _0x545fc7=[],_0x28dcbd=_0x7277de[_0x298c19(0x121)]||_0x42f83d[_0x298c19(0x11f)][_0x298c19(0x121)]?_0x1cbbc0:_0x4079fd,_0x3392da=_0x213257=>{var _0x434e2d=_0x298c19;let _0x43dd53={};return _0x43dd53[_0x434e2d(0x1d7)]=_0x213257['props'],_0x43dd53[_0x434e2d(0x14c)]=_0x213257[_0x434e2d(0x14c)],_0x43dd53[_0x434e2d(0x1d2)]=_0x213257['strLength'],_0x43dd53[_0x434e2d(0x18d)]=_0x213257['totalStrLength'],_0x43dd53[_0x434e2d(0x169)]=_0x213257[_0x434e2d(0x169)],_0x43dd53[_0x434e2d(0x127)]=_0x213257[_0x434e2d(0x127)],_0x43dd53[_0x434e2d(0x14e)]=!0x1,_0x43dd53[_0x434e2d(0x175)]=!_0x4cce87,_0x43dd53[_0x434e2d(0x1a3)]=0x1,_0x43dd53[_0x434e2d(0x1e7)]=0x0,_0x43dd53[_0x434e2d(0x18e)]=_0x434e2d(0x1a7),_0x43dd53[_0x434e2d(0x199)]='root_exp',_0x43dd53[_0x434e2d(0x196)]=!0x0,_0x43dd53[_0x434e2d(0x163)]=[],_0x43dd53[_0x434e2d(0x1c6)]=0x0,_0x43dd53[_0x434e2d(0x195)]=!0x0,_0x43dd53['allStrLength']=0x0,_0x43dd53[_0x434e2d(0x1d8)]={'current':void 0x0,'parent':void 0x0,'index':0x0},_0x43dd53;};for(var _0x107c0b=0x0;_0x107c0b<_0x164493[_0x298c19(0x1ad)];_0x107c0b++)_0x545fc7[_0x298c19(0x19e)](_0x3aa5ef[_0x298c19(0x171)]({'timeNode':_0x463057==='time'||void 0x0},_0x164493[_0x107c0b],_0x3392da(_0x28dcbd),{}));if(_0x463057===_0x298c19(0x11c)){let _0x1a1a99=Error[_0x298c19(0x188)];try{Error[_0x298c19(0x188)]=0x1/0x0,_0x545fc7[_0x298c19(0x19e)](_0x3aa5ef[_0x298c19(0x171)]({'stackNode':!0x0},new Error()['stack'],_0x3392da(_0x28dcbd),{'strLength':0x1/0x0}));}finally{Error['stackTraceLimit']=_0x1a1a99;}}return{'method':_0x298c19(0x174),'version':_0x2914bb,'args':[{'ts':_0x540616,'session':_0x38be4b,'args':_0x545fc7,'id':_0x160b6e,'context':_0x29a3be}]};}catch(_0x5f28ee){return{'method':_0x298c19(0x174),'version':_0x2914bb,'args':[{'ts':_0x540616,'session':_0x38be4b,'args':[{'type':_0x298c19(0x1c2),'error':_0x5f28ee&&_0x5f28ee[_0x298c19(0x176)]}],'id':_0x160b6e,'context':_0x29a3be}]};}finally{try{if(_0x7277de&&_0x51532){let _0x44b4b6=_0x3c7de6();_0x7277de[_0x298c19(0x133)]++,_0x7277de[_0x298c19(0x124)]+=_0x495e57(_0x51532,_0x44b4b6),_0x7277de['ts']=_0x44b4b6,_0x42f83d[_0x298c19(0x11f)][_0x298c19(0x133)]++,_0x42f83d[_0x298c19(0x11f)][_0x298c19(0x124)]+=_0x495e57(_0x51532,_0x44b4b6),_0x42f83d[_0x298c19(0x11f)]['ts']=_0x44b4b6,(_0x7277de[_0x298c19(0x133)]>0x32||_0x7277de['time']>0x64)&&(_0x7277de[_0x298c19(0x121)]=!0x0),(_0x42f83d[_0x298c19(0x11f)][_0x298c19(0x133)]>0x3e8||_0x42f83d[_0x298c19(0x11f)][_0x298c19(0x124)]>0x12c)&&(_0x42f83d[_0x298c19(0x11f)][_0x298c19(0x121)]=!0x0);}}catch{}}}return _0xb2ca1b;}((_0x2c83a6,_0x5628a2,_0x2805be,_0x5f3406,_0x10ac5d,_0x2873d8,_0x1918e5,_0x5a518f,_0x300c8a)=>{var _0x5a41d4=_0x29ec16;if(_0x2c83a6[_0x5a41d4(0x1e5)])return _0x2c83a6[_0x5a41d4(0x1e5)];if(!Y(_0x2c83a6,_0x5a518f,_0x10ac5d))return _0x2c83a6['_console_ninja']={'consoleLog':()=>{},'consoleTrace':()=>{},'consoleTime':()=>{},'consoleTimeEnd':()=>{},'autoLog':()=>{},'autoLogMany':()=>{},'autoTraceMany':()=>{},'coverage':()=>{},'autoTrace':()=>{},'autoTime':()=>{},'autoTimeEnd':()=>{}},_0x2c83a6[_0x5a41d4(0x1e5)];let _0x401ac9=R(_0x2c83a6),_0x5d5d28=_0x401ac9[_0x5a41d4(0x1f2)],_0x2235a4=_0x401ac9[_0x5a41d4(0x129)],_0x3e5d39=_0x401ac9[_0x5a41d4(0x1bb)],_0x3bf821={'hits':{},'ts':{}},_0x377a42=Q(_0x2c83a6,_0x300c8a,_0x3bf821,_0x2873d8),_0x378968=_0x133fa6=>{_0x3bf821['ts'][_0x133fa6]=_0x2235a4();},_0x11e10d=(_0x5c9297,_0x235dab)=>{let _0x403bcb=_0x3bf821['ts'][_0x235dab];if(delete _0x3bf821['ts'][_0x235dab],_0x403bcb){let _0x3679de=_0x5d5d28(_0x403bcb,_0x2235a4());_0x2e2251(_0x377a42('time',_0x5c9297,_0x3e5d39(),_0x57aee3,[_0x3679de],_0x235dab));}},_0x1ca1df=_0x4b13fa=>_0x43a29b=>{var _0x4e6654=_0x5a41d4;try{_0x378968(_0x43a29b),_0x4b13fa(_0x43a29b);}finally{_0x2c83a6['console'][_0x4e6654(0x124)]=_0x4b13fa;}},_0x1235f8=_0x3da03d=>_0x351357=>{try{let [_0x1947b9,_0x27cb50]=_0x351357['split'](':logPointId:');_0x11e10d(_0x27cb50,_0x1947b9),_0x3da03d(_0x1947b9);}finally{_0x2c83a6['console']['timeEnd']=_0x3da03d;}};_0x2c83a6['_console_ninja']={'consoleLog':(_0x2bb6a8,_0x52669f)=>{var _0x597be9=_0x5a41d4;_0x2c83a6[_0x597be9(0x128)][_0x597be9(0x174)][_0x597be9(0x185)]!==_0x597be9(0x17e)&&_0x2e2251(_0x377a42(_0x597be9(0x174),_0x2bb6a8,_0x3e5d39(),_0x57aee3,_0x52669f));},'consoleTrace':(_0x596fe8,_0x4b1434)=>{var _0x1f2612=_0x5a41d4;_0x2c83a6[_0x1f2612(0x128)]['log'][_0x1f2612(0x185)]!==_0x1f2612(0x1db)&&_0x2e2251(_0x377a42(_0x1f2612(0x11c),_0x596fe8,_0x3e5d39(),_0x57aee3,_0x4b1434));},'consoleTime':()=>{var _0x35f094=_0x5a41d4;_0x2c83a6[_0x35f094(0x128)][_0x35f094(0x124)]=_0x1ca1df(_0x2c83a6[_0x35f094(0x128)][_0x35f094(0x124)]);},'consoleTimeEnd':()=>{var _0x3c31e4=_0x5a41d4;_0x2c83a6[_0x3c31e4(0x128)][_0x3c31e4(0x1ec)]=_0x1235f8(_0x2c83a6['console'][_0x3c31e4(0x1ec)]);},'autoLog':(_0x2d2f37,_0x2158bd)=>{var _0x112de9=_0x5a41d4;_0x2e2251(_0x377a42(_0x112de9(0x174),_0x2158bd,_0x3e5d39(),_0x57aee3,[_0x2d2f37]));},'autoLogMany':(_0x10767c,_0x109e67)=>{var _0xa853ce=_0x5a41d4;_0x2e2251(_0x377a42(_0xa853ce(0x174),_0x10767c,_0x3e5d39(),_0x57aee3,_0x109e67));},'autoTrace':(_0x5811ac,_0x2a75ee)=>{_0x2e2251(_0x377a42('trace',_0x2a75ee,_0x3e5d39(),_0x57aee3,[_0x5811ac]));},'autoTraceMany':(_0x121def,_0x29cb17)=>{var _0xcd7c87=_0x5a41d4;_0x2e2251(_0x377a42(_0xcd7c87(0x11c),_0x121def,_0x3e5d39(),_0x57aee3,_0x29cb17));},'autoTime':(_0x4738a1,_0x561fbe,_0x38c08e)=>{_0x378968(_0x38c08e);},'autoTimeEnd':(_0x1a0359,_0x212642,_0x1c3590)=>{_0x11e10d(_0x212642,_0x1c3590);},'coverage':_0x2218c5=>{var _0x32e4ff=_0x5a41d4;_0x2e2251({'method':_0x32e4ff(0x190),'version':_0x2873d8,'args':[{'id':_0x2218c5}]});}};let _0x2e2251=J(_0x2c83a6,_0x5628a2,_0x2805be,_0x5f3406,_0x10ac5d),_0x57aee3=_0x2c83a6[_0x5a41d4(0x12b)];return _0x2c83a6[_0x5a41d4(0x1e5)];})(globalThis,_0x29ec16(0x143),_0x29ec16(0x157),_0x29ec16(0x1cb),_0x29ec16(0x150),'1.0.0',_0x29ec16(0x1a4),_0x29ec16(0x1f7),'');`);
  } catch {
  }
}
function oo_al(v, i) {
  try {
    oo_cm().autoLog(v, i);
  } catch {
  }
  return v;
}

// app/components/ui/button.tsx
var React = __toESM(require("react")), import_react_slot = require("@radix-ui/react-slot"), import_class_variance_authority = require("class-variance-authority");

// app/lib/utils.ts
var import_clsx = require("clsx"), import_tailwind_merge = require("tailwind-merge");
function cn(...inputs) {
  return (0, import_tailwind_merge.twMerge)((0, import_clsx.clsx)(inputs));
}

// app/components/ui/button.tsx
var import_jsx_dev_runtime4 = require("react/jsx-dev-runtime"), buttonVariants = (0, import_class_variance_authority.cva)(
  "inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline"
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
), Button = React.forwardRef(
  ({ className, variant, size, asChild = !1, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_dev_runtime4.jsxDEV)(
    asChild ? import_react_slot.Slot : "button",
    {
      className: cn(buttonVariants({ variant, size, className })),
      ref,
      ...props
    },
    void 0,
    !1,
    {
      fileName: "app/components/ui/button.tsx",
      lineNumber: 46,
      columnNumber: 7
    },
    this
  )
);
Button.displayName = "Button";

// app/routes/_auth.login.tsx
var import_jsx_dev_runtime5 = require("react/jsx-dev-runtime"), action = async ({ request }) => {
  var _a;
  let idToken = (_a = (await request.formData()).get("idToken")) == null ? void 0 : _a.toString();
  await firebaseAdminAuth.verifyIdToken(idToken);
  let jwt = await firebaseAdminAuth.createSessionCookie(idToken, { expiresIn: 5 * 60 * 1e3 });
  return (0, import_server_runtime2.redirect)("/profile", { headers: { "Set-Cookie": await cookie.serialize(jwt) } });
};
function LoginRoute() {
  let fetcher = (0, import_react3.useFetcher)();
  async function onProviderSignIn(credential) {
    let idToken = await credential.user.getIdToken();
    fetcher.submit({ idToken }, { method: "post", action: "/login" });
  }
  async function handleSubmit(ev) {
    ev.preventDefault();
    let target = ev.target, email = target.email.value, password = target.password.value;
    await (0, import_auth3.signInWithEmailAndPassword)(import_firebase.firebaseAuth, email, password).then(onProviderSignIn).catch(console.error);
  }
  async function onClickGoogle() {
    await (0, import_auth3.signInWithPopup)(import_firebase.firebaseAuth, new import_auth3.GoogleAuthProvider()).then(onProviderSignIn).catch(console.error);
  }
  return /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)("div", { children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)(Button, { onClick: onClickGoogle, children: "Google" }, void 0, !1, {
      fileName: "app/routes/_auth.login.tsx",
      lineNumber: 45,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)(import_react3.Form, { onSubmit: handleSubmit, children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)("input", { name: "email" }, void 0, !1, {
        fileName: "app/routes/_auth.login.tsx",
        lineNumber: 47,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)("input", { name: "password" }, void 0, !1, {
        fileName: "app/routes/_auth.login.tsx",
        lineNumber: 48,
        columnNumber: 9
      }, this)
    ] }, void 0, !0, {
      fileName: "app/routes/_auth.login.tsx",
      lineNumber: 46,
      columnNumber: 7
    }, this)
  ] }, void 0, !0, {
    fileName: "app/routes/_auth.login.tsx",
    lineNumber: 44,
    columnNumber: 5
  }, this);
}

// app/routes/dashboard.tsx
var dashboard_exports = {};
__export(dashboard_exports, {
  default: () => Example
});
var import_react4 = require("@headlessui/react"), import_solid = require("@heroicons/react/20/solid"), import_outline = require("@heroicons/react/24/outline"), import_react5 = require("react"), import_jsx_dev_runtime6 = require("react/jsx-dev-runtime"), navigation = [
  { name: "Dashboard", href: "#", current: !0 },
  { name: "Domains", href: "#", current: !1 }
], userNavigation = [
  { name: "Your Profile", href: "#" },
  { name: "Settings", href: "#" },
  { name: "Sign out", href: "#" }
];
var activityItems = [
  {
    project: "Workcation",
    commit: "2d89f0c8",
    environment: "production",
    time: "1h"
  }
  // More items...
];
function clsx2(...classes) {
  return classes.filter(Boolean).join(" ");
}
function Example() {
  return /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)(import_jsx_dev_runtime6.Fragment, { children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)("div", { className: "fixed left-0 top-0 h-full w-1/2 bg-white", "aria-hidden": "true" }, void 0, !1, {
      fileName: "app/routes/dashboard.tsx",
      lineNumber: 64,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)("div", { className: "fixed right-0 top-0 h-full w-1/2 bg-gray-50", "aria-hidden": "true" }, void 0, !1, {
      fileName: "app/routes/dashboard.tsx",
      lineNumber: 65,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)("div", { className: "relative flex min-h-full flex-col", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)(import_react4.Disclosure, { as: "nav", className: "flex-shrink-0 bg-indigo-600", children: ({ open }) => /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)(import_jsx_dev_runtime6.Fragment, { children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)("div", { className: "mx-auto max-w-7xl px-2 sm:px-4 lg:px-8", children: /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)("div", { className: "relative flex h-16 items-center justify-between", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)("div", { className: "flex items-center px-2 lg:px-0 xl:w-64", children: /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)("div", { className: "flex-shrink-0", children: /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)(
            "img",
            {
              className: "h-8 w-auto",
              src: "https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=300",
              alt: "Your Company"
            },
            void 0,
            !1,
            {
              fileName: "app/routes/dashboard.tsx",
              lineNumber: 76,
              columnNumber: 23
            },
            this
          ) }, void 0, !1, {
            fileName: "app/routes/dashboard.tsx",
            lineNumber: 75,
            columnNumber: 21
          }, this) }, void 0, !1, {
            fileName: "app/routes/dashboard.tsx",
            lineNumber: 74,
            columnNumber: 19
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)("div", { className: "flex flex-1 justify-center lg:justify-end", children: /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)("div", { className: "w-full px-2 lg:px-6", children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)("label", { htmlFor: "search", className: "sr-only", children: "Search projects" }, void 0, !1, {
              fileName: "app/routes/dashboard.tsx",
              lineNumber: 87,
              columnNumber: 23
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)("div", { className: "relative text-indigo-200 focus-within:text-gray-400", children: [
              /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)("div", { className: "pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3", children: /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)(import_solid.MagnifyingGlassIcon, { className: "h-5 w-5", "aria-hidden": "true" }, void 0, !1, {
                fileName: "app/routes/dashboard.tsx",
                lineNumber: 92,
                columnNumber: 27
              }, this) }, void 0, !1, {
                fileName: "app/routes/dashboard.tsx",
                lineNumber: 91,
                columnNumber: 25
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)(
                "input",
                {
                  id: "search",
                  name: "search",
                  className: "block w-full rounded-md border-0 bg-indigo-400 bg-opacity-25 py-1.5 pl-10 pr-3 text-indigo-100 placeholder:text-indigo-200 focus:bg-white focus:text-gray-900 focus:outline-none focus:ring-0 focus:placeholder:text-gray-400 sm:text-sm sm:leading-6",
                  placeholder: "Search projects",
                  type: "search"
                },
                void 0,
                !1,
                {
                  fileName: "app/routes/dashboard.tsx",
                  lineNumber: 94,
                  columnNumber: 25
                },
                this
              )
            ] }, void 0, !0, {
              fileName: "app/routes/dashboard.tsx",
              lineNumber: 90,
              columnNumber: 23
            }, this)
          ] }, void 0, !0, {
            fileName: "app/routes/dashboard.tsx",
            lineNumber: 86,
            columnNumber: 21
          }, this) }, void 0, !1, {
            fileName: "app/routes/dashboard.tsx",
            lineNumber: 85,
            columnNumber: 19
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)("div", { className: "flex lg:hidden", children: /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)(import_react4.Disclosure.Button, { className: "inline-flex items-center justify-center rounded-md bg-indigo-600 p-2 text-indigo-400 hover:bg-indigo-600 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-indigo-600", children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)("span", { className: "sr-only", children: "Open main menu" }, void 0, !1, {
              fileName: "app/routes/dashboard.tsx",
              lineNumber: 107,
              columnNumber: 23
            }, this),
            open ? /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)(import_outline.XMarkIcon, { className: "block h-6 w-6", "aria-hidden": "true" }, void 0, !1, {
              fileName: "app/routes/dashboard.tsx",
              lineNumber: 109,
              columnNumber: 25
            }, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)(import_outline.Bars3CenterLeftIcon, { className: "block h-6 w-6", "aria-hidden": "true" }, void 0, !1, {
              fileName: "app/routes/dashboard.tsx",
              lineNumber: 111,
              columnNumber: 25
            }, this)
          ] }, void 0, !0, {
            fileName: "app/routes/dashboard.tsx",
            lineNumber: 106,
            columnNumber: 21
          }, this) }, void 0, !1, {
            fileName: "app/routes/dashboard.tsx",
            lineNumber: 104,
            columnNumber: 19
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)("div", { className: "hidden lg:block lg:w-80", children: /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)("div", { className: "flex items-center justify-end", children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)("div", { className: "flex", children: navigation.map((item) => /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)(
              "a",
              {
                href: item.href,
                className: "rounded-md px-3 py-2 text-sm font-medium text-indigo-200 hover:text-white",
                "aria-current": item.current ? "page" : void 0,
                children: item.name
              },
              item.name,
              !1,
              {
                fileName: "app/routes/dashboard.tsx",
                lineNumber: 120,
                columnNumber: 27
              },
              this
            )) }, void 0, !1, {
              fileName: "app/routes/dashboard.tsx",
              lineNumber: 118,
              columnNumber: 23
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)(import_react4.Menu, { as: "div", className: "relative ml-4 flex-shrink-0", children: [
              /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)("div", { children: /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)(import_react4.Menu.Button, { className: "flex rounded-full bg-indigo-700 text-sm text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-indigo-700", children: [
                /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)("span", { className: "sr-only", children: "Open user menu" }, void 0, !1, {
                  fileName: "app/routes/dashboard.tsx",
                  lineNumber: 134,
                  columnNumber: 29
                }, this),
                /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)(
                  "img",
                  {
                    className: "h-8 w-8 rounded-full",
                    src: "https://images.unsplash.com/photo-1517365830460-955ce3ccd263?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=256&h=256&q=80",
                    alt: ""
                  },
                  void 0,
                  !1,
                  {
                    fileName: "app/routes/dashboard.tsx",
                    lineNumber: 135,
                    columnNumber: 29
                  },
                  this
                )
              ] }, void 0, !0, {
                fileName: "app/routes/dashboard.tsx",
                lineNumber: 133,
                columnNumber: 27
              }, this) }, void 0, !1, {
                fileName: "app/routes/dashboard.tsx",
                lineNumber: 132,
                columnNumber: 25
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)(
                import_react4.Transition,
                {
                  as: import_react5.Fragment,
                  enter: "transition ease-out duration-100",
                  enterFrom: "transform opacity-0 scale-95",
                  enterTo: "transform opacity-100 scale-100",
                  leave: "transition ease-in duration-75",
                  leaveFrom: "transform opacity-100 scale-100",
                  leaveTo: "transform opacity-0 scale-95",
                  children: /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)(import_react4.Menu.Items, { className: "absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none", children: userNavigation.map((item) => /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)(import_react4.Menu.Item, { children: ({ active }) => /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)(
                    "a",
                    {
                      href: item.href,
                      className: clsx2(
                        active ? "bg-gray-100" : "",
                        "block px-4 py-2 text-sm text-gray-700"
                      ),
                      children: item.name
                    },
                    void 0,
                    !1,
                    {
                      fileName: "app/routes/dashboard.tsx",
                      lineNumber: 155,
                      columnNumber: 35
                    },
                    this
                  ) }, item.name, !1, {
                    fileName: "app/routes/dashboard.tsx",
                    lineNumber: 153,
                    columnNumber: 31
                  }, this)) }, void 0, !1, {
                    fileName: "app/routes/dashboard.tsx",
                    lineNumber: 151,
                    columnNumber: 27
                  }, this)
                },
                void 0,
                !1,
                {
                  fileName: "app/routes/dashboard.tsx",
                  lineNumber: 142,
                  columnNumber: 25
                },
                this
              )
            ] }, void 0, !0, {
              fileName: "app/routes/dashboard.tsx",
              lineNumber: 131,
              columnNumber: 23
            }, this)
          ] }, void 0, !0, {
            fileName: "app/routes/dashboard.tsx",
            lineNumber: 117,
            columnNumber: 21
          }, this) }, void 0, !1, {
            fileName: "app/routes/dashboard.tsx",
            lineNumber: 116,
            columnNumber: 19
          }, this)
        ] }, void 0, !0, {
          fileName: "app/routes/dashboard.tsx",
          lineNumber: 72,
          columnNumber: 17
        }, this) }, void 0, !1, {
          fileName: "app/routes/dashboard.tsx",
          lineNumber: 71,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)(import_react4.Disclosure.Panel, { className: "lg:hidden", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)("div", { className: "space-y-1 px-2 pb-3 pt-2", children: navigation.map((item) => /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)(
            import_react4.Disclosure.Button,
            {
              as: "a",
              href: item.href,
              className: clsx2(
                item.current ? "bg-indigo-800 text-white" : "text-indigo-200 hover:bg-indigo-600 hover:text-indigo-100",
                "block rounded-md px-3 py-2 text-base font-medium"
              ),
              "aria-current": item.current ? "page" : void 0,
              children: item.name
            },
            item.name,
            !1,
            {
              fileName: "app/routes/dashboard.tsx",
              lineNumber: 178,
              columnNumber: 21
            },
            this
          )) }, void 0, !1, {
            fileName: "app/routes/dashboard.tsx",
            lineNumber: 176,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)("div", { className: "border-t border-indigo-800 pb-3 pt-4", children: /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)("div", { className: "space-y-1 px-2", children: userNavigation.map((item) => /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)(
            import_react4.Disclosure.Button,
            {
              as: "a",
              href: item.href,
              className: "block rounded-md px-3 py-2 text-base font-medium text-indigo-200 hover:bg-indigo-600 hover:text-indigo-100",
              children: item.name
            },
            item.name,
            !1,
            {
              fileName: "app/routes/dashboard.tsx",
              lineNumber: 197,
              columnNumber: 23
            },
            this
          )) }, void 0, !1, {
            fileName: "app/routes/dashboard.tsx",
            lineNumber: 195,
            columnNumber: 19
          }, this) }, void 0, !1, {
            fileName: "app/routes/dashboard.tsx",
            lineNumber: 194,
            columnNumber: 17
          }, this)
        ] }, void 0, !0, {
          fileName: "app/routes/dashboard.tsx",
          lineNumber: 175,
          columnNumber: 15
        }, this)
      ] }, void 0, !0, {
        fileName: "app/routes/dashboard.tsx",
        lineNumber: 70,
        columnNumber: 13
      }, this) }, void 0, !1, {
        fileName: "app/routes/dashboard.tsx",
        lineNumber: 68,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)("div", { className: "mx-auto w-full max-w-7xl flex-grow lg:flex xl:px-8", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)("div", { className: "min-w-0 flex-1 bg-white xl:flex", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)("div", { className: "bg-white xl:w-64 xl:flex-shrink-0 xl:border-r xl:border-gray-200", children: /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)("div", { className: "py-6 pl-4 pr-6 sm:pl-6 lg:pl-8 xl:pl-0", children: /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)("div", { className: "flex items-center justify-between", children: /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)("div", { className: "flex-1 space-y-8", children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)("div", { className: "space-y-8 sm:flex sm:items-center sm:justify-between sm:space-y-0 xl:block xl:space-y-8", children: [
              /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)("div", { className: "flex items-center space-x-3", children: [
                /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)("div", { className: "h-12 w-12 flex-shrink-0", children: /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)(
                  "img",
                  {
                    className: "h-12 w-12 rounded-full",
                    src: "https://images.unsplash.com/photo-1517365830460-955ce3ccd263?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=256&h=256&q=80",
                    alt: ""
                  },
                  void 0,
                  !1,
                  {
                    fileName: "app/routes/dashboard.tsx",
                    lineNumber: 226,
                    columnNumber: 27
                  },
                  this
                ) }, void 0, !1, {
                  fileName: "app/routes/dashboard.tsx",
                  lineNumber: 225,
                  columnNumber: 25
                }, this),
                /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)("div", { className: "space-y-1", children: [
                  /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)("div", { className: "text-sm font-medium text-gray-900", children: "Debbie Lewis" }, void 0, !1, {
                    fileName: "app/routes/dashboard.tsx",
                    lineNumber: 233,
                    columnNumber: 27
                  }, this),
                  /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)("a", { href: "#", className: "group flex items-center space-x-2.5", children: [
                    /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)(
                      "svg",
                      {
                        className: "h-5 w-5 text-gray-400 group-hover:text-gray-500",
                        "aria-hidden": "true",
                        fill: "currentColor",
                        viewBox: "0 0 20 20",
                        children: [
                          "Box",
                          /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)(
                            "path",
                            {
                              fillRule: "evenodd",
                              d: "M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z",
                              clipRule: "evenodd"
                            },
                            void 0,
                            !1,
                            {
                              fileName: "app/routes/dashboard.tsx",
                              lineNumber: 242,
                              columnNumber: 31
                            },
                            this
                          )
                        ]
                      },
                      void 0,
                      !0,
                      {
                        fileName: "app/routes/dashboard.tsx",
                        lineNumber: 235,
                        columnNumber: 29
                      },
                      this
                    ),
                    /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)("span", { className: "text-sm font-medium text-gray-500 group-hover:text-gray-900", children: "debbielewis" }, void 0, !1, {
                      fileName: "app/routes/dashboard.tsx",
                      lineNumber: 248,
                      columnNumber: 29
                    }, this)
                  ] }, void 0, !0, {
                    fileName: "app/routes/dashboard.tsx",
                    lineNumber: 234,
                    columnNumber: 27
                  }, this)
                ] }, void 0, !0, {
                  fileName: "app/routes/dashboard.tsx",
                  lineNumber: 232,
                  columnNumber: 25
                }, this)
              ] }, void 0, !0, {
                fileName: "app/routes/dashboard.tsx",
                lineNumber: 224,
                columnNumber: 23
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)("div", { className: "flex flex-col sm:flex-row xl:flex-col", children: [
                /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)(
                  "button",
                  {
                    type: "button",
                    className: "inline-flex items-center justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 xl:w-full",
                    children: "New Project"
                  },
                  void 0,
                  !1,
                  {
                    fileName: "app/routes/dashboard.tsx",
                    lineNumber: 256,
                    columnNumber: 25
                  },
                  this
                ),
                /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)(
                  "button",
                  {
                    type: "button",
                    className: "mt-3 inline-flex items-center justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:ml-3 sm:mt-0 xl:ml-0 xl:mt-3 xl:w-full",
                    children: "Invite Team"
                  },
                  void 0,
                  !1,
                  {
                    fileName: "app/routes/dashboard.tsx",
                    lineNumber: 262,
                    columnNumber: 25
                  },
                  this
                )
              ] }, void 0, !0, {
                fileName: "app/routes/dashboard.tsx",
                lineNumber: 255,
                columnNumber: 23
              }, this)
            ] }, void 0, !0, {
              fileName: "app/routes/dashboard.tsx",
              lineNumber: 222,
              columnNumber: 21
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)("div", { className: "flex flex-col space-y-6 sm:flex-row sm:space-x-8 sm:space-y-0 xl:flex-col xl:space-x-0 xl:space-y-6", children: [
              /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)("div", { className: "flex items-center space-x-2", children: [
                /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)(import_solid.CheckBadgeIcon, { className: "h-5 w-5 text-gray-400", "aria-hidden": "true" }, void 0, !1, {
                  fileName: "app/routes/dashboard.tsx",
                  lineNumber: 273,
                  columnNumber: 25
                }, this),
                /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)("span", { className: "text-sm font-medium text-gray-500", children: "Pro Member" }, void 0, !1, {
                  fileName: "app/routes/dashboard.tsx",
                  lineNumber: 274,
                  columnNumber: 25
                }, this)
              ] }, void 0, !0, {
                fileName: "app/routes/dashboard.tsx",
                lineNumber: 272,
                columnNumber: 23
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)("div", { className: "flex items-center space-x-2", children: [
                /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)(import_solid.RectangleStackIcon, { className: "h-5 w-5 text-gray-400", "aria-hidden": "true" }, void 0, !1, {
                  fileName: "app/routes/dashboard.tsx",
                  lineNumber: 277,
                  columnNumber: 25
                }, this),
                /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)("span", { className: "text-sm font-medium text-gray-500", children: "8 Projects" }, void 0, !1, {
                  fileName: "app/routes/dashboard.tsx",
                  lineNumber: 278,
                  columnNumber: 25
                }, this)
              ] }, void 0, !0, {
                fileName: "app/routes/dashboard.tsx",
                lineNumber: 276,
                columnNumber: 23
              }, this)
            ] }, void 0, !0, {
              fileName: "app/routes/dashboard.tsx",
              lineNumber: 271,
              columnNumber: 21
            }, this)
          ] }, void 0, !0, {
            fileName: "app/routes/dashboard.tsx",
            lineNumber: 221,
            columnNumber: 19
          }, this) }, void 0, !1, {
            fileName: "app/routes/dashboard.tsx",
            lineNumber: 220,
            columnNumber: 17
          }, this) }, void 0, !1, {
            fileName: "app/routes/dashboard.tsx",
            lineNumber: 219,
            columnNumber: 15
          }, this) }, void 0, !1, {
            fileName: "app/routes/dashboard.tsx",
            lineNumber: 218,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)("div", { className: "bg-white lg:min-w-0 lg:flex-1", children: /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)("div", { className: "border-b border-t border-gray-200 pb-4 pl-4 pr-6 pt-4 sm:pl-6 lg:pl-8 xl:border-t-0 xl:pl-6 xl:pt-6", children: /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)("div", { className: "flex items-center", children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)("h1", { className: "flex-1 text-lg font-medium", children: "Projects" }, void 0, !1, {
              fileName: "app/routes/dashboard.tsx",
              lineNumber: 290,
              columnNumber: 19
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)(import_react4.Menu, { as: "div", className: "relative", children: [
              /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)(import_react4.Menu.Button, { className: "inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50", children: [
                /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)(
                  import_solid.BarsArrowUpIcon,
                  {
                    className: "-ml-0.5 h-5 w-5 text-gray-400",
                    "aria-hidden": "true"
                  },
                  void 0,
                  !1,
                  {
                    fileName: "app/routes/dashboard.tsx",
                    lineNumber: 293,
                    columnNumber: 23
                  },
                  this
                ),
                "Sort",
                /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)(import_solid.ChevronDownIcon, { className: "-mr-1 h-5 w-5 text-gray-400", "aria-hidden": "true" }, void 0, !1, {
                  fileName: "app/routes/dashboard.tsx",
                  lineNumber: 298,
                  columnNumber: 23
                }, this)
              ] }, void 0, !0, {
                fileName: "app/routes/dashboard.tsx",
                lineNumber: 292,
                columnNumber: 21
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)(import_react4.Menu.Items, { className: "absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none", children: /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)("div", { className: "py-1", children: [
                /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)(import_react4.Menu.Item, { children: ({ active }) => /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)(
                  "a",
                  {
                    href: "#",
                    className: clsx2(
                      active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                      "block px-4 py-2 text-sm"
                    ),
                    children: "Name"
                  },
                  void 0,
                  !1,
                  {
                    fileName: "app/routes/dashboard.tsx",
                    lineNumber: 304,
                    columnNumber: 29
                  },
                  this
                ) }, void 0, !1, {
                  fileName: "app/routes/dashboard.tsx",
                  lineNumber: 302,
                  columnNumber: 25
                }, this),
                /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)(import_react4.Menu.Item, { children: ({ active }) => /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)(
                  "a",
                  {
                    href: "#",
                    className: clsx2(
                      active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                      "block px-4 py-2 text-sm"
                    ),
                    children: "Date modified"
                  },
                  void 0,
                  !1,
                  {
                    fileName: "app/routes/dashboard.tsx",
                    lineNumber: 317,
                    columnNumber: 29
                  },
                  this
                ) }, void 0, !1, {
                  fileName: "app/routes/dashboard.tsx",
                  lineNumber: 315,
                  columnNumber: 25
                }, this),
                /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)(import_react4.Menu.Item, { children: ({ active }) => /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)(
                  "a",
                  {
                    href: "#",
                    className: clsx2(
                      active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                      "block px-4 py-2 text-sm"
                    ),
                    children: "Date created"
                  },
                  void 0,
                  !1,
                  {
                    fileName: "app/routes/dashboard.tsx",
                    lineNumber: 330,
                    columnNumber: 29
                  },
                  this
                ) }, void 0, !1, {
                  fileName: "app/routes/dashboard.tsx",
                  lineNumber: 328,
                  columnNumber: 25
                }, this)
              ] }, void 0, !0, {
                fileName: "app/routes/dashboard.tsx",
                lineNumber: 301,
                columnNumber: 23
              }, this) }, void 0, !1, {
                fileName: "app/routes/dashboard.tsx",
                lineNumber: 300,
                columnNumber: 21
              }, this)
            ] }, void 0, !0, {
              fileName: "app/routes/dashboard.tsx",
              lineNumber: 291,
              columnNumber: 19
            }, this)
          ] }, void 0, !0, {
            fileName: "app/routes/dashboard.tsx",
            lineNumber: 289,
            columnNumber: 17
          }, this) }, void 0, !1, {
            fileName: "app/routes/dashboard.tsx",
            lineNumber: 288,
            columnNumber: 15
          }, this) }, void 0, !1, {
            fileName: "app/routes/dashboard.tsx",
            lineNumber: 287,
            columnNumber: 13
          }, this)
        ] }, void 0, !0, {
          fileName: "app/routes/dashboard.tsx",
          lineNumber: 216,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)("div", { className: "bg-gray-50 pr-4 sm:pr-6 lg:flex-shrink-0 lg:border-l lg:border-gray-200 lg:pr-8 xl:pr-0", children: /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)("div", { className: "pl-6 lg:w-80", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)("div", { className: "pb-2 pt-6", children: /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)("h2", { className: "text-sm font-semibold", children: "Activity" }, void 0, !1, {
            fileName: "app/routes/dashboard.tsx",
            lineNumber: 352,
            columnNumber: 17
          }, this) }, void 0, !1, {
            fileName: "app/routes/dashboard.tsx",
            lineNumber: 351,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)("div", { children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)("ul", { role: "list", className: "divide-y divide-gray-200", children: activityItems.map((item) => /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)("li", { className: "py-4", children: /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)("div", { className: "flex space-x-3", children: [
              /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)(
                "img",
                {
                  className: "h-6 w-6 rounded-full",
                  src: "https://images.unsplash.com/photo-1517365830460-955ce3ccd263?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=256&h=256&q=80",
                  alt: ""
                },
                void 0,
                !1,
                {
                  fileName: "app/routes/dashboard.tsx",
                  lineNumber: 359,
                  columnNumber: 25
                },
                this
              ),
              /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)("div", { className: "flex-1 space-y-1", children: [
                /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)("div", { className: "flex items-center justify-between", children: [
                  /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)("h3", { className: "text-sm font-medium", children: "You" }, void 0, !1, {
                    fileName: "app/routes/dashboard.tsx",
                    lineNumber: 366,
                    columnNumber: 29
                  }, this),
                  /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)("p", { className: "text-sm text-gray-500", children: item.time }, void 0, !1, {
                    fileName: "app/routes/dashboard.tsx",
                    lineNumber: 367,
                    columnNumber: 29
                  }, this)
                ] }, void 0, !0, {
                  fileName: "app/routes/dashboard.tsx",
                  lineNumber: 365,
                  columnNumber: 27
                }, this),
                /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)("p", { className: "text-sm text-gray-500", children: [
                  "Deployed ",
                  item.project,
                  " (",
                  item.commit,
                  " in master) to ",
                  item.environment
                ] }, void 0, !0, {
                  fileName: "app/routes/dashboard.tsx",
                  lineNumber: 369,
                  columnNumber: 27
                }, this)
              ] }, void 0, !0, {
                fileName: "app/routes/dashboard.tsx",
                lineNumber: 364,
                columnNumber: 25
              }, this)
            ] }, void 0, !0, {
              fileName: "app/routes/dashboard.tsx",
              lineNumber: 358,
              columnNumber: 23
            }, this) }, item.commit, !1, {
              fileName: "app/routes/dashboard.tsx",
              lineNumber: 357,
              columnNumber: 21
            }, this)) }, void 0, !1, {
              fileName: "app/routes/dashboard.tsx",
              lineNumber: 355,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)("div", { className: "border-t border-gray-200 py-4 text-sm", children: /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)("a", { href: "#", className: "font-semibold text-indigo-600 hover:text-indigo-900", children: [
              "View all activity",
              /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)("span", { "aria-hidden": "true", children: " \u2192" }, void 0, !1, {
                fileName: "app/routes/dashboard.tsx",
                lineNumber: 380,
                columnNumber: 21
              }, this)
            ] }, void 0, !0, {
              fileName: "app/routes/dashboard.tsx",
              lineNumber: 378,
              columnNumber: 19
            }, this) }, void 0, !1, {
              fileName: "app/routes/dashboard.tsx",
              lineNumber: 377,
              columnNumber: 17
            }, this)
          ] }, void 0, !0, {
            fileName: "app/routes/dashboard.tsx",
            lineNumber: 354,
            columnNumber: 15
          }, this)
        ] }, void 0, !0, {
          fileName: "app/routes/dashboard.tsx",
          lineNumber: 350,
          columnNumber: 13
        }, this) }, void 0, !1, {
          fileName: "app/routes/dashboard.tsx",
          lineNumber: 349,
          columnNumber: 11
        }, this)
      ] }, void 0, !0, {
        fileName: "app/routes/dashboard.tsx",
        lineNumber: 214,
        columnNumber: 9
      }, this)
    ] }, void 0, !0, {
      fileName: "app/routes/dashboard.tsx",
      lineNumber: 66,
      columnNumber: 7
    }, this)
  ] }, void 0, !0, {
    fileName: "app/routes/dashboard.tsx",
    lineNumber: 54,
    columnNumber: 5
  }, this);
}

// app/routes/_index.tsx
var index_exports = {};
__export(index_exports, {
  default: () => Index,
  meta: () => meta
});
var import_jsx_dev_runtime7 = require("react/jsx-dev-runtime"), meta = () => [{ title: "Remix Notes" }];
function Index() {
  return /* @__PURE__ */ (0, import_jsx_dev_runtime7.jsxDEV)("div", { children: /* @__PURE__ */ (0, import_jsx_dev_runtime7.jsxDEV)(Button, { color: "", variant: "outline", size: "", children: "button" }, void 0, !1, {
    fileName: "app/routes/_index.tsx",
    lineNumber: 9,
    columnNumber: 7
  }, this) }, void 0, !1, {
    fileName: "app/routes/_index.tsx",
    lineNumber: 8,
    columnNumber: 5
  }, this);
}

// server-assets-manifest:@remix-run/dev/assets-manifest
var assets_manifest_default = { entry: { module: "/build/entry.client-FL4FWIIO.js", imports: ["/build/_shared/chunk-H2VEMB3G.js", "/build/_shared/chunk-7GIZRQDN.js", "/build/_shared/chunk-IU43IUTG.js"] }, routes: { root: { id: "root", parentId: void 0, path: "", index: void 0, caseSensitive: void 0, module: "/build/root-JILD2MHX.js", imports: void 0, hasAction: !1, hasLoader: !1, hasCatchBoundary: !1, hasErrorBoundary: !1 }, "routes/_auth.login": { id: "routes/_auth.login", parentId: "root", path: "login", index: void 0, caseSensitive: void 0, module: "/build/routes/_auth.login-GILFPEIK.js", imports: ["/build/_shared/chunk-VD532J73.js", "/build/_shared/chunk-D26FZJQV.js"], hasAction: !0, hasLoader: !1, hasCatchBoundary: !1, hasErrorBoundary: !1 }, "routes/_auth.logout": { id: "routes/_auth.logout", parentId: "root", path: "logout", index: void 0, caseSensitive: void 0, module: "/build/routes/_auth.logout-CVJKV7IS.js", imports: void 0, hasAction: !1, hasLoader: !0, hasCatchBoundary: !1, hasErrorBoundary: !1 }, "routes/_auth.profile": { id: "routes/_auth.profile", parentId: "root", path: "profile", index: void 0, caseSensitive: void 0, module: "/build/routes/_auth.profile-5MIDFAL5.js", imports: ["/build/_shared/chunk-VD532J73.js"], hasAction: !1, hasLoader: !1, hasCatchBoundary: !1, hasErrorBoundary: !1 }, "routes/_index": { id: "routes/_index", parentId: "root", path: void 0, index: !0, caseSensitive: void 0, module: "/build/routes/_index-ZUWVGSZK.js", imports: ["/build/_shared/chunk-D26FZJQV.js"], hasAction: !1, hasLoader: !1, hasCatchBoundary: !1, hasErrorBoundary: !1 }, "routes/dashboard": { id: "routes/dashboard", parentId: "root", path: "dashboard", index: void 0, caseSensitive: void 0, module: "/build/routes/dashboard-WX5TL5ET.js", imports: void 0, hasAction: !1, hasLoader: !1, hasCatchBoundary: !1, hasErrorBoundary: !1 } }, version: "c7f4ab24", hmr: void 0, url: "/build/manifest-C7F4AB24.js" };

// server-entry-module:@remix-run/dev/server-build
var assetsBuildDirectory = "public/build", future = { v2_dev: !1, unstable_postcss: !1, unstable_tailwind: !1, v2_errorBoundary: !0, v2_headers: !1, v2_meta: !0, v2_normalizeFormMethod: !0, v2_routeConvention: !0 }, publicPath = "/build/", entry = { module: entry_server_react_stream_exports }, routes = {
  root: {
    id: "root",
    parentId: void 0,
    path: "",
    index: void 0,
    caseSensitive: void 0,
    module: root_exports
  },
  "routes/_auth.profile": {
    id: "routes/_auth.profile",
    parentId: "root",
    path: "profile",
    index: void 0,
    caseSensitive: void 0,
    module: auth_profile_exports
  },
  "routes/_auth.logout": {
    id: "routes/_auth.logout",
    parentId: "root",
    path: "logout",
    index: void 0,
    caseSensitive: void 0,
    module: auth_logout_exports
  },
  "routes/_auth.login": {
    id: "routes/_auth.login",
    parentId: "root",
    path: "login",
    index: void 0,
    caseSensitive: void 0,
    module: auth_login_exports
  },
  "routes/dashboard": {
    id: "routes/dashboard",
    parentId: "root",
    path: "dashboard",
    index: void 0,
    caseSensitive: void 0,
    module: dashboard_exports
  },
  "routes/_index": {
    id: "routes/_index",
    parentId: "root",
    path: void 0,
    index: !0,
    caseSensitive: void 0,
    module: index_exports
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  assets,
  assetsBuildDirectory,
  entry,
  future,
  publicPath,
  routes
});
//# sourceMappingURL=index.js.map
