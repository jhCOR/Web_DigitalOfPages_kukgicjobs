var insertAnnouncement = function (req, res) {
    console.log('index_supply 모듈 안에 있는 insertAnnouncement 호출됨.');

	var adminORdev;
	if(req.user){
		adminORdev={ group: req.user.group}
		
		var database = req.app.get('database');

		// 데이터베이스 객체가 초기화된 경우
		if (database.db) {       

				// 1. 글 리스트
				var options = {
					perPage: 3,
					criteria: adminORdev,
				};

				database.AnnouncementModel.list(options, function (err, listresults) {
					if (err) {
						console.error('게시판 글 목록 조회 중 에러 발생 : ' + err.stack);
						printer.errrendering(res, err);
						return;
					}
				
						if (listresults) {


							res.send(listresults);

						} else {
							res.writeHead('200', { 'Content-Type': 'text/html;charset=utf8' });
							res.write('<h2>글 목록 조회  실패</h2>');
							res.end();
						}

				});

		} else {
			printer.errrendering(res);
		}
	}else{
		res.send("");
	}
	
};

var insertNewBook = function (req, res) {
    console.log('index_supply 모듈 안에 있는 insertNewBook 호출됨.');

	var option;
	if(req.user){
		 option={ group: req.user.group}
		
		var database = req.app.get('database');

		// 데이터베이스 객체가 초기화된 경우
		if (database.db) {       

				// 1. 글 리스트
				var options = {
					perPage: 3,
					criteria: option,
				};

				database.BookModel.list(options, function (err, listresults) {
					if (err) {
						console.error('게시판 글 목록 조회 중 에러 발생 : ' + err.stack);
						printer.errrendering(res, err);
						return;
					}
						if (listresults) {


							res.send(listresults);

						} else {
							res.writeHead('200', { 'Content-Type': 'text/html;charset=utf8' });
							res.write('<h2>글 목록 조회  실패</h2>');
							res.end();
						}

				});

		} else {
			printer.errrendering(res);
		}
	}else{
		res.send("");
	}
	
};
module.exports.insertNewBook = insertNewBook;
module.exports.insertAnnouncement = insertAnnouncement;