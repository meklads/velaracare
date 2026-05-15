import { PrismaClient } from "@/generated/prisma/client";
import { PrismaLibSql } from "@prisma/adapter-libsql";
import { env } from "./env";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

const adapter = new PrismaLibSql({
  url: env("DATABASE_URL", "file:./dev.db"),
});

export const prisma = globalForPrisma.prisma ?? new PrismaClient({ adapter });

if (env("NODE_ENV") !== "production") globalForPrisma.prisma = prisma;
