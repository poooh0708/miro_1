var express = require('express');
var app = express();
var router = express.Router();
var Board = require('../models/board');
var User = require('../models/user');
var Comment = require('../models/comment');
var session = require('express-session');

app.set('trust proxy', 1) 
app.use(session({
  secret: 'tired',
  resave: false,
  saveUninitialized: true,
}));

router.get('/', function(req, res){
    res.render('home.ejs');
})
router.get('/news',function(req,res){
    res.render('news.ejs');
})
router.get('/news2',function(req,res){
    Board.find({},function(err,results){
        if(err) throw err;
        res.render('news2.ejs',{boards : results})
    })
})
router.get('/about',function(req,res){
    res.render('about.ejs')
})



router.get('/list',function(req,res){
    Board.find({},function(err,results){
        if(err) throw err;
        res.render('list.ejs', {boards : results})
    })
})

router.get('/list1',function(req,res){
    Board.find({},function(err,results){
        if(err) throw err;
        res.render('list.1.ejs', {boards : results})
    })
})

router.get('/list2',function(req,res){
    Board.find({},function(err,results){
        if(err) throw err;
        res.render('list.2.ejs', {boards : results})
    })
})

router.get('/list3',function(req,res){
    Board.find({},function(err,results){
        if(err) throw err;
        res.render('list.3.ejs', {boards : results})
    })
})

router.get('/writing',function(req,res){
    res.render('writing.ejs');
})

router.get('/login',function(req,res){
    res.render('login.ejs');
})

router.post('/writing', function (req, res) {
    var board = new Board({
      title: req.body.title,
      content: req.body.content,
      created_at: new Date(),
      modified_at: new Date(),
      category: req.body.category,
      hits: 0
    });
    board.save(function (err) {
      if (err) return console.error(err);
    });
    res.redirect('/list');
  });


  
router.get("/show/:id",function(req,res){
    Board.findOne({_id: req.params.id}, function(err,boards){
        boards.hits++;
        boards.save();
        res.render("show.ejs",{result: boards})
    })
})

router.get('/coding/:id',function(req,res){
    Board.findOne({_id: req.params.id},function(err,boards){
        boards.hits++;
        boards.save();
        Comment.find({super: req.params.id},function(err,comments){
            res.render("coding.ejs", {result: boards, comment: comments})
        })
       
    })
})

router.post('/coding/:id', function (req, res) {
    var comment = new Comment({
      
      content: req.body.content,
      created_at: new Date(),
      super: req.params.id,
    
    });
    comment.save(function (err) {
      if (err) return console.error(err);
    });
    res.redirect('/coding/'+req.params.id);
  });

 
module.exports = router;