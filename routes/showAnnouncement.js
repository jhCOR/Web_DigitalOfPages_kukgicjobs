var Entities = require('html-entities').AllHtmlEntities;

var saver = require("../utils/saver");
var printer = require("../utils/printer");

var showAnnounceFun=(req,res)=>{
	// URL 파라미터로 전달됨
	var paramId = req.body.id || req.query.id || req.params.id;
	currentId = paramId;
	var login = req.isAuthenticated();
    var userEmail=req.user.email;
	console.log('showAnnounceFun실행중');
	var database = req.app.get('database');
	if(req.isAuthenticated()){
		// 데이터베이스 객체가 초기화된 경우
		if (database.db) {
			// 1. 글 리스트

			database.AnnouncementModel.load(paramId, function (err, results) {

				if (err) {
					console.log('error');
					console.error('게시판 글 조회 중 에러 발생 : ' + err.stack);

					printer.errrendering(res,err);

					return;
				}
			
				if (results) {

					res.writeHead('200', { 'Content-Type': 'text/html;charset=utf8' });
					if(results===null){
						res.redirect('/');
					}

					// 뷰 템플레이트를 이용하여 렌더링한 후 전송
					var context = {
						title: '공지사항',
						posts: results,
						page: req.user.PreviousPage,
						login_success: login,
						user:userEmail,
						Entities: Entities
					};
					console.log("num:"+results);
					body = context;

					printer.rendering(req,res,'showAnnouncement.ejs',context);	
				} else {
					res.writeHead('200', { 'Content-Type': 'text/html;charset=utf8' });
					res.write('<h2>글 조회  실패</h2>');
					res.end();
				}
			});
		} else {

			printer.errrendering(res);
		}
	}else{
		alert("로그인을 해주십시오");
		res.redirect('/');
	
	}
}
module.exports.showAnnounceFun = showAnnounceFun;