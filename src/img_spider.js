const request = require('request')
const cheerio = require('cheerio')
const fs = require('fs');
const path = require('path')
const iconv = require('iconv-lite')

// http://search.dangdang.com/?key=python&act=input&show=big&page_index=

// 爬取目标的地址,尝试爬取100页,IP被封,只爬取了1500条数据
const targetUrl = `http://search.dangdang.com/?key=%BC%C6%CB%E3%BB%FA&act=input&page_index=`
//  &page_index=1
// let startPage = 0;
// let currentPage = 0;

// 修改循环中的参数可以爬取不同页面的图片
for (let currentPage = 0; currentPage < 5; currentPage++) {
    timer = setTimeout(function () {
        console.log(currentPage)
        getPageGoodsImg(currentPage)
    }, 20000)
}

function getPageGoodsImg(cPage) {
    request({
        encoding: null,
        url: targetUrl + `${cPage}`
    }, (err, res, body) => {
        // body为爬取的内容
        //提取需要的数据
        let html = iconv.decode(body, "gb2312")
        let $ = cheerio.load(html)
        let goodslist = [];
        $('#search_nature_rg ul li').each(async (idx, item) => {
            let $item = $(item)
            let imgurl = await $item.find('>a >img').attr('data-original') //src图片爬取不了
            // 爬取图片
            // 获取图片名称
            // http://img3m5.ddimg.cn/69/26/684451815-1_b_5.jpg
            // console.log(imgurl)
            const fileName = path.basename(imgurl)
            // 写入目录
            const downloadPath = path.join('./download/', fileName)
            // console.log('downloadPath', downloadPath)
            // 创建写入流
            const writerStream = fs.createWriteStream(downloadPath, {
                autoClose: true
            })
            // request爬取图片，返回文件流（文件的）
            // request('http://www.dangdang.com/'+imgurl).pipe(writerStream)
            try {
                request('http:' + imgurl).pipe(writerStream)
            } catch (error) {
                console.log(error)
            }
        })
    })
    clearTimeout(timer)
}




// JS实现休眠功能
// https://www.iteye.com/blog/epy-1950135