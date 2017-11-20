/**
 * @author:huangjin
 * @parameter:
 * @description:
 * @Date:2017/11/18
 */
var mysql = require('mysql');
var pool = mysql.createPool({
    connectionLimit : 10,
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'music'
});
// 封装导出数据库查询函数
module.exports.query = function (sql, params, callback) {
    pool.getConnection(function (error, connection) {
        // Use the connection
        connection.query(sql, params, function (error, results, fields) {
            // 错误捕捉
            console.log(error)
            if (error) throw error;
            console.log('执行的sql为：' + sql, ',参数为：' + params)
            // 传入回调函数,真正的操作在回调中
            callback(results)
            // 释放连接
            connection.release();
            // Don't use the connection here, it has been returned to the pool.
        });
    });
};
