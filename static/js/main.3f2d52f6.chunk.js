(this["webpackJsonpcovid-eu"]=this["webpackJsonpcovid-eu"]||[]).push([[0],{64:function(e,t,a){e.exports=a(89)},69:function(e,t,a){},70:function(e,t,a){},71:function(e,t,a){},89:function(e,t,a){"use strict";a.r(t);var n=a(0),o=a.n(n),r=a(39),c=a.n(r),l=(a(69),a(70),a(8)),s=a(13),i=a(40),u=a(41),d=a(44),p=a(43),m=(a(71),a(42)),g=a.n(m),h=a(2),v=function(e){Object(d.a)(a,e);var t=Object(p.a)(a);function a(e){var n;return Object(i.a)(this,a),(n=t.call(this,e)).state={coronaData:{}},n}return Object(u.a)(a,[{key:"getCoronaData",value:function(e){return g.a.get("https://coronavirus-19-api.herokuapp.com/countries/"+e)}},{key:"componentDidMount",value:function(){var e=this,t=h.e(".map").append("div").attr("class","tooltip").style("display","none").style("background","black").style("color","white").style("position","absolute").style("z-index","10000").style("padding","0 10px"),a=h.b().center([13,52]).translate([400,300]).scale([800/1.5]),n=h.c().projection(a),o=h.e(".map").append("svg").attr("width",800).attr("height",600);h.d("eu.geojson").then((function(a){o.selectAll("path").data(a.features).enter().append("path").attr("d",n).attr("fill","rgba(8, 81, 50, 0.5)").attr("stroke","rgba(8, 81, 156, 0.2)").on("mouseover",(function(a){var n=a.properties.name;if(e.state.coronaData[n]){var o=e.state.coronaData[n];t.text("Country: "+n+" Cases: "+o.cases)}else e.getCoronaData(n).then((function(a){var o=a.data;if("Country not found"!==o){var r=Object(s.a)({},e.state.coronaData,Object(l.a)({},n,o));e.setState(Object(s.a)({},e.state,{coronaData:r})),t.text("Country: "+n+" Cases: "+o.cases)}}));t.style("display","block").style("left",h.a.pageX-40+"px").style("top",h.a.pageY-40+"px").style("cursor","none")})).on("mouseout",(function(e){t.style("display","none")}))}))}},{key:"getBackgroundcolor",value:function(e){return{backgroundColor:e}}},{key:"render",value:function(){return o.a.createElement("div",{className:"map"},o.a.createElement("h1",null,"Zaka\u017cenia i zgony spowodowane COVID-19 w Europie"),o.a.createElement("h1",null,"Zr\xf3d\u0142o: WHO"),o.a.createElement("h3",null,"Legenda (ilo\u015b\u0107 zaka\u017ce\u0144)"),o.a.createElement("div",{className:"map__legend-element",style:this.getBackgroundcolor("#fff1d9")},"0-1000 os\xf3b"),o.a.createElement("div",{className:"map__legend-element",style:this.getBackgroundcolor("#fdcd8b")},"1001-10000 os\xf3b"),o.a.createElement("div",{className:"map__legend-element",style:this.getBackgroundcolor("#b55440")},"10001-50000 os\xf3b"),o.a.createElement("div",{className:"map__legend-element",style:this.getBackgroundcolor("#b53828")},"50001-100000 os\xf3b"),o.a.createElement("div",{className:"map__legend-element",style:this.getBackgroundcolor("#500000")},"100001-220001 os\xf3b"))}}]),a}(o.a.Component),y=function(){return o.a.createElement("div",{className:"App"},o.a.createElement(v,null))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));c.a.render(o.a.createElement(o.a.StrictMode,null,o.a.createElement(y,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[64,1,2]]]);
//# sourceMappingURL=main.3f2d52f6.chunk.js.map