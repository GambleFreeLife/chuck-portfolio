export type Database = {
  public: {
    Tables: {
      intake_submissions: {
        Row: {
          id: string;
          created_at: string | null;
          full_name: string;
          email: string;
          business_name: string;
          business_description: string;
          target_customer: string;
          primary_goal: string;
          offer_description: string;
          benefits: string;
          domain_status: string;
          brand_notes: string | null;
          additional_notes: string | null;
          deadline_preference: string;
          stripe_session_id: string | null;
          stripe_payment_status: string | null;
          paid_at: string | null;
        };
        Insert: {
          id?: string;
          created_at?: string | null;
          full_name: string;
          email: string;
          business_name: string;
          business_description: string;
          target_customer: string;
          primary_goal: string;
          offer_description: string;
          benefits: string;
          domain_status: string;
          brand_notes?: string | null;
          additional_notes?: string | null;
          deadline_preference: string;
          stripe_session_id?: string | null;
          stripe_payment_status?: string | null;
          paid_at?: string | null;
        };
        Update: {
          id?: string;
          created_at?: string | null;
          full_name?: string;
          email?: string;
          business_name?: string;
          business_description?: string;
          target_customer?: string;
          primary_goal?: string;
          offer_description?: string;
          benefits?: string;
          domain_status?: string;
          brand_notes?: string | null;
          additional_notes?: string | null;
          deadline_preference?: string;
          stripe_session_id?: string | null;
          stripe_payment_status?: string | null;
          paid_at?: string | null;
        };
        Relationships: [];
      };
      video_orders: {
        Row: {
          id: string;
          created_at: string | null;
          full_name: string;
          email: string;
          business_name: string;
          brand_offer: string;
          target_audience: string;
          style_preference: string;
          product_type: string;
          stripe_session_id: string | null;
          stripe_subscription_id: string | null;
          stripe_payment_status: string | null;
          paid_at: string | null;
        };
        Insert: {
          id?: string;
          created_at?: string | null;
          full_name: string;
          email: string;
          business_name: string;
          brand_offer: string;
          target_audience: string;
          style_preference: string;
          product_type: string;
          stripe_session_id?: string | null;
          stripe_subscription_id?: string | null;
          stripe_payment_status?: string | null;
          paid_at?: string | null;
        };
        Update: {
          id?: string;
          created_at?: string | null;
          full_name?: string;
          email?: string;
          business_name?: string;
          brand_offer?: string;
          target_audience?: string;
          style_preference?: string;
          product_type?: string;
          stripe_session_id?: string | null;
          stripe_subscription_id?: string | null;
          stripe_payment_status?: string | null;
          paid_at?: string | null;
        };
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
};
