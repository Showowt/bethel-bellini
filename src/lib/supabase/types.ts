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
