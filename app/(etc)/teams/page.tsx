import Link from "next/link"

import { columns, TeamColumn } from "../../../components/TeamListTable/columns"
import { TeamListDataTable } from "../../../components/TeamListTable/data-table"
import { Badge } from "../../../components/ui/badge"
import ROUTES from "../../../constants/routes"
import { generateDummys } from "../../../lib/dummy"
import { createPerformance } from "../../../lib/dummy/Performance"
import { createTeam } from "../../../lib/dummy/Team"

const TEAMS = generateDummys(45, createTeam)
const rows: TeamColumn[] = TEAMS.map((team) => ({
  id: team.id,
  songName: team.song.name,
  songArtist: team.song.artist,
  leaderName: team.leader.name,
  // requiredSessions: team.song.unsatisfied_sessions,
  cover_url: team.song.cover_url ?? team.song.original_url,
  is_freshmanFixed: team.is_freshmanFixed
}))

// TODO: column visible 선택 기능 -> 세션별 지원자 확인 할 수 있게
// TODO: 검색 기준을 곡명이 아니라 모든 것으로 확장
// TODO: column 너비 조절
// TODO: 필터 -> Dialog로 처리
// TODO: Pagination에서 1,2,3,4,5 등 추가
// TODO: Primary, Secondary 색상 설정
const TeamList = () => {
  const activePerformances = generateDummys(3, createPerformance)

  return (
    <div className="container">
      {/* 팀 배너 */}
      <div className="flex flex-col justify-center items-center">
        <h2 className="text-4xl font-extrabold text-gray-600 mt-24">공연팀 목록</h2>
        <p className="my-8 font-bold">Performances</p>
        <div className="flex gap-x-4">
          {activePerformances.map(p => (
            <Link key={p.id} href={ROUTES.PERFORMANCE.DETAIL.url(p.id.toString())}>
              <Badge
                className="py-1 px-6 bg-slate-200 text-black font-normal text-md rounded-xl">
                {p.name}
              </Badge>
            </Link>
          ))}
        </div>
      </div>

      {/* 팀 목록 테이블 */}
      <TeamListDataTable columns={columns} data={rows} />
    </div>
  )
}

export default TeamList