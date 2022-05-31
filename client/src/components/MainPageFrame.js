import React from 'react'

import LoginPage from './LoginPage'
import FindBookPage from './FindBookPage'
import Navi from './widgets/Navi'

const MainPageFrame = (args) => {
    const ws = args.ws

    /* pages:
        -0: searching page
        -1: login page
    */
    const [page, setPage] = React.useState(0)

    return (
        <>
            <Navi
                userType={args.user.loggedin ? (args.user.type) : 0}
                setPage={setPage}
            />
            {
                page === 0 && <FindBookPage />
            }
            {
                page === 1 && <LoginPage
                    ws={ws}
                />
            }
        </>
    )
}

export default MainPageFrame