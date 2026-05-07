-- Bethel Bellini — ISLA OS Ordering System Schema
-- Adds: guests, guest_sessions, orders, order_items

-- ══ GUESTS ══
CREATE TABLE IF NOT EXISTS guests (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    phone TEXT NOT NULL UNIQUE,
    name TEXT NOT NULL DEFAULT 'Invitado',
    country_code TEXT NOT NULL DEFAULT '+57',
    total_visits INTEGER NOT NULL DEFAULT 0,
    total_spent INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ══ GUEST SESSIONS (one per visit / wristband) ══
CREATE TABLE IF NOT EXISTS guest_sessions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    guest_id UUID NOT NULL REFERENCES guests(id) ON DELETE CASCADE,
    band_id TEXT NOT NULL UNIQUE,
    balance INTEGER NOT NULL DEFAULT 0,
    zone TEXT,
    active BOOLEAN NOT NULL DEFAULT true,
    checked_in_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    checked_out_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ══ ORDERS ══
CREATE TABLE IF NOT EXISTS orders (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    session_id UUID NOT NULL REFERENCES guest_sessions(id) ON DELETE CASCADE,
    order_number TEXT NOT NULL,
    zone TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'pending'
        CHECK (status IN ('pending', 'preparing', 'ready', 'delivered', 'cancelled')),
    total INTEGER NOT NULL,
    notes TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ══ ORDER ITEMS ══
CREATE TABLE IF NOT EXISTS order_items (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    order_id UUID NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
    item_name TEXT NOT NULL,
    item_price INTEGER NOT NULL,
    quantity INTEGER NOT NULL DEFAULT 1 CHECK (quantity > 0),
    notes TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ══ INDEXES ══
CREATE INDEX IF NOT EXISTS idx_guests_phone ON guests(phone);
CREATE INDEX IF NOT EXISTS idx_sessions_guest ON guest_sessions(guest_id);
CREATE INDEX IF NOT EXISTS idx_sessions_band ON guest_sessions(band_id);
CREATE INDEX IF NOT EXISTS idx_sessions_active ON guest_sessions(active) WHERE active = true;
CREATE INDEX IF NOT EXISTS idx_orders_session ON orders(session_id);
CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(status);
CREATE INDEX IF NOT EXISTS idx_orders_created ON orders(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_order_items_order ON order_items(order_id);

-- ══ UPDATED_AT TRIGGERS ══
CREATE TRIGGER update_guests_updated_at
    BEFORE UPDATE ON guests
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_sessions_updated_at
    BEFORE UPDATE ON guest_sessions
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_orders_updated_at
    BEFORE UPDATE ON orders
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ══ RLS ══
ALTER TABLE guests ENABLE ROW LEVEL SECURITY;
ALTER TABLE guest_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Service role full access guests" ON guests
    FOR ALL TO service_role USING (true) WITH CHECK (true);

CREATE POLICY "Service role full access sessions" ON guest_sessions
    FOR ALL TO service_role USING (true) WITH CHECK (true);

CREATE POLICY "Service role full access orders" ON orders
    FOR ALL TO service_role USING (true) WITH CHECK (true);

CREATE POLICY "Service role full access order_items" ON order_items
    FOR ALL TO service_role USING (true) WITH CHECK (true);

-- ══ ENABLE REALTIME (for kitchen display) ══
ALTER PUBLICATION supabase_realtime ADD TABLE orders;
ALTER PUBLICATION supabase_realtime ADD TABLE order_items;
