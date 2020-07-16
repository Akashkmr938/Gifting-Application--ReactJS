import React from 'react';
import renderer from 'react-test-renderer';
import GiftDetails from './giftDetails';

describe('The GiftDetails component', () => {
    const props ={
        location: {
            search: ''
        }
    }
    it('renders correctly', () => {
        const tree = renderer
            .create(<GiftDetails {...props}/>)
            .toJSON();
        expect(tree).toMatchSnapshot();
    });
})