var mongoose = require("../common/db");

var movie = new mongoose.Schema({
	movieName: String,
	movieImg: String,
	movieVideo: String,
	movieDownload: String,
	movieTime: String,
	movieNumSuppose: Number,
	movieNumDownload: Number,
	movieMainPage: Boolean
});

movie.statics.findById = function(id, callback) {
	this.findOne({_id: id}, callback);
};

movie.statics.findAll = function(callback) {
	this.find({}, callback);
};

var movieModel = mongoose.model('movie', movie);

module.exports = movieModel;
