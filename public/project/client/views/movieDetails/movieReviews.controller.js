
(function() {
    angular
        .module("MoviesApp")
        .controller("MovieReviewController",MovieReviewController);

            function MovieReviewController($routeParams, $rootScope, $location,  $sce, UserService, MovieService,AllMoviesService) {

                var vm = this;
                vm.id = $routeParams.id;
                //var userId = "";
                var tmdbId = $routeParams.id;
                vm.submitRatingReview = submitRatingReview;
                vm.logout = logout;

                function init() {
                    getMovieDetails();
                   // getUserName();
                    getLoggedInUser();
                }
                return init();

                function getLoggedInUser() {
                    UserService
                    //.findUserById(userId)
                        .findCurrentUser()
                        .then(function (response) {
                            vm.user = response.data;
                            if (vm.user) {
                                vm.loggedIn = "true";
                               vm.userId = vm.user._id;
                                vm.username=vm.user.username;
                                loggedInUserId = vm.user._id;

                            } else {
                                vm.notloggedIn = "true";

                            }
                        })
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



                function submitRatingReview(review, movie, uname) {

                    var imageUrl = "https://image.tmdb.org/t/p/w130/"+ movie.poster_path;

                    /* USER */
                    var rates = {
                        movie_name : movie.title,
                        movie_Id : tmdbId,
                        movie_rating : parseInt(review.rating),
                        movie_url : imageUrl
                    };

                   // console.log(rates);

                    var reviews = {
                        movie_name: movie.title,
                        movie_Id : tmdbId,
                        movie_review : review.reviewtext,
                        movie_url : imageUrl
                    };

                   // console.log(reviews);
                    var rateandreview ={
                        rates : rates,
                        reviews : reviews
                    };

                   // console.log(rateandreview);

                    /* MOVIE */
                    var ratings = {
                        userId :vm.userId,
                        username: vm.username,
                        value : parseInt(review.rating)
                    };

                   // console.log(ratings);
                    var reviews = {
                        userId : vm.userId,
                        username: vm.username,
                        text : review.reviewtext,
                        visible : "true",
                        flagged : "false"

                    };

                   // console.log(reviews);

                    var ratingsandreviews = {
                        ratings : ratings,
                        reviews : reviews
                    };

                   // console.log(ratingsandreviews);
                    var movie ={
                        tmdbId : tmdbId,
                        title: movie.title,
                        imageUrl : imageUrl,
                        ratings : [ratings],
                        reviews : [reviews]

                    };
                   // console.log(movie);
                    UserService
                        .submitRatingReview(vm.userId,rateandreview)
                        .then(function (response) {
                            console.log(response);
                        });


                    AllMoviesService
                        .findMovieById(tmdbId)
                        .then(function (response) {
                            var returnedmovie = response.data;
                            if(returnedmovie.tmdbId){
                                AllMoviesService
                                    .updateRatingAndReview(tmdbId, ratingsandreviews)
                                    .then(function (response) {
                                        var addedObject = response.data;
                                        if(addedObject){
                                            $location.url("/movieDetails/"+ tmdbId+"/"+movie.title);
                                        }else{
                                            vm.error = "unable to add review";
                                        }
                                    });
                            }else{
                                AllMoviesService
                                    .createMovie(movie)
                                    .then(function (response) {
                                        var addedObject = response.data;
                                        if(addedObject){
                                            $location.url("/movieDetails/"+ tmdbId+"/"+movie.title);
                                        }else{
                                            vm.error = "unable to add new Movie Object";
                                        }
                                    });
                            }
                        });




                }



              /*  function getUserName() {
                    UserService
                        .findUserById(vm.userId)
                        .then(function (response) {
                            var returnedUser = response.data;
                            if(returnedUser._id){
                                vm.userName = returnedUser.username;
                            }else{
                                vm.error = "unable to add review";
                            }
                        });


                }*/




                /* get all move detals */

                function getMovieDetails() {

                    MovieService.searchMovieByID(vm.id)
                        .success(function (response) {
                            //console.log(response);
                            vm.movie=response;
                            vm.genres = vm.movie.genres;
                            //console.log(vm.genres);
                            // if(vm.movie.credits.crew)
                            if (response.videos.results.length > 0) {
                                var embedUrl = 'https://www.youtube.com/embed/';
                                response.video_path = $sce.trustAsResourceUrl(embedUrl + response.videos.results[0].key);
                                response.untrusted_video_url = embedUrl + response.videos.results[0].key;
                            }

                            vm.movie.criticsRating = response.vote_average / 2;
                            vm.movie.ratedByUsers = [];
                            vm.movie.reviewedByUsers = [];
                            var now = new Date();
                            var releaseDate = new Date(response.release_date);
                            if(now > releaseDate) {
                                vm.released = true;
                            }
                        })




                }


            }


        })();
