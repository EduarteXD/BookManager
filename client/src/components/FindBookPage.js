import React from 'react'
import { Box, Paper, IconButton, InputBase } from '@mui/material'
import BookOutlinedIcon from '@mui/icons-material/BookOutlined'
import ManageSearchOutlinedIcon from '@mui/icons-material/ManageSearchOutlined'

import resolveISBN from '../functions/resolveISBN'

const SearchBar = () => {
    return (
        <Paper
            component='form'
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
            >
                <BookOutlinedIcon />
            </IconButton>
            <InputBase
                sx={{ ml: 1, flex: 1 }}
                placeholder="输入书号来搜索"
                id='isbn'
                onChange={() => document.getElementById('isbn').value = resolveISBN(document.getElementById('isbn').value)}
                inputProps={{ 'aria-label': 'isbn' }}
            />
            <IconButton 
                sx={{ p: '10px' }} 
                aria-label="search"
                onClick={() => {
                    
                }}
            >
                <ManageSearchOutlinedIcon />
            </IconButton>
        </Paper>
    )
}

const FindBookPage = () => {
    return (
        <>
            <Box
                sx={{
                    width: '70vw',
                    margin: 'auto',
                    position: 'absolute',
                    left: '50%',
                    top: '45%',
                    transform: 'translate(-50%, -50%)'
                }}
            >
                <SearchBar />
            </Box>
        </>
    )
}

export default FindBookPage