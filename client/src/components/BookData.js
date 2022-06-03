import { Paper, Typography, Box, Divider, Button } from '@mui/material'
import React from 'react'

import throwBall from '../functions/throwBall'

const BookData = (args) => {
    let data = JSON.parse(window.sessionStorage['bookData'])

    const [bookBorrowed, setBookBorrowed] = React.useState(false)

    React.useEffect(() => {
        if (window.sessionStorage['borrowedList']) {
            let borrowed = JSON.parse(window.sessionStorage['borrowedList'])
            if (data.isbn in borrowed) {
                setBookBorrowed(true)
            }
        }
    }, [])

    return (
        <>
            {
                data.photo !== null && (
                    <img
                        src={data.photo}
                        alt='book cover'
                        style={{
                            maxWidth: '600px',
                            position: 'fixed',
                            bottom: '-50px',
                            left: '-50px',
                            width: '650px',
                            opacity: '50%',
                            zIndex: -1
                        }}
                    />
                )
            }
            <Paper
                sx={{
                    width: {
                        xs: '80vw',
                        md: '55vw'
                    },
                    margin: 'auto',
                    position: 'absolute',
                    left: '50%',
                    top: '50%',
                    transform: 'translate(-50%, -50%)'
                }}
            >
                <Box
                    sx={{
                        padding: '20px 20px 20px 20px'
                    }}
                >
                    <Typography
                        variant='h4'
                    >
                        {data.bookName}
                    </Typography>
                    <Box
                        sx={{
                            padding: '20px 0 20px 0'
                        }}
                    >
                        <Divider />
                    </Box>
                    {
                        data.author !== '' && (
                            <Typography>
                                {data.author}
                            </Typography>
                        )
                    }
                    {
                        data.description !== '' && (
                            <>
                                <Box
                                    sx={{
                                        padding: '20px 0 0 0'
                                    }}
                                />
                                <Typography>
                                    {data.description.length > 600 ? data.description.substr(0, 600) + '...' : data.description}
                                </Typography>
                            </>
                        )
                    }
                    {
                        data.description === '' &&
                        data.author === '' &&
                        <Typography>
                            暂时没有更多信息!
                        </Typography>
                    }
                    <Box
                        sx={{
                            padding: '20px 0 20px 0'
                        }}
                    >
                        <Divider />
                    </Box>
                    <Box
                        sx={{
                            display: 'inline',
                            padding: '0 10px 0 0'
                        }}
                    >
                        {
                            args.user.loggedin ? (
                                <>
                                    {
                                        parseInt(data.stock) > 0 ? (
                                            <Button
                                                id='borrowBtn'
                                                variant='outlined'
                                                disabled={bookBorrowed}
                                                onClick={(event) => {
                                                    let borrowed = JSON.parse(window.sessionStorage['borrowedList'])
                                                    if (Object.keys(borrowed).length === args.user.limit) {
                                                        args.fail('已达借阅上限')
                                                    } else {
                                                        setBookBorrowed(true)
                                                        borrowed[data.isbn] = data
                                                        window.sessionStorage['borrowedList'] = JSON.stringify(borrowed)

                                                        let xs = parseInt(event.clientX)
                                                        let ys = parseInt(event.clientY)
                                                        let xe = parseInt(window.innerWidth) - 70
                                                        let ye = parseInt(window.innerHeight) - 70

                                                        let element = document.getElementById('bookEmoji')

                                                        let rotate = 0

                                                        throwBall(xs, ys, xe, ye, (x, y) => {
                                                            element.style.left = x + 'px'
                                                            element.style.top = y + 'px'
                                                            element.style.display = 'block'
                                                            element.style.transform = 'rotate(' + rotate + 'deg)'
                                                            rotate += 0.18
                                                        })

                                                        setTimeout(() => {
                                                            element.style.display = 'none'
                                                        }, 500)
                                                    }
                                                }}
                                            >
                                                {bookBorrowed ? '已在借阅清单中' : '借阅'}
                                            </Button>
                                        ) : (
                                            <Button
                                                variant='outlined'
                                                disabled
                                            >
                                                无库存
                                            </Button>
                                        )
                                    }
                                </>
                            ) : (
                                <Button
                                    variant='outlined'
                                    disabled
                                >
                                    登录以借阅
                                </Button>
                            )
                        }
                    </Box>
                    <Box
                        sx={{
                            display: 'inline'
                        }}
                    >
                        <Button
                            onClick={() => args.setPage(parseInt(window.sessionStorage['fromPage']))}
                        >
                            返回
                        </Button>
                    </Box>
                    {
                        args.user.type === 2 &&
                        parseInt(data.stock) === -1 && (
                            <Box
                                sx={{
                                    display: 'inline'
                                }}
                            >
                                <Button
                                    onClick={() => {
                                        args.setPage(5)
                                    }}
                                >
                                    加入库存
                                </Button>
                            </Box>
                        )
                    }
                </Box>
            </Paper>
            <Box
                sx={{
                    height: '120px'
                }}
            />
            <div
                id='bookEmoji'
                style={{
                    position: 'absolute',
                    width: '32px',
                    height: '32px',
                    top: 0,
                    left: 0,
                    display: 'none',
                    transform: 'rotate(0deg)'
                }}
            >
                📕
            </div>
        </>
    )
}

export default BookData