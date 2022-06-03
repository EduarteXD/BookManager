import React from 'react'
import websocket from 'socket.io-client'
import { Snackbar, Alert } from '@mui/material'

import LoadingPage from './components/LoadingPage'
import MainPageFrame from './components/MainPageFrame'

import './hide_overflow_y.css'

import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'

const App = () => {
  const [ws, setWs] = React.useState(null)
  const [loading, setLoading] = React.useState(true)
  const [user, setUser] = React.useState({
    loggedin: false
  })

  const [msgOn, setMsgOn] = React.useState(false)

  const connectWs = () => {
    // setWs(websocket('/'))
    setWs(websocket(`${window.location.hostname}:1333/`))
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
              uname: response.uname,
              avatar: response.avatar,
              type: response.role,
              limit: response.limit
            })
            setMsgOn(true)
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
            <Snackbar
                open={msgOn}
                autoHideDuration={3000}
                onClose={() => setMsgOn(false)}
            >
                <Alert severity="success" onClose={() => setMsgOn(false)} sx={{ width: '100%' }}>登录为：{user.uname}</Alert>
            </Snackbar>
          </>
        )
      }
    </>
  );
}

export default App;
