import playdigoLogo from '../../assets/images/playdigo_logo.jpeg';
import { useState } from 'react';
import TextField from '../general/TextField';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  return (
    <div className="flex justify-center items-center min-h-screen bg-dark-white p-4">
      <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-8">
        <div className="flex justify-center items-center mb-6">
          <h2 className="text-2xl font-semibold text-center mb-2 text-deep-purple">Login</h2>
          <img src={playdigoLogo} alt="Playdigo Logo" className="w-12 h-12 rounded-full" />
        </div>
        <TextField label="Email" placeholder="Enter your email" value={email} type="email" onChange={setEmail} />
        <TextField
          label="Password"
          placeholder="Enter your password"
          value={password}
          type="password"
          onChange={setPassword}
        />
        <button className="w-full bg-deep-purple text-white p-3 rounded-lg hover:bg-cyan transition">Login</button>
      </div>
    </div>
  );
}

export default Login;
