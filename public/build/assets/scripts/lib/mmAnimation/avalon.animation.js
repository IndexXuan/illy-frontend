define(["avalon"],function(){function addOptions(){for(var i=1;i<arguments.length;i++)addOption(this,arguments[i]);this.duration="number"==typeof this.duration?this.duration:400,this.queue=!(null!=this.queue&&!this.queue),this.easing=avalon.easing[this.easing]?this.easing:"swing",this.update=!0,this.gotoEnd=!1}function addOption(frame,p,name){if("slow"===p)frame.duration=600;else if("fast"===p)frame.duration=200;else switch(avalon.type(p)){case"object":for(var i in p)addOption(frame,p[i],i);break;case"number":frame.duration=p;break;case"string":frame.easing=p;break;case"function":name=name||"complete",frame.bind(name,p)}}function bezierToEasing(p1,p2){var A=[null,null],B=[null,null],C=[null,null],derivative=function(t,ax){return C[ax]=3*p1[ax],B[ax]=3*(p2[ax]-p1[ax])-C[ax],A[ax]=1-C[ax]-B[ax],t*(C[ax]+t*(B[ax]+t*A[ax]))},bezierXY=function(t){return C[0]+t*(2*B[0]+3*A[0]*t)},parametric=function(t){for(var z,x=t,i=0;++i<14&&(z=derivative(x,0)-t,!(Math.abs(z)<.001));)x-=z/bezierXY(x);return x};return function(t){return derivative(parametric(t),1)}}function insertFrame(frame){var fps=frame.fps||effect.fps;if(frame.queue){for(var el,gotoQueue=1,i=timeline.length;el=timeline[--i];)if(el.elem===frame.elem){el.troops.push(frame),gotoQueue=0;break}gotoQueue&&timeline.unshift(frame)}else timeline.push(frame);null===insertFrame.id&&(insertFrame.id=setInterval(deleteFrame,1e3/fps))}function deleteFrame(){for(var i=timeline.length;--i>=0;)timeline[i].paused||timeline[i].elem&&enterFrame(timeline[i],i)||timeline.splice(i,1);timeline.length||(clearInterval(insertFrame.id),insertFrame.id=null)}function enterFrame(frame,index){var now=+new Date;if(frame.startTime){var per=(now-frame.startTime)/frame.duration,end=frame.gotoEnd||per>=1;if(frame.update){for(var tween,i=0;tween=frame.tweens[i++];)tween.run(per,end);frame.fire("step",frame)}if(end)if(frame.fire("after",frame),frame.fire("complete",frame),frame.revert)this.revertTweens(),delete this.startTime,this.gotoEnd=!1;else{var neo=frame.troops.shift();if(!neo)return!1;timeline[index]=neo,neo.troops=frame.troops}}else{frame.fire("before",frame);var elem=frame.elem;"none"!==avalon.css(elem,"display")||elem.dataShow||frame.build(),frame.createTweens(),frame.build(),frame.fire("afterBefore",frame),frame.startTime=now}return!0}function Frame(elem){this.$events={},this.elem=elem,this.troops=[],this.tweens=[],this.orig=[],this.props={},this.dataShow={}}function createTweenImpl(frame,name,value,hidden){var to,elem=frame.elem,dataShow=elem.dataShow||{},tween=new Tween(name,frame),from=dataShow[name]||tween.cur();if(/color$/i.test(name))parts=[color2array(from),color2array(value)];else{parts=rfxnum.exec(from);var unit=parts&&parts[3]||(avalon.cssNumber[name]?"":"px");if("toggle"===value&&(value=hidden?"show":"hide"),"show"===value)frame.showState="show",avalon.css(elem,name,0),parts=[0,parseFloat(from)];else if("hide"===value)frame.showState="hide",frame.orig[name]=from,parts=[parseFloat(from),0],value=0;else if(parts=rfxnum.exec(value),parts){if(parts[2]=parseFloat(parts[2]),parts[3]&&parts[3]!==unit){var clone=elem.cloneNode(!0);clone.style.visibility="hidden",clone.style.position="absolute",elem.parentNode.appendChild(clone),avalon.css(clone,name,parts[2]+(parts[3]?parts[3]:0)),parts[2]=parseFloat(avalon.css(clone,name)),elem.parentNode.removeChild(clone)}to=parts[2],from=parseFloat(from),parts[1]&&(to=from+(parts[1]+1)*parts[2]),parts=[from,to]}}from=parts[0],to=parts[1],from+""!=to+""?(tween.start=from,tween.end=to,tween.unit=unit,frame.tweens.push(tween)):delete frame.props[name]}function Tween(prop,options){this.elem=options.elem,this.prop=prop,this.easing=avalon.easing[options.easing],/color$/i.test(prop)&&(this.update=this.updateColor)}function genFx(type,num){var obj={};return fxAttrs.concat.apply([],fxAttrs.slice(0,num)).forEach(function(name){obj[name]=type,~name.indexOf("margin")&&(Tween.propHooks[name]={get:Tween.propHooks._default.get,set:function(tween){tween.elem.style[tween.name]=Math.max(tween.now,0)+tween.unit}})}),obj}function color2array(val){var color=val.toLowerCase(),ret=[];if(colorMap[color])return colorMap[color];if(0===color.indexOf("rgb")){var match=color.match(/(\d+%?)/g),factor=-1!==match[0].indexOf("%")?2.55:1;return colorMap[color]=[parseInt(match[0])*factor,parseInt(match[1])*factor,parseInt(match[2])*factor]}return"#"===color.charAt(0)?(4===color.length&&(color=color.replace(/([^#])/g,"$1$1")),color.replace(/\w{2}/g,function(a){ret.push(parseInt(a,16))}),colorMap[color]=ret):window.VBArray?colorMap[color]=parseColor(color):colorMap.white}var effect=avalon.fn.animate=function(properties){var frame=new Frame(this[0]);if("number"==typeof properties)frame.duration=properties;else if("object"==typeof properties){for(var name in properties){var p=avalon.cssName(name)||name;name!==p&&(properties[p]=properties[name],delete properties[name])}frame.props=properties}return addOptions.apply(frame,arguments),insertFrame(frame),this};avalon.mix(effect,{fps:30});var bezier={linear:[.25,.25,.75,.75],ease:[.25,.1,.25,1],easeIn:[.42,0,1,1],easeOut:[0,0,.58,1],easeInOut:[.42,0,.58,1],easeInQuad:[.55,.085,.68,.53],easeInCubic:[.55,.055,.675,.19],easeInQuart:[.895,.03,.685,.22],easeInQuint:[.755,.05,.855,.06],easeInSine:[.47,0,.745,.715],easeInExpo:[.95,.05,.795,.035],easeInCirc:[.6,.04,.98,.335],easeInBack:[.6,-.28,.735,.045],easeOutQuad:[.25,.46,.45,.94],easeOutCubic:[.215,.61,.355,1],easeOutQuart:[.165,.84,.44,1],easeOutQuint:[.23,1,.32,1],easeOutSine:[.39,.575,.565,1],easeOutExpo:[.19,1,.22,1],easeOutCirc:[.075,.82,.165,1],easeOutBack:[.175,.885,.32,1.275],easeInOutQuad:[.455,.03,.515,.955],easeInOutCubic:[.645,.045,.355,1],easeInOutQuart:[.77,0,.175,1],easeInOutQuint:[.86,0,.07,1],easeInOutSine:[.445,.05,.55,.95],easeInOutExpo:[1,0,0,1],easeInOutCirc:[.785,.135,.15,.86],easeInOutBack:[.68,-.55,.265,1.55],custom:[0,.35,.5,1.3],random:[Math.random().toFixed(3),Math.random().toFixed(3),Math.random().toFixed(3),Math.random().toFixed(3)]};avalon.easing={linear:function(pos){return pos},swing:function(pos){return-Math.cos(pos*Math.PI)/2+.5}},avalon.each(bezier,function(key,value){avalon.easing[key]=bezierToEasing([value[0],value[1]],[value[2],value[3]])});var timeline=avalon.timeline=[];insertFrame.id=null;var root=document.documentElement;avalon.isHidden=function(node){return 0===node.sourceIndex||"none"===avalon.css(node,"display")||!avalon.contains(root,node)},Frame.prototype={constructor:Frame,bind:function(type,fn,unshift){var fns=this.$events[type]||(this.$events[type]=[]),method=unshift?"unshift":"push";fns[method](fn)},fire:function(type){for(var fn,args=Array.prototype.slice.call(arguments,1),fns=this.$events[type]||[],i=0;fn=fns[i++];)fn.call(this.elem,args)},build:function(){var frame=this,elem=frame.elem,props=frame.props,style=elem.style,inlineBlockNeedsLayout=!window.getComputedStyle;if(1===elem.nodeType&&("height"in props||"width"in props||"show"===frame.showState)){frame.overflow=[style.overflow,style.overflowX,style.overflowY];var display=style.display||avalon.css(elem,"display"),oldDisplay=elem.getAttribute("olddisplay");oldDisplay?"none"!==display?elem.setAttribute("olddisplay",display):display=oldDisplay:("none"===display&&(style.display="",display=avalon.css(elem,"display"),"none"===display&&(display=avalon.parseDisplay(elem.nodeName))),elem.setAttribute("olddisplay",display)),style.display=display,"inline"===display&&"none"===avalon.css(elem,"float")&&(inlineBlockNeedsLayout&&"inline"!==avalon.parseDisplay(elem.nodeName)?style.zoom=1:style.display="inline-block")}frame.overflow&&(style.overflow="hidden",frame.bind("after",function(){style.overflow=frame.overflow[0],style.overflowX=frame.overflow[1],style.overflowY=frame.overflow[2],frame.overflow=null})),frame.bind("after",function(){if("hide"===frame.showState){elem.setAttribute("olddisplay",avalon.css(elem,"display")),this.style.display="none",this.dataShow={};for(var i in frame.orig)this.dataShow[i]=frame.orig[i],avalon.css(this,i,frame.orig[i])}}),this.build=avalon.noop},createTweens:function(){var hidden=avalon.isHidden(this.elem);for(var i in this.props)createTweenImpl(this,i,this.props[i],hidden)},revertTweens:function(){for(var tween,i=0;tween=this.tweens[i++];){var start=tween.start,end=tween.end;tween.start=end,tween.end=start,this.props[tween.name]=Array.isArray(tween.start)?"rgb("+tween.start+")":tween.unit?tween.start+tween.unit:tween.start}this.revert=!this.revert}};var rfxnum=new RegExp("^(?:([+-])=|)("+/[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source+")([a-z%]*)$","i");Tween.prototype={constructor:Tween,cur:function(){var hooks=Tween.propHooks[this.prop];return hooks&&hooks.get?hooks.get(this):Tween.propHooks._default.get(this)},run:function(per,end){this.update(per,end);var hook=Tween.propHooks[this.prop];hook&&hook.set?hook.set(this):Tween.propHooks._default.set(this)},updateColor:function(per,end){if(end)var rgb=this.end;else{var pos=this.easing(per);rgb=this.start.map(function(from,i){return Math.max(Math.min(parseInt(from+(this.end[i]-from)*pos,10),255),0)},this)}this.now="rgb("+rgb+")"},update:function(per,end){this.now=end?this.end:this.start+this.easing(per)*(this.end-this.start)}},Tween.propHooks={_default:{get:function(tween){var result=avalon.css(tween.elem,tween.prop);return result&&"auto"!==result?result:0},set:function(tween){avalon.css(tween.elem,tween.prop,tween.now+(tween.unit||""))}}},avalon.each(["scrollTop","scollLeft"],function(name){Tween.propHooks[name]={get:function(tween){return tween.elem[tween.name]},set:function(tween){tween.elem[tween.name]=tween.now}}}),avalon.fn.mix({delay:function(ms){return this.animate(ms)},pause:function(){for(var frame,cur=this[0],i=0;frame=timeline[i];i++)frame.elem===cur&&(frame.paused=new Date-0);return this},resume:function(){for(var fx,now=new Date,elem=this[0],i=0;fx=timeline[i];i++)fx.elem===elem&&fx.paused&&(fx.startTime+=now-fx.paused,delete fx.paused);return this},stop:function(clearQueue,gotoEnd){clearQueue=clearQueue?"1":"",gotoEnd=gotoEnd?"1":"0";for(var frame,stopCode=parseInt(clearQueue+gotoEnd,2),node=this[0],i=0;frame=timeline[i];i++)if(frame.elem===node)switch(frame.gotoEnd=!0,stopCode){case 0:frame.update=frame.revert=!1;break;case 1:frame.revert=!1;break;case 2:delete frame.elem;break;case 3:frame.troops.forEach(function(a){a.gotoEnd=!0})}return this}});var fxAttrs=[["height","marginTop","marginBottom","borderTopWidth","borderBottomWidth","paddingTop","paddingBottom"],["width","marginLeft","marginRight","borderLeftWidth","borderRightWidth","paddingLeft","paddingRight"],["opacity"]],effects={slideDown:genFx("show",1),slideUp:genFx("hide",1),slideToggle:genFx("toggle",1),fadeIn:{opacity:"show"},fadeOut:{opacity:"hide"},fadeToggle:{opacity:"toggle"}};avalon.each(effects,function(method,props){avalon.fn[method]=function(){var args=[].concat.apply([props],arguments);return this.animate.apply(this,args)}}),String("toggle,show,hide").replace(avalon.rword,function(name){avalon.fn[name]=function(){var args=[].concat.apply([genFx(name,3)],arguments);return this.animate.apply(this,args)}});var colorMap={black:[0,0,0],gray:[128,128,128],white:[255,255,255],orange:[255,165,0],red:[255,0,0],green:[0,128,0],yellow:[255,255,0],blue:[0,0,255]};if(window.VBArray)var parseColor=new function(){var body;try{var doc=new ActiveXObject("htmlfile");doc.write("<body>"),doc.close(),body=doc.body}catch(e){body=createPopup().document.body}var range=body.createTextRange();return function(color){body.style.color=String(color).trim();var value=range.queryCommandValue("ForeColor");return[255&value,(65280&value)>>8,(16711680&value)>>16]}};return avalon.parseColor=color2array,avalon});
//# sourceMappingURL=avalon.animation.js.map