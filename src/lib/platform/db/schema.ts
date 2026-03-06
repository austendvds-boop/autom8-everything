import { sql } from "drizzle-orm"
import {
  boolean,
  check,
  index,
  jsonb,
  pgTable,
  timestamp,
  uniqueIndex,
  uuid,
  varchar,
  text,
} from "drizzle-orm/pg-core"

export const a8Clients = pgTable(
  "a8_clients",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    businessName: varchar("business_name", { length: 255 }).notNull(),
    contactName: varchar("contact_name", { length: 255 }).notNull(),
    email: varchar("email", { length: 255 }).notNull(),
    phone: varchar("phone", { length: 20 }),
    stripeCustomerId: varchar("stripe_customer_id", { length: 255 }),
    notes: text("notes"),
    isActive: boolean("is_active").notNull().default(true),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => ({
    emailUnique: uniqueIndex("a8_clients_email_uq").on(table.email),
    stripeCustomerIdIndex: index("a8_clients_stripe_customer_idx")
      .on(table.stripeCustomerId)
      .where(sql`${table.stripeCustomerId} IS NOT NULL`),
  }),
)

export const a8ClientServices = pgTable(
  "a8_client_services",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    clientId: uuid("client_id")
      .notNull()
      .references(() => a8Clients.id, { onDelete: "cascade" }),
    serviceType: varchar("service_type", { length: 50 }).notNull(),
    status: varchar("status", { length: 20 }).notNull().default("active"),
    cadenceTenantId: varchar("cadence_tenant_id", { length: 255 }),
    rfTenantId: uuid("rf_tenant_id"),
    stripeSubscriptionId: varchar("stripe_subscription_id", { length: 255 }),
    provisionedAt: timestamp("provisioned_at", { withTimezone: true }),
    pausedAt: timestamp("paused_at", { withTimezone: true }),
    cancelledAt: timestamp("cancelled_at", { withTimezone: true }),
    metadata: jsonb("metadata").$type<Record<string, unknown>>().notNull().default(sql`'{}'::jsonb`),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => ({
    clientServiceTypeUnique: uniqueIndex("a8_client_services_client_service_type_uq").on(
      table.clientId,
      table.serviceType,
    ),
    clientIdIndex: index("a8_client_services_client_idx").on(table.clientId),
    cadenceTenantIdIndex: index("a8_client_services_cadence_tenant_idx")
      .on(table.cadenceTenantId)
      .where(sql`${table.cadenceTenantId} IS NOT NULL`),
    serviceTypeValid: check(
      "a8_client_services_service_type_chk",
      sql`${table.serviceType} IN ('cadence', 'review_funnel')`,
    ),
    statusValid: check(
      "a8_client_services_status_chk",
      sql`${table.status} IN ('active', 'paused', 'cancelled')`,
    ),
  }),
)

export const a8MagicLinks = pgTable(
  "a8_magic_links",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    clientId: uuid("client_id")
      .notNull()
      .references(() => a8Clients.id, { onDelete: "cascade" }),
    email: varchar("email", { length: 255 }).notNull(),
    tokenHash: varchar("token_hash", { length: 255 }).notNull(),
    expiresAt: timestamp("expires_at", { withTimezone: true }).notNull(),
    usedAt: timestamp("used_at", { withTimezone: true }),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => ({
    tokenHashUnique: uniqueIndex("a8_magic_links_token_hash_uq").on(table.tokenHash),
    emailCreatedAtIndex: index("a8_magic_links_email_created_idx").on(table.email, table.createdAt),
  }),
)

export const platformSchema = {
  a8Clients,
  a8ClientServices,
  a8MagicLinks,
}

export type A8Client = typeof a8Clients.$inferSelect
export type NewA8Client = typeof a8Clients.$inferInsert
export type A8ClientService = typeof a8ClientServices.$inferSelect
export type NewA8ClientService = typeof a8ClientServices.$inferInsert
export type A8MagicLink = typeof a8MagicLinks.$inferSelect
export type NewA8MagicLink = typeof a8MagicLinks.$inferInsert
