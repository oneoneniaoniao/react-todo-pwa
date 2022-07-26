import React from "react";
import "./service/firebase";
import "./App.css";
import { Header } from "./components/Header";
import AuthProvider from "./providers/AuthProvider";
import Dashboard from "./components/Dashboard";

function App() {
  return (
    <AuthProvider>
      <div className="App">
        <Header />
        <Dashboard/>
      </div>
    </AuthProvider>
  );
}

export default App;
