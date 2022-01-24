import { useEffect, useState } from 'react'
import { Dropdown } from 'react-bootstrap'
import DropdownItem from 'react-bootstrap/esm/DropdownItem';
import DropdownMenu from 'react-bootstrap/esm/DropdownMenu';
import DropdownToggle from 'react-bootstrap/esm/DropdownToggle';

import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css';


const ScheduleView = () => {
    const [list, updateList] = useState([])
    const [schedules, setSchedules] = useState([])
    //Gather all our schedules
    useEffect(() => {
       async function getSchedules() {
           const response = await fetch(`http://localhost:5000/schedules`)

           if (!response.ok) {
            const message = `An error occured: ${response.statusText}`;
            window.alert(message);
            return;
          }

          const schedules = await response.json();
          setSchedules(schedules);
       }

       getSchedules();
       return;
    }, [schedules.length])

    //useEffect(() => {
    //    console.log(list)
    //}, [list])

    //Dates get stored in our database as a JSON date type we use this to convert them back
    //to a javascript date type
    const handleConvert = (array) => {
        const listCopy = [...array]
        const convert = listCopy.map(item => {
             const daysConvertedList = item.days.map(day => {
                day.date = new Date(day.date)
                return day
            })

            item.days = daysConvertedList
            return item
        })
        //console.log(convert)
        updateList(convert)
    }

  

    //Display first four letters of scheduled employee name and shift times
    function tileContent({date}) {
        let foundDate
        const employee = list.find(item => {
            foundDate = item.days.find(day => day.date.getDate() === date.getDate())
            return foundDate !== undefined
        })
        if (employee !== undefined) {
            return (
                <div>
                    <p className='mt-3'>{employee.name.substr(0, 4)}</p>
                    <p className='mt-3'>{foundDate.startTime + ' ' + foundDate.endTime}</p>
                </div>
            )
        }
    }

    const monthList = schedules.map(schedule => {
        return <DropdownItem  key={schedule.month} onClick={() => handleConvert(schedule.scheduledDays)}>{schedule.month}</DropdownItem>
    })

    const scheduleList = (
        <Dropdown>
            <DropdownToggle variant='primary' id='dropdown-basic'>
                Choose Month
            </DropdownToggle>

            <DropdownMenu>
                {monthList}
            </DropdownMenu>
        </Dropdown>
    )

    return (
        <div>
            {scheduleList}
            <Calendar
                minDetail="month"
                nextLabel={null}
                next2Label={null}
                prevLabel={null}
                prev2Label={null}
                tileClassName='p-5'
                tileContent={tileContent}
                showNeighboringMonth={false}
            />
        </div>
    )
}

export default ScheduleView
