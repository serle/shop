import React from 'react';
import { render } from '../../test_utils';
import Product from './index';

test('it renders <Product/>', async () => {
    const mock = (id:string) => console.log(`open product detail: ${id} clicked`);


    const { getByText } = render(<Product id="3"
                                          name="test product"
                                          image_key="SD_01_T38_1502_Y0_X_EC_0"
                                          badge_name="sale"
                                          openProductDetail={mock}
    />);

    //get the inner test
    expect(getByText(/test product/i)).toBeTruthy();
});
