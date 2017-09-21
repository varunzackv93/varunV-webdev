
(function(){
    angular
        .module("MoviesApp")
        .factory("MovieService",MovieService);

    function MovieService($http){
        var api = {
            "searchMovieByTitle":searchMovieByTitle,
            "searchMovieByID":searchMovieByID,
            "latestMovies":latestMovies,
            popularMovies:popularMovies
           // "popularMoviesByYear":popularMoviesByYear
        };
        return api;

        function searchMovieByTitle(title){
            //var url = "http://www.omdbapi.com/?s="+title;
            var url="http://api.themoviedb.org/3/search/movie?api_key=a86449ea2cfd20a925fdab399e815028&query="+title+"&page=1&language=en&include_adult=false";
            return $http.get(url);
        }

        function searchMovieByID(imdbID){
            /*var appendTags = 'videos,credits,reviews';
            $http.get(baseUrl + '/movie/' + id + '?api_key=' + apikey + '&append_to_response=' + appendTags)
                .success(callback);*/
          // var url= "https://api.themoviedb.org/3/movie/"+imdbID+"?api_key=a86449ea2cfd20a925fdab399e815028"+"&append_to_response="+appendTags;
                //var url = "http://www.omdbapi.com/?i="+imdbID;

          //  var url="http://api.themoviedb.org/3/search/movie?api_key=a86449ea2cfd20a925fdab399e815028&query=star&page=1&language=en";

            return $http.get("http://api.themoviedb.org/3/movie/"+imdbID+"?api_key=a86449ea2cfd20a925fdab399e815028&append_to_response=videos,credits,reviews");
            //return $http.get(url);

        }

        function latestMovies(){
            var url = "https://api.themoviedb.org/3/movie/now_playing?api_key=a86449ea2cfd20a925fdab399e815028&region=US&include_adult=false";
            return $http.get(url);
        }

        function popularMovies(){
            var url = "http://api.themoviedb.org/3/movie/popular?api_key=a86449ea2cfd20a925fdab399e815028&region=US&include_adult=false";
            return $http.get(url);
        }

       /* function popularMoviesByYear(year){
           var url= "/discover/movie?primary_release_year=year&sort_by=vote_average.desc";
        }*/
    }
})();