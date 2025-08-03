import React from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import AiTools from "../components/AiTools";
import Footer from "../components/Footer";
import Plan from "../components/Plan";

const Home = () => {
  return (
    <>
      <Navbar />
      <Hero />
      <AiTools />
      <Plan />
      <Footer />
    </>
  );
};

export default Home;
