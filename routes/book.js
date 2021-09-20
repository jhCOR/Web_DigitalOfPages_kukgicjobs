var Entities = require('html-entities').AllHtmlEntities;

const ROUTEFUNCTIONPATH = '../routeFunc';
var printer = require('../utils/printer');
var saver = require('../utils/saver');

var Borrow = require(ROUTEFUNCTIONPATH + '/borrow');
var AddReview = require(ROUTEFUNCTIONPATH + '/addReview');
var AddBook = require(ROUTEFUNCTIONPATH + '/addBook');

var RequestBook = require(ROUTEFUNCTIONPATH + '/requestBook');
var ShowBook = require(ROUTEFUNCTIONPATH + '/showBook');

var addbook = (req, res) => {
    console.log('book 모듈 안에 있는 addbook 호출됨.');

    AddBook.addBookFun(req, res, 'addBook');
};

var showbook = (req, res) => {
    console.log('book 모듈 안에 있는 showbook 호출됨.');
    if (req.user) ShowBook.showBookFun(req, res);
    else res.redirect('/login');
};

var borrow = function (req, res) {
    console.log('book 모듈 안에 있는 borrow 호출됨.');
    Borrow.borrowFun(req, res);
};

var addReview = function (req, res) {
    console.log('book 모듈 안에 있는 addReview 호출됨.');
    AddReview.addReviewFun(req, res);
};

var reservation = function (req, res) {
    //예약신청
    console.log('book 모듈 안에 있는 reservation 호출됨.');

    var paramId = req.body.id || req.query.id || req.params.id;
    var reserve = req.user.email;
    var database = req.app.get('database');

    if (database.db) {
        database.BookModel.findByIdAndUpdate(
            paramId,
            { $set: { num: '2', reservation: reserve } },
            function (err, result) {
                if (err) {
                    console.error('업데이트 중 에러 발생 : ' + err.stack);

                    printer.errrendering(res, err);

                    return;
                }

                res.redirect('/book/showbook/' + paramId);
            }
        );
    } else {
        printer.errrendering(res);
    }
};

var giveBack = function (req, res) {
    console.log('book 모듈 안에 있는 giveBack 호출됨.');

    var paramId = req.body.id || req.query.id || req.params.id;
    var user = req.user.email;
    var database = req.app.get('database');

    if (database.db) {
        database.BookModel.findByIdAndUpdate(paramId, { $set: { num: '0' } }, function (err) {
            if (err) {
                console.error('업데이트 중 에러 발생 : ' + err.stack);

                printer.errrendering(res, err);

                return;
            }
        });

        database.UserModel.load(user, function (err, results) {
            if (err) {
                console.error('게시판 글 추가 중 에러 발생 : ' + err.stack);
                printer.errrendering(res, err);

                return;
            }

            database.UserModel.findByIdAndUpdate(
                results._id,
                { $pull: { reservationlist: paramId } },

                function (err, results2) {
                    if (err) {
                        console.error('에러 발생 : ' + err.stack);
                        printer.errrendering(res, err);

                        return;
                    }
                    console.log(paramId + '/' + results2);
                }
            );
        });

        res.redirect('/views/myPage.ejs');
    } else {
        res.writeHead('200', { 'Content-Type': 'text/html;charset=utf8' });
        res.write('<h2>데이터베이스 연결 실패</h2>');
        res.end();
    }
};

var search = (req, res) => {
    console.log('book 모듈 안에 있는 search 호출됨.');
    const paramPage = req.body.page || req.query.page || '0';
    const search = req.body.search || req.query.search;
    const paramPerPage = 8;

    let page = 'lists/listbook';
    if (req.body.search) {
        var option = { group: req.user.group, title: new RegExp(search) };
        
    } else {
        var option = { title: new RegExp(search) };
    }

    const database = req.app.get('database');

    if (database.db) {
        // 1. 글 리스트
        var options = {
            page: paramPage,
            perPage: paramPerPage,
            criteria: option,
        };

        database.BookModel.searchList(options, (err, results) => {
            if (err) {
                console.error('게시판 글 목록 조회 중 에러 발생 : ' + err.stack);

                printer.errrendering(res, err);

                return;
            }

            if (results) {
                res.writeHead('200', { 'Content-Type': 'text/html;charset=utf8' });

                // 뷰 템플레이트를 이용하여 렌더링한 후 전송
                var context = {
                    title: '글 검색',
                    posts: results,
                    page: parseInt(paramPage),
                    pageCount: Math.ceil(results.length / paramPerPage),
                    perPage: paramPerPage,
                    totalRecords: results.length,
                    size: paramPerPage,
                    searchcontext: search,
                };

                printer.rendering(req, res, page, context);
            }
        });
    }
};

var searchGroup = (req, res) => {
    console.log('book 모듈 안에 있는 searchGroup 호출됨.');
    const paramPage = req.body.page || req.query.page || '0';
    const search = req.body.search || req.query.search;
    const paramPerPage = 8;

    let page = 'lists/listGroup';

    if (search) {
        var option = { group: new RegExp(search) };
    } else {
        var option = {};
    }
	console.log(search);
    const database = req.app.get('database');

    if (database.db) {
        // 1. 글 리스트
        var options = {
            page: paramPage,
            perPage: paramPerPage,
            criteria: option,
        };

        database.UserModel.list(options, (err, results) => {
            if (err) {
                console.error('게시판 글 목록 조회 중 에러 발생 : ' + err.stack);

                printer.errrendering(res, err);

                return;
            }

            if (results) {
                var groups = [];
                var num = 0;

                for (var i = 0; i < results.length; i++) {
                    if (!groups.includes(results[i]._doc.group)) {
                        groups[num] = results[i]._doc.group;
                        num++;
                    }
                }
                res.writeHead('200', { 'Content-Type': 'text/html;charset=utf8' });

                // 뷰 템플레이트를 이용하여 렌더링한 후 전송
                var context = {
                    title: '그룹 검색',
                    groupList: groups,
                    page: parseInt(paramPage),
                    pageCount: Math.ceil(results.length / paramPerPage),
                    perPage: paramPerPage,
                    totalRecords: results.length,
                    size: paramPerPage,
                    searchcontext: search,
                };

                printer.rendering(req, res, page, context);
            }
        });
    }
};
var acceptAdminRequest = function (req, res) {
    console.log('book 모듈 안에 있는 acceptAdminRequest 호출됨.');

    var paramId = req.body.id || req.query.id || req.params.id;
    var database = req.app.get('database');

    if (database.db) {
        database.UserModel.findByIdAndUpdate(paramId, { $set: { admin: 'accepted' } }, function (
            err,
            re
        ) {
            if (err) {
                console.error('업데이트 중 에러 발생 : ' + err.stack);
                printer.errrendering(res, err);

                return;
            }
        });

        res.redirect('/user/requestlist?page=0&perPage=2');
    } else {
        printer.errrendering(res);
    }
};

module.exports.addbook = addbook;
module.exports.showbook = showbook;
module.exports.borrow = borrow;
module.exports.reservation = reservation;
module.exports.addReview = addReview;
module.exports.giveBack = giveBack;
module.exports.search = search;
module.exports.acceptAdminRequest = acceptAdminRequest;
module.exports.searchGroup = searchGroup;