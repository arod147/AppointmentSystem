import { useEffect, useState } from 'react'
import { Button, Form, FormGroup, FormLabel, FormSelect, Modal, ModalBody, ModalTitle } from 'react-bootstrap'
import ModalHeader from 'react-bootstrap/esm/ModalHeader';
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css';
import { useNavigate } from 'react-router'

const CreateSchedule = () => {
    const navigate = useNavigate();
    const [value, onChange] = useState(new Date())
    const [showAdd, setShowAdd] = useState(false);
    const [showEdit, setShowEdit] = useState(false);
    const [list, updateList] = useState([])

    useEffect(() => {
       console.log(list)
    }, [list])

    const handleClose = () => {
        setShowAdd(false)
        setShowEdit(false)
    }

    const handleAdd = (index, todo) => {
        const newList = [...list];
        newList[index].days.push(todo)
        updateList(newList)
    } 

    const handleUpdate = (index, innerIndex, todo) => {
        const newList = [...list];
        newList[index].days[innerIndex] = todo;
        updateList(newList)
    }

    const handleShowAdd = () => setShowAdd(true);
    const handleShowEdit = () => setShowEdit(true);

    const [form, setForm] = useState({
        employee: '',
        date: Date,
        startTime: 0,
        endTime: 0
    })

    function updateForm(value) {
        return setForm(prev => {
            return { ...prev, ...value};
        });
    }

    //Handles adding and editing our schedule
    //Need to fix submit
    //Bugs
    // 1. when adding to days array -1 index is pushed???
    // 2. When updating name for date need to remove that date from employee days list
    // 3. onDelete needs to be able to remove a date from dats list
    function onSubmit(e) {
        e.preventDefault();
        const employee = { ...form}
        const newEmployee = {
            employee: employee.employee,
                days: [
                    {
                        date: employee.date,
                        startTime: employee.startTime,
                        endTime: employee.endTime,
                    }
                ]
        }
        //need to find employee who has selected date to see if we need to delete it fom there days list
        const findEmployee = list.find(emp => emp.employee === employee.employee)
        const employeeIndex = list.findIndex(emp => emp.employee === employee.employee)
        if (findEmployee !== undefined) {
            const findDay = findEmployee.days.findIndex(day => day.date.getDate() === employee.date.getDate());
            if (findDay !== undefined) {
                handleUpdate(employeeIndex, findDay, newEmployee.days[0])
                setForm({ date: Date, employee: '', })
                return handleClose();
            }
            handleAdd(employeeIndex, newEmployee.days[0])
            setForm({ date: Date, employee: '', })
            return handleClose();
        }

        updateList(currentList => [...currentList, newEmployee])
        setForm({ date: Date, employee: '', })
        handleClose();
    }

    function onDelete() {
        const foundEmployee = list.find(item => item.employee === form.employee)
        if(foundEmployee.days.length === 1) {
            updateList(list.filter(item => item.employee !== form.employee))
            setForm({ date: Date, employee: '', });
            return handleClose()
        }
        //const employeeIndex = list.findIndex(item => item.employee === form.employee)
        //updateList(list[employeeIndex].days.fliter(day => day.date.getDate() !== form.date.getDate()));
        //setForm({ date: Date, employee: '', });
        //handleClose();
    };

    //Display first four letters of scheduled employee name
    function tileContent({date}) {
        const employee = list.find(item => {
            const foundDate = item.days.find(day => day.date.getDate() === date.getDate())
            return foundDate !== undefined
        })
        if (employee !== undefined) {
            return <p className='mt-3'>{employee.employee.substr(0, 4)}</p>
        }
    }
    //Display add or edit for current date
    function modifyDate(date) {
        let foundDate;
        const employee = list.find(item => {
            foundDate = item.days.find(day => day.date.getDate() === date.getDate())
            return foundDate !== undefined
        })
        if (employee === undefined) {
            return handleShowAdd()
        } else {
            updateForm({employee: employee.employee, date: foundDate.date, startTime: foundDate.startTime, endTime: foundDate.endTime })
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

    async function submitCalandar(e) {
        e.preventDefault();

        await fetch('http://localhost:5000/addSchdule', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(list),
        })
        .catch(error => {
            window.alert('Error inserting');
            navigate('/managerPage');
            return;
        });

        navigate('/createSchedule');
    }

    return (
        <div>
            {addModal}
            {editModal}
            <Form onSubmit={submitCalandar}>
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
                <Button type='submit'>Create Schedule</Button>
            </Form>
        </div>
    )
}

export default CreateSchedule
