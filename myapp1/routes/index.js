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
router.get('/', function(req, res, next) {
  console.log(req.session);
  res.render('index', { title: 'Express',
                        topicList: req.topicList,
                        session: req.session});
  //

  
});

module.exports = router;
