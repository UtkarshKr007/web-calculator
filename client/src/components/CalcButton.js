import React from 'react';
import { makeStyles } from "@material-ui/core/styles";
import Button from '@material-ui/core/Button';

const useStyles = makeStyles({
  key: {
    margin: '4px 2px',
    fontSize: 'large',
  }
});

export default function CalcButton({keyValue, customStyle}) {
  const classes = useStyles();
  return (
    <Button variant="contained" color="primary" className={ customStyle ? classes.key + ' ' + customStyle : classes.key}> {keyValue} </Button>
  )
}