var express = require('express')
  , http = require('http')
  , path = require('path');

// Express의 미들웨어 불러오기
var bodyParser = require('body-parser')
  , cookieParser = require('cookie-parser')
  , serveStatic = require('serve-static')
  , errorHandler = require('errorhandler');

// 에러 핸들러 모듈 사용
var expressErrorHandler = require('express-error-handler');

// Session 미들웨어 불러오기
var expressSession = require('express-session');
  
const redis = require('redis');
const RedisStore=require('connect-redis')(expressSession);

//===== Passport 사용 =====//
var passport = require('passport');
var flash = require('connect-flash');
require('dotenv').config();
// 모듈로 분리한 설정 파일 불러오기
var config = require('./config/config');

// 모듈로 분리한 데이터베이스 파일 불러오기
var database = require('./database/database');

// 모듈로 분리한 라우팅 파일 불러오기
var route_loader = require('./routes/route_loader');

// 익스프레스 객체 생성
var app = express();


//===== 뷰 엔진 설정 =====//
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
console.log('뷰 엔진이 ejs로 설정되었습니다.');


//===== 서버 변수 설정 및 serveStatic으로 public 폴더 설정  =====//
console.log('config.server_port : %d', config.server_port);
app.set('port', process.env.PORT || 80);
 

// body-parser를 이용해 application/x-www-form-urlencoded 파싱
//app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.urlencoded({ extended: true }))

// body-parser를 이용해 application/json 파싱
app.use(bodyParser.json())

// public 폴더를 serveStatic으로 오픈
app.use('/public', serveStatic(path.join(__dirname, 'public')));
if(process.env.NODE_ENV==='production'){
	app.use(helmet());
	app.use(hpp());
}
// cookie-parser 설정
app.use(cookieParser());

var client = redis.createClient();
app.use(expressSession(
    {
        secret: 'secret_key',
        store: new RedisStore({
            host: "20.194.38.172",
            port: 6379,
            client: client,
            prefix : "session:",
            db : 0
        }),
        saveUninitialized: false, // don't create session until something stored,
        resave: true // don't save session if unmodified
    }
));
// app.use(expressSession({
// 	secret:'my key',
// 	resave:true,
// 	saveUninitialized:true
// }));
//===== Passport 사용 설정 =====//
// Passport의 세션을 사용할 때는 그 전에 Express의 세션을 사용하는 코드가 있어야 함
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());


//라우팅 정보를 읽어들여 라우팅 설정
var router = express.Router();
route_loader.init(app, router);
require('dotenv').config();
var cors=require('cors');
app.use(cors());
// 패스포트 설정
var configPassport = require('./config/passport');
configPassport(app, passport);

// 패스포트 라우팅 설정
var userPassport = require('./routes/user_passport');
userPassport(router, passport);

var naverapi = require('./routes/naverAPI');
naverapi(router, passport);

// Layout 관련 라우터 -- 2021.07.11.
var renderRouter = require('./routes/route_loader');
var router = express.Router();
route_loader.init(app, router);

//===== 404 에러 페이지 처리 =====//
var errorHandler = expressErrorHandler({
 serveStatic: {
   '404': './public/404.html'
 }
});
router.get('/session/set/:value', function(req, res) {
    req.session.redSession = req.params.value;
    res.send('session written in Redis successfully');
});

app.get('/session/get/', function(req, res) {
    if(req.session.redSession)
        res.send('the session value stored in Redis is: ' + req.session.redSess);
    else
        res.send("no session value stored in Redis ");
});
app.use( expressErrorHandler.httpError(404) );
app.use( errorHandler );


//===== 서버 시작 =====//


//확인되지 않은 예외 처리 - 서버 프로세스 종료하지 않고 유지함
process.on('uncaughtException', function (err) {
	console.log('uncaughtException 발생함 : ' + err);
	console.log('서버 프로세스 종료하지 않고 유지함.');
	
	console.log(err.stack);
});

// 프로세스 종료 시에 데이터베이스 연결 해제
process.on('SIGTERM', function () {
    console.log("프로세스가 종료됩니다.");
    app.close();
});

app.on('close', function () {
	console.log("Express 서버 객체가 종료됩니다.");
	if (database.db) {
		database.db.close();
	}
});

// 시작된 서버 객체를 리턴받도록 합니다. 
var server = http.createServer(app).listen(app.get('port'), function(){
	console.log('서버가 시작되었습니다. 포트 : ' + app.get('port'));

	// 데이터베이스 초기화
	database.init(app, config);
   
});
