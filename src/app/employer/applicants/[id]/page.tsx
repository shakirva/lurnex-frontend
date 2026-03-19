"use client";

import EmployerApplicants from "@/components/EmployerApplicants";
import { useParams } from "next/navigation";

export default function ApplicantsPage() {
  const params = useParams();
  const jobId = params?.id ? Number(params.id) : 0;
  return <EmployerApplicants jobId={jobId} />;
}
