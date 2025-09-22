"use client";

import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import { ChevronLeft } from "lucide-react";

export default function BackButton() {
  const router = useRouter();
  return (
    <Button
      variant="outline"
      size="icon"
      onClick={() => router.back()}
      aria-label="Go back"
      className="cursor-pointer"
    >
      <span className="sr-only">Back</span>
      <ChevronLeft className="h-4 w-4" />
    </Button>
  );
}
