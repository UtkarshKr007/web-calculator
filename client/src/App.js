import React from 'react';
import { makeStyles } from "@material-ui/core/styles";
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import IconButton from '@material-ui/core/IconButton';
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';

import CalcButton from './components/CalcButton';



const useStyles = makeStyles({
  calculator: {
    width: '100%',
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
  ac: {
    display: 'flex',
    flexGrow: 2,
    backgroundColor: 'red'
  },
  eq: {
    display: 'flex',
    flexGrow: 2,
    backgroundColor: 'green'
  }
});


function App() {
  const classes = useStyles();
  return (
        <Card id="calc-card" className={classes.calcCard}>
          <CardHeader title="Calculator Display"/>
          <CardContent>
            <ButtonGroup color="primary" aria-label="primary button group" className={classes.calcRow}>
              <CalcButton keyValue={'AC'} customStyle={classes.ac} />
              <CalcButton keyValue={<IconButton color="secondary" aria-label="backspace"><KeyboardBackspaceIcon /></IconButton>} />
              <CalcButton keyValue={'/'} />
            </ButtonGroup>
            <ButtonGroup  aria-label="contained primary button group" className={classes.calcRow}>
              <CalcButton keyValue={'7'} />
              <CalcButton keyValue={'8'} />
              <CalcButton keyValue={'9'} />
              <CalcButton keyValue={'*'} />
            </ButtonGroup>
            <ButtonGroup  aria-label="contained primary button group" className={classes.calcRow}>
              <CalcButton keyValue={'4'} />
              <CalcButton keyValue={'5'} />
              <CalcButton keyValue={'6'} />
              <CalcButton keyValue={'-'} />
            </ButtonGroup>
            <ButtonGroup aria-label="contained primary button group" className={classes.calcRow}>
              <CalcButton keyValue={'1'} />
              <CalcButton keyValue={'2'} />
              <CalcButton keyValue={'3'} />
              <CalcButton keyValue={'+'} />
            </ButtonGroup>
            <ButtonGroup aria-label="contained primary button group" className={classes.calcRow}>
              <CalcButton keyValue={'.'} />
              <CalcButton keyValue={'0'} />
              <CalcButton keyValue={'='} customStyle={classes.eq} />
            </ButtonGroup>
          </CardContent>
        </Card>
  );
}

export default App;
