import React from 'react';
import { reduxForm } from 'redux-form';
import Button from '../../../components/Button/Button';
import Input from '../../../components/Input/Input';
import INewLinkFormProps from './interface/INewLinkFormProps';
import './NewLinkForm.scss';

export const NewLinkForm = (props: INewLinkFormProps) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div className="row">
                <div className="col-12">
                    <div className="formName">Add New Link</div>
                </div>
                <div className="col-12">
                    <Input name="name" placeholder="e.g. Alphabet" label="Link Name:" />
                </div>
                <div className="col-12">
                    <Input name="link" placeholder="e.g. http://abc.xyz" label="Link URL:" />
                </div>
            </div>
            <div className="row">
                <div className="col">
                    <div className="buttonHolder">
                        <Button label="ADD" type="submit" />
                    </div>
                </div>
            </div>
        </form>
    );
};

export default reduxForm({
    form: 'newLinkForm',
})(NewLinkForm);
