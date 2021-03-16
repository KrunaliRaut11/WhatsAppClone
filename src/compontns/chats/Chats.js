import React, {useEffect, useState} from 'react';

import "./chats.css"
import db from '../../config/firebase';
import firebase from "firebase";
import { Avatar, IconButton } from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import SearchIcon from '@material-ui/icons/Search';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import MicIcon from '@material-ui/icons/Mic';
import { useParams } from 'react-router';
import { useStateValue } from '../../context/StateProvider';


function Chats() {
    const [seed, setSeed] = useState("");
    const [input, setInput] = useState("");
    const {roomId} = useParams();
    const [roomName, setRoomName] = useState("");
    const [messages, setMessages] = useState([]);
    const [{user}, dispatch] = useStateValue();


    useEffect(() => {
        if (roomId) {
            db.collection('rooms')
            .doc(roomId)
            .onSnapshot((snapshot) => setRoomName
                (snapshot.data().name));
            db.collection('rooms')
            .doc(roomId)
            .collection("messages")
            .orderBy("timestamp", "asc")
            .onSnapshot((snapshot)=>
            setMessages(snapshot.docs.map((doc) =>
            doc.data()))
            );
        }

    }, [roomId])


    useEffect(() =>{
        setSeed(Math.floor(Math.random() *5000));
    }, [roomId]);

    const sendMessage =(e) =>{
        e.preventDefault();
        console.log(input);

        db.collection("rooms").doc(roomId).collection('messages').add({
            message:input,
            name: user.displayName, 
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        })

        setInput("");
    }
    return (

        <div className="chats">
            <div className="chats_header">
               <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />

               <div className="chats_headerInfo">
                   <h3>{roomName}</h3>
                   <p>last seen{""}{new Date(messages[messages.length - 1] ?. timestamp?.toDate()).toUTCString()}</p>
               </div>
               <div className="chats_headerRight">
                    <IconButton>
                         <SearchIcon />
                    </IconButton>

                    <IconButton> 
                         <AttachFileIcon />
                    </IconButton>

                    <IconButton>
                          <MoreVertIcon />
                    </IconButton>
                </div>
            </div>
            <div className="chats_body">
                {messages.map((message) =>(
               <p className={`chat_message ${message.name === user.displayName && "chat_reciever"}`}> 
               <span className="chat_name"> {message.name}</span>
                {message.message}
                <span className="chat_timestamp">{new Date(message.timestamp?.toDate()).toUTCString()}</span></p>
                ))}

            </div>
            <div className="chats_footer">
               <InsertEmoticonIcon />
               <form>
                   <input type="text" value={input} onChange={(e) => setInput(e.target.value)} placeholder="Type a message"/>
                   <button onClick={sendMessage} type="submit">send message</button>
                       
               </form>

               <MicIcon />
            </div>
            
        </div>
    )
}

export default Chats
