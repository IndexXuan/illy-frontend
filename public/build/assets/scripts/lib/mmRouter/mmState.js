define(["./mmPromise","./mmRouter"],function(){function removeOld(){for(var nodes=mmState.oldNodes;nodes.length;){var i=nodes.length-1,node=nodes[i];node.parentNode&&node.parentNode.removeChild(node),nodes.splice(i,1)}}function copyTemplateProperty(newObj,oldObj,name){name in oldObj&&(newObj[name]=oldObj[name],delete oldObj[name])}function getCacheContainer(){return document.getElementsByTagName("avalon")[0]}function loadCache(name){var f,fragment=document.createDocumentFragment(),divPlaceHolder=document.getElementById(name),eles=divPlaceHolder.eles,i=0;if(divPlaceHolder)for(;f=eles[i];)fragment.appendChild(f),i++;return fragment}function setCache(name,element){var f,fragment=document.createDocumentFragment(),divPlaceHolder=document.getElementById(name);if(divPlaceHolder||(divPlaceHolder=document.createElement("div"),divPlaceHolder.id=name,cacheContainer.appendChild(divPlaceHolder)),divPlaceHolder.eles)avalon.each(divPlaceHolder.eles,function(index,ele){fragment.appendChild(ele)});else{for(divPlaceHolder.eles=[];f=element.firstChild;)fragment.appendChild(f),divPlaceHolder.eles.push(f);templateCache[name]=!0}divPlaceHolder.appendChild(fragment)}function broadCastBeforeUnload(exitChain,enterChain,fromState,toState){var lastLocal=mmState.lastLocal;if(lastLocal&&(enterChain[0]||exitChain[0])){var newLocal=mmState._local,cacheQueue=[];for(var i in lastLocal){var local=lastLocal[i];if(!(i in newLocal)||newLocal[i]!=local){if(local.$ctrl&&"$onBeforeUnload"in local.$ctrl&&local.$ctrl.$onBeforeUnload(fromState,toState)===!1)return!1;local.element&&exitChain[0]!=enterChain[0]&&cacheQueue.push(local)}}avalon.each(cacheQueue,function(index,local){var ele=local.element,name=avalon(ele).data("currentCache");name&&setCache(name,ele)}),cacheQueue=null}}function compileNode(tpl,element,$element,_currentState){if($element.hasClass("oni-mmRouter-slide")){var copy=element.cloneNode(!0);copy.setAttribute("ms-skip","true"),avalon(copy).removeClass("oni-mmRouter-enter").addClass("oni-mmRouter-leave"),avalon(element).addClass("oni-mmRouter-enter"),element.parentNode.insertBefore(copy,element),mmState.oldNodes.push(copy),callStateFunc("onViewEnter",_currentState,element,copy)}return element}function inherit(parent,extra){return avalon.mix(new(avalon.mix(function(){},{prototype:parent})),extra)}function isError(e){return e instanceof Error}function promiseError(e){if(isError(e))throw e;callStateFunc("onError",mmState,e,e&&e.state)}function getPromise(excutor){var prom=avalon.isFunction(excutor)?new Promise(excutor):Promise.all(excutor);return prom}function callStateFunc(name,state){return Event.$fire.apply(Event,arguments),avalon.state[name]?avalon.state[name].apply(state||mmState.currentState,[].slice.call(arguments,2)):0}function StateModel(stateName,options){if(!(this instanceof StateModel)){var state=_states[stateName]=new StateModel(stateName,options||{});return state}this.stateName=stateName,this.formate(options)}function _controller(){return this instanceof _controller?void(this.$vmodels=[]):new _controller}function objectCompare(objA,objB){for(var i in objA)if(!(i in objB)||objA[i]!==objB[i])return!1;for(var i in objB)if(!(i in objA)||objA[i]!==objB[i])return!1;return!0}function getStateByName(stateName){return _states[stateName]}function getViewNodes(node,query){var nodes,query=query||"ms-view";return nodes=node.querySelectorAll?node.querySelectorAll("["+query+"]"):Array.prototype.filter.call(node.getElementsByTagName("*"),function(node){return"string"==typeof node.getAttribute(query)})}function fromString(template,params,reason){var promise=getPromise(function(resolve,reject){var str="function"==typeof template?template(params):template;"string"==typeof str?resolve(str):(reason.message="template必须对应一个字符串或一个返回字符串的函数",reject(reason))});return promise}function fromUrl(url,params,reason){var promise=getPromise(function(resolve,reject){return"function"==typeof url&&(url=url(params)),"string"!=typeof url?(reason.message="templateUrl必须对应一个URL",reject(reason)):avalon.templateCache[url]?resolve(avalon.templateCache[url]):void avalon.state.templateLoader(url,resolve,reject,reason)});return promise}function fromProvider(fn,params,reason){var promise=getPromise(function(resolve,reject){if("function"==typeof fn){var ret=fn(params);ret&&ret.then||"string"==typeof ret?resolve(ret):(reason.message="templateProvider为函数时应该返回一个Promise或thenable对象或字符串",reject(reason))}else fn&&fn.then?resolve(fn):(reason.message="templateProvider不为函数时应该对应一个Promise或thenable对象",reject(reason))});return promise}function fromPromise(config,params,reason){return config.template?fromString(config.template,params,reason):config.templateUrl?fromUrl(config.templateUrl,params,reason):config.templateProvider?fromProvider(config.templateProvider,params,reason):getPromise(function(resolve,reject){reason.message="必须存在template, templateUrl, templateProvider中的一个",reject(reason)})}avalon.router.route=function(method,path,query,options){path=path.trim();for(var el,states=this.routingTable[method],i=0;el=states[i++];){var args=path.match(el.regexp);if(args&&el["abstract"]!==!0){var newParams={params:{}};return avalon.mix(newParams.params,el.params),newParams.keys=el.keys,newParams.params.query=query||{},args.shift(),el.keys.length&&this._parseArgs(args,newParams),void(el.stateName?mmState.transitionTo(mmState.currentState,el,newParams.params,options):el.callback.apply(el,args))}}this.errorback&&this.errorback()};var _root,undefine,_states={};avalon.router.go=function(toName,params,options){var from=mmState.currentState,to=StateModel.is(toName)?toName:getStateByName(toName),params=params||{};params=avalon.mix(!0,{},to.params,params),to&&mmState.transitionTo(from,to,params,options)};var Event=window.$eventManager=avalon.define("$eventManager",function(vm){vm.$flag=0,vm.uiqKey=function(){return vm.$flag++,"flag"+vm.$flag++}});Event.$watch("onAbort",removeOld);var mmState=window.mmState={prevState:0/0,currentState:0/0,activeState:0/0,oldNodes:[],query:{},popOne:function(chain,params,callback,notConfirmed){var cur=chain.pop(),me=this;if(!cur)return callback();if(notConfirmed&&cur.onBeforeExit()===!1)return callback(!1);me.activeState=cur.parentState||_root,cur.done=function(success){return cur._pending=!1,cur.done=null,cur._local=null,success!==!1&&me.activeState?me.popOne(chain,params,callback,notConfirmed):callback(success)};var success=cur.onExit();!cur._pending&&cur.done&&cur.done(success)},pushOne:function(chain,params,callback,_local){var cur=chain.shift(),me=this;if(!cur)return callback();if(cur.syncParams(params),cur.onBeforeEnter()===!1)return cur.syncParams(cur.oldParams),callback(!1);_local=inherit(_local),me.activeState=cur,cur.done=function(success){if(cur.done){if(cur._pending=!1,cur.done=null,cur.visited=!0,success===!1)return callback(success);var resolved=cur.callback.apply(cur,[params,_local]);resolved.$then(function(){avalon.mix(!0,cur.oldParams,cur.params),me.pushOne(chain,params,callback,_local)})}};var args=[];avalon.each(cur.keys,function(index,item){var key=item.name;args.push(cur.params[key])}),cur._onEnter.apply(cur,args),!cur._pending&&cur.done&&cur.done()},transitionTo:function(fromState,toState,toParams,options){var fromAbort,toParams=toParams||toState.params;this.activeState&&this.activeState!=this.currentState&&(avalon.log("navigating to ["+this.currentState.stateName+"] will be stopped, redirect to ["+toState.stateName+"] now"),this.activeState.done&&this.activeState.done(!1),fromState=this.activeState,fromAbort=!0);var over,changeType,info=avalon.router.urlFormate(toState.url,toParams,toParams.query),me=this,options=options||{},reload=options.reload,fromChain=fromState&&fromState.chain||[],toChain=toState.chain,i=0,state=toChain[i],_local=_root.sourceLocal,toLocals=[];if(!reload)for(;state&&state===fromChain[i]&&!state.paramsChanged(toParams);)_local=toLocals[i]=state._local,i++,state=toChain[i];for(var exitChain=fromChain.slice(i),enterChain=toChain.slice(i),commonLocal=_local;state=toChain[i];)_local=toLocals[i]=inherit(_local,state.sourceLocal),i++;return mmState._local=_local,done=function(success,e){return over?void 0:(over=!0,me.currentState=me.activeState,success===!1?callStateFunc("onError",me,{type:"transition",message:"transitionTo "+toState.stateName+" faild",error:e,fromState:fromState,toState:toState,params:toParams},me.currentState):(mmState.lastLocal=mmState.currentState._local,_root.fire("updateview",me.currentState,changeType),avalon.log("transitionTo "+toState.stateName+" success"),callStateFunc("onLoad",me,fromState,toState),void 0))},toState.path=("/"+info.path).replace(/^[\/]{2,}/g,"/"),reload||fromState!==toState||(changeType=toState.paramsChanged(toParams))?(mmState.query=avalon.mix({},toParams.query),!options||options.confirmed||callStateFunc("onBeforeUnload",this,fromState,toState)!==!1&&broadCastBeforeUnload(exitChain,enterChain,fromState,toState)!==!1?void(over!==!0&&(avalon.log("begin transitionTo "+toState.stateName+" from "+(fromState&&fromState.stateName||"unknown")),callStateFunc("onUnload",this,fromState,toState),this.currentState=toState,this.prevState=fromState,info&&avalon.history&&avalon.history.updateLocation(info.path+info.query,avalon.mix({},options,{silent:!0}),!fromState&&location.hash),callStateFunc("onBegin",this,fromState,toState),this.popOne(exitChain,toParams,function(success){return success===!1?done(success):void me.pushOne(enterChain,toParams,done,commonLocal,toLocals)},!(options&&options.confirmed)))):callStateFunc("onAbort",this,fromState,toState)):toState==this.activeState&&fromAbort?done():void 0}},templateCache={},cacheContainer=getCacheContainer();window.loadCache=loadCache,avalon.bindingHandlers.view=function(data,vmodels){function update(firsttime,currentState,changeType){if(!document.contains(comment))return!1;var _local,definedParentStateName=$element.data("statename")||"",parentState=getStateByName(definedParentStateName)||_root;if(viewname.indexOf("@")<0&&(viewname+="@"+parentState.stateName),_local=mmState.currentState._local&&mmState.currentState._local[viewname],(!firsttime||_local)&&currentLocal!==_local){currentLocal=_local,_currentState=_local&&_local.state;var cacheTpl=$element.data("viewCache"),lastCache=$element.data("currentCache");if(_local?cacheTpl=(_local.viewCache===!1?!1:_local.viewCache||cacheTpl)&&viewname+"@"+_currentState.stateName:cacheTpl&&(cacheTpl=viewname+"@__default__"),!(_local&&_currentState===currentState&&_local.ignoreChange&&_local.ignoreChange(changeType,viewname)||cacheTpl&&cacheTpl===lastCache)){compileNode(tpl,element,$element,_currentState);var fragment,html=_local?_local.template:defaultHTML;if(cacheTpl&&(_local?_local.element=element:mmState.currentState._local[viewname]={state:mmState.currentState,template:defaultHTML,element:element}),avalon.clearHTML(element),element.removeAttribute("ms-view"),element.setAttribute("ui-view",data.value),cacheTpl){if(fragment=templateCache[cacheTpl]?loadCache(cacheTpl):avalon.parseHTML(html),element.appendChild(fragment),$element.data("currentCache",cacheTpl),templateCache[cacheTpl])return}else element.innerHTML=html,$element.data("currentCache",!1);!_local&&cacheTpl&&$element.data("currentCache",cacheTpl),avalon.each(getViewNodes(element),function(i,node){avalon(node).data("statename",_currentState&&_currentState.stateName||"")}),avalon.scan(element,(_local&&_local.vmodels||[]).concat(vmodels||[])),_local&&_local.$ctrl&&_local.$ctrl.$onRendered&&_local.$ctrl.$onRendered.apply(element,[_local])}}}var element=(mmState.currentState,data.element),$element=avalon(element),viewname=data.value,comment=document.createComment("ms-view:"+viewname),par=element.parentNode,defaultHTML=element.innerHTML,statename=$element.data("statename")||"",currentLocal=(getStateByName(statename)||_root,{}),tpl=element.outerHTML;element.removeAttribute("ms-view"),par.insertBefore(comment,element),update("firsttime"),_root.watch("updateview",function(state,changeType){return update.call(this,undefine,state,changeType)})},avalon.state=function(stateName,opts){var state=StateModel(stateName,opts);return avalon.router.get(state.url,function(params,_local){var _resovle,_reject,me=this,promises=[],_data=[],_callbacks=[];return state.resolved=getPromise(function(rs,rj){_resovle=rs,_reject=rj}),avalon.each(state.views,function(name,view){var params=me.params,reason={type:"view",name:name,params:params,state:state,view:view},viewLocal=_local[name]={name:name,state:state,params:state.filterParams(params),ignoreChange:"ignoreChange"in view?view.ignoreChange:me.ignoreChange,viewCache:"viewCache"in view?view.viewCache:me.viewCache},promise=fromPromise(view,params,reason);promises.push(promise),promise.then(function(s){viewLocal.template=s},avalon.noop);var prom,callback=function($ctrl){viewLocal.vmodels=$ctrl.$vmodels,view.$controller=viewLocal.$ctrl=$ctrl,resolveData()},resolveData=function(){var $onEnter=view.$controller&&view.$controller.$onEnter;if($onEnter){var innerProm=getPromise(function(rs,rj){var reason={type:"data",state:state,params:params},res=$onEnter(params,rs,function(message){reason.message=message,rj(reason)});res&&res.then?(_data.push(res),res.then(function(){rs(res)})):res&&res!==!0?(reason.message=res,rj(reason)):res===undefine&&rs()});innerProm=innerProm.then(function(cb){avalon.isFunction(cb)&&_callbacks.push(cb)}),_data.push(innerProm)}};if(view.$controller&&view.cacheController!==!1)return callback(view.$controller);if(view.controller)prom=promise.then(function(){callback(avalon.controller(view.controller))});else if(view.controllerUrl)prom=getPromise(function(rs){var url=avalon.isFunction(view.controllerUrl)?view.controllerUrl(params):view.controllerUrl;url=url instanceof Array?url:[url],avalon.controller.loader(url,function($ctrl){promise.then(function(){callback($ctrl),rs()})})});else if(view.controllerProvider){var res=avalon.isFunction(view.controllerProvider)?view.controllerProvider(params):view.controllerProvider;prom=getPromise(function(rs,rj){res&&res.then?(_data.push(res),res.then(function(r){promise.then(function(){callback(r),rs()})},function(e){reason.message=e,rj(reason)})):promise.then(function(){callback(res),rs()})})}prom&&prom.then&&promises.push(prom)}),getPromise(promises).$then(function(){state._local=_local,getPromise(_data).$then(function(){avalon.each(_callbacks,function(i,func){func()}),_resovle()})}),state.resolved},state),this},Promise.prototype.$then=function(onFulfilled,onRejected){var prom=this.then(onFulfilled,onRejected);return prom["catch"](promiseError),prom},avalon.state.onViewEntered=function(newNode,oldNode){newNode!=oldNode&&oldNode.parentNode.removeChild(oldNode)},avalon.state.config=function(config){return avalon.mix(avalon.state,config||{}),avalon},StateModel.is=function(state){return state instanceof StateModel},StateModel.prototype={formate:function(options){avalon.mix(!0,this,options);var stateName=this.stateName,me=this,chain=stateName.split("."),len=chain.length-1,sourceLocal=me.sourceLocal={};this.chain=[],avalon.each(chain,function(key){if(key==len)me.chain.push(me);else{var n=chain.slice(0,key+1).join("."),state=getStateByName(n);if(!state)throw new Error("必须先定义"+n);me.chain.push(state)}}),void 0===this.url&&(this["abstract"]=!0);var parent=this.chain[len-1]||_root;if(parent&&(this.url=parent.url+(this.url||""),this.parentState=parent),!this.views&&""!=stateName){var view={};"template,templateUrl,templateProvider,controller,controllerUrl,controllerProvider,viewCache".replace(/\w+/g,function(prop){copyTemplateProperty(view,me,prop)}),this.views={"":view}}var views={};avalon.each(this.views,function(name,view){name.indexOf("@")<0&&(name+="@"+(parent?parent.stateName||"":"")),views[name]=view,sourceLocal[name]={}}),this.views=views,this._self=options,this._pending=!1,this.visited=!1,this.params=inherit(parent&&parent.params||{}),this.oldParams={},this.keys=[],this.events={}},watch:function(eventName,func){var events=this.events[eventName]||[];return this.events[eventName]=events,events.push(func),func},fire:function(eventName){for(var events=this.events[eventName]||[],i=0;events[i];){var res=events[i].apply(this,[].slice.call(arguments,1));res===!1?events.splice(i,1):i++}},unwatch:function(eventName,func){var events=this.events[eventName];if(events)for(var i=0;events[i];){if(events[i]==func)return events.splice(i,1);i++}},paramsChanged:function(toParams){var changed=!1,keys=this.keys,params=this.params;return avalon.each(keys,function(index,item){var key=item.name;params[key]!=toParams[key]&&(changed="param")}),changed||mmState.currentState!==this||(changed=!objectCompare(toParams.query,mmState.query)&&"query"),changed},filterParams:function(toParams){var params=avalon.mix(!0,{},this.params),keys=this.keys;return avalon.each(keys,function(index,item){params[item.name]=toParams[item.name]}),params},syncParams:function(toParams){var me=this;avalon.each(this.keys,function(index,item){var key=item.name;key in toParams&&(me.params[key]=toParams[key])})},_onEnter:function(){this.query=this.getQuery();{var me=this,arg=Array.prototype.slice.call(arguments),done=me._async();getPromise(function(rs,rj){var reason={type:"data",state:me,params:me.params},_reject=function(message){reason.message=message,done.apply(me,[!1]),rj(reason)},_resovle=function(){done.apply(me),rs()},res=me.onEnter.apply(me,arg.concat([_resovle,_reject]));res&&res.then?res.then(_resovle)["catch"](promiseError):res&&res!==!0?_reject(res):res===undefine&&_resovle()})}},getQuery:function(){return mmState.query},getParams:function(){return this.params},_async:function(){return this.done&&(this._pending=!0),this.done||avalon.noop},onBeforeEnter:avalon.noop,onEnter:avalon.noop,onBeforeExit:avalon.noop,onExit:avalon.noop},_root=StateModel("",{url:"",views:null,"abstract":!0}),avalon.controller=function(){var first=arguments[0],second=arguments[1],$ctrl=_controller();if(avalon.isFunction(first))first($ctrl);else if(avalon.isFunction(second))$ctrl.name=first,second($ctrl);else{if("string"!=typeof first&&"object"!=typeof first)throw new Error("参数错误"+arguments);first=first instanceof Array?first:Array.prototype.slice.call(arguments),avalon.each(first,function(index,item){"string"==typeof item&&(first[index]=avalon.vmodels[item]),item=first[index],"$onRendered"in item&&($ctrl.$onRendered=item.$onRendered),"$onEnter"in item&&($ctrl.$onEnter=item.$onEnter)}),$ctrl.$vmodels=first}return $ctrl},avalon.controller.loader=function(url,callback){avalon.require(url,function($ctrl){callback&&callback($ctrl)})},_controller.prototype={};var getXHR=function(){return new(window.XMLHttpRequest||ActiveXObject)("Microsoft.XMLHTTP")};avalon.state.templateLoader=function(url,resolve,reject,reason){var xhr=getXHR();xhr.onreadystatechange=function(){if(4===xhr.readyState){var status=xhr.status;status>399&&600>status?(reason.message="templateUrl对应资源不存在或没有开启 CORS",reason.status=status,reason.xhr=xhr,reject(reason)):resolve(avalon.templateCache[url]=xhr.responseText)}},xhr.open("GET",url,!0),"withCredentials"in xhr&&(xhr.withCredentials=!0),xhr.setRequestHeader("X-Requested-With","XMLHttpRequest"),xhr.send()},window._states=_states});
//# sourceMappingURL=mmState.js.map