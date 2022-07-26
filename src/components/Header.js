import React, { useContext } from "react";
import dig from "object-dig";
import { AuthContext } from "../providers/AuthProvider";
import { signInWithGoogle ,logOut } from "../service/firebase";

export const Header = () => {
  const currentUser = useContext(AuthContext);
  console.log(currentUser)
  const buttonRender= ()=> {
    let buttonDom;
    if(dig(currentUser, "currentUser", "uid")){
      buttonDom = <button onClick={logOut}>Log Out</button>
    }else{
      buttonDom = <button onClick={signInWithGoogle}>Log In</button>
    }
    return buttonDom
  }

  return (
    <header>
      header
      {buttonRender()}
    </header>
  );
};
