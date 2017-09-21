
(function () {
    angular
        .module("MoviesApp")
        .factory("AllMoviesService", AllMoviesService);


    function AllMoviesService($http) {

        var api = {
            findMovieById: findMovieById,
            updateRatingAndReview: updateRatingAndReview,
            createMovie : createMovie,
            reportReview: reportReview,
            findAllMovies: findAllMovies,
            removeReview: removeReview,
            donotremoveReview: donotremoveReview,
            updateMovie: updateMovie,
            deleteMovie : deleteMovie
        };

        return api;

        function deleteMovie(tmdbId, userId) {
            var url = "/api/project/movie/"+tmdbId+"/remove/"+userId;
            return $http.delete(url);
        }
        function donotremoveReview(twoIds) {
            var url = "/api/project/donotremoveReview";
            return $http.put(url, twoIds);
        }

        function removeReview(twoIds) {
            var url = "/api/project/removereview";
            return $http.put(url, twoIds);
        }

        function reportReview(twoIds) {
            var url = "/api/project/reportreview";
            return $http.put(url, twoIds);
        }

        function findAllMovies() {
            var url = "/api/project/findallmovies";
            return $http.get(url);
        }

        function findMovieById(tmdbId) {
            var url = "/api/project/moviecheck/" + tmdbId;
            return $http.get(url);
        }

        function updateRatingAndReview(tmdbId, ratingsandreviews) {
            var url = "/api/project/"+tmdbId+"/ratingsandreviews";
            return $http.put (url, ratingsandreviews);
        }

        function updateMovie(tmdbId, reviews) {
            var url = "/api/project/"+tmdbId+"/updatemovie";
            return $http.put (url, reviews);
        }

        function createMovie(movie){
            var url = "/api/project/movie";
            return $http.post(url,movie);
        }

    }
})();