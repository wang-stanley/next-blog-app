import Link from 'next/link';
import { useContext } from 'react';
import { UserContext } from '../lib/context';

// Navbar component
export default function Navbar() {
  const { user, username } = useContext(UserContext);

  return (
    <nav className="h-16 w-full bg-white text-black fixed top-0 px-20 font-bold border-b border-solid border-gray-500 z-99">
      <ul className="list-none m-0 p-0 flex items-center justify-between h-full">
        <li className="border rounded-full">
          <Link href="/">
            <button className="border-0 border-black rounded-md bg-black text-white uppercase text-2xl px-4 py-2">NXT</button>
          </Link>
        </li>

        {/* User is signed in and has a username */}
        {username && (
          <>
            <li className="border-0 rounded-full ml-auto mr-4">
              <Link href="/admin">
                <button className="border-0 rounded-md px-4 py-2 text-sm bg-blue-indigo text-white">Write Posts</button>
              </Link>
            </li>
            <li className="border rounded-full">
              <Link href={`/${username}`}>
                <img src={user?.photoURL} className="border-0 rounded-full h-12 w-12 cursor-pointer" />
              </Link>
            </li>
          </>
        )}

        {/* User is not signed in or doesn't have a username */}
        {!username && (
          <li className="border rounded-full">
            <Link href="/enter">
              <button className="border-0 rounded-md px-4 py-2 text-sm bg-blue-indigo text-white">Log in</button>
            </Link>
          </li>
        )}
      </ul>
    </nav>
  )
};
