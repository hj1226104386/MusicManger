/**
 * @author:huangjin
 * @parameter:
 * @description:
 * @Date:2017/11/18
 */
var express = require('express');
var Router = express.Router();
var config = require('../config/config'); // 配置项
var Music = require('../models/music'); // 音乐对象

Router.get('/', function(req, res) {
    res.render('index', { showSearch: true, title: '歌曲列表' });
})
Router.post('/test', function(req, res) {
    res.json({
        data: '啊哈哈'
    })
})
Router.get('/add', function(req, res) {
    res.render('add', { showSearch: false, title: '添加新歌曲' });
})
Router.get('/edit', function(req, res) {
        var music = new Music({ id: req.query.id });
        music.querySong(function(result) {
            if (result.length > 0) {
                var data = result[0];
                res.render('edit', { showSearch: false, title: '编辑歌曲信息', data });
            }
        })

    })
    // 获取所有歌曲
Router.get('/allSongs', function(req, res) {
    var currentPage = req.query.currentPage; // 当前页，从请求参数中获取
    Music.countTotalPage(function(result) {
        // 获取总记录数
        var total = result[0].total;
        // 获取合计页数
        var totalPages = Math.ceil(total / config.pageSize);
        // 接下来查询数据的起始数量
        var offset = (currentPage - 1) * config.pageSize;
        Music.indexList(offset, config.pageSize, function(result) {
            return res.json({
                code: 200,
                data: result,
                totalPage: totalPages
            })
        })
    })

})
Router.post('/search', function(req, res) {
    var params = {
        keyword: req.body.keyword,
        pageIndex: req.body.currentPage // 当前页，从请求参数中获取
    }
    var music = new Music(params);
    music.searchTotalPage(function(result) {
        // 获取总记录数
        var total = result[0].total;
        // 获取合计页数
        console.log(result)
        var totalPages = Math.ceil(total / config.pageSize);
        // 接下来查询数据的起始数量
        var offset = (music.pageIndex - 1) * config.pageSize;
        console.log(result)
        music.searchList(offset, config.pageSize, function(result) {
            console.log(result);
            return res.json({
                code: 200,
                data: result,
                totalPage: totalPages
            })
        })
    })
})
Router.post('/newSong', function(req, res) {
    var body = req.body;
    var params = {
        song: body.song,
        singer: body.singer,
        duration: body.duration,
        source: body.source
    };
    var music = new Music(params);
    music.addSong(function(result) {
        if (result.affectedRows === 1) {
            return res.render('index', { showSearch: true, title: '添加歌曲' })
        }
    })
})
Router.post('/updateSong', function(req, res) {
        var body = req.body;
        var params = {
            song: body.song,
            singer: body.singer,
            duration: body.duration,
            id: body.id
        }
        var music = new Music(params);
        music.updateSong(function(result) {
            if (result.affectedRows === 1) {
                res.render('index', { showSearch: true, title: '歌曲列表' })
            }
        })
    })
    // 获取播放链接
Router.get('/playLink', function(req, res) {
        var id = req.query.id;
        var music = new Music({ id });
        music.getPlayLink(function(result) {
            return res.json({
                code: 200,
                data: result[0]
            })
        })
    })
    // 删除一首歌
Router.delete('/deleteSong', function(req, res) {
    var id = req.body.id;
    var music = new Music({ id });
    music.deleteSong(function(result) {
        if (result.affectedRows === 1) {
            return res.json({
                code: 200,
                msg: '删除成功'
            })
        }
    })
})


module.exports = Router;