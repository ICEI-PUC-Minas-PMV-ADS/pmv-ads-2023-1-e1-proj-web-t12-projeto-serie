import { Binoculars, Confetti, Fire, House } from '@phosphor-icons/react'
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react'


export default function BottomNav() {
  const router = useRouter();
  console.log(router.pathname);
  return (
    <nav className='flex justify-center items-center gap-24 bottom-0 bg-slate-950 w-full p-4 sticky'>
      <Link href="/">
        <div className="flex flex-col items-center justify-center ">
          {router.pathname === "/" ?
          <House size={32} color="#689775" weight="fill" />
          :
          <House size={32} color="#e6e6e6" weight="duotone" />
          }
          <p>Home</p>
        </div>
      </Link>

      <Link href="/match">
        <div className="flex flex-col items-center justify-center">
          {router.pathname === "/match" ?
          <Fire size={32} color="#689775" weight="fill" />
          :
          <Fire size={32} color="#e6e6e6" weight="duotone" />
          }
        <p>Match</p>
        </div>
      </Link>
      
      <Link href="/surprise">
        <div className="flex flex-col items-center justify-center">
          {router.pathname === "/surprise" ?
          <Confetti size={32} color="#689775" weight="fill" />
          :
          <Confetti size={32} color="#e6e6e6" weight="duotone" />
          }
        <p>Surpresa</p>
        </div>
      </Link>

      <Link href="/search">
      <div className="flex flex-col items-center justify-center">
          {router.pathname === "/search" ?
          <Binoculars size={32} color="#689775" weight="fill" />
          :
          <Binoculars size={32} color="#e6e6e6" weight="duotone" />
          }
      <p>Buscar</p>
      </div>
      </Link>
    </nav>
  )
}
