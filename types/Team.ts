import { Performance } from './Performance'
import { Session } from './Session'
import { User } from './User'

export type Team = {
  id: number
  name?: string
  description: string
  is_private: boolean
  leader: User
  performance: Performance
  song: Song
  is_freshmanFixed: boolean
  posterImage?: string
  youtubeVideo?: string // 아망 공식 홈페이지 유튜브 영상
  memberSessions: MemberSession[]
}

export type Song = {
  name: string
  artist: string
  cover_name?: string
  cover_artist?: string
  original_url: string
  cover_url?: string
}

/**
 * 팀의 세션별 멤버 정보
 * @param requiredMemberCount 세션별 필요한 멤버 수
 * 만약 `members`의 길이가 2이고 `requiredMemberCount`가 3이면
 * 해당 세션에 멤버가 2명이 있지만 아직 세션에 멤버가 1명이 부족한 상황
 */
export type MemberSession = {
  session: Session
  members: User[]
  requiredMemberCount: number
}

export class MemberSessionSet {
  private readonly memberSessions: Set<MemberSession>

  constructor(memberSessions: MemberSession[]) {
    this.memberSessions = new Set(memberSessions)
  }

  /**
   * 세션별 필요한 멤버 수를 계산합니다.
   * @param includeFullSessions 충족된 세션도 반환할지 여부(default: false)
   * @returns 세션별 필요한 멤버 수를 모두 더한 값
   * @example
   * const memberSessions = new MemberSessionSet([
   *  {
   *    session: 보컬,
   *    members: [멤버1, 멤버2],
   *    requiredMemberCount: 3
   *  },
   *  {
   *    session: dummySessions[1],
   *    members: [멤버3],
   *    requiredMemberCount: 1
   *  }
   * ])
   *
   * memberSessions.getRequiredSessionsWithMissingUserCount(true)
   * // Map {
   * //   Session 보컬: 1
   * //   Session 기타: 0
   * // }
   * memberSessions.getRequiredSessionsWithMissingUserCount(false)
   * // Map {
   * //   Session 보컬: 1
   * // }
   */
  getRequiredSessionsWithMissingUserCount(
    includeFullSessions = false
  ): Map<Session, number> {
    let requiredSessionsWithMissingUserCount: Map<Session, number> = new Map()
    Array.from(this.memberSessions).map((memberSession) => {
      if (memberSession.members.length < memberSession.requiredMemberCount) {
        requiredSessionsWithMissingUserCount.set(
          memberSession.session,
          memberSession.requiredMemberCount - memberSession.members.length
        )
      } else if (includeFullSessions) {
        requiredSessionsWithMissingUserCount.set(memberSession.session, 0)
      }
    })
    return requiredSessionsWithMissingUserCount
  }

  get isSatisfied(): boolean {
    return this.getRequiredSessionsWithMissingUserCount().size === 0
  }

  static from(memberSessions: MemberSession[]): MemberSessionSet {
    return new MemberSessionSet(memberSessions)
  }
}
