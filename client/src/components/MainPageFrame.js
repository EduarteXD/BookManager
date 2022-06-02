import React from 'react'

import LoginPage from './LoginPage'
import FindBookPage from './FindBookPage'
import BookData from './BookData'
import InventoryPage from './InventoryPage'
import SearchResultPage from './SearchResultPage'

import Navi from './widgets/Navi'

const MainPageFrame = (args) => {
    let ws = args.ws

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
            />
            {
                page === 0 && <FindBookPage 
                    ws={ws}
                    setPage={setPage}
                />
            }
            {
                page === 1 && <LoginPage
                    ws={ws}
                />
            }
            {
                page === 2 && <BookData 
                    user={args.user}
                    setPage={setPage}
                />
            }
            {
                page === 3 && <InventoryPage
                    ws={ws}
                />
            }
            {
                page === 4 && <SearchResultPage
                    ws={ws}
                />
            }
        </>
    )
}

export default MainPageFrame