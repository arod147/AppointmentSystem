import { useEffect, useState } from 'react'
import { Button, Form, FormControl, FormGroup, FormLabel, Spinner } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom'
import { useAppDispatch } from '../app/hooks';
import { setUserName } from '../app/userSlice';
import CompanyHeader from './companyHeader';


const Login = () => {
    //Clear local storage we store the username on in the users local storage.
    useEffect(() => {
        localStorage.clear();
    }, [])

    const  dispatch = useAppDispatch()
    const navigate = useNavigate();
    const [form, setForm] = useState({
        username: '',
        password: '',
    });

    const [loading, setLoading] = useState({
        status: false,
        hide: true,
    })


    function updateForm(value) {
        return setForm(prev => {
            return { ...prev, ...value };
        });
    }
    //Verify form information and log them in.
    async function onSubmit(e) {
            setLoading({ status: true, hide: false })
            e.preventDefault();
            const loginInfo = {
                username: form.username,
                password: form.password,
            };
    
            const response = await fetch(`http://localhost:5000/user/${loginInfo.username}/${loginInfo.password} `);
    
            if (!response.ok) {
                const message = `An error has occured: ${response.statusText}`;
                window.alert(message);
                setLoading({ status: false, hide: true })
                return;
            }
    
            const user = await response.json();
            if (!user) {
                window.alert(`Password or username invalid.`);
                navigate('/login')
                setLoading({ status: false, hide: true })
                return;
            }
    
            dispatch(setUserName(loginInfo.username))
            setForm({ username: '', password: '' })
            setLoading({ status: false, hide: true })
            if (user.position === 'manager') {
                navigate('/managerPage');
            } else {
                navigate('/employeePage')
            }
    }

    return (
        <div className='text-center'>
            <CompanyHeader />
            <h3>Login</h3>
            <Form onSubmit={onSubmit} className='m-5 border border-5 border-dark rounded'>
                <FormGroup className='m-4'>
                    <FormLabel>Username</FormLabel>
                    <FormControl
                        required
                        className='text-center' 
                        type='text'
                        id='username'
                        value={form.username}
                        placeholder='Username'
                        onChange={(e) => updateForm({ username: e.target.value })}
                    />
                    </FormGroup >
                <FormGroup className='m-4'>
                    <FormLabel>Password</FormLabel>
                    <FormControl
                        required
                        className='text-center' 
                        type='password'
                        id='password'
                        value={form.password}
                        placeholder='Password'
                        onChange={(e) => updateForm({ password: e.target.value })}
                    />
                    </FormGroup>
                <FormGroup className='m-3'>
                    <Button 
                    type='submit' 
                    value='Login' 
                    disabled={loading.status}
                    >
                        <Spinner 
                            as='span'
                            animation='border'
                            size='sm'
                            role='status'
                            aria-hidden='true'
                            hidden={loading.hide}
                        />
                        Login
                        </Button>
                </FormGroup>
                <Button className='m-3' href='/signup' variant='info'>Sign Up</Button>
            </Form>
        </div>
    )
}

export default Login
