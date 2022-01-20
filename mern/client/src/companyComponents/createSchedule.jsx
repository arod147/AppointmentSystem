import { useState } from 'react'
import { Button, Form, FormGroup, FormLabel, FormSelect, Modal, ModalBody, ModalTitle } from 'react-bootstrap'
import ModalHeader from 'react-bootstrap/esm/ModalHeader';
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css';

const CreateSchedule = () => {
    const [value, onChange] = useState(new Date())
    const [showAdd, setShowAdd] = useState(false);
    const [showEdit, setShowEdit] = useState(false);
    const [list, updateList] = useState([])

    const handleClose = () => {
        setShowAdd(false)
        setShowEdit(false)
    }

    const handleShowAdd = () => setShowAdd(true);
    const handleShowEdit = () => setShowEdit(true);
    
    const [form, setForm] = useState({
        date: Date,
        employee: '',
        startTime: 0,
        endTime: 0
    })

    function updateForm(value) {
        return setForm(prev => {
            return { ...prev, ...value};
        });
    }

    //Handles adding and editing our schedule
    function onSubmit(e) {
        e.preventDefault();
        const employee = { ...form}
        const employeeIndex = list.findIndex(curr => curr.date.getDate() === employee.date.getDate())

        if (employeeIndex !== -1) {
            updateList(list.map((item, index) => {
                return index === employeeIndex ? employee : item;
            }));
            return setForm({ date: Date, employee: '', });
        }

        updateList(currentList => [...currentList, employee])
        setForm({ date: Date, employee: '', })
        handleClose();
    }

    function onDelete() {
        updateList(list.filter(item => item.date.getDate() !== form.date.getDate()));
        setForm({ date: Date, employee: '', });
        handleClose();
    };

    //Display first four letters of scheduled employee name
    function tileContent({date}) {
        const employee = list.find(curr => curr.date.getDate() === date.getDate())
        if (employee !== undefined) {
            return <p className='mt-3'>{employee.employee.substr(0, 4)}</p>
        }
    }
    //Display add or edit for current date
    function modifyDate(date) {
        const employee = list.find(curr => curr.date.getDate() === date.getDate())
        if (employee === undefined) {
            return handleShowAdd()
        } else {
            updateForm(employee)
            return handleShowEdit()
        }
    }

    //Add to current date
    const addModal = (
        <Modal show={showAdd} onHide={handleClose}>
            <ModalHeader closeButton>
                <ModalTitle>Add To Date</ModalTitle>
            </ModalHeader>
            <ModalBody>
                <Form onSubmit={onSubmit}>
                    <FormGroup>
                        <FormSelect
                        required
                        aria-label="Default select example"
                        value={form.employee}
                        onChange={(e) => updateForm({ date: value, employee: e.target.value})}
                        >
                            <option value=''>Choose employee</option>
                            <option value='Alex'>Alex</option>
                            <option value='Jack'>Jack</option>
                            <option value='Mark'>Mark</option>
                        </FormSelect>
                    </FormGroup>
                    <FormGroup>
                        <FormSelect
                        required 
                        aria-label="Default select example"
                        value={form.startTime}
                        onChange={(e) => updateForm({ date: value, startTime: e.target.value})}
                        >
                            <option value=''>Choose Start time</option>
                            <option value='8:00am'>8:00am</option>
                            <option value='9:00am'>9:00am</option>
                            <option value='10:00am'>10:00am</option>
                        </FormSelect>
                    </FormGroup>
                    <FormGroup>
                        <FormSelect
                        required 
                        aria-label="Default select example"
                        value={form.endTime}
                        onChange={(e) => updateForm({ date: value, endTime: e.target.value})}
                        >
                            <option value=''>Choose End time</option>
                            <option value='8:00pm'>8:00pm</option>
                            <option value='9:00pm'>9:00pm</option>
                            <option value='10:00pm'>10:00pm</option>
                        </FormSelect>
                    </FormGroup>
                    <Button className='mt-3' type='submit' variant='primary'>Submit</Button>
                </Form>
            </ModalBody>
            <Button variant='secondary' onClick={handleClose}>Close</Button>
        </Modal>
    )
    
    //Edit current date
    const editModal = (
        <Modal show={showEdit} onHide={handleClose}>
            <ModalHeader closeButton>
                <ModalTitle>Edit Date</ModalTitle>
            </ModalHeader>
            <ModalBody>
                <Form onSubmit={onSubmit}>
                    <FormGroup>
                        <FormSelect 
                        aria-label="Default select example"
                        value={form.employee}
                        onChange={(e) => updateForm({ date: value, employee: e.target.value})}
                        >
                            <option value=''>Choose employee</option>
                            <option value='Alex'>Alex</option>
                            <option value='Jack'>Jack</option>
                            <option value='Mark'>Mark</option>
                        </FormSelect>
                    </FormGroup>
                    <FormGroup>
                        <FormSelect 
                        aria-label="Default select example"
                        value={form.startTime}
                        onChange={(e) => updateForm({ date: value, startTime: e.target.value})}
                        >
                            <option value=''>Choose Start time</option>
                            <option value='8:00am'>8:00am</option>
                            <option value='9:00am'>9:00am</option>
                            <option value='10:00am'>10:00am</option>
                        </FormSelect>
                    </FormGroup>
                    <FormGroup>
                        <FormSelect
                        aria-label="Default select example"
                        value={form.endTime}
                        onChange={(e) => updateForm({ date: value, endTime: e.target.value})}
                        >
                            <option value=''>Choose End time</option>
                            <option value='8:00pm'>8:00pm</option>
                            <option value='9:00pm'>9:00pm</option>
                            <option value='10:00pm'>10:00pm</option>
                        </FormSelect>
                    </FormGroup>
                    <Button className='mt-3' onClick={handleClose} type='submit' variant='primary'>Submit</Button>
                    <Button className='mt-3' onClick={onDelete} variant='danger'>Delete</Button>
                </Form>
            </ModalBody>
            <Button variant='secondary' onClick={handleClose}>Close</Button>
        </Modal>
    )

    return (
        <div>
            {addModal}
            {editModal}
            <Form>
                <FormGroup className='mb-4'>
                    <FormLabel></FormLabel>
                    <Calendar
                        minDetail="month"
                        nextLabel={null}
                        next2Label={null}
                        prevLabel={null}
                        prev2Label={null}
                        tileClassName='p-5'
                        tileContent={tileContent}
                        showNeighboringMonth={false}
                        value={value}
                        onChange={onChange}
                        onClickDay={(e) => modifyDate(e)}
                    />
                </FormGroup>
            </Form>
        </div>
    )
}

export default CreateSchedule
