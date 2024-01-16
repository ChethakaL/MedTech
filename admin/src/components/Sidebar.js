import React from 'react'
import { ProSidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import 'react-pro-sidebar/dist/css/styles.css';
import { Link } from 'react-router-dom';

function Sidebar( height) {
  return (
    <div style={{ display: 'flex', height: '100%', minHeight: '100vh' }}>
      <ProSidebar>
        <Menu iconShape="square">
          <MenuItem><Link to="/">Dashboard</Link></MenuItem>
          <MenuItem><Link to="/add">Add</Link></MenuItem>
        </Menu>
      </ProSidebar>
    </div>
  )
}

export default Sidebar