import { useState } from 'react'
import { Button, Form, FormControl, FormGroup, FormLabel, FormText, FormSelect } from 'react-bootstrap';
import { useNavigate } from 'react-router'

const Signup = () => {
    const [form, setForm] = useState({
        userName: '',
        passWord: '',
        email: '',
        position: '',
    });
    const navigate = useNavigate();

    //This method will update the state properties.
    function updateForm(value) {
        return setForm(prev => {
            return { ...prev, ...value };
        });
    }

    // This function will handle submission.
    async function onSubmit(e) {
        e.preventDefault();

        // When a post requst is sent to the add url, well add a
        // new user to our database.
        const newUser = { ...form };

        await fetch('http://localhost:5000/user/add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newUser),
        })
        .catch(error => {
            window.alert('Username or Password taken');
            navigate('/signup')
            return;
        });

        setForm({ userName: '', passWord: '', email: '', position: '', })
        navigate('/login');
    }

    return (
        <div className='text-center'>
            <h3>Create new user</h3>
            <Form onSubmit={onSubmit} className='m-5 border border-5 border-dark rounded'>
                <FormGroup className='m-4'>
                    <FormLabel>Username</FormLabel>
                    <FormControl 
                        className='text-center'
                        type='text'
                        id='username'
                        value={form.userName}
                        placeholder='Username'
                        onChange={(e) => updateForm({ userName: e.target.value})}
                    />
                </FormGroup>
                <FormGroup className='m-4'>
                    <FormLabel>Password</FormLabel>
                    <FormControl
                        className='text-center' 
                        type='password'
                        id='password'
                        aria-describedby='passWordHelpBlock'
                        value={form.passWord}
                        placeholder='Password'
                        onChange={(e) => updateForm({ passWord: e.target.value})}
                    />
                    <FormText id='passWordHelpBlock' muted>
                    Your password must be 8-20 characters long, contain letters and numbers, and
                    must not contain spaces, special characters, or emoji.
                    </FormText>
                </FormGroup>
                <FormGroup className='m-4'>
                    <FormLabel>Email</FormLabel>
                    <FormControl
                        className='text-center' 
                        type='email'
                        id='email'
                        value={form.email}
                        placeholder='MyEmail@example.com'
                        onChange={(e) => updateForm({ email: e.target.value})}
                    />
                </FormGroup>
                <FormGroup className='m-4'>
                    <FormLabel>Position</FormLabel>
                    <FormSelect 
                        value={form.position}
                        onChange={(e) => updateForm({ position: e.target.value})}
                        aria-label="Default select example">
                        <option>Choose Staff employee</option>
                        <option value="employee">Employee</option>
                        <option value="manager">Manager</option>
                    </FormSelect>
                </FormGroup>
                <FormGroup className='m-4'>
                    <Button type='submit' value='Create user'>Create Account</Button>
                </FormGroup>
            </Form>
        </div>
    );
}

export default Signup
