const router = require('express').Router();
const passport = require('passport');

// auth login
router.get('/login', function(req, res){
    res.render('login', { user: req.user });
});

// auth logout
router.get('/logout', function(req, res){
    req.logout();
    res.redirect('/');
});

// auth with google+
router.get('/google', passport.authenticate('google', {
    scope: ['profile']
}));

// callback route for google to redirect to
// hand control to passport to use code to grab profile info
router.get('/google/redirect', passport.authenticate('google'), function(req, res){
    // res.send(req.user);
    res.redirect('/profile');
});

module.exports = router;
