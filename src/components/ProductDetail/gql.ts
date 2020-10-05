import {gql} from "@apollo/client";


//todo offer_ids on the product query is not working so I got it from the product list
const PRODUCT_DETAIL = gql`
    query Product($id: String!) {
        product(id:$id){
            id
            name
            image_key
            information {
                section_text
                section_title
            }
            price {
                current_price
                original_price
                currency_code
            }
        }
    }
`;


export default PRODUCT_DETAIL;