import { z } from "zod"

export const songYoutubeVideoIdSchema = z
  .string({ required_error: "필수 항목" })
  .min(5, { message: "최소 5자 이상" })
const basicInfoSchema = z.object({
  performanceId: z.number({ required_error: "필수 항목" }),
  isFreshmenFixed: z.boolean().default(false).optional(),
  songYoutubeVideoId: songYoutubeVideoIdSchema,
  posterImage: z.string().optional(),
  songName: z
    .string({ required_error: "필수 항목" })
    .min(1, { message: "1글자 이상 입력해주세요" }),
  songArtist: z
    .string({ required_error: "필수 항목" })
    .min(1, { message: "1글자 이상 입력해주세요" }),
  isSelfMade: z.boolean().default(false).optional(),
  description: z.string().optional()
})
export default basicInfoSchema
