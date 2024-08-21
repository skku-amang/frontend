import { cn } from "@/lib/utils"
import Image from "next/image"
import Link from "next/link"
import NavLink from "@/components/common/NavLink"
import ROUTES from "../../../constants/routes"

const Header = ({ position, height }: { position: 'sticky' | 'fixed', height: string }) => {
  const menuItems: { name: string, url: string }[] = [
    { name: "공지사항", url: ROUTES.NOTICE.LIST.url },
    { name: "공연목록", url: ROUTES.PERFORMANCE.LIST.url },
    { name: "세션지원", url: "/teams"},
    { name: "사진앨범", url: ROUTES.GALLERY.url },
  ]

  return (
    <header
      className={cn(position, "w-full flex justify-center top-0")}
      style={{ height }}
    >
      <nav className="flex h-full w-[1280px] items-center justify-between">
        {/* Logo */}
        <Link href="/" className="w-32 flex justify-center">
          <Image src="/Logo.png" alt="logo" width={47} height={47} />
        </Link>

        {/* MenuItems */}
        <div className="flex justify-around w-1/2">
          {menuItems.map((menuItem) => (
            <NavLink key={menuItem.name} href={menuItem.url}>{menuItem.name}</NavLink>
          ))}
        </div>

        {/* Personal */}
        <div
          className="flex justify-center gap-x-5 w-64 text-gray-700 font-bold">
          <Link href="/login" style={{ color: "#BEBEBE" }}>로그인</Link>
          |
          <Link href="/signup" style={{ color: "#BEBEBE" }}>회원가입</Link>
        </div>
      </nav>
    </header>
  )
}

export default Header