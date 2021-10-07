
/**
 * 게시판을 위한 데이터베이스 스키마를 정의하는 모듈
 */

var utils = require('../utils/utils');

var SchemaObj = {};

SchemaObj.createSchema = function(mongoose) {
	
	// 글 스키마 정의
	var GroupSchema = mongoose.Schema({		
		groupName: { type: String, default: '' },
		groupBookMax: { type: String, default: '7' },
		groupadmin: {type: mongoose.Schema.ObjectId, ref: 'user7'},				

	    created_at: {type: Date, index: {unique: false}, 'default': Date.now},
	    updated_at: {type: Date, index: {unique: false}, 'default': Date.now}
	});
	
	// 필수 속성에 대한 'required' validation
	
	GroupSchema.path('groupName').required(true, '저자를 입력하셔야 합니다.');
	// 스키마에 인스턴스 메소드 추가
	
	GroupSchema.methods = {
		savePost: function(callback) {		// 글 저장
			var self = this;
			
			this.validate(function(err) {
				if (err) return callback(err);
				
				self.save(callback);
			});
		},
		addComment: function(user, comment, callback) {		// 댓글 추가
			this.comment.push({
				contents: comment.contents,
				writer: user._id
			});
			
			this.save(callback);
		},
		removeComment: function(id, callback) {		// 댓글 삭제
			var index = utils.indexOf(this.comments, {id: id});
			if (~index) {
				this.comments.splice(index, 1);
			} else {
				return callback('ID [' + id + '] 를 가진 댓글 객체를 찾을 수 없습니다.');
			}
			
			this.save(callback);
		}
	}
	
	
	GroupSchema.statics = {
		// ID로 글 찾기
		load: function(id, callback) {
			this.findOne({_id: id})
				.populate('borrowUser', 'name group provider email')
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
        incrHits: function(id, callback) {
            var query = {_id: id};
            var update = {$inc: {hits:1}};
            var options = {upsert:true, 'new':true, setDefaultsOnInsert:true};
            
            this.findOneAndUpdate(query, update, options, callback);            
        }
	}
	
	console.log('GroupSchema 정의함.');

	return GroupSchema;
};

// module.exports에 PostSchema 객체 직접 할당
module.exports = SchemaObj;

