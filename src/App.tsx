import React, { FC } from "react";
import { Route, Routes } from "react-router-dom";
import { Calculator2 } from "./Calculator2";
import NavBar from "./NavBar";
import { GraphApp } from "./GraphApp";
import { TableApp } from "./tableApp/TableApp";

interface AppProps {
  
}

export const App: FC<AppProps> = () => {
  return (
      <Routes>
        <Route path="/" element = {<NavBar/>} />
        <Route path="/calculator2" element= {<Calculator2/>} />
        <Route path="/graph" element={<GraphApp rows={50} cols={50}/>} />
        <Route path="/tableapp" element={<TableApp></TableApp>} />
      </Routes>
  );
}