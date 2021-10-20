/**
 * 게시판을 위한 데이터베이스 스키마를 정의하는 모듈
 */

var utils = require('../utils/utils');

var SchemaObj = {};

SchemaObj.createSchema = function(mongoose) {
	
	// 글 스키마 정의
	var ReviewSchema = mongoose.Schema({
		group: {type: String, trim:true, 'default': '알수없음'},
		isbn: {type: String, trim:true, 'default': ''},
		bookID: {type: mongoose.Schema.ObjectId},
	    review: [{	
			group: {type: String, trim:true, 'default': '알수없음'},// 리뷰
			contents: {type: String, trim:true, 'default': ''},				// 댓글 내용
			writer: {type: String, trim:true, 'default': ''},
			writername: {type: String, trim:true, 'default': ''},
			created_at: {type: Date, 'default': Date.now},
		}],
		created_at: {type: Date, 'default': Date.now},
		updated_at: {type: Date, index: {unique: false}, 'default': Date.now}
	});

	ReviewSchema.methods = {
		savePost: function(callback) {		// 글 저장
			var self = this;
			
			this.validate(function(err) {
				if (err) return callback(err);
				
				self.save(callback);
			});
		},
		addReview: function(user, comment, callback) {		// 댓글 추가
			this.review.push({
				contents: comment.contents,
				writer: user._id
			});
			
			this.save(callback);
		},
		removeReview: function(id, callback) {		// 댓글 삭제
			var index = utils.indexOf(this.review, {id: id});
			if (~index) {
				this.review.splice(index, 1);
			} else {
				return callback('ID [' + id + '] 를 가진 댓글 객체를 찾을 수 없습니다.');
			}
			this.save(callback);
		}
	}
	
	ReviewSchema.statics = {
		// ID로 글 찾기
		load: function(id, callback) {
			this.findOne({_id: id})
				.exec(callback);
		},
		loadByIsbn: function(isbn, callback) {
			this.find({isbn: isbn})
				.exec(callback);
		},
		
		searchList: function(options, callback) {
			var criteria = options.criteria || {};
			
			this.find(criteria)
				.sort({'created_at': -1})
				.limit(Number(options.perPage))
				.skip(options.perPage * options.page)
				.exec(callback);
		},
		list: function(options, callback) {
			var criteria = options.criteria || {};
			
			this.find(criteria)
				.sort({'created_at': -1})
				.limit(Number(options.perPage))
				.skip(options.perPage * options.page)
				.exec(callback);
		},

	}
	
	console.log('ReviewSchema 정의함.');

	return ReviewSchema;
};

// module.exports에 PostSchema 객체 직접 할당
module.exports = SchemaObj;
