#!/bin/sh
set -e

echo "🚀 Starting Incuca Backend..."

# Wait for PostgreSQL to be ready
echo "⏳ Waiting for PostgreSQL to be ready..."
while ! nc -z $DB_HOST $DB_PORT; do
  sleep 1
done
echo "✅ PostgreSQL is ready!"

# Run migrations
echo "📦 Running database migrations..."
node ace migration:run --force

# Run seeders
echo "🌱 Running database seeders..."
node ace db:seed

# Start the application
echo "🎉 Starting the application..."
exec node bin/server.js
