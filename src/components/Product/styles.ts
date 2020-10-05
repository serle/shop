import { createStyles, makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() =>
    createStyles({
        titleBar: {
            background:
                'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, ' +
                'rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
        },
        icon: {
            color: 'white',
        },
        badge: {
            width: '60px',
            height: '30px',
            position: 'absolute',
            bottom: '10px',
            right: '10px'
        }
    }), {index: 1}
);

export default useStyles;

