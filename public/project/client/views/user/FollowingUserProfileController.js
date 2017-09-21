

(function(){
    angular
        .module("MoviesApp")
        .controller("FollowingUserProfileController", FollowingUserProfileController);

    function FollowingUserProfileController($routeParams, $location, UserService, $rootScope) {
        var vm = this;

        vm.logout = logout;

        var username = $routeParams.username;
        vm.followUser = followUser;
        vm.unfollowUser = unfollowUser;

        function init() {

            getLoggedInUser();
            findUserByUsername();
            currentFollowstatus();

        }
        return init();



        function currentFollowstatus() {
            // getLoggedInUser();
            console.log("userid in already following");
            //console.log(vm.loggedInUserId);

            UserService
                .findCurrentUser()
                .then(function (response) {
                    vm.currentuser = response.data;
                    if (vm.currentuser) {
                        console.log("current user");
                        console.log(vm.currentuser);
                        vm.loggedIn = "true";
                        vm.loggedInUserId = vm.currentuser._id;
                        UserService
                            .findUserById(vm.loggedInUserId)
                            .then(function (response) {
                                var userFollows = response.data.follows;
                                console.log("response from find user by id following user controller");
                                console.log(userFollows);
                                for (var i in userFollows) {
                                    if (userFollows[i].username == username) {
                                        vm.following = "true";
                                        return;
                                    }
                                }
                                vm.notfollowing = "true";

                            });
                    }
                })
        }



        function unfollowUser() {
            console.log("userid in  unfollowing");
            console.log(vm.loggedInUserId);
            UserService
                .unfollowUser(vm.loggedInUserId, username)
                .then(function (res) {
                    var unfollow = res.data;
                    console.log("response from find user by id unfollowing user controller");
                    console.log(unfollow);
                    if (res){
                        vm.success= "you are now unfollowing the user";
                       // vm.notfollowing = "true";

                    }else{
                        vm.error = "Something is wrong! you can follow this user"
                    }
                });
        }

        function followUser() {
            console.log("userid in  folow user");
            console.log(vm.loggedInUserId);
            console.log(username);
            UserService
                .findUserById(vm.loggedInUserId)
                .then(function (response) {
                    var userFollows = response.data.follows;
                    console.log("response from find user by id follow user controller");
                    console.log(userFollows);
                    for(var i in userFollows){
                        if(userFollows[i].username == username){
                            vm.error = "Dear user, you are already following this user!";
                            return;
                        }
                    }

                    UserService
                        .findUserByUsername(username)
                        .then(function (response) {
                            var returnedUser = response.data;
                            var userId = returnedUser._id;
                            var follows = {
                                userId : userId,
                                username : username
                            };

                            UserService
                                .followUser(vm.loggedInUserId, follows)
                                .then(function (res) {
                                    var newUser = res.data;

                                    if (newUser){
                                        vm.success= "you are now following the user";

                                    }else{
                                        vm.error = "Something is wrong! you cannot follow this user"
                                    }
                                });
                        });

                });
        }



        function findUserByUsername() {
            UserService
                .findUserByUsername(username)
                .then(function (response) {
                    vm.user = response.data;
                    console.log("in find user by name init");
                    console.log(vm.user);

                });
        }




        function getLoggedInUser() {
            UserService
            //.findUserById(userId)
                .findCurrentUser()
                .then(function (response) {
                    vm.currentuser = response.data;
                    if (vm.currentuser) {
                        vm.loggedIn = "true";
                        vm.loggedInUserId = vm.currentuser._id;
                        console.log("logged in id in get logged in user");
                        console.log(vm.loggedInUserId );

                    } else {
                        vm.notloggedIn = "true";

                    }
                })

           // alreadyFollowing();

        }


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

    }


})();
