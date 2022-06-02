import React from 'react'
import { Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Box, Typography } from '@mui/material'

const BookCard = (args) => {
    let bookInfo = args.bookInfo
    let ws = args.ws

    return (
        <>
            <Card>
                <CardActionArea
                    onClick={() => {
                        ws.emit('bookData', bookInfo.isbn, response => {
                            window.sessionStorage['bookData'] = JSON.stringify(response)
                            window.sessionStorage['fromPage'] = 3
                            args.setPage(2)
                        })
                    }}
                >
                    <CardMedia
                        component='img'
                        height='140'
                        image={bookInfo.photo}
                        alt='book cover'
                    />
                    <CardContent>
                        <Typography
                            variant='h5'
                        >
                            {bookInfo.bookname.length > 15 ? bookInfo.bookname.substr(0, 13) + '...' : bookInfo.bookname}
                        </Typography>
                        <Box 
                            sx={{
                                padding: '10px 0 0 0'
                            }}
                        />
                        <Typography
                            variant='body2'
                            color='#c2c2c2'
                        >
                            {bookInfo.description.length > 70 ? bookInfo.description.substr(0, 70) + '...' : bookInfo.description}
                        </Typography>
                    </CardContent>
                </CardActionArea>
                <CardActions>
                    <Button
                        size='small'
                    >
                        编辑
                    </Button>
                </CardActions>
            </Card>
        </>
    )
}

export default BookCard