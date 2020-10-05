import {gql} from "@apollo/client";

export const PRODUCT_LIST_QUERY = gql`
    query productList {
        productList {
            id
            name
            image_key
            price {
                current_price
                original_price
            }
        }
    }
`;

export const USER_QUERY = gql`
    query User($id: String!) {
        user(id:$id){
            available_badges
            offers {
                id
                type
                title
            }        
        }
    }
`;
