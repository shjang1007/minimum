import React from "react";

import HomeContainer from "./home/home_container";

const App = ({ children }) => {
  return (
    <div>
      { children }
      <h1>Minimum</h1>
    </div>
  );
};

  export default App;
