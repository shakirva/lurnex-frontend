import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-br from-[#1B4696] to-[#2FBDB9] pt-8 pb-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-6">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <Image src="/logo.png" alt="TriaGull Logo" width={48} height={48} className="rounded-xl" />
              {/* <div>
                <h3 className="text-xl font-bold bg-gradient-to-tr from-[#1B4696] to-[#2FBDB9] bg-clip-text text-transparent">TriaGull</h3>
                <p className="text-xs text-slate-500">Find your dream job</p>
              </div> */}
            </div>
            <div className="space-y-3 text-white/90">
              <div className="flex items-center space-x-2">
                <div className="w-5 h-5 bg-white/20 rounded-full flex items-center justify-center">
                  <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <a href="tel:9207736386" className="text-sm font-medium text-white hover:text-white/80 transition-colors">Call us: <span className="font-semibold">9207736386</span></a>
              </div>
              <div className="flex items-start space-x-2">
                <div className="w-5 h-5 bg-white/20 rounded-full flex items-center justify-center mt-0.5">
                  <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div className="text-sm text-white">
                  <div>1st floor pallipuram building power house</div>
                  <div>jn viyyur thrissur 680010</div>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-5 h-5 bg-white/20 rounded-full flex items-center justify-center">
                  <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <span className="text-white text-sm font-medium">info@triagulljobs.in</span>
              </div>
            </div>
          </div>

          {/* Navigation Menu */}
          <div className="flex flex-col justify-center">
            <h3 className="font-bold text-white mb-4 text-base flex items-center">
              Navigation
            </h3>
            <ul className="grid grid-cols-2 gap-3 text-white/90">
              <li><a href="#home" className="flex items-center space-x-2 hover:text-white transition-all duration-300 text-sm font-medium py-1">

                <span>Home</span>
              </a></li>
              <li><a href="#jobs" className="flex items-center space-x-2 hover:text-white transition-all duration-300 text-sm font-medium py-1">

                <span>Find Jobs</span>
              </a></li>
              <li><a href="#services" className="flex items-center space-x-2 hover:text-white transition-all duration-300 text-sm font-medium py-1">

                <span>Services</span>
              </a></li>
              <li><a href="#contact" className="flex items-center space-x-2 hover:text-white transition-all duration-300 text-sm font-medium py-1">

                <span>Contact</span>
              </a></li>
              <li><a href="/privacy-policy" className="flex items-center space-x-2 hover:text-white transition-all duration-300 text-sm font-medium py-1">
                <span>Privacy Policy</span>
              </a></li>
              <li><a href="/refund-policy" className="flex items-center space-x-2 hover:text-white transition-all duration-300 text-sm font-medium py-1">
                <span>Refund Policy</span>
              </a></li>
              <li><a href="/terms-and-conditions" className="flex items-center space-x-2 hover:text-white transition-all duration-300 text-sm font-medium py-1">
                <span>Terms & Conditions</span>
              </a></li>
            </ul>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="border-t border-white/20 pt-6 flex flex-col md:flex-row justify-center items-center">
          <div className="text-white/80 text-sm mb-4 md:mb-0 flex items-center">
            <span>© 2025 Triagull Jobs. All Right Reserved.</span>
            <div className="hidden md:block w-1 h-1 bg-white/40 rounded-full mx-3"></div>
            <a href="https://www.sygmetiv.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-white/80 transition-colors text-sm">
              Powered by Sygmetiv
            </a>
          </div>


        </div>
      </div>
    </footer>
  );
}
