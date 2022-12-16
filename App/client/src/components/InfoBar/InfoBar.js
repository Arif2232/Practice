import React, { useState } from 'react';

import onlineIcon from '../icons/onlineIcon.png';
import closeIcon from '../icons/closeIcon.png';

import './InfoBar.css';

const InfoBar = ( {room, handleCheckBox }) =>{
  const [btnCheck,setBtnCheck] = useState(false);

return (
  <div className="infoBar">

    <div className="leftInnerContainer">
      <img className="onlineIcon" src={onlineIcon} alt="online" />
      <h3>{room}</h3>
    </div>
    <div className="rightInnerContainer">
      { btnCheck ? 
      <button onClick={()=>{
        handleCheckBox();
        setBtnCheck(false)

        // send deletion array to back end for soft delete

      }}>Delete</button> :
      <button onClick={()=>{
        handleCheckBox()
        setBtnCheck(true)
      }}>Select Messages</button>  
      }
      <a href="/"> <img src={closeIcon} alt="close"/> </a>
    </div>
  </div>
)};

export default InfoBar;