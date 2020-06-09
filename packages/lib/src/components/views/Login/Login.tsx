import React from 'react';
import Modal from '../../organisms/Modal/Modal';

interface Props {
  onClick?: () => void;
}

const LoginForm = [
  { id: 'formEmail', type: 'email', placeholder: 'email' },
  { id: 'formPassword', type: 'password', placeholder: 'password' },
];

const Login: React.FC<Props> = props => {
  return <Modal heading="Login" formGroups={LoginForm} buttons={[{ title: 'Login' }]}></Modal>;
};

export default Login;
