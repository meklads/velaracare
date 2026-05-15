#!/bin/bash
# NOT using set -e — we handle errors explicitly
# Container must keep running even if DB init has hiccups

echo "🚀 Velara Care — Starting up..."

# Print environment info (without secrets)
echo "📋 Node: $(node -v)"
echo "📋 NEXTAUTH_URL: ${NEXTAUTH_URL:-<not set>}"
echo "📋 DATABASE_URL: ${DATABASE_URL:-file:./dev.db}"

# Generate Prisma client if missing (safety net for build-time generation)
if [ ! -f src/generated/prisma/client.ts ]; then
  echo "⚙️ Regenerating Prisma client..."
  npx prisma generate || echo "⚠️ prisma generate failed"
fi

# Initialize database schema (safe to run every start)
echo "📦 Pushing database schema..."
npx prisma db push --skip-generate 2>&1 || echo "⚠️ db push failed — continuing anyway"

# Seed demo data (safe to run multiple times)
echo "🌱 Seeding demo data..."
npx tsx prisma/seed.ts 2>&1 || echo "⚠️ Seed skipped — continuing anyway"

# Start Next.js
echo "🌟 Starting Next.js server..."
exec npm run start
