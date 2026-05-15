#!/bin/bash
# NOT using set -e — we handle errors explicitly
# Container must keep running even if DB init has hiccups

echo "🚀 Velara Care — Starting up..."

# ──────────────────────────────────────────────────────
# PATH CONSISTENCY FIX
#
#  •  Prisma CLI   resolves file:./dev.db relative to
#     prisma/          → /app/prisma/dev.db
#
#  •  libSQL (adapter) resolves file:./dev.db relative
#     to CWD (= /app)  → /app/dev.db
#
# We create a symlink  /app/dev.db → /app/prisma/dev.db
# so both access the SAME database file no matter which
# path-resolution rule they follow.
# ──────────────────────────────────────────────────────
export DATABASE_URL="file:./dev.db"
mkdir -p "${PWD}/prisma"
if [ ! -L "${PWD}/dev.db" ] && [ ! -f "${PWD}/dev.db" ]; then
  ln -s "prisma/dev.db" "${PWD}/dev.db" 2>/dev/null || true
fi

if [ -z "$NEXTAUTH_SECRET" ] || [ -z "$NEXTAUTH_URL" ]; then
  echo "📝 Writing .env file (env vars missing from container environment)..."
  cat > .env << 'EOF'
# Velara Care — auto-generated defaults
DATABASE_URL="file:./dev.db"
NEXTAUTH_SECRET="super-secret-key-change-in-production-1234567890"
NEXTAUTH_URL="https://velaracare.co"
EOF
fi

# Print environment info
echo "📋 Node: $(node -v)"
echo "📋 NEXTAUTH_URL: ${NEXTAUTH_URL:-https://velaracare.co}"
echo "📋 DATABASE_URL: ${DATABASE_URL:-file:./dev.db}"

# Make sure PrismaClient is generated
if [ ! -f src/generated/prisma/client.ts ]; then
  echo "⚙️ Generating Prisma client..."
  npx prisma generate || echo "⚠️ prisma generate failed"
fi

# Push schema to the database
# NOTE: --skip-generate was removed in Prisma 7, so we don't use it
echo "📦 Pushing database schema..."
npx prisma db push --accept-data-loss 2>&1 || echo "⚠️ db push failed — continuing anyway"

# Seed demo data (only if no admin user exists yet)
echo "🌱 Seeding demo data..."
SEED_OUTPUT=$(npx tsx prisma/seed.ts 2>&1)
SEED_EXIT=$?
if [ $SEED_EXIT -eq 0 ]; then
  echo "$SEED_OUTPUT"
else
  echo "⚠️ Seed failed (exit $SEED_EXIT):"
  echo "$SEED_OUTPUT" | tail -20
  echo "⚠️ Continuing anyway..."
fi

# Start Next.js
echo "🌟 Starting Next.js server..."
exec npm run start
