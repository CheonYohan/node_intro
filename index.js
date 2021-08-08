/**
 * Module dependencies.
 */

var express = require('express');
var path = require('path');
var https = require('https');

var http = require('http');
var app = module.exports = express();
var fs = require('fs');
const options = { // letsencrypt로 받은 인증서 경로를 입력해 줍니다.
  ca: fs.readFileSync('/etc/letsencrypt/live/yohan-person.kro.kr/fullchain.pem'),
  key: fs.readFileSync('/etc/letsencrypt/live/yohan-person.kro.kr/privkey.pem'),
  cert: fs.readFileSync('/etc/letsencrypt/live/yohan-person.kro.kr/cert.pem')
};

http.createServer(app).listen(80);
https.createServer(options, app).listen(443);

// Register ejs as .html. If we did
// not call this, we would need to
// name our views foo.ejs instead
// of foo.html. The __express method
// is simply a function that engines
// use to hook into the Express view
// system by default, so if we want
// to change "foo.ejs" to "foo.html"
// we simply pass _any_ function, in this
// case `ejs.__express`.

app.engine('.html', require('ejs').__express);

// Optional since express defaults to CWD/views

app.set('views', path.join(__dirname, 'views'));

// Path to our public directory

app.use(express.static(path.join(__dirname, 'public')));

// Without this you would need to
// supply the extension to res.render()
// ex: res.render('users.html').
app.set('view engine', 'html');

// Dummy users
var users = [
  { name: 'tobi', email: 'tobi@learnboost.com' },
  { name: 'loki', email: 'loki@learnboost.com' },
  { name: 'jane', email: 'jane@learnboost.com' }
];

app.get('/', function(req, res){
  res.render('users', {
    users: users,
    title: "Han's Personal Site",
    header: "Some users"
  });
});

/* istanbul ignore next */
if (!module.parent) {
  app.listen(3000);
  console.log('Express started on port 3000');
}
