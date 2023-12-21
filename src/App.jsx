import React, { useState, useEffect } from "react";
import LandingPage from "./components/LandingPage";

import Dashboard from "./components/dashboard/Dashboard";
import MesDemandes from "./components/dashboard/MesDemandes";
import DemandesAdmin from "./components/dashboard/DemandesAdmin";


import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


import JsonData from "./data/data.json";
import SmoothScroll from "smooth-scroll";
import "./App.css";
import DemandesAcceptees from "./components/dashboard/DemandesAcceptees";
import DemandesRejetees from "./components/dashboard/DemandesRejetees";
import LocalisationDemandes from "./components/dashboard/LocalisationDemandes";
import DashboardAdmin from "./components/dashboard/DashboardAdmin";
import LocalisationDemandesAdmin from "./components/dashboard/LocalisationDemandesAdmin";
import DemandesAvisAdmin from "./components/dashboard/DemandesAvisAdmin";
import Citoyens from "./components/dashboard/Citoyens";
import DemandesEnInstanceAdmin from "./components/dashboard/DemandesEnInstanceAdmin";
import Login from "./components/dashboard/Login";
import Register from "./components/dashboard/Register";
import LoginAdmin from "./components/dashboard/LoginAdmin";



export const scroll = new SmoothScroll('a[href*="#"]', {
  speed: 1000,
  speedAsDuration: true,
});

const App = () => {
  const [landingPageData, setLandingPageData] = useState({});
  useEffect(() => {
    setLandingPageData(JsonData);
  }, []);


  return (
   <Router>
      <Routes>
      <Route path="/" element= {<LandingPage data = {landingPageData} />} />
        <Route path="/espace-citoyen" element={<Dashboard />} />
        <Route path="/espace-admin" element={<DashboardAdmin />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/LoginAdmin" element={<LoginAdmin />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/mes-demandes" element={<MesDemandes />} />
        <Route path="/mes-demandes-acceptees" element={<DemandesAcceptees />} />
        <Route path="/mes-demandes-rejetees" element={<DemandesRejetees />} />
        <Route path="/localiser-mes-demandes" element={<LocalisationDemandes />} />
        <Route path="/demandes" element={<DemandesAdmin />} />
        <Route path="/demandes-en-cours" element={<DemandesAvisAdmin />} />
        <Route path="/demandes-en-instance" element={<DemandesEnInstanceAdmin />} />
        <Route path="/localiser-les-demandes" element={<LocalisationDemandesAdmin />} />

        <Route path="/citoyens" element={<Citoyens />} />
        



        



      </Routes>
    </Router>
   
   /*{ <div>
       <Navigation />
      <Header data={landingPageData.Header} />
      <About data={landingPageData.About} />
      <Services data={landingPageData.Services} />
      <Features data={landingPageData.Features} />
      <Gallery data={landingPageData.Gallery} />
      <Contact data={landingPageData.Contact} /> 
      <Dashboard />
  </div>}*/
  );
};

export default App;
