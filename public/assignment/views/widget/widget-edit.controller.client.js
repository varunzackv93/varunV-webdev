
(function(){
    angular
        .module("WebAppMaker")
        .controller("WidgetEditController",WidgetEditController);

    function WidgetEditController($location,$routeParams,WidgetService,$sce) {
        var vm=this;
        vm.uid = $routeParams.uid;
        vm.wid = $routeParams.wid;
        vm.pid = $routeParams.pid;
        vm.wgid = $routeParams.wgid;
        vm.updateWidget=updateWidget;
        vm.deleteWidget=deleteWidget;


        function init(){
            WidgetService.findWidgetById(vm.wgid)
                .then(
                    function (response) {
                        console.log("error here:");
                        console.log(response.data);
                        vm.widget = response.data;

                    });
        }
        init();


        function deleteWidget() {
           WidgetService.deleteWidget(vm.wgid)
                .then(
                    function (response) {
                        var widgetDelete= response.data;
                        if(widgetDelete){
                            $location.url("/user/"+vm.uid+"/website/"+vm.wid+"/page/"+vm.pid+"/widget");
                        }
                        else{
                            vm.error="unable to delete widget";
                        }

                    });
        }

        function updateWidget(widget) {
            WidgetService.updateWidget(vm.wgid,widget)
                .then(
                    function (response) {
                        var updateWidget= response.data;
                        if(updateWidget){
                            $location.url("/user/"+vm.uid+"/website/"+vm.wid+"/page/"+vm.pid+"/widget");
                        }
                        else{
                            vm.error="unable to update widget";
                        }
                    });


        }


    }


})();