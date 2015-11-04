define(["http://res.wx.qq.com/open/js/jweixin-1.0.0.js",AvalonLibsBaseUrl+"mmState","./lib/http/http.js?v=201511022251"],function(wx){var global_resource_version="0.0.4";$http.requestInterceptor=function(oldSettings){avalon.vmodels.root.currentDataDone=!1;var global_headers={Authorization:"Bearer "+token},newHeaders=avalon.mix(oldSettings.headers,global_headers);return oldSettings.headers=newHeaders,oldSettings},$http.resolveInterceptor=function(){if(avalon.vmodels.root.currentDataDone=!0,!root.currentIsVisited){var bigImage=document.querySelector(".big-image");bigImage&&(bigImage.style.visibility="hidden",setTimeout(function(){bigImage.style.visibility="visible"},global_rendered_bigImage_delay||300))}},$http.rejectInterceptor=function(msg){CACHE_VISITED_PAGEID_CONTAINER.pop(),msg.indexOf("Authorization")>=0&&alert("对不起，您没有Authorization，本系统仅供会员使用！"),msg.indexOf("token")>=0&&alert("对不起，您的token异常，请退出重试！")};var illy_domain="http://testweixin.hizuoye.com",illy_images_base_src="./assets/images",illy_resource_base_url="http://7rfll3.com1.z0.glb.clouddn.com/",apiBaseUrl="http://testapi.hizuoye.com/api/v1/",token=localStorage.getItem("illy-token"),global_always_show_loader=!1,global_always_reset_scrollbar=!0,global_loading_timeout=12e3,global_rendered_time=88,global_rendered_bigImage_delay=300,global_loader_className=".loader",global_loader_dom=document.querySelector(".loader"),global_errorLog_style="background-color: red; color: #fff; padding: 3px; border-radius: 3px",global_warningLog_style="background-color: #ff9100; color: #fff; padding: 3px; border-radius: 3px",global_infoLog_style="background-color: #14e5d5; color: #fff; padding: 3px; border-radius: 3px",global_recordLog_style="background-color: #64c400; color: #fff; padding: 3px; border-radius: 3px";avalon.getVM=function(vm){return avalon.vmodels[vm]},avalon.getPureModel=function(vm){return avalon.vmodels&&avalon.vmodels[vm]&&avalon.vmodels[vm].$model},avalon.$=function(selector){return document.querySelector(selector)};var illyLog=function(type,msg,res,style,saveToLocalStorage){var root=avalon.vmodels.root,namespace=root.namespace,currentVM=root.currentState;res=res||"","string"!=typeof res&&(res=JSON.stringify(res)),console.log("%c"+type.toUpperCase()+": "+namespace+" -> "+currentVM+": "+msg+res,style),saveToLocalStorage&&localStorage.setItem("illy-record-"+namespace+"-"+currentVM+"-"+Date.now(),msg+" "+res)};avalon.illyWarning=function(msg,res){illyLog("warning",msg,res,global_warningLog_style,!1)},avalon.illyError=function(msg,res){illyLog("error",msg,res,global_errorLog_style,!1)},avalon.illyInfo=function(msg,res){illyLog("info",msg,res,global_infoLog_style,!1)},avalon.illyRecord=function(msg,res){illyLog("record",msg,res,global_recordLog_style,!0)},avalon.illyProfile=function(){var performance=window.performance;if(!performance)return void console.error("你的浏览器不支持 performance 接口");var t=performance.timing,times={};return times.loadPage=t.loadEventEnd-t.navigationStart,times.domReady=t.domComplete-t.responseEnd,times.redirect=t.redirectEnd-t.redirectStart,times.lookupDomain=t.domainLookupEnd-t.domainLookupStart,times.ttfb=t.responseStart-t.navigationStart,times.request=t.responseEnd-t.requestStart,times.loadEvent=t.loadEventEnd-t.loadEventStart,times.appcache=t.domainLookupStart-t.fetchStart,times.unloadEvent=t.unloadEventEnd-t.unloadEventStart,times.connect=t.connectEnd-t.connectStart,times};var getLocalCache=function(itemName){return localStorage.getItem&&JSON.parse(""+localStorage.getItem(itemName))},setLocalCache=function(itemName,source){source=JSON.stringify(source),localStorage.setItem&&localStorage.setItem(itemName,source)},clearLocalCache=function(prefix){for(var key in localStorage)key.indexOf(prefix)>=0&&localStorage.removeItem(key)};avalon.getLocalCache=getLocalCache,avalon.setLocalCache=setLocalCache,avalon.clearLocalCache=clearLocalCache,global_always_show_loader=!0,null===token&&(alert("对不起，本系统仅供内部使用！ ERROR::no token error!"),setTimeout(function(){location.replace("./login.html")},0)),avalon.illyGlobal={token:token,apiBaseUrl:apiBaseUrl,illyDomain:illy_domain,imagesBaseSrc:illy_images_base_src,resourceBaseUrl:illy_resource_base_url};var root=avalon.define({$id:"root",namespace:"homework",mainPage:"app.list",currentState:"",currentAction:"",currentDataDone:!1,currentIsVisited:!1,title:""});root.$watch("currentAction",function(currentAction){if(void 0!==currentAction)switch(currentAction){case"onError":avalon.log("Error!, Redirect to index!",arguments),avalon.router.go(root.mainPage);break;case"onBegin":break;case"onLoad":break;case"onBeforeUnload":break;case"onUnload":}});var getCurrentState=function(){var state1=mmState.currentState.stateName.split(".")[1],state2=mmState.currentState.stateName.split(".")[2];return void 0===state2?state1:state2};root.$watch("currentAction",function(currentAction){"onLoad"===currentAction&&(root.currentState=getCurrentState())});var CACHE_VISITED_PAGEID_CONTAINER=[],doIsVisitedCheck=function(cacheContainer,callback){"function"==typeof cacheContainer&&(callback=cacheContainer,cacheContainer=void 0);var pageId=location.href.split("!")[1];cacheContainer=cacheContainer||CACHE_VISITED_PAGEID_CONTAINER,cacheContainer.push(pageId);for(var isVisited=!1,i=0,len=cacheContainer.length-1;len>i;i++)if(cacheContainer[i]===pageId){isVisited=!0;break}return callback&&"function"==typeof callback&&callback(),isVisited};root.$watch("currentAction",function(currentAction){"onBegin"===currentAction&&(root.currentIsVisited=doIsVisitedCheck())});var loadingBeginHandler=function(loader,callback){"function"==typeof loader&&(callback=loader,loader=void 0),loader=global_loader_dom||document.querySelector(global_loader_className);var showLoader=function(){loader&&(loader.style.display="")},always_show_loader=global_always_show_loader===!0?!0:!1;always_show_loader&&showLoader(),always_show_loader||root.currentIsVisited||showLoader(),callback&&"function"==typeof callback&&callback()},loadingEndHandler=function(loader,callback){"function"==typeof loader&&(callback=loader,loader=void 0),loader=global_loader_dom||document.querySelector(global_loader_className);var hideLoader=function(){loader&&(loader.style.display="none")};void 0===global_rendered_time&&(global_rendered_time=1e3,avalon.illyWarning("no global_rendered_time set!")),setTimeout(function(){hideLoader(),callback&&"function"==typeof callback&&callback()},global_rendered_time)};root.$watch("currentAction",function(currentAction){"onBegin"===currentAction&&loadingBeginHandler(),"onLoad"===currentAction&&(root.currentDataDone||root.currentIsVisited)&&loadingEndHandler()}),root.$watch("currentDataDone",function(rendered){rendered===!0&&loadingEndHandler()});var resetScrollbarWhenViewLoaded=function(){document.body.scrollTop=0,document.documentElement.scrollTop=0};global_always_reset_scrollbar===!0&&root.$watch("currentAction",function(currentAction){"onLoad"===currentAction&&resetScrollbarWhenViewLoaded()});var bindBadNetworkHandler=function(timeout){badNetworkTimer&&clearTimeout(badNetworkTimer),timeout=global_loading_timeout;var loader=global_loader_dom||document.querySelector(global_loader_className),badNetworkTimer=setTimeout(function(){alert("对不起，您的网络状态暂时不佳，请稍后重试！"),history.go(-1),loader&&(loader.style.display="none")},timeout);avalon.badNetworkTimer=badNetworkTimer},unbindBadNetworkHandler=function(timer){timer=timer||avalon.badNetworkTimer,timer&&clearTimeout(timer)};root.$watch("currentAction",function(currentAction){"onBegin"===currentAction&&bindBadNetworkHandler(),"onLoad"===currentAction&&unbindBadNetworkHandler()});var setPageTitle=function(titleMap){titleMap=titleMap||ACTIONBAR_TITLE_MAP;var currentState=root.currentState;root.title=titleMap[currentState]};root.$watch("currentAction",function(currentAction){"onLoad"===currentAction&&setPageTitle()}),avalon.wx=wx;var uri=location.href.split("#")[0],url=encodeURIComponent(uri);$http.ajax({url:apiBaseUrl+"public/sdk/signature",data:{url:url},success:function(jsonobj){var appId=jsonobj.appid,timestamp=jsonobj.timestamp,nonceStr=jsonobj.nonceStr,signature=jsonobj.signature;wx.config({debug:!1,appId:appId,timestamp:timestamp,nonceStr:nonceStr,signature:signature,jsApiList:["checkJsApi","onMenuShareTimeline","onMenuShareAppMessage","onMenuShareQQ","onMenuShareWeibo","hideMenuItems","showMenuItems","hideAllNonBaseMenuItem","showAllNonBaseMenuItem","translateVoice","startRecord","stopRecord","onRecordEnd","playVoice","pauseVoice","stopVoice","uploadVoice","downloadVoice","chooseImage","previewImage","uploadImage","downloadImage","getNetworkType","openLocation","getLocation","hideOptionMenu","showOptionMenu","closeWindow","scanQRCode","chooseWXPay","openProductSpecificView","addCard","chooseCard","openCard"]})},error:function(res){avalon.illyError("wx ajax error!",res)},ajaxFail:function(res){avalon.illyError("wx ajax failed!",res)}}),wx.error(function(res){alert("Woops, error comes..."+res)});var _v="?v="+global_resource_version,ACTIONBAR_TITLE_MAP={list:"作业列表",info:"作业详情",question:"题目详情",result:"作业结果",mistakeList:"错题列表",wrong:"错题详情",evaluation:"课堂表现"};return avalon.state("app",{url:"/","abstract":!0,views:{"":{templateUrl:"assets/templates/homework/app.html",controllerUrl:"scripts/controller/homework/app.js"+_v}}}).state("app.list",{url:"",views:{"":{templateUrl:"assets/templates/homework/list.html",controllerUrl:"scripts/controller/homework/list.js"+_v,viewCache:!0}}}).state("app.detail",{"abstract":!0,views:{"":{templateUrl:"assets/templates/homework/detail.html",controllerUrl:"scripts/controller/homework/detail.js"+_v}}}).state("app.detail.info",{url:"detail/{homeworkId}/info",views:{"":{templateUrl:"assets/templates/homework/info.html",controllerUrl:"scripts/controller/homework/info.js"+_v}}}).state("app.detail.question",{url:"detail/{homeworkId}/q/{questionId}",views:{"":{templateUrl:"assets/templates/homework/question.html",controllerUrl:"scripts/controller/homework/question.js"+_v,ignoreChange:function(changeType){return!!changeType}}}}).state("app.detail.result",{url:"detail/{homeworkId}/result",views:{"":{templateUrl:"assets/templates/homework/result.html",controllerUrl:"scripts/controller/homework/result.js"+_v}}}).state("app.mistake",{"abstract":!0,views:{"":{templateUrl:"assets/templates/homework/mistake.html",controllerUrl:"scripts/controller/homework/mistake.js"+_v}}}).state("app.mistake.mistakeList",{url:"mistake/list",views:{"":{templateUrl:"assets/templates/homework/mistakeList.html",controllerUrl:"scripts/controller/homework/mistakeList.js"+_v,viewCache:!0}}}).state("app.mistake.wrong",{url:"mistake/{homeworkId}/q/{questionId}",views:{"":{templateUrl:"assets/templates/homework/wrong.html",controllerUrl:"scripts/controller/homework/wrong.js"+_v,ignoreChange:function(changeType){return!!changeType}}}}).state("app.evaluation",{url:"evaluation",views:{"":{templateUrl:"assets/templates/homework/evaluation.html",controllerUrl:"scripts/controller/homework/evaluation.js"+_v}}}),avalon.state.config({onError:function(){root.currentAction="onError"},onBeforeUnload:function(){root.currentAction="onBeforeUnload"},onUnload:function(){root.currentAction="onUnload"},onBegin:function(){root.currentAction="onBegin"},onLoad:function(){root.currentAction="onLoad"}}),{init:function(){avalon.log("init to bootstrap the app!"),avalon.history.start({fireAnchor:!1}),avalon.scan(),avalon.appInitTime=Date.now()}}});
//# sourceMappingURL=app-homework.js.map