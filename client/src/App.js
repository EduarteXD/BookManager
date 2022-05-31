import React from 'react'
import websocket from 'socket.io-client'

import LoadingPage from './components/LoadingPage'
import MainPageFrame from './components/MainPageFrame'

const App = () => {
  const [ws, setWs] = React.useState(null)
  const [loading, setLoading] = React.useState(true)
  const [user, setUser] = React.useState({
    loggedin: false
  })

  const connectWs = () => {
    setWs(websocket('localhost:1333'))
  }

  React.useEffect(() => {
    if (ws) {
      if (window.localStorage['tracker'] !== undefined) {
        let tracker = window.localStorage['tracker']
        console.log('trying auto login with: ' + tracker)
        ws.emit('login', {
          type: 'tracker',
          tracker: tracker
        }, response => {
          if (response.stat) {
            setUser({
              loggedin: true,
              uid: response.uid,
              avatar: response.avatar,
              type: response.role
            })
          }
          setLoading(false)
        })
      }
      else {
        setLoading(false)
      }
    }
    else {
      connectWs()
    }
  }, [ws])

  return (
    <>
      {
        loading ? (
          <>
            <LoadingPage />
          </>
        ) : (
          <>
            <MainPageFrame
              user={user}
              ws={ws}
            />
          </>
        )
      }
    </>
  );
}

export default App;
