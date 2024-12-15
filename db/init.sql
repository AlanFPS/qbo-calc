-- db/init.sql

CREATE TABLE IF NOT EXISTS auth_tokens (
  id SERIAL PRIMARY KEY,
  realm_id VARCHAR(50) UNIQUE NOT NULL,
  access_token TEXT NOT NULL,
  refresh_token TEXT NOT NULL,
  token_expires_at TIMESTAMP WITHOUT TIME ZONE NOT NULL,
  created_at TIMESTAMP WITHOUT TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITHOUT TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS calculations (
  id SERIAL PRIMARY KEY,
  realm_id VARCHAR(50) NOT NULL,
  qbo_estimate_id VARCHAR(50) NOT NULL,
  labor_cost NUMERIC,
  material_cost NUMERIC,
  overhead_percent NUMERIC,
  final_price NUMERIC,
  created_at TIMESTAMP WITHOUT TIME ZONE DEFAULT NOW()
);
