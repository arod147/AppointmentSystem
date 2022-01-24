import { Button, Stack } from 'react-bootstrap';
import Header from './header';


const Homepage = () => {
    return (
        <div>
            <Header />
            <Stack className="text-center align-items-center">
                <h2 className='my-5'>Create an Appointment</h2>
                <Button href='/createAppoinment' size='lg'>Schedule Now</Button>
            </Stack>
        </div>
    )
}

export default Homepage
