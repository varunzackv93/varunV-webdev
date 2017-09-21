/**
 * Created by varun on 19-10-2016.
 */
(function(){
    angular
        .module("WebAppMaker")
        .controller("WebsiteEditController", WebsiteEditController);

    function WebsiteEditController($location,$routeParams, WebsiteService){
        var vm=this;
        vm.uid = $routeParams.uid;
        vm.wid = $routeParams.wid;
        vm.deleteWebsite=deleteWebsite;
        vm.updateWebsite=updateWebsite;

        function init(){
           // WebsiteService.findWebsitesForUser(vm.uid);
            WebsiteService.findWebsiteById(vm.wid)
                .then(
                    function (response) {
                        vm.website = response.data;

                    });

            WebsiteService.findWebsitesForUser(vm.uid)
                .then(
                    function (response) {
                        vm.websites = response.data;
                        console.log("website edit "+vm.websites);
                    });

        }

        init();

        function updateWebsite(name,desc) {

            console.log("from view"+name+desc);

         /*   var updated_website= {
                "_id": vm.wid,
                "name" : name,
                "description" : desc
        };*/

            WebsiteService
                .updateWebsite(vm.website)

        .then(function(response){
                var result=response.data;
                console.log("need to check me ");
                console.log(result);
                if(result){
                    $location.url("/user/"+vm.uid+"/website");
                }
                else{
                    vm.error="website not updated!";
                }
            });
        }

        function deleteWebsite(wid) {
            WebsiteService
                .deleteWebsite(wid)
                .then(function (response) {
                    var result = response.data;
                    if(result){
                        $location.url("user/"+vm.uid+"/website");
                    }else{
                        vm.error = "website not deleted";
                    }
                });



        }

    }

})();
