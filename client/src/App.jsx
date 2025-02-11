// filepath: /c:/IPD Project/client/src/App.jsx
import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { ClerkProvider } from "@clerk/clerk-react";
import AudioRecorder from "./components/AudioRecorder";
import Banner from "./components/banner/Banner";
import Navbar from "./components/navbar/Navbar";
import Companies from "./components/companies/Companies";
import Provide from "./components/provide/Provide";
import Why from "./components/why/Why";
import Network from "./components/network/Network";
import Clientsay from "./components/clientsay/Clientsay";
import Newsletter from "./components/newsletter/Newsletter";
import Footer from "./components/footer/Footer";
import AnalysisPage from "./components/practice/Practice";

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

function App() {
  return (
    <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
      <Router>
        <div className="App">
          <Navbar />
          <Banner />
          <Companies />
          <Provide />
          <Why />
          <Network />
          <Clientsay />
          <Newsletter />
          <AnalysisPage />
          <AudioRecorder />
          <Footer />
        </div>
      </Router>
    </ClerkProvider>
  );
}

export default App;