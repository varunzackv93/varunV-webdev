
(function() {
    angular
        .module("MoviesApp")
        .controller("HomeController", HomeController);
    
    function HomeController(MovieService,$routeParams,$location,UserService) {
        var vm=this;
        vm.searchMovieByTitle=searchMovieByTitle;
        vm.title=$routeParams.title;
        vm. logout=logout;
       // vm.getLoggedInUser=getLoggedInUser;


            function init(){

            MovieService.latestMovies()
                .success(function (result) {
                    vm.movies=result.results;
                });

            MovieService.popularMovies()
                .success(function (result) {
                    vm.pmovies=result.results;
                });

         //   https://api.themoviedb.org/3/movie/now_playing?api_key=a86449ea2cfd20a925fdab399e815028&region=US&include_adult=false
            if(vm.title){
                console.log("in home controller");
                console.log(vm.title);
                $location.path("/home/"+vm.title);
                searchMovieByTitle(vm.title);
            }

                getLoggedInUser();

        } init();


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


        function searchMovieByTitle(title) {
console.log("in serach movie by title home controller");
            MovieService.searchMovieByTitle(vm.title)
                .success(function (result) {
                    console.log("success in controller search by title");
                    console.log(result.results);
                  vm.pmovies=result.results;
                });
            console.log(vm.title);
        }

    }
})();