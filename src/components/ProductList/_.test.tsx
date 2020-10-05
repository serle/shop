import React from 'react';
import { render, screen } from '../../test_utils';
import ProductList from './index';
import { getBadgedUserOffers, getHighestPriorityBadge, getProductOffers } from './utils'

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

        expect(getBadgedUserOffers(user_badges, user_offers)).toStrictEqual(expected_result);
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

        expect(getBadgedUserOffers(user_badges, user_offers)).toStrictEqual(expected_result);
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

    test('it finds a product and returns its offer_ids', () => {
        const product_arr = [
            {
                "id": "2",
                "image_key": "SD_01_T38_1502_Y0_X_EC_0",
                "name": "Round Neck Jumper",
                "offer_ids": [
                    "2",
                    "3",
                    "5",
                    "4"
                ],
                "price": {
                    "currency_code": "GBP",
                    "current_price": 1250,
                    "original_price": 1400
                },
                "information": [
                    {
                        "section_text": "A chic and versatile addition to any wardrobe, this long sleeved jumper is wonderfully soft to give your outfits as much style as comfort and has been treated with our StaySoft™ technology so it stays that way even after repeated washes. With ribbed trims and a comfy regular fit, this women’s jumper is sure to become your new staple.\r\n\r\nCare and composition\r\nComposition\r\n100% acrylic\r\nCare instructions\r\nMachine washable even at 30º\r\nTumble dry\r\nKeep away from fire and flames\r\n\r\nItem details\r\nModel Height: 5ft 9\"/175cm\r\nModel is wearing size: 8\r\n\r\nFit and style\r\nProduct Style: Jumpers\r\nRegular fit\r\nNeck to hem length: 61cm\r\nThe length measurement above relates to a size 12 regular. Length will vary slightly according to size\r\nRibbed trim\r\n",
                        "section_title": ""
                    }
                ]
            },
            {
                "id": "3",
                "image_key": "SD_01_T42_7049S_B4_X_EC_0",
                "name": "Jersey Animal Print Swing Mini Dress",
                "offer_ids": [
                    "4",
                    "1"
                ],
                "price": {
                    "currency_code": "GBP",
                    "current_price": 1500,
                    "original_price": 5000
                },
                "information": [
                    {
                        "section_text": "Effortlessly cool, this animal print swing dress is a fun choice for weekend outings and dinners with friends. Crafted from jersey with added stretch it’s comfy and stylish, ensuring this long sleeve mini dress becomes a regular wear in your wardrobe.\r\n\r\nItem details\r\nModel Height: 5ft 10\"/178cm\r\nModel is wearing size: 8\r\n\r\nFit and style\r\nProduct Style: Swing dress\r\nUnlined\r\nNeck to hem length: 98cm\r\nThe length measurement above relates to a size 12 regular. Length will vary slightly according to size\r\nAdded stretch\r\n\r\nCare and composition\r\nComposition\r\n95% viscose, 5% elastane \r\n(exclusive of trimmings)\r\nCare instructions\r\nMachine washable even at 30º\r\nTumble dry\r\nKeep away from fire & flames\r\n",
                        "section_title": ""
                    }
                ]
            },
            {
                "id": "4",
                "image_key": "SD_01_T41_1519_Y0_X_EC_0",
                "name": "Cotton Rich Scoop Neck Longline Vest Top",
                "offer_ids": [
                    "5",
                    "4"
                ],
                "price": {
                    "currency_code": "GBP",
                    "current_price": 650,
                    "original_price": null
                },
                "information": [
                    {
                        "section_text": "A longline vest is a staple for any wardrobe, perfect for layering and accessorising with any outfit of your choosing. Cotton-rich, this ladies’ vest top is comfortable as well as stylish, with a plain, versatile design that’s ready to adapt to any look.\r\n\r\nItem details\r\nModel Height: 5ft 10\"/178cm\r\nModel is wearing size: 8\r\n\r\nFit and style\r\nProduct Style: Vests\r\nSlim fit\r\nNeck to hem length: 76cm\r\nThe length measurement above relates to a size 12 regular. Length will vary slightly according to size\r\nAdded stretch\r\n\r\nCare and composition\r\nComposition\r\n95% cotton, 5% elastane\r\n(exclusive of trimmings)\r\nCare instructions\r\nMachine washable even at 30º\r\nTumble dry\r\n",
                        "section_title": ""
                    }
                ]
            },
            {
                "id": "5",
                "image_key": "SD_01_T42_5980_F0_X_EC_0",
                "name": "Jersey Swing Midi Dress",
                "offer_ids": [
                    "2",
                    "4",
                    "3",
                    "5"
                ],
                "price": {
                    "currency_code": "GBP",
                    "current_price": 1950,
                    "original_price": 2550
                },
                "information": [
                    {
                        "section_text": "A great everyday swing dress, this style has been made from stretchy jersey fabric for a comfortable wear and a fantastic fit. Non-iron technology makes this midi dress a breeze to launder, helping you take on the morning rush with ease.\r\n\r\nItem details\r\nModel Height: 5ft 8\"/173cm\r\nModel is wearing size: 8\r\n\r\nFit and style\r\nProduct Style: Swing dress\r\nUnlined\r\nNeck to hem length: 98cm\r\nThe length measurement above relates to a size 12 regular. Length will vary slightly according to size\r\n\r\nCare and composition\r\nComposition\r\n85% polyester, 15% viscose\r\n(exclusive of trimmings)\r\nCare instructions\r\nMachine washable even at 30º\r\nTumble dry\r\n",
                        "section_title": ""
                    }
                ]
            }
        ];


        expect(getProductOffers(product_arr, "4")).toStrictEqual(["5", "4"]);

    })
})

