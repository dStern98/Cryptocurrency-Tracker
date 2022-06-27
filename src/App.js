import React from "react";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import CryptoDetail from "./pages/cryptoDetail";
import CryptoSummary from "./pages/cryptoSummary";
import Navbar from "./components/navbar";
import ErrorPage from "./pages/errorPage";
import {CoinListContextProvider} from "./contexts/trackListContext";

function App() {
  return (
    <CoinListContextProvider>
    <BrowserRouter>
    <Navbar/>
    <Routes>
      <Route exact path="/" element={<CryptoSummary/>}/>
      <Route exact path="/:coin" element={<CryptoDetail/>}/>
      <Route exact path="*" element={<ErrorPage/>}/>
    </Routes>
    </BrowserRouter>
    </CoinListContextProvider>

  );
}

export default App;
