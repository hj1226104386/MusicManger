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
        hbs:'../../lib/handlebars/handlebars-v4.0.11',
        paginator:'../../lib/paginator/bootstrap-paginator'
    },
    shim:{
        paginator:{
            deps:['jquery'],
            exports:'pagi'
        }
    }
});
require(['jquery','hbs','paginator'],function ($,hbs,paginator) {
    // 初始化paginator分页
    var options = {
        alignment: "center",//居中显示
        currentPage: 1,//当前页数pageIndex
        totalPages: '',//总页数 从后台获取
    itemTexts: function (type, page, current) {
        switch (type) {
            case "first":
                return "首页";
            case "prev":
                return "上一页";
            case "next":
                return "下一页";
            case "last":
                return "末页";
            case "page":
                return page;
        }
    },
    pageUrl: function (type, page, current) {
        return "javascript:;"
    },
    onPageClicked: function (event, originalEvent, type, page) {
        // 获取新一页的数据然后做展示
        renderList('/allSongs','get',{currentPage:page});
    }
}
    // 获取歌曲列表
    renderList('/allSongs','get',{currentPage:1});
    // 初始化
    setTimeout(function () {
        console.log('总页数：'+options.totalPages)
        $('#Pagintor').bootstrapPaginator(options);
    },100)

    // 播放音乐
    $('.song-list').on('click','.song-play',function () {
        var $id = $(this).parents('tr').attr('data-id');
        $.ajax({
            type:'get',
            url:'/playLink',
            dataType:'json',
            data:{id:$id},
            success:function (res) {
                console.log(res.data.source);
                // 给audio赋值
                $('#Audio').prop('src',res.data.source)
            }
        })
    })
    // 删除音乐
    $('.song-list').on('click','.song-delete',function () {
        var $this = $(this);
        var $id = $this.parents('tr').attr('data-id');
        $.ajax({
            type:'delete',
            url:'/deleteSong',
            dataType:'json',
            data:{id:$id},
            success:function (res) {
                if(res.code===200){
                    $this.parents('tr').remove();
                }
            }
        })
    })
    // 搜索音乐
    $('#Search').on('click',function () {
        var keyword = $('#Keyword').val();
        renderList('/search','post',{keyword})
    })

    // 渲染列表封装
    function renderList(url,type,data) {
        $.ajax({
            url:url,
            type:type,
            dataType:'json',
            data:data,
            success:function (res) {
                // 填充总页数
                options.totalPages = res.totalPage;
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
    // 初始化操作封装

})