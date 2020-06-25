import React, { useState } from 'react';

type FormElem = React.FormEvent<HTMLFormElement>;

const Login: React.FC = () => {
  const [unVal, setUnVal] = useState<string>('');
  const [pwVal, setPwVal] = useState<string>('');

  const handleSubmit = (e: FormElem): void => {
    e.preventDefault();
    setUnVal('');
    setPwVal('');
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" required value={unVal} onChange={(e): void => setUnVal(e.target.value)} />
        <br />
        <input type="password" required value={pwVal} onChange={(e): void => setPwVal(e.target.value)} />
        <br />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
