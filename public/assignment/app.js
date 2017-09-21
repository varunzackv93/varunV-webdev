


/*
angular
    .module('WebAppMaker',["ngRoute","wamDirectives"])
    .config(Config);

function Config($routeProvider) {
$routeProvider
    .when('/login',{
        templateUrl: 'login.view.client.html'
    })

    .when('/register',{
        templateUrl: 'register.html'
    });

}
*/

(function () {
    angular.module("WebAppMaker",["ngRoute","textAngular","wamDirectives"]);
    console.log("in assignment appppp");
})();