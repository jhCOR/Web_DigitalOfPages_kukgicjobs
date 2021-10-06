var printer = require("../utils/printer");
var saver = require("../utils/saver");

var sendMessage = (req, res)=> {//네이버 api 이용해서 책을 찾은 후에 저장?
	console.log('sendMessage 모듈 호출됨');

	var name = req.body.name || req.query.name;
	var email = req.body.email || req.query.email;
	var subject = req.body.subject || req.query.subject;
	var message = req.body.message || req.query.message;
	
	var database = req.app.get('database');
	
	// 데이터베이스 객체가 초기화된 경우
	database.UserModel.findByEmail(email, function(err, results) {
			
			if (err) {
                console.error('게시판 글 추가 중 에러 발생 : ' + err.stack);
               
                printer.errrendering(res,err);
                
                return;
            }

			if (results == undefined || results.length < 1) {
				
				res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
				res.write('<h2>사용자 [' + email + ']를 찾을 수 없습니다.</h2>');
				res.end();
						
				return;
			}
			
			var userObjectId;
			if (Array.isArray(results)) {
				userObjectId = results[0]._doc._id;
			} else {
				userObjectId = results._id;
			}
			
			var post = new database.BookPostModel({
				title: paramTitle,
				contents: paramContents,
				writer: userObjectId,
				bookinfo: bookInformation,
				group:req.user.group,
				range:range,
			});

			saver.saving(post,res,'/history/' + post._id);
			
		});

};
var showMessage = (req, res)=>{
	var paramId =  req.body.id || req.query.id || req.params.id;
		var database = req.app.get('database');
	
		database.BookPostModel.load(paramId, function (err, results) {

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
						title: '내 독서 기록 보기',
						post: results
					};
					console.log(results);
			   
				printer.rendering(req,res,'history/historyOfBook_show.ejs',context);	
				} else {
					res.writeHead('200', { 'Content-Type': 'text/html;charset=utf8' });
					res.write('<h2>글 조회  실패</h2>');
					res.end();
				}
			});
	}