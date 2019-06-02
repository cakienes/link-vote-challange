import { mount, shallow } from 'enzyme';
import React from 'react';
import { VoteEnum } from '../../../../helper/Enum';
import ILink from '../../../Interfaces/ILink';
import ILinkListProps from '../interface/ILinkListProps';
import { LinkList } from '../LinkList';

describe('LinkList.tsx', () => {
    let linkListProps: ILinkListProps = {
        links: [],
    };

    beforeEach(() => {
        jest.spyOn(global.Date, 'now').mockImplementationOnce(() => new Date('2019-06-02T17:13:58.135Z').valueOf());
    });

    it('renders without crashing', async () => {
        expect(shallow(<LinkList {...linkListProps} />)).toMatchSnapshot();
    });

    it('setPage of LinkList', async () => {
        const wrapper = mount(<LinkList {...linkListProps} />);
        const instance: any = wrapper.instance();

        expect(instance.state.page).toEqual(0);
        await instance.setPage(1);
        expect(instance.state.page).toEqual(1);
    });

    it('onChangeSelect of LinkList', async () => {
        const wrapper = mount(<LinkList {...linkListProps} />);
        const instance: any = wrapper.instance();

        expect(instance.state.vote).toEqual('');

        const dumE = {
            target: {
                value: VoteEnum.MOST_VOTED,
            },
        };
        await instance.onChangeSelect(dumE);

        expect(instance.state.vote).toEqual(VoteEnum.MOST_VOTED);
    });

    it('sortByMostVoted of LinkList while points are not equal', async () => {
        const wrapper = mount(<LinkList {...linkListProps} />);
        const instance: any = wrapper.instance();

        const dumCreatedDate = new Date();
        const dumUpdatedDate = new Date();

        const dumLink1: ILink = {
            createdAt: dumCreatedDate,
            id: 'id',
            link: 'link',
            name: 'name',
            point: 0,
            updatedAt: dumUpdatedDate,
        };
        const dumLink2: ILink = {
            createdAt: dumCreatedDate,
            id: 'id',
            link: 'link',
            name: 'name',
            point: 1,
            updatedAt: dumUpdatedDate,
        };
        expect(instance.sortByMostVoted(dumLink1, dumLink2)).toEqual(1);
    });

    it('sortByMostVoted of LinkList while points are equal', async () => {
        const wrapper = mount(<LinkList {...linkListProps} />);
        const instance: any = wrapper.instance();

        const dumCreatedDate = new Date();
        const dumUpdatedDate = new Date();

        const dumLink1: ILink = {
            createdAt: dumCreatedDate,
            id: 'id',
            link: 'link',
            name: 'name',
            point: 0,
            updatedAt: dumUpdatedDate,
        };
        const dumLink2: ILink = {
            createdAt: dumCreatedDate,
            id: 'id',
            link: 'link',
            name: 'name',
            point: 0,
            updatedAt: dumUpdatedDate,
        };

        instance.sortByUpdatedAt = jest.fn().mockReturnValue(1);
        await expect(instance.sortByMostVoted(dumLink1, dumLink2)).toEqual(1);
        expect(instance.sortByUpdatedAt).toHaveBeenCalledWith(dumLink1, dumLink2);
    });

    it('sortByLessVoted of LinkList while points are not equal', async () => {
        const wrapper = mount(<LinkList {...linkListProps} />);
        const instance: any = wrapper.instance();

        const dumCreatedDate = new Date();
        const dumUpdatedDate = new Date();

        const dumLink1: ILink = {
            createdAt: dumCreatedDate,
            id: 'id',
            link: 'link',
            name: 'name',
            point: 1,
            updatedAt: dumUpdatedDate,
        };
        const dumLink2: ILink = {
            createdAt: dumCreatedDate,
            id: 'id',
            link: 'link',
            name: 'name',
            point: 0,
            updatedAt: dumUpdatedDate,
        };
        expect(instance.sortByLessVoted(dumLink1, dumLink2)).toEqual(1);
    });

    it('sortByLessVoted of LinkList while points are equal', async () => {
        const wrapper = mount(<LinkList {...linkListProps} />);
        const instance: any = wrapper.instance();

        const dumCreatedDate = new Date();
        const dumUpdatedDate = new Date();

        const dumLink1: ILink = {
            createdAt: dumCreatedDate,
            id: 'id',
            link: 'link',
            name: 'name',
            point: 0,
            updatedAt: dumUpdatedDate,
        };
        const dumLink2: ILink = {
            createdAt: dumCreatedDate,
            id: 'id',
            link: 'link',
            name: 'name',
            point: 0,
            updatedAt: dumUpdatedDate,
        };

        instance.sortByUpdatedAt = jest.fn().mockReturnValue(1);
        await expect(instance.sortByLessVoted(dumLink1, dumLink2)).toEqual(1);
        expect(instance.sortByUpdatedAt).toHaveBeenCalledWith(dumLink1, dumLink2);
    });

    it('sortByUpdatedAt of LinkList', async () => {
        const wrapper = mount(<LinkList {...linkListProps} />);
        const instance: any = wrapper.instance();

        const dumCreatedDate = new Date();
        const dumUpdatedDate = new Date();
        const dumLink1: ILink = {
            createdAt: dumCreatedDate,
            id: 'id',
            link: 'link',
            name: 'name',
            point: 0,
            updatedAt: dumUpdatedDate,
        };

        const dumUpdatedDate2: Date = new Date(dumUpdatedDate.getDate() + 1);

        const dumLink2: ILink = {
            createdAt: dumCreatedDate,
            id: 'id',
            link: 'link',
            name: 'name',
            point: 0,
            updatedAt: dumUpdatedDate2,
        };

        await expect(instance.sortByUpdatedAt(dumLink1, dumLink2)).toBeLessThan(0);
    });

    it('sortByCreatedAt of LinkList', async () => {
        const wrapper = mount(<LinkList {...linkListProps} />);
        const instance: any = wrapper.instance();

        const dumCreatedDate = new Date();
        const dumUpdatedDate = new Date();
        const dumLink1: ILink = {
            createdAt: dumCreatedDate,
            id: 'id',
            link: 'link',
            name: 'name',
            point: 0,
            updatedAt: dumUpdatedDate,
        };

        const dumCreatedDate2: Date = new Date(dumCreatedDate.getDate() + 1);

        const dumLink2: ILink = {
            createdAt: dumCreatedDate2,
            id: 'id',
            link: 'link',
            name: 'name',
            point: 0,
            updatedAt: dumUpdatedDate,
        };

        await expect(instance.sortByCreatedAt(dumLink1, dumLink2)).toBeLessThan(0);
    });

    it('renderTemplate of LinkList while links is empty', async () => {
        const wrapper = mount(<LinkList {...linkListProps} />);
        const instance: any = wrapper.instance();

        await expect(instance.renderTemplate()).toEqual('');
    });
});
