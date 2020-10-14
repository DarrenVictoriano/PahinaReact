import React, { useContext, useState } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Typewriter from 'typewriter-effect';
import './navbar.css';
import '../../App.css';
import { PostContext } from '../../providers/postContext';
import { NavLink, useHistory } from 'react-router-dom';
import { useCookies } from 'react-cookie';

const NavBar = (props) => {

    const [expanded, setExpanded] = useState(false);
    const { mobileCheckState } = useContext(PostContext);
    const isMobile = mobileCheckState;

    const [cookies, setCookie, removeCookie] = useCookies(['token']);
    let history = useHistory();

    const handleLogout = () => {
        // reset to defaul value so we logout
        removeCookie('token', { path: '/' });
        history.push("/");

        // this is for mobile view
        setExpanded(false);
    }

    return (
        <Navbar fixed="top" expanded={expanded} expand="lg" className="bg-navy" variant={(isMobile ? "dark" : "text-slate")}>
            <Navbar.Brand className="brand-name">
                <NavLink
                    exact to="/deets"
                    className="brand-link"
                    activeClassName="active"
                    onClick={() => setExpanded(false)}>
                    <h1 className="brand-h1">
                        <Typewriter
                            options={{
                                strings: ['Darren', 'Victoriano', "へ‿(ツ)‿ㄏ", "Darren Victoriano"],
                                autoStart: true,
                                loop: true,
                                pauseFor: 100,
                                changeDeleteSpeed: 1,
                                changeDelay: 1
                            }}
                        />
                    </h1>
                </NavLink>

            </Navbar.Brand>
            <Navbar.Toggle onClick={() => setExpanded(expanded ? false : "expanded")} aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="mr-auto">

                </Nav>
                <Nav className="nav-link ">
                    <NavLink
                        exact to="/"
                        className="px-3 nav-link"
                        activeClassName="active"
                        onClick={() => setExpanded(false)}>
                        Home
                    </NavLink>

                    <NavLink
                        exact to="/portfolio"
                        className="px-3 nav-link"
                        activeClassName="active"
                        onClick={() => setExpanded(false)}>
                        Portfolio
                    </NavLink>

                    <NavLink
                        exact to="/blog"
                        className="px-3 nav-link"
                        activeClassName="active"
                        onClick={() => setExpanded(false)}>
                        Blog
                    </NavLink>

                    <NavLink
                        exact to="/resume/VR040.pdf"
                        className="px-3 nav-link"
                        target="_blank"
                        onClick={() => setExpanded(false)}>
                        Resume
                    </NavLink>

                    {cookies.token &&
                        <NavLink
                            exact to="/logout"
                            className="px-3 nav-link"
                            activeClassName="active"
                            onClick={handleLogout}>
                            <i className="fas fa-lock"></i>
                        </NavLink>
                    }

                </Nav>
            </Navbar.Collapse>
        </Navbar >
    );
}

export default NavBar;