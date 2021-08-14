const mysql = require('mysql')
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '123456',
    database: 'books',
    multipleStatements: true
})

// 使用Promise的方式返回查询的数据
function query(sql) {
    return new Promise((resolve, reject) => {
        pool.query(sql, (err, rows) => {
            if (err) {
                reject(err)
            }
            resolve(rows)
            console.log('插入成功');
        })
    })
}

module.exports = {
    query
}
// module.exports=pool