// client/src/pages/AdminDashboard.jsx
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getAllTicketsForAdmin, updateTicketStatusByAdmin, reset } from '../redux/adminSlice';
import Spinner from '../components/Spinner';

function AdminDashboard() {
    const { adminTickets, isLoading, isError, message } = useSelector(
        (state) => state.admin
    );
    const { user } = useSelector((state) => state.auth);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [filterStatus, setFilterStatus] = useState('all');

    useEffect(() => {
        if (!user || !user.isAdmin) {
            navigate('/'); // Redirect if not admin
        }

        if (isError) {
            toast.error(message);
        }

        dispatch(getAllTicketsForAdmin());

        return () => {
            dispatch(reset());
        };
    }, [user, navigate, isError, message, dispatch]);

    const onUpdateStatus = (ticketId, newStatus) => {
        dispatch(updateTicketStatusByAdmin({ ticketId, status: newStatus }));
        toast.success(`Ticket ${ticketId} status updated to ${newStatus}`);
    };

    if (isLoading) {
        return <Spinner />;
    }

    const filteredTickets = adminTickets.filter(ticket => {
        if (filterStatus === 'all') return true;
        return ticket.status === filterStatus;
    });


    return (
        <div className='container'>
            <section className='heading'>
                <h1>Admin Dashboard</h1>
                <p>Manage All Support Tickets</p>
            </section>

            <section className='filters'>
                <button className={`btn ${filterStatus === 'all' ? 'active' : ''}`} onClick={() => setFilterStatus('all')}>All</button>
                <button className={`btn ${filterStatus === 'open' ? 'active' : ''}`} onClick={() => setFilterStatus('open')}>Open</button>
                <button className={`btn ${filterStatus === 'pending' ? 'active' : ''}`} onClick={() => setFilterStatus('pending')}>Pending</button>
                <button className={`btn ${filterStatus === 'closed' ? 'active' : ''}`} onClick={() => setFilterStatus('closed')}>Closed</button>
            </section>

            <div className='tickets'>
                <div className='ticket-headings'>
                    <div>Date</div>
                    <div>Ticket ID</div>
                    <div>User</div>
                    <div>Title</div>
                    <div>Status</div>
                    <div>Actions</div>
                </div>
                {filteredTickets.length > 0 ? (
                    filteredTickets.map((ticket) => (
                        <div key={ticket._id} className='ticket'>
                            <div>{new Date(ticket.createdAt).toLocaleDateString('en-ZA')}</div>
                            <div>{ticket._id}</div>
                            <div>{ticket.user.name} ({ticket.user.email})</div>
                            <div>{ticket.title}</div>
                            <div className={`status status-${ticket.status}`}>{ticket.status}</div>
                            <div>
                                <Link to={`/ticket/${ticket._id}`} className='btn btn-sm'>View</Link>
                                {ticket.status !== 'closed' && (
                                    <>
                                        <button
                                            className='btn btn-sm btn-success'
                                            onClick={() => onUpdateStatus(ticket._id, 'closed')}
                                        >
                                            Close
                                        </button>
                                        {ticket.status !== 'pending' && (
                                            <button
                                                className='btn btn-sm btn-warning'
                                                onClick={() => onUpdateStatus(ticket._id, 'pending')}
                                            >
                                                Pend
                                            </button>
                                        )}
                                        {ticket.status !== 'open' && (
                                            <button
                                                className='btn btn-sm btn-info'
                                                onClick={() => onUpdateStatus(ticket._id, 'open')}
                                            >
                                                Open
                                            </button>
                                        )}
                                    </>
                                )}
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No tickets found.</p>
                )}
            </div>
        </div>
    );
}

export default AdminDashboard;