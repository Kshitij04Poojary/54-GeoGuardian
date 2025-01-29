import { Routes, Route } from 'react-router-dom';

// components
import ChatWindow from './components/chats/Forum';
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
import NoticeForm from './components/forms/NoticeForm';
import NoticesPage from './pages/NoticesPage';
import RefugeeArea from './pages/RefugeeArea';
import RefugeeAreaDetails from './pages/RefugeeAreaDetails';

import { UserContextProvider } from './context/UserContext';
import UpdateDashboard from './pages/UpdateDashboard';
import CoordinateDisplay from './pages/CoordinateDisplay';

function App() {

  return (
    <UserContextProvider>
      <Routes>
        <Route index path='/' element={<Landing />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/forgot-password' element={<ForgotPassword />} />
     
        <Route path='/dashboard' element={<SidebarLayout />}>
            <Route path='map' element={<Map />} />
            <Route path='notices' element={<NoticesPage />} />
            <Route path='aid' element={<FirstAidPage />} />
            <Route path='analytics' element={<AdminDashboard />} />
            <Route path='forum' element={<ChatWindow />} />
            <Route path='refugeearea' element={<RefugeeArea />} />
            <Route path='refugeearea/:id' element={<RefugeeAreaDetails />} />
            <Route path='geoanalysis' element={<CoordinateDisplay/>}/>
        </Route>

        <Route path='/update-dashboard' element={<UpdateDashboard />} />
        
      </Routes >
    </UserContextProvider>
  )
}

export default App