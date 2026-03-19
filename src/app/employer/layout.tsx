import React from "react";

export default function EmployerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="employer-dashboard-root">{children}</div>;
}
