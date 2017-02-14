import React from "react";

import HomeContainer from "./home/home_container";

const App = ({ children }) => {
  return (
    <div>
      <h1>Minimum</h1>
      <HomeContainer />
      { children }
    </div>
  );
};

  export default App;
