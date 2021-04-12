import React from 'react';
import { makeStyles } from "@material-ui/core/styles";

import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';

import CalcButtonGroup from './components/CalcButtonGroup';
import CalcButton from './components/CalcButton';
import Logs from './components/Logs';
import { Context } from './CalcProvider';

const useStyles = makeStyles({
  headers: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  calcSide: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    borderRight: '1px solid #e0e0e0'
  },
  calcCard: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor:'orange',
      boxShadow: '10px 10px'
  },
  calcHeader: {
      display: 'flex',
      justifyContent: 'flex-end',
      alignItems: 'center',
      width: '250px',
      height: '60px',
      fontSize: 'large',
      backgroundColor: 'gainsboro',
      overflow: 'hidden',
      margin: '20px'
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
          <Grid container>
            <Grid item xs={12} className={classes.headers} >
                <Typography variant="h4" className="header-message">Online Calculator</Typography>
                <Typography variant="h5"> Recent Calculations From Our Users </Typography>
            </Grid>
          </Grid>

          <Grid container component={Paper} className={classes.mainContent}>

            <Grid item xs={5} className={classes.calcSide}>
              <Card className={classes.calcCard}>
                <CardHeader align="right" title={context.display} subheader={context.preview} className={classes.calcHeader} />
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
                    <CalcButton keyValue={'='} clickFunc={context.press} customStyle={classes.specialButtons} />
                  </ButtonGroup>

                </CardContent>
              </Card>
            </Grid>
            <Logs logs={context.calcLogs}/>
          </Grid>
        </React.Fragment>
      )}
    </Context.Consumer>
  );
}