import { getAuth, signInWithPopup, signOut } from 'firebase/auth';
import { googleAuthProvider } from '../lib/firebase';
import { useCallback, useContext, useEffect, useState } from 'react';
import { UserContext } from '../lib/context';
import { doc, getFirestore, getDoc, writeBatch } from 'firebase/firestore';
import debounce from 'lodash.debounce'

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
  const auth = getAuth();
  signOut(auth);
}

function SignOutButton() {
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
  const [formValue, setFormValue] = useState('');
  const [isValid, setIsValid] = useState(false);
  const [loading, setLoading] = useState(false);

  const { user, username } = useContext(UserContext);

  const onSubmit = async (e) => {
    e.preventDefault();

    //Create refs for both documents
    const userDoc = doc(getFirestore(), 'users', user.uid);
    const usernameDoc = doc(getFirestore(), 'usernames', formValue);

    // Commit both docs together as a batch write
    const batch = writeBatch(getFirestore());
    batch.set(userDoc, { username: formValue, photoURL: user.photoURL, displayName: user.displayName });
    batch.set(usernameDoc, { uid: user.uid });

    await batch.commit().catch((e: any) => console.error(e));
  }

  const onChange = (e) => {
    // Force form value to match the correct format
    const val = e.target.value.toLowerCase();
    const re = /^(?=[a-zA-Z0-9._]{3,15}$)(?!.*[_.]{2})[^_.].*[^_.]$/;

    // Only set form value if length < 3 OR if it passes regex
    if (val.length < 3) {
      setFormValue(val);
      setLoading(false);
      setIsValid(false);
    }

    if (re.test(val)) {
      setFormValue(val);
      setLoading(true);
      setIsValid(false);
    }    
  };

  useEffect(() => {
    checkUsername(formValue);
  }, [formValue]);

  
  const checkUsername = useCallback(
    debounce(async (username) => {
      if (username.length >= 3) {
        const ref = doc(getFirestore(), 'usernames', username);
        const snap = await getDoc(ref);
        console.log('Firestore read executed', snap.exists());
        setIsValid(!snap.exists());
        setLoading(false);
      }
    }, 500),
    []
  );

  return (
    !username && (
      <section>
        <h3 className="font-semibold text-xl my-3">Choose Username</h3>
        <form onSubmit={onSubmit}>
          <input
            name="username"
            placeholder="username"
            value={formValue}
            onChange={onChange}
            className="inline-block outline-none border-0 text-2xl w-full px-2.5 py-1.5"
          />

          <UsernameMessage username={formValue} isValid={isValid} loading={loading} />

          <button
            type="submit"
            className="border-0 rounded-md bg-green-500 font-semibold flex items-center justify-center cursor-pointer px-8 py-4"
            disabled={!isValid}
          >
            Choose
          </button>
          <h3 className="font-semibold text-xl my-3">Debug State</h3>
          <div>
            Username: {formValue}
            <br />
            Loading: {loading.toString()}
            <br />
            Username Valid: {isValid.toString()}
          </div>
        </form>
      </section>
    )
  );
}

function UsernameMessage({ username, isValid, loading }) {
  if (loading) {
    return <p className="text-xl my-3">Checking...</p>;
  } else if (isValid) {
    return <p className="text-green-500 font-medium text-xl my-3">{username} is available!</p>
  } else if (username && !isValid) {
    return <p className="text-red-500 font-medium text-xl my-3">That username is taken!</p>
  } else {
    return <p className="my-3"></p>;
  }
}
