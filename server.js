var fs = require('fs');
var path = require('path');
var mysql = require('mysql');
var express = require('express');
var session = require('express-session');
var bodyParser = require('body-parser');
var ejs = require('ejs');
const { Script } = require('vm');

var connection = mysql.createConnection({
	host     : 'localhost',
	user     : 'web2020',
	password : 'web2020',
	database : 'web'
});

var app = express();
app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));

app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());

function restrict(req, res, next) {
  if (req.session.loggedin) {
    next();
  } else {
    req.session.error = '접속이 불가능합니다.';
    res.sendFile(path.join(__dirname + '/my/login.html'));
  }
}

app.use('/', function(request, response, next) {
	if ( request.session.loggedin == true || request.url == "/login" || request.url == "/register" ) {
    next();
	}
	else {
    response.sendFile(path.join(__dirname + '/my/login.html'));
	}
});

app.get('/', function(request, response) {
	response.sendFile(path.join(__dirname + '/my/home.html'));
});

app.get('/login', function(request, response) {
	response.sendFile(path.join(__dirname + '/my/login.html'));
});

app.post('/login', function(request, response) {
	var username = request.body.username;
	var password = request.body.password;
	if (username && password) {
		connection.query('SELECT * FROM user WHERE username = ? AND password = ?', [username, password], function(error, results, fields) {
			if (error) throw error;
			if (results.length > 0) {
				request.session.loggedin = true;
				request.session.username = username;
				response.redirect('/home');
				response.end();
			} else {
				response.send('<script type="text/javascript">alert("아이디와 패스워드를 확인하세요!"); document.location.href="/login";</script>');    
			}			
		});
	} else {
		response.send('<script type="text/javascript">alert("아이디와 패스워드를 확인하세요!"); document.location.href="/login";</script>');    
        response.end();
	}
});

app.get('/register', function(request, response) {
	response.sendFile(path.join(__dirname + '/my/register.html'));
});

app.post('/register', function(request, response) {
	var username = request.body.username;
	var password = request.body.password;
	var password2 = request.body.password2;
	var email = request.body.email;
    var coupleID = request.body.coupleID;
	console.log(username, password, email, coupleID);
	if (username && password && email && coupleID) {
		connection.query('SELECT * FROM user WHERE username = ?', [username], function(error, results, fields) {
			if (error) throw error;
			if (results.length == 0 && password==password2) {
                connection.query('INSERT INTO user (username, password, email, coupleID) VALUES(?,?,?,?)', [username, password, email, coupleID],
                function (error, data) {
                    if (error)
                    console.log(error);
                    else
                    console.log(data);
                });
			  response.send('<script type="text/javascript">alert("회원가입에 성공하였습니다."); document.location.href="/home";</script>');
			} else {
				response.send('<script type="text/javascript">alert("이미 존재하는 계정입니다."); document.location.href="/register";</script>');
			}			
			response.end();
		});
	} else {
		response.send('<script type="text/javascript">alert("모든 정보를 입력하세요"); document.location.href="/register";</script>');
		response.end();
	}
});


app.post('/home', function(request, response) {
	var username = username;
    var coupleID = coupleID;
	var currentTime= request.body.currentTime;
	var comment=request.body.comment;
	console.log(username, coupleID, currentTime, comment);
	if (username && comment && currentTime && coupleID) {
		connection.query('SELECT * FROM posting WHERE username = ?,coupleID=?, currentTime=?, comment=?', [username, coupleID, currentTime, comment], function(error, results, fields) {
			if (error) throw error;
			if (results.length == 0) {
                connection.query('INSERT INTO posting (username, coupleID, currentTime, comment) VALUES(?,?,?,?)', [username, coupleID, currentTime, comment],
                function (error, data) {
                    if (error)
                    console.log(error);
                    else
                    console.log(data);
                });
			  response.send('<script type="text/javascript">alert("글이 등록되었습니다."); document.location.href="/home";</script>');
			} else {
				response.send('<script type="text/javascript">alert("글이 등록되지 않았습니다."); document.location.href="/home";</script>');
			}			
			response.end();
		});
	} else {
		response.send('<script type="text/javascript">alert("내용을 입력하세요"); document.location.href="/home";</script>');
		response.end();
	}
});




app.get('/logout', function(request, response) {
  request.session.loggedin = false;
    response.send('<script type="text/javascript">alert("성공적으로 로그아웃 되었습니다."); document.location.href="/";</script>');    
    response.end();
});







app.get('/home', restrict, function(request, response) {
	if (request.session.loggedin) {
		response.sendFile(path.join(__dirname + '/my/home.html'));
	} else {
		response.send('<script type="text/javascript">alert("로그인을 하십시오."); document.location.href="/";</script>'); 
		response.end();
	}
});







app.listen(3000, function () {
    console.log('Server Running at http://127.0.0.1:3000');
});