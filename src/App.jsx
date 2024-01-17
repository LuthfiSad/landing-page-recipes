import Contact from "./components/Contact";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import Ingredient from "./components/Ingredient";
import Navbar from "./components/Navbar";
import Popular from "./components/Popular";
import Recipes from "./components/Recipes";
import { BrowserRouter as Router } from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="select-none">
        <Navbar></Navbar>
        <Hero></Hero>
        <Popular></Popular>
        <Recipes></Recipes>
        <Ingredient></Ingredient>
        <Contact></Contact>
        <Footer></Footer>
      </div>
    </Router>
  );
}

export default App;
