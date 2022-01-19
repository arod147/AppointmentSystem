import { Button, Form, FormControl, FormGroup, FormLabel, FormSelect, Row, Col, ButtonGroup } from "react-bootstrap"
import Calendar from "react-calendar"
import { useEffect, useState } from 'react'
import 'react-calendar/dist/Calendar.css';
//First and last name
//Service type
//Date and time
//Email address for comfirmation
const CreateAppointment = () => {
    const [value, onChange] = useState(new Date())
    useEffect(() => {

    }, [])
    return (
        <div>
            <Form>
                <FormGroup className="mb-4">
                    <FormLabel>Staff</FormLabel>
                    <FormSelect aria-label="Default select example">
                        <option>Choose Staff employee</option>
                        <option value="Staff 1">Staff 1</option>
                        <option value="Staff 2">Staff 2</option>
                        <option value="Staff 3">Staff 3</option>
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
                            showNeighboringMonth={false}
                            onChange={onChange}
                            value={value}
                        />
                    </FormGroup>
                    <FormGroup className="mb-4" as={Col}>
                        <FormLabel>Time</FormLabel>
                        <ButtonGroup aria-label="Basic example">
                            <Col>
                                <Button className="m-1" variant="primary">1:00pm</Button>
                                <Button className="m-1" variant="primary">1:00pm</Button>
                                <Button className="m-1" variant="primary">1:00pm</Button>
                                <Button className="m-1" variant="primary">1:00pm</Button>
                                <Button className="m-1" variant="primary">1:00pm</Button>
                                <Button className="m-1" variant="primary">1:00pm</Button>
                                <Button className="m-1" variant="primary">1:00pm</Button>
                                <Button className="m-1" variant="primary">1:00pm</Button>
                                <Button className="m-1" variant="primary">1:00pm</Button>
                                <Button className="m-1" variant="primary">1:00pm</Button>
                                <Button className="m-1" variant="primary">1:00pm</Button>
                                <Button className="m-1" variant="primary">1:00pm</Button>
                                <Button className="m-1" variant="primary">1:00pm</Button>
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
