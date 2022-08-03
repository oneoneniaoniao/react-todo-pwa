import React, { useState, useContext, useEffect } from "react";
import dig from "object-dig";
import { AuthContext } from "../providers/AuthProvider";
import { signInWithGoogle } from "../service/firebase";
import * as Api from "../service/api";
import { TodoList } from "./TodoList";

const Dashboard = () => {
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
        <form>
          <input
            type="text"
            placeholder="todo name"
            value={inputName}
            onChange={(e) => setInputName(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                if(inputName.length > 0){
                post();
                }
              }
            }}
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
  const post = async () => {
    await Api.addTodo(inputName, currentUser.currentUser.uid);
    setInputName("");
    fetch();
  };
  return (
    <div>
      {formRender()}
      <TodoList todos={todos} fetch={fetch} />
    </div>
  );
};

export default Dashboard;
