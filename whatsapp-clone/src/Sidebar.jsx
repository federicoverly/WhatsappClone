import React from 'react';
import './Sidebar.css';
import {Avatar, IconButton } from '@material-ui/core';
import ChatIcon from '@material-ui/icons/Chat';
import DonutLargeIcon from '@material-ui/icons/DonutLarge';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';
import SidebarChat from './SidebarChat';
import { useSelector } from 'react-redux';
import { selectUser } from './features/userSlice';
import { auth } from './firebase';


function Sidebar() {
    const user = useSelector(selectUser)

    const lOut = () => {
        auth.signOut();
      }

    return (
        <div className="sidebar">

            <div className="sidebar__header">
                <Avatar src={user.photo} onClick={lOut} />
                <div className="sidebar__headerRight">
                    <IconButton>
                       <DonutLargeIcon />
                    </IconButton>
                    <IconButton>
                        <ChatIcon />
                    </IconButton>
                    <IconButton>
                        <MoreVertIcon />
                    </IconButton>
                </div>
            </div>
            
            <div className="sidebar__search">
                <div className="sidebar__searchContainer">
                    <SearchOutlinedIcon />
                    <input type="text" placeholder="Search or start a new chat"/>
                </div>
            </div>

            <div className="sidebar__chats">
                <SidebarChat name={"Dance"} image={"https://www.wienerzeitung.at/_em_daten/_cache/image/1x6C6mNvhD5UXIUJuLWXXSV4hrYiXO9MZn5T2TeVnE2zYpJitEeyDAKovEWyI7QjFtnwLIosDKMakKPxKJAWDH8fWFsykeaezE-Gsa_ydVPTHtQgQ877it1OadwdcVsjU7/190904-1623-948-0900-229174-diegomaradona01-002.jpg"}
                message={"Diego is great!"}/>
                <SidebarChat name={"Wow!"} image={"https://pbs.twimg.com/media/Enrt_A0WMAAB_Rc.jpg"} message={"Let's do it"}/>
            </div>


        </div>
    )
}

export default Sidebar
