import './App.css';
import { Routes, Route } from 'react-router';
import Login from './components/login/Login';
import Dashboard from './components/dashboard/Dashboard';
import AuthProvider from './components/login/AuthProvider';
import AxiosInterceptor from './components/general/AxiosInterceptor';

function App() {
  return (
    <AuthProvider>
      <AxiosInterceptor>
        <Routes>
          <Route index element={<Dashboard />} />
          <Route path="login" element={<Login />} />
        </Routes>
      </AxiosInterceptor>
    </AuthProvider>
  );
}

export default App;
