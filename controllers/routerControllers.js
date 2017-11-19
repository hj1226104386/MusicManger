/**
 * @author:huangjin
 * @parameter:
 * @description:
 * @Date:2017/11/18
 */
var express = require('express');
var app = express();
var Router = express.Router();
var Music = require('../models/music');
var Pager = require('../models/pager');

Router.get('/', function (req, res) {
    res.render('index', {showSearch: true, title: '歌曲列表'});
})
Router.get('/add', function (req, res) {
    res.render('add', {showSearch: false, title: '添加新歌曲'});
})
Router.get('/edit', function (req, res) {
    var music = new Music({id: req.query.id});
    music.querySong(function (result) {
        if (result.length > 0) {
            var data = result[0];
            console.log(data)
            res.render('edit', {showSearch: false, title: '编辑歌曲信息', data});
        }
    })

})
// 获取所有歌曲
Router.get('/allSongs', function (req, res) {
    // 默认查询第一页
    var params = {
        pageIndex: req.query.currentPage,
        pageSize: 5
    }
    var music = new Music(params);
    music.countTotalPage(function (result) {
        // 获取总记录数
        var total = result[0].total;
        // 获取合计页数
        var totalPages = Math.ceil(total / params.pageSize);
        // 接下来查询数据
        var offset = (params.pageIndex - 1) * params.pageSize;
        music.indexList(offset, params.pageSize, function (result) {
            return res.json({
                code: 200,
                data: result,
                totalPage: totalPages
            })
        })
    })

})
Router.post('/search', function (req, res) {
    var params = {
        keyword: req.body.keyword
    }
    var music = new Music(params);
    music.search(function (result) {
        return res.json({
            code: 200,
            data: result
        })
    })
})
Router.post('/newSong', function (req, res) {
    var body = req.body;
    var params = {
        song: body.song,
        singer: body.singer,
        duration: body.duration
    };
    var music = new Music(params);
    music.addSong(function (result) {
        if (result.affectedRows === 1) {
            return res.render('index', {showSearch: false, title: '添加歌曲'})
        }
    })
})
Router.post('/updateSong', function (req, res) {
    var body = req.body;
    var params = {
        song: body.song,
        singer: body.singer,
        duration: body.duration,
        id: body.id
    }
    var music = new Music(params);
    music.updateSong(function (result) {
        if (result.affectedRows === 1) {
            res.render('index', {showSearch: true, title: '歌曲列表'})
        }
    })
})
// 获取播放链接
Router.get('/playLink', function (req, res) {
    var id = req.query.id;
    var music = new Music({id});
    music.getPlayLink(function (result) {
        return res.json({
            code: 200,
            data: result[0]
        })
    })
})
// 删除一首歌
Router.delete('/deleteSong', function (req, res) {
    var id = req.body.id;
    var music = new Music({id});
    music.deleteSong(function (result) {
        if (result.affectedRows === 1) {
            return res.json({
                code: 200,
                msg: '删除成功'
            })
        }
    })
})


module.exports = Router;
