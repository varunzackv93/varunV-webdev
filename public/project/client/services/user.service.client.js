
(function(){
    angular
        .module("MoviesApp")
        .factory("UserService",UserService);

    function UserService($http) {

        var api = {
            findUserByCredentials: findUserByCredentials,
            findUserById: findUserById,
            UpdateUser: UpdateUser,
            findUserByUsername: findUserByUsername,
            createUser: createUser,
            UnregisterUser: UnregisterUser,
            submitRatingReview : submitRatingReview,
            followUser: followUser,
            unfollowUser : unfollowUser,


            //------------------------- passport auth------------------

            login:login,
            checkLogin:checkLogin,
            findCurrentUser:findCurrentUser,
            logout:logout,
            checkAdmin:checkAdmin,
            findAllUsers: findAllUsers,
            deleteUser: deleteUser,
            UpdateUserAdmin:UpdateUserAdmin,
            deleteUserAdmin:deleteUserAdmin,
            register: register
            /* deleteUserById: deleteUserById*/



        };
        return api;

        function register(user) {
            return $http.post("/api/register", user);
        }

        function deleteUser(userId){
            var url = "/api/project/user/"+userId;
            return $http.delete(url);

        }

        function deleteUserAdmin(userId){
            var url = "/api/project/admin/user/"+userId;
            return $http.delete(url);

        }

        function findAllUsers() {
            var url = "/api/project/findallusers";
            return $http.get(url);
        }


        function followUser(userId, follows) {
            var url = "/api/project/user/follows/"+ userId;
            return $http.put(url, follows);
        }

        function unfollowUser(userId, username) {
            var url = "/api/project/user/"+ userId+"/unfollows/" +username;
            return $http.put(url);
        }



        function submitRatingReview(userId,rateandreview) {
            console.log("userid in submit rrating review");
            console.log(userId);
            var url = "/api/project/"+userId+"/rateandreview";
            return $http.put (url, rateandreview);
        }


        function findCurrentUser() {
            var url = "/api/user";
            return $http.get(url);
        }

        function logout(){
            return $http.post("/api/logout");
        }

        function checkLogin(){
            return $http.post("/api/checkLogin");
        }
        function checkAdmin(){
            return $http.post("/api/checkAdmin");
        }


        function login(username,password){
            console.log("in user client");
            console.log(username);
            console.log(password);
            var user={
                username:username,
                password:password
            };
            return $http.post("/api/login",user);
        }

        //---------------------------------------------------------------------------

        function findUserByCredentials(username, password) {
            var url="/api/user?username="+username+"&password="+password;

            return $http.get(url);
        }

        function findUserById(userId) {
            var url = "/api/user/"+userId;
            return $http.get(url);
        }

        function findUserByUsername(uname) {

            var url = "/api/user?username="+uname;
            return $http.get(url);
            /*for (var u in users) {
             var user = users[u];
             if (user.username === uname) {
             return true;
             }
             }
             return false;*/
        }


        function createUser(user) {
            var url = "/api/user";

            return $http.post(url,user);

            /* var new_user = user;
             users.push(new_user);
             return new_user;*/

        }


        function UnregisterUser(uid){
            console.log("at client server"+uid);
            var url = "/api/user/"+uid;
            return $http.delete(url);
        }


        /*function deleteUserById(userId) {

         for (var index in users) {
         var obj = users[index];
         if (obj._id == userId) {
         users.splice(index, 1);
         return true;
         }
         }
         return false;
         }*/

        function UpdateUser(userId, user) {

            var url ="/api/user/"+userId;
            return $http.put(url,user);
            /*for (var value in users) {
             var obj = users[value];
             var id = obj._id;
             if (id == userid) {
             users[value] = user;
             return user;

             }

             }*/

        }


        function UpdateUserAdmin(userId, user) {

            var url ="/api/admin/user/"+userId;
            return $http.put(url,user);
            /*for (var value in users) {
             var obj = users[value];
             var id = obj._id;
             if (id == userid) {
             users[value] = user;
             return user;

             }

             }*/

        }
    }
})();