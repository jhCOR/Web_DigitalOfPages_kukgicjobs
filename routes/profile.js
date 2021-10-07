var filter = function(data,email,bookID){
	
	var filteredData=[];
	for(var i=0;i<data.review.length;i++){
		if(data.review[i].writer==email){
			data.review[i]._id=bookID;
			filteredData.push(data.review[i]);
			console.log(data.review[i]);
		}
		
			
	}
	 return filteredData;
}
var profile_review = (req, res) => {
    console.log('profile 모듈 안에 있는 profile 호출됨.');
     var database = req.app.get('database');
     database.ReviewModel.find({"review":{$elemMatch: {writer:req.user.email }}}).exec(async function (err, results) {
            if (err) {
                console.error('게시판 글 추가 중 에러 발생 : ' + err.stack);
                printer.errrendering(res, err);
        
                return;
            }
		 console.log("user_review:\n");
		
		 console.log(results[0].review);
		  console.log("filtered:\n");
		 var review_log=[];
		 for(var j=0;j<results.length;j++){
			 console.log("ID:"+results[j].bookID);
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
    console.log('profile 모듈 안에 있는 profile 호출됨.');
     var database = req.app.get('database');
     database.ReviewModel.find({"review":{$elemMatch: {writer:req.user.email }}}).exec(function (err, results) {
            if (err) {
                console.error('게시판 글 추가 중 에러 발생 : ' + err.stack);
                printer.errrendering(res, err);
        
                return;
            }
		 console.log("user_review:\n");
					  
		 console.log(results[0].review);
	}); 
};
module.exports.profile_review = profile_review;
module.exports.profile_bookLog = profile_bookLog;