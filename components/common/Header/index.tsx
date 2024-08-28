import Image from "next/image"
import Link from "next/link"

import ROUTES from "../../../constants/routes"
import { cn } from "../../../lib/utils"
import NavLink from "../NavLink"
import Profile from "./Profile"

export const HeaderInner = () => {

  const menuItems: { name: string, url: string, active: boolean }[] = [
    { name: "공지사항", url: ROUTES.NOTICE.LIST.url, active: false },
    { name: "공연목록", url: ROUTES.PERFORMANCE.LIST.url, active: true },
    { name: "세션지원", url: ROUTES.TEAM.LIST.url, active: true },
    { name: "사진앨범", url: ROUTES.GALLERY.url, active: false },
  ]

  return (
    <>
      {/* Tablet & Desktop */}
      <nav className="invisible md:visible flex items-center w-full px-10">
        <div className="flex items-center w-full lg:w-[1280px] justify-between mx-auto">
          {/* Logo */}
          <Link href="/">
            <Image src="/Logo.png" alt="logo" width={47} height={47} />
          </Link>

          {/* MenuItems */}
          <div className="flex justify-around w-1/2">
            {menuItems.map((menuItem) => (
              <NavLink key={menuItem.name} href={menuItem.url} active={menuItem.active}>{menuItem.name}</NavLink>
            ))}
          </div>

          {/* Personal */}
          <Profile />
        </div>
      </nav>
    </>
  )
}
const Header = ({ position, height }: { position: 'sticky' | 'fixed', height: string }) => {
  return (
    <header
      className={cn(position, "w-full flex justify-center top-0 backdrop-blur z-10")}
      style={{ height }}
    >
      <HeaderInner />
    </header>
  )
}

export default Header