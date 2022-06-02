import React from 'react'
import websocket from 'socket.io-client'

import LoadingPage from './components/LoadingPage'
import MainPageFrame from './components/MainPageFrame'

import './hide_overflow_y.css'

const App = () => {
  const [ws, setWs] = React.useState(null)
  const [loading, setLoading] = React.useState(true)
  const [user, setUser] = React.useState({
    loggedin: false
  })

  const connectWs = () => {
    setWs(websocket('/'))
  }

  React.useEffect(() => {
    if (ws) {
      if (window.localStorage['tracker'] !== undefined) {
        let tracker = window.localStorage['tracker']
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
          console.log('ver. dev@20220602#7')
          setLoading(false)
        })
      }
      else {
        setLoading(false)
      }
    }
    else {
      if (window.Notification) {
        if (Notification.permission !== 'granted' && Notification.permission !== "denied") {
          Notification.requestPermission()
        }
      }
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
