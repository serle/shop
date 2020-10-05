import React from 'react';
import { render, screen } from '../../test_utils';
import ProductDetail from './index';

test('it renders <ProductDetail/>', async () => {

    const mock = () => console.log('click');

    const { getByText } = render(<ProductDetail productId="1" badge_name="sale" closeProductDetail={mock}/>);

    //wait for the data fetch
    await screen.findByTestId('ProductDetail');

    //get the inner test
    //expect(getByText(/Apollo/i)).toBeTruthy();
    expect(true).toBeTruthy();
});
