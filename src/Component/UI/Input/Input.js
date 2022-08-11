import React, {useRef, useImperativeHandle} from "react";
import style from './Input.module.css'

const Input = React.forwardRef((props,ref)=> {

    const inputRef = useRef();

    const activate = () => {
        inputRef.current.focus();
    };

    useImperativeHandle(ref, () => {
        return {
            focus: activate,
        };
    });
    return (
        <div className={`${style.control} ${
            props.isValid === false ? style.invalid : ''
        }`}>
            <label htmlFor={props.id}>{props.label}</label>
            <input
                ref={inputRef}
                type="email"
                id="email"
                value={props.value}
                onChange={props.onChange}
                onBlur={props.onBlur}
            />
        </div>
    );
});

export default Input;
