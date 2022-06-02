import { Box, Grid, Pagination, Stack } from '@mui/material'
import React from 'react'

import BookCard from './widgets/BookCard'

const InventoryPage = (args) => {
    const [pageCount, setPageCount] = React.useState(-1)
    const [page, setPage] = React.useState(0)
    const [books, setBooks] = React.useState([])

    let ws = args.ws

    React.useState(() => {
        if (pageCount === -1) {
            ws.emit('bookCount', response => {
                if (response.stat) {
                    setPageCount(response.count)
                    ws.emit('inventory', 0, response => {
                        if (response.stat) {
                            setBooks(response.data)
                        }
                    })
                }
            })
        }
    }, [pageCount])

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
                        books.map(book => (
                            <Grid
                                key={book.bookid}
                                item
                                xs={12}
                                md={4}
                                lg={3}
                            >
                                <BookCard
                                    bookInfo={book}
                                    ws={ws}
                                    setPage={args.setPage}
                                />
                            </Grid>
                        ))
                    }
                </Grid>
            </Box>
            <Box 
                sx={{
                    height: '120px'
                }}
            />
            <Box
                sx={{
                    position: 'fixed',
                    bottom: '25px',
                    margin: 'auto',
                    left: '50%',
                    transform: 'translate(-50%)'
                }}
            >
                <Stack spacing={2}>
                    <Pagination 
                        count={pageCount} 
                        hidefirstbutton="true" 
                        hidelastbutton="true" 
                        onChange={(e, p) => {
                            ws.emit('inventory', p - 1, response => {
                                if (response.stat) {
                                    setBooks(response.data)
                                }
                            })
                        }}
                    />
                </Stack>
            </Box>
        </>
    )
}

export default InventoryPage