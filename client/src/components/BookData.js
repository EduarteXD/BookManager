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
                            position: 'fixed',
                            bottom: '-150px',
                            left: '10px',
                            width: '650px',
                            opacity: '50%',
                            zIndex: -1
                        }}
                    />
                )
            }
            <Paper
                sx={{
                    width: '67vw',
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
                        data.author !== null && (
                            <Typography>
                                作者：{data.author}
                            </Typography>
                        )
                    }
                    {
                        data.translator !== null && (
                            <Typography>
                                译者：{data.translator}
                            </Typography>
                        )
                    }
                    <Box
                        sx={{
                            padding: '20px 0 0 0'
                        }}
                    />
                    {
                        data.description !== null && (
                            <Typography>
                                {data.description}
                            </Typography>
                        )
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
                        <Button
                            variant='outlined'
                        >
                            借阅
                        </Button>
                    </Box>
                    <Box
                        sx={{
                            display: 'inline',
                            padding: '0 10px 0 0'
                        }}
                    >
                        <Button>关于作者</Button>
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
                </Box>
            </Paper>
        </>
    )
}

export default BookData