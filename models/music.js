/**
 * @author:huangjin
 * @parameter:
 * @description:
 * @Date:2017/11/18
 */
var db = require('./db');
function Music(obj) {
    this.id = obj.id || '';
    this.singer = obj.singer || '';
    this.keyword = obj.keyword || '';
    this.pageIndex = obj.pageIndex || 0;
    this.pageSize = obj.pageSize || 8;
}

Music.prototype = {
    constructor:Music,
    // 查询所有歌曲
    indexList:function (callback) {
        db.query('SELECT * FROM list limit ?,?',[this.pageIndex,this.pageSize],callback)
    },
    search:function (callback) {
        db.query('SELECT * FROM list WHERE song like ? OR singer like ?',[`%${this.keyword}%`,`%${this.keyword}%`],callback)
    }
}

// 暴露数据对象，方便其他地方调用
module.exports = Music;