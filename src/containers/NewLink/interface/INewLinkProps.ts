import ILink from '../../Interfaces/ILink';

export default interface INewLinkProps {
    createOrUpdateLink: (link: ILink) => void;
}
