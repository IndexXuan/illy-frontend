!function(gmu,$){gmu.Popover.options.collision=!0,gmu.Popover.option("collision",!0,function(){function getWithinInfo(raw){var $el=$(raw);return raw=$el[0],raw!==window&&9!==raw.nodeType?$el.offset():{width:$el.width(),height:$el.height(),top:raw.pageYOffset||raw.scrollTop||0,left:raw.pageXOffset||raw.scrollLeft||0}}function isInside(coord,width,height,within){return coord.left>=within.left&&coord.left+width<=within.left+within.width&&coord.top>=within.top&&coord.top+height<=within.top+within.height}var me=this,opts=me._options;me.on("before.placement",function(e,coord,info,presets){var within=getWithinInfo(opts.within||window),now=info.placement,orig=info.coord,aviable=Object.keys(presets),idx=aviable.indexOf(now)+1,swap=aviable.splice(idx,aviable.length-idx);for(aviable=swap.concat(aviable);aviable.length&&!isInside(coord,orig.width,orig.height,within);)now=aviable.shift(),$.extend(coord,presets[now]());info.preset=now})})}(gmu,gmu.$);
//# sourceMappingURL=collision.js.map