webpackJsonp([0,11],{K7rM:function(e,t){e.exports='<div class="container-fluid">\r\n  <page-header [title]="title"></page-header>\r\n  <div [innerHtml]="readme"></div>\r\n</div>\r\n'},Ol2F:function(e,t,n){"use strict";var r=n("3j3K"),i=n("8A5H"),o=n("KjPI");n.d(t,"a",function(){return c});var a=this&&this.__decorate||function(e,t,n,r){var i,o=arguments.length,a=o<3?t:null===r?r=Object.getOwnPropertyDescriptor(t,n):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(e,t,n,r);else for(var s=e.length-1;s>=0;s--)(i=e[s])&&(a=(o<3?i(a):o>3?i(t,n,a):i(t,n))||a);return o>3&&a&&Object.defineProperty(t,n,a),a},s=this&&this.__metadata||function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)},c=function(){function e(e,t){this.app=e,this.translateService=t,this.readme=n("X2Ir"),this.title=this.translateService.instant("Home")}return e.prototype.ngOnInit=function(){this.init()},e.prototype.init=function(){this.app.currentPageName="home",this.app.currentPageTitle=this.title},e}();c=a([n.i(r.Component)({selector:"home-page",template:n("K7rM"),styles:[n("ZPDK")]}),s("design:paramtypes",["function"==typeof(p=void 0!==o.z&&o.z)&&p||Object,"function"==typeof(l=void 0!==i.b&&i.b)&&l||Object])],c);var p,l},SIfs:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=n("3j3K"),i=n("2Je8"),o=n("Ol2F"),a=n("5oXY"),s=n("ldIc"),c=n("KjPI"),p=n("8A5H");n.d(t,"HomePageModule",function(){return u});var l=this&&this.__decorate||function(e,t,n,r){var i,o=arguments.length,a=o<3?t:null===r?r=Object.getOwnPropertyDescriptor(t,n):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(e,t,n,r);else for(var s=e.length-1;s>=0;s--)(i=e[s])&&(a=(o<3?i(a):o>3?i(t,n,a):i(t,n))||a);return o>3&&a&&Object.defineProperty(t,n,a),a},u=d=function(){function e(){}return e.forRoot=function(){return{ngModule:d,providers:[]}},e}();u=d=l([n.i(r.NgModule)({imports:[i.CommonModule,p.a.forChild(),c.y.forRoot(),a.a.forChild(s.a)],declarations:[o.a],exports:[o.a],entryComponents:[o.a]})],u);var d},X2Ir:function(e,t){e.exports='<p><a href="https://npmjs.org/package/rucken"><img src="https://badge.fury.io/js/rucken.svg" alt="NPM version"></a>\n<a href="https://david-dm.org/site15/rucken"><img src="https://david-dm.org/site15/rucken/status.svg" alt="dependencies Status"></a>\n<a href="https://gitter.im/site15-ru/rucken"><img src="https://img.shields.io/gitter/room/nwjs/nw.js.svg" alt="Gitter"></a>\n<a href="https://t.me/joinchat/AAAAAAtLpXFkn1XWDUFCFA"><img src="https://img.shields.io/badge/chat-telegram-blue.svg?maxAge=2592000" alt="Join the chat at telegram"></a></p>\n<p>Status: Beta</p>\n<h2 id="what-is-rucken-">What is Rucken?</h2>\n<ul>\n<li><strong>Core</strong> - Base core for create web applications on <code>Angular2</code>.</li>\n<li><strong>Admin</strong> - Include work with admin, user groups and permissions.</li>\n<li><strong>DI</strong> - With dependency injection you can change base service.</li>\n<li><strong>Extends</strong> - Write components with extends from core <code>rucken</code> components.</li>\n</ul>\n<h4 id="quick-links">Quick links</h4>\n<p><a href="https://github.com/site15/rucken">Source</a> - Source code.</p>\n<p><a href="https://site15.github.io/rucken">Demo</a> - Demo application with mock data worked.</p>\n<p><a href="https://github.com/site15/rucken/tree/master/demo">Demo source</a> - Source code of demo application.</p>\n<h2 id="install">Install</h2>\n<pre class="prettyprint lang-bash">npm install rucken --save</pre><h2 id="license">License</h2>\n<p>MIT</p>\n'},ZPDK:function(e,t,n){t=e.exports=n("FZ+f")(),t.push([e.i,"",""]),e.exports=e.exports.toString()},ldIc:function(e,t,n){"use strict";var r=n("Ol2F");n.d(t,"a",function(){return i});var i=[{path:"",pathMatch:"full",component:r.a}]}});