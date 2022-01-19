import { 
  Container, 
  Navbar, 
  NavbarBrand, 
  Nav,
  NavLink } from 'react-bootstrap';
import NavbarToggle from 'react-bootstrap/esm/NavbarToggle';
import NavbarCollapse from 'react-bootstrap/esm/NavbarCollapse';

// We import bootstrap to make our application look better.
import "bootstrap/dist/css/bootstrap.css";

// Here, we display our Navbar
export default function Header() {
  return (
    <div className='text-center'>
      <Navbar bg='dark' variant='dark' expand='lg'>
        <Container>
          <NavbarBrand href='/'>Home</NavbarBrand>
          <NavbarToggle aria-controls='basic-navbar-nav'/>
          <NavbarCollapse className='justify-content-end' id='basic-navbar-nav'>
            <Nav>
              <NavLink className='mx-3' href='/login'>Login</NavLink>
            </Nav>
          </NavbarCollapse>
        </Container>
      </Navbar>
    </div>
  );
}
