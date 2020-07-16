import React from 'react';
import renderer from 'react-test-renderer';
import SortFilter from './sortfilter';

describe('The SortFilter component', () => {
    it('renders correctly', () => {
        const tree = renderer
            .create(<SortFilter />)
            .toJSON();
        expect(tree).toMatchSnapshot();
    });
})