export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      "#1": {
        Row: {
          app_metadata: Json | null
          blocked: boolean | null
          created_at: Json | null
          email: string | null
          email_verified: boolean | null
          family_name: string | null
          given_name: string | null
          identities: Json | null
          last_ip: string | null
          last_login: Json | null
          logins_count: number | null
          multifactor: Json | null
          name: string | null
          nickname: string | null
          phone_number: string | null
          phone_verified: boolean | null
          picture: string | null
          updated_at: Json | null
          user_id: string | null
          user_metadata: Json | null
          username: string | null
        }
        Insert: {
          app_metadata?: Json | null
          blocked?: boolean | null
          created_at?: Json | null
          email?: string | null
          email_verified?: boolean | null
          family_name?: string | null
          given_name?: string | null
          identities?: Json | null
          last_ip?: string | null
          last_login?: Json | null
          logins_count?: number | null
          multifactor?: Json | null
          name?: string | null
          nickname?: string | null
          phone_number?: string | null
          phone_verified?: boolean | null
          picture?: string | null
          updated_at?: Json | null
          user_id?: string | null
          user_metadata?: Json | null
          username?: string | null
        }
        Update: {
          app_metadata?: Json | null
          blocked?: boolean | null
          created_at?: Json | null
          email?: string | null
          email_verified?: boolean | null
          family_name?: string | null
          given_name?: string | null
          identities?: Json | null
          last_ip?: string | null
          last_login?: Json | null
          logins_count?: number | null
          multifactor?: Json | null
          name?: string | null
          nickname?: string | null
          phone_number?: string | null
          phone_verified?: boolean | null
          picture?: string | null
          updated_at?: Json | null
          user_id?: string | null
          user_metadata?: Json | null
          username?: string | null
        }
        Relationships: []
      }
      activities: {
        Row: {
          achievements: Json | null
          calories: number | null
          created_at: string
          date: string
          distance: number
          duration: number
          elevation: number | null
          id: string
          pace: number
          route: Json
          speed: number
          type: string
          user_id: string
        }
        Insert: {
          achievements?: Json | null
          calories?: number | null
          created_at?: string
          date?: string
          distance: number
          duration: number
          elevation?: number | null
          id?: string
          pace: number
          route: Json
          speed: number
          type: string
          user_id: string
        }
        Update: {
          achievements?: Json | null
          calories?: number | null
          created_at?: string
          date?: string
          distance?: number
          duration?: number
          elevation?: number | null
          id?: string
          pace?: number
          route?: Json
          speed?: number
          type?: string
          user_id?: string
        }
        Relationships: []
      }
      analytics: {
        Row: {
          id: string
          metric_name: string
          metric_value: number
          project_id: string | null
          recorded_at: string
          user_id: string | null
        }
        Insert: {
          id?: string
          metric_name: string
          metric_value: number
          project_id?: string | null
          recorded_at?: string
          user_id?: string | null
        }
        Update: {
          id?: string
          metric_name?: string
          metric_value?: number
          project_id?: string | null
          recorded_at?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "analytics_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
      api_requests: {
        Row: {
          created_at: string
          endpoint: string
          id: string
          params: Json
          response: Json | null
          service_name: string
          status: string
          user_id: string
        }
        Insert: {
          created_at?: string
          endpoint: string
          id?: string
          params: Json
          response?: Json | null
          service_name: string
          status: string
          user_id: string
        }
        Update: {
          created_at?: string
          endpoint?: string
          id?: string
          params?: Json
          response?: Json | null
          service_name?: string
          status?: string
          user_id?: string
        }
        Relationships: []
      }
      bikes: {
        Row: {
          active: boolean
          created_at: string
          efficiency: number
          id: string
          last_maintenance: string
          model: string
          updated_at: string
          user_id: string
        }
        Insert: {
          active?: boolean
          created_at?: string
          efficiency?: number
          id?: string
          last_maintenance?: string
          model: string
          updated_at?: string
          user_id: string
        }
        Update: {
          active?: boolean
          created_at?: string
          efficiency?: number
          id?: string
          last_maintenance?: string
          model?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      chatbot_conversations: {
        Row: {
          content: string
          created_at: string
          id: string
          model_name: string
          response: string | null
          user_id: string
        }
        Insert: {
          content: string
          created_at?: string
          id?: string
          model_name: string
          response?: string | null
          user_id: string
        }
        Update: {
          content?: string
          created_at?: string
          id?: string
          model_name?: string
          response?: string | null
          user_id?: string
        }
        Relationships: []
      }
      cities: {
        Row: {
          country_id: number
          id: number
          name: string
        }
        Insert: {
          country_id: number
          id?: never
          name: string
        }
        Update: {
          country_id?: number
          id?: never
          name?: string
        }
        Relationships: [
          {
            foreignKeyName: "cities_country_id_fkey"
            columns: ["country_id"]
            isOneToOne: false
            referencedRelation: "countries"
            referencedColumns: ["id"]
          },
        ]
      }
      conversations: {
        Row: {
          created_at: string
          id: string
          title: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          title: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          title?: string
          user_id?: string
        }
        Relationships: []
      }
      countries: {
        Row: {
          code: string
          id: number
          name: string
        }
        Insert: {
          code: string
          id?: never
          name: string
        }
        Update: {
          code?: string
          id?: never
          name?: string
        }
        Relationships: []
      }
      deployments: {
        Row: {
          created_at: string
          id: string
          project_id: string | null
          status: string
          updated_at: string
          url: string | null
          version: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          project_id?: string | null
          status: string
          updated_at?: string
          url?: string | null
          version?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          project_id?: string | null
          status?: string
          updated_at?: string
          url?: string | null
          version?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "deployments_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
      fitness_activities: {
        Row: {
          activity_type: string
          created_at: string
          distance_km: number
          duration_minutes: number
          end_time: string
          id: string
          route_data: Json | null
          source: string
          start_time: string
          user_id: string
        }
        Insert: {
          activity_type: string
          created_at?: string
          distance_km: number
          duration_minutes: number
          end_time: string
          id?: string
          route_data?: Json | null
          source?: string
          start_time: string
          user_id: string
        }
        Update: {
          activity_type?: string
          created_at?: string
          distance_km?: number
          duration_minutes?: number
          end_time?: string
          id?: string
          route_data?: Json | null
          source?: string
          start_time?: string
          user_id?: string
        }
        Relationships: []
      }
      messages: {
        Row: {
          content: string
          conversation_id: string
          created_at: string
          id: string
          is_bot: boolean
          user_id: string
        }
        Insert: {
          content: string
          conversation_id: string
          created_at?: string
          id?: string
          is_bot?: boolean
          user_id: string
        }
        Update: {
          content?: string
          conversation_id?: string
          created_at?: string
          id?: string
          is_bot?: boolean
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "messages_conversation_id_fkey"
            columns: ["conversation_id"]
            isOneToOne: false
            referencedRelation: "conversations"
            referencedColumns: ["id"]
          },
        ]
      }
      network_stats: {
        Row: {
          block_height: string
          gas_price: string
          id: string
          status: string | null
          transaction_pool: string
          updated_at: string
          validators: string
        }
        Insert: {
          block_height: string
          gas_price: string
          id?: string
          status?: string | null
          transaction_pool: string
          updated_at?: string
          validators: string
        }
        Update: {
          block_height?: string
          gas_price?: string
          id?: string
          status?: string | null
          transaction_pool?: string
          updated_at?: string
          validators?: string
        }
        Relationships: []
      }
      nft_ownership: {
        Row: {
          acquired_at: string
          contract_address: string
          id: string
          token_id: string
          user_id: string | null
        }
        Insert: {
          acquired_at?: string
          contract_address: string
          id?: string
          token_id: string
          user_id?: string | null
        }
        Update: {
          acquired_at?: string
          contract_address?: string
          id?: string
          token_id?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "nft_ownership_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      nfts: {
        Row: {
          attributes: Json | null
          created_at: string
          description: string | null
          id: string
          image: string
          name: string
          rarity: string | null
          token_id: string
          user_id: string
        }
        Insert: {
          attributes?: Json | null
          created_at?: string
          description?: string | null
          id?: string
          image: string
          name: string
          rarity?: string | null
          token_id: string
          user_id: string
        }
        Update: {
          attributes?: Json | null
          created_at?: string
          description?: string | null
          id?: string
          image?: string
          name?: string
          rarity?: string | null
          token_id?: string
          user_id?: string
        }
        Relationships: []
      }
      pricing_plans: {
        Row: {
          created_at: string
          description: string
          features: Json
          id: string
          name: string
          price_monthly: number
          price_yearly: number
        }
        Insert: {
          created_at?: string
          description: string
          features: Json
          id?: string
          name: string
          price_monthly: number
          price_yearly: number
        }
        Update: {
          created_at?: string
          description?: string
          features?: Json
          id?: string
          name?: string
          price_monthly?: number
          price_yearly?: number
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          balance: number | null
          created_at: string
          id: string
          level: number | null
          pending_rewards: number | null
          total_distance: number | null
          total_rewards: number | null
          total_runs: number | null
          updated_at: string | null
          username: string
          wallet_address: string | null
        }
        Insert: {
          avatar_url?: string | null
          balance?: number | null
          created_at?: string
          id: string
          level?: number | null
          pending_rewards?: number | null
          total_distance?: number | null
          total_rewards?: number | null
          total_runs?: number | null
          updated_at?: string | null
          username: string
          wallet_address?: string | null
        }
        Update: {
          avatar_url?: string | null
          balance?: number | null
          created_at?: string
          id?: string
          level?: number | null
          pending_rewards?: number | null
          total_distance?: number | null
          total_rewards?: number | null
          total_runs?: number | null
          updated_at?: string | null
          username?: string
          wallet_address?: string | null
        }
        Relationships: []
      }
      projects: {
        Row: {
          created_at: string
          description: string | null
          id: string
          name: string
          status: string | null
          updated_at: string
          user_id: string | null
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          name: string
          status?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          name?: string
          status?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Relationships: []
      }
      runs: {
        Row: {
          average_speed: number | null
          created_at: string
          distance: number
          duration: number
          id: string
          nft_points: number | null
          path: Json | null
          user_id: string
        }
        Insert: {
          average_speed?: number | null
          created_at?: string
          distance: number
          duration: number
          id?: string
          nft_points?: number | null
          path?: Json | null
          user_id: string
        }
        Update: {
          average_speed?: number | null
          created_at?: string
          distance?: number
          duration?: number
          id?: string
          nft_points?: number | null
          path?: Json | null
          user_id?: string
        }
        Relationships: []
      }
      staking_options: {
        Row: {
          apy: number
          created_at: string
          description: string
          duration: number
          id: string
          min_amount: number
          name: string
        }
        Insert: {
          apy: number
          created_at?: string
          description: string
          duration: number
          id: string
          min_amount: number
          name: string
        }
        Update: {
          apy?: number
          created_at?: string
          description?: string
          duration?: number
          id?: string
          min_amount?: number
          name?: string
        }
        Relationships: []
      }
      system_statuses: {
        Row: {
          component_name: string
          created_at: string
          id: string
          status: string
          status_message: string
          system_name: string
          updated_at: string
          user_id: string | null
        }
        Insert: {
          component_name: string
          created_at?: string
          id?: string
          status: string
          status_message: string
          system_name: string
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          component_name?: string
          created_at?: string
          id?: string
          status?: string
          status_message?: string
          system_name?: string
          updated_at?: string
          user_id?: string | null
        }
        Relationships: []
      }
      tasks: {
        Row: {
          created_at: string
          description: string | null
          id: string
          is_completed: boolean
          title: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          is_completed?: boolean
          title: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          is_completed?: boolean
          title?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      transactions: {
        Row: {
          amount: string
          created_at: string
          hash: string | null
          id: string
          recipient_address: string
          status: string | null
          type: string | null
          user_id: string
          wallet_address: string
        }
        Insert: {
          amount: string
          created_at?: string
          hash?: string | null
          id?: string
          recipient_address: string
          status?: string | null
          type?: string | null
          user_id: string
          wallet_address: string
        }
        Update: {
          amount?: string
          created_at?: string
          hash?: string | null
          id?: string
          recipient_address?: string
          status?: string | null
          type?: string | null
          user_id?: string
          wallet_address?: string
        }
        Relationships: []
      }
      user_api_keys: {
        Row: {
          api_key: string
          created_at: string
          id: string
          is_active: boolean | null
          service_name: string
          updated_at: string
          user_id: string
        }
        Insert: {
          api_key: string
          created_at?: string
          id?: string
          is_active?: boolean | null
          service_name: string
          updated_at?: string
          user_id: string
        }
        Update: {
          api_key?: string
          created_at?: string
          id?: string
          is_active?: boolean | null
          service_name?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      user_profiles: {
        Row: {
          avatar_url: string | null
          created_at: string
          email: string
          full_name: string | null
          id: string
          updated_at: string
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          email: string
          full_name?: string | null
          id: string
          updated_at?: string
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          email?: string
          full_name?: string | null
          id?: string
          updated_at?: string
        }
        Relationships: []
      }
      user_stakes: {
        Row: {
          amount: number
          created_at: string
          end_date: string | null
          id: string
          option_id: string
          start_date: string
          status: string
          user_id: string
        }
        Insert: {
          amount: number
          created_at?: string
          end_date?: string | null
          id?: string
          option_id: string
          start_date?: string
          status?: string
          user_id: string
        }
        Update: {
          amount?: number
          created_at?: string
          end_date?: string | null
          id?: string
          option_id?: string
          start_date?: string
          status?: string
          user_id?: string
        }
        Relationships: []
      }
      user_subscriptions: {
        Row: {
          canceled_at: string | null
          created_at: string
          current_period_end: string
          current_period_start: string
          id: string
          is_active: boolean | null
          plan_id: string
          user_id: string
        }
        Insert: {
          canceled_at?: string | null
          created_at?: string
          current_period_end: string
          current_period_start: string
          id?: string
          is_active?: boolean | null
          plan_id: string
          user_id: string
        }
        Update: {
          canceled_at?: string | null
          created_at?: string
          current_period_end?: string
          current_period_start?: string
          id?: string
          is_active?: boolean | null
          plan_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_subscriptions_plan_id_fkey"
            columns: ["plan_id"]
            isOneToOne: false
            referencedRelation: "pricing_plans"
            referencedColumns: ["id"]
          },
        ]
      }
      wallets: {
        Row: {
          address: string
          balance: string | null
          created_at: string
          id: string
          transactions_count: number | null
          updated_at: string
          user_id: string
        }
        Insert: {
          address: string
          balance?: string | null
          created_at?: string
          id?: string
          transactions_count?: number | null
          updated_at?: string
          user_id: string
        }
        Update: {
          address?: string
          balance?: string | null
          created_at?: string
          id?: string
          transactions_count?: number | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      wordpress_sites: {
        Row: {
          created_at: string
          id: string
          name: string
          owner: string
          url: string
        }
        Insert: {
          created_at?: string
          id?: string
          name: string
          owner: string
          url: string
        }
        Update: {
          created_at?: string
          id?: string
          name?: string
          owner?: string
          url?: string
        }
        Relationships: []
      }
      workflow_metrics: {
        Row: {
          created_at: string
          id: string
          metric_name: string
          metric_value: number
          trend_is_positive: boolean | null
          trend_value: number | null
          updated_at: string
          user_id: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          metric_name: string
          metric_value: number
          trend_is_positive?: boolean | null
          trend_value?: number | null
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          metric_name?: string
          metric_value?: number
          trend_is_positive?: boolean | null
          trend_value?: number | null
          updated_at?: string
          user_id?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_current_network_stats: {
        Args: Record<PropertyKey, never>
        Returns: {
          status: string
          block_height: string
          gas_price: string
          validators: string
          transaction_pool: string
          updated_at: string
        }[]
      }
      get_messages_for_conversation: {
        Args: { conversation_id: number } | { conversation_id: string }
        Returns: {
          message_id: number
          content: string
          created_at: string
        }[]
      }
      get_user_api_key: {
        Args: Record<PropertyKey, never> | { service: string }
        Returns: string
      }
      get_user_data: {
        Args: Record<PropertyKey, never>
        Returns: {
          full_name: string
          avatar_url: string
        }[]
      }
      update_system_status: {
        Args: {
          p_user_id: string
          p_system_name: string
          p_component_name: string
          p_status: string
          p_status_message: string
        }
        Returns: {
          component_name: string
          created_at: string
          id: string
          status: string
          status_message: string
          system_name: string
          updated_at: string
          user_id: string | null
        }
      }
      update_workflow_metric: {
        Args:
          | Record<PropertyKey, never>
          | {
              p_user_id: string
              p_metric_name: string
              p_metric_value: number
              p_trend_value?: number
              p_trend_is_positive?: boolean
            }
        Returns: undefined
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
