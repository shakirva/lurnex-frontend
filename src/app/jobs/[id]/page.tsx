import JobDetail from "@/components/JobDetail";

interface PageProps {
  params: {
    id: string;
  };
}

export default async function JobDetailPage({ params }: PageProps) {
  const { id } = await params;
  return <JobDetail jobId={id} />;
}

