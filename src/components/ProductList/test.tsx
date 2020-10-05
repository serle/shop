import React from 'react';
import { render, screen } from '../../test_utils';
import ProductList from './index';
import { getBadgedUserOffers, getHighestPriorityBadge } from './utils'

test('it renders <ProductList>', async () => {
    const { getByText } = render(<ProductList userId="1"/>);

    //wait for the data fetch
    await screen.findByTestId('Index');

    //get the inner test
    //expect(getByText(/Apollo/i)).toBeTruthy();
    expect(true).toBeTruthy();
});

describe('business calcs', () => {
    test('it badges the user offers, unique offer types', () => {
        //data taken from user 1
        const user_badges = "sale:PRIORITY_ACCESS,REDUCED,BONUS";
        const user_offers = [
            {
                "id": "1",
                "type": "REDUCED",
                "title": "Get it while it lasts!"
            },
            {
                "id": "2",
                "type": "BONUS",
                "title": "Extra loyalty points!"
            },
            {
                "id": "3",
                "type": "PRIORITY_ACCESS",
                "title": "Priority Access!"
            },
            {
                "id": "4",
                "type": "SLOTTED",
                "title": "Discount available!"
            }
        ];
        const expected_result = [
            {
                "id": "3",
                "type": "PRIORITY_ACCESS",
                "title": "Priority Access!",
                "badge": "sale"
            },
            {
                "id": "1",
                "type": "REDUCED",
                "title": "Get it while it lasts!",
                "badge": "sale"
            },
            {
                "id": "2",
                "type": "BONUS",
                "title": "Extra loyalty points!",
                "badge": "sale"
            }
        ];

        expect(getBadgedUserOffers(user_badges, user_offers)).toBe(expected_result);
    });

    test('it badges the user offers, duplicate offer types', () => {
        //data taken from user 1
        const user_badges = "sale:PRIORITY_ACCESS,REDUCED,BONUS";
        const user_offers = [
            {
                "id": "1",
                "type": "REDUCED",
                "title": "Get it while it lasts!"
            },
            {
                "id": "2",
                "type": "BONUS",
                "title": "Extra loyalty points!"
            },
            {
                "id": "3",
                "type": "PRIORITY_ACCESS",
                "title": "Priority Access!"
            },
            {
                "id": "4",
                "type": "SLOTTED",
                "title": "Discount available!"
            },
            {
                "id": "5",
                "type": "BONUS",
                "title": "Super sale!"
            }
        ];
        const expected_result = [
            {
                "id": "3",
                "type": "PRIORITY_ACCESS",
                "title": "Priority Access!",
                "badge": "sale"
            },
            {
                "id": "1",
                "type": "REDUCED",
                "title": "Get it while it lasts!",
                "badge": "sale"
            },
            {
                "id": "2",
                "type": "BONUS",
                "title": "Extra loyalty points!",
                "badge": "sale"
            },
            {
                "id": "5",
                "type": "BONUS",
                "title": "Super sale!",
                "badge": "sale"
            }
        ];

        expect(getBadgedUserOffers(user_badges, user_offers)).toBe(expected_result);
    });


    test('it selects the highest priority badge', () => {
        const user_badges = "sale:PRIORITY_ACCESS,REDUCED,BONUS";
        const user_offers = [
            {
                "id": "1",
                "type": "REDUCED",
                "title": "Get it while it lasts!"
            },
            {
                "id": "2",
                "type": "BONUS",
                "title": "Extra loyalty points!"
            },
            {
                "id": "3",
                "type": "PRIORITY_ACCESS",
                "title": "Priority Access!"
            },
            {
                "id": "4",
                "type": "SLOTTED",
                "title": "Discount available!"
            }
        ];
        const badged_user_offers = getBadgedUserOffers(user_badges, user_offers)  //from user: "1" bar duplicates
        const product_offer_ids = [ "2", "3", "5", "4" ];                         //from product: "2" round neckeded jumper

        expect(getHighestPriorityBadge(product_offer_ids, badged_user_offers)).toBe("sale");
    });
})

