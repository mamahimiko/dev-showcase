export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.18"
  }
  public: {
    Tables: {
      Categories: {
        Row: {
          category: string
          created_at: string
          id: string
          slug: string
        }
        Insert: {
          category: string
          created_at?: string
          id?: string
          slug: string
        }
        Update: {
          category?: string
          created_at?: string
          id?: string
          slug?: string
        }
        Relationships: []
      }
      Comments: {
        Row: {
          content: string
          created_at: string
          id: string
          parent_id: string | null
          postid: string
          userid: string
        }
        Insert: {
          content: string
          created_at?: string
          id?: string
          parent_id?: string | null
          postid: string
          userid: string
        }
        Update: {
          content?: string
          created_at?: string
          id?: string
          parent_id?: string | null
          postid?: string
          userid?: string
        }
        Relationships: [
          {
            foreignKeyName: "Comments_parent_id_fkey"
            columns: ["parent_id"]
            isOneToOne: false
            referencedRelation: "Comments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "comments_postid_fkey"
            columns: ["postid"]
            isOneToOne: false
            referencedRelation: "Posts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "comments_userid_fkey"
            columns: ["userid"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      PostImages: {
        Row: {
          created_at: string
          id: string
          image_url: string
          post_id: string
          sort_order: number
          storage_path: string
        }
        Insert: {
          created_at?: string
          id?: string
          image_url: string
          post_id: string
          sort_order?: number
          storage_path: string
        }
        Update: {
          created_at?: string
          id?: string
          image_url?: string
          post_id?: string
          sort_order?: number
          storage_path?: string
        }
        Relationships: [
          {
            foreignKeyName: "PostImages_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "Posts"
            referencedColumns: ["id"]
          },
        ]
      }
      Posts: {
        Row: {
          author: string
          category_id: string
          content: string | null
          created_at: string
          github_url: string | null
          id: string
          image: string | null
          slug: string
          title: string
          user_id: string | null
          website_url: string | null
        }
        Insert: {
          author: string
          category_id: string
          content?: string | null
          created_at?: string
          github_url?: string | null
          id?: string
          image?: string | null
          slug: string
          title: string
          user_id?: string | null
          website_url?: string | null
        }
        Update: {
          author?: string
          category_id?: string
          content?: string | null
          created_at?: string
          github_url?: string | null
          id?: string
          image?: string | null
          slug?: string
          title?: string
          user_id?: string | null
          website_url?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "Posts_author_fkey"
            columns: ["author"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["username"]
          },
          {
            foreignKeyName: "posts_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "Categories"
            referencedColumns: ["id"]
          },
        ]
      }
      users: {
        Row: {
          avatar: string | null
          bio: string
          career: string
          created_at: string
          email: string
          id: string
          username: string
        }
        Insert: {
          avatar?: string | null
          bio: string
          career: string
          created_at?: string
          email: string
          id?: string
          username: string
        }
        Update: {
          avatar?: string | null
          bio?: string
          career?: string
          created_at?: string
          email?: string
          id?: string
          username?: string
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

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends (DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never) = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends (PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never) = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
