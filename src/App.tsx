import { useEffect } from "react";
import "./assets/scss/App.css";
import LayoutMain from "./layouts/LayoutMain";

function App() {
  const getString = () => {
    return "sad";
  };

  useEffect(() => {
    getString();
  });

  return (
    <div className="app">
      <LayoutMain />
    </div>
  );
}

export default App;
