var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var recommend = require('../models/recommend');
var movie = require('../models/movie');
var article = require('../models/article');
var user = require('../models/user');

/* GET home page. */
router.get('/', function(req, res, next) {
	res.render('index', { title: 'Express' });
});

router.get('/showIndex', function(req, res, next) {
	recommend.findAll(function(err, getRecommend) {
		res.json({status: 0, message: "獲取推薦", data: getRecommend});
	})
});

router.get('/showRanking', function(req, res, next) {
	movie.find({movieMainPage: true}, function(err, getMovies) {
		res.json({status: 0, message: "獲取主頁", data: getMovies});
	});
});

router.get('/showArticle', function(req, res, next) {
	article.findAll(function(err, getArticles) {
		res.json({status: 0, message: "獲取主頁", data: getArticles});
	});
});

router.post('/articleDetail', function(req, res, next) {
	if (!req.body.article_id) {
		res.json({status: 1, message: "文章id出錯"});
	}

	article.findByArticleId(req.body.article_id, function(err, getArticle) {
		res.json({status: 0, message: "獲取成功", data: getArticle});
	});
});

router.post('/showUser', function(req, res, next) {
	if (!req.body.user_id) {
		res.json({status: 1, message: "用戶狀態出錯"});
	}

	user.findById(req.body.user_id, function(err, getUser) {
		res.json({status: 0, message: "獲取成功", data: {
			user_id: getUser._id,
			username: getUser.username,
			userMail: getUser.userMail,
			userPhone: getUser.userPhone,
			userStop: getUser.userStop	
		}});
	})
});

module.exports = router;
