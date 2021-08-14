 //参数n为休眠时间，单位为毫秒:
 function sleep(n) {
     var start = new Date().getTime();
     //  console.log('休眠前：' + start);
     while (true) {
         if (new Date().getTime() - start > n) {
             break;
         }
     }
     // console.log('休眠后：' + new Date().getTime());
 }
 sleep(2000);