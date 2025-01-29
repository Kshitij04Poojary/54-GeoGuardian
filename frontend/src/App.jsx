import { Routes, Route } from 'react-router-dom';

// components
import ChatWindow from './components/chats/ChatWindow';
import Map from './components/Map';

// pages
import Login from './pages/Login';
import Register from './pages/Register';
import ForgotPassword from './pages/ForgotPassword';
import AdminDashboard from './pages/AdminDashboard';
import Landing from './pages/Landing';
import FirstAidPage from './pages/FirstAidPage';

// Layout
import SidebarLayout from './layout/SidebarLayout';
import ChatLayout from './layout/ChatLayout';
import NoticeForm from './components/forms/NoticeForm';
import NoticesPage from './pages/NoticesPage';
import RefugeeArea from './pages/RefugeeArea';
import RefugeeAreaDetails from './pages/RefugeeAreaDetails';
function App() {

  return (
    <>
      {/* <EarthCanvas/> */}
      <Routes>
        <Route index path='/' element={<Landing />} />
        <Route index path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/forgot-password' element={<ForgotPassword />} />
        <Route path='/notices' element={<NoticesPage />} />
        <Route path='/notices/add' element={<NoticeForm />} />
        <Route path='/firstaid' element={<FirstAidPage />} />
        <Route path='/dashboard' element={<SidebarLayout />}>
          <Route path='ngo' >
            <Route path='map' element={<Map />} />
            <Route path='analytics' element={<AdminDashboard />} />
            <Route element={<ChatLayout />} >
              <Route path='collab' element={<ChatWindow />} />
            </Route>
            <Route path='refugee' />
          </Route>
        </Route>
        <Route path='/refugeearea' element={<RefugeeArea />} />
        <Route path='/refugeearea/:id' element={<RefugeeAreaDetails />} />
      </Routes >
    </>
  )
}

export default App