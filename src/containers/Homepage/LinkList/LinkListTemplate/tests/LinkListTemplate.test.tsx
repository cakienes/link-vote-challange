import { mount, shallow } from 'enzyme';
import React from 'react';
import { createOrUpdateLink, removeLink } from '../../../../../actions/creators/linkActions';
import ILink from '../../../../Interfaces/ILink';
import ILinkListTemplateProps from '../interface/ILinkListTemplateProps';
import { LinkListTemplate, mapDispatchToProps } from '../LinkListTemplate';

describe('LinkListTemplate.tsx', () => {
    const removeLinkMock = jest.fn();
    const createOrUpdateLinkMock = jest.fn();
    const dumLink: ILink = {
        id: 'id',
        point: 1,
        createdAt: new Date(),
        link: 'link',
        name: 'name',
        updatedAt: new Date(),
    };
    let linkListTemplateProps: ILinkListTemplateProps = {
        data: dumLink,
        removeLink: removeLinkMock,
        createOrUpdateLink: createOrUpdateLinkMock,
    };

    beforeEach(() => {
        jest.spyOn(global.Date, 'now').mockImplementationOnce(() => new Date('2019-06-02T17:13:58.135Z').valueOf());
    });

    it('renders without crashing', async () => {
        expect(shallow(<LinkListTemplate {...linkListTemplateProps} />)).toMatchSnapshot();
    });

    it('componentDidMount of LinkList while listItemRef.current is not null', async () => {
        const wrapper = mount(<LinkListTemplate {...linkListTemplateProps} />);
        const instance: any = wrapper.instance();

        instance.listItemRef = {
            current: {
                addEventListener: jest.fn(),
            },
        };

        instance.componentDidMount();

        expect(instance.listItemRef.current.addEventListener).toHaveBeenCalledWith('mouseenter', instance.onMouseOver);
        expect(instance.listItemRef.current.addEventListener).toHaveBeenCalledWith('mouseleave', instance.onMouseOut);
    });

    it('componentWillUnmount of LinkList while listItemRef.current is not null', async () => {
        const wrapper = mount(<LinkListTemplate {...linkListTemplateProps} />);
        const instance: any = wrapper.instance();

        instance.listItemRef = {
            current: {
                removeEventListener: jest.fn(),
            },
        };

        instance.componentWillUnmount();

        expect(instance.listItemRef.current.removeEventListener).toHaveBeenCalledWith(
            'mouseenter',
            instance.onMouseOver,
        );
        expect(instance.listItemRef.current.removeEventListener).toHaveBeenCalledWith(
            'mouseleave',
            instance.onMouseOut,
        );
    });

    it('onMouseOver of LinkList', async () => {
        const wrapper = mount(<LinkListTemplate {...linkListTemplateProps} />);
        const instance: any = wrapper.instance();

        expect(instance.state.isMouseOver).toBeFalsy();

        instance.onMouseOver();

        expect(instance.state.isMouseOver).toBeTruthy();
    });

    it('onMouseOut of LinkList', async () => {
        const wrapper = mount(<LinkListTemplate {...linkListTemplateProps} />);
        const instance: any = wrapper.instance();

        instance.state.isMouseOver = true;

        expect(instance.state.isMouseOver).toBeTruthy();

        instance.onMouseOut();

        expect(instance.state.isMouseOver).toBeFalsy();
    });

    it('onClickUpVote of LinkList', async () => {
        const wrapper = mount(<LinkListTemplate {...linkListTemplateProps} />);
        const instance: any = wrapper.instance();

        instance.onClickUpVote();

        dumLink.point++;
        dumLink.updatedAt = new Date();

        expect(createOrUpdateLinkMock).toHaveBeenCalledWith(dumLink);
    });

    it('onClickDownVote of LinkList while point is not 0', async () => {
        const wrapper = mount(<LinkListTemplate {...linkListTemplateProps} />);
        const instance: any = wrapper.instance();

        instance.onClickDownVote();

        dumLink.point--;
        dumLink.updatedAt = new Date();

        expect(createOrUpdateLinkMock).toHaveBeenCalledWith(dumLink);
    });

    it('showConfirmationModal of LinkList', async () => {
        const wrapper = mount(<LinkListTemplate {...linkListTemplateProps} />);
        const instance: any = wrapper.instance();

        expect(instance.state.confirmationModalVisibility).toBeFalsy();

        instance.showConfirmationModal();

        expect(instance.state.confirmationModalVisibility).toBeTruthy();
    });

    it('hideConfirmationModal of LinkList', async () => {
        const wrapper = mount(<LinkListTemplate {...linkListTemplateProps} />);
        const instance: any = wrapper.instance();

        instance.state.confirmationModalVisibility = true;

        expect(instance.state.confirmationModalVisibility).toBeTruthy();

        instance.hideConfirmationModal();

        expect(instance.state.confirmationModalVisibility).toBeFalsy();
    });

    it('removeLink of LinkList', async () => {
        const wrapper = mount(<LinkListTemplate {...linkListTemplateProps} />);
        const instance: any = wrapper.instance();

        instance.removeLink();

        expect(removeLinkMock).toHaveBeenCalledWith(dumLink);
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

        it('should dispatch removeLink when called', () => {
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
            result.removeLink(dumLink);
            expect(JSON.stringify(dispatchMock.mock.calls[0][0])).toEqual(JSON.stringify(removeLink(dumLink)));
        });
    });
});
