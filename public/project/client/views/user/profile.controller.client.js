
(function(){
    angular
        .module("MoviesApp")
        .controller("ProfileController", ProfileController);

    function ProfileController($location,$routeParams,UserService,$rootScope) {
        var vm=this;
        //var userId =$routeParams.uid;
       // vm.userId = $rootScope.currentUser._id;
        //console.log(vm.userId);

        vm.UnregisterUser = UnregisterUser;
        vm.UpdateUser = UpdateUser;
        vm.logout=logout;

        function init() {
            UserService
            //.findUserById(userId)
                .findCurrentUser()
                .then(function(response){
                    vm.user=response.data;
                    if(vm.user.rates.length == 0){
                        vm.norates= true;
                    }
                    if(vm.user.reviews.length == 0){
                        vm.noreviews= true;
                    }
                    if(vm.user.follows.length == 0){
                        vm.nofollowers= true;
                    }


                })


        }
        init();

        function logout(){
            UserService.logout()
                .success(function(){
                    $location.url("/login");
                })
        }


        function UpdateUser(user) {

            var updatedContent = {

                "_id": user._id,
                "firstName": user.firstName,
                "lastName": user.lastName,
                "username": user.username,
                "password": user.password
            };

            UserService
                .UpdateUser(userId,updatedContent)
                .then(function(response){
                    vm.success="success";
                })

        }

        function UnregisterUser(){
            UserService.UnregisterUser(vm.user._id)
                .success(function(){
                    $location.url("/login");
                })
                .error(function(){

                });
            console.log("i am here"+vm.user._id);

        }

    }
})();

