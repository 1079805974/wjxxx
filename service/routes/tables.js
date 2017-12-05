var express = require('express');
var router = express.Router();
var connection = require('../utils/mysql');
var mysql = require('mysql');
var tables;
/*connection('SELECT name from forms', function (error, results, fields) {
  if (error) {
    console.log(error.toString())
  } else {
    tables=results
    console.log(JSON.stringify(results))
  }
})*/
/* GET users listing. */
router.post('/', function (req, res, next) {
  console.log(req.body)
  if (req.body.idOrName) {
    var idOrName = req.body.idOrName
  }
  connection('SELECT * from forms where name=? or uuid=?', [idOrName, idOrName], function (error, results1, fields) {
    if (error) {
      console.log(error.toString())
      res.send({status: 'Internal Error'})
      res.end()
    } else {
      console.log(JSON.stringify(results1))
      if (results1.length == 1) {
        console.log('password' + results1[0].password)
        if (req.body.password === results1[0].password) {
          res.send({FormData: results1[0].FormData, status: 'Success'})
          res.end()
        } else {
          res.send({status: 'Password Error'})
          res.end()
        }
      } else {
        res.send({status: 'Not Found'})
        res.end()
      }
    }
  })
  //let Form = '[{title: '1603校级及以上获奖情况统计', background: '', id: '10086110', theme: ''}, {type: 'input', note: '你的姓名', placeholder: '在此输入内容将修改背景文字', icon: 'fa fa-cube', min: 0, max: 0}, {type: 'radio', note: '性别', choices: ['男', '女', '其他']}, {type: 'checkBox', note: '喜欢的水果', choices: ['香蕉', '苹果', '小米'], min: 0, max: 2}]'
  // update forms set formdata="[{title: '1603校级 及以上获奖情况统计', background: '', id: '10086110', theme: ''}, {type: 'input', note: '你的姓名', placeholder: '在此输入内容将修改背景文字', icon: 'fa fa-cube', min: 0, max: 0}, {type: 'radio', note: '性别', choices: ['男', '女', '其他']}, {type: 'checkBox', note: '喜欢的水果', choices: ['香蕉', '苹果', '小米'], min: 0, max: 2}]" where id=1
});
router.post('/create', function (req, res, next) {
  var FormData = req.body.FormData
  var password = req.body.password
  var creator = req.body.username
  var name = req.body.name
  var uuid = '0'

})
router.post('/submit', function (req, res, next) {
  console.log(req.body)
  if (req.body) {

  }
})
router.post('/needPassword', function (req, res, next) {
  console.log(req.body)
  if (req.body.idOrName) {
    var idOrName = req.body.idOrName
  }
  connection('SELECT * from forms where name=? or uuid=?', [idOrName, idOrName], function (error, results1, fields) {
    if (error) {
      console.log(error.toString())
      res.send({status: 'Internal Error'})
      res.end()
    } else {
      if (results1.length == 1) {
        console.log(JSON.stringify(results1))
        if (results1[0].password == '')
          res.send({status: 'Success', needPassword: false})
        else {
          res.send({status: 'Success', needPassword: true})
        }
        res.end()
      } else if (results1.length == 0) {
        res.send({status: 'Not Found'})
        res.end()
      } else {
        res.send({status: 'Found Many', needPassword: false})
        res.end()
      }
    }
  })
})
router.post('/init', function (req, res, next) {

})
module.exports = router;
