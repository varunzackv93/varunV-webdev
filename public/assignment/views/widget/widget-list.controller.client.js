/**
 * Created by varun on 19-10-2016.
 */
(function(){
    angular
        .module("WebAppMaker")
        .controller("WidgetListController",WidgetListController);

    function WidgetListController($routeParams,WidgetService,$sce) {
        var vm=this;
        vm.uid = $routeParams.uid;
        vm.wid = $routeParams.wid;
        vm.pid = $routeParams.pid;
        vm.wgid = $routeParams.wgid;

        vm.checkSafeHtml=checkSafeHtml;
        vm.checkSafeYouTubeUrl=checkSafeYouTubeUrl;
        vm.reorderWidget=reorderWidget;

        function init(){
            WidgetService.findWidgetsForPage(vm.pid)
                .then(
                    function (response) {
                        console.log("los "+response);
                        vm.widgets = response.data;

                    });
            //console.log(vm.widgets);
            // var allwidgets =  $(".wam-widget");
            //alert(allwidgets.length);

        }
        init();

        function checkSafeHtml(html) {
            return $sce.trustAsHtml(html);
        }

        function checkSafeYouTubeUrl(url){
            var parts = url.split('/');
            var id=parts[parts.length-1];
            url = "https://www.youtube.com/embed/"+id;
            // console.log(url);
            return $sce.trustAsResourceUrl(url);
        }


        function reorderWidget(start, end) {
            console.log("reorder"+start+ "  " + end);
            WidgetService
                .reorderWidget(vm.pid, start, end)
                .then(
                    function (response) {
                        console.log("geting called");
                        // init();
                    });
        }

    }


})();