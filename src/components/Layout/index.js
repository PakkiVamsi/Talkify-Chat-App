import React from "react";
import ReactDOM from "react-dom";
import Header from "../Header";

const Layout = (props) => {
  return (
    <div className="hidesb">
      <Header addfriend={props.addfriend} type={props.type} />
      {props.children}
    </div>
  );
};

export default Layout;
