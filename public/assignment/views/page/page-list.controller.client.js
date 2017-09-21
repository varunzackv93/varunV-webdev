/**
 * Created by varun on 20-10-2016.
 */
(function () {
    angular
        .module("WebAppMaker")
        .controller("PageListController",PageListController);

    function PageListController($routeParams,PageService) {

        var vm=this;
        vm.uid=$routeParams.uid;
        vm.wid=$routeParams.wid;

        function init() {
            PageService.findPageByWebsiteId(vm.wid)
                .then(
                    function (response) {
                        vm.pages= response.data;
                    });
           // console.log(vm.pages);
        }
        init();
    }
})();