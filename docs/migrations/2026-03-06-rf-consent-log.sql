-- Review Funnel consent logging table
-- Run this manually against the shared Postgres database when DATABASE_URL is available.

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
