import "./App.css";
import FirstComponent from "./components/firstComponent";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./components/navbar";
import Jumbotron from "./components/jumbotron";
import Loader from "./components/loader";
import { useState, useEffect } from "react";

function App() {
  const [sortBy, setSortBy] = useState("name");
  const sortContest = (param) => {
    setSortBy(param);
  };
  return (
    <div>
      <Navbar sortContest={sortContest} />
      <Jumbotron />
      <FirstComponent sortBy={sortBy} />
    </div>
  );
}

export default App;
