import React, { useState } from 'react'
import Modal from 'react-modal';
import Register from '../pages/Register';
import { Button } from 'react-bootstrap';

export default function RegisterModal() {

    const customStyles = {
        content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        },
    };

    const [mOpen,setmOpen] = useState(false);

    function openModal(){
        setmOpen(true);
    }
    function closeModal(){
        setmOpen(false);
    }
 
  return (
    <>
        <Button onClick={openModal}>회원가입</Button>
        <Modal
            isOpen={mOpen}
            onRequestClose={closeModal}
            style={customStyles}
            contentLabel='example Modal'
        >
            <Register></Register>
        </Modal>
    </>
  )
}
