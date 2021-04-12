import React from 'react';
import { makeStyles } from "@material-ui/core/styles";

import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';

import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';

import CalcButtonGroup from './components/CalcButtonGroup';
import CalcButton from './components/CalcButton';
import { Context } from './CalcProvider';

const useStyles = makeStyles({
  borderRight500: {
    borderRight: '1px solid #e0e0e0'
  },
  calcCard: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center'
  },
  header: {
      display: 'flex',
      justifyContent: 'flex-end',
      alignItems: 'center',
      width: '250px',
      height: '40px',
      fontSize: 'large',
      backgroundColor: 'gainsboro',
      overflow: 'hidden',
      marginTop: '20px'
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
            <Grid item xs={12} >
                <Typography variant="h5" className="header-message">Online Calculator</Typography>
            </Grid>
          </Grid>

          <Grid container component={Paper} className={classes.cardSection}>

            <Grid item xs={5} className={classes.borderRight500}>
              <Card className={classes.calcCard}>
                <CardHeader title={context.display} subheader={context.preview} className={classes.header} />
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
            </Grid>
            <Grid item xs={5}>
                <List className={classes.LogsArea}>
                </List>
            </Grid>
          </Grid>
        </React.Fragment>
      )}
    </Context.Consumer>
  );
}