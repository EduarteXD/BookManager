import React from 'react'
import { SpeedDial, SpeedDialAction } from '@mui/material'
import SpeedDialIcon from '@mui/material/SpeedDialIcon'
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import LoginOutlinedIcon from '@mui/icons-material/LoginOutlined';
import ManageSearchOutlinedIcon from '@mui/icons-material/ManageSearchOutlined'

const Navi = (args) => {
    let actions = []

    const act = (actId) => {
        switch (actId) {
            case 0:
                args.setPage(1)
                break
            case 1:
                window.localStorage['tracker'] = undefined
                window.location.reload()
                break
        }
    }

    switch (args.userType) {
        case 0:
            // guest
            actions = [
                { icon: <LoginOutlinedIcon />, name: '登录', id: 0 },
                { icon: <ManageSearchOutlinedIcon />, name: '找书', id: 2 },
            ]
            break
        case 1:
            // user
            actions = [
                { icon: <LogoutOutlinedIcon />, name: '登出', id: 1 },
                { icon: <ManageSearchOutlinedIcon />, name: '找书', id: 2 },
            ]
            break
        case 2:
            // admin
            actions = [
                { icon: <LogoutOutlinedIcon />, name: '登出', id: 1 },
                { icon: <ManageSearchOutlinedIcon />, name: '找书', id: 2 },
            ]
            break
    }

    return (
        <>
            <SpeedDial
                ariaLabel='navigation'
                sx={{
                    position: 'absolute',
                    bottom: 32,
                    right: 32
                }}
                icon={<SpeedDialIcon />}
            >
                {
                    actions.map(action => (
                        <SpeedDialAction
                            key={action.name}
                            icon={action.icon}
                            tooltipTitle={action.name}
                            onClick={() => {
                                act(action.id)
                            }}
                        />
                    ))
                }
            </SpeedDial>
        </>
    )
}

export default Navi