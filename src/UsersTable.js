import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';


const UsersTable = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        axios.get('http://127.0.0.1:8000/users/all') // Замените URL на URL вашего API
            .then(response => {
                console.log(response.data);
                setUsers(response.data);
            })
            .catch(error => {
                console.error('There was an error fetching the users!', error);
            });
    }, []);
    const handleRowClick = (userId) => {
        // Здесь вы можете добавить логику, которая будет выполняться при клике на строку.
        // Например, вывод в консоль ID пользователя или переход на другой экран/страницу.
        console.log("Clicked row with user ID:", userId);
    };

    return (
        <table className="table table-striped table-hover">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Email</th>
                    <th>Phone Number</th>
                    {/* Другие заголовки столбцов */}
                </tr>
            </thead>
            <tbody>
                {users.map(user => (
                    <tr key={user.id} onClick={() => handleRowClick(user.id)}>
                        <td>{user.id}</td>
                        <td>{user.first_name}</td>
                        <td>{user.last_name}</td>
                        <td>{user.email}</td>
                        <td>{user.phone_number}</td>
                        {/* Другие поля пользователя */}
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default UsersTable;
