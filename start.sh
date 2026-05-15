#!/bin/bash
set -e

echo "🚀 Velara Care — Starting up..."

# Initialize database schema
echo "📦 Pushing database schema..."
npx prisma db push --skip-generate || echo "⚠️ db push failed (might already exist)"

# Seed demo data (safe to run multiple times)
echo "🌱 Seeding demo data..."
npx tsx prisma/seed.ts || echo "⚠️ Seed skipped (data might already exist)"

# Start Next.js
echo "🌟 Starting Next.js..."
exec npm run start
