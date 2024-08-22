#!/bin/sh

set -e
  
DB_HOST="$1"
shift
  
until mysql --host="$DB_HOST" --port="$DB_PORT" --user="$DB_USER" --password="$DB_PASSWORD" "$DB_DATABASE" -e "select 1 as healthy"; do
  >&2 echo "Database is unavailable - sleeping"
  sleep 10
done
  
>&2 echo "Database is up - executing command"
exec "$@"