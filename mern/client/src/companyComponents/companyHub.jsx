import { Button, Stack } from 'react-bootstrap';
import CompanyHeader from './companyHeader'

const CompanyHub = () => {
    return (
        <div>
            <CompanyHeader />
            <Stack className="text-center align-items-center">
                <h2 className='my-5'>Welcome to the hub please login</h2>
                <Button href='/login' size='lg'>Login</Button>
            </Stack>
        </div>
    )
}

export default CompanyHub
