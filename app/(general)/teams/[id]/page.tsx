"use client"

import { StatusCodes } from "http-status-codes"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useSession } from "next-auth/react"
import React, { useEffect, useState } from "react"
import { RiArrowGoBackLine } from "react-icons/ri"

import Loading from "@/app/_(errors)/Loading"
import NotFoundPage from "@/app/_(errors)/NotFound"
import ApplyButton from "@/app/(general)/teams/[id]/_components/ApplyButton"
import BasicInfo from "@/app/(general)/teams/[id]/_components/BasicInfo"
import MemberSessionCard from "@/app/(general)/teams/[id]/_components/MemberSessionCard"
import SessionSetCard from "@/app/(general)/teams/[id]/_components/SessionSetCard"
import SessionBadge from "@/components/SessionBadge"
import API_ENDPOINTS, { ApiEndpoint } from "@/constants/apiEndpoints"
import ROUTES from "@/constants/routes"
import fetchData from "@/lib/fetch"
import YoutubePlayer from "@/lib/youtube/Player"
import { MemberSessionSet, SessionOrder, Team } from "@/types/Team"

interface Props {
  params: {
    id: number
  }
}

const TeamDetail = ({ params }: Props) => {
  const session = useSession()
  const router = useRouter()

  const { id } = params

  const [team, setTeam] = useState<Team | null>()
  useEffect(() => {
    if (session.data?.access) {
      fetchData(API_ENDPOINTS.TEAM.RETRIEVE(id) as ApiEndpoint, {
        cache: "no-cache",
        headers: {
          Authorization: `Bearer ${session.data?.access}`
        }
      }).then(async (res) => {
        if (!res.ok) {
          switch (res.status) {
            case StatusCodes.NOT_FOUND:
              setTeam(null)
              break
            default:
              router.push(ROUTES.HOME.url)
          }
        } else {
          setTeam(await res.json())
        }
      })
    }
  }, [id, session.data?.access, router])

  if (session.status === "unauthenticated") router.push(ROUTES.LOGIN.url)

  if (team === undefined) {
    return <Loading />
  } else if (team === null) {
    return <NotFoundPage />
  }

  const sessionsWithAtleastOneMember = new MemberSessionSet(
    team.memberSessions
  ).getSessionsWithAtleastOneMember()

  return (
    <div className="container pt-16">
      <Link
        href={ROUTES.TEAM.LIST.url}
        className="flex items-center gap-x-5 font-semibold"
      >
        <RiArrowGoBackLine />
        돌아가기
      </Link>
      <h2 className="text-center text-4xl italic">Join Your Team</h2>

      {/* 유튜브 임베드 */}
      <div className="mb-16 mt-6 flex items-center justify-center">
        {team.songYoutubeVideoId && (
          <YoutubePlayer
            videoId={team.songYoutubeVideoId}
            width={750}
            className="aspect-video"
          />
        )}
      </div>

      {/* 기본 정보 */}
      <BasicInfo team={team} accessToken={session.data?.access} />

      {/* 세션 구성 */}
      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
        {/* 세션 구성 */}
        {team.memberSessions && (
          <SessionSetCard header="세션구성">
            <div className="flex items-center gap-x-2">
              {team.memberSessions
                .sort((a, b) => {
                  return (
                    SessionOrder.indexOf(a.session) -
                    SessionOrder.indexOf(b.session)
                  )
                })
                .map((ms) =>
                  ms.members.map((_, index) => {
                    const sessionWithIndex = `${ms.session}${index + 1}`
                    return (
                      <SessionBadge
                        key={sessionWithIndex}
                        session={sessionWithIndex}
                      />
                    )
                  })
                )}
            </div>
          </SessionSetCard>
        )}

        {/* 마감된 세션 */}
        <SessionSetCard header="마감된 세션" className="col-span-2">
          <div className="grid grid-cols-1 gap-x-12 gap-y-4 md:grid-cols-2 xl:grid-cols-3">
            {sessionsWithAtleastOneMember.map((ms) =>
              ms.members.map((member, index) => {
                if (member === null) return
                return (
                  <MemberSessionCard
                    key={`${ms.session}-${index}`}
                    teamId={team.id}
                    session={ms.session}
                    sessionIndex={index + 1}
                    user={member}
                    onUnapplySuccess={setTeam}
                  />
                )
              })
            )}
          </div>
        </SessionSetCard>

        {/* 팀 참여 신청 */}
        <SessionSetCard header="팀 참여 신청" className="col-span-2">
          <ul className="mb-6">
            <li>
              ・아래 버튼을 눌러 해당 팀에 참여 신청을 할 수 있으며, 선착순으로
              마감됩니다
            </li>
            <li>
              ・아래 버튼을 다시 누르거나 마이페이지에 접속하여 신청을 취소할 수
              있습니다
            </li>
          </ul>
          <div className="flex items-center justify-start gap-x-4">
            {team.memberSessions && team.memberSessions?.length > 0 ? (
              team.memberSessions?.map((ms) =>
                ms.members.map(
                  (member, index) =>
                    member === null && (
                      <ApplyButton
                        key={`${ms.session}-${index}`}
                        teamId={team.id}
                        session={ms.session}
                        memberSessionIndex={index + 1}
                        onApplySuccess={setTeam}
                      />
                    )
                )
              )
            ) : (
              <div>마감</div>
            )}
          </div>
        </SessionSetCard>
      </div>
    </div>
  )
}

export default TeamDetail
