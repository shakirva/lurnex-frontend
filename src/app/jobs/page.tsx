import React, { Suspense } from "react";
import FindJobs from "@/components/FindJobs";

export default function JobsPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-slate-50"><div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#1B4696]" /></div>}>
      <FindJobs />
    </Suspense>
  );
}
