import React, { useState, useContext, useEffect } from "react";
import dig from "object-dig";
import { AuthContext } from "../providers/AuthProvider";
import { signInWithGoogle } from "../service/firebase";
import * as Api from "../service/api";

export const TodoList = (props) => {
  const deleteHandler = async (id) => {
    await Api.todoDelete(id);
    setTimeout(() => {
      props.fetch();
    }, 100);
  };
  const todoList = props.todos
    ? props.todos.map((todo) => {
        return (
          <li key={todo.id}>
            {todo.content}
            <button type="button" onClick={() => deleteHandler(todo.id)}>
              削除
            </button>
          </li>
        );
      })
    : null;
  return (
    <>
      <h2>Your Todo</h2>
      <ul>{todoList}</ul>
    </>
  );
};
