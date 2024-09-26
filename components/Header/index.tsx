'use client'
import Image from 'next/image'
import Link from 'next/link'
import { RxHamburgerMenu } from "react-icons/rx";

import { Sheet, SheetContent, SheetTrigger } from '@/components/Header/_component/sheet';
import SheetContentProps from '@/components/Header/_component/sheetcontetprops';

import ROUTES from '../../constants/routes'
import { cn } from '../../lib/utils'
import NavLink from '../NavLink'
import Profile from './Profile'

const Header = ({
  position,
  height
}: {
  position: 'sticky' | 'fixed'
  height: string
}) => {
  const menuItems: { name: string; url: string; active: boolean }[] = [
    { name: '공지사항', url: ROUTES.NOTICE.LIST.url, active: false },
    { name: '공연목록', url: ROUTES.PERFORMANCE.LIST.url, active: true },
    { name: '세션지원', url: ROUTES.TEAM.LIST.url, active: true },
    { name: '맴버목록', url: ROUTES.MEMBER.LIST.url, active: true }
  ]

  return (  
    <header
      className={cn(
        position,
        'top-0 z-10 flex h-full w-full bg-primary justify-center'
      )}
      style={{ height }}
    >
      {/* Mobile */}
      <nav className="relative flex justify-between items-center w-11/12 h-full visible md:hidden">
        <div className="w-9 f-full bg-none"></div>
        <Link href="/">
          <Image src="/Logo.png" alt="logo" width={50} height={50} />
        </Link>
        <Sheet>
        <SheetTrigger><RxHamburgerMenu className="text-white w-9 h-9"/></SheetTrigger>
          <SheetContent>
            <SheetContentProps/>
         </SheetContent>
        </Sheet>
      </nav>

      {/* Tablet & Desktop */}
      <nav className="hidden h-full w-full items-center px-10 md:visible md:flex">
        <div className="mx-auto flex h-full w-full items-center justify-between lg:w-[1280px]">
          {/* Logo */}
          <Link href="/">
            <Image src="/Logo.png" alt="logo" width={47} height={47} />
          </Link>

          {/* MenuItems */}
          <div className="flex h-full justify-center md:gap-x-7 lg:gap-x-16 xl:gap-x-24">
            {menuItems.map((menuItem) => (
              <NavLink
                key={menuItem.name}
                href={menuItem.url}
                active={menuItem.active}
              >
                {menuItem.name}
              </NavLink>
            ))}
          </div>

          {/* Personal */}
          <Profile />
        </div>
      </nav>
    </header>
    
  )
}

export default Header
