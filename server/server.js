const { Server } = require('socket.io')
const http = require('http')
const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const mysql = require('mysql')
const crypto = require('crypto')

dotenv.config()

const app = express()
app.use(cors())
const server = http.createServer(app)
const io = new Server(server, {
    cors: true
})

var clients = {}
var userList = {}

io.on('connection', socket => {
    socket.on('login', (args, callback) => {
        switch (args.type) {
            case 'pwd':
                try {
                    connection.query('select `uid` from `users` where `name` = ? and `pwd` = ?',
                        [args.user.name, crypto.createHash('md5').update(args.user.pwd).digest('hex')],
                        async (err, rows) => {
                            if (err) {
                                throw err
                            }
                            let tracker = await genTracker(rows[0].uid)
                            if (rows.length !== 0) {
                                callback({
                                    stat: true,
                                    uid: rows[0].uid,
                                    tracker: tracker
                                })
                            }
                            else {
                                callback({
                                    stat: false
                                })
                            }
                        })
                }
                catch (err) {
                    console.error(err)
                }
                break
            case 'tracker':
                try {
                    connection.query('select `uid`, `role`, `email` from `users` where `uid` = (select `uid` from `trackers` where `tracker` = ?)', args.tracker, (err, rows) => {
                        if (err) {
                            callback({
                                stat: false
                            })
                            throw err
                        }
                        if (rows.elngth !== 0) {
                            callback({
                                stat: true,
                                uid: rows[0].uid,
                                role: rows[0].role,
                                avatar: crypto.createHash('md5').update(rows[0].email).digest('hex')
                            })
                        }
                        else {
                            callback({
                                stat: false
                            })
                        }
                    })
                } catch (err) {
                    console.error(err)
                }
                break
        }
    })

    socket.on('queryUser', (username, callback) => {
        if (username in userList) {
            callback({
                found: true,
                emailHash: crypto.createHash('md5').update(userList[username]).digest('hex')
            })
        }
        else {
            callback({
                found: false
            })
        }
    })

    socket.on('bookData', (isbn, callback) => {
        let apiKey = process.env.ISBN_API_KEY
        let api = `https://api.jike.xyz/situ/book/isbn/${isbn}?apikey=${apiKey}`
        fetch(api)
            .then(response => response.json())
            .then(body => {
                // console.log(body)
                if (body.msg === '请求成功') {
                    callback({
                        bookName: body.data.name,
                        author: body.data.author,
                        translator: body.data.translator,
                        photo: body.data.photoUrl,
                        description: body.data.description,
                        publisher: body.data.publishing
                    })
                }
            })
    })

    socket.on('bookCount', callback => {
        try {
            connection.query('select count(*) from `inventory`', (err, rows) => {
                if (err) {
                    callback({
                        stat: false
                    })
                    throw err
                }
                callback({
                    stat: true,
                    count: Math.ceil(rows[0]['count(*)'] / 40)
                })
            })
        } catch (err) {
            console.error(err)
        }
    })

    socket.on('inventory', (page, callback) => {
        try {
            connection.query('select `bookid`, `bookname`, `description`, `photo` from `inventory` where `bookid` >= ? and `bookid` < ?', 
            [parseInt(page) * 40, (parseInt(page) + 1) * 40], (err, rows) => {
                if (err) {
                    callback({
                        stat: false
                    })
                    throw err
                }
                callback({
                    stat: true,
                    data: rows
                })
            })
        } catch (err) {
            console.error(err)
        }
    })
})

server.listen(1333, () => {
    console.log('server started at *:1333')
})

const connection = mysql.createConnection({
    host: process.env.SQL_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PWD,
    database: process.env.DB_NAME
})

connection.connect(err => {
    if (err) {
        console.log('\x1B[31m[Erro] \x1B[0m%s', err)
        console.log('[Info] Program will be exit, please check the DB configuration')
        process.exit(0)
    }

    console.log('[Info] DB Connection Established')
    updateUserList()
})

const updateUserList = () => {
    connection.query('select `name`, `email` from `users`', (err, rows) => {
        if (err) {
            throw err
        }
        for (let key in rows) {
            userList[rows[key].name] = rows[key].email
        }
        console.log('[Info] User list loaded')
    })
}

const genTracker = (uid) => {
    let result = new Promise((resolve, reject) => {
        let tracker = 'T-' + crypto.createHash('md5').update(Date.now() + '.' + uid).digest('hex')
        connection.query('delete from `trackers` where `uid` = ?', [uid], err => {
            if (err) {
                reject(err)
                throw err
            }
            connection.query('insert into `trackers` (`tracker`, `uid`) values (?, ?)', [tracker, uid], err => {
                if (err) {
                    reject(err)
                    throw err
                }
                resolve(tracker)
            })
        })
    })

    return result
}