import { useState } from 'react'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css';
const Appointment = () => {
    const [value, onChange] = useState(new Date())
    return (
        <div>
            <Calendar
                className='mx-auto'
                onChange={onChange}
                value={value}
            />
        </div>
    )
}

export default Appointment
