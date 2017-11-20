/**
 * @author:huangjin
 * @parameter:
 * @description:
 * @Date:2017/11/18
 */
var db = require('./db');
var Pager = require('./pager')

function Music(obj) {
    this.id = obj.id || '';
    this.singer = obj.singer || '';
    this.song = obj.song || '';
    this.duration = obj.duration || '';
    this.keyword = obj.keyword || '';
    this.pageIndex = obj.pageIndex || 0;
    this.pageSize = obj.pageSize || 8;
}

Music.prototype = {
    constructor: Music,
    // 添加一首新歌曲
    addSong: function (callback) {
        db.query('INSERT INTO list (song,singer,duration) values (?,?,?)', [this.song, this.singer, this.duration], callback)
    },
    // 查询一首歌的信息
    querySong: function (callback) {
        db.query('SELECT * FROM list WHERE id = ?', [this.id], callback);
    },
    // 更新一条数据
    updateSong: function (callback) {
        db.query('UPDATE list SET song=?,singer=?,duration=? where id = ?', [this.song, this.singer, this.duration, this.id], callback);
    },
    // 获取播放链接
    getPlayLink: function (callback) {
        db.query('SELECT source FROM list where id = ?', [this.id], callback);
    },
    // 删除一首歌
    deleteSong: function (callback) {
        db.query('DELETE FROM list WHERE id = ?', [this.id], callback);
    }

}
// 查询计算全部数据分页总计数
Music.countTotalPage= function (callback) {
    db.query('SELECT count(*) as total FROM list', [], callback);
}
// 全部数据分页查询
Music.indexList = function (offset, pageSize, callback) {
    // 查这个对应页的数据
    db.query('SELECT * FROM list limit ?,?', [offset, pageSize], callback);
}

// 搜索结果记录分页总计数
Music.prototype.searchTotalPage= function (callback) {
    // 分页数
    db.query('SELECT count(*) as total FROM list WHERE song like ? OR singer like ?', [`%${this.keyword}%`, `%${this.keyword}%`], callback);
}
// 搜索结果分页查询
Music.prototype.searchList = function (offset, pageSize, callback) {
    // 查这个对应页的数据
    db.query('SELECT * FROM list WHERE song like ? OR singer like ? limit ?,?', [`%${this.keyword}%`,`%${this.keyword}%`,offset, pageSize], callback);
}
// 暴露数据对象，方便其他地方调用
module.exports = Music;