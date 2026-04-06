"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isAuthenticated, user, logout } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    await logout();
    router.push("/");
  };

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "Find Jobs", href: "/jobs" },
    { label: "Pricing", href: "/subscription" },
    { label: "Services", href: "/services" },
    { label: "Employer Panel", href: "/employer/dashboard" },
    { label: "Contact", href: "/contact" },
  ];

  return (
    <header className="bg-[#F1F4FB] fixed top-0 left-0 right-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link href="/" onClick={() => setIsMenuOpen(false)} className="flex items-center">
            <Image
              src="/logo.png"
              alt="TriaGull Logo"
              width={180}
              height={55}
              priority
              className="h-16 w-auto"
            />
          </Link>

          {/* Desktop Navigation */}
          <ul className="hidden md:flex space-x-8">
            {navLinks.map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  className={link.label === "Employer Panel" 
                    ? "px-4 py-2 text-sm font-semibold text-[#1B4696] bg-[#1B4696]/5 border border-[#1B4696]/20 rounded-xl hover:bg-[#1B4696] hover:text-white transition-all shadow-sm"
                    : "text-slate-600 hover:text-[#1B4696] font-medium transition-colors text-sm"
                  }
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center space-x-3">
            {isAuthenticated && user ? (
              <div className="flex items-center space-x-3">
                {user.role === 'employer' && (
                  <Link
                    href="/employer/dashboard"
                    className="px-4 py-2 text-sm font-medium text-[#1B4696] border border-[#1B4696] rounded-xl hover:bg-[#1B4696] hover:text-white transition-all"
                  >
                    Dashboard
                  </Link>
                )}
                {user.role === 'admin' && (
                  <Link
                    href="/admin"
                    className="px-4 py-2 text-sm font-medium text-[#1B4696] border border-[#1B4696] rounded-xl hover:bg-[#1B4696] hover:text-white transition-all"
                  >
                    Admin Panel
                  </Link>
                )}
                <Link
                  href="/profile"
                  className="flex items-center space-x-2 px-4 py-2 bg-[#1B4696]/10 rounded-xl hover:bg-[#1B4696]/20 transition-all"
                >
                  <div className="w-7 h-7 bg-gradient-to-br from-[#1B4696] to-[#2FBDB9] rounded-full flex items-center justify-center text-white text-xs font-bold">
                    {user.first_name?.[0]}{user.last_name?.[0]}
                  </div>
                  <span className="text-sm font-semibold text-[#1B4696]">{user.first_name}</span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 text-sm font-medium text-slate-500 hover:text-red-500 transition-colors"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <Link
                  href="/login"
                  className="px-5 py-2.5 text-sm font-semibold text-[#1B4696] border-2 border-[#1B4696] rounded-xl hover:bg-[#1B4696] hover:text-white transition-all"
                >
                  Sign In
                </Link>
                <Link
                  href="/register"
                  className="px-5 py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-[#1B4696] to-[#2FBDB9] rounded-xl hover:opacity-90 transition-all shadow-md"
                >
                  Register
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
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
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setIsMenuOpen(false)}
                className="block px-3 py-2 text-slate-600 hover:text-[#1B4696] font-medium transition-colors rounded-md"
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-4 border-t border-slate-200 space-y-2">
              {isAuthenticated && user ? (
                <>
                  {user.role === 'employer' && (
                    <Link href="/employer/dashboard" onClick={() => setIsMenuOpen(false)} className="block w-full text-center px-4 py-2 border-2 border-[#1B4696] text-[#1B4696] rounded-xl font-semibold mb-2">
                      Employer Dashboard
                    </Link>
                  )}
                  {user.role === 'admin' && (
                    <Link href="/admin" onClick={() => setIsMenuOpen(false)} className="block w-full text-center px-4 py-2 border-2 border-[#1B4696] text-[#1B4696] rounded-xl font-semibold mb-2">
                      Admin Panel
                    </Link>
                  )}
                  <Link href="/profile" onClick={() => setIsMenuOpen(false)} className="block w-full text-center px-4 py-2 bg-[#1B4696]/10 text-[#1B4696] rounded-xl font-semibold">
                    My Profile ({user.first_name})
                  </Link>
                  <button onClick={() => { handleLogout(); setIsMenuOpen(false); }} className="block w-full text-center px-4 py-2 text-red-500 rounded-xl font-semibold border border-red-200">
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link href="/login" onClick={() => setIsMenuOpen(false)} className="block w-full text-center px-4 py-2 border-2 border-[#1B4696] text-[#1B4696] rounded-xl font-semibold">Sign In</Link>
                  <Link href="/register" onClick={() => setIsMenuOpen(false)} className="block w-full text-center px-4 py-2 bg-gradient-to-r from-[#1B4696] to-[#2FBDB9] text-white rounded-xl font-semibold">Register</Link>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

