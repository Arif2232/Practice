import React, { useState, useEffect} from "react";
// import React, { useState, useEffect, useRef } from "react";
import queryString from 'query-string';
import { io } from 'socket.io-client';
import axios from "axios";

import TextContainer from '../TextContainer/TextContainer';
import InfoBar from '../InfoBar/InfoBar';
import Input from '../Input/Input';
import Messages from '../Messages/Messages'

import './Chat.css'
import { sendMessageRoute } from "../../utils/APIRoutes";

// const ENDPOINT = 'https://arif-chat-application.herokuapp.com/';
const ENDPOINT = 'http://localhost:8000';

let socket;

    // location come from react router which gives us prop
const Chat = () => {
    //  console.log(location);

    // const socket = useRef();
    // const set = useParams();
    const [users, setUsers] = useState('');
    const [name, setName] = useState('');
    const [room, setRoom] = useState('');
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const [msgID,setMsgID] = useState();
    const [checkBox,setCheckBox]=useState(false);

    useEffect(() => {
        const { name, room } = queryString.parse(window.location.search) /*location.search gets url back*/
console.log(window.location.search);

        socket = io(ENDPOINT);
        console.log(name, room);

        setName(name)
        setRoom(room);

        socket.emit('join', { name, room }, (error) => {
            if (error) {
                alert(error)
            }
        });
    },[ENDPOINT, window.location.search]);

    useEffect(() => {
        socket.on('message', message => {
            setMessages(messages => [ ...messages, message]);
            // console.log(message);
        })
            socket.on("roomData", ({ users }) => {
                setUsers(users);
        })
    }, []);

    //function for sending messages
    const sendMessage = async(event) => {
        event.preventDefault();
        if (message) {          
            const id = await axios.post(sendMessageRoute,{
                name,
                room,
                message
            })

            if(id.data.msg==="Message added Successfully")
            {
                setMsgID(id.data.messageID);
                socket.emit('sendMessage', message, () => setMessage(''));
            }
            else
            {
               alert(id.data.msg); 
            }
        }
    }

    const handleCheck = ()=>{
        console.log("in handle check");
        setCheckBox(!checkBox);
    }  

    console.log(message, messages);
    return (
        <div className='outerContainer'>
            <div className='container'>
                <InfoBar room={room} handleCheckBox={handleCheck} />
                <Messages messages={messages} name={name} checkBox={checkBox} msgId={msgID}/>
                <Input message={message} setMessage={setMessage} sendMessage={sendMessage} />
            </div>
            <TextContainer users={users}/>   
        </div>
    );
}

export default Chat;