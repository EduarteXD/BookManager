import { Paper, Typography, Box, Divider, Button } from '@mui/material'
import React from 'react'

const BookData = (args) => {
    let data = JSON.parse(window.sessionStorage['bookData'])

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
                        sx: '67vw',
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
                                <Button
                                    variant='outlined'
                                >
                                    借阅
                                </Button>
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
                            onClick={() => args.setPage(0)}
                        >
                            返回
                        </Button>
                    </Box>
                    {
                        args.user.type === 2 && (
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
        </>
    )
}

export default BookData