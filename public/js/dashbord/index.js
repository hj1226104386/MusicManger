/**
 * @author:huangjin
 * @parameter:
 * @description:
 * @Date:2017/11/18
 */
require.config({
    // baseUrl:'.src/', // 定义根路径
    paths: { // 其他依赖模块的路径
        jquery: '../../lib/jQuery/jquery.min',
        hbs: '../../lib/handlebars/handlebars-v4.0.11',
        paginator: '../../lib/paginator/bootstrap-paginator'
    },
    shim: {
        paginator: {
            deps: ['jquery'],
            exports: 'pagi'
        }
    }
});
require(['jquery', 'hbs', 'paginator'], function ($, hbs, paginator) {
    // 初始化歌曲列表
    renderList('/allSongs', 'get', {currentPage: 1},true);

    // 播放音乐
    $('.song-list').on('click', '.song-play', function () {
        var $id = $(this).parents('tr').attr('data-id');
        $.ajax({
            type: 'get',
            url: '/playLink',
            dataType: 'json',
            data: {id: $id},
            success: function (res) {
                if(res.data.source){
                    // 给audio赋值
                    return $('#Audio').prop('src', res.data.source)
                }
                confirm('暂无播放链接');
            }
        })
    })
    // 删除音乐
    $('.song-list').on('click', '.song-delete', function () {
        var $this = $(this);
        var $id = $this.parents('tr').attr('data-id');
        $.ajax({
            type: 'delete',
            url: '/deleteSong',
            dataType: 'json',
            data: {id: $id},
            success: function (res) {
                if (res.code === 200) {
                    $this.parents('tr').remove();
                }
            }
        })
    })
    // 搜索音乐
    $('#Search').on('click', function () {
        var keyword = $('#Keyword').val();
        // 如果没有输入关键字，则搜索全部数据
        if(!keyword){
            renderList('/allSongs', 'get', {currentPage: 1},true);
        }else{
            renderList('/search', 'post', {keyword,currentPage: 1},true);
        }
    })

    // 渲染列表封装
    function renderList(url, method, params,ifInitPaginator) {
        $.ajax({
            url: url,
            type: method,
            dataType: 'json',
            data: params,
            success: function (res) {
                // 返回总页数
                var totalPage =  res.totalPage
                //使用handlebars渲染列表
                var data = res.data;
                var list = ''
                for (var i = 0; i < data.length; i++) {
                    var one = data[i]
                    list +=
                        `
                    <tr data-id='${one.id}'>
                        <td>${i + 1}</td>
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
                // 判断是否需要重新初始化分页
                if(ifInitPaginator){
                    // 初始化paginator分页
                    var options = {
                        alignment: "center",//居中显示
                        size:'small',
                        currentPage: 1,//默认当前页数pageIndex
                        totalPages: totalPage,//总页数 从后台获取
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
                            // 更新参数值，获取新一页的数据然后
                            params.currentPage = page;
                            renderList(url, method, params,false);
                        }
                    };
                    // 初始化
                    $('#Pagintor').bootstrapPaginator(options);
                }
            }
        })
    }

    // 初始化操作封装
    function initPaginator() {

    }
})