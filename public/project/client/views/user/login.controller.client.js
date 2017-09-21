
(function(){
    angular
        .module("MoviesApp")
        .controller("LoginController",LoginController);

    function LoginController($location, UserService) {
        var vm = this;

        //------------------------ passport auth-----------
        vm.login=login;

        function login(username,password){
            console.log("in login controller");
            console.log(username);

            var promise = UserService.login(username,password);

            /*UserService
             .findUserByCredentials(username,password)*/

            promise
                .success(function(response){
                    console.log("in login controller");
                    console.log(response);
                    var user=response;
                    console.log(user);
                    if(!user){
                        //console.log("checkkkk");
                        vm.error = "No such user";
                    }
                    else{
                        $location.url("/user/"+user._id);
                    }
                })


        }
    }

}) ();