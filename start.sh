#!/bin/bash
# NOT using set -e — we handle errors explicitly
# Container must keep running even if DB init has hiccups

echo "🚀 Velara Care — Starting up..."

# ──────────────────────────────────────────────
# Ensure critical env vars are always available.
# If a var is missing from the system environment
# we write a default .env file so Next.js can
# read it at runtime (Next.js auto-loads .env).
# ──────────────────────────────────────────────
if [ -z "$DATABASE_URL" ] || [ -z "$NEXTAUTH_SECRET" ] || [ -z "$NEXTAUTH_URL" ]; then
  echo "📝 Writing .env file (env vars missing from container environment)..."
  cat > .env << 'EOF'
# Velara Care — auto-generated defaults
DATABASE_URL="file:./dev.db"
NEXTAUTH_SECRET="super-secret-key-change-in-production-1234567890"
NEXTAUTH_URL="https://velaracare.co"
EOF
fi

# Print environment info (without secrets)
echo "📋 Node: $(node -v)"
echo "📋 NEXTAUTH_URL: ${NEXTAUTH_URL:-https://velaracare.co}"
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
