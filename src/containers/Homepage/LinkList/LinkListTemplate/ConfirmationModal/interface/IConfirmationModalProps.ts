import ILink from '../../../../../Interfaces/ILink';

export default interface IConfirmationModalProps {
    data: ILink;
    onClickOk: () => void;
    onClickCancel: () => void;

    visibility?: boolean;
}
