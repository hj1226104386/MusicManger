/**
 * @author:huangjin
 * @parameter:
 * @description:
 * @Date:2017/11/18
 */
var express = require('express');
var path = require('path');
var app = express();
var routers = require('./controllers/routerControllers');
var handlebars = require('express-handlebars');
var bodyParser = require('body-parser');
// 配置模板引擎
app.engine('hbs', handlebars({
    defaultLayout: 'main',
    extname:".hbs",
    layoutsDir:"views/layouts/", // 主体
    partialsDir:"views/partials/" // 模块
}));
app.set('view engine', 'hbs');

// 静态资源托管
app.use('/public', express.static('public'));

// 处理请求体
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))


// 加入路由中间件队列
app.use(routers)


// 开启服务监听
app.listen(3000, function () {
    console.log('服务启动啦，端口3000')
})