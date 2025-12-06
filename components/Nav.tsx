import Link from 'next/link'
import React from 'react'

export default function Nav() {
  return (
    <nav className="nav__wrapper">
      <div className="name__wrapper">
        <Link href="/">
            <div className="name">SKINSTRIC</div>
        </Link>
        <div className="intro">[ INTRO ]</div>
      </div>
      <button suppressHydrationWarning className="btn-code">
        ENTER CODE
      </button>
    </nav>
  )
}
