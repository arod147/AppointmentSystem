import { Button, Form, FormControl, FormGroup, FormLabel, FormSelect, Row, Col, ButtonGroup } from "react-bootstrap"
import { useState } from 'react'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css';

    const AvailableEmployees = (props) => (
        <option value={props.name}>{props.name}</option>
    )

    const AvailableTimes = (props) => (
        <Button value={props.time} className="m-1" variant="primary">{props.time}</Button>
    )

const CreateAppointment = () => {
    const [value, onChange] = useState(new Date())
    const employeeList = ['Alex', 'Mark']
    const [employeeInfo, updateEmployeeInfo] = useState(
        {
            firstName: 'Alex',
            lastName: 'Rodriguez',
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

    const times = employeeInfo.availableDays.map((day, index) => {
        return day.times.map(time => {
            return <AvailableTimes key={index} time={time}/>
        }) 
        })

    return (
        <div>
            <Form>
            <FormGroup className="mb-4">
                    <FormLabel>Services</FormLabel>
                    <FormSelect aria-label="Default select example">
                        <option>Please Choose A Service</option>
                        <option value="Service 1">Service 1</option>
                    </FormSelect>
                </FormGroup>
                <FormGroup className="mb-4">
                    <FormLabel>Staff</FormLabel>
                    <FormSelect aria-label="Default select example">
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
                        <FormControl type="text" placeholder="Enter First Name"/>
                    </FormGroup>
                    <FormGroup className="mb-4" as={Col}>
                        <FormLabel>Last Name</FormLabel>
                        <FormControl type="text" placeholder="Enter Last Name"/>
                    </FormGroup>
                </Row>
                <FormGroup className="mb-4">
                    <FormLabel>Email</FormLabel>
                    <FormControl type="email" placeholder="Enter Email"/>
                </FormGroup>
                <Button className="mb-4" variant="primary" type="submit">Submit</Button>
            </Form>
        </div>
    )
}

export default CreateAppointment
