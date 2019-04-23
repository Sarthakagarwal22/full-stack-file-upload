require('rootpath')();
var cors = require('cors');
var multer = require('multer');
var express = require('express'),
app = express();
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const userService = require('./user.service');

app.use(cors());

app.post('/authenticate',function(req, res, next) {
    userService.authenticate(req.body)
        .then(user => user ? res.json(user) : res.status(305).json({ message: 'Username or password is incorrect' }))
        .catch(err => {res.status(501).send({msg:'Username Already Taken'})});
});

app.post('/register',function (req, res, next) {
    userService.create(req.body)
        .then(() => res.json({message: 'User Saved Successfully'}))
        .catch(err => {res.status(301).send({msg:'Username Already Taken'})});
});

app.set('port', process.env.PORT || 5000);

var upload = multer({ dest:'storage/' })

app.post('/upload', upload.any(), function (req, res) {
  console.log(req.files);
  res.end('ok');
})
 
app.listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});
