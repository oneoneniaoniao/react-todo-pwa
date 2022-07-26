import React from "react";
import firebase from "firebase";
import { db } from "./firebase";

export const addTodo = (content, uid) => {
  console.log("in addTodo", content,uid);
  db.collection("todo").add({
    content: content,
    uid: uid,
    isComplete: false,
    createdAt: firebase.firestore.FieldValue.serverTimestamp(),
  });
};
