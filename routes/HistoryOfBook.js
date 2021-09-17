var saver = require("../utils/saver");
var printer = require("../utils/printer");

var addHistoryOfBook = (req, res)=> {//네이버 api 이용해서 책을 찾은 후에 저장?
	console.log('add book history');
 	console.log(req.body);
 	
    var paramContents = req.body.contents || req.query.contents;
	var paramWriter =req.user.email;
 	var book =req.body.book;
	
	// if(paramContents.length>10)
	// var paramContents=paramContents.substring(0,10);
	// else
	// var paramContents=paramContents;
	
	var paramTitle = req.body.title || req.query.title||paramContents.substring(0,10);
	var database = req.app.get('database');
	
	// 데이터베이스 객체가 초기화된 경우
	if (database.db) {

		database.UserModel.findByEmail(paramWriter, function(err, results) {
			
			if (err) {
				//err= new Error("의도적에러");
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
			
			var post = new database.BookPostModel({
				title: paramTitle,
				contents: paramContents,
				writer: userObjectId,
				bookinfo: book,
				group:req.user.group
			});

			post.savePost(function(err, result) {
				if (err) {

					printer.errrendering(res,err);
                    
					return;
			}
			   console.log(result);
				
			return res.redirect('/'); 
			});

			
		});
		
	} else {
		printer.errrendering(res);
	}
	
};
module.exports.addHistoryOfBook = addHistoryOfBook;
