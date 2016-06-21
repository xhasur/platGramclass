var express = require('express')
var multer  = require('multer');
var ext = require('file-extension');

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads')
  },
  filename: function (req, file, cb) {
    cb(null, +Date.now() + '.' + ext(file.originalname))
  }
})


//name="picture"  es el nombr del input por eso .single('picture')
var upload = multer({ storage: storage }).single('picture');

var app = express();

app.set('view engine','pug');

app.use(express.static('public'));

app.get('/',function(req,res) {
  res.render('index',{title:'webGram'});
})

app.get('/signup',function(req,res) {
  res.render('index',{title:'webGram-signup'});
})

app.get('/signin',function(req,res) {
  res.render('index',{title:'webGram-signin'});
})

/*midlewares */
app.get('/api/pictures', function (req, res, next) {
  var pictures = [
    {
      user: {
        username: 'slifszyc',
        avatar: 'https://scontent-atl3-1.xx.fbcdn.net/hphotos-xpa1/v/t1.0-9/11031148_10153448564292612_2579019413701631604_n.jpg?oh=d83cdd0687c87c91b247a42375fc5a57&oe=57B12767'
      },
      url: 'office.jpg',
      likes: 0,
      liked: false,
      createdAt: new Date().getTime()
    },
    {
      user: {
        username: 'slifszyc',
        avatar: 'https://scontent-atl3-1.xx.fbcdn.net/hphotos-xpa1/v/t1.0-9/11031148_10153448564292612_2579019413701631604_n.jpg?oh=d83cdd0687c87c91b247a42375fc5a57&oe=57B12767'
      },
      url: 'office.jpg',
      likes: 1,
      liked: true,
      createdAt: new Date().setDate(new Date().getDate() - 10)
    }
  ];

  res.send(pictures);
  /*
  setTimeout(function () {
    res.send(pictures);
  }, 1000)

  */
})


app.post('/api/pictures', function (req, res) {
  upload(req, res, function (err) {
    if (err) {
      return res.send(500, "Error uploading file");
    }
    res.send('File uploaded');
  })
})

app.get('/api/user/:username',function(req,res) {
    const user={
      username: 'xhasur',
      avatar:'https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcR6zbTqxHz3zkeNQsMl-N0zvwfTm7r_3p0LpzgIMmm7uY-NHwIf22Gb9A',
      pictures:[
        {
          id:1,
          src:'data:image/png;base64,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',
          likes:2567
        },
        {
          id:2,
          src:'data:image/png;base64,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',
          likes:2567
        }
      ]
    }
    res.send(user);
})


app.get('/:username',function(req,res) {
  console.log(req.params);
  res.render('index',{title:`PlatziGram - ${req.params.username}`});
})


app.listen(3000,function (err) {
  if(err) return console.log('Error'),process.exit(1); //un numero distinto de 0 paa saber que es un error
  console.log("server escuchando");

})
