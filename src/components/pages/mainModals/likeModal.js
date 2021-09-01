import React from 'react';
import Modal from 'react-bootstrap/Modal'
import './loadingModal.css'

function LikeLodadingModal(props) {
    return (
      <Modal
        {...props}
        size="sm"
        centered
        className='loading_modal'
      >
        <Modal.Body>
        <div class="spinner-boxh" >
          <div class="configure-border-1h">  
          <div class="configure-coreh"></div>
          </div>  
          <div class="configure-border-2h">
          <div class="configure-coreh"></div>
          </div> 
          </div>
        </Modal.Body>
      </Modal>
    );
  }
  export default LikeLodadingModal;