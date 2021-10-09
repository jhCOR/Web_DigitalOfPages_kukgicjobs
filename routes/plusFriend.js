var plusFriends = (req, res) => {
	console.log('book 모듈 안에 있는 plusFriends 호출됨.');

	var addfriend = req.body.addfriend || req.query.addfriend || req.params.addfriend;
	var database = req.app.get('database');
	if (database.db) {
		console.log('addfriend:' + addfriend);
		database.UserModel.find({ email: addfriend })
			.countDocuments()
			.exec(async function (err, count) {
				if (count > 0) {
					database.UserModel.findByIdAndUpdate(
						req.user._id,
						{ $addToSet: { friends: addfriend } },
						function (err, theresult) {
							if (err) {
								console.error('게시판 글 추가 중 에러 발생 : ' + err.stack);
								printer.errrendering(res, err);

								return;
							}
							console.log(theresult);
							var respond = {
								message: '성공적으로 추가되었습니다.',
								post: theresult,
							};
							res.send(respond);
						}
					);
				} else {
					var respond = {
						message: '친구 추가 실패',
						post: theresult,
					};
					res.send(respond);
				}
			});
	} else {
		printer.errrendering(res);
	}
};
module.exports.plusFriends = plusFriends;
