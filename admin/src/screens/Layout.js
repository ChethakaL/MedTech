import React from 'react'
import { Outlet, Link } from "react-router-dom";
import Sidebar from '../components/Sidebar';

function Layout() {
  return (
    <div className="admin-layout">
        <div className="sidebar-layout">
            <Sidebar height={'100%'}/>
        </div>
        <div className="admin-main">
            <Outlet />
        </div>
    </div>
  )
}

export default Layout