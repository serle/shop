
/*
sing the user(id: $id) query, fetch the offers and available_badges for the given user id. (done)


Combine the "offers_ids" from the product with the user offers response using the following process:
    Decode the available_badges e.g. "sale:PRIORITY_ACCESS||loyalty:SLOTTED,BONUS" as detailed below:
        Split the string on "||" to get available badges in priority order (high to low). (done)
        For each badge string split on ":". (done)
        The first half is the badge name. (done)
        The second half is the comma delimited list of badge types (done)
        split the badge type on "," to get an array of badge types. (done)

    For each of the "product_offer_ids" check to see if the user_offer_ids has any applicable offers (where the ids are the same).
    If there are applicable offers, check if the offer type has a badge associated with it.
    Show the highest priority badge (as defined by the order of available_badges) if more than match.

    The assets for the badges should have been provided to you and follow the naming convention "{badge name}_icon.jpg".

*/

/*
"available_badges": "sale:PRIORITY_ACCESS,REDUCED,BONUS",
    "offers": [
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
    ]
}

 */

type Offer = {
    id:string
    type:string
    title:string
}

type BadgedOffer = {
    id:string
    type:string
    title:string
    badge: string
}

type Product = {
    id: string
    name:string
    image_key: string
    offer_ids: string[]
}

interface UserOfferMap {
    [key:string]: Offer;                   //offer_type->offer
}

interface IdExistanceMap {
    [key:string]: boolean;                  //id -> true
}

export function getProductOffers(arr:Product[], id:string) {
    if (arr && arr.length > 0) {
        const product = arr.find(v => v.id === id)
        return product ? product.offer_ids : [];
    }
    else {
        return [];
    }
}



export function getBadgedUserOffers(user_badges:string, user_offers:Offer[]):BadgedOffer[] {
    if (!user_badges && !user_offers) return [];

    //create an offer map for efficient lookup
    const offer_map:UserOfferMap = {};
    for (let offer of user_offers) {
        offer_map[offer.type] = offer;
    }

    //from user badges create a prioritised list of badged_offers
    return user_badges.split('||')
                      .reduce((prev:BadgedOffer[], curr:string) => {
                               const badge_arr = curr.split(':')
                               const badge = badge_arr[0]
                               const offer_arr = badge_arr[1].split(',')
                                                             .map(badge_type => {
                                                                   const { id, title, type } = offer_map[badge_type];
                                                                   return { id: id, title:title, type:type, badge:badge }
                                                             })
                               return prev.concat(offer_arr);
                      }, []);

}

//given the product_offer_ids from the productListQuery and the prioritiesed badged_offer_arr from the userQuery
//return the highest priority user badge
export function getHighestPriorityBadge(product_offer_ids:string[], badged_offer_arr:BadgedOffer[]):string | null {
    if (!product_offer_ids || !badged_offer_arr) return null;

    //create an id existance map for efficiency
    const id_map:IdExistanceMap = {};
    for (let id of product_offer_ids) {
        id_map[id] = true;
    }

    //now find the first badged_offer (from the user) that is also a product_offer
    for (let badged_offer of badged_offer_arr) {
        if (id_map[badged_offer.id]) {
            return badged_offer.badge;
        }
    }

    //the user could not exploit any of the product offers
    return null;
}
