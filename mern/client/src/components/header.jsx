import { Container, Nav, Navbar, NavbarBrand, NavLink } from 'react-bootstrap';

// We import bootstrap to make our application look better.
import "bootstrap/dist/css/bootstrap.css";
import NavbarToggle from 'react-bootstrap/esm/NavbarToggle';
import NavbarCollapse from 'react-bootstrap/esm/NavbarCollapse';

// Here, we display our Navbar
export default function Header() {
  return (
    <div className='text-center'>
      <Navbar bg='dark' variant='dark' expand='lg'>
        <Container>
          <NavbarBrand href='/homepage'>Home</NavbarBrand>
          <NavbarToggle aria-controls='basic-navbar-nav'/>
          <NavbarCollapse className='justify-content-end' id='basic-navbar-nav'>
            <Nav>
              <NavLink className='mx-3' href='/homepage'>Link 1</NavLink>
              <NavLink className='mx-3' href='/homepage'>Link 2</NavLink>
              <NavLink className='mx-3' href='/homepage'>Link 3</NavLink>
              <NavLink className='mx-3' href='/homepage'>Link 4</NavLink>
            </Nav>
          </NavbarCollapse>
        </Container>
      </Navbar>
    </div>
  );
}
