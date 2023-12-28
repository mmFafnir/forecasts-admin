export interface TypePusher {
  id: number;
  message: string;
  parent_id: number;
  parent_type: string;
  receiver_id: number;
  sender_id: number | null;
  type: string;
}
