export type ChatMessage = {
  id: string
  room_id: string
  user_id: string
  content: string | null
  image_url?: string | null
  created_at: string
  kind?: 'text' | 'banner'
  payload?: {
    type: 'meetup' | 'settlement'
    location?: string
    timeISO?: string
    note?: string
  } | null
}