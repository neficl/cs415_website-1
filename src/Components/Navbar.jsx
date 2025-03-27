import React, {useState, useEffect} from 'react'
import "./Navbar.css"
import { Link } from 'react-router-dom'
import * as Icons from "react-icons/fa"
import { Navbar, Nav } from 'rsuite';
import 'rsuite/Navbar/styles/index.css';
import 'rsuite/Nav/styles/index.css';


function NavbarTop() {
    const [dropdown, setDropdown] = useState(false);
    const [pages, setPages] = useState([]);

    useEffect(() => {
        fetch(process.env.REACT_APP_API_URL_BASE + '/pages/')
        .then(res => res.json())
        .then(data => {
            setPages(data)
        })
        .catch(error => console.error(error));
    }, []);
  return (
    <>
        <Navbar>
            <Nav>
                <Nav.Item>
                    <Link to="/" className="navbar-logo">
                        CS415
                        <Icons.FaServer />
                    </Link>
                </Nav.Item>
                <Nav.Item><Link to="/" className="navbar-item">Home</Link></Nav.Item>
                <Nav.Item><Link to="/login" className="navbar-item">Login</Link></Nav.Item>
                <Nav.Item><Link to="/userprofile" className="navbar-item">User Profile</Link></Nav.Item>
                <Nav.Item><Link to="/users" className="navbar-item">Users</Link></Nav.Item>
                <Nav.Menu title="Modules" className="navbar-item">
                    {
                        pages.map((page,i) => (
                            <Nav.Item>
                                <Link to={'/modules/' + page.page_data_id} className="navbar-menu">{page.page_menu}</Link>
                            </Nav.Item>
                        ))
                    }
                </Nav.Menu>
                </Nav>
                <Nav pullRight>
                <Nav.Item><Link to="/register"><button className="btn">Register</button></Link></Nav.Item>
            </Nav>
        </Navbar>

    </>
  )
}

export default NavbarTop

