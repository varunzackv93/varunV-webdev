/**
 * Created by varun on 20-10-2016.
 */
(function () {
    angular
        .module("WebAppMaker")
        .controller("WebsiteNewController",WebsiteNewController);

    function WebsiteNewController($location,$routeParams,WebsiteService) {
        var vm=this;
        vm.uid=$routeParams.uid;
        vm.createWebsite=createWebsite;

        function init() {
            WebsiteService.findWebsitesForUser(vm.uid)
                .then(function(websites){

                    vm.websites = websites;
                })
        }
        init();

        function createWebsite(name,description) {
            WebsiteService
                .createWebsite(name,description,vm.uid)
                .then(function(response){

                    var newWebsite=response.data;
            console.log("after adding");
            console.log(newWebsite);
            if(newWebsite){
                $location.url("/user/"+vm.uid+"/website");
            }
            else{
                vm.error="unable to create website";
            }
        })
    }
    }
})();