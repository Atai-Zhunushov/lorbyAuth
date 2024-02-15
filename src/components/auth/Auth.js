import React, {useState} from 'react';
import styles from './Auth.module.scss'
import {Button, Input} from "antd";
import {Controller, useForm} from "react-hook-form";
import {Link, useNavigate} from "react-router-dom";
import axios from "axios";



const Auth = () => {
    const {control, handleSubmit} = useForm()
    const [errorAuth , setAuth] = useState(false)
    let navigate = useNavigate();





    const onSubmit = async(data) => {
        const { login, password } = data;
        console.log(data)
        if (login === '' && password === '') {
            setAuth(true)
        } else {
            setAuth(false)
        }
        await axios.post('https://berlin-backender.org.kg/lorby/authentication/login/', {
            username: login,
            password: password
        })
            .then(response => {
                console.log(response.data);
                const { access, refresh } = response.data;
                localStorage.setItem('accessToken', access);
                localStorage.setItem('refreshToken', refresh);
                setAuth(false)
                navigate('/authSuccess')
            })
             .catch(async error => {
                console.error(error);
               setAuth(true)
                if (error.response && error.response.status === 401) {
                    // Если возникает ошибка авторизации из-за истекшего токена, обновите токен
                    await refreshAccessToken();
                }
            });
    }
    const refreshAccessToken = async () => {
        const refreshToken = localStorage.getItem('refreshToken');

        try {
            const response = await axios.post('https://berlin-backender.org.kg/lorby/authentication/refresh-token/', {
                refresh: refreshToken,
            });

            const newAccessToken = response.data.access;

            // Обновляем Access Token в localStorage
            localStorage.setItem('accessToken', newAccessToken);
        } catch (error) {
            console.error('Ошибка при обновлении Access Token:', error);
            // Обработка ошибки обновления токена, например, выход пользователя или перенаправление на страницу входа
            // В данном примере я просто удаляю токены из localStorage
            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');
            setAuth(true);
        }
    };

    return (
        <div className={styles.auth}>
            <div className={styles.auth__image} >
                <img src="/Photo background.svg" alt=""/>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className={styles.auth__modal}>
                {errorAuth &&
                    <button className={styles.auth__modal__errorBtn}>Неверный логин или пароль</button>
                }
                <h2>Вэлком бэк!</h2>
                <div className={styles.auth__modal__inputList}>
                    <Controller
                        control={control}
                        name="login"
                        render={({ field }) => (
                            <Input {...field}
                                   variant={"filled"}
                                   placeholder={'Введи логин'}
                                   className={styles.auth__modal__inputList__input}/>
                        )}
                    />
                    <Controller
                        control={control}
                        name="password"
                        render={({ field }) => (
                            <Input.Password {...field}
                                variant={"filled"}
                                placeholder={'Введи пароль'}
                                className={styles.auth__modal__inputList__input}/>
                        )}
                    />
                </div>
                <Button type={"primary"} htmlType={'submit'} className={styles.auth__modal__inputList__button}>Войти</Button>
               <Link to={'/register'}><p className={styles.auth__modal__inputList__description}>У меня еще нет аккаунта</p></Link>
            </form>
        </div>
    );
};

export default Auth;