// client/src/components/Header.jsx
import { FaSignInAlt, FaSignOutAlt, FaUser, FaTicketAlt, FaCog } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout, reset } from '../redux/authSlice';

function Header() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth);

    const onLogout = () => {
        dispatch(logout());
        dispatch(reset());
        navigate('/');
    };

    return (
        <header className='header'>
            <div className='container'>
                <div className='logo'>
                    <Link to='/'>HelpDesk Pro</Link>
                </div>
                <ul>
                    {user ? (
                        <>
                            <li>
                                <Link to='/new-ticket'>
                                    <FaTicketAlt /> New Ticket
                                </Link>
                            </li>
                            <li>
                                <Link to='/tickets'>
                                    <FaTicketAlt /> My Tickets
                                </Link>
                            </li>
                            {user.isAdmin && (
                                <li>
                                    <Link to='/admin'>
                                        <FaCog /> Admin
                                    </Link>
                                </li>
                            )}
                            <li>
                                <button className='btn' onClick={onLogout}>
                                    <FaSignOutAlt /> Logout
                                </button>
                            </li>
                        </>
                    ) : (
                        <>
                            <li>
                                <Link to='/login'>
                                    <FaSignInAlt /> Login
                                </Link>
                            </li>
                            <li>
                                <Link to='/register'>
                                    <FaUser /> Register
                                </Link>
                            </li>
                        </>
                    )}
                </ul>
            </div>
        </header>
    );
}

export default Header;