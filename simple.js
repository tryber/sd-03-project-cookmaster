const mysql = require('mysql');

const con = mysql.createConnection({
    host: 'localhost',
    user: 'root', 
    password: '000',
    database: 'cookmaster'
});

con.connect((err) => {
    if (err) {
        console.log('Erro connecting to database...', err)
        return
    }
    console.log('Connection established!')
})