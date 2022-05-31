import React from 'react'
import websocket from 'socket.io-client'

import LoginPage from './components/LoginPage'
import LoadingPage from './components/LoadingPage'

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
              uid: window.localStorage['uid'],
              avatar: window.localStorage['avatar']
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
            {
              !user.loggedin && (
                <LoginPage 
                  ws={ws}
                />
              )
            }
          </>
        )
      }
    </>
  );
}

export default App;
