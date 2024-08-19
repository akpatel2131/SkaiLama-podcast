import React from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import AuthenticationPage from "./component/AuthPage/Index";
import CreateProject from "./component/CreateProject/CreateProject";

import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import Navbar from "./component/Navbar/Navbar";

export const config = {
  endpoint: `http://localhost:3001/api`,
};

function ProjectPage({ component }) {
  return (
    <>
      <Navbar />
      {component}
    </>
  );
}

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AuthenticationPage />} />
          <Route
            path="/project"
            element={<ProjectPage component={<CreateProject />} />}
          />
        </Routes>
      </BrowserRouter>
      <ToastContainer
        className="toast-container"
        closeButton={false}
        closeOnClick
      />
    </div>
  );
}

export default App;
