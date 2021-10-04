var printer = require("../utils/printer");
var saver = require("../utils/saver");

const ROUTEFUNCTIONPATH="../routeFunc";

var ModifyUser = require(ROUTEFUNCTIONPATH+"/modifyUser");

var adminpage =async function(req, res) {
	console.log('user_admin 모듈 안에 있는 adminpage 호출됨.');

	var database = req.app.get('database');
	var listObject=[];
	var listCount=[];
	listObject.push({group:req.user.group});
	listObject.push({num:'1'});
	if (database.db) {
		var today=new Date();
		if(today.getDay()>14){
			today.setDate(today.getDate()-14);
		}else{
			var minus=14-today.getDate();
			console.log("data:"+today.getDate());
			console.log("month:"+today.getMonth());
			var setToday = today.setMonth(today.getMonth()-1);
			var setToday2 = today.setDate(-1);
			console.log(today);
			today.setDate(today.getDate()-minus);
			console.log("set:"+today);
		}
			
		// await database.BookModel.find({updated_at:{$gte:"2021-09-3T14:00:35.386Z"}}).countDocuments().exec(function(err, count) {
				
		// // 뷰 템플레이트를 이용하여 렌더링한 후 전송
		// console.log("0:"+count);
		// listCount.push(count);

		// });
		
		database.UserModel.find({group:req.user.group}).countDocuments().exec(async function(err, count) {
				
		// 뷰 템플레이트를 이용하여 렌더링한 후 전송
		console.log("1:"+count);
		listCount.push(count);
			await database.BookModel.find({group:req.user.group}).countDocuments().exec(function(err, count) {
			console.log("2:"+count);	
			// 뷰 템플레이트를 이용하여 렌더링한 후 전송
			listCount.push(count);
				database.BookModel.find({num:'1'}).countDocuments().exec(async function(err, count) {
				console.log("3:"+count);		
				// 뷰 템플레이트를 이용하여 렌더링한 후 전송
				await listCount.push(count);
					database.BookModel.load4({group:req.user.group}, async function(err, result) {
						
						var context = {
							totalUser:listCount[0],
							totalbook:listCount[1],
							borrowedbook:listCount[2],
							books:result
						};
						
						res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
						await printer.rendering(req,res,'adminPage.ejs',context);
					});
					
				});
			});
		});
		
		
			
		
	} else {
		printer.errrendering(res);
	}
	
};
var searchadminpage =async function(req, res) {
	console.log('user_admin 모듈 안에 있는 searchadminpage 호출됨.');
	var searchquery=req.body.search || req.query.search || req.params.search;
		var database = req.app.get('database');

	console.log('searchquery'+searchquery);
	if(searchquery==0||searchquery==1){
		var option = {  num:"1",group: req.user.group, };
		if (database.db) {
		database.BookModel.find(option, async function(err, result) {
		
			
		var context = {
			books:result
		};
						
		
		res.send(result);
			
		});
		
		} else {
			printer.errrendering(res);
		}
	}else if(searchquery==2){
		var option = { group: req.user.group };
		if (database.db) {
		database.UserModel.load4(option, async function(err, result) {
			
		console.log("re-->"+result[0]);	
			
		var context = {
			users:result
		};
						
		
		res.send(result);
			
		});
		}
	}
};
module.exports.adminpage = adminpage;
module.exports.searchadminpage = searchadminpage;
