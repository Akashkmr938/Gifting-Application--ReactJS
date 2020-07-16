import React from 'react';
import renderer from 'react-test-renderer';
import search from './search';

describe('The Search component', () => {
    it('renders correctly', () => {
        const tree = renderer
            .create(<search />)
            .toJSON();
        expect(tree).toMatchSnapshot();
    });
})