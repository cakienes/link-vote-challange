import { mount } from 'enzyme';
import React from 'react';
import ILink from '../../../../../Interfaces/ILink';
import ConfirmationModal from '../ConfirmationModal';
import IConfirmationModalProps from '../interface/IConfirmationModalProps';

describe('Homepage.tsx', () => {
    const dumLink: ILink = {
        id: 'id',
        point: 1,
        createdAt: new Date(),
        link: 'link',
        name: 'name',
        updatedAt: new Date(),
    };

    const onClickCancelMock = jest.fn();
    const onClickOkMock = jest.fn();

    const confirmationModalProps: IConfirmationModalProps = {
        data: dumLink,
        onClickCancel: onClickCancelMock,
        onClickOk: onClickOkMock,
        visibility: true,
    };

    beforeEach(() => {
        jest.spyOn(global.Date, 'now').mockImplementationOnce(() => new Date('2019-06-02T17:13:58.135Z').valueOf());
    });

    it('renders without crashing', async () => {
        const wrapper = mount(<ConfirmationModal {...confirmationModalProps} />);
        const instance: any = wrapper.instance();

        expect(instance.render()).toMatchSnapshot();
    });

    it('onClickOk of LinkList ', async () => {
        const wrapper = mount(<ConfirmationModal {...confirmationModalProps} />);
        const instance: any = wrapper.instance();

        await instance.onClickOk();
        expect(onClickOkMock).toHaveBeenCalled();
    });

    it('onClickCancel of LinkList ', async () => {
        const wrapper = mount(<ConfirmationModal {...confirmationModalProps} />);
        const instance: any = wrapper.instance();

        await instance.onClickCancel();
        expect(onClickCancelMock).toHaveBeenCalled();
    });
});
