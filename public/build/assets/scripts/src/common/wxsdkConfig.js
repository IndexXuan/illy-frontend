avalon.wx=wx;var uri=location.href.split("#")[0],url=encodeURIComponent(uri);$http.ajax({url:"http://api.hizuoye.com/api/v1/public/sdk/signature",data:{url:url},success:function(jsonobj){var appId=jsonobj.appid,timestamp=jsonobj.timestamp,nonceStr=jsonobj.nonceStr,signature=jsonobj.signature;wx.config({debug:!1,appId:appId,timestamp:timestamp,nonceStr:nonceStr,signature:signature,jsApiList:["checkJsApi","onMenuShareTimeline","onMenuShareAppMessage","onMenuShareQQ","onMenuShareWeibo","hideMenuItems","showMenuItems","hideAllNonBaseMenuItem","showAllNonBaseMenuItem","translateVoice","startRecord","stopRecord","onRecordEnd","playVoice","pauseVoice","stopVoice","uploadVoice","downloadVoice","chooseImage","previewImage","uploadImage","downloadImage","getNetworkType","openLocation","getLocation","hideOptionMenu","showOptionMenu","closeWindow","scanQRCode","chooseWXPay","openProductSpecificView","addCard","chooseCard","openCard"]})},error:function(res){console.log("wx ajax error"+res)},ajaxFail:function(res){console.log("wx ajaxFail"+res)}}),wx.error(function(res){alert("Woops, error comes..."+res)});
//# sourceMappingURL=wxsdkConfig.js.map