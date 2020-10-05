import {createStyles, makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() =>
    createStyles({
        root: {
            display: 'flex',
            flexDirection: 'column',
            margin: 'auto',
            width: 'fit-content',
        },
        visual: {
            flexDirection:"row",
            flexWrap:"nowrap"
        },
        description: {
            textAlign: 'justify'
        },
        badge: {
            width: '60px',
            height: '30px',
            transform: 'translateY(20px)'
        }
    }),
);

export default useStyles;