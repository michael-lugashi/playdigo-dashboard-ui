import playdigoLogo from '../../assets/images/playdigo_logo.jpeg';
import { useState } from 'react';
import TextField from '../general/TextField';
import { playdigoLogin } from '../../services/playdigoClient';
import { useNavigate } from 'react-router';
import useAuth from '../../hooks/useAuth';
import useEnterKeyPress from '../../contexts/useEnterKeyPress';

interface FormErrors {
  email: string;
  password: string;
}

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<FormErrors>({ email: '', password: '' });
  const [formError, setFormError] = useState('');
  const { setAuthToken, setIsAdmin, setInstitutionName } = useAuth();
  const navigate = useNavigate();
  const loginButtonRef = useEnterKeyPress<HTMLButtonElement>();

  const validateForm = () => {
    setFormError('');
    const [isValid, newErrors] = getFormErrors(email, password);
    if (!isValid) {
      setErrors(newErrors);
    }
    return isValid;
  };

  const submitLogin = async () => {
    if (!validateForm()) return;

    try {
      const { token, role, institutionName } = await playdigoLogin(email, password);
      setAuthToken(token);
      setIsAdmin(role === 'ADMIN');
      setInstitutionName(institutionName);
      await navigate('/');
    } catch {
      setFormError('Invalid email or password');
      setEmail('');
      setPassword('');
    }
  };

  const handleEmailChange = (value: string) => {
    setEmail(value);
    setErrors((prev) => ({ ...prev, email: '' }));
    setFormError('');
  };

  const handlePasswordChange = (value: string) => {
    setPassword(value);
    setErrors((prev) => ({ ...prev, password: '' }));
    setFormError('');
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-dark-white p-4">
      <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-8 mb-12">
        <div className="flex justify-center items-center mb-6 relative">
          {formError && <div className="absolute -bottom-6 left-0 text-md text-red-500">{formError}</div>}
          <h2 className="text-2xl font-semibold text-center mb-2 text-deep-purple">Login</h2>
          <img src={playdigoLogo} alt="Playdigo Logo" className="w-12 h-12 rounded-full" />
        </div>
        <TextField
          label="Email"
          placeholder="Enter your email"
          value={email}
          type="email"
          onChange={handleEmailChange}
          error={errors.email}
        />
        <TextField
          label="Password"
          placeholder="Enter your password"
          value={password}
          type="password"
          onChange={handlePasswordChange}
          error={errors.password}
        />
        <button
          ref={loginButtonRef}
          onClick={() => void submitLogin()}
          type="button"
          className="w-full bg-deep-purple text-lg  text-white p-3 mt-5 rounded-lg hover:bg-cyan transition transform hover:scale-105 active:scale-95 cursor-pointer"
        >
          Login
        </button>
      </div>
    </div>
  );
}

export default Login;

const getFormErrors = (email: string, password: string): [boolean, FormErrors] => {
  const newErrors: FormErrors = { email: '', password: '' };
  let isValid = true;

  // Email validation
  if (!email) {
    newErrors.email = 'Email is required';
    isValid = false;
  } else if (!validateEmail(email)) {
    newErrors.email = 'Please enter a valid email address';
    isValid = false;
  }

  // Password validation
  if (!password) {
    newErrors.password = 'Password is required';
    isValid = false;
  } else if (!validatePassword(password)) {
    newErrors.password = 'Password must be between 8 and 16 characters';
    isValid = false;
  }

  return [isValid, newErrors];
};

const validateEmail = (email: string) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const validatePassword = (password: string) => {
  return password.length >= 8 && password.length <= 16;
};
