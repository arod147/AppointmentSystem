import { Button } from 'react-bootstrap'

const ManagerPage = () => {
    return (
        <div>
            <h3>Hello manager</h3>
            <Button href='/createSchedule'>Create Schedule</Button>
            <Button href='/editSchedule'>Edit Schedule</Button>
        </div>
    )
}

export default ManagerPage
