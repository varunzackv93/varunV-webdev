
(function() {
    angular
        .module("MoviesApp")
        .controller("moveDetailsController", moveDetailsController);

    function moveDetailsController($location,MovieService,$routeParams,$sce,UserService,AllMoviesService) {
        var vm=this;
        vm.id = $routeParams.imdbID;
        var imdbID=$routeParams.imdbID;
        vm.title=$routeParams.title;
        //console.log(imdbID);
  vm.showDirector=showDirector;
  vm.reviewPage=reviewPage;

        vm.reviewPage = reviewPage;
        vm.giveError = giveError;
        var submitted = false;
        vm.logout = logout;
       // vm.reportReview = reportReview;
        vm.needtoLoginforProfile = needtoLoginforProfile;

       // vm.loggedIn = false;
        //vm.notloggedIn=true;

        function init() {
            getMovieReviewsandRatings();
            MovieService.searchMovieByID(imdbID)
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
                })

            getLoggedInUser();
        }
        init();

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


        var loggedInUserId = null;

        function  needtoLoginforProfile() {
            vm.givecheckoutusererror ="need to login to check out user's profiles";
        }

        function giveError() {
            vm.notLoggedInError = "You must login to leave ratings and reviews!";
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


        function showDirector(job){
          //  console.log("job::::");
          //  console.log(job);
            if(job=="Director"){
                return true;
            }
        }


        function getMovieReviewsandRatings() {
            console.log(vm.id);
            AllMoviesService
                .findMovieById(vm.id)
                .then(function (response) {
                    vm.movieInfo = response.data;
                    console.log("movieInfo in movie details controller");
                    console.log(vm.movieInfo);
                    var noOfRatings = vm.movieInfo.ratings.length;
                    var sumOfRatings = 0;
                    for (var i in vm.movieInfo.ratings){
                        var sumOfRatings = sumOfRatings + vm.movieInfo.ratings[i].value;
                    }
                    var avgRating = sumOfRatings/noOfRatings;
                    vm.avgRating = avgRating.toFixed(1);
                });
        }


        function getMovieDetails() {
            MovieService.searchMovieByID(vm.id,
                function (response) {
                    if (response.videos.results.length > 0) {
                        var embedUrl = 'https://www.youtube.com/embed/';
                        response.video_path = $sce.trustAsResourceUrl(embedUrl + response.videos.results[0].key);
                        response.untrusted_video_url = embedUrl + response.videos.results[0].key;
                    }
                    response.credits.cast.splice(8, response.credits.cast.length - 8);
                    vm.movie = response;


                    vm.movie.criticsRating = response.vote_average / 2;
                    vm.movie.ratedByUsers = [];
                    vm.movie.reviewedByUsers = [];
                    var now = new Date();
                    var releaseDate = new Date(response.release_date);
                    if(now > releaseDate) {
                        vm.released = true;
                    }

                });
        }


        function reviewPage() {

            UserService
                .findUserById(loggedInUserId)
                .then(function (response) {
                    console.log("reviews by user"+loggedInUserId);
                    var usersReviews = response.data.reviews;
                    console.log(usersReviews);
                    for(var i in usersReviews){
                        if(usersReviews[i].tmdbId == vm.id){
                            vm.error = "Dear user, you have already submitted review!";

                            return;
                        }
                    }

                    $location.url("/movie/"+ vm.id +"/review");

                });
        }

    }

    })();