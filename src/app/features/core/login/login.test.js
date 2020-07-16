import React from 'react';
import renderer from 'react-test-renderer';
import Login from './login';
import { MemoryRouter } from 'react-router';

describe('The Login component', () => {
    it('renders correctly', () => {
        const tree = renderer
            .create(<MemoryRouter><Login /></MemoryRouter>)
            .toJSON();
        expect(tree).toMatchSnapshot();
    });
})