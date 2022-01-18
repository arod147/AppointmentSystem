import { Container, Navbar, NavbarBrand, } from 'react-bootstrap';

// We import bootstrap to make our application look better.
import "bootstrap/dist/css/bootstrap.css";

// Here, we display our Navbar
export default function Header() {
  return (
    <div className='text-center'>
      <Navbar bg='dark' variant='dark' expand='lg'>
        <Container>
          <NavbarBrand href='/'>Home</NavbarBrand>
        </Container>
      </Navbar>
    </div>
  );
}
