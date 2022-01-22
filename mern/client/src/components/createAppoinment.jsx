import { Button, Form, FormControl, FormGroup, FormLabel, FormSelect, Row, Col, ButtonGroup } from "react-bootstrap"
import { useEffect, useState } from 'react'
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
    const [form, setForm] = useState({
        firstName: '',
        lastName: '',
        email: '',
        service: '',
        date: Date,
        time: 0,
        employeeName: ''
    })

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
       
       getSchedules();
       getAppointments();
       console.log(schedules)
       console.log(appointments)
    }, [schedules.length, appointments.length])

    useEffect(() => {
        console.log(form)
    }, [form])

    const employeeList = ['Alex', 'Mark']
    const [employeeInfo, updateEmployeeInfo] = useState(
        {
            firstName: 'Alex',
            availableDays: [
                {
                    date: value,
                    times: ['1:00pm', '2:00pm', '3:00pm']
                }
            ]
        }
    )



    const emps = employeeList.map((emp, index) => {
        return <AvailableEmployees key={index} name={emp}/>
    })
    //Show availbale days 
    function disableTiles({date}) {
        return employeeInfo.availableDays.find(day => day.date.getDate() !== date.getDate())
    }

    const times = employeeInfo.availableDays.map(day => {
        return day.times.map((time, index) => {
            return <AvailableTimes key={index} func={() => updateForm({ time: time})} time={time}/>
        }) 
    })

    return (
        <div>
            <Form>
            <FormGroup className="mb-4">
                    <FormLabel>Services</FormLabel>
                    <FormSelect 
                        required
                        aria-label="Default select example"
                        value={form.service}
                        onChange={(e) => updateForm({ service: e.target.value })}
                    >
                        <option>Please Choose A Service</option>
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
                        <option>Choose Staff employee</option>
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
                            onChange={onChange}
                            onChange={() => updateForm({ date: value})}
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
