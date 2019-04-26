var express = require('express')
var ejs = require('ejs')
var bodyParser = require('body-parser')
var session = require('express-session')
var md5 = require('md5-node')
var DB= require('./modules/db.js')
var TOOL = require('./modules/tool.js')
var multiparty = require('multiparty')
var objectId=require('mongodb').ObjectID;
var fs = require('fs')

var app = new express()
//配置session中间件
app.set('trust proxy', 1) // trust first proxy
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge:1000*30*60 },
    rolling : true
}))
//配置ejs中间件
app.set('view engine','ejs')

//配置静态目录
app.use(express.static('public'))

//配置body-parser中间件，解析post请求
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

//自定义中间件
app.use(function (req, res,next) {
    if (req.url == '/login' || req.url == '/doLogin') {
        next()
    } else{
        if (req.session.userinfo && req.session.userinfo.username != '') {
            next()
        }else{
            res.redirect('/login')
        }
    }
})

app.get('/login',function (req, res) {
    res.render('login')
})

app.post('/doLogin',function (req, res) {

    //获取登录窗口的用户名和密码，密码在数据库中以MD5加密的形式存储
    var username = req.body.username.toString()
    var password = md5(req.body.password)
    DB.find('user',{username:username,password:password},function (docs) {
        if (docs && docs.length > 0) {
            console.log("登录成功")
            //将用户信息存储在session中
            req.session.userinfo = docs[0]
            //将session的内容暂存在全局变量app.locals中,为了让所有的界面都能读取该值
            app.locals['userinfo'] = req.session.userinfo
            res.redirect('/index')
        }else{
            res.send("<script>alert('登录失败');location.href='/login'</script>")
        }
    })
})


app.get('/index',function (req, res) {
    res.render('index')
})

app.get('/',function (req, res) {
    res.render('index')
})

app.get('/logout',function (req, res) {
    req.session.destroy(function (err) {
        if (err) {
            console.log(err)
        }else{
            client.close()
            res.redirect('/login')
        }
    })
})

app.get('/THData',function (req, res) {

    var result = DB.find('sensorData',{},function (data) {
        //初始化
        var temperature = []
        var humidy = []
        for (let i = 0; i <12; i++) {
            temperature[i] = 0;
            humidy[i] = 0;
        }

        for (let i = 0; i < data.length; i++) {
            TOOL.getHour(data[i].timestamp,function (hour) {
                //console.log(hour)
                temperature[parseInt(hour)%12]+=parseInt(data[i].temperature)/10;
                humidy[parseInt(hour)%12]+=parseInt(data[i].humidy)/10;
            })
        }
        //取整
        for (let i = 0; i < 12; i++) {
            temperature[i]=parseInt(temperature[i]);
            humidy[i]=parseInt(humidy[i]);
        }
        res.send({temperature:temperature,humidy:humidy})
    })
})



app.listen(8001,'0.0.0.0')
