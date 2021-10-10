var loadmessage = (req, res) => {
    console.log('message 모듈 안에 있는 loadmessage 호출됨.');
     var database = req.app.get('database');
	
		database.MessageModel.find({to:req.user.email}).sort({'created_at': -1}).populate('bookID', 'title contents author').exec(function (err, result) {
		  if (err) {
                console.error('데이터 베이스 로드 중 중 에러 발생 : ' + err.stack);
                printer.errrendering(res, err);
        
                return;
            }
		console.log('messages:'+result);
			res.send(result);

	});
};
module.exports.loadmessage = loadmessage;
