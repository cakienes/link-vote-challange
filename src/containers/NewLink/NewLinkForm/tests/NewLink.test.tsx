import { shallow } from 'enzyme';
import React from 'react';
import { NewLinkForm } from '../NewLinkForm';

describe('NewLinkForm.tsx', () => {
    it('renders without crashing', async () => {
        expect(shallow(<NewLinkForm />)).toMatchSnapshot();
    });
});
