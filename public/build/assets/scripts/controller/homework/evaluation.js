define([],function(){var apiBaseUrl=avalon.illyGlobal&&avalon.illyGlobal.apiBaseUrl,resourcePrefix=avalon.illyGlobal.resourceBaseUrl,defaultAvatarUrl=resourcePrefix+"images/avatar/children/default1.png?imageView2/1/w/200/h/200",token=avalon.illyGlobal.token;avalon.filters.year=function(str){return str.substring(0,4)},avalon.filters.time=function(str){return str.substring(5)};var localLimit=5,evaluation=avalon.define({$id:"evaluation",noContent:!1,noContentText:"还没有做过作业哦，<br/>快去完成作业，得到老师评价吧~",lists:[],visited:!1,isRecover:!1,isLoading:!1,offset:0,noMoreData:!1,btnShowMore:!1,fetchData:function(data,concat){evaluation.isLoading=!0;var offset,limit=localLimit;offset=evaluation.lists.length||0,evaluation.visited&&!evaluation.isRecover&&(evaluation.offset=localStorage.getItem("illy-homework-evaluation-index")||0,limit=evaluation.offset,offset=0,evaluation.isRecover=!0),$http.ajax({method:"",url:apiBaseUrl+"homework/comments?limit="+limit+"&offset="+offset,data:data,headers:{Authorization:"Bearer "+token},dataType:"json",success:function(lists){evaluation.lists=concat===!0?evaluation.lists.concat(lists):lists,setTimeout(function(){var newLists=evaluation.lists;newLists&&0===newLists.length&&(evaluation.noContent=!0)},200),0===lists.length&&(evaluation.noMoreData=!0),localStorage.setItem("illy-homework-evaluation-index",evaluation.lists.length),evaluation.isLoading=!1},error:function(res){avalon.illyError("evaluation list ajax error",res),evaluation.noContent=!0},ajaxFail:function(res){avalon.illyError("evaluation list ajax failed"+res),evaluation.noContent=!0}})},showMore:function(e){e.preventDefault(),evaluation.fetchData({},!0)}});return evaluation.lists.$watch("length",function(newLength){evaluation.btnShowMore=newLength&&localLimit>newLength?!1:!0}),avalon.controller(function($ctrl){$ctrl.$onBeforeUnload=function(){evaluation.isRecover=!1},$ctrl.$onEnter=function(){setTimeout(function(){evaluation.avatar=resourcePrefix+avalon.vmodels.app.avatar+"?imageView2/1/w/200/h/200"||defaultAvatarUrl,evaluation.displayName=avalon.vmodels.app.displayName},300),evaluation.visited=avalon.vmodels.root.currentIsVisited,evaluation.fetchData()},$ctrl.$onRendered=function(){},$ctrl.$vmodels=[]})});
//# sourceMappingURL=evaluation.js.map