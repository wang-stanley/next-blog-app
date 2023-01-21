import { getAuth, signInWithPopup, signOut } from "firebase/auth";
import { googleAuthProvider } from "../lib/firebase";
import { useContext } from 'react';
import { UserContext } from '../lib/context';

export default function EnterPage(props) {
  const { user, username } = useContext(UserContext);
  // const user = null;
  // const username = null;

  return (
    <main>
      {/* 
        1. user signed out <SignInButton />
        2. user signed in, but missing username <UsernameForm />
        3. user signed in, has username <SignOutButton />
      */}
      {user ?
        !username ? <UsernameForm /> : <SignOutButton />
        :
        <SignInButton />
      }
    </main>
  )
}

// Sign in with Google button
function SignInButton() {
  const signInWithGoogle = async () => {
    try {
      const auth = getAuth();
      await signInWithPopup(auth, googleAuthProvider);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <button
      className="border-0 rounded-md bg-white font-semibold flex items-center justify-center cursor-pointer px-6 py-4"
      onClick={signInWithGoogle}
    >
      <img src={"/google.png"} className="w-7 mr-3" /> Sign in with Google
    </button>
  );
}

function onSignOut() {
  console.log("Signing out!");
  const auth = getAuth();
  signOut(auth);
}

function SignOutButton() {
  console.log('here');
  const auth = getAuth();
  return (
    <button
      className="border-0 rounded-md bg-gray-400 font-semibold flex items-center justify-center cursor-pointer px-8 py-4"
      onClick={onSignOut}
    >
      Sign Out
    </button>
  );
}

function UsernameForm() {
  return null;
}
