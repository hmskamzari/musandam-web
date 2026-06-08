import { Pool } from "pg";

declare global {
  // eslint-disable-next-line no-var
  var _pgPool: Pool | undefined;
}

// Re-use the pool across hot-reloads in development
const pool =
  global._pgPool ??
  new Pool({
    connectionString:
      process.env.DATABASE_URL ?? "postgresql://postgres:postgres@localhost:5432/musandam",
    max: 10,
  });

if (process.env.NODE_ENV !== "production") {
  global._pgPool = pool;
}

export default pool;
