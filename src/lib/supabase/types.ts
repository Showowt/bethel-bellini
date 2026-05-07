export interface Database {
  public: {
    Tables: {
      reservations: {
        Row: {
          id: string;
          created_at: string;
          updated_at: string;
          name: string;
          email: string | null;
          phone: string;
          country_code: string;
          date: string;
          time: string;
          guests: number;
          status: "pending" | "confirmed" | "cancelled" | "completed";
          notes: string | null;
          whatsapp_notified: boolean;
        };
        Insert: {
          id?: string;
          created_at?: string;
          updated_at?: string;
          name: string;
          email?: string | null;
          phone: string;
          country_code?: string;
          date: string;
          time: string;
          guests?: number;
          status?: "pending" | "confirmed" | "cancelled" | "completed";
          notes?: string | null;
          whatsapp_notified?: boolean;
        };
        Update: {
          id?: string;
          created_at?: string;
          updated_at?: string;
          name?: string;
          email?: string | null;
          phone?: string;
          country_code?: string;
          date?: string;
          time?: string;
          guests?: number;
          status?: "pending" | "confirmed" | "cancelled" | "completed";
          notes?: string | null;
          whatsapp_notified?: boolean;
        };
        Relationships: [];
      };
      availability: {
        Row: {
          id: string;
          date: string;
          max_guests: number;
          current_guests: number;
          is_open: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          date: string;
          max_guests?: number;
          current_guests?: number;
          is_open?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          date?: string;
          max_guests?: number;
          current_guests?: number;
          is_open?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      guests: {
        Row: {
          id: string;
          phone: string;
          name: string;
          country_code: string;
          total_visits: number;
          total_spent: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          phone: string;
          name?: string;
          country_code?: string;
          total_visits?: number;
          total_spent?: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          phone?: string;
          name?: string;
          country_code?: string;
          total_visits?: number;
          total_spent?: number;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      guest_sessions: {
        Row: {
          id: string;
          guest_id: string;
          band_id: string;
          balance: number;
          zone: string | null;
          active: boolean;
          checked_in_at: string;
          checked_out_at: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          guest_id: string;
          band_id: string;
          balance?: number;
          zone?: string | null;
          active?: boolean;
          checked_in_at?: string;
          checked_out_at?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          guest_id?: string;
          band_id?: string;
          balance?: number;
          zone?: string | null;
          active?: boolean;
          checked_in_at?: string;
          checked_out_at?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "guest_sessions_guest_id_fkey";
            columns: ["guest_id"];
            referencedRelation: "guests";
            referencedColumns: ["id"];
          },
        ];
      };
      orders: {
        Row: {
          id: string;
          session_id: string;
          order_number: string;
          zone: string;
          status: "pending" | "preparing" | "ready" | "delivered" | "cancelled";
          total: number;
          notes: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          session_id: string;
          order_number: string;
          zone: string;
          status?: "pending" | "preparing" | "ready" | "delivered" | "cancelled";
          total: number;
          notes?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          session_id?: string;
          order_number?: string;
          zone?: string;
          status?: "pending" | "preparing" | "ready" | "delivered" | "cancelled";
          total?: number;
          notes?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "orders_session_id_fkey";
            columns: ["session_id"];
            referencedRelation: "guest_sessions";
            referencedColumns: ["id"];
          },
        ];
      };
      order_items: {
        Row: {
          id: string;
          order_id: string;
          item_name: string;
          item_price: number;
          quantity: number;
          notes: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          order_id: string;
          item_name: string;
          item_price: number;
          quantity?: number;
          notes?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          order_id?: string;
          item_name?: string;
          item_price?: number;
          quantity?: number;
          notes?: string | null;
          created_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "order_items_order_id_fkey";
            columns: ["order_id"];
            referencedRelation: "orders";
            referencedColumns: ["id"];
          },
        ];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
}

export type Reservation = Database["public"]["Tables"]["reservations"]["Row"];
export type ReservationInsert =
  Database["public"]["Tables"]["reservations"]["Insert"];
export type ReservationUpdate =
  Database["public"]["Tables"]["reservations"]["Update"];
export type Availability = Database["public"]["Tables"]["availability"]["Row"];

export type Guest = Database["public"]["Tables"]["guests"]["Row"];
export type GuestInsert = Database["public"]["Tables"]["guests"]["Insert"];
export type GuestUpdate = Database["public"]["Tables"]["guests"]["Update"];

export type GuestSession =
  Database["public"]["Tables"]["guest_sessions"]["Row"];
export type GuestSessionInsert =
  Database["public"]["Tables"]["guest_sessions"]["Insert"];
export type GuestSessionUpdate =
  Database["public"]["Tables"]["guest_sessions"]["Update"];

export type Order = Database["public"]["Tables"]["orders"]["Row"];
export type OrderInsert = Database["public"]["Tables"]["orders"]["Insert"];
export type OrderUpdate = Database["public"]["Tables"]["orders"]["Update"];

export type OrderItem = Database["public"]["Tables"]["order_items"]["Row"];
export type OrderItemInsert =
  Database["public"]["Tables"]["order_items"]["Insert"];

export type OrderWithItems = Order & { order_items: OrderItem[] };
