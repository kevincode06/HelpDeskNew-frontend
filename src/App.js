// client/src/App.js
import { Routes, Route } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute';
import AdminRoute from './components/AdminRoute'; 
import Header from './components/Header';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import NewTicket from './pages/NewTicket';
import Tickets from './pages/Tickets';
import Ticket from './pages/Ticket';
import AdminDashboard from './pages/AdminDashboard';

function App() {
    return (
        <>
            <Header />
            <main className='container'>
                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='/login' element={<Login />} />
                    <Route path='/register' element={<Register />} />

                    {/* User Protected Routes */}
                    <Route path='/new-ticket' element={<PrivateRoute />}>
                        <Route path='/new-ticket' element={<NewTicket />} />
                    </Route>
                    <Route path='/tickets' element={<PrivateRoute />}>
                        <Route path='/tickets' element={<Tickets />} />
                    </Route>
                    <Route path='/ticket/:id' element={<PrivateRoute />}>
                        <Route path='/ticket/:id' element={<Ticket />} />
                    </Route>

                    {/* Admin Protected Routes */}
                    <Route path='/admin' element={<AdminRoute />}>
                        <Route path='/admin' element={<AdminDashboard />} />
                    </Route>
                    {/* Add other admin specific routes here */}
                </Routes>
            </main>
        </>
    );
}

export default App;