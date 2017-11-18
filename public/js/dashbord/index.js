/**
 * @author:huangjin
 * @parameter:
 * @description:
 * @Date:2017/11/18
 */
require.config({
    // baseUrl:'.src/', // 定义根路径
    paths:{ // 其他依赖模块的路径
        jquery:'../../lib/jQuery/jquery.min',
        hbs:'../../lib/handlebars/handlebars-v4.0.11'
    }
});
require(['jquery','hbs'],function ($,hbs) {
    // 获取所有歌曲列表
    renderList('/allSongs','get','')
    // 播放音乐
    $('.song-list').on('click','.song-play',function () {
        alert('播放音乐');
    })
    // 删除音乐
    $('.song-list').on('click','.song-delete',function () {
        alert('删除音乐');
    })
    // 删除音乐
    $('#Search').on('click',function () {
        var keyword = $('#Keyword').val();
        if(keyword){
            renderList('/search','post',{keyword})
        }else{
            alert('请输入搜索关键字');
        }
    })

    // 渲染列表封装
    function renderList(url,type,data) {
        $.ajax({
            url:url,
            type:type,
            dataType:'json',
            data:data,
            success:function (res) {
                //使用handlebars渲染列表
                var data = res.data;
                var list = ''
                for(var i = 0;i<data.length;i++){
                    var one = data[i]
                    list+=
                        `
                    <tr data-id='${one.id}'>
                        <td>${i+1}</td>
                        <td>${one.song}</td>
                        <td>${one.hot}</td>
                        <td>${one.duration}</td>
                        <td>${one.singer}</td>
                        <td>
                            <button type="button" class="btn btn-success btn-sm song-play">播放</button>
                            <a type="button" class="btn btn-info btn-sm song-add" href='/add?id=${one.id}'>添加</a>
                            <a type="button" class="btn btn-primary btn-sm song-edit" href='/edit?id=${one.id}'>编辑</a>
                            <button type="button" class="btn btn-warning btn-sm song-delete">删除</button>
                        </td>
                    </tr>
                    `
                }
                $('.song-list').html(list);
            }
        })
    }
})