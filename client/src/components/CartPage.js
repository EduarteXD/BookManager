import { Grid, Box, Paper, Typography, Divider, Button, Checkbox, FormControlLabel } from '@mui/material'
import React from 'react'

import BookCard from './widgets/BookCard'

const CartPage = (args) => {
    const [borrowed, setBorrowed] = React.useState(JSON.parse(window.sessionStorage['borrowedList']))
    let ws = args.ws

    window.sessionStorage['fromPage'] = 6

    return (
        <>
            <Box
                sx={{
                    width: '67vw',
                    margin: 'auto',
                    left: 0,
                    right: 0,
                    marginTop: '120px'
                }}
            >
                <Grid
                    container
                    spacing={4}
                >
                    {
                        Object.keys(borrowed).map(key => {

                            let bookInfo = {
                                bookname: borrowed[key].bookName,
                                isbn: key,
                                photo: borrowed[key].photo,
                                description: borrowed[key].description
                            }

                            return (
                                <Grid
                                    key={key}
                                    item
                                    xs={12}
                                    md={4}
                                    lg={3}
                                >
                                    <BookCard
                                        key={key}
                                        bookInfo={bookInfo}
                                        cardActionLabel={'移出借阅清单'}
                                        cardAction={() => {
                                            let tmp = borrowed
                                            delete tmp[key]
                                            window.sessionStorage['borrowedList'] = JSON.stringify(tmp)
                                            setBorrowed({...tmp})
                                        }}
                                        ws={ws}
                                        setPage={args.setPage}
                                    />
                                </Grid>
                            )
                        })
                    }
                </Grid>
            </Box>
            <Box
                sx={{
                    height: '150px'
                }}
            />
            <Paper
                sx={{
                    position: 'fixed',
                    margin: 'auto',
                    top: '120px',
                    width: '180px',
                    left: '-20px'
                }}
            >
                <Box
                    sx={{
                        padding: '10px 10px 5px 30px'
                    }}
                >
                    <Typography
                        variant='h6'
                    >
                        合计：
                    </Typography>
                </Box>
                <Box
                    sx={{
                        padding: '0 10px 5px 30px'
                    }}
                >
                    <Divider />
                </Box>
                <Box
                    sx={{
                        padding: '0 10px 5px 30px'
                    }}
                >
                    {Object.keys(borrowed).length} 本
                </Box>
                <Box
                    sx={{
                        padding: '5px 10px 10px 30px'
                    }}
                >
                    <Button
                        fullWidth
                        variant='outlined'
                    >
                        借阅
                    </Button>
                </Box>
            </Paper>
        </>
    )
}

export default CartPage