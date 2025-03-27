import React, {useState} from "react";
import { BrowserRouter as Router,
          Routes,
          Route,
          Link} from "react-router-dom";

import './App.css';
import { useRoutes } from "react-router-dom";
import { RegisterForm } from "./Components/RegisterForm";
import LoginForm from "./Components/LoginForm";
import LandingPage from "./Components/LandingPage";
import UserProfile from "./Components/UserProfile";
import UserView from "./Components/UserView";
import Module from "./Components/Module";
import NavbarTop from "./Components/Navbar";


function NoMatch() {
  return (
    <div style={{ padding: 20 }}>
      <h2>404: Page Not Found</h2>
      <p><font color="white">There is no page at the requested url</font></p>
    </div>
  );
}

function UnAuthorized() {
  return (
    <div style={{ padding: 20 }}>
      <h2>401: Unauthorized</h2>
      <p><font color="white">You are not authorized to view the page at the requested url</font></p>
    </div>
  );
}

function App() {
  return (
    <>
      <NavbarTop />
          <div className="App">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/register" element={<RegisterForm />} />
            <Route path="/userprofile" element={<UserProfile />} />
            <Route path="/users" element={<UserView />} />
            <Route path="/modules/:id" element={<Module />} />
            <Route path="/unauthorized" element={<UnAuthorized />} />
            <Route path="*" element={<NoMatch />} />
          </Routes>
          </div>
    </>
  );
}

export default App;
