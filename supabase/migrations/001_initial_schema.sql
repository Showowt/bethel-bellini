-- Bethel Bellini Beach Club Database Schema
-- Run this in your Supabase SQL Editor

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Reservations table
CREATE TABLE IF NOT EXISTS reservations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    name TEXT NOT NULL,
    email TEXT,
    phone TEXT NOT NULL,
    country_code TEXT DEFAULT '+57',
    date DATE NOT NULL,
    time TIME NOT NULL,
    guests INTEGER DEFAULT 2 CHECK (guests >= 1 AND guests <= 50),
    status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'cancelled', 'completed')),
    notes TEXT,
    whatsapp_notified BOOLEAN DEFAULT FALSE
);

-- Availability table (for managing capacity)
CREATE TABLE IF NOT EXISTS availability (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    date DATE UNIQUE NOT NULL,
    max_guests INTEGER DEFAULT 100,
    current_guests INTEGER DEFAULT 0,
    is_open BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_reservations_date ON reservations(date);
CREATE INDEX IF NOT EXISTS idx_reservations_status ON reservations(status);
CREATE INDEX IF NOT EXISTS idx_reservations_created_at ON reservations(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_availability_date ON availability(date);

-- Updated at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Apply trigger to reservations
DROP TRIGGER IF EXISTS update_reservations_updated_at ON reservations;
CREATE TRIGGER update_reservations_updated_at
    BEFORE UPDATE ON reservations
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Apply trigger to availability
DROP TRIGGER IF EXISTS update_availability_updated_at ON availability;
CREATE TRIGGER update_availability_updated_at
    BEFORE UPDATE ON availability
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- RLS Policies
ALTER TABLE reservations ENABLE ROW LEVEL SECURITY;
ALTER TABLE availability ENABLE ROW LEVEL SECURITY;

-- Allow anonymous inserts for reservations (public form)
CREATE POLICY "Allow public to insert reservations" ON reservations
    FOR INSERT
    TO anon
    WITH CHECK (true);

-- Allow service role full access (for admin operations)
CREATE POLICY "Service role full access to reservations" ON reservations
    FOR ALL
    TO service_role
    USING (true)
    WITH CHECK (true);

-- Allow anonymous to read availability
CREATE POLICY "Allow public to read availability" ON availability
    FOR SELECT
    TO anon
    USING (true);

-- Service role full access to availability
CREATE POLICY "Service role full access to availability" ON availability
    FOR ALL
    TO service_role
    USING (true)
    WITH CHECK (true);

-- Insert some initial availability (next 30 days)
INSERT INTO availability (date, max_guests, is_open)
SELECT
    CURRENT_DATE + i,
    100,
    TRUE
FROM generate_series(0, 30) AS i
ON CONFLICT (date) DO NOTHING;
