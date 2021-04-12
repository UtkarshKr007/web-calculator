import React from 'react';
import { makeStyles } from "@material-ui/core/styles";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { Typography } from '@material-ui/core';

const useStyles = makeStyles({
    logs: {
        overflowY: 'hidden'
    }
});

export default function Log({ logs }) {
    const classes = useStyles();
    return (
        <List className={classes.logs}>
        {logs.map((calculation, index) => {
            return (
                <ListItem key={index}>
                    <ListItemText align="left" primary={calculation} />
                </ListItem>
            )
        })}
    </List>
    )
}