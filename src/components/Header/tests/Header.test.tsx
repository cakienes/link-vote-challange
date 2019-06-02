import { shallow } from 'enzyme';
import React from 'react';
import Header from '../Header';

describe('Header.tsx', () => {
    it('renders without crashing', async () => {
        expect(shallow(<Header />)).toMatchSnapshot();
    });
});
