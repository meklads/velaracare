#!/bin/bash
# NOT using set -e — we handle errors explicitly
# Container must keep running even if DB init has hiccups

echo "🚀 Velara Care — Starting up..."

# ──────────────────────────────────────────────────────
# The "prisma db push" CLI resolves file:./dev.db relative
# to the prisma/ directory → prisma/dev.db
#
# libSQL (used by the Prisma adapter at runtime) resolves
# file:./dev.db relative to CWD → ./dev.db
#
# To avoid TWO different database files, we use an ABSOLUTE
# path based on $PWD so every tool writes to the same place.
# ──────────────────────────────────────────────────────
export DATABASE_URL="file:${PWD}/prisma/dev.db"

# Ensure the prisma directory exists
mkdir -p "${PWD}/prisma"

if [ -z "$NEXTAUTH_SECRET" ] || [ -z "$NEXTAUTH_URL" ]; then
  echo "📝 Writing .env file (env vars missing from container environment)..."
  cat > .env << EOF
# Velara Care — auto-generated defaults
DATABASE_URL="${DATABASE_URL}"
NEXTAUTH_SECRET="super-secret-key-change-in-production-1234567890"
NEXTAUTH_URL="https://velaracare.co"
EOF
fi

# Print environment info
echo "📋 Node: $(node -v)"
echo "📋 NEXTAUTH_URL: ${NEXTAUTH_URL:-https://velaracare.co}"
echo "📋 DATABASE_URL: ${DATABASE_URL}"

# Make sure PrismaClient is generated
if [ ! -f src/generated/prisma/client.ts ]; then
  echo "⚙️ Generating Prisma client..."
  npx prisma generate || echo "⚠️ prisma generate failed"
fi

# Push schema to the database
echo "📦 Pushing database schema..."
npx prisma db push --skip-generate 2>&1 || echo "⚠️ db push failed — continuing anyway"

# Seed demo data (only if no admin user exists yet)
echo "🌱 Seeding demo data..."
npx tsx prisma/seed.ts 2>&1 || echo "⚠️ Seed skipped — continuing anyway"

# Start Next.js
echo "🌟 Starting Next.js server..."
exec npm run start
