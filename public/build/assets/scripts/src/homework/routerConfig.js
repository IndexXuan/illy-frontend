var _v="?v="+global_resource_version,ACTIONBAR_TITLE_MAP={list:"作业列表",info:"作业详情",question:"题目详情",result:"作业结果",mistakeList:"错题列表",wrong:"错题详情",evaluation:"课堂表现"};avalon.state("app",{url:"/","abstract":!0,views:{"":{templateUrl:"assets/templates/homework/app.html",controllerUrl:"scripts/controller/homework/app.js"+_v}}}).state("app.list",{url:"",views:{"":{templateUrl:"assets/templates/homework/list.html",controllerUrl:"scripts/controller/homework/list.js"+_v,viewCache:!0}}}).state("app.detail",{"abstract":!0,views:{"":{templateUrl:"assets/templates/homework/detail.html",controllerUrl:"scripts/controller/homework/detail.js"+_v}}}).state("app.detail.info",{url:"detail/{homeworkId}/info",views:{"":{templateUrl:"assets/templates/homework/info.html",controllerUrl:"scripts/controller/homework/info.js"+_v}}}).state("app.detail.question",{url:"detail/{homeworkId}/q/{questionId}",views:{"":{templateUrl:"assets/templates/homework/question.html",controllerUrl:"scripts/controller/homework/question.js"+_v,ignoreChange:function(changeType){return!!changeType}}}}).state("app.detail.result",{url:"detail/{homeworkId}/result",views:{"":{templateUrl:"assets/templates/homework/result.html",controllerUrl:"scripts/controller/homework/result.js"+_v}}}).state("app.mistake",{"abstract":!0,views:{"":{templateUrl:"assets/templates/homework/mistake.html",controllerUrl:"scripts/controller/homework/mistake.js"+_v}}}).state("app.mistake.mistakeList",{url:"mistake/list",views:{"":{templateUrl:"assets/templates/homework/mistakeList.html",controllerUrl:"scripts/controller/homework/mistakeList.js"+_v,viewCache:!0}}}).state("app.mistake.wrong",{url:"mistake/{homeworkId}/q/{questionId}",views:{"":{templateUrl:"assets/templates/homework/wrong.html",controllerUrl:"scripts/controller/homework/wrong.js"+_v,ignoreChange:function(changeType){return!!changeType}}}}).state("app.evaluation",{url:"evaluation",views:{"":{templateUrl:"assets/templates/homework/evaluation.html",controllerUrl:"scripts/controller/homework/evaluation.js"+_v}}});
//# sourceMappingURL=routerConfig.js.map