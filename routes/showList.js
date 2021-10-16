const ROUTEFUNCTIONPATH = '../routeFunc';
var ListPost = require(ROUTEFUNCTIONPATH + '/listPost');
var printer = require('../utils/printer');
var saver = require('../utils/saver');

var listpost = (req, res) => {
    console.log('showList 모듈 안에 있는 listpost 호출됨.');

    ListPost.listPostFun(req, res);
};

var reservationList = function (req, res) {
    console.log('showList 모듈 안에 있는 reservationList 호출됨.');
	
    var user = req.user.email;
    var database = req.app.get('database');
 
    if (database.db) {
        database.UserModel.findOne({email:req.user.email}).populate('reservationlist', 'title author updated_at').exec(function (err, results) {
            if (err) {
                console.error('게시판 글 추가 중 에러 발생 : ' + err.stack);
                printer.errrendering(res, err);

                return;
            }
			console.log("myPage_rendering\n"+results);
            var context = {
                posts: results,
				login_success: true,
				admin:req.user.admin 
            };
                //res.redirect('/views/myPage?data=datas');
            printer.rendering(req, res, 'myPage.ejs', context,);
        });
    } else {
        printer.errrendering(res);
    }
};

var listapplybook = function (req, res) {
    console.log('showList 모듈 안에 있는 listapplybook 호출됨.');

    var paramPage = req.body.page || req.query.page || '0';
    var paramPerPage = 8;

    var database = req.app.get('database');

    // 데이터베이스 객체가 초기화된 경우
    if (database.db) {
        // 1. 글 리스트
        var options = {
            page: paramPage,
            perPage: paramPerPage,
            criteria: { group: req.user.group },
        };

        database.AppplyBookModel.list(options, function (err, results) {
            if (err) {
                console.error('게시판 글 목록 조회 중 에러 발생 : ' + err.stack);
                printer.errrendering(res, err);
                return;
            }

            if (results) {
                database.AppplyBookModel.find({ group: req.user.group }).count().exec(function (err, count) {
                    //count??
                    res.writeHead('200', { 'Content-Type': 'text/html;charset=utf8' });

                    // 뷰 템플레이트를 이용하여 렌더링한 후 전송
                    var context = {
                        title: '신청 목록',
                        posts: results,
                        page: parseInt(paramPage),
                        pageCount: Math.ceil(count / paramPerPage),
                        perPage: paramPerPage,
                        totalRecords: count,
                        size: paramPerPage,
						admin:req.user.admin
                    };

                    printer.rendering(req, res, 'lists/listApplyBook', context);
                });
            } else {
                res.writeHead('200', { 'Content-Type': 'text/html;charset=utf8' });
                res.write('<h2>글 목록 조회  실패</h2>');
                res.end();
            }
        });
    } else {
        printer.errrendering(res);
    }
};

var requestlist = function (req, res) {
    console.log('showList 모듈 안에 있는 requestlist 호출됨.');

    var paramPage = req.body.page || req.query.page || '0';
    var paramPerPage = 8;

    var database = req.app.get('database');

    // 데이터베이스 객체가 초기화된 경우
    if (database.db) {
        // 1. 글 리스트
        var options = {
            page: paramPage,
            perPage: paramPerPage,
            criteria: { admin: 'adminRequset' },
        };

        database.UserModel.list(options, function (err, results) {
            if (err) {
                console.error('게시판 글 목록 조회 중 에러 발생 : ' + err.stack);

                printer.errrendering(res, err);
                return;
            }

            if (results) {
                console.log(results);

                res.writeHead('200', { 'Content-Type': 'text/html;charset=utf8' });

                // 뷰 템플레이트를 이용하여 렌더링한 후 전송
                var context = {
                    title: '권한 요청',
                    posts: results,
                    page: parseInt(paramPage),
                    pageCount: Math.ceil(results.length / paramPerPage),
                    perPage: paramPerPage,
                    totalRecords: results.length,
                    size: paramPerPage,
                };

                printer.rendering(req, res, 'lists/listAdminRequest', context);
            } else {
                res.writeHead('200', { 'Content-Type': 'text/html;charset=utf8' });
                res.write('<h2>글 목록 조회  실패</h2>');
                res.end();
            }
        });
    } else {
        printer.errrendering(res);
    }
};

var listHistoryOfBook = function (req, res) {
    console.log('showList 모듈 안에 있는 listHistoryOfBook 호출됨.');

    var paramPage = req.body.page || req.query.page;
    var paramPerPage = 8;
	var range=req.body.range || req.query.range;
    var database = req.app.get('database');
	console.log(range);
	var options;

	
    // 데이터베이스 객체가 초기화된 경우
    if (database.db) {
        database.UserModel.findOne({email:req.user.email}, function (err, results) {
            if (err) {
                //err= new Error("의도적에러");
                console.error('게시판 글 추가 중 에러 발생 : ' + err.stack);

                printer.errrendering(res, err);

                return;
            }

            if (results == undefined || results.length < 1) {
                res.writeHead('200', { 'Content-Type': 'text/html;charset=utf8' });
                res.write('<h2>사용자 [' + paramWriter + ']를 찾을 수 없습니다.</h2>');
                res.end();

                return;
            }

            var userObjectId = results._id;
			options= { writer: userObjectId};
				if(range=="my"){
					options= { writer: userObjectId};
				}else if(range=="group"){
					options= { group: req.user.group,
							 	range:"그룹공개"};
				}else if(range=="all"){
					options= {$or: [{range:"전체공개" }, { range:"그룹공개"}]};
				} 
			//console.log(options);
            // 1. 글 리스트
            var options = {
                page: paramPage,
                perPage: paramPerPage,
                criteria: options,
            };

            database.BookPostModel.list(options, function (err, listresults) {
                if (err) {
                    console.error('게시판 글 목록 조회 중 에러 발생 : ' + err.stack);
                    printer.errrendering(res, err);
                    return;
                }
			database.BookPostModel.find(options).count().exec(function(err, count) {
				  if (listresults) {
                    res.writeHead('200', { 'Content-Type': 'text/html;charset=utf8' });
					//console.log(listresults);
                    // 뷰 템플레이트를 이용하여 렌더링한 후 전송
                    var context = {
                        title: '신청 목록',
                        posts: listresults,
                        page: parseInt(paramPage),
                        pageCount: Math.ceil(count / paramPerPage),
                        perPage: paramPerPage,
                        totalRecords: count,
                        size: paramPerPage,
                    };

                    printer.rendering(req, res, 'lists/listHistoryOfBook', context);
                } else {
                    res.writeHead('200', { 'Content-Type': 'text/html;charset=utf8' });
                    res.write('<h2>글 목록 조회  실패</h2>');
                    res.end();
                }
			});
              
            });
        });
    } else {
        printer.errrendering(res);
    }
};

var Announcement = function (req, res) {
    console.log('showList 모듈 안에 있는 Announcement 호출됨.');

    var paramPage = req.body.page || req.query.page || '0';
    var request =req.body.request || req.query.request || '0';
	var RIGHT;
	
	if(req.user.admin=='accepted'){
		RIGHT='admin';
	}
	var adminORdev;
	var file;
	if(request=='dev'){
		 console.log(request);
		adminORdev={ group: 'ROOT'}
		file = 'lists/listAnnouncement';
		
	}else{
		 console.log(request);
		adminORdev={ group: req.user.group}
		file = 'lists/listAnnouncement_admin';
	}
    var database = req.app.get('database');
	
    // 데이터베이스 객체가 초기화된 경우
    if (database.db) {       

            // 1. 글 리스트
            var options = {
                page: paramPage,
                perPage: 8,
				criteria: adminORdev,
            };

            database.AnnouncementModel.list(options, function (err, listresults) {
                if (err) {
                    console.error('게시판 글 목록 조회 중 에러 발생 : ' + err.stack);
                    printer.errrendering(res, err);
                    return;
                }
				console.log(listresults);
				database.AnnouncementModel.find({group:adminORdev.group}).count().exec(function(err, count) {
					if (listresults) {
						res.writeHead('200', { 'Content-Type': 'text/html;charset=utf8' });
						console.log(count);
						// 뷰 템플레이트를 이용하여 렌더링한 후 전송
						var context = {
							posts: listresults,
							page: parseInt(paramPage),
							pageCount: Math.ceil(count / 8),
							perPage: 8,
							totalRecords: count,
							size: 8,
							rootORadmin:RIGHT,
						};

						printer.rendering(req, res, file, context);
						
					} else {
						res.writeHead('200', { 'Content-Type': 'text/html;charset=utf8' });
						res.write('<h2>글 목록 조회  실패</h2>');
						res.end();
					}
				});
            });
        
    } else {
        printer.errrendering(res);
    }
};
module.exports.listpost = listpost;
module.exports.reservationList = reservationList;
module.exports.listapplybook = listapplybook;
module.exports.requestlist = requestlist;
module.exports.listHistoryOfBook = listHistoryOfBook;
module.exports.devAnnouncement = Announcement;