// const puppeteer = require('puppeteer');
// puppeteer.launch({
//     headless: false,
//     executablePath: 'C:\\Program Files\\nodejs\\node_modules\\puppeteer\\.local-chromium\\win64-508693\\chrome-win32\\chrome.exe'
// }).then(async browser => {
//   const page = await browser.newPage();
//   await page.goto('https://lzw.me');
//   await page.screenshot({path: 'lzwme.png'});
//   browser.close();
// }).catch(err => {
//     console.log(err);
// });
const uuid = require('uuid')
// console.log(uuid.v1())
const db = require('./sql/db')
// const sql = `insert into bookList(id,bookName,prePrice,nowPrice,commits,imgurl,author,publishTime,press,details,shopname) values('7e4ec460-fcba-11eb-8149-0524424760f4','计算机系统-系统架构与操作系统的高度集成[美]阿麦肯尚尔·拉姆阿塔德兰（U出版社9787111506362 达额立减 关注有礼 提供电子发票',99,99,11,'//img3m7.ddimg.cn/84/29/1748795187-1_b_1.jpg','[美]阿麦肯尚尔·拉姆阿塔德兰（Umakishore Ram','2015-07-01','机械工业出版社','','三希图书专营店')`

const sql=`insert into bookList(id,bookName,prePrice,nowPrice,commits,imgurl,author,publishTime,press,details,shopname) values('97bd5bc0-fcbd-11eb-b9c6-1bafe00e3197',' 计算机公共基础
（第9版）习题解答与实验指导（Windows 7, Office 2013) 本书是《计算机公共基础（第9版）（Windows 7, Office 2013)》的配套教辅，兼顾各类计算机水平测试与计算机等级考试。',23,23,32,'//img3m8.ddimg.cn/93/7/25208958-1_b_2.jpg','undefined','2017-12-01','清华大学出版社','本书是根据作者多年的教学实践经验编写的，提供大量习题，题型丰富，兼顾各类计算机水平
测试与计算机等级考试，能帮助读者尽快掌握所学内容。','undefined')`
const sql2=`insert into bookList(id,bookName,prePrice,nowPrice,commits,imgurl,author,publishTime,press,details,shopname) values('97bd5bc0-fcbd-11eb-b9c6-1bafe00e3197a',' 计算机公共基础
（第9版）习题解答与实验指导（Windows 7, Office 2013) 本书是《计算机公共基础（第9版）（Windows 7, Office 2013)》的配套教辅，兼顾各类计算机水平测试与计算机等级考试。',23,23,32,'//img3m8.ddimg.cn/93/7/25208958-1_b_2.jpg','undefined','2017-12-01','清华大学出版社','本书是根据作者多年的教学实践经验编写的，提供大量习题，题型丰富，兼顾各类计算机水平
测试与计算机等级考试，能帮助读者尽快掌握所学内容。','undefined')`
db.query(sql2)

