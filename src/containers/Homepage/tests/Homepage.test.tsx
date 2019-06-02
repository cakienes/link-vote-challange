import { shallow } from 'enzyme';
import React from 'react';
import Homepage from '../Homepage';

describe('Homepage.tsx', () => {
    it('renders without crashing', async () => {
        expect(shallow(<Homepage />)).toMatchSnapshot();
    });
});
