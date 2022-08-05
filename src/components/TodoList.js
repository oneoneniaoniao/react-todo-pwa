import {
  Checkbox,
  IconButton,
  ListItem,
  ListItemSecondaryAction,
  ListItemIcon,
  ListItemText,
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import { makeStyles } from "@material-ui/styles";
import React from "react";
import * as Api from "../service/api";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 360,
    margin: "auto",
  },
  ul: {
    paddingLeft: 0,
    listStyle: "none",
  },
  list: {
    justifyContent: "space-between",
  },
}));

export const TodoList = (props) => {
  const classes = useStyles();
  const deleteHandler = async (id) => {
    await Api.todoDelete(id);
    setTimeout(() => {
      props.fetch();
    }, 100);
  };
  const todoList = props.todos.map((todo) => {
    return (
      // <li key={todo.id}>
      //   {todo.content}
      //   <button type="button" onClick={() => deleteHandler(todo.id)}>
      //     削除
      //   </button>
      // </li>
      <ListItem key={todo.id} className={classes.list}>
        <ListItemIcon>
          <Checkbox checked={todo.isComplete} />
        </ListItemIcon>
        <ListItemText primary={todo.content} />
        <ListItemSecondaryAction>
          <IconButton
            edge="end"
            aria-label="delete"
            onClick={() => {
              deleteHandler(todo.id);
            }}
          >
            <DeleteIcon />
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
    );
  });
  return (
    <div className={classes.root}>
      <h2>My Todo</h2>
      <ul className={classes.ul}>{todoList}</ul>
    </div>
  );
};
