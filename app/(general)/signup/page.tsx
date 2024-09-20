"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import SimpleLabel from "@/components/Form/SimpleLabel"
import SimpleStringField from "@/components/Form/SimpleStringField"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form"
import { signUpSchema } from "@/constants/zodSchema"
import dummySessions from "@/lib/dummy/Session"

const sessions = dummySessions

const Signup = () => {
  const form = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      sessions: []
    }
  })

  function onSubmit(values: z.infer<typeof signUpSchema>) {
    console.log(values)
  }

  return (
    <div className="container">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)} // TODO: 부모 요소인 Form으로 이전
          className="mb-3 w-full space-y-6"
        >
          <SimpleStringField
            form={form}
            name="name"
            label="이름"
            placeholder="김아망"
            description="실명을 입력해주세요."
            required={!(signUpSchema.shape.name instanceof z.ZodOptional)}
          />
          <SimpleStringField
            form={form}
            name="nickname"
            label="닉네임"
            placeholder="베이스 !== 기타"
            description="개성 넘치는 닉네임을 입력해주세요."
            required={!(signUpSchema.shape.nickname instanceof z.ZodOptional)}
          />
          <SimpleStringField
            form={form}
            name="password"
            label="비밀번호"
            description="5~20자, 영문+숫자"
            required={!(signUpSchema.shape.password instanceof z.ZodOptional)}
          />
          <SimpleStringField
            form={form}
            name="confirmPassword"
            label="비밀번호 확인"
            required={
              !(signUpSchema.shape.confirmPassword instanceof z.ZodOptional)
            }
          />

          <SimpleStringField
            form={form}
            name="email"
            label="이메일"
            placeholder="example@g.skku.edu"
            required={!(signUpSchema.shape.email instanceof z.ZodOptional)}
          />

          <FormField
            control={form.control}
            name="sessions"
            render={() => (
              <FormItem>
                <div>
                  <SimpleLabel
                    required={
                      !(signUpSchema.shape.sessions instanceof z.ZodOptional)
                    }
                  >
                    세션
                  </SimpleLabel>
                  <FormDescription>
                    연주 가능한 세션을 선택해주세요.
                  </FormDescription>
                </div>
                {sessions.map((session) => (
                  <FormField
                    key={session.name}
                    control={form.control}
                    name="sessions"
                    render={({ field }) => {
                      return (
                        <FormItem
                          key={session.name}
                          className="flex flex-row items-start space-x-3 space-y-0"
                        >
                          <FormControl>
                            <Checkbox
                              checked={field.value?.includes(session.name)}
                              onCheckedChange={(checked) => {
                                return checked
                                  ? field.onChange([
                                      ...field.value,
                                      session.name
                                    ])
                                  : field.onChange(
                                      field.value?.filter(
                                        (value) => value !== session.name
                                      )
                                    )
                              }}
                            />
                          </FormControl>
                          <FormLabel className="font-normal">
                            {session.name}
                          </FormLabel>
                        </FormItem>
                      )
                    }}
                  />
                ))}
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">회원가입</Button>
        </form>
      </Form>
    </div>
  )
}

export default Signup
