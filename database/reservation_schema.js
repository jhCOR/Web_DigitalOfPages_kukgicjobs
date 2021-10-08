var utils = require('../utils/utils');

var SchemaObj = {};

SchemaObj.createSchema = function(mongoose) {
	
	// 대출 관리 모듈
	var ReservationSchema = mongoose.Schema({	
		bookInfo: {type: mongoose.Schema.ObjectId, ref: 'book'},
		user: {type: String, trim:true, 'default': ''},
		userId: {type: mongoose.Schema.ObjectId, ref: 'user7'},
		created_at: {type: Date, index: {unique: false}, 'default': Date.now},
		group: {type: String, index: 'hashed', 'default':''}
	});

	ReservationSchema.methods = {
		savePost: function(callback) {	
			var self = this;
			
			this.validate(function(err) {
				if (err) return callback(err);
				
				self.save(callback);
			});
		},
	}
	
	ReservationSchema.statics = {
		load: function(id, callback) {
			this.findOne({_id: id})
				.populate('bookInfo', 'title contents author')
				.exec(callback);
		},
		loadAll: function( callback) {
			this.find()
				.populate('bookInfo', 'title contents author')
				.exec(callback);
		},
		list: function(options, callback) {
			var criteria = options.criteria || {};
			
			this.find(criteria)
				.populate('bookInfo', 'title contents author')
				.sort({'created_at': -1})
				.limit(Number(options.perPage))
				.skip(options.perPage * options.page)
				.exec(callback);
		},

	}
	
	console.log('ReservationSchema 정의함.');
	return ReservationSchema;
};
module.exports = SchemaObj;

