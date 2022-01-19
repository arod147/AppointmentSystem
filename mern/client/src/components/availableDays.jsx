import React from 'react'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css';

const AvailableDays = () => {
    
    return (
        <div>
            <Calendar
                minDetail="month"
                nextLabel={null}
                next2Label={null}
                prevLabel={null}
                prev2Label={null}
                showNeighboringMonth={false}
                onChange={onChange}
                value={value}
            />
        </div>
    )
}

export default AvailableDays
