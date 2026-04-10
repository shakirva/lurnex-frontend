import React from 'react';

export const metadata = {
  title: "Refund Policy | Triagull Jobs",
  description: "Read about the refund and cancellation policies of Triagull Jobs.",
};

const RefundPolicy = () => {
  const lastUpdated = "April 10, 2026";

  return (
    <div className="min-h-screen bg-slate-50 font-jost">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-[#1B4696] to-[#2FBDB9] overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full translate-x-1/2 -translate-y-1/2 blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-white rounded-full -translate-x-1/3 translate-y-1/3 blur-3xl"></div>
        </div>
        
        <div className="max-w-4xl mx-auto px-6 relative z-10 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">Refund Policy</h1>
          <p className="text-white/80 text-lg">
            Last Updated: {lastUpdated}
          </p>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/60 p-8 md:p-12 space-y-12 text-slate-700 leading-relaxed">
            
            {/* Introduction */}
            <div>
              <p className="text-lg">
                At <strong>TriagullJobs.in</strong>, we strive to provide quality recruitment and job-related services. This Refund Policy outlines the terms under which payments made on our platform may or may not be refunded.
              </p>
            </div>

            {/* 1. General Policy */}
            <div>
              <h2 className="text-2xl font-bold text-[#1B4696] mb-4 flex items-center">
                <span className="w-8 h-8 rounded-lg bg-[#1B4696]/10 text-[#1B4696] flex items-center justify-center mr-3 text-sm">1</span>
                General Policy
              </h2>
              <p>
                All payments made to TriagullJobs.in for services such as job listings, subscriptions, training programs, or consultancy are non-refundable, unless otherwise stated. Refunds are considered only under specific conditions mentioned below.
              </p>
            </div>

            {/* 2. Eligibility for Refund */}
            <div>
              <h2 className="text-2xl font-bold text-[#1B4696] mb-4 flex items-center">
                <span className="w-8 h-8 rounded-lg bg-[#1B4696]/10 text-[#1B4696] flex items-center justify-center mr-3 text-sm">2</span>
                Eligibility for Refund
              </h2>
              <p className="mb-4">You may be eligible for a refund only if:</p>
              <ul className="space-y-4">
                {[
                  "Payment was made by mistake or duplicate transaction",
                  "Service was not delivered as promised",
                  "Technical error resulted in failed service activation",
                  "Cancellation request is made within 24 hours of payment (if service not yet started)"
                ].map((item, i) => (
                  <li key={i} className="flex items-start space-x-3 bg-green-50/50 p-4 rounded-2xl border border-green-100">
                    <svg className="w-5 h-5 text-green-500 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="font-medium text-slate-800">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* 3. Non-Refundable Cases */}
            <div>
              <h2 className="text-2xl font-bold text-[#1B4696] mb-4 flex items-center">
                <span className="w-8 h-8 rounded-lg bg-[#1B4696]/10 text-[#1B4696] flex items-center justify-center mr-3 text-sm">3</span>
                Non-Refundable Cases
              </h2>
              <p className="mb-4">Refunds will <strong>NOT</strong> be provided in the following situations:</p>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  "After successful activation of subscription or service",
                  "If job opportunities were provided but not selected by employer",
                  "Change of mind after purchase",
                  "Failure to attend training or course",
                  "Providing incorrect personal details"
                ].map((item, i) => (
                  <li key={i} className="flex items-start space-x-3 bg-red-50/50 p-4 rounded-2xl border border-red-100">
                    <svg className="w-5 h-5 text-red-500 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    <span className="text-sm font-medium text-slate-800">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* 4. Cancellation Policy */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h2 className="text-2xl font-bold text-[#1B4696] mb-4 flex items-center">
                  <span className="w-8 h-8 rounded-lg bg-[#1B4696]/10 text-[#1B4696] flex items-center justify-center mr-3 text-sm">4</span>
                  Cancellation
                </h2>
                <p>Users can request cancellation within 24 hours of payment. Once service is initiated, cancellation is not allowed.</p>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-[#1B4696] mb-4 flex items-center">
                  <span className="w-8 h-8 rounded-lg bg-[#1B4696]/10 text-[#1B4696] flex items-center justify-center mr-3 text-sm">6</span>
                  Refund Timeline
                </h2>
                <p>Approved refunds will be processed within <strong>7–10 working days</strong> and credited to the original payment method.</p>
              </div>
            </div>

            {/* 5. Refund Process */}
            <div>
              <h2 className="text-2xl font-bold text-[#1B4696] mb-4 flex items-center">
                <span className="w-8 h-8 rounded-lg bg-[#1B4696]/10 text-[#1B4696] flex items-center justify-center mr-3 text-sm">5</span>
                Refund Process
              </h2>
              <div className="bg-slate-50 border border-slate-100 p-6 rounded-3xl">
                <p className="mb-4">To request a refund, please contact us with your payment proof and transaction ID:</p>
                <div className="flex flex-col md:flex-row gap-4">
                  <a href="mailto:info@triagulljobs.in" className="flex items-center space-x-3 bg-white p-4 rounded-2xl shadow-sm border border-slate-100 flex-1 hover:border-[#2FBDB9] transition-colors">
                    <div className="w-10 h-10 rounded-full bg-[#2FBDB9]/10 flex items-center justify-center text-[#2FBDB9]">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <div className="text-xs text-slate-500">Email us</div>
                      <div className="font-bold text-[#1B4696]">info@triagulljobs.in</div>
                    </div>
                  </a>
                  <a href="tel:9207736386" className="flex items-center space-x-3 bg-white p-4 rounded-2xl shadow-sm border border-slate-100 flex-1 hover:border-[#1B4696] transition-colors">
                    <div className="w-10 h-10 rounded-full bg-[#1B4696]/10 flex items-center justify-center text-[#1B4696]">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                    <div>
                      <div className="text-xs text-slate-500">Call us</div>
                      <div className="font-bold text-[#1B4696]">9207736386</div>
                    </div>
                  </a>
                </div>
              </div>
            </div>

            {/* 7. Service Disclaimer */}
            <div className="bg-blue-50/50 p-8 rounded-3xl border border-blue-100">
              <h2 className="text-xl font-bold text-[#1B4696] mb-3">Service Disclaimer</h2>
              <p className="text-sm leading-relaxed">
                TriagullJobs.in acts as a job facilitation platform. We do not guarantee job placement. Payments are for services like profile visibility, training, or consultancy.
              </p>
            </div>

            {/* Changes to Policy */}
            <div className="text-center text-slate-400 text-sm">
              TriagullJobs.in reserves the right to modify this Refund Policy at any time without prior notice.
            </div>

          </div>
        </div>
      </section>
    </div>
  );
};

export default RefundPolicy;
