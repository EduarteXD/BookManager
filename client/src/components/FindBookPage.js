import React from 'react'
import { Box, Paper, IconButton, InputBase, Avatar } from '@mui/material'
import BookOutlinedIcon from '@mui/icons-material/BookOutlined'
import ManageSearchOutlinedIcon from '@mui/icons-material/ManageSearchOutlined'

import resolveISBN from '../functions/resolveISBN'
import notification from '../functions/notification'

import findBookImg from '../findbook.png'

const FindBookPage = (args) => {
    let ws = args.ws

    return (
        <>
            <Box
                sx={{
                    width: {
                        sx: '67vw',
                        md: '45vw',
                        lg: '35vw'
                    },
                    margin: 'auto',
                    position: 'absolute',
                    left: '50%',
                    top: 'calc(50% - 138px)',
                    transform: 'translate(-50%, -50%)'
                }}
            >
                <Avatar
                    src={findBookImg}
                    sx={{
                        margin: 'auto',
                        width: 256,
                        height: 256
                    }}
                />
                <Box
                    sx={{
                        padding: '20px 0 0 0'
                    }}
                />
                <Paper
                    component='form'
                    onSubmit={(event) => {
                        event.preventDefault()
                    }}
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        height: '57px'
                    }}
                >
                    <IconButton
                        sx={{
                            p: '10px'
                        }}
                        aria-label="isbn"
                        onClick={() => notification('hello there', 'now you found me')}
                    >
                        <BookOutlinedIcon />
                    </IconButton>
                    <InputBase
                        sx={{ ml: 1, flex: 1 }}
                        placeholder="我在年轻时就读过..."
                        id='isbn'
                        onChange={() => {
                            let resolved = resolveISBN(document.getElementById('isbn').value)
                            if (resolved) {
                                document.getElementById('isbn').value = resolved
                            }
                        }}
                        inputProps={{ 'aria-label': 'isbn' }}
                    />
                    <IconButton
                        sx={{ p: '10px' }}
                        aria-label="search"
                        onClick={() => {
                            let isbn = document.getElementById('isbn').value.replace(/-+/g, "")
                            ws.emit('bookData', isbn, response => {
                                window.sessionStorage['bookData'] = JSON.stringify(response)
                                args.setPage(2)
                            })
                        }}
                    >
                        <ManageSearchOutlinedIcon />
                    </IconButton>
                </Paper>
            </Box>
        </>
    )
}

export default FindBookPage