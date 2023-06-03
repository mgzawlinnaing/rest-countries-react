import { Routes, Route } from "react-router-dom";
import Countries from "./components/Countries";

import SingleCountry from "./components/SingleCountry";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Countries />} />
      <Route path="/:name" element={<SingleCountry />} />
    </Routes>
  );
}

export default App;
