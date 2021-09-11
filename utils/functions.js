var addbook = (req, res) => {console.log('book 모듈 안에 있는 addbook 호출됨.');
 
    const paramContents = req.body.contents || req.query.contents;
	const paramWriter =req.user.email;
	const paramTitle = req.body.title || req.query.title;
	const paramAuthor = req.body.author || req.query.author;

	var database = req.app.get('database');
	
	// 데이터베이스 객체가 초기화된 경우
	if (database.db) {
		if(req.isAuthenticated==false){
			return res.redirect('/'); 
		}
		if(paramTitle==null||paramContents==null){
			return res.redirect('/book/listpost?page=0&perPage=8'); 
		}
		// 1. 아이디를 이용해 사용자 검색
		database.UserModel.findByEmail(paramWriter, function(err, results) {
			if (err) {
                console.error('게시판 글 추가 중 에러 발생 : ' + err.stack);
                res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
				res.write('<h2>게시판 글 추가 중 에러 발생</h2>');
                res.write('<p>' + err.stack + '</p>');
				res.end();
                
                return;
            }

			if (results == undefined || results.length < 1) {
				res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
				res.write('<h2>사용자 [' + paramWriter + ']를 찾을 수 없습니다.</h2>');
				res.end();
				
				return;
			}
			
			var userObjectId = results[0]._doc._id;
			

			var book = new database.BookModel({
				title: paramTitle,
				contents: paramContents,
				writer: userObjectId,
				which : paramWriter,
				author:paramAuthor,
				num: '0',
				group:req.user.group,
			});

			book.savePost(function(err, result) {
				if (err) {
                    
                        console.error('응답 웹문서 생성 중 에러 발생 : ' + err.stack);

                        res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
                        res.write('<h2>응답 웹문서 생성 중 에러 발생</h2>');
                        res.write('<p>' + err.stack + '</p>');
                        res.end();

                        return;
                    
                }
			   console.log(result);
			    return res.redirect('/book/showbook/' + book._id); 
			});
			
		});
		
	} else {
		res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
		res.write('<h2>데이터베이스 연결 실패</h2>');
		res.end();
	} }; 

module.exports.addbookFunc = addbook;