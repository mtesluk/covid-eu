(this["webpackJsonpcovid-eu"]=this["webpackJsonpcovid-eu"]||[]).push([[0],{107:function(e,t,a){},108:function(e,t,a){},109:function(e,t,a){},110:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),o=a(51),c=a.n(o),s=(a(83),a(25)),i=(a(84),a(17)),l=a(3),u=a(6),m=a(7),d=a(9),f=a(8),p=(a(85),a(120)),h=a(23),v=a.n(h),g=a(2),_=function(e){Object(d.a)(a,e);var t=Object(f.a)(a);function a(e){var n;return Object(u.a)(this,a),(n=t.call(this,e)).ref=r.a.createRef(),n.state={loading:!0,coronaData:{},width:0,endpoints:{countries:"https://coronavirus-19-api.herokuapp.com/countries",map:"./eu.json"}},n}return Object(m.a)(a,[{key:"componentDidMount",value:function(){var e=this;getComputedStyle||alert("Not supported");var t=getComputedStyle(this.ref.current),a=this.ref.current.clientWidth,n=.8*(a-=parseFloat(t.paddingLeft)+parseFloat(t.paddingRight)),r=g.c().translate([a/4,1.6*n]).scale([a/1.1]),o=g.d().projection(r),c=g.j(".map__svg").attr("width",a).attr("height",n),s=g.e(this.state.endpoints.map,{headers:{Accept:"application/json; odata=verbose"}}),i=v.a.get(this.state.endpoints.countries);Promise.all([s,i]).then((function(t){var a=t[0],n=e._filterCountries(t[1].data,a.features.map((function(e){return e.properties})));e.props.setAllData(n),n=e._reduceCountries(n),c.selectAll("path").data(a.features).enter().append("path").attr("d",o).attr("fill",(function(t){var a,r=t.properties.name;return e._manageColors(null===(a=n[r])||void 0===a?void 0:a.cases)})).attr("stroke",(function(e){return"red"})).on("touchstart",(function(e){})).on("mouseover",(function(t){var a,r=t.properties.name;e.props.setPickedData({countryName:r,cases:null===(a=n[r])||void 0===a?void 0:a.cases})})),e.setState(Object(l.a)({},e.state,{loading:!1})),e.setState(Object(l.a)({},e.state,{coronaData:n}))}))}},{key:"_manageColors",value:function(e){if(!e)return"#ff0909";for(var t=0,a=[{min:0,max:1e3,color:"#fff1d9"},{min:1001,max:1e4,color:"#fdcd8b"},{min:10001,max:5e4,color:"#b55440"},{min:50001,max:1e5,color:"#b53828"},{min:100001,max:420001,color:"#500000"}];t<a.length;t++){var n=a[t];if(e>n.min&&e<n.max)return n.color}return"#000"}},{key:"_filterCountries",value:function(e,t){var a=t.map((function(e){return e.sovereignt}));return e=e.filter((function(e){return a.includes(e.country)}))}},{key:"_reduceCountries",value:function(e){return e.reduce((function(e,t){return Object(l.a)({},e,Object(i.a)({},t.country,t))}),{})}},{key:"render",value:function(){return r.a.createElement("div",{className:"map",ref:this.ref},this.state.loading&&r.a.createElement(p.a,{className:"map__progress",color:"secondary"}),r.a.createElement("svg",{className:"map__svg"}))}}]),a}(r.a.Component),b=(a(107),function(e){Object(d.a)(a,e);var t=Object(f.a)(a);function a(e){var n;return Object(u.a)(this,a),(n=t.call(this,e)).ref=r.a.createRef(),n.state={cl:""},n}return Object(m.a)(a,[{key:"componentDidUpdate",value:function(e){var t=this;this.props.countryName!==e.countryName&&setTimeout((function(){t.setState(Object(l.a)({},t.state,{cl:""}))}),1e3)}},{key:"getSnapshotBeforeUpdate",value:function(e,t){return this.props.countryName!==e.countryName&&this.setState(Object(l.a)({},this.state,{cl:"info__anim"})),null}},{key:"render",value:function(){return r.a.createElement("div",{className:"info "+this.state.cl},r.a.createElement("p",{className:"info__name"},"Name: ",this.props.countryName||"none"),r.a.createElement("p",null,"Cases: ",this.props.cases||"0"),r.a.createElement("p",{className:"info__footer"},"Source: https://coronavirus-19-api.herokuapp.com/countries"))}}]),a}(r.a.Component)),y=(a(108),function(e){Object(d.a)(a,e);var t=Object(f.a)(a);function a(e){var n;return Object(u.a)(this,a),(n=t.call(this,e)).ref=r.a.createRef(),n.state={loading:!0,width:0},n}return Object(m.a)(a,[{key:"componentDidUpdate",value:function(e,t){var a=this;if(this.props.data!==e.data){var n=this.props.data.filter((function(e){return e.cases>1e5||"Poland"===e.country}));console.log(n),getComputedStyle||alert("Not supported");var r=getComputedStyle(this.ref.current),o=this.ref.current.clientWidth;o-=parseFloat(r.paddingLeft)+parseFloat(r.paddingRight);var c=Math.floor(.8*o),s={top:30,right:0,bottom:30,left:40},i=g.i().domain([0,g.f(n,(function(e){return e.cases}))]).nice().range([c-s.bottom,s.top]),u=g.h().domain(g.g(n.length)).range([s.left,o-s.right]).padding(.1),m=g.j(".charts__svg").attr("viewBox",[0,0,o,c]);m.append("g").selectAll("rect").data(n).join("rect").attr("fill",(function(e){return a._manageColors(e.cases)})).attr("x",(function(e,t){return u(t)})).attr("y",(function(e){return i(e.cases)})).attr("height",(function(e){return i(0)-i(e.cases)})).attr("width",u.bandwidth()).on("mouseover",(function(e){var t=e.country;a.props.setPickedData({countryName:t,cases:e.cases})})),m.append("g").call((function(e){return e.attr("transform","translate(0,".concat(c-s.bottom,")")).call(g.a(u).tickFormat((function(e){return n[e].name})).tickSizeOuter(0))})),m.append("g").call((function(e){return e.attr("transform","translate(".concat(s.left,",0)")).call(g.b(i).ticks(null,"s")).call((function(e){return e.select(".domain").remove()})).call((function(e){return e.append("text").attr("x",-s.left).attr("y",10).attr("fill","currentColor").attr("text-anchor","start").text(n.y)}))})),this.setState(Object(l.a)({},this.state,{loading:!1}))}}},{key:"_manageColors",value:function(e){if(!e)return"#ff0909";for(var t=0,a=[{min:0,max:1e3,color:"#fff1d9"},{min:1001,max:1e4,color:"#fdcd8b"},{min:10001,max:5e4,color:"#b55440"},{min:50001,max:1e5,color:"#b53828"},{min:100001,max:420001,color:"#500000"}];t<a.length;t++){var n=a[t];if(e>n.min&&e<n.max)return n.color}return"#000"}},{key:"render",value:function(){return r.a.createElement("div",{className:"charts",ref:this.ref},this.state.loading&&r.a.createElement(p.a,{className:"charts__progress",color:"secondary"}),r.a.createElement("svg",{className:"charts__svg"}),r.a.createElement("div",{className:"charts__tooltip"}))}}]),a}(r.a.Component)),N=(a(109),function(e){return{backgroundColor:e}}),j=function(e){return r.a.createElement("div",{className:"legend"},r.a.createElement("h3",null,"Legend"),r.a.createElement("div",{className:"legend__element",style:N("#fff1d9")},"0-1000"),r.a.createElement("div",{className:"legend__element",style:N("#fdcd8b")},"1001-10000"),r.a.createElement("div",{className:"legend__element",style:N("#b55440")},"10001-50000"),r.a.createElement("div",{className:"legend__element",style:N("#b53828")},"50001-100000"),r.a.createElement("div",{className:"legend__element",style:Object(l.a)({},N("#500000"),{color:"white"})},"100001-320001"))},E=function(){var e=Object(n.useState)({}),t=Object(s.a)(e,2),a=t[0],o=t[1],c=Object(n.useState)([]),i=Object(s.a)(c,2),l=i[0],u=i[1];return r.a.createElement("div",{className:"app"},r.a.createElement("div",{className:"app__info"},r.a.createElement(b,a)),r.a.createElement("div",{className:"app__charts"},r.a.createElement(y,{setPickedData:o,data:l})),r.a.createElement("div",{className:"app__content"},r.a.createElement(_,{setPickedData:o,setAllData:u})),r.a.createElement("div",{className:"app__legend"},r.a.createElement(j,null)))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));c.a.render(r.a.createElement(r.a.StrictMode,null,r.a.createElement(E,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))},78:function(e,t,a){e.exports=a(110)},83:function(e,t,a){},84:function(e,t,a){},85:function(e,t,a){}},[[78,1,2]]]);
//# sourceMappingURL=main.838239ea.chunk.js.map