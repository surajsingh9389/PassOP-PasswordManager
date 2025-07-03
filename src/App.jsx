import { useState } from "react";
import "./App.css";

import Navbar from "./components/Navbar";
import Main from "./components/Main";
import Footer from "./components/Footer";

function App() {
  return (
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">
          <Main />
        </main>
        <Footer />
      </div>
  );
}

export default App;
