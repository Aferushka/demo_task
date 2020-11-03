import React from 'react';
import { getIsLoading } from './redux/reducer';
import { connect } from 'react-redux';
import CircularProgress from '@material-ui/core/CircularProgress';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import {bindActionCreators} from "redux";

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: "center",
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2)

  },
}));

export function BaseContainer({ children, isLoading }) {
  const classes = useStyles();
  return (
      <Container>
        {isLoading &&
          <div className={classes.root}>
            <CircularProgress/>
          </div>
          }
        <div className="page-container">{children}</div>
      </Container>
  )
};

const mapStateToProps = state => ({
  isLoading: getIsLoading(state)
});

export default connect(
    mapStateToProps
)(BaseContainer);