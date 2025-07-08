
import { Link } from 'react-router-dom';
import { FaQuestionCircle, FaTicketAlt, FaSignInAlt, FaUserPlus, FaCog } from 'react-icons/fa';
import { useSelector } from 'react-redux';
// No need to import a separate Home.css, all styles are in index.css

function Home() {
    // Get user state from Redux
    const { user } = useSelector((state) => state.auth);

    return (
        // Added a hero-section class for background and overall styling
        <div className='hero-section'>
            <div className='container'>
                <section className='heading'>
                    <h1>
                        <FaQuestionCircle /> What do you need help with?
                    </h1>
                    <p className='tagline'>Your reliable support is just a click away.</p>
                </section>

                <div className='home-links'>
                    {user ? ( // If user is logged in
                        <>
                            <Link to='/new-ticket' className='btn btn-block btn-hero'>
                                <FaTicketAlt /> Create New Ticket
                            </Link>
                            <Link to='/tickets' className='btn btn-block btn-hero'>
                                <FaTicketAlt /> View My Tickets
                            </Link>
                            {user.isAdmin && ( // If user is also an admin
                                <Link to='/admin' className='btn btn-block btn-hero btn-admin'>
                                    <FaCog /> Admin Dashboard
                                </Link>
                            )}
                        </>
                    ) : ( // If no user is logged in
                        <>
                            <Link to='/login' className='btn btn-block btn-hero'>
                                <FaSignInAlt /> Login
                            </Link>
                            <Link to='/register' className='btn btn-block btn-hero'>
                                <FaUserPlus /> Register
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Home;
