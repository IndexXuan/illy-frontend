!function(gmu,$){var Popover=gmu.Popover;Popover.options.dismissible=!0,Popover.option("dismissible",!0,function(){function isFromSelf(target){for(var doms=me.$target.add(me.$root).get(),i=doms.length;i--;)if(doms[i]===target||$.contains(doms[i],target))return!0;return!1}var me=this,$doc=$(document),click="click"+me.eventNs;me.on("show",function(){$doc.off(click).on(click,function(e){isFromSelf(e.target)||me.hide()})}),me.on("hide",function(){$doc.off(click)})})}(gmu,gmu.$);
//# sourceMappingURL=dismissible.js.map