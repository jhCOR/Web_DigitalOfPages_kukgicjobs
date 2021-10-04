var reviewAnalyzer = function(reviews) {
	console.log('post 모듈 안에 있는 styletransfer 실행');
	var sentence = reviews;
	
	const spawn = require('child_process').spawn;
	const result = spawn('python', ['reviewLstm.py',sentence]);

	result.stdout.on('data',function(data) {
		
		  console.log("DATA:"+data); 
		
	});
	
	
	result.stderr.on('data', function(data) {
		 console.log(data.toString()); 
		});
	
};
module.exports.reviewAnalyzer = reviewAnalyzer;