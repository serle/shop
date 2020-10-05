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


const ProductList:FunctionComponent<Props> = ({ userId = "1" }) => {
    const classes = useStyles();
    const [productId, setProductId] = React.useState<string | null>(null);

    const { loading:list_loading, error:list_error, data:list_data } = useQuery(PRODUCT_LIST_QUERY);
    const { loading:user_loading, error:user_error, data:user_data } = useQuery(USER_QUERY, {
        variables: { id: userId },
    });
    const openProductDetail = (id:string) => {
        setProductId(id);
    };
    const closeProductDetail = () => {
        setProductId(null);
    };


    if (list_loading || user_loading) return <p>Loading...</p>;
    if (list_error || user_error) return <p>Error :(</p>;

    const { productList: product_arr } = list_data;
    const { user: { available_badges:user_badges, offers:user_offers } } = user_data;

    const badgedUserOffers = getBadgedUserOffers(user_badges, user_offers);
    const products = product_arr.map((v:Product) => <Product key={v.id}
                                                             id={v.id}
                                                             name={v.name}
                                                             image_key={v.image_key}
                                                             badge_name={getHighestPriorityBadge(v.offer_ids, badgedUserOffers)}
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
                                         badge_name={getHighestPriorityBadge(getProductOffers(product_arr, productId), badgedUserOffers)}
                                         closeProductDetail={closeProductDetail}/> : null }
        </Fragment>
    );
}

export default ProductList;