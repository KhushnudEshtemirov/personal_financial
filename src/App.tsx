import { Routes, Route } from "react-router-dom";

import Home from "./pages/home";
import Expenses from "./pages/expenses";
import Income from "./pages/income";
import Sidebar from "./components/sidebar";

function App() {
  return (
    <div>
      <Sidebar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/expenses" element={<Expenses />} />
        <Route path="/income" element={<Income />} />
      </Routes>
    </div>
  );
}

export default App;
