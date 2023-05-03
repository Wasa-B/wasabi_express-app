var express = require('express');
var router = express.Router();

var connection = require('../lib/db').connection;

router.get('/',(req,res,next)=>{
  connection.query(`SELECT * FROM topic`, function(error,dblist){
    if(error){next(error)}
    else
    {
      req.topicList = dblist;
      next();
    }

  });
});

/* GET home page. */
router.get('/login', function(req, res, next) {
  res.render('login', { title: 'LoginPage'});
});

router.post('/login_process',(req,res,next)=>{
    connection.query('select * from userdata where id=?',[req.body.id],(err,result)=>{
        if(err){next(err);}
        else{
            console.log(result);
            console.log(req.body.password);
            if(result.length>0 &&result[0].password === req.body.password){
                req.session.is_logined = true;
                req.session.id = result[0].id;
                req.session.nickname = result[0].nickname;
                req.session.save(()=>res.redirect('/'));
            }else{
                res.redirect('/auth/login');
            }
        }
    });
});

router.get('/logout',(req,res,next)=>{
    req.session.destroy(()=>res.redirect('/'));
    
});

module.exports = router;
