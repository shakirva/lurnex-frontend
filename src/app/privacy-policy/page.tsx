import React from 'react';

export const metadata = {
  title: "Privacy Policy | Triagull Jobs",
  description: "Learn how Triagull Jobs collects, uses, and protects your personal information.",
};

const PrivacyPolicy = () => {
  const effectiveDate = "April 10, 2026"; // Current Date

  return (
    <div className="min-h-screen bg-slate-50 font-jost">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-[#1B4696] to-[#2FBDB9] overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-64 h-64 bg-white rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full translate-x-1/3 translate-y-1/3 blur-3xl"></div>
        </div>
        
        <div className="max-w-4xl mx-auto px-6 relative z-10 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">Privacy Policy</h1>
          <p className="text-white/80 text-lg">
            Effective Date: {effectiveDate}
          </p>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/60 p-8 md:p-12 space-y-12 text-slate-700 leading-relaxed">
            
            {/* 1. Introduction */}
            <div>
              <h2 className="text-2xl font-bold text-[#1B4696] mb-4 flex items-center">
                <span className="w-8 h-8 rounded-lg bg-[#1B4696]/10 text-[#1B4696] flex items-center justify-center mr-3 text-sm">1</span>
                Introduction
              </h2>
              <p>
                Welcome to Triagull Jobs. We are committed to protecting your privacy and ensuring that your personal information is handled in a safe and responsible manner. This Privacy Policy outlines how we collect, use, disclose, and safeguard your information when you visit our website (www.triagulljobs.in) and use our services.
              </p>
              <p className="mt-4">
                By accessing or using our website, you agree to the terms of this Privacy Policy.
              </p>
            </div>

            {/* 2. Definitions */}
            <div>
              <h2 className="text-2xl font-bold text-[#1B4696] mb-4 flex items-center">
                <span className="w-8 h-8 rounded-lg bg-[#1B4696]/10 text-[#1B4696] flex items-center justify-center mr-3 text-sm">2</span>
                Definitions
              </h2>
              <ul className="space-y-3 list-disc pl-5 marker:text-[#2FBDB9]">
                <li><strong>“Company” / “We” / “Us” / “Our”</strong> refers to Triagull Jobs.</li>
                <li><strong>“User” / “You”</strong> refers to job seekers, employers, or visitors using our website.</li>
                <li><strong>“Services”</strong> refers to job listings, recruitment support, training, and related services offered through our platform.</li>
              </ul>
            </div>

            {/* 3. Information We Collect */}
            <div>
              <h2 className="text-2xl font-bold text-[#1B4696] mb-4 flex items-center">
                <span className="w-8 h-8 rounded-lg bg-[#1B4696]/10 text-[#1B4696] flex items-center justify-center mr-3 text-sm">3</span>
                Information We Collect
              </h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-slate-800 mb-2">3.1 Personal Information</h3>
                  <p className="mb-3">We may collect personally identifiable information, including but not limited to:</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {["Full Name", "Email Address", "Phone Number", "Address", "Resume / CV", "Educational qualifications", "Work experience and skills", "ID proof (if required)"].map((item, i) => (
                      <div key={i} className="flex items-center space-x-2">
                        <svg className="w-4 h-4 text-[#2FBDB9]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-slate-800 mb-2">3.2 Employer Information</h3>
                  <p>For employers and recruiters: Company name, contact details, job requirements, and business information.</p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-slate-800 mb-2">3.3 Non-Personal Information</h3>
                  <p>We may automatically collect: IP address, browser type and version, device type, operating system, pages visited, time spent, and referral sources.</p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-slate-800 mb-2">3.4 Cookies and Tracking Technologies</h3>
                  <p>We use cookies, web beacons, and similar tracking technologies to enhance user experience, analyze website traffic, and personalize content.</p>
                </div>
              </div>
            </div>

            {/* 4. How We Use Your Information */}
            <div>
              <h2 className="text-2xl font-bold text-[#1B4696] mb-4 flex items-center">
                <span className="w-8 h-8 rounded-lg bg-[#1B4696]/10 text-[#1B4696] flex items-center justify-center mr-3 text-sm">4</span>
                How We Use Your Information
              </h2>
              <p className="mb-4">We use collected data for the following purposes:</p>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  "To create and manage user accounts",
                  "To connect job seekers with employers",
                  "To process job applications",
                  "To provide recruitment and training services",
                  "To improve website functionality",
                  "To send notifications and updates",
                  "To respond to customer requests",
                  "To ensure legal compliance"
                ].map((item, i) => (
                  <li key={i} className="bg-slate-50 p-3 rounded-xl border border-slate-100 flex items-start space-x-3">
                    <span className="mt-1 w-1.5 h-1.5 rounded-full bg-[#1B4696] shrink-0"></span>
                    <span className="text-sm font-medium">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* 5. Legal Basis */}
            <div>
              <h2 className="text-2xl font-bold text-[#1B4696] mb-4 flex items-center">
                <span className="w-8 h-8 rounded-lg bg-[#1B4696]/10 text-[#1B4696] flex items-center justify-center mr-3 text-sm">5</span>
                Legal Basis for Processing
              </h2>
              <p>We process your data based on: Your consent, performance of a contract, legal obligations, and legitimate business interests.</p>
            </div>

            {/* 6. Data Sharing */}
            <div>
              <h2 className="text-2xl font-bold text-[#1B4696] mb-4 flex items-center">
                <span className="w-8 h-8 rounded-lg bg-[#1B4696]/10 text-[#1B4696] flex items-center justify-center mr-3 text-sm">6</span>
                Data Sharing and Disclosure
              </h2>
              <p className="mb-4">We do not sell your personal data. However, we may share your information with:</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-5 border border-slate-100 rounded-2xl bg-white shadow-sm">
                  <h3 className="font-bold text-slate-800 mb-2">Employers</h3>
                  <p className="text-sm">Your profile, resume, and contact details may be shared with potential employers for job opportunities.</p>
                </div>
                <div className="p-5 border border-slate-100 rounded-2xl bg-white shadow-sm">
                  <h3 className="font-bold text-slate-800 mb-2">Service Providers</h3>
                  <p className="text-sm">Third-party vendors who help us operate our website, such as hosting providers and analytics services.</p>
                </div>
              </div>
            </div>

            {/* 7. Data Retention */}
            <div>
              <h2 className="text-2xl font-bold text-[#1B4696] mb-4 flex items-center">
                <span className="w-8 h-8 rounded-lg bg-[#1B4696]/10 text-[#1B4696] flex items-center justify-center mr-3 text-sm">7</span>
                Data Retention
              </h2>
              <p>
                We retain your personal data only for as long as necessary to provide our services, comply with legal obligations, resolve disputes, and enforce agreements. You may request deletion of your data at any time.
              </p>
            </div>

            {/* 8. Data Security */}
            <div>
              <h2 className="text-2xl font-bold text-[#1B4696] mb-4 flex items-center">
                <span className="w-8 h-8 rounded-lg bg-[#1B4696]/10 text-[#1B4696] flex items-center justify-center mr-3 text-sm">8</span>
                Data Security
              </h2>
              <div className="bg-amber-50 border-l-4 border-amber-400 p-4 rounded-r-xl">
                <p className="text-sm text-amber-800 leading-relaxed">
                  We implement appropriate technical and organizational security measures to protect your personal information. Despite our efforts, no system is completely secure. Users are advised to take precautions when sharing sensitive information online.
                </p>
              </div>
            </div>

            {/* 9. Your Rights */}
            <div>
              <h2 className="text-2xl font-bold text-[#1B4696] mb-4 flex items-center">
                <span className="w-8 h-8 rounded-lg bg-[#1B4696]/10 text-[#1B4696] flex items-center justify-center mr-3 text-sm">9</span>
                Your Rights
              </h2>
              <p className="mb-4">Depending on applicable laws, you may have the right to:</p>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {[
                  "Access your data", "Rectify information", "Erase your data", 
                  "Restrict processing", "Data portability", "Withdraw consent"
                ].map((right, i) => (
                  <div key={i} className="bg-slate-50 px-4 py-2 rounded-lg text-sm text-center font-medium border border-slate-100">
                    {right}
                  </div>
                ))}
              </div>
            </div>

            {/* 14. Contact Information */}
            <div className="pt-8 border-t border-slate-100">
              <h2 className="text-2xl font-bold text-[#1B4696] mb-6 flex items-center">
                <span className="w-8 h-8 rounded-lg bg-[#1B4696]/10 text-[#1B4696] flex items-center justify-center mr-3 text-sm">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </span>
                Contact Us
              </h2>
              <div className="bg-[#1B4696] text-white p-8 rounded-3xl">
                <h3 className="text-xl font-bold mb-4">Triagull Jobs</h3>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <svg className="w-5 h-5 text-[#2FBDB9] mt-1 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span>1st Floor, Pallipuram Building, Power House Jn, Viyyur, Thrissur – 680010</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <svg className="w-5 h-5 text-[#2FBDB9] shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    <span>9207736386</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <svg className="w-5 h-5 text-[#2FBDB9] shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <span>info@triagulljobs.in</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="text-center text-slate-400 text-sm mt-8">
              By using our website and services, you consent to the terms outlined in this Privacy Policy.
            </div>

          </div>
        </div>
      </section>
    </div>
  );
};

export default PrivacyPolicy;
