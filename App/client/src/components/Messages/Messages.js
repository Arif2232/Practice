import React from 'react';
import ScrollToBottom from 'react-scroll-to-bottom'
import './Messages.css';
import Message from '../Message.js/Message';

const Messages = ({messages, name, checkBox, msgID}) =>{

console.log(checkBox);  

return (
    <ScrollToBottom className = "messages">
{messages.map((message,index)=> <div key={index}><Message message={message} name={name} checkBox={checkBox} msgId={msgID}/></div>)}
  </ScrollToBottom>
);
}

export default Messages;