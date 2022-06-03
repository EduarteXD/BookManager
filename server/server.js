const { Server } = require('socket.io')
const http = require('http')
const request = require('request')
const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const mysql = require('mysql2')
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
                            if (rows.length !== 0) {
                                let tracker = await genTracker(rows[0].uid)
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
                    connection.query('select `name`, `uid`, `role`, `email`, `borrowed` from `users` where `uid` = (select `uid` from `trackers` where `tracker` = ?)', args.tracker, (err, rows) => {
                        if (err) {
                            callback({
                                stat: false
                            })
                            throw err
                        }
                        if (rows.length !== 0) {
                            callback({
                                stat: true,
                                uid: rows[0].uid,
                                role: rows[0].role,
                                avatar: crypto.createHash('md5').update(rows[0].email).digest('hex'),
                                limit: 12 - rows[0].borrowed,
                                uname: rows[0].name
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
        // let apiKey = process.env.ISBN_API_KEY
        // let api = `https://api.jike.xyz/situ/book/isbn/${isbn}?apikey=${apiKey}`
        try {
            connection.query('select `bookname`, `authors`, `description`, `photo`, `publisher`, `price`, `stock`, `borrowed` from `inventory` where `isbn` = ?',
                isbn, (err, rows) => {
                    if (err) {
                        callback({
                            success: false
                        })
                        throw err
                    }
                    if (rows.length > 0) {
                        callback({
                            success: true,
                            bookName: rows[0].bookname,
                            author: rows[0].authors,
                            photo: rows[0].photo,
                            description: rows[0].description,
                            publisher: rows[0].publisher,
                            price: rows[0].price,
                            stock: rows[0].stock - rows[0].borrowed,
                            isbn: isbn
                        })
                    } else {
                        let api = `https://ixnet.icu/api/book?isbn=${isbn}`
                        request({
                            url: api,
                            timeout: 5000,
                            method: 'GET',
                            rejectUnauthorized: false
                        }, (err, res, body) => {
                            if (!err && res.statusCode === 200) {
                                body = JSON.parse(body)
                                // console.log(body)
                                if (body.success) {
                                    callback({
                                        success: true,
                                        bookName: body.data.name,
                                        author: body.data.author,
                                        photo: body.data.cover,
                                        description: body.data.summary,
                                        publisher: body.data.publisher,
                                        price: body.data.price,
                                        stock: -1,
                                        isbn: isbn
                                    })
                                } else {
                                    callback({
                                        success: false
                                    })
                                }
                            } else {
                                callback({
                                    success: false
                                })
                            }
                        })
                    }
                })
        } catch (err) {
            console.error(err)
        }
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
                    count: Math.ceil(rows[0]['count(*)'] / 12)
                })
            })
        } catch (err) {
            console.error(err)
        }
    })

    socket.on('inventory', (page, callback) => {
        try {
            connection.query('select `bookid`, `bookname`, `description`, `photo`, `isbn` from `inventory` where `bookid` > ? and `bookid` <= ?',
                [parseInt(page) * 12, (parseInt(page) + 1) * 12], (err, rows) => {
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

    socket.on('searchBook', (key, callback) => {
        try {
            connection.query('select `bookname`, `description`, `photo`, `publisher`, `price`, `category`, `stock` from `inventory` where `bookname` like ?', key, (err, rows) => {
                if (err) {
                    callback({
                        success: false
                    })
                    throw err
                }
                callback({
                    success: true,
                    data: rows
                })
            })
        } catch (err) {
            console.error(err)
        }
    })

    socket.on('addBook', (data, callback) => {
        try {
            connection.query('insert into `inventory` (`isbn`, `bookname`, `authors`, `description`, `photo`, `category`, `stock`, `price`, `publisher`) values (?, ?, ?, ?, ?, ?, ?, ?, ?)',
                [data.isbn, data.name, data.author, data.description, data.photo, data.category, data.count, data.price, data.publisher], err => {
                    if (err) {
                        callback({
                            success: false,
                            msg: err
                        })
                        throw err
                    }
                    callback({
                        success: true
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