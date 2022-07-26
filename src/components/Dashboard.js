import React, { useState, useContext, useEffect } from "react";
import dig from "object-dig";
import { AuthContext } from "../providers/AuthProvider";
import { signInWithGoogle } from "../service/firebase";
import * as Api from "../service/api";

const Dashboard = () => {
  const [inputName, setInputName] = useState("");
  const currentUser = useContext(AuthContext);
  console.log(inputName);
  const formRender = () => {
    let dom;
    if (dig(currentUser, "currentUser", "uid")) {
      dom = (
        <form>
          <input
            type="text"
            placeholder="todo name"
            value={inputName}
            onChange={(e) => setInputName(e.target.value)}
          />
          <button type="button" onClick={() => post()}>
            add
          </button>
        </form>
      );
    } else {
      dom = <button onClick={signInWithGoogle}>Log In</button>;
    }
    return dom;
  };
  const post = () => {
    console.log("post");
    Api.addTodo(inputName, currentUser.currentUser.uid);
    setInputName("");
  };
  return <div>{formRender()}</div>;
};

export default Dashboard;
