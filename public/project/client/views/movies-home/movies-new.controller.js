
(function() {
    angular
        .module("MoviesApp")
        .controller("MoviesNewController", MoviesNewController);

    function MoviesNewController(MovieService,$routeParams,$location) {
        var vm=this;
        vm.searchMovieByTitle=searchMovieByTitle;
        vm.title=$routeParams.title;

        function init(){

            MovieService.latestMovies()
                .success(function (result) {
                    vm.movies=result.results;
                });
            //   https://api.themoviedb.org/3/movie/now_playing?api_key=a86449ea2cfd20a925fdab399e815028&region=US&include_adult=false
            if(vm.title){
                console.log("in home controller");
                console.log(vm.title);
                $location.path("/home/"+vm.title);
                searchMovieByTitle(vm.title);
            }

        } init();

        function searchMovieByTitle(title) {
            console.log("in serach movie by title home controller");
            MovieService.searchMovieByTitle(vm.title)
                .success(function (result) {
                    console.log("success in controller search by title");
                    console.log(result.results);
                    vm.movies=result.results;
                });
            console.log(vm.title);
        }

    }
})();
