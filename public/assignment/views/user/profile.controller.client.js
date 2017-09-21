/**
 * Created by varun on 18-10-2016.
 */
(function(){
    angular
        .module("WebAppMaker")
        .controller("ProfileController", ProfileController);

    function ProfileController($location,$routeParams,UserService) {
        var vm=this;
       // var userId =$routeParams.uid;

        vm.UnregisterUser = UnregisterUser;
        vm.UpdateUser = UpdateUser;
        vm.logout=logout;

        function init() {
             UserService
                 //.findUserById(userId)
                 .findCurrentUser()
                 .then(function(response){
                    vm.user=response.data;
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
})()
