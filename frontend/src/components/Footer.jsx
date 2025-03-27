import React from "react";

function Footer() {
  return (
    <footer className="bg-gray-800 text-white text-center p-4 mt-auto">
      <p className="text-sm">
        © {new Date().getFullYear()} Vehicle Rental. All rights reserved.
      </p>
    </footer>
  );
}

export default Footer;