import React from 'react';
import { Link } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Drawer from '@material-ui/core/Drawer';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import ApartmentIcon from '@material-ui/icons/Apartment';
import DvrIcon from '@material-ui/icons/Dvr';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AppsIcon from '@material-ui/icons/Apps';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    button: {
        marginRight: theme.spacing(2),
    },
    drawersButton: {
        marginBottom: theme.spacing(1)
    }
}));

export default function NavigationHead() {
    const classes = useStyles();
    const [menuState, setMenu] = React.useState(false);

    return (
        <div className={classes.root}>
          <AppBar position="static">
              <Toolbar>
                  <IconButton
                      edge="start"
                      className={classes.button}
                      color="secondary"
                      aria-label="menu"
                      onClick={() => setMenu(true)}
                  >
                      <MenuIcon />
                  </IconButton>
                  <Button
                      component={Link}
                      to={"/admin"}
                      className={classes.button}
                      variant="outlined"
                      color="secondary"
                      startIcon={<ApartmentIcon/>}
                  >
                      Администратор
                  </Button>
                  <Button
                      component={Link}
                      to={"/worker"}
                      className={classes.button}
                      variant="outlined"
                      color="secondary"
                      startIcon={<DvrIcon/>}
                  >
                      Работник
                  </Button>
              </Toolbar>
          </AppBar>
          <Drawer
            anchor="left"
            className={classes.list}
            open={menuState}
            onClose={() => setMenu(false)}
          >
              <Button
                  component={Link}
                  to={"/positions"}
                  className={classes.drawersButton}
                  color="secondary"
                  startIcon={<AppsIcon/>}
                  onClick={() => setMenu(false)}
              >
                  Позиции
              </Button>
          </Drawer>
        </div>
    );
};

NavigationHead.propTypes = {};
NavigationHead.defaultProps = {};
