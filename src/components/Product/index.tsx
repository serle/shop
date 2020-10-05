import React, {FunctionComponent } from "react";

import useStyles from "./styles";
import {GridListTileBar} from "@material-ui/core";
import GridListTile from "@material-ui/core/GridListTile";
import IconButton from "@material-ui/core/IconButton";
import StarBorderIcon from '@material-ui/icons/StarBorder';

type Props = {
    id: string
    name: string
    image_key: string
    badge_name: string | null
    openProductDetail: (productId:string) => void
}

const Product:FunctionComponent<Props> = ({ id, name, image_key, badge_name, openProductDetail }) => {
    const classes = useStyles();

    const image = `https://asset1.cxnmarksandspencer.com/is/image/mands/${image_key}`;
    const badge = `/${badge_name}_icon.jpg`;

    const icon = <IconButton aria-label={`star ${name}`} className={classes.icon} onClick={() => openProductDetail(id)}>
                    <StarBorderIcon/>
                 </IconButton>;

    return (
        <GridListTile cols={1} rows={1}>
            { image_key ? <img src={image} alt={name} /> : null }
            { badge_name ? <img className={classes.badge} src={badge} alt={badge_name} /> : null }
            <GridListTileBar
                title={name}
                titlePosition="top"
                actionIcon={icon}
                actionPosition="left"
                className={classes.titleBar}
            />
        </GridListTile>
    );
}

export default Product;