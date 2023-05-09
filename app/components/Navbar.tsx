import 'tailwindcss/tailwind.css';
import React, { useState } from "react";

function Navbar() {
  return (
    <div className="Navbar font-sans text-center bg-white shadow-md">
      <ul className="flex justify-center items-center h-16">
        {["Home", "Ejemplos", "Consejos"].map((menuItem, index) => (
          <li className="list-none mx-2 my-1 relative group" key={index}>
            <a
              href="#"
              className="py-2 px-6 text-black no-underline text-xl relative group-hover:text-gray-500 transition-all duration-350 ease-in-out"
            >
              {menuItem}
              <span
                className="absolute top-0 right-0 h-0 w-0 border-t border-r border-black opacity-0 group-hover:opacity-100 group-hover:h-[14px] group-hover:w-[14px] transition-all duration-350 ease-in-out transform -translate-x-full -translate-y-1/2"
              ></span>
              <span
                className="absolute bottom-0 left-0 h-0 w-0 border-b border-l border-black opacity-0 group-hover:opacity-100 group-hover:h-[14px] group-hover:w-[14px] transition-all duration-350 ease-in-out transform translate-x-full translate-y-1/2"
              ></span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Navbar;
