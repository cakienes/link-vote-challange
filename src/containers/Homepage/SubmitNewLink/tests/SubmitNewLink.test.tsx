import { shallow } from 'enzyme';
import React from 'react';
import SubmitNewLink from '../SubmitNewLink';

describe('SubmitNewLink.tsx', () => {
    it('renders without crashing', async () => {
        expect(shallow(<SubmitNewLink />)).toMatchSnapshot();
    });
});
