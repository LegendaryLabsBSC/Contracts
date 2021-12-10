import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Flex, HStack, } from "@chakra-ui/react";
import BackDrop from "./components/BackDrop";
import Sidebar from "./components/Sidebar/Sidebar";
import Home from "./pages/Home/Home";
import ContractTesting from "./pages/ContractTesting/ContractTesting";
// import Settings from "./pages/Settings/Settings";
import './App.css'

const App = () => {
  const [navSize, changeNavSize] = useState("large");

  return (
    <HStack
      spacing="5%"
    >
      <Router>
        <Sidebar changeNavSize={changeNavSize} navSize={navSize} />
        <Flex>
          <BackDrop navSize={navSize}>
            <Routes>
              <Route path="/" element={<Home navSize={navSize} />} />
              <Route
                path="/contract-testing"
                element={<ContractTesting navSize={navSize} />}
              />
              {/* <Route path="/settings" element={<Settings navSize={navSize} />} /> */}
            </Routes>
          </BackDrop>
        </Flex>
      </Router>
    </HStack>
  );
};

export default App;
