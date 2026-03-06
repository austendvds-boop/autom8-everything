-- Fallback SQL migration for unified platform tables
-- Created: 2026-03-07

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
