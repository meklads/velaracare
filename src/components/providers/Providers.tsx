"use client";

import { SessionProvider } from "next-auth/react";
import Interactions from "@/components/Interactions";
import MotionEnhancer from "@/components/MotionEnhancer";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <Interactions />
      <MotionEnhancer />
      {children}
    </SessionProvider>
  );
}
