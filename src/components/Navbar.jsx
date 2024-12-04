import React from "react";

const Navbar = () => {
  return (
    <div>
          <nav className="flex justify-between bg-violet-900 text-white py-3">
              <div className="logo">
                  <span className="font-bold text-xl mx-9">Todo</span>
              </div>
              <ul className="flex gap-8 mr-6">
                  <li className="cursor-pointer hover:font-bold transition-all">Home</li>
                  <li className="cursor-pointer hover:font-bold transition-all">Your Tasks</li>
              </ul>
      </nav>
    </div>
  );
};

export default Navbar;
