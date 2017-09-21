/**
 * Created by varun on 19-10-2016.
 */
(function(){
    angular
        .module("WebAppMaker")
        .controller("WebsiteListController",WebsiteListController);

    function WebsiteListController($routeParams,WebsiteService){
        var vm=this;
         vm.userId=$routeParams.uid;

        function init() {
             WebsiteService
                 .findWebsitesForUser(vm.userId)
                 .then(function(response){
console.log("am i here?"+response.data);
             vm.websites = response.data;
                 })
        }
        init();
    }



})();