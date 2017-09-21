
(function () {
    angular
        .module("WebAppMaker")
        .controller("PageEditController",PageEditController);

    function PageEditController($location,$routeParams,PageService) {

        var vm=this;
        vm.uid=$routeParams.uid;
        vm.wid=$routeParams.wid;
        vm.pid=$routeParams.pid;
        vm.updatePage=updatePage;
        vm.deletePage=deletePage;

        function init() {
            PageService.findPageByWebsiteId(vm.wid)
                .then(
                    function (response) {
                        vm.pages= response.data;
                    });
            PageService.findPageById(vm.pid)
                .then(
                    function (response) {
                        vm.page= response.data;
                    });
        }
        init();

        function updatePage(name,desc) {
            console.log(name);
            var new_page = {
                name:name,
                _id:vm.pid,
                websiteId: vm.wid,
                description:desc
            };

           PageService.updatePage(vm.pid,new_page)
                .then(
                    function (response) {
                        var UpdatedPage=response.data;
                        console.log("UpdatedPage");
                        console.log(UpdatedPage);
                        if(UpdatedPage){
                            $location.url("/user/"+vm.uid+"/website/"+vm.wid+"/page");
                        }
                        else{
                            vm.error="page not updated";
                        }
                    });

        }

        function deletePage() {
           PageService.deletePage(vm.pid)
                .then(
                    function (response) {
                        var DeletedPage= response.data;
                        if(DeletedPage){
                            $location.url("/user/"+vm.uid+"/website/"+vm.wid+"/page");
                        }
                        else{
                            vm.error="page not deleted";
                        }
                    });

        }


    }
})();