(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["auth"],{"028f":function(e,t,r){"use strict";var n;r.d(t,"b",(function(){return o})),r.d(t,"c",(function(){return a})),r.d(t,"a",(function(){return n}));var o=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div")},a=[]},"1da1":function(e,t,r){"use strict";function n(e,t,r,n,o,a,u){try{var c=e[a](u),i=c.value}catch(s){return void r(s)}c.done?t(i):Promise.resolve(i).then(n,o)}function o(e){return function(){var t=this,r=arguments;return new Promise((function(o,a){var u=e.apply(t,r);function c(e){n(u,o,a,c,i,"next",e)}function i(e){n(u,o,a,c,i,"throw",e)}c(void 0)}))}}r("d3b7"),Object.defineProperty(t,"__esModule",{value:!0}),t.default=o},"7bcb":function(e,t,r){"use strict";r.r(t);var n=r("ccbb"),o=r.n(n);for(var a in n)"default"!==a&&function(e){r.d(t,e,(function(){return n[e]}))}(a);t["default"]=o.a},a662:function(e,t,r){"use strict";r.r(t);var n=r("028f"),o=r("7bcb");for(var a in o)"default"!==a&&function(e){r.d(t,e,(function(){return o[e]}))}(a);var u,c=r("f0c5"),i=Object(c["a"])(o["default"],n["b"],n["c"],!1,null,"46a007a2",null,!1,n["a"],u);t["default"]=i.exports},ccbb:function(e,t,r){"use strict";var n=r("4ea4");r("ac1f"),r("5319"),Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0,r("96cf");var o=n(r("1da1")),a={name:"Auth",created:function(){var e=this;return(0,o.default)(regeneratorRuntime.mark((function t(){var r;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:if(e.$route.query.code)try{r=sessionStorage.getItem("wxRedirectUrl"),uni.request({url:"https://metamusic.toob.net.cn/api/oauth/wechat/oalogin?code="+e.$route.query.code,success:function(t){if(console.log("request api:",t),200==t.state){var n=t.headers["access_token"];localStorage.setItem("token",n),localStorage.setItem("wxUserInfo",JSON.stringify(t.data.root)),localStorage.setItem("openId",t.data.root.openId),uni.setStorage({key:"userInfo",data:JSON.stringify(t.data.root)})}console.log("request redirectUrl:",r),r?e.$router.replace(r):e.$router.replace("./")}})}catch(n){console.log(n)}else e.$router.replace("/");case 1:case"end":return t.stop()}}),t)})))()}};t.default=a}}]);