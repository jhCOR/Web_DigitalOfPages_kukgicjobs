var loadmessage = (req, res) => {
    console.log('message 모듈 안에 있는 loadmessage 호출됨.');
     var database = req.app.get('database');
	
		database.MessageModel.find({to:req.user.email}).sort({'created_at': -1}).populate('bookID', 'title contents author').exec(function (err, result) {
		  if (err) {
                console.error('데이터 베이스 로드 중 중 에러 발생 : ' + err.stack);
                printer.errrendering(res, err);
        
                return;
            }
		
			res.send(result);

	});
};

var deletemessage = (req, res) => {
    console.log('message 모듈 안에 있는 deletemessage 호출됨.');
	var paramID=req.body.id || req.query.id|| req.params.id;
	
     var database = req.app.get('database');
	
		database.MessageModel.load(paramID,function (err, result) {
			console.log('messages:'+result);
		  if (err) {
                console.error('데이터 베이스 로드 중 중 에러 발생 : ' + err.stack);
                printer.errrendering(res, err);
        
                return;
            }
			
            if (result) {
                
                result.remove();
              
            }
		console.log('messages:'+result);
		// res.redirect('/user/profile_bookLog');

	});
};
module.exports.loadmessage = loadmessage;
module.exports.deletemessage = deletemessage;