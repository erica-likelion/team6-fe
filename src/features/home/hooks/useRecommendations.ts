import { useCallback, useEffect, useState } from 'react';
import { fetchRecommendations } from '../services/recommendation';
import type { RecommendationItem, RecommendationType } from '../services/recommendation';

export function useRecommendations(type?: RecommendationType) {
  const [items, setItems] = useState<RecommendationItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<unknown>(null);

  const refetch = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const list = await fetchRecommendations(type);
      setItems(list);
    } catch (e) {
      setError(e);
    } finally {
      setLoading(false);
    }
  }, [type]);

  useEffect(() => {
    refetch();
  }, [refetch]);

  return { items, loading, error, refetch };
}
