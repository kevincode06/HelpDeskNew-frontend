// client/src/pages/NewTicket.jsx
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { createTicket, reset } from '../redux/ticketSlice';
import Spinner from '../components/Spinner';

function NewTicket() {
    const { user } = useSelector((state) => state.auth);
    const { isLoading, isError, isSuccess, message } = useSelector(
        (state) => state.tickets
    );

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if (isError) {
            toast.error(message);
        }

        if (isSuccess) {
            dispatch(reset());
            navigate('/tickets');
        }

        dispatch(reset());
    }, [isError, isSuccess, message, navigate, dispatch]);

    const onSubmit = (e) => {
        e.preventDefault();
        dispatch(createTicket({ title, description }));
    };

    if (isLoading) {
        return <Spinner />;
    }

    return (
        <div className='container'>
            <section className='heading'>
                <h1>Create New Ticket</h1>
                <p>Please fill out the form below</p>
            </section>

            <section className='form'>
                <form onSubmit={onSubmit}>
                    <div className='form-group'>
                        <label htmlFor='name'>User Name</label>
                        <input type='text' className='form-control' value={user.name} disabled />
                    </div>
                    <div className='form-group'>
                        <label htmlFor='email'>User Email</label>
                        <input type='text' className='form-control' value={user.email} disabled />
                    </div>
                    <div className='form-group'>
                        <label htmlFor='title'>Ticket Title</label>
                        <input
                            type='text'
                            className='form-control'
                            id='title'
                            name='title'
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder='Enter ticket title'
                            required
                        />
                    </div>
                    <div className='form-group'>
                        <label htmlFor='description'>Description</label>
                        <textarea
                            className='form-control'
                            id='description'
                            name='description'
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder='Describe your issue'
                            required
                        ></textarea>
                    </div>
                    <div className='form-group'>
                        <button className='btn btn-block'>Submit</button>
                    </div>
                </form>
            </section>
        </div>
    );
}

export default NewTicket;