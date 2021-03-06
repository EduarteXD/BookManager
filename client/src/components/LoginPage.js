import React from 'react'
import { Avatar, Box, Button, Collapse, Paper, TextField } from '@mui/material'

const LoginPage = (args) => {
    const [avatar, setAvatar] = React.useState('')
    /* stats:
        - 0: default
        - 1: ready for login
        - 2: ready for register
        - 3: registering and waiting for email verification
    */
    const [stat, setStat] = React.useState(0)
    let ws = args.ws

    const handleRegister = () => {
        args.fail('暂不开放注册！')
    }

    const handleLogin = () => {
        let name = document.getElementById('username').value
        let pwd = document.getElementById('password').value

        ws.emit('login', {
            type: 'pwd',
            user: {
                name: name,
                pwd: pwd
            }
        }, response => {
            if (response.stat === true) {
                window.localStorage['tracker'] = response.tracker
                // window.localStorage['uid'] = response.uid
                // window.localStorage['avatar'] = avatar
                window.location.reload()
            } else {
                args.fail('密码错误！')
            }
        })
    }

    const handleChange = () => {
        let username = document.getElementById('username').value
        if (username.length >= 3) {
            ws.emit('queryUser', username, response => {
                if (response.found) {
                    setAvatar(response.emailHash)
                    setStat(1)
                }
                else {
                    setAvatar('')
                    setStat(2)
                }
            })
        }
        else {
            setAvatar('')
            setStat(0)
        }
    }

    return (
        <Paper
            sx={{
                width: '380px',
                margin: 'auto',
                textAlign: 'center',
                position: 'absolute',
                left: '50%',
                top: '50%',
                transform: 'translate(-50%, -50%)'
            }}
        >
            <Box
                sx={{
                    padding: '20px 30px 20px 30px'
                }}
            >
                <Box
                    sx={{
                        padding: '0 0 20px 0'
                    }}
                >
                    <Avatar
                        src={avatar !== '' ? 'https://ixnet.icu/avatar/' + avatar : ''}
                        sx={{
                            width: 64,
                            height: 64,
                            margin: 'auto',
                            left: '0',
                            right: '0'
                        }}
                    />
                </Box>
                <Box
                    sx={{
                        padding: '0 0 20px 0'
                    }}
                >
                    <TextField
                        fullWidth
                        label='用户名'
                        id='username'
                        autoFocus
                        onChange={handleChange}
                    />
                </Box>
                <Collapse
                    in={stat === 1}
                >
                    <Box
                        sx={{
                            padding: '0 0 20px 0'
                        }}
                    >
                        <TextField 
                            fullWidth
                            label='密码'
                            id='password'
                            type='password'
                            onKeyDown={(e) => {
                                if (e.code === 'Enter') {
                                    handleLogin()
                                }
                            }}
                        />
                    </Box>
                    <Box>
                        <Button
                            variant='outlined'
                            fullWidth
                            onClick={handleLogin}
                        >
                            登录
                        </Button>
                    </Box>
                </Collapse>
                <Collapse
                    in={stat === 2}
                >
                    <Box>
                        <Button
                            variant='outlined'
                            fullWidth
                            onClick={handleRegister}
                        >
                            注册
                        </Button>
                    </Box>
                </Collapse>
            </Box>
        </Paper>
    )
}

export default LoginPage