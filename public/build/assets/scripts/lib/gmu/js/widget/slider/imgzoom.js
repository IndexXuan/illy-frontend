!function(gmu){gmu.Slider.options.imgZoom=!0,gmu.Slider.option("imgZoom",function(){return!!this._options.imgZoom},function(){function unWatch(){watches&&watches.off("load"+me.eventNs,imgZoom)}function watch(){unWatch(),watches=me._container.find(selector).on("load"+me.eventNs,imgZoom)}function imgZoom(e){var img=e.target||this,scale=Math.min(1,me.width/img.naturalWidth,me.height/img.naturalHeight);img.style.width=scale*img.naturalWidth+"px"}var watches,me=this,selector=me._options.imgZoom;selector="string"==typeof selector?selector:"img",me.on("ready dom.change",watch),me.on("width.change",function(){watches&&watches.each(imgZoom)}),me.on("destroy",unWatch)})}(gmu);
//# sourceMappingURL=imgzoom.js.map