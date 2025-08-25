import { useEffect, useState } from 'react';
import { fetchNextMeeting, type MeetingNextResponse } from '../services/meeting';


export function useNextMeeting() {
  const [meeting, setMeeting] = useState<MeetingNextResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const run = async () => {
      try {
        setLoading(true);
        const data = await fetchNextMeeting();
        setMeeting(data);
      } catch (e: any) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    };
    run();
  }, []);

  return { meeting, loading, error };
}
