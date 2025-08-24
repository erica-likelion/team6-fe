// 홈 전용 날짜 포맷 유틸 (한국어 고정)
// 파일명/함수명: camelCase

/** 숫자 두 자리 패딩 */
const pad2 = (n: number) => String(n).padStart(2, '0');

/** 안전 변환: Date로 바꾸고 실패 시 null 반환 */
const toDate = (input: string | number | Date): Date | null => {
  const d = input instanceof Date ? input : new Date(input);
  return isNaN(d.getTime()) ? null : d;
};

/**
 * "오늘 HH:mm" 형태로 표기
 * - 예) 14시 5분 -> "오늘 14:05"
 */
export function formatDayTime(input: string | number | Date): string {
  const d = toDate(input);
  if (!d) return '';
  return `오늘 ${pad2(d.getHours())}:${pad2(d.getMinutes())}`;
}

/**
 * 상대 표기:
 * - 오늘: "오늘 HH:mm"
 * - 어제: "어제 HH:mm"
 * - 그 외: "MM/DD HH:mm"
 */
export function formatRelativeDayTime(
  input: string | number | Date,
  now: Date = new Date()
): string {
  const d = toDate(input);
  if (!d) return '';

  const hm = `${pad2(d.getHours())}:${pad2(d.getMinutes())}`;

  const sameDay = d.toDateString() === now.toDateString();
  if (sameDay) return `오늘 ${hm}`;

  const y = new Date(now);
  y.setDate(now.getDate() - 1);
  const isYesterday = d.toDateString() === y.toDateString();
  if (isYesterday) return `어제 ${hm}`;

  return `${pad2(d.getMonth() + 1)}/${pad2(d.getDate())} ${hm}`;
}
