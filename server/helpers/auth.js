module.exports = {
  ensureAuthenticated: function(req, res, next){
    if(req.isAuthenticated()){
      console.log(req.isAuthenticated);
      return next();
    }
    console.log('noUser');

      console.log(req.isAuthenticated());
    res.redirect('/user/login');
  }
}
