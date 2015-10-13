define([], function() {

    // get config
    var apiBaseUrl = avalon.illyGlobal.apiBaseUrl;

    var token = avalon.illyGlobal.token;

    // 获取全局wx-sdk接口
    //var wx = avalon.wx;

    var cachedPrefix = 'illy-question-detail-';

    // resource prefix
    var resourcePrefix = avalon.illyGlobal.resourceBaseUrl;
    
    var detail = avalon.define({
        $id: "detail",
        visited: false,
        questionId: '',
        questionImage: '',
        questionText: '',
        createdTime: "",
        answer: '',
        teacher: {},

        fetchData: function(questionId) {
            if (detail.visited) {
                
                var res = avalon.getLocalCache(cachedPrefix + detail.questionId);
                detail.questionImage = resourcePrefix + res.questionImage + '?imageView/2/w/600/h/300';
                detail.questionText = res.questionText;
                detail.createdTime = res.createdTime;
                detail.answer = res.answer;
                detail.teacher = res.teacher || {};
                return;
            }

            $http.ajax({
                method: 'GET',
                url: apiBaseUrl + 'questions/' + questionId,
                headers: {
                    'Authorization': 'Bearer ' + token
                },
                dataType: "json",
                success: function(res) {
                    detail.questionImage = resourcePrefix + res.questionImage + '?imageView/2/w/600/h/300';
                    detail.questionText = res.questionText;
                    detail.createdTime = res.createdTime;
                    detail.answer = res.answer;
                    detail.teacher = res.teacher || {};
                    avalon.setLocalCache(cachedPrefix + detail.questionId, res);
                },
                error: function(res) {
                    avalon.illyError("detail list ajax error", res);
                    //detail.noContent = true;
                },
                ajaxFail: function(res) {
                    avalon.illyError("detail ajax failed" + res);
                }
            });
        } // end of fetch data

    }); // end of define

    return avalon.controller(function($ctrl) {
        // 视图渲染后，意思是avalon.scan完成
        $ctrl.$onRendered = function() {
            
        };
        // 进入视图
        $ctrl.$onEnter = function(params) {

            detail.questionId = params.questionId;
            detail.visited = avalon.vmodels.root.currentIsVisited;
            detail.fetchData(detail.questionId);

        };
        // 对应的视图销毁前
        $ctrl.$onBeforeUnload = function() {  

        };
        // 指定一个avalon.scan视图的vmodels，vmodels = $ctrl.$vmodels.concat(DOM树上下文vmodels)
        $ctrl.$vmodels = [];
    });

});

