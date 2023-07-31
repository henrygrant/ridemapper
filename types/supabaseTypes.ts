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
      activities: {
        Row: {
          activity_id: number
          created_at: string
          distance: number | null
          elapsed_time: number | null
          elevation_gain: number | null
          moving_time: number | null
          name: string | null
          polyline: string | null
          start_date: string | null
          type: string | null
          updated_at: string
          user_id: string
          utc_offset: number | null
        }
        Insert: {
          activity_id: number
          created_at?: string
          distance?: number | null
          elapsed_time?: number | null
          elevation_gain?: number | null
          moving_time?: number | null
          name?: string | null
          polyline?: string | null
          start_date?: string | null
          type?: string | null
          updated_at?: string
          user_id: string
          utc_offset?: number | null
        }
        Update: {
          activity_id?: number
          created_at?: string
          distance?: number | null
          elapsed_time?: number | null
          elevation_gain?: number | null
          moving_time?: number | null
          name?: string | null
          polyline?: string | null
          start_date?: string | null
          type?: string | null
          updated_at?: string
          user_id?: string
          utc_offset?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "activities_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      test: {
        Row: {
          created_at: string | null
          id: number
          thing: string | null
        }
        Insert: {
          created_at?: string | null
          id?: number
          thing?: string | null
        }
        Update: {
          created_at?: string | null
          id?: number
          thing?: string | null
        }
        Relationships: []
      }
      user_meta: {
        Row: {
          created_at: string | null
          strava_access_token: string | null
          strava_firstname: string | null
          strava_id: string | null
          strava_lastname: string | null
          strava_profile_pic_url: string | null
          strava_refresh_token: string | null
          strava_token_expires_at: number | null
          strava_token_expires_in: number | null
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string | null
          strava_access_token?: string | null
          strava_firstname?: string | null
          strava_id?: string | null
          strava_lastname?: string | null
          strava_profile_pic_url?: string | null
          strava_refresh_token?: string | null
          strava_token_expires_at?: number | null
          strava_token_expires_in?: number | null
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string | null
          strava_access_token?: string | null
          strava_firstname?: string | null
          strava_id?: string | null
          strava_lastname?: string | null
          strava_profile_pic_url?: string | null
          strava_refresh_token?: string | null
          strava_token_expires_at?: number | null
          strava_token_expires_in?: number | null
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_meta_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
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
