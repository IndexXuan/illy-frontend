!function(gmu,$){function SlideUp(div,cb){var count,holder=$('<span class="ui-holder"></span>'),root=$('<div class="ui-slideup-wrap">   <div class="ui-slideup">       <div class="header">           <span class="ok-btn">确认</span>           <span class="no-btn">取消</span>       </div>       <div class="frame"></div>   </div></div>'),sDiv=$(".ui-slideup",root),frame=$(".frame",sDiv),obj={refresh:function(callback){root.css({top:window.pageYOffset+"px",height:window.innerHeight+"px"}),sDiv.animate({translateY:"-"+sDiv.height()+"px",translateZ:"0"},400,"ease-out",function(){callback&&callback.call(obj)})},close:function(callback){var count=SlideUp.count=SlideUp.count-1;return root.off("click.slideup"+id),sDiv.animate({translateY:"0",translateZ:"0"},200,"ease-out",function(){callback&&callback(),holder.replaceWith(div),root.remove(),0===count&&$(document).off("touchmove.slideup")}).find(".ok-btn, .no-btn").highlight(),obj}},id=SlideUp.id=(SlideUp.id>>>0)+1;return frame.append(div.replaceWith(holder)),count=SlideUp.count=(SlideUp.count>>>0)+1,1===count&&$(document).on("touchmove.slideup",function(e){e.preventDefault()}),root.on("click.slideup"+id,".ok-btn, .no-btn",function(){cb.call(obj,$(this).is(".ok-btn"))!==!1&&obj.close()}).appendTo(document.body).find(".ok-btn, .no-btn").highlight("ui-state-hover"),obj.refresh(),obj}gmu.Calendar.register("picker",{_create:function(){var el=this.$el;if(!el)throw new Error("请指定日期选择器的赋值对象")},_init:function(){var el=this.$el,opts=this._options;this._container=$("<div></div>"),opts.date||(opts.date=el[el.is("select, input")?"val":"text"]()),$(window).on("ortchange",$.proxy(this._eventHandler,this)),this.on("commit",function(e,date){var str=$.calendar.formatDate(date);el[el.is("select, input")?"val":"text"](str)}),this.on("destroy",function(){$(window).off("ortchange",this._eventHandler),this._frame&&this._frame.close()})},_eventHandler:function(e){"ortchange"===e.type?this._frame&&this._frame.refresh():this.origin(e)},show:function(){var el,me=this;return this._visible?this:(el=this._container,this._visible=!0,this.refresh(),this._frame=SlideUp(el,function(confirm){var date;return confirm?(date=me._option("selectedDate"),me.trigger("commit",date,$.calendar.formatDate(date),me),me._option("date",date)):me._option("selectedDate",me._option("date")),me.hide(),!1}),this.trigger("show",this))},hide:function(){var event,me=this;return this._visible?(event=new gmu.Event("beforehide"),this.trigger(event,this),event.isDefaultPrevented()?this:(this._visible=!1,this._frame.close(function(){me.trigger&&me.trigger("hide")}),this._frame=null,this)):this}})}(gmu,gmu.$);
//# sourceMappingURL=%24picker.js.map