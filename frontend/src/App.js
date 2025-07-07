import React from "react";
import "./styles/App.css";
import ProductList from "./components/ProductList";
import Header from "./components/Header";

function App() {
  return (
    <div className="App">
      <Header />
      <main>
        <ProductList />
      </main>
    </div>
  );
}

export default App;
