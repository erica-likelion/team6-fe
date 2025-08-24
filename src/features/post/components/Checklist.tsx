import { Icon } from '@components/Icon';
import { Controller, useFormContext } from 'react-hook-form';

type FormValues = {
  agreement1: boolean;
  agreement2: boolean;
};

export const CheckList = () => {
  const { control } = useFormContext<FormValues>();

  return (
    <div className="flex flex-col gap-[0.88rem]">
      {/* 동의 1 */}
      <div className="flex items-start gap-[0.62rem]">
        <Controller
          name="agreement1"
          control={control}
          defaultValue={false}
          rules={{ validate: (v) => v || '약관에 동의해주세요.' }}
          render={({ field }) => (
            <button
              type="button"
              aria-pressed={field.value}
              onClick={() => field.onChange(!field.value)}
              className={`flex h-[1.375rem] w-[1.375rem] items-center justify-center rounded-[0.6875rem] border ${
                field.value ? 'border-primary-green text-primary-green' : 'border-gray-300 text-gray-300'
              }`}
            >
              <Icon icon="check" width="0.75rem" height="0.75rem" />
            </button>
          )}
        />
        <span className="paragraph-small flex-1 font-light text-gray-500">
          사전에 약속한 장소와 시간을 지키며, 거래 취소 시 (서비스명)의 보증금/환불 규칙을 따르겠습니다.
        </span>
      </div>

      {/* 동의 2 */}
      <div className="flex items-start gap-[0.62rem]">
        <Controller
          name="agreement2"
          control={control}
          defaultValue={false}
          rules={{ validate: (v) => v || '약관에 동의해주세요.' }}
          render={({ field }) => (
            <button
              type="button"
              aria-pressed={field.value}
              onClick={() => field.onChange(!field.value)}
              className={`flex h-[1.375rem] w-[1.375rem] items-center justify-center rounded-[0.6875rem] border ${
                field.value ? 'border-primary-green text-primary-green' : 'border-gray-300 text-gray-300'
              }`}
            >
              <Icon icon="check" width="0.75rem" height="0.75rem" />
            </button>
          )}
        />
        <span className="paragraph-small flex-1 font-light text-gray-500">
          모임을 진행하며 불필요한 개인 신상 요구나 사적인 요청을 하지 않겠습니다.
        </span>
      </div>
    </div>
  );
};
