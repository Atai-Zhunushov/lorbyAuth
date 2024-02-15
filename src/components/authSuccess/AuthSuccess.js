import React from 'react';
import styles from './AuthSuccess.module.scss'
import {Button} from "antd";
import {Link, useNavigate} from "react-router-dom";
import axios from "axios";

const AuthSuccess = () => {
    let navigate = useNavigate();
    const logout = async () => {
        const accessToken = localStorage.getItem('accessToken');
        const refreshToken = localStorage.getItem('refreshToken');
        if (accessToken && refreshToken) {
            try {
                const config = {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,

                    }
                };
                await axios.post('https://berlin-backender.org.kg/lorby/authentication/logout/', {
                    refresh_token: refreshToken
                }, config);
                // Успешно деактивировали Refresh Token, очищаем хранилище
                localStorage.removeItem('accessToken');
                localStorage.removeItem('refreshToken');
                navigate('/');
            } catch (error) {
                console.error('Ошибка при выходе:', error);
            }
        }
    };
    return (
        <div className={styles.auth}>
            <h2>С возвращением</h2>
            <p>Lorby - твой личный репетитор</p>
            <div>
                <img src="/Stay at home.svg" alt=""/>
            </div>
           <Button onClick={logout} className={styles.auth__button}>Выйти</Button>
        </div>
    );
};

export default AuthSuccess;