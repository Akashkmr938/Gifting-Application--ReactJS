import React from 'react';
import renderer from 'react-test-renderer';
import Header from './header';
import { MemoryRouter } from 'react-router';

describe('The Header component', () => {
    it('renders correctly', () => {
        const tree = renderer
            .create(<MemoryRouter><Header /></MemoryRouter>)
            .toJSON();
        expect(tree).toMatchSnapshot();
    });
})