"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";
import { apiService } from "@/lib/api";

const PLANS = [
  {
    id: "basic",
    name: "Basic Plan",
    duration: "3 Months",
    price: "₹399",
    highlight: false,
    badge: null,
    features: [
      "Access to full job details",
      "View salary information",
      "Company name visible",
      "Employer contact number",
      "Employer email ID",
      "Apply for jobs",
      "Basic job alerts",
    ],
  },
  {
    id: "standard",
    name: "Standard Plan",
    duration: "6 Months",
    price: "₹599",
    highlight: true,
    badge: null,
    features: [
      "All Basic Plan features",
      "Priority job alerts",
      "Early access to new job postings",
      "Resume visibility to employers",
      "Email notifications for jobs",
    ],
  },
  {
    id: "premium",
    name: "Premium Plan",
    duration: "1 Year",
    price: "₹999",
    highlight: false,
    badge: null,
    features: [
      "All Standard Plan features",
      "Unlimited job applications",
      "Direct employer contact access",
      "Priority candidate profile",
      "Free professional course access",
    ],
  },
  {
    id: "accountant",
    name: "Accountant Plan",
    duration: "1 Year",
    price: "₹3,999",
    highlight: false,
    badge: null,
    features: [
      "Full job portal access",
      "Accounting job opportunities",
      "GST Registration & Filing Training",
      "Income Tax Filing Training",
      "TDS Filing Training",
      "Practice via Government Mock Portal",
      "Professional certificate after completion",
    ],
  },
];

export default function SubscriptionPlans() {
  const { isAuthenticated, user } = useAuth();
  const [loading, setLoading] = useState<string | null>(null);

  const handleSelect = async (planId: string) => {
    if (!isAuthenticated) {
      window.location.href = "/login";
      return;
    }

    alert(`Coming Soon: The payment gateway is currently under integration. Please contact Lurnex admin to manually enable the ${PLANS.find(p => p.id === planId)?.name} for your account.`);
  };

  return (
    <div className="min-h-screen bg-white font-outfit pt-28 pb-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-4">Subscription</p>
          <h1 className="text-4xl font-bold text-slate-900">Plans for every job seeker</h1>
          <p className="text-slate-400 mt-3 max-w-lg mx-auto text-sm leading-relaxed">
            Subscribe to unlock full job details, employer contacts, and exclusive career resources.
          </p>
        </div>

        {/* Plans Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 items-stretch">
          {PLANS.map((plan) => (
            <div
              key={plan.id}
              className={`relative flex flex-col h-full rounded-xl transition-all duration-150 ${
                plan.highlight
                  ? "bg-slate-900 border border-slate-900"
                  : "bg-white border border-slate-200 hover:border-slate-300"
              }`}
            >

              <div className="p-6 flex flex-col flex-1">
                {/* Plan name */}
                <p className={`text-xs font-semibold uppercase tracking-wider mb-1 ${plan.highlight ? "text-slate-400" : "text-slate-400"}`}>
                  {plan.name}
                </p>
                <p className={`text-[10px] mb-6 ${plan.highlight ? "text-slate-500" : "text-slate-400"}`}>
                  {plan.duration}
                </p>

                {/* Price */}
                <div className="mb-6">
                  <span className={`text-3xl font-bold ${plan.highlight ? "text-white" : "text-slate-900"}`}>
                    {plan.price}
                  </span>
                </div>

                {/* Divider */}
                <div className={`border-t mb-6 ${plan.highlight ? "border-white/10" : "border-slate-100"}`} />

                {/* Features */}
                <ul className="space-y-3 flex-1 mb-8">
                  {plan.features.map((f) => (
                    <li key={f} className={`flex items-start gap-2 text-sm ${plan.highlight ? "text-slate-300" : "text-slate-500"}`}>
                      <svg
                        className={`w-3.5 h-3.5 flex-shrink-0 mt-0.5 ${plan.highlight ? "text-white" : "text-slate-400"}`}
                        viewBox="0 0 12 12" fill="none"
                      >
                        <path d="M2 6l2.5 2.5L10 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      {f}
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <button
                  onClick={() => handleSelect(plan.id)}
                  disabled={loading === plan.id}
                  className={`w-full py-2.5 rounded-lg text-sm font-semibold transition-all ${
                    loading === plan.id ? "bg-slate-300 cursor-not-allowed" :
                    plan.highlight
                      ? "bg-white text-slate-900 hover:bg-slate-100"
                      : "bg-slate-900 text-white hover:bg-slate-700"
                  }`}
                >
                  {loading === plan.id ? "Activating..." : "Get started"}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Footer note */}
        <p className="text-center text-slate-400 text-xs mt-10">
          All prices in INR. Inclusive of GST.{" "}
          <Link href="/contact" className="text-slate-600 underline underline-offset-2 hover:text-slate-900">
            Contact us
          </Link>{" "}
          for custom plans.
        </p>


      </div>
    </div>
  );
}
