import { NextResponse } from "next/server";
import { env } from "@/lib/env";

/**
 * GET /api/health
 * Lightweight health check — returns runtime status of key services.
 * Does NOT reveal secrets or sensitive data.
 *
 * Uses env() helper to read values at runtime, bypassing Next.js build-time
 * env var inlining.
 */
export async function GET() {
  const NEXTAUTH_URL = env("NEXTAUTH_URL");
  const DATABASE_URL = env("DATABASE_URL");
  const NEXTAUTH_SECRET = env("NEXTAUTH_SECRET");

  const checks: Record<string, string | boolean> = {
    status: "ok",
    timestamp: new Date().toISOString(),
    node: process.version,
    nextauth_url_set: !!NEXTAUTH_URL,
    database_url_set: !!DATABASE_URL,
    nextauth_secret_set: !!NEXTAUTH_SECRET,
  };

  // Try a lightweight Prisma connection test (only if DATABASE_URL is set)
  if (DATABASE_URL) {
    try {
      const { prisma } = await import("@/lib/prisma");
      await prisma.$queryRaw`SELECT 1`;
      checks.database_connection = "ok";
    } catch (e: any) {
      checks.database_connection = "error";
      checks.database_error = e?.message?.slice(0, 200) || "unknown";
    }

    // Check if users exist in the database
    try {
      const { prisma } = await import("@/lib/prisma");
      const count = await prisma.user.count();
      checks.user_count = count;
    } catch (e: any) {
      checks.user_count = "error";
      checks.user_error = e?.message?.slice(0, 150) || "unknown";
    }
  } else {
    checks.database_connection = "skipped (no url)";
  }

  return NextResponse.json(checks);
}