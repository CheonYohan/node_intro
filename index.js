/**
 * Module dependencies.
 */

var express = require('express');
var path = require('path');
var https = require('https');
var session = require('express-session');
var http = require('http');
var app = module.exports = express();
var FileStore = require('session-file-store')(session);//session 파일 스토어를 위해 사용

app.use(express.urlencoded({extended:true})); 
app.use(express.json());


var fs = require('fs');
const options = { // letsencrypt로 받은 인증서 경로를 입력해 줍니다.
  ca: fs.readFileSync('/etc/letsencrypt/live/yohan-person.kro.kr/fullchain.pem'),
  key: fs.readFileSync('/etc/letsencrypt/live/yohan-person.kro.kr/privkey.pem'),
  cert: fs.readFileSync('/etc/letsencrypt/live/yohan-person.kro.kr/cert.pem')
};


const mysql = require('mysql');  // mysql 모듈 로드
const mysqlOptions = {
  host: 'localhost',
  port: '3306',
  user: 'root',
  password: 'Helios2842!@',
  database: 'han_intro'
};

const connection = mysql.createConnection(mysqlOptions);

app.use(session({
  secret: 'keyboard cat',
  resave : false,
  saveUninitialized : true,
  store:new FileStore()
}));

http.createServer(app).listen(80);
https.createServer(options, app).listen(443);


app.engine('.html', require('ejs').__express);
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

app.set('view engine', 'html');

app.get('/', function(req, res){
  console.log(req.session.user);
  res.render('users', {
    title: "Han's Personal Site",
    header: "Some users",
    user : req.session.user,
    userName : req.session.userName,
    id : req.session.userId
  });
});


app.get('/game', function(req, res){
  res.render('game', {
    title: "Han's Personal Site",
    header: "Some users"
  });
});
app.get('/canvas_background', function(req, res){
  res.render('canvas', {
    title: "Han's Canvas Practice",
  });
});

/* istanbul ignore next */
if (!module.parent) {
  app.listen(3000);
  console.log('Express started on port 3000');
}



app.post('/api/login', (req,res)=>{
  let { userId , password} = req.body;
  const loginQuery = `SELECT id,name FROM users WHERE 1=1 AND id = '${userId}' AND password = '${password}'`;
  connection.query(loginQuery,(error, result, field)=>{
    if(result[0] !== undefined){
      const user =JSON.parse(JSON.stringify(result[0]));
      req.session.user = user;
      req.session.userName = user.name;
      req.session.userId = user.id;
    }
    res.json(result);
  });
});


app.get('/api/logout', (req,res)=>{
  req.session.destroy();
  res.redirect('/');  
});


