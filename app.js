// Session 미들웨어 불러오기
var expressSession = require('express-session');

const redis = require('redis');
const RedisStore=require('connect-redis')(expressSession);

//===== Passport 사용 =====//
var passport = require('passport');
@@ -27,11 +29,10 @@ var database = require('./database/database');

// 모듈로 분리한 라우팅 파일 불러오기
var route_loader = require('./routes/route_loader');

var cors=require('cors');
// 익스프레스 객체 생성
var app = express();


//===== 뷰 엔진 설정 =====//
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
@@ -53,15 +54,42 @@ app.use(bodyParser.json())
// public 폴더를 serveStatic으로 오픈
app.use('/public', serveStatic(path.join(__dirname, 'public')));


if(process.env.NODE_ENV==='production'){
	app.use(helmet());
	app.use(hpp());
}

// cookie-parser 설정
app.use(cookieParser(process.env.COOKIE_SECRET));
//const client = redis.createClient({ host: process.env.REDIS_HOST, port: process.env.REDIS_PORT, password: process.env.REDIS_PASSWORD, logError: true });
var client = redis.createClient();
app.use(expressSession(
    {
        secret: 'secret_key',
        store: new RedisStore({
            host: "https://osamhack2021-web-digitalofpages-kukgicjobs-wr7vrj57w2wvp-3000.githubpreview.dev/",
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

app.use(cors());

// cookie-parser 설정
app.use(cookieParser());

// 세션 설정
app.use(expressSession({
	secret:'my key',
	resave:true,
	saveUninitialized:true
}));



@@ -77,6 +105,17 @@ app.use(flash());
var router = express.Router();
route_loader.init(app, router);

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

// 패스포트 설정
var configPassport = require('./config/passport');
@@ -105,35 +144,6 @@ app.use( expressErrorHandler.httpError(404) );
app.use( errorHandler );


//===== 서버 시작 =====//

// var moment = require('moment'); 
// require('moment-timezone'); 
// moment.tz.setDefault("Asia/Seoul"); 
// var date = moment().format('YYYY-MM-DD HH:mm:ss');
// console.log(date);

// var cron = require('node-cron');

// var term= parseInt(returndate-date / 86400000);
// console.log(term);

// cron.schedule('* * 2 * * *', () => {

// 	var database = req.app.get('database');

// 	if(req.isAuthenticated()){

// 		if (database.db) {
// 			database.ReservationModel.loadAll(function(err, results) {

// 			});
// 		}	
// 	}

// });


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
