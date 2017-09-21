
(function () {
    angular
        .module("MoviesApp")
        .controller("UserListController",UserListController);


        function UserListController($rootScope, $location, $sce, UserService, AllMoviesService) {
            var vm = this;

            vm.createUser = createUser;
            vm.updateUser = updateUser;
            vm.deleteUser = deleteUser;
            vm.updateMovie = updateMovie;
            vm.deleteMovie = deleteMovie;
            vm.logout=logout;

            function init() {
                getLoggedInUser();
                findAllUsers();
                findAllMovies();
            }
            init();

            function logout() {
                UserService
                    .logout()
                    .then(
                        function (response) {
                            $location.url("/login");
                        },
                        function () {
                            $location.url("/login");
                        }
                    );
            }


            function createUser(username, password, usertype) {

                var user = {
                    username : username,
                    password : password,
                    role : usertype
                };

                UserService
                    .createUser(user)
                    .then(
                        function (response) {
                            vm.createsuccess = "Created EndUser Successfully";

                            UserService
                                .findAllUsers()
                                .then(
                                    function (response) {
                                        vm.users = response.data;
                                        vm.userCount = vm.users.length;
                                    }
                                );
                        }
                    )
            }

            function deleteUser(userId) {
                UserService
                    .deleteUserAdmin(userId)
                    .then(
                        function (response) {
                            vm.warning = "Deleted Successfully!";
                            vm.createsuccess = null;
                            UserService
                                .findAllUsers()
                                .then(
                                    function (response) {
                                        vm.users = response.data;
                                        vm.userCount = vm.users.length;
                                    }
                                );
                        }
                    )
            }

            function updateUser(userId, user) {

                UserService
                    .UpdateUserAdmin(userId, user)
                    .then(
                        function (response) {
                            vm.updatedmessage = "Updated Successfully!";
                            UserService
                                .findAllUsers()
                                .then(
                                    function (response) {
                                        vm.users = response.data;
                                        vm.userCount = vm.users.length;
                                    }
                                );
                        }
                    );
            }



            function findAllUsers() {
                UserService
                    .findAllUsers()
                    .then(function (response) {
                        vm.users = response.data;
                        console.log("all users");
                        console.log(vm.users);
                        vm.userCount = vm.users.length;

                    });
            }

            function getLoggedInUser() {

                UserService
                //.findUserById(userId)
                    .findCurrentUser()
                    .then(function(response){
                        vm.user=response.data;
                        if(vm.user){
                            vm.loggedIn = "true";
                            loggedInUserId = vm.user._id;
                            console.log("in home controller checking rootscope");
                            console.log(loggedInUserId);

                        } else {
                            vm.notloggedIn = "true";

                        }


                    })
            }


            function deleteMovie(tmdbId, userId) {
                AllMoviesService
                    .deleteMovie(tmdbId,userId)
                    .then(function (response) {
                        vm.updatedmoviemessage = " movie review deleted Successfully!";
                        findAllMovies();
                    });
            }

            function updateMovie(tmdbId, userId, text) {
                var reviews = {
                    userId: userId ,
                    text : text

                };
       console.log(reviews);
                AllMoviesService
                    .updateMovie(tmdbId, reviews)
                    .then(function (response) {
                        console.log(response.data);
                        var addedObject = response.data;
                        if(addedObject){
                            vm.updatedmoviemessage = " movie review updated Successfully!";
                            $location.url("/admin");

                        }else{
                            vm.moviewarning = "unable to add review";
                        }
                    });
            }


            function findAllMovies() {
                AllMoviesService
                    .findAllMovies()
                    .then(function (response) {
                        var allMovies = response.data;
                        var resultset=[];
                        for(var i in allMovies){
                            for(var j in allMovies[i].reviews){
                                allMovies[i].reviews[j].tmdbId = allMovies[i].tmdbId;
                                allMovies[i].reviews[j].title= allMovies[i].title;

                                resultset.push(allMovies[i].reviews[j]);
                            }
                        }

                        vm.results = resultset;
                        vm.moviesCount= resultset.length;

                        return resultset;

                    });
            }


        }
    })();