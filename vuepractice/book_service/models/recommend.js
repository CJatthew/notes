var mongoose = require('../common/db');

var recommend = new mongoose.Schema({
	recommendImg: String,
	recommendSrc: String,
	recommendTitle: String
});

recommend.statics.findByIndexId = function(m_id, callback) {
	this.find({findByIndexId: m_id}, callback);
};

recommend.statics.findAll = function(callback) {
	this.find({}, callback);
};

var recommendModel = mongoose.model('recommend', recommend);

module.exports = recommendModel;
