import { mount } from 'enzyme';
import React from 'react';
import IPageBlockProps from '../interface/IPageBlockProps';
import PageBlock from '../PageBlock';

describe('PageBlock.tsx', () => {
    const onClickPageMock = jest.fn();
    let pageBlockProps: IPageBlockProps = {
        currentPage: 0,
        onClickPage: onClickPageMock,
        totalSize: 2,
    };

    it('renders without crashing', async () => {
        const wrapper = mount(<PageBlock {...pageBlockProps} />);
        const instance: any = wrapper.instance();

        instance.renderNumber = jest.fn().mockReturnValue('');
        expect(instance.render()).toMatchSnapshot();
    });

    it('renders without crashing', async () => {
        const wrapper = mount(<PageBlock {...pageBlockProps} />);
        const instance: any = wrapper.instance();

        expect(instance.renderNumber()).toMatchSnapshot();
    });

    it('onClickPrev of LinkList while currentPage is 0', async () => {
        const wrapper = mount(<PageBlock {...pageBlockProps} />);
        const instance: any = wrapper.instance();

        await instance.onClickPrev();
        expect(onClickPageMock).not.toHaveBeenCalled();
    });

    it('onClickPrev of LinkList while currentPage is 2', async () => {
        pageBlockProps = {
            ...pageBlockProps,
            currentPage: 1,
        };
        const wrapper = mount(<PageBlock {...pageBlockProps} />);
        const instance: any = wrapper.instance();

        await instance.onClickPrev();
        expect(onClickPageMock).toHaveBeenCalledWith(0);
    });

    it('onClickNext of LinkList while totalSize is not equal currentPage', async () => {
        pageBlockProps = {
            ...pageBlockProps,
            currentPage: 1,
            totalSize: 2,
        };
        const wrapper = mount(<PageBlock {...pageBlockProps} />);
        const instance: any = wrapper.instance();

        await instance.onClickNext();
        expect(onClickPageMock).toHaveBeenCalledWith(2);
    });
});
