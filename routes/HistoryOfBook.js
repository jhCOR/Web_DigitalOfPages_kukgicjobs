var saver = require("../utils/saver");
var printer = require("../utils/printer");
var showListModule = require('./showList');

var addHistoryOfBook = (req, res)=> {//네이버 api 이용해서 책을 찾은 후에 저장?
	console.log('HistoryOfBook 모듈 호출됨');

 	if(req.body){//post방식
		
	var paramContents = req.body.contents || req.query.contents||'0';
	var bookInformation = req.body.booktitle || req.query.booktitle;
	var paramTitle = req.body.title || req.query.title||paramContents.substring(0,10);
	var paramId =  req.body.id || req.query.id || req.params.id;
	
	}else{
		
	}
	var paramWriter =req.user.email;
	
	var database = req.app.get('database');
	
	// 데이터베이스 객체가 초기화된 경우

	
	var saveHistory = () =>{
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
				bookinfo: bookInformation,
				group:req.user.group
			});
			
			post.savePost(function(err, result) {
				if (err) {

				printer.errrendering(res,err);
				return;
				}
				var content={post:post}	
			  
				printer.rendering(req,res,'history/historyOfBook.ejs',content);	

			});
			
		});
	}
	
	var showHistory = ()=>{
			
		database.BookPostModel.load(paramId, function (err, results) {

				if (err) {
					console.log('error');
					console.error('게시판 글 조회 중 에러 발생 : ' + err.stack);

					printer.errrendering(res,err);

					return;
				}
				
				if (results) {

					// database.BookModel.incrHits(results._doc._id, function (err2, results2) {
					// 	console.log('incrHits executed.');

					// 	if (err2) {
					// 		console.log('incrHits 실행 중 에러 발생.');
					// 		console.dir(err2);
					// 		return;
					// 	}

					// });

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
			   
				printer.rendering(req,res,'history/historyOfBook.ejs',context);	
				} else {
					res.writeHead('200', { 'Content-Type': 'text/html;charset=utf8' });
					res.write('<h2>글 조회  실패</h2>');
					res.end();
				}
			});
	}
	if (database.db) {
	//console.log("paramContents:"+paramContents);
 	if(paramContents!='0'){

	saveHistory();
	}else if(paramId){
		showHistory();
		
	}else{
		
	}
		
		
	} else {
		printer.errrendering(res);
	}
};

var listHistoryOfBook =  (req, res)=>{
	showListModule.listHistoryOfBook(req, res);
}
module.exports.addHistoryOfBook = addHistoryOfBook;
module.exports.listHistoryOfBook = listHistoryOfBook;