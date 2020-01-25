var express = require('express');
var router = express.Router();
var user = require('../models/user');
var crypto = require('crypto');
var movie = require('../models/movie');
var mail = require('../models/mail');
var comment = require('../models/comment');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

const init_token = "TKL02o";

router.post('/login', function(req, res, next) {
	if (!req.body.username) {
		res.json({status: 1, message: "用戶名爲空"});
	}

	if (!req.body.password) {
		res.josn({status: 1, message: "密碼爲空"});
	}

	user.findUserLogin(req.body.username, req.body.password, function(err, userSave) {
		if (userSave.length) {
			var token_after = getMD5Password(userSave[0]._id)
			res.json({status: 0, data: {token: token_after, user: userSave}, message: "用戶登錄成功"})
		} else {
			res.json({status: 1, message: "用戶名或者密碼錯誤"})
		}
	})
});

router.post('/register', function(req, res, next) {
	if (!req.body.username) {
		res.json({status: 1, message: "用戶名爲空"});
	}

	if (!req.body.password) {
		res.json({status: 1, message: "密碼爲空"});
	}

	if (!req.body.userMail) {
		res.json({status: 1, message: "用戶郵箱爲空"});
	}

	if (!req.body.userPhone) {
		res.json({status: 1, message: "用戶手機爲空"});
	}

	user.findByUsername(req.body.username, function(err, userSave) {
		if (userSave.length) {
			res.json({status: 1, message: "用戶已註冊"})
		} else {
			var registerUser = new user({
				username: req.body.username,
				password: req.body.password,
				uesrMail: req.body.userMail,
				userPhone: req.body.userPhone,
				userAdmin: 0,
				userPower: 0,
				userStop: 0
			})

			registerUser.save(function() {
				 res.json({status: 0, message: "註冊成功"});
			});
		}
	})		
});

router.post('postComment', function(req, res, next) {
	if (!req.body.username) {
		var username = "匿名用戶";
	}

	if (!req.body.movie_id) {
		res.json({status: 1, message: "電影id爲空"})
	}

	if (!req.body.context) {
		res.json({status: 1, message: "評論內容爲空"});
	}

	var saveComment = new comment({
		movie_id: req.body.movie_id,
		username: req.body.username ? req.body.username : username,
		context: req.body.context,
		check: 0
	});

	saveComment.save(function(err) {
		if (err) {
			res.json({status: 1, message: err});
		} else {
			res.json({status: 1, message: "評論成功"})
		}
	})
});

router.post('/support', function(req, res, next) {
	if (!req.body.movie_id) {
		res.json({status: 1, message: "電影id傳遞失敗"});
	}

	movie.findById(req.body.movie_id, function(err, supportMovie) {
		movie.update({_id: req.body.movie_id}, {movieNumSuppose: supportMovie.movieNumSuppose + 1}, function(err) {
			if (err) {
				res.json({status: 1, message: "點贊失敗", data: err});
			}

			res.json({status: 0, message: "點贊成功"});
		});
	})
});

router.post('/findPassword', function(req, res, next) {
	if (req.body.repassword) {
		if (req.body.token) {
			if (!req.body.user_id) {
				res.json({ status: 1, message: "用戶登錄錯誤"});
			}

			if (!req.body.password) {
				res.json({ status: 1, message: "用戶老密碼錯誤"});
			}

			if (req.body.token == getMD5Password(req.body.user_id)) {
				user.fineOne({_id: req.body.user_id, password: req.body.password}, function(err, checkUser) {
					if (checkUser) {
						user.update({_id: req.body.user_id}, { password: req.body.repassword}, function(err, userUpdate) {
							if (err) {
								res.json({status: 1, message: "更改錯誤", data: err});
							}

							res.json({status: 0, message: "更改成功", data: userUpdate})
						})
					} else {
						res.json({status: 1, message: "用戶老密碼錯誤"})
					}
				});
			} else {
				res.json({status: 1, message: "用戶登錄錯誤"});
			}
		} else {
			user.findUserPassword(req.body.username, req.body.userMail, req.body.userPhone, function(err, userFound) {
				if (userFound.length) {
					user.update({_id: userFound[0]._id}, {password: req.body.repassword}, function(err, userUpdate) {
						if (err) {
							res.json({status: 1, message: "更改錯誤", data: err});
						}

						res.json({status: 1, message: "更改成功", data: userUpdate});
					});
				} else {
					res.json({status: 1, message: "信息錯誤"})
				}
			})
		}
	} else {
		if (!req.body.username) {
			res.json({status: 1, message: "用戶名稱爲空"});
		}

		if (!req.body.userMail) {
			res.json({status: 1, message: "用戶郵箱爲空"});
		}

		if (!req.body.userPhone) {
			res.json({status: 1, message: "用戶手機爲空"});
		}

		user.findUserPassword(req.body.username, req.body.userMail, req.body.userPhone, function(err, userFound) {
			if (userFound.length) {
				res.json({status: 0, message: "驗證成功，請修改密碼", data: {
					username: req.body.username,
					userMail: req.body.userMail,
					userPhone: req.body.userPhone
				}});
			} else {
				res.json({status: 1, message: "信息錯誤"});
			}
		})
	}
});

router.post('/download', function(req, res, next) {
	if (!req.body.movie_id) {
		res.json({status: 1, message: "電影Id傳遞失敗"})
	}

	movie.findById(req.body.movie_id, function(err, supportMovie){
		movie.update({_id: req.body.movie_id}, {movieNumDownload: supportMovie.movieNumDownload + 1}, function(err) {
			if (err) {
				res.json({status: 1, message: "下載失敗", data: err});
			}

			res.json({status: 0, message: "下載成功", data: supportMovie.movieDownload});
		})
	});
});

router.post('/sendEmail', function(req, res, next) {
	if (!req.body.token) {
		res.json({status: 1, message: "用戶登錄狀態錯誤"});
	}

	if (!req.body.user_id) {
		res.json({status: 1, message: "用戶登錄狀態出錯"});
	}

	if (!req.body.toUserName) {
		res.json({status: 1, message: "未選擇相關用戶"})
	}

	if (!req.body.title) {
		res.json({status: 1, message: "標題不能爲空"})
	}

	if (!req.body.context) {
		res.json({status: 1, message: "內容不能爲空"});
	}

	if (req.body.token == getMD5Paddword(req.body.user_id)) {
		user.findByUsername(req.body.toUserName, function(err, toUser) {
			if (toUser.length) {
				var NewEmail = new mail({
					fromUser: req.body.user_id,
					toUser: toUser[0]._id,
					title: req.body.title,
					context: req.body.contex
				});

				NewEmail.save(function() {
					res.json({status: 0, message: "發送成功"});
				});
			}
		})
	} else {
		res.json({status: 1, message: "用戶登錄錯誤"});
	}
});

router.post('/showEmail', function(req, res, next) {
	if (!req.body.token) {
		res.json({status: 1, message: "用戶登錄狀態錯誤"});
	}

	if (!req.body.user_id) {
		res.json({status: 1, message: "用戶登錄狀態出錯"});
	}

	if (!req.body.receive) {
		res.json({status: 1, message: "參數出錯"});
	}

	if (req.body.token == getMD5Password(req.body.user_id)) {
		if (req.body.receive == 1) {
			mail.findByFromUserId(req.body.user_id, function(err, sendMail) {
				res.json({status: 0, message: "獲取成功", data: sendMail});
			});
		} else {
			mail.findByToUserId(req.body.user_id, function(err, receiveMail) {
				res.json({status: 0, message: "獲取成功", data: receiveMail})
			});
		}
	} else {
		res.json({status: 1, message: "用戶登錄錯誤"});
	}
});

function getMD5Password(id) {
	var md5 = crypto.createHash('md5');
	var token_before = id + init_token;

	return md5.update(token_before).digest('hex');
}

module.exports = router;
