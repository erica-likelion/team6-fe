// src/features/home/components/shortcut-cards/ShortcutCards.tsx
import { useNavigate } from '@tanstack/react-router';
import { CardButton } from '@components/Button/card-button/CardButton';
import groceryTint from '@assets/images/64_GroceryTint.webp';
import carrot from '@assets/images/64_IngredientsTint.webp';

export default function ShortcutCards() {
  const navigate = useNavigate();

  const goGroupList = (type: 'mart' | 'division') => {
    navigate({
      to: '/group-list/$type',
      params: { type },
    });
  };

  return (
    <div className="flex justify-center">
      <div className="grid w-[343px] grid-cols-2 gap-3">
        {/* 좌측 카드 */}
        <CardButton
          title="장보기 소분 모임"
          description="한 번에 장보고 싶을 때"
          onClick={() => goGroupList('mart')}
          variant="right-graphic"
          graphic={{ src: groceryTint, size: 72, position: 'bottom-right' }}
          width={167}
          height={144}
          radius={28}
        />

        {/* 우측 카드 */}
        <CardButton
          title="품목 별 소분"
          description="필요한 물건만 소분할 때"
          onClick={() => goGroupList('division')}
          variant="right-graphic"
          graphic={{ src: carrot, size: 72, position: 'bottom-right' }}
          width={167}
          height={144}
          radius={28}
        />
      </div>
    </div>
  );
}
