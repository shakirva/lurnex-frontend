"use client";

import Image from "next/image";
import { useState } from "react";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-[#F1F4FB] fixed top-0 left-0 right-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="flex justify-between items-center py-4">
          {/* Logo */}
          <div className="flex items-center">
            <Image
              src="/logo.png"
              alt="Lurnex Logo"
              width={180}
              height={55}
              priority
              className="h-16 w-auto"
            />
          </div>

          {/* Desktop Navigation */}
          <ul className="hidden md:flex space-x-8">
            <li><a href="/" className="text-slate-600 hover:bg-gradient-to-tr hover:from-[#1B4696] hover:to-[#2FBDB9] hover:bg-clip-text hover:text-transparent font-medium transition-colors">Home</a></li>
            <li><a href="/jobs" className="text-slate-600 hover:bg-gradient-to-tr hover:from-[#1B4696] hover:to-[#2FBDB9] hover:bg-clip-text hover:text-transparent font-medium transition-colors">Find Jobs</a></li>
            <li><a href="/services" className="text-slate-600 hover:bg-gradient-to-tr hover:from-[#1B4696] hover:to-[#2FBDB9] hover:bg-clip-text hover:text-transparent font-medium transition-colors">Services</a></li>
            <li><a href="/contact" className="text-slate-600 hover:bg-gradient-to-tr hover:from-[#1B4696] hover:to-[#2FBDB9] hover:bg-clip-text hover:text-transparent font-medium transition-colors">Contact</a></li>
          </ul>

          {/* Desktop Buttons */}
          {/* <div className="hidden md:flex items-center space-x-4">
            <a href="#signin" className="px-6 py-2 rounded-md border-2 text-[#1B4696] font-medium hover:bg-gradient-to-tr hover:from-[#1B4696] hover:to-[#2FBDB9] hover:text-white transition-all">
              Sign In
            </a>
            <a href="#postjob" className="px-6 py-2 bg-gradient-to-tr from-[#1B4696] to-[#2FBDB9] text-white rounded-md font-medium hover:opacity-90 transition-all">
              Post A Job
            </a>
          </div> */}

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="md:hidden p-2 rounded-md text-slate-600 hover:text-[#1B4696] hover:bg-slate-100 transition-colors"
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </nav>

        {/* Mobile Menu */}
        <div className={`md:hidden transition-all duration-300 ease-in-out ${isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>
          <div className="px-2 pt-2 pb-3 space-y-1 bg-white rounded-lg shadow-lg border border-slate-200 mb-4">
            {/* Mobile Navigation Links */}
            <a href="/" className="block px-3 py-2 text-slate-600 hover:bg-gradient-to-tr hover:from-[#1B4696] hover:to-[#2FBDB9] hover:bg-clip-text hover:text-transparent font-medium transition-colors rounded-md">
              Home
            </a>
            <a href="/jobs" className="block px-3 py-2 text-slate-600 hover:bg-gradient-to-tr hover:from-[#1B4696] hover:to-[#2FBDB9] hover:bg-clip-text hover:text-transparent font-medium transition-colors rounded-md">
              Find Jobs
            </a>
            <a href="/services" className="block px-3 py-2 text-slate-600 hover:bg-gradient-to-tr hover:from-[#1B4696] hover:to-[#2FBDB9] hover:bg-clip-text hover:text-transparent font-medium transition-colors rounded-md">
              Services
            </a>
            <a href="/contact" className="block px-3 py-2 text-slate-600 hover:bg-gradient-to-tr hover:from-[#1B4696] hover:to-[#2FBDB9] hover:bg-clip-text hover:text-transparent font-medium transition-colors rounded-md">
              Contact
            </a>
            
            {/* Mobile Buttons */}
            {/* <div className="pt-4 border-t border-slate-200 space-y-2">
              <a href="#signin" className="block w-full text-center px-4 py-2 rounded-md border-2 text-[#1B4696] font-medium hover:bg-gradient-to-tr hover:from-[#1B4696] hover:to-[#2FBDB9] hover:text-white transition-all">
                Sign In
              </a>
              <a href="#postjob" className="block w-full text-center px-4 py-2 bg-gradient-to-tr from-[#1B4696] to-[#2FBDB9] text-white rounded-md font-medium hover:opacity-90 transition-all">
                Post A Job
              </a>
            </div> */}
          </div>
        </div>
      </div>
    </header>
  );
}
