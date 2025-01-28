import { Routes, Route } from 'react-router-dom';

// pages
import Login from './pages/Login';
import Register from './pages/Register';
import ForgotPassword from './pages/ForgotPassword';

function App() {

  return (
    <Routes>
      <Route index path='/login' element={<Login />} />
      <Route path='/register' element={<Register />} />
      <Route path='/forgot-password' element={<ForgotPassword />} />
    </Routes>
  )
}

export default App