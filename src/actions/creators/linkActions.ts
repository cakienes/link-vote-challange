import ILink from '../../containers/Interfaces/ILink';
import {
    CREATE_OR_UPDATE_LINK,
    GET_LINKS,
    GET_LINKS_FROM_LOCAL_STORAGE,
    REMOVE_LINK,
} from '../constants/linkConstants';

export const getLinksFromLocalStorage = () => (dispatch: Function) => {
    dispatch({
        type: GET_LINKS_FROM_LOCAL_STORAGE,
    });
};

export const getLinks = () => (dispatch: Function) => {
    dispatch({
        type: GET_LINKS,
    });
};
export const createOrUpdateLink = (link: ILink) => (dispatch: Function) => {
    dispatch({
        type: CREATE_OR_UPDATE_LINK,
        link,
    });
};
export const removeLink = (link: ILink) => (dispatch: Function) => {
    dispatch({
        type: REMOVE_LINK,
        link,
    });
};
