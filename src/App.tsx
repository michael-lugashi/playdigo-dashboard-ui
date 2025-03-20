import './App.css';
import { Routes, Route } from 'react-router';
import Login from './components/login/Login';
import Dashboard from './components/dashboard/Dashboard';

function App() {
  return (
    <Routes>
      <Route index element={<Dashboard />} />
      <Route path="login" element={<Login />} />
    </Routes>
  );
}

export default App;
