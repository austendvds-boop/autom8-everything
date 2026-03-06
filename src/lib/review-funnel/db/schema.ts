import { sql } from "drizzle-orm"
import {
  boolean,
  check,
  index,
  integer,
  pgTable,
  smallint,
  text,
  timestamp,
  uniqueIndex,
  uuid,
  varchar,
} from "drizzle-orm/pg-core"

export const rfTenants = pgTable(
  "rf_tenants",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    slug: varchar("slug", { length: 63 }).notNull(),
    businessName: varchar("business_name", { length: 255 }).notNull(),
    ownerName: varchar("owner_name", { length: 255 }).notNull(),
    ownerEmail: varchar("owner_email", { length: 255 }).notNull(),
    ownerPhone: varchar("owner_phone", { length: 20 }).notNull(),
    googlePlaceId: varchar("google_place_id", { length: 255 }),
    gmbReviewUrl: text("gmb_review_url").notNull(),
    yelpReviewUrl: text("yelp_review_url"),
    reviewPlatform: varchar("review_platform", { length: 20 }).notNull().default("google"),
    logoUrl: text("logo_url"),
    primaryColor: varchar("primary_color", { length: 7 }).notNull().default("#2563EB"),
    accentColor: varchar("accent_color", { length: 7 }).notNull().default("#1E40AF"),
    promoOffer: text("promo_offer").notNull().default("10% off your next visit"),
    promoCode: varchar("promo_code", { length: 50 }),
    smsDelayMinutes: integer("sms_delay_minutes").notNull().default(60),
    smsTemplate: text("sms_template"),
    smsSenderNumber: varchar("sms_sender_number", { length: 20 }),
    isActive: boolean("is_active").notNull().default(true),
    stripeCustomerId: varchar("stripe_customer_id", { length: 255 }),
    stripeSubscriptionId: varchar("stripe_subscription_id", { length: 255 }),
    plan: varchar("plan", { length: 20 }).notNull().default("starter"),
    smsLimitMonthly: integer("sms_limit_monthly").notNull().default(150),
    calendarLimit: integer("calendar_limit").notNull().default(1),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => ({
    slugUnique: uniqueIndex("rf_tenants_slug_uq").on(table.slug),
    ownerEmailUnique: uniqueIndex("rf_tenants_owner_email_uq").on(table.ownerEmail),
    stripeCustomerIdIndex: index("rf_tenants_stripe_customer_idx").on(table.stripeCustomerId),
  }),
)

export const rfLocations = pgTable(
  "rf_locations",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    tenantId: uuid("tenant_id")
      .notNull()
      .references(() => rfTenants.id, { onDelete: "cascade" }),
    name: varchar("name", { length: 255 }).notNull(),
    googlePlaceId: varchar("google_place_id", { length: 255 }),
    gmbReviewUrl: text("gmb_review_url"),
    calendarId: varchar("calendar_id", { length: 255 }),
    smsSenderNumber: varchar("sms_sender_number", { length: 20 }),
    isActive: boolean("is_active").notNull().default(true),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => ({
    tenantIdIndex: index("rf_locations_tenant_idx").on(table.tenantId),
  }),
)

export const rfGoogleOauthTokens = pgTable(
  "rf_google_oauth_tokens",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    tenantId: uuid("tenant_id")
      .notNull()
      .references(() => rfTenants.id, { onDelete: "cascade" }),
    accessTokenEnc: text("access_token_enc").notNull(),
    refreshTokenEnc: text("refresh_token_enc").notNull(),
    tokenExpiry: timestamp("token_expiry", { withTimezone: true }).notNull(),
    scopes: text("scopes").array(),
    googleEmail: varchar("google_email", { length: 255 }),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => ({
    tenantUnique: uniqueIndex("rf_google_oauth_tokens_tenant_uq").on(table.tenantId),
  }),
)

export const rfCalendarWatches = pgTable(
  "rf_calendar_watches",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    tenantId: uuid("tenant_id")
      .notNull()
      .references(() => rfTenants.id, { onDelete: "cascade" }),
    locationId: uuid("location_id").references(() => rfLocations.id, { onDelete: "set null" }),
    channelId: varchar("channel_id", { length: 255 }).notNull(),
    resourceId: varchar("resource_id", { length: 255 }),
    calendarId: varchar("calendar_id", { length: 255 }).notNull().default("primary"),
    expiration: timestamp("expiration", { withTimezone: true }).notNull(),
    syncToken: text("sync_token"),
    isActive: boolean("is_active").notNull().default(true),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => ({
    channelIdUnique: uniqueIndex("rf_calendar_watches_channel_uq").on(table.channelId),
    expirationIndex: index("rf_calendar_watches_expiration_idx").on(table.expiration),
  }),
)

export const rfReviewRequests = pgTable(
  "rf_review_requests",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    tenantId: uuid("tenant_id")
      .notNull()
      .references(() => rfTenants.id, { onDelete: "cascade" }),
    locationId: uuid("location_id").references(() => rfLocations.id, { onDelete: "set null" }),
    customerName: varchar("customer_name", { length: 255 }),
    customerPhone: varchar("customer_phone", { length: 20 }),
    customerEmail: varchar("customer_email", { length: 255 }),
    calendarEventId: varchar("calendar_event_id", { length: 255 }).notNull(),
    appointmentEnd: timestamp("appointment_end", { withTimezone: true }).notNull(),
    smsScheduledAt: timestamp("sms_scheduled_at", { withTimezone: true }).notNull(),
    smsSentAt: timestamp("sms_sent_at", { withTimezone: true }),
    smsSid: varchar("sms_sid", { length: 64 }),
    smsStatus: varchar("sms_status", { length: 20 }).notNull().default("pending"),
    pageOpenedAt: timestamp("page_opened_at", { withTimezone: true }),
    rating: smallint("rating"),
    ratedAt: timestamp("rated_at", { withTimezone: true }),
    googleReviewClicked: boolean("google_review_clicked").notNull().default(false),
    feedbackText: text("feedback_text"),
    promoShown: boolean("promo_shown").notNull().default(false),
    promoRedeemed: boolean("promo_redeemed").notNull().default(false),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => ({
    tenantCalendarEventUnique: uniqueIndex("rf_review_requests_tenant_event_uq").on(
      table.tenantId,
      table.calendarEventId,
    ),
    tenantIndex: index("rf_review_requests_tenant_idx").on(table.tenantId),
    statusScheduledIndex: index("rf_review_requests_status_sched_idx").on(table.smsStatus, table.smsScheduledAt),
    tenantCreatedAtIndex: index("rf_review_requests_tenant_created_idx").on(table.tenantId, table.createdAt),
    ratingValid: check(
      "rf_review_requests_rating_chk",
      sql`${table.rating} BETWEEN 1 AND 5 OR ${table.rating} IS NULL`,
    ),
  }),
)

export const rfPendingSms = pgTable(
  "rf_pending_sms",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    reviewRequestId: uuid("review_request_id")
      .notNull()
      .references(() => rfReviewRequests.id, { onDelete: "cascade" }),
    sendAfter: timestamp("send_after", { withTimezone: true }).notNull(),
    attempts: integer("attempts").notNull().default(0),
    lastError: text("last_error"),
    status: varchar("status", { length: 20 }).notNull().default("queued"),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => ({
    reviewRequestUnique: uniqueIndex("rf_pending_sms_review_request_uq").on(table.reviewRequestId),
    queuedDueIndex: index("rf_pending_sms_due_queued_idx")
      .on(table.sendAfter)
      .where(sql`${table.status} = 'queued'`),
  }),
)

export const rfSmsOptOuts = pgTable(
  "rf_sms_opt_outs",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    phone: varchar("phone", { length: 20 }).notNull(),
    optedOutAt: timestamp("opted_out_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => ({
    phoneUnique: uniqueIndex("rf_sms_opt_outs_phone_uq").on(table.phone),
  }),
)

export const rfSmsUsage = pgTable(
  "rf_sms_usage",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    tenantId: uuid("tenant_id")
      .notNull()
      .references(() => rfTenants.id, { onDelete: "cascade" }),
    month: varchar("month", { length: 7 }).notNull(),
    count: integer("count").notNull().default(0),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => ({
    tenantMonthUnique: uniqueIndex("rf_sms_usage_tenant_month_uq").on(table.tenantId, table.month),
  }),
)

export const rfMagicLinks = pgTable(
  "rf_magic_links",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    tenantId: uuid("tenant_id")
      .notNull()
      .references(() => rfTenants.id, { onDelete: "cascade" }),
    email: varchar("email", { length: 255 }).notNull(),
    tokenHash: varchar("token_hash", { length: 255 }).notNull(),
    expiresAt: timestamp("expires_at", { withTimezone: true }).notNull(),
    usedAt: timestamp("used_at", { withTimezone: true }),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => ({
    tokenHashUnique: uniqueIndex("rf_magic_links_token_hash_uq").on(table.tokenHash),
    emailCreatedAtIndex: index("rf_magic_links_email_created_idx").on(table.email, table.createdAt),
  }),
)

export const rfConsentLog = pgTable(
  "rf_consent_log",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    phone: varchar("phone", { length: 20 }).notNull(),
    tenantId: uuid("tenant_id").references(() => rfTenants.id, { onDelete: "set null" }),
    consentType: varchar("consent_type", { length: 20 }).notNull(),
    source: varchar("source", { length: 30 }).notNull(),
    metadata: text("metadata"),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => ({
    phoneIndex: index("rf_consent_log_phone_idx").on(table.phone),
    tenantIndex: index("rf_consent_log_tenant_idx").on(table.tenantId),
  }),
)

export const reviewFunnelSchema = {
  rfTenants,
  rfLocations,
  rfGoogleOauthTokens,
  rfCalendarWatches,
  rfReviewRequests,
  rfPendingSms,
  rfSmsOptOuts,
  rfSmsUsage,
  rfMagicLinks,
  rfConsentLog,
}

export type RfTenant = typeof rfTenants.$inferSelect
export type NewRfTenant = typeof rfTenants.$inferInsert
export type RfLocation = typeof rfLocations.$inferSelect
export type NewRfLocation = typeof rfLocations.$inferInsert
export type RfGoogleOauthToken = typeof rfGoogleOauthTokens.$inferSelect
export type NewRfGoogleOauthToken = typeof rfGoogleOauthTokens.$inferInsert
export type RfCalendarWatch = typeof rfCalendarWatches.$inferSelect
export type NewRfCalendarWatch = typeof rfCalendarWatches.$inferInsert
export type RfReviewRequest = typeof rfReviewRequests.$inferSelect
export type NewRfReviewRequest = typeof rfReviewRequests.$inferInsert
export type RfPendingSms = typeof rfPendingSms.$inferSelect
export type NewRfPendingSms = typeof rfPendingSms.$inferInsert
export type RfSmsOptOut = typeof rfSmsOptOuts.$inferSelect
export type NewRfSmsOptOut = typeof rfSmsOptOuts.$inferInsert
export type RfSmsUsage = typeof rfSmsUsage.$inferSelect
export type NewRfSmsUsage = typeof rfSmsUsage.$inferInsert
export type RfMagicLink = typeof rfMagicLinks.$inferSelect
export type NewRfMagicLink = typeof rfMagicLinks.$inferInsert
export type RfConsentType = "sms_sent" | "opt_out" | "opt_in"
export type RfConsentSource = "calendar_event" | "manual" | "twilio_inbound" | "cron_process"
export type RfConsentLog = typeof rfConsentLog.$inferSelect
export type NewRfConsentLog = Omit<typeof rfConsentLog.$inferInsert, "consentType" | "source"> & {
  consentType: RfConsentType
  source: RfConsentSource
}
