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
          telegram_id: number | null;
          telegram_username: string | null;
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
          telegram_id?: number | null;
          telegram_username?: string | null;
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
          telegram_id?: number | null;
          telegram_username?: string | null;
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
          cart: CartItemJson[];
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
          cart?: CartItemJson[];
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
          cart?: CartItemJson[];
          active?: boolean;
          checked_in_at?: string;
          checked_out_at?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      orders: {
        Row: {
          id: string;
          session_id: string;
          guest_id: string | null;
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
          guest_id?: string | null;
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
          guest_id?: string | null;
          order_number?: string;
          zone?: string;
          status?: "pending" | "preparing" | "ready" | "delivered" | "cancelled";
          total?: number;
          notes?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
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
        Relationships: [];
      };
      transactions: {
        Row: {
          id: string;
          session_id: string | null;
          guest_id: string;
          type: "top_up" | "purchase" | "refund" | "adjustment";
          amount: number;
          balance_before: number;
          balance_after: number;
          order_id: string | null;
          description: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          session_id?: string | null;
          guest_id: string;
          type: "top_up" | "purchase" | "refund" | "adjustment";
          amount: number;
          balance_before: number;
          balance_after: number;
          order_id?: string | null;
          description?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          session_id?: string | null;
          guest_id?: string;
          type?: "top_up" | "purchase" | "refund" | "adjustment";
          amount?: number;
          balance_before?: number;
          balance_after?: number;
          order_id?: string | null;
          description?: string | null;
          created_at?: string;
        };
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: {
      generate_order_number: {
        Args: Record<string, never>;
        Returns: string;
      };
      process_order_payment: {
        Args: {
          p_session_id: string;
          p_order_id: string;
          p_amount: number;
        };
        Returns: {
          success: boolean;
          error?: string;
          balance_before?: number;
          balance_after?: number;
          guest_id?: string;
          balance?: number;
        };
      };
      process_top_up: {
        Args: {
          p_session_id: string;
          p_amount: number;
          p_description?: string;
        };
        Returns: {
          success: boolean;
          error?: string;
          balance_before?: number;
          balance_after?: number;
        };
      };
    };
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
}

export interface CartItemJson {
  name: string;
  price: number;
  qty: number;
}

export type Reservation = Database["public"]["Tables"]["reservations"]["Row"];
export type ReservationInsert =
  Database["public"]["Tables"]["reservations"]["Insert"];
export type ReservationUpdate =
  Database["public"]["Tables"]["reservations"]["Update"];
export type Availability = Database["public"]["Tables"]["availability"]["Row"];

export type Guest = Database["public"]["Tables"]["guests"]["Row"];
export type GuestInsert = Database["public"]["Tables"]["guests"]["Insert"];
export type GuestSession = Database["public"]["Tables"]["guest_sessions"]["Row"];
export type GuestSessionInsert = Database["public"]["Tables"]["guest_sessions"]["Insert"];

export type Order = Database["public"]["Tables"]["orders"]["Row"];
export type OrderInsert = Database["public"]["Tables"]["orders"]["Insert"];
export type OrderItem = Database["public"]["Tables"]["order_items"]["Row"];
export type OrderItemInsert = Database["public"]["Tables"]["order_items"]["Insert"];

export type Transaction = Database["public"]["Tables"]["transactions"]["Row"];
