var readuser = (req, res) => {
    console.log('whoelseread 모듈 안에 있는 readuser 호출됨.');
	var paramID=req.body.bookID || req.query.bookID|| req.params.bookID;
     var database = req.app.get('database');
     database.ReservationModel.find({group:req.user.group, bookInfo:paramID}).populate('userId', 'email name').exec(function (err, results) {
            if (err) {
                console.error('게시판 글 추가 중 에러 발생 : ' + err.stack);
                printer.errrendering(res, err);
        
                return;
            }
		console.log(results);
		res.send(results);
	}); 
};
module.exports.readuser = readuser;