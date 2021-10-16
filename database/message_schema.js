/**
 * 게시판을 위한 데이터베이스 스키마를 정의하는 모듈
 */

var utils = require('../utils/utils');

var SchemaObj = {};

SchemaObj.createSchema = function(mongoose) {
	
	// 글 스키마 정의
	var MessageSchema = mongoose.Schema({
		from: {type: String, trim:true, 'default': ''},
		to: {type: String, trim:true, 'default': ''},
		bookID: {type: mongoose.Schema.ObjectId, ref: 'book' },
	    content: { type: String, default: '' },
		link: { type: String, default: '' },
		isnew: { type: String, default: '0' },
		created_at: {type: Date, 'default': Date.now},
		updated_at: {type: Date, index: {unique: false}, 'default': Date.now}
	});
	MessageSchema.path('to').required(true, '저자를 입력하셔야 합니다.');
	MessageSchema.methods = {
		savePost: function(callback) {		// 글 저장
			var self = this;
			
			this.validate(function(err) {
				if (err) return callback(err);
				
				self.save(callback);
			});
		},
	}
	
	MessageSchema.statics = {
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
	
	console.log('MessageSchema 정의함.');

	return MessageSchema;
};

// module.exports에 PostSchema 객체 직접 할당
module.exports = SchemaObj;
