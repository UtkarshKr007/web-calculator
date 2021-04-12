import React from 'react';
import { makeStyles } from "@material-ui/core/styles";
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';

import CalcButtonGroup from './components/CalcButtonGroup';
import CalcButton from './components/CalcButton';
import { Context } from './CalcProvider';

const useStyles = makeStyles({
  calculator: {
    width: '50%',
    height: '90vh'
  },
  calcCard: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center'
  },
  calcRow: {
    display: 'flex',
    flexDirection: 'row'
  },
  specialButtons: {
    display: 'flex',
    flexGrow: 2,
  }
});

export default function Calculator() {
  const classes = useStyles();
  return (
    <Context.Consumer>
      {context =>  (
        <React.Fragment>
          <Card id="calc-card" className={classes.calcCard}>
            <CardHeader title={context.display} subheader={context.preview} />
            <CardContent>
              <ButtonGroup color="primary" aria-label="primary button group" className={classes.calcRow}>
                <CalcButton keyValue={'AC'} clickFunc={context.press} customStyle={classes.specialButtons}/>
                <CalcButton keyValue={<KeyboardBackspaceIcon />}  clickFunc={context.press} funcParam={'backspace'}/>
                <CalcButton keyValue={'/'}  clickFunc={context.press} disableToggle={!context.validLen}/>               
              </ButtonGroup>

              <CalcButtonGroup keyValues={['7','8','9','*']} clickFunc={context.press} disableToggle={!context.validLen} />
              <CalcButtonGroup keyValues={['4','5','6','+']} clickFunc={context.press} disableToggle={!context.validLen} />
              <CalcButtonGroup keyValues={['1','2','3','-']} clickFunc={context.press} disableToggle={!context.validLen} />

              <ButtonGroup aria-label="contained primary button group" className={classes.calcRow}>
                <CalcButton keyValue={'.'} clickFunc={context.press} disableToggle={!context.validLen} />
                <CalcButton keyValue={'0'} clickFunc={context.press} disableToggle={!context.validLen} />
                <CalcButton keyValue={'='} clickFunc={context.press} disableToggle={!context.validCalc} customStyle={classes.specialButtons} />
              </ButtonGroup>

            </CardContent>
          </Card>
        </React.Fragment>
      )}
    </Context.Consumer>
  );
}