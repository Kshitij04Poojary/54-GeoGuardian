import { Routes, Route } from 'react-router-dom';

// components
import ChatWindow from './components/chats/ChatWindow';
import Map from './components/Map';

// pages
import Login from './pages/Login';
import Register from './pages/Register';
import ForgotPassword from './pages/ForgotPassword';
import AdminDashboard from './pages/AdminDashboard';
import EarthCanvas from './components/Earth';

// Layout
import SidebarLayout from './layout/SidebarLayout';
import ChatLayout from './layout/ChatLayout';

function App() {

  return (
    <>
    <EarthCanvas/>
    <Routes>
      <Route index path='/login' element={<Login />} />
      <Route path='/register' element={<Register />} />
      <Route path='/forgot-password' element={<ForgotPassword />} />
      <Route path='/dashboard' element={<SidebarLayout />}>
        <Route path='ngo' >
          <Route path='map' element={<Map />} />
          <Route path='analytics' element={<AdminDashboard />} />
          <Route element={<ChatLayout />} >
            <Route  path='collab' element={<ChatWindow />} />
          </Route>
          <Route path='refugee' />
        </Route>
      </Route>
    </Routes >
  )
}

export default App