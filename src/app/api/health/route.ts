import { NextResponse } from "next/server";
import { existsSync, lstatSync, readlinkSync } from "fs";
import { execSync } from "child_process";

/**
 * GET /api/health
 * Full diagnostics: env vars, database file locations, schema push result.
 */
export async function GET() {
  const NEXTAUTH_URL = (process.env as any)["NEXTAUTH_URL"];
  const DATABASE_URL = (process.env as any)["DATABASE_URL"];
  const NEXTAUTH_SECRET = (process.env as any)["NEXTAUTH_SECRET"];
  const CWD = process.cwd();

  const checks: Record<string, any> = {
    status: "ok",
    timestamp: new Date().toISOString(),
    node: process.version,
    cwd: CWD,
    nextauth_url_set: !!NEXTAUTH_URL,
    database_url_set: !!DATABASE_URL,
    nextauth_secret_set: !!NEXTAUTH_SECRET,
    database_url: DATABASE_URL,
  };

  // ── File system check ──
  const prismaDb = CWD + "/prisma/dev.db";
  const rootDb  = CWD + "/dev.db";
  const schema  = CWD + "/prisma/schema.prisma";

  checks.files = {
    "prisma/dev.db": existsSync(prismaDb) ? lstatSync(prismaDb).size + " bytes" : "not found",
    "dev.db":       existsSync(rootDb)  ? lstatSync(rootDb).size + " bytes"   : "not found",
    "prisma/schema.prisma": existsSync(schema),
  };

  if (existsSync(rootDb) && lstatSync(rootDb).isSymbolicLink()) {
    checks.files["dev.db→target"] = readlinkSync(rootDb);
  }

  // ── Run prisma db push (diagnostic) ──
  try {
    const out = execSync(
      "npx prisma db push --skip-generate --accept-data-loss 2>&1",
      {
        cwd: CWD,
        timeout: 20_000,
        env: {
          ...process.env,
          DATABASE_URL: "file:" + CWD + "/prisma/dev.db",
        },
      },
    ).toString();
    checks.db_push = { ok: true, output: out.trim().slice(0, 600) };
  } catch (e: any) {
    checks.db_push = {
      ok: false,
      error: e?.message?.slice(0, 300),
      stdout: e?.stdout?.toString()?.slice(0, 300),
      stderr: e?.stderr?.toString()?.slice(0, 300),
    };
  }

  // ── Prisma connection & user check ──
  try {
    const { prisma } = await import("@/lib/prisma");
    await prisma.$queryRaw`SELECT 1`;
    checks.database_connection = "ok";
  } catch (e: any) {
    checks.database_connection = "error";
    checks.database_error = e?.message?.slice(0, 200);
  }

  try {
    const { prisma } = await import("@/lib/prisma");
    checks.user_count = await prisma.user.count();
  } catch (e: any) {
    checks.user_count = "error";
    checks.user_error = e?.message?.slice(0, 150);
  }

  return NextResponse.json(checks);
}