module.exports = function(){
    var mongoose = require("mongoose");
  var UserSchema = require("./user.schema.server.js")();
var User = mongoose.model("UserModel",UserSchema);

    var api={
        createUser: createUser,
        findUserById:findUserById,
        updateUser:updateUser,
        findUserByCredentials: findUserByCredentials,
        deleteUser: deleteUser,
        findAllUsers: findAllUsers,
        followUser: followUser,
        unfollowUser : unfollowUser,
        updateRatesandReviews: updateRatesandReviews,
        findUserByUsername:findUserByUsername,
        findUserByGoogleId:findUserByGoogleId

    };
    return api;

    function findAllUsers() {
        return User.find();
    }


    function deleteUser(userId) {
        return User.remove({_id: userId});
    }

    function updateRatesandReviews(id, rateandreview) {
        var rate = rateandreview.rates;
        var review = rateandreview.reviews;

        return User
            .update({_id: id},
                {$push: {rates: rate,
                    reviews : review }}
            );
    }

    function findUserByGoogleId(googleId){
        return User.findOne({"google.id":googleId});
    }

    function followUser(id, follows) {
        return User
            .update({_id: id},
                 {follows: follows}
            );
    }

    function unfollowUser(id, username) {
        return User.update(
            {_id: id},
            {   follows:
                    {
                        username: username
                    }
            }
        );
    }




    
    function findUserByCredentials(username,password) {
        console.log("in user model");
      return  User.find({
            username:username,
            password: password
        });
    }
    
  function createUser(user) {
      console.log("in create user twice??");
      console.log(user);
     return User.create(user);
  }  
  
  function findUserById(userid) {
     // UserModel.find({_id: userid});
     return User.findById(userid);
  }

  function findUserByUsername(username){
      console.log("in usermodel username");
      return User.findOne({username: username})
  }


  function updateUser(userid,user) {
   return User.update(
       {
           _id: userid
       },
       {
           firstName: user.firstName,
           lastName: user.lastName,
           email: user.email,
           role: user.role
       }
   )
  }
};
