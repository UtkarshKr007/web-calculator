import React from 'react';
import { makeStyles } from "@material-ui/core/styles";
import ButtonGroup from '@material-ui/core/ButtonGroup';
import CalcButton from './CalcButton';

const useStyles = makeStyles({
  calcRow: {
    display: 'flex',
    flexDirection: 'row'
  }
});

export default function CalcButtonGroup({ keyValues, clickFunc, disableToggle }) {
  const classes = useStyles();
  return (
    <ButtonGroup color="primary" aria-label="primary button group" className={classes.calcRow}>
      {keyValues.map((val, index) => <CalcButton key={index} keyValue={val} clickFunc={clickFunc} disableToggle={disableToggle} /> )}
    </ButtonGroup>
  )
}