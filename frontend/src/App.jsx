import { useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import LeftPanel from "./components/LeftPanel";
import RightPanel from "./components/RightPanel";
import Feed from "./components/Feed";

function App() {
  return (
    <main className="container grid  grid-cols-3 lg:grid-cols-4 ">
      <LeftPanel />
      <Feed />
      <RightPanel className="hidden" />
    </main>
  );
}

export default App;
