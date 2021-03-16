import React, {useEffect, useState} from 'react';
import './sidebar.css';
import SidebarChat from "./SidebarChat";
import { Avatar, IconButton } from '@material-ui/core';
import DonutLargeIcon from '@material-ui/icons/DonutLarge';
import ChatIcon from '@material-ui/icons/Chat';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import SearchIcon from '@material-ui/icons/Search';

import db from "../../config/firebase"
import { useStateValue } from '../../context/StateProvider';


function Sidebar() {
const [rooms, setRooms] = useState([]);
const [{ user }, dispatch] = useStateValue();


useEffect(() => {
    const unsbscribe = db.collection("rooms").onSnapshot((snapshot)=>
    setRooms(
        snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
        }))
    )
    );

    return() =>{
        unsbscribe();
    };
    }, []);


    return (
        <div className="sidebar">
            <div className="sidebar_header">
                <Avatar src={user?.photoURL}/>
                <div className="sidebar_headerRight">
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
            
            <div className="sidebar_search">                
                <div className="sidebar_searchContainer">
                    <SearchIcon />
                    <input placeholder="start new chat" type="text"/>
                </div>
            </div>
            <div className="sidebar_chats">
                <SidebarChat addNewChat />
                {rooms.map(room =>(
                    <SidebarChat key={room.id} id={room.id}
                    name={room.data.name} />
                ))}
            </div>
            
        </div>
    )
}

export default Sidebar
