import { Button, Modal, Table,  ModalTitle, ModalBody, Col } from 'react-bootstrap'
import { useEffect, useState } from 'react'
import ModalHeader from 'react-bootstrap/esm/ModalHeader'
import { useNavigate } from 'react-router'
const Appointment = (props) => (
    <tr>
        <td>{props.appointment.firstName} {props.appointment.lastName}</td>
        <td>{props.appointment.service}</td>
        <td>{props.appointment.time}</td>
        <td>{props.appointment.date}</td>
        <td>{props.appointment.email}</td>
        <td>{props.appointment.employeeName}</td>
        <td>
            <Button onClick={(e) => props.func(e.target.value, props.appointment)} value='success' variant='success'>Confirm</Button>
        </td>
        <td>
            <Button onClick={(e) => props.func(e.target.value, props.appointment)} value='danger' variant='danger'>Cancel</Button>
        </td>
        <td>
            <Button onClick={(e) => props.func(e.target.value, props.appointment)} value='primary' variant='primary'>Edit</Button>
        </td>
    </tr>
)



const ManagerPage = () => {
    const [appointments, setAppointments] = useState([])
    const [showConfirm, setShowConfirm] = useState(false);
    const [showCancel, setShowCancel] = useState(false);
    const [showEdit, setShowEdit] = useState(false);
    const [selectedAppointment, setSelectedAppointment] = useState({})

    const navigate = useNavigate();
    const handleClose = () => {
        setShowConfirm(false)
        setShowCancel(false)
        setShowEdit(false)
        setSelectedAppointment({})
    }

    const handleShowConfirm = () => setShowConfirm(true);
    const handleShowCancel = () => setShowCancel(true);
    const handleShowEdit = () => setShowEdit(true);

    function openModal(value, appointment) {
        setSelectedAppointment(appointment)
        if(value === 'success') {
            return handleShowConfirm();
        }

        if(value === 'danger') {
            return handleShowCancel();
        }

        if(value === 'primary') {
            return handleShowEdit();
        }
    }

    async function onDelete() {
        const appointment = {...selectedAppointment}
        await fetch('http://localhost:5000/deleteAppointment', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(appointment),
        })
        .catch(error => {
            window.alert('Error deleting appointment');
            navigate('/');
            return;
        });
        const newAppointmentList = appointments.filter(app => app.date !== appointment.date && app.time !== appointment.time)
        setAppointments(newAppointmentList)
        setSelectedAppointment({})
        handleClose();
        navigate('/managerPage')
    }

    useEffect(() => {
        const getAppointments = async() => {
            const response = await fetch('http://localhost:5000/appointments') 
        
            if (!response.ok) {
                const message = `An error occured: ${response.statusText}`;
                window.alert(message);
                return;
              }
    
              const appointments = await response.json();
              const convertDates = appointments.map(app => {
                  app.date = new Date(app.date).toDateString();
                  return app
              })
              setAppointments(convertDates);
        }

        getAppointments();
        return;
    }, [appointments.length])

const appointmentList = appointments.map((app, index) => {
    return <Appointment func={openModal} appointment={app} key={index}/>
})

const confirmModal = (
    <Modal show={showConfirm} onHide={handleClose}>
    <ModalHeader closeButton>
        <ModalTitle>Confirm Appointment</ModalTitle>
    </ModalHeader>
    <ModalBody>
        <h5>Customer: {selectedAppointment.firstName}</h5>
        <h5>Date: {selectedAppointment.date}</h5>
        <h5>Time: {selectedAppointment.time}</h5>
        <h5>Email: {selectedAppointment.email}</h5>
        <h5>Employee: {selectedAppointment.employeeName}</h5>
        <h5>Service: {selectedAppointment.service}</h5>
    </ModalBody>
    <Col>
        <Button className='m-2' variant='success'>Confirm</Button>
        <Button className='m-2' variant='danger' onClick={handleClose}>Cancel</Button>
    </Col>
</Modal>
)

const cancelModal = (
    <Modal show={showCancel} onHide={handleClose}>
    <ModalHeader closeButton>
        <ModalTitle>Are you sure you want to cancel?</ModalTitle>
    </ModalHeader>
    <ModalBody>
        <h5>Customer: {selectedAppointment.firstName}</h5>
        <h5>Date: {selectedAppointment.date}</h5>
        <h5>Time: {selectedAppointment.time}</h5>
        <h5>Email: {selectedAppointment.email}</h5>
        <h5>Employee: {selectedAppointment.employeeName}</h5>
        <h5>Service: {selectedAppointment.service}</h5>
    </ModalBody>
    <Col>
        <Button className='m-2' variant='danger' onClick={() => onDelete()}>Cancel</Button>
        <Button className='m-2' variant='secondary' onClick={handleClose}>Close</Button>
    </Col>
</Modal>
)

const editlModal = (
    <Modal show={showEdit} onHide={handleClose}>
    <ModalHeader closeButton>
        <ModalTitle>Are you sure you want to edit?</ModalTitle>
    </ModalHeader>
    <ModalBody>
        <h5>Customer: {selectedAppointment.firstName}</h5>
        <h5>Date: {selectedAppointment.date}</h5>
        <h5>Time: {selectedAppointment.time}</h5>
        <h5>Email: {selectedAppointment.email}</h5>
        <h5>Employee: {selectedAppointment.employeeName}</h5>
        <h5>Service: {selectedAppointment.service}</h5>
    </ModalBody>
    <Col>
        <Button className='m-2' variant='primary'>Edit</Button>
        <Button className='m-2' variant='danger' onClick={handleClose}>Cancel</Button>
    </Col>
</Modal>
)



    return (
        <div>
            {confirmModal}
            {cancelModal}
            {editlModal}
            <h3>Hello manager</h3>
            <Button className='m-1' href='/createSchedule'>Create Schedule</Button>
            <Button className='m-1' href='/editSchedule'>Edit Schedule</Button>
            <br />
            <h2>Appointments</h2>
            <Table striped bordered hover variant="dark" className="mt-4">
                <thead>
                    <tr>
                        <th>Customer Name</th>
                        <th>Service</th>
                        <th>Time</th>
                        <th>Date</th>
                        <th>Email</th>
                        <th>Employee Name</th>
                        <th>Confirm</th>
                        <th>Cancel</th>
                        <th>Edit</th>
                    </tr>
                </thead>
                <tbody>{appointmentList}</tbody>
            </Table>
        </div>
    )
}

export default ManagerPage
