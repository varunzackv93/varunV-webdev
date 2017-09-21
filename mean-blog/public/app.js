/**
 * Created by varun on 17-11-2016.
 */
(function(){
    angular
        .module("BlogApp",[])
    .controller("BlogController",BlogController);

    function BlogController($scope, $http){
        $scope.createPost = createPost;

        function init(){
            getAllPosts();
        }
        init();

        function getAllPosts() {
            $http.get("/api/blogpost")
                .success(function (posts) {
                    $scope.posts=posts;
                })
        }
        
        function createPost(post){
            console.log(post);
            $http
                .post("/api/blogpost",post)
                .success(getAllPosts);
        }
    }
})();