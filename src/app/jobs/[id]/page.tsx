import JobDetail from "@/components/JobDetail";

interface PageProps {
  params: {
    id: string;
  };
}

export default function JobDetailPage({ params }: PageProps) {
  return <JobDetail jobId={params.id} />;
}
