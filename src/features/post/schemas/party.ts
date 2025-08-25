import z from "zod";

export const partySchema = z.object({
  title: z.string().min(1, "제목을 입력하세요"),
  content: z.string().optional(),
  location: z.string().min(1, "장소를 입력하세요"),
  eventTime: z.string().min(1, "시간을 선택하세요"), // ISO 문자열로 변환 예정
  maxMembers: z.coerce.number().int().min(1, "인원수는 1 이상"),
  itemCodes: z.array(z.string()).min(1, "품목을 1개 이상 선택"),
  photos: z
    .custom<FileList>((v) => v instanceof FileList)
    .transform((fl) => Array.from(fl ?? []))
    .refine((arr) => arr.length <= 10, "사진은 최대 10장")
});

export type PartyFormValues = z.infer<typeof partySchema>;