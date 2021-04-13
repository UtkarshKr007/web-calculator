import React from 'react';
import { makeStyles } from "@material-ui/core/styles";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';


const useStyles = makeStyles({
    logs: {
        overflowY: 'hidden'
    },
    textContainer: {
        border: "0.5px solid black",
        borderRadius: "10px",
        margin: "5px 0px",
        padding: "10px",
        display: "inline-block"
    }
});

export default function Log({ logs }) {
    const classes = useStyles();
    return (
        <List className={classes.logs} subheader={<Typography variant="h5" align="center"> Recent Calculations From Our Users </Typography>} >
        {logs.map((calculation, index) => {
            return (
                <ListItem key={index} className={classes.textContainer}>
                    <ListItemText align="left" primary={calculation} />
                </ListItem>
            )
        })}
    </List>
    )
}