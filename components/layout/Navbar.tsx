'use client'
import Link from 'next/link'
import { useDispatch, useSelector } from 'react-redux'
import { openAddGroup } from '../../store/slices/uiSlice'
import type { RootState } from '../../store'

export function Navbar() {
  const dispatch = useDispatch()
  const darkMode = useSelector((state: RootState) => state.user.darkMode)

  return (
    <header className='sticky top-0 z-30 border-b border-slate-800/60 bg-surface-900/80 backdrop-blur-md'>
      <nav
        className='max-w-6xl mx-auto px-4 h-14 flex items-center justify-between'
        aria-label='Main navigation'
      >
        <Link href='/' className='flex items-center gap-2.5 group'>
          <div className='w-8 h-8 rounded-xl bg-brand-500 flex items-center justify-center shadow-glow-sm group-hover:scale-105 transition-transform'>
            <svg width='16' height='16' viewBox='0 0 16 16' fill='none'>
              <path
                d='M2 8h12M8 2l4 6-4 6'
                stroke='white'
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'
              />
            </svg>
          </div>
          <span className='font-bold text-white text-lg'>
            Split<span className='text-brand-400'>Ease</span>
          </span>
        </Link>

        <div className='hidden md:flex items-center gap-1'>
          <NavLink href='/groups'>My Groups</NavLink>
          <NavLink href='/split-expenses-online'>Split Online</NavLink>
          <NavLink href='/trip-expense-calculator'>Trip Calculator</NavLink>
          <NavLink href='/blog'>Blog</NavLink>
        </div>

        <div className='flex items-center gap-2'>
          <Link
            href='/groups'
            className='md:hidden btn-ghost p-2 rounded-lg text-slate-400'
            aria-label='My Groups'
          >
            👥
          </Link>
          <button
            onClick={() => dispatch(openAddGroup())}
            className='btn-primary text-xs px-4 py-2'
          >
            <span>+</span> New Group
          </button>
        </div>
      </nav>
    </header>
  )
}

function NavLink({
  href,
  children,
}: {
  href: string
  children: React.ReactNode
}) {
  return (
    <Link
      href={href}
      className='px-3 py-2 rounded-lg text-sm text-slate-400 hover:text-white hover:bg-surface-800 transition-colors'
    >
      {children}
    </Link>
  )
}
