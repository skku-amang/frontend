import z from "zod"

const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)[A-Za-z\d]+$/

const name = z
  .string({ required_error: "필수 항목", description: "실명을 입력해주세요." })
  .min(2, { message: "최소 2자" })
  .max(10, { message: "최대 10자" })
const nickname = z
  .string({
    required_error: "필수 항목",
    description: "개성 넘치는 닉네임을 입력해주세요."
  })
  .min(2, { message: "최소 2자" })
  .max(10, { message: "최대 10자" })
const email = z
  .string({ required_error: "필수 항목", description: "모든 도메인 가능" })
  .email({ message: "올바른 이메일 형식을 입력해주세요" })
export const password = z
  .string({ required_error: "필수 항목", description: "8~20자, 영문+숫자" })
  .min(8, { message: "8자리 이상 입력해 주세요." })
  .max(20, { message: "20자리 이하 입력해 주세요." })
  .regex(passwordRegex, {
    message: "영문, 숫자를 모두 조합해 주세요."
  })

export const signInSchema = z.object({
  email,
  password
})

export const signUpSchema = z.object({
  name,
  nickname,
  email,
  sessions: z.array(z.number()).min(1, {
    message: "최소 1개의 세션을 선택해주세요."
  }),
  password
})
