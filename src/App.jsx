import React, { useState, useEffect } from "react";

import CustomCursor from "./components/custom/cursor";
import Landing from "./layouts/landing";
import Systems from "./layouts/systems";
import Projects from "./layouts/projects";
import Contact from "./layouts/contact";

import "./App.css";
import Loader from "./layouts/loader";

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadApp = async () => {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setLoading(false);
    };
    loadApp();
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <React.Fragment>
      <CustomCursor />
      <div className="noise" />
      <Landing />
      <Systems />
      <Projects />
      <Contact />
    </React.Fragment>
  );
}

export default App;
