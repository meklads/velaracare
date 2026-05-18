"use client";

import { SessionProvider } from "next-auth/react";
import Interactions from "@/components/Interactions";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <Interactions />
      {children}
    </SessionProvider>
  );
}
