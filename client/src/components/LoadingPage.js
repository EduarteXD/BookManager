import React from 'react'
import { Box, LinearProgress, Typography } from '@mui/material'

import LoadingImg from '../loading.png'

const LoadingPage = () => {
    return (
        <>
            <LinearProgress />
            <Box
                sx={{
                    margin: 'auto',
                    textAlign: 'center',
                    position: 'absolute',
                    left: '50%',
                    top: '50%',
                    transform: 'translate(-50%, -50%)'
                }}
            >
                <img
                    src={LoadingImg}
                    alt='wennie loading'
                    style={{
                        width: '256px',
                        height: '256px'
                    }}
                />
                <Typography
                    variant='h5'
                    sx={{
                        color: '#fbb834'
                    }}
                >
                    维尼读诗中
                </Typography>
            </Box>
        </>
    )
}

export default LoadingPage