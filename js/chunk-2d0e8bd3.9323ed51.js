(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d0e8bd3"],{"8b0c":function(a,t,r){"use strict";r.r(t);var e=function(){var a=this,t=a.$createElement,r=a._self._c||t;return r("div",{staticClass:"container"},[a._m(0),r("div",{staticClass:"table-wrapper"},[r("table",{staticClass:"table-users"},[a._m(1),a._l(a.AraclarDizi,(function(t){return r("tr",{key:t.key},[r("td",[a._v(a._s(t.arac_ismi))]),r("td",[a._v(a._s(t.arac_durumu))])])}))],2)])])},i=[function(){var a=this,t=a.$createElement,r=a._self._c||t;return r("header",[r("h3",[a._v("Araçlar")])])},function(){var a=this,t=a.$createElement,r=a._self._c||t;return r("tr",[r("th",{staticStyle:{width:"50%"}},[a._v("Araç İsmi")]),r("th",{staticStyle:{width:"50%"}},[a._v("Araç Durumu")])])}],c=(r("4160"),r("159b"),r("88b8")),n={data:function(){return{AraclarDizi:[]}},created:function(){var a=this;c["a"].collection("araclar").onSnapshot((function(t){a.AraclarDizi=[],t.forEach((function(t){a.AraclarDizi.push({key:t.id,arac_ismi:t.data().arac_ismi,arac_durumu:t.data().arac_durumu})}))}))}},u=n,s=r("2877"),l=Object(s["a"])(u,e,i,!1,null,null,null);t["default"]=l.exports}}]);
//# sourceMappingURL=chunk-2d0e8bd3.9323ed51.js.map