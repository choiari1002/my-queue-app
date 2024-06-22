"use client";

import Link from "next/link";

const NavComponent = () => {

  return (
    <>
      <nav className="fixed-navigation">
        <Link href={`/`}>Home</Link>
        <Link href={`/search`}>Search</Link>
        <Link href={`/my-info`}>My Info</Link>
        <Link href={`/more`}>More</Link>
      </nav>
    </>
  );
};

export default NavComponent;

