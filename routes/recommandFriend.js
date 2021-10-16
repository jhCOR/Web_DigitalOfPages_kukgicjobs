var sendRecommand = (req, res) => {
	console.log('book 모듈 안에 있는 sendRecommand 호출됨.');

	var friendEmail = req.body.friend || req.query.friend || req.params.friend;
	var recommandContent = req.body.content || req.query.content || req.params.content;
	var bookID = req.body.bookID || req.query.bookID || req.params.bookID;
	var email = req.body.request || req.query.request || req.params.request;
	
	var link;
	if(email){
		link='친구 추가 요청'
		friendEmail=email;
		recommandContent="친구 추가 요청입니다.";
		
	}
	
	console.log("POST:"+friendEmail+"/"+recommandContent+"/"+bookID+"/"+link);
	
	var database = req.app.get('database');
	if (database.db) {
			var message = new database.MessageModel({
				from:req.user.email,
				to:friendEmail,
				content:recommandContent,
				bookID:bookID,
				link:link,
			});
		
		message.savePost(function(err, result) {
				if(err) {
					console.error('응답 웹문서 생성 중 에러 발생 : ' + err.stack);
					printer.rendering(res,err);
					return;
				}
		
				console.log("recommanresult"+result);
			});
		res.send('전송 완료');
	} else {
		printer.errrendering(res);
	}
};
module.exports.sendRecommand = sendRecommand;
