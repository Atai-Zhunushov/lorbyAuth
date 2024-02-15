import React, {useEffect, useState} from 'react';
import styles from "./authSendPassword.module.scss";
import {Link, useNavigate} from "react-router-dom";
import {Button, Input} from "antd";
import axios from "axios";
import {Controller, useForm} from "react-hook-form";


const AuthSendPassword = () => {
    const {control , handleSubmit, getValues} = useForm()
    let navigate = useNavigate();
    const onSubmit = async(data) => {
        const values = getValues(); // Получаем все значения из формы
        const passwordCode = Object.values(values).join('');
        try {
            await axios.post('https://berlin-backender.org.kg/lorby/authentication/email-confirm/', {
                code: passwordCode
            })
                .then(res => console.log(res))
            navigate('/registerSuccess')
        } catch (e) {
            console.error(e)
        }
    }



    return (
        <div className={styles.section}>
            <div className={styles.section__absolute}>
                <Link to={'/register'}><Button className={styles.section__absolute__btn}>❮</Button></Link>
                <p>Назад</p>
            </div>
            <div>
                <img src="/Photo background.svg" alt=""/>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className={styles.section__form}>
                <h4>
                    Введи 4-значный код, высланный на example@gmail.com
                </h4>
                <div className={styles.section__form__inputList}>
                    <Controller
                        name="oneInput"
                        control={control}
                        rules={{ maxLength: 1 }}
                        render={({ field }) => (
                                <Input {...field} maxLength={1} className={styles.section__form__inputList__input} />
                        )}
                    />
                    <Controller
                        name="twoInput"
                        control={control}
                        render={({ field }) => (
                                <Input {...field} maxLength={1} className={styles.section__form__inputList__input} />
                        )}
                    />
                    <Controller
                        name="threeInput"
                        control={control}
                        render={({ field }) => (
                                <Input {...field} maxLength={1} className={styles.section__form__inputList__input} />
                        )}
                    />
                    <Controller
                        name="fourInput"
                        control={control}
                        render={({ field }) => (
                                <Input {...field} maxLength={1} className={styles.section__form__inputList__input} />
                        )}
                    />

                </div>
                <Button htmlType={'submit'} className={styles.section__form__button}>Подтвердить</Button>
            </form>
        </div>
    );
};

export default AuthSendPassword;