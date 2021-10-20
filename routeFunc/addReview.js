var addReviewFun=(req,res)=>{
	console.log('book 모듈 안에 있는 addReviewFun 호출됨.');
 
    var paramId = req.body.id || req.query.id;
    var paramContents = req.body.contents || req.query.contents;
    var paramWriter = req.user.email;
	var Writer = req.user.name;
	var database = req.app.get('database');
	// var grade = Lstm(paramContents.split("."));
	// console('grade:'+grade);
	
	if (database.db) {
			database.BookModel.load(paramId, function (err, results) {

				if (err) {
					console.log('error');
					console.error('게시판 글 조회 중 에러 발생 : ' + err.stack);
					printer.errrendering(res,err);

					return;
				}
				
				if (results) {

				
					if(results===null){
						res.redirect('/');
					}
					
					database.ReviewModel.findByIdAndUpdate(results.reviewID,{$set: {'bookID':paramId}},
					function(err, results) {
						if (err) {
							console.error('게시판 댓글 추가 중 에러 발생 : ' + err.stack);
							printer.errrendering(res,err);
							return;
						}
						
						
						
					 });
					
					database.ReviewModel.findByIdAndUpdate(results.reviewID,
					{'$push': {'review':{'contents':paramContents, 'writer':paramWriter, 'writername':Writer, 'group':req.user.group}}},
					{'new':true, 'upsert':true},
					function(err, results) {
						if (err) {
							console.error('게시판 댓글 추가 중 에러 발생 : ' + err.stack);
							printer.errrendering(res,err);
							return;
						}
						
						return res.redirect('/book/showbook/' + paramId); 
					 });
					
				} else {
					res.writeHead('200', { 'Content-Type': 'text/html;charset=utf8' });
					res.write('<h2>글 조회  실패</h2>');
					res.end();
				}
				
			});
		
 		
	} else {
		res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
		res.write('<h2>데이터베이스 연결 실패</h2>');
		res.end();
	}
}
module.exports.addReviewFun = addReviewFun;
