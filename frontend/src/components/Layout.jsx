import React from "react";

const Layout = ({ children }) => {
  return (
    <div className="p-8 bg-gray-200 min-h-screen">{children}</div>
  );
};

export default Layout;
