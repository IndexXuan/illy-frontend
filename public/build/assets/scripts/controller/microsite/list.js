define([],function(){var apiBaseUrl=avalon.illyGlobal.apiBaseUrl||"http://api.hizuo.com/api/v1/",token=avalon.illyGlobal.token;void 0===token&&(avalon.log("Error, no token!"),alert("对不起，系统错误，请退出重试！"));var cachedPrefix="illy-microsite-list-",needCache=!0,limit=6,list=avalon.define({$id:"list",visited:!1,lists:[],categoryId:1.1111111111111111e23,title:"title",offset:0,btnShowMore:!0,fetchRemoteData:function(apiArgs,data,target,type){return list.visited&&needCache?void(list.lists=avalon.getLocalCache(cachedPrefix+list.categoryId+"-"+target)):void $http.ajax({url:apiBaseUrl+apiArgs,headers:{Authorization:"Bearer "+token},data:data,success:function(res){list[target]="concat"===type?list[target].concat(res):res,avalon.setLocalCache(cachedPrefix+list.categoryId+"-"+target,res)},error:function(){console.log("list.js ajax error when fetch data")},ajaxFail:function(){console.log("list.js ajax failed when fetch data")}})},showMore:function(e){e.preventDefault();var page=2;return list.offset<limit?void(list.btnShowMore=!1):(list.offset=list.offset+limit*(page-1),void list.fetchRemoteData("categories/"+list.categoryId+"/posts",{offset:list.offset},"lists","concat"))}});return avalon.controller(function($ctrl){$ctrl.$onBeforeUnload=function(){},$ctrl.$onEnter=function(params){return list.visited=avalon.vmodels.root.currentIsVisited,list.categoryId=params.categoryId,avalon.vmodels.site.categoryId=params.categoryId,"hots"===list.categoryId?(list.btnShowMore=!1,void list.fetchRemoteData("posts/hot?limit=10",{},"lists")):(list.btnShowMore=list.offset<=limit?!1:!0,void list.fetchRemoteData("categories/"+list.categoryId+"/posts",{},"lists"))},$ctrl.$onRendered=function(){},$ctrl.$vmodels=[]})});
//# sourceMappingURL=list.js.map