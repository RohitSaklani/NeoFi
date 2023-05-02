import Header from "./Component/Header";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import TradeCard from "./Component/TradeCard";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="trade" element={<TradeCard />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
