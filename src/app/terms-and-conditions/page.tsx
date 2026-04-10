import React from 'react';

export const metadata = {
  title: "Terms and Conditions | Triagull Jobs",
  description: "Read the terms and conditions for using the Triagull Jobs platform.",
};

const TermsAndConditions = () => {
  const effectiveDate = "April 10, 2026";

  return (
    <div className="min-h-screen bg-slate-50 font-jost">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-[#1B4696] to-[#2FBDB9] overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-1/2 left-0 w-80 h-80 bg-white rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl"></div>
          <div className="absolute top-1/2 right-0 w-80 h-80 bg-white rounded-full translate-x-1/2 -translate-y-1/2 blur-3xl"></div>
        </div>
        
        <div className="max-w-4xl mx-auto px-6 relative z-10 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">Terms and Conditions</h1>
          <p className="text-white/80 text-lg">
            Effective Date: {effectiveDate}
          </p>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/60 p-8 md:p-12 space-y-10 text-slate-700 leading-relaxed">
            
            {/* 1. Introduction */}
            <div>
              <h2 className="text-2xl font-bold text-[#1B4696] mb-4 flex items-center">
                <span className="w-8 h-8 rounded-lg bg-[#1B4696]/10 text-[#1B4696] flex items-center justify-center mr-3 text-sm">1</span>
                Introduction
              </h2>
              <p>
                Welcome to TriaGullJobs.in (“Company”, “we”, “our”, “us”). These Terms govern your use of our platform. By accessing or using our services, you agree to be bound by these terms.
              </p>
            </div>

            {/* Grid Layout for concise points */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* 2. Nature of Services */}
              <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100">
                <h3 className="text-lg font-bold text-slate-800 mb-2">2. Nature of Services</h3>
                <p className="text-sm">We provide job listings, recruitment, training, and subscription-based services as an intermediary between job seekers and employers.</p>
              </div>

              {/* 3. Eligibility */}
              <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100">
                <h3 className="text-lg font-bold text-slate-800 mb-2">3. Eligibility</h3>
                <p className="text-sm">Users must be at least 18 years of age and provide accurate, current, and complete information during the registration process.</p>
              </div>
            </div>

            {/* 4. User Accounts & 5. User Conduct */}
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-bold text-slate-800 mb-3">4. User Accounts</h2>
                <p className="text-slate-600">Users are responsible for maintaining the confidentiality of their login credentials. Any unauthorized use of your account must be reported to us immediately.</p>
              </div>
              <div>
                <h2 className="text-xl font-bold text-slate-800 mb-3">5. User Conduct</h2>
                <p className="text-slate-600 font-medium mb-2">Users must NOT:</p>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {["Post false or misleading information", "Misuse data or platform resources", "Engage in illegal activity", "Harass other users"].map((node, i) => (
                    <li key={i} className="flex items-center space-x-2 text-sm">
                      <div className="w-1.5 h-1.5 rounded-full bg-red-400 shrink-0"></div>
                      <span>{node}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Important Disclaimers */}
            <div className="py-8 border-y border-slate-100">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h2 className="text-lg font-bold text-[#1B4696] mb-3">6. Job Disclaimer</h2>
                  <p className="text-sm">We do not guarantee job placement or the authenticity of employers. Users are advised to perform their own due diligence before accepting any offers.</p>
                </div>
                <div>
                  <h2 className="text-lg font-bold text-[#1B4696] mb-3">7. Employer Responsibility</h2>
                  <p className="text-sm">Employers are solely responsible for providing genuine job openings and ensuring compliance with all applicable labor laws.</p>
                </div>
              </div>
            </div>

            {/* 8. Payments & 9. Training */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h2 className="text-xl font-bold text-slate-800 mb-3">8. Payments</h2>
                <p className="text-sm">Fees are non-refundable unless explicitly stated otherwise. Subscription plans are time-bound and will expire as per the selected package.</p>
              </div>
              <div>
                <h2 className="text-xl font-bold text-slate-800 mb-3">9. Training</h2>
                <p className="text-sm">Completion of any training or course provided through our platform does not guarantee job placement or employment.</p>
              </div>
            </div>

            {/* Comprehensive Section */}
            <div className="space-y-8 bg-slate-50/50 p-8 rounded-3xl border border-slate-100">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6 text-sm">
                <div>
                  <h3 className="font-bold text-slate-800 mb-1">10. Intellectual Property</h3>
                  <p>All content, logos, and software are the property of Triagull Jobs and protected by copyright laws.</p>
                </div>
                <div>
                  <h3 className="font-bold text-slate-800 mb-1">11. Privacy</h3>
                  <p>Data is handled as per our Privacy Policy and may be shared with employers for recruitment purposes.</p>
                </div>
                <div>
                  <h3 className="font-bold text-slate-800 mb-1">12. Third-Party Links</h3>
                  <p>We are not responsible for the content or privacy practices of external websites linked from our platform.</p>
                </div>
                <div>
                  <h3 className="font-bold text-slate-800 mb-1">13. Liability</h3>
                  <p>We are not liable for any indirect damages, loss of data, or loss of job opportunities.</p>
                </div>
              </div>
            </div>

            {/* Final Legal Sections */}
            <div className="space-y-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 bg-[#1B4696]/5 rounded-2xl border border-[#1B4696]/10">
                <div>
                  <h3 className="font-bold text-[#1B4696]">18. Governing Law</h3>
                  <p className="text-sm">Jurisdiction: Thrissur, Kerala, India.</p>
                </div>
                <div className="h-px md:w-px md:h-12 bg-[#1B4696]/20"></div>
                <div>
                  <h3 className="font-bold text-[#1B4696]">15. Termination</h3>
                  <p className="text-sm">Accounts may be suspended for violations of these terms.</p>
                </div>
              </div>

              <div className="bg-slate-900 text-white p-8 rounded-3xl">
                <h3 className="text-xl font-bold mb-6">19. Contact Us</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center">
                      <svg className="w-6 h-6 text-[#2FBDB9]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                    <div>
                      <div className="text-white/50 text-xs">Phone Support</div>
                      <div className="font-bold">9207736386</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center">
                      <svg className="w-6 h-6 text-[#2FBDB9]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <div className="text-white/50 text-xs">Email Queries</div>
                      <div className="font-bold">info@triagulljobs.in</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="text-center">
              <p className="text-slate-400 text-sm italic">
                By using our platform, you acknowledge that you have read and agree to these Terms and Conditions.
              </p>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
};

export default TermsAndConditions;
