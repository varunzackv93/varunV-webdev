/**
 * Created by varun on 25-10-2016.
 */
module.exports = function(app,model){

    var bcrypt = require("bcrypt-nodejs");
    var userModel = model.userModel;

    var passport = require('passport');
    var cookieParser = require('cookie-parser');
    var session = require('express-session');
    var LocalStrategy = require('passport-local').Strategy;
    var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

    app.use(session({
        secret: 'this is the secret',
        resave: true,
        saveUnitialized: true
    }));
    app.use(cookieParser());
    app.use(passport.initialize());
    app.use(passport.session());
    passport.use(new LocalStrategy(localStrategy));
    passport.serializeUser(serializeUser);
    passport.deserializeUser(deserializeUser);

    var googleConfig = {
        clientID     : "process.env.GOOGLE_CLIENT_ID",
        clientSecret : "process.env.GOOGLE_CLIENT_SECRET",
        callbackURL  : "process.env.GOOGLE_CALLBACK_URL"
    };

    passport.use(new GoogleStrategy(googleConfig, googleStrategy));

    function googleStrategy(token, refreshToken, profile, done) {
        console.log(profile);
        userModel
            .findUserByGoogleId(profile.id)
            .then(
                function(user) {
                    if(user) {
                        return done(null, user);
                    } else {
                        var email = profile.emails[0].value;
                        var emailParts = email.split("@");
                        var newGoogleUser = {
                            username:  emailParts[0],
                            firstName: profile.name.givenName,
                            lastName:  profile.name.familyName,
                            email:     email,
                            google: {
                                id:    profile.id,
                                token: token
                            }
                        };
                        return userModel.createUser(newGoogleUser);
                    }
                },
                function(err) {
                    if (err) { return done(err); }
                }
            )
            .then(
                function(user){
                    return done(null, user);
                },
                function(err){
                    if (err) { return done(err); }
                }
            );
    }

    var users = [
        {_id: "123", username: "alice", password: "alice", firstName: "Alice", lastName: "Wonder"},
        {_id: "234", username: "bob", password: "bob", firstName: "Bob", lastName: "Marley"},
        {_id: "345", username: "charly", password: "charly", firstName: "Charly", lastName: "Garcia"},
        {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose", lastName: "Annunzi"}
    ];

    app.get("/api/user",getUsers);
   // app.get("/api/user?username=:username",findUserByUsername);
    app.get("/api/user/:userId",findUserById);
    app.put("/api/project/:userId/rateandreview", rateandreview);

    app.post("/api/user",createUser);

    app.put("/api/user/:userId",loggedInAndSelf,updateUser);

    app.put("/api/admin/user/:userId",updateUser);

    app.put("/api/project/admin/user/",deleteUser);

    app.delete("/api/user/:userId",loggedInAndSelf,deleteUser);

    app.put("/api/project/user/follows/:userId", followUser);
    app.put("/api/project/user/:userId/unfollows/:username", unfollowUser);

    app.delete("/api/project/admin/user/:userId", deleteUser);
    app.get('/api/project/findallusers', findallusers);

    app.post("/api/login",passport.authenticate('local') ,login);
    app.post("/api/checkLogin",checkLogin);
    app.post("/api/checkAdmin",checkAdmin);
    app.post("/api/logout",logout);
    app.get('/auth/google', passport.authenticate('google', { scope : ['profile', 'email'] }));
    app.get('/auth/google/callback',
        passport.authenticate('google', {
            successRedirect: '/project/client/index.html#/user',
            failureRedirect: '/project/client/index.html#/login'
        }));

    function logout(req,res){
        req.logout();
        res.send(200);
    }

    app.post ('/api/register', register);

    function register (req, res) {
        var user = req.body;
        req.body.password=bcrypt.hashSync(req.body.password);
        model.userModel
            .createUser(req.body)
            .then(
                function(user){
                    if(user){
                        req.login(user, function(err) {
                            if(err) {
                                res.status(400).send(err);
                            } else {
                                res.json(user);
                            }
                        });
                    }
                }
            );
    }


    function findallusers(req, res) {

        userModel
            .findAllUsers()
            .then(
                function (users) {
                    res.json(users);
                },
                function (error) {
                    res.sendStatus(404);
                }
            );
    }

    function deleteUser(req,res) {
        var userId = req.params.userId;

        userModel
            .deleteUser(userId)
            .then(function (status) {

                    res.send(200);
                },
                function (error) {
                    res.statusCode(404).send(error);
                });


    }

    function rateandreview(req, res) {

        var id = req.params.userId;
        var rateandreview = req.body;

        userModel
            .updateRatesandReviews(id, rateandreview)
            .then(
                function (stats) {
                    res.sendStatus(200);
                },
                function (error) {
                    res.sendStatus(404);
                }
            );
    }


    function loggedInAndSelf(req, res, next) {
        var loggedIn=  req.isAuthenticated();
        var userId = req.params.userId;
        var self = userId== req.user._id;
        if(self && loggedIn){
            next();
        } else{
            res.sendStatus(400).send("not the same person");
        }
    }


    function checkLogin(req,res){
        //console.log("in checklogin");
        //console.log(req.user);
        res.send(req.isAuthenticated() ? req.user : '0');
    }

    function checkAdmin(req,res) {
        //console.log("in checklogin");
        //console.log(req.user);
        var loggedIn = req.isAuthenticated();
        var isAdmin = req.user.role == "ADMIN";
        if (loggedIn && isAdmin) {
            res.json( req.user);
        }
        else{
            res.send('0');
        }
    }

    function localStrategy(username,password,done) {

        /* var user=req.body;
         console.log("in user server");
         console.log(user);
         var username=user.username;
         var password=user.password;

         console.log("in user server assignment");
         console.log(username);
         console.log(password);*/

        model.userModel.findUserByUsername(username)
            .then(
                function (user) {
                    console.log("error in bcrypt");
                    console.log(user);
                    console.log(user.password);
                    if(user && bcrypt.compareSync(password, user.password)) {
                        done(null, user);
                    } else {
                        done(null, false);
                    }
                },
                function (error) {
                    res.sendStatus(400).send(error);
                }
            )
    }

    function serializeUser(user, done) {
       // console.log("in serialize user");
        done(null,user);
    }

    function deserializeUser(user,done){
       // console.log("in deserialize user");
            userModel
            .findUserById(user._id)
            .then(
                function (user) {
                    done(null, user);
                },
                function (err) {
                    done(err, null);
                }
            );
    }



    function login(req,res){
        var user=req.user;
        //console.log("in user server");
        //console.log(user);
        res.json(user);

    }


    function createUser(req,res){
        var user=req.body;
       // console.log(user);
       // users.push(user);
            userModel
            .createUser(user)
            .then(
              function (newUser) {
                 // console.log(newUser);
                  if(newUser) {
                      req.login(newUser, function(err) {
                          if(err) {
                              res.status(400).send(err);
                          } else {
                              res.json(newUser);
                          }
                      });
                  }
              } ,
                function (error) {
                    res.sendStatus(400).send(error);
                }
            );

    }

    function getUsers(req,res){

        var username =req.query.username;
        var password =req.query.password;

        if(username && password){
            findUserByCredentials(req,res);

        }
        else if (username){
            findUserByUsername(username, res);
        }
        else{
            res.json(req.user);
        }
    }

    function findUserByUsername(username,res){
        userModel.findUserByUsername(username)
            .then(
                function (user) {
                         //console.log("in find user by name server server");
                   // console.log(user);
                        res.json(user);
                },
                function (error) {
                    //console.log("in find user by name server server error");
                    res.send(null);
                }
            );
    }

    function findUserByCredentials(req,res){
var username = req.query.username;
        var password=req.query.password;
        //console.log("username and pass in server");
       // console.log(username);
        userModel.findUserByCredentials(username,password)
            .then(
                function (users) {
                    if(users) {
                       // console.log("i am here");
                        res.json(users[0]);
                    }
                    else{
                        res.send(null);
                    }
                },
                function (error) {
                    res.sendStatus(400).send(error);
                }
            )
        /*for(var i in users){
            if(users[i].username === username && users[i].password === password){

                res.send(users[i]);
                return;
            }
        }
        res.send(null);*/
    }

    function findUserById(req,res){
        var id=req.params['userId'];
        userModel.findUserById(id)
            .then(
                function (user) {
              if(user){
                  res.send(user);
              }
              else{
                  res.send(null);
              }

                },
                function (error) {
                    res.sendStatus(400).send(error);
                }
            );
       /* for(var i in users){
            if(users[i]._id === id){
                res.send(users[i]);
                return;
            }
        }*/
        // res.send(null);

    }


    function updateUser(req,res){

        var updated_user = req.body;
        var userid=req.params.userId;
        userModel.updateUser(userid, updated_user)
            .then(
                function (status) {
                    res.send(200);
                },
                function (error) {
                    res.sendStatus(400).send(error);
                }
            );
    }


    function deleteUser(req,res){
        console.log("yayya! at server");
        var id=req.params.userId;
      userModel.deleteUser(id)
    .then(
        function (status) {
            res.send(200);
        },
        function (error) {
            res.sendStatus(400).send(error);
        }
    )
        /*for(var i in users){
            if(users[i]._id == id){
                users.splice(i,1);
                res.send(200);
                return;
            }
        }*/
        //res.send(400);
    }


    function followUser(req, res) {
        var id = req.params.userId;
        var follows = req.body;

        userModel
            .followUser(id, follows)
            .then(
                function (status) {
                    res.sendStatus(200);
                },
                function (error) {
                    res.sendStatus(404);
                }
            );
    }

    function unfollowUser(req, res) {
        var id = req.params.userId;
        var username = req.params.username;

        console.log(id +" "+username);

        userModel
            .unfollowUser(id, username)
            .then(
                function (stats) {
                    res.sendStatus(200);
                },
                function (error) {
                    res.sendStatus(404);
                }
            );
    }


};