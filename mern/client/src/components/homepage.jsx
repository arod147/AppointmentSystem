import { useEffect } from 'react'
import { Stack } from 'react-bootstrap';
import {useNavigate } from 'react-router-dom'
import { useAppSelector } from '../app/hooks';
import { selectUserName } from '../app/userSlice';
import Appointment from './appointment';

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
                <h2 className='my-5'>Appointments</h2>
            </Stack>
            <Stack>
                <Appointment />
            </Stack>
        </div>
    )
}

export default Homepage
