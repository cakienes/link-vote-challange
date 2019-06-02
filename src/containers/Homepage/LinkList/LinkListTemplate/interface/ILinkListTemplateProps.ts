import ILink from '../../../../Interfaces/ILink';

export default interface ILinkListTemplateProps {
    data: ILink;
    createOrUpdateLink: (link: ILink) => void;
    removeLink: (link: ILink) => void;
}
