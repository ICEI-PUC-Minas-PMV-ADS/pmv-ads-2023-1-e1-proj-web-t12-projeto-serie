import { Binoculars, Confetti, Fire, House } from "@phosphor-icons/react";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

export default function BottomNav() {
  const router = useRouter();

  return (
    <nav className="flex md:hidden justify-center items-center gap-16 md:gap-20 lg:gap-24 bottom-0 dark:bg-zinc-900 bg-gray-300 w-full p-4 sticky z-50">
      <Link href="/">
        <div className="flex flex-col items-center justify-center ">
          {router.pathname === "/" ? (
            <House size={32} color="#689775" weight="fill" />
          ) : (
            <House
              size={32}
              className="fill-black dark:fill-white"
              weight="duotone"
            />
          )}
          <p>Home</p>
        </div>
      </Link>

      <Link href="/match">
        <div className="flex flex-col items-center justify-center">
          {router.pathname === "/match" ? (
            <Fire size={32} color="#689775" weight="fill" />
          ) : (
            <Fire
              size={32}
              className="fill-black dark:fill-white"
              weight="duotone"
            />
          )}
          <p>Match</p>
        </div>
      </Link>

      {/* <Link href="/search">
      <div className="flex flex-col items-center justify-center">
          {router.pathname === "/search" ?
          <Binoculars size={32} color="#689775" weight="fill" />
          :
          <Binoculars size={32} className='fill-black dark:fill-white' weight="duotone" />
          }
      <p>Buscar</p>
      </div>
      </Link> */}
    </nav>
  );
}
