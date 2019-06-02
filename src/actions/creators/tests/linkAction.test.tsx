import ILink from '../../../containers/Interfaces/ILink';
import {
    CREATE_OR_UPDATE_LINK,
    GET_LINKS,
    GET_LINKS_FROM_LOCAL_STORAGE,
    REMOVE_LINK,
} from '../../constants/linkConstants';
import { createOrUpdateLink, getLinks, getLinksFromLocalStorage, removeLink } from '../linkActions';

describe('Link actions', () => {
    beforeEach(() => {
        jest.spyOn(global.Date, 'now').mockImplementationOnce(() => new Date('2019-06-02T17:13:58.135Z').valueOf());
    });

    it('has a type of GET_LINKS_FROM_LOCAL_STORAGE', () => {
        const expected = {
            type: GET_LINKS_FROM_LOCAL_STORAGE,
        };

        const dispatchMock = jest.fn();
        getLinksFromLocalStorage()(dispatchMock);
        expect(dispatchMock).toHaveBeenCalledWith(expected);
    });

    it('has a type of GET_LINKS', () => {
        const expected = {
            type: GET_LINKS,
        };
        const dispatchMock = jest.fn();
        getLinks()(dispatchMock);
        expect(dispatchMock).toHaveBeenCalledWith(expected);
    });

    it('has a type of CREATE_OR_UPDATE_LINK', () => {
        const dumLink: ILink = {
            createdAt: new Date(),
            id: 'id',
            link: 'link',
            name: 'name',
            point: 0,
            updatedAt: new Date(),
        };
        const expected = {
            type: CREATE_OR_UPDATE_LINK,
            link: dumLink,
        };
        const dispatchMock = jest.fn();
        createOrUpdateLink(dumLink)(dispatchMock);
        expect(dispatchMock).toHaveBeenCalledWith(expected);
    });

    it('has a type of REMOVE_LINK', () => {
        const dumLink: ILink = {
            createdAt: new Date(),
            id: 'id',
            link: 'link',
            name: 'name',
            point: 0,
            updatedAt: new Date(),
        };
        const expected = {
            type: REMOVE_LINK,
            link: dumLink,
        };

        const dispatchMock = jest.fn();
        removeLink(dumLink)(dispatchMock);
        expect(dispatchMock).toHaveBeenCalledWith(expected);
    });
});
