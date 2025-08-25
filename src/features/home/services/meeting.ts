export interface MeetingNextResponse {
  postId: number;
  type: 'shopping' | 'sharing';
  place: string;
  time: string; // ISO string
}

export async function fetchNextMeeting(): Promise<MeetingNextResponse | null> {
  const res = await fetch('/me/meetings/next', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      // TODO: 인증이 필요하면 Authorization 헤더 추가
    },
  });

  if (!res.ok) throw new Error('Failed to fetch next meeting');
  const json = await res.json();

  if (!json.success || !json.data) return null;
  return json.data as MeetingNextResponse;
}
