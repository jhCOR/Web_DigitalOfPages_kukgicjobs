var saver = require("../utils/saver");
var printer = require("../utils/printer");
var requestFun=(req,res)=>{
	
 	var paramTitle = req.body.booktitle || req.query.booktitle;
    var paramContents = req.body.bookdescription || req.query.bookdescription;
	var paramAuthor = req.body.bookauthor || req.query.bookauthor;
	var paramWriter =req.user.email;

	var database = req.app.get('database');
	
	// 데이터베이스 객체가 초기화된 경우
	if (database.db) {
		
		if(req.isAuthenticated==false){
			return res.redirect('/'); 
		}

		// 1. 아이디를 이용해 사용자 검색
		database.UserModel.findByEmail(paramWriter, function(err, results) {
			if (err) {
                console.error('게시판 글 추가 중 에러 발생 : ' + err.stack);
                printer.errrendering(res,err);
                
                return;
            }

			if (results == undefined || results.length < 1) {
				res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
				res.write('<h2>사용자 [' + paramWriter + ']를 찾을 수 없습니다.</h2>');
				res.end();
				
				return;
			}
			
			var userObjectId = results[0]._doc._id;
			
			var book = new database.AppplyBookModel({
				title: paramTitle,
				contents: paramContents,
				user: userObjectId,
				author:paramAuthor,
				group:req.user.group,
			});
			
			book.savePost(function(err, result) {
				if (err) {
                    console.error('응답 웹문서 생성 중 에러 발생 : ' + err.stack);
                    printer.errrendering(res,err);

                    return;
                }
			   //console.log(result);
				
			    database.AppplyBookModel.load(result._id, function (err, results) {

					if(err) {
						console.log('error');
						console.error('게시판 글 조회 중 에러 발생 : ' + err.stack);

						printer.errrendering(res,err);

						return;
					}
					
				var context = {
					title: '신청 완료',
					bookTitle:results._doc.title,
					bookAuthor:results._doc.author,
					bookDescription:results._doc.contents,
					
				};
				printer.rendering(req,res,'applyBook.ejs',context);					
				});			
			});
		
		});
		
	} else {
		printer.errrendering(res);
	}
}
module.exports.requestFun = requestFun;