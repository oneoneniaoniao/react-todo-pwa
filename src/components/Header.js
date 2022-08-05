import React, { useContext } from "react";
import dig from "object-dig";
import { AuthContext } from "../providers/AuthProvider";
import { signInWithGoogle ,logOut } from "../service/firebase";
import { AppBar, Button, makeStyles, Toolbar, Typography } from "@material-ui/core";

const useStyles = makeStyles(()=>({
  toolbar:{
    justifyContent: "space-between"
  },
  button:{
    color:"white"
  }
}))

export const Header = () => {
  const currentUser = useContext(AuthContext);
  console.log(currentUser)
  const classes = useStyles();

  const buttonRender= ()=> {
    let buttonDom;
    if(dig(currentUser, "currentUser", "uid")){
      buttonDom = <Button className={classes.button} variant="inherit" onClick={logOut}>Log Out</Button>
    }else{
      buttonDom = <Button className={classes.button} variant="inherit" onClick={signInWithGoogle}>Log In</Button>
    }
    return buttonDom
  }

  return (
      <AppBar position="static">
        <Toolbar className={classes.toolbar}>
          <Typography variant="h6">Todo App</Typography>
      {buttonRender()}
        </Toolbar>
      </AppBar>
  );
};
