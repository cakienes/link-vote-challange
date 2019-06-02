import React from 'react';
import { Field } from 'redux-form';
import './Input.scss';
import IInputProps from './interface/IInputProps';

const Input = (props: IInputProps) => {
    return (
        <div className="defaultInputHolder">
            <label className="defaultLabel">{props.label}</label>
            <div>
                <Field
                    className="defaultInput"
                    name={props.name}
                    component="input"
                    type="text"
                    placeholder={props.placeholder}
                />
            </div>
        </div>
    );
};

export default Input;
