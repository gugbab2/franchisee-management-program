import React from "react";
import Login from "../pages/Login";
import { CloseButton, Modal, ModalBody, ModalHeader } from "react-bootstrap";

export default function LoginModal({showLogin, closeLoginModal, showFindPWModal, showRegisterModal}) {
    
    return (
        <>
            <Modal
                style={{ marginTop: "10%" }}
                show={showLogin}
                onHide={closeLoginModal}
                keyboard={false}
            >
                <ModalBody>
                    <Login 
                        closeLoginModal={closeLoginModal}
                        showFindPWModal={showFindPWModal}
                        showRegisterModal={showRegisterModal}
                    />
                </ModalBody>
            </Modal>
        </>
    );
}
