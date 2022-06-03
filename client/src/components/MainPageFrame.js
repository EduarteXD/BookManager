import React from 'react'

import LoginPage from './LoginPage'
import FindBookPage from './FindBookPage'
import BookData from './BookData'
import InventoryPage from './InventoryPage'
import SearchResultPage from './SearchResultPage'
import AddToInventoryPage from './AddToInventoryPage'

import Navi from './widgets/Navi'
import { Snackbar, Alert } from '@mui/material'
import CartPage from './CartPage'

const MainPageFrame = (args) => {
    let ws = args.ws

    const [msg, setMsg] = React.useState('')
    const [msgOn, setMsgOn] = React.useState(false)
    const [failMsgOn, setFailMsgOn] = React.useState(false)

    const success = (msg) => {
        setMsg(msg)
        setMsgOn(true)
    }

    const fail = (msg) => {
        setMsg(msg)
        setFailMsgOn(true)
    }

    /* pages:
        -0: searching page
        -1: login page
        -2: book data
    */
    const [page, setPage] = React.useState(0)

    return (
        <>
            <Navi
                userType={args.user.loggedin ? (args.user.type) : 0}
                setPage={setPage}
                success={success}
            />
            {
                page === 0 && <FindBookPage
                    ws={ws}
                    setPage={setPage}
                    fail={fail}
                />
            }
            {
                page === 1 && <LoginPage
                    ws={ws}
                    fail={fail}
                />
            }
            {
                page === 2 && <BookData
                    user={args.user}
                    fail={fail}
                    setPage={setPage}
                />
            }
            {
                page === 3 && <InventoryPage
                    ws={ws}
                    setPage={setPage}
                />
            }
            {
                page === 4 && <SearchResultPage
                    ws={ws}
                />
            }
            {
                page === 5 && <AddToInventoryPage
                    ws={ws}
                    setPage={setPage}
                    success={success}
                />
            }
            {
                page === 6 && <CartPage 
                    ws={ws}
                    setPage={setPage}
                />
            }
            <Snackbar
                open={msgOn}
                autoHideDuration={3000}
                onClose={() => setMsgOn(false)}
            >
                <Alert severity="success" onClose={() => setMsgOn(false)} sx={{ width: '100%' }}>{msg}</Alert>
            </Snackbar>
            <Snackbar
                open={failMsgOn}
                autoHideDuration={3000}
                onClose={() => setFailMsgOn(false)}
            >
                <Alert severity="error" onClose={() => setFailMsgOn(false)} sx={{ width: '100%' }}>{msg}</Alert>
            </Snackbar>
        </>
    )
}

export default MainPageFrame