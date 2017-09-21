
(function() {
    angular
        .module("MoviesApp")
        .config(Config);

    function Config ($routeProvider) {
        console.log("in config");
        $routeProvider

            .when("/admin", {
                templateUrl: "views/admin/user-list.view.client.html",
                controller: "UserListController",
                controllerAs: "model",
                resolve:{
                    checkAdmin:checkAdmin
                }
            })

            .when("/managemovies",{
                templateUrl: "views/admin/manage-movies.view.client.html",
                controller: "ManageMoviesController",
                controllerAs: "model",
                resolve :{
                    checkLogin: checkLogin
                }
            })
           /* .when("/manageusers",{
                templateUrl: "views/admin/manage-users.view.client.html",
                controller: "UserListController",
                controllerAs: "model",
                resolve :{
                    checkLogin: checkLogin
                }
            })*/


            .when("/login", {
                templateUrl: "views/user/login.view.client.html",
                controller: "LoginController",
                controllerAs: "model"
            })
            .when("/register", {
                templateUrl: "views/user/register.view.client.html",
                controller: "RegisterController",
                controllerAs: "model"
            })

            .when("/user", {
                templateUrl: "views/user/profile.view.client.html",
                controller: "ProfileController",
                controllerAs: "model",
                resolve:{
                    checkLogin: checkLogin
                }
            })

            .when("/user/:uid", {
                templateUrl: "views/user/profile.view.client.html",
                controller: "ProfileController",
                controllerAs: "model",
                resolve:{
                    checkLogin: checkLogin
                }
            })

            .when("/movie/:id/review",{
                templateUrl: "views/movieDetails/movieReviews.view.client.html",
                controller: "MovieReviewController",
                controllerAs: "model",
                resolve: {
                    checkLogin: checkLogin
                }

            })

            .when("/home", {
                templateUrl: "views/home/home.view.client.html",
                controller: "HomeController",
                controllerAs: "model"
            })

            .when("/home1", {
                templateUrl: "views/movies-home/try.html",
                controller: "HomeController",
                controllerAs: "model"
            })

            .when("/movieDetails/:imdbID/:title", {
                templateUrl: "views/movieDetails/movieDetails.view.client.html",
                controller: "moveDetailsController",
                controllerAs: "model"
            })

            .when("/user/profile/:username",{
                templateUrl : "views/user/following-user-profile.view.client.html",
                controller: "FollowingUserProfileController",
                controllerAs: "model",
            })

            .when("/home/:title", {
                templateUrl: "views/home/home.view.client.html",
                controller: "HomeController",
                controllerAs: "model"
            });

        function checkLogin($q,UserService, $location){
            var deferred = $q.defer();
            UserService
                .checkLogin()
                .success(
                    function(user) {
                        if (user!='0') {
                            deferred.resolve();
                        }
                        else {
                            console.log("check login else");
                            deferred.reject();
                            $location.url("/login");
                        }
                    }

                );
            return deferred.promise;
        }


        function checkAdmin($q,UserService, $location){
            var deferred = $q.defer();
            UserService
                .checkAdmin()
                .success(
                    function(user) {
                        if (user!='0') {
                            deferred.resolve();
                        }
                        else {
                            console.log("check login else");
                            deferred.reject();
                            $location.url("/login");
                        }
                    }

                );
            return deferred.promise;
        }


    }

})();