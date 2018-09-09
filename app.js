const express = require('express');
const authRoutes = require('./routes/auth-routes');
const profileRoutes = require('./routes/profile-routes');
const passportSetup = require('./config/passport-setup');
const mongoose = require('mongoose');
const keys = require('./config/keys');
const cookieSession = require('cookie-session');
const passport = require('passport');
const Contact = require('./models/contact-model');
const Notice = require('./models/notice-model');
var bodyParser = require('body-parser');

const app = express();
var urlencodedParser = bodyParser.urlencoded({ extended: false });

//set up view engine
app.set('view engine','ejs');

//static files
app.use(express.static('./public'));

app.use(cookieSession({
  maxAge:24*60*60*1000,
  keys:[keys.session.cookieKey]
}));

//initialise passport
app.use(passport.initialize());
app.use(passport.session());

//connect to mongodb
mongoose.connect(keys.mongodb.dbURI, function(){
  console.log('connected to mongodb');
});

//set up routes (middlevare)
app.use('/auth', authRoutes);
app.use('/profile', profileRoutes);

//=====================================================================
//create home route
app.get('/home', function(req, res){
    //get data from mongodb and pass it to view
    Notice.find({}, function (err, data) {
      if(err) throw err;
      res.render('home', {user: req.user ,notices: data});
    })
  });

  app.post('/home', urlencodedParser, function(req, res){
    //get data from the view and it mongodb
    var newNotice = Notice(req.body).save(function (err, data) {
      if (err) throw err;
      res.json(data);
    });
  });

  app.delete('/home/:item', function(req, res){
    //delete the requested item from mongodb
    Notice.find({item: req.params.item.replace(/\-/g," ")}).remove(function(err,data) {
      if(err) throw err;
      res.json(data);
    });
  });
//======================================================================

app.get('/contact',function (req, res) {
  res.render('contact');
});

app.post('/contact', urlencodedParser, function (req, res) {
  console.log(req.body);
  new Contact({
      email:req.body.email,
      message:req.body.message,
      branch:req.body.branch,
      year:req.body.year
  }).save();
  res.render('contact-success', {data: req.body});
});

app.listen(3000,function(){
  console.log("listenning for the request");
});
