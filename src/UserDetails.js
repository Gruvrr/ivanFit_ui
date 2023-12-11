import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const UserDetails = () => {
    const [userDetails, setUserDetails] = useState(null);
    const { userId } = useParams();

    useEffect(() => {
        axios.get(`http://89.108.115.249:8000/users/${userId}`)
            .then(response => {
                setUserDetails(response.data);
            })
            .catch(error => {
                console.error('There was an error fetching the user details!', error);
            });
    }, [userId]);

    if (!userDetails) return <div>Loading...</div>;

    return (
        <div>
            <h2>Детали пользователя</h2>
            <table className="table table-bordered">
                <tbody>
                    <tr>
                        <th>Имя</th>
                        <td>{userDetails.first_name}</td>
                    </tr>
                    <tr>
                        <th>Фамилия</th>
                        <td>{userDetails.last_name}</td>
                    </tr>
                    <tr>
                        <th>Дата рождения</th>
                        <td>{userDetails.birth_date}</td>
                    </tr>
                    <tr>
                        <th>Количество дней подписки</th>
                        <td>{userDetails.subscription_days}</td>
                    </tr>
                    <tr>
                        <th>Гендер</th>
                        <td>{userDetails.gender}</td>
                    </tr>
                    <tr>
                        <th>Номер телефона</th>
                        <td>{userDetails.phone_number}</td>
                    </tr>
                    <tr>
                        <th>Email</th>
                        <td>{userDetails.email}</td>
                    </tr>
                </tbody>
            </table>

            <h3>Планы питания:</h3>
            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th>Неделя</th>
                        <th>Дата начала</th>
                        <th>Дата конца</th>
                    </tr>
                </thead>
                <tbody>
                    {userDetails.meal_plans.map((plan, index) => (
                        <tr key={index}>
                            <td>{plan.week_number}</td>
                            <td>{plan.start_date}</td>
                            <td>{plan.end_date}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <h3>Оплаты:</h3>
            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th>Сумма</th>
                        <th>Статус</th>
                        <th>Дата</th>
                    </tr>
                </thead>
                <tbody>
                    {userDetails.payments.map((payment, index) => (
                        <tr key={index}>
                            <td>{payment.amount}</td>
                            <td>{payment.status}</td>
                            <td>{payment.timestamp}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
    
};

export default UserDetails;
