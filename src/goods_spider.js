const request = require('request')
const cheerio = require('cheerio')
const mysql = require('./sql/db')
const fs = require('fs');
const path = require('path')
const iconv = require('iconv-lite')
const uuid = require('uuid')

// http://search.dangdang.com/?key=python&act=input&show=big&page_index=

// 爬取目标的地址,尝试爬取100页,IP被封,只爬取了1500条数据
const targetUrl = `http://search.dangdang.com/?key=%BC%C6%CB%E3%BB%FA&act=input&page_index=`
//  &page_index=1
// let startPage = 0;
let currentPage = 0;
getPageGoods(currentPage)

function getPageGoods(cPage) {
    let promiseList = [];
    for (let i = 0; i < 10; i++) {
        var p = new Promise((resolve, reject) => {
            request({
                encoding: null,
                url: targetUrl + `${cPage*10+i}`
            }, (err, res, body) => {
                // body为爬取的内容
                //提取需要的数据
                let html = iconv.decode(body, "gb2312")
                let $ = cheerio.load(html)
                let goodslist = [];
                $('#search_nature_rg ul li').each(async (idx, item) => {
                    let $item = $(item)
                    let bookName = $item.find('.name>a').attr('title')
                    let prePrice = $item.find('.search_pre_price').text().substr(1) * 1
                    let nowPrice = $item.find('.search_now_price').text().substr(1) * 1
                    let commits = parseInt($item.find('.search_star_line > a').text())
                    let imgurl = await $item.find('>a >img').attr('data-original') //src图片爬取不了
                    let author = $item.find('.search_book_author span:eq(0) a:eq(1)').attr('title')
                    let publishTime = $item.find('.search_book_author span:eq(1)').text().trim().substr(1)
                    let press = $item.find('.search_book_author> span:eq(2) a').attr('title')
                    let details = $item.find('p.detail').text().trim()
                    let shopname = $item.find('.search_shangjia a').attr('title')
                    let id = uuid.v1()
                    let goods = {
                        id,
                        bookName,
                        prePrice,
                        nowPrice,
                        commits,
                        imgurl,
                        author,
                        publishTime,
                        press,
                        details,
                        shopname,
                    }
                    console.log(goods)
                    goodslist.push(goods)
                    // // 爬取图片
                    // // 获取图片名称
                    // // http://img3m5.ddimg.cn/69/26/684451815-1_b_5.jpg
                    // // console.log(imgurl)
                    // const fileName = path.basename(imgurl)
                    // // 写入目录
                    // const downloadPath = path.join('./download/', fileName)
                    // // console.log('downloadPath', downloadPath)
                    // // 创建写入流
                    // const writerStream = fs.createWriteStream(downloadPath,{autoClose:true})
                    // // request爬取图片，返回文件流（文件的）
                    // // request('http://www.dangdang.com/'+imgurl).pipe(writerStream)
                    // request('http:' + imgurl).pipe(writerStream)

                    // 将数据插入数据库
                    let sql = `insert into bookList(id,bookName,prePrice,nowPrice,commits,imgurl,author,publishTime,press,details,shopname) values('${id}','${bookName}',${prePrice},${nowPrice},${commits},'${imgurl}','${author}','${publishTime}','${press}','${details}','${shopname}')`
                    mysql.query(sql);
                    // console.log(sql)
                })
                resolve(goodslist);
            })
        })
        promiseList.push(p)
    }
    Promise.all(promiseList).then(results => {
        if ((currentPage + 1) * 60 >= 60 * 50) {
            // 将数据写入json文件
            const writeStream = fs.createWriteStream('./books.json')
            //由于result是多维数组则要数组扁平化
            writeStream.write(JSON.stringify([].concat(...results)), 'utf-8');
            writeStream.end();
            writeStream.on('finish', function () {
                console.log('写入完成!')
            })
            writeStream.on('error', function (err) {
                console.log(err.stack)
            })
            fs.writeFile('./books.json', JSON.stringify(result), function (err) {
                if (err) {
                    console.log(err);
                } else {
                    console.log('books.json文件写入成功！');
                }
            });
            console.log('数据保存完成!')
        } else {
            currentPage++;
            getPageGoods(currentPage);
        }
    })
}

// 参考资料
// https://www.cnblogs.com/wind-lanyan/p/9044130.html