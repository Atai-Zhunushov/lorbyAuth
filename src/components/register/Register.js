import React, {useEffect, useState} from 'react';
import styles from './Register.module.scss'
import {Button, Input} from "antd";
import {Controller, useForm} from "react-hook-form";
import {Link, useNavigate} from "react-router-dom";
import axios from "axios";

const Register = () => {
    const {control , handleSubmit} = useForm()
    let navigate = useNavigate();
    const [length, setLength] = useState(false)
    const [letters, setLetters] = useState(false)
    const [symbolValid, setSymbolValid] = useState(false)
    const [oneNumValid, setNumValid] = useState(false)
    const [lengthErr, setLengthErr] = useState(false)
    const [lettersErr, setLettersErr] = useState(false)
    const [symbolValidErr, setSymbolValidErr] = useState(false)
    const [oneNumValidErr, setNumValidErr] = useState(false)
    const [samePassword, setSamePassword] = useState(false)
    const [password, setPassword] = useState('') // Состояние для хранения пароля
    const [passwordConfirm, setPasswordConfirm] = useState('') //


    const onSubmit = async(data) => {
        const {email , username, password, password_confirm} = data || {}
        if (password === password_confirm) {
            setSamePassword(false)
        } else {
            setSamePassword(true)
        }


        try {
           await axios.post('https://berlin-backender.org.kg/lorby/authentication/register/', {
                email:email,
                username:username,
                password:password,
                password_confirm:password_confirm
            })
                .then(res => console.log(res))
            navigate('/passwordSend')
        } catch (e) {
            console.error(e)
        }
    }

    const onChange = (password) => {
        setPassword(password);
        const lettersValid = /^(?=.*[a-z])(?=.*[A-Z])/.test(password);
        if (password && password.length >= 8 && password.length <= 15) {
            setLength(true)
            setLengthErr(false)
        } else {
            setLength(false)
            setLengthErr(true)
        }
        if (lettersValid) {
            setLetters(true)
            setLettersErr(false)
        } else {
            setLettersErr(true)
            setLetters(false)
        }
        if (/\d/.test(password)) {
            setNumValid(true)
            setNumValidErr(false)
        } else {
            setNumValidErr(true)
            setNumValid(false)
        }
        if (/[!@#$%^&*]/.test(password)) {
            setSymbolValid(true)
            setSymbolValidErr(false)
        } else {
            setSymbolValidErr(true)
            setSymbolValid(false)
        }
    }
    const comparePasswords = (confirmPassword) => {
        setPasswordConfirm(confirmPassword); // Обновляем состояние подтверждения пароля при изменении
        if (password === confirmPassword) {
            setSamePassword(false) // Устанавливаем false, если пароли совпадают
        } else {
            setSamePassword(true) // Устанавливаем true, если пароли не совпадают
        }
    }

    return (
        <div className={styles.section}>
            <div className={styles.section__absolute}>
                <Link to={'/'}><Button className={styles.section__absolute__btn}>❮</Button></Link>
                <p>Назад</p>
            </div>
            <div>
                <img src="/Photo background.svg" alt=""/>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className={styles.section__form}>
                <h2>Создать аккаунт Lorby</h2>
                <div className={styles.section__form__col}>
                    <Controller
                        control={control}
                        name='email'
                        render={({ field }) => (
                            <Input {...field}
                                placeholder={'Введи адрес почты'}
                                variant={'filled'}
                                className={styles.section__form__col__input}>
                            </Input>
                        )}
                    />
                    <Controller
                        control={control}
                        name='username'
                        render={({ field }) => (
                            <Input {...field}
                                placeholder={'Придумай логин'}
                                variant={'filled'}
                                className={styles.section__form__col__input}>

                            </Input>
                        )}
                    />
                    <Controller
                        control={control}
                        name='password'
                        render={({ field }) => (
                            <Input.Password {...field}
                                    placeholder={'Создай пароль'}
                                    variant={'filled'}
                                    className={styles.section__form__col__input}
                                            onChange={(e) => {
                                                field.onChange(e.target.value);
                                                onChange(e.target.value);
                                                comparePasswords(e.target.value);
                                            }}
                            />
                        )}
                    />
                    <ul>
                        <li className={length ? styles.section__form__col__li : lengthErr ? styles.section__form__col__liErr : ''}>От 8 до 15 символов</li>
                        <li className={letters ? styles.section__form__col__li : lettersErr ? styles.section__form__col__liErr : ''}>Строчные и прописные буквы</li>
                        <li className={oneNumValid ? styles.section__form__col__li : oneNumValidErr ? styles.section__form__col__liErr : ''}>Минимум 1 цифра</li>
                        <li className={symbolValid ? styles.section__form__col__li : symbolValidErr ? styles.section__form__col__liErr : ''}>Минимум 1 спецсимвол (!, ", #, $...)</li>
                    </ul>
                    <Controller
                        control={control}
                        name='password_confirm'
                        render={({ field }) => (
                            <Input.Password
                                {...field}
                                placeholder={'Повтори пароль'}
                                variant={'filled'}
                                className={styles.section__form__col__input}
                                onChange={(e) => {
                                    field.onChange(e.target.value);
                                    comparePasswords(e.target.value); // Вызываем функцию сравнения паролей при изменении поля
                                }}
                            />
                        )}
                    />
                    {samePassword && <p className={styles.section__form__col__errorPassword}>Пароли не совпадают</p>}
                </div>
                <Button disabled={samePassword || !(length && letters && oneNumValid && symbolValid)}
                            htmlType={"submit"} className={styles.section__form__button}>
                        Далее
                </Button>
            </form>
        </div>
    );
};

export default Register;