import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import { NavLink } from 'react-router-dom'

function Header() {

    return (

        <Navbar collapseOnSelect expand="lg" bg="light" variant="light" style={{ marginBottom: "1.4rem" }}>

            <Navbar.Brand href="#home" style={{ paddingLeft: "1.5rem" }}>Vaccine Slot Tracker</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav" style={{ justifyContent: 'flex-end', paddingRight: "1.5rem" }}>
                <Nav>
                    <NavLink activeClassName="active" className="nav-link" to="/pin">Find By Pin</NavLink>
                    <NavLink activeClassName="active" className="nav-link" to="/">Find By District</NavLink>
                    {/* <NavLink activeClassName="active" className="nav-link" to="/about">Covid Protocols</NavLink> */}
                </Nav>
            </Navbar.Collapse>

        </Navbar>

    )
}

export default Header