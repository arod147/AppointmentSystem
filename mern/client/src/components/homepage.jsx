import { useEffect } from 'react'
import { Button, Stack, Card, CardImg } from 'react-bootstrap';
import {useNavigate } from 'react-router-dom'
import { useAppSelector } from '../app/hooks';
import { selectUserName } from '../app/userSlice';

const Homepage = () => {
    const username = useAppSelector(selectUserName)
    const navigate = useNavigate();
    useEffect(() => {
        if(username === null) {
            navigate('/')
        }
    }, [username, navigate]);

    return (
        <div>
            <Stack className="text-center align-items-center">
                <div style={{
                    backgroundImage: "url('https://via.placeholder.com/250')",
                    backgroundSize: 'cover',
                    backgroundPosition: 'center', 
                    width: '100%', 
                    height: '420px'
                    }}>
                    <div className='my-5'>
                        <h3 className="align-self-center">Build your store</h3>
                        <h4>Somthing shirts</h4>
                        <Button className='mt-3'>See More</Button>
                    </div>
                </div>
            </Stack>
            <Stack className='mt-5 text-center'>
                <div >
                    <h1>This is your space</h1>
                    <h4>Talk about your business, your products , or yourself.</h4>
                </div>
            </Stack>
            <Stack gap={5} className="m-5 justify-content-md-center">
                <p className='m-3'>Lorem ipsum dolor sit amet, consectetur 
                    adipisicing elit. Quod corrupti praesentium odio eum 
                    tempora dolorem voluptas ipsa dolore temporibus iure, possimus odit quasi
                    beatae delectus voluptates quis. Dolor, expedita.
                </p>
                <p className='m-3'>Lorem ipsum dolor sit amet, consectetur 
                    adipisicing elit. Quod corrupti praesentium odio eum 
                    tempora dolorem voluptas ipsa dolore temporibus iure, possimus odit quasi
                    beatae delectus voluptates quis. Dolor, expedita.
                </p>
            </Stack>
            <Stack className="mb-5 col-md-5 mx-auto text-center">
                <div>
                    <h3>Featured Products</h3>
                    <h4>Check out new and popular products</h4>
                </div>
            </Stack>
            <Stack className="col-md-5 mx-auto text-center" gap={3}>
                <Card style={{ width: '100%'}}>
                    <CardImg variant='top' src='https://via.placeholder.com/100'/>
                    <Card.Body>
                        <Card.Title>Product/Service</Card.Title>
                        <Card.Text>Short Description</Card.Text>
                        <Button varient='primary'>See more</Button>
                    </Card.Body>
                </Card>
                <Card style={{ width: '100%'}}>
                    <CardImg variant='top' src='https://via.placeholder.com/100'/>
                    <Card.Body>
                        <Card.Title>Product/Service</Card.Title>
                        <Card.Text>Short Description</Card.Text>
                        <Button varient='primary'>See more</Button>
                    </Card.Body>
                </Card>
                <Card style={{ width: '100%'}}>
                    <CardImg variant='top' src='https://via.placeholder.com/100'/>
                    <Card.Body>
                        <Card.Title>Product/Service</Card.Title>
                        <Card.Text>Short Description</Card.Text>
                        <Button varient='primary'>See more</Button>
                    </Card.Body>
                </Card>
            </Stack>
        </div>
    )
}

export default Homepage
