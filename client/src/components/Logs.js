import React from 'react';
import { makeStyles } from "@material-ui/core/styles";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

const useStyles = makeStyles({
    logs: {
        margin: '4px 2px',
        fontSize: 'large',
    }
});

export default function Log({ logs }) {
    const classes = useStyles();
    return (
        <List className={classes.logs}>
            {logs.map((calculation, index) => {
                return (
                    <ListItem key={index}>
                        <ListItemText align="right" primary={calculation} />
                    </ListItem>
                )
            })}
        </List>
    )
}