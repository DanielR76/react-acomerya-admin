import React from 'react'
import NavBar from '../components/NavBar'

function AdminLayout(props) {
    return (
        <React.Fragment>
            <NavBar />
            {props.children}
        </React.Fragment>
    )
}

export default AdminLayout