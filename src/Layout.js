import React from "react";
import clsx from "clsx";
import { withStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import MailIcon from "@material-ui/icons/Mail";
import {
  Redirect
} from "react-router-dom";

const drawerWidth = 240;

const styles = theme => ({
  root: {
    display: "flex"
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    background: "#202124"
  },
  toolbarRoot: {
    display: "flex",
    width: "100%",
    paddingLeft: "16px"
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  menuButton: {
    marginRight: 36
  },
  hide: {
    display: "none"
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap"
  },
  drawerOpen: {
    width: drawerWidth,
    // background: 'red',

    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  drawerClose: {
    // background: 'red',

    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    overflowX: "hidden",
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9) + 1
    }
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    // justifyContent: "flex-end",
    // padding: "0 8px",
    width: "100%",
    ...theme.mixins.toolbar
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3)
  },
  brand: {
    width: "100%",
    display: "flex",
    justifyContent: "flex-end"
  }
});

class Layout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      redirect: null
    };
  }

  handleDrawerOpen = () => {
    this.setState({ open: true });
    return ;
  };

  handleDrawerClose = () => {
    this.setState({ open: false });
    return;
  };

  redirect = () => {
    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />;
    }
  };

  setRedirect = link => {
    this.setState({ redirect: link });
    return;
  };

  render() {
    if(this.props){
      const { classes } = this.props;
    }
    const { open } = this.state;
    console.log(this.state.open);
    return (
      <div className={classes.root}>
        {this.redirect()}

        <CssBaseline />
        <AppBar
          position="fixed"
          className={clsx(classes.appBar, {
            [classes.appBarShift]: open
          })}
        >
          <Toolbar classes={{ root: classes.toolbarRoot }}>
            <IconButton
              color="inherit"
              aria-label="Open drawer"
              onClick={this.handleDrawerOpen}
              edge="start"
              className={clsx(classes.menuButton, {
                [classes.hide]: open
              })}
            >
              <MenuIcon />
            </IconButton>
            <div className={classes.brand}>
              <Typography variant="h6" noWrap>
                Co-Learning Lounge
              </Typography>
            </div>
          </Toolbar>
        </AppBar>
        <Drawer
          variant="permanent"
          className={clsx(classes.drawer, {
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open
          })}
          classes={{
            paper: clsx({
              [classes.drawerOpen]: open,
              [classes.drawerClose]: !open
            })
          }}
          open={this.state.open}
        >
          <div className={classes.toolbar}>
            <List>
              <ListItem button onClick={this.thhandleDrawerClose}>
                <ListItemIcon>
                  <MenuIcon />
                </ListItemIcon>
                <ListItemText primary="Menu" />
              </ListItem>
            </List>
          </div>
          <Divider />
          <List>
            {["Inbox", "Starred", "Send email", "Drafts"].map((text, index) => (
              <ListItem button key={text}>
                <ListItemIcon>
                  {index % 2 === 0 ? (
                    <InboxIcon
                      onClick={() => {
                        this.setRedirect("/About");
                      }}
                    />
                  ) : (
                    <MailIcon
                      onClick={() => {
                        this.setRedirect("/");
                      }}
                    />
                  )}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            ))}
          </List>
          <Divider />
          <List>
            {["All mail", "Trash", "Spam"].map((text, index) => (
              <ListItem button key={text}>
                <ListItemIcon>
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            ))}
          </List>
        </Drawer>
        <main className={classes.content}>
          <div className={classes.toolbar} />
          <div onClick={this.handleDrawerClose}>{this.props.children}</div>
        </main>
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(Layout);
