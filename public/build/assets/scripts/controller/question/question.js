define([],function(){var apiBaseUrl=avalon.illyGlobal.apiBaseUrl,token=avalon.illyGlobal.token,defaultAvatarUrl=avalon.illyGlobal.resourceBaseUrl+"images/avatar/children/default1.png?imageView2/1/w/200/h/200",question=avalon.define({$id:"question",$skipArray:["illly_domain","illy_images_base"],illy_domain:avalon.illyGlobal.illyDomain,illy_images_base:avalon.illyGlobal.imagesBaseSrc,illy_resource_base:avalon.illyGlobal.resourceBaseUrl,schoolName:"",getUserInfo:function(){$http.ajax({url:apiBaseUrl+"profile",headers:{Authorization:"Bearer "+token},dataType:"json",success:function(json){question.avatar=void 0!==json.avatar?json.avatar:defaultAvatarUrl,question.displayName=json.displayName,question.score=json.score}})},getSchoolInfo:function(){$http.ajax({url:apiBaseUrl+"school",headers:{Authorization:"Bearer "+token},dataType:"json",success:function(json){question.schoolName=json.school,avalon.vmodels.root.footerInfo=json.school+" © "+(new Date).getFullYear(),question.studentCount=json.studentCount||100}})},appMessage:"I am message from app ctrl",gMaskShow:!1,yesOrNo:null,gConfirmShow:!1,showConfirm:function(message){app.appMessage=message,app.gMaskShow=!0,app.gConfirmShow=!0},hideConfirm:function(){app.yesOrNo=null,app.gMaskShow=!1,app.gConfirmShow=!1},yesClick:function(){app.yesOrNo=!0,app.hideConfirm()},noClick:function(){app.yesOrNo=!1,app.hideConfirm()},gAlertShow:!1,hideDelayTimer:null,showAlert:function(message,hideDelay){var hideDelayTimer=avalon.vmodels.question.hideDelayTimer;clearTimeout(hideDelayTimer),hideDelay>=10&&avalon.illyWarning("is it too long in seconds when hide the mask?"),question.appMessage=message,question.gMaskShow=!0,question.gAlertShow=!0,void 0!==hideDelay&&(avalon.vmodels.question.hideDelayTimer=setTimeout(function(){question.hideAlert()},1e3*hideDelay))},hideAlert:function(){question.gMaskShow=!1,question.gAlertShow=!1},iKnowClick:function(){question.hideAlert()}});return avalon.controller(function($ctrl){$ctrl.$onRendered=function(){var renderedTime=Date.now();setTimeout(function(){avalon.illyInfo("avalon rendered totalTime: ",renderedTime-avalon.appInitTime)},888)},$ctrl.$onEnter=function(){question.getSchoolInfo()},$ctrl.$onBeforeUnload=function(){},$ctrl.$vmodels=[]})});
//# sourceMappingURL=question.js.map