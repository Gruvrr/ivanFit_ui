import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import UsersTable from './UsersTable';
import UserDetails from './UserDetails'; // Убедитесь, что UserDetails импортирован

function App() {
    return (
        <Router>
            <div className="App">
                <Routes>
                    <Route path="/" element={<UsersTable />} />
                    <Route path="/users/:userId" element={<UserDetails />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
