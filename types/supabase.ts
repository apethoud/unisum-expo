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
      grid_cells: {
        Row: {
          created_at: string
          grid_index: number | null
          id: number
          is_selected: boolean | null
          level_id: number | null
          value: number | null
        }
        Insert: {
          created_at?: string
          grid_index?: number | null
          id?: number
          is_selected?: boolean | null
          level_id?: number | null
          value?: number | null
        }
        Update: {
          created_at?: string
          grid_index?: number | null
          id?: number
          is_selected?: boolean | null
          level_id?: number | null
          value?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "grid_cells_level_id_fkey"
            columns: ["level_id"]
            referencedRelation: "levels"
            referencedColumns: ["id"]
          }
        ]
      }
      levels: {
        Row: {
          created_at: string
          id: number
          level_number: number | null
          target_number: number | null
          tier_id: number | null
        }
        Insert: {
          created_at?: string
          id?: number
          level_number?: number | null
          target_number?: number | null
          tier_id?: number | null
        }
        Update: {
          created_at?: string
          id?: number
          level_number?: number | null
          target_number?: number | null
          tier_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "levels_tier_id_fkey"
            columns: ["tier_id"]
            referencedRelation: "tiers"
            referencedColumns: ["id"]
          }
        ]
      }
      math_options: {
        Row: {
          created_at: string
          id: number
          is_available: boolean | null
          level_id: number | null
          value: number | null
        }
        Insert: {
          created_at?: string
          id?: number
          is_available?: boolean | null
          level_id?: number | null
          value?: number | null
        }
        Update: {
          created_at?: string
          id?: number
          is_available?: boolean | null
          level_id?: number | null
          value?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "math_options_level_id_fkey"
            columns: ["level_id"]
            referencedRelation: "levels"
            referencedColumns: ["id"]
          }
        ]
      }
      tiers: {
        Row: {
          created_at: string
          id: number
          is_enabled: boolean | null
          name: string | null
          theme_color: string | null
        }
        Insert: {
          created_at?: string
          id?: number
          is_enabled?: boolean | null
          name?: string | null
          theme_color?: string | null
        }
        Update: {
          created_at?: string
          id?: number
          is_enabled?: boolean | null
          name?: string | null
          theme_color?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}