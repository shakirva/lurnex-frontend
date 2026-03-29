import { Suspense } from 'react';
import ResetPassword from "@/components/ResetPassword";

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-[#1B4696] border-t-transparent rounded-full animate-spin"></div>
      </div>
    }>
      <ResetPassword />
    </Suspense>
  );
}
