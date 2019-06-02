import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from '../../../../../components/Button/Button';
import './ConfirmationModal.scss';
import IConfirmationModalProps from './interface/IConfirmationModalProps';

class ConfirmationModal extends React.Component<IConfirmationModalProps, any> {
    render() {
        const { data } = this.props;
        const { visibility } = this.props;
        return (
            <Modal show={visibility} onHide={this.onClickCancel} className="confirmationModalHolder">
                <Modal.Header closeButton>
                    <Modal.Title>Modal title</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <div className="modalContent">
                        <div className="question">Do you want to remove:</div>
                        <div className="linkName">{data.name}</div>
                    </div>
                </Modal.Body>

                <Modal.Footer>
                    <Button label="OK" onClick={this.onClickOk} type="button" />
                    <Button label="CANCEL" onClick={this.onClickCancel} type="button" />
                </Modal.Footer>
            </Modal>
        );
    }
    onClickOk = (): void => {
        this.props.onClickOk();
    };
    onClickCancel = (): void => {
        this.props.onClickCancel();
    };
}

export default ConfirmationModal;
