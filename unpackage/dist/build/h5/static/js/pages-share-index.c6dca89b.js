(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-share-index"],{"2ebd":function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var u={mounted:function(){var e=this.$route.query.id;e||(e="123"),uni.request({url:"https://metamusic.toob.net.cn/cove.json?id="+e,success:function(e){200==e.statusCode?console.log(e.data):console.error("request error:",e)}})}};t.default=u},"860e":function(e,t,n){"use strict";n.r(t);var u=n("b95b"),r=n("a08d");for(var o in r)"default"!==o&&function(e){n.d(t,e,(function(){return r[e]}))}(o);var c,a=n("f0c5"),i=Object(a["a"])(r["default"],u["b"],u["c"],!1,null,"7f820b13",null,!1,u["a"],c);t["default"]=i.exports},a08d:function(e,t,n){"use strict";n.r(t);var u=n("2ebd"),r=n.n(u);for(var o in u)"default"!==o&&function(e){n.d(t,e,(function(){return u[e]}))}(o);t["default"]=r.a},b95b:function(e,t,n){"use strict";var u;n.d(t,"b",(function(){return r})),n.d(t,"c",(function(){return o})),n.d(t,"a",(function(){return u}));var r=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("v-uni-view",{},[e._v("123")])},o=[]}}]);