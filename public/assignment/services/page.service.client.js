/**
 * Created by varun on 20-10-2016.
 */
(function () {
    angular
        .module("WebAppMaker")
        .factory("PageService",PageService);


    function PageService($http) {
        var api={

            findPageByWebsiteId:findPageByWebsiteId,
            createPage:createPage,
            deletePage:deletePage,
            findPageById:findPageById,
            updatePage:updatePage
        };
        return api;

        function updatePage(pid,page) {
       /* var new_page={
         _id:pid,
         name:name,
         websiteId:wid,
          description: desc
        };*/
         var url = "/api/page/"+pid;
            return $http.put(url,page);
        }

        function findPageById(pid) {
            var url = "/api/page/"+pid;
            return $http.get(url);

        }

        function deletePage(pid) {
            var url = "/api/page/"+pid;
            return $http.delete(url);
        }

        function createPage(wid,name,desc) {
            var newPage={
               // _id:(new Date()).getTime()+"",
                name:name,
                websiteId:wid,
                description:desc
                };
             var url = "/api/website/"+wid+"/page";
            return $http.post(url,newPage);
        }

        function findPageByWebsiteId(wid) {
            var url = "/api/website/"+wid+"/page";
            return $http.get(url);

        }
    }
})();