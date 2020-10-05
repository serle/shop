import React, { FunctionComponent, Fragment } from 'react';
import { useQuery } from '@apollo/client';
import Grid from '@material-ui/core/Grid';
import GridList from '@material-ui/core/GridList';
import {Typography} from "@material-ui/core";

import useStyles from './styles';
import Product from "../Product";
import ProductDetail from "../ProductDetail";
import { PRODUCT_LIST_QUERY, USER_QUERY } from "./gql";
import { getBadgedUserOffers, getHighestPriorityBadge, getProductOffers } from './utils';


type Props = {
    userId?: string
}

type Product = {
    id: string
    name:string
    image_key: string
    offer_ids: string[]
}


const ProductList:FunctionComponent<Props> = ({ userId = "5" }) => {
    //setup
    const classes = useStyles();
    const [productId, setProductId] = React.useState<string|null>(null);
    const { loading:list_loading, error:list_error, data:list_data } = useQuery(PRODUCT_LIST_QUERY);
    const { loading:user_loading, error:user_error, data:user_data } = useQuery(USER_QUERY, { variables: { id: userId } });
    const openProductDetail = (id:string) => setProductId(id);
    const closeProductDetail = () => setProductId(null);

    //early exit
    if (list_loading || user_loading) return <p>Loading...</p>;
    if (list_error || user_error) return <p>Error :(</p>;

    //render
    const badgedUserOffers = getBadgedUserOffers(user_data.user.available_badges, user_data.user.offers);

    const products = list_data.productList.map((product:Product) => <Product key={product.id}
                                                                             id={product.id}
                                                                             name={product.name}
                                                                             image_key={product.image_key}
                                                                             badge_name={ getHighestPriorityBadge(product.offer_ids, badgedUserOffers) }
                                                                             openProductDetail={openProductDetail}/>);

    return (
        <Fragment>
            <Grid data-testid="ProductList" container spacing={3}>
                <Grid item xs={12}>
                    <Typography variant="h4">Welcome to our Store</Typography>
                </Grid>
                <Grid item xs={12}>
                    <GridList cellHeight={200} spacing={1} className={classes.gridList}>
                        { products }
                    </GridList>
                </Grid>
            </Grid>
            { productId ? <ProductDetail productId={productId}
                                         badge_name={getHighestPriorityBadge(getProductOffers(list_data.productList, productId), badgedUserOffers)}
                                         closeProductDetail={closeProductDetail}/> : null }
        </Fragment>
    );
}

export default ProductList;