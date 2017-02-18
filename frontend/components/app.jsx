import React from "react";
import MainNav from "./nav/main_nav";

const App = (props) => {
  return (
    <div>
      <MainNav />
      { props.children }
    </div>
  );
};

  export default App;
