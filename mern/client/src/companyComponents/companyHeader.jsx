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
import { useEffect, useState } from 'react';
import { useAppSelector } from '../app/hooks';
import { selectFirstName, selectPosition } from '../app/userSlice';
  
  // Here, we display our Navbar
  export default function CompanyHeader() {
    const user = useAppSelector(selectFirstName);
    const position = useAppSelector(selectPosition)
    const [link, setLink] = useState('/login');

    useEffect(() => {
        if(position === 'employee') {
            setLink('/employeePage')
        }
        if(position === 'manager') {
            setLink('/managerPage')
        }
    }, [position])

    function clearLocalStorage() {
        localStorage.clear();
    }
    const MyNavBar = () => (
        <Navbar bg='dark' variant='dark' expand='lg'>
          <Container>
            <NavbarBrand href={link}>Home</NavbarBrand>
            <NavbarToggle aria-controls='basic-navbar-nav'/>
            <NavbarCollapse className='justify-content-end' id='basic-navbar-nav'>
              <Nav>
                <NavLink className='mx-3' href={link}>{user}</NavLink>
                <NavLink className='mx-3' onClick={() => clearLocalStorage()} href='/login'>Logout</NavLink>
              </Nav>
            </NavbarCollapse>
          </Container>
        </Navbar>
    )

    return (
      <div className='text-center'>
        <MyNavBar />
      </div>
    );
  }
  