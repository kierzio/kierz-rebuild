import React from "react";
import Navigation from "../Navigation";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-cyber-dark border-t border-neon-blue/20 py-8 px-4">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <a href="#intro" className="text-neon-blue font-orbitron text-xl font-bold">
              Kierz.io
            </a>
            <p className="text-gray-400 text-sm mt-1">
              Crafting digital experiences from the future
            </p>
          </div>
          
          <div className="text-gray-400 text-sm">
            &copy; {currentYear} Kierz.io | All rights reserved
          </div>
        </div>
      </div>
    </footer>
  );
};

const Layout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen bg-cyber-dark">
      <Navigation />
      <main className="flex-grow">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;