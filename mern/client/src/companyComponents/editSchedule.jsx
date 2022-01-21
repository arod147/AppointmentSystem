import { useEffect, useState } from 'react'
import { Button, Dropdown, Form, FormGroup, FormLabel, FormSelect, Modal, ModalBody, ModalTitle } from 'react-bootstrap'
import DropdownItem from 'react-bootstrap/esm/DropdownItem';
import DropdownMenu from 'react-bootstrap/esm/DropdownMenu';
import DropdownToggle from 'react-bootstrap/esm/DropdownToggle';
import ModalHeader from 'react-bootstrap/esm/ModalHeader';
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css';
import { useNavigate } from 'react-router'

const EditSchedule = () => {
    const navigate = useNavigate();
    const [value, onChange] = useState(new Date())
    const [showAdd, setShowAdd] = useState(false);
    const [showEdit, setShowEdit] = useState(false);
    const [list, updateList] = useState([])
    const [schedules, setSchedules] = useState([])
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
       //console.log(schedules)
       return;
    }, [schedules.length])

    useEffect(() => {
        console.log(list)
    }, [list])

    const handleClose = () => {
        setShowAdd(false)
        setShowEdit(false)
    }

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
        console.log(convert)
        updateList(convert)
    }
    const handleAdd = (index, todo) => {
        const newList = [...list];
        newList[index].days.push(todo)
        updateList(newList)
    }

    const handleRemove = (index, date) => {
        const newList = [...list];
        const daysList = [...list[index].days]
        if (daysList.length <= 1) {
            const filteredList = newList.filter((emp, empIndex) => index !== empIndex)
            return updateList(filteredList)
        }
        const newDaysList = daysList.filter(day => day.date.getDate() !== date)
        newList[index].days = newDaysList
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
        name: '',
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

    async function onSubmit(e) {
        e.preventDefault();
        const formInfo = { ...form}
        const newEmployee = {
            name: formInfo.name,
                days: [
                    {
                        date: formInfo.date,
                        startTime: formInfo.startTime,
                        endTime: formInfo.endTime,
                    }
                ]
        }

        const findEmployee = list.find(emp => {
            const day = emp.days.find(day => formInfo.date.getDate() === day.date.getDate())
            return day !== undefined   
        })
        const employeeIndex = list.findIndex(emp => {
            const day = emp.days.find(day => formInfo.date.getDate() === day.date.getDate())
            return day !== undefined   
        })

        const findEmployeeName = list.find(emp => emp.name === formInfo.name)

        if (findEmployee !== undefined) {
            if (findEmployeeName !== undefined) {
                const findDayIndex = findEmployee.days.findIndex(day => day.date.getDate() === formInfo.date.getDate());
                if (formInfo.name === findEmployee.employee) {
                    handleUpdate(employeeIndex, findDayIndex, newEmployee.days[0])
                    setForm({ date: Date, name: '', })
                    return handleClose();
                }
                handleRemove(employeeIndex, formInfo.date.getDate())

                const employeeNameIndex = list.findIndex(emp => emp.name === formInfo.name)
                handleAdd(employeeNameIndex, newEmployee.days[0])
                setForm({ date: Date, name: '', })
                return handleClose();
            }
            handleRemove(employeeIndex, formInfo.date.getDate())
            updateList(currentList => [...currentList, newEmployee])
            setForm({ date: Date, name: '', })
            return handleClose();    
        }

        if (findEmployeeName !== undefined) {
            const employeeNameIndex = list.findIndex(emp => emp.name === formInfo.name)
            handleAdd(employeeNameIndex, newEmployee.days[0])
            setForm({ date: Date, name: '', })
            return handleClose();
        }

        updateList(currentList => [...currentList, newEmployee])
        setForm({ date: Date, name: '', })
        handleClose();
    }

    function onDelete() {
        const formInfo = { ...form}
        const findEmployee = list.find(emp => {
            const day = emp.days.find(day => formInfo.date.getDate() === day.date.getDate())
            return day !== undefined   
        })
        if (findEmployee !== undefined && findEmployee.name === formInfo.name) {
            const employeeIndex = list.findIndex(emp => {
                const day = emp.days.find(day => formInfo.date.getDate() === day.date.getDate())
                return day !== undefined   
            })
            handleRemove(employeeIndex, formInfo.date.getDate())
            return handleClose()
        }
        console.log('Please select a valid employee to delete')
    };

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
            updateForm({name: employee.name, date: foundDate.date, startTime: foundDate.startTime, endTime: foundDate.endTime })
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
                        value={form.name}
                        onChange={(e) => updateForm({ date: value, name: e.target.value})}
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
                        value={form.name}
                        onChange={(e) => updateForm({ date: value, name: e.target.value})}
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

    async function submitCalandar(e) {
        const monthList = ["January","February","March","April","May","June","July","August","September","October","November","December"];
        e.preventDefault();
        const schedule = {
            month: monthList[value.getMonth()],
            scheduledDays: list
        }
        await fetch('http://localhost:5000/updateSchedule', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(schedule),
        })
        .catch(error => {
            window.alert('Error inserting or duplicate month');
            navigate('/managerPage');
            return;
        });

        navigate('/managerPage');
    }

    return (
        <div>
            {addModal}
            {editModal}
            {scheduleList}
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
                <Button type='submit'>Save Schedule</Button>
            </Form>
        </div>
    )
}

export default EditSchedule
