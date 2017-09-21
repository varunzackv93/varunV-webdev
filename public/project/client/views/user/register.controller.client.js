
(function() {
    angular
        .module("MoviesApp")
        .controller("RegisterController", RegisterController);

    function RegisterController($location, UserService) {
        var vm = this;

        vm.CreateUser=CreateUser;

        function init(){

        }

        function CreateUser(username,password,npassword) {

            console.log("entered create user");
            console.log(username);
            //var user =
            UserService
                .findUserByUsername(username)
                .then(function(response){
                    console.log("in reg controller assignment");
                    //console.log(response);
                    var user=response.data;
                    console.log(user);

                    if (user) {
                        vm.error="user already exists";
                    }

                    else
                    {
                        console.log("in lse rcontroller");
                        if(password===npassword){


                            var newUser={
                                // _id:(new Date()).getTime()+"",
                                "firstName":username,
                                "lastName": username,
                                "username":username,
                                "password":password
                            };


                            // var success =
                            UserService
                                .register(newUser)
                                .then(
                                    function(response) {
                                        var success = response.data;
                                    console.log("responsE: create user final");
                                    console.log(success);

                                    if(success){
                                        $location.url("/user/"+success._id)
                                    }
                                    else{
                                        $location.url("/login");
                                    }
                                })



                        }

                        else{
                            vm.error="passwords dont match!!"}
                    }


                })




        }



    }

})();