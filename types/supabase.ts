export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      recommendation_feedback: {
        Row: {
          id: string;
          created_at: string;
          helpful: boolean;
          reasons: string[];
          comment: string | null;
          session_id: string | null;
          recipient: string | null;
          relationship: string | null;
          occasion: string | null;
          age_group: string | null;
          budget: string | null;
          interests: string[];
          personality: string[];
          recommendations: Json;
          page_path: string | null;
        };
        Insert: {
          id?: string;
          created_at?: string;
          helpful: boolean;
          reasons?: string[];
          comment?: string | null;
          session_id?: string | null;
          recipient?: string | null;
          relationship?: string | null;
          occasion?: string | null;
          age_group?: string | null;
          budget?: string | null;
          interests?: string[];
          personality?: string[];
          recommendations?: Json;
          page_path?: string | null;
        };
        Update: never;
      };
    };
  };
}
