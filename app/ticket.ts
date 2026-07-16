export interface TicketResponse {
  category: string;
  priority: string;
  assigned_team: string;
  confidence: string;
  human_review_required: boolean;
  reasoning: string;
}

export interface ClassificationResponse {
  estimated_manual_time: number;
  ai_routing_time: number;
  time_saved_percentage: number;
  issues: TicketResponse[];
}