token=token||localStorage.getItem("illy-token-microsite"),null===token&&(alert("对不起，本系统仅供内部使用！ ERROR::no token error!"),setTimeout(function(){location.replace("./login.html")},0)),avalon.illyGlobal={viewani:global_viewload_animation_name,token:token,apiBaseUrl:apiBaseUrl,illyDomain:illy_domain,imagesBaseSrc:illy_images_base_src,resourceBaseUrl:illy_resource_base_url};var root=avalon.define({$id:"root",namespace:"microsite",currentState:"",currentAction:"",currentIsVisited:!1,currentRendered:!1,title:"",footerInfo:"kuando Inc",back:function(){history.go(-1)}});
//# sourceMappingURL=customData.js.map