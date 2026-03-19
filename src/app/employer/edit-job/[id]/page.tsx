"use client";

import PostJob from "@/components/PostJob";
import { useParams } from "next/navigation";

export default function EditJobPage() {
  const params = useParams();
  const jobId = params?.id ? Number(params.id) : undefined;
  return <PostJob jobId={jobId} />;
}
