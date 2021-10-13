var express = require('express');
const { Store } = require('express-session');
var router = express.Router();


/* GET users listing. */
router.get('/', function(req, res, next) {

  res.header('Cache-control','no-cache,private, no-store, must-revalidate,max-stale=0,post-check=0,pre-check=0');

  if(req.session.loggedIn){
    res.render('home')
  }else{
    res.redirect('/login');
  }
});

router.get('/login', function (req, res) {
  res.header('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');

  if (!req.session.loggedIn) {
  
    res.render('index', { loggedInErr: req.session.loggedInErr,emailErr: req.session.emailErr,passwordErr: req.session.passwordErr,emtyErr: req.session.emtyErr });
    req.session.loggedInErr = false;
    req.session.emailErr = false;
    req.session.passwordErr=false;
    req.session.emtyErr=false;
  }
  else {
    res.redirect('/');
  }
})

router.post('/submit',(req,res)=>{

  let email=req.body.email;
  let password=req.body.password;

  if(email==""||password==""){

    req.session.emtyErr=true;
    res.redirect('/');

  }else{
    if( email==="asif@gmail.com"){
      if(password==='12345') {
        req.session.loggedIn = true;
        req.session.userid=req.body.email;
        res.redirect('/')
      }else{
        req.session.passwordErr = true;
        res.redirect('/')
      }
    }else{
      req.session.emailErr = true;
      res.redirect('/')
    
    }
  }
})

router.get('/logout',(req,res)=>{
  req.session.destroy()
  res.redirect('/')
})

module.exports = router;
