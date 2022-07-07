import React, { useState } from 'react'
import Modal from 'react-modal';
import Login from '../pages/Login';
import { Button } from 'react-bootstrap';

export default function LoginModal() {

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
        <Button onClick={openModal}>로그인</Button>
        <Modal
            isOpen={mOpen}
            onRequestClose={closeModal}
            style={customStyles}
            contentLabel='example Modal'
        >
            <Login></Login>
        </Modal>
    </>
  )
}
