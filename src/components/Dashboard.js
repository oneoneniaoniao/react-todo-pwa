import React, { useState, useContext, useEffect } from "react";
import dig from "object-dig";
import { AuthContext } from "../providers/AuthProvider";
import { signInWithGoogle } from "../service/firebase";
import * as Api from "../service/api";
import { TodoList } from "./TodoList";
import { TextField, Button, makeStyles } from "@material-ui/core";

const useStyles = makeStyles(() => ({
  root: {
    textAlign: "center",
    marginTop: "50px",
  },
  form: {
    width: "100%",
    maxWidth: 360,
    margin: "auto",
    marginBottom: 40,
    display: "flex",
    alignItems: "baseline",
    justifyContent: "center",
  },
  input: {
    marginRight: 10,
  },
}));

const Dashboard = () => {
  const classes = useStyles();
  const [inputName, setInputName] = useState("");
  const currentUser = useContext(AuthContext);
  const [todos, setTodos] = useState([]);
  useEffect(() => {
    fetch();
  }, [currentUser]);

  const fetch = async () => {
    if (dig(currentUser, "currentUser", "uid")) {
      const data = await Api.initGet(currentUser.currentUser.uid);
      setTodos(data);
    }
  };
  const formRender = () => {
    let dom;
    if (dig(currentUser, "currentUser", "uid")) {
      dom = (
        <form className={classes.form}>
          <TextField
          className={classes.input}
            type="text"
            placeholder="todo name"
            value={inputName}
            onChange={(e) => setInputName(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                if (inputName.trim().length > 0) {
                  post();
                }
              }
            }}
          />
          <Button
            variant="contained"
            color="primary"
            size="small"
            disabled={inputName.trim().length > 0 ? false : true}
            type="button"
            onClick={() => post()}
          >
            add
          </Button>
        </form>
      );
    } else {
      dom = <button onClick={signInWithGoogle}>Log In</button>;
    }
    return dom;
  };
  const post = async () => {
    await Api.addTodo(inputName, currentUser.currentUser.uid);
    setInputName("");
    fetch();
  };
  return (
    <div className={classes.root}>
      {formRender()}
      <TodoList todos={todos} fetch={fetch} />
    </div>
  );
};

export default Dashboard;
