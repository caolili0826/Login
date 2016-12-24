/**
 * Created by 15366 on 2016/12/24.
 */
/**
 * 注册登录的实战
 *1.get方法访问 /signup ，返回一个空白注册表单，有用户名和密码两个字段
 * 2.当以post方式提交注册表单，服务器要保存这个用户，保存完成跳转登录页
 * 3.get方式访问、signin时候，返回一个空白登录表单，有用户和密码两个字段
 * 4.再次以post提交登录表单，判断输入用户名和密码是否匹配
 * 如果匹配的话跳到欢迎页，如果没有匹配，退回登录页，继续填写
 * */
var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var users = [];
app.use(bodyParser.urlencoded({extended:true}));
//设置模板引擎 ejs
app.set('view engine','ejs');
app.set('views',path.resolve('views'));
app.use(express.static(path.join(__dirname,'public')));
//注册
app.get('/signup',function (req,res) {
    res.render('signup',{title:"注册"});
});
app.post('/signup',function (req,res) {
    users.push(req.body);
    res.redirect('/signin');
});
app.get('/signin',function (req,res) {
    res.render('signin',{title:"登录"});
});
app.post('/signin',function (req,res) {
    var user = req.body;
    if(users.length){
        var curUser = users.find(function (item) {
            return item.username == user.username && item.password == user.password;
        });
        if(curUser){
            res.redirect('/welcome');
        }else{
            res.redirect('/signin');
        }
    }else{
        res.redirect('/signup');
    }
});
app.get('/welcome',function (req,res) {
    res.render('welcome',{title:"欢迎页面"});
});
/*
//登录

//欢迎页
app.get('/welcome');*/

app.listen(8070);