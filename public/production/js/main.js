!function(n,r){var e=n.define;e&&e.amd?e("rlite",[],r):"undefined"!=typeof module&&module.exports?module.exports=r():n.Rlite=r()}(this,function(){return function(){function n(n){return n}function r(n){return~n.indexOf("/?")&&(n=n.replace("/?","?")),"/"==n[0]&&(n=n.slice(1)),"/"==n[n.length-1]&&(n=n.slice(0,-1)),n}function e(n,r){for(var e=n.split("/"),t=o,i={},u=0;u<e.length&&t;++u){var a=r(e[u]);t=t[a.toLowerCase()]||t[":"],t&&t["~"]&&(i[t["~"]]=a)}return t&&{cb:t["@"],params:i}}function t(n,r,e){if(n&&r.cb)for(var t=n.indexOf("#"),i=(0>t?n:n.slice(0,t)).split("&"),o=0;o<i.length;++o){var u=i[o].split("=");r.params[u[0]]=e(u[1])}return r}function i(i){var o=r(i).split("?"),a=~i.indexOf("%")?u:n;return t(o[1],e(o[0],a)||{},a)}var o={},u=decodeURIComponent;return{add:function(n,r){for(var e=n.split("/"),t=o,i=0;i<e.length;++i){var u=e[i],a=":"==u[0]?":":u.toLowerCase();t=t[a]||(t[a]={}),":"==a&&(t["~"]=u.slice(1))}t["@"]=r},exists:function(n){return!!i(n).cb},lookup:i,run:function(n){var r=i(n);return r.cb&&r.cb({url:n,params:r.params}),!!r.cb}}}});
var request=function(){return{get:function(e,t){var n=new XMLHttpRequest;console.log(t),n.open("GET",e,!0),n.send(),n.onreadystatechange=function(){if(4==n.readyState&&200==n.status){var e=n.responseText;t(e)}}}}}();
var router=function(){var a=new Rlite;return a.add("",function(){llApp.wrapper.innerHTML=llApp.feedData}),a.add("appearance/:id",function(a){request.get("/api/appearance/"+a.params.id,function(a){llApp.wrapper.innerHTML=a,llApp.appearance()})}),a}();
var llApp=function(){"use strict";function t(){var t=location.hash||"#",e=t.slice(1);router.run(e)}function e(t){"loading"!==document.readyState&&t instanceof Function?t():document.addEventListener("DOMContentLoaded",t)}var c={};return c.wrapper="",c.feedData="",c.appearance=function(){var t=document.querySelector(".product"),e=document.querySelector('.product-indicator[data-uuid="'+t.getAttribute("data-uuid")+'"]'),c=document.querySelectorAll(".product-indicator");t.classList.add("product-active"),e.classList.add("product-indicator-active"),Array.prototype.forEach.call(c,function(t){t.addEventListener("click",function(t){var e=t.currentTarget.getAttribute("data-uuid");document.querySelector(".product-active").classList.remove("product-active"),document.querySelector(".product-indicator-active").classList.remove("product-indicator-active"),document.querySelector('.product[data-uuid="'+e+'"]').classList.add("product-active"),t.currentTarget.classList.add("product-indicator-active")})})},c.init=function(){c.wrapper=document.querySelector("main"),request.get("/api/feed",function(e){c.feedData=e,t()}),e(function(){/appearance/.test(window.location.href)&&c.appearance()}),window.addEventListener("hashchange",t)},c}();!function(){llApp.init()}();