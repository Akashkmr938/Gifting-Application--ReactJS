import React from 'react';
import renderer from 'react-test-renderer';
import Homepage from './homepage';

describe('The Homepage component', () => {
    it('renders correctly', () => {
        const tree = renderer
            .create(<Homepage />)
            .toJSON();
        expect(tree).toMatchSnapshot();
    });
})