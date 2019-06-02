import ILink from '../../containers/Interfaces/ILink';
import LocalStorageService from '../../services/LocalStorageService';
import { CREATE_OR_UPDATE_LINK, GET_LINKS_FROM_LOCAL_STORAGE, REMOVE_LINK } from '../constants/linkConstants';

export default (state: any = {}, action: any) => {
    switch (action.type) {
        case GET_LINKS_FROM_LOCAL_STORAGE: {
            const links: ILink[] = LocalStorageService.getLinks();
            return {
                ...state,
                links,
            };
        }
        case CREATE_OR_UPDATE_LINK: {
            let links: ILink[] = [...(state && state.links)];
            const link: ILink = action.link;
            if (links) {
                const index = links.findIndex((x: ILink) => x.id === link.id);
                if (index === -1) {
                    links.push(link);
                } else {
                    links[index] = link;
                }
            } else {
                links = [link];
            }

            LocalStorageService.setLinks(links);
            return {
                ...state,
                links,
            };
        }
        case REMOVE_LINK: {
            let links: ILink[] = [...(state && state.links)];
            const link: ILink = action.link;
            if (links) {
                links = links.filter((x: ILink) => x.id !== link.id);
            }

            LocalStorageService.setLinks(links);

            return {
                ...state,
                links,
            };
        }
        default:
            return state;
    }
};
