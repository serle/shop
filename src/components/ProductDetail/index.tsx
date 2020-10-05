import React, { FunctionComponent } from 'react';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from "@material-ui/core/Typography";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { useQuery } from "@apollo/client";

import useStyles from './styles';
import PRODUCT_DETAIL from './gql';

type Props = {
    productId: string | null
    badge_name: string | null
    closeProductDetail: () => void
}

const ProductDetail:FunctionComponent<Props> = ({productId, badge_name, closeProductDetail}) => {
    const classes = useStyles();
    const { loading, error, data } = useQuery(PRODUCT_DETAIL, { variables: { id:productId } });

    //early exit
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;

    //data destructure
    const { product: { name, image_key, price: { currency_code, current_price, original_price }, information } } = data;

    const image = `https://asset1.cxnmarksandspencer.com/is/image/mands/${image_key}`;
    const badge = `/${badge_name}_icon.jpg`;

    return (
        <Dialog data-testid="ProductDetail"
                open={productId != null}
                onClose={closeProductDetail}
                aria-labelledby="product-detail-dialog"
                className={classes.root}>
            <DialogTitle>{name}</DialogTitle>
            <DialogContent>
                <Grid container spacing={2}>
                    <Grid container spacing={2} className={classes.visual}>
                        <Grid item>
                            { image_key ? <img src={image} alt={name}/> : null }
                        </Grid>
                        <Grid item>
                            <Typography>{`Price: ${current_price} ${currency_code}`}</Typography>
                            { original_price ? <Typography>{`Original Price: ${original_price} ${currency_code}`}</Typography> : null }
                            { badge_name ? <img className={classes.badge} src={badge} alt={badge_name} /> : null }
                        </Grid>
                    </Grid>
                    <Grid item>
                        <Typography className={classes.description}>{information[0].section_text}</Typography>
                    </Grid>
                </Grid>
            </DialogContent>
            <DialogActions>
                <Button onClick={closeProductDetail} color="primary">Close</Button>
            </DialogActions>
        </Dialog>
    );
}

export default ProductDetail;