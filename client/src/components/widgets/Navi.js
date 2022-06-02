import React from 'react'
import { SpeedDial, SpeedDialAction } from '@mui/material'
import SpeedDialIcon from '@mui/material/SpeedDialIcon'
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined'
import LoginOutlinedIcon from '@mui/icons-material/LoginOutlined'
import ManageSearchOutlinedIcon from '@mui/icons-material/ManageSearchOutlined'
import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined'
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined'

const Navi = (args) => {
    let actions = []

    const act = (actId) => {
        switch (actId) {
            case 0:
                args.setPage(1)
                break
            case 1:
                window.localStorage.removeItem('tracker')
                window.location.reload()
                break
            case 2:
                args.setPage(0)
                break
            case 3:
                args.setPage(3)
                break
        }
    }

    switch (args.userType) {
        case 0:
            // guest
            actions = [
                { icon: <ManageSearchOutlinedIcon />, name: '找书', id: 2 },
                { icon: <LoginOutlinedIcon />, name: '登录', id: 0 },
            ]
            break
        case 1:
            // user
            actions = [
                { icon: <ManageSearchOutlinedIcon />, name: '找书', id: 2 },
                { icon: <LogoutOutlinedIcon />, name: '登出', id: 1 },
            ]
            break
        case 2:
            // admin
            actions = [
                { icon: <Inventory2OutlinedIcon />, name: '库存', id: 3 },
                { icon: <ManageSearchOutlinedIcon />, name: '找书', id: 2 },
                { icon: <LogoutOutlinedIcon />, name: '登出', id: 1 },
            ]
            break
    }

    return (
        <>
            <SpeedDial
                ariaLabel='navigation'
                sx={{
                    position: 'fixed',
                    bottom: 32,
                    right: 32
                }}
                icon={<MenuOutlinedIcon />}
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