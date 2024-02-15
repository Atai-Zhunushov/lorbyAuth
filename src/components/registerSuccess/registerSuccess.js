import React, {useState} from 'react';
import styles from "./register.module.scss";
import {Link} from "react-router-dom";
import {Button} from "antd";

const RegisterSuccess = () => {
    const [modal, setModal] = useState(false)

    const modalFunc = () => {
        setModal(true)
    }

    const modalFuncClose = () => {
        setModal(false)
    }
    return (
        <div>
            <div className={styles.auth}>
                <h2>Добро пожаловать!</h2>
                <p>Lorby - твой личный репетитор</p>
                <div>
                    <img src="/Stay at home.svg" alt=""/>
                </div>
                <Button onClick={modalFunc} className={styles.auth__button}>Выйти</Button>
                {modal &&
                    <div className={styles.auth__modal}>
                       <div className={styles.auth__modal__content}>
                           <h5>Выйти?</h5>
                           <p>Точно выйти?</p>
                           <Link to={'/'}><Button className={styles.auth__modal__content__button}>Да, точно</Button></Link>
                           <Button onClick={modalFuncClose}>Нет, остаться</Button>
                       </div>
                    </div>
                }
            </div>
        </div>
    );
};

export default RegisterSuccess;