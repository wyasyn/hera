"use client";

import { Badge } from "@/components/ui/badge";
import Image from "next/image";

export default function ServiceCard() {
  return (
    <div className="h-[400px] w-[300px] bg-card p-2 rounded-lg">
      <div className="relative h-full w-full">
        <Image
          src="https://images.pexels.com/photos/33769490/pexels-photo-33769490.jpeg"
          alt="sample"
          fill
          className="object-cover rounded-lg inset-0 z-0"
        />
        <div className="absolute bottom-0 left-0 right-0 backdrop-blur-sm rounded-b-lg z-10 p-4 flex flex-col justify-end ">
          <h2 className="text-lg">Service Name</h2>
          <p className="text-sm my-1">
            This is a brief description of the service offered. It provides key
          </p>
          <div>
            <Badge variant="outline">React Native</Badge>
          </div>
        </div>
      </div>
    </div>
  );
}
