import React, { useState } from "react";

import Navbar from "./Navbar";
import Films from "./Films/Films";
import Planets from "./Planets/Planets";
import People from "./People/People";
import Starships from "./Starships/Starships";


const Home = () => {
  const [page, setPage] = useState("planets");

  return (
    <>
      <div className="App">
        
        <h1>TTC General SWE Engineering Challenge</h1>

        <Navbar setPage={setPage} />
        <div className="content">
          {page === "planets" ? (
            <Planets />
          ) : page === "people" ? (
            <People />
          ) : page === "starships" ? (
            <Starships />
          ) : (
            <Films />
          )}
        </div>

        <div className="footer">Developed by Rao adnan</div>
      </div>
    </>
  );
};

export default Home;
