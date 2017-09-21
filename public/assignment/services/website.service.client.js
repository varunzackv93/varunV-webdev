/**
 * Created by varun on 19-10-2016.
 */
(function(){
    angular
        .module("WebAppMaker")
        .factory("WebsiteService",WebsiteService);

    function WebsiteService($http){


        var api={
            findWebsitesForUser: findWebsitesForUser,
            findWebsiteById: findWebsiteById,
            createWebsite: createWebsite,
            updateWebsite: updateWebsite,
            deleteWebsite: deleteWebsite


        };
        return api;

        function findWebsitesForUser(uid){

            console.log(uid);
            var url = "/api/user/"+uid+"/website";
            return $http.get(url);
        }

        function findWebsiteById(wid){
         var url ="/api/website/"+wid;

            return $http.get(url);

        }

        function createWebsite(name,desc,uid) {

            var url = "/api/user/"+uid+"/website";

         var addedWebsite={
               // _id:(new Date()).getTime()+"",
                name:name,
                //developerId:uid,
                description:desc
            };

            return $http.post(url,addedWebsite);
        }

        function updateWebsite(website) {
           // console.log("in client");
            var url ="/api/website/"+website._id;
            console.log("in client "+website.name);
            return $http.put(url,website);
        }

        function deleteWebsite(wid) {
           var url = "/api/website/"+wid;
            return $http.delete(url);
        }
    }

})();