import React from 'react';
import renderer from 'react-test-renderer';
import Carousel from './carousel';

describe('The Carousel component', () => {
    it('renders correctly', () => {
        const tree = renderer
            .create(<Carousel />)
            .toJSON();
        expect(tree).toMatchSnapshot();
    });
})