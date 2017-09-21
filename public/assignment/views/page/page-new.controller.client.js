(function () {
    angular
        .module("WebAppMaker")
        .controller("PageNewController",PageNewController);

    function PageNewController($location,$routeParams,PageService) {
        var vm=this;
        vm.uid=$routeParams.uid;
        vm.wid=$routeParams.wid;
        vm.createPage=createPage;

        function init() {
            PageService.findPageByWebsiteId(vm.wid)
                .then(
                    function (response) {
                        vm.pages= response.data;
                    });
        }
        init();

        function createPage(name,desc) {
            PageService.createPage(vm.wid,name,desc)
                .then(
                    function (response) {
                        var newPage= response.data;
                        if(newPage){
                            $location.url("/user/"+vm.uid+"/website/"+vm.wid+"/page");
                        }
                        else{
                            vm.error="Unable to create new page";
                        }
                    });

        }


    }
})();