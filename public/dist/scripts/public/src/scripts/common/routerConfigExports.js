// exports 
return {
    init: function() { // init router and bootstrap the app
        avalon.log("init to bootstrap the app!");
        avalon.history.start({
            // basepath: "/mmRouter",
            fireAnchor: false
            //,routeElementJudger: function(ele, href) {
            //    avalon.log(arguments);
            //    //return href;
            //}
        });
        //go!!!!!!!!!
        avalon.scan();

        // APP inner performance listener start, avalon take charge of everything and start to init the app
        avalon.appInitTime = Date.now();
    }
}; // end of exports