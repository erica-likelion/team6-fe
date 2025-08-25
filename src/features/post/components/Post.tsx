// features/post/components/Post.tsx
import { Header } from '@components/Header/Header';
import { FormProvider, useForm } from 'react-hook-form';
import { useNavigate, useSearch } from '@tanstack/react-router';

import { PartyBoard } from '@features/post/components/PartyBoard';
import { ItemBoard } from '@features/post/components/ItemBoard';

import { createParty, type CreatePartyInput } from '@services/post/party/supabase';
import { createItem, type CreateItemInput } from '@services/post/item/supabase';

type CommonValues = {
  title: string;
  content?: string;
  location: string;
  maxMembers: number;
  photos?: FileList;
  agreement1: boolean;
  agreement2: boolean;
};

// PARTY 전용
type PartyValues = CommonValues & {
  type: 'party';
  eventTime: string; // datetime-local
  itemCodes: string[]; // 품목 코드들
};

// ITEM 전용
type ItemValues = CommonValues & {
  type: 'item';
  price: number; // 희망 가격
  receipts?: FileList; // 구매내역/영수증 파일들
};

type FormValues = PartyValues | ItemValues;

export const Post = () => {
  // /post?type=party | /post?type=item
  const { type } = useSearch({ from: '/post/write/' }) as { type?: 'party' | 'item' };
  const isParty = (type ?? 'party') === 'party';
  const navigate = useNavigate();
  const methods = useForm<FormValues>({
    mode: 'onChange',
    defaultValues: (isParty
      ? {
          type: 'party',
          title: '',
          content: '',
          location: '',
          eventTime: '',
          maxMembers: 5,
          itemCodes: [],
          agreement1: false,
          agreement2: false,
        }
      : {
          type: 'item',
          title: '',
          content: '',
          location: '',
          maxMembers: 5,
          price: 0,
          agreement1: false,
          agreement2: false,
        }) as FormValues,
  });

  const {
    handleSubmit,
    formState: { isSubmitting, isValid },
  } = methods;

  const onSubmit = async (values: FormValues) => {
    try {
      if (!values.agreement1 || !values.agreement2) {
        alert('약관에 동의해 주세요.');
        return;
      }

      if (values.type === 'party') {
        const v = values as PartyValues;
        const iso =
          v.eventTime && !Number.isNaN(Date.parse(v.eventTime))
            ? new Date(v.eventTime).toISOString()
            : new Date().toISOString();
        const files = v.photos ? Array.from(v.photos) : [];

        await createParty({
          title: v.title.trim(),
          content: v.content?.trim(),
          location: v.location.trim(),
          eventTime: iso,
          maxMembers: v.maxMembers,
          itemCodes: v.itemCodes,
          photos: files,
        } satisfies CreatePartyInput);
      } else {
        const v = values as ItemValues;
        const photos = v.photos ? Array.from(v.photos) : [];
        const receipts = v.receipts ? Array.from(v.receipts) : [];

        await createItem({
          title: v.title.trim(),
          content: v.content?.trim(),
          location: v.location.trim(),
          maxMembers: v.maxMembers,
          price: v.price,
          photos,
          receipts,
        } satisfies CreateItemInput);
      }

      navigate({ to: '/home' });
    } catch (e) {
      const message = e instanceof Error ? e.message : typeof e === 'string' ? e : '등록 중 오류가 발생했습니다.';
      alert(message);
    }
  };

  return (
    <div className="bg-primary-bg absolute z-51 flex h-dvh w-dvw flex-col overflow-y-scroll">
      <div className="bg-primary-bg sticky top-0 z-20">
        <Header title={`게시글 작성하기`} isMenu={false} />
      </div>

      <FormProvider {...methods}>
        <div className="flex-1 overflow-y-auto">
          {isParty ? (
            <PartyBoard isValid={isValid} onSubmit={handleSubmit(onSubmit)} submitting={isSubmitting} />
          ) : (
            <ItemBoard isValid={isValid} onSubmit={handleSubmit(onSubmit)} submitting={isSubmitting} />
          )}
        </div>
      </FormProvider>
    </div>
  );
};
