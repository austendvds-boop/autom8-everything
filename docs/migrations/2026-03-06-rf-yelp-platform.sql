ALTER TABLE rf_tenants ADD COLUMN IF NOT EXISTS yelp_review_url text;
ALTER TABLE rf_tenants ADD COLUMN IF NOT EXISTS review_platform varchar(20) NOT NULL DEFAULT 'google';
