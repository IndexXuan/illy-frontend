!function(gmu){gmu.Gotop.register("iscroll",{_init:function(){var $el,me=this,opts=me._options,iscroll=opts.iScrollInstance,_move=iscroll.options.onScrollMove,_end=iscroll.options.onScrollEnd;iscroll.options.onScrollMove=function(){_move&&_move.call(iscroll,arguments),opts.useHide&&me.hide()},iscroll.options.onScrollEnd=function(){_end&&_end.call(iscroll,arguments),me._check(Math.abs(iscroll.y)),opts._scrollClick&&(me.trigger("afterScroll"),opts._scrollClick=!1)},me.on("ready",function(){$el=me.$el,$el.on("click",function(){opts._scrollClick=!0,iscroll.scrollTo(0,0)}),opts.useFix&&$el.fix(opts.position),opts.root=$el[0]}),me.on("destroy",function(){iscroll.options.onScrollMove=_move,iscroll.options.onScrollEnd=_end})},_eventHandler:function(){},_scrollTo:function(){}})}(gmu,gmu.$);
//# sourceMappingURL=%24iscroll.js.map