"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export default function ChromeGate({ children }: Props) {
  const pathname = usePathname();
  if (pathname?.startsWith("/print")) return null;
  return <>{children}</>;
}
