import { Routes, Route } from "react-router-dom";

import Home from "./pages/home";
import Expenses from "./pages/expenses";
import Income from "./pages/income";
import Sidebar from "./components/sidebar";
import Header from "./components/header";

function App() {
  return (
    <div className="app">
      <Sidebar />
      <div className="main">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/expenses" element={<Expenses />} />
          <Route path="/income" element={<Income />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
