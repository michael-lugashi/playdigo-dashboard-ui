import { Routes, Route } from 'react-router';
import Login from './components/login/Login';
import Dashboard from './components/dashboard/Dashboard';
import AuthProvider from './components/login/AuthProvider';
import AxiosInterceptor from './components/general/AxiosInterceptor';
import AdminSettings from './components/adminSettings/AdminSettings';

function App() {
  return (
    <AuthProvider>
      <AxiosInterceptor>
        <Routes>
          <Route index element={<Dashboard />} />
          <Route path="login" element={<Login />} />
          <Route path="/admin" element={<AdminSettings />} />
        </Routes>
      </AxiosInterceptor>
    </AuthProvider>
  );
}

export default App;
