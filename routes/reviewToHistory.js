var addReviewToHistoryOfBook=(req,res)=>{
	console.log('reviewToHistory 모듈 안에 있는 addReviewHistory 호출됨.');
 
    var paramId = req.body.id || req.query.id;
    var paramContents = req.body.contents || req.query.contents;
    var paramWriter = req.user.email;
	var Writer = req.user.name;
	var database = req.app.get('database');

	var database = req.app.get('database');
	
	// 데이터베이스 객체가 초기화된 경우
	if (database.db) {

		// 1. 아이디를 이용해 사용자 검색
		database.BookPostModel.findByIdAndUpdate(paramId,
            {'$push': {'review':{'contents':paramContents, 'writer':paramWriter, 'writername':Writer}}},
            {'new':true, 'upsert':true},
            function(err, results) {
                if (err) {
                    console.error('게시판 댓글 추가 중 에러 발생 : ' + err.stack);

                    res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
                    res.write('<h2>게시판 댓글 추가 중 에러 발생</h2>');
                    res.write('<p>' + err.stack + '</p>');
                    res.end();

                    return;
                }


                res.redirect('/history/' + paramId); 
        });
 
	} else {
		res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
		res.write('<h2>데이터베이스 연결 실패</h2>');
		res.end();
	}
}
var removeReviewHistory = function(req, res) {
	console.log('reviewToHistory 모듈 안에 있는 removeReviewHistory 호출됨.');
 	var paramId= req.body.content || req.query.content;
	var index= req.body.id || req.query.id;
	var commentId=req.body.delete || req.query.delete;
	var database = req.app.get('database');
 console.log(paramId);     
		if (database.db) {
			
			database.BookPostModel.load(paramId, function(err, results) {
				   console.log(commentId);     
            if (err) {
                console.log('삭제할 글 조회 중 오류 발생 ' + err.stack);

                res.writeHead('200', {'Contett-Type': 'text/html;charset =utf8'});
                res.write('<h2>삭제할 글 조회 중 오류 발생</h2>')
                res.end();

                return;
			}
			 console.log(results.review[index]);     
             if (results.review[index]) {
				
				results.review[index].remove();  

				database.BookPostModel.findByIdAndUpdate(paramId,{$set: results}, function(err,returnresult){
					if (err) {

						makeerror('<h2>업데이트 에러 발생</h2>', err.stack,res);
						return;
					}
					
					res.redirect('/history/' + paramId);
				});
        
            }
        })

    } else {
        res.writeHead('200', {
            'Content-Type': 'text/html;charset=utf8'
        });
        res.write('<h2>데이터베이스 연결 실패</h2>');
        res.end();
    }
}
module.exports.addReviewToHistoryOfBook = addReviewToHistoryOfBook;
module.exports.removeReviewHistory = removeReviewHistory;