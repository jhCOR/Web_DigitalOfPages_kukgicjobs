var saver = require("../utils/saver");
var printer = require("../utils/printer");

var listPostFun=(req,res)=>{
	var paramPage = req.body.page || req.query.page||'err';
	var paramPerPage = 8
	
	// req.body.perPage || req.query.perPage;
	
	var database = req.app.get('database');

    // 데이터베이스 객체가 초기화된 경우
	if (database.db) {
		// 1. 글 리스트
		var options = {
			page: paramPage,
			perPage: paramPerPage,
			criteria:{group:req.user.group},
		}
		
		database.BookModel.list(options, function(err, results) {
			if (err) {
                console.error('게시판 글 목록 조회 중 에러 발생 : ' + err.stack);
                
                printer.errrendering(res,err);
                
                return;
            }
			console.log(results[0]);
			if (results) {
				
				for(var i=0;i<results.length;i++){
					if(results[i].writer==null){
						;
						results[i].writer={name:'(알수없음)',email:'unknown'};}
				}
				// 전체 문서 객체 수 확인
				database.BookModel.find({group:req.user.group}).countDocuments().exec(function(err, count) {

					res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
					
					// 뷰 템플레이트를 이용하여 렌더링한 후 전송
					var context = {
						title: '글 목록',
						posts: results,
						page: parseInt(paramPage),
						pageCount: Math.ceil(count / paramPerPage),
						perPage: paramPerPage, 
						totalRecords: count,
						size: paramPerPage,
					
					};
					currentPage=context.page;
					req.session.passport.user.PreviousPage = context.page;
					req.session.save();
					
					body=context;
				
				printer.rendering(req,res,'lists/listbook.ejs',context);
				});
				
			} else {
				res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
				res.write('<h2>글 목록 조회  실패</h2>');
				res.end();
			}
		});
	} else {
		res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
		res.write('<h2>데이터베이스 연결 실패</h2>');
		res.end();
	}
}
module.exports.listPostFun = listPostFun;