var filter = function(data,email,bookID){
	
	var filteredData=[];
	for(var i=0;i<data.review.length;i++){
		if(data.review[i].writer==email){
			data.review[i]._id=bookID;
			filteredData.push(data.review[i]);
			//console.log(data.review[i]);
		}
		
			
	}
	 return filteredData;
}
var profile_review = (req, res) => {
    console.log('profile 모듈 안에 있는 profile_review 호출됨.');
     var database = req.app.get('database');
	
	
     database.ReviewModel.find({"review":{$elemMatch: {writer:req.user.email }}}).exec(async function (err, results) {
            if (err) {
                console.error('게시판 글 추가 중 에러 발생 : ' + err.stack);
                printer.errrendering(res, err);
        
                return;
            }

		 var review_log=[];
		 for(var j=0;j<results.length;j++){
			 //console.log("ID:"+results[j].bookID);
			await review_log.push(...filter(results[j],req.user.email,results[j].bookID));
		 }
		  // console.log(review_log);
		 
		var sortedResult = review_log.sort(function (a, b) {
    	return a.created_at - b.created_at;
		});
		 
		 //console.log(sortedResult);
		 res.send(sortedResult);
	}); 
};

var profile_bookLog = (req, res) => {
    console.log('profile 모듈 안에 있는 profile_bookLog 호출됨.');
     var database = req.app.get('database');
     database.ReservationModel.find({user:req.user.email}).populate('bookInfo', 'title contents author').exec(async function (err, results) {
            if (err) {
                console.error('게시판 글 추가 중 에러 발생 : ' + err.stack);
                printer.errrendering(res, err);
        
                return;
            }
		 //console.log("user_bookLog:\n");
					  
		 //console.log("beforefiltering:"+results);
		 var filteredLog=[]
		await results.map((result)=>{if(result.bookInfo!=null){filteredLog.push(result);}});
		
		await res.send(filteredLog)
	}); 
};
var friend_profile_review = (req, res) => {
    console.log('profile 모듈 안에 있는 friend_profile_review 호출됨.');
     var database = req.app.get('database');
	var User=req.body.email || req.query.email|| req.params.email;
	
	database.UserModel.find({email:User},{_id:1, "friends":1}).exec( function (err, result) {
		  if (err) {
                console.error('데이터 베이스 로드 중 중 에러 발생 : ' + err.stack);
                printer.errrendering(res, err);
        
                return;
            }
	
			console.log("result.friends"+typeof result[0].friends);
		
		if(result[0].friends.includes(req.user.email)){
			
			database.ReviewModel.find({"review":{$elemMatch: {writer:User.trim() }}}).exec(async function (err, results) {
		 
            if (err) {
                console.error('데이터 베이스 로드 중 중 에러 발생 : ' + err.stack);
                printer.errrendering(res, err);
        
                return;
            }
		
		 var friend_review_log=[];
		 for(var j=0;j<results.length;j++){
			 //console.log("ID:"+results[j].bookID);
			await friend_review_log.push(...filter(results[j],User,results[j].bookID));
		 }
		 //console.log(friend_review_log);
		 
		var sortedFriendResult = friend_review_log.sort(function (a, b) {
    	return a.created_at - b.created_at;
		});
		 
		 res.send(sortedFriendResult);
		}); 
	}else{
		 res.send(['아직 친구가 아닙니다.']);
	}
	});
  
};
var friend_profile_bookLog = (req, res) => {
    console.log('profile 모듈 안에 있는 friend_profile_bookLog 호출됨.');
     var database = req.app.get('database');
	
	var User=req.body.email || req.query.email|| req.params.email;
		database.UserModel.find({email:User},{_id:0, "friends":1}).exec(async function (err, result) {
		  if (err) {
                console.error('데이터 베이스 로드 중 중 에러 발생 : ' + err.stack);
                printer.errrendering(res, err);
        
                return;
            }
		if(result[0].friends.includes(req.user.email)){
			 database.ReservationModel.find({user:User.trim()}).populate('bookInfo', 'title contents author').exec(async function (err, results) {
					if (err) {
						console.error('게시판 글 추가 중 에러 발생 : ' + err.stack);
						printer.errrendering(res, err);

						return;
					}
				 //console.log("user_bookLog:\n");

				 //console.log("beforefiltering:"+results);
				 var filteredLog=[]
				await results.map((result)=>{if(result.bookInfo!=null){filteredLog.push(result);}});

				await res.send(filteredLog);
			}); 
		}else{
			 res.send(['아직 친구가 아닙니다.']);
		}	
	});
};

var friend_list = (req, res) => {
    console.log('profile 모듈 안에 있는 friend_list 호출됨.');
     var database = req.app.get('database');
	
		database.UserModel.find({email:req.user.email},{_id:0, "friends":1}).exec(async function (err, result) {
		  if (err) {
                console.error('데이터 베이스 로드 중 중 에러 발생 : ' + err.stack);
                printer.errrendering(res, err);
			  
                return;
            }
			console.log("result:"+result);
			res.send(result);
	});
};
module.exports.profile_review = profile_review;
module.exports.friend_profile_review = friend_profile_review;
module.exports.profile_bookLog = profile_bookLog;
module.exports.friend_profile_bookLog = friend_profile_bookLog;
module.exports.friend_list = friend_list;