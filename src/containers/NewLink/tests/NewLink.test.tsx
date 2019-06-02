import { shallow } from 'enzyme';
import React from 'react';
import { createOrUpdateLink } from '../../../actions/creators/linkActions';
import ILink from '../../Interfaces/ILink';
import INewLinkProps from '../interface/INewLinkProps';
import { mapDispatchToProps, NewLink } from '../NewLink';

describe('NewLink.tsx', () => {
    const createOrUpdateLinkMock = jest.fn();
    const newLinkProps: INewLinkProps = {
        createOrUpdateLink: createOrUpdateLinkMock,
    };

    beforeEach(() => {
        jest.spyOn(global.Date, 'now').mockImplementationOnce(() => new Date('2019-06-02T17:13:58.135Z').valueOf());
    });

    it('renders without crashing', async () => {
        expect(shallow(<NewLink {...newLinkProps} />)).toMatchSnapshot();
    });

    describe('mapDispatchToProps', () => {
        it('should dispatch createOrUpdateLink when called', () => {
            const dispatchMock = jest.fn();
            const result = mapDispatchToProps(dispatchMock);

            const dumLink: ILink = {
                createdAt: new Date(),
                id: 'id',
                link: 'link',
                name: 'name',
                point: 0,
                updatedAt: new Date(),
            };
            result.createOrUpdateLink(dumLink);
            expect(JSON.stringify(dispatchMock.mock.calls[0][0])).toEqual(JSON.stringify(createOrUpdateLink(dumLink)));
        });
    });
});
