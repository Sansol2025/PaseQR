export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          role: 'user' | 'organizer' | 'scanner' | 'pr' | 'admin'
          full_name: string | null
          email: string | null
          created_at: string
        }
        Insert: {
          id: string
          role?: 'user' | 'organizer' | 'scanner' | 'pr' | 'admin'
          full_name?: string | null
          email?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          role?: 'user' | 'organizer' | 'scanner' | 'pr' | 'admin'
          full_name?: string | null
          email?: string | null
          created_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "profiles_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      events: {
        Row: {
          id: string
          title: string
          description: string | null
          date: string
          location: string
          cover_image_url: string | null
          organizer_id: string
          created_at: string
        }
        Insert: {
          id?: string
          title: string
          description?: string | null
          date: string
          location: string
          cover_image_url?: string | null
          organizer_id: string
          created_at?: string
        }
        Update: {
          id?: string
          title?: string
          description?: string | null
          date?: string
          location?: string
          cover_image_url?: string | null
          organizer_id?: string
          created_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "events_organizer_id_fkey"
            columns: ["organizer_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          }
        ]
      }
      ticket_tiers: {
        Row: {
          id: string
          event_id: string
          name: string
          price: number
          capacity: number
          current_sold: number
          status: 'active' | 'paused' | 'sold_out'
          created_at: string
        }
        Insert: {
          id?: string
          event_id: string
          name: string
          price?: number
          capacity: number
          current_sold?: number
          status?: 'active' | 'paused' | 'sold_out'
          created_at?: string
        }
        Update: {
          id?: string
          event_id?: string
          name?: string
          price?: number
          capacity?: number
          current_sold?: number
          status?: 'active' | 'paused' | 'sold_out'
          created_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "ticket_tiers_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "events"
            referencedColumns: ["id"]
          }
        ]
      }
      tickets: {
        Row: {
          id: string
          event_id: string
          user_id: string
          tier_id: string
          pr_id: string | null
          status: 'valid' | 'scanned' | 'transferred' | 'cancelled'
          price_paid: number
          created_at: string
        }
        Insert: {
          id?: string
          event_id: string
          user_id: string
          tier_id: string
          pr_id?: string | null
          status?: 'valid' | 'scanned' | 'transferred' | 'cancelled'
          price_paid?: number
          created_at?: string
        }
        Update: {
          id?: string
          event_id?: string
          user_id?: string
          tier_id?: string
          pr_id?: string | null
          status?: 'valid' | 'scanned' | 'transferred' | 'cancelled'
          price_paid?: number
          created_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "tickets_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "events"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tickets_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tickets_tier_id_fkey"
            columns: ["tier_id"]
            isOneToOne: false
            referencedRelation: "ticket_tiers"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      buy_ticket: {
        Args: {
          p_event_id: string
          p_tier_id: string
          p_user_id: string
        }
        Returns: string
      }
    }
    Enums: {
      user_role: 'user' | 'organizer' | 'scanner' | 'pr' | 'admin'
      ticket_status: 'valid' | 'scanned' | 'transferred' | 'cancelled'
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
