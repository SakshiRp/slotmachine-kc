import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import 'bootstrap/dist/css/bootstrap.min.css';
import gif from "../assets/win.gif"
import coin from "../assets/KC_Coin.svg"
import chip from "../assets/fa_ticket.svg"

function Example1({gameStateResponse, ackStatus, id}) {

  const [show, setShow] = useState(true);

  const handleClose = () => {
    setShow(false);
    ackStatus(id)
  }
  // const handleShow = () => setShow(true);
  return (
    <div className='modal' >
        <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <div className='center-modal'>
            <img className='win-gif' src={gif} alt="loading..." />
            <p className='modal-header'>
            बधाई हो!
            </p>
            <div className="'modal-content">
                आपने जीते <strong>{gameStateResponse[0]?.reward?.quantity}</strong>  <img className="icon" src={coin} alt="coin" />  & 

                     <strong>{(gameStateResponse[0]?.reward?.type === "chips") ? gameStateResponse[0]?.reward?.quantity :   <span style={{marginLeft:"0.4rem"}}>0</span>}</strong> <img className="icon" src={chip} alt="coin" />                
            </div>
      <button onClick={handleClose} className='modal-btn'> धन्यवाद</button>

           </div>
        
      </Modal>
    </div>
  );
}

export default Example1;