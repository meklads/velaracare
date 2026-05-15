import { PrismaClient } from "@/generated/prisma/client";
import { PrismaLibSql } from "@prisma/adapter-libsql";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

/**
 * Read DATABASE_URL at module init time.
 * During `next build` (Docker) this picks up whatever is in the environment.
 * At runtime, start.sh exports an absolute path so both CLI and app agree.
 */
const databaseUrl = (process.env as any)["DATABASE_URL"] || "file:./dev.db";

const adapter = new PrismaLibSql({
  url: databaseUrl,
});

export const prisma = globalForPrisma.prisma ?? new PrismaClient({ adapter });

if ((process.env as any)["NODE_ENV"] !== "production") globalForPrisma.prisma = prisma;
