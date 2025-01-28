import { Outlet } from "react-router-dom"
import Sidebar from '../components/Sidebar';

const SidebarLayout = () => {

    return (
        <div className='flex'>
            <Sidebar />
            <div className="flex-1 h-screen" >
                <Outlet />
            </div>
        </div>
    )
}

export default SidebarLayout