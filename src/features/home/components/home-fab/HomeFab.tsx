import { useCallback } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { FabButton } from '@components/Button';
import { Icon } from '@components/Icon';

interface HomeFabProps {
  to?: string;
  bottom?: number;
  right?: number;
}

export default function HomeFab({ to = '/post/new' }: HomeFabProps) {
  const navigate = useNavigate();

  const handleClick = useCallback(() => {
    navigate({ to });
  }, [navigate, to]);

  return (
    <FabButton
      icon={<Icon icon="edit-pen" className="h-5 w-5" />}
      label="글쓰기"
      state="active"
      variant="primary"
      fixed
      position={{ bottom: 250, right: 24 }}
      onClick={handleClick}
      aria-label="글 수정"
      iconPosition="left"
    />
  );
}
