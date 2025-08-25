// types/settlement.ts
export type Settlement = {
  id: string;
  room_id: string;
  post_id?: string | null;
  title: string;
  status: 'draft' | 'pending' | 'done' | 'canceled';
  total_amount: number;
  payer_id: string;
  created_by: string;
  created_at: string;
};

export type SettlementItem = {
  id: string;
  settlement_id: string;
  name: string;
  price: number;
  quantity: number;
};

export type SettlementMember = {
  id: string;
  settlement_id: string;
  user_id: string;
  share: number;
  accepted: boolean;
  userinfo?: { username?: string | null } | null;
};