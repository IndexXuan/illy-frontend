!function(gmu,$){gmu.Refresh.register("lite",{_init:function(){var me=this,opts=me._options,$el=me.$el;return opts.seamless&&$(document).on("scrollStop",$.proxy(me._eventHandler,me)),$el.on("touchstart touchmove touchend touchcancel",$.proxy(me._eventHandler,me)),opts.wrapperH=$el.height(),opts.wrapperTop=$el.offset().top,opts._win=window,opts._body=document.body,me},_changeStyle:function(dir,state){var me=this,refreshInfo=me._options.refreshInfo[dir];return"beforeload"==state&&(refreshInfo.$icon.removeClass("ui-loading"),refreshInfo.$label.html("松开立即加载")),me.origin(dir,state)},_startHandler:function(e){this._options._startY=e.touches[0].pageY},_moveHandler:function(e){var me=this,opts=me._options,startY=opts._startY,movedY=startY-e.touches[0].pageY,winHeight=opts._win.innerHeight,threshold=opts.threshold||(opts.wrapperH<winHeight?opts.wrapperH/2+opts.wrapperTop||0:winHeight/2);if(me._status("down")&&!(0>movedY))return!opts._refreshing&&startY>=opts._body.scrollHeight-winHeight+threshold&&movedY>10&&(me._setStyle("down","beforeload"),opts._refreshing=!0),me},_endHandler:function(){var me=this,opts=me._options;return me._setStyle("down","loading"),me._loadingAction("down","pull"),opts._refreshing=!1,me},_eventHandler:function(e){var me=this,opts=me._options;switch(e.type){case"touchstart":me._startHandler(e);break;case"touchmove":clearTimeout(opts._endTimer),opts._endTimer=setTimeout(function(){me._endHandler()},300),me._moveHandler(e);break;case"touchend":case"touchcancel":clearTimeout(opts._endTimer),opts._refreshing&&me._endHandler();break;case"scrollStop":!opts._refreshing&&opts._win.pageYOffset>=opts._body.scrollHeight-opts._win.innerHeight+(opts.threshold||-1)&&me._endHandler()}return me}})}(gmu,gmu.$);
//# sourceMappingURL=%24lite.js.map