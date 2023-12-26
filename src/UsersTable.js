import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';

const UsersTable = () => {
    const [users, setUsers] = useState([]);
    const [sortOrder, setSortOrder] = useState('desc');
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('http://89.108.115.249:8000/users/all') // Замените URL на URL вашего API
        .then(response => {
            const sortedUsers = response.data.sort((a, b) => b.subscription_days - a.subscription_days);
            setUsers(sortedUsers);
        })
        .catch(error => {
            console.error('There was an error fetching the users!', error);
        });
}, []);

    const handleRowClick = (userId) => {
        navigate(`/users/${userId}`);
    };


    const handleSortClick = () => {
        setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
        setUsers([...users].sort((a, b) => {
            return sortOrder === 'asc' ? b.subscription_days - a.subscription_days : a.subscription_days - b.subscription_days;
        }));
    };

    // Подсчет общего числа пользователей
    const totalUsers = users.length;

    // Подсчет пользователей с активной подпиской
    const activeSubscriptions = users.filter(user => user.subscription_days > 0).length;

    return (
        <>
            <h1>Пользователи бота:</h1>
            <div>Активные пользователи: {activeSubscriptions}</div>
            <div>Всего пользователей: {totalUsers}</div>

            <table className="table table-striped table-hover">
                <thead>
                    <tr>
                        <th>Telegram ID</th>
                        <th>Имя</th>
                        <th>Фамилия</th>
                        <th>Email</th>
                        <th>Номер телефона</th>
                        <th onClick={handleSortClick} style={{ cursor: 'pointer' }}>Дни подписки</th>
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
        </>
    );
};

export default UsersTable;
