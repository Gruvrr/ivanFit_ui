import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';


const UsersTable = () => {
    const [users, setUsers] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('http://89.108.115.249:8000/users/all') // Замените URL на URL вашего API
            .then(response => {
                console.log(response.data);
                setUsers(response.data);
            })
            .catch(error => {
                console.error('There was an error fetching the users!', error);
            });
    }, []);
    const handleRowClick = (userId) => {
        navigate(`/users/${userId}`);
        console.log("Clicked row with user ID:", userId);
    };

    return (
        <table className="table table-striped table-hover">
            <thead>
                <tr>
                    <th>Telegram ID</th>
                    <th>Имя</th>
                    <th>Фамилия</th>
                    <th>Email</th>
                    <th>Номер телефона</th>
                    <th>Дни подписки</th>
                    <th>Активность подписки</th>
                </tr>
            </thead>
            <tbody>
                {users.map(user => (
                    <tr key={user.id} onClick={() => handleRowClick(user.id)}>
                        <td>{user.telegram_user_id}</td>
                        <td>{user.first_name}</td>
                        <td>{user.last_name}</td>
                        <td>{user.email}</td>
                        <td>{user.phone_number}</td>
                        <td>{user.subscription_days}</td>
                        <td>{user.is_subscription_active ? 'Активна' : 'Неактивна'}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default UsersTable;
