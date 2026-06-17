"use client";
import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Page() {
  const router = useRouter();
  const { workspaceId } = useParams();
  useEffect(function () {
    if (!workspaceId) router.push(`/onboard`);
    router.push(`/user/${workspaceId}/dashboard`);
  }, []);

  return <div>page</div>;
}
