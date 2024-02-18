import { Routes, Route } from "react-router-dom";

import Home from "./pages/home";
import Expenses from "./pages/expenses";
import Income from "./pages/income";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/expenses" element={<Expenses />} />
      <Route path="/income" element={<Income />} />
    </Routes>
  );
}

export default App;
