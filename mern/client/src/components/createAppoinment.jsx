import { Button, Form, FormControl, FormGroup, FormLabel, FormSelect, Row, Col, ButtonGroup } from "react-bootstrap"
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css';

    const AvailableEmployees = (props) => (
        <option value={props.name}>{props.name}</option>
    )

    const AvailableTimes = (props) => (
        <Button onClick={props.func} value={props.time} className="m-1" variant="primary">{props.time}</Button>
    )

const CreateAppointment = () => {
    const [value, onChange] = useState(new Date())
    const [schedules, setSchedules] = useState([])
    const [appointments, setAppointments] = useState([])
    const [employeeList, setEmployeeList] = useState([])
    const [unAvailableDays, setUnAvailableDays] = useState([])
    const [availableDays, setAvailableDays] = useState([])
    const [form, setForm] = useState({
        firstName: '',
        lastName: '',
        email: '',
        service: '',
        date: Date,
        time: 0,
        employeeName: ''
    })

    const navigate = useNavigate();

    function updateForm(value) {
        return setForm(prev => {
            return { ...prev, ...value};
        });
    }

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

        async function getAppointments() {
            const response = await fetch(`http://localhost:5000/appointments`)
            
            if (!response.ok) {
             const message = `An error occured: ${response.statusText}`;
             window.alert(message);
             return;
           }
           
           const appointments = await response.json();
           setAppointments(appointments);
        }
       
        function getEmployees() {
            const today = new Date();
            const monthList = ["January","February","March","April","May","June","July","August","September","October","November","December"];
            const month = monthList[today.getMonth()];
            const currentSchedule = schedules.find(schedule => schedule.month === month);
            const employeeList = currentSchedule.scheduledDays.map(employee => employee.name);

            setEmployeeList(employeeList);
        }

       getSchedules();
       getAppointments();
       if (schedules.length >= 1) {
           getEmployees()
       }
       //console.log(schedules)
       //console.log(appointments)
    }, [schedules.length, appointments.length])

    useEffect(() => {

        function getAvailableDays() {
            const today = new Date();
            const monthList = ["January","February","March","April","May","June","July","August","September","October","November","December"];
            const month = monthList[today.getMonth()];
            const currentSchedule = schedules.find(schedule => schedule.month === month);
            if (currentSchedule !== undefined) {
                const employee = currentSchedule.scheduledDays.find(employee => employee.name === form.employeeName);

                if (employee !== undefined) {
                    const times = employee.days.map(day => {
                        
                        const convertToHour = (time) => {
                            const hour = time.charAt(0);
                            const dayOrNight = time.charAt(time.length - 2)
                            const hourNumber = parseInt(hour);
                            if (dayOrNight === 'a') {
                                return hourNumber
                            } else {
                                return hourNumber + 12
                            }
                        }

                        const start = convertToHour(day.startTime);
                        const end = convertToHour(day.endTime);
                        const timesList = []

                        for(let i = start; i < end; i++) {
                            let current = i;
                            if(current <= 12 ) {
                                timesList.push(current.toString() + ':00am')
                            } else {
                               current = current - 12
                               timesList.push(current.toString() + ':00pm')
                            }
                        }

                        return {
                            date: new Date(day.date),
                            times: timesList
                        }
                    })

                    const filterDays = times.map(day => {

                        const availableTimes = day.times.filter(time => {
                            const foundApp = appointments.find(app => {
                                const date = new Date(app.date)
                                return app.time === time && date.getDate() === day.date.getDate()
                            });
                            return foundApp === undefined;
                        })
                        day.times = availableTimes;
                        return day
                    })
                    console.log(filterDays)
                    setAvailableDays(filterDays);
                } else {
                    setAvailableDays([])
                }
            }
        }

        function getUnAvailableDays() {
            const today = new Date();
            const monthList = ["January","February","March","April","May","June","July","August","September","October","November","December"];
            const month = monthList[today.getMonth()];
            const currentSchedule = schedules.find(schedule => schedule.month === month);
            if (currentSchedule !== undefined) {
                const employee = currentSchedule.scheduledDays.find(employee => employee.name === form.employeeName);

                if (employee !== undefined) {
                    const days = employee.days.map(day => new Date(day.date));
                    const daysInMonth = new Date(today.getFullYear(), today.getDate(), 0).getDate()
                    const daysInMonthList = []
                    for(let i = 1; i <= daysInMonth; i++ ) {
                        daysInMonthList.push(i)
                    }
                    const unAvailableDays = daysInMonthList.filter(day => {
                        const found = days.find(date => date.getDate() === day);
                        return found === undefined
                    })
                    setUnAvailableDays(unAvailableDays);
                } else {
                    setUnAvailableDays([])
                }
            }
        }
        getUnAvailableDays();
        getAvailableDays();
    }, [form.employeeName, form.date])

    useEffect(() => {
        console.log(form)
    }, [form])

    const emps = employeeList.map((emp, index) => {
        return <AvailableEmployees key={index} name={emp}/>
    })
    //Show availbale days 
    function disableTiles({date}) {
        if(unAvailableDays.length >= 1){
            return unAvailableDays.find(day => day === date.getDate())
        } else {
            return date.getDay() !== 7
        }
    }

    const times = availableDays.map(day => {
        if(day.date.getDate() === value.getDate()) {
            return day.times.map((time, index) => {
                return <AvailableTimes key={index} func={() => updateForm({ time: time})} time={time}/>
            }) 
        }
    })

    async function onSubmit(e) {
        e.preventDefault();

        const newAppointment = { ...form }
        if(newAppointment.date === Date || newAppointment.time === 0) {
            window.alert('Please select a date and time')
            return;
        }
        
        await fetch('http://localhost:5000/addAppointment', {
            method: 'POST',
            headers: {
                'Content-type' : 'application/json',
            },
            body: JSON.stringify(newAppointment)
        })
        .catch(error => {
            window.alert(error);
            navigate('/createAppointment')
        })

        setForm({
            firstName: '',
            lastName: '',
            email: '',
            service: '',
            time: '',
            date: Date,
            employeeName: '',
        })
        navigate('/')
    }

    return (
        <div>
            <Form onSubmit={onSubmit}>
            <FormGroup className="mb-4">
                    <FormLabel>Services</FormLabel>
                    <FormSelect 
                        required
                        aria-label="Default select example"
                        value={form.service}
                        onChange={(e) => updateForm({ service: e.target.value })}
                    >
                        <option value="">Please Choose A Service</option>
                        <option value="Service 1">Service 1</option>
                    </FormSelect>
                </FormGroup>
                <FormGroup className="mb-4">
                    <FormLabel>Staff</FormLabel>
                    <FormSelect 
                        required
                        aria-label="Default select example"
                        value={form.employeeName}
                        onChange={(e) => updateForm({ employeeName: e.target.value })}
                    >
                        <option value="">Choose Staff employee</option>
                        {emps}
                    </FormSelect>
                </FormGroup>
                <Row>
                    <FormGroup className="mb-4" as={Col}>
                        <FormLabel>Date</FormLabel>
                        <Calendar
                            minDetail="month"
                            nextLabel={null}
                            next2Label={null}
                            prevLabel={null}
                            prev2Label={null}
                            tileDisabled={disableTiles}
                            showNeighboringMonth={false}
                            onChange={(value) => {
                                onChange(value);
                                updateForm({date: value});
                            }}
                            value={value}
                        />
                    </FormGroup>
                    <FormGroup className="mb-4" as={Col}>
                        <FormLabel>Time</FormLabel>
                        <ButtonGroup aria-label="Basic example">
                            <Col>
                                {times}
                            </Col>
                        </ButtonGroup>
                    </FormGroup>
                </Row>
                <Row>
                    <FormGroup className="mb-4" as={Col}>
                        <FormLabel>First Name</FormLabel>
                        <FormControl
                            required
                            type="text"
                            id="firstName"
                            placeholder="Enter First Name"
                            value={form.firstName}
                            onChange={(e) => updateForm({ firstName: e.target.value })}
                        />
                    </FormGroup>
                    <FormGroup className="mb-4" as={Col}>
                        <FormLabel>Last Name</FormLabel>
                        <FormControl
                            required 
                            type="text" 
                            id="lastName"
                            placeholder="Enter Last Name"
                            value={form.lastName}
                            onChange={(e) => updateForm({ lastName: e.target.value })}
                        />
                    </FormGroup>
                </Row>
                <FormGroup className="mb-4">
                    <FormLabel>Email</FormLabel>
                    <FormControl
                        required
                        type="email"
                        id="email"
                        placeholder="Enter Email"
                        value={form.email}
                        onChange={(e) => updateForm({ email: e.target.value })}
                    />
                </FormGroup>
                <Button className="mb-4" variant="primary" type="submit">Submit</Button>
            </Form>
        </div>
    )
}

export default CreateAppointment
