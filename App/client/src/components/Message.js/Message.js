import React, { useState } from 'react';

import './Message.css';
import ReactEmoji from 'react-emoji';
const Message = ({message: {user,text}, name, checkBox, msgID}) => {
    let isSendByCurrentUser = false;
    const  trimmedName = name.toLowerCase();
    console.log(msgID);

    if(user === trimmedName){
        isSendByCurrentUser = true;
    }


    var delArray=[];

    const change =(e)=>{
        if(e.target.checked)
        {
            // add msg id into delete array
            //delArray.push(msgID)
        }
        else
        {
             // remove msg from delete array 
            //"for loop" to take out msgs from array by splice method
        }
    }

    return (
        isSendByCurrentUser
        ?(
            <div className='messageContainer justifyEnd'>
           {/* <p className='sendText Pr-10'>{trimmedName}</p>   */}
           <div className ='messageBox backgroundBlue'>
            <p className = 'messageText colorWhite'>{ReactEmoji.emojify(text)}</p>
            </div>
            { checkBox ?
             <input type='checkbox' onClick={(e)=>change(e)}/> 
             : null 
            }
            </div>
        )
        :(
            <div 
            className="messageContainer justifyStart">
                { checkBox ?
             <input type='checkbox' onClick={(e)=>change(e)}/> 
             : null 
            }
            <div className="messageBox backgroundLight">
              <p className="messageText colorDark">{ReactEmoji.emojify(text)}</p>
            </div>
            <p className="sentText pl-10 ">{user}</p>
          
          </div>
        )
    )
}
  

export default Message;