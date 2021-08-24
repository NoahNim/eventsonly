import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import LoginForm from './LoginForm';
import { NavLink } from 'react-router-dom';

function LoginFormModal() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <NavLink className="nav-login" to="/"><button className="login-button" onClick={() => setShowModal(true)}>Log In</button></NavLink>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <LoginForm />
        </Modal>
      )}
    </>
  );
}

export default LoginFormModal;