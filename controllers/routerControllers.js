/**
 * @author:huangjin
 * @parameter:
 * @description:
 * @Date:2017/11/18
 */
var express = require('express');
var Router = express.Router();
var Music = require('../models/music')

Router.get('/', function (req, res) {
    res.render('index', {showSearch: true,title:'歌曲列表'});
})
Router.get('/add', function (req, res) {
    res.render('add', {showSearch: false,title:'添加新歌曲'});
})
Router.get('/edit', function (req, res) {
    res.render('edit', {showSearch: false,title:'编辑歌曲信息'});
})
// 获取所有歌曲
Router.get('/allSongs', function (req, res) {
    // 默认查询第一页
    var params = {
        pageIndex: 0,
        pageSize: 8
    }
    var music = new Music(params);
    music.indexList(function (result) {
        return res.json({
            code: 200,
            data: result
        })
    })
})
Router.post('/search',function (req,res) {
    var params = {
        keyword:req.body.keyword
    }
    var music = new Music(params);
    music.search(function (result) {
        return res.json({
            code:200,
            data:result
        })
    })
})


module.exports = Router;
