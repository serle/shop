import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
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
        }
    }),
);

export default useStyles;