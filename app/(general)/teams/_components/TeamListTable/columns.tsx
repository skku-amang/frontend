"use client"

import { ColumnDef } from "@tanstack/react-table"
import {
  ArrowUpDown,
  EllipsisVertical,
  Paperclip,
  Pencil,
  Trash
} from "lucide-react"
import Link from "next/link"
import React from "react"

import DeleteButton from "@/app/(general)/teams/_components/TeamListTable/DeleteButton"
import SessionBadge from "@/components/SessionBadge"
import StatusBadge from "@/components/StatusBadge"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
import ROUTES from "@/constants/routes"
import { MemberSession, MemberSessionSet } from "@/types/Team"

export type TeamColumn = {
  id: number
  songName: string
  songArtist: string
  leaderName?: string
  memberSessions?: MemberSession[]
  songYoutubeVideoId?: string
  isFreshmanFixed: boolean
}

const SortButton = ({
  column,
  children
}: {
  column: any
  children: React.ReactNode
}) => {
  return (
    <Button
      variant="ghost"
      onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
    >
      {children}
      <ArrowUpDown className="ml-2 h-4 w-4" />
    </Button>
  )
}

export const columns: ColumnDef<TeamColumn>[] = [
  {
    accessorKey: "songName",
    header: ({ column }) => <SortButton column={column}>곡명</SortButton>,
    cell: ({ row }) => (
      <Link href={ROUTES.TEAM.DETAIL(row.original.id).url}>
        {row.original.songName}
        <br />
        <span className="text-slate-300">{row.original.songArtist}</span>
      </Link>
    )
  },
  {
    accessorKey: "leaderName",
    header: ({ column }) => (
      <div className="flex w-full justify-center">
        <SortButton column={column}>팀장</SortButton>
      </div>
    ),
    cell: ({ row }) => (
      <div className="text-center">
        {row.getValue("leaderName") ?? ""}
        <br />
        {row.original.isFreshmanFixed && (
          <Badge className="bg-blue-900 py-0">신입고정</Badge>
        )}
      </div>
    )
  },
  {
    id: "requiredSessions",
    header: () => (
      <div className="flex w-full items-center justify-center">필요 세션</div>
    ),
    cell: ({ row }) => {
      return (
        <div className="flex justify-start gap-1 text-right font-medium">
          {row.original.memberSessions?.map((ms) => {
            return ms.members.map((member, index) => {
              if (member !== null) return null
              return (
                <SessionBadge
                  key={`${ms.session}-${index}`}
                  session={`${ms.session}${index + 1}`}
                />
              )
            })
          })}
        </div>
      )
    }
  },
  {
    accessorKey: "status",
    header: () => (
      <div className="flex items-center justify-center">모집상태</div>
    ),
    cell: ({ row }) => {
      const memberSessions = row.original.memberSessions
      const memberSessionsSet = new MemberSessionSet(memberSessions ?? [])
      const status = memberSessionsSet.isSatisfied ? "Inactive" : "Active"
      return <StatusBadge status={status} />
    }
  },
  {
    accessorKey: "songYoutubeVideoId",
    header: () => (
      <div className="flex items-center justify-center">영상링크</div>
    ),
    cell: ({ row }) => {
      const songYoutubeVideoId = row.getValue("songYoutubeVideoId") as string
      if (songYoutubeVideoId) {
        return (
          <Link
            href={songYoutubeVideoId}
            className="flex w-full items-center justify-center"
          >
            <Paperclip size={24} />
          </Link>
        )
      }
    }
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="flex w-full items-center justify-center p-0"
            >
              <span className="sr-only">Open menu</span>
              <EllipsisVertical className="h-5 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="rounded-none text-sm">
            <DropdownMenuItem className="p-0">
              <Link
                href={ROUTES.TEAM.EDIT(row.original.id).url}
                className="flex h-full w-full items-center justify-center gap-x-2 px-6 py-2"
              >
                <Pencil />
                편집하기
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem className="p-0">
              <DeleteButton
                className="flex h-full w-full items-center justify-center gap-x-2 px-6 py-2"
                teamId={row.original.id}
              >
                <Trash />
                삭제하기
              </DeleteButton>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    }
  }
]
