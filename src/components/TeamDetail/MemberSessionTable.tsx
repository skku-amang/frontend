'use client'

import { useForm } from 'react-hook-form'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'

import { MemberSession, Team } from '../../../types/Team'
import { User } from '../../../types/User'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { useState } from 'react'
import { FaSpinner } from 'react-icons/fa'

interface FormData {
  teamId: number
  sessionId: number
  sessionMemberIndex: number
}

interface SubmitButtonProps {
  teamId: number
  sessionId: number
  sessionMemberIndex: number
  initialMode: 'signup' | 'cancel'
}

const SubmitButton = ({ teamId, sessionId, sessionMemberIndex, initialMode }: SubmitButtonProps) => {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting }
  } = useForm<FormData>({
    defaultValues: { teamId, sessionId, sessionMemberIndex }
  })

  const [mode, setMode] = useState<'signup' | 'cancel'>(initialMode)

  async function onSubmit(data: FormData) {
    console.log(data)
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setMode(mode === 'signup' ? 'cancel' : 'signup')
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Input type="hidden" {...register('teamId')} />
      <Input type="hidden" {...register('sessionId')} />
      <Input type="hidden" {...register('sessionMemberIndex')} />

      <Button type="submit" disabled={isSubmitting} variant={mode === 'signup' ? 'default' : 'destructive'}>
        {isSubmitting ? <FaSpinner className='animate-spin' /> : mode === 'signup' ? '참가' : '탈퇴'}
      </Button>
    </form>
  )
}

interface MemberSessionTableRowProps {
  team: Team
  memberSession: MemberSession
  largestRequiredMemberCount: number
  leader: User
}

const MemberSessionTableRow = ({
  team,
  memberSession,
  largestRequiredMemberCount,
  leader
}: MemberSessionTableRowProps) => {
  const memberName = (member: User) => (member.id === leader.id ? `${member.name}(리더)` : member.name)
  const isOccupied = (index: number, memberSession: MemberSession) => index < memberSession.members.length
  const isApplied = (index: number, memberSession: MemberSession) => {
    // const currentUserId = 1;  // TODO: 나중에 로그인 한 유저로 수정
    // return memberSession.members[index].id === currentUserId
    return index === 1 // 일단은 두번째 유저를 신청한 것으로 가정
  }
  const isMissing = (index: number, memberSession: MemberSession) => index < memberSession.requiredMemberCount

  return (
    <TableRow>
      <TableCell>
        {memberSession.session.name}({memberSession.members.length}/{memberSession.requiredMemberCount})
      </TableCell>
      {Array.from({ length: largestRequiredMemberCount }, (_, index) => (
        <TableCell key={index} className="text-center">
          {isOccupied(index, memberSession) ? (
            isApplied(index, memberSession) ? (
              <SubmitButton
                teamId={team.id}
                sessionId={memberSession.session.id}
                sessionMemberIndex={index}
                initialMode="cancel"
              />
            ) : (
              memberName(memberSession.members[index])
            )
          ) : isMissing(index, memberSession) ? (
            <SubmitButton
              teamId={team.id}
              sessionId={memberSession.session.id}
              sessionMemberIndex={index}
              initialMode="signup"
            />
          ) : (
            'X'
          )}
        </TableCell>
      ))}
    </TableRow>
  )
}

interface MemberSessionTableProps {
  team: Team
  memberSessions: MemberSession[]
  leader: User
}

const MemberSessionTable = ({ team, memberSessions, leader }: MemberSessionTableProps) => {
  const largestRequiredMemberCount = Math.max(
    ...memberSessions.map((memberSession) => memberSession.requiredMemberCount)
  )

  return (
    <Card>
      <CardHeader>
        <CardTitle>멤버 목록</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">세션</TableHead>
              {Array.from({ length: largestRequiredMemberCount }, (_, index) => (
                <TableHead key={index} className="text-center">
                  {index + 1}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {memberSessions.map((memberSession) => (
              <MemberSessionTableRow
                team={team}
                key={memberSession.session.id}
                memberSession={memberSession}
                largestRequiredMemberCount={largestRequiredMemberCount}
                leader={leader}
              />
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}

export default MemberSessionTable