import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FaSignInAlt } from 'react-icons/fa'; //
import { login, reset } from '../redux/authSlice'; 
import Loader from '../components/Loader.jsx'; 

function Login() {
    // State to manage form input fields
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const { email, password } = formData;

    // Hooks for navigation and Redux dispatch
    const navigate = useNavigate();
    const dispatch = useDispatch();

    // Select relevant state from Redux store
    const { user, isLoading, isError, isSuccess, message } = useSelector(
        (state) => state.auth
    );
    useEffect(() => {
        if (isError) {
            toast.error(message); 
        }

        if (isSuccess || user) {
            navigate('/'); 
        }

        dispatch(reset()); 
    }, [user, isError, isSuccess, message, navigate, dispatch]); 

    // Handler for input field changes
    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value, 
        }));
    };

    // Handler for form submission
    const onSubmit = (e) => {
        e.preventDefault(); 

        const userData = {
            email,
            password,
        };

        dispatch(login(userData)); // Dispatch the login async thunk with user data
    };

    // Show spinner while loading
    if (isLoading) {
        return <Loader />;
    }

    return (
        <div className='container'>
            <section className='heading'>
                <h1>
                    <FaSignInAlt /> Login
                </h1>
                <p>Please log in to get support</p>
            </section>

            <section className='form'>
                <form onSubmit={onSubmit}>
                    <div className='form-group'>
                        <input
                            type='email'
                            className='form-control'
                            id='email'
                            name='email'
                            value={email}
                            placeholder='Enter your email'
                            onChange={onChange}
                            required 
                        />
                    </div>
                    <div className='form-group'>
                        <input
                            type='password'
                            className='form-control'
                            id='password'
                            name='password'
                            value={password}
                            placeholder='Enter password'
                            onChange={onChange}
                            required // HTML5 validation
                        />
                    </div>
                    <div className='form-group'>
                        <button type='submit' className='btn btn-block'>
                            Submit
                        </button>
                    </div>
                </form>
            </section>
        </div>
    );
}

export default Login;