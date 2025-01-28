import { Routes, Route } from 'react-router-dom';

// pages
import Login from './pages/Login';
import Register from './pages/Register';
import ForgotPassword from './pages/ForgotPassword';
import AdminDashboard from './pages/AdminDashboard';
import EarthCanvas from './components/Earth';

function App() {

  return (
    <>
    <EarthCanvas/>
    <Routes>
      <Route index path='/login' element={<Login />} />
      <Route path='/register' element={<Register />} />
      <Route path='/forgot-password' element={<ForgotPassword />} />
      <Route path='/dashboard' element={<AdminDashboard/>} />      
    </Routes>
    </>
  )
}

export default App