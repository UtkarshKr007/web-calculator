import React from 'react';
import { makeStyles } from "@material-ui/core/styles";

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
  calcBox: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: '10px'
  },
  calcCard: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor:'orange',
      boxShadow: '10px 10px'
  },
  calcDisplay: {
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
            <Grid item xs={12} sm={7}>
              <Typography variant="h3" align="center" gutterBottom={true}> Online Calculator</Typography>
              <Grid item className={classes.calcBox}>
                <Card className={classes.calcCard}>
                  <CardHeader align="right" title={context.display} subheader={context.preview} className={classes.calcDisplay} />
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
            </Grid>
            <Grid item xs={12} sm={5}>
              <Logs logs={context.calcLogs}/>
            </Grid>
          </Grid>
        </React.Fragment>
      )}
    </Context.Consumer>
  );
}