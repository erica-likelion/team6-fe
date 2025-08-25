
/** 숫자 두 자리 패딩 */
const pad2 = (n: number) => String(n).padStart(2, '0');


const toDate = (input: string | number | Date): Date | null => {
  const d = input instanceof Date ? input : new Date(input);
  return isNaN(d.getTime()) ? null : d;
};


export function formatDayTime(input: string | number | Date): string {
  const d = toDate(input);
  if (!d) return '';
  return `오늘 ${pad2(d.getHours())}:${pad2(d.getMinutes())}`;
}


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
