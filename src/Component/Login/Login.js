import React, {useReducer, useState, useEffect, useContext, useRef} from 'react';
import Card from "../UI/Card/Card";
import Button from "../UI/Button/Button";
import style from './Login.module.css';
import AuthContext from "../../Store/AuthContext";
import Input from "../UI/Input/Input";


// Reducer for email
// usefull to change and validate email
const emailReducer = (state, action) => {
    if (action.type === "USER_INPUT") {
        return {value: action.val, isValid: action.val.includes('@')}
    }
    if (action.type === "INPUT_BLUR") {
        return {value: state.value, isValid: state.value.includes('@')}
    }
    return {value: '', isValid: false};
}

// Reducer for password
// usefull for change and validate password
const passwordReducer = (state, action) => {
    if (action.type === "PASS_INPUT") {
        return {value: action.val, isValid: action.val.trim().length > 6}
    }
    if (action.type === "PASS_BLUR") {
        return {value: state.value, isValid: state.value.trim().length > 6}
    }

    return {value: "", isValid: false}
}
const Login = () => {
    // const [enteredEmail, setEnteredEmail] = useState('');
    // const [emailIsValid, setEmailIsValid] = useState();
    // const [enteredPassword, setEnteredPassword] = useState('');
    // const [passwordIsValid, setPasswordIsValid] = useState();
    const [formIsValid, setFormIsValid] = useState(false);

    // useContext
    const ctx = useContext(AuthContext);

    // useRef
    const emailInputRef = useRef();
    const passInputRef = useRef();

    // Create Email Reducer
    const [emailState, dispatchEmail] = useReducer(emailReducer, {
        value: "",
        isValid: null
    })

    // Create Password Reducer
    const [passState, dispatchPass] = useReducer(passwordReducer, {
        value: "",
        isValid: null
    })

    /**
     *
     * Di dalam useEffect
     * cara kerjnya adalah jika state yang berubah di external kita perlu tambahkan dependency
     * tetapi jika mengubah data state di dalam maka kita tidak perlu memakai depedency
     *
     * function yang ada di dalam useEffect ini akan dieksekusi jika state yang ada di dalam depedency
     * mengalami perubahan
     *
     * Teknik debouncing
     * adalah teknik dimana kita akan mengeksekusi sebuah program dengan interval waktu yang telah di set
     * kita bisa gunakan setTimeout yang merupakan fungsi built-in yang sudah ada.
     *
     * Teknik Cleanup
     * Kita tahu bahwa useEffect akan mengeksekusi jika terjadi perubahan pada depedency.
     * dan identifier akan selalu dieksekusi. kita ingin bahwa identifier hanya akan di eksekusi jika form berhenti di
     * ubah setelah waktu yang telah ditentukan. maka kita bisa berikan cleanup. dimana cleanup akan berisikan clearTimeout
     * dimana ia akan mereset interval waktu untuk mengeksekusi identifier kembali menjadi nol
     *
     * kelebihan cleanup ini akan sangat membantu performa sistem jika kita menggunakan https request. dimana reques hanya akan
     * dieksekusi jika data benar benar sudah dirasa benar. pengulangan eksekusi akan lebih sedikit
     *
     * */

    const {isValid : emailIsValid} = emailState;
    const {isValid : passIsValid} = passState;
    useEffect(() => {
        const indentifier = setTimeout(() => {
            console.log("set form")
            setFormIsValid(
                emailIsValid && passIsValid
            );
        }, 1000);

        return () => {
            console.log("CLEANUP");
            clearTimeout(indentifier)
        }
    }, [emailIsValid, passIsValid])

    const emailChangeHandler = (event) => {
        dispatchEmail({type: "USER_INPUT", val: event.target.value})
    }


    const passwordChangeHandler = (event) => {
        dispatchPass({type: "PASS_INPUT", val: event.target.value})
    };


    const validateEmailHandler = () => {
        dispatchEmail({type: 'INPUT_BLUR'});
    };

    const validatePasswordHandler = () => {
        dispatchPass({type: "PASS_BLUR"})
    };

    const submitHandler = (event) => {
        event.preventDefault();
        if(formIsValid){
            ctx.onLogin(emailState.value, passState.value)
        }else if(!emailIsValid){
           emailInputRef.current.focus();
        }else{
            passInputRef.current.focus();
        }
    }

    return (
        <Card className={style.login}>
            <form onSubmit={submitHandler}>
                <Input
                    ref={emailInputRef}
                    type="email"
                    id="email"
                    label="E-Mail"
                    isValid={emailIsValid}
                    value={emailState.value}
                    onChange={emailChangeHandler}
                    onBlur={validateEmailHandler}
                ></Input>
                <Input
                    ref={passInputRef}
                    type="password"
                    id="password"
                    label="Password"
                    isValid={passIsValid}
                    value={passState.value}
                    onChange={passwordChangeHandler}
                    onBlur={validatePasswordHandler}
                ></Input>
                <div className={style.actions}>
                    <Button type="submit">
                        Login
                    </Button>
                </div>
            </form>
        </Card>
    )
}

// export default Login
export default Login;