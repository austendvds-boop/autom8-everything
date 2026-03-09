-- Full schema migration for autom8-everything
-- Run against Neon Postgres production database
-- All statements are idempotent (safe to re-run)
--
-- Tables created:
--   a8_clients, a8_client_services, a8_magic_links (platform)
--   rf_consent_log (review funnel consent tracking)
-- Columns added:
--   rf_tenants.yelp_review_url, rf_tenants.review_platform
--
-- Execute via Neon console SQL editor or psql

CREATE TABLE IF NOT EXISTS a8_clients (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  business_name varchar(255) NOT NULL,
  contact_name varchar(255) NOT NULL,
  email varchar(255) NOT NULL,
  phone varchar(20),
  stripe_customer_id varchar(255),
  notes text,
  is_active boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE UNIQUE INDEX IF NOT EXISTS a8_clients_email_uq
  ON a8_clients (email);

CREATE INDEX IF NOT EXISTS a8_clients_stripe_customer_idx
  ON a8_clients (stripe_customer_id)
  WHERE stripe_customer_id IS NOT NULL;

CREATE TABLE IF NOT EXISTS a8_client_services (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id uuid NOT NULL REFERENCES a8_clients(id) ON DELETE CASCADE,
  service_type varchar(50) NOT NULL,
  status varchar(20) NOT NULL DEFAULT 'active',
  cadence_tenant_id varchar(255),
  rf_tenant_id uuid,
  stripe_subscription_id varchar(255),
  provisioned_at timestamptz,
  paused_at timestamptz,
  cancelled_at timestamptz,
  metadata jsonb NOT NULL DEFAULT '{}'::jsonb,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT a8_client_services_service_type_chk CHECK (service_type IN ('cadence', 'review_funnel')),
  CONSTRAINT a8_client_services_status_chk CHECK (status IN ('active', 'paused', 'cancelled'))
);

CREATE UNIQUE INDEX IF NOT EXISTS a8_client_services_client_service_type_uq
  ON a8_client_services (client_id, service_type);

CREATE INDEX IF NOT EXISTS a8_client_services_client_idx
  ON a8_client_services (client_id);

CREATE INDEX IF NOT EXISTS a8_client_services_cadence_tenant_idx
  ON a8_client_services (cadence_tenant_id)
  WHERE cadence_tenant_id IS NOT NULL;

CREATE TABLE IF NOT EXISTS a8_magic_links (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id uuid NOT NULL REFERENCES a8_clients(id) ON DELETE CASCADE,
  email varchar(255) NOT NULL,
  token_hash varchar(255) NOT NULL,
  expires_at timestamptz NOT NULL,
  used_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE UNIQUE INDEX IF NOT EXISTS a8_magic_links_token_hash_uq
  ON a8_magic_links (token_hash);

CREATE INDEX IF NOT EXISTS a8_magic_links_email_created_idx
  ON a8_magic_links (email, created_at);

CREATE TABLE IF NOT EXISTS "rf_consent_log" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  "phone" varchar(20) NOT NULL,
  "tenant_id" uuid,
  "consent_type" varchar(20) NOT NULL,
  "source" varchar(30) NOT NULL,
  "metadata" text,
  "created_at" timestamp with time zone DEFAULT now() NOT NULL,
  CONSTRAINT "rf_consent_log_tenant_id_rf_tenants_id_fk"
    FOREIGN KEY ("tenant_id") REFERENCES "public"."rf_tenants"("id") ON DELETE set null
);

CREATE INDEX IF NOT EXISTS "rf_consent_log_phone_idx" ON "rf_consent_log" USING btree ("phone");
CREATE INDEX IF NOT EXISTS "rf_consent_log_tenant_idx" ON "rf_consent_log" USING btree ("tenant_id");

ALTER TABLE rf_tenants ADD COLUMN IF NOT EXISTS yelp_review_url text;
ALTER TABLE rf_tenants ADD COLUMN IF NOT EXISTS review_platform varchar(20) NOT NULL DEFAULT 'google';
