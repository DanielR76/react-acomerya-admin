import React from 'react'
import SideBar from '../components/SideBar'

function AdminLayout(props) {
    return (
        <React.Fragment>
            <SideBar />
            {props.children}
        </React.Fragment>
    )
}

export default AdminLayout